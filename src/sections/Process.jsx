import { Fragment } from 'react'
import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, viewport } from '../lib/motion'

// Coordinate space for the desktop diagram (viewBox + node positions share it).
const VW = 1000
const VH = 540

const nodes = {
  in1: { x: 95, y: 185, label: 'Base de données B2B ultra-précise', desc: 'Accès à des millions de contacts B2B segmentés et tenus à jour.', icon: DatabaseIcon, type: 'main' },
  in2: { x: 95, y: 355, label: 'Scraping comportemental temps réel', desc: "Détection en continu des signaux d'achat et changements de poste.", icon: ActivityIcon, type: 'main' },
  en1: { x: 305, y: 120, label: 'Analyse de signaux LinkedIn', desc: "Lecture de l'activité pour repérer les prospects les plus chauds.", icon: ScanIcon, type: 'main' },
  en2: { x: 305, y: 270, label: 'Scoring ICP automatisé', desc: 'Chaque prospect est noté selon votre client idéal.', icon: TargetIcon, type: 'main' },
  en3: { x: 305, y: 420, label: 'Vérification des contacts', desc: 'Emails vérifiés pour garantir une délivrabilité maximale.', icon: ShieldIcon, type: 'main' },
  ai1: { x: 515, y: 200, label: 'IA de personnalisation', desc: 'Notre IA adapte chaque message au contexte du prospect.', icon: SparkIcon, type: 'ai' },
  ai2: { x: 515, y: 360, label: "Génération d'accroches uniques", desc: "Une accroche d'ouverture unique pour chaque contact.", icon: PenIcon, type: 'ai' },
  ex1: { x: 725, y: 120, label: "Envoi multi-domaines", desc: 'Envoi réparti sur plusieurs domaines pour préserver la réputation.', icon: SendIcon, type: 'main' },
  ex2: { x: 725, y: 270, label: 'Séquences adaptatives J0→J9', desc: "Relances automatiques qui s'adaptent au comportement du prospect.", icon: CalendarIcon, type: 'main' },
  ex3: { x: 725, y: 420, label: 'Détection & qualification', desc: 'Les réponses positives sont détectées et qualifiées automatiquement.', icon: MailCheckIcon, type: 'main' },
  out: { x: 925, y: 270, label: 'RDV Qualifié', desc: 'Un rendez-vous avec un décideur, directement dans votre agenda.', icon: CalendarCheckIcon, type: 'output' },
  // Decorative sub-processes
  d1: { x: 470, y: 70, label: 'Analyse sémantique', type: 'deco' },
  d2: { x: 415, y: 480, label: "Détection d'intention", type: 'deco' },
  d3: { x: 770, y: 45, label: 'Optimisation continue', type: 'deco' },
  d4: { x: 185, y: 50, label: 'Synchronisation temps réel', type: 'deco' },
  // Filler density nodes (desktop only) — pure visual complexity
  f1: { x: 120, y: 35, label: 'Sync data', type: 'filler' },
  f2: { x: 250, y: 32, label: 'Auto-tagging', type: 'filler' },
  f3: { x: 388, y: 38, label: 'Indexation', type: 'filler' },
  f4: { x: 612, y: 30, label: 'Cache intelligent', type: 'filler' },
  f5: { x: 868, y: 64, label: 'Webhooks', type: 'filler' },
  f6: { x: 150, y: 505, label: 'Tracking', type: 'filler' },
  f7: { x: 298, y: 512, label: 'Calibrage', type: 'filler' },
  f8: { x: 560, y: 508, label: 'Vérification croisée', type: 'filler' },
  f9: { x: 700, y: 512, label: 'Pipeline secondaire', type: 'filler' },
  f10: { x: 845, y: 505, label: 'Normalisation', type: 'filler' },
  f11: { x: 410, y: 192, label: 'Module IA', type: 'filler' },
  f12: { x: 410, y: 332, label: 'Process interne', type: 'filler' },
  f13: { x: 620, y: 186, label: 'Heuristique', type: 'filler' },
  f14: { x: 620, y: 352, label: 'Scoring v2', type: 'filler' },
  f15: { x: 200, y: 270, label: 'Réalisation', type: 'filler' },
  f16: { x: 820, y: 352, label: "File d'attente", type: 'filler' },
  f17: { x: 510, y: 28, label: 'Optimisation', type: 'filler' },
  f18: { x: 505, y: 512, label: 'Logiciel propriétaire', type: 'filler' },
  f19: { x: 130, y: 270, label: 'Cache', type: 'filler' },
  f20: { x: 925, y: 110, label: 'Indexation v2', type: 'filler' },
}

