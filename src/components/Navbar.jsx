import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Logo from './Logo'
import LogoIcon from './LogoIcon'
import { smoothScrollTo } from '../lib/scroll'

const links = [
  { label: 'Process', href: '#process' },
  { label: 'Résultats', href: '#resultats' },
  { label: 'Équipe', href: '#equipe' },
  { label: 'FAQ', href: '#faq' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const handleNav = (e, href) => {
    e.preventDefault()
    setOpen(false)
    smoothScrollTo(href)
    history.replaceState(null, '', href)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Frosted-glass block for each detached navbar piece: low-opacity fill + a
  // strong backdrop blur (~28px). The BLUR is what hides the detail of page
  // content behind — you sense blurred shapes/colours, but nothing is legible.
  const blockScrolled =
    'rounded-2xl border border-white/50 bg-white/20 shadow-[0_8px_28px_-10px_rgba(10,10,26,0.22)] backdrop-blur-[28px]'

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ease-out ${
        scrolled ? 'px-3 pt-3 sm:px-4' : 'px-0 pt-0'
      }`}
    >
      <nav
        className={`mx-auto flex items-center justify-between transition-all duration-300 ${
          scrolled ? 'max-w-6xl gap-1.5 md:justify-center' : 'max-w-7xl px-6 py-4 lg:px-8'
        }`}
      >
        {/* Logo block — full wordmark at top, symbol only once detached */}
        <div
          className={`relative flex items-center justify-center transition-all duration-300 ${
            scrolled ? `${blockScrolled} px-4 py-2.5` : ''
          }`}
        >
          <span
            className={`flex items-center transition-opacity duration-300 ${
              scrolled ? 'pointer-events-none absolute opacity-0' : 'opacity-100'
            }`}
          >
            <Logo />
          </span>
          <span
            className={`flex items-center transition-opacity duration-300 ${
              scrolled ? 'opacity-100' : 'pointer-events-none absolute opacity-0'
            }`}
          >
            <LogoIcon />
          </span>
        </div>

        {/* Links block */}
        <ul
          className={`hidden items-center gap-9 transition-all duration-300 md:flex ${
            scrolled ? `${blockScrolled} px-8 py-3.5` : ''
          }`}
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(e) => handleNav(e, link.href)}
                className="text-sm font-medium text-[#4B5563] transition-colors duration-200 hover:text-[#0A0A1A]"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA block — stays a solid, opaque brand-blue pill (NOT glass) so it
            remains the highest-contrast, most visible element of the bar. */}
        <div className="hidden md:block">
          <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="btn-primary">
            Réserver un appel
          </a>
        </div>

        {/* Mobile hamburger block */}
        <button
          onClick={() => setOpen((v) => !v)}
          className={`flex h-11 w-11 items-center justify-center text-[#0A0A1A] transition-all duration-300 md:hidden ${
            scrolled ? `${blockScrolled} rounded-2xl` : 'rounded-lg border border-[#E5E7EB]'
          }`}
          aria-label="Menu"
        >
          <span className="relative flex h-4 w-5 flex-col justify-between">
            <span className={`h-0.5 w-full bg-[#0A0A1A] transition-transform ${open ? 'translate-y-[7px] rotate-45' : ''}`} />
            <span className={`h-0.5 w-full bg-[#0A0A1A] transition-opacity ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-full bg-[#0A0A1A] transition-transform ${open ? '-translate-y-[7px] -rotate-45' : ''}`} />
          </span>
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className={`mx-auto overflow-hidden bg-white transition-all duration-300 md:hidden ${
              scrolled
                ? 'mt-2 max-w-6xl rounded-2xl border border-[#EDEEF1] shadow-[0_6px_24px_-8px_rgba(10,10,26,0.18)]'
                : 'max-w-7xl border-t border-[#EDEEF1]'
            }`}
          >
            <ul className="flex flex-col gap-1 px-6 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNav(e, link.href)}
                    className="block rounded-lg px-3 py-3 text-sm font-medium text-[#374151] hover:bg-[#F3F4F6]"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="pt-2">
                <a href="#contact" onClick={(e) => handleNav(e, '#contact')} className="btn-primary w-full">
                  Réserver un appel
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
