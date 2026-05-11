import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Truck } from 'lucide-react'
import { useAuthStore } from '@/store'
import { authApi } from '@/services/api'
import toast from 'react-hot-toast'

export default function Login() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authApi.login(form)
      setAuth(data.user, data.token)
      toast.success('Добро пожаловать!')
      navigate('/cabinet')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(msg || t('errors.server_error'))
    } finally {
      setLoading(false)
    }
  }

  const inputClass = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/50 focus:bg-white/[0.07] transition-all"

  return (
    <>
      <Helmet>
        <title>Вход — TuranLogix</title>
      </Helmet>

      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-xl">TuranLogix</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-white mb-2">{t('auth.login')}</h1>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1.5">{t('auth.email')}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
                  placeholder="your@email.com"
                  required
                  autoComplete="email"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1.5">{t('auth.password')}</label>
                <div className="relative">
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                    className={`${inputClass} pr-12`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                  >
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/50 text-white font-semibold transition-all mt-2"
              >
                {loading ? 'Входим...' : t('auth.submit_login')}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              {t('auth.no_account')}{' '}
              <Link to="/register" className="text-brand-400 hover:text-brand-300 font-medium">
                {t('auth.register')}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}
