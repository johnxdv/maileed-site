import Orbs from './components/Orbs'
import FloatingLogos from './components/FloatingLogos'
import Navbar from './components/Navbar'
import Hero from './sections/Hero'
import Results from './sections/Results'
import Process from './sections/Process'
import RoiSimulator from './sections/RoiSimulator'
import About from './sections/About'
import WhyUs from './sections/WhyUs'
import Faq from './sections/Faq'
import FinalCta from './sections/FinalCta'
import Footer from './sections/Footer'

export default function App() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-night">
      <div className="page-bg" aria-hidden="true" />
      <Orbs />
      <div className="dot-grid" aria-hidden="true" />
      <FloatingLogos />

      {/* Ambient top gradient wash */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[600px] bg-gradient-to-b from-primary/30 via-night/0 to-transparent"
        aria-hidden="true"
      />

      <Navbar />

      <main className="relative">
        <Hero />
        <Results />
        <Process />
        <RoiSimulator />
        <About />
        <WhyUs />
        <Faq />
        <FinalCta />
      </main>

      <Footer />
    </div>
  )
}
