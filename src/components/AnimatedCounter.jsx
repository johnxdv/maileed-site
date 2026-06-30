import { useEffect, useRef, useState } from 'react'
import { useInView, useMotionValue, animate } from 'framer-motion'

// Counts up from 0 to `value` when scrolled into view.
export default function AnimatedCounter({ value, prefix = '', suffix = '', duration = 2 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.5 })
  const motionValue = useMotionValue(0)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    const controls = animate(motionValue, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => setDisplay(Math.round(latest)),
    })
    return controls.stop
  }, [inView, value, duration, motionValue])

  return (
    <span ref={ref}>
      {prefix}
      {new Intl.NumberFormat('fr-FR').format(display)}
      {suffix}
    </span>
  )
}
