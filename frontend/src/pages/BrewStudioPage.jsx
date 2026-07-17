import React, { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import Nav from '../components/Nav.jsx'
import Footer from '../components/Footer.jsx'
import InteractiveTasteWheel from '../components/InteractiveTasteWheel.jsx'

export default function BrewStudioPage({ user, onOpenAuth, onAddToCart, onOpenCart }) {
  const navigate = useNavigate()

  // Customization States
  const [drinkName, setDrinkName] = useState("Tanishq's Signature Velvet Brew")
  const [roastDegree, setRoastDegree] = useState('medium') // 'light', 'medium', 'dark'
  const [milkType, setMilkType] = useState('oat') // 'whole', 'oat', 'macadamia', 'nitro'
  const [cupVessel, setCupVessel] = useState('ceramic') // 'ceramic', 'glass', 'flask'
  const [syrups, setSyrups] = useState(['vanilla']) // array of syrup ids

  // Latte Art States
  const [artMode, setArtMode] = useState('preset') // 'preset', 'custom'
  const [presetArt, setPresetArt] = useState('rosetta') // 'heart', 'rosetta', 'tulip', 'swan'
  const [brushColor, setBrushColor] = useState('#FFFFFF') // '#FFFFFF' milk foam vs '#3E2214' crema
  const [brushSize, setBrushSize] = useState(6)
  const [isDrawing, setIsDrawing] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const canvasRef = useRef(null)
  const ctxRef = useRef(null)

  // Initialize Latte Art Canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctxRef.current = ctx

    // If preset mode changed, draw preset crema backdrop
    drawCremaBackdrop()
  }, [roastDegree, artMode, presetArt])

  const getRoastColors = () => {
    switch (roastDegree) {
      case 'light':
        return { liquid: '#A66850', crema: '#C88D6D', border: '#7C4A21', name: 'Blonde Light Roast (2,100m)' }
      case 'dark':
        return { liquid: '#1A0F0D', crema: '#3E2214', border: '#120A08', name: 'Dark French Roast (1,400m)' }
      default:
        return { liquid: '#4A2C20', crema: '#88583B', border: '#2E1A12', name: 'Medium Auburn Roast (1,800m)' }
    }
  }

  const roastColors = getRoastColors()

  const drawCremaBackdrop = () => {
    const canvas = canvasRef.current
    if (!canvas || !ctxRef.current) return
    const ctx = ctxRef.current
    const w = canvas.width
    const h = canvas.height

    // Clear and fill base crema
    ctx.clearRect(0, 0, w, h)
    ctx.fillStyle = roastColors.crema
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    // Add crema swirl gradient
    const grad = ctx.createRadialGradient(w / 2, h / 2, 10, w / 2, h / 2, w / 2)
    grad.addColorStop(0, '#FFFFFF33')
    grad.addColorStop(0.6, roastColors.crema)
    grad.addColorStop(1, roastColors.border)
    ctx.fillStyle = grad
    ctx.beginPath()
    ctx.arc(w / 2, h / 2, w / 2 - 2, 0, Math.PI * 2)
    ctx.fill()

    if (artMode === 'preset') {
      // Draw high-fidelity preset milk foam art
      ctx.fillStyle = '#FFFDF9'
      ctx.strokeStyle = '#FFFDF9'
      ctx.lineWidth = 4

      if (presetArt === 'heart') {
        ctx.beginPath()
        ctx.moveTo(w / 2, h / 2 + 35)
        ctx.bezierCurveTo(w / 2 - 50, h / 2 - 20, w / 2 - 40, h / 2 - 60, w / 2, h / 2 - 30)
        ctx.bezierCurveTo(w / 2 + 40, h / 2 - 60, w / 2 + 50, h / 2 - 20, w / 2, h / 2 + 35)
        ctx.fill()
      } else if (presetArt === 'rosetta') {
        // Draw rosetta fern leaves
        for (let i = -3; i <= 3; i++) {
          ctx.beginPath()
          ctx.ellipse(w / 2 + i * 4, h / 2 + i * 12, 30 - Math.abs(i) * 5, 8, i * 0.15, 0, Math.PI * 2)
          ctx.fill()
        }
        ctx.beginPath()
        ctx.moveTo(w / 2, h / 2 - 50)
        ctx.lineTo(w / 2, h / 2 + 50)
        ctx.lineWidth = 5
        ctx.stroke()
      } else if (presetArt === 'tulip') {
        for (let i = 0; i < 4; i++) {
          ctx.beginPath()
          ctx.arc(w / 2, h / 2 + 25 - i * 18, 26 - i * 5, 0, Math.PI, true)
          ctx.fill()
        }
      } else if (presetArt === 'swan') {
        ctx.beginPath()
        ctx.arc(w / 2 - 10, h / 2 + 10, 28, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.arc(w / 2 + 25, h / 2 - 25, 12, 0, Math.PI * 2)
        ctx.fill()
        ctx.beginPath()
        ctx.moveTo(w / 2 - 10, h / 2 + 10)
        ctx.quadraticCurveTo(w / 2 + 30, h / 2, w / 2 + 25, h / 2 - 25)
        ctx.lineWidth = 6
        ctx.stroke()
      }
    }
  }

  const startDrawing = (e) => {
    if (artMode !== 'custom') setArtMode('custom')
    setIsDrawing(true)
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctxRef.current.beginPath()
    ctxRef.current.moveTo(x, y)
  }

  const draw = (e) => {
    if (!isDrawing) return
    const rect = canvasRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ctxRef.current.strokeStyle = brushColor
    ctxRef.current.lineWidth = brushSize
    ctxRef.current.lineTo(x, y)
    ctxRef.current.stroke()
  }

  const stopDrawing = () => {
    setIsDrawing(false)
  }

  const handleClearCanvas = () => {
    setArtMode('custom')
    drawCremaBackdrop()
  }

  // Calculate Price
  const milkPrices = { whole: 0, oat: 40, macadamia: 60, nitro: 50 }
  const syrupPrices = { vanilla: 30, caramel: 30, hazelnut: 30, cinnamon: 20 }
  const basePrice = 280
  const milkPrice = milkPrices[milkType] || 0
  const syrupsTotal = syrups.reduce((sum, s) => sum + (syrupPrices[s] || 0), 0)
  const totalPrice = basePrice + milkPrice + syrupsTotal

  const toggleSyrup = (id) => {
    if (syrups.includes(id)) {
      setSyrups(syrups.filter((s) => s !== id))
    } else {
      setSyrups([...syrups, id])
    }
  }

  const handleAddToCart = () => {
    // Capture drawn crema image as data URL
    const artDataUrl = canvasRef.current ? canvasRef.current.toDataURL() : null

    const milkLabels = {
      whole: 'Whole Farm Milk',
      oat: 'Silky Oat Milk (+₹40)',
      macadamia: 'Macadamia Nut Milk (+₹60)',
      nitro: 'Nitro Micro-Foam (+₹50)',
    }

    const customItem = {
      origin: drinkName || 'Signature Specialty Brew',
      price: `₹${totalPrice}`,
      roast: roastColors.name,
      notes: `Milk: ${milkLabels[milkType]} | Syrups: ${syrups.length > 0 ? syrups.join(', ') : 'Pure Espresso'} | Vessel: ${cupVessel}`,
      image: artDataUrl || 'https://images.unsplash.com/photo-1541167760496-1628856ab772?auto=format&fit=crop&w=600&q=80',
      quantity: 1,
      isCustomBrew: true,
    }

    if (onAddToCart) onAddToCart(customItem)
    setShowNotification(true)
    setTimeout(() => {
      setShowNotification(false)
      if (onOpenCart) onOpenCart()
    }, 1400)
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] dark:bg-[#181410] text-[#201B15] dark:text-[#FCFAF6] font-sans flex flex-col justify-between transition-colors">
      <Nav onOpenAuth={onOpenAuth} user={user} onOpenCart={onOpenCart} />

      <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-16 flex-1 w-full">
        {/* Header Title */}
        <div className="text-center mb-6 sm:mb-8 space-y-2 sm:space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-400 font-mono text-[11px] font-bold uppercase tracking-wider">
            <span>⚡ Interactive 3D Brew Lab</span>
          </div>
          <h1 className="font-display italic text-3xl sm:text-5xl font-extrabold tracking-tight">
            Design Your Signature Cup
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/70 dark:text-white/70 max-w-2xl mx-auto font-normal">
            Adjust roast profiles, select artisan vessels, and etch your custom latte art right into the crema before adding to cart.
          </p>
        </div>

        {/* Main Grid: Cup Viewport (Left) vs Configurator (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          
          {/* LEFT COLUMN: 3D Cup Viewport & Latte Art Canvas (7 Cols) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1E1914] rounded-3xl p-6 sm:p-10 border border-[#201B15]/10 dark:border-white/10 shadow-xl relative overflow-hidden flex flex-col items-center">
            
            {/* Background Ambient Glow */}
            <div
              className="absolute inset-0 opacity-20 blur-3xl pointer-events-none transition-colors duration-700"
              style={{ background: `radial-gradient(circle at center, ${roastColors.liquid}, transparent)` }}
            />

            {/* Order Ticket Tag Badge */}
            <motion.div
              key={drinkName}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full max-w-md bg-[#F4EFE6] dark:bg-[#15120E] rounded-2xl p-4 border border-[#201B15]/10 dark:border-white/10 mb-8 flex items-center justify-between text-xs font-mono shadow-sm"
            >
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500 animate-pulse" />
                <div>
                  <p className="font-bold text-sm text-[#201B15] dark:text-amber-400 font-display italic">
                    {drinkName || 'Custom Specialty Cup'}
                  </p>
                  <p className="text-[#201B15]/60 dark:text-white/60">Vessel: {cupVessel.toUpperCase()} · Roast: {roastDegree.toUpperCase()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[#201B15]/60 dark:text-white/60">Total Due</p>
                <p className="font-bold text-base text-[#201B15] dark:text-amber-400">₹{totalPrice}</p>
              </div>
            </motion.div>

            {/* 3D Visual Mug Stage */}
            <div className="relative my-6 flex flex-col items-center justify-center">
              {/* Rising Steam Effect */}
              <div className="absolute -top-12 inset-x-0 flex justify-center gap-4 pointer-events-none opacity-60">
                <div className="w-2 h-14 bg-white/40 rounded-full blur-sm animate-pulse transform -rotate-6" />
                <div className="w-3 h-16 bg-white/30 rounded-full blur-md animate-bounce transform rotate-3" />
                <div className="w-1.5 h-12 bg-white/50 rounded-full blur-sm animate-pulse transform -rotate-12" />
              </div>

              {/* Mug Outer Body Vessel Container */}
              <div
                className={`relative p-5 rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.6)] transition-all duration-700 ${
                  cupVessel === 'ceramic'
                    ? 'bg-gradient-to-b from-[#EAE3D2] to-[#C8BFA8] border-8 border-[#D8CFBA]'
                    : cupVessel === 'glass'
                    ? 'bg-white/20 backdrop-blur-md border-4 border-white/40 shadow-[inset_0_0_20px_rgba(255,255,255,0.3)]'
                    : 'bg-gradient-to-b from-[#3E3E3E] to-[#1F1F1F] border-8 border-[#555555]'
                }`}
              >
                {/* Mug Handle */}
                <div
                  className={`absolute -right-12 top-1/2 -translate-y-1/2 w-14 h-28 rounded-r-3xl border-8 pointer-events-none transition-colors duration-700 ${
                    cupVessel === 'ceramic'
                      ? 'border-[#C8BFA8]'
                      : cupVessel === 'glass'
                      ? 'border-white/40'
                      : 'border-[#555555]'
                  }`}
                />

                {/* Crema & Latte Art Interactive Canvas Stage */}
                <div className="relative w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden shadow-inner border-4 border-[#2E1A12]">
                  <canvas
                    ref={canvasRef}
                    width={288}
                    height={288}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="w-full h-full cursor-crosshair rounded-full touch-none"
                  />
                </div>
              </div>

              {/* Mug Saucer Stage Base */}
              <div
                className={`w-80 sm:w-96 h-8 rounded-full -mt-4 shadow-2xl transition-colors duration-700 ${
                  cupVessel === 'ceramic'
                    ? 'bg-gradient-to-b from-[#D8CFBA] to-[#B3A890]'
                    : cupVessel === 'glass'
                    ? 'bg-white/15 backdrop-blur-sm border border-white/20'
                    : 'bg-[#222222] border-t border-[#444444]'
                }`}
              />
            </div>

            {/* Latte Art Controls Bar */}
            <div className="w-full max-w-lg mt-8 pt-6 border-t border-[#201B15]/10 dark:border-white/10 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs font-semibold">
                <span className="text-[#201B15]/70 dark:text-white/70">Foam Art Presets:</span>
                <div className="flex flex-wrap gap-2">
                  {['rosetta', 'heart', 'tulip', 'swan'].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      onClick={() => {
                        setArtMode('preset')
                        setPresetArt(preset)
                      }}
                      className={`px-3 py-1.5 rounded-xl border transition-all capitalize cursor-pointer ${
                        artMode === 'preset' && presetArt === preset
                          ? 'bg-[#201B15] dark:bg-amber-400 text-white dark:text-[#201B15] font-bold border-transparent shadow-md'
                          : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                      }`}
                    >
                      {preset === 'heart' ? '♥️ Heart' : preset === 'rosetta' ? '🌿 Rosetta' : preset === 'tulip' ? '🌷 Tulip' : '🦢 Swan'}
                    </button>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      setArtMode('custom')
                      drawCremaBackdrop()
                    }}
                    className={`px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                      artMode === 'custom'
                        ? 'bg-amber-500 text-white font-bold border-transparent shadow-md'
                        : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    ✏️ Custom Canvas Mode
                  </button>
                </div>
              </div>

              {/* Custom Drawing Tools when Custom Mode active */}
              {artMode === 'custom' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="bg-[#FCFAF6] dark:bg-[#15120E] p-3.5 rounded-2xl border border-[#201B15]/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#201B15]/70 dark:text-white/70">Foam Color:</span>
                    <button
                      type="button"
                      onClick={() => setBrushColor('#FFFFFF')}
                      className={`w-6 h-6 rounded-full bg-white border-2 transition-transform cursor-pointer ${
                        brushColor === '#FFFFFF' ? 'scale-125 border-amber-500 shadow-md' : 'border-gray-300'
                      }`}
                      title="Milk Foam White"
                    />
                    <button
                      type="button"
                      onClick={() => setBrushColor('#3E2214')}
                      className={`w-6 h-6 rounded-full bg-[#3E2214] border-2 transition-transform cursor-pointer ${
                        brushColor === '#3E2214' ? 'scale-125 border-amber-500 shadow-md' : 'border-gray-600'
                      }`}
                      title="Crema Brown"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[#201B15]/70 dark:text-white/70">Brush:</span>
                    <button
                      type="button"
                      onClick={() => setBrushSize(4)}
                      className={`px-2 py-1 rounded border cursor-pointer ${brushSize === 4 ? 'bg-amber-500 text-white' : 'border-gray-300'}`}
                    >
                      Fine
                    </button>
                    <button
                      type="button"
                      onClick={() => setBrushSize(8)}
                      className={`px-2 py-1 rounded border cursor-pointer ${brushSize === 8 ? 'bg-amber-500 text-white' : 'border-gray-300'}`}
                    >
                      Bold
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={handleClearCanvas}
                    className="text-red-500 hover:text-red-600 font-semibold underline cursor-pointer"
                  >
                    ✨ Clear Crema
                  </button>
                </motion.div>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Specialty Configuration Controls (5 Cols) */}
          <div className="lg:col-span-5 space-y-6 bg-white dark:bg-[#1E1914] rounded-3xl p-6 sm:p-8 border border-[#201B15]/10 dark:border-white/10 shadow-xl">
            
            {/* 1. Custom Drink Name */}
            <div className="space-y-2">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
                1. Name Your Signature Brew
              </label>
              <input
                type="text"
                value={drinkName}
                onChange={(e) => setDrinkName(e.target.value)}
                placeholder="e.g. Tanishq's Velvet Flat White"
                className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm font-semibold text-[#201B15] dark:text-[#FCFAF6] focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {/* 2. Roast Profile Degree */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
                2. Select Roast Degree & Altitude
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'light', label: 'Blonde Light', desc: 'Honey & Jasmin', color: '#A66850' },
                  { id: 'medium', label: 'Medium Auburn', desc: 'Caramel & Hazelnut', color: '#6B3E2E' },
                  { id: 'dark', label: 'Dark French', desc: 'Dark Cocoa & Smoke', color: '#2A1810' },
                ].map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRoastDegree(r.id)}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all cursor-pointer ${
                      roastDegree === r.id
                        ? 'border-amber-500 bg-amber-500/10 shadow-sm font-bold'
                        : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 mb-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: r.color }} />
                      <span className="text-[#201B15] dark:text-white font-semibold">{r.label}</span>
                    </div>
                    <span className="text-[10px] text-[#201B15]/60 dark:text-white/60">{r.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Milk & Crema Texture */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
                3. Milk & Foam Texture
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'whole', label: 'Whole Farm Milk', price: 'Included' },
                  { id: 'oat', label: 'Silky Oat Milk', price: '+₹40' },
                  { id: 'macadamia', label: 'Macadamia Nut Milk', price: '+₹60' },
                  { id: 'nitro', label: 'Nitro Micro-Foam', price: '+₹50' },
                ].map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMilkType(m.id)}
                    className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                      milkType === m.id
                        ? 'border-amber-500 bg-amber-500/10 font-bold text-[#201B15] dark:text-amber-400'
                        : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#201B15]/80 dark:text-white/80'
                    }`}
                  >
                    <span>{m.label}</span>
                    <span className="font-mono text-[11px] font-semibold">{m.price}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Cup / Vessel Type */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
                4. Artisan Cup Vessel
              </label>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { id: 'ceramic', label: 'Handmade Ceramic', icon: '🏺' },
                  { id: 'glass', label: 'Double Glass', icon: '🥃' },
                  { id: 'flask', label: 'Artisan Flask', icon: '🍶' },
                ].map((v) => (
                  <button
                    key={v.id}
                    type="button"
                    onClick={() => setCupVessel(v.id)}
                    className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                      cupVessel === v.id
                        ? 'border-amber-500 bg-amber-500/10 font-bold text-[#201B15] dark:text-amber-400 shadow-sm'
                        : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#201B15]/80 dark:text-white/80'
                    }`}
                  >
                    <span className="text-xl">{v.icon}</span>
                    <span>{v.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 5. Syrup & Flavor Infusions */}
            <div className="space-y-3">
              <label className="text-xs font-mono font-bold uppercase tracking-wider text-[#201B15]/70 dark:text-white/70">
                5. Flavor Infusions & Syrups
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[
                  { id: 'vanilla', label: 'Madagascar Vanilla', price: '+₹30' },
                  { id: 'caramel', label: 'Smoked Caramel', price: '+₹30' },
                  { id: 'hazelnut', label: 'Roasted Hazelnut', price: '+₹30' },
                  { id: 'cinnamon', label: 'Organic Cinnamon Dust', price: '+₹20' },
                ].map((s) => {
                  const active = syrups.includes(s.id)
                  return (
                    <button
                      key={s.id}
                      type="button"
                      onClick={() => toggleSyrup(s.id)}
                      className={`p-3 rounded-2xl border flex items-center justify-between transition-all cursor-pointer ${
                        active
                          ? 'border-amber-500 bg-amber-500/10 font-bold text-[#201B15] dark:text-amber-400'
                          : 'border-[#201B15]/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5 text-[#201B15]/80 dark:text-white/80'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] border ${active ? 'bg-amber-500 text-white border-amber-500' : 'border-gray-400'}`}>
                          {active && '✓'}
                        </span>
                        <span>{s.label}</span>
                      </div>
                      <span className="font-mono text-[11px]">{s.price}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Price Breakdown & Add to Cart Action */}
            <div className="pt-6 border-t border-[#201B15]/10 dark:border-white/10 space-y-4">
              <div className="flex justify-between items-center text-sm font-mono">
                <span className="text-[#201B15]/70 dark:text-white/70">Signature Brew Price</span>
                <span className="font-bold text-2xl text-[#201B15] dark:text-amber-400">₹{totalPrice}</span>
              </div>

              <button
                type="button"
                onClick={handleAddToCart}
                className="w-full bg-[#201B15] hover:bg-[#322A21] dark:bg-amber-400 dark:hover:bg-amber-300 active:scale-[0.99] text-white dark:text-[#201B15] rounded-2xl py-4 font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🛒 Add Signature Brew to Cart · ₹{totalPrice}</span>
              </button>
            </div>

          </div>

        </div>
      </main>

      {/* Toast Notification when Custom Brew added to cart */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50 bg-[#201B15] text-white dark:bg-amber-400 dark:text-[#201B15] px-6 py-4 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-3 font-semibold text-sm"
          >
            <span className="text-xl">✨</span>
            <span>Added "{drinkName || 'Custom Brew'}" with your custom latte art to cart!</span>
          </motion.div>
        )}
      </AnimatePresence>

      <InteractiveTasteWheel onAddToCart={onAddToCart} onOpenCart={onOpenCart} />

      <Footer />
    </div>
  )
}
