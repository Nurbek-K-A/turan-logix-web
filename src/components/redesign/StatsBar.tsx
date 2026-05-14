import { useTranslation } from 'react-i18next'

export default function StatsBar() {
  const { t } = useTranslation()
  const items = t('redesign.secStatsExtra', { returnObjects: true }) as [string, string][]

  return (
    <section style={{
      padding: '32px 40px',
      borderTop: '1px solid var(--border)',
      borderBottom: '1px solid var(--border)',
      background: 'var(--bg-alt)',
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 0,
    }}>
      {items.map(([v, l], i) => (
        <div key={i} style={{
          padding: '6px 22px',
          borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
        }}>
          <div style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 36,
            color: 'var(--text-bright)',
            letterSpacing: '-0.02em',
          }}>{v}</div>
          <div style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: 'var(--muted-deep)',
            marginTop: 4,
          }}>{l}</div>
        </div>
      ))}
    </section>
  )
}
