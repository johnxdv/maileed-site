export default function Logo({ className = '' }) {
  // Full Maileed wordmark (blue envelope + dark text), trimmed of empty margins.
  return (
    <a
      href="#hero"
      className={`group inline-flex items-center ${className}`}
      aria-label="Maileed - accueil"
    >
      <img
        src="/logo-mark.png"
        alt="Maileed"
        className="h-8 w-auto transition-[filter] duration-300 group-hover:drop-shadow-[0_2px_6px_rgba(56,148,255,0.35)]"
      />
    </a>
  )
}
