import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Bot, ChevronDown, Shield, Zap, Globe } from 'lucide-react'

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
}

const badges = [
  { icon: Shield, label: 'Застрахованные грузы' },
  { icon: Zap, label: 'Онлайн-заявка 24/7' },
  { icon: Globe, label: 'Весь Казахстан' },
]

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-navy-900">
      {/* Background grid */}
      <div className="absolute inset-0 bg-grid-dark opacity-100 pointer-events-none" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Animated road line */}
      <div className="absolute bottom-32 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute bottom-32 left-0 right-0 h-px bg-white/5 translate-y-4" />

      {/* Truck animation */}
      <motion.div
        initial={{ x: '-120%' }}
        animate={{ x: '120vw' }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity, delay: 2 }}
        className="absolute bottom-24 pointer-events-none"
      >
        <div className="flex items-end gap-1 opacity-20">
          <div className="w-24 h-12 bg-navy-600 rounded-sm rounded-tl-md relative">
            <div className="absolute right-0 top-0 w-8 h-12 bg-navy-500 rounded-r-sm" />
            <div className="absolute bottom-0 left-2 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600" />
            <div className="absolute bottom-0 right-3 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600" />
            <div className="absolute top-1 left-1 right-9 h-2 bg-brand-500/40 rounded-sm" />
          </div>
        </div>
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            custom={0}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-400 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-brand-400 animate-pulse-slow" />
            {t('hero.badge')}
          </motion.div>

          {/* Heading */}
          <motion.h1
            custom={1}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight mb-6"
          >
            {t('hero.title_1')}{' '}
            <span className="text-brand-400">{t('hero.title_2')}</span>
            <br />
            {t('hero.title_3')}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            custom={2}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="text-gray-400 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            {t('hero.subtitle')}
          </motion.p>

          {/* CTAs */}
          <motion.div
            custom={3}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-4 mb-12"
          >
            <Link
              to="/contacts"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-300"
            >
              {t('hero.cta_order')}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/chat"
              className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white font-semibold transition-all duration-300"
            >
              <Bot className="w-4 h-4 text-brand-400" />
              {t('hero.cta_chat')}
            </Link>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            custom={4}
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap gap-3"
          >
            {badges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] text-gray-400 text-xs"
              >
                <Icon className="w-3.5 h-3.5 text-brand-400" />
                {label}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-500"
      >
        <span className="text-xs">{t('hero.scroll')}</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  )
}
