import React from 'react'

export default function CartDrawer({ isOpen, onClose, cart, onUpdateQuantity, onRemoveItem, onCheckout }) {
  if (!isOpen) return null

  // Calculate total price from items strings like "$22 / 12oz"
  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const numStr = item.price ? item.price.replace(/[^0-9.]/g, '') : '20'
      const priceVal = parseFloat(numStr) || 20
      return sum + priceVal * (item.quantity || 1)
    }, 0)
  }

  const total = calculateTotal()
  const freeShippingThreshold = 50
  const progressToFreeShipping = Math.min(100, (total / freeShippingThreshold) * 100)

  return (
    <div className="fixed inset-0 z-50 flex justify-end animate-fadeIn font-sans">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#181410]/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Side Drawer Panel */}
      <div className="relative z-10 w-full max-w-md bg-[#FCFAF6] text-[#201B15] h-full shadow-2xl flex flex-col justify-between overflow-hidden border-l border-[#201B15]/10 animate-slideLeft">
        
        {/* Header */}
        <div className="p-6 border-b border-[#201B15]/10 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <h2 className="font-display italic font-bold text-2xl text-[#201B15]">Your Coffee Cart</h2>
            <span className="bg-[#201B15] text-white text-xs font-mono font-bold px-2.5 py-0.5 rounded-full">
              {cart.reduce((totalQty, i) => totalQty + (i.quantity || 1), 0)}
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#201B15]/60 hover:text-[#201B15] transition-colors rounded-full hover:bg-[#201B15]/5"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Free Shipping Progress */}
        <div className="bg-[#EBE5D8]/80 px-6 py-3 border-b border-[#201B15]/10">
          <div className="flex justify-between text-[12px] font-mono mb-1.5 text-[#201B15]/80">
            {total >= freeShippingThreshold ? (
              <span className="font-bold text-emerald-800 flex items-center gap-1.5">
                <span>🎉 You unlocked FREE Direct Trade Shipping!</span>
              </span>
            ) : (
              <span>Add <b>${(freeShippingThreshold - total).toFixed(2)}</b> more for FREE Shipping</span>
            )}
            <span>${total.toFixed(2)} / ${freeShippingThreshold}</span>
          </div>
          <div className="w-full h-1.5 bg-black/10 rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#201B15] transition-all duration-500 ease-out"
              style={{ width: `${progressToFreeShipping}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 text-[#201B15]/60">
              <div className="w-20 h-20 bg-[#EBE5D8] rounded-full flex items-center justify-center mb-4 text-3xl">
                ☕
              </div>
              <p className="font-display italic text-2xl text-[#201B15] mb-2">Your cup is empty</p>
              <p className="text-sm mb-6 max-w-[240px]">Explore our freshly roasted Yirgacheffe, Huila, and Microlots below.</p>
              <button
                type="button"
                onClick={onClose}
                className="bg-[#201B15] text-white px-6 py-3 rounded-2xl text-sm font-semibold shadow-md hover:bg-[#322A21] transition-all"
              >
                Explore Roasts
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div 
                key={item.origin + idx}
                className="bg-white rounded-2xl p-4 border border-[#201B15]/10 flex gap-4 items-center shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Coffee Item Image */}
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#EBE5D8] shrink-0 relative">
                  {item.image ? (
                    <img src={item.image} alt={item.origin} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-2xl">☕</div>
                  )}
                </div>

                {/* Item Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-display font-bold text-lg text-[#201B15] truncate">{item.origin}</h4>
                  <p className="text-xs text-[#201B15]/65 truncate mb-2">{item.tasteLine}</p>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-[#201B15]">{item.price}</span>
                    
                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 bg-[#201B15]/5 rounded-xl px-2 py-1">
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, (item.quantity || 1) - 1)}
                        className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-xs font-bold hover:bg-[#201B15] hover:text-white transition-colors"
                      >
                        -
                      </button>
                      <span className="font-mono text-xs font-bold w-4 text-center">{item.quantity || 1}</span>
                      <button
                        type="button"
                        onClick={() => onUpdateQuantity(idx, (item.quantity || 1) + 1)}
                        className="w-6 h-6 rounded-lg bg-white shadow-sm flex items-center justify-center text-xs font-bold hover:bg-[#201B15] hover:text-white transition-colors"
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
                  className="p-1.5 text-[#201B15]/40 hover:text-red-600 transition-colors"
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
          <div className="p-6 border-t border-[#201B15]/10 bg-white space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.03)]">
            <div className="space-y-1.5 text-sm font-mono">
              <div className="flex justify-between text-[#201B15]/70">
                <span>Subtotal ({cart.reduce((totalQty, i) => totalQty + (i.quantity || 1), 0)} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#201B15]/70">
                <span>Shipping</span>
                <span>{total >= freeShippingThreshold ? 'FREE' : '$4.99'}</span>
              </div>
              <div className="flex justify-between font-bold text-base pt-2 border-t border-[#201B15]/10 text-[#201B15]">
                <span>Total Due</span>
                <span>${(total + (total >= freeShippingThreshold ? 0 : 4.99)).toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                alert(`Proceeding to checkout with ${cart.length} coffee lots ($${total.toFixed(2)})!`)
                if (onCheckout) onCheckout()
              }}
              className="w-full bg-[#201B15] hover:bg-[#322A21] active:scale-[0.99] text-white rounded-2xl py-4 font-semibold text-sm shadow-xl transition-all flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        )}

      </div>
    </div>
  )
}
