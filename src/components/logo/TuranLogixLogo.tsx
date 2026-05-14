import React from 'react'
import { LogoVariant, LogoSize, COLORS } from './logoTypes'

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

export const TuranLogixLogo: React.FC<TuranLogixLogoProps> = ({
  variant = 'dark',
  size = 'lg',
  showTagline = true,
  className = '',
}) => {
  const s = SIZES[size]
  const c = COLORS[variant]
  const iconH = s.icon
  const iconW = Math.round(iconH * 0.6)

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        width={iconW}
        height={iconH}
        viewBox="0 0 60 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <polygon
          points="14,96 46,96 38,22 22,22"
          fill="none"
          stroke={c.icon}
          strokeWidth="0.8"
          opacity={0.22}
        />
        <rect x="28.5" y="74" width="3"   height="13" rx="1.5" fill={c.icon} opacity={0.90} />
        <rect x="28.8" y="55" width="2.4" height="11" rx="1.2" fill={c.icon} opacity={0.65} />
        <rect x="29"   y="39" width="2"   height="9"  rx="1"   fill={c.icon} opacity={0.42} />
        <rect x="29.2" y="27" width="1.6" height="7"  rx="0.8" fill={c.icon} opacity={0.26} />
        <g transform="translate(30, 18)">
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} />
          <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} transform="rotate(45)" opacity={0.38} />
          <circle cx="0" cy="0" r="16" fill="none" stroke={c.icon} strokeWidth="0.5" opacity={0.22} />
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
