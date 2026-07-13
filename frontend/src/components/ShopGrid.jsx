import React from 'react'
import CoffeeCard from './CoffeeCard.jsx'

const lots = [
  {
    origin: 'Yirgacheffe, Ethiopia',
    tasteLine: 'Washed · Bergamot, jasmine, honey & citrus blossom',
    altitude: '1,950m',
    process: 'Washed',
    price: '$22 / 12oz',
    image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Huila, Colombia',
    tasteLine: 'Honey · Red crisp apple, brown sugar, caramel drizzle',
    altitude: '1,700m',
    process: 'Honey',
    price: '$20 / 12oz',
    image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Mandheling, Sumatra',
    tasteLine: 'Natural · Dark cocoa nibs, cedar wood, rich earthy spice',
    altitude: '1,300m',
    process: 'Natural',
    price: '$21 / 12oz',
    image: 'https://images.unsplash.com/photo-1610632380989-680fe40816c6?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Antigua, Guatemala',
    tasteLine: 'Washed · Milk chocolate, toasted almond & orange zest',
    altitude: '1,650m',
    process: 'Washed',
    price: '$23 / 12oz',
    image: 'https://images.unsplash.com/photo-1587734195503-904fca47e0e9?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Nyeri AA, Kenya',
    tasteLine: 'Washed · Blackcurrant jam, ruby grapefruit & raw sugar',
    altitude: '1,850m',
    process: 'Washed',
    price: '$25 / 12oz',
    image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
  },
  {
    origin: 'Tarrazú, Costa Rica',
    tasteLine: 'Honey · Sweet nectarine, vanilla pod & silky cocoa body',
    altitude: '1,750m',
    process: 'Honey',
    price: '$24 / 12oz',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=800&auto=format&fit=crop',
  },
]

export default function ShopGrid({ onAddToCart }) {
  return (
    <section className="px-6 sm:px-10 md:px-16 pb-24 bg-[#FCFAF6] pt-12">
      <div className="flex flex-col sm:flex-row justify-between items-baseline mb-10 border-b border-[#201B15]/10 pb-5">
        <div>
          <h2 className="font-display italic font-bold text-4xl text-[#201B15]">This Week's Microlot Selection</h2>
          <p className="text-sm text-[#201B15]/65 mt-1 font-normal">Direct trade specialty roasts freshly dropped every Monday.</p>
        </div>
        <span className="text-[12px] font-mono tracking-widest text-[#201B15]/60 uppercase mt-2 sm:mt-0">6 Exclusive Lots Available</span>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
        {lots.map((lot) => (
          <CoffeeCard key={lot.origin} {...lot} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  )
}
