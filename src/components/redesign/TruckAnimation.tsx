import { motion } from 'framer-motion'

export default function TruckAnimation() {
  return (
    <div
      aria-hidden="true"
      style={{ position: 'relative', width: '100%', height: 112, overflow: 'hidden' }}
    >
      {/* Road lines */}
      <div className="absolute bottom-8 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute bottom-8 left-0 right-0 h-px bg-white/5 translate-y-4" />

      {/* Truck */}
      <motion.div
        initial={{ x: '-120%' }}
        animate={{ x: '120vw' }}
        transition={{ duration: 18, ease: 'linear', repeat: Infinity, delay: 2 }}
        className="absolute bottom-8 pointer-events-none"
      >
        <div className="flex items-end gap-1 opacity-20">
          <div className="w-24 h-12 bg-navy-600 rounded-sm rounded-tl-md relative">
            <div className="absolute right-0 top-0 w-8 h-12 bg-navy-500 rounded-r-sm" />
            <div className="absolute bottom-0 left-2 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600" />
            <div className="absolute bottom-0 right-3 w-5 h-5 bg-gray-800 rounded-full border-2 border-gray-600" />
            <div className="absolute top-1 left-1 right-9 h-2 bg-brand-500/40 rounded-sm" />
          </div>
        </div>
      </motion.div>
    </div>
  )
}
