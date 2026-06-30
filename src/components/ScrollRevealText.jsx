import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

// Progressively brightens each word from muted gray to white as the section
// scrolls through the viewport (scroll-driven text highlight effect).
export default function ScrollRevealText({ text, className = '' }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.25'],
  })

  const words = text.split(' ')

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length
        const end = start + 1 / words.length
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        )
      })}
    </span>
  )
}

function Word({ children, progress, range }) {
  const color = useTransform(progress, range, ['#3f3a52', '#ffffff'])
  return (
    <motion.span style={{ color }} className="transition-colors">
      {children}{' '}
    </motion.span>
  )
}
