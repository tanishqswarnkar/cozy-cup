import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Nav from './components/Nav.jsx'
import AuthPage from './components/AuthPage.jsx'
import CartDrawer from './components/CartDrawer.jsx'
import Preloader from './components/Preloader.jsx'
import SearchModal from './components/SearchModal.jsx'
import Home from './pages/Home.jsx'
import BestsellerPage from './pages/BestsellerPage.jsx'
import DrinksPage from './pages/DrinksPage.jsx'
import FoodPage from './pages/FoodPage.jsx'
import ReadyToEatPage from './pages/ReadyToEatPage.jsx'
import MenuPage from './pages/MenuPage.jsx'
import AboutPage from './pages/AboutPage.jsx'
import GalleryPage from './pages/GalleryPage.jsx'
import ContactPage from './pages/ContactPage.jsx'

export default function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [user, setUser] = useState(() => {
    // Check if user and token exist in local storage for instant initial render
    try {
      const savedUser = localStorage.getItem('cozy_user')
      return savedUser ? JSON.parse(savedUser) : null
    } catch (e) {
      return null
    }
  })
  const [cart, setCart] = useState([])
  const [isCartOpen, setIsCartOpen] = useState(false)

  // Global Keyboard Shortcut (⌘K or Ctrl+K) for Live Search
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setIsSearchOpen((prev) => !prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [])

  // Verify JWT Token against backend (/api/auth/me) when app starts up
  useEffect(() => {
    const token = localStorage.getItem('cozy_jwt_token')
    if (!token) return

    fetch('http://localhost:5001/api/auth/me', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('JWT token expired or invalid')
        return res.json()
      })
      .then((data) => {
        // Token is valid! Update user state with verified profile
        const verifiedUser = { ...data, token }
        setUser(verifiedUser)
        localStorage.setItem('cozy_user', JSON.stringify(verifiedUser))
      })
      .catch((err) => {
        console.warn('JWT verification failed, logging out:', err.message)
        localStorage.removeItem('cozy_jwt_token')
        localStorage.removeItem('cozy_user')
        setUser(null)
      })
  }, [])

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
    <div className="font-sans relative min-h-screen bg-[#FCFAF6] overflow-x-hidden">
      {/* Coffee Beans Themed Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Persistent Top Navigation Bar */}
      <Nav
        onOpenAuth={() => setShowAuth(true)}
        user={user}
        onLogout={() => {
          localStorage.removeItem('cozy_jwt_token')
          localStorage.removeItem('cozy_user')
          setUser(null)
        }}
        onOpenCart={() => {
          if (!user) {
            setShowAuth(true)
            return
          }
          setIsCartOpen(true)
        }}
        onOpenSearch={() => setIsSearchOpen(true)}
        cartCount={totalCartCount}
      />
      
      {/* Main Pages Router */}
      <main>
        <Routes>
          <Route
            path="/"
            element={<Home user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/bestseller"
            element={<BestsellerPage user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/drinks"
            element={<DrinksPage user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/food"
            element={<FoodPage user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/ready-to-eat"
            element={<ReadyToEatPage user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/menu"
            element={<MenuPage user={user} onOpenAuth={() => setShowAuth(true)} onAddToCart={handleAddToCart} />}
          />
          <Route
            path="/about"
            element={<AboutPage user={user} onOpenAuth={() => setShowAuth(true)} />}
          />
          <Route
            path="/gallery"
            element={<GalleryPage user={user} onOpenAuth={() => setShowAuth(true)} />}
          />
          <Route
            path="/contact"
            element={<ContactPage user={user} onOpenAuth={() => setShowAuth(true)} />}
          />
        </Routes>
      </main>

      {/* Slide-in Interactive Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onCheckout={handleCheckout}
      />

      {/* Live Search Modal Overlay */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onAddToCart={handleAddToCart}
      />

      {/* Coffee-themed Auth Page */}
      {showAuth && !isLoading && (
        <AuthPage
          onAuthSuccess={(userData) => {
            if (userData.token) {
              localStorage.setItem('cozy_jwt_token', userData.token)
            }
            localStorage.setItem('cozy_user', JSON.stringify(userData))
            setUser(userData)
            setShowAuth(false)
          }}
          onCancel={() => setShowAuth(false)}
        />
      )}
    </div>
  )
}
