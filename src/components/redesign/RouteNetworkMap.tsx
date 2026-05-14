import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

type LangKey = 'ru' | 'kz' | 'en'

interface City {
  id: string
  ru: string
  kz: string
  en: string
  x: number
  y: number
  kind: 'hub' | 'city' | 'foreign'
  anchor: 'start' | 'middle' | 'end'
}

const CITIES: City[] = [
  { id: 'mow', ru: 'Москва',    kz: 'Мәскеу',    en: 'Moscow',    x:  70, y: 100, kind: 'foreign', anchor: 'start' },
  { id: 'atr', ru: 'Атырау',   kz: 'Атырау',    en: 'Atyrau',    x: 240, y: 295, kind: 'city',    anchor: 'middle' },
  { id: 'akt', ru: 'Актобе',   kz: 'Ақтөбе',    en: 'Aktobe',    x: 340, y: 215, kind: 'city',    anchor: 'middle' },
  { id: 'ast', ru: 'Астана',   kz: 'Астана',    en: 'Astana',    x: 600, y: 175, kind: 'hub',     anchor: 'middle' },
  { id: 'krg', ru: 'Қарағанды',kz: 'Қарағанды', en: 'Karaganda', x: 660, y: 245, kind: 'city',    anchor: 'start' },
  { id: 'shy', ru: 'Шымкент',  kz: 'Шымкент',   en: 'Shymkent',  x: 580, y: 415, kind: 'city',    anchor: 'middle' },
  { id: 'alm', ru: 'Алматы',   kz: 'Алматы',    en: 'Almaty',    x: 720, y: 395, kind: 'hub',     anchor: 'start' },
  { id: 'urm', ru: 'Урумчи',   kz: 'Үрімші',    en: 'Urumqi',    x: 920, y: 380, kind: 'foreign', anchor: 'end' },
]

const cityById = Object.fromEntries(CITIES.map(c => [c.id, c]))

const ROUTES_GEO: [string, string, 'regular' | 'seasonal', string | null][] = [
  ['alm', 'ast', 'regular',  '1220 км · 2д'],
  ['alm', 'shy', 'regular',  '700 км · 1д'],
  ['ast', 'krg', 'regular',  '215 км · 1д'],
  ['urm', 'alm', 'regular',  '850 км · 3д'],
  ['mow', 'ast', 'regular',  '2800 км · 5д'],
  ['alm', 'akt', 'regular',  '1850 км · 3д'],
  ['atr', 'akt', 'seasonal', null],
  ['shy', 'ast', 'seasonal', null],
]

function Swatch({ kind }: { kind: 'regular' | 'seasonal' | 'hub' }) {
  if (kind === 'hub') {
    return (
      <span style={{ position: 'relative', width: 14, height: 14, display: 'inline-block' }}>
        <span style={{ position: 'absolute', inset: 0, borderRadius: '50%', background: 'var(--accent)', opacity: 0.2 }} />
        <span style={{ position: 'absolute', inset: 3, borderRadius: '50%', background: 'var(--accent)' }} />
        <span style={{ position: 'absolute', inset: 5.5, borderRadius: '50%', background: 'var(--bg-alt)' }} />
      </span>
    )
  }
  return (
    <span style={{ width: 22, height: 2, display: 'inline-block' }}>
      <span style={{
        display: 'block',
        height: 2,
        backgroundImage: kind === 'seasonal'
          ? 'repeating-linear-gradient(90deg, var(--muted-deep) 0, var(--muted-deep) 3px, transparent 3px, transparent 6px)'
          : 'repeating-linear-gradient(90deg, var(--accent) 0, var(--accent) 6px, transparent 6px, transparent 10px)',
      }} />
    </span>
  )
}

