export default function Nav({ onOpenAuth, user, onLogout, onOpenCart, cartCount = 0 }) {
  const links = ['Shop', 'Origins', 'Visit', 'Journal']

  return (
    <nav className="flex items-center justify-between px-6 sm:px-8 md:px-16 py-6 border-b border-[#201B15]/10 bg-[#FCFAF6]/90 backdrop-blur-md sticky top-0 z-40">
      <a href="#" className="flex items-center gap-3 group hover:opacity-90 transition-all">
        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#201B15]/20 shadow-sm shrink-0 group-hover:scale-105 transition-transform">
          <img 
            src="/cozy-cup-logo.png" 
            alt="Cozy Cup Logo" 
            className="w-full h-full object-cover scale-105"
          />
        </div>
        <span className="font-display italic font-bold text-2xl tracking-tight text-[#201B15]">
          Cozy Cup
        </span>
      </a>

      <div className="hidden md:flex gap-9 text-sm font-medium text-[#201B15]">
        {links.map((link) => (
          <a key={link} href="#" className="opacity-75 hover:opacity-100 transition-opacity">
            {link}
          </a>
        ))}
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {user ? (
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#201B15]/10 border border-[#201B15]/20 text-[#201B15] font-semibold text-[13px] hover:bg-[#201B15]/20 transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
              <span>{user.name}</span>
            </button>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="text-xs font-mono text-[#201B15]/50 hover:text-red-600 transition-colors px-2 py-1"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="border border-[#201B15]/30 hover:border-[#201B15] bg-white/60 hover:bg-[#201B15] hover:text-white transition-all rounded-full px-4.5 py-2 text-[13px] font-medium flex items-center gap-2 shadow-sm text-[#201B15]"
          >
            <span className="text-sm">☕</span>
            <span>Sign In</span>
          </button>
        )}

        <button
          onClick={onOpenCart}
          className="bg-[#201B15] text-white rounded-full px-5 py-2.5 text-[13px] font-semibold hover:bg-[#342A21] active:scale-[0.98] transition-all shadow-md flex items-center gap-2 group relative"
        >
          <svg className="w-4 h-4 text-gold group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
          <span>Cart</span>
          <span className={`px-2 py-0.5 rounded-full text-xs font-mono font-bold ${cartCount > 0 ? 'bg-amber-400 text-[#201B15] animate-pulse' : 'bg-white/20 text-white'
            }`}>
            {cartCount}
          </span>
        </button>
      </div>
    </nav>
  )
}