const mainEdges = [
  ['in1', 'en1'], ['in1', 'en2'], ['in2', 'en2'], ['in2', 'en3'],
  ['en1', 'ai1'], ['en2', 'ai1'], ['en2', 'ai2'], ['en3', 'ai2'],
  ['ai1', 'ex1'], ['ai1', 'ex2'], ['ai2', 'ex2'], ['ai2', 'ex3'],
  ['ex1', 'out'], ['ex2', 'out'], ['ex3', 'out'],
]
const crossEdges = [
  ['in1', 'en3'], ['in2', 'en1'], ['en1', 'ai2'], ['en3', 'ai1'], ['ai1', 'ex3'], ['ai2', 'ex1'],
]
const decoEdges = [
  ['d4', 'in1'], ['d4', 'en1'], ['d1', 'en1'], ['d1', 'ai1'], ['d2', 'en3'], ['d2', 'ai2'], ['d3', 'ex1'], ['d3', 'ai1'],
]
// Every secondary node connects to its nearest main node(s) and to neighbours,
// so the whole thing reads as one dense interconnected network — no orphans.
const fillerEdges = [
  // top band → input / enrichment / execution
  ['f1', 'in1'], ['f1', 'd4'], ['f1', 'f2'],
  ['f2', 'en1'], ['f2', 'f3'], ['f2', 'd4'],
  ['f3', 'en1'], ['f3', 'd1'], ['f3', 'f17'],
  ['f17', 'ai1'], ['f17', 'd1'], ['f17', 'en1'],
  ['f4', 'ai1'], ['f4', 'en1'], ['f4', 'f13'], ['f4', 'd1'],
  ['f5', 'ex1'], ['f5', 'd3'], ['f5', 'f20'],
  ['f20', 'out'], ['f20', 'ex1'], ['f20', 'd3'],
  // middle band → AI / execution cluster
  ['f11', 'ai1'], ['f11', 'en1'], ['f11', 'f13'], ['f11', 'en2'],
  ['f13', 'ai1'], ['f13', 'ex1'], ['f13', 'f4'],
  ['f12', 'ai2'], ['f12', 'en3'], ['f12', 'f14'], ['f12', 'en2'],
  ['f14', 'ai2'], ['f14', 'ex3'], ['f14', 'f16'],
  ['f15', 'en2'], ['f15', 'in1'], ['f15', 'f19'],
  ['f19', 'in2'], ['f19', 'en2'], ['f19', 'in1'],
  ['f16', 'ex2'], ['f16', 'out'], ['f16', 'ai2'],
  // bottom band → input / enrichment / execution
  ['f6', 'in2'], ['f6', 'd4'], ['f6', 'f7'],
  ['f7', 'en3'], ['f7', 'd2'], ['f7', 'f18'],
  ['f18', 'ai2'], ['f18', 'd2'], ['f18', 'f8'],
  ['f8', 'ai2'], ['f8', 'en3'], ['f8', 'f9'],
  ['f9', 'ex3'], ['f9', 'f10'], ['f9', 'f8'],
  ['f10', 'out'], ['f10', 'ex3'], ['f10', 'f9'],
]

function line(a, b) {
  return `M ${a.x} ${a.y} L ${b.x} ${b.y}`
}
function curve(a, b, bend) {
  const mx = (a.x + b.x) / 2
  const my = (a.y + b.y) / 2
  const dx = b.x - a.x
  const dy = b.y - a.y
  const len = Math.hypot(dx, dy) || 1
  return `M ${a.x} ${a.y} Q ${mx + (-dy / len) * bend} ${my + (dx / len) * bend} ${b.x} ${b.y}`
}

