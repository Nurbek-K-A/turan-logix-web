import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Calculator, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

const CITIES = ['almaty', 'astana', 'shymkent', 'aktobe', 'karaganda', 'atyrau', 'pavlodar', 'kostanay'] as const

const RATES: Record<string, number> = {
  'almaty-astana': 150000, 'astana-almaty': 150000,
  'almaty-shymkent': 80000, 'shymkent-almaty': 80000,
  'almaty-aktobe': 200000, 'aktobe-almaty': 200000,
  'almaty-karaganda': 120000, 'karaganda-almaty': 120000,
  'almaty-atyrau': 250000, 'atyrau-almaty': 250000,
  'almaty-pavlodar': 180000, 'pavlodar-almaty': 180000,
  'almaty-kostanay': 210000, 'kostanay-almaty': 210000,
  'astana-shymkent': 180000, 'shymkent-astana': 180000,
  'astana-aktobe': 140000, 'aktobe-astana': 140000,
  'astana-karaganda': 60000, 'karaganda-astana': 60000,
  'astana-pavlodar': 90000, 'pavlodar-astana': 90000,
  'astana-kostanay': 100000, 'kostanay-astana': 100000,
}

function calcPrice(from: string, to: string, weight: number, type: string): number | null {
  if (!from || !to || from === to || !weight) return null
  const base = RATES[`${from}-${to}`] || 100000
  const perKg = type === 'ftl' ? 15 : type === 'ltl' ? 25 : 40
  const byWeight = weight * perKg
  const multiplier = type === 'express' ? 1.5 : 1
  return Math.round(Math.max(base, byWeight) * multiplier)
}

export default function CalculatorSection() {
  const { t } = useTranslation()
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [weight, setWeight] = useState('')
  const [type, setType] = useState('ltl')
  const [result, setResult] = useState<number | null>(null)
  const [calculated, setCalculated] = useState(false)

  const handleCalc = () => {
    const price = calcPrice(from, to, Number(weight), type)
    setResult(price)
    setCalculated(true)
  }

  const inputClass = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.07] transition-all"
  const labelClass = "block text-xs font-medium text-gray-400 mb-1.5"

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="w-14 h-14 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-5">
              <Calculator className="w-7 h-7 text-brand-400" />
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              {t('calculator.title')}
            </h2>
            <p className="text-gray-400">{t('calculator.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>{t('calculator.from')}</label>
                <select value={from} onChange={e => setFrom(e.target.value)} className={inputClass}>
                  <option value="">—</option>
                  {CITIES.map(c => (
                    <option key={c} value={c}>{t(`routes.cities.${c}`)}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>{t('calculator.to')}</label>
                <select value={to} onChange={e => setTo(e.target.value)} className={inputClass}>
                  <option value="">—</option>
                  {CITIES.filter(c => c !== from).map(c => (
                    <option key={c} value={c}>{t(`routes.cities.${c}`)}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className={labelClass}>{t('calculator.weight')}</label>
                <input
                  type="number"
                  value={weight}
                  onChange={e => setWeight(e.target.value)}
                  placeholder="1000"
                  min={1}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>{t('calculator.type')}</label>
                <select value={type} onChange={e => setType(e.target.value)} className={inputClass}>
                  <option value="ftl">{t('calculator.type_ftl')}</option>
                  <option value="ltl">{t('calculator.type_ltl')}</option>
                  <option value="express">{t('calculator.type_express')}</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleCalc}
              disabled={!from || !to || !weight}
              className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/30 disabled:cursor-not-allowed text-white font-semibold transition-all duration-200"
            >
              {t('calculator.calculate')}
            </button>

            {calculated && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-5 p-5 rounded-xl bg-brand-500/10 border border-brand-500/20"
              >
                {result ? (
                  <>
                    <div className="text-xs text-brand-400 mb-1">{t('calculator.result')}</div>
                    <div className="text-3xl font-display font-black text-white mb-1">
                      от {result.toLocaleString('ru-RU')} ₸
                    </div>
                    <p className="text-xs text-gray-500 mb-4">{t('calculator.disclaimer')}</p>
                    <Link
                      to="/contacts"
                      className="inline-flex items-center gap-2 text-sm text-brand-400 hover:text-brand-300 font-medium"
                    >
                      {t('calculator.order_now')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </>
                ) : (
                  <p className="text-gray-400 text-sm">Маршрут не найден. Позвоните нам для индивидуального расчёта.</p>
                )}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
