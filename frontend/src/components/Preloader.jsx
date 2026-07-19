import React, { useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Preloader({ onComplete }) {
  useEffect(() => {
    // Show the coffee beans welcome screen for 2.4 seconds, then smoothly transition into the main site
    const timer = setTimeout(() => {
      if (onComplete) onComplete()
    }, 2400)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden select-none font-sans bg-[#181410]"
    >
      {/* 100% Pure Edge-to-Edge Coffee Beans Photo Theme (Getty/Unsplash High-Res Dense Roasted Beans) */}
      <img
        src="https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183674/cozy_cup_products/gallery-1.jpg"
        alt="Dense Roasted Coffee Beans Theme"
        onError={(e) => {
          e.currentTarget.src = 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183866/cozy_cup_static/coffee-beans-bg.jpg'
        }}
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
      />

      {/* Tiny imperceptible contrast tint only so white text shadows pop over rich beans */}
      <div className="absolute inset-0 bg-black/20 pointer-events-none" />

      {/* Centered Typography and Logo exactly as requested */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
        className="relative z-10 flex flex-col items-center justify-center text-center px-4 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
      >
        {/* Brand Logo before text */}
        <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full overflow-hidden border-2 border-white/35 shadow-[0_12px_35px_rgba(0,0,0,0.9)] bg-white/10 backdrop-blur-md mb-4 sm:mb-6 flex items-center justify-center animate-pulse">
          <img
            src="https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183863/cozy_cup_static/cozy-cup-logo.png"
            alt="Cozy Cup Logo"
            className="w-full h-full object-cover rounded-full"
          />
        </div>

        <span className="font-display font-normal tracking-[0.28em] sm:tracking-[0.32em] text-white/95 text-xl sm:text-3xl md:text-4xl uppercase mb-1 sm:mb-2 leading-tight">
          Welcome
        </span>

        <span className="font-display font-normal tracking-[0.3em] text-white/90 text-sm sm:text-xl md:text-2xl uppercase mb-3 sm:mb-5 leading-tight">
          To
        </span>

        <h1 className="font-display font-bold tracking-[0.16em] sm:tracking-[0.22em] text-white text-4xl sm:text-6xl md:text-7xl uppercase leading-none text-center">
          Cozy Cup
        </h1>
      </motion.div>
    </motion.div>
  )
}
