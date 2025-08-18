const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const url = new URL(req.url)
    const message = url.searchParams.get('message')
    const timestamp = url.searchParams.get('timestamp')

    if (!message) {
      return new Response(
        JSON.stringify({ error: 'Message parameter is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      )
    }

    // Make request to N8N webhook
    const n8nUrl = `https://runtyaxis.app.n8n.cloud/webhook-test/d65901ce-ecad-4459-bc98-6deb34f5ea48?message=${encodeURIComponent(message)}&timestamp=${encodeURIComponent(timestamp || new Date().toISOString())}`
    
    const response = await fetch(n8nUrl, {
      method: 'GET',
    })

    const responseText = await response.text()

    return new Response(responseText, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain',
      },
    })

  } catch (error) {
    console.error('Error proxying to N8N:', error)
    return new Response(
      'Error connecting to N8N webhook',
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'text/plain' } 
      }
    )
  }
})