/**
 * Realistic curtainsider tandem truck (DAF XF style):
 *   [rear trailer] ── dolly ── [semi-trailer] ── [cab]
 * Rendered as a subtle ghost/watermark (low opacity) so it
 * doesn't compete with page content.
 */
export default function TruckAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: 80,
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      {/* Ground line */}
      <div style={{
        position: 'absolute',
        bottom: 12,
        left: 0,
        right: 0,
        height: 1,
        background: 'var(--border)',
      }} />

      {/* Truck — subtle ghost */}
      <div
        className="truck-drive"
        style={{
          position: 'absolute',
          bottom: 13,
          opacity: 0.22,
        }}
      >
        <TandemTruck />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────────
   Full tandem truck: rear curtainsider trailer + semi-trailer + cab
   viewBox 0 0 900 62   (ground = y 62, axle centres = y 52)
───────────────────────────────────────────────────────────── */
function TandemTruck() {
  const S  = 'var(--text-bright)'   // body fill / main colour
  const D  = 'var(--muted)'         // darker details
  const A  = 'var(--accent)'        // small accent touches

  /* ── stroke helpers ── */
  const so = { stroke: D, strokeWidth: 0.7, fill: 'none' }       // outline
  const sf = { stroke: D, strokeWidth: 0.5, fill: S }            // filled panel

  /* ── vertical curtain straps ── */
  const straps = (x0: number, w: number, y0: number, y1: number, gap = 22) =>
    Array.from({ length: Math.floor(w / gap) - 1 }, (_, i) => (
      <line key={i} x1={x0 + (i + 1) * gap} y1={y0} x2={x0 + (i + 1) * gap} y2={y1}
        stroke={D} strokeWidth="0.6" strokeDasharray="1.5 2" />
    ))

  return (
    <svg width="900" height="62" viewBox="0 0 900 62" fill="none"
      xmlns="http://www.w3.org/2000/svg">

      {/* ══════════════════════════════════════════
          A  R E A R   T R A I L E R   (x 0–290)
         ══════════════════════════════════════════ */}

      {/* Chassis rail */}
      <rect x="12" y="43" width="278" height="4" rx="1" fill={D} />

      {/* Curtain body */}
      <rect x="12" y="8" width="278" height="35" rx="1" {...sf} />
      {/* Roof bar */}
      <rect x="12" y="8" width="278" height="4" rx="1" fill={D} />
      {/* Bottom rail with strap hooks (dashed) */}
      <rect x="12" y="40" width="278" height="3" rx="0.5" fill={D} />
      {/* Curtain straps */}
      {straps(12, 278, 12, 43, 20)}

      {/* Rear corner post */}
      <rect x="8"  y="7" width="5" height="37" rx="1" fill={D} />
      {/* Front corner post */}
      <rect x="284" y="7" width="5" height="37" rx="1" fill={D} />

      {/* Rear bumper + reflector */}
      <rect x="4" y="39" width="7" height="6" rx="1" fill={D} />
      <rect x="5" y="40" width="3" height="2" rx="0.5" fill="#e04020" opacity="0.8" />
      <rect x="5" y="43" width="3" height="2" rx="0.5" fill="#e0c020" opacity="0.7" />

      {/* Mudguards rear bogie */}
      <path d="M 52 43 Q 62 38 72 43" {...so} />
      <path d="M 90 43 Q 100 38 110 43" {...so} />

      {/* Rear bogie — dual tandem axles */}
      <rect x="50"  y="42" width="68" height="3" rx="1" fill={D} opacity="0.6" />
      <Wheel cx={64}  cy={52} r={9} D={D} S={S} />
      <Wheel cx={82}  cy={52} r={9} D={D} S={S} />
      <Wheel cx={100} cy={52} r={9} D={D} S={S} />
      <Wheel cx={118} cy={52} r={9} D={D} S={S} />

      {/* Landing gear */}
      <rect x="246" y="43" width="4" height="12" rx="1" fill={D} opacity="0.5" />
      <rect x="258" y="43" width="4" height="12" rx="1" fill={D} opacity="0.5" />
      <rect x="243" y="55" width="13" height="2" rx="1" fill={D} opacity="0.5" />
      <rect x="255" y="55" width="13" height="2" rx="1" fill={D} opacity="0.5" />

      {/* ══════════════════════════════════════════
          B  D O L L Y   /   C O U P L I N G   (x 290–360)
         ══════════════════════════════════════════ */}

      {/* Drawbar */}
      <path d="M 290 45 Q 325 42 360 45" stroke={D} strokeWidth="2.5"
        strokeLinecap="round" fill="none" />
      {/* Dolly axle housing */}
      <rect x="300" y="44" width="36" height="4" rx="2" fill={D} opacity="0.6" />
      <Wheel cx={310} cy={52} r={8} D={D} S={S} />
      <Wheel cx={326} cy={52} r={8} D={D} S={S} />

      {/* ══════════════════════════════════════════
          C  S E M I - T R A I L E R   (x 360–680)
         ══════════════════════════════════════════ */}

      {/* Chassis rail */}
      <rect x="360" y="43" width="320" height="4" rx="1" fill={D} />

      {/* Curtain body */}
      <rect x="360" y="8" width="320" height="35" rx="1" {...sf} />
      {/* Roof bar */}
      <rect x="360" y="8" width="320" height="4" rx="1" fill={D} />
      {/* Bottom rail */}
      <rect x="360" y="40" width="320" height="3" rx="0.5" fill={D} />
      {/* Curtain straps */}
      {straps(360, 320, 12, 43, 22)}

      {/* Corner posts */}
      <rect x="356" y="7" width="5" height="37" rx="1" fill={D} />
      <rect x="675" y="7" width="5" height="37" rx="1" fill={D} />

      {/* Brake light strip (rear of semi) */}
      <rect x="357" y="40" width="3" height="4" rx="0.5" fill="#e04020" opacity="0.7" />
      <rect x="357" y="35" width="3" height="3" rx="0.5" fill="#e0c020" opacity="0.6" />

      {/* Mudguards */}
      <path d="M 440 43 Q 453 38 466 43" {...so} />
      <path d="M 482 43 Q 495 38 508 43" {...so} />

      {/* Rear bogie — dual tandem */}
      <rect x="438" y="42" width="76" height="3" rx="1" fill={D} opacity="0.6" />
      <Wheel cx={452} cy={52} r={9} D={D} S={S} />
      <Wheel cx={470} cy={52} r={9} D={D} S={S} />
      <Wheel cx={490} cy={52} r={9} D={D} S={S} />
      <Wheel cx={508} cy={52} r={9} D={D} S={S} />

      {/* Landing legs */}
      <rect x="644" y="43" width="4" height="11" rx="1" fill={D} opacity="0.5" />
      <rect x="656" y="43" width="4" height="11" rx="1" fill={D} opacity="0.5" />
      <rect x="641" y="54" width="13" height="2" rx="1" fill={D} opacity="0.5" />
      <rect x="653" y="54" width="13" height="2" rx="1" fill={D} opacity="0.5" />

      {/* ══════════════════════════════════════════
          D  C A B   (x 680–900)   DAF XF high-roof sleeper
         ══════════════════════════════════════════ */}

      {/* 5th-wheel plate */}
      <rect x="665" y="38" width="80" height="7" rx="2" fill={D} opacity="0.5" />

      {/* Main cab body */}
      <rect x="680" y="10" width="170" height="33" rx="2" fill={S} stroke={D} strokeWidth="0.8" />

      {/* High-roof sleeper pod */}
      <rect x="680" y="2" width="130" height="10" rx="2" fill={S} stroke={D} strokeWidth="0.7" />

      {/* Roof spoiler / sun visor above windshield */}
      <path d="M 808 3 L 848 10 L 850 10 L 850 7 L 812 2 Z"
        fill={D} opacity="0.6" />

      {/* Air deflector on top */}
      <rect x="805" y="1" width="45" height="5" rx="2" fill={D} opacity="0.55" />

      {/* Front face (slightly angled DAF style) */}
      <path d="M 848 10 L 858 16 L 858 43 L 848 43 Z"
        fill={S} stroke={D} strokeWidth="0.8" />

      {/* Front bumper lower */}
      <rect x="856" y="36" width="16" height="8" rx="2" fill={D} opacity="0.75" />
      {/* Bumper intake grille slats */}
      {[38, 40, 42].map(y => (
        <line key={y} x1="858" y1={y} x2="870" y2={y}
          stroke={S} strokeWidth="0.6" opacity="0.5" />
      ))}

      {/* Lower bumper spoiler */}
      <path d="M 848 43 L 875 43 L 875 46 L 848 46 Z"
        fill={D} opacity="0.6" />

      {/* Headlight cluster */}
      <rect x="856" y="13" width="12" height="8" rx="1"
        fill="#ffe8a0" opacity="0.6" stroke={D} strokeWidth="0.5" />
      {/* DRL strip */}
      <rect x="856" y="11" width="14" height="2" rx="1"
        fill="#ffe8a0" opacity="0.4" />
      {/* Position light */}
      <rect x="858" y="22" width="5" height="3" rx="0.5"
        fill="#e0c020" opacity="0.5" />

      {/* Windshield */}
      <path d="M 810 10 L 850 10 L 858 18 L 858 36 L 810 36 Z"
        fill="rgba(160,200,240,0.18)" stroke={D} strokeWidth="0.7" />
      {/* Windshield divider */}
      <line x1="833" y1="10" x2="833" y2="36"
        stroke={D} strokeWidth="0.5" />
      {/* Wipers */}
      <path d="M 814 34 Q 830 28 843 34" stroke={D} strokeWidth="0.8"
        fill="none" strokeLinecap="round" />

      {/* Side window (main) */}
      <rect x="700" y="13" width="107" height="19" rx="1.5"
        fill="rgba(160,200,240,0.15)" stroke={D} strokeWidth="0.6" />
      {/* Window tint top bar */}
      <rect x="700" y="13" width="107" height="5" rx="1.5"
        fill="rgba(0,0,0,0.12)" />
      {/* Window frame divider */}
      <line x1="758" y1="13" x2="758" y2="32"
        stroke={D} strokeWidth="0.5" />

      {/* Small side vent */}
      <rect x="688" y="15" width="10" height="5" rx="1"
        fill={D} opacity="0.3" />

      {/* Door handle */}
      <rect x="740" y="30" width="14" height="2.5" rx="1"
        fill={D} opacity="0.6" />
      {/* Door line */}
      <line x1="758" y1="10" x2="758" y2="43"
        stroke={D} strokeWidth="0.6" />

      {/* Side step bars */}
      <rect x="700" y="43" width="58" height="3" rx="1"
        fill={D} opacity="0.5" />
      <rect x="703" y="46" width="50" height="2" rx="1"
        fill={D} opacity="0.4" />

      {/* Exhaust stacks (dual, behind cab) */}
      <rect x="683" y="0" width="5" height="16" rx="2.5"
        fill={D} opacity="0.6" />
      <rect x="691" y="0" width="5" height="16" rx="2.5"
        fill={D} opacity="0.5" />
      {/* Exhaust puffs */}
      <circle cx="686" cy="0" r="4" fill={D} opacity="0.08" />
      <circle cx="694" cy="0" r="3" fill={D} opacity="0.06" />

      {/* Fuel tanks (twin) */}
      <rect x="680" y="32" width="20" height="12" rx="3"
        fill={D} opacity="0.45" />
      <rect x="703" y="32" width="20" height="12" rx="3"
        fill={D} opacity="0.4" />

      {/* Cab chassis skirt */}
      <rect x="680" y="43" width="170" height="3" rx="1"
        fill={D} opacity="0.5" />

      {/* Cab drive axles (tandem rear) */}
      <rect x="688" y="42" width="140" height="3" rx="1"
        fill={D} opacity="0.4" />
      {/* Drive axle wheels */}
      <Wheel cx={710} cy={52} r={9} D={D} S={S} />
      <Wheel cx={730} cy={52} r={9} D={D} S={S} />
      <Wheel cx={752} cy={52} r={9} D={D} S={S} />
      <Wheel cx={772} cy={52} r={9} D={D} S={S} />

      {/* Front steer axle */}
      <rect x="832" y="43" width="36" height="2.5" rx="1"
        fill={D} opacity="0.4" />
      <Wheel cx={840} cy={52} r={9} D={D} S={S} />
      <Wheel cx={858} cy={52} r={9} D={D} S={S} />

      {/* Accent badge on cab door */}
      <rect x="768" y="20" width="26" height="9" rx="1.5"
        fill="none" stroke={A} strokeWidth="0.8" opacity="0.7" />
      <text x="781" y="27" textAnchor="middle"
        fontFamily="'JetBrains Mono', monospace" fontSize="5"
        letterSpacing="0.06em" fill={A} opacity="0.8">TL</text>

    </svg>
  )
}

/* ── Single wheel: tyre + rim + hub + 3 spokes ── */
interface WheelProps { cx: number; cy: number; r: number; D: string; S: string }
function Wheel({ cx, cy, r, D, S }: WheelProps) {
  return (
    <g>
      {/* Tyre */}
      <circle cx={cx} cy={cy} r={r}     fill={D} opacity="0.9" />
      {/* Rim */}
      <circle cx={cx} cy={cy} r={r - 2.5} fill="rgba(120,100,70,0.6)" />
      {/* Hub */}
      <circle cx={cx} cy={cy} r={r - 5.5} fill={S} opacity="0.8" />
      {/* Centre nut */}
      <circle cx={cx} cy={cy} r={1.2}   fill={D} opacity="0.7" />
      {/* Spokes */}
      {[0, 60, 120].map(a => {
        const rad = (a * Math.PI) / 180
        return (
          <line key={a}
            x1={cx + Math.cos(rad) * 1.8} y1={cy + Math.sin(rad) * 1.8}
            x2={cx + Math.cos(rad) * (r - 3.5)} y2={cy + Math.sin(rad) * (r - 3.5)}
            stroke={D} strokeWidth="0.9" opacity="0.55" />
        )
      })}
    </g>
  )
}
