import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

const maileed = [
  'Système IA propriétaire ultra-performant',
  'Résultats garantis contractuellement',
  'Pipeline automatisé de A à Z',
  'Personnalisation à grande échelle',
  'Reporting transparent chaque semaine',
]

const classic = [
  'Prospection manuelle et chronophage',
  'Aucune garantie de résultats',
  'Coût d’un SDR : 40 000€+/an',
  'Personnalisation impossible à l’échelle',
  'Résultats imprévisibles',
]

export default function WhyUs() {
  return (
    <section id="pourquoi" className="section-tint relative z-10 px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-5xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">Pourquoi Maileed</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            La différence est claire.
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {/* Maileed */}
          <motion.div variants={fadeInUp} className="glass-card glass-card--glow p-8">
            <h3 className="mb-6 flex h-8 items-center" aria-label="Maileed">
              <span className="logo-shine">
                <img src="/logo-mark.png" alt="Maileed" className="h-8 w-auto" />
                <span className="logo-shine__glint" />
              </span>
            </h3>
            <ul className="space-y-4">
              {maileed.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-sm text-[#374151]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M5 13l4 4L19 7"
                        stroke="#3894FF"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Agence classique / SDR interne */}
          <motion.div
            variants={fadeInUp}
            className="rounded-2xl border border-accent/10 bg-white/55 p-8 opacity-80 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-xl font-bold text-[#9CA3AF]">
              Agence classique / SDR interne
            </h3>
            <ul className="space-y-4">
              {classic.map((item) => (
                <motion.li
                  key={item}
                  variants={fadeInUp}
                  className="flex items-start gap-3 text-sm text-[#9CA3AF]"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6]">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M6 6l12 12M18 6L6 18"
                        stroke="#9ca3af"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
