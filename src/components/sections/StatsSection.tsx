import { useTranslation } from 'react-i18next'
import { useInView } from 'react-intersection-observer'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Route, Users, Package, Award } from 'lucide-react'

function Counter({ target, duration = 2000 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target, duration])

  return <span ref={ref}>{count.toLocaleString('ru-RU')}</span>
}

const stats = [
  { icon: Route, value: 50, suffix: '+', key: 'routes' },
  { icon: Users, value: 200, suffix: '+', key: 'clients' },
  { icon: Package, value: 5000, suffix: '+', key: 'tons' },
  { icon: Award, value: 3, suffix: '', key: 'years' },
]

export default function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="relative py-16 lg:py-20 bg-navy-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="flex flex-col items-center text-center p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-brand-500/20 hover:bg-brand-500/5 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-500/10 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <div className="text-3xl lg:text-4xl font-display font-black text-white mb-1">
                  <Counter target={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-sm text-gray-400">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
