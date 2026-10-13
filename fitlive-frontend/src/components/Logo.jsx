export default function Logo({ size = 44 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" aria-hidden="true" focusable="false">
      <g
        transform="rotate(-28 24 24)"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M14 24h20" />
        <rect x="7" y="14" width="6" height="20" rx="2" />
        <rect x="35" y="14" width="6" height="20" rx="2" />
        <rect x="13" y="18" width="3" height="12" rx="1" fill="#fff" />
        <rect x="32" y="18" width="3" height="12" rx="1" fill="#fff" />
      </g>
    </svg>
  )
}
