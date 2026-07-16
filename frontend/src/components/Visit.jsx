import React from 'react'
import { motion } from 'framer-motion'

export default function Visit() {
  return (
    <section className="bg-[#1E3932] text-[#FCFAF6] px-4 sm:px-10 md:px-16 py-14 sm:py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, x: -45 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h2 className="font-display font-normal text-3xl sm:text-4xl mb-4 sm:mb-5 leading-tight">Come sit at the bar.</h2>
          <p className="opacity-85 max-w-md mb-6 text-sm sm:text-[15px] leading-relaxed">
            Our roastery floor doubles as the café. Watch the drum turn, ask the roaster what's
            dropping this week, and drink it ten minutes later.
          </p>

          <div className="font-mono text-xs sm:text-[13px] leading-7 sm:leading-8">
            <div>
              <span className="opacity-60 inline-block w-24 sm:w-28">Mon–Fri</span>7:00 – 17:00
            </div>
            <div>
              <span className="opacity-60 inline-block w-24 sm:w-28">Sat–Sun</span>8:00 – 15:00
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 45, scale: 0.95 }}
          whileInView={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.15, ease: 'easeOut' }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#162C27] rounded-2xl h-56 sm:h-72 flex flex-col items-center justify-center font-mono text-xs opacity-85 border border-white/10 shadow-xl p-6 text-center"
        >
          <span className="text-3xl mb-2.5">📍</span>
          <span className="font-semibold text-sm mb-1 text-white">Cozy Cup Roastery Floor</span>
          <span className="opacity-70 text-[11px] text-ecru">Udaipur Specialty Bar · Since 2021</span>
        </motion.div>
      </div>
    </section>
  )
}
