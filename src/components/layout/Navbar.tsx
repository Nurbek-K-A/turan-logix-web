import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, User, LogOut, ChevronDown, Truck } from 'lucide-react'
import { useThemeStore, useAuthStore } from '@/store'
import { SUPPORTED_LANGUAGES } from '@/i18n'
import i18n from '@/i18n'
import clsx from 'clsx'

export default function Navbar() {
  const { t } = useTranslation()
  const { theme, toggle } = useThemeStore()
  const { isAuthenticated, user, logout } = useAuthStore()
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/routes', label: t('nav.routes') },
    { to: '/about', label: t('nav.about') },
    { to: '/contacts', label: t('nav.contacts') },
    { to: '/chat', label: t('nav.cabinet') === t('nav.cabinet') ? 'AI Chat' : '' },
  ]

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === i18n.language) || SUPPORTED_LANGUAGES[0]

  const handleLangChange = (code: string) => {
    i18n.changeLanguage(code)
    localStorage.setItem('turanlogix-lang', code)
    setLangOpen(false)
  }

  return (
    <header className={clsx(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
      scrolled
        ? 'bg-navy-900/95 dark:bg-navy-900/95 backdrop-blur-md shadow-lg border-b border-white/5'
        : 'bg-transparent'
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-lg bg-brand-500 flex items-center justify-center shadow-glow-orange group-hover:shadow-glow-orange-lg transition-shadow">
              <Truck className="w-5 h-5 text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-display font-bold text-white text-lg tracking-tight">TuranLogix</span>
              <span className="text-[10px] text-brand-400 font-medium tracking-wider uppercase">Logistics</span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map(link => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => clsx(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                  isActive
                    ? 'text-brand-400 bg-brand-500/10'
                    : 'text-gray-300 hover:text-white hover:bg-white/5'
                )}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Language switcher */}
            <div className="relative hidden sm:block">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              >
                {currentLang.label}
                <ChevronDown className={clsx('w-3 h-3 transition-transform', langOpen && 'rotate-180')} />
              </button>
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full right-0 mt-1 bg-navy-800 border border-white/10 rounded-xl shadow-card-dark overflow-hidden min-w-[120px]"
                  >
                    {SUPPORTED_LANGUAGES.map(lang => (
                      <button
                        key={lang.code}
                        onClick={() => handleLangChange(lang.code)}
                        className={clsx(
                          'w-full flex items-center gap-2 px-4 py-2.5 text-sm transition-colors',
                          lang.code === i18n.language
                            ? 'text-brand-400 bg-brand-500/10'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        )}
                      >
                        <span className="font-medium">{lang.label}</span>
                        <span className="text-xs text-gray-500">{lang.full}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Theme toggle */}
            <button
              onClick={toggle}
              className="p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-all"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Auth */}
            {isAuthenticated ? (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/cabinet"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all"
                >
                  <User className="w-4 h-4" />
                  <span className="hidden md:inline max-w-[100px] truncate">{user?.fullName?.split(' ')[0]}</span>
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition-colors"
                >
                  {t('nav.login')}
                </Link>
                <Link
                  to="/orders"
                  className="px-4 py-2 rounded-xl bg-brand-500 hover:bg-brand-600 text-white text-sm font-semibold shadow-glow-orange hover:shadow-glow-orange-lg transition-all duration-200"
                >
                  {t('nav.order')}
                </Link>
              </div>
            )}

            {/* Mobile burger */}
            <button
              onClick={() => setOpen(!open)}
              className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5"
            >
              {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-navy-800/98 backdrop-blur-md border-t border-white/5"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map(link => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) => clsx(
                    'flex items-center px-4 py-3 rounded-xl text-sm font-medium transition-all',
                    isActive ? 'text-brand-400 bg-brand-500/10' : 'text-gray-300 hover:text-white hover:bg-white/5'
                  )}
                >
                  {link.label}
                </NavLink>
              ))}

              {/* Mobile lang switcher */}
              <div className="flex gap-2 pt-2">
                {SUPPORTED_LANGUAGES.map(lang => (
                  <button
                    key={lang.code}
                    onClick={() => handleLangChange(lang.code)}
                    className={clsx(
                      'px-3 py-1.5 rounded-lg text-xs font-medium transition-all',
                      lang.code === i18n.language
                        ? 'bg-brand-500 text-white'
                        : 'bg-white/5 text-gray-400 hover:text-white'
                    )}
                  >
                    {lang.label}
                  </button>
                ))}
              </div>

              <div className="flex gap-2 pt-1">
                {isAuthenticated ? (
                  <>
                    <Link to="/cabinet" className="flex-1 py-3 text-center rounded-xl bg-white/5 text-sm text-gray-300">
                      {t('nav.cabinet')}
                    </Link>
                    <button onClick={logout} className="px-4 py-3 rounded-xl bg-red-500/10 text-red-400 text-sm">
                      <LogOut className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="flex-1 py-3 text-center rounded-xl bg-white/5 text-sm text-gray-300">
                      {t('nav.login')}
                    </Link>
                    <Link to="/orders" className="flex-1 py-3 text-center rounded-xl bg-brand-500 text-white text-sm font-semibold">
                      {t('nav.order')}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
