import i18n from '@/i18n'

const LANGS = ['RU', 'KZ', 'EN'] as const

interface LangSwitcherProps {
  lang: string
}

export function LangSwitcher({ lang }: LangSwitcherProps) {
  const current = lang.toUpperCase()

  const handleChange = (code: string) => {
    i18n.changeLanguage(code.toLowerCase())
    localStorage.setItem('turanlogix-lang', code.toLowerCase())
  }

  return (
    <div
      role="radiogroup"
      aria-label="Language"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 2,
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      {LANGS.map(l => {
        const active = l === current
        return (
          <button
            key={l}
            role="radio"
            aria-checked={active}
            onClick={() => handleChange(l)}
            style={{
              border: 'none',
              background: active ? 'var(--text-bright)' : 'transparent',
              color: active ? 'var(--bg)' : 'var(--muted)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 10.5,
              letterSpacing: '0.14em',
              padding: '5px 9px',
              borderRadius: 'var(--radius-pill)',
              cursor: 'pointer',
              transition: 'background 0.15s, color 0.15s',
            }}
          >
            {l}
          </button>
        )
      })}
    </div>
  )
}
