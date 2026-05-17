import React from 'react'
import { LogoVariant, COLORS } from './logoTypes'

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

  const strokeW = size >= 88 ? 3 : size >= 44 ? 3.2 : 3.8
  const showHalo = size > 28

  const svgContent = (
    <svg
      width={iconW}
      height={size}
      viewBox="0 0 60 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke={c.icon} strokeWidth={strokeW} strokeLinecap="round" strokeLinejoin="round" fill="none">
        <path d="M 20 90 L 30 80 L 40 90" opacity="0.95" />
        <path d="M 22 76 L 30 68 L 38 76" opacity="0.72" />
        <path d="M 24 62 L 30 56 L 36 62" opacity="0.50" />
        <path d="M 26 48 L 30 44 L 34 48" opacity="0.30" />
      </g>
      <g transform="translate(30, 26)">
        <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} />
        <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} transform="rotate(45)" opacity="0.45" />
        {showHalo && <circle cx="0" cy="0" r="16" fill="none" stroke={c.icon} strokeWidth="0.7" opacity="0.30" />}
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
