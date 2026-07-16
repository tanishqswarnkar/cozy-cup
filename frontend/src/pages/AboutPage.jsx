import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer.jsx'

export default function AboutPage() {
  const milestones = [
    { year: '2018', title: 'The Humble Micro-Roastery', desc: 'Cozy Cup started in a 400 sq. ft. garage in Seattle with a 3kg vintage drum roaster and two direct-trade partnerships.' },
    { year: '2020', title: 'Zero-Waste & Organic Pledge', desc: 'We transitioned 100% of our coffee bags, cups, and takeaway utensils to certified biodegradable and compostable materials.' },
    { year: '2022', title: 'Direct-Trade Expansion', desc: 'Expanded our farmer cooperative relationships to Huila (Colombia), Yirgacheffe (Ethiopia), and Nyeri (Kenya), paying 40% above fair-trade baseline.' },
    { year: '2024+', title: 'The Community Sanctuary', desc: 'Opened our flagship roastery cafe, hosting weekly public cupping sessions, barista workshops, and acoustic community nights.' },
  ]

  const values = [
    { icon: '🌱', title: 'Ethical & Direct Trade', desc: 'We cut out middlemen to ensure small-holder farmers receive life-changing premiums for their exceptional harvests.' },
    { icon: '🔥', title: '24-Hour Micro-Roasting', desc: 'Every bean is roasted to order in small batches using clean radiant heat to develop peak sweetness and complex floral notes.' },
    { icon: '☕', title: 'Master Craftsmanship', desc: 'Our baristas undergo 120 hours of rigorous training in extraction kinetics, milk micro-foaming, and sensory tasting.' },
    { icon: '🏡', title: 'Warmth & Belonging', desc: 'We design our cafes to be a sanctuary away from the hustle—where good conversations and genuine hospitality thrive.' },
  ]

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col justify-between pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto w-full pb-24">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#201B15]/70 hover:text-[#201B15] transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#201B15]/15 pb-12 mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block mb-3">
            Our Heritage & Purpose
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#201B15] leading-tight">
            More Than Just Coffee. A Community Sanctuary.
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 mt-4 leading-relaxed">
            From high-altitude volcanic soils in Ethiopia and Colombia to the warmth of your morning cup, explore our relentless pursuit of extraordinary coffee craftsmanship and sustainability.
          </p>
        </motion.div>

        {/* Two-Column Feature Area */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-16 items-center mb-24">
          <div className="lg:col-span-6 relative">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop"
                alt="Roasting Craft"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-6 -left-4 sm:-left-6 bg-[#201B15] text-[#FCFAF6] p-6 rounded-3xl shadow-xl border border-amber-500/30 max-w-[240px]">
              <span className="font-display font-bold text-3xl sm:text-4xl text-amber-300 block">
                1,950m+
              </span>
              <span className="text-xs text-white/80 font-medium mt-1 block">
                Average altitude of our single-origin farming partner cooperatives.
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#201B15]">
              The Pursuit of the Perfect Extraction
            </h2>
            <p className="text-sm sm:text-base text-[#201B15]/80 leading-relaxed">
              We believe that great coffee is not an accident—it is the synthesis of agricultural mastery, rigorous scientific roasting, and human warmth. Every harvest is cupped over 50 times by our Q-Graders before a profile is locked in.
            </p>
            <p className="text-sm sm:text-base text-[#201B15]/80 leading-relaxed">
              Whether you are savoring our double-shot espresso cloud or our 18-hour nitro cold brew, you are tasting the direct result of fair compensation, soil health conservation, and artisan passion.
            </p>
          </div>
        </div>

        {/* Core Pillars / Values Grid */}
        <div className="mb-24">
          <div className="text-center max-w-xl mx-auto mb-12">
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#201B15]">
              Our Core Pillars
            </h2>
            <p className="text-xs sm:text-sm text-[#201B15]/65 mt-2">
              The four uncompromised principles that govern every bean we roast and every guest we serve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val, idx) => (
              <motion.div
                key={val.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-7 rounded-3xl border border-[#201B15]/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F8F5F0] flex items-center justify-center text-2xl mb-4 border border-[#201B15]/10">
                    {val.icon}
                  </div>
                  <h3 className="font-display font-bold text-lg text-[#201B15] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-xs text-[#201B15]/70 leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Timeline / Milestones */}
        <div className="bg-[#201B15] text-[#FCFAF6] rounded-3xl p-8 sm:p-16 border border-amber-500/20 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="font-mono text-xs uppercase tracking-widest text-amber-400 font-bold block mb-2">
              Our Journey
            </span>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
              Milestones of Craft & Care
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {milestones.map((item, idx) => (
              <div key={item.year} className="relative border-l border-amber-400/30 pl-6 space-y-2">
                <span className="font-mono font-bold text-2xl text-amber-300 block">
                  {item.year}
                </span>
                <h4 className="font-display font-bold text-base sm:text-lg text-white">
                  {item.title}
                </h4>
                <p className="text-xs text-white/70 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
