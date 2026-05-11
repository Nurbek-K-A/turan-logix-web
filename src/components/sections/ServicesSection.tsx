import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Truck, Package, Zap, Globe, FileText, MapPin, ArrowRight } from 'lucide-react'

const icons = [Truck, Package, Zap, Globe, FileText, MapPin]
const keys = ['ftl', 'ltl', 'express', 'cargo', 'docs', 'tracking'] as const

export default function ServicesSection() {
  const { t } = useTranslation()

  return (
    <section id="services" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-4">
            {t('services.title')}
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            {t('services.subtitle')}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {keys.map((key, i) => {
            const Icon = icons[i]
            const isHighlight = i === 0 || i === 2
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`group relative p-6 rounded-2xl border transition-all duration-300 cursor-pointer ${
                  isHighlight
                    ? 'bg-brand-500/[0.07] border-brand-500/20 hover:border-brand-500/40 hover:bg-brand-500/10'
                    : 'bg-white/[0.03] border-white/[0.06] hover:border-white/10 hover:bg-white/[0.05]'
                }`}
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-5 ${
                  isHighlight ? 'bg-brand-500/20' : 'bg-white/[0.06]'
                }`}>
                  <Icon className={`w-6 h-6 ${isHighlight ? 'text-brand-400' : 'text-gray-400'}`} />
                </div>
                <h3 className="font-display font-bold text-white text-lg mb-2">
                  {t(`services.${key}.title`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(`services.${key}.desc`)}
                </p>

                {isHighlight && (
                  <div className="mt-4 flex items-center gap-1 text-brand-400 text-sm font-medium">
                    {t('nav.order')}
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="text-center mt-10">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-white/10 hover:border-brand-500/30 text-gray-300 hover:text-white text-sm font-medium transition-all duration-200"
          >
            {t('services.title')} →
          </Link>
        </div>
      </div>
    </section>
  )
}
