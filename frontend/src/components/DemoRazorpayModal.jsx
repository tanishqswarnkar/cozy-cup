import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function DemoRazorpayModal({ isOpen, onClose, amount, onConfirmPayment }) {
  const [selectedMethod, setSelectedMethod] = useState('upi')
  const [isProcessing, setIsProcessing] = useState(false)
  const [qrStatus, setQrStatus] = useState('listening') // 'listening', 'scanned', 'verified'

  if (!isOpen) return null

  const handlePay = () => {
    setIsProcessing(true)
    setTimeout(() => {
      setIsProcessing(false)
      onConfirmPayment()
    }, 1200)
  }

  const handleQrScan = () => {
    setQrStatus('scanned')
    setTimeout(() => {
      setQrStatus('verified')
      setTimeout(() => {
        setQrStatus('listening')
        onConfirmPayment()
      }, 700)
    }, 1200)
  }

  const upiLink = `upi://pay?pa=cozycup.merchant@okhdfcbank&pn=Cozy%20Cup%20Specialty%20Coffee&am=${Number(amount || 0)}&cu=INR`
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(upiLink)}`

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 font-sans">
        {/* Dark Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/75 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Razorpay Authentic Styled Popup Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 15 }}
          className="relative z-10 w-full max-w-md bg-white text-[#1a1a1a] rounded-2xl shadow-[0_25px_60px_rgba(0,0,0,0.85)] overflow-hidden border border-gray-200"
        >
          {/* Top Blue / Dark Razorpay Branding Header */}
          <div className="bg-[#0C2340] text-white p-5 flex items-center justify-between relative overflow-hidden">
            <div className="absolute right-0 top-0 bg-red-600/90 text-white font-mono text-[10px] font-bold px-7 py-1 transform rotate-45 translate-x-5 translate-y-2.5 shadow-md">
              Test Mode
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl font-bold border border-white/20">
                ☕
              </div>
              <div>
                <h3 className="font-bold text-base leading-tight">Cozy Cup Specialty Coffee</h3>
                <p className="text-xs text-white/70 font-mono">Secured by Razorpay Gateway</p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-white/60 hover:text-white p-1 rounded-full hover:bg-white/10 transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          {/* Amount Summary Bar */}
          <div className="bg-amber-50 px-5 py-3 border-b border-amber-200/60 flex items-center justify-between text-sm">
            <span className="text-amber-900 font-medium">Total Amount Due</span>
            <span className="text-amber-950 font-bold font-mono text-lg">
              ₹{Number(amount || 0).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Educational Developer Notice */}
          <div className="bg-blue-50/80 px-5 py-2.5 text-[11px] text-blue-900 border-b border-blue-100 flex items-center gap-2">
            <span className="text-base">ℹ️</span>
            <span>
              <b>Simulated Gateway:</b> You are testing without real API credentials in `.env`. When you connect live keys on razorpay.com, real UPI & Card checks take over automatically!
            </span>
          </div>

          {/* Payment Methods Selection */}
          <div className="p-5 space-y-4">
            <div className="grid grid-cols-3 gap-2 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setSelectedMethod('upi')}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  selectedMethod === 'upi'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-lg">⚡</span>
                <span>UPI / QR</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('card')}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  selectedMethod === 'card'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-lg">💳</span>
                <span>Card</span>
              </button>
              <button
                type="button"
                onClick={() => setSelectedMethod('netbanking')}
                className={`py-2.5 px-3 rounded-xl border flex flex-col items-center gap-1 transition-all cursor-pointer ${
                  selectedMethod === 'netbanking'
                    ? 'border-blue-600 bg-blue-50/60 text-blue-900 font-bold shadow-sm'
                    : 'border-gray-200 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <span className="text-lg">🏦</span>
                <span>Netbanking</span>
              </button>
            </div>

            {/* Method Details Box */}
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200/80 text-xs text-gray-700 space-y-3">
              {selectedMethod === 'upi' && (
                <div className="space-y-3 pt-0.5 text-center">
                  <div className="flex items-center justify-between text-left pb-2 border-b border-gray-200">
                    <div>
                      <p className="font-bold text-gray-900 mb-0.5">Scan & Pay via GPay / PhonePe / Paytm</p>
                      <p className="text-gray-500 font-mono text-[11px]">coffee.lover@okhdfcbank</p>
                    </div>
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-1 rounded text-[10px] flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
                      <span>Live QR</span>
                    </span>
                  </div>

                  {/* QR Code Container */}
                  <div className="relative mx-auto w-48 h-48 bg-white rounded-2xl p-2.5 shadow-md border border-blue-200 flex items-center justify-center overflow-hidden">
                    {/* Radar Pulse Rings */}
                    {qrStatus === 'listening' && (
                      <div className="absolute inset-0 border-2 border-blue-400 rounded-2xl animate-ping opacity-25 pointer-events-none" />
                    )}

                    <img src={qrUrl} alt="Razorpay UPI QR Code" className="w-40 h-40 object-contain mx-auto" />

                    {/* Scanned / Verified Overlay */}
                    {qrStatus !== 'listening' && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center p-3 text-center z-10"
                      >
                        {qrStatus === 'scanned' ? (
                          <>
                            <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin mb-2" />
                            <p className="font-bold text-blue-900 text-xs">⚡ QR Code Scanned!</p>
                            <p className="text-[10px] text-gray-600">Verifying Bank Transfer...</p>
                          </>
                        ) : (
                          <>
                            <div className="w-10 h-10 bg-emerald-500 text-white rounded-full flex items-center justify-center text-xl mb-1 shadow-md">
                              ✓
                            </div>
                            <p className="font-bold text-emerald-900 text-xs">Payment Verified!</p>
                            <p className="text-[10px] text-emerald-700">Confirming Order...</p>
                          </>
                        )}
                      </motion.div>
                    )}
                  </div>

                  {/* Interactive Status Bar */}
                  <div className="bg-blue-50 rounded-lg p-2 text-[11px] text-blue-900 font-medium flex items-center justify-center gap-1.5 border border-blue-100">
                    <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>Scan with any UPI App on your phone</span>
                  </div>

                  {/* Simulate Scan Button */}
                  <button
                    type="button"
                    disabled={qrStatus !== 'listening'}
                    onClick={handleQrScan}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] disabled:opacity-60 text-white font-bold py-3 rounded-xl text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span className="text-sm">📱</span>
                    <span>Simulate Phone Scan & Auto-Confirm</span>
                  </button>
                </div>
              )}
              {selectedMethod === 'card' && (
                <div className="space-y-3 py-1">
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">Test Card Details (Visa / Mastercard)</p>
                    <p className="text-gray-500 font-mono text-xs">Card: 4242 ···· ···· 4242 | CVV: 123</p>
                  </div>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full bg-[#3399CC] hover:bg-[#2884B3] active:scale-[0.99] disabled:opacity-75 text-white font-bold rounded-xl py-3.5 text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Verifying Card with Razorpay...</span>
                      </>
                    ) : (
                      <span>Pay ₹{Number(amount || 0).toLocaleString('en-IN')} via Card</span>
                    )}
                  </button>
                </div>
              )}
              {selectedMethod === 'netbanking' && (
                <div className="space-y-3 py-1">
                  <div>
                    <p className="font-bold text-gray-900 mb-0.5">All Indian Banks Supported</p>
                    <p className="text-gray-500 text-xs">HDFC, ICICI, SBI, Axis, Kotak & more</p>
                  </div>
                  <button
                    type="button"
                    disabled={isProcessing}
                    onClick={handlePay}
                    className="w-full bg-[#3399CC] hover:bg-[#2884B3] active:scale-[0.99] disabled:opacity-75 text-white font-bold rounded-xl py-3.5 text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Connecting Bank...</span>
                      </>
                    ) : (
                      <span>Pay ₹{Number(amount || 0).toLocaleString('en-IN')} via Netbanking</span>
                    )}
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer Security Badge */}
          <div className="bg-gray-50 px-5 py-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-500">
            <div className="flex items-center gap-1.5 font-bold text-[#0C2340]">
              <span>🔒</span>
              <span>128-bit SSL Secured</span>
            </div>
            <span>PCI-DSS Compliant</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
