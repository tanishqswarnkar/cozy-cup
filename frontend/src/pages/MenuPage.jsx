import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer.jsx'
import InteractiveTasteWheel from '../components/InteractiveTasteWheel.jsx'

const fullMenuCategories = [
  'All Offerings',
  'Espresso & Drinks',
  'Cold Brews & Refreshers',
  'Organic Teas',
  'Artisan Bakery',
  'Savory Brunch',
  'Coffee Beans',
]

const menuCatalog = [
  // Espresso & Drinks
  {
    id: 'esp-1',
    name: 'Double Espresso Cloud',
    category: 'Espresso & Drinks',
    price: '₹220',
    desc: 'Rich velvety double shot with light vanilla crema and micro-bubble foam.',
    tag: 'Popular',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
    origin: 'Double Espresso Cloud',
    priceNum: '₹220',
  },
  {
    id: 'esp-2',
    name: 'Oat Milk Honey Latte',
    category: 'Espresso & Drinks',
    price: '₹280',
    desc: 'Creamy steamed organic oat milk infused with wild clover honey and Ceylon cinnamon.',
    tag: 'Signature',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183529/cozy_cup_products/s-2.jpg',
    origin: 'Oat Milk Honey Latte',
    priceNum: '₹280',
  },
  {
    id: 'esp-3',
    name: 'Bergamot Jasmine Macchiato',
    category: 'Espresso & Drinks',
    price: '₹260',
    desc: 'Ethiopian single-origin espresso layered over delicate citrus blossom notes.',
    tag: 'New',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183530/cozy_cup_products/s-3.jpg',
    origin: 'Bergamot Jasmine Macchiato',
    priceNum: '₹260',
  },
  {
    id: 'esp-4',
    name: 'Classic Flat White',
    category: 'Espresso & Drinks',
    price: '₹240',
    desc: 'Micro-foamed whole milk poured over a rich ristretto double shot.',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183530/cozy_cup_products/s-4.jpg',
    origin: 'Classic Flat White',
    priceNum: '₹240',
  },

  // Cold Brews & Refreshers
  {
    id: 'cb-1',
    name: 'Nitro Honey Cold Brew',
    category: 'Cold Brews & Refreshers',
    price: '₹310',
    desc: 'Injected with nitrogen for a cascading creamy texture and sweet honey finish.',
    tag: 'Bestseller',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183532/cozy_cup_products/s-6.jpg',
    origin: 'Nitro Honey Cold Brew',
    priceNum: '₹310',
  },
  {
    id: 'cb-2',
    name: 'Yuzu Tonic Espresso',
    category: 'Cold Brews & Refreshers',
    price: '₹330',
    desc: 'Bright sparkling tonic water, fresh Japanese yuzu juice, and chilled espresso.',
    tag: 'Refreshing',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183534/cozy_cup_products/s-8.jpg',
    origin: 'Yuzu Tonic Espresso',
    priceNum: '₹330',
  },
  {
    id: 'cb-3',
    name: 'Iced Mocha Frappe',
    category: 'Cold Brews & Refreshers',
    price: '₹320',
    desc: 'Cold brewed rich dark chocolate, espresso, and organic vanilla whipped cream.',
    tag: 'Popular',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183535/cozy_cup_products/s-9.jpg',
    origin: 'Iced Mocha Frappe',
    priceNum: '₹320',
  },

  // Organic Teas
  {
    id: 'tea-1',
    name: 'Ceremonial Matcha Latte',
    category: 'Organic Teas',
    price: '₹310',
    desc: 'Grade-A Uji ceremonial green tea whisked with creamy steamed oat milk.',
    tag: 'Organic',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183536/cozy_cup_products/s-11.jpg',
    origin: 'Ceremonial Matcha Latte',
    priceNum: '₹310',
  },
  {
    id: 'tea-2',
    name: 'Golden Turmeric Chai',
    category: 'Organic Teas',
    price: '₹260',
    desc: 'Soothing blend of turmeric, ginger, cardamom, and warming spices in almond milk.',
    tag: 'Wellness',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183537/cozy_cup_products/s-12.jpg',
    origin: 'Golden Turmeric Chai',
    priceNum: '₹260',
  },

  // Artisan Bakery
  {
    id: 'bak-1',
    name: 'Cardamom Almond Croissant',
    category: 'Artisan Bakery',
    price: '₹250',
    desc: 'Flaky butter layers baked with fragrant cardamom and sweet almond frangipane.',
    tag: 'Fresh Baked',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-13.jpg',
    origin: 'Cardamom Almond Croissant',
    priceNum: '₹250',
  },
  {
    id: 'bak-2',
    name: 'Valrhona Chocolate Brioche',
    category: 'Artisan Bakery',
    price: '₹230',
    desc: 'Pillow-soft brioche rolled with 70% dark French Valrhona chocolate chunks.',
    tag: 'Popular',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-14.jpg',
    origin: 'Valrhona Chocolate Brioche',
    priceNum: '₹230',
  },
  {
    id: 'bak-3',
    name: 'Gluten-Free Blueberry Loaf',
    category: 'Artisan Bakery',
    price: '₹230',
    desc: 'Moist almond flour cake bursting with organic Pacific Northwest blueberries.',
    tag: 'Gluten-Free',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183539/cozy_cup_products/s-15.jpg',
    origin: 'Gluten-Free Blueberry Loaf',
    priceNum: '₹230',
  },

  // Savory Brunch
  {
    id: 'sav-1',
    name: 'Avocado & Pesto Panini',
    category: 'Savory Brunch',
    price: '₹380',
    desc: 'Artisan sourdough, fresh mozzarella, sun-dried tomato and basil pesto.',
    tag: 'Chef Choice',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183540/cozy_cup_products/s-16.jpg',
    origin: 'Avocado & Pesto Panini',
    priceNum: '₹380',
  },
  {
    id: 'sav-2',
    name: 'Prosciutto & Fig Tartine',
    category: 'Savory Brunch',
    price: '₹420',
    desc: 'Toasted country sourdough spread with creamy ricotta, sweet fig jam, and cured prosciutto.',
    tag: 'Specialty',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-17.jpg',
    origin: 'Prosciutto & Fig Tartine',
    priceNum: '₹420',
  },

  // Coffee Beans
  {
    id: 'bean-1',
    name: 'Yirgacheffe, Ethiopia Bag',
    category: 'Coffee Beans',
    price: '₹650 / 340g',
    desc: 'Washed single origin · Notes of bergamot, jasmine, honey & citrus blossom (340g).',
    tag: 'Direct Trade',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183544/cozy_cup_products/s-23.jpg',
    origin: 'Yirgacheffe, Ethiopia Bag',
    priceNum: '₹650',
  },
  {
    id: 'bean-2',
    name: 'Huila, Colombia Bag',
    category: 'Coffee Beans',
    price: '₹590 / 340g',
    desc: 'Honey process single origin · Red crisp apple, brown sugar, caramel drizzle (340g).',
    tag: 'Single Origin',
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
    origin: 'Huila, Colombia Bag',
    priceNum: '₹590',
  },
]

