import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { useThemeStore } from '@/store'

function AIBubble({ side, children }: { side: 'left' | 'right'; children: React.ReactNode }) {
  const style = side === 'left'
    ? { borderRadius: '14px 14px 14px 4px', background: 'var(--surface)', color: 'var(--text)' }
    : { borderRadius: '14px 14px 4px 14px', background: 'var(--text-bright)', color: 'var(--bg)' }
  return (
    <div style={{ display: 'flex', justifyContent: side === 'right' ? 'flex-end' : 'flex-start' }}>
      <div style={{
        maxWidth: '85%',
        padding: '10px 13px',
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: 13,
        lineHeight: 1.5,
        ...style,
      }}>{children}</div>
    </div>
  )
}

export default function FloatingAI() {
  const { t } = useTranslation()
  const { theme } = useThemeStore()
  const [open, setOpen] = useState(false)
  const [typing, setTyping] = useState(false)
  const [showMsg3, setShowMsg3] = useState(false)

  const isDark = theme === 'dark'

  const handleOpen = useCallback(() => {
    setOpen(true)
  }, [])

  const handleClose = useCallback(() => {
    setOpen(false)
    setTyping(false)
    setShowMsg3(false)
  }, [])

  useEffect(() => {
    if (!open) {
      setShowMsg3(false)
      setTyping(false)
      return
    }
    setShowMsg3(false)
    setTyping(false)
    const t1 = setTimeout(() => setTyping(true), 900)
    const t2 = setTimeout(() => { setTyping(false); setShowMsg3(true) }, 2200)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [open])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) handleClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open, handleClose])

  const ai = t('redesign.aiAssist', { returnObjects: true }) as Record<string, string>

  if (!open) {
    return (
      <button
        onClick={handleOpen}
        aria-label={ai.expand}
        className="ai-pulse"
        style={{
          position: 'fixed',
          right: 28,
          bottom: 28,
          zIndex: 60,
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '14px 18px 14px 14px',
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          cursor: 'pointer',
          background: isDark ? 'var(--text-bright)' : '#0a0805',
          color: isDark ? 'var(--bg)' : '#faf5e9',
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 600,
          fontSize: 13.5,
          letterSpacing: '0.01em',
        }}
      >
        <span style={{
          width: 30,
          height: 30,
          borderRadius: '50%',
          background: 'var(--accent)',
          color: 'var(--on-accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: "'JetBrains Mono', monospace",
          fontWeight: 700,
          fontSize: 12,
        }}>AI</span>
        <span>{ai.collapsed}</span>
        <span style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: 'var(--signal)',
          boxShadow: '0 0 0 3px color-mix(in srgb, var(--signal) 20%, transparent)',
          marginLeft: 2,
        }} />
      </button>
    )
  }

  return (
    <div
      className="panel-in"
      style={{
        position: 'fixed',
        right: 24,
        bottom: 24,
        zIndex: 60,
        width: 380,
        maxHeight: 560,
        background: 'var(--bg-alt)',
        color: 'var(--text)',
        border: '1px solid var(--border-strong)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 24px 64px rgba(20,17,13,0.28), 0 4px 14px rgba(20,17,13,0.12)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Header */}
      <div style={{
        padding: '14px 14px 14px 16px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'var(--bg)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{
            width: 34,
            height: 34,
            borderRadius: 'var(--radius-sm)',
            background: 'linear-gradient(135deg, var(--accent), var(--accent-deep))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'JetBrains Mono', monospace",
            fontWeight: 700,
            fontSize: 12,
            color: 'var(--on-accent)',
            letterSpacing: '0.05em',
          }}>AI</div>
          <div>
            <div style={{
              fontFamily: "'Space Grotesk', system-ui, sans-serif",
              fontWeight: 600,
              fontSize: 14,
              color: 'var(--text-bright)',
              lineHeight: 1.15,
            }}>{ai.title}</div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 9.5,
              letterSpacing: '0.16em',
              color: 'var(--muted)',
              textTransform: 'uppercase' as const,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 6,
              marginTop: 3,
            }}>
              <span style={{ width: 5, height: 5, borderRadius: '50%', background: 'var(--signal)' }} />
              {ai.tagline}
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          aria-label={ai.minimize}
          title={ai.minimize}
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border)',
            background: 'var(--surface)',
            color: 'var(--muted)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
          }}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M3 8 L11 8" />
          </svg>
        </button>
      </div>

      {/* AI tagline strip */}
      <div style={{
        padding: '10px 16px',
        background: 'var(--accent-soft)',
        borderBottom: '1px solid color-mix(in srgb, var(--accent) 13%, transparent)',
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.16em',
        textTransform: 'uppercase' as const,
        color: 'var(--accent-deep)',
      }}>
        ✶ {t('redesign.aiTagline')}
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflowY: 'auto',
        padding: 16,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
        background: 'var(--bg-alt)',
      }}>
        <AIBubble side="left">{ai.msg1}</AIBubble>
        <AIBubble side="right">{ai.msg2}</AIBubble>

        {typing && (
          <div style={{ display: 'flex' }}>
            <div style={{
              padding: '10px 14px',
              borderRadius: '14px 14px 14px 4px',
              background: 'var(--surface)',
              display: 'flex',
              alignItems: 'center',
              gap: 4,
            }}>
              {[0, 1, 2].map(i => (
                <span key={i} className="typ-dot" style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--muted)',
                }} />
              ))}
            </div>
          </div>
        )}

        {showMsg3 && (
          <div style={{ display: 'flex' }} className="word-in">
            <div style={{
              maxWidth: '92%',
              padding: '12px 14px',
              borderRadius: '14px 14px 14px 4px',
              background: 'var(--surface)',
              color: 'var(--text)',
              fontFamily: "'Inter', system-ui, sans-serif",
              fontSize: 13,
              lineHeight: 1.5,
            }}>
              {ai.msg3a}
              <span style={{
                fontFamily: "'JetBrains Mono', monospace",
                color: 'var(--accent)',
                letterSpacing: '0.05em',
                fontWeight: 600,
              }}>{ai.msg3price}</span>
              <div style={{
                marginTop: 10,
                padding: '10px 12px',
                borderRadius: 'var(--radius-sm)',
                background: 'var(--accent-soft)',
                border: '1px solid color-mix(in srgb, var(--accent) 20%, transparent)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: "'Space Grotesk', system-ui, sans-serif",
                fontSize: 12.5,
                fontWeight: 600,
                color: 'var(--text-bright)',
                cursor: 'pointer',
              }}>
                <span>{ai.msg3btn}</span>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", color: 'var(--accent)' }}>→</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input footer */}
      <div style={{
        padding: '12px 14px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'var(--bg)',
      }}>
        <input
          type="text"
          placeholder={ai.placeholder}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13,
            color: 'var(--text)',
            padding: '6px 4px',
          }}
        />
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 10,
          color: 'var(--muted)',
          padding: '4px 7px',
          border: '1px solid var(--border)',
          borderRadius: 4,
        }}>⏎</span>
      </div>
    </div>
  )
}
