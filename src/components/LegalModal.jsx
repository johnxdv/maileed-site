import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Minimal markdown-ish parser: splits the text by lines and renders
// `#` as a large dark heading, `##` as a medium blue heading, and every
// other non-empty line as a regular paragraph.
function renderContent(text) {
  return text.split('\n').map((rawLine, i) => {
    const line = rawLine.trim()
    if (!line) return null

    if (line.startsWith('## ')) {
      return (
        <h3 key={i} className="mb-2 mt-7 text-lg font-semibold text-[#3894FF]">
          {line.slice(3)}
        </h3>
      )
    }

    if (line.startsWith('# ')) {
      return (
        <h2 key={i} className="mb-5 text-2xl font-bold text-[#0A0A1A]">
          {line.slice(2)}
        </h2>
      )
    }

    return (
      <p key={i} className="mb-2 text-sm leading-relaxed text-[#4B5563]">
        {line}
      </p>
    )
  })
}

export default function LegalModal({ open, onClose, content }) {
  // Close on Escape and lock body scroll while the modal is open.
  useEffect(() => {
    if (!open) return
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open, onClose])

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full overflow-y-auto bg-white shadow-2xl"
            style={{
              maxWidth: '720px',
              maxHeight: '80vh',
              borderRadius: '16px',
              padding: '40px',
            }}
            initial={{ opacity: 0, y: 16, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full text-2xl leading-none text-[#9CA3AF] transition-colors hover:bg-[#F3F4F6] hover:text-[#0A0A1A]"
            >
              ×
            </button>
            <div className="pr-6">{renderContent(content)}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
