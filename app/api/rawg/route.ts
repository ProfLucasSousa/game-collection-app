import { NextRequest, NextResponse } from "next/server"
import { translate as googleTranslate } from "@vitalets/google-translate-api"

const RAWG_API_KEY = process.env.NEXT_PUBLIC_RAWG_API_KEY

// Função para traduzir texto para português
async function translateToPortuguese(text: string): Promise<string> {
  if (!text) return text

  try {
    const result = await googleTranslate(text, { from: "en", to: "pt" })
    return result.text
  } catch (error) {
    console.error("Translation error:", error)
    // Se a tradução falhar, retorna o texto original
    return text
  }
}

interface RAWGGameDetails {
  id: number
  name: string
  description_raw: string
  background_image: string
  background_image_additional: string
  rating: number
  ratings_count: number
  metacritic: number | null
  platforms: Array<{
    platform: {
      id: number
      name: string
      slug: string
    }
    requirements: {
      minimum?: string
      recommended?: string
    } | null
  }>
  genres: Array<{ id: number; name: string; slug: string }>
  developers: Array<{ id: number; name: string; slug: string }>
  publishers: Array<{ id: number; name: string; slug: string }>
  released: string
  website: string
  reddit_url: string
  clip: {
    clip: string
    video: string
  } | null
}

interface RAWGScreenshot {
  id: number
  image: string
  width: number
  height: number
}

interface RAWGMovie {
  id: number
  name: string
  preview: string
  data: {
    "480": string
    max: string
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const gameName = searchParams.get("game")
  const type = searchParams.get("type") // 'details', 'screenshots', 'movies'

  if (!gameName) {
    return NextResponse.json({ error: "Game name is required" }, { status: 400 })
  }

  if (!RAWG_API_KEY) {
    return NextResponse.json(
      { error: "RAWG API key is not configured" },
      { status: 500 }
    )
  }

  try {
    // First, search for the game to get its ID
    const searchUrl = `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(gameName)}&page_size=1`
    const searchResponse = await fetch(searchUrl)
    const searchData = await searchResponse.json()

    if (!searchData.results || searchData.results.length === 0) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 })
    }

    const gameId = searchData.results[0].id

    // Based on type, fetch different data
    switch (type) {
      case "screenshots": {
        const screenshotsUrl = `https://api.rawg.io/api/games/${gameId}/screenshots?key=${RAWG_API_KEY}`
        const screenshotsResponse = await fetch(screenshotsUrl)
        const screenshotsData: { results: RAWGScreenshot[] } =
          await screenshotsResponse.json()
        return NextResponse.json(screenshotsData.results)
      }

      case "movies": {
        const moviesUrl = `https://api.rawg.io/api/games/${gameId}/movies?key=${RAWG_API_KEY}`
        const moviesResponse = await fetch(moviesUrl)
        const moviesData: { results: RAWGMovie[] } = await moviesResponse.json()
        return NextResponse.json(moviesData.results)
      }

      case "details":
      default: {
        const detailsUrl = `https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`
        const detailsResponse = await fetch(detailsUrl)
        const detailsData: RAWGGameDetails = await detailsResponse.json()
        
        // Traduzir descrição para português
        if (detailsData.description_raw) {
          detailsData.description_raw = await translateToPortuguese(
            detailsData.description_raw
          )
        }
        
        return NextResponse.json(detailsData)
      }
    }
  } catch (error) {
    console.error("RAWG API Error:", error)
    return NextResponse.json(
      { error: "Failed to fetch game data" },
      { status: 500 }
    )
  }
}
