import { useMemo } from 'react'
import { motion } from 'framer-motion'

// Soft blue gradient orbs distributed across the full page height. Each drifts,
// pulses in size, and fades independently — like light reflections / soft aurora.
export default function Orbs({ count = 9 }) {
  const orbs = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min)
    // size buckets: large / medium / small
    const buckets = [
      [600, 800],
      [300, 400],
      [150, 200],
    ]
    return Array.from({ length: count }, (_, i) => {
      const [mn, mx] = buckets[i % 3]
      return {
        id: i,
        size: rand(mn, mx),
        left: rand(2, 84),
        top: rand(1, 94),
        baseOpacity: rand(0.18, 0.28),
        duration: rand(4, 12),
        delay: rand(0, 5),
        dx: rand(-130, 130),
        dy: rand(-120, 120),
      }
    })
  }, [count])

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      {orbs.map((o) => (
        <motion.div
          key={o.id}
          className="absolute rounded-full"
          style={{
            left: `${o.left}%`,
            top: `${o.top}%`,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, rgba(56,148,255,${o.baseOpacity}) 0%, transparent 70%)`,
            filter: 'blur(40px)',
          }}
          animate={{
            x: [0, o.dx, 0],
            y: [0, o.dy, 0],
            scale: [0.7, 1.3, 0.7],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: o.duration,
            delay: o.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  )
}
