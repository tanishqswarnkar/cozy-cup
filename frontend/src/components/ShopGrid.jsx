import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import CoffeeCard from './CoffeeCard.jsx'

const allItems = [
  // Bestsellers / Coffee At Home
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
  {
    origin: 'Artisanal Truffle Box',
    tasteLine: 'Confectionery · Single-origin dark chocolate with salted caramel fill',
    altitude: '8 pieces',
    process: 'Gourmet',
    price: '₹499 / box',
    category: ['Bestseller', 'Ready to Eat'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183543/cozy_cup_products/s-22.jpg',
  },

  // Drinks
  {
    origin: 'Caramel Macchiato Cloud',
    tasteLine: 'Hot · Double espresso shot steamed with velvety vanilla milk & caramel',
    altitude: 'Hot',
    process: 'Steamed',
    price: '₹280 / cup',
    category: ['Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183529/cozy_cup_products/s-2.jpg',
  },
  {
    origin: 'Cold Brew Nitro Float',
    tasteLine: 'Cold · 18-hour slow steep infused with nitrogen & sweet cream topping',
    altitude: 'Cold',
    process: 'Nitro',
    price: '₹310 / cup',
    category: ['Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183533/cozy_cup_products/s-7.jpg',
  },

  // Food
  {
    origin: 'Smoked Turkey & Gouda Croissant',
    tasteLine: 'Handcrafted · Flaky butter croissant served warm with melted gouda',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹350 / item',
    category: ['Food'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-17.jpg',
  },
  {
    origin: 'Spinach & Feta Breakfast Wrap',
    tasteLine: 'Handcrafted · Organic cage-free eggs and savory spinach herb tortilla',
    altitude: 'Warm',
    process: 'Toasted',
    price: '₹290 / item',
    category: ['Food'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-19.jpg',
  },

  // Merchandise
  {
    origin: 'Pour-Over Glass Carafe Set',
    tasteLine: 'Equipment · Heat-resistant borosilicate glass with reusable filter',
    altitude: '800ml',
    process: 'Glasswork',
    price: '₹1,899 / set',
    category: ['Merchandise'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-29.jpg',
  },
  {
    origin: 'Mandheling, Sumatra',
    tasteLine: 'Natural · Dark cocoa nibs, cedar wood, rich earthy spice',
    altitude: '1,300m',
    process: 'Natural',
    price: '₹620 / 340g',
    category: ['Coffee At Home'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183544/cozy_cup_products/s-25.jpg',
  },
  {
    origin: 'Antigua, Guatemala',
    tasteLine: 'Washed · Milk chocolate, toasted almond & orange zest',
    altitude: '1,650m',
    process: 'Washed',
    price: '₹680 / 340g',
    category: ['Coffee At Home'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183545/cozy_cup_products/s-26.jpg',
  },
  {
    origin: 'Nyeri AA, Kenya',
    tasteLine: 'Washed · Blackcurrant jam, ruby grapefruit & raw sugar',
    altitude: '1,850m',
    process: 'Washed',
    price: '₹750 / 340g',
    category: ['Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183546/cozy_cup_products/s-27.jpg',
  },
  {
    origin: 'Tarrazú, Costa Rica',
    tasteLine: 'Honey · Sweet nectarine, vanilla pod & silky cocoa body',
    altitude: '1,750m',
    process: 'Honey',
    price: '₹720 / 340g',
    category: ['Drinks'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-28.jpg',
  },

  // Ready to Eat
  {
    origin: 'Warm Cinnamon Pecan Roll',
    tasteLine: 'Bakery · Freshly baked every morning with brown sugar glaze',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹240 / item',
    category: ['Ready to Eat'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-14.jpg',
  },
  {
    origin: 'Almond Biscotti Duo',
    tasteLine: 'Bakery · Classic double-baked Italian dip treats for your espresso',
    altitude: '2 pieces',
    process: 'Crisp',
    price: '₹180 / pack',
    category: ['Ready to Eat'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183542/cozy_cup_products/s-21.jpg',
  },
]

export default function ShopGrid({ onAddToCart, selectedCategory = 'Bestseller' }) {
  const filteredItems = allItems.filter((item) => {
    if (!selectedCategory || selectedCategory === 'Bestseller') {
      return item.category.includes('Bestseller')
    }
    return item.category.includes(selectedCategory)
  })

  return (
    <section id="shop-grid" className="px-4 sm:px-10 md:px-16 pb-20 sm:pb-24 bg-[#FCFAF6] dark:bg-[#181410] pt-4 sm:pt-6 transition-colors">
      <motion.div 
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.2 }}
        className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-8 sm:mb-10 border-b border-[#201B15]/10 dark:border-white/10 pb-4 sm:pb-5 gap-2 transition-colors"
      >
        <div>
          <h2 className="font-display italic font-bold text-2xl sm:text-3xl md:text-4xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            {selectedCategory === 'Bestseller' ? "This Week's Bestsellers" : selectedCategory}
          </h2>
          <p className="text-xs sm:text-sm text-[#201B15]/65 dark:text-white/65 mt-1 font-normal leading-relaxed transition-colors">
            {selectedCategory === 'Bestseller' 
              ? 'Our top specialty curations, roasts & treats loved by Cozy Cup members.'
              : `Handcrafted ${selectedCategory.toLowerCase()} selections freshly prepared for you.`}
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="text-[11px] sm:text-[12px] font-mono tracking-widest text-[#201B15]/60 dark:text-white/60 uppercase shrink-0 transition-colors">
            {filteredItems.length} {filteredItems.length === 1 ? 'Item' : 'Items'} Available
          </span>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {filteredItems.map((lot, idx) => (
          <motion.div
            key={lot.origin}
            initial={{ opacity: 0, y: 45, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.12, ease: 'easeOut' }}
            viewport={{ once: true, amount: 0.1 }}
          >
            <CoffeeCard {...lot} onAddToCart={onAddToCart} />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
