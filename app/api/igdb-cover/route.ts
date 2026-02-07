import { NextRequest, NextResponse } from "next/server"

// Cache de token OAuth
let cachedToken: { token: string; expiresAt: number } | null = null

async function getAccessToken(): Promise<string> {
  // Verifica se o token em cache ainda é válido
  if (cachedToken && cachedToken.expiresAt > Date.now()) {
    return cachedToken.token
  }

  const clientId = process.env.IGDB_CLIENT_ID
  const clientSecret = process.env.IGDB_CLIENT_SECRET

  if (!clientId || !clientSecret) {
    throw new Error("IGDB credentials not configured")
  }

  // Solicita novo token OAuth
  const response = await fetch(
    `https://id.twitch.tv/oauth2/token?client_id=${clientId}&client_secret=${clientSecret}&grant_type=client_credentials`,
    { method: "POST" }
  )

  if (!response.ok) {
    throw new Error("Failed to get IGDB access token")
  }

  const data = await response.json()

  // Armazena o token no cache (expira 5 minutos antes do tempo real)
  cachedToken = {
    token: data.access_token,
    expiresAt: Date.now() + (data.expires_in - 300) * 1000,
  }

  return data.access_token
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const gameName = searchParams.get("name")

    if (!gameName) {
      return NextResponse.json({ error: "Game name is required" }, { status: 400 })
    }

    const clientId = process.env.IGDB_CLIENT_ID
    if (!clientId) {
      return NextResponse.json(
        { error: "IGDB credentials not configured" },
        { status: 500 }
      )
    }

    // Obtém o token de acesso
    const accessToken = await getAccessToken()

    // Busca o jogo na IGDB
    const response = await fetch("https://api.igdb.com/v4/games", {
      method: "POST",
      headers: {
        "Client-ID": clientId,
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "text/plain",
      },
      body: `
        search "${gameName}";
        fields name, cover.url, cover.image_id;
        limit 1;
      `,
    })

    if (!response.ok) {
      console.error("IGDB API error:", response.status, response.statusText)
      return new NextResponse(null, { status: 404 })
    }

    const games = await response.json()

    if (!games || games.length === 0 || !games[0].cover?.image_id) {
      return new NextResponse(null, { status: 404 })
    }

    const game = games[0]
    const imageId = game.cover.image_id
    
    // Faz proxy da imagem da IGDB
    const imageUrl = `https://images.igdb.com/igdb/image/upload/t_cover_big/${imageId}.jpg`
    
    const imageResponse = await fetch(imageUrl)
    
    if (!imageResponse.ok) {
      return new NextResponse(null, { status: 404 })
    }

    // Retorna a imagem com headers apropriados de cache
    const imageBuffer = await imageResponse.arrayBuffer()
    
    return new NextResponse(imageBuffer, {
      headers: {
        "Content-Type": "image/jpeg",
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    })
  } catch (error) {
    console.error("Error fetching game cover:", error)
    return new NextResponse(null, { status: 500 })
  }
}
