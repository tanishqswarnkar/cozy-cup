import React, { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function InteractiveTasteWheel({ onAddToCart, onOpenCart }) {
  // Palate Sliders (Values 1 to 10)
  const [acidity, setAcidity] = useState(7)
  const [sweetness, setSweetness] = useState(8)
  const [body, setBody] = useState(5)
  const [roast, setRoast] = useState(4)
  const [showToast, setShowToast] = useState(null)

  // Our Specialty Origins with Flavor Coordinates
  const coffeeOrigins = [
    {
      id: 1,
      name: 'Ethiopian Yirgacheffe Grade 1',
      subtitle: 'Heirloom · Washed · 2,100m',
      price: 379,
      acidity: 9,
      sweetness: 8,
      body: 4,
      roast: 2,
      notes: ['Jasmin Flora', 'Bergamot Tea', 'Peach Sweetness'],
      image: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 2,
      name: 'Huila Colombian Microlot',
      subtitle: 'Caturra · Honey Process · 1,850m',
      price: 349,
      acidity: 6,
      sweetness: 9,
      body: 7,
      roast: 5,
      notes: ['Caramelized Sugar', 'Red Apple', 'Roasted Hazelnut'],
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 3,
      name: 'Sumatra Mandheling Reserve',
      subtitle: 'Catimor · Wet-Hulled · 1,500m',
      price: 389,
      acidity: 2,
      sweetness: 5,
      body: 10,
      roast: 9,
      notes: ['Dark Chocolate', 'Smoky Cedar', 'Earthy Spice'],
      image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 4,
      name: 'Guatemala Antigua Volcanic',
      subtitle: 'Bourbon · Washed · 1,700m',
      price: 359,
      acidity: 5,
      sweetness: 7,
      body: 8,
      roast: 6,
      notes: ['Milk Chocolate', 'Orange Zest', 'Toasted Almond'],
      image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 5,
      name: 'Costa Rica Tarrazu Geisha',
      subtitle: 'Geisha · Natural · 2,000m',
      price: 449,
      acidity: 8,
      sweetness: 10,
      body: 5,
      roast: 3,
      notes: ['Wild Berry', 'Passionfruit', 'Honey Nectar'],
      image: 'https://images.unsplash.com/photo-1498804103079-a6351b050096?auto=format&fit=crop&w=600&q=80',
    },
    {
      id: 6,
      name: 'Cozy Cup Midnight Espresso',
      subtitle: 'Specialty Blend · Dark French Roast',
      price: 329,
      acidity: 3,
      sweetness: 6,
      body: 9,
      roast: 8,
      notes: ['Dark Cocoa', 'Molasses', 'Crema Velvet'],
      image: 'https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?auto=format&fit=crop&w=600&q=80',
    },
  ]

  // Compute Euclidean Palate Match Score & Sort
  const rankedMatches = useMemo(() => {
    return coffeeOrigins
      .map((coffee) => {
        const diff =
          Math.pow(coffee.acidity - acidity, 2) +
          Math.pow(coffee.sweetness - sweetness, 2) +
          Math.pow(coffee.body - body, 2) +
          Math.pow(coffee.roast - roast, 2)
        // Max distance in 4D space with range 9 squared is 4*(9^2) = 324
        const maxDiff = 324
        const matchPercentage = Math.max(45, Math.round((1 - Math.sqrt(diff) / Math.sqrt(maxDiff)) * 100))
        return { ...coffee, matchPercentage }
      })
      .sort((a, b) => b.matchPercentage - a.matchPercentage)
  }, [acidity, sweetness, body, roast])

  // Presets
  const applyPreset = (type) => {
    if (type === 'bright') {
      setAcidity(9)
      setSweetness(8)
      setBody(4)
      setRoast(2)
    } else if (type === 'caramel') {
      setAcidity(6)
      setSweetness(9)
      setBody(7)
      setRoast(5)
    } else if (type === 'bold') {
      setAcidity(2)
      setSweetness(5)
      setBody(10)
      setRoast(9)
    }
  }

  // Calculate SVG Radar Polygon points (Radius = 100, center = 140, 140)
  // Top (Acidity: 0 deg -> x=140, y=140 - r*(val/10))
  // Right (Sweetness: 90 deg -> x=140 + r*(val/10), y=140)
  // Bottom (Body: 180 deg -> x=140, y=140 + r*(val/10))
  // Left (Roast: 270 deg -> x=140 - r*(val/10), y=140)
  const getRadarPolygon = () => {
    const r = 90
    const top = [140, 140 - r * (acidity / 10)]
    const right = [140 + r * (sweetness / 10), 140]
    const bottom = [140, 140 + r * (body / 10)]
    const left = [140 - r * (roast / 10), 140]
    return `${top[0]},${top[1]} ${right[0]},${right[1]} ${bottom[0]},${bottom[1]} ${left[0]},${left[1]}`
  }

  const handleAdd = (coffee) => {
    if (onAddToCart) {
      onAddToCart({
        id: coffee.id,
        name: coffee.name,
        price: `₹${coffee.price}`,
        image: coffee.image,
        notes: coffee.notes.join(', '),
        quantity: 1,
      })
    }
    setShowToast(coffee.name)
    setTimeout(() => {
      setShowToast(null)
      if (onOpenCart) onOpenCart()
    }, 1300)
  }

  return (
    <section className="relative py-16 sm:py-20 px-4 sm:px-10 max-w-7xl mx-auto border-t border-b border-[#201B15]/10 dark:border-white/10 my-12">
      {/* Header Badge & Title */}
      <div className="text-center mb-12 space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
          <span>🎯 Interactive Palate Match Engine</span>
        </div>
        <h2 className="font-display italic text-3xl sm:text-5xl font-extrabold tracking-tight text-[#201B15] dark:text-[#FCFAF6]">
          Dynamic Flavor Radar & Taste Wheel
        </h2>
        <p className="text-sm sm:text-base text-[#201B15]/70 dark:text-white/70 max-w-2xl mx-auto font-normal">
          Slide the 4 flavor characteristics below. Our real-time Euclidean taste engine dynamically morphs the radar and surfaces your highest percentage roast match.
        </p>

        {/* Quick Presets Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          <span className="text-xs font-mono text-[#201B15]/60 dark:text-white/60 mr-1">Palate Presets:</span>
          <button
            type="button"
            onClick={() => applyPreset('bright')}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#1E1914] border border-[#201B15]/15 dark:border-white/15 hover:border-amber-500 transition-all text-[#201B15] dark:text-white cursor-pointer shadow-sm"
          >
            🌱 Bright & Floral (Light)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('caramel')}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#1E1914] border border-[#201B15]/15 dark:border-white/15 hover:border-amber-500 transition-all text-[#201B15] dark:text-white cursor-pointer shadow-sm"
          >
            🍯 Rich & Caramel (Medium)
          </button>
          <button
            type="button"
            onClick={() => applyPreset('bold')}
            className="px-3 py-1 rounded-full text-xs font-semibold bg-white dark:bg-[#1E1914] border border-[#201B15]/15 dark:border-white/15 hover:border-amber-500 transition-all text-[#201B15] dark:text-white cursor-pointer shadow-sm"
          >
            🍫 Bold & Smoky (Dark)
          </button>
        </div>
      </div>

      {/* Split Grid: Radar SVG Wheel (Left 6 Cols) vs Sliders & Matches (Right 6 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        
        {/* LEFT COLUMN: Circular SVG Radar Chart (6 Cols) */}
        <div className="lg:col-span-6 bg-white dark:bg-[#1E1914] rounded-3xl p-6 sm:p-8 border border-[#201B15]/10 dark:border-white/10 shadow-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
          
          {/* Subtle Radar Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-blue-500/5 pointer-events-none" />

          {/* SVG Radar Chart */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 flex items-center justify-center">
            <svg viewBox="0 0 280 280" className="w-full h-full overflow-visible">
              {/* Concentric Guide Circles */}
              {[22.5, 45, 67.5, 90].map((r, i) => (
                <circle
                  key={i}
                  cx="140"
                  cy="140"
                  r={r}
                  fill="none"
                  stroke={i === 3 ? 'rgba(245, 158, 11, 0.4)' : 'rgba(150, 150, 150, 0.2)'}
                  strokeWidth="1"
                  strokeDasharray={i === 3 ? 'none' : '3,3'}
                />
              ))}

              {/* Axis Crosshairs */}
              <line x1="140" y1="50" x2="140" y2="230" stroke="rgba(150, 150, 150, 0.25)" strokeWidth="1" />
              <line x1="50" y1="140" x2="230" y2="140" stroke="rgba(150, 150, 150, 0.25)" strokeWidth="1" />

              {/* Axis Labels */}
              <text x="140" y="38" textAnchor="middle" className="text-[11px] font-bold fill-[#201B15] dark:fill-amber-400 font-mono">
                ⚡ ACIDITY ({acidity}/10)
              </text>
              <text x="248" y="144" textAnchor="start" className="text-[11px] font-bold fill-[#201B15] dark:fill-amber-400 font-mono">
                🍯 SWEET ({sweetness}/10)
              </text>
              <text x="140" y="254" textAnchor="middle" className="text-[11px] font-bold fill-[#201B15] dark:fill-amber-400 font-mono">
                💪 BODY ({body}/10)
              </text>
              <text x="32" y="144" textAnchor="end" className="text-[11px] font-bold fill-[#201B15] dark:fill-amber-400 font-mono">
                🔥 ROAST ({roast}/10)
              </text>

              {/* Dynamic Animated Radar Polygon */}
              <motion.polygon
                points={getRadarPolygon()}
                fill="rgba(245, 158, 11, 0.35)"
                stroke="#F59E0B"
                strokeWidth="3"
                initial={false}
                animate={{ points: getRadarPolygon() }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
              />

              {/* Axis Corner Dots */}
              <motion.circle cx="140" cy={140 - 90 * (acidity / 10)} r="5" fill="#F59E0B" />
              <motion.circle cx={140 + 90 * (sweetness / 10)} cy="140" r="5" fill="#F59E0B" />
              <motion.circle cx="140" cy={140 + 90 * (body / 10)} r="5" fill="#F59E0B" />
              <motion.circle cx={140 - 90 * (roast / 10)} cy="140" r="5" fill="#F59E0B" />
            </svg>
          </div>

          {/* Flavor Pill Tags floating below radar */}
          <div className="flex flex-wrap justify-center gap-2 mt-4 z-10">
            {rankedMatches[0]?.notes.map((note, idx) => (
              <span
                key={idx}
                className="bg-amber-500/10 border border-amber-500/30 text-amber-800 dark:text-amber-300 px-2.5 py-1 rounded-lg text-xs font-semibold"
              >
                ✦ {note}
              </span>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Sliders & Top Matched Bags (6 Cols) */}
        <div className="lg:col-span-6 space-y-6">
          
          {/* Sliders Control Panel */}
          <div className="bg-white dark:bg-[#1E1914] rounded-3xl p-6 border border-[#201B15]/10 dark:border-white/10 shadow-xl space-y-4">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70 border-b border-[#201B15]/10 dark:border-white/10 pb-2">
              🎚️ Fine-Tune Your Palate Sliders
            </h3>

            {/* Slider 1: Acidity */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#201B15] dark:text-white flex items-center gap-1.5">
                  <span>⚡</span> Acidity & Brightness
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{acidity}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={acidity}
                onChange={(e) => setAcidity(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#201B15]/50 dark:text-white/50 font-mono">
                <span>Low / Mellow</span>
                <span>Crisp Citrus / Floral</span>
              </div>
            </div>

            {/* Slider 2: Sweetness */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#201B15] dark:text-white flex items-center gap-1.5">
                  <span>🍯</span> Sweetness & Honey
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{sweetness}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={sweetness}
                onChange={(e) => setSweetness(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#201B15]/50 dark:text-white/50 font-mono">
                <span>Earthy / Dry</span>
                <span>Rich Honey / Caramel</span>
              </div>
            </div>

            {/* Slider 3: Body */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#201B15] dark:text-white flex items-center gap-1.5">
                  <span>💪</span> Body & Mouthfeel
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{body}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={body}
                onChange={(e) => setBody(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#201B15]/50 dark:text-white/50 font-mono">
                <span>Tea-Like / Delicate</span>
                <span>Full Velvet / Heavy</span>
              </div>
            </div>

            {/* Slider 4: Roast */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-[#201B15] dark:text-white flex items-center gap-1.5">
                  <span>🔥</span> Roast Profile Intensity
                </span>
                <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{roast}/10</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                step="0.5"
                value={roast}
                onChange={(e) => setRoast(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <div className="flex justify-between text-[10px] text-[#201B15]/50 dark:text-white/50 font-mono">
                <span>Light Golden Blonde</span>
                <span>Dark Smoky French</span>
              </div>
            </div>
          </div>

          {/* Top Recommended Match Cards */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
              <span>✨ Algorithmic Top Recommendations ({rankedMatches.length})</span>
              <span className="text-amber-600 dark:text-amber-400">Real-time update</span>
            </div>

            {/* Render Top 2 Matches */}
            {rankedMatches.slice(0, 2).map((match, i) => (
              <motion.div
                key={match.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`rounded-2xl p-4 border transition-all flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  i === 0
                    ? 'bg-amber-500/10 border-amber-500/40 shadow-lg'
                    : 'bg-white dark:bg-[#1E1914] border-[#201B15]/10 dark:border-white/10'
                }`}
              >
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="w-14 h-14 rounded-xl object-cover border border-black/10 shrink-0 shadow-sm"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#201B15] dark:text-[#FCFAF6]">
                        {match.name}
                      </span>
                      <span className="bg-amber-500 text-black font-extrabold text-[10px] px-2 py-0.5 rounded-full font-mono shadow-sm">
                        {match.matchPercentage}% Match
                      </span>
                    </div>
                    <p className="text-xs text-[#201B15]/60 dark:text-white/60 mb-1">{match.subtitle}</p>
                    <div className="flex flex-wrap gap-1 text-[10px]">
                      {match.notes.map((n, idx) => (
                        <span key={idx} className="bg-black/5 dark:bg-white/10 px-1.5 py-0.5 rounded text-[#201B15]/80 dark:text-white/80 font-mono">
                          {n}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto shrink-0 border-t sm:border-t-0 pt-3 sm:pt-0 border-gray-200 dark:border-gray-800">
                  <span className="font-bold text-base text-[#201B15] dark:text-amber-400 font-mono">
                    ₹{match.price}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleAdd(match)}
                    className="bg-[#201B15] hover:bg-[#322A21] dark:bg-amber-400 dark:hover:bg-amber-300 text-white dark:text-[#201B15] font-bold px-3.5 py-2 rounded-xl text-xs transition-all shadow-md cursor-pointer active:scale-[0.98]"
                  >
                    + Add Matched Bag
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

        </div>

      </div>

      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#201B15] text-white dark:bg-amber-400 dark:text-[#201B15] px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 font-semibold text-sm"
          >
            <span className="text-xl">🎯</span>
            <span>Added matched "{showToast}" to your cart!</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
