import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { PageHeader } from '@/components/redesign/PageHeader'

export default function About() {
  const { t } = useTranslation()
  const ap = t('redesign.aboutPage', { returnObjects: true }) as Record<string, string>

  return (
    <>
      <Helmet><title>{t('nav.about')} — Turan Logix</title></Helmet>
      <PageHeader
        eyebrow={ap.eyebrow}
        title={ap.title}
        accentTitle={ap.accentTitle}
        subtitle={ap.subtitle}
      />
      <section style={{ padding: '40px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 48,
          alignItems: 'start',
          maxWidth: 1320,
          margin: '0 auto',
        }}>
          <div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: 'var(--pop)',
              letterSpacing: '0.2em',
              textTransform: 'uppercase' as const,
            }}>{ap.sectionEyebrow}</div>
            <h2 style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 34,
              letterSpacing: '-0.025em',
              color: 'var(--text-bright)',
              margin: '8px 0 0',
              lineHeight: 1.05,
            }}>{t('redesign.aiTagline')}.</h2>
          </div>
          <div>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 16, lineHeight: 1.65, color: 'var(--muted)', margin: 0 }}>
              {ap.para1}
            </p>
            <p style={{ fontFamily: "'Inter', system-ui, sans-serif", fontSize: 16, lineHeight: 1.65, color: 'var(--muted)', marginTop: 14 }}>
              {ap.para2}
            </p>
          </div>
        </div>
      </section>
    </>
  )
}
