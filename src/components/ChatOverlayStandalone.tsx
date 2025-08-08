import { useState, useRef, useEffect } from 'react'
import ChatBubble from './ChatBubble'

interface Message {
  id: string
  text: string
  role: 'user' | 'bot'
  timestamp: Date
}

export function ChatOverlayStandalone() {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Focus input on mount
    inputRef.current?.focus()
  }, [])

  const sendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      role: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsLoading(true)

    try {
      const response = await fetch('https://runtyaxis.app.n8n.cloud/webhook/line-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: text.trim(),
          timestamp: new Date().toISOString()
        })
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.text()
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data || 'Lo siento, no pude procesar tu mensaje.',
        role: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, assistantMessage])
    } catch (error) {
      console.error('Error sending message:', error)
      
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'Lo siento, hubo un error al procesar tu mensaje. Por favor, inténtalo de nuevo.',
        role: 'bot',
        timestamp: new Date()
      }

      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(inputValue)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      sendMessage(inputValue)
    }
  }

  return (
    <div className="flex-1 flex flex-col bg-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="flex items-center justify-center h-full">
            <div className="text-center text-gray-500">
              <img
                src="/assets/pinguinohybe.png"
                alt="pinguino Hybe"
                className="w-20 h-20 mx-auto mb-4 object-contain"
              />
              <h2 className="text-xl font-semibold mb-2 text-black">¡Hola! Soy pinguino Json</h2>
              <p className="text-sm">Escribe lo que necesites y te armo el reporte al toque 🐧📊</p>
            </div>
          </div>
        )}
        
        {messages.map((message) => (
          <ChatBubble key={message.id} role={message.role} text={message.text} />
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="flex items-start gap-3 mb-4">
              <div className="flex-shrink-0">
                <img
                  src="/assets/pinguinohybe.png"
                  alt="pinguino Json"
                  className="w-16 h-16 object-contain animate-[pulse_4s_ease-in-out_infinite]"
                />
              </div>
              <div className="relative">
                <div 
                  className="absolute left-0 top-4 w-0 h-0 -translate-x-2"
                  style={{
                    borderTop: '8px solid transparent',
                    borderBottom: '8px solid transparent', 
                    borderRight: '8px solid rgb(245, 245, 245)',
                  }}
                />
                <div className="bg-neutral-100 text-black border border-neutral-200 rounded-xl px-4 py-3">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-black rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                    <span className="text-xs text-gray-500">Escribiendo...</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="flex gap-3 bg-white p-4 border-t border-neutral-200">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Escribe tu mensaje…"
            disabled={isLoading}
            className="flex-1 rounded-full border border-neutral-300 px-5 py-3
                       placeholder:text-neutral-500 focus:ring-2 focus:ring-black
                       shadow-inner disabled:opacity-50 font-sans text-sm"
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="rounded-full bg-black text-white px-6 py-3 hover:bg-neutral-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-sans text-sm"
          >
            Enviar
          </button>
      </form>
    </div>
  )
}