import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

const faqs = [
  {
    q: "Qu'est-ce qu'un RDV qualifié ?",
    a: "Un décideur (CEO, fondateur, directeur) qui a confirmé avoir un besoin, et avec qui un créneau d'appel ou de rencontre est posé dans votre agenda.",
  },
  {
    q: 'En combien de temps on voit des résultats ?',
    a: 'Les premières réponses arrivent généralement dans les 7 à 10 jours suivant le lancement. Les premiers RDV dans les 2 à 3 semaines.',
  },
  {
    q: "Vous travaillez avec quels types d'entreprises ?",
    a: "Agences digitales, SaaS B2B, consultants, recruteurs — toute structure B2B avec un ticket moyen supérieur à 1 500€ et un besoin de pipeline constant.",
  },
  {
    q: 'Que se passe-t-il si les objectifs ne sont pas atteints ?',
    a: "Nos engagements sont inscrits dans le contrat. Si l'objectif de RDV n'est pas atteint, vous êtes remboursé selon les conditions prévues.",
  },
  {
    q: "Est-ce que je dois m'impliquer dans le process ?",
    a: 'Très peu. Un call de 30 minutes au démarrage pour définir votre ICP, et vous recevez vos RDV. On gère tout le reste.',
  },
  {
    q: "Pourquoi l'IA change-t-elle tout à la prospection ?",
    a: "L'IA nous permet de personnaliser chaque email à partir de signaux réels (activité LinkedIn, poste, contexte) — ce qu'aucun humain ne pourrait faire à grande échelle. C'est ce qui explique nos taux de réponse bien au-dessus de la moyenne.",
  },
]

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" className="relative z-10 px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">FAQ</span>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Les questions qu'on nous pose toujours.
          </h2>
        </motion.div>

        <div className="mt-14 space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={faq.q}
                variants={fadeInUp}
                className={`glass-card overflow-hidden ${isOpen ? 'glass-card--glow' : ''}`}
              >
                <button
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left sm:px-8"
                  aria-expanded={isOpen}
                >
                  <span className="text-base font-semibold text-white sm:text-lg">
                    {faq.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-all duration-300 ${
                      isOpen
                        ? 'rotate-45 border-accent bg-accent/20'
                        : 'border-white/20 bg-white/5'
                    }`}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M12 5v14M5 12h14" stroke="#fff" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-6 text-sm leading-relaxed text-gray-300 sm:px-8 sm:text-base">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
