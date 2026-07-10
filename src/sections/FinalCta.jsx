import { useEffect, useRef, useState } from 'react'
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
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < 768 : false
  )

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % phrases.length), 2500)
    return () => clearInterval(id)
  }, [])

  // Track viewport width so the booking widget can be taller on mobile,
  // giving the full booking flow room to render without inner scrolling.
  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Load the Cal.com inline embed and initialize the 30min booking widget.
  // Guard against StrictMode's double-invoke so the namespace is initialized once.
  const calInitialized = useRef(false)
  useEffect(() => {
    if (calInitialized.current) return
    calInitialized.current = true

    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.innerHTML = `
      (function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.eu/embed/embed.js", "init");
      Cal("init", "30min", {origin:"https://app.cal.eu"});
      Cal.ns["30min"]("inline", {
        elementOrSelector:"#my-cal-inline-30min",
        config: {"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"},
        calLink: "maileedai/30min",
      });
      Cal.ns["30min"]("ui", {"theme":"light","cssVarsPerTheme":{"light":{"cal-brand":"#3894FF"},"dark":{"cal-brand":"#3894FF"}},"hideEventTypeDetails":false,"layout":"month_view"});
    `
    document.body.appendChild(script)
    return () => {
      document.body.removeChild(script)
    }
  }, [])

  return (
    <section id="contact" className="section-tint relative z-10 px-6 py-32">
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
          style={{
            fontSize: isMobile
              ? 'clamp(2.5rem, 9vw, 3.5rem)'
              : 'clamp(1.8rem, 5vw, 3.5rem)',
          }}
        >
          <span className="block text-[#0A0A1A]">Prêt à</span>
          <span className="relative mt-1 block h-[3.4em] w-full max-w-[100vw] overflow-hidden py-[0.15em] sm:h-[1.6em]">
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                className="phrase-gradient absolute inset-0 flex items-center justify-center whitespace-normal px-2 text-center leading-tight sm:whitespace-nowrap sm:px-0"
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
          className="mt-6 max-w-xl text-[clamp(0.95rem,3.5vw,1.1rem)] leading-relaxed text-[#6B7280]"
        >
          Réservez un appel de 20 minutes. Analysons ensemble votre potentiel de croissance.
        </motion.p>

        {/* Cal.com inline embed */}
        <motion.div variants={fadeInUp} className="mt-10 w-full max-w-xl">
          <div style={{ overflow: 'visible', borderRadius: '16px', maxWidth: '100%' }}>
            <div
              id="my-cal-inline-30min"
              style={{
                width: '100%',
                minWidth: '1100px',
                height: '600px',
                overflow: 'scroll',
                borderRadius: '12px',
              }}
            ></div>
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
