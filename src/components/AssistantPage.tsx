import { useState } from "react"
import { useNavigate } from 'react-router-dom'
import { Header } from "./header"
import { ChatOverlayStandalone } from './ChatOverlayStandalone'
import { AiAssistantFab } from "./AiAssistantFab"
import { data } from "../lib/data"

export function AssistantPage() {
  const navigate = useNavigate()
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    type: string
    socialId?: string
  } | null>(null)

  const handleTabChange = (tabId: string) => {
    if (tabId === "assistant") {
      // Already on assistant, do nothing
      return
    }
    
    // Navigate to dashboard and set the active tab
    navigate("/", { state: { activeTab: tabId } })
  }

  const handleItemSelect = (itemId: string, type: string, socialId?: string) => {
    setSelectedItem({ id: itemId, type, socialId })
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab="assistant" onTabChange={handleTabChange} onItemSelect={handleItemSelect} data={data} />
      
      <main className="pt-16">
        <div className="flex-1 p-6 h-[calc(100vh-4rem)]">
          <div className="w-full h-full bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg flex flex-col">
            <div className="bg-black text-white p-3 flex justify-between items-center flex-shrink-0 h-16">
              <span className="font-bold uppercase">ASSISTANT PANEL</span>
            </div>
            <ChatOverlayStandalone />
          </div>
        </div>
      </main>
      
      <AiAssistantFab />
    </div>
  )
}