export default function MenuPage({ onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('All Offerings')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredItems = menuCatalog.filter((item) => {
    const matchesCategory =
      selectedCategory === 'All Offerings' || item.category === selectedCategory
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.desc.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  return (
    <div className="min-h-screen bg-[#FCFAF6] dark:bg-[#181410] flex flex-col justify-between pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn transition-colors">
      <div className="max-w-7xl mx-auto w-full pb-20">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#201B15]/70 dark:text-white/70 hover:text-[#201B15] dark:hover:text-white transition-colors"
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
          className="border-b border-[#201B15]/15 dark:border-white/15 pb-10 mb-10 transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-2 transition-colors">
            Explore Our Craft
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            Full Cafe & Roastery Menu
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 dark:text-white/75 mt-3 max-w-2xl leading-relaxed transition-colors">
            From farm-to-cup single origins and velvety espresso clouds to freshly baked artisan pastries. Click any item to add it directly to your order.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md relative">
            <input
              type="text"
              placeholder="Search drinks, pastries, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 dark:bg-[#1E1914] border border-[#201B15]/20 dark:border-white/20 rounded-full py-3 pl-11 pr-5 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 shadow-sm transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#201B15]/50 dark:text-white/50 select-none">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#201B15]/50 dark:text-white/50 hover:text-[#201B15] dark:hover:text-white cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-10 overflow-x-auto pb-2">
          {fullMenuCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-[#201B15] dark:bg-amber-400 text-amber-300 dark:text-[#201B15] shadow-md scale-105'
                  : 'bg-white/80 dark:bg-white/10 text-[#201B15]/80 dark:text-white/80 hover:bg-white dark:hover:bg-white/20 hover:text-[#201B15] dark:hover:text-white border border-[#201B15]/10 dark:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs font-mono tracking-widest text-[#201B15]/60 dark:text-white/60 uppercase transition-colors">
          <span>
            {filteredItems.length} {filteredItems.length === 1 ? 'Offering' : 'Offerings'} Available
          </span>
          {selectedCategory !== 'All Offerings' && (
            <span className="text-amber-800 dark:text-amber-400 font-semibold">{selectedCategory}</span>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 dark:bg-[#1E1914] rounded-3xl border border-[#201B15]/10 dark:border-white/10 transition-colors">
            <span className="text-4xl block mb-3">☕</span>
            <h3 className="font-display font-bold text-xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">No items found matching "{searchQuery}"</h3>
            <p className="text-xs text-[#201B15]/60 dark:text-white/60 mt-1 transition-colors">Try searching for coffee, croissant, or cold brew.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Offerings')
              }}
              className="mt-5 px-6 py-2 rounded-full bg-[#201B15] hover:bg-[#342A21] dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#201B15] text-xs font-semibold transition-all"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <motion.div
            key={selectedCategory + searchQuery}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-[#1E1914] rounded-3xl overflow-hidden border border-[#201B15]/10 dark:border-white/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#F8F5F0] dark:bg-[#15120E]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.tag && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#201B15]/90 dark:bg-amber-400 text-amber-300 dark:text-[#201B15] font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
                        {item.tag}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 dark:bg-[#201B15]/90 text-[#201B15] dark:text-white font-mono text-[11px] font-bold backdrop-blur-sm shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#201B15] dark:text-[#FCFAF6] group-hover:text-amber-900 dark:group-hover:text-amber-300 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-mono font-bold text-lg text-[#201B15] dark:text-amber-300 shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#201B15]/70 dark:text-white/70 leading-relaxed transition-colors">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#201B15]/10 dark:border-white/10 mt-2">
                  <button
                    onClick={() =>
                      onAddToCart &&
                      onAddToCart({
                        origin: item.origin,
                        tasteLine: item.desc,
                        price: item.price,
                        image: item.image,
                      })
                    }
                    className="w-full py-2.5 px-4 rounded-full bg-[#201B15] hover:bg-amber-900 dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#201B15] font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  >
                    <span>Add to Order</span>
                    <span>+</span>
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <InteractiveTasteWheel onAddToCart={onAddToCart} />

      <Footer />
    </div>
  )
}
