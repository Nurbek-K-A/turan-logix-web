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
      {/* T crossbar */}
      <rect x="14" y="22" width="48" height="11" fill="var(--on-accent)" />
      {/* T+L stem */}
      <rect x="33" y="22" width="11" height="56" fill="var(--on-accent)" />
      {/* L horizontal */}
      <rect x="44" y="67" width="32" height="11" fill="var(--on-accent)" />
      {/* Arrow head */}
      <polygon points="76,62 90,72.5 76,83" fill="var(--on-accent)" />
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
