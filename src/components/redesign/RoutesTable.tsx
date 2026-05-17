import { useTranslation } from 'react-i18next'

const ROUTES_TABLE: [string, string, string, string, string, boolean][] = [
  ['Алматы', 'Астана',    '1 220 км', '2 дн.', 'от 285 000 ₸', true],
  ['Алматы', 'Шымкент',   '700 км',   '1 дн.', 'от 180 000 ₸', false],
  ['Астана', 'Қарағанды', '215 км',   '1 дн.', 'от 95 000 ₸',  false],
  ['Урумчи', 'Алматы',    '850 км',   '3 дн.', 'от 420 000 ₸', false],
  ['Москва', 'Астана',    '2 800 км', '5 дн.', 'от 620 000 ₸', false],
  ['Алматы', 'Ақтөбе',    '1 850 км', '3 дн.', 'от 340 000 ₸', false],
]

export default function RoutesTable() {
  const { t } = useTranslation()
  const rp = t('redesign.routesPage', { returnObjects: true }) as Record<string, string>

  const mono = {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'var(--muted-deep)',
  }

  return (
    <section className="routes-table-section" style={{ padding: '32px 40px 48px' }}>
      <div style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        marginBottom: 20,
      }}>
        <div>
          <h2 style={{
            fontFamily: "'Space Grotesk', system-ui, sans-serif",
            fontWeight: 700,
            fontSize: 32,
            letterSpacing: '-0.025em',
            color: 'var(--text-bright)',
            margin: '8px 0 0',
            lineHeight: 1.05,
          }}>{rp.tableTitle}</h2>
        </div>
      </div>

      <div className="routes-table-scroll">
      <div className="routes-table-inner" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {/* Header row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1.4fr 1.4fr 1fr 0.8fr 1.2fr 0.4fr',
          padding: '12px 20px',
          background: 'var(--surface)',
          ...mono,
        }}>
          <span>{rp.tableFrom}</span>
          <span>{rp.tableTo}</span>
          <span>{rp.tableDist}</span>
          <span>{rp.tableDays}</span>
          <span>{rp.tablePrice}</span>
          <span />
        </div>

        {ROUTES_TABLE.map((r, i) => (
          <div key={i} style={{
            display: 'grid',
            gridTemplateColumns: '1.4fr 1.4fr 1fr 0.8fr 1.2fr 0.4fr',
            padding: '14px 20px',
            alignItems: 'center',
            borderTop: '1px solid var(--border)',
            background: r[5] ? 'var(--accent-soft)' : 'transparent',
          }}>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-bright)' }}>{r[0]}</span>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14, color: 'var(--text-bright)', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontFamily: "'JetBrains Mono', monospace", color: r[5] ? 'var(--accent)' : 'var(--muted-deep)', fontSize: 12 }}>→</span>{r[1]}
            </span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: 'var(--muted)' }}>{r[2]}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12.5, color: 'var(--muted)' }}>{r[3]}</span>
            <span style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 600, fontSize: 14, color: r[5] ? 'var(--accent)' : 'var(--text)' }}>{r[4]}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: r[5] ? 'var(--accent)' : 'var(--muted-deep)', textAlign: 'right' }}>→</span>
          </div>
        ))}
      </div>
      </div>
    </section>
  )
}
