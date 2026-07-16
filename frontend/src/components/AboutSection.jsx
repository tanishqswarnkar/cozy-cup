import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AboutSection() {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-10 md:px-16 bg-[#FCFAF6] border-t border-[#201B15]/10 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center">
          
          {/* Left Column: Image Collage */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img 
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop" 
                alt="Cozy Cup Roaster & Barista Craft" 
                className="w-full h-[360px] sm:h-[460px] object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            
            {/* Floating Stats Badge */}
            <div className="absolute -bottom-6 -right-4 sm:-right-6 z-20 bg-[#201B15] text-[#FCFAF6] p-5 sm:p-6 rounded-3xl shadow-xl border border-amber-500/30 max-w-[220px]">
              <span className="font-display font-bold text-3xl sm:text-4xl text-amber-300 block leading-none">
                100%
              </span>
              <span className="text-xs text-white/80 font-medium mt-1.5 block">
                Direct-Trade Organic Beans from High-Altitude Estates
              </span>
            </div>
          </motion.div>

          {/* Right Column: Story & Craft */}
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-6 lg:pl-4"
          >
            <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block mb-3">
              Our Story & Philosophy
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#201B15] leading-tight mb-6">
              Brewed with Passion, Rooted in Community.
            </h2>
            <p className="text-sm sm:text-base text-[#201B15]/80 leading-relaxed mb-6">
              Founded in 2018, Cozy Cup began as a humble micro-roastery with a singular mission: to bridge the gap between small-holder coffee farmers in Ethiopia, Colombia, and Kenya and coffee lovers who appreciate authentic craftsmanship.
            </p>
            <p className="text-sm sm:text-base text-[#201B15]/80 leading-relaxed mb-8">
              Every lot is roasted in small batches using clean radiant heat to preserve the delicate floral aromas, sweet berry acidity, and rich chocolate undertones of each bean origin.
            </p>

            {/* Core Values Grid */}
            <div className="grid grid-cols-2 gap-4 border-t border-[#201B15]/15 pt-6">
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[#201B15] flex items-center gap-2">
                  <span>🌱</span> Sustainable
                </h4>
                <p className="text-xs text-[#201B15]/70 mt-1">
                  Biodegradable packaging and zero-waste roasting practices.
                </p>
              </div>
              <div>
                <h4 className="font-display font-bold text-base sm:text-lg text-[#201B15] flex items-center gap-2">
                  <span>🔥</span> Micro-Roasted
                </h4>
                <p className="text-xs text-[#201B15]/70 mt-1">
                  Roasted fresh every 24 hours for peak flavor development.
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#201B15] text-amber-300 hover:bg-[#342A21] font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <span>Explore Full About & Craft Page</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
