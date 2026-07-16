import React from 'react'

export default function CoffeeCard({ origin, tasteLine, altitude, process, price, image, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl overflow-hidden border border-[#201B15]/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] transition-all duration-300 flex flex-col group">
      {/* Coffee Image Container with Zoom Effect */}
      <div className="h-48 sm:h-52 md:h-56 relative overflow-hidden bg-[#EBE5D8]">
        <img
          src={image}
          alt={origin}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70" />
        
        {/* Process Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium text-[#201B15] shadow-sm">
          {process}
        </div>

        {/* Price Tag on Image */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white font-display font-bold text-lg sm:text-xl drop-shadow-md">
          {price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between bg-[#FCFAF6]">
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#201B15] mb-1 leading-tight">{origin}</h3>
          <p className="text-xs sm:text-[13.5px] text-[#201B15]/70 mb-4 sm:mb-5 leading-relaxed">{tasteLine}</p>

          <div className="flex justify-between font-mono text-[11px] sm:text-[11.5px] py-2 sm:py-2.5 border-t border-[#201B15]/10 text-[#201B15]/80">
            <span>Altitude</span>
            <span className="font-semibold text-[#201B15]">{altitude}</span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={() => onAddToCart && onAddToCart({ origin, tasteLine, price, image })}
          className="mt-4 sm:mt-5 w-full bg-[#201B15] hover:bg-[#342A21] active:scale-[0.98] text-white py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
        >
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  )
}
