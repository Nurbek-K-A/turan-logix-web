import React from 'react'
import { LogoVariant, COLORS } from './logoTypes'

interface TuranLogixStampProps {
  variant?: LogoVariant
  size?: number
  className?: string
}

export const TuranLogixStamp: React.FC<TuranLogixStampProps> = ({
  variant = 'dark',
  size = 220,
  className = '',
}) => {
  const c = COLORS[variant]
  const turanText = variant === 'dark' ? '#f5f0e8' : variant === 'light' ? '#1c1a14' : '#1a1a1a'
  const cx = size / 2
  const cy = size / 2
  const outerR = size * 0.482
  const innerR = size * 0.427
  const arcTopR = size * 0.386
  const arcBotR = size * 0.364

  const idSuffix = `${variant}-${size}`

  // Arc path for top text (upper semicircle)
  const topArcD = `M ${cx},${cy} m ${-arcTopR},0 a ${arcTopR},${arcTopR} 0 0,1 ${arcTopR * 2},0`
  // Arc path for bottom text (lower semicircle)
  const botArcD = `M ${cx},${cy} m ${-arcBotR},0 a ${arcBotR},${arcBotR} 0 0,0 ${arcBotR * 2},0`

  const scale = size / 220
  const signCx = cx
  const signCy = cy - size * 0.1

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Turan Logix stamp"
    >
      <circle cx={cx} cy={cy} r={outerR} stroke={c.icon} strokeWidth={size * 0.009} />
      <circle cx={cx} cy={cy} r={innerR} stroke={c.icon} strokeWidth={size * 0.003} opacity={0.4} />

      <path id={`top-arc-${idSuffix}`} d={topArcD} />
      <text
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight={500}
        fontSize={size * 0.048}
        fill={c.tagline}
        letterSpacing={size * 0.009}
      >
        <textPath href={`#top-arc-${idSuffix}`} startOffset="50%" textAnchor="middle">
          ГРУЗОВЫЕ ПЕРЕВОЗКИ · FREIGHT
        </textPath>
      </text>

      <path id={`bot-arc-${idSuffix}`} d={botArcD} />
      <text
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight={500}
        fontSize={size * 0.048}
        fill={c.tagline}
        letterSpacing={size * 0.009}
      >
        <textPath href={`#bot-arc-${idSuffix}`} startOffset="50%" textAnchor="middle">
          ЦА · РОССИЯ · КИТАЙ · KZ
        </textPath>
      </text>

      {/* Central sign */}
      <g transform={`translate(${signCx}, ${signCy}) scale(${scale})`}>
        <g transform="translate(-30, -50) scale(0.9)">
          <g stroke={c.icon} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none">
            <path d="M 20 90 L 30 80 L 40 90" opacity="0.95" />
            <path d="M 22 76 L 30 68 L 38 76" opacity="0.72" />
            <path d="M 24 62 L 30 56 L 36 62" opacity="0.50" />
            <path d="M 26 48 L 30 44 L 34 48" opacity="0.30" />
          </g>
          <g transform="translate(30, 26)">
            <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} />
            <polygon points="0,-11 3,-3 11,0 3,3 0,11 -3,3 -11,0 -3,-3" fill={c.icon} transform="rotate(45)" opacity="0.45" />
          </g>
        </g>
      </g>

      {/* TURAN */}
      <text
        x={cx}
        y={cy + size * 0.175}
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight={800}
        fontSize={size * 0.082}
        fill={turanText}
        letterSpacing={size * 0.018}
        textAnchor="middle"
      >
        TURAN
      </text>
      {/* LOGIX */}
      <text
        x={cx}
        y={cy + size * 0.255}
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight={800}
        fontSize={size * 0.082}
        fill={c.logix}
        letterSpacing={size * 0.018}
        textAnchor="middle"
      >
        LOGIX
      </text>
    </svg>
  )
}
