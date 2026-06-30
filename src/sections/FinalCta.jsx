import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

export default function FinalCta() {
  return (
    <section id="contact" className="relative z-10 overflow-hidden px-6 py-32">
      {/* Large violet glow orb */}
      <div className="glow-orb left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 animate-pulseGlow bg-accent/30" />
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
          className="text-4xl font-extrabold tracking-tight sm:text-6xl"
        >
          <span className="text-gradient">Prêt à remplir votre agenda ?</span>
        </motion.h2>

        <motion.p
          variants={fadeInUp}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/65"
        >
          Réservez un appel de 20 minutes. On vous dit exactement combien de RDV on peut
          générer pour votre business.
        </motion.p>

        {/* Calendly placeholder */}
        <motion.div variants={fadeInUp} className="mt-10 w-full max-w-xl">
          <div className="flex min-h-[180px] items-center justify-center rounded-2xl border border-dashed border-accent/30 bg-white/[0.03] px-6 py-12 text-center text-sm text-white/40 backdrop-blur-xl">
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

        <motion.p variants={fadeInUp} className="mt-6 text-sm text-white/45">
          Sans engagement · Réponse sous 24h
        </motion.p>
      </motion.div>
    </section>
  )
}
