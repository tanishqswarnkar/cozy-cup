export default function Footer() {
  return (
    <footer className="bg-[#181410] text-[#FCFAF6] px-4 sm:px-10 md:px-16 py-8 sm:py-10 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-[13px] opacity-80 border-t border-white/10">
      <div className="flex items-center gap-2">
        <span className="font-display italic font-bold">Cozy Cup</span>
        <span>© {new Date().getFullYear()}</span>
      </div>
      <div className="font-mono text-white/60">Udaipur Specialty Roasters · Since 2021</div>
    </footer>
  )
}
