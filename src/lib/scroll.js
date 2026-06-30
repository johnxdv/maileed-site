// Eased smooth scroll to an in-page anchor over ~700ms.
// Temporarily disables CSS scroll-behavior so it doesn't fight the JS animation.
export function smoothScrollTo(targetId, { offset = 80, duration = 700 } = {}) {
  const el = document.querySelector(targetId)
  if (!el) return

  const he = document.documentElement
  const prevBehavior = he.style.scrollBehavior
  he.style.scrollBehavior = 'auto'

  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + startY - offset
  const distance = targetY - startY
  let startTime

  // easeInOutCubic
  const ease = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

  function step(now) {
    if (startTime === undefined) startTime = now
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * ease(progress))
    if (progress < 1) {
      requestAnimationFrame(step)
    } else {
      he.style.scrollBehavior = prevBehavior
    }
  }

  requestAnimationFrame(step)
}