export default function RouteNetworkMap() {
  const { t } = useTranslation()
  const lang = (i18n.language as LangKey) in { ru: 1, kz: 1, en: 1 } ? (i18n.language as LangKey) : 'ru'
  const rp = t('redesign.routesPage', { returnObjects: true }) as Record<string, string | string[]>
  const legend = rp.mapLegend as string[]

  return (
    <section style={{ padding: '0 40px 32px' }}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg-alt)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
      }}>
        {/* Header strip */}
        <div style={{
          padding: '14px 18px',
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'var(--bg)',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10,
              letterSpacing: '0.18em',
              color: 'var(--muted-deep)',
              textTransform: 'uppercase' as const,
            }}>{rp.mapEyebrow as string}</div>
            <div style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 17,
              color: 'var(--text-bright)',
              marginTop: 2,
              letterSpacing: '-0.01em',
            }}>{rp.mapTitle as string}</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            {(['regular', 'seasonal', 'hub'] as const).map((kind, i) => (
              <div key={kind} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Swatch kind={kind} />
                <span style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--muted)',
                }}>{legend[i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* SVG Map */}
        <div style={{ padding: '12px 12px 18px' }}>
          <svg viewBox="0 0 1000 500" style={{ width: '100%', height: 'auto', display: 'block' }}>
            {/* Grid */}
            <g stroke="var(--border)" strokeWidth="0.6">
              {[0,1,2,3,4,5,6,7,8,9,10].map(i => (
                <line key={`v${i}`} x1={i*100} y1="0" x2={i*100} y2="500" />
              ))}
              {[0,1,2,3,4,5].map(i => (
                <line key={`h${i}`} x1="0" y1={i*100} x2="1000" y2={i*100} />
              ))}
            </g>

            {/* KZ landmass blob */}
            <path
              d="M 180 320 Q 210 230 320 200 Q 460 165 600 165 Q 740 170 820 220 Q 880 270 870 360 Q 800 430 700 430 Q 580 440 470 425 Q 340 410 240 380 Q 175 360 180 320 Z"
              fill="var(--accent)"
              fillOpacity="0.05"
              stroke="var(--accent)"
              strokeOpacity="0.18"
              strokeWidth="1.2"
              strokeDasharray="2 4"
            />

            {/* Compass */}
            <g transform="translate(910, 60)" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-deep)" letterSpacing="0.14em">
              <text x="0" y="0" textAnchor="middle">N</text>
              <line x1="0" y1="6" x2="0" y2="28" stroke="var(--muted-deep)" strokeWidth="0.8" />
              <polygon points="0,6 -3,12 3,12" fill="var(--muted-deep)" />
            </g>

            {/* Scale */}
            <g transform="translate(40, 470)" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="var(--muted-deep)" letterSpacing="0.14em">
              <line x1="0" y1="0" x2="100" y2="0" stroke="var(--muted-deep)" strokeWidth="1" />
              <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--muted-deep)" strokeWidth="1" />
              <line x1="100" y1="-3" x2="100" y2="3" stroke="var(--muted-deep)" strokeWidth="1" />
              <text x="50" y="-6" textAnchor="middle">500 KM</text>
            </g>

            {/* Routes */}
            {ROUTES_GEO.map(([from, to, kind, label], i) => {
              const a = cityById[from]
              const b = cityById[to]
              const isRegular = kind === 'regular'
              return (
                <g key={i}>
                  <line
                    x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                    stroke={isRegular ? 'var(--accent)' : 'var(--muted-deep)'}
                    strokeWidth={isRegular ? 1.8 : 1.2}
                    strokeDasharray={isRegular ? '8 4' : '2 4'}
                    strokeLinecap="round"
                    className={isRegular ? 'route-flow' : 'route-flow-slow'}
                    opacity={isRegular ? 0.85 : 0.55}
                  />
                  {label && isRegular && (
                    <g transform={`translate(${(a.x+b.x)/2}, ${(a.y+b.y)/2 - 8})`}>
                      <rect x="-32" y="-9" width="64" height="16" rx="2"
                            fill="var(--bg)" stroke="var(--border)" strokeWidth="0.6" />
                      <text x="0" y="3" textAnchor="middle"
                            fontFamily="JetBrains Mono, monospace"
                            fontSize="9" fill="var(--muted)"
                            letterSpacing="0.06em">{label}</text>
                    </g>
                  )}
                </g>
              )
            })}

            {/* City markers */}
            {CITIES.map(c => {
              const r = c.kind === 'hub' ? 9 : c.kind === 'foreign' ? 5.5 : 6.5
              const labelX = c.anchor === 'start' ? c.x + 14 : c.anchor === 'end' ? c.x - 14 : c.x
              return (
                <g key={c.id}>
                  {c.kind === 'hub' && (
                    <circle cx={c.x} cy={c.y} r="16" fill="var(--accent)" fillOpacity="0.15" />
                  )}
                  <circle
                    cx={c.x} cy={c.y} r={r}
                    fill={c.kind === 'hub' ? 'var(--accent)' : c.kind === 'foreign' ? 'transparent' : 'var(--text-bright)'}
                    stroke={c.kind === 'foreign' ? 'var(--muted)' : 'none'}
                    strokeWidth={c.kind === 'foreign' ? 1.6 : 0}
                  />
                  {c.kind === 'hub' && (
                    <circle cx={c.x} cy={c.y} r={r - 3.5} fill="var(--bg)" />
                  )}
                  <text
                    x={labelX}
                    y={c.y + (c.kind === 'hub' ? 26 : 22)}
                    textAnchor={c.anchor}
                    fontFamily="Space Grotesk, system-ui, sans-serif"
                    fontWeight={c.kind === 'foreign' ? 500 : 700}
                    fontSize={c.kind === 'hub' ? 15 : 13}
                    fill="var(--text-bright)"
                    letterSpacing="-0.01em"
                  >{c[lang] || c.ru}</text>
                  {c.kind === 'foreign' && (
                    <text
                      x={labelX}
                      y={c.y + 36}
                      textAnchor={c.anchor}
                      fontFamily="JetBrains Mono, monospace"
                      fontSize="9"
                      fill="var(--muted-deep)"
                      letterSpacing="0.16em"
                    >{c.id === 'mow' ? 'RU' : 'CN'}</text>
                  )}
                </g>
              )
            })}
          </svg>
        </div>
      </div>
    </section>
  )
}
