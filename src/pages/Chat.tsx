import { useState, useRef, useEffect, useCallback } from 'react'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, User, Sparkles, Loader2, Trash2, MessageSquare } from 'lucide-react'
import { chatApi, type ChatMessage } from '@/services/api'
import { useAuthStore } from '@/store'

export default function Chat() {
  const { t, i18n } = useTranslation()
  const QUICK_PROMPTS = t('chat.quick_prompts', { returnObjects: true }) as string[]
  const { user } = useAuthStore()
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: t('chat.welcome') },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const endRef = useRef<HTMLDivElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  // Update welcome message when language changes (only if it's the only message)
  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', content: t('chat.welcome') }]
      }
      return prev
    })
  }, [i18n.language, t])

  useEffect(() => {
    const container = messagesContainerRef.current
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [messages])

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 120) + 'px'
  }, [input])

  const send = useCallback(async (text?: string) => {
    const msg = (text ?? input).trim()
    if (!msg || loading) return

    const userMsg: ChatMessage = { role: 'user', content: msg }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
      const { data } = await chatApi.sendMessage(msg, history.slice(-12))
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: t('chat.error'),
      }])
    } finally {
      setLoading(false)
    }
  }, [input, loading, messages, t])

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: t('chat.welcome') }])
  }

  return (
    <>
      <Helmet>
        <title>AI Ассистент — TuranLogix</title>
        <meta name="description" content="ИИ-ассистент TuranLogix. Задайте вопрос о перевозке или оформите заявку онлайн." />
      </Helmet>

      <div className="flex flex-col flex-1 pt-16 lg:pt-20 overflow-hidden">
        <div className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 sm:px-6 pb-4 overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
                <Bot className="w-5 h-5 text-brand-400" />
              </div>
              <div>
                <h1 className="font-display font-bold text-white text-base">{t('chat.title')}</h1>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse-slow" />
                  <span className="text-xs text-gray-500">Powered by Claude AI</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs">
                <Sparkles className="w-3 h-3" />Claude Sonnet
              </span>
              <button
                onClick={clearChat}
                className="p-2 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
                title="Очистить чат"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages area */}
          <div ref={messagesContainerRef} className="flex-1 overflow-y-auto rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-col">
            <div className="flex-1 p-4 space-y-4">
              {/* Quick prompts — only at start */}
              {messages.length === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="pt-2"
                >
                  <p className="text-xs text-gray-500 mb-2 flex items-center gap-1.5">
                    <MessageSquare className="w-3 h-3" />{t('chat.frequent_questions')}:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {QUICK_PROMPTS.map(prompt => (
                      <button
                        key={prompt}
                        onClick={() => send(prompt)}
                        className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/[0.08] text-gray-300 hover:text-white hover:border-brand-500/30 hover:bg-brand-500/5 text-xs transition-all text-left"
                      >
                        {prompt}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Messages */}
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                  >
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5 ${
                      msg.role === 'assistant' ? 'bg-brand-500/20' : 'bg-white/10'
                    }`}>
                      {msg.role === 'assistant'
                        ? <Bot className="w-4 h-4 text-brand-400" />
                        : user?.fullName
                          ? <span className="text-xs font-bold text-white">{user.fullName[0]}</span>
                          : <User className="w-4 h-4 text-gray-300" />}
                    </div>

                    {/* Bubble */}
                    <div className={`max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                      <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap ${
                        msg.role === 'assistant'
                          ? 'bg-white/[0.06] text-gray-100 rounded-tl-sm'
                          : 'bg-brand-500/25 text-white rounded-tr-sm'
                      }`}>
                        {msg.content}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3"
                >
                  <div className="w-8 h-8 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0">
                    <Bot className="w-4 h-4 text-brand-400" />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white/[0.06] flex items-center gap-2">
                    <Loader2 className="w-4 h-4 text-brand-400 animate-spin" />
                    <span className="text-xs text-gray-400">{t('chat.thinking')}</span>
                  </div>
                </motion.div>
              )}

              <div ref={endRef} />
            </div>

            {/* Input */}
            <div className="border-t border-white/[0.06] bg-white/[0.02] p-3">
              <div className="flex gap-2 items-end">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  placeholder={t('chat.placeholder')}
                  rows={1}
                  className="flex-1 bg-white/[0.05] border border-white/[0.08] rounded-xl px-4 py-2.5 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500/40 resize-none transition-all max-h-[120px] leading-relaxed"
                  style={{ overflowY: 'auto' }}
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="w-10 h-10 rounded-xl bg-brand-500 hover:bg-brand-400 disabled:bg-brand-500/30 disabled:cursor-not-allowed flex items-center justify-center flex-shrink-0 transition-all duration-200 shadow-glow-orange disabled:shadow-none"
                >
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
              <p className="text-[10px] text-gray-600 mt-2 text-center">
                {t('chat.hint')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
