import React from 'react'
import OptimizedImage from './OptimizedImage.jsx'

export default function CoffeeCard({ origin, tasteLine, altitude, process, price, image, onAddToCart }) {
  return (
    <div className="bg-white dark:bg-[#1E1914] rounded-2xl sm:rounded-3xl overflow-hidden border border-[#201B15]/10 dark:border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.04)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.4)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col group">
      {/* Coffee Image Container with Zoom Effect */}
      <div className="h-48 sm:h-52 md:h-56 relative overflow-hidden bg-[#EBE5D8] dark:bg-[#15120E]">
        <OptimizedImage
          src={image}
          alt={origin}
          width={600}
          containerClassName="w-full h-full"
          className="group-hover:scale-110 transition-transform duration-500 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-70 pointer-events-none" />
        
        {/* Process Badge */}
        <div className="absolute top-3 sm:top-4 left-3 sm:left-4 bg-white/90 dark:bg-[#181410]/90 backdrop-blur-md px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-mono font-medium text-[#201B15] dark:text-amber-300 shadow-sm border dark:border-white/10">
          {process}
        </div>

        {/* Price Tag on Image */}
        <div className="absolute bottom-3 sm:bottom-4 right-3 sm:right-4 text-white font-display font-bold text-lg sm:text-xl drop-shadow-md">
          {price}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-6 flex flex-col flex-1 justify-between bg-[#FCFAF6] dark:bg-[#181410] transition-colors">
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-[#201B15] dark:text-[#FCFAF6] mb-1 leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-300 transition-colors">{origin}</h3>
          <p className="text-xs sm:text-[13.5px] text-[#201B15]/70 dark:text-white/70 mb-4 sm:mb-5 leading-relaxed">{tasteLine}</p>

          <div className="flex justify-between font-mono text-[11px] sm:text-[11.5px] py-2 sm:py-2.5 border-t border-[#201B15]/10 dark:border-white/10 text-[#201B15]/80 dark:text-white/80">
            <span>Altitude</span>
            <span className="font-semibold text-[#201B15] dark:text-amber-300">{altitude}</span>
          </div>
        </div>

        {/* Add to Cart CTA */}
        <button
          type="button"
          onClick={() => onAddToCart && onAddToCart({ origin, tasteLine, price, image })}
          className="mt-4 sm:mt-5 w-full bg-[#201B15] hover:bg-[#342A21] dark:bg-amber-400 dark:hover:bg-amber-300 active:scale-[0.98] text-white dark:text-[#201B15] py-3 sm:py-3.5 px-4 sm:px-5 rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md cursor-pointer"
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
