import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import OptimizedImage from './OptimizedImage.jsx'

export const masterSearchCatalog = [
  // Drinks & Espresso
  {
    id: 's-1',
    origin: 'Double Espresso Cloud',
    tasteLine: 'Rich velvety double shot with light vanilla crema and micro-bubble foam.',
    altitude: 'Hot',
    process: 'Espresso',
    price: '₹220',
    category: ['Drinks', 'Espresso'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
  },
  {
    id: 's-2',
    origin: 'Oat Milk Honey Latte',
    tasteLine: 'Creamy steamed organic oat milk infused with wild clover honey and Ceylon cinnamon.',
    altitude: 'Hot',
    process: 'Signature',
    price: '₹280',
    category: ['Drinks', 'Espresso'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183529/cozy_cup_products/s-2.jpg',
  },
  {
    id: 's-3',
    origin: 'Bergamot Jasmine Macchiato',
    tasteLine: 'Ethiopian single-origin espresso layered over delicate citrus blossom notes.',
    altitude: 'Hot',
    process: 'New',
    price: '₹260',
    category: ['Drinks', 'Espresso'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183530/cozy_cup_products/s-3.jpg',
  },
  {
    id: 's-4',
    origin: 'Classic Flat White',
    tasteLine: 'Micro-foamed whole milk poured over a rich ristretto double shot.',
    altitude: 'Hot',
    process: 'Classic',
    price: '₹240',
    category: ['Drinks', 'Espresso'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183530/cozy_cup_products/s-4.jpg',
  },
  {
    id: 's-5',
    origin: 'Caramel Macchiato Cloud',
    tasteLine: 'Hot · Double espresso shot steamed with velvety vanilla milk & caramel',
    altitude: 'Hot',
    process: 'Steamed',
    price: '₹280 / cup',
    category: ['Drinks', 'Espresso'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183529/cozy_cup_products/s-2.jpg',
  },
  {
    id: 's-6',
    origin: 'Nitro Honey Cold Brew',
    tasteLine: 'Injected with nitrogen for a cascading creamy texture and sweet honey finish.',
    altitude: 'Cold',
    process: 'Nitro',
    price: '₹310',
    category: ['Drinks', 'Cold Brew'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183532/cozy_cup_products/s-6.jpg',
  },
  {
    id: 's-7',
    origin: 'Cold Brew Nitro Float',
    tasteLine: 'Cold · 18-hour slow steep infused with nitrogen & sweet cream topping',
    altitude: 'Cold',
    process: 'Nitro',
    price: '₹310 / cup',
    category: ['Drinks', 'Cold Brew'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183533/cozy_cup_products/s-7.jpg',
  },
  {
    id: 's-8',
    origin: 'Yuzu Tonic Espresso',
    tasteLine: 'Bright sparkling tonic water, fresh Japanese yuzu juice, and chilled espresso.',
    altitude: 'Iced',
    process: 'Tonic',
    price: '₹330',
    category: ['Drinks', 'Cold Brew'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183534/cozy_cup_products/s-8.jpg',
  },
  {
    id: 's-9',
    origin: 'Iced Mocha Frappe',
    tasteLine: 'Cold brewed rich dark chocolate, espresso, and organic vanilla whipped cream.',
    altitude: 'Chilled',
    process: 'Frappe',
    price: '₹320 / cup',
    category: ['Drinks', 'Cold Brew'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183535/cozy_cup_products/s-9.jpg',
  },
  {
    id: 's-10',
    origin: 'Matcha Espresso Fusion',
    tasteLine: 'Iced · Ceremonial Uji matcha layered over espresso & oat milk',
    altitude: 'Iced',
    process: 'Layered',
    price: '₹340 / cup',
    category: ['Drinks', 'Tea'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183535/cozy_cup_products/s-10.jpg',
  },
  {
    id: 's-11',
    origin: 'Ceremonial Matcha Latte',
    tasteLine: 'Grade-A Uji ceremonial green tea whisked with creamy steamed oat milk.',
    altitude: 'Hot',
    process: 'Organic',
    price: '₹310',
    category: ['Drinks', 'Tea'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183536/cozy_cup_products/s-11.jpg',
  },
  {
    id: 's-12',
    origin: 'Golden Turmeric Chai',
    tasteLine: 'Soothing blend of turmeric, ginger, cardamom, and warming spices in almond milk.',
    altitude: 'Hot',
    process: 'Wellness',
    price: '₹260',
    category: ['Drinks', 'Tea'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183537/cozy_cup_products/s-12.jpg',
  },

  // Bakery & Food
  {
    id: 's-13',
    origin: 'Cardamom Almond Croissant',
    tasteLine: 'Flaky butter layers baked with fragrant cardamom and sweet almond frangipane.',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹250',
    category: ['Food', 'Bakery'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-13.jpg',
  },
  {
    id: 's-14',
    origin: 'Valrhona Chocolate Brioche',
    tasteLine: 'Pillow-soft brioche rolled with 70% dark French Valrhona chocolate chunks.',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹230',
    category: ['Food', 'Bakery'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-14.jpg',
  },
  {
    id: 's-15',
    origin: 'Gluten-Free Blueberry Loaf',
    tasteLine: 'Moist almond flour cake bursting with organic Pacific Northwest blueberries.',
    altitude: 'Fresh',
    process: 'Gluten-Free',
    price: '₹230',
    category: ['Food', 'Bakery'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183539/cozy_cup_products/s-15.jpg',
  },
  {
    id: 's-16',
    origin: 'Avocado & Pesto Panini',
    tasteLine: 'Artisan sourdough, fresh mozzarella, sun-dried tomato and basil pesto.',
    altitude: 'Fresh',
    process: 'Toasted',
    price: '₹380 / slice',
    category: ['Food', 'Savory'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183540/cozy_cup_products/s-16.jpg',
  },
  {
    id: 's-17',
    origin: 'Prosciutto & Fig Tartine',
    tasteLine: 'Toasted country sourdough spread with creamy ricotta, sweet fig jam, and cured prosciutto.',
    altitude: 'Fresh',
    process: 'Specialty',
    price: '₹420',
    category: ['Food', 'Savory'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-17.jpg',
  },
  {
    id: 's-18',
    origin: 'Smoked Turkey & Gouda Croissant',
    tasteLine: 'Handcrafted · Flaky butter croissant served warm with melted gouda',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹350 / item',
    category: ['Food', 'Savory'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-17.jpg',
  },
  {
    id: 's-19',
    origin: 'Spinach & Feta Breakfast Wrap',
    tasteLine: 'Handcrafted · Organic cage-free eggs and savory spinach herb tortilla',
    altitude: 'Warm',
    process: 'Toasted',
    price: '₹290 / item',
    category: ['Food', 'Savory'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183541/cozy_cup_products/s-19.jpg',
  },
  {
    id: 's-20',
    origin: 'Warm Cinnamon Pecan Roll',
    tasteLine: 'Bakery · Freshly baked every morning with brown sugar glaze',
    altitude: 'Fresh',
    process: 'Bakery',
    price: '₹240 / item',
    category: ['Ready to Eat', 'Bakery'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183538/cozy_cup_products/s-14.jpg',
  },
  {
    id: 's-21',
    origin: 'Almond Biscotti Duo',
    tasteLine: 'Bakery · Classic double-baked Italian dip treats for your espresso',
    altitude: '2 pieces',
    process: 'Crisp',
    price: '₹180 / pack',
    category: ['Ready to Eat'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183542/cozy_cup_products/s-21.jpg',
  },
  {
    id: 's-22',
    origin: 'Artisanal Truffle Box',
    tasteLine: 'Confectionery · Single-origin dark chocolate with salted caramel fill',
    altitude: '8 pieces',
    process: 'Gourmet',
    price: '₹499 / box',
    category: ['Ready to Eat', 'Sweets'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183543/cozy_cup_products/s-22.jpg',
  },

  // Coffee Beans & Merchandise
  {
    id: 's-23',
    origin: 'Yirgacheffe, Ethiopia Bag',
    tasteLine: 'Washed single origin · Notes of bergamot, jasmine, honey & citrus blossom (340g).',
    altitude: '1,950m',
    process: 'Washed',
    price: '₹650 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183544/cozy_cup_products/s-23.jpg',
  },
  {
    id: 's-24',
    origin: 'Huila, Colombia Bag',
    tasteLine: 'Honey process single origin · Red crisp apple, brown sugar, caramel drizzle (340g).',
    altitude: '1,700m',
    process: 'Honey',
    price: '₹590 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183528/cozy_cup_products/s-1.jpg',
  },
  {
    id: 's-25',
    origin: 'Mandheling, Sumatra Bag',
    tasteLine: 'Natural · Dark cocoa nibs, cedar wood, rich earthy spice',
    altitude: '1,300m',
    process: 'Natural',
    price: '₹620 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183544/cozy_cup_products/s-25.jpg',
  },
  {
    id: 's-26',
    origin: 'Antigua, Guatemala Bag',
    tasteLine: 'Washed · Milk chocolate, toasted almond & orange zest',
    altitude: '1,650m',
    process: 'Washed',
    price: '₹680 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183545/cozy_cup_products/s-26.jpg',
  },
  {
    id: 's-27',
    origin: 'Nyeri AA, Kenya Bag',
    tasteLine: 'Washed · Blackcurrant jam, ruby grapefruit & raw sugar',
    altitude: '1,850m',
    process: 'Washed',
    price: '₹750 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183546/cozy_cup_products/s-27.jpg',
  },
  {
    id: 's-28',
    origin: 'Tarrazú, Costa Rica Bag',
    tasteLine: 'Honey · Sweet nectarine, vanilla pod & silky cocoa body',
    altitude: '1,750m',
    process: 'Honey',
    price: '₹720 / 340g',
    category: ['Coffee Beans', 'Bag'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-28.jpg',
  },
  {
    id: 's-29',
    origin: 'Pour-Over Glass Carafe Set',
    tasteLine: 'Equipment · Heat-resistant borosilicate glass with reusable filter',
    altitude: '800ml',
    process: 'Glasswork',
    price: '₹1,899 / set',
    category: ['Merchandise', 'Equipment'],
    image: 'https://res.cloudinary.com/hru3yyo1/image/upload/f_auto,q_auto/v1784183547/cozy_cup_products/s-29.jpg',
  },
]

export default function SearchModal({ isOpen, onClose, onAddToCart }) {
  const [query, setQuery] = useState('')
  const [activeTab, setActiveTab] = useState('All')
  const [addedIds, setAddedIds] = useState({})
  const inputRef = useRef(null)

  // Focus input automatically when modal opens
  useEffect(() => {
    if (isOpen) {
      setQuery('')
      setActiveTab('All')
      setTimeout(() => {
        inputRef.current?.focus()
      }, 50)
    }
  }, [isOpen])

  // Handle ESC shortcut
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const tabs = ['All', 'Drinks', 'Food & Bakery', 'Coffee Beans', 'Merchandise']

  const filteredItems = masterSearchCatalog.filter((item) => {
    // Check Category tab
    let matchesTab = true
    if (activeTab === 'Drinks') {
      matchesTab = item.category.some(c => ['Drinks', 'Espresso', 'Cold Brew', 'Tea'].includes(c))
    } else if (activeTab === 'Food & Bakery') {
      matchesTab = item.category.some(c => ['Food', 'Bakery', 'Savory', 'Ready to Eat', 'Sweets'].includes(c))
    } else if (activeTab === 'Coffee Beans') {
      matchesTab = item.category.some(c => ['Coffee Beans', 'Bag'].includes(c))
    } else if (activeTab === 'Merchandise') {
      matchesTab = item.category.some(c => ['Merchandise', 'Equipment'].includes(c))
    }

    // Check search term
    const cleanQuery = query.trim().toLowerCase()
    if (!cleanQuery) return matchesTab

    const matchesQuery = 
      item.origin.toLowerCase().includes(cleanQuery) ||
      item.tasteLine.toLowerCase().includes(cleanQuery) ||
      item.process.toLowerCase().includes(cleanQuery) ||
      item.category.some(c => c.toLowerCase().includes(cleanQuery))

    return matchesTab && matchesQuery
  })

  const handleAdd = (item) => {
    if (onAddToCart) {
      onAddToCart(item)
      setAddedIds((prev) => ({ ...prev, [item.id || item.origin]: true }))
      setTimeout(() => {
        setAddedIds((prev) => ({ ...prev, [item.id || item.origin]: false }))
      }, 1400)
    }
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 md:p-12 animate-fadeIn font-sans overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-[#181410]/80 backdrop-blur-md transition-opacity cursor-pointer"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-3xl bg-[#FCFAF6] dark:bg-[#181410] rounded-3xl shadow-2xl border border-[#201B15]/15 dark:border-white/15 overflow-hidden flex flex-col max-h-[85vh] transition-colors"
        >
          {/* Top Search Input Header */}
          <div className="p-4 sm:p-6 bg-white dark:bg-[#1E1914] border-b border-[#201B15]/10 dark:border-white/10 flex flex-col gap-4 transition-colors">
            <div className="flex items-center gap-3 bg-[#FCFAF6] dark:bg-[#15120E] px-4 py-3 rounded-2xl border border-[#201B15]/15 dark:border-white/15 focus-within:border-amber-600 dark:focus-within:border-amber-400 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
              <svg className="w-6 h-6 text-[#201B15]/50 dark:text-white/50 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search roasts, drinks, pastries, bags, equipment (try 'Oat', 'Cold Brew', 'Croissant')..."
                className="w-full bg-transparent border-none outline-none font-sans text-base sm:text-lg text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="w-6 h-6 rounded-full bg-[#201B15]/10 dark:bg-white/15 hover:bg-[#201B15]/20 dark:hover:bg-white/25 flex items-center justify-center text-xs font-bold text-[#201B15] dark:text-white transition-colors cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeTab === tab
                      ? 'bg-[#201B15] dark:bg-amber-400 text-amber-300 dark:text-[#201B15] shadow-md scale-105'
                      : 'bg-[#201B15]/5 dark:bg-white/10 hover:bg-[#201B15]/10 dark:hover:bg-white/20 text-[#201B15]/70 dark:text-white/80'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Results List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3">
            {filteredItems.length === 0 ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-16 h-16 bg-[#EBE5D8] dark:bg-[#1E1914] rounded-full flex items-center justify-center mx-auto text-2xl">
                  ☕
                </div>
                <h4 className="font-display italic text-2xl text-[#201B15] dark:text-[#FCFAF6]">No matching cravings found</h4>
                <p className="text-xs sm:text-sm text-[#201B15]/60 dark:text-white/60 max-w-sm mx-auto">
                  We couldn't find anything matching "{query}". Try searching for another roast, drink, or pastry.
                </p>
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#201B15] dark:bg-amber-400 text-white dark:text-[#201B15] text-xs font-semibold hover:bg-[#342A21] dark:hover:bg-amber-300 transition-all cursor-pointer"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              <>
                <div className="flex justify-between items-center text-xs font-mono text-[#201B15]/60 dark:text-white/60 px-1 mb-2">
                  <span>Showing {filteredItems.length} {filteredItems.length === 1 ? 'result' : 'results'}</span>
                  <span className="hidden sm:inline">Press ESC to close</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {filteredItems.map((item) => {
                    const isAdded = addedIds[item.id || item.origin]
                    return (
                      <div
                        key={item.id || item.origin}
                        className="bg-white dark:bg-[#1E1914] p-3.5 rounded-2xl border border-[#201B15]/10 dark:border-white/10 hover:border-amber-600/40 dark:hover:border-amber-400/50 hover:shadow-md transition-all flex gap-3.5 items-center group"
                      >
                        {/* Thumbnail image */}
                        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-[#EBE5D8] dark:bg-[#15120E] shrink-0 relative">
                          <OptimizedImage
                            src={item.image}
                            alt={item.origin}
                            width={200}
                            containerClassName="w-full h-full"
                            className="group-hover:scale-110 transition-transform duration-500"
                          />
                          <span className="absolute bottom-1 right-1 z-10 bg-black/70 backdrop-blur-xs text-amber-300 text-[9px] font-mono font-bold px-1.5 py-0.5 rounded border border-white/10">
                            {item.process}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0 flex flex-col justify-between h-full">
                          <div>
                            <h4 className="font-display font-bold text-base text-[#201B15] dark:text-[#FCFAF6] truncate group-hover:text-amber-800 dark:group-hover:text-amber-300 transition-colors">
                              {item.origin}
                            </h4>
                            <p className="text-[11px] text-[#201B15]/65 dark:text-white/65 line-clamp-2 mt-0.5 leading-snug">
                              {item.tasteLine}
                            </p>
                          </div>

                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#201B15]/10 dark:border-white/10">
                            <span className="font-mono text-sm font-bold text-[#201B15] dark:text-amber-300">{item.price}</span>

                            <button
                              type="button"
                              onClick={() => handleAdd(item)}
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer shadow-sm ${
                                isAdded
                                  ? 'bg-emerald-700 text-white scale-95'
                                  : 'bg-[#201B15] hover:bg-[#342A21] dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#201B15] active:scale-95'
                              }`}
                            >
                              {isAdded ? (
                                <>
                                  <svg className="w-3.5 h-3.5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                                  </svg>
                                  <span>Added!</span>
                                </>
                              ) : (
                                <>
                                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                                  </svg>
                                  <span>Add</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </div>

          {/* Modal Footer */}
          <div className="p-3.5 sm:p-4 bg-white dark:bg-[#1E1914] border-t border-[#201B15]/10 dark:border-white/10 flex items-center justify-between text-xs font-mono text-[#201B15]/60 dark:text-white/60 transition-colors">
            <span>💡 Pro tip: Search by tasting notes like "honey", "chocolate", or "citrus"</span>
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-1 rounded-lg bg-[#201B15]/5 dark:bg-white/10 hover:bg-[#201B15]/15 dark:hover:bg-white/20 font-bold text-[#201B15] dark:text-white transition-colors cursor-pointer"
            >
              Close [ESC]
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
