import { useState, useRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, User, Sparkles, Loader2 } from 'lucide-react'
import { chatApi, type ChatMessage } from '@/services/api'
import { Link } from 'react-router-dom'

export default function AiChatSection() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('chat.welcome') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (messages.length <= 1) return
    endRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const send = async () => {
    const text = input.trim()
    if (!text || loading) return

    const userMsg: ChatMessage = { role: 'user', content: text }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
      const { data } = await chatApi.sendMessage(text, history.slice(-10))
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Извините, произошла ошибка. Попробуйте позже или позвоните нам: +7 700 123 45 67',
      }])
    } finally {
      setLoading(false)
    }
  }

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      send()
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-navy-800/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-5">
              <Sparkles className="w-4 h-4" />
              Powered by Claude AI
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white mb-3">
              {t('chat.title')}
            </h2>
            <p className="text-gray-400">{t('chat.subtitle')}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-white/[0.03] border border-white/[0.07] rounded-2xl overflow-hidden"
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="w-9 h-9 rounded-xl bg-brand-500/20 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <div className="text-white text-sm font-semibold">TuranLogix AI</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow" />
                  <span className="text-xs text-gray-500">онлайн</span>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-72 overflow-y-auto p-5 space-y-4 scroll-smooth">
              <AnimatePresence>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${
                      msg.role === 'assistant' ? 'bg-brand-500/20' : 'bg-white/10'
                    }`}>
                      {msg.role === 'assistant'
                        ? <Bot className="w-4 h-4 text-brand-400" />
                        : <User className="w-4 h-4 text-gray-300" />
                      }
                    </div>
                    <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'assistant'
                        ? 'bg-white/[0.06] text-gray-200 rounded-tl-sm'
                        : 'bg-brand-500/20 text-white rounded-tr-sm'
                    }`}>
                      {msg.content}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {loading && (
                <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-lg bg-brand-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.06]">
                    <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-white/[0.05] bg-white/[0.02]">
              <div className="flex gap-2">
                <textarea
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/40 resize-none transition-all"
                />
                <button
                  onClick={send}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/30 flex items-center justify-center transition-all duration-200 flex-shrink-0 self-end"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-xs text-gray-600 mt-2 text-center">
                {t('chat.order_hint')}
              </p>
            </div>
          </motion.div>

          <div className="text-center mt-6">
            <Link
              to="/chat"
              className="text-sm text-brand-400 hover:text-brand-300 font-medium transition-colors"
            >
              Открыть полный чат →
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
