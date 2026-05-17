/**
 * Single semi-truck silhouette (cab + one trailer).
 * Solid filled silhouette, low opacity, drives left→right.
 */
export default function TruckAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: 112,
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      <div style={{
        position: 'absolute', bottom: 10, left: 0, right: 0,
        height: 1, background: 'var(--border)',
      }} />
      <div className="truck-drive" style={{ position: 'absolute', bottom: 11, opacity: 0.18 }}>
        <TruckSilhouette />
      </div>
    </div>
  )
}

/*
  Coordinate system  (SVG 660 × 108, ground = y 108)
  Wheel:    cy=87, r=21  → bottom y=108 = ground
  Chassis:  y=66, h=6
  Trailer box top: y=12
  Cab roof top:    y=0
*/
const WCY  = 87
const WR   = 21
const CHAS = 66
const TTY  = 12

function TruckSilhouette() {
  const F = 'var(--text-bright)'
  const D = 'var(--muted-deep)'

  return (
    <svg viewBox="0 0 660 108" width="660" height="108" fill="none"
      xmlns="http://www.w3.org/2000/svg">

      {/* ══════════════════════════════════
          SEMI-TRAILER   x 4 – 346
      ══════════════════════════════════ */}
      {/* Body */}
      <rect x="4" y={TTY} width="342" height={CHAS - TTY} fill={F} rx="1.5"/>
      {/* Chassis rail */}
      <rect x="4" y={CHAS} width="342" height="6" fill={D} rx="1"/>
      {/* Rear bumper */}
      <rect x="0" y={CHAS} width="7" height="14" rx="1" fill={D}/>
      {/* Landing legs */}
      <rect x="304" y={CHAS}    width="5" height="15" rx="0.5" fill={D}/>
      <rect x="318" y={CHAS}    width="5" height="15" rx="0.5" fill={D}/>
      <rect x="300" y={CHAS+13} width="12" height="3" rx="0.5" fill={D}/>
      <rect x="314" y={CHAS+13} width="12" height="3" rx="0.5" fill={D}/>
      {/* 2-axle bogie */}
      <rect x="102" y={CHAS} width="186" height="4" rx="1" fill={D}/>
      <Wheel cx={126}/><Wheel cx={160}/>
      <Wheel cx={202}/><Wheel cx={236}/>
      {/* 5th-wheel plate */}
      <rect x="340" y="59" width="56" height="8" rx="2" fill={D} opacity="0.75"/>

      {/* ══════════════════════════════════
          CAB — European flat-front (COE)
          x 348 – 654
      ══════════════════════════════════ */}
      <path fill={F} d={`
        M 348 ${CHAS + 6}
        L 650 ${CHAS + 6}
        L 650 52
        L 634 22
        L 608 6
        L 552 0
        L 388 0
        L 364 6
        L 348 ${TTY}
        Z
      `}/>

      {/* Windshield glass */}
      <path fill="rgba(160,215,248,0.24)" stroke={D} strokeWidth="1.2" d={`
        M 606 10
        L 630 24
        L 644 56
        L 644 65
        L 604 65
        Z
      `}/>
      {/* Centre windshield divider */}
      <line x1="624" y1="10" x2="624" y2="65" stroke={D} strokeWidth="1"/>
      {/* Sun visor strip */}
      <rect x="602" y="10" width="46" height="6" rx="1" fill={D} opacity="0.8"/>

      {/* Side window */}
      <rect x="360" y={TTY + 4} width="238" height="28" rx="3"
        fill="rgba(160,215,248,0.18)" stroke={D} strokeWidth="0.9"/>
      {/* Tint band along top of side window */}
      <rect x="360" y={TTY + 4} width="238" height="6" rx="2" fill={D} opacity="0.15"/>
      {/* Door post */}
      <line x1="468" y1="0" x2="468" y2={CHAS + 6} stroke={D} strokeWidth="1.4"/>
      {/* Roof step (sleeper ↔ main cab) */}
      <line x1="552" y1="0" x2="552" y2={TTY} stroke={D} strokeWidth="1.2"/>

      {/* Dual exhaust stacks */}
      <rect x="350" y="0" width="8" height="24" rx="4"   fill={D} opacity="0.80"/>
      <rect x="361" y="2" width="7" height="20" rx="3.5" fill={D} opacity="0.55"/>

      {/* Fuel tank */}
      <rect x="350" y="36" width="24" height="14" rx="3" fill={D} opacity="0.48"/>

      {/* Headlight cluster */}
      <rect x="646" y="18" width="10" height="12" rx="2"   fill="#ffe090" opacity="0.80"/>
      <rect x="646" y="32" width="10" height="8"  rx="1.5" fill="#f09040" opacity="0.60"/>

      {/* Front bumper */}
      <rect x="644" y="46" width="12" height="26" rx="2" fill={D} opacity="0.75"/>
      {/* Grille slats */}
      <line x1="645" y1="49" x2="655" y2="49" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="645" y1="53" x2="655" y2="53" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="645" y1="57" x2="655" y2="57" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="645" y1="61" x2="655" y2="61" stroke={F} strokeWidth="0.8" opacity="0.3"/>

      {/* Side steps */}
      <rect x="361" y={CHAS}   width="60" height="3" rx="0.5" fill={D} opacity="0.6"/>
      <rect x="363" y={CHAS+3} width="56" height="3" rx="0.5" fill={D} opacity="0.45"/>

      {/* Cab chassis skirt */}
      <rect x="348" y={CHAS} width="306" height="6" fill={D} rx="1"/>

      {/* Tandem drive axles */}
      <rect x="434" y={CHAS} width="116" height="4" rx="1" fill={D}/>
      <Wheel cx={460}/><Wheel cx={498}/>

      {/* Front steer axle */}
      <rect x="580" y={CHAS} width="68" height="4" rx="1" fill={D}/>
      <Wheel cx={610}/>

    </svg>
  )
}

function Wheel({ cx }: { cx: number }) {
  const D = 'var(--muted-deep)'
  return (
    <g>
      <circle cx={cx} cy={WCY} r={WR}        fill={D}/>
      <circle cx={cx} cy={WCY} r={WR * 0.55} fill="var(--bg-alt)" opacity="0.72"/>
      <circle cx={cx} cy={WCY} r={WR * 0.22} fill={D}/>
    </g>
  )
}
