import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { useThemeStore } from '@/store'
import { LogoWordmark } from './Logo'
import { LangSwitcher } from './LangSwitcher'

/* Sun / Moon icons as tiny inline SVGs to avoid lucide-react dependency issues */
function SunIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="5"/>
      <line x1="12" y1="1" x2="12" y2="3"/>
      <line x1="12" y1="21" x2="12" y2="23"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
      <line x1="1" y1="12" x2="3" y2="12"/>
      <line x1="21" y1="12" x2="23" y2="12"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
    </svg>
  )
}

export default function RedesignNavbar() {
  const { t } = useTranslation()
  const lang = i18n.language
  const { theme, toggle } = useThemeStore()

  const navLinks = [
    { to: '/',         label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/routes',   label: t('nav.routes') },
    { to: '/about',    label: t('nav.about') },
    { to: '/contacts', label: t('nav.contacts') },
  ]

  return (
    <header
      className="rdn"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '18px 40px',
        borderBottom: '1px solid var(--border)',
        background: theme === 'dark' ? 'rgba(20,17,13,0.82)' : 'rgba(244,237,225,0.82)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
      }}
    >
      <Link to="/" aria-label="Turan Logix — главная" style={{ textDecoration: 'none' }}>
        <LogoWordmark subtitle={t('redesign.logoSubtitle')} size="sm" />
      </Link>

      <nav style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            style={({ isActive }) => ({
              border: 'none',
              background: isActive ? 'var(--surface-hover)' : 'transparent',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13,
              fontWeight: 500,
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              color: isActive ? 'var(--text-bright)' : 'var(--muted)',
              cursor: 'pointer',
              textDecoration: 'none',
              transition: 'background 0.15s, color 0.15s',
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <LangSwitcher lang={lang} />

        {/* Theme toggle */}
        <button
          onClick={toggle}
          aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          style={{
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--muted)',
            cursor: 'pointer',
            transition: 'background 0.15s, color 0.15s',
          }}
        >
          {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
        </button>

        <Link
          to="/login"
          style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: 'var(--muted)',
            padding: '8px 6px',
            textDecoration: 'none',
          }}
        >
          {t('redesign.login')}
        </Link>
        <Link
          to="/contacts"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 600,
            fontSize: 12.5,
            padding: '9px 16px',
            borderRadius: 'var(--radius-md)',
            background: 'var(--accent)',
            color: 'var(--on-accent)',
            textDecoration: 'none',
          }}
        >
          {t('redesign.cta')}
          <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>→</span>
        </Link>
      </div>
    </header>
  )
}
