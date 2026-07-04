import { useRef } from 'react'
import { motion, useScroll } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

const steps = [
  {
    indicator: '2024',
    title: 'Les débuts',
    text: "En 2024, nous étions une agence marketing comme tant d'autres, à la recherche de leviers vraiment efficaces.",
  },
  {
    indicator: '02',
    title: 'Le déclic',
    text: "En testant l'IA appliquée à la prospection B2B, nous avons obtenu des résultats que rien d'autre n'approchait.",
  },
  {
    indicator: '03',
    title: 'Le tournant',
    text: "Nous avons tout misé sur cette approche. Maileed est né de cette conviction : l'outreach piloté par l'IA change les règles du jeu.",
  },
]

export default function About() {
  const container = useRef(null)
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start 0.7', 'end 0.7'],
  })

  return (
    <section id="equipe" className="relative z-10 px-6 py-24">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">Notre histoire</span>
        </motion.div>
      </motion.div>

      <div ref={container} className="relative mx-auto mt-12 max-w-3xl">
        {/* Timeline track */}
        <div className="absolute left-5 top-2 bottom-2 w-px bg-[#E5E7EB] md:left-1/2" />
        {/* Animated progress fill */}
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="absolute left-5 top-2 bottom-2 w-px origin-top bg-gradient-to-b from-accent to-accent/30 shadow-glow md:left-1/2"
        />

        <div className="space-y-8 md:space-y-10">
          {steps.map((s, i) => {
            const left = i % 2 === 0
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative md:grid md:grid-cols-2 md:gap-10"
              >
                {/* Node dot */}
                <span className="absolute left-5 top-5 z-10 flex h-3 w-3 -translate-x-1/2 items-center justify-center rounded-full bg-accent shadow-glow md:left-1/2">
                  <span className="absolute h-3 w-3 animate-ping rounded-full bg-accent/50" />
                </span>

                {/* Card */}
                <div
                  className={`pl-12 md:pl-0 ${
                    left ? 'md:pr-12 md:text-right' : 'md:col-start-2 md:pl-12'
                  }`}
                >
                  <div className="glass-card p-5 sm:p-6">
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">
                      {s.indicator}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-[#0A0A1A]">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-[#6B7280]">{s.text}</p>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
