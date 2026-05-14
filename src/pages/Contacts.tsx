import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { PageHeader } from '@/components/redesign/PageHeader'

export default function Contacts() {
  const { t } = useTranslation()
  const cp = t('redesign.contactsPage', { returnObjects: true }) as Record<string, string>

  const contactItems = [
    [cp.phone,   cp.phoneVal,   cp.phoneSub],
    [cp.email,   cp.emailVal,   cp.emailSub],
    [cp.address, cp.addressVal, cp.addressSub],
    [cp.hours,   cp.hoursVal,   ''],
  ]

  return (
    <>
      <Helmet><title>{t('nav.contacts')} — Turan Logix</title></Helmet>
      <PageHeader
        eyebrow={cp.eyebrow}
        title={cp.title}
        accentTitle={cp.accentTitle}
        subtitle={cp.subtitle}
      />
      <section style={{ padding: '40px', borderTop: '1px solid var(--border)' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: 40,
          alignItems: 'start',
          maxWidth: 1320,
          margin: '0 auto',
        }}>
          {/* Contact info */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {contactItems.map(([k, v, sub], i) => (
              <div key={i} style={{
                paddingBottom: 14,
                borderBottom: i < 3 ? '1px solid var(--border)' : 'none',
              }}>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase' as const,
                  color: 'var(--muted-deep)',
                }}>{k}</div>
                <div style={{
                  fontFamily: "'Space Grotesk', system-ui, sans-serif",
                  fontWeight: 600,
                  fontSize: 18,
                  color: 'var(--text-bright)',
                  marginTop: 4,
                }}>{v}</div>
                {sub && (
                  <div style={{
                    fontFamily: "'Inter', system-ui, sans-serif",
                    fontSize: 12.5,
                    color: 'var(--muted)',
                    marginTop: 2,
                  }}>{sub}</div>
                )}
              </div>
            ))}
          </div>

          {/* Contact form card */}
          <div style={{
            padding: 28,
            borderRadius: 'var(--radius-lg)',
            background: 'var(--bg-alt)',
            border: '1px solid var(--border)',
          }}>
            <div style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 700,
              fontSize: 22,
              color: 'var(--text-bright)',
              letterSpacing: '-0.01em',
            }}>{cp.formTitle}</div>
            <div style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13,
              color: 'var(--muted)',
              marginTop: 4,
            }}>{cp.formSub}</div>

            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[
                [cp.fieldName,  cp.namePh],
                [cp.fieldPhone, cp.phonePh],
                [cp.fieldEmail, cp.emailPh],
              ].map(([label, ph], i) => (
                <div key={i}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 9.5,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase' as const,
                    color: 'var(--muted-deep)',
                    marginBottom: 4,
                  }}>{label}</div>
                  <input
                    type="text"
                    placeholder={ph}
                    style={{
                      display: 'block',
                      width: '100%',
                      padding: '11px 14px',
                      borderRadius: 'var(--radius-sm)',
                      border: '1px solid var(--border)',
                      background: 'var(--surface)',
                      fontFamily: "'Inter', system-ui, sans-serif",
                      fontSize: 14,
                      color: 'var(--muted-deep)',
                      outline: 'none',
                    }}
                  />
                </div>
              ))}
            </div>

            <div style={{ marginTop: 18, display: 'flex', justifyContent: 'flex-end' }}>
              <Link
                to="#"
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
                {cp.submit}
                <span style={{ fontFamily: "'JetBrains Mono', monospace" }}>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
