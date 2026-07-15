import { useEffect, useRef } from 'react'

const GLYPHS =
  'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789<>+-*/=$#'
const FONT_SIZE = 16
const FRAME_INTERVAL_MS = 1000 / 20
const TRAIL_FADE_ALPHA = 0.09
const RESET_CHANCE = 0.975

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const context = canvas.getContext('2d')
    if (!context) return

    let drops: number[] = []
    let frameId = 0
    let lastFrameTime = 0

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(window.innerWidth * ratio)
      canvas.height = Math.floor(window.innerHeight * ratio)
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      // Resizing clears the canvas and resets its state, so re-apply the font.
      context.font = `${FONT_SIZE}px ui-monospace, SFMono-Regular, Menlo, monospace`

      const columnCount = Math.ceil(window.innerWidth / FONT_SIZE)
      drops = Array.from(
        { length: columnCount },
        // Stagger the columns above the viewport so they don't start in sync.
        () => Math.floor(Math.random() * -60),
      )
    }

    const draw = (time: number) => {
      frameId = window.requestAnimationFrame(draw)
      if (time - lastFrameTime < FRAME_INTERVAL_MS) return
      lastFrameTime = time

      // Fade previous glyphs toward transparency instead of painting black,
      // so the 3D grid behind the rain stays visible.
      context.globalCompositeOperation = 'destination-out'
      context.fillStyle = `rgba(0, 0, 0, ${TRAIL_FADE_ALPHA})`
      context.fillRect(0, 0, window.innerWidth, window.innerHeight)
      context.globalCompositeOperation = 'source-over'

      drops.forEach((drop, columnIndex) => {
        const y = drop * FONT_SIZE
        if (y > 0) {
          const glyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
          context.fillStyle =
            Math.random() < 0.08
              ? 'rgba(230, 255, 236, 0.95)'
              : 'rgba(0, 255, 65, 0.85)'
          context.fillText(glyph, columnIndex * FONT_SIZE, y)
        }

        drops[columnIndex] =
          y > window.innerHeight && Math.random() > RESET_CHANCE
            ? Math.floor(Math.random() * -20)
            : drop + 1
      })
    }

    resize()
    window.addEventListener('resize', resize)
    frameId = window.requestAnimationFrame(draw)

    return () => {
      window.cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="matrix-rain">
      <canvas ref={canvasRef} className="matrix-rain__canvas" />
    </div>
  )
}
