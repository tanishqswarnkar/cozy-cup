import { useState, useMemo } from 'react'

const profiles = [
  { max: 33, name: 'Light', color: '#D9B570', notes: 'Bright acidity, citrus, floral' },
  { max: 66, name: 'Medium', color: '#A87A47', notes: 'Balanced, stone fruit, soft caramel' },
  { max: 100, name: 'Dark', color: '#5A3D26', notes: 'Bold, dark chocolate, low acidity' },
]

export default function RoastDial() {
  const [value, setValue] = useState(50)

  const profile = useMemo(
    () => profiles.find((p) => value <= p.max) ?? profiles[profiles.length - 1],
    [value]
  )

  return (
    <div className="bg-ink text-ecru rounded-[20px] p-9">
      <div className="font-mono text-[11px] uppercase tracking-widest opacity-60 mb-5">
        Roast profile — drag to explore
      </div>

      <div
        className="w-16 h-16 rounded-full mx-auto mb-6 transition-colors duration-200"
        style={{
          background: profile.color,
          boxShadow: 'inset -6px -6px 12px rgba(0,0,0,0.25)',
        }}
      />

      <div className="font-display text-3xl text-center mb-1.5">{profile.name}</div>
      <div className="text-center text-[13px] opacity-65 min-h-[20px] mb-7">
        {profile.notes}
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="w-full mb-2 accent-gold"
      />

      <div className="flex justify-between text-[11px] font-mono opacity-50">
        <span>Light</span>
        <span>Medium</span>
        <span>Dark</span>
      </div>
    </div>
  )
}
