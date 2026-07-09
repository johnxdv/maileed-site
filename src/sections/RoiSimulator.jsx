import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

const eur = new Intl.NumberFormat('fr-FR', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})

export default function RoiSimulator() {
  const [ticket, setTicket] = useState(5000)
  const [closing, setClosing] = useState(30)
  const [rdv, setRdv] = useState(15)

  const revenue = Math.round(rdv * (closing / 100) * ticket)

  return (
    <section id="simulateur" className="relative z-10 bg-[#EBF4FF]/70 px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-3xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">Simulateur</span>
          <h2 className="mx-auto mt-4 max-w-2xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            Estimez votre retour sur investissement.
          </h2>
        </motion.div>

        <motion.div variants={fadeInUp} className="glass-card glass-card--glow mt-12 p-8 sm:p-10">
          <div className="space-y-9">
            <Slider
              label="Ticket moyen"
              value={ticket}
              min={2000}
              max={40000}
              step={500}
              onChange={setTicket}
              display={`${eur.format(ticket)}${ticket >= 40000 ? '+' : ''}`}
            />
            <Slider
              label="Taux de closing"
              value={closing}
              min={0}
              max={100}
              step={1}
              onChange={setClosing}
              display={`${closing}%`}
            />
            <Slider
              label="RDV qualifiés / mois"
              value={rdv}
              min={10}
              max={50}
              step={1}
              onChange={setRdv}
              display={`${rdv}`}
              hint="Minimum garanti : 10"
            />
          </div>

          <div className="mt-10 border-t border-[#E5E7EB] pt-8 text-center">
            <p className="text-sm uppercase tracking-[0.15em] text-[#9CA3AF]">
              Chiffre d'affaires potentiel / mois
            </p>
            <p className="accent-glow mt-3 text-5xl font-extrabold tracking-tight sm:text-6xl">
              {eur.format(revenue)}
            </p>
            <p className="mt-6 text-sm text-[#6B7280]">
              Nos clients génèrent en moyenne{' '}
              <span className="font-semibold text-[#0A0A1A]">24x</span> le montant investi.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

function Slider({ label, value, min, max, step, onChange, display, hint }) {
  return (
    <div>
      <div className="mb-3 flex items-baseline justify-between">
        <span className="text-sm font-medium text-[#4B5563]">{label}</span>
        <span className="text-lg font-bold text-[#0A0A1A]">{display}</span>
      </div>
      <input
        type="range"
        className="roi-slider"
        value={value}
        min={min}
        max={max}
        step={step}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      {hint && <p className="mt-2 text-xs text-[#9CA3AF]">{hint}</p>}
    </div>
  )
}
