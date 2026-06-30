// Maileed brand mark — a split envelope with a downward chevron flap.
// Two mirrored bracket halves separated by a central gap.
export default function MailMark({ className = '', stroke = '#7A52CC' }) {
  return (
    <svg
      viewBox="0 0 120 92"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth="7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {/* Left half */}
      <path d="M57 14 H26 A12 12 0 0 0 14 26 V66 A12 12 0 0 0 26 78 H57" />
      <path d="M21 21 L57 56" />
      {/* Right half */}
      <path d="M63 14 H94 A12 12 0 0 1 106 26 V66 A12 12 0 0 1 94 78 H63" />
      <path d="M99 21 L63 56" />
    </svg>
  )
}
