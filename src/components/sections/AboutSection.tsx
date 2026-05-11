import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Shield, Zap, Eye, Lock } from 'lucide-react'

const values = [
  { icon: Shield, key: 'reliability', color: 'text-blue-400 bg-blue-500/10' },
  { icon: Zap, key: 'speed', color: 'text-yellow-400 bg-yellow-500/10' },
  { icon: Eye, key: 'transparency', color: 'text-green-400 bg-green-500/10' },
  { icon: Lock, key: 'safety', color: 'text-purple-400 bg-purple-500/10' },
]

export default function AboutSection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-brand-500/10 text-brand-400 text-sm font-medium mb-5">
              {t('about.title')}
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-5">
              {t('about.subtitle')}
            </h2>
            <p className="text-gray-400 leading-relaxed mb-8">
              {t('about.desc')}
            </p>

            <div className="grid grid-cols-2 gap-3">
              {values.map(({ icon: Icon, key, color }) => (
                <div key={key} className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-white text-sm font-medium">{t(`about.values.${key}`)}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-64 lg:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 border border-white/[0.07]">
              {/* Stylized map of Kazakhstan */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-full h-full">
                  {/* Route lines */}
                  <svg viewBox="0 0 400 260" className="w-full h-full opacity-60">
                    <defs>
                      <linearGradient id="routeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f97316" stopOpacity="0"/>
                        <stop offset="50%" stopColor="#f97316" stopOpacity="1"/>
                        <stop offset="100%" stopColor="#f97316" stopOpacity="0"/>
                      </linearGradient>
                    </defs>
                    <path d="M 60 140 Q 200 60 340 130" stroke="url(#routeGrad)" strokeWidth="1.5" fill="none" strokeDasharray="4 4"/>
                    <path d="M 60 140 Q 150 180 260 170" stroke="url(#routeGrad)" strokeWidth="1" fill="none" strokeDasharray="3 5"/>
                    <path d="M 200 80 Q 280 120 340 130" stroke="#3b82f6" strokeWidth="1" fill="none" strokeDasharray="4 4" opacity="0.5"/>
                    {/* City dots */}
                    {[
                      [60, 140, 'Алматы'],
                      [200, 80, 'Астана'],
                      [340, 130, 'Актобе'],
                      [260, 170, 'Шымкент'],
                      [290, 60, 'Павлодар'],
                      [100, 100, 'Тараз'],
                    ].map(([x, y, name], i) => (
                      <g key={i}>
                        <circle cx={x} cy={y} r="5" fill="#f97316" opacity="0.8"/>
                        <circle cx={x} cy={y} r="8" fill="#f97316" opacity="0.2"/>
                        <text x={Number(x) + 10} y={Number(y) + 4} fill="#ffffff" fontSize="9" opacity="0.7">{name}</text>
                      </g>
                    ))}
                  </svg>
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <span className="text-xs text-gray-500">Казахстан — 18 регионов</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -right-4 bg-brand-500 rounded-2xl p-4 shadow-glow-orange">
              <div className="text-white text-2xl font-display font-black">3+</div>
              <div className="text-brand-200 text-xs">{t('stats.years')}</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
