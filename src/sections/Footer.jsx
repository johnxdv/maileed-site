import { useState } from 'react'
import Logo from '../components/Logo'
import LegalModal from '../components/LegalModal'
import { mentionsLegales, politiqueConfidentialite } from '../data/legal'

export default function Footer() {
  const [showMentions, setShowMentions] = useState(false)
  const [showConfidentialite, setShowConfidentialite] = useState(false)

  return (
    <footer className="relative z-10 bg-[#F3F4F6] px-6 py-10">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <Logo />

        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-[#9CA3AF]">
            © 2026 Maileed. Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
            <button
              type="button"
              onClick={() => setShowMentions(true)}
              className="text-sm text-[#9CA3AF] underline underline-offset-2 transition-colors hover:text-[#6B7280]"
            >
              Mentions légales
            </button>
            <button
              type="button"
              onClick={() => setShowConfidentialite(true)}
              className="text-sm text-[#9CA3AF] underline underline-offset-2 transition-colors hover:text-[#6B7280]"
            >
              Politique de confidentialité
            </button>
          </div>
        </div>

        <a
          href="https://www.linkedin.com/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#E5E7EB] text-[#6B7280] transition-all duration-300 hover:border-accent/50 hover:text-accent hover:shadow-glow"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M4.98 3.5a2.5 2.5 0 11-.02 5 2.5 2.5 0 01.02-5zM3 9h4v12H3V9zm6 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-5.6c0-1.33-.02-3.05-1.86-3.05-1.86 0-2.14 1.45-2.14 2.95V21H9V9z" />
          </svg>
        </a>
      </div>

      <LegalModal
        open={showMentions}
        onClose={() => setShowMentions(false)}
        content={mentionsLegales}
      />
      <LegalModal
        open={showConfidentialite}
        onClose={() => setShowConfidentialite(false)}
        content={politiqueConfidentialite}
      />
    </footer>
  )
}
