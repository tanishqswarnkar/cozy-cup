import React, { useEffect, useState, useRef } from 'react'

export default function CoffeeCursorDrops() {
  const [drops, setDrops] = useState([])
  const lastPosRef = useRef({ x: -100, y: -100 })
  const lastTimeRef = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e) => {
      const now = Date.now()
      const { clientX: x, clientY: y } = e
      const dist = Math.hypot(x - lastPosRef.current.x, y - lastPosRef.current.y)

      // Sprinkle a cluster of fine coffee powder every ~15px of cursor movement (throttled for smooth 60fps)
      if (dist > 15 && now - lastTimeRef.current > 35) {
        lastPosRef.current = { x, y }
        lastTimeRef.current = now

        const powderSpecks = []
        // Spawn 3 to 4 fine coffee powder specks per movement cluster for rich sifting grounds effect
        const count = 3 + Math.floor(Math.random() * 2)
        const shades = ['#2A1810', '#4A2C20', '#1F120D', '#6B3E2E', '#A66850', '#D97706']

        for (let i = 0; i < count; i++) {
          const size = 2 + Math.random() * 3.5 // 2px to 5.5px fine powder granules
          const driftX = (Math.random() - 0.5) * 22 // Organic scattering sifting spread
          const fallY = 14 + Math.random() * 26 // Soft downward sifting fall
          const duration = 450 + Math.random() * 300 // 450ms to 750ms
          const color = shades[Math.floor(Math.random() * shades.length)]
          const dropId = `${now}-${i}-${Math.random()}`

          powderSpecks.push({
            id: dropId,
            x: x + (Math.random() - 0.5) * 12, // Spread underneath portafilter spouts
            y: y + 14 + (Math.random() - 0.5) * 4,
            size,
            driftX,
            fallY,
            duration,
            color,
            isSplash: false,
          })

          setTimeout(() => {
            setDrops((prev) => prev.filter((d) => d.id !== dropId))
          }, duration)
        }

        setDrops((prev) => [...prev.slice(-45), ...powderSpecks]) // Keep buffer up to 45 fine specks
      }
    }

    const handleMouseDown = (e) => {
      const now = Date.now()
      const { clientX: x, clientY: y } = e
      const splashDrops = []
      const shades = ['#2A1810', '#4A2C20', '#1F120D', '#6B3E2E', '#D97706']

      // Tap portafilter: puff out 14 fine coffee powder specks radially when clicked!
      for (let i = 0; i < 14; i++) {
        const angle = (i * Math.PI * 2) / 14 + (Math.random() - 0.5) * 0.5
        const speed = 12 + Math.random() * 18
        const driftX = Math.cos(angle) * speed
        const fallY = Math.sin(angle) * speed + 10
        const size = 2 + Math.random() * 3.5
        const duration = 400 + Math.random() * 250
        const color = shades[Math.floor(Math.random() * shades.length)]
        const dropId = `powder-puff-${now}-${i}-${Math.random()}`

        splashDrops.push({
          id: dropId,
          x: x + (Math.random() - 0.5) * 6,
          y: y + 8 + (Math.random() - 0.5) * 6,
          size,
          driftX,
          fallY,
          duration,
          color,
          isSplash: true,
        })

        setTimeout(() => {
          setDrops((prev) => prev.filter((d) => d.id !== dropId))
        }, duration)
      }

      setDrops((prev) => [...prev.slice(-45), ...splashDrops])
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mousedown', handleMouseDown, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
    }
  }, [])

  if (drops.length === 0) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {drops.map((drop) => (
        <div
          key={drop.id}
          style={{
            left: `${drop.x}px`,
            top: `${drop.y}px`,
            width: `${drop.size}px`,
            height: `${drop.size}px`,
            backgroundColor: drop.color,
            transform: 'translate(-50%, -50%)',
            animation: `coffee-powder-sift-${drop.id.replace(/[^a-zA-Z0-9]/g, '')} ${drop.duration}ms forwards`,
          }}
          className="absolute rounded-full shadow-[0_1px_3px_rgba(0,0,0,0.65)] pointer-events-none"
        >
          {/* Dynamic inline keyframes for fine sifting coffee powder trajectory */}
          <style dangerouslySetInnerHTML={{
            __html: `
              @keyframes coffee-powder-sift-${drop.id.replace(/[^a-zA-Z0-9]/g, '')} {
                0% {
                  transform: translate(-50%, -50%) scale(1);
                  opacity: 0.95;
                }
                50% {
                  transform: translate(calc(-50% + ${drop.driftX * 0.6}px), calc(-50% + ${drop.fallY * 0.5}px)) scale(1.1);
                  opacity: 0.85;
                }
                100% {
                  transform: translate(calc(-50% + ${drop.driftX}px), calc(-50% + ${drop.fallY}px)) scale(0.2);
                  opacity: 0;
                }
              }
            `
          }} />
        </div>
      ))}
    </div>
  )
}
