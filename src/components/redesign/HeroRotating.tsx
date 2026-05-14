import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import i18n from '@/i18n'

function HeroRouteCard() {
  return (
    <div style={{
      background: 'var(--bg-alt)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: 24,
      boxShadow: '0 12px 32px rgba(20,17,13,0.06)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 9.5,
          letterSpacing: '0.18em',
          textTransform: 'uppercase' as const,
          color: 'var(--muted-deep)',
        }}>Маршрут №К-2841</span>
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          letterSpacing: '0.14em',
          color: 'var(--accent)',
          padding: '3px 8px',
          border: '1px solid color-mix(in srgb, var(--accent) 33%, transparent)',
          borderRadius: 'var(--radius-sm)',
          textTransform: 'uppercase' as const,
        }}>В пути</span>
      </div>

      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)' }} />
          <div style={{ flex: 1, width: 1, background: 'var(--border-strong)', margin: '4px 0', minHeight: 58 }} />
          <div style={{ width: 10, height: 10, borderRadius: 2, background: 'var(--text)' }} />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--muted-deep)' }}>Откуда</div>
          <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 22, fontWeight: 600, color: 'var(--text-bright)', marginTop: 2 }}>Алматы</div>
          <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>склад · ул. Райымбека 348</div>
          <div style={{ marginTop: 14, fontFamily: "'JetBrains Mono', monospace", fontSize: 9.5, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--muted-deep)' }}>Куда</div>
          <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 22, fontWeight: 600, color: 'var(--text-bright)', marginTop: 2 }}>Астана</div>
          <div style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 12.5, color: 'var(--muted)', marginTop: 2 }}>~1 220 км · 2 дня</div>
        </div>
      </div>

      <div style={{ height: 1, background: 'var(--border)', margin: '18px 0' }} />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
        {[['Вес', '4.2 т'], ['Объём', '14 м³'], ['Тип', 'FTL']].map(([k, v]) => (
          <div key={k}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--muted-deep)' }}>{k}</div>
            <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 16, fontWeight: 600, color: 'var(--text-bright)', marginTop: 4 }}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{
        marginTop: 18,
        padding: '14px 16px',
        borderRadius: 'var(--radius-md)',
        background: 'var(--accent-soft)',
        border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: '0.18em', textTransform: 'uppercase' as const, color: 'var(--accent)' }}>Стоимость</div>
          <div style={{ fontFamily: "'Space Grotesk', system-ui, sans-serif", fontSize: 24, fontWeight: 700, color: 'var(--text-bright)' }}>от 285 000 ₸</div>
        </div>
        <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 14, color: 'var(--accent)' }}>→</div>
      </div>
    </div>
  )
}

