import React from 'react'
import { motion } from 'framer-motion'
import QuickAccess from './QuickAccess.jsx'

export default function Hero({ user, onOpenAuth, selectedCategory, onSelectCategory }) {
  return (
    <section className="relative overflow-hidden pt-8 sm:pt-12 pb-6 sm:pb-10 px-4 sm:px-10 md:px-16 flex flex-col justify-start min-h-screen text-center border-b border-[#201B15]/10 dark:border-white/10 transition-colors">
      {/* Pure Background Video covering the entire Full First Page */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none"
      >
        <source src="/AOsurfWrW218hZA.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Main Content directly over the video shifted upward (`some upward`) */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto mt-6 sm:mt-8 mb-2 flex flex-col items-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.85)] px-3 sm:px-0 w-full"
      >
        <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/95 mb-3 sm:mb-4">
          Roasted weekly · Small lots only
        </span>

        <h1 className="font-display font-light text-[28px] sm:text-5xl md:text-7xl leading-[1.15] sm:leading-[1.08] tracking-tight mb-3 sm:mb-5 text-white w-full max-w-full sm:max-w-none px-2">
          Coffee that tastes like{' '}
          <em className="italic font-bold text-amber-300 not-italic-none">where</em> it's from.
        </h1>

        <p className="text-[14px] sm:text-[17px] md:text-lg text-white/95 w-full max-w-[92%] sm:max-w-2xl font-normal leading-relaxed">
          We work directly with six specialty farms across three countries and roast in batches small
          enough to taste the difference. No blends, no filler.
        </p>
      </motion.div>

      {/* Handcrafted Curations floating right under the upward text */}
      <div className="relative z-10 w-full max-w-[1160px] mx-auto mt-6 sm:mt-8 mb-6 sm:mb-10 px-3 sm:px-6">
        <div className="bg-black/40 dark:bg-black/50 backdrop-blur-md rounded-3xl sm:rounded-[36px] border border-white/20 shadow-[0_25px_60px_rgba(0,0,0,0.65)] px-6 sm:px-14 pt-6 pb-6 sm:pt-8 sm:pb-8 transition-all">
          <QuickAccess
            user={user}
            onOpenAuth={onOpenAuth}
            selectedCategory={selectedCategory}
            onSelectCategory={onSelectCategory}
            transparentBg={true}
          />
        </div>
      </div>
    </section>
  )
}

