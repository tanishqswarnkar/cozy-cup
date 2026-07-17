import React from 'react'
import { motion } from 'framer-motion'

const combosData = [
  {
    id: 'combo-morning',
    title: 'The Morning Awakening Pairing',
    tag: '🔥 Most Popular Combo',
    badgeColor: 'bg-amber-400 text-[#201B15]',
    description: 'A delicate floral single-origin pour-over paired with our golden, flaky French butter croissant right out of the oven.',
    itemsIncluded: [
      '1x Ethiopian Washed Pour-Over (12oz)',
      '1x Warm Buttered Artisan Croissant',
      'Specialty Honey Drizzle Side'
    ],
    originalPrice: '₹550',
    price: '₹450',
    savings: 'Save ₹100',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-28.jpg',
    origin: 'Morning Awakening Pairing (Combo)',
    tasteLine: 'Pour-over coffee & artisan croissant pairing',
  },
  {
    id: 'combo-lunch',
    title: "The Roaster's Lunch Duo",
    tag: '🌟 Chef’s Selection',
    badgeColor: 'bg-[#E5DACE] text-[#201B15]',
    description: 'Our signature rich dark espresso cold brew float paired with a toasted avocado & pesto artisan sourdough panini.',
    itemsIncluded: [
      '1x Iced Mocha Cloud Frappe (16oz)',
      '1x Avocado & Pesto Sourdough Panini',
      'House Herb Dip & Sea Salt Chips'
    ],
    originalPrice: '₹520',
    price: '₹420',
    savings: 'Save ₹100',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183675/cozy_cup_products/gallery-2.jpg',
    origin: "Roaster's Lunch Duo (Combo)",
    tasteLine: 'Iced coffee cloud & toasted sourdough sandwich pairing',
  },
  {
    id: 'combo-dessert',
    title: 'The After-Hours Indulgence',
    tag: '🍫 Sweet & Bold',
    badgeColor: 'bg-[#201B15] text-amber-300 border border-amber-300/30',
    description: 'Velvety stout-like nitro cold brew infusion served alongside an artisanal box of single-origin salted caramel truffles.',
    itemsIncluded: [
      '1x Nitro Cold Brew Float (12oz)',
      '1x Single-Origin Salted Caramel Truffles (4 pcs)',
      'Tasting Notes & Roast Profile Card'
    ],
    originalPrice: '₹620',
    price: '₹499',
    savings: 'Save ₹121',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
    origin: 'After-Hours Indulgence (Combo)',
    tasteLine: 'Nitro cold brew & artisanal chocolate truffles pairing',
  },
  {
    id: 'combo-share',
    title: 'The Ultimate Cozy Feast for Two',
    tag: '☕ Perfect for Sharing',
    badgeColor: 'bg-emerald-800 text-white',
    description: 'The complete weekend roastery date experience handcrafted for sharing with your favorite coffee companion.',
    itemsIncluded: [
      '2x Specialty Lattes (Choice of Hot or Iced)',
      '2x Toasted Artisan Bagels with Herb Cream Cheese',
      '1x Cinnamon Swirl Pecan Roll to Share'
    ],
    originalPrice: '₹950',
    price: '₹750',
    savings: 'Save ₹200',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183546/cozy_cup_products/s-27.jpg',
    origin: 'Ultimate Cozy Feast for Two (Combo)',
    tasteLine: '2x Specialty lattes, 2x bagels & cinnamon roll sharing spread',
  },
]

