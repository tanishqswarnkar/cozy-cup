import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer.jsx'

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
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?q=80&w=600&auto=format&fit=crop',
    origin: 'Bergamot Jasmine Macchiato',
    priceNum: '₹260',
  },
  {
    id: 'esp-4',
    name: 'Classic Flat White',
    category: 'Espresso & Drinks',
    price: '₹240',
    desc: 'Micro-foamed whole milk poured over a rich ristretto double shot.',
    image: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1509722747041-616f39b57569?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=600&auto=format&fit=crop',
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
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop',
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
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col justify-between pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto w-full pb-20">
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
          className="border-b border-[#201B15]/15 pb-10 mb-10"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block mb-2">
            Explore Our Craft
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#201B15]">
            Full Cafe & Roastery Menu
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 mt-3 max-w-2xl leading-relaxed">
            From farm-to-cup single origins and velvety espresso clouds to freshly baked artisan pastries. Click any item to add it directly to your order.
          </p>

          {/* Search Bar */}
          <div className="mt-6 max-w-md relative">
            <input
              type="text"
              placeholder="Search drinks, pastries, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/90 border border-[#201B15]/20 rounded-full py-3 pl-11 pr-5 text-sm text-[#201B15] placeholder:text-[#201B15]/40 focus:outline-none focus:border-[#201B15] shadow-sm transition-all"
            />
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-[#201B15]/50 select-none">
              🔍
            </span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono text-[#201B15]/50 hover:text-[#201B15] cursor-pointer"
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
                  ? 'bg-[#201B15] text-amber-300 shadow-md scale-105'
                  : 'bg-white/80 text-[#201B15]/80 hover:bg-white hover:text-[#201B15] border border-[#201B15]/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs font-mono tracking-widest text-[#201B15]/60 uppercase">
          <span>
            {filteredItems.length} {filteredItems.length === 1 ? 'Offering' : 'Offerings'} Available
          </span>
          {selectedCategory !== 'All Offerings' && (
            <span className="text-amber-800 font-semibold">{selectedCategory}</span>
          )}
        </div>

        {/* Menu Items Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-20 bg-white/50 rounded-3xl border border-[#201B15]/10">
            <span className="text-4xl block mb-3">☕</span>
            <h3 className="font-display font-bold text-xl text-[#201B15]">No items found matching "{searchQuery}"</h3>
            <p className="text-xs text-[#201B15]/60 mt-1">Try searching for coffee, croissant, or cold brew.</p>
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedCategory('All Offerings')
              }}
              className="mt-5 px-6 py-2 rounded-full bg-[#201B15] text-white text-xs font-semibold hover:bg-[#342A21] transition-all"
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
                className="bg-white rounded-3xl overflow-hidden border border-[#201B15]/10 shadow-sm hover:shadow-xl transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-[#F8F5F0]">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {item.tag && (
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#201B15]/90 text-amber-300 font-mono text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm shadow-md">
                        {item.tag}
                      </span>
                    )}
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-lg bg-white/90 text-[#201B15] font-mono text-[11px] font-bold backdrop-blur-sm shadow-sm">
                      {item.category}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-[#201B15] group-hover:text-amber-900 transition-colors leading-snug">
                        {item.name}
                      </h3>
                      <span className="font-mono font-bold text-lg text-[#201B15] shrink-0">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#201B15]/70 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 border-t border-[#201B15]/10 mt-2">
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
                    className="w-full py-2.5 px-4 rounded-full bg-[#201B15] hover:bg-amber-900 text-white font-semibold text-xs transition-all shadow-sm flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
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

      <Footer />
    </div>
  )
}
