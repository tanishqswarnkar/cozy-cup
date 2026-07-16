import React from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const curations = [
  {
    id: 'Bestseller',
    label: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'Drinks',
    label: 'Drinks',
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'Food',
    label: 'Food',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop',
  },
  {
    id: 'Ready to Eat',
    label: 'Ready to Eat',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?q=80&w=600&auto=format&fit=crop',
  },
]

export default function QuickAccess({ user, onOpenAuth, selectedCategory, onSelectCategory }) {
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
    <section className="px-4 sm:px-10 md:px-16 pt-8 sm:pt-12 pb-6 bg-[#FCFAF6]">
      <div className="max-w-7xl mx-auto">
        <motion.h2 
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="font-display font-bold text-xl sm:text-2xl md:text-3xl text-[#1E3932] sm:text-[#201B15] mb-6 sm:mb-8 tracking-tight text-center sm:text-left"
        >
          Handcrafted Curations
        </motion.h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-6 sm:gap-8 items-start justify-between max-w-4xl mx-auto">
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
                className="flex flex-col items-center group cursor-pointer select-none"
              >
                {/* Circular Image Container responsive for iPhone 6 (`375px`) to Desktop */}
                <div className={`w-16 h-16 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full overflow-hidden transition-all duration-300 relative shadow-md group-hover:shadow-xl group-hover:scale-105 ${
                  isSelected ? 'ring-3 sm:ring-4 ring-[#201B15] ring-offset-2 sm:ring-offset-4 ring-offset-[#FCFAF6]' : 'border border-[#201B15]/10'
                }`}>
                  <img
                    src={item.image}
                    alt={item.label}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors" />
                </div>

                {/* Category Label */}
                <span className={`mt-2.5 sm:mt-3.5 text-[11.5px] sm:text-[13.5px] md:text-[14.5px] font-bold text-center transition-colors leading-tight ${
                  isSelected ? 'text-[#201B15] underline underline-offset-4' : 'text-[#201B15]/80 group-hover:text-[#201B15]'
                }`}>
                  {item.label}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
