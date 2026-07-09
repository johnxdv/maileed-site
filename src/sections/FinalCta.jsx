import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

const phrases = [
  'remplir votre agenda ?',
  'augmenter votre CA ?',
  "prendre de l'avance ?",
  'scaler votre acquisition ?',
  'générer plus de clients ?',
  'gagner du temps ?',
]

export default function FinalCta() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2500)
    return () => clearInterval(id)
  }, [])

  return (
    <section id="contact" className="relative z-10 overflow-hidden bg-[#EBF4FF]/70 px-6 py-32">
      {/* Large violet glow orb */}
      <div className="glow-orb left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 animate-pulseGlow bg-accent/[0.07]" />
      <div className="glow-orb left-1/2 top-1/2 h-[18rem] w-[18rem] -translate-x-1/2 -translate-y-1/2 bg-primary/50" />

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="relative mx-auto flex max-w-3xl flex-col items-center text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="w-full max-w-full font-extrabold leading-tight tracking-tight"
          style={{ fontSize: 'clamp(1.8rem, 5vw, 3.5rem)' }}
        >
          <span className="block text-[#0A0A1A]">Prêt à</span>
          <span className="relative mt-1 block h-[2.7em] w-full max-w-[100vw] overflow-hidden sm:h-[1.3em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="phrase-flash accent-glow absolute inset-0 flex items-center justify-center whitespace-normal px-2 text-center leading-tight sm:whitespace-nowrap sm:px-0"
                initial={{ y: '0.45em', opacity: 0 }}
                animate={{ y: '0em', opacity: 1 }}
                exit={{ y: '-0.45em', opacity: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                {phrases[index]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-[#6B7280]"
        >
          Réservez un appel de 20 minutes. Analysons ensemble votre potentiel de croissance.
        </motion.p>

        {/* Calendly placeholder */}
        <motion.div variants={fadeInUp} className="mt-10 w-full max-w-xl">
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-accent/30 bg-white/60 px-6 py-12 text-center text-sm text-[#9CA3AF] backdrop-blur-xl">
            [ Calendly widget will be embedded here ]
          </div>
        </motion.div>

        <motion.div variants={fadeInUp} className="mt-8">
          <a
            href="mailto:contact@maileed.com?subject=Demande%20d'appel%20gratuit"
            className="btn-primary px-9 py-4 text-base"
          >
            Réserver mon appel gratuit →
          </a>
        </motion.div>

        <motion.p variants={fadeInUp} className="mt-6 text-sm text-[#9CA3AF]">
          Sans engagement · Audit gratuit
        </motion.p>
      </motion.div>
    </section>
  )
}
