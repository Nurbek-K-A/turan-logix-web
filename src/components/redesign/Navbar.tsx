import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'
import { useThemeStore } from '@/store'
import { LogoWordmark } from './Logo'
import { LangSwitcher } from './LangSwitcher'

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

function HamburgerIcon({ open }: { open: boolean }) {
  return open ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
      <line x1="3" y1="7" x2="21" y2="7"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="17" x2="21" y2="17"/>
    </svg>
  )
}

export default function RedesignNavbar() {
  const { t } = useTranslation()
  const lang = i18n.language
  const { theme, toggle } = useThemeStore()
  const [menuOpen, setMenuOpen] = useState(false)

  const navLinks = [
    { to: '/',         label: t('nav.home') },
    { to: '/services', label: t('nav.services') },
    { to: '/routes',   label: t('nav.routes') },
    { to: '/about',    label: t('nav.about') },
    { to: '/contacts', label: t('nav.contacts') },
  ]

  const closeMenu = () => setMenuOpen(false)

  return (
    <>
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
          background: 'var(--bg-alt)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        <Link to="/" onClick={closeMenu} aria-label="Turan Logix — главная" style={{ textDecoration: 'none' }}>
          <LogoWordmark subtitle={t('redesign.logoSubtitle')} size="sm" />
        </Link>

        {/* Desktop nav */}
        <nav className="rdn-nav" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
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

        {/* Desktop controls */}
        <div className="rdn-controls" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <LangSwitcher lang={lang} />
          <button
            onClick={toggle}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
            style={{
              width: 32, height: 32,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
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
              fontSize: 13, color: 'var(--muted)',
              padding: '8px 6px', textDecoration: 'none',
            }}
          >
            {t('redesign.login')}
          </Link>
          <Link
            to="/contacts"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600, fontSize: 12.5,
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

        {/* Mobile hamburger */}
        <button
          className="rdn-hamburger"
          onClick={() => setMenuOpen(o => !o)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          style={{
            display: 'none', /* overridden by CSS media query */
            alignItems: 'center', justifyContent: 'center',
            width: 36, height: 36,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--text)',
            cursor: 'pointer',
          }}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </header>

      {/* Mobile menu drawer */}
      {menuOpen && (
        <div
          style={{
            position: 'fixed',
            top: 61,
            left: 0,
            right: 0,
            zIndex: 39,
            background: 'var(--bg-alt)',
            borderBottom: '1px solid var(--border)',
            padding: '12px 16px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            backdropFilter: 'blur(10px)',
            WebkitBackdropFilter: 'blur(10px)',
          }}
        >
          {navLinks.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              onClick={closeMenu}
              style={({ isActive }) => ({
                border: 'none',
                background: isActive ? 'var(--surface-hover)' : 'transparent',
                fontFamily: "'Inter', system-ui, sans-serif",
                fontSize: 15,
                fontWeight: 500,
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                color: isActive ? 'var(--text-bright)' : 'var(--muted)',
                cursor: 'pointer',
                textDecoration: 'none',
                display: 'block',
              })}
            >
              {label}
            </NavLink>
          ))}

          <div style={{ height: 1, background: 'var(--border)', margin: '8px 0' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 0' }}>
            <LangSwitcher lang={lang} />
            <button
              onClick={toggle}
              aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              style={{
                width: 32, height: 32,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                borderRadius: 'var(--radius-sm)',
                border: '1px solid var(--border)',
                background: 'var(--surface)',
                color: 'var(--muted)',
                cursor: 'pointer',
              }}
            >
              {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            </button>
          </div>

          <Link
            to="/contacts"
            onClick={closeMenu}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600, fontSize: 14,
              padding: '11px 20px',
              borderRadius: 'var(--radius-md)',
              background: 'var(--accent)',
              color: 'var(--on-accent)',
              textDecoration: 'none',
              marginTop: 4,
            }}
          >
            {t('redesign.cta')}
            <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>→</span>
          </Link>
        </div>
      )}
    </>
  )
}
