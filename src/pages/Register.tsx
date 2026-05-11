import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Truck } from 'lucide-react'
import { useAuthStore } from '@/store'
import { authApi } from '@/services/api'
import toast from 'react-hot-toast'

export default function Register() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setAuth } = useAuthStore()
  const [form, setForm] = useState({
    fullName: '', email: '', phoneNumber: '', password: '', companyName: '', bin: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const { data } = await authApi.register({
        ...form,
        companyName: form.companyName || undefined,
        bin: form.bin || undefined,
      })
      setAuth(data.user, data.token)
      toast.success('Аккаунт создан!')
      navigate('/cabinet')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { message?: string } } })?.response?.data?.message
      toast.error(msg || t('errors.server_error'))
    } finally {
      setLoading(false)
    }
  }

  const f = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(p => ({ ...p, [field]: e.target.value }))

  const inputClass = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-all"

  return (
    <>
      <Helmet><title>Регистрация — TuranLogix</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4 pt-20 pb-10">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6">
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center">
                <Truck className="w-5 h-5 text-white" />
              </div>
              <span className="font-display font-bold text-white text-xl">TuranLogix</span>
            </Link>
            <h1 className="font-display text-2xl font-bold text-white mb-2">{t('auth.register')}</h1>
          </div>

          <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.full_name')}</label>
                  <input type="text" value={form.fullName} onChange={f('fullName')} placeholder="Иванов Иван Иванович" required className={inputClass} autoComplete="name" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.email')}</label>
                  <input type="email" value={form.email} onChange={f('email')} placeholder="email@mail.com" required className={inputClass} autoComplete="email" />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.phone')}</label>
                  <input type="tel" value={form.phoneNumber} onChange={f('phoneNumber')} placeholder="+7..." required className={inputClass} />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.password')}</label>
                  <input type="password" value={form.password} onChange={f('password')} placeholder="Минимум 8 символов" minLength={8} required className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.company')}</label>
                  <input type="text" value={form.companyName} onChange={f('companyName')} placeholder="ТОО Компания" className={inputClass} />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1.5">{t('auth.bin')}</label>
                  <input type="text" value={form.bin} onChange={f('bin')} placeholder="000000000000" maxLength={12} className={inputClass} />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/50 text-white font-semibold transition-all mt-2"
              >
                {loading ? 'Создаём аккаунт...' : t('auth.submit_register')}
              </button>
            </form>

            <p className="text-center text-sm text-gray-500 mt-5">
              {t('auth.have_account')}{' '}
              <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">
                {t('auth.login')}
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </>
  )
}
