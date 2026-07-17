import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CoffeeCard from '../components/CoffeeCard.jsx'

const bestsellerItems = [
  {
    origin: 'Yirgacheffe, Ethiopia',
    tasteLine: 'Washed · Bergamot, jasmine, honey & citrus blossom',
    altitude: '1,950m',
    process: 'Washed',
    price: '₹650 / 340g',
    category: ['Bestseller', 'Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183544/cozy_cup_products/s-23.jpg',
  },
  {
    origin: 'Iced Mocha Frappe',
    tasteLine: 'Cold Brewed · Rich dark chocolate, espresso & vanilla whipped cream',
    altitude: 'Chilled',
    process: 'Handcrafted',
    price: '₹320 / cup',
    category: ['Bestseller', 'Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183535/cozy_cup_products/s-9.jpg',
  },
  {
    origin: 'Avocado & Pesto Panini',
    tasteLine: 'Handcrafted · Artisan sourdough, fresh mozzarella & sun-dried tomato',
    altitude: 'Fresh',
    process: 'Toasted',
    price: '₹380 / slice',
    category: ['Bestseller', 'Food'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183540/cozy_cup_products/s-16.jpg',
  },
  {
    origin: 'Huila, Colombia',
    tasteLine: 'Honey · Red crisp apple, brown sugar, caramel drizzle',
    altitude: '1,700m',
    process: 'Honey',
    price: '₹590 / 340g',
    category: ['Bestseller', 'Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
  },
]

export default function BestsellerPage({ onAddToCart }) {
  return (
    <div className="min-h-screen bg-[#FCFAF6] dark:bg-[#181410] pb-24 pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn transition-colors">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#201B15]/10 dark:bg-white/10 hover:bg-[#201B15] dark:hover:bg-amber-400 text-[#201B15] dark:text-[#FCFAF6] hover:text-white dark:hover:text-[#201B15] transition-all text-xs sm:text-sm font-semibold shadow-sm"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border-b border-[#201B15]/15 dark:border-white/15 pb-6 sm:pb-8 mb-8 sm:mb-12 transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700 dark:text-amber-400 font-bold block mb-2 transition-colors">
            Cozy Cup Exclusives
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            Bestsellers Collection
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 dark:text-white/75 mt-2 max-w-2xl leading-relaxed transition-colors">
            Explore our most celebrated single-origin roasts, signature drinks, and artisan pastries handcrafted daily.
          </p>
        </motion.div>

        {/* Curated Bestseller Items Grid */}
        <h2 className="font-display font-bold text-2xl text-[#201B15] dark:text-[#FCFAF6] mb-6 transition-colors">
          Featured Bestsellers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {bestsellerItems.map((lot, idx) => (
            <motion.div
              key={lot.origin}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <CoffeeCard {...lot} onAddToCart={onAddToCart} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
