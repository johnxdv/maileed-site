import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer } from '../lib/motion'
import VideoPlayer from '../components/VideoPlayer'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center justify-center overflow-hidden px-6 pb-20 pt-32"
    >
      {/* Soft violet glow orbs */}
      <div
        className="glow-orb left-[12%] top-[18%] h-72 w-72 animate-float bg-accent/[0.07]"
        style={{ animationDelay: '0s' }}
      />
      <div
        className="glow-orb right-[10%] top-[30%] h-80 w-80 animate-float bg-primary/50"
        style={{ animationDelay: '2.5s' }}
      />
      <div
        className="glow-orb bottom-[8%] left-[40%] h-64 w-64 animate-float bg-accent/[0.05]"
        style={{ animationDelay: '4s' }}
      />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <motion.h1
          variants={fadeInUp}
          className="text-balance text-5xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
        >
          <span className="text-gradient">
            Vos prochains clients ne sont qu'à un{' '}
            <span className="hero-email">email.</span>
          </span>
        </motion.h1>

        {/* Presentation video */}
        <motion.div variants={fadeInUp} className="mt-12 w-full max-w-2xl">
          <VideoPlayer />
        </motion.div>

        <motion.p variants={fadeInUp} className="mt-12 text-sm text-[#9CA3AF]">
          Ce que nous verrons ensemble lors de l'appel :
        </motion.p>

        <motion.ul
          variants={fadeInUp}
          className="mt-4 flex flex-col items-center gap-3 sm:flex-row sm:gap-8"
        >
          <li className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span className="text-accent">✦</span> Audit de votre situation actuelle
          </li>
          <li className="flex items-center gap-2 text-sm text-[#6B7280]">
            <span className="text-accent">✦</span> Stratégie personnalisée calquée sur vos objectifs
          </li>
        </motion.ul>

        <motion.div variants={fadeInUp} className="mt-10">
          <a href="#contact" className="btn-primary px-10 py-4 text-base">
            Réserver mon appel gratuit →
          </a>
        </motion.div>
      </motion.div>
    </section>
  )
}
