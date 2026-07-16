import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CoffeeCard from '../components/CoffeeCard.jsx'

const drinksItems = [
  {
    origin: 'Caramel Macchiato Cloud',
    tasteLine: 'Hot · Double espresso shot steamed with velvety vanilla milk & caramel',
    altitude: 'Hot',
    process: 'Steamed',
    price: '₹280 / cup',
    category: ['Drinks'],
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Cold Brew Nitro Float',
    tasteLine: 'Cold · 18-hour slow steep infused with nitrogen & sweet cream topping',
    altitude: 'Cold',
    process: 'Nitro',
    price: '₹310 / cup',
    category: ['Drinks'],
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Matcha Espresso Fusion',
    tasteLine: 'Iced · Ceremonial Uji matcha layered over espresso & oat milk',
    altitude: 'Iced',
    process: 'Layered',
    price: '₹340 / cup',
    category: ['Drinks'],
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Yirgacheffe, Ethiopia',
    tasteLine: 'Washed · Bergamot, jasmine, honey & citrus blossom',
    altitude: '1,950m',
    process: 'Washed',
    price: '₹650 / 340g',
    category: ['Drinks'],
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  },
]

export default function DrinksPage({ onAddToCart }) {
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
            Handcrafted Beverages
          </span>
          <h1 className="font-display font-bold text-3xl sm:text-5xl text-[#201B15]">
            Drinks Menu
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 mt-2 max-w-2xl leading-relaxed">
            From single-origin pour overs and nitro cold brews to signature espresso clouds.
          </p>
        </motion.div>

        {/* Curated Drinks Grid */}
        <h2 className="font-display font-bold text-2xl text-[#201B15] mb-6">
          All Drinks
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {drinksItems.map((lot, idx) => (
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
