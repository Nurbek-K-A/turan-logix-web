/**
 * Clean curtainsider tandem silhouette:
 *   [rear trailer] ── dolly ── [semi-trailer] ── [cab]
 * Low opacity so it doesn't compete with content.
 */
export default function TruckAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'relative',
        width: '100%',
        height: 84,
        overflow: 'hidden',
        borderTop: '1px solid var(--border)',
        background: 'var(--bg-alt)',
      }}
    >
      {/* Road line */}
      <div style={{
        position: 'absolute',
        bottom: 10,
        left: 0, right: 0,
        height: 1,
        background: 'var(--border)',
      }} />

      <div className="truck-drive" style={{ position: 'absolute', bottom: 11, opacity: 0.22 }}>
        <TandemSilhouette />
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────
   Silhouette dimensions (all y values, ground = 64)
   Wheel centres: y=55, r=9  → bottom of wheel y=64 = ground
   Trailer body:  y=14 … y=46
   Cab body:      y=4  … y=46   (cab is visibly taller)
───────────────────────────────────────────────*/

const TY = 14   // trailer top
const TB = 46   // body bottom (shared)
const CY = 4    // cab roof top

function TandemSilhouette() {
  const F = 'var(--text-bright)'   // panel fill
  const D = 'var(--muted-deep)'    // darker detail

  return (
    <svg viewBox="0 0 724 66" width="724" height="66" fill="none"
      xmlns="http://www.w3.org/2000/svg">

      {/* ═══════════════════════════
          REAR CURTAIN TRAILER  0–218
          ═══════════════════════════ */}
      <TrailerBox x={2} w={216} F={F} D={D} strapGap={20} showBumper />
      {/* axle housing + 2 bogies */}
      <rect x="28" y={TB} width="148" height="3" rx="1" fill={D} opacity="0.55" />
      <Wheel cx={52}  D={D} /><Wheel cx={70}  D={D} />
      <Wheel cx={132} D={D} /><Wheel cx={150} D={D} />

      {/* ═══════════════════════════
          DOLLY / COUPLING  220–270
          ═══════════════════════════ */}
      <path d="M 218 48 C 235 44 255 44 270 48"
        stroke={D} strokeWidth="2.2" strokeLinecap="round" />
      <rect x="230" y={TB} width="32" height="3" rx="1" fill={D} opacity="0.5" />
      <Wheel cx={246} D={D} />

      {/* ═══════════════════════════
          SEMI TRAILER  274–558
          ═══════════════════════════ */}
      <TrailerBox x={274} w={284} F={F} D={D} strapGap={22} />
      {/* landing legs */}
      <rect x="527" y={TB}   width="4" height="12" rx="0.5" fill={D} opacity="0.5" />
      <rect x="539" y={TB}   width="4" height="12" rx="0.5" fill={D} opacity="0.5" />
      <rect x="524" y="57"   width="12" height="2" rx="0.5" fill={D} opacity="0.5" />
      <rect x="536" y="57"   width="12" height="2" rx="0.5" fill={D} opacity="0.5" />
      {/* rear bogies */}
      <rect x="388" y={TB} width="138" height="3" rx="1" fill={D} opacity="0.55" />
      <Wheel cx={412} D={D} /><Wheel cx={430} D={D} />
      <Wheel cx={470} D={D} /><Wheel cx={488} D={D} />

      {/* 5th-wheel plate */}
      <rect x="556" y="40" width="72" height="7" rx="2" fill={D} opacity="0.45" />

      {/* ═══════════════════════════
          CAB (DAF XF style)  562–724
          ═══════════════════════════ */}

      {/* Sleeper roof pod (taller section behind main cab) */}
      <rect x="562" y={CY} width="118" height={TY - CY} rx="2" fill={F} />

      {/* Main cab body */}
      <rect x="562" y={TY} width="148" height={TB - TY} rx="1" fill={F} />

      {/* Front face — slight rake like a DAF XF */}
      {/*  goes from top of windshield x=710,y=14  to bumper x=720,y=46 */}
      <path d={`M 710 ${TY} L 718 20 L 720 ${TB} L 710 ${TB} Z`} fill={F} />

      {/* Windshield (two panes) */}
      <path d={`M 678 ${TY} L 710 ${TY} L 718 20 L 718 38 L 678 38 Z`}
        fill="rgba(160,205,240,0.18)" stroke={D} strokeWidth="0.9" />
      {/* centre divider */}
      <line x1="694" y1={TY} x2="694" y2="38" stroke={D} strokeWidth="0.7" />

      {/* Sun visor strip above windshield */}
      <rect x="678" y={TY} width="40" height="4" rx="1" fill={D} opacity="0.75" />

      {/* Side window */}
      <rect x="578" y={TY + 4} width="98" height="17" rx="1.5"
        fill="rgba(160,205,240,0.15)" stroke={D} strokeWidth="0.7" />
      {/* window tint band */}
      <rect x="578" y={TY + 4} width="98" height="5" rx="1" fill={D} opacity="0.18" />
      {/* door seam */}
      <line x1="642" y1={TY} x2="642" y2={TB} stroke={D} strokeWidth="0.7" />

      {/* Roof transition step */}
      <line x1="680" y1={CY} x2="680" y2={TY} stroke={D} strokeWidth="0.8" />

      {/* Dual exhaust stacks */}
      <rect x="565" y="0" width="5" height="18" rx="2.5" fill={D} opacity="0.65" />
      <rect x="573" y="0" width="5" height="18" rx="2.5" fill={D} opacity="0.5" />

      {/* Fuel tank */}
      <rect x="564" y="34" width="22" height="12" rx="3" fill={D} opacity="0.45" />

      {/* Headlight cluster */}
      <rect x="714" y="14" width="8" height="8" rx="1.5"
        fill="#ffe090" opacity="0.65" />
      {/* Fog / position lamp */}
      <rect x="714" y="24" width="8" height="5" rx="1"
        fill="#f09040" opacity="0.5" />

      {/* Lower front bumper */}
      <rect x="712" y="38" width="12" height="8" rx="1.5" fill={D} opacity="0.7" />
      {/* Grille slats */}
      <line x1="713" y1="39" x2="723" y2="39" stroke={F} strokeWidth="0.7" opacity="0.3" />
      <line x1="713" y1="41" x2="723" y2="41" stroke={F} strokeWidth="0.7" opacity="0.3" />
      <line x1="713" y1="43" x2="723" y2="43" stroke={F} strokeWidth="0.7" opacity="0.3" />

      {/* Side steps */}
      <rect x="576" y={TB}   width="58" height="3" rx="0.5" fill={D} opacity="0.6" />
      <rect x="579" y={TB+3} width="52" height="3" rx="0.5" fill={D} opacity="0.45" />

      {/* Cab chassis skirt */}
      <rect x="562" y={TB} width="162" height="3" rx="0.5" fill={D} opacity="0.55" />

      {/* Rear drive bogies */}
      <rect x="580" y={TB} width="100" height="3" rx="1" fill={D} opacity="0.45" />
      <Wheel cx={600} D={D} /><Wheel cx={618} D={D} />
      <Wheel cx={648} D={D} /><Wheel cx={666} D={D} />

      {/* Front steer axle */}
      <rect x="695" y={TB} width="28" height="3" rx="1" fill={D} opacity="0.45" />
      <Wheel cx={709} D={D} />

    </svg>
  )
}

