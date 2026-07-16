import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Footer from '../components/Footer.jsx'

export default function GalleryPage() {
  const [selectedTag, setSelectedTag] = useState('All Photos')
  const [activePhoto, setActivePhoto] = useState(null)

  const tags = ['All Photos', 'Interior & Vibe', 'Latte Art', 'Roastery', 'Bakery & Treats']

  const galleryCatalog = [
    {
      id: 'gal-1',
      url: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=1000&auto=format&fit=crop',
      title: 'Warm Morning Sunlight',
      tag: 'Interior & Vibe',
      desc: 'Our Seattle flagship roastery bathed in gentle morning light right as the doors open at 6:00 AM.',
    },
    {
      id: 'gal-2',
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=1000&auto=format&fit=crop',
      title: 'Rosetta Pour in Progress',
      tag: 'Latte Art',
      desc: 'A senior barista crafting a delicate 6-tier rosetta pattern into an organic honey oat milk latte.',
    },
    {
      id: 'gal-3',
      url: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1000&auto=format&fit=crop',
      title: 'Small Batch Drum Roasting',
      tag: 'Roastery',
      desc: 'Our vintage 12kg Probat roaster transforming green Ethiopian Yirgacheffe beans into fragrant golden-brown perfection.',
    },
    {
      id: 'gal-4',
      url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1000&auto=format&fit=crop',
      title: 'Cozy Corner Sanctuary Booths',
      tag: 'Interior & Vibe',
      desc: 'Designed with acoustic walnut wood panels, plush amber leather, and soft Edison lighting for ultimate focus and comfort.',
    },
    {
      id: 'gal-5',
      url: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop',
      title: 'V60 Pour Over Bloom',
      tag: 'Latte Art',
      desc: 'Precision temperature extraction unlocking bright jasmine, bergamot, and sweet stone fruit notes.',
    },
    {
      id: 'gal-6',
      url: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=1000&auto=format&fit=crop',
      title: 'Oven-Fresh Almond Croissants',
      tag: 'Bakery & Treats',
      desc: 'Laminated French butter pastry baked fresh every morning, dusted with powdered sugar and almond slices.',
    },
    {
      id: 'gal-7',
      url: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=1000&auto=format&fit=crop',
      title: 'Single-Origin Bean Packaging',
      tag: 'Roastery',
      desc: 'Our 100% compostable direct-trade bags resting inside our climate-controlled bean curing room.',
    },
    {
      id: 'gal-8',
      url: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1000&auto=format&fit=crop',
      title: 'Iced Mocha Frappe Indulgence',
      tag: 'Latte Art',
      desc: 'Cold brewed espresso layered with Valrhona dark chocolate drizzle and fluffy vanilla bean cream.',
    },
    {
      id: 'gal-9',
      url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=1000&auto=format&fit=crop',
      title: 'Artisan Sourdough Paninis',
      tag: 'Bakery & Treats',
      desc: 'Handmade paninis toasted to crispy golden perfection with melted fresh mozzarella and organic basil pesto.',
    },
  ]

  const filteredPhotos =
    selectedTag === 'All Photos'
      ? galleryCatalog
      : galleryCatalog.filter((item) => item.tag === selectedTag)

  return (
    <div className="min-h-screen bg-[#FCFAF6] flex flex-col justify-between pt-8 sm:pt-12 px-4 sm:px-10 md:px-16 animate-fadeIn">
      <div className="max-w-7xl mx-auto w-full pb-24">
        {/* Navigation Back */}
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-mono tracking-wider uppercase text-[#201B15]/70 hover:text-[#201B15] transition-colors"
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
          className="border-b border-[#201B15]/15 pb-10 mb-10 text-center max-w-3xl mx-auto"
        >
          <span className="font-mono text-xs uppercase tracking-widest text-amber-800 font-bold block mb-2">
            Visual Experience
          </span>
          <h1 className="font-display font-bold text-4xl sm:text-6xl text-[#201B15]">
            The Cozy Cup Gallery
          </h1>
          <p className="text-sm sm:text-base text-[#201B15]/75 mt-3 leading-relaxed">
            Take a visual journey inside our roastery, explore our baristas' meticulous extraction craft, and immerse yourself in the warm community atmosphere we cherish. Click any photo to zoom.
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                selectedTag === tag
                  ? 'bg-[#201B15] text-amber-300 shadow-md scale-105'
                  : 'bg-white/80 text-[#201B15]/80 hover:bg-white hover:text-[#201B15] border border-[#201B15]/10'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="flex justify-between items-center mb-6 text-xs font-mono tracking-widest text-[#201B15]/60 uppercase">
          <span>
            {filteredPhotos.length} {filteredPhotos.length === 1 ? 'Photo' : 'Photos'} Displayed
          </span>
          {selectedTag !== 'All Photos' && (
            <span className="text-amber-800 font-semibold">{selectedTag}</span>
          )}
        </div>

        {/* Masonry / Grid */}
        <motion.div
          key={selectedTag}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8"
        >
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => setActivePhoto(photo)}
              className="group relative rounded-3xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 bg-[#201B15] h-72 sm:h-80 cursor-pointer"
            >
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent opacity-70 group-hover:opacity-95 transition-opacity duration-300" />
              
              <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-400 text-[#201B15] font-mono text-[10px] font-bold uppercase tracking-wider mb-2 shadow-sm">
                  {photo.tag}
                </span>
                <h3 className="font-display font-bold text-xl text-white group-hover:text-amber-300 transition-colors">
                  {photo.title}
                </h3>
                <p className="text-xs text-white/70 line-clamp-2 mt-1">
                  {photo.desc}
                </p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Photo Lightbox Modal */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActivePhoto(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-10"
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="bg-[#201B15] border border-white/20 rounded-3xl overflow-hidden max-w-4xl w-full shadow-2xl relative flex flex-col md:flex-row"
            >
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center text-lg transition-colors cursor-pointer"
              >
                ✕
              </button>

              <div className="md:w-3/5 bg-black flex items-center justify-center max-h-[500px] md:max-h-[600px]">
                <img
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between text-white">
                <div>
                  <span className="inline-block px-3 py-1 rounded-full bg-amber-400 text-[#201B15] font-mono text-xs font-bold uppercase tracking-wider mb-4">
                    {activePhoto.tag}
                  </span>
                  <h3 className="font-display font-bold text-2xl sm:text-3xl text-amber-300 mb-3">
                    {activePhoto.title}
                  </h3>
                  <p className="text-sm text-white/80 leading-relaxed">
                    {activePhoto.desc}
                  </p>
                </div>

                <div className="pt-6 border-t border-white/10 mt-6">
                  <button
                    onClick={() => setActivePhoto(null)}
                    className="w-full py-3 px-6 rounded-full bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all cursor-pointer"
                  >
                    Close Preview
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}
