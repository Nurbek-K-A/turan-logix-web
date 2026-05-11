import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useAuthStore } from '@/store'
import { ordersApi } from '@/services/api'
import { User, Package, FileText, Plus, ArrowRight, Clock, CheckCircle, Truck, XCircle } from 'lucide-react'

const StatusBadge = ({ status }: { status: string }) => {
  const config = {
    Pending: { icon: Clock, color: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20', label: 'Ожидает' },
    InProgress: { icon: Truck, color: 'text-blue-400 bg-blue-500/10 border-blue-500/20', label: 'В пути' },
    Completed: { icon: CheckCircle, color: 'text-green-400 bg-green-500/10 border-green-500/20', label: 'Доставлено' },
    Cancelled: { icon: XCircle, color: 'text-red-400 bg-red-500/10 border-red-500/20', label: 'Отменена' },
  }[status] || { icon: Clock, color: 'text-gray-400 bg-white/5 border-white/10', label: status }

  const Icon = config.icon
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border ${config.color}`}>
      <Icon className="w-3 h-3" />
      {config.label}
    </span>
  )
}

export default function Cabinet() {
  const { t } = useTranslation()
  const { user } = useAuthStore()
  const { data: orders, isLoading } = useQuery({
    queryKey: ['orders'],
    queryFn: () => ordersApi.getMyOrders().then(r => r.data),
  })

  const stats = [
    { icon: Package, label: 'Всего заявок', value: orders?.length ?? 0 },
    { icon: Truck, label: 'В пути', value: orders?.filter(o => o.status === 'InProgress').length ?? 0 },
    { icon: CheckCircle, label: 'Доставлено', value: orders?.filter(o => o.status === 'Completed').length ?? 0 },
  ]

  return (
    <>
      <Helmet><title>Личный кабинет — TuranLogix</title></Helmet>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
              <User className="w-7 h-7 text-brand-400" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold text-white">{user?.fullName}</h1>
              <p className="text-gray-400 text-sm">{user?.email}</p>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="p-4 rounded-2xl bg-white/[0.03] border border-white/[0.06] text-center">
              <s.icon className="w-5 h-5 text-brand-400 mx-auto mb-2" />
              <div className="text-2xl font-display font-bold text-white">{s.value}</div>
              <div className="text-xs text-gray-500">{s.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Quick links */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
          {[
            { to: '/orders', icon: Package, label: 'Мои заявки' },
            { to: '/chat', icon: FileText, label: 'AI Чат-бот' },
            { to: '/contacts', icon: Plus, label: 'Новая заявка' },
          ].map((item, i) => (
            <Link key={i} to={item.to}
              className="group flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/25 hover:bg-brand-500/[0.04] transition-all">
              <item.icon className="w-5 h-5 text-brand-400" />
              <span className="text-white text-sm font-medium">{item.label}</span>
              <ArrowRight className="w-4 h-4 text-gray-500 ml-auto group-hover:translate-x-1 transition-transform" />
            </Link>
          ))}
        </div>

        {/* Recent orders */}
        <div>
          <h2 className="text-white font-semibold mb-4">Последние заявки</h2>
          {isLoading ? (
            <div className="text-gray-500 text-sm">Загружаем...</div>
          ) : !orders?.length ? (
            <div className="text-center py-12 text-gray-500">
              <Package className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p>{t('orders.no_orders')}</p>
              <Link to="/contacts" className="mt-3 inline-block text-brand-400 text-sm">{t('orders.new')} →</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {orders.slice(0, 5).map(order => (
                <Link key={order.id} to={`/orders/${order.id}`}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/25 transition-all">
                  <div className="flex-1 min-w-0">
                    <div className="text-white text-sm font-medium truncate">
                      {order.fromCity} → {order.toCity}
                    </div>
                    <div className="text-gray-500 text-xs mt-0.5">{order.cargoDescription} · {order.weightKg} кг</div>
                  </div>
                  <StatusBadge status={order.status} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
