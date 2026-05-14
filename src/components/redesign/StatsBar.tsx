import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

/** Parse a display string like "50+", "5 000+", "3 года" → { numeric: 5000, suffix: "+" } */
function parseValue(raw: string): { numeric: number; suffix: string } {
  const cleaned = raw.replace(/\s/g, '') // remove spaces (e.g. "5 000+" → "5000+")
  const match = cleaned.match(/^([\d.]+)(.*)$/)
  if (!match) return { numeric: 0, suffix: raw }
  return { numeric: parseFloat(match[1]), suffix: match[2] }
}

/** Format a number back to display string, preserving thousands spacing for >= 1000 */
function formatNum(n: number, original: string): string {
  // preserve the original format (e.g. "3 года" → no numeric formatting needed)
  const { numeric } = parseValue(original)
  if (numeric === 0) return original

  const rounded = Math.round(n)
  if (rounded >= 1000) {
    // Insert thin space every 3 digits from right
    return rounded.toLocaleString('ru-RU').replace(/,/g, ' ')
  }
  return String(rounded)
}

function useCountUp(target: number, duration: number, active: boolean) {
  const [value, setValue] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!active) return
    startRef.current = null

    const tick = (now: number) => {
      if (startRef.current === null) startRef.current = now
      const elapsed = now - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(eased * target))
      if (progress < 1) rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [target, duration, active])

  return value
}

interface StatItemProps {
  rawValue: string   // e.g. "50+", "5 000+", "3 года"
  label: string
  index: number
  active: boolean
}

function StatItem({ rawValue, label, index, active }: StatItemProps) {
  const { numeric, suffix } = parseValue(rawValue)
  const counted = useCountUp(numeric, 1600, active)

  const displayValue = active
    ? formatNum(counted, rawValue) + suffix
    : '0' + suffix

  return (
    <div
      style={{
        padding: '6px 22px',
        borderLeft: index === 0 ? 'none' : '1px solid var(--border)',
        opacity: active ? 1 : 0,
        transform: active ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      }}
    >
      <div style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 700,
        fontSize: 36,
        color: 'var(--text-bright)',
        letterSpacing: '-0.02em',
        lineHeight: 1,
      }}>
        {displayValue}
      </div>
      <div style={{
        fontFamily: "'JetBrains Mono', monospace",
        fontSize: 10,
        letterSpacing: '0.18em',
        textTransform: 'uppercase' as const,
        color: 'var(--muted-deep)',
        marginTop: 4,
      }}>
        {label}
      </div>
    </div>
  )
}

export default function StatsBar() {
  const { t } = useTranslation()
  const items = t('redesign.secStatsExtra', { returnObjects: true }) as [string, string][]
  const ref = useRef<HTMLElement | null>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect() } },
      { threshold: 0.25 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={ref}
      style={{
        padding: '32px 40px',
        borderTop: '1px solid var(--border)',
        borderBottom: '1px solid var(--border)',
        background: 'var(--bg-alt)',
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 0,
      }}
    >
      {items.map(([v, l], i) => (
        <StatItem key={i} rawValue={v} label={l} index={i} active={active} />
      ))}
    </section>
  )
}