export default function CombosSection({ user, onOpenAuth, onAddToCart }) {
  const handleComboClick = (combo) => {
    if (!user) {
      if (onOpenAuth) onOpenAuth()
      return
    }
    if (onAddToCart) {
      onAddToCart({
        origin: combo.origin,
        tasteLine: combo.tasteLine,
        price: combo.price,
        image: combo.image,
      })
    }
  }

  return (
    <section className="px-4 sm:px-10 md:px-16 py-12 sm:py-16 md:py-20 bg-[#FCFAF6] dark:bg-[#181410] border-t border-[#201B15]/10 dark:border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14 pb-5 border-b border-[#201B15]/15 dark:border-white/15 transition-colors"
        >
          <div>
            <span className="block font-mono text-[11px] sm:text-xs uppercase tracking-widest text-[#201B15]/60 dark:text-white/60 mb-2 font-semibold">
              Curated Roastery Pairings
            </span>
            <h2 className="font-display italic font-bold text-3xl sm:text-4xl md:text-5xl text-[#201B15] dark:text-[#FCFAF6] tracking-tight transition-colors">
              Cozy Cup Specialty Combos
            </h2>
            <p className="text-sm sm:text-base text-[#201B15]/75 dark:text-white/75 mt-2 max-w-2xl font-normal leading-relaxed transition-colors">
              Handcrafted pairings designed by our master roasters and bakers. Experience harmonious flavor profiles at exclusive member combo pricing.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <span className="px-4 py-1.5 rounded-full bg-[#201B15] dark:bg-amber-400 text-amber-300 dark:text-[#201B15] font-mono text-xs font-bold uppercase tracking-wider shadow-sm transition-colors">
              Limited Daily Batches
            </span>
          </div>
        </motion.div>

        {/* Combos Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {combosData.map((combo, idx) => (
            <motion.div
              key={combo.id}
              initial={{ opacity: 0, y: 45, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.55, delay: idx * 0.12, ease: 'easeOut' }}
              viewport={{ once: true, amount: 0.15 }}
              className="group relative bg-[#F4EFE6] dark:bg-[#1E1914] rounded-3xl overflow-hidden border border-[#201B15]/15 dark:border-white/15 shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Image & Badges Header */}
                <div className="relative h-60 sm:h-64 overflow-hidden bg-[#201B15]/10 dark:bg-[#15120E]">
                  <img
                    src={combo.image}
                    alt={combo.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#201B15]/80 via-transparent to-black/20" />

                  {/* Top Badges */}
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 right-3 sm:right-4 flex flex-wrap justify-between items-start gap-1.5 pointer-events-none">
                    <span className={`px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-bold tracking-wide shadow-md ${combo.badgeColor}`}>
                      {combo.tag}
                    </span>
                    <span className="px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full bg-red-600 text-white font-mono text-[11px] sm:text-xs font-bold uppercase shadow-md tracking-wider">
                      {combo.savings}
                    </span>
                  </div>

                  {/* Price Banner on Image */}
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-5 right-3 sm:right-5 flex items-end justify-between gap-2 text-white pointer-events-none">
                    <h3 className="font-display italic font-bold text-lg sm:text-2xl md:text-3xl tracking-tight drop-shadow-md max-w-[65%] leading-snug">
                      {combo.title}
                    </h3>
                    <div className="text-right shrink-0">
                      <span className="block text-[11px] sm:text-xs line-through text-white/75 font-mono">
                        {combo.originalPrice}
                      </span>
                      <span className="font-mono text-lg sm:text-2xl font-bold text-amber-300 drop-shadow-md">
                        {combo.price}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Combo Description & Breakdown */}
                <div className="p-6 sm:p-8">
                  <p className="text-xs sm:text-sm text-[#201B15]/80 dark:text-white/80 leading-relaxed font-normal mb-5">
                    {combo.description}
                  </p>

                  <div className="bg-[#FCFAF6] dark:bg-[#15120E] rounded-2xl p-4 sm:p-5 border border-[#201B15]/10 dark:border-white/10 mb-6 transition-colors">
                    <span className="block font-mono text-[11px] uppercase tracking-widest text-[#201B15]/60 dark:text-white/60 mb-2.5 font-bold">
                      What's Included:
                    </span>
                    <ul className="space-y-2">
                      {combo.itemsIncluded.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5 text-xs sm:text-[13.5px] text-[#201B15] dark:text-[#FCFAF6] font-medium">
                          <span className="text-amber-600 dark:text-amber-400 font-bold mt-0.5">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Action Button Footer */}
              <div className="px-6 pb-6 sm:px-8 sm:pb-8 pt-0">
                <button
                  type="button"
                  onClick={() => handleComboClick(combo)}
                  className="w-full py-4 px-6 rounded-full bg-[#201B15] hover:bg-[#322920] active:scale-[0.99] text-amber-300 hover:text-white font-bold text-sm sm:text-[15px] shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-2.5 group/btn"
                >
                  <svg className="w-5 h-5 transition-transform group-hover/btn:scale-110 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>Add Combo to Bag ({combo.price})</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
