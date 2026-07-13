import RoastDial from './RoastDial.jsx'

export default function Hero({ onOpenAuth }) {
  return (
    <section className="px-8 md:px-16 pt-10 pb-20 grid md:grid-cols-[1.1fr_0.9fr] gap-14 items-center">
      <div>
        <span className="block font-mono text-xs uppercase tracking-wider text-moss mb-5">
          Roasted weekly · Small lots only
        </span>

        <h1 className="font-display font-light text-6xl md:text-7xl leading-none tracking-tight mb-6">
          Coffee that tastes like{' '}
          <em className="italic font-semibold text-moss not-italic-none">where</em> it's from.
        </h1>

        <p className="text-[17px] opacity-80 max-w-md mb-9">
          We work directly with six farms across three countries and roast in batches small
          enough to taste the difference. No blends, no filler.
        </p>

        <div className="flex flex-wrap gap-3.5">
          <a href="#" className="bg-ink text-ecru rounded-full px-6 py-3.5 text-sm font-medium hover:bg-moss transition-colors shadow-md">
            Shop this week's lots
          </a>
          <button
            onClick={onOpenAuth}
            className="border border-ink hover:bg-ink hover:text-ecru rounded-full px-6 py-3.5 text-sm font-medium transition-all flex items-center gap-2"
          >
            <span>✨ Join Roastery Club</span>
          </button>
        </div>
      </div>

      <RoastDial />
    </section>
  )
}
