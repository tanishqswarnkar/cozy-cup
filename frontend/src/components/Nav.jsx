import React, { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Link, scroller } from 'react-scroll'

export default function Nav({ onOpenAuth, user, onLogout, onOpenCart, onOpenSearch, cartCount = 0 }) {
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showFeedbackModal, setShowFeedbackModal] = useState(false)
  const [feedbackText, setFeedbackText] = useState('')
  const [feedbackRating, setFeedbackRating] = useState(5)
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false)
  
  const menuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogoClick = () => {
    if (location.pathname !== '/') {
      navigate('/')
    } else {
      scroller.scrollTo('hero', { duration: 600, smooth: 'easeInOutCubic', offset: 0 })
    }
  }

  const handleNavClick = (item) => {
    if (item.label !== 'Home' && !user) {
      if (onOpenAuth) onOpenAuth()
      return
    }
    if (item.label === 'Home') {
      if (location.pathname !== '/') {
        navigate('/')
      } else {
        scroller.scrollTo('hero', { duration: 600, smooth: 'easeInOutCubic', offset: 0 })
      }
    } else if (item.label === 'Menu') {
      navigate('/menu')
    } else if (item.label === 'About') {
      navigate('/about')
    } else if (item.label === 'Gallery') {
      navigate('/gallery')
    } else if (item.label === 'Contact') {
      navigate('/contact')
    } else {
      if (location.pathname !== '/') {
        navigate('/')
        setTimeout(() => {
          scroller.scrollTo(item.target, { duration: 700, smooth: 'easeInOutCubic', offset: -75 })
        }, 150)
      } else {
        scroller.scrollTo(item.target, { duration: 700, smooth: 'easeInOutCubic', offset: -75 })
      }
    }
  }

  // Close user dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { label: 'Home', target: 'hero' },
    { label: 'Menu', target: 'menu' },
    { label: 'About', target: 'about' },
    { label: 'Gallery', target: 'gallery' },
    { label: 'Contact', target: 'contact' },
  ]

  const handleSubmitFeedback = (e) => {
    e.preventDefault()
    setFeedbackSubmitted(true)
    setTimeout(() => {
      setFeedbackSubmitted(false)
      setShowFeedbackModal(false)
      setFeedbackText('')
    }, 1500)
  }

  return (
    <>
      <nav className="flex items-center justify-between px-3.5 sm:px-8 md:px-16 py-3.5 sm:py-5 border-b border-white/10 bg-[#23201D]/95 text-[#FCFAF6] shadow-xl backdrop-blur-md sticky top-0 z-40 transition-all">
        <div 
          onClick={handleLogoClick}
          className="flex items-center gap-2 sm:gap-3 group hover:opacity-95 transition-all shrink-0 cursor-pointer"
        >
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-white/20 shadow-sm shrink-0 group-hover:scale-105 transition-transform bg-[#FCFAF6]">
            <img 
              src="/cozy-cup-logo.png" 
              alt="Cozy Cup Logo" 
              className="w-full h-full object-cover scale-105"
            />
          </div>
          <span className="font-display italic font-bold text-lg sm:text-2xl tracking-tight text-[#FCFAF6] group-hover:text-amber-300 transition-colors">
            Cozy Cup
          </span>
        </div>

        <div className="hidden lg:flex gap-5 xl:gap-8 text-xs xl:text-sm font-medium text-white/90">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="opacity-80 hover:opacity-100 transition-all cursor-pointer hover:text-amber-300 font-semibold select-none text-left tracking-wide"
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Live Search Button */}
          <button
            onClick={onOpenSearch}
            className="bg-white/10 hover:bg-white/20 text-white hover:text-amber-300 rounded-full px-2.5 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-semibold transition-all flex items-center gap-1.5 border border-white/15 cursor-pointer shrink-0 shadow-sm group"
            title="Search Roasts & Treats (⌘K)"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-300 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <span className="hidden sm:inline">Search</span>
            <span className="hidden md:inline-block bg-white/15 text-[10px] font-mono px-1.5 py-0.2 rounded text-white/80">⌘K</span>
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            className="bg-amber-400 text-[#201B15] rounded-full px-3 sm:px-5 py-1.5 sm:py-2.5 text-[11px] sm:text-[13px] font-bold hover:bg-amber-300 active:scale-[0.98] transition-all shadow-md flex items-center gap-1 sm:gap-2 group relative shrink-0 cursor-pointer"
          >
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#201B15] group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            <span>Cart</span>
            <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-xs font-mono font-bold ${
              cartCount > 0 ? 'bg-[#201B15] text-amber-300 animate-pulse' : 'bg-[#201B15]/20 text-[#201B15]'
            }`}>
              {cartCount}
            </span>
          </button>

          {/* Right side User Login block with Dropdown Popover on letter click */}
          {user ? (
            <div className="relative" ref={menuRef}>
              <button
                onClick={() => setShowUserMenu((prev) => !prev)}
                title={`Logged in as ${user.name} — Click for options`}
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/10 hover:bg-white/20 text-amber-300 font-display font-bold text-sm sm:text-base flex items-center justify-center shadow-md border border-white/20 hover:border-amber-400 active:scale-95 transition-all relative shrink-0 cursor-pointer backdrop-blur-sm"
              >
                <span>{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 rounded-full bg-emerald-500 absolute -bottom-0.5 -right-0.5 border border-[#23201D]" />
              </button>

              {/* Floating Dropdown Popover Menu */}
              {showUserMenu && (
                <div className="absolute right-0 top-full mt-3 w-56 sm:w-64 bg-[#181410] text-[#FCFAF6] rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.9)] border border-white/20 p-3 z-50 animate-fadeIn">
                  {/* User Profile Summary */}
                  <div className="pb-3 border-b border-white/10 px-2 pt-1">
                    <p className="font-display font-bold text-sm text-amber-300 truncate">{user.name}</p>
                    <p className="text-[11px] font-mono text-white/60 truncate">{user.email || 'Roastery Member'}</p>
                    <div className="mt-1.5 flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-[9.5px] font-mono w-fit shadow-sm">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                      <span>JWT Secured (30d)</span>
                    </div>
                  </div>

                  {/* Menu Action Sections */}
                  <div className="py-2 space-y-1">
                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        onOpenAuth()
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium text-white/85 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-all cursor-pointer"
                    >
                      <span className="text-sm">👤</span>
                      <span>Account & Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        scroller.scrollTo('visit', {
                          duration: 700,
                          smooth: 'easeInOutCubic',
                          offset: -75,
                        })
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium text-white/85 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-all cursor-pointer"
                    >
                      <span className="text-sm">❓</span>
                      <span>Help & Support</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowUserMenu(false)
                        setShowFeedbackModal(true)
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-medium text-white/85 hover:bg-white/10 hover:text-white flex items-center gap-3 transition-all cursor-pointer"
                    >
                      <span className="text-sm">💬</span>
                      <span>Give Feedback</span>
                    </button>
                  </div>

                  <hr className="my-1 border-white/10" />

                  {/* Logout Option */}
                  <button
                    onClick={() => {
                      setShowUserMenu(false)
                      if (onLogout) onLogout()
                    }}
                    className="w-full text-left px-3 py-2 rounded-xl text-xs sm:text-[13px] font-semibold text-red-400 hover:bg-red-500/15 hover:text-red-300 flex items-center gap-3 transition-all cursor-pointer mt-1"
                  >
                    <span className="text-sm">🚪</span>
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="border border-white/30 hover:border-amber-300 bg-white/10 hover:bg-amber-400 hover:text-[#201B15] transition-all rounded-full px-2.5 sm:px-4.5 py-1.5 sm:py-2 text-[11px] sm:text-[13px] font-medium flex items-center gap-1 sm:gap-2 shadow-sm text-white cursor-pointer backdrop-blur-sm shrink-0"
            >
              <span className="text-xs sm:text-sm">☕</span>
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Hamburger Menu Button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label="Toggle Mobile Menu"
            className="lg:hidden p-2 sm:p-2.5 rounded-full border border-white/20 hover:border-amber-400 bg-white/10 text-amber-300 transition-all cursor-pointer flex items-center justify-center shrink-0 ml-0.5"
          >
            {mobileMenuOpen ? (
              <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-amber-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Slide-Down Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#181410]/98 border-b border-white/15 px-5 py-6 shadow-2xl backdrop-blur-xl sticky top-[60px] sm:top-[70px] z-30 animate-fadeIn">
          <div className="flex flex-col space-y-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false)
                if (onOpenSearch) onOpenSearch()
              }}
              className="w-full text-left px-4 py-3.5 rounded-2xl bg-amber-400 text-[#201B15] font-display font-bold text-base tracking-wide transition-all flex items-center justify-between shadow-md cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <span>Live Search Catalog...</span>
              </div>
              <span className="text-xs bg-[#201B15]/20 px-2 py-0.5 rounded font-mono font-bold">🔍</span>
            </button>

            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  setMobileMenuOpen(false)
                  handleNavClick(item)
                }}
                className="w-full text-left px-4 py-3 rounded-2xl bg-white/5 hover:bg-amber-400 hover:text-[#201B15] text-white/90 font-display font-bold text-base tracking-wide transition-all flex items-center justify-between group cursor-pointer"
              >
                <span>{item.label}</span>
                <span className="text-xs opacity-60 group-hover:opacity-100 font-mono">→</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Interactive Feedback Modal */}
      {showFeedbackModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-[#181410] text-[#FCFAF6] rounded-3xl p-6 sm:p-8 max-w-md w-full border border-white/20 shadow-2xl relative">
            <button
              onClick={() => setShowFeedbackModal(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white p-2 rounded-full hover:bg-white/10 transition-colors cursor-pointer text-xs font-mono"
            >
              ✕ Close
            </button>

            <h3 className="font-display font-bold text-2xl text-amber-300 mb-1">
              Give Feedback
            </h3>
            <p className="text-xs text-white/70 mb-5 leading-relaxed">
              We love crafting the perfect brew experience. Let us know what you think about Cozy Cup!
            </p>

            {feedbackSubmitted ? (
              <div className="py-8 text-center animate-fadeIn">
                <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-500/50 flex items-center justify-center mx-auto mb-3 text-emerald-400 text-2xl">
                  ✓
                </div>
                <h4 className="font-display font-bold text-lg text-white">Thank You!</h4>
                <p className="text-xs text-white/70 mt-1">Your feedback helps us brew better every day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitFeedback} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">
                    Rate Your Experience
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setFeedbackRating(star)}
                        className={`text-2xl transition-transform hover:scale-110 cursor-pointer ${
                          star <= feedbackRating ? 'text-amber-400' : 'text-white/20'
                        }`}
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-white/80 mb-2 uppercase tracking-wider">
                    Your Thoughts
                  </label>
                  <textarea
                    required
                    rows="4"
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    placeholder="Tell us what you love or what we can improve..."
                    className="w-full bg-white/10 border border-white/20 rounded-2xl p-3.5 text-sm text-white placeholder-white/40 focus:outline-none focus:border-amber-400/80 transition-colors resize-none"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowFeedbackModal(false)}
                    className="px-5 py-2.5 rounded-full text-xs font-semibold text-white/70 hover:text-white transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-amber-400 text-[#181410] font-semibold text-xs hover:bg-amber-300 active:scale-95 transition-all shadow-lg cursor-pointer"
                  >
                    Submit Feedback
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
