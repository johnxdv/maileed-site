import { useMemo } from 'react'
import { motion } from 'framer-motion'
import AnimatedEnvelope from './AnimatedEnvelope'

// Subtle field of Maileed envelopes that slowly float and drift across the
// dark background. Each one periodically opens its flap and a checkmark
// rises out — like an email being sent.
export default function FloatingLogos({ count = 16 }) {
  const items = useMemo(() => {
    const rand = (min, max) => min + Math.random() * (max - min)
    return Array.from({ length: count }, (_, i) => {
      const opacity = rand(0.08, 0.24)
      return {
        id: i,
        left: rand(0, 100),
        top: rand(0, 100),
        size: rand(18, 58),
        opacity,
        duration: rand(16, 32),
        delay: rand(0, 12),
        driftX: rand(-150, 150),
        driftY: rand(-120, 120),
        rotate: rand(-26, 26),
        tickPeak: Math.min(opacity * 2.4, 0.34),
        tickDelay: rand(0, 7),
        tickGap: rand(4, 9),
      }
    })
  }, [count])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {items.map((it) => (
        <motion.div
          key={it.id}
          className="absolute"
          style={{ left: `${it.left}%`, top: `${it.top}%`, width: it.size }}
          animate={{
            x: [0, it.driftX, 0],
            y: [0, it.driftY, 0],
            rotate: [0, it.rotate, 0],
          }}
          transition={{
            duration: it.duration,
            delay: it.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <AnimatedEnvelope
            opacity={it.opacity}
            tickPeak={it.tickPeak}
            delay={it.tickDelay}
            gap={it.tickGap}
          />
        </motion.div>
      ))}
    </div>
  )
}
