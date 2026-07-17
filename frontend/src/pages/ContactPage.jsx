import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Footer from '../components/Footer.jsx'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 5000)
    }, 900)
  }

  return (
    <div className="min-h-screen bg-[#FCFAF6] dark:bg-[#181410] flex flex-col justify-between pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn transition-colors">
      <div className="max-w-7xl mx-auto w-full pb-24">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#201B15]/70 dark:text-white/70 hover:text-[#201B15] dark:hover:text-white transition-colors"
          >
            <span>←</span>
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Hero Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="border-b border-[#201B15]/15 dark:border-white/15 pb-10 mb-12 text-center max-w-3xl mx-auto transition-colors"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-2 transition-colors">
            Let's Connect
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
            Contact & Roastery Location
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 dark:text-white/75 mt-3 leading-relaxed transition-colors">
            Whether you are looking to reserve a booth, inquire about wholesale specialty beans for your cafe, or give feedback to our baristas, we are always delighted to hear from you.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          {/* Left Column: Details & Map Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-[#1E1914] p-7 rounded-3xl border border-[#201B15]/10 dark:border-white/10 shadow-sm space-y-6 transition-colors">
              <h3 className="font-display font-bold text-2xl text-[#201B15] dark:text-[#FCFAF6] border-b border-[#201B15]/10 dark:border-white/10 pb-3 transition-colors">
                Flagship Roastery Info
              </h3>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-xl shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-[#201B15] dark:text-[#FCFAF6]">Visit Our Sanctuary</h4>
                  <p className="text-xs sm:text-sm text-[#201B15]/70 dark:text-white/70 mt-0.5 leading-relaxed">
                    404 Kessel Run Blvd, Suite 100<br />
                    Seattle, WA 98101
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-xl shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-[#201B15] dark:text-[#FCFAF6]">Phone & Reservations</h4>
                  <p className="text-xs sm:text-sm text-[#201B15]/70 dark:text-white/70 mt-0.5">
                    +1 (555) 234-COZY (2699)<br />
                    <span className="text-[11px] text-[#201B15]/50 dark:text-white/50">Available Mon-Sun during opening hours</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-11 h-11 rounded-2xl bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-xl shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-[#201B15] dark:text-[#FCFAF6]">Email & Wholesale</h4>
                  <p className="text-xs sm:text-sm text-[#201B15]/70 dark:text-white/70 mt-0.5">
                    hello@cozycup.coffee<br />
                    wholesale@cozycup.coffee
                  </p>
                </div>
              </div>
            </div>

            {/* Opening Hours Dark Card */}
            <div className="bg-[#201B15] dark:bg-[#15120E] text-[#FCFAF6] p-7 rounded-3xl shadow-xl border border-amber-500/20 dark:border-amber-400/30">
              <h4 className="font-display font-bold text-xl text-amber-300 mb-4 flex items-center gap-2">
                <span>🕒</span> Opening Hours
              </h4>
              <div className="space-y-3 text-xs sm:text-sm font-mono">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-white/70">Monday – Friday</span>
                  <span className="text-white font-bold">6:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-white/70">Saturday</span>
                  <span className="text-white font-bold">7:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span className="text-white/70">Sunday</span>
                  <span className="text-white font-bold">7:30 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Full Interactive Form */}
          <div className="lg:col-span-7 bg-white dark:bg-[#1E1914] p-8 sm:p-12 rounded-3xl border border-[#201B15]/15 dark:border-white/15 shadow-lg transition-colors">
            <h3 className="font-display font-bold text-3xl text-[#201B15] dark:text-[#FCFAF6] mb-2 transition-colors">
              Send Our Team a Message
            </h3>
            <p className="text-xs sm:text-sm text-[#201B15]/65 dark:text-white/65 mb-8 transition-colors">
              Fill out the form below and a Q-Grader or store manager will reply directly within 24 business hours.
            </p>

            {submitted ? (
              <div className="py-16 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-8 animate-fadeIn">
                <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-3xl mb-4 shadow-md">
                  ✓
                </div>
                <h4 className="font-display font-bold text-2xl text-emerald-900 dark:text-emerald-300">Inquiry Received!</h4>
                <p className="text-sm text-emerald-700 dark:text-emerald-400 mt-2 max-w-md mx-auto">
                  Thank you for connecting with Cozy Cup. We have dispatched a confirmation email and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-2">
                      Your Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3.5 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-2">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3.5 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-2">
                      Phone Number (Optional)
                    </label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3.5 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-2">
                      Inquiry Category *
                    </label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3.5 text-sm text-[#201B15] dark:text-[#FCFAF6] focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    >
                      <option value="">Select a topic...</option>
                      <option value="General Question">General Question / Feedback</option>
                      <option value="Table Reservation">Sanctuary Booth Reservation</option>
                      <option value="Wholesale Beans">Wholesale Coffee Beans</option>
                      <option value="Event Catering">Private Event & Barista Catering</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-2">
                    Message Content *
                  </label>
                  <textarea
                    required
                    rows="5"
                    placeholder="Tell us how we can assist you..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl p-4 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-4 px-8 bg-[#201B15] hover:bg-[#342A21] text-white rounded-full font-semibold text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Transmitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Inquiry</span>
                      <span>↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
