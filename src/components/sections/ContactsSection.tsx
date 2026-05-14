import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Phone, Mail, MapPin, MessageCircle, Send, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

export default function ContactsSection() {
  const { t } = useTranslation()
  const [form, setForm] = useState({ name: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSending(true)
    // TODO: integrate with API
    await new Promise(r => setTimeout(r, 1000))
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.')
    setForm({ name: '', phone: '', message: '' })
    setSending(false)
  }

  const inputClass = "w-full bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/50 transition-all"

  return (
    <section className="py-20 lg:py-28 bg-navy-800/50 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
            {t('contacts.title')}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            {[
              { icon: Phone, label: t('contacts.phone'), value: '+7 700 123 45 67', href: 'tel:+77001234567' },
              { icon: MessageCircle, label: 'WhatsApp', value: '+7 700 123 45 67', href: 'https://wa.me/77001234567' },
              { icon: Send, label: 'Telegram', value: '@turanlogix', href: 'https://t.me/turanlogix' },
              { icon: Mail, label: t('contacts.email'), value: 'info@turanlogix.kz', href: 'mailto:info@turanlogix.kz' },
              { icon: MapPin, label: t('contacts.address'), value: 'Алматы, Казахстан', href: null },
              { icon: Clock, label: t('contacts.working_hours'), value: t('contacts.hours'), href: null },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-brand-400" />
                </div>
                <div>
                  <div className="text-xs text-gray-500 mb-0.5">{item.label}</div>
                  {item.href ? (
                    <a href={item.href} className="text-white text-sm hover:text-brand-400 transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <span className="text-white text-sm">{item.value}</span>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Contact form */}
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-6 sm:p-8 space-y-4"
          >
            <h3 className="text-white font-semibold text-lg mb-1">{t('contacts.send_message')}</h3>

            <div>
              <input
                type="text"
                value={form.name}
                onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                placeholder="Ваше имя"
                required
                className={inputClass}
              />
            </div>
            <div>
              <input
                type="tel"
                value={form.phone}
                onChange={e => setForm(p => ({ ...p, phone: e.target.value }))}
                placeholder="+7 (___) ___-__-__"
                required
                className={inputClass}
              />
            </div>
            <div>
              <textarea
                value={form.message}
                onChange={e => setForm(p => ({ ...p, message: e.target.value }))}
                placeholder="Опишите ваш груз или задайте вопрос..."
                rows={4}
                required
                className={`${inputClass} resize-none`}
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="w-full py-3.5 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/50 text-white font-semibold transition-all duration-200"
            >
              {sending ? 'Отправляем...' : t('contacts.send_message')}
            </button>
            <p className="text-xs text-gray-600 text-center">
              Нажимая кнопку, вы соглашаетесь с обработкой персональных данных
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}
