import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ordersApi, type CreateOrderDto } from '@/services/api'
import {
  Package, Clock, Truck, CheckCircle, XCircle,
  Plus, X, ArrowRight, MapPin, ChevronRight, FileText,
} from 'lucide-react'
import toast from 'react-hot-toast'

const STATUS_CFG = {
  Pending:    { icon: Clock,       color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Ожидает' },
  InProgress: { icon: Truck,       color: 'text-blue-400   bg-blue-500/10   border-blue-500/20',   label: 'В пути' },
  Completed:  { icon: CheckCircle, color: 'text-green-400  bg-green-500/10  border-green-500/20',  label: 'Доставлено' },
  Cancelled:  { icon: XCircle,     color: 'text-red-400    bg-red-500/10    border-red-500/20',     label: 'Отменена' },
} as const

function StatusBadge({ status }: { status: string }) {
  const cfg = STATUS_CFG[status as keyof typeof STATUS_CFG] ?? STATUS_CFG.Pending
  const Icon = cfg.icon
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-medium border ${cfg.color}`}>
      <Icon className="w-3 h-3" />{cfg.label}
    </span>
  )
}

const CITIES = ['Алматы','Астана','Шымкент','Ақтөбе','Қарағанды','Атырау','Павлодар','Қостанай','Семей','Өскемен','Тараз','Орал']
const ic = 'w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-all'
const lc = 'block text-xs font-medium text-gray-400 mb-1.5'

function CreateOrderModal({ onClose }: { onClose: () => void }) {
  const qc = useQueryClient()
  const [form, setForm] = useState<CreateOrderDto>({ fromCity:'', toCity:'', cargoDescription:'', weightKg:0 })

  const mut = useMutation({
    mutationFn: (d: CreateOrderDto) => ordersApi.createOrder(d),
    onSuccess: () => { qc.invalidateQueries({ queryKey:['orders'] }); toast.success('Заявка создана!'); onClose() },
    onError: () => toast.error('Ошибка создания заявки'),
  })

  const set = (f: keyof CreateOrderDto) => (e: React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>) =>
    setForm(p => ({ ...p, [f]: e.target.type==='number' ? Number(e.target.value) : e.target.value }))

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fromCity||!form.toCity||!form.cargoDescription||!form.weightKg) { toast.error('Заполните обязательные поля'); return }
    mut.mutate(form)
  }

  return (
    <motion.div
      initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={e => e.target===e.currentTarget && onClose()}
    >
      <motion.div
        initial={{ scale:0.95, y:20 }} animate={{ scale:1, y:0 }} exit={{ scale:0.95, y:20 }}
        className="w-full max-w-lg bg-navy-800 border border-white/10 rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.07]">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
              <Package className="w-4 h-4 text-brand-400" />
            </div>
            <h2 className="font-display font-bold text-white">Новая заявка</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={submit} className="overflow-y-auto flex-1">
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lc}>Откуда *</label>
                <select value={form.fromCity} onChange={set('fromCity')} required className={ic}>
                  <option value="">Выберите</option>
                  {CITIES.map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className={lc}>Куда *</label>
                <select value={form.toCity} onChange={set('toCity')} required className={ic}>
                  <option value="">Выберите</option>
                  {CITIES.filter(c=>c!==form.fromCity).map(c=><option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className={lc}>Описание груза *</label>
              <input type="text" value={form.cargoDescription} onChange={set('cargoDescription')} placeholder="Строительные материалы, мебель..." required className={ic} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className={lc}>Вес (кг) *</label>
                <input type="number" value={form.weightKg||''} onChange={set('weightKg')} placeholder="1000" min={1} required className={ic} />
              </div>
              <div>
                <label className={lc}>Объём (м³)</label>
                <input type="number" value={form.volumeM3||''} onChange={set('volumeM3')} placeholder="10" min={0} step={0.1} className={ic} />
              </div>
            </div>
            <div>
              <label className={lc}>Контактный телефон</label>
              <input type="tel" value={form.contactPhone||''} onChange={set('contactPhone')} placeholder="+7..." className={ic} />
            </div>
            <div>
              <label className={lc}>Примечания</label>
              <textarea value={form.notes||''} onChange={set('notes')} placeholder="Особые условия, упаковка..." rows={3} className={`${ic} resize-none`} />
            </div>
            <div className="p-3 rounded-xl bg-blue-500/5 border border-blue-500/15 text-xs text-blue-300">
              После создания заявки менеджер свяжется с вами для уточнения деталей и стоимости.
            </div>
          </div>
          <div className="px-6 pb-6">
            <button type="submit" disabled={mut.isPending}
              className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/40 text-white font-semibold transition-all flex items-center justify-center gap-2">
              {mut.isPending
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Создаём...</>
                : <>Создать заявку <ArrowRight className="w-4 h-4" /></>}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default function Orders() {
  const { t } = useTranslation()
  const [showCreate, setShowCreate] = useState(false)
  const [filter, setFilter] = useState('all')

  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getMyOrders().then(r => r.data),
  })

  const filtered = filter === 'all' ? orders : orders?.filter(o => o.status === filter)

  const tabs = [
    { key:'all',        label:'Все' },
    { key:'Pending',    label:'Ожидают' },
    { key:'InProgress', label:'В пути' },
    { key:'Completed',  label:'Доставлены' },
  ]

  return (
    <>
      <Helmet><title>Мои заявки — TuranLogix</title></Helmet>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white">{t('orders.title')}</h1>
            <p className="text-gray-400 text-sm mt-1">{orders?.length ?? 0} заявок всего</p>
          </div>
          <button onClick={() => setShowCreate(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white text-sm font-semibold shadow-glow-orange transition-all">
            <Plus className="w-4 h-4" /><span className="hidden sm:inline">Новая заявка</span>
          </button>
        </motion.div>

        <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setFilter(tab.key)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                filter===tab.key ? 'bg-brand-500/20 text-brand-400 border border-brand-500/30' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
              }`}>
              {tab.label}
              {tab.key!=='all' && orders && (
                <span className="ml-1.5 text-xs opacity-60">{orders.filter(o=>o.status===tab.key).length}</span>
              )}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="space-y-3">
            {[1,2,3].map(i=><div key={i} className="h-24 rounded-2xl bg-white/[0.03] border border-white/[0.05] animate-pulse" />)}
          </div>
        ) : !filtered?.length ? (
          <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-gray-600" />
            </div>
            <p className="text-gray-500 mb-4">{filter==='all' ? 'У вас пока нет заявок' : 'Нет заявок с этим статусом'}</p>
            {filter==='all' && (
              <button onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-500/10 text-brand-400 border border-brand-500/20 text-sm font-medium hover:bg-brand-500/20 transition-all">
                <Plus className="w-4 h-4" />Создать первую заявку
              </button>
            )}
          </motion.div>
        ) : (
          <div className="space-y-3">
            {filtered.map((order, i) => (
              <motion.div key={order.id} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:i*0.05 }}>
                <Link to={`/orders/${order.id}`}
                  className="group flex items-center gap-4 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/25 hover:bg-brand-500/[0.03] transition-all">
                  <div className="w-11 h-11 rounded-xl bg-white/[0.05] flex items-center justify-center flex-shrink-0">
                    <Package className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-white font-medium text-sm mb-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-400" />
                      {order.fromCity} <ArrowRight className="w-3 h-3 text-gray-500" /> {order.toCity}
                    </div>
                    <div className="text-xs text-gray-500 flex items-center gap-1">
                      <FileText className="w-3 h-3" />{order.cargoDescription} · {order.weightKg} кг
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      {new Date(order.createdAt).toLocaleDateString('ru-RU',{day:'numeric',month:'long',year:'numeric'})}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 flex-shrink-0">
                    <StatusBadge status={order.status} />
                    <ChevronRight className="w-4 h-4 text-gray-600 group-hover:text-brand-400 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence>{showCreate && <CreateOrderModal onClose={() => setShowCreate(false)} />}</AnimatePresence>
    </>
  )
}
