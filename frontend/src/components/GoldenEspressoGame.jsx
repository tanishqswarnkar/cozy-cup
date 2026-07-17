import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function GoldenEspressoGame({ onAddToCart, onOpenCart, isModal = false }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [wonPromo, setWonPromo] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    try {
      return Number(localStorage.getItem('cozy_golden_highscore') || 0)
    } catch (e) {
      return 0
    }
  })
  const [items, setItems] = useState([])
  const [cupX, setCupX] = useState(50) // Percentage 0 to 100
  const cupXRef = useRef(50)
  const gameAreaRef = useRef(null)
  const animationFrameRef = useRef(null)

  // Sync ref with state
  useEffect(() => {
    cupXRef.current = cupX
  }, [cupX])

  // Start Game
  const startGame = () => {
    setIsPlaying(true)
    setGameOver(false)
    setScore(0)
    setTimeLeft(30)
    setWonPromo(false)
    setItems([])
  }

  // Timer Loop
  useEffect(() => {
    let timer = null
    if (isPlaying && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsPlaying(false)
            setGameOver(true)
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }
    return () => clearInterval(timer)
  }, [isPlaying, timeLeft])

  // High Score Check
  useEffect(() => {
    if (gameOver) {
      if (score > highScore) {
        setHighScore(score)
        try {
          localStorage.setItem('cozy_golden_highscore', score)
        } catch (e) {}
      }
      if (score >= 300) {
        setWonPromo(true)
      }
    }
  }, [gameOver, score, highScore])

  // Mouse / Touch Move to control cup
  const handleMove = (e) => {
    if (!isPlaying || !gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    let relX = ((clientX - rect.left) / rect.width) * 100
    if (relX < 5) relX = 5
    if (relX > 95) relX = 95
    cupXRef.current = relX
    setCupX(relX)
  }

  // Falling Items Spawner & Physics Loop (Runs smoothly without cupX in dependencies!)
  useEffect(() => {
    if (!isPlaying) return

    const spawnInterval = setInterval(() => {
      const rand = Math.random()
      let type = 'bean'
      let emoji = '🫘'
      let points = 10
      let speed = 1.6 + Math.random() * 1.2
      let size = 'text-2xl sm:text-3xl'

      if (rand > 0.85) {
        type = 'golden'
        emoji = '🏆'
        points = 100
        speed = 2.4 + Math.random() * 1.0
        size = 'text-3xl sm:text-4xl drop-shadow-[0_0_12px_rgba(245,158,11,1)] scale-110'
      } else if (rand > 0.5) {
        type = 'cappuccino'
        emoji = '☕'
        points = 25
        speed = 1.8 + Math.random() * 1.0
        size = 'text-2xl sm:text-3xl'
      }

      const newItem = {
        id: Math.random().toString(36).substring(2, 9),
        x: 8 + Math.random() * 84,
        y: -10,
        type,
        emoji,
        points,
        speed,
        size,
      }

      setItems((prev) => [...prev, newItem])
    }, 550)

    // Physics Update Loop
    let lastTime = performance.now()
    const updatePhysics = (now) => {
      const delta = now - lastTime
      if (delta > 20) {
        lastTime = now
        setItems((prevItems) => {
          const remaining = []
          const currentCupX = cupXRef.current

          for (const item of prevItems) {
            const nextY = item.y + item.speed

            // Check collision with cup (cup is at y around 82% to 94%)
            if (nextY >= 82 && nextY <= 94) {
              const diffX = Math.abs(item.x - currentCupX)
              if (diffX < 9) {
                setScore((s) => s + item.points)
                continue
              }
            }

            if (nextY < 105) {
              remaining.push({ ...item, y: nextY })
            }
          }
          return remaining
        })
      }

      if (isPlaying) {
        animationFrameRef.current = requestAnimationFrame(updatePhysics)
      }
    }

    animationFrameRef.current = requestAnimationFrame(updatePhysics)

    return () => {
      clearInterval(spawnInterval)
      if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current)
    }
  }, [isPlaying])

  const claimReward = () => {
    if (onAddToCart) {
      onAddToCart({
        id: 'golden-espresso-reward',
        name: '🏆 Golden Espresso Reserve (Winner Reward)',
        price: '₹0 (Free Gift)',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
        notes: 'Promo Code GOLDEN20 Applied · 20% OFF Order',
        quantity: 1,
      })
    }
    if (onOpenCart) onOpenCart()
  }

  const containerClassName = isModal
    ? 'w-full'
    : 'py-16 sm:py-20 px-4 sm:px-10 max-w-5xl mx-auto my-8'

  return (
    <div className={containerClassName}>
      <div className="bg-gradient-to-br from-[#201B15] via-[#2A231C] to-[#16120E] text-white rounded-3xl p-5 sm:p-8 border border-amber-500/40 shadow-[0_20px_60px_rgba(0,0,0,0.7)] relative overflow-hidden">
        {/* Ambient Gold Glow background */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header & Title */}
        <div className="text-center space-y-1.5 mb-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-mono text-xs font-bold uppercase tracking-wider shadow-sm">
            <span>🎮 Interactive Barista Arcade</span>
          </div>
          <h2 className="font-display italic text-2xl sm:text-4xl font-black text-white tracking-tight">
            Catch the Golden Espresso ☕🏆
          </h2>
          <p className="text-xs sm:text-sm text-white/80 max-w-lg mx-auto font-normal">
            Slide your cup left and right to catch falling coffee items. Score <strong className="text-amber-400">300+ Points</strong> in 30s to win <strong className="text-amber-400">20% OFF (`GOLDEN20`) + Free Gift!</strong>
          </p>
        </div>

        {/* Game Stats Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 bg-black/40 backdrop-blur-md rounded-2xl px-5 py-3 border border-white/10 mb-5 relative z-10 font-mono">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-white/60">SCORE:</span>
            <span className="text-xl sm:text-3xl font-extrabold text-amber-400">{score}</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-white/60">TIME:</span>
            <span className={`text-xl sm:text-3xl font-extrabold ${timeLeft <= 5 ? 'text-red-400 animate-pulse' : 'text-white'}`}>
              {timeLeft}s
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xs text-white/60">BEST:</span>
            <span className="text-lg sm:text-2xl font-bold text-amber-300/90">{highScore}</span>
          </div>
        </div>

        {/* Main Arcade Canvas / Stage */}
        <div
          ref={gameAreaRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative w-full h-[320px] sm:h-[380px] bg-gradient-to-b from-[#15120E] via-[#1F1914] to-[#2C241D] rounded-2xl border-2 border-amber-500/40 overflow-hidden shadow-inner touch-none cursor-ew-resize select-none"
        >
          {/* Background Barista Shelf Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
            <span className="text-[100px] sm:text-[120px] select-none">☕</span>
          </div>

          {!isPlaying && !gameOver && (
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center p-6 text-center z-30">
              <span className="text-5xl sm:text-6xl mb-3 animate-bounce">🏆☕</span>
              <h3 className="text-xl sm:text-3xl font-display font-bold text-white mb-2">
                Ready to Catch the Golden Shot?
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-md mb-5">
                Hover or drag left/right to move your cappuccino cup. Catch regular beans (<strong className="text-amber-400">+10</strong>), espresso shots (<strong className="text-amber-400">+25</strong>), and rare Golden Trophy Cups (<strong className="text-amber-400">+100</strong>)!
              </p>
              <button
                type="button"
                onClick={startGame}
                className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-black font-extrabold px-8 py-4 rounded-full text-sm sm:text-base shadow-[0_0_30px_rgba(245,158,11,0.6)] cursor-pointer tracking-wide uppercase transition-all active:scale-95"
              >
                🎮 Start 30-Second Challenge ✨
              </button>
            </div>
          )}

          {/* Game Over Screen */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md flex flex-col items-center justify-center p-6 text-center z-30 animate-fadeIn">
              <span className="text-5xl sm:text-6xl mb-2">{wonPromo ? '🎉🏆✨' : '☕⏰'}</span>
              <h3 className="text-2xl sm:text-3xl font-display font-bold text-white mb-1">
                {wonPromo ? 'Congratulations! You Won!' : 'Time Up, Barista!'}
              </h3>
              <p className="text-sm sm:text-base text-amber-300 font-mono font-bold mb-4">
                Final Score: {score} Points {score >= highScore && score > 0 ? '(New High Score! ✨)' : ''}
              </p>

              {wonPromo ? (
                <div className="bg-amber-500/20 border-2 border-amber-400 rounded-2xl p-4 max-w-md w-full mb-5 text-left space-y-2 shadow-[0_0_25px_rgba(245,158,11,0.4)]">
                  <div className="flex items-center justify-between text-amber-300 font-bold text-sm">
                    <span>🎁 REWARD UNLOCKED:</span>
                    <span className="bg-amber-400 text-black px-2 py-0.5 rounded text-xs font-mono">GOLDEN20</span>
                  </div>
                  <p className="text-xs text-white/90">
                    You caught over 300 points! Claim your free <strong className="text-amber-400">Golden Espresso Reserve & 20% OFF Promo Gift</strong> directly to your cart!
                  </p>
                  <button
                    type="button"
                    onClick={claimReward}
                    className="w-full mt-2 bg-amber-400 hover:bg-amber-300 text-black font-extrabold py-2.5 rounded-xl text-xs uppercase tracking-wider cursor-pointer shadow-md transition-all active:scale-95"
                  >
                    + Claim Free Gift & 20% Promo to Cart ✨
                  </button>
                </div>
              ) : (
                <p className="text-xs text-white/75 max-w-sm mb-5">
                  You need <strong className="text-amber-400">300 Points</strong> to unlock the 20% Promo Gift (`GOLDEN20`). Give it another shot!
                </p>
              )}

              <button
                type="button"
                onClick={startGame}
                className="bg-white hover:bg-gray-100 text-[#201B15] font-bold px-8 py-3 rounded-full text-sm shadow-xl cursor-pointer transition-all active:scale-95"
              >
                🔄 Play Again
              </button>
            </div>
          )}

          {/* Falling Items */}
          {items.map((item) => (
            <div
              key={item.id}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
              className={`absolute pointer-events-none select-none transition-none ${item.size}`}
            >
              {item.emoji}
            </div>
          ))}

          {/* Barista Catch Cup at bottom */}
          <div
            style={{ left: `${cupX}%`, bottom: '12px', transform: 'translateX(-50%)' }}
            className="absolute z-20 pointer-events-none transition-none flex flex-col items-center"
          >
            <motion.div
              animate={isPlaying ? { y: [0, -4, 0] } : {}}
              transition={{ repeat: Infinity, duration: 0.8 }}
              className="text-4xl sm:text-5xl drop-shadow-[0_8px_16px_rgba(245,158,11,0.6)]"
            >
              ☕
            </motion.div>
            <div className="w-16 h-2.5 bg-amber-400/30 rounded-full blur-xs mt-1" />
          </div>
        </div>

        {/* Legend Footer */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-5 sm:gap-6 text-xs text-white/75 font-mono border-t border-white/10 pt-3.5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🫘</span>
            <span>Coffee Bean = <strong>+10 pts</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg">☕</span>
            <span>Hot Cappuccino = <strong>+25 pts</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xl">🏆</span>
            <span className="text-amber-400">Golden Espresso = <strong>+100 pts</strong></span>
          </div>
        </div>
      </div>
    </div>
  )
}
