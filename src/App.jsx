import BubbleBackground from './components/BubbleBackground'
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
      {/* Floating blue bubbles over the plain white background */}
      <BubbleBackground />
      <div className="dot-grid" aria-hidden="true" />

      <Navbar />

      <main className="relative z-10">
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
