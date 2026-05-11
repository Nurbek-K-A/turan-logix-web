import React from 'react'

export type LogoVariant = 'dark' | 'light' | 'bw'
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

interface TuranLogixLogoProps {
  variant?: LogoVariant
  size?: LogoSize
  showTagline?: boolean
  className?: string
}

const SIZES: Record<LogoSize, { icon: number; turan: number; logix: number; tagline: number }> = {
  sm: { icon: 32, turan: 18, logix: 18, tagline: 7.5 },
  md: { icon: 48, turan: 26, logix: 26, tagline: 8   },
  lg: { icon: 64, turan: 38, logix: 38, tagline: 10  },
  xl: { icon: 88, turan: 52, logix: 52, tagline: 12  },
}

export const COLORS: Record<LogoVariant, { turan: string; logix: string; tagline: string; icon: string; divider: string }> = {
  dark: {
    turan:   '#f5f0e8',
    logix:   '#c8a96e',
    tagline: '#c8a96e',
    icon:    '#c8a96e',
    divider: '#c8a96e',
  },
  light: {
    turan:   '#1c1a14',
    logix:   '#b8923a',
    tagline: '#857550',
    icon:    '#b8923a',
    divider: '#b8923a',
  },
  bw: {
    turan:   '#1a1a1a',
    logix:   '#555555',
    tagline: '#666666',
    icon:    '#222222',
    divider: '#aaaaaa',
  },
}

export const TuranLogixLogo: React.FC<TuranLogixLogoProps> = ({
  variant = 'dark',
  size = 'lg',
  showTagline = true,
  className = '',
}) => {
  const s = SIZES[size]
  const c = COLORS[variant]
  const iconH = s.icon
  const iconW = Math.round(iconH * 0.67)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 60 90"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="16,88 44,88 36,10 24,10"
          fill="none"
          stroke={c.icon}
          strokeWidth="0.8"
          opacity={0.22}
        />
        <rect x="28.5" y="68" width="3"   height="12" rx="1.5" fill={c.icon} opacity={0.9}  />
        <rect x="28.8" y="50" width="2.4" height="10" rx="1.2" fill={c.icon} opacity={0.65} />
        <rect x="29"   y="35" width="2"   height="8"  rx="1"   fill={c.icon} opacity={0.42} />
        <rect x="29.2" y="23" width="1.6" height="6"  rx="0.8" fill={c.icon} opacity={0.26} />
        <g transform="translate(30, 6)">
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} />
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} transform="rotate(45)" opacity={0.38} />
          <circle cx="0" cy="0" r="17" fill="none" stroke={c.icon} strokeWidth="0.5" opacity={0.22} />
        </g>
      </svg>

      <div className="flex flex-col" style={{ gap: 0 }}>
        <span
          style={{
            fontFamily: 'Manrope, system-ui, sans-serif',
            fontSize: s.turan,
            fontWeight: 800,
            color: c.turan,
            letterSpacing: '0.12em',
            lineHeight: 1.1,
          }}
        >
          TURAN
        </span>
        <span
          style={{
            fontFamily: 'Manrope, system-ui, sans-serif',
            fontSize: s.logix,
            fontWeight: 800,
            color: c.logix,
            letterSpacing: '0.12em',
            lineHeight: 1.1,
          }}
        >
          LOGIX
        </span>
        {showTagline && (
          <>
            <div
              style={{
                height: 1,
                background: c.divider,
                opacity: 0.2,
                margin: '4px 0',
              }}
            />
            <span
              style={{
                fontFamily: 'Manrope, system-ui, sans-serif',
                fontSize: s.tagline,
                fontWeight: 500,
                color: c.tagline,
                letterSpacing: '0.2em',
                opacity: 0.65,
                lineHeight: 1.2,
              }}
            >
              ЦЕНТРАЛЬНАЯ АЗИЯ · РОССИЯ · КИТАЙ
            </span>
          </>
        )}
      </div>
    </div>
  )
}
