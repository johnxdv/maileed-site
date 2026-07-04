import { motion } from 'framer-motion'

// A Maileed envelope mark whose flap opens, lets a checkmark rise out,
// then closes — looped on a staggered, occasional cadence.
// Static state = the brand mark (split envelope + downward chevron flap).
export default function AnimatedEnvelope({
  opacity = 0.15,
  tickPeak = 0.3,
  delay = 0,
  gap = 6,
  bodyStroke = '#3894FF',
  tickStroke = '#3894FF',
}) {
  const DUR = 2.4
  const cycle = { duration: DUR, repeat: Infinity, repeatDelay: gap, delay, ease: 'easeInOut' }

  return (
    <svg
      viewBox="0 0 120 92"
      className="h-auto w-full overflow-visible"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {/* Envelope body (static) */}
      <g stroke={bodyStroke} strokeWidth="7" style={{ opacity }}>
        <path d="M57 14 H26 A12 12 0 0 0 14 26 V66 A12 12 0 0 0 26 78 H57" />
        <path d="M63 14 H94 A12 12 0 0 1 106 26 V66 A12 12 0 0 1 94 78 H63" />
      </g>

      {/* Checkmark rising out of the envelope */}
      <motion.path
        d="M45 50 L56 61 L77 38"
        stroke={tickStroke}
        strokeWidth="7"
        fill="none"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        animate={{
          // 1) appear in place at the opening, 2) hold, 3) rise up & fade out
          y: [10, 10, 8, 6, -54],
          opacity: [0, 0, tickPeak, tickPeak, 0],
          scale: [0.2, 0.2, 1, 1, 1],
        }}
        transition={{ ...cycle, times: [0, 0.36, 0.56, 0.72, 0.96], ease: 'easeOut' }}
      />

      {/* Flap (chevron) that opens upward, then closes */}
      <motion.g
        stroke={bodyStroke}
        strokeWidth="7"
        style={{ opacity, transformBox: 'fill-box', transformOrigin: 'top' }}
        animate={{ scaleY: [1, 1, -0.92, -0.92, 1] }}
        transition={{ ...cycle, times: [0, 0.16, 0.36, 0.78, 1] }}
      >
        <path d="M21 21 L57 56" />
        <path d="M99 21 L63 56" />
      </motion.g>
    </svg>
  )
}
