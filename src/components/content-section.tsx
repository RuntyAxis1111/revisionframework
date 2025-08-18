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

    if (activeTab === "mmm") return null // MMM has custom content, no iframe

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

  const renderMMMContent = () => (
    <div className="flex-1 overflow-y-auto bg-white px-6 py-8 md:px-6">
      <div className="space-y-8">
        {/* Header */}
        <header>
          <h1 id="mmm-title" className="text-3xl font-bold text-black mb-2">
            Robyn – Marketing-Mix Model
          </h1>
        </header>

        {/* ¿Qué es? Section */}
        <section id="que-es" aria-labelledby="que-es-section">
          <h2 id="que-es-section" className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
            ¿Qué es?
          </h2>
          <p className="text-gray-700 mb-6 leading-relaxed">
            Robyn es un modelo de <em>Marketing-Mix</em> open-source (creado por Meta) que estima qué tanto aporta cada canal a nuestro KPI (ventas, streams, etc.) y sugiere cómo redistribuir presupuesto para maximizar ROI.
          </p>
          
          {/* Tabla de ejemplo */}
          <div className="overflow-x-auto mb-4">
            <table className="w-full border-2 border-black bg-white">
              <thead>
                <tr className="bg-black text-white">
                  <th className="border border-black px-4 py-3 text-left font-bold">Canal</th>
                  <th className="border border-black px-4 py-3 text-left font-bold">Inversión Mensual</th>
                  <th className="border border-black px-4 py-3 text-left font-bold">ROI</th>
                  <th className="border border-black px-4 py-3 text-left font-bold">Punto de Saturación</th>
                  <th className="border border-black px-4 py-3 text-left font-bold">Recomendación</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="border border-black px-4 py-3 font-semibold">Meta Ads</td>
                  <td className="border border-black px-4 py-3">50 000 USD</td>
                  <td className="border border-black px-4 py-3 text-green-600 font-semibold">2.8×</td>
                  <td className="border border-black px-4 py-3">60 000 USD</td>
                  <td className="border border-black px-4 py-3 text-green-600 font-semibold">↑ 10 %</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-black px-4 py-3 font-semibold">YouTube</td>
                  <td className="border border-black px-4 py-3">30 000 USD</td>
                  <td className="border border-black px-4 py-3 text-yellow-600 font-semibold">1.6×</td>
                  <td className="border border-black px-4 py-3">35 000 USD</td>
                  <td className="border border-black px-4 py-3 text-gray-600 font-semibold">=</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-black px-4 py-3 font-semibold">TikTok</td>
                  <td className="border border-black px-4 py-3">15 000 USD</td>
                  <td className="border border-black px-4 py-3 text-green-600 font-semibold">4.2×</td>
                  <td className="border border-black px-4 py-3">25 000 USD</td>
                  <td className="border border-black px-4 py-3 text-green-600 font-semibold">↑ 25 %</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="border border-black px-4 py-3 font-semibold">OOH</td>
                  <td className="border border-black px-4 py-3">20 000 USD</td>
                  <td className="border border-black px-4 py-3 text-red-600 font-semibold">0.9×</td>
                  <td className="border border-black px-4 py-3">22 000 USD</td>
                  <td className="border border-black px-4 py-3 text-red-600 font-semibold">↓ 50 %</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-sm text-gray-500 italic">
            *Datos ficticios para ilustración.
          </p>
        </section>

        {/* ¿Cómo lo estamos usando? Section */}
        <section id="como-lo-usamos" aria-labelledby="como-usamos-section">
          <h2 id="como-usamos-section" className="text-2xl font-bold text-black mb-4 border-b-2 border-black pb-2">
            ¿Cómo lo estamos usando?
          </h2>
          <ol className="list-decimal list-inside space-y-3 text-gray-700 mb-6">
            <li className="leading-relaxed">
              Extraemos métricas semanales de cada red social y gasto publicitario.
            </li>
            <li className="leading-relaxed">
              Alimentamos a Robyn con <strong>2 años</strong> de historia por canal.
            </li>
            <li className="leading-relaxed">
              Re-entrenamos todos los lunes 02:00 a.m.; si detecta un cambio de tendencia ±30 % envía alerta a Slack.
            </li>
            <li className="leading-relaxed">
              Los resultados (ROI, curvas y recomendación de presupuesto) se publican en el sub-tab "Resultados".
            </li>
          </ol>

          {/* Datasets Section */}
          <h3 className="text-xl font-bold text-black mb-4">
            Datasets iniciales en BigQuery
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            <em>Project ID = `dashboards-api-chartmetric`</em>
          </p>
          
          <div className="grid gap-4 md:grid-cols-2">
            {data.mmm.datasets.map((dataset: any, index: number) => (
              <div key={index} className="border-2 border-black rounded-lg p-4 bg-gray-50">
                <h4 className="font-bold text-black mb-2">{dataset.canal}</h4>
                <p className="text-sm text-gray-600 mb-2 font-mono">
                  {dataset.tabla}
                </p>
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-gray-700">Campos:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    {dataset.campos.map((campo: string, campoIndex: number) => (
                      <li key={campoIndex} className="font-mono bg-white px-2 py-1 rounded border">
                        {campo}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="text-center py-8">
          <a
            href="/mmm/results"
            className="inline-block bg-black text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-800 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
            aria-label="Ver resultados del modelo Robyn MMM"
          >
            Ver resultados del modelo
          </a>
        </section>
      </div>
    </div>
  )

  return (
    <div className={activeTab === "mmm" ? "h-[calc(100vh-4rem)] bg-white" : "p-4 h-[calc(100vh-4rem)]"}>
      {activeTab === "mmm" ? (
        renderMMMContent()
      ) : (
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
      )}
    </div>
  )
}