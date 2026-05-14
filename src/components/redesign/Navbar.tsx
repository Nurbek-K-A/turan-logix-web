import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { LogoWordmark } from './Logo'
import { LangSwitcher } from './LangSwitcher'

export default function RedesignNavbar() {
  const { t } = useTranslation()
  const lang = i18n.language

  const navLinks = [
    { to: '/',         label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/routes',   label: t('nav.routes') },
    { to: '/about',    label: t('nav.about') },
    { to: '/contacts', label: t('nav.contacts') },
  ]

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 40px',
      borderBottom: '1px solid var(--border)',
      background: 'var(--navbar-bg, rgba(244,237,225,0.82))',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
    }}>
      <style>{`
        .dark header.rdn { --navbar-bg: rgba(20,17,13,0.78) !important; }
        header.rdn { --navbar-bg: rgba(244,237,225,0.82); }
      `}</style>

      <Link to="/" aria-label="Turan Logix — главная">
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

      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <LangSwitcher lang={lang} />
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
