// Top-down sports car (nose points down). Pure SVG, so no external assets needed.
export default function Car({ className = "" }) {
  return (
    <svg viewBox="0 0 120 260" className={className} aria-label="car">
      <defs>
        <linearGradient id="body" x1="0" x2="1">
          <stop offset="0" stopColor="#ff7a18" />
          <stop offset="0.5" stopColor="#ffb347" />
          <stop offset="1" stopColor="#ff7a18" />
        </linearGradient>
      </defs>
      {[[8, 45], [102, 45], [8, 180], [102, 180]].map(([x, y]) => (
        <rect key={x + "" + y} x={x - 8} y={y} width="18" height="42" rx="6" fill="#111" />
      ))}
      <path d="M60 6C88 6 104 40 104 90v90c0 38-18 70-44 70S16 218 16 180V90C16 40 32 6 60 6Z" fill="url(#body)" />
      <path d="M34 98c0-14 12-22 26-22s26 8 26 22v40c0 10-12 16-26 16s-26-6-26-16Z" fill="#14202b" />
      <path d="M40 176h40v34H40z" fill="#14202b" opacity=".85" />
      <rect x="26" y="230" width="22" height="6" rx="3" fill="#fff" opacity=".9" />
      <rect x="72" y="230" width="22" height="6" rx="3" fill="#fff" opacity=".9" />
    </svg>
  );
}
