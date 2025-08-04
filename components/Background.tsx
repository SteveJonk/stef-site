'use client'
import { useEffect, useRef } from 'react'

const ParticleBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    let w: number,
      h: number,
      loopId: number,
      particles: Particle[] = []

    const options = {
      particleColor: 'rgba(255,255,255)',
      lineColor: 'rgba(0,181,255)',
      particleAmount: 40,
      defaultRadius: 2,
      variantRadius: 2,
      defaultSpeed: 1,
      variantSpeed: 1,
      linkRadius: 300,
    }

    const rgb = options.lineColor.match(/\d+/g)

    const canvas = canvasRef.current
    const ctx: CanvasRenderingContext2D | null = canvas.getContext('2d')

    const resizeReset = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
    }

    class Particle {
      x: number
      y: number
      color: string
      radius: number
      speed: number
      directionAngle: number
      vector: { x: number; y: number }

      constructor() {
        this.x = Math.random() * w
        this.y = Math.random() * h
        this.color = options.particleColor
        this.radius = options.defaultRadius + Math.random() * options.variantRadius
        this.speed = options.defaultSpeed + Math.random() * options.variantSpeed
        this.directionAngle = Math.floor(Math.random() * 360)
        this.vector = {
          x: Math.cos(this.directionAngle) * this.speed,
          y: Math.sin(this.directionAngle) * this.speed,
        }
      }

      update() {
        this.border()
        this.x += this.vector.x
        this.y += this.vector.y
      }

      border() {
        if (this.x >= w || this.x <= 0) this.vector.x *= -1
        if (this.y >= h || this.y <= 0) this.vector.y *= -1
        if (this.x >= w) this.x = w
        if (this.y >= h) this.y = h
        if (this.x < 0) this.x = 0
        if (this.y < 0) this.y = 0
      }

      draw() {
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = this.color
        ctx.fill()
      }
    }

    const initializeParticles = () => {
      options.particleAmount = (w + h) / 50
      options.defaultSpeed = (w + h) / 1500
      options.variantSpeed = (w + h) / 2000
      options.linkRadius = w / 10 + h / 5
      particles = []
      for (let i = 0; i < options.particleAmount; i++) {
        particles.push(new Particle())
      }
    }

    const checkDistance = (x1: number, y1: number, x2: number, y2: number) =>
      Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))

    const linkPoints = (point: Particle, hubs: Particle[]) => {
      hubs.forEach((hub) => {
        const distance = checkDistance(point.x, point.y, hub.x, hub.y)
        const opacity = 1 - distance / options.linkRadius
        if (opacity > 0) {
          ctx.lineWidth = 0.5
          ctx.strokeStyle = `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${opacity})`
          ctx.beginPath()
          ctx.moveTo(point.x, point.y)
          ctx.lineTo(hub.x, hub.y)
          ctx.stroke()
        }
      })
    }

    const drawParticles = () => {
      particles.forEach((p) => {
        p.update()
        p.draw()
      })
    }

    const drawLines = () => {
      particles.forEach((p) => linkPoints(p, particles))
    }

    const drawScene = () => {
      drawLines()
      drawParticles()
    }

    const loop = () => {
      ctx.clearRect(0, 0, w, h)
      drawScene()
      loopId = requestAnimationFrame(loop)
    }

    const startAnimation = () => {
      loopId = requestAnimationFrame(loop)
    }

    // Init
    resizeReset()
    initializeParticles()
    startAnimation()
    window.addEventListener('resize', resizeReset)

    return () => {
      cancelAnimationFrame(loopId)
      window.removeEventListener('resize', resizeReset)
    }
  }, [])

  return <canvas ref={canvasRef} className="w-fulnavl fixed inset-0 z-[-1] h-full" />
}

export default ParticleBackground
