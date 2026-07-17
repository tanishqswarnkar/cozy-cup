import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function MenuSection() {
  const [activeTab, setActiveTab] = useState('Espresso & Drinks')

  const tabs = ['Espresso & Drinks', 'Specialty Cold Brews', 'Artisan Bakery', 'Savory Bites']

  const menuItems = {
    'Espresso & Drinks': [
      { name: 'Double Espresso Cloud', price: '$4.50', desc: 'Rich velvety double shot with light vanilla crema.', tag: 'Popular' },
      { name: 'Oat Milk Honey Latte', price: '$5.75', desc: 'Creamy steamed oat milk infused with wild clover honey and cinnamon.', tag: 'Signature' },
      { name: 'Bergamot Jasmine Macchiato', price: '$5.50', desc: 'Ethiopian espresso layered over delicate citrus blossom notes.', tag: 'New' },
      { name: 'Classic Flat White', price: '$4.75', desc: 'Micro-foamed whole milk poured over ristretto double shot.' },
    ],
    'Specialty Cold Brews': [
      { name: 'Nitro Honey Cold Brew', price: '$6.00', desc: 'Injected with nitrogen for a cascading creamy texture and sweet honey finish.', tag: 'Signature' },
      { name: 'Yuzu Tonic Espresso', price: '$6.50', desc: 'Bright sparkling tonic water, fresh Japanese yuzu, and chilled espresso.', tag: 'Refreshing' },
      { name: 'Vanilla Bean Cold Foam', price: '$5.80', desc: '18-hour cold brew topped with thick Madagascar vanilla sweet cream.' },
      { name: 'Classic Iced Americano', price: '$4.25', desc: 'Crisp, bold espresso poured over purified crystalline ice.' },
    ],
    'Artisan Bakery': [
      { name: 'Cardamom Almond Croissant', price: '$5.25', desc: 'Flaky butter layers baked with fragrant cardamom and frangipane filling.', tag: 'Bestseller' },
      { name: 'Cinnamon Brown Sugar Scone', price: '$4.50', desc: 'Crumbly warm scone topped with maple cinnamon glaze.' },
      { name: 'Valrhona Chocolate Brioche', price: '$4.80', desc: 'Pillow-soft brioche rolled with dark French chocolate.' },
      { name: 'Gluten-Free Blueberry Loaf', price: '$4.75', desc: 'Moist almond flour cake bursting with organic Pacific Northwest blueberries.' },
    ],
    'Savory Bites': [
      { name: 'Avocado & Pesto Panini', price: '$9.50', desc: 'Artisan sourdough, fresh mozzarella, sun-dried tomato and basil pesto.', tag: 'Chef Choice' },
      { name: 'Truffle Egg & Gouda Brioche', price: '$8.75', desc: 'Soft scrambled cage-free eggs, aged Gouda, and subtle black truffle butter.' },
      { name: 'Prosciutto & Fig Tartine', price: '$10.25', desc: 'Toasted country bread spread with creamy ricotta, sweet fig jam, and cured prosciutto.' },
      { name: 'Smoked Salmon Bagel', price: '$11.00', desc: 'Everything bagel with herb cream cheese, capers, pickled red onions, and dill.' },
    ],
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-10 md:px-16 bg-[#F8F5F0] dark:bg-[#181410] border-t border-[#201B15]/10 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-2 transition-colors">
            Freshly Prepared
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            Our Cafe Menu
          </h2>
          <p className="text-sm sm:text-base text-[#201B15]/70 dark:text-white/70 mt-3 transition-colors">
            Every cup and pastry is handcrafted to order using sustainably sourced organic ingredients and direct-trade coffee beans.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10 sm:mb-14">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                activeTab === tab
                  ? 'bg-[#201B15] dark:bg-amber-400 text-amber-300 dark:text-[#201B15] shadow-md scale-105'
                  : 'bg-white/80 dark:bg-white/10 text-[#201B15]/80 dark:text-white/80 hover:bg-white dark:hover:bg-white/20 hover:text-[#201B15] dark:hover:text-white border border-[#201B15]/10 dark:border-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          {menuItems[activeTab].map((item, idx) => (
            <div
              key={item.name}
              className="bg-white/90 dark:bg-[#1E1914] hover:bg-white dark:hover:bg-[#251F19] p-6 sm:p-7 rounded-3xl border border-[#201B15]/10 dark:border-white/10 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-4 mb-2">
                  <div className="flex items-center gap-2.5">
                    <h3 className="font-display font-bold text-lg sm:text-xl text-[#201B15] dark:text-[#FCFAF6] group-hover:text-amber-900 dark:group-hover:text-amber-300 transition-colors">
                      {item.name}
                    </h3>
                    {item.tag && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 font-bold border border-amber-300/60 dark:border-amber-400/30">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <span className="font-mono font-bold text-base sm:text-lg text-[#201B15] dark:text-amber-300 shrink-0">
                    {item.price}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-[#201B15]/70 dark:text-white/70 leading-relaxed transition-colors">
                  {item.desc}
                </p>
              </div>
              <div className="border-t border-[#201B15]/10 dark:border-white/10 mt-4 pt-3 flex justify-end">
                <span className="text-[11px] font-mono text-amber-800 dark:text-amber-400 font-semibold group-hover:translate-x-1 transition-transform">
                  Available in store & online →
                </span>
              </div>
            </div>
          ))}
        </motion.div>

        <div className="mt-12 sm:mt-16 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#201B15] hover:bg-[#342A21] dark:bg-amber-400 dark:hover:bg-amber-300 text-amber-300 dark:text-[#201B15] font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <span>Explore Full Interactive Menu Page</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
