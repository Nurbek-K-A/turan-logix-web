import React from 'react'
import { LogoVariant, COLORS } from './TuranLogixLogo'

interface TuranLogixIconProps {
  variant?: LogoVariant
  size?: number
  withBackground?: boolean
  className?: string
}

export const TuranLogixIcon: React.FC<TuranLogixIconProps> = ({
  variant = 'dark',
  size = 48,
  withBackground = false,
  className = '',
}) => {
  const c = COLORS[variant]
  const iconW = Math.round(size * 0.6)

  const svgContent = (
    <svg
      width={iconW}
      height={size}
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
  )

  if (withBackground) {
    return (
      <div
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#1c1f26',
          border: '1px solid rgba(200,169,110,0.2)',
          borderRadius: Math.round(size * 0.18),
          padding: Math.round(size * 0.12),
        }}
      >
        {svgContent}
      </div>
    )
  }

  return <span className={className}>{svgContent}</span>
}
