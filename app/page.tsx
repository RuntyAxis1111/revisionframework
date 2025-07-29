"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { PasswordOverlay } from "@/components/password-overlay"
import { ContentSection } from "@/components/content-section"
import { data } from "@/lib/data"

export default function Dashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeTab, setActiveTab] = useState("artists")
  const [selectedItem, setSelectedItem] = useState<{
    id: string
    type: string
    socialId?: string
  } | null>(null)

  const handlePasswordSuccess = () => {
    setIsAuthenticated(true)
  }

  const handleTabChange = (tabId: string) => {
    // Only reset selectedItem if we're switching to a different tab
    if (tabId !== activeTab) {
      setActiveTab(tabId)
      setSelectedItem(null)
    } else {
      // If clicking the same tab, just update activeTab but keep selectedItem
      setActiveTab(tabId)
    }
  }

  const handleItemSelect = (itemId: string, type: string, socialId?: string) => {
    setSelectedItem({ id: itemId, type, socialId })
  }

  if (!isAuthenticated) {
    return <PasswordOverlay onSuccess={handlePasswordSuccess} />
  }

  return (
    <div className="min-h-screen bg-white">
      <Header activeTab={activeTab} onTabChange={handleTabChange} onItemSelect={handleItemSelect} data={data} />

      <main className="pt-16">
        <ContentSection activeTab={activeTab} selectedItem={selectedItem} data={data} />
      </main>
    </div>
  )
}
