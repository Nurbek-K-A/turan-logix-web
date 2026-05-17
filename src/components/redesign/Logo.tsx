interface LogoMarkProps {
  size?: number
  radius?: number
}

export function LogoMark({ size = 56, radius = 0.14 }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      style={{ display: 'block' }}
      aria-label="Turan Logix"
    >
      <rect x="0" y="0" width="100" height="100" rx={radius * 100} fill="var(--accent)" />
      {/* chevrons+star glyph centered in 100×100 (glyph native width=60, offset x+20) */}
      <g transform="translate(20, 0)">
        <g stroke="var(--on-accent)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
          <path d="M 20 90 L 30 80 L 40 90" opacity="0.95" />
          <path d="M 22 76 L 30 68 L 38 76" opacity="0.72" />
          <path d="M 24 62 L 30 56 L 36 62" opacity="0.50" />
          <path d="M 26 48 L 30 44 L 34 48" opacity="0.30" />
        </g>
        <g transform="translate(30, 26)">
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill="var(--on-accent)" />
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill="var(--on-accent)" transform="rotate(45)" opacity="0.45" />
        </g>
      </g>
    </svg>
  )
}

interface LogoWordmarkProps {
  subtitle: string
  size?: 'sm' | 'md'
}

export function LogoWordmark({ subtitle, size = 'sm' }: LogoWordmarkProps) {
  const iconSize = size === 'sm' ? 36 : 44
  const t1 = size === 'sm' ? 17 : 21
  const t2 = size === 'sm' ? 9 : 9.5

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <LogoMark size={iconSize} radius={6 / iconSize} />
      <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
        <div style={{
          fontFamily: "'Space Grotesk', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: t1,
          letterSpacing: '0.02em',
          color: 'var(--text-bright)',
          textTransform: 'uppercase',
        }}>
          Turan<span style={{ color: 'var(--accent)', padding: '0 0.15em' }}>·</span>Logix
        </div>
        <div style={{
          marginTop: 6,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: t2,
          letterSpacing: '0.20em',
          color: 'var(--muted)',
          textTransform: 'uppercase',
          transition: 'opacity 0.2s ease',
        }}>
          {subtitle}
        </div>
      </div>
    </div>
  )
}
