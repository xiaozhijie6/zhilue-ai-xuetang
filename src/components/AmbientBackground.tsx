import { useEffect, useRef } from 'react'

type Blob = {
  x: number
  y: number
  ox: number
  oy: number
  vx: number
  vy: number
  r: number
  hue: number
  alpha: number
}

/** 浅色互动画面背景：柔和色块随指针游走，告别黑金 */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1
    let t = 0

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    let blobs: Blob[] = []
    let nodes: { x: number; y: number; ox: number; oy: number; vx: number; vy: number; r: number }[] =
      []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const hues = [168, 198, 210, 32, 145] // 青绿 / 天蓝 / 浅青 / 暖杏 / 叶绿
      blobs = Array.from({ length: 7 }, (_, i) => {
        const x = (w * (0.12 + (i % 4) * 0.22)) % w
        const y = (h * (0.18 + Math.floor(i / 3) * 0.35)) % h
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: Math.min(w, h) * (0.18 + Math.random() * 0.16),
          hue: hues[i % hues.length],
          alpha: 0.14 + Math.random() * 0.08,
        }
      })

      const count = Math.min(64, Math.floor((w * h) / 22000))
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.22,
          vy: (Math.random() - 0.5) * 0.22,
          r: 1.2 + Math.random() * 1.8,
        }
      })
    }

    const onMove = (e: PointerEvent) => {
      pointer.tx = e.clientX
      pointer.ty = e.clientY
    }

    const onLeave = () => {
      pointer.tx = -9999
      pointer.ty = -9999
    }

    const draw = () => {
      t += 0.004
      pointer.x += (pointer.tx - pointer.x) * 0.08
      pointer.y += (pointer.ty - pointer.y) * 0.08

      ctx.clearRect(0, 0, w, h)

      // 底色微渲染：纸白 + 天青雾
      const base = ctx.createLinearGradient(0, 0, w, h)
      base.addColorStop(0, 'rgba(236, 253, 245, 0.55)')
      base.addColorStop(0.45, 'rgba(240, 249, 255, 0.4)')
      base.addColorStop(1, 'rgba(255, 247, 237, 0.35)')
      ctx.fillStyle = base
      ctx.fillRect(0, 0, w, h)

      for (const b of blobs) {
        if (!reduceMotion) {
          b.x += b.vx + Math.sin(t + b.hue) * 0.15
          b.y += b.vy + Math.cos(t * 0.8 + b.hue) * 0.12
          if (b.x < -b.r) b.x = w + b.r
          if (b.x > w + b.r) b.x = -b.r
          if (b.y < -b.r) b.y = h + b.r
          if (b.y > h + b.r) b.y = -b.r

          if (pointer.x > 0) {
            const dx = pointer.x - b.x
            const dy = pointer.y - b.y
            const dist = Math.hypot(dx, dy)
            if (dist < 420) {
              b.x += dx * 0.008
              b.y += dy * 0.008
            }
          }
        }

        const g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, b.r)
        g.addColorStop(0, `hsla(${b.hue}, 72%, 72%, ${b.alpha})`)
        g.addColorStop(0.55, `hsla(${b.hue}, 65%, 78%, ${b.alpha * 0.45})`)
        g.addColorStop(1, `hsla(${b.hue}, 60%, 85%, 0)`)
        ctx.fillStyle = g
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 指针光晕（青绿，非黑金）
      if (pointer.x > 0) {
        const glow = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 280)
        glow.addColorStop(0, 'rgba(45, 212, 191, 0.22)')
        glow.addColorStop(0.35, 'rgba(56, 189, 248, 0.12)')
        glow.addColorStop(1, 'rgba(56, 189, 248, 0)')
        ctx.fillStyle = glow
        ctx.fillRect(0, 0, w, h)
      }

      for (const n of nodes) {
        if (!reduceMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -10 || n.x > w + 10) n.vx *= -1
          if (n.y < -10 || n.y > h + 10) n.vy *= -1

          if (pointer.x > 0) {
            const dx = pointer.x - n.x
            const dy = pointer.y - n.y
            const dist = Math.hypot(dx, dy)
            if (dist < 160) {
              const force = dist < 70 ? -0.02 : 0.006
              n.x += dx * force
              n.y += dy * force
            } else {
              n.x += (n.ox - n.x) * 0.003
              n.y += (n.oy - n.y) * 0.003
            }
          }
        }

        const near =
          pointer.x > 0 ? Math.max(0, 1 - Math.hypot(pointer.x - n.x, pointer.y - n.y) / 180) : 0
        ctx.beginPath()
        ctx.arc(n.x, n.y, n.r + near * 1.2, 0, Math.PI * 2)
        ctx.fillStyle =
          near > 0.12 ? `rgba(13, 148, 136, ${0.35 + near * 0.4})` : 'rgba(14, 165, 233, 0.28)'
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 120) {
            ctx.strokeStyle = `rgba(13, 148, 136, ${(1 - d / 120) * 0.18})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        if (pointer.x > 0) {
          const a = nodes[i]
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (d < 150) {
            ctx.strokeStyle = `rgba(56, 189, 248, ${(1 - d / 150) * 0.35})`
            ctx.lineWidth = 1.1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(pointer.x, pointer.y)
            ctx.stroke()
          }
        }
      }

      raf = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.documentElement.addEventListener('pointerleave', onLeave)
    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onMove)
      document.documentElement.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div className="ambient" aria-hidden="true">
      <canvas ref={canvasRef} className="ambient__canvas" />
      <div className="ambient__mesh" />
      <div className="ambient__grid" />
    </div>
  )
}
