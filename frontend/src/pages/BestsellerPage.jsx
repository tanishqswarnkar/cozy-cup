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
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Iced Mocha Frappe',
    tasteLine: 'Cold Brewed · Rich dark chocolate, espresso & vanilla whipped cream',
    altitude: 'Chilled',
    process: 'Handcrafted',
    price: '₹320 / cup',
    category: ['Bestseller', 'Drinks'],
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Avocado & Pesto Panini',
    tasteLine: 'Handcrafted · Artisan sourdough, fresh mozzarella & sun-dried tomato',
    altitude: 'Fresh',
    process: 'Toasted',
    price: '₹380 / slice',
    category: ['Bestseller', 'Food'],
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Huila, Colombia',
    tasteLine: 'Honey · Red crisp apple, brown sugar, caramel drizzle',
    altitude: '1,700m',
    process: 'Honey',
    price: '₹590 / 340g',
    category: ['Bestseller', 'Drinks'],
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
]

export default function BestsellerPage({ onAddToCart }) {
  return (
    <div className="min-h-screen bg-[#FCFAF6] pb-24 pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#201B15]/10 hover:bg-[#201B15] text-[#201B15] hover:text-white transition-all text-xs sm:text-sm font-semibold shadow-sm"
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
          className="border-b border-[#201B15]/15 pb-6 sm:pb-8 mb-8 sm:mb-12"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-700 font-bold block mb-2">
            Cozy Cup Exclusives
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#201B15]">
            Bestsellers Collection
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 mt-2 max-w-2xl leading-relaxed">
            Explore our most celebrated single-origin roasts, signature drinks, and artisan pastries handcrafted daily.
          </p>
        </motion.div>

        {/* Curated Bestseller Items Grid */}
        <h2 className="font-display font-bold text-2xl text-[#201B15] mb-6">
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
