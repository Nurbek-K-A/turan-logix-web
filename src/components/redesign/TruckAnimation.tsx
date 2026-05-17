/**
 * Tandem truck silhouette — European flat-front cab-over style:
 *   [rear trailer] — dolly — [semi-trailer] — [cab]
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
        <TandemSilhouette />
      </div>
    </div>
  )
}

/*
  Coordinate system  (SVG 1060 × 108, ground = y 108)
  Wheel:    cy=87, r=21  → bottom y=108 = ground
  Chassis:  y=66, h=6
  Trailer box top: y=12
  Cab roof top:    y=0   (cab visibly taller than trailers)
*/
const WCY  = 87   // wheel centre y
const WR   = 21   // wheel radius
const CHAS = 66   // chassis rail top y
const TTY  = 12   // trailer box top y

function TandemSilhouette() {
  const F = 'var(--text-bright)'
  const D = 'var(--muted-deep)'

  return (
    <svg viewBox="0 0 1060 108" width="1060" height="108" fill="none"
      xmlns="http://www.w3.org/2000/svg">

      {/* ══════════════════════════════════
          REAR TRAILER   x 4 – 312
      ══════════════════════════════════ */}
      {/* Body */}
      <rect x="4" y={TTY} width="308" height={CHAS - TTY} fill={F} rx="1.5"/>
      {/* Chassis rail */}
      <rect x="4" y={CHAS} width="308" height="6" fill={D} rx="1"/>
      {/* Rear bumper */}
      <rect x="0" y={CHAS} width="7" height="14" rx="1" fill={D}/>
      {/* 2-axle bogie */}
      <rect x="112" y={CHAS} width="152" height="4" rx="1" fill={D}/>
      <Wheel cx={144}/><Wheel cx={178}/>
      <Wheel cx={222}/><Wheel cx={256}/>

      {/* ══════════════════════════════════
          DOLLY / A-COUPLING   x 312 – 402
      ══════════════════════════════════ */}
      <path d={`M 312 ${CHAS + 3} C 346 54 370 54 402 ${CHAS + 3}`}
        stroke={D} strokeWidth="4.5" strokeLinecap="round" fill="none"/>
      {/* Dolly axle */}
      <rect x="334" y={CHAS} width="52" height="4" rx="1" fill={D}/>
      <Wheel cx={360}/>

      {/* ══════════════════════════════════
          SEMI-TRAILER   x 406 – 748
      ══════════════════════════════════ */}
      {/* Body */}
      <rect x="406" y={TTY} width="342" height={CHAS - TTY} fill={F} rx="1.5"/>
      {/* Chassis rail */}
      <rect x="406" y={CHAS} width="342" height="6" fill={D} rx="1"/>
      {/* Landing legs */}
      <rect x="706" y={CHAS}    width="5" height="15" rx="0.5" fill={D}/>
      <rect x="720" y={CHAS}    width="5" height="15" rx="0.5" fill={D}/>
      <rect x="702" y={CHAS+13} width="12" height="3" rx="0.5" fill={D}/>
      <rect x="716" y={CHAS+13} width="12" height="3" rx="0.5" fill={D}/>
      {/* 3-axle bogie */}
      <rect x="504" y={CHAS} width="186" height="4" rx="1" fill={D}/>
      <Wheel cx={528}/><Wheel cx={562}/>
      <Wheel cx={604}/><Wheel cx={638}/>
      {/* 5th-wheel plate */}
      <rect x="742" y="59" width="56" height="8" rx="2" fill={D} opacity="0.75"/>

      {/* ══════════════════════════════════
          CAB — European flat-front (COE)
          x 750 – 1056
      ══════════════════════════════════ */}
      {/*
        Silhouette path (clockwise from rear-bottom):
          rear-bottom → front-bottom (chassis)
          → up bumper face (vertical) → windshield/face rake
          → roof leading edge → flat roof → sleeper step → rear at trailer height
      */}
      <path fill={F} d={`
        M 750 ${CHAS + 6}
        L 1052 ${CHAS + 6}
        L 1052 52
        L 1036 22
        L 1010 6
        L 954 0
        L 790 0
        L 766 6
        L 750 ${TTY}
        Z
      `}/>

      {/* Windshield glass — follows front face slope */}
      <path fill="rgba(160,215,248,0.24)" stroke={D} strokeWidth="1.2" d={`
        M 1008 10
        L 1032 24
        L 1046 56
        L 1046 65
        L 1006 65
        Z
      `}/>
      {/* Centre windshield divider */}
      <line x1="1026" y1="10" x2="1026" y2="65" stroke={D} strokeWidth="1"/>
      {/* Sun visor strip */}
      <rect x="1004" y="10" width="46" height="6" rx="1" fill={D} opacity="0.8"/>

      {/* Side window */}
      <rect x="762" y={TTY + 4} width="238" height="28" rx="3"
        fill="rgba(160,215,248,0.18)" stroke={D} strokeWidth="0.9"/>
      {/* Tint band along top of side window */}
      <rect x="762" y={TTY + 4} width="238" height="6" rx="2" fill={D} opacity="0.15"/>
      {/* Door post */}
      <line x1="870" y1="0" x2="870" y2={CHAS + 6} stroke={D} strokeWidth="1.4"/>
      {/* Roof step (sleeper ↔ main cab) */}
      <line x1="954" y1="0" x2="954" y2={TTY} stroke={D} strokeWidth="1.2"/>

      {/* Dual exhaust stacks */}
      <rect x="752" y="0" width="8" height="24" rx="4"   fill={D} opacity="0.80"/>
      <rect x="763" y="2" width="7" height="20" rx="3.5" fill={D} opacity="0.55"/>

      {/* Fuel tank */}
      <rect x="752" y="36" width="24" height="14" rx="3" fill={D} opacity="0.48"/>

      {/* Headlight cluster */}
      <rect x="1048" y="18" width="10" height="12" rx="2"   fill="#ffe090" opacity="0.80"/>
      <rect x="1048" y="32" width="10" height="8"  rx="1.5" fill="#f09040" opacity="0.60"/>

      {/* Front bumper */}
      <rect x="1046" y="46" width="12" height="26" rx="2" fill={D} opacity="0.75"/>
      {/* Grille slats */}
      <line x1="1047" y1="49" x2="1057" y2="49" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="1047" y1="53" x2="1057" y2="53" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="1047" y1="57" x2="1057" y2="57" stroke={F} strokeWidth="0.8" opacity="0.3"/>
      <line x1="1047" y1="61" x2="1057" y2="61" stroke={F} strokeWidth="0.8" opacity="0.3"/>

      {/* Side steps */}
      <rect x="763" y={CHAS}   width="60" height="3" rx="0.5" fill={D} opacity="0.6"/>
      <rect x="765" y={CHAS+3} width="56" height="3" rx="0.5" fill={D} opacity="0.45"/>

      {/* Cab chassis skirt */}
      <rect x="750" y={CHAS} width="306" height="6" fill={D} rx="1"/>

      {/* Tandem drive axles */}
      <rect x="836" y={CHAS} width="116" height="4" rx="1" fill={D}/>
      <Wheel cx={862}/><Wheel cx={900}/>

      {/* Front steer axle */}
      <rect x="982" y={CHAS} width="68" height="4" rx="1" fill={D}/>
      <Wheel cx={1012}/>

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
