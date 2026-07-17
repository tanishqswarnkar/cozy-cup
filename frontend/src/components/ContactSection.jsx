import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function ContactSection() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    }, 900)
  }

  return (
    <section className="py-16 sm:py-24 px-4 sm:px-10 md:px-16 bg-[#FCFAF6] dark:bg-[#181410] border-t border-[#201B15]/10 dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
          
          {/* Left Column: Info & Hours */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="font-mono text-xs uppercase tracking-widest text-amber-800 dark:text-amber-400 font-bold block mb-2 transition-colors">
                Get In Touch
              </span>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-[#201B15] dark:text-[#FCFAF6] transition-colors">
                Contact & Visit Us
              </h2>
              <p className="text-sm text-[#201B15]/70 dark:text-white/70 mt-3 leading-relaxed transition-colors">
                Have a question about our specialty beans, wholesale inquiries, or table reservations? Send our baristas a message!
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-4">
              <div className="bg-white dark:bg-[#1E1914] p-5 rounded-2xl border border-[#201B15]/10 dark:border-white/10 shadow-sm flex items-start gap-4 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-lg shrink-0">
                  📍
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#201B15] dark:text-[#FCFAF6]">Roastery & Cafe Location</h4>
                  <p className="text-xs text-[#201B15]/70 dark:text-white/70 mt-0.5">404 Kessel Run Blvd, Seattle, WA 98101</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E1914] p-5 rounded-2xl border border-[#201B15]/10 dark:border-white/10 shadow-sm flex items-start gap-4 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-lg shrink-0">
                  📞
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#201B15] dark:text-[#FCFAF6]">Phone & Reservations</h4>
                  <p className="text-xs text-[#201B15]/70 dark:text-white/70 mt-0.5">+1 (555) 234-COZY (2699)</p>
                </div>
              </div>

              <div className="bg-white dark:bg-[#1E1914] p-5 rounded-2xl border border-[#201B15]/10 dark:border-white/10 shadow-sm flex items-start gap-4 transition-colors">
                <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-400/20 text-amber-900 dark:text-amber-300 flex items-center justify-center text-lg shrink-0">
                  ✉️
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm text-[#201B15] dark:text-[#FCFAF6]">Email Support & Wholesale</h4>
                  <p className="text-xs text-[#201B15]/70 dark:text-white/70 mt-0.5">hello@cozycup.coffee</p>
                </div>
              </div>
            </div>

            {/* Opening Hours Box */}
            <div className="bg-[#201B15] dark:bg-[#15120E] text-[#FCFAF6] p-6 sm:p-7 rounded-3xl shadow-lg border border-amber-500/20 dark:border-amber-400/30">
              <h4 className="font-display font-bold text-lg text-amber-300 mb-3 flex items-center gap-2">
                <span>🕒</span> Opening Hours
              </h4>
              <div className="space-y-2 text-xs font-mono">
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/70">Monday – Friday</span>
                  <span className="text-white font-bold">6:00 AM – 8:00 PM</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/10">
                  <span className="text-white/70">Saturday</span>
                  <span className="text-white font-bold">7:00 AM – 9:00 PM</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-white/70">Sunday</span>
                  <span className="text-white font-bold">7:30 AM – 7:00 PM</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Form */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, amount: 0.2 }}
            className="lg:col-span-7 bg-white dark:bg-[#1E1914] p-6 sm:p-10 rounded-3xl border border-[#201B15]/15 dark:border-white/15 shadow-md transition-colors"
          >
            <h3 className="font-display font-bold text-2xl text-[#201B15] dark:text-[#FCFAF6] mb-2 transition-colors">
              Send Us a Message
            </h3>
            <p className="text-xs sm:text-sm text-[#201B15]/65 dark:text-white/65 mb-6 transition-colors">
              Fill out the form below and we will get back to you within 24 business hours.
            </p>

            {submitted ? (
              <div className="py-12 text-center bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-200 dark:border-emerald-800 p-6 animate-fadeIn">
                <div className="w-14 h-14 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto text-2xl mb-3 shadow-md">
                  ✓
                </div>
                <h4 className="font-display font-bold text-xl text-emerald-900 dark:text-emerald-300">Message Sent Successfully!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-400 mt-1">Thank you for contacting Cozy Cup. We look forward to speaking with you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-1.5">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-1.5">
                    Subject / Inquiry Type *
                  </label>
                  <select
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl px-4 py-3 text-sm text-[#201B15] dark:text-[#FCFAF6] focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors"
                  >
                    <option value="">Select a topic...</option>
                    <option value="General Question">General Question / Feedback</option>
                    <option value="Table Reservation">Table Reservation</option>
                    <option value="Wholesale Beans">Wholesale Coffee Beans</option>
                    <option value="Event Catering">Private Event Catering</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#201B15]/80 dark:text-white/80 mb-1.5">
                    Your Message *
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Tell us how we can help..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FCFAF6] dark:bg-[#15120E] border border-[#201B15]/20 dark:border-white/20 rounded-xl p-4 text-sm text-[#201B15] dark:text-[#FCFAF6] placeholder:text-[#201B15]/40 dark:placeholder:text-white/40 focus:outline-none focus:border-[#201B15] dark:focus:border-amber-400 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3.5 bg-[#201B15] hover:bg-[#342A21] text-white rounded-full font-semibold text-xs sm:text-sm transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                >
                  {loading ? (
                    <>
                      <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <span>↗</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>

        <div className="mt-16 text-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-[#201B15] text-amber-300 hover:bg-[#342A21] font-semibold text-xs sm:text-sm transition-all shadow-md hover:shadow-xl active:scale-95"
          >
            <span>Explore Full Contact & Location Page</span>
            <span>↗</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