export default function HeroRotating() {
  const { t } = useTranslation()
  const lang = i18n.language

  const words: string[] = t('redesign.heroRotating', { returnObjects: true }) as string[]
  const [idx, setIdx] = useState(0)
  const [phase, setPhase] = useState<'in' | 'out'>('in')

  useEffect(() => {
    setIdx(0)
    setPhase('in')
  }, [lang])

  useEffect(() => {
    const cycle = setInterval(() => {
      setPhase('out')
      setTimeout(() => {
        setIdx(i => (i + 1) % words.length)
        setPhase('in')
      }, 380)
    }, 2400)
    return () => clearInterval(cycle)
  }, [lang, words.length])

  const longest = words.reduce((a, b) => (a.length > b.length ? a : b), '')

  return (
    <section style={{ position: 'relative', padding: '64px 40px 56px', overflow: 'hidden' }}>
      {/* bg grid */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 30% 50%, black 20%, transparent 75%)',
        pointerEvents: 'none',
      }} />
      {/* accent glow */}
      <div style={{
        position: 'absolute',
        top: -120,
        right: -80,
        width: 540,
        height: 540,
        borderRadius: '50%',
        background: 'radial-gradient(closest-side, color-mix(in srgb, var(--accent) 12%, transparent), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1.4fr 1fr',
        gap: 56,
        alignItems: 'center',
        maxWidth: 1320,
        margin: '0 auto',
      }}>
        {/* Left column */}
        <div>
          {/* AI eyebrow */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '7px 14px 7px 10px',
            borderRadius: 'var(--radius-pill)',
            border: '1px solid color-mix(in srgb, var(--accent) 27%, transparent)',
            background: 'var(--accent-soft)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: 10.5,
            letterSpacing: '0.18em',
            textTransform: 'uppercase' as const,
            color: 'var(--accent-deep)',
            marginBottom: 24,
          }}>
            <span style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'var(--accent)',
              boxShadow: '0 0 0 4px color-mix(in srgb, var(--accent) 13%, transparent)',
              flexShrink: 0,
            }} />
            {t('redesign.aiTagline')}
          </div>

          <h1
            aria-live="polite"
            style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 78,
              lineHeight: 0.98,
              letterSpacing: '-0.03em',
              color: 'var(--text-bright)',
              margin: 0,
            }}
          >
            <span style={{ display: 'block' }}>{t('redesign.heroFixed1')}</span>
            <span style={{
              display: 'inline-block',
              position: 'relative',
              minHeight: '0.95em',
              color: 'var(--accent)',
              fontFamily: "'Instrument Serif', serif",
              fontStyle: 'italic',
              fontWeight: 400,
            }}>
              <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }}>{longest}</span>
              <span
                key={idx + phase}
                className={phase === 'in' ? 'word-in' : 'word-out'}
                style={{ position: 'absolute', left: 0, top: 0, whiteSpace: 'nowrap', display: 'inline-block' }}
                aria-live="polite"
              >
                {words[idx]}
              </span>
            </span>
            <span style={{ display: 'block' }}>{t('redesign.heroFixed2')}</span>
          </h1>

          <p style={{
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 16,
            lineHeight: 1.6,
            color: 'var(--muted)',
            maxWidth: 520,
            marginTop: 22,
          }}>
            {t('redesign.heroBody')}
          </p>

          <div style={{ display: 'flex', gap: 12, marginTop: 30, alignItems: 'center', flexWrap: 'wrap' }}>
            <Link
              to="/contacts"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontWeight: 600,
                fontSize: 14,
                padding: '13px 22px',
                borderRadius: 'var(--radius-md)',
                background: 'var(--accent)',
                color: 'var(--on-accent)',
                textDecoration: 'none',
              }}
            >
              {t('redesign.heroCTA1')}
              <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>→</span>
            </Link>

            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              padding: '5px 11px 5px 9px',
              borderRadius: 'var(--radius-pill)',
              border: '1px solid var(--border)',
              background: 'var(--surface)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: '0.16em',
              textTransform: 'uppercase' as const,
              color: 'var(--muted)',
            }}>
              <span style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: 'var(--signal)',
                boxShadow: '0 0 0 3px color-mix(in srgb, var(--signal) 20%, transparent)',
                flexShrink: 0,
              }} />
              {t('redesign.statusLine')}
            </span>
          </div>

          {/* Stat rail */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 0,
            marginTop: 40,
            paddingTop: 26,
            borderTop: '1px solid var(--border)',
            maxWidth: 560,
          }}>
            {(t('redesign.stats', { returnObjects: true }) as [string, string][]).map(([v, l], i) => (
              <div key={i} style={{
                padding: '0 22px',
                borderLeft: i === 0 ? 'none' : '1px solid var(--border)',
              }}>
                <div style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 700,
                  fontSize: 32,
                  color: 'var(--text-bright)',
                  letterSpacing: '-0.02em',
                  lineHeight: 1,
                }}>{v}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 9.5,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--muted-deep)',
                  marginTop: 6,
                }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right card */}
        <HeroRouteCard />
      </div>
    </section>
  )
}
