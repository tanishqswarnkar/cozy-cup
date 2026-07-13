import React, { useState } from 'react'
import Nav from './components/Nav.jsx'
import Hero from './components/Hero.jsx'
import ShopGrid from './components/ShopGrid.jsx'
import Visit from './components/Visit.jsx'
import Footer from './components/Footer.jsx'
import AuthPage from './components/AuthPage.jsx'
import CartDrawer from './components/CartDrawer.jsx'

export default function App() {
  const [showAuth, setShowAuth] = useState(true)
  const [user, setUser] = useState(null)
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const existingIdx = prevCart.findIndex((i) => i.origin === item.origin)
      if (existingIdx > -1) {
        const updated = [...prevCart]
        updated[existingIdx] = {
          ...updated[existingIdx],
          quantity: (updated[existingIdx].quantity || 1) + 1,
        }
        return updated
      }
      return [...prevCart, { ...item, quantity: 1 }]
    })
    setIsCartOpen(true) // Open cart drawer smoothly so user sees the added coffee with image
  }

  const handleUpdateQuantity = (idx, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(idx)
      return
    }
    setCart((prevCart) => {
      const updated = [...prevCart]
      updated[idx] = { ...updated[idx], quantity: newQty }
      return updated
    })
  }

  const handleRemoveItem = (idx) => {
    setCart((prevCart) => prevCart.filter((_, index) => index !== idx))
  }

  const handleCheckout = () => {
    setCart([])
    setIsCartOpen(false)
  }

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <div className="font-sans relative min-h-screen bg-[#FCFAF6]">
      <Nav
        onOpenAuth={() => setShowAuth(true)}
        user={user}
        onLogout={() => setUser(null)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={totalCartCount}
      />
      
      <Hero onOpenAuth={() => setShowAuth(true)} />
      
      {/* Shop Grid with 6 high-definition coffee images and Add to Cart button */}
      <ShopGrid onAddToCart={handleAddToCart} />
      
      <Visit />
      <Footer />

      {/* Slide-in Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Coffee-themed Auth Page */}
      {showAuth && (
        <AuthPage
          onAuthSuccess={(userData) => {
            setUser(userData)
            setShowAuth(false)
          }}
          onCancel={() => setShowAuth(false)}
        />
      )}
    </div>
  )
}
