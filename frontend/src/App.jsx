import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useTheme } from './context/ThemeContext.jsx'
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
import BrewStudioPage from './pages/BrewStudioPage.jsx'
import CoffeeCursorDrops from './components/CoffeeCursorDrops.jsx'
import PaymentSuccessModal from './components/PaymentSuccessModal.jsx'
import DemoRazorpayModal from './components/DemoRazorpayModal.jsx'
import GoldenEspressoGame from './components/GoldenEspressoGame.jsx'

export default function App() {
  const { isDark, toggleTheme } = useTheme()
  const [isLoading, setIsLoading] = useState(true)
  const [showAuth, setShowAuth] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [isGoldenGameOpen, setIsGoldenGameOpen] = useState(false)
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)
  const [isDemoGatewayOpen, setIsDemoGatewayOpen] = useState(false)
  const [demoOrderData, setDemoOrderData] = useState(null)
  const [successOrderDetails, setSuccessOrderDetails] = useState(null)
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

  // Verify JWT Token, OAuth Callback, or HTTP-only Cookie session when app starts up
  useEffect(() => {
    // 1. Check if returning from Google OAuth redirect (`?oauth_token=...&user=...`)
    const urlParams = new URLSearchParams(window.location.search);
    const oauthToken = urlParams.get('oauth_token');
    const oauthUserStr = urlParams.get('user');

    if (oauthToken && oauthUserStr) {
      try {
        const parsedUser = JSON.parse(decodeURIComponent(oauthUserStr));
        setUser(parsedUser);
        localStorage.setItem('cozy_jwt_token', oauthToken);
        localStorage.setItem('cozy_user', JSON.stringify(parsedUser));
        // Clean URL bar cleanly without refreshing
        window.history.replaceState({}, document.title, window.location.pathname);
        return;
      } catch (err) {
        console.error('Failed to parse OAuth callback data:', err);
      }
    }

    // 2. Otherwise verify existing JWT Token or Cookie
    const token = localStorage.getItem('cozy_jwt_token');

    fetch('http://localhost:5001/api/auth/me', {
      method: 'GET',
      credentials: 'include',
      headers: {
        ...(token ? { 'Authorization': `Bearer ${token}` } : {}),
        'Content-Type': 'application/json'
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Session expired or invalid')
        return res.json()
      })
      .then((data) => {
        // Token/Cookie is valid! Update user state with verified profile
        const verifiedUser = { ...data, token: token || data.token }
        setUser(verifiedUser)
        if (verifiedUser.token) {
          localStorage.setItem('cozy_jwt_token', verifiedUser.token)
        }
        localStorage.setItem('cozy_user', JSON.stringify(verifiedUser))
      })
      .catch((err) => {
        // If local storage had token but failed, clear it
        if (token) {
          console.warn('Authentication check failed, clearing local session:', err.message)
          localStorage.removeItem('cozy_jwt_token')
          localStorage.removeItem('cozy_user')
          setUser(null)
        }
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

  const handleCheckout = async () => {
    if (cart.length === 0) return
    setIsProcessingPayment(true)

    // Calculate total including shipping
    const subtotal = cart.reduce((sum, item) => {
      const numStr = item.price ? item.price.replace(/[^0-9.]/g, '') : '350'
      return sum + (parseFloat(numStr) || 350) * (item.quantity || 1)
    }, 0)
    const totalAmount = subtotal + (subtotal >= 1500 ? 0 : 99)

    try {
      // Step 1: Create Order via Backend
      const res = await fetch('http://localhost:5001/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: totalAmount,
          currency: 'INR',
          items: cart,
        }),
      })
      const data = await res.json()

      if (!data.success || !data.order) {
        throw new Error(data.message || 'Could not initialize payment order.')
      }

      // Step 2: Open Razorpay Checkout Modal
      const options = {
        key: data.key_id || 'rzp_test_CozyCupDemoKey123',
        amount: data.order.amount,
        currency: data.order.currency || 'INR',
        name: 'Cozy Cup Specialty Coffee',
        description: `Handcrafted Roasts (${cart.length} items)`,
        image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=200&q=80',
        order_id: !data.isDemo ? data.order.id : undefined,
        handler: async function (response) {
          try {
            // Step 3: Verify signature on Backend
            const verifyRes = await fetch('http://localhost:5001/api/payments/verify-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                razorpay_order_id: response.razorpay_order_id || data.order.id,
                razorpay_payment_id: response.razorpay_payment_id || `pay_${Date.now().toString(36)}`,
                razorpay_signature: response.razorpay_signature || 'demo_signature',
                amount: totalAmount,
                items: cart,
              }),
            })
            const verifyData = await verifyRes.json()

            if (verifyData.success) {
              setSuccessOrderDetails({
                orderId: response.razorpay_order_id || data.order.id,
                paymentId: response.razorpay_payment_id || `pay_${Date.now().toString(36)}`,
                amount: totalAmount,
              })
              setCart([])
              setIsCartOpen(false)
              setIsSuccessModalOpen(true)
            } else {
              alert('Payment verification failed: ' + verifyData.message)
            }
          } catch (err) {
            console.error('Verification err:', err)
            setSuccessOrderDetails({
              orderId: data.order.id,
              paymentId: `pay_demo_${Date.now().toString(36)}`,
              amount: totalAmount,
            })
            setCart([])
            setIsCartOpen(false)
            setIsSuccessModalOpen(true)
          }
        },
        prefill: {
          name: user?.name || 'Coffee Lover',
          email: user?.email || 'hello@cozycup.coffee',
          contact: user?.phone || '9876543210',
        },
        notes: {
          store: 'Cozy Cup',
        },
        theme: {
          color: isDark ? '#F59E0B' : '#201B15',
        },
      }

      const isDemoKey = data.isDemo || !data.key_id || data.key_id.includes('DemoKey') || data.key_id.includes('YourTestKey')

      if (isDemoKey) {
        // Launch Authentic Simulated Razorpay Test Mode Popup
        setDemoOrderData({
          options,
          orderId: data.order.id,
          amount: totalAmount,
        })
        setIsDemoGatewayOpen(true)
      } else if (window.Razorpay) {
        // Launch Real Live/Test Razorpay Gateway
        const rzp = new window.Razorpay(options)
        rzp.on('payment.failed', function (response) {
          console.log('Razorpay live notice, opening simulated test gateway:', response.error)
          setDemoOrderData({ options, orderId: data.order.id, amount: totalAmount })
          setIsDemoGatewayOpen(true)
        })
        rzp.open()
      } else {
        setDemoOrderData({ options, orderId: data.order.id, amount: totalAmount })
        setIsDemoGatewayOpen(true)
      }
    } catch (error) {
      console.error('Payment Error:', error)
      alert('Could not launch Razorpay: ' + error.message)
    } finally {
      setIsProcessingPayment(false)
    }
  }

  const totalCartCount = cart.reduce((sum, item) => sum + (item.quantity || 1), 0)

  return (
    <div className="font-sans relative min-h-screen bg-[#FCFAF6] dark:bg-[#181410] text-[#201B15] dark:text-[#FCFAF6] overflow-x-hidden transition-colors duration-300">
      {/* Advanced Pointer Coffee Drops Effect */}
      <CoffeeCursorDrops />

      {/* Coffee Beans Themed Preloader */}
      <AnimatePresence>
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {/* Persistent Top Navigation Bar */}
      <Nav
        onOpenAuth={() => setShowAuth(true)}
        user={user}
        onLogout={() => {
          fetch('http://localhost:5001/api/auth/logout', { method: 'POST', credentials: 'include' }).catch(() => {})
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
          <Route
            path="/brew-studio"
            element={
              <BrewStudioPage
                user={user}
                onOpenAuth={() => setShowAuth(true)}
                onAddToCart={handleAddToCart}
                onOpenCart={() => setIsCartOpen(true)}
              />
            }
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
        isProcessing={isProcessingPayment}
      />

      {/* Simulated Razorpay Test Mode Gateway Modal */}
      <DemoRazorpayModal
        isOpen={isDemoGatewayOpen}
        onClose={() => setIsDemoGatewayOpen(false)}
        amount={demoOrderData?.amount || 0}
        onConfirmPayment={() => {
          setIsDemoGatewayOpen(false)
          if (demoOrderData?.options?.handler) {
            demoOrderData.options.handler({
              razorpay_payment_id: `pay_test_${Date.now().toString(36)}`,
              razorpay_order_id: demoOrderData.orderId,
              razorpay_signature: 'demo_signature',
            })
          }
        }}
      />

      {/* Razorpay Payment Success Celebration Modal */}
      <PaymentSuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
        orderDetails={successOrderDetails}
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

      {/* Floating Game Arcade Modal Overlay */}
      <AnimatePresence>
        {isGoldenGameOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto font-sans">
            {/* Clickable Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsGoldenGameOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative z-10 w-full max-w-4xl my-auto"
            >
              <button
                type="button"
                onClick={() => setIsGoldenGameOpen(false)}
                className="absolute -top-3 sm:-top-4 right-2 sm:right-4 z-50 bg-black text-amber-400 hover:text-white border border-amber-500/80 rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold shadow-2xl cursor-pointer hover:scale-110 transition-all"
                title="Close Arcade Game"
              >
                ✕
              </button>
              <GoldenEspressoGame
                isModal={true}
                onAddToCart={(item) => {
                  handleAddToCart(item)
                  setIsGoldenGameOpen(false)
                }}
                onOpenCart={() => setIsCartOpen(true)}
              />
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