export default function Process() {
  return (
    <section id="process" className="relative z-10 overflow-hidden px-6 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        className="mx-auto max-w-6xl"
      >
        <motion.div variants={fadeInUp} className="text-center">
          <span className="section-tag">Comment ça marche</span>
          <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight sm:text-5xl">
            De zéro à vos premiers RDV.
          </h2>
        </motion.div>

        {/* Desktop diagram */}
        <motion.div
          variants={fadeInUp}
          className="relative mx-auto mt-14 hidden w-full max-w-6xl lg:block"
          style={{ aspectRatio: `${VW} / ${VH}` }}
        >
          <svg
            viewBox={`0 0 ${VW} ${VH}`}
            className="absolute inset-0 h-full w-full"
            fill="none"
            aria-hidden="true"
          >
            {/* filler lines (most behind) */}
            {fillerEdges.map(([f, t], i) => (
              <path key={`f${i}`} d={curve(nodes[f], nodes[t], 22)} stroke="#3894FF" strokeOpacity="0.22" strokeWidth="1" strokeDasharray="3 4" />
            ))}
            {/* deco lines */}
            {decoEdges.map(([f, t], i) => (
              <path key={`d${i}`} d={curve(nodes[f], nodes[t], 18)} stroke="#3894FF" strokeOpacity="0.14" strokeWidth="1" strokeDasharray="3 5" />
            ))}
            {/* cross lines */}
            {crossEdges.map(([f, t], i) => (
              <path key={`c${i}`} d={curve(nodes[f], nodes[t], 38)} stroke="#3894FF" strokeOpacity="0.2" strokeWidth="1.2" />
            ))}
            {/* main lines */}
            {mainEdges.map(([f, t], i) => (
              <path key={`m${i}`} d={line(nodes[f], nodes[t])} stroke="#3894FF" strokeOpacity="0.32" strokeWidth="1.6" />
            ))}

            {/* moving dots */}
            {mainEdges.map(([f, t], i) => (
              <circle key={`md${i}`} r="3.2" fill="#3894FF">
                <animateMotion dur={`${2.4 + (i % 5) * 0.45}s`} repeatCount="indefinite" path={line(nodes[f], nodes[t])} />
              </circle>
            ))}
            {/* second wave of dots on main edges, offset */}
            {mainEdges.map(([f, t], i) => (
              <circle key={`md2${i}`} r="2.4" fill="#60A5FA" opacity="0.8">
                <animateMotion dur={`${3 + (i % 4) * 0.5}s`} repeatCount="indefinite" begin={`${(i % 3) * 0.7}s`} path={line(nodes[f], nodes[t])} />
              </circle>
            ))}
            {/* dots on cross lines */}
            {crossEdges.map(([f, t], i) => (
              <circle key={`cd${i}`} r="2.2" fill="#3894FF" opacity="0.7">
                <animateMotion dur={`${3.4 + i * 0.4}s`} repeatCount="indefinite" path={curve(nodes[f], nodes[t], 38)} />
              </circle>
            ))}
            {/* dots on filler lines — constant subtle movement everywhere */}
            {fillerEdges.map(([f, t], i) => (
              <circle key={`fd${i}`} r="1.8" fill="#3894FF" opacity="0.55">
                <animateMotion dur={`${3.6 + (i % 7) * 0.55}s`} repeatCount="indefinite" begin={`${(i % 5) * 0.6}s`} path={curve(nodes[f], nodes[t], 22)} />
              </circle>
            ))}
          </svg>

          {/* nodes */}
          {Object.entries(nodes).map(([id, n]) => (
            <DiagramNode key={id} n={n} />
          ))}
        </motion.div>

        {/* Mobile compact stack */}
        <div className="mt-12 flex flex-col items-center lg:hidden">
          {[
            { name: 'Input', ids: ['in1', 'in2'] },
            { name: 'Enrichissement', ids: ['en1', 'en2', 'en3'] },
            { name: 'IA', ids: ['ai1', 'ai2'], highlight: true },
            { name: 'Exécution', ids: ['ex1', 'ex2', 'ex3'] },
          ].map((layer) => (
            <Fragment key={layer.name}>
              <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${layer.highlight ? 'text-accent' : 'text-[#9CA3AF]'}`}>
                {layer.name}
              </span>
              <div className="mt-3 flex w-full max-w-sm flex-col gap-3">
                {layer.ids.map((id) => (
                  <MobileNode key={id} n={nodes[id]} highlight={layer.highlight} />
                ))}
              </div>
              <VConnector />
            </Fragment>
          ))}
          <div className="w-full max-w-sm">
            <MobileNode n={nodes.out} output />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function DiagramNode({ n }) {
  const style = { left: `${(n.x / VW) * 100}%`, top: `${(n.y / VH) * 100}%` }

  if (n.type === 'filler') {
    return (
      <div className="absolute z-0 -translate-x-1/2 -translate-y-1/2" style={style}>
        <span className="flex items-center gap-1 whitespace-nowrap rounded border border-accent/15 bg-[#F8F9FC] px-1.5 py-0.5 text-[8px] font-medium text-[#9CA3AF] backdrop-blur-sm">
          <span className="h-1 w-1 rounded-full bg-accent/60" />
          {n.label}
        </span>
      </div>
    )
  }

  if (n.type === 'deco') {
    return (
      <div className="absolute z-0 -translate-x-1/2 -translate-y-1/2" style={style}>
        <span className="whitespace-nowrap rounded-full border border-accent/20 bg-[#F3F4F6] px-2.5 py-1 text-[9px] font-medium uppercase tracking-wide text-[#9CA3AF] backdrop-blur-sm animate-pulseGlow">
          {n.label}
        </span>
      </div>
    )
  }

  if (n.type === 'output') {
    const Icon = n.icon
    return (
      <div className="group absolute z-20 w-[120px] -translate-x-1/2 -translate-y-1/2" style={style}>
        <Tooltip>{n.desc}</Tooltip>
        <div className="flex flex-col items-center gap-2 rounded-2xl border border-accent bg-accent/15 px-4 py-5 text-center shadow-glow-lg ring-2 ring-accent/50 animate-pulseGlow backdrop-blur-xl">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-accent/60 bg-accent/25 text-accent">
            <Icon />
          </span>
          <span className="text-[13px] font-bold leading-tight text-[#0A0A1A]">{n.label}</span>
        </div>
      </div>
    )
  }

  const Icon = n.icon
  const ai = n.type === 'ai'
  return (
    <div className="group absolute z-10 w-[140px] -translate-x-1/2 -translate-y-1/2" style={style}>
      <Tooltip>{n.desc}</Tooltip>
      <div
        className={`flex items-center gap-2 rounded-xl border bg-white/70 px-2.5 py-2 backdrop-blur-xl transition-all duration-300 ${
          ai
            ? 'border-accent/60 text-accent shadow-glow ring-1 ring-accent/40 animate-pulseGlow'
            : 'border-accent/15 text-[#374151] hover:border-accent/50 hover:text-accent hover:shadow-glow'
        }`}
      >
        <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border ${ai ? 'border-accent/50 bg-accent/15' : 'border-[#E5E7EB] bg-[#F3F4F6]'}`}>
          <Icon />
        </span>
        <span className="text-[10px] font-medium leading-tight">{n.label}</span>
      </div>
    </div>
  )
}

function Tooltip({ children }) {
  return (
    <div className="pointer-events-none absolute -top-2 left-1/2 z-30 w-44 -translate-x-1/2 -translate-y-full rounded-lg border border-accent/30 bg-night/95 px-2.5 py-1.5 text-center text-[10px] leading-snug text-[#4B5563] opacity-0 shadow-glow backdrop-blur-xl transition-opacity duration-200 group-hover:opacity-100">
      {children}
    </div>
  )
}

function MobileNode({ n, highlight, output }) {
  const Icon = n.icon
  return (
    <div
      className={`flex items-center gap-3 rounded-xl border bg-white/70 px-3.5 py-3 backdrop-blur-xl ${
        output
          ? 'border-accent bg-accent/15 shadow-glow ring-1 ring-accent/40'
          : highlight
          ? 'border-accent/60 text-accent shadow-glow ring-1 ring-accent/40'
          : 'border-accent/15 text-[#374151]'
      }`}
    >
      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${highlight || output ? 'border-accent/50 bg-accent/15 text-accent' : 'border-[#E5E7EB] bg-[#F3F4F6] text-[#374151]'}`}>
        <Icon />
      </span>
      <span className={`text-[13px] font-medium leading-tight ${output ? 'font-bold text-[#0A0A1A]' : ''}`}>{n.label}</span>
    </div>
  )
}

function VConnector() {
  return (
    <div className="relative my-3 h-9 w-px bg-gradient-to-b from-accent/40 to-accent/10">
      <motion.span
        className="absolute -left-[3px] top-0 h-1.5 w-1.5 rounded-full bg-accent"
        animate={{ y: [0, 36], opacity: [0, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  )
}

/* ---------- Icons (inherit currentColor) ---------- */
const s = { fill: 'none', stroke: 'currentColor', strokeWidth: 1.7, strokeLinecap: 'round', strokeLinejoin: 'round' }
function DatabaseIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </svg>
  )
}
function ActivityIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M3 12h4l3 8 4-16 3 8h4" />
    </svg>
  )
}
function ScanIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <circle cx="11" cy="11" r="6" />
      <path d="M20 20l-4-4" />
    </svg>
  )
}
function TargetIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  )
}
function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M12 3l7 3v6c0 5-3.5 8-7 9-3.5-1-7-4-7-9V6z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}
function SparkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M12 3l1.8 4.7L18.5 9.5 13.8 11.3 12 16l-1.8-4.7L5.5 9.5l4.7-1.8z" />
      <path d="M18 15l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7z" />
    </svg>
  )
}
function PenIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M16 3l5 5L8 21H3v-5z" />
      <path d="M13 6l5 5" />
    </svg>
  )
}
function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M21 3L10 14M21 3l-7 18-4-7-7-4z" />
    </svg>
  )
}
function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
    </svg>
  )
}
function MailCheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" {...s}>
      <path d="M3 7l9 6 9-6" />
      <path d="M3 7h18v7M3 7v10h11" />
      <path d="M15 19l2 2 4-4" />
    </svg>
  )
}
function CalendarCheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" {...s}>
      <rect x="4" y="5" width="16" height="16" rx="2" />
      <path d="M4 9h16M8 3v4M16 3v4" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  )
}
