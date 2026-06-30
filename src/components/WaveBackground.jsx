import { motion } from 'framer-motion'

// Extremely subtle ambient violet light washes that drift slowly across the
// whole page, behind the floating logos. Purely atmospheric.
const waves = [
  { className: 'left-[-10%] top-[5%] h-[60vh] w-[60vw]', color: 'rgba(94,58,166,0.16)', x: [0, 110, 0], y: [0, 55, 0], dur: 24 },
  { className: 'right-[-15%] top-[35%] h-[70vh] w-[65vw]', color: 'rgba(31,19,69,0.34)', x: [0, -95, 0], y: [0, 65, 0], dur: 30 },
  { className: 'left-[20%] bottom-[-10%] h-[55vh] w-[55vw]', color: 'rgba(94,58,166,0.13)', x: [0, 70, 0], y: [0, -55, 0], dur: 28 },
]

export default function WaveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {waves.map((w, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full blur-[120px] ${w.className}`}
          style={{ background: `radial-gradient(circle, ${w.color} 0%, transparent 70%)` }}
          animate={{ x: w.x, y: w.y, opacity: [0.5, 1, 0.5] }}
          transition={{ duration: w.dur, repeat: Infinity, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}
