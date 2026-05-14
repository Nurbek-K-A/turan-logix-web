import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Clock, Banknote } from 'lucide-react'
import { Link } from 'react-router-dom'

const routes = [
  { from: 'almaty', to: 'astana', days: '2-3', priceFrom: '150 000 ₸' },
  { from: 'almaty', to: 'shymkent', days: '1', priceFrom: '80 000 ₸' },
  { from: 'almaty', to: 'aktobe', days: '3-4', priceFrom: '200 000 ₸' },
  { from: 'astana', to: 'karaganda', days: '1', priceFrom: '60 000 ₸' },
  { from: 'almaty', to: 'atyrau', days: '4-5', priceFrom: '250 000 ₸' },
  { from: 'astana', to: 'pavlodar', days: '1-2', priceFrom: '90 000 ₸' },
]

export default function RoutesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28 bg-navy-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-4">
            {t('routes.title')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('routes.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {routes.map((route, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="group p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/25 hover:bg-brand-500/[0.04] transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-1">
                  <div className="text-white font-display font-bold text-base">
                    {t(`routes.cities.${route.from}`)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{t('routes.from')}</div>
                </div>
                <ArrowRight className="w-4 h-4 text-brand-400 flex-shrink-0" />
                <div className="flex-1 text-right">
                  <div className="text-white font-display font-bold text-base">
                    {t(`routes.cities.${route.to}`)}
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5">{t('routes.to')}</div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                <div className="flex items-center gap-1.5 text-gray-400 text-xs">
                  <Clock className="w-3.5 h-3.5" />
                  {route.days} {t('routes.days')}
                </div>
                <div className="flex items-center gap-1.5 text-brand-400 text-xs font-medium">
                  <Banknote className="w-3.5 h-3.5" />
                  {t('routes.price_from')} {route.priceFrom}
                </div>
              </div>

              <Link
                to={`/contacts?from=${route.from}&to=${route.to}`}
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg bg-brand-500/10 text-brand-400 text-xs font-medium hover:bg-brand-500/20 transition-colors opacity-0 group-hover:opacity-100"
              >
                {t('routes.order_route')}
                <ArrowRight className="w-3 h-3" />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
