export default function Visit() {
  return (
    <section className="bg-moss text-ecru px-8 md:px-16 py-20 grid md:grid-cols-2 gap-14 items-center">
      <div>
        <h2 className="font-display font-normal text-4xl mb-5">Come sit at the bar.</h2>
        <p className="opacity-85 max-w-md mb-6 text-[15px]">
          Our roastery floor doubles as the café. Watch the drum turn, ask the roaster what's
          dropping this week, and drink it ten minutes later.
        </p>

        <div className="font-mono text-[13px] leading-8">
          <div>
            <span className="opacity-60 inline-block w-28">Mon–Fri</span>7:00 – 17:00
          </div>
          <div>
            <span className="opacity-60 inline-block w-28">Sat–Sun</span>8:00 – 15:00
          </div>
        </div>
      </div>

      <div className="bg-moss-dark rounded-2xl h-72 flex items-center justify-center font-mono text-xs opacity-50">
        — map embed —
      </div>
    </section>
  )
}
