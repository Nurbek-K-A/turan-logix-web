import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Phone, Mail, MapPin, MessageCircle, Send } from 'lucide-react'
import { TuranLogixLogo } from '@/components/logo'

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-navy-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <TuranLogixLogo variant="dark" size="lg" showTagline={true} />
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-3">
              <a
                href="https://wa.me/77001234567"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://t.me/turanlogix"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 flex items-center justify-center transition-colors"
                aria-label="Telegram"
              >
                <Send className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t('nav.services')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/services', label: 'FTL / LTL' },
                { to: '/services', label: t('services.express.title') },
                { to: '/services', label: t('services.cargo.title') },
                { to: '/routes', label: t('nav.routes') },
                { to: '/chat', label: 'AI Chat' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t('nav.about')}
            </h3>
            <ul className="space-y-2.5">
              {[
                { to: '/about', label: t('nav.about') },
                { to: '/contacts', label: t('nav.contacts') },
                { to: '/login', label: t('nav.login') },
                { to: '/', label: t('footer.privacy') },
                { to: '/', label: t('footer.terms') },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.to}
                    className="text-gray-400 hover:text-brand-400 text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacts */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t('contacts.title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <a href="tel:+77001234567" className="text-gray-400 hover:text-white text-sm transition-colors">
                  +7 700 123 45 67
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <a href="mailto:info@turanlogix.kz" className="text-gray-400 hover:text-white text-sm transition-colors">
                  info@turanlogix.kz
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">Алматы, Казахстан</span>
              </li>
            </ul>
            <div className="mt-4 px-3 py-2 rounded-lg bg-brand-500/10 border border-brand-500/20">
              <p className="text-xs text-brand-400">{t('contacts.hours')}</p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            {t('footer.copyright', { year })}
          </p>
          <p className="text-gray-600 text-xs">
            {t('footer.company')} · БИН: 000000000000
          </p>
        </div>
      </div>
    </footer>
  )
}
