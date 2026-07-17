import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const curations = [
  {
    id: 'Bestseller',
    label: 'Bestseller',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183535/cozy_cup_products/s-9.jpg',
  },
  {
    id: 'Drinks',
    label: 'Drinks',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183529/cozy_cup_products/s-2.jpg',
  },
  {
    id: 'Food',
    label: 'Food',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183540/cozy_cup_products/s-16.jpg',
  },
  {
    id: 'Ready to Eat',
    label: 'Ready to Eat',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183543/cozy_cup_products/s-22.jpg',
  },
]

export default function QuickAccess({ user, onOpenAuth, selectedCategory, onSelectCategory, transparentBg = false }) {
  const navigate = useNavigate()

  const handleCategoryClick = (itemId) => {
    if (!user) {
      if (onOpenAuth) onOpenAuth()
      return
    }
    if (onSelectCategory) onSelectCategory(itemId)
    const routeMap = {
      Bestseller: '/bestseller',
      Drinks: '/drinks',
      Food: '/food',
      'Ready to Eat': '/ready-to-eat',
    }
    if (routeMap[itemId]) {
      navigate(routeMap[itemId])
    }
  }

  return (
    <div className={`w-full transition-colors ${
      transparentBg ? 'py-0 bg-transparent' : 'py-2 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className={`font-display font-bold text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-8 tracking-tight text-center w-full block transition-colors ${
            transparentBg
              ? 'text-white drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]'
              : 'text-[#201B15] dark:text-[#FCFAF6]'
          }`}
        >
          Handcrafted Curations
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-8 gap-y-8 sm:gap-x-12 items-center justify-center max-w-4xl mx-auto w-full">
          {curations.map((item, idx) => {
            const isSelected = selectedCategory === item.id || (!selectedCategory && item.id === 'Bestseller')
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 35, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.08, ease: 'easeOut' }}
                viewport={{ once: true, amount: 0.15 }}
                onClick={() => handleCategoryClick(item.id)}
                className="flex flex-col items-center justify-center group cursor-pointer select-none mx-auto"
              >
                {/* Circular Image Container responsive for iPhone 6 (`375px`) to Desktop */}
                <div className={`w-20 h-20 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full overflow-hidden transition-all duration-300 relative shadow-xl group-hover:shadow-2xl group-hover:scale-105 ${
                  isSelected
                    ? 'ring-3 sm:ring-4 ring-[#201B15] dark:ring-amber-400 ring-offset-2 sm:ring-offset-4 ring-offset-white dark:ring-offset-[#181410]'
                    : 'border border-[#201B15]/15 dark:border-white/20 hover:border-[#201B15]/40'
                }`}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Category Label */}
                <span className={`mt-2.5 sm:mt-3.5 text-[12px] sm:text-[14px] md:text-[15px] font-bold text-center transition-colors leading-tight ${
                  transparentBg
                    ? isSelected
                      ? 'text-amber-300 underline underline-offset-4 font-extrabold drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                      : 'text-white/95 group-hover:text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]'
                    : isSelected
                      ? 'text-[#201B15] dark:text-amber-300 underline underline-offset-4'
                      : 'text-[#201B15]/80 dark:text-white/80 group-hover:text-[#201B15] dark:group-hover:text-white'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
