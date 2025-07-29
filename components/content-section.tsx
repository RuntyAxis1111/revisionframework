"use client"

import { ArtistPanel } from "./artist-panel"

interface ContentSectionProps {
  activeTab: string
  selectedItem: {
    id: string
    type: string
    socialId?: string
  } | null
  data: any
}

export function ContentSection({ activeTab, selectedItem, data }: ContentSectionProps) {
  const getReportUrl = () => {
    if (!selectedItem || activeTab === "artists") return null

    const { id, type, socialId } = selectedItem

    if (type === "palf-social") {
      const social = data.palf.socialMedia.find((s: any) => s.id === id)
      return social?.palfReportUrl || null
    }

    if (type === "palf-band-social") {
      const social = data.palf.socialMedia.find((s: any) => s.id === socialId)
      return social?.palfReportUrl || data.truvatos[0]?.truvatosReportUrl || null
    }

    if (type === "truvatos-social") {
      const social = data.truvatos.find((s: any) => s.id === id)
      return social?.truvatosReportUrl || null
    }

    if (type === "community-social") {
      const social = data.communities.socialMedia.find((s: any) => s.id === socialId)
      if (social?.isDisabled) return null

      if (social?.communityReportUrls && social.communityReportUrls[id]) {
        return social.communityReportUrls[id]
      }
      return null
    }

    return null
  }

  const reportUrl = getReportUrl()

  const selectedArtist =
    activeTab === "artists" && selectedItem?.type === "artist"
      ? data.artists.find((a: any) => a.id === selectedItem.id)
      : null

  return (
    <div className="p-4 h-[calc(100vh-4rem)]">
      <div className="w-full h-full bg-white border-2 border-black rounded-lg overflow-hidden shadow-lg flex flex-col">
        {activeTab === "artists" ? (
          <ArtistPanel artist={selectedArtist} />
        ) : reportUrl ? (
          <>
            <div className="bg-black text-white p-3 flex justify-between items-center flex-shrink-0 h-16">
              <span className="font-bold uppercase">{`${activeTab.toUpperCase()} Data Panel`}</span>
            </div>
            <div className="flex-1 h-full overflow-y-auto">
              <iframe
                src={reportUrl}
                title={`${activeTab.toUpperCase()} Data Panel`}
                className="w-full h-full border-0"
                allowFullScreen
                sandbox="allow-storage-access-by-user-activation allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox"
              />
            </div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
              title={`${activeTab.toUpperCase()} Video`}
              key={activeTab}
            >
              <source src={`/${activeTab}.mp4`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )}
      </div>
    </div>
  )
}
