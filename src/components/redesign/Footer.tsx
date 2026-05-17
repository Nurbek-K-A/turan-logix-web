import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { LogoMark } from './Logo'

export default function RedesignFooter() {
  const { t } = useTranslation()

  const links = [
    { to: '/services', label: t('nav.services') },
    { to: '/routes',   label: t('nav.routes') },
    { to: '/about',    label: t('nav.about') },
    { to: '/contacts', label: t('nav.contacts') },
  ]

  return (
    <footer className="footer-inner" style={{
      padding: '28px 40px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      background: 'var(--bg-alt)',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <LogoMark size={28} radius={0.16} />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 11,
          color: 'var(--muted-deep)',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          {t('redesign.legalLine')}
        </span>
      </div>

      <nav style={{ display: 'flex', gap: 22 }}>
        {links.map(({ to, label }) => (
          <Link
            key={to}
            to={to}
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 12.5,
              color: 'var(--muted)',
              textDecoration: 'none',
            }}
          >
            {label}
          </Link>
        ))}
      </nav>
    </footer>
  )
}
