import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

const DEFAULT_SRC =
  'https://vz-de072579-4dd.b-cdn.net/9fd2cb7d-f1db-4b9a-b554-fd5b46ed5645/playlist.m3u8'

// Inline icons — kept in-file to match the project's SVG-in-component convention.
const PlayIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.5v13l11-6.5z" />
  </svg>
)

const PauseIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M7 5h3.2v14H7zM13.8 5H17v14h-3.2z" />
  </svg>
)

const GearIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
)

const EnterFullscreenIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M8 3H5a2 2 0 0 0-2 2v3M16 3h3a2 2 0 0 1 2 2v3M8 21H5a2 2 0 0 1-2-2v-3M16 21h3a2 2 0 0 0 2-2v-3" />
  </svg>
)

const ExitFullscreenIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 8V5a1 1 0 0 1 1-1h3M20 8V5a1 1 0 0 0-1-1h-3M4 16v3a1 1 0 0 0 1 1h3M20 16v3a1 1 0 0 1-1 1h-3" />
  </svg>
)

const ChevronDownIcon = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M6 9l6 6 6-6" />
  </svg>
)

// Seconds -> "MM:SS" (0:00 fallback for NaN/Infinity before metadata loads).
const formatTime = (s) => {
  if (!Number.isFinite(s) || s < 0) s = 0
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export default function VideoPlayer({ src = DEFAULT_SRC, className = '' }) {
  const videoRef = useRef(null)
  const hlsRef = useRef(null)
  const containerRef = useRef(null)

  const [isPlaying, setIsPlaying] = useState(false)
  const [started, setStarted] = useState(false)
  const [progress, setProgress] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [levels, setLevels] = useState([]) // [{ index, height }]
  const [selectedLevel, setSelectedLevel] = useState(-1) // -1 = Auto
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [hasEnded, setHasEnded] = useState(false)
  const [playSrc, setPlaySrc] = useState(null) // resolved 1080p sub-playlist

  // Resolve the 1080p sub-playlist from the master playlist and use it as the
  // single source. This locks playback to 1080p on every browser (hls.js AND
  // Safari native) instead of letting adaptive bitrate (ABR) pick a quality.
  useEffect(() => {
    let cancelled = false
    const fallback = src.replace(/playlist\.m3u8(\?.*)?$/, '1080p/video.m3u8')
    ;(async () => {
      try {
        const res = await fetch(src)
        const text = await res.text()
        const lines = text.split('\n')
        let uri = null
        for (let i = 0; i < lines.length; i++) {
          if (
            lines[i].includes('#EXT-X-STREAM-INF') &&
            /RESOLUTION=\d+x1080(?!\d)/.test(lines[i])
          ) {
            for (let j = i + 1; j < lines.length; j++) {
              const line = lines[j].trim()
              if (line && !line.startsWith('#')) {
                uri = line
                break
              }
            }
            break
          }
        }
        const resolved = uri ? new URL(uri, src).href : fallback
        if (!cancelled) setPlaySrc(resolved)
      } catch {
        if (!cancelled) setPlaySrc(fallback)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [src])

  // Attach the HLS stream — hls.js for Chrome/Firefox/Edge, native for Safari/iOS.
  useEffect(() => {
    const video = videoRef.current
    if (!video || !playSrc) return

    // Prefer hls.js where it works (Chrome/Firefox/Edge). Checking this first
    // matters: some Chromium builds report canPlayType('...mpegurl') = "maybe"
    // yet can't actually demux HLS, so a native-first check would break there.
    if (Hls.isSupported()) {
      const hls = new Hls({ enableWorker: true })
      hlsRef.current = hls
      hls.loadSource(playSrc)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        const parsed = hls.levels
          .map((l, index) => ({ index, height: l.height || 0 }))
          .sort((a, b) => b.height - a.height)
        setLevels(parsed)
      })
      hls.on(Hls.Events.ERROR, (_evt, data) => {
        if (import.meta.env.DEV) console.warn('[hls]', data.type, data.details, data.fatal)
        if (!data.fatal) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR) hls.startLoad()
        else if (data.type === Hls.ErrorTypes.MEDIA_ERROR) hls.recoverMediaError()
        else hls.destroy()
      })
      return () => {
        hls.destroy()
        hlsRef.current = null
      }
    }

    // Safari / iOS play HLS natively (Hls.isSupported() is false there).
    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = playSrc
      return () => {
        video.removeAttribute('src')
        video.load()
      }
    }
  }, [playSrc])

  // Reflect the <video> element state in React.
  useEffect(() => {
    const video = videoRef.current
    if (!video) return
    const onPlay = () => {
      setIsPlaying(true)
      setStarted(true) // hide the poster overlay/big play button as soon as it plays
      setHasEnded(false) // clear the end-of-video CTA when (re)playing
    }
    const onPause = () => setIsPlaying(false)
    const onEnded = () => {
      setIsPlaying(false)
      setHasEnded(true)
    }
    const onTime = () => {
      setCurrentTime(video.currentTime)
      if (video.duration) setProgress(video.currentTime / video.duration)
    }
    const onDuration = () => setDuration(video.duration || 0)
    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)
    video.addEventListener('timeupdate', onTime)
    video.addEventListener('loadedmetadata', onDuration)
    video.addEventListener('durationchange', onDuration)
    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)
      video.removeEventListener('timeupdate', onTime)
      video.removeEventListener('loadedmetadata', onDuration)
      video.removeEventListener('durationchange', onDuration)
    }
  }, [])

  // Track fullscreen state — covers the Fullscreen API (Android/desktop) and
  // iOS Safari's native video fullscreen (webkitbegin/endfullscreen).
  useEffect(() => {
    const video = videoRef.current
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement)
    const onBegin = () => setIsFullscreen(true)
    const onEnd = () => setIsFullscreen(false)
    document.addEventListener('fullscreenchange', onFsChange)
    video?.addEventListener('webkitbeginfullscreen', onBegin)
    video?.addEventListener('webkitendfullscreen', onEnd)
    return () => {
      document.removeEventListener('fullscreenchange', onFsChange)
      video?.removeEventListener('webkitbeginfullscreen', onBegin)
      video?.removeEventListener('webkitendfullscreen', onEnd)
    }
  }, [])

  const togglePlay = () => {
    const video = videoRef.current
    if (!video) return
    if (video.paused) {
      if (video.ended) video.currentTime = 0 // replay from the start after the CTA
      setStarted(true)
      video.play()
    } else {
      video.pause()
    }
  }

  const selectQuality = (index) => {
    setSelectedLevel(index)
    if (hlsRef.current) hlsRef.current.currentLevel = index // -1 = auto
    setSettingsOpen(false)
  }

  const seek = (e) => {
    const video = videoRef.current
    if (!video || !video.duration) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = Math.min(Math.max((e.clientX - rect.left) / rect.width, 0), 1)
    video.currentTime = ratio * video.duration
  }

  const toggleFullscreen = () => {
    const video = videoRef.current
    if (!video) return

    // Already fullscreen (Android/desktop) → exit and release the orientation.
    if (document.fullscreenElement) {
      document.exitFullscreen()
      try {
        screen.orientation?.unlock?.()
      } catch {
        /* not supported — ignore */
      }
      return
    }

    // iOS Safari: use the element's native fullscreen. It rotates to landscape
    // automatically and shows iOS's own controls (accepted limitation).
    if (typeof video.webkitEnterFullscreen === 'function') {
      video.webkitEnterFullscreen()
      return
    }

    // Android / desktop: fullscreen the <video> itself, then try to lock
    // landscape (unsupported on many browsers → caught silently).
    if (video.requestFullscreen) {
      const lockLandscape = () => {
        try {
          screen.orientation?.lock?.('landscape')?.catch?.(() => {})
        } catch {
          /* orientation lock unsupported — ignore */
        }
      }
      const req = video.requestFullscreen()
      if (req && typeof req.then === 'function') req.then(lockLandscape).catch(() => {})
      else lockLandscape()
    }
  }

  const controlBtn =
    'flex h-9 w-9 items-center justify-center rounded-lg text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-accent'

  return (
    <div
      ref={containerRef}
      style={{ aspectRatio: '16 / 9' }}
      className={`group relative aspect-video w-full overflow-hidden rounded-2xl border border-accent/15 bg-black shadow-glow ${className}`}
    >
      <video
        ref={videoRef}
        className="h-full w-full bg-black object-cover"
        style={
          isFullscreen
            ? { width: '100vw', height: '100vh', objectFit: 'contain' }
            : undefined
        }
        playsInline
        preload="metadata"
        poster="/0726-Couverture.jpg"
        onClick={togglePlay}
      />

      {/* Dark wash — over the poster before playback and over the last frame at
          the end — to make the play button / end CTA pop. */}
      {(!started || hasEnded) && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'rgba(0,0,0,0.5)' }}
        />
      )}

      {/* Large centered play button before the video has been started. */}
      {!started && (
        <button
          type="button"
          onClick={togglePlay}
          aria-label="Lire la vidéo"
          className="absolute inset-0 flex items-center justify-center"
        >
          <span className="relative flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent backdrop-blur-sm transition-transform duration-300 hover:scale-110">
            <span className="absolute h-20 w-20 animate-ping rounded-full bg-accent/20" />
            <span className="ml-1">
              <PlayIcon size={30} />
            </span>
          </span>
        </button>
      )}

      {/* End-of-video state: replay button, booking CTA, and a nudging arrow. */}
      {hasEnded && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-5 px-6 text-center">
          <button
            type="button"
            onClick={togglePlay}
            aria-label="Revoir la vidéo"
            className="group/replay flex items-center justify-center"
          >
            <span className="relative flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/15 text-accent backdrop-blur-sm transition-transform duration-300 group-hover/replay:scale-110">
              <span className="ml-1">
                <PlayIcon size={26} />
              </span>
            </span>
          </button>

          <a href="#contact" className="btn-primary">
            Réserver un appel
          </a>

          <span className="arrow-bounce text-white/70" aria-hidden="true">
            <ChevronDownIcon size={30} />
          </span>
        </div>
      )}

      {/* Custom controls — mounted only once playback has started; then
          revealed on hover and hidden while playing. */}
      {started && !hasEnded && (
        <div
          className={`absolute inset-x-0 bottom-0 flex flex-col gap-2 bg-gradient-to-t from-black/70 via-black/30 to-transparent px-4 pb-3 pt-10 transition-opacity duration-300 ${
            isPlaying ? 'opacity-0 group-hover:opacity-100' : 'opacity-100'
          }`}
        >
        {/* Minimal seek bar */}
        <div
          onClick={seek}
          className="group/bar h-1.5 w-full cursor-pointer overflow-hidden rounded-full bg-white/25"
        >
          <div
            className="h-full rounded-full bg-accent transition-[width] duration-150"
            style={{ width: `${progress * 100}%` }}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play / pause */}
            <button
              type="button"
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause' : 'Lecture'}
              className={controlBtn}
            >
              {isPlaying ? <PauseIcon /> : <PlayIcon />}
            </button>

            {/* Time / duration */}
            <span className="select-none text-xs font-medium tabular-nums text-white/80">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-1">
            {/* Settings / quality — shown only when the stream exposes more than
                one selectable level (a fixed-1080p stream hides it). */}
            {levels.length > 1 && (
              <div className="relative">
              <button
                type="button"
                onClick={() => setSettingsOpen((v) => !v)}
                aria-label="Réglages de qualité"
                aria-expanded={settingsOpen}
                className={`${controlBtn} ${settingsOpen ? 'text-accent' : ''}`}
              >
                <GearIcon />
              </button>

              {settingsOpen && (
                <div className="absolute bottom-11 right-0 min-w-[9rem] overflow-hidden rounded-xl border border-white/10 bg-black/80 py-1 text-sm text-white/90 shadow-glow backdrop-blur-md">
                  <p className="px-4 pb-1 pt-2 text-xs uppercase tracking-wide text-white/40">
                    Qualité
                  </p>
                  <button
                    type="button"
                    onClick={() => selectQuality(-1)}
                    className={`flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/10 ${
                      selectedLevel === -1 ? 'text-accent' : ''
                    }`}
                  >
                    Auto
                    {selectedLevel === -1 && <span className="text-accent">✓</span>}
                  </button>
                  {levels.map((level) => (
                    <button
                      key={level.index}
                      type="button"
                      onClick={() => selectQuality(level.index)}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left transition-colors hover:bg-white/10 ${
                        selectedLevel === level.index ? 'text-accent' : ''
                      }`}
                    >
                      {level.height ? `${level.height}p` : `Niveau ${level.index + 1}`}
                      {selectedLevel === level.index && <span className="text-accent">✓</span>}
                    </button>
                  ))}
                </div>
              )}
              </div>
            )}

            {/* Fullscreen */}
            <button
              type="button"
              onClick={toggleFullscreen}
              aria-label={isFullscreen ? 'Quitter le plein écran' : 'Plein écran'}
              className={controlBtn}
            >
              {isFullscreen ? <ExitFullscreenIcon /> : <EnterFullscreenIcon />}
            </button>
          </div>
        </div>
        </div>
      )}
    </div>
  )
}
