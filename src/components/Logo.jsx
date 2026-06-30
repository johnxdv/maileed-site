export default function Logo({ className = '' }) {
  // Displays the logo file at /public/logo.png exactly as-is — no cropping,
  // no added text, no modification.
  return (
    <a
      href="#hero"
      className={`group inline-flex items-center ${className}`}
      aria-label="Maileed - accueil"
    >
      <img
        src="/logo.png"
        alt="Maileed"
        className="h-7 w-auto transition-[filter] duration-300 group-hover:drop-shadow-[0_0_14px_rgba(94,58,166,0.7)]"
      />
    </a>
  )
}
