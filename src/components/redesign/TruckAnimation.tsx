/**
 * Animated tandem truck (cab + trailer) sliding across the page.
 * Uses a pure CSS keyframe animation defined in index.css.
 * The truck SVG is drawn in a right-to-left coordinate space so it faces left
 * (direction of travel on the page = left → right, truck faces right).
 */

export default function TruckAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: 72,
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      {/* Road surface line */}
      <div style={{
        position: 'absolute',
        bottom: 14,
        left: 0,
        right: 0,
        height: 1,
        background: 'var(--border)',
      }} />

      {/* Animated truck wrapper */}
      <div className="truck-drive" style={{ position: 'absolute', bottom: 15 }}>
        <TandemTruck />
      </div>
    </div>
  )
}

/** Full tandem truck SVG: trailer (left) + cab (right), wheels at bottom */
function TandemTruck() {
  /*
   * Coordinate system: total width ~460px, height ~50px
   * x=0 is left edge (rear of trailer), truck faces right.
   *
   * Layout:
   *   0──────────── 280  trailer body
   *   280──────────────── 380  5th-wheel / coupling
   *   380─────────────── 460  cab
   * Wheels sit at y=38 (axle center), total height ≈ 50px
   */
  const accent = 'var(--accent)'
  const body   = 'var(--bg-alt)'
  const muted  = 'var(--muted-deep)'
  const border = 'var(--border-strong)'

  return (
    <svg
      width="460"
      height="50"
      viewBox="0 0 460 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* ── TRAILER BODY ── */}
      {/* Main box */}
      <rect x="8" y="6" width="268" height="32" rx="2"
        fill={body} stroke={border} strokeWidth="1.2" />
      {/* Roof highlight */}
      <rect x="8" y="6" width="268" height="5" rx="2"
        fill={accent} opacity="0.35" />
      {/* Logo strip on trailer */}
      <rect x="20" y="13" width="80" height="17" rx="2"
        fill={accent} opacity="0.12" />
      <text x="60" y="25" textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="8"
        letterSpacing="0.14em" fill={accent} fontWeight="600">
        TURAN·LOGIX
      </text>
      {/* Horizontal rib lines on trailer */}
      {[19, 26, 32].map(y => (
        <line key={y} x1="8" y1={y} x2="276" y2={y}
          stroke={border} strokeWidth="0.5" />
      ))}
      {/* Vertical panels */}
      {[70, 140, 210].map(x => (
        <line key={x} x1={x} y1="6" x2={x} y2="38"
          stroke={border} strokeWidth="0.5" />
      ))}
      {/* Rear door detail */}
      <rect x="8" y="6" width="14" height="32" rx="1"
        fill="transparent" stroke={border} strokeWidth="1" />
      <line x1="15" y1="6" x2="15" y2="38" stroke={border} strokeWidth="0.5" />
      {/* Rear bumper */}
      <rect x="4" y="35" width="8" height="4" rx="1"
        fill={muted} />
      {/* Rear reflectors */}
      <rect x="5" y="36" width="3" height="2" rx="0.5"
        fill="#e05030" opacity="0.9" />

      {/* ── TRAILER UNDERCARRIAGE ── */}
      {/* Frame rail */}
      <rect x="0" y="37" width="360" height="3" rx="1"
        fill={muted} opacity="0.6" />
      {/* Rear bogie axle housing */}
      <rect x="48" y="37" width="50" height="4" rx="1"
        fill={muted} opacity="0.5" />
      {/* Mid axle housing */}
      <rect x="114" y="37" width="50" height="4" rx="1"
        fill={muted} opacity="0.5" />

      {/* Trailer rear wheels (dual axle) */}
      <Wheel cx={66}  cy={42} />
      <Wheel cx={90}  cy={42} />
      <Wheel cx={132} cy={42} />
      <Wheel cx={156} cy={42} />

      {/* ── COUPLING / 5TH WHEEL ── */}
      <rect x="276" y="33" width="88" height="7" rx="2"
        fill={muted} opacity="0.4" />
      <rect x="310" y="28" width="22" height="12" rx="2"
        fill={muted} opacity="0.55" />

      {/* ── CAB ── */}
      {/* Cab body */}
      <rect x="350" y="10" width="102" height="28" rx="3"
        fill={accent} opacity="0.85" />
      {/* Cab roof fairing */}
      <path d="M 350 10 Q 355 2 400 2 L 452 2 L 452 10 Z"
        fill={accent} opacity="0.7" />
      {/* Air deflector on roof */}
      <rect x="396" y="1" width="56" height="4" rx="1.5"
        fill={accent} opacity="0.9" />
      {/* Cab front slope */}
      <path d="M 452 2 L 458 8 L 458 38 L 452 38 L 452 2 Z"
        fill={accent} opacity="0.95" />
      {/* Windshield */}
      <path d="M 452 12 L 456 16 L 456 30 L 452 30 Z"
        fill="rgba(180,220,255,0.45)" stroke={border} strokeWidth="0.8" />
      {/* Side window */}
      <rect x="390" y="13" width="58" height="16" rx="2"
        fill="rgba(180,220,255,0.3)" stroke={border} strokeWidth="0.8" />
      {/* Window tint bar */}
      <rect x="390" y="13" width="58" height="5" rx="1.5"
        fill="rgba(0,0,0,0.18)" />
      {/* Door handle */}
      <rect x="407" y="26" width="10" height="2" rx="1"
        fill={body} opacity="0.6" />
      {/* Side step */}
      <rect x="376" y="37" width="52" height="3" rx="1"
        fill={muted} opacity="0.7" />
      {/* Exhaust stack */}
      <rect x="354" y="0" width="4" height="14" rx="2"
        fill={muted} opacity="0.7" />
      {/* Exhaust puff  */}
      <circle cx="356" cy="0" r="3" fill={muted} opacity="0.2" />
      {/* Fuel tank */}
      <rect x="364" y="32" width="20" height="10" rx="3"
        fill={muted} opacity="0.5" />
      {/* Cab headlights */}
      <rect x="455" y="12" width="4" height="6" rx="1"
        fill="#ffe88a" opacity="0.9" />
      <rect x="455" y="24" width="4" height="4" rx="1"
        fill="#e05030" opacity="0.8" />
      {/* Front bumper */}
      <rect x="455" y="34" width="5" height="4" rx="1"
        fill={muted} />

      {/* Cab drive axle */}
      <rect x="360" y="37" width="90" height="3" rx="1"
        fill={muted} opacity="0.5" />
      {/* Cab wheels (dual rear + single front) */}
      <Wheel cx={384} cy={42} />
      <Wheel cx={408} cy={42} />
      <Wheel cx={440} cy={42} />
    </svg>
  )
}

/** Single wheel with hub cap and tread detail */
function Wheel({ cx, cy }: { cx: number; cy: number }) {
  const r = 8
  return (
    <g>
      {/* Tyre */}
      <circle cx={cx} cy={cy} r={r}
        fill="var(--text)" opacity="0.85" />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={r - 2.5}
        fill="var(--muted-deep)" opacity="0.8" />
      {/* Hub */}
      <circle cx={cx} cy={cy} r={r - 5}
        fill="var(--bg-alt)" />
      {/* Hub nut */}
      <circle cx={cx} cy={cy} r={1.2}
        fill="var(--muted-deep)" />
      {/* Spokes */}
      {[0, 60, 120].map(a => {
        const rad = (a * Math.PI) / 180
        return (
          <line
            key={a}
            x1={cx + Math.cos(rad) * 1.5}
            y1={cy + Math.sin(rad) * 1.5}
            x2={cx + Math.cos(rad) * (r - 3)}
            y2={cy + Math.sin(rad) * (r - 3)}
            stroke="var(--muted-deep)"
            strokeWidth="0.8"
            opacity="0.7"
          />
        )
      })}
    </g>
  )
}
