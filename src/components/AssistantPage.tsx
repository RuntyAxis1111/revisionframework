import { useNavigate } from 'react-router-dom'
import { ChatOverlayStandalone } from './ChatOverlayStandalone'

export function AssistantPage() {
  const navigate = useNavigate()

  return (
    <div className="h-screen w-screen flex flex-col bg-zinc-900 text-white">
      <header className="h-12 flex items-center px-4 border-b border-zinc-700 bg-black">
        <span className="text-sm font-semibold text-white">pinguino Json</span>
        <button
          onClick={() => navigate('/')}
          className="ml-auto text-xs px-3 py-1 rounded-md bg-zinc-700 hover:bg-zinc-600 text-white transition-colors"
        >
          Dashboard
        </button>
      </header>
      <ChatOverlayStandalone />
    </div>
  )
}