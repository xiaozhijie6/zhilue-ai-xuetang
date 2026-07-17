import { useEffect, useRef } from 'react'

/** 指针跟随的点阵 + 连线背景（轻量 Canvas） */
export function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = 1

    const pointer = { x: -9999, y: -9999, tx: -9999, ty: -9999 }
    type Node = {
      x: number
      y: number
      ox: number
      oy: number
      vx: number
      vy: number
      r: number
      pulse: number
    }
    let nodes: Node[] = []

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = `${w}px`
      canvas.style.height = `${h}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const count = Math.min(88, Math.floor((w * h) / 18000))
      nodes = Array.from({ length: count }, () => {
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x,
          y,
          ox: x,
          oy: y,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: 1.1 + Math.random() * 2.2,
          pulse: Math.random() * Math.PI * 2,
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
      pointer.x += (pointer.tx - pointer.x) * 0.1
      pointer.y += (pointer.ty - pointer.y) * 0.1

      ctx.clearRect(0, 0, w, h)

      if (pointer.x > 0) {
        const g = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, 320)
        g.addColorStop(0, 'rgba(250, 137, 25, 0.14)')
        g.addColorStop(0.4, 'rgba(15, 118, 110, 0.08)')
        g.addColorStop(1, 'rgba(15, 118, 110, 0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }

      for (const n of nodes) {
        n.pulse += 0.02
        if (!reduceMotion) {
          n.x += n.vx
          n.y += n.vy
          if (n.x < -20 || n.x > w + 20) n.vx *= -1
          if (n.y < -20 || n.y > h + 20) n.vy *= -1

          const dx = pointer.x - n.x
          const dy = pointer.y - n.y
          const dist = Math.hypot(dx, dy)
          if (dist < 180 && pointer.x > 0) {
            // 近处推开，稍远处轻微吸引，形成“磁场”
            const force = dist < 90 ? -0.018 : 0.004
            n.x += dx * force
            n.y += dy * force
          } else {
            n.x += (n.ox - n.x) * 0.0025
            n.y += (n.oy - n.y) * 0.0025
          }
        }

        const near =
          pointer.x > 0 ? Math.max(0, 1 - Math.hypot(pointer.x - n.x, pointer.y - n.y) / 200) : 0
        const radius = n.r + Math.sin(n.pulse) * 0.35 + near * 1.4

        ctx.beginPath()
        ctx.arc(n.x, n.y, radius, 0, Math.PI * 2)
        ctx.fillStyle =
          near > 0.15
            ? `rgba(250, 137, 25, ${0.28 + near * 0.45})`
            : 'rgba(15, 118, 110, 0.32)'
        ctx.fill()
      }

      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i]
          const b = nodes[j]
          const d = Math.hypot(a.x - b.x, a.y - b.y)
          if (d < 140) {
            const alpha = (1 - d / 140) * 0.26
            ctx.strokeStyle = `rgba(15, 118, 110, ${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }

        // 节点连到指针
        if (pointer.x > 0) {
          const a = nodes[i]
          const d = Math.hypot(a.x - pointer.x, a.y - pointer.y)
          if (d < 170) {
            const alpha = (1 - d / 170) * 0.45
            ctx.strokeStyle = `rgba(250, 137, 25, ${alpha})`
            ctx.lineWidth = 1.15
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
      <div className="ambient__grain" />
    </div>
  )
}
