// A few large, soft, semi-transparent blue bubbles that drift very slowly on a
// white background. Pure CSS (radial-gradient for the soft edge — no blur filter,
// which is expensive over large areas). Sits behind all content (z-index 0) and
// never intercepts clicks (pointer-events: none).
const BUBBLES = [
  { size: 560, top: '6%', left: '5%', opacity: 0.42, anim: 'bubbleDrift1', duration: 13, delay: 0 },
  { size: 500, top: '30%', left: '52%', opacity: 0.36, anim: 'bubbleDrift2', duration: 15, delay: -6 },
  { size: 440, top: '56%', left: '8%', opacity: 0.4, anim: 'bubbleDrift3', duration: 10, delay: -13 },
  { size: 400, top: '12%', left: '46%', opacity: 0.35, anim: 'bubbleDrift4', duration: 12, delay: -4 },
  { size: 360, top: '40%', left: '34%', opacity: 0.38, anim: 'bubbleDrift5', duration: 8, delay: -9 },
]

export default function BubbleBackground() {
  return (
    <div aria-hidden="true">
      {BUBBLES.map((b, i) => (
        <div
          key={i}
          style={{
            position: 'fixed',
            top: b.top,
            left: b.left,
            width: b.size,
            height: b.size,
            borderRadius: '50%',
            pointerEvents: 'none',
            zIndex: 0,
            background: `radial-gradient(circle, rgba(56,148,255,${b.opacity}) 0%, rgba(56,148,255,0) 70%)`,
            animation: `${b.anim} ${b.duration}s ease-in-out ${b.delay}s infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
    </div>
  )
}
