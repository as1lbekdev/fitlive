function Cube({ x, y, s = 1, delay = 0 }) {
  return (
    <g className="drop" style={{ '--delay': `${delay}ms` }}>
      <g transform={`translate(${x} ${y}) scale(${s})`}>
        <polygon points="0,-22 22,-11 0,0 -22,-11" fill="#fff" />
        <polygon points="-22,-11 0,0 0,26 -22,15" fill="#2f8cff" />
        <polygon points="0,0 22,-11 22,15 0,26" fill="#1a63c9" />
      </g>
    </g>
  )
}

function Prism({ x, y, h, delay = 0 }) {
  return (
    <g className="drop" style={{ '--delay': `${delay}ms` }}>
      <polygon points={`${x},${y - 9} ${x + 18},${y} ${x},${y + 9} ${x - 18},${y}`} fill="#fff" />
      <polygon points={`${x - 18},${y} ${x},${y + 9} ${x},${y + 9 + h} ${x - 18},${y + h}`} fill="#2f8cff" />
      <polygon points={`${x},${y + 9} ${x + 18},${y} ${x + 18},${y + h} ${x},${y + 9 + h}`} fill="#1a63c9" />
    </g>
  )
}

function Diamond({ x, y, r = 20 }) {
  return (
    <polygon
      points={`${x},${y - r / 2} ${x + r},${y} ${x},${y + r / 2} ${x - r},${y}`}
      fill="none"
      stroke="#fff"
      strokeWidth="1.5"
      strokeDasharray="4 5"
      opacity=".7"
    />
  )
}

export default function HeroArt() {
  return (
    <svg className="art" viewBox="0 0 640 560" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="face" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#58b6ff" />
          <stop offset="1" stopColor="#2178e6" />
        </linearGradient>
        <radialGradient id="halo" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#3aa0ff" stopOpacity=".28" />
          <stop offset="1" stopColor="#3aa0ff" stopOpacity="0" />
        </radialGradient>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <ellipse cx="310" cy="270" rx="290" ry="230" fill="url(#halo)" />

      <Diamond x={64} y={110} r={26} />
      <Diamond x={470} y={44} r={22} />
      <Diamond x={606} y={330} r={20} />

      {/* ekran: qalinlik */}
      <polygon points="440,170 462,182 462,412 440,400" fill="#14509f" />
      <polygon points="140,320 440,400 462,412 162,332" fill="#0f3f84" />
      {/* ekran: old yuza */}
      <polygon
        points="140,90 440,170 440,400 140,320"
        fill="url(#face)"
        stroke="#fff"
        strokeWidth="5"
        strokeLinejoin="round"
      />

      {/* ekran ichidagi jonli puls */}
      <g transform="matrix(1 0.2667 0 1 140 90)">
        <path d="M22 22 L22 54 L48 38 Z" fill="none" stroke="#fff" strokeWidth="3" strokeLinejoin="round" />
        {[84, 102, 120, 138, 156, 174].map((cy) => (
          <circle key={cy} cx="28" cy={cy} r="3.5" fill="none" stroke="#fff" strokeWidth="2" />
        ))}
        <circle cx="232" cy="36" r="6" fill="#ff4d6d" />
        <text x="246" y="42" fill="#fff" fontFamily="'Exo 2', sans-serif" fontWeight="800" fontSize="17">
          LIVE
        </text>
        <path d="M56 140 H282" stroke="#fff" strokeOpacity=".28" strokeWidth="2" strokeDasharray="3 7" />
        <path
          className="pulse"
          d="M56 140 H114 L134 140 L152 78 L178 198 L200 112 L214 140 H282"
          fill="none"
          stroke="#fff"
          strokeWidth="7"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#glow)"
        />
      </g>

      <Cube x={92} y={196} s={1} delay={200} />
      <Cube x={560} y={128} s={1.15} delay={320} />
      <Cube x={590} y={246} s={0.8} delay={440} />
      <Cube x={64} y={392} s={0.75} delay={560} />

      <Prism x={520} y={410} h={70} delay={640} />
      <Prism x={562} y={386} h={96} delay={720} />
      <Prism x={604} y={362} h={122} delay={800} />

      {/* gantel */}
      <g className="drop" style={{ '--delay': '480ms' }}>
        <g transform="translate(262 438) rotate(-20)">
          <g transform="translate(9 11)" fill="#0b2559">
            <rect x="-160" y="-56" width="28" height="112" rx="9" />
            <rect x="132" y="-56" width="28" height="112" rx="9" />
            <rect x="-130" y="-9" width="260" height="18" rx="9" />
          </g>
          <rect x="-130" y="-9" width="260" height="18" rx="9" fill="#f1f8ff" />
          <g stroke="#fff" strokeWidth="4" strokeLinejoin="round">
            <rect x="-160" y="-56" width="28" height="112" rx="9" fill="#2f8cff" />
            <rect x="-132" y="-42" width="24" height="84" rx="8" fill="#7cc4ff" />
            <rect x="108" y="-42" width="24" height="84" rx="8" fill="#7cc4ff" />
            <rect x="132" y="-56" width="28" height="112" rx="9" fill="#2f8cff" />
          </g>
        </g>
      </g>
    </svg>
  )
}
