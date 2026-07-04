import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'
import AnimatedCounter from '../components/AnimatedCounter'
import ScrollRevealText from '../components/ScrollRevealText'

const stats = [
  { value: 43, suffix: 'x', label: 'ROI moyen généré' },
  { value: 10000, suffix: '+', label: 'Emails envoyés' },
  { value: 4, suffix: '/5', label: 'Prospects qualifiés closés' },
  { value: 76, suffix: '%', label: "Taux d'ouverture moyen" },
]

export default function Results() {
  return (
    <section id="resultats" className="relative z-10 bg-[#EBF4FF]/70 px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">Résultats</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ce que nos clients obtiennent.
          </h2>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeInUp}
              className="group glass-card flex flex-col items-center px-6 py-10 text-center"
            >
              <span className="metric-shine text-5xl font-extrabold tracking-tight">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </span>
              <span className="mt-3 text-sm leading-snug text-[#6B7280]">{s.label}</span>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="mt-12 flex justify-center">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-accent/25 bg-[#F3F4F6] px-5 py-2.5 text-xs font-medium uppercase tracking-[0.12em] text-[#9CA3AF]">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 2l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V5z"
                stroke="#3894FF"
                strokeWidth="1.6"
                strokeLinejoin="round"
              />
              <path
                d="M9 12l2 2 4-4"
                stroke="#3894FF"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Performances garanties contractuellement — satisfait ou remboursé
          </span>
        </motion.div>

        {/* Testimonial with scroll-driven text reveal */}
        <motion.figure variants={fadeInUp} className="mx-auto mt-20 max-w-3xl text-center">
          <span className="block text-5xl font-bold leading-none text-accent/40">“</span>
          <blockquote className="-mt-4 text-2xl font-medium italic leading-relaxed sm:text-3xl">
            <ScrollRevealText text="L'email reste sous-exploité par la majorité des entreprises B2B — c'est exactement ce qui en fait un levier aussi puissant aujourd'hui." />
          </blockquote>
          <figcaption className="mt-6 text-sm text-[#9CA3AF]">
            — Client Maileed, secteur immobilier
          </figcaption>
        </motion.figure>
      </motion.div>
    </section>
  )
}
