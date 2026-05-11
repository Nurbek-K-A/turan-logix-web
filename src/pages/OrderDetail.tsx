import { useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { useParams, Link } from 'react-router-dom'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import { ordersApi } from '@/services/api'
import {
  ArrowLeft, Package, MapPin, FileText, Calendar,
  Upload, Download, CheckCircle, Clock, Truck, XCircle,
  Phone, ExternalLink,
} from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_CFG = {
  Pending:    { icon: Clock,       color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/20', label: 'Ожидает', step: 0 },
  InProgress: { icon: Truck,       color: 'text-blue-400',   bg: 'bg-blue-500/10 border-blue-500/20',     label: 'В пути',  step: 2 },
  Completed:  { icon: CheckCircle, color: 'text-green-400',  bg: 'bg-green-500/10 border-green-500/20',   label: 'Доставлено', step: 3 },
  Cancelled:  { icon: XCircle,     color: 'text-red-400',    bg: 'bg-red-500/10 border-red-500/20',       label: 'Отменена', step: -1 },
} as const

const STEPS = ['Принята', 'Обработка', 'В пути', 'Доставлено']

export default function OrderDetail() {
  const { id } = useParams<{ id: string }>()
  const qc = useQueryClient()
  const fileRef = useRef<HTMLInputElement>(null)

  const { data: order, isLoading } = useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersApi.getOrder(Number(id)).then(r => r.data),
    enabled: !!id,
  })

  const { data: docs, isLoading: docsLoading } = useQuery({
    queryKey: ['docs', id],
    queryFn: () => ordersApi.getDocuments(Number(id)).then(r => r.data),
    enabled: !!id,
  })

  const uploadMut = useMutation({
    mutationFn: (file: File) => ordersApi.uploadDocument(Number(id), file),
    onSuccess: () => { qc.invalidateQueries({ queryKey: ['docs', id] }); toast.success('Документ загружен') },
    onError: () => toast.error('Ошибка загрузки'),
  })

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) uploadMut.mutate(file)
    e.target.value = ''
  }

  if (isLoading) return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-16 space-y-4">
      {[1,2,3].map(i => <div key={i} className="h-20 rounded-2xl bg-white/[0.03] animate-pulse" />)}
    </div>
  )

  if (!order) return (
    <div className="max-w-2xl mx-auto px-4 pt-28 pb-16 text-center">
      <Package className="w-12 h-12 text-gray-600 mx-auto mb-4" />
      <p className="text-gray-400 mb-4">Заявка не найдена</p>
      <Link to="/orders" className="text-brand-400 text-sm">← Назад</Link>
    </div>
  )

  const cfg = STATUS_CFG[order.status as keyof typeof STATUS_CFG] ?? STATUS_CFG.Pending
  const Icon = cfg.icon

  return (
    <>
      <Helmet><title>Заявка #{order.id} — TuranLogix</title></Helmet>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 pt-28 pb-16">
        <Link to="/orders" className="inline-flex items-center gap-2 text-gray-400 hover:text-white text-sm mb-6 transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />Назад к заявкам
        </Link>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-display text-2xl font-bold text-white mb-1">Заявка #{order.id}</h1>
            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Calendar className="w-3.5 h-3.5" />
              {new Date(order.createdAt).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
          </div>
          <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border flex-shrink-0 ${cfg.bg} ${cfg.color}`}>
            <Icon className="w-4 h-4" />{cfg.label}
          </span>
        </motion.div>

        {/* Progress */}
        {order.status !== 'Cancelled' && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
            <div className="flex items-start justify-between relative">
              <div className="absolute left-4 right-4 top-4 h-0.5 bg-white/[0.05]" />
              <div className="absolute left-4 top-4 h-0.5 bg-brand-500 transition-all duration-700"
                style={{ width: cfg.step <= 0 ? 0 : `${(cfg.step / (STEPS.length - 1)) * 87}%` }} />
              {STEPS.map((step, i) => (
                <div key={step} className="relative flex flex-col items-center gap-2 z-10">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                    i < cfg.step ? 'bg-brand-500 border-brand-500' :
                    i === cfg.step ? 'bg-navy-800 border-brand-500 shadow-glow-orange' :
                    'bg-navy-800 border-white/10'
                  }`}>
                    {i < cfg.step
                      ? <CheckCircle className="w-4 h-4 text-white" />
                      : <span className={`text-xs font-bold ${i === cfg.step ? 'text-brand-400' : 'text-gray-600'}`}>{i+1}</span>}
                  </div>
                  <span className={`text-[10px] text-center max-w-[56px] leading-tight ${i <= cfg.step ? 'text-white' : 'text-gray-600'}`}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Details card */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
          className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <h2 className="text-white font-semibold text-sm mb-4">Детали заявки</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {[
              { icon: MapPin,   label: 'Маршрут', value: `${order.fromCity} → ${order.toCity}` },
              { icon: Package,  label: 'Вес',     value: `${order.weightKg} кг${order.volumeM3 ? ` / ${order.volumeM3} м³` : ''}` },
              { icon: FileText, label: 'Груз',    value: order.cargoDescription },
              { icon: Calendar, label: 'Обновлено', value: new Date(order.updatedAt).toLocaleDateString('ru-RU') },
            ].map(({ icon: Ic, label, value }) => (
              <div key={label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Ic className="w-4 h-4 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500">{label}</div>
                  <div className="text-white text-sm font-medium mt-0.5">{value}</div>
                </div>
              </div>
            ))}
          </div>
          {order.trackingNumber && (
            <div className="mt-4 pt-4 border-t border-white/[0.05]">
              <div className="text-xs text-gray-500 mb-1">Номер отслеживания</div>
              <div className="font-mono text-brand-400 text-sm font-semibold">{order.trackingNumber}</div>
            </div>
          )}
        </motion.div>

        {/* Documents */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="mb-5 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-sm">Документы</h2>
            <button onClick={() => fileRef.current?.click()} disabled={uploadMut.isPending}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 text-brand-400 text-xs font-medium border border-brand-500/20 transition-all disabled:opacity-50">
              <Upload className="w-3.5 h-3.5" />{uploadMut.isPending ? 'Загружаем...' : 'Загрузить'}
            </button>
            <input ref={fileRef} type="file" accept=".pdf,.doc,.docx,.jpg,.jpeg,.png" onChange={handleFile} className="hidden" />
          </div>

          {docsLoading ? (
            <div className="space-y-2">{[1,2].map(i=><div key={i} className="h-12 rounded-xl bg-white/[0.02] animate-pulse" />)}</div>
          ) : !docs?.length ? (
            <div className="text-center py-8 text-gray-500">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-30" />
              <p className="text-sm">Документов нет</p>
              <p className="text-xs mt-1 text-gray-600">Загрузите договор или ТТН</p>
            </div>
          ) : (
            <div className="space-y-2">
              {docs.map(doc => (
                <div key={doc.id} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.04] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm truncate">{doc.fileName}</div>
                    <div className="text-xs text-gray-500 flex items-center gap-2">
                      {new Date(doc.uploadedAt).toLocaleDateString('ru-RU')}
                      {doc.isSigned && <span className="flex items-center gap-0.5 text-green-400"><CheckCircle className="w-3 h-3" />Подписан</span>}
                    </div>
                  </div>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <a href={doc.fileUrl} target="_blank" rel="noopener noreferrer"
                      className="p-1.5 rounded-lg text-gray-500 hover:text-brand-400 hover:bg-brand-500/10 transition-all">
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <a href={doc.fileUrl} download
                      className="p-1.5 rounded-lg text-gray-500 hover:text-white hover:bg-white/5 transition-all">
                      <Download className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>

        {/* Support */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.25 }}
          className="p-4 rounded-2xl bg-brand-500/5 border border-brand-500/15 flex items-start gap-3">
          <Phone className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
          <div>
            <div className="text-white text-sm font-medium mb-0.5">Есть вопросы?</div>
            <div className="text-gray-400 text-xs">
              Позвоните:{' '}
              <a href="tel:+77001234567" className="text-brand-400 hover:text-brand-300 font-medium">+7 700 123 45 67</a>
              {' '}или{' '}
              <a href="https://t.me/turanlogix" target="_blank" rel="noopener noreferrer" className="text-brand-400 hover:text-brand-300 font-medium">Telegram</a>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
