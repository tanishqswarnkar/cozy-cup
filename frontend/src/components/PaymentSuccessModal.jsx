import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PaymentSuccessModal({ isOpen, onClose, orderDetails }) {
  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 font-sans">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-[#181410]/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Celebration Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 10 }}
          transition={{ type: 'spring', damping: 22, stiffness: 300 }}
          className="relative z-10 w-full max-w-md bg-white dark:bg-[#1E1914] text-[#201B15] dark:text-[#FCFAF6] rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.5)] border border-[#201B15]/10 dark:border-white/10 overflow-hidden text-center"
        >
          {/* Top Decorative Confetti / Glow Banner */}
          <div className="absolute -top-12 inset-x-0 mx-auto w-40 h-40 bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 rounded-full blur-3xl opacity-30 pointer-events-none" />

          {/* Celebration Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.25, 1] }}
            transition={{ delay: 0.15, duration: 0.6, ease: 'easeOut' }}
            className="w-20 h-20 mx-auto bg-[#EBE5D8] dark:bg-[#2A231C] border-2 border-amber-400 rounded-full flex items-center justify-center text-4xl shadow-lg mb-5"
          >
            🎉☕
          </motion.div>

          <h2 className="font-display italic font-bold text-2xl sm:text-3xl text-[#201B15] dark:text-[#FCFAF6] mb-2">
            Payment Successful!
          </h2>
          <p className="text-sm text-[#201B15]/80 dark:text-white/80 mb-6 font-normal">
            Your specialty coffee order has been confirmed and our roasters are preparing your beans right now.
          </p>

          {/* Receipt Info Box */}
          <div className="bg-[#FCFAF6] dark:bg-[#15120E] rounded-2xl p-4.5 border border-[#201B15]/10 dark:border-white/10 text-left space-y-2.5 mb-6 text-xs sm:text-sm font-mono">
            <div className="flex justify-between items-center pb-2 border-b border-[#201B15]/10 dark:border-white/10">
              <span className="text-[#201B15]/60 dark:text-white/60 font-sans">Payment ID</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 truncate max-w-[190px]">
                {orderDetails?.paymentId || 'pay_confirmed_rzp'}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#201B15]/60 dark:text-white/60 font-sans">Order ID</span>
              <span className="font-semibold text-[#201B15] dark:text-white truncate max-w-[190px]">
                {orderDetails?.orderId || 'order_cozy_demo_101'}
              </span>
            </div>
            <div className="flex justify-between items-center pt-2 border-t border-[#201B15]/10 dark:border-white/10">
              <span className="text-[#201B15]/60 dark:text-white/60 font-sans">Amount Paid</span>
              <span className="font-bold text-base text-[#201B15] dark:text-amber-400">
                ₹{orderDetails?.amount ? Number(orderDetails.amount).toLocaleString('en-IN') : '1,250'}
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-3">
            <button
              type="button"
              onClick={onClose}
              className="w-full bg-[#201B15] hover:bg-[#322A21] dark:bg-amber-400 dark:hover:bg-amber-300 active:scale-[0.99] text-white dark:text-[#201B15] rounded-2xl py-3.5 font-semibold text-sm shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Continue Exploring Roasts</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  )
}
