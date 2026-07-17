import React from 'react'

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout, isProcessing }) {
  if (!isOpen) return null

  // Calculate total price from items strings like "₹650 / 340g" or "₹280 / cup"
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const numStr = item.price ? item.price.replace(/[^0-9.]/g, '') : '350'
      const priceVal = parseFloat(numStr) || 350
      return sum + priceVal * (item.quantity || 1)
    }, 0)
  }

  const total = calculateTotal()
  const freeShippingThreshold = 1500
  const progressToFreeShipping = Math.min(100, (total / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#181410]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Side Drawer Panel */}
      <div className="relative z-10 w-full max-w-[100vw] sm:max-w-md bg-[#FCFAF6] dark:bg-[#181410] text-[#201B15] dark:text-[#FCFAF6] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#201B15]/10 dark:border-white/10 animate-slideLeft transition-colors">
        
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-[#201B15]/10 dark:border-white/10 flex items-center justify-between bg-white dark:bg-[#1E1914] transition-colors">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display italic font-bold text-2xl text-[#201B15] dark:text-[#FCFAF6]">Your Coffee Cart</h2>
            <span className="bg-[#201B15] dark:bg-amber-400 text-white dark:text-[#201B15] text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
              {cart.reduce((totalQty, i) => totalQty + (i.quantity || 1), 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#201B15]/60 dark:text-white/60 hover:text-[#201B15] dark:hover:text-white transition-colors rounded-full hover:bg-[#201B15]/5 dark:hover:bg-white/10 cursor-pointer"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#EBE5D8]/80 dark:bg-[#15120E] px-6 py-3 border-b border-[#201B15]/10 dark:border-white/10 transition-colors">
          <div className="flex justify-between text-[12px] font-mono mb-1.5 text-[#201B15]/80 dark:text-white/80">
            {total >= freeShippingThreshold ? (
              <span className="font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5">
                <span>🎉 You unlocked FREE Express Shipping in India!</span>
              </span>
            ) : (
              <span>Add <b>₹{(freeShippingThreshold - total).toLocaleString('en-IN')}</b> more for FREE Shipping</span>
            )}
            <span>₹{total.toLocaleString('en-IN')} / ₹{freeShippingThreshold.toLocaleString('en-IN')}</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#201B15] dark:bg-amber-400 transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#201B15]/60 dark:text-white/60">
              <div className="w-20 h-20 bg-[#EBE5D8] dark:bg-[#1E1914] rounded-full flex items-center justify-center mb-4 text-3xl">
                ☕
              </div>
              <p className="font-display italic text-2xl text-[#201B15] dark:text-[#FCFAF6] mb-2">Your cup is empty</p>
              <p className="text-sm mb-6 max-w-[240px]">Explore our freshly roasted Yirgacheffe, Huila, and Microlots below.</p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#201B15] dark:bg-amber-400 text-white dark:text-[#201B15] px-6 py-3 rounded-2xl text-sm font-semibold shadow-md hover:bg-[#322A21] dark:hover:bg-amber-300 transition-all cursor-pointer"
              >
                Explore Roasts
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={item.origin + idx}
                className="bg-white dark:bg-[#1E1914] rounded-2xl p-4 border border-[#201B15]/10 dark:border-white/10 flex gap-4 items-center shadow-sm hover:shadow-md transition-all"
              >
                {/* Coffee Item Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EBE5D8] dark:bg-[#15120E] shrink-0 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.origin} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">☕</div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-lg text-[#201B15] dark:text-[#FCFAF6] truncate">{item.origin}</h4>
                  <p className="text-xs text-[#201B15]/65 dark:text-white/65 truncate mb-2">{item.tasteLine}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#201B15] dark:text-amber-300">{item.price}</span>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-[#201B15]/5 dark:bg-white/10 rounded-xl px-2 py-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, (item.quantity || 1) - 1)}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-[#181410] shadow-sm flex items-center justify-center text-xs font-bold hover:bg-[#201B15] dark:hover:bg-amber-400 hover:text-white dark:hover:text-[#201B15] transition-colors cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, (item.quantity || 1) + 1)}
                        className="w-6 h-6 rounded-lg bg-white dark:bg-[#181410] shadow-sm flex items-center justify-center text-xs font-bold hover:bg-[#201B15] dark:hover:bg-amber-400 hover:text-white dark:hover:text-[#201B15] transition-colors cursor-pointer"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                {/* Remove button */}
                <button
                  type="button"
                  onClick={() => onRemoveItem(idx)}
                  className="p-1.5 text-[#201B15]/40 dark:text-white/40 hover:text-red-600 dark:hover:text-red-400 transition-colors cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer Checkout CTA */}
        {cart.length > 0 && (
          <div className="p-6 border-t border-[#201B15]/10 dark:border-white/10 bg-white dark:bg-[#1E1914] space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_-10px_30px_rgba(0,0,0,0.4)] transition-colors">
            <div className="space-y-1.5 text-sm font-mono">
              <div className="flex justify-between text-[#201B15]/70 dark:text-white/70">
                <span>Subtotal ({cart.reduce((totalQty, i) => totalQty + (i.quantity || 1), 0)} items)</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-[#201B15]/70 dark:text-white/70">
                <span>Shipping</span>
                <span>{total >= freeShippingThreshold ? 'FREE' : '₹99'}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-[#201B15]/10 dark:border-white/10 text-[#201B15] dark:text-[#FCFAF6]">
                <span>Total Due</span>
                <span>₹{(total + (total >= freeShippingThreshold ? 0 : 99)).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={isProcessing}
              onClick={() => {
                if (onCheckout) onCheckout()
              }}
              className="w-full bg-[#201B15] hover:bg-[#322A21] dark:bg-amber-400 dark:hover:bg-amber-300 disabled:opacity-75 active:scale-[0.99] text-white dark:text-[#201B15] rounded-2xl py-4 font-semibold text-sm shadow-xl transition-all flex items-center justify-center gap-2.5 cursor-pointer"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>Connecting Razorpay...</span>
                </>
              ) : (
                <>
                  <span className="text-base">⚡</span>
                  <span>Pay with Razorpay · ₹{(total + (total >= freeShippingThreshold ? 0 : 99)).toLocaleString('en-IN')}</span>
                </>
              )}
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