/* ── Trailer box with curtain straps ── */
interface TrailerBoxProps {
  x: number; w: number
  F: string; D: string
  strapGap: number
  showBumper?: boolean
}
function TrailerBox({ x, w, F, D, strapGap, showBumper }: TrailerBoxProps) {
  const straps: number[] = []
  for (let sx = x + strapGap; sx < x + w - 6; sx += strapGap) straps.push(sx)

  return (
    <g>
      {/* Body fill */}
      <rect x={x} y={TY} width={w} height={TB - TY} rx="1" fill={F} />
      {/* Roof rail */}
      <rect x={x} y={TY} width={w} height="3" rx="1" fill={D} />
      {/* Bottom skirt rail */}
      <rect x={x} y={TB - 3} width={w} height="3" rx="0.5" fill={D} />
      {/* Curtain straps */}
      {straps.map(sx => (
        <line key={sx} x1={sx} y1={TY + 3} x2={sx} y2={TB - 3}
          stroke={D} strokeWidth="0.9" opacity="0.7" />
      ))}
      {/* Rear corner post */}
      <rect x={x}           y={TY - 2} width="4" height={TB - TY + 4} rx="0.5" fill={D} />
      {/* Front corner post */}
      <rect x={x + w - 2}   y={TY - 2} width="4" height={TB - TY + 4} rx="0.5" fill={D} />
      {/* Rear bumper + reflectors */}
      {showBumper && (
        <>
          <rect x={x - 2}  y={TB}     width="6" height="6" rx="0.5" fill={D} />
          <rect x={x - 1}  y={TB + 1} width="3" height="2" rx="0.5"
            fill="#e04020" opacity="0.8" />
          <rect x={x - 1}  y={TB + 3} width="3" height="2" rx="0.5"
            fill="#e0c020" opacity="0.7" />
        </>
      )}
    </g>
  )
}

/* ── Wheel: tyre + simple hub ── */
function Wheel({ cx, D }: { cx: number; D: string }) {
  return (
    <g>
      <circle cx={cx} cy={55} r={9}   fill={D} opacity="0.9" />
      <circle cx={cx} cy={55} r={5.5} fill="var(--bg-alt)" opacity="0.65" />
      <circle cx={cx} cy={55} r={1.5} fill={D} opacity="0.8" />
    </g>
  )
}
