import { motion } from 'framer-motion'
import { staggerContainer, viewport } from '../lib/motion'

// Wraps a section with a scroll-triggered staggered reveal container.
export default function Section({ id, className = '', children }) {
  return (
    <motion.section
      id={id}
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      className={`relative z-10 ${className}`}
    >
      {children}
    </motion.section>
  )
}
