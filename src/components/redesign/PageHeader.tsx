import type { ReactNode } from 'react'

interface PageHeaderProps {
  eyebrow: string
  title: ReactNode
  accentTitle?: string
  subtitle?: string
}

export function PageHeader({ eyebrow, title, accentTitle, subtitle }: PageHeaderProps) {
  return (
    <section style={{ padding: '52px 40px 36px', borderBottom: '1px solid var(--border)' }}>
      <span style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 11px 5px 9px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid color-mix(in srgb, var(--accent) 27%, transparent)',
        background: 'var(--accent-soft)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10.5,
        letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
        color: 'var(--accent)',
      }}>
        {eyebrow}
      </span>
      <h1 style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 60,
        letterSpacing: '-0.03em',
        color: 'var(--text-bright)',
        margin: '16px 0 0',
        lineHeight: 1.0,
      }}>
        {title}{' '}
        {accentTitle && (
          <span style={{
            fontFamily: "'Instrument Serif', serif",
            fontStyle: 'italic',
            fontWeight: 400,
            color: 'var(--accent)',
          }}>
            {accentTitle}
          </span>
        )}
      </h1>
      {subtitle && (
        <p style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          fontSize: 16,
          color: 'var(--muted)',
          marginTop: 14,
          maxWidth: 640,
          lineHeight: 1.6,
        }}>
          {subtitle}
        </p>
      )}
    </section>
  )
}
