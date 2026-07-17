import React, { useState } from 'react'
import { Element } from 'react-scroll'
import Hero from '../components/Hero.jsx'
import QuickAccess from '../components/QuickAccess.jsx'
import CombosSection from '../components/CombosSection.jsx'
import InteractiveTasteWheel from '../components/InteractiveTasteWheel.jsx'
import GoldenEspressoGame from '../components/GoldenEspressoGame.jsx'
import Footer from '../components/Footer.jsx'

export default function Home({ user, onOpenAuth, onAddToCart }) {
  const [selectedCategory, setSelectedCategory] = useState('Bestseller')

  return (
    <div className="w-full">
      <Element name="hero">
        <Hero
          user={user}
          onOpenAuth={onOpenAuth}
          selectedCategory={selectedCategory}
          onSelectCategory={(category) => setSelectedCategory(category)}
        />
      </Element>
      
      {/* Curated Combos Section right below the full-page video hero */}
      <Element name="quick-access">
        <Element name="shop-grid">
          <CombosSection
            user={user}
            onOpenAuth={onOpenAuth}
            onAddToCart={onAddToCart}
          />
        </Element>
      </Element>

      {/* Dynamic Flavor Radar & Taste Wheel Section */}
      <Element name="taste-wheel">
        <InteractiveTasteWheel onAddToCart={onAddToCart} />
      </Element>

      {/* Catch the Golden Espresso Arcade Game Section */}
      <Element name="golden-game">
        <GoldenEspressoGame onAddToCart={onAddToCart} />
      </Element>

      <Element name="footer">
        <Footer user={user} onOpenAuth={onOpenAuth} />
      </Element>
    </div>
  )
}
