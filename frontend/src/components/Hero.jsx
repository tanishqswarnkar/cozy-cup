import React from 'react'
import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section className="relative overflow-hidden py-16 sm:py-24 md:py-28 px-4 sm:px-10 md:px-16 flex flex-col items-center justify-center min-h-[460px] sm:min-h-[580px] text-center border-b border-[#201B15]/10">
      {/* Pure Background Video exactly as sent without any opacity or frosted overlay */}
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

      {/* Main Content directly over the pure video with framer-motion entrance animation */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)] px-3 sm:px-0 w-full"
      >
        <span className="block font-mono text-[10px] sm:text-xs uppercase tracking-widest text-white/95 mb-3 sm:mb-5">
          Roasted weekly · Small lots only
        </span>

        <h1 className="font-display font-light text-[28px] sm:text-5xl md:text-7xl leading-[1.15] sm:leading-[1.08] tracking-tight mb-4 sm:mb-6 text-white w-full max-w-full sm:max-w-none px-2">
          Coffee that tastes like{' '}
          <em className="italic font-bold text-amber-300 not-italic-none">where</em> it's from.
        </h1>

        <p className="text-[14px] sm:text-[17px] md:text-lg text-white/95 w-full max-w-[92%] sm:max-w-2xl mb-2 sm:mb-4 font-normal leading-relaxed">
          We work directly with six specialty farms across three countries and roast in batches small
          enough to taste the difference. No blends, no filler.
        </p>
      </motion.div>
    </section>
  )
}
