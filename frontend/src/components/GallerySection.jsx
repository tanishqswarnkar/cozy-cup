import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function GallerySection() {
  const photos = [
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183673/cozy_cup_products/hero-1.jpg',
      title: 'Warm Morning Vibe',
      tag: 'Interior',
    },
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
      title: 'Artisan Latte Art',
      tag: 'Craftsmanship',
    },
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183674/cozy_cup_products/gallery-1.jpg',
      title: 'Single-Origin Beans',
      tag: 'Roastery',
    },
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183675/cozy_cup_products/gallery-2.jpg',
      title: 'Cozy Corner Booths',
      tag: 'Atmosphere',
    },
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183676/cozy_cup_products/about-1.jpg',
      title: 'Pour Over Extraction',
      tag: 'Brew Bar',
    },
    {
      url: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-28.jpg',
      title: 'Freshly Baked Pastries',
      tag: 'Bakery',
    },
  ]

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-10 md:px-16 bg-[#F8F5F0] dark:bg-[#181410] border-t border-[#201B15]/10 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-2 transition-colors">
            Moments & Atmosphere
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            Cafe Gallery
          </h2>
          <p className="text-sm sm:text-base text-[#201B15]/70 dark:text-white/70 mt-3 leading-relaxed transition-colors">
            Take a visual peek inside our cozy sanctuary where good conversations, rich aromas, and warmth come together.
          </p>
        </div>

        {/* Masonry / Grid Layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {photos.map((photo, idx) => (
            <motion.div
              key={photo.url}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#201B15] h-64 sm:h-72 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400/90 text-[#201B15] font-mono text-[10px] font-bold uppercase tracking-wider mb-2">
                  {photo.tag}
                </span>
                <h3 className="font-display font-bold text-lg text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#201B15] hover:bg-[#342A21] dark:bg-amber-400 dark:hover:bg-amber-300 text-amber-300 dark:text-[#201B15] font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <span>Explore Full Visual Gallery Page</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
