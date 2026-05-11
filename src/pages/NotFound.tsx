import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import { Truck, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <>
      <Helmet><title>404 — TuranLogix</title></Helmet>
      <div className="min-h-screen flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <div className="w-20 h-20 rounded-3xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center mx-auto mb-6">
            <Truck className="w-10 h-10 text-brand-400" />
          </div>
          <h1 className="font-display text-7xl font-black text-white mb-2">404</h1>
          <p className="text-gray-400 mb-8">Страница не найдена. Груз уехал в другое место.</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 hover:bg-brand-400 text-white font-semibold transition-all">
            <Home className="w-4 h-4" />На главную
          </Link>
        </motion.div>
      </div>
    </>
  )
}
