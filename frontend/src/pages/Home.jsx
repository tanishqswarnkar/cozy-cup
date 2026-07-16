import React, { useState } from 'react'
import { Element } from 'react-scroll'
import Hero from '../components/Hero.jsx'
import QuickAccess from '../components/QuickAccess.jsx'
import CombosSection from '../components/CombosSection.jsx'
import Footer from '../components/Footer.jsx'

export default function Home({ user, onOpenAuth, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Bestseller')

  return (
    <div className="w-full">
      <Element name="hero">
        <Hero user={user} onOpenAuth={onOpenAuth} />
      </Element>
      
      {/* Handcrafted Curations Quick Access Bar & Curated Combos Section */}
      <Element name="quick-access">
        <Element name="shop-grid">
          <QuickAccess
            user={user}
            onOpenAuth={onOpenAuth}
            selectedCategory={selectedCategory}
            onSelectCategory={(category) => {
              setSelectedCategory(category)
            }}
          />
          <CombosSection
            user={user}
            onOpenAuth={onOpenAuth}
            onAddToCart={onAddToCart}
          />
        </Element>
      </Element>

      <Element name="footer">
        <Footer user={user} onOpenAuth={onOpenAuth} />
      </Element>
    </div>
  )
}
