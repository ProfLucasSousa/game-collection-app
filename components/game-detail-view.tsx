"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Calendar, Gamepad2, Tag, ExternalLink, Monitor, AlertCircle, Star } from "lucide-react"
import { Game } from "@/lib/types"
import { platformIconMap } from "@/components/platform-icons"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { ReportErrorDialog } from "@/components/report-error-dialog"

interface GameDetailViewProps {
  game: Game
}

interface RAWGDetails {
  id: number
  name: string
  description_raw: string
  background_image: string
  platforms: Array<{
    platform: { name: string }
    requirements: {
      minimum?: string
      recommended?: string
    } | null
  }>
  developers: Array<{ name: string }>
  publishers: Array<{ name: string }>
  released: string
  rating: number
  ratings_count: number
  ratings: Array<{
    id: number
    title: string
    count: number
    percent: number
  }>
  metacritic: number | null
}

interface Screenshot {
  id: number
  image: string
}

interface Movie {
  id: number
  name: string
  preview: string
  data: {
    "480": string
    max: string
  }
}

export function GameDetailView({ game }: GameDetailViewProps) {
  const [rawgDetails, setRawgDetails] = useState<RAWGDetails | null>(null)
  const [screenshots, setScreenshots] = useState<Screenshot[]>([])
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGameData() {
      setLoading(true)
      try {
        // Fetch game details
        const detailsRes = await fetch(
          `/api/rawg?game=${encodeURIComponent(game.name)}&type=details`
        )
        if (detailsRes.ok) {
          const details = await detailsRes.json()
          setRawgDetails(details)
        }

        // Fetch screenshots
        const screenshotsRes = await fetch(
          `/api/rawg?game=${encodeURIComponent(game.name)}&type=screenshots`
        )
        if (screenshotsRes.ok) {
          const screenshotsData = await screenshotsRes.json()
          setScreenshots(screenshotsData)
        }

        // Fetch movies/trailers
        const moviesRes = await fetch(
          `/api/rawg?game=${encodeURIComponent(game.name)}&type=movies`
        )
        if (moviesRes.ok) {
          const moviesData = await moviesRes.json()
          setMovies(moviesData)
        }
      } catch (error) {
        console.error("Error fetching game data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchGameData()
  }, [game.name])

  // Extract YouTube video ID
  const getYouTubeId = (url?: string) => {
    if (!url) return null
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/)
    return match ? match[1] : null
  }

  const youtubeId = getYouTubeId(game.trailerYoutube)

  // Get PC requirements
  const pcRequirements = rawgDetails?.platforms.find((p) =>
    p.platform.name.toLowerCase().includes("pc")
  )?.requirements

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back button and Report Error */}
      <div className="flex items-center justify-between mb-6">
        <Link href="/" className="inline-flex items-center gap-2 hover:underline">
          <ArrowLeft className="h-4 w-4" />
          Voltar para a biblioteca
        </Link>
        <ReportErrorDialog gameName={game.name} gameId={game.id} />
      </div>

      {/* Hero section with cover */}
      <div className="relative w-full h-[400px] rounded-lg overflow-hidden mb-8">
        {rawgDetails?.background_image ? (
          <Image
            src={rawgDetails.background_image}
            alt={game.name}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <Gamepad2 className="h-32 w-32 text-white/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <h1 className="text-4xl font-bold mb-2">{game.name}</h1>
          <div className="flex flex-wrap gap-2">
            {game.genres.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left sidebar - Game info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-2">
                <Calendar className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Ano de Lançamento</p>
                  <p className="text-sm text-muted-foreground">{game.releaseYear}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-2">
                <Tag className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Classificação</p>
                  <p className="text-sm text-muted-foreground">{game.classification}</p>
                </div>
              </div>

              <Separator />

              <div className="flex items-start gap-2">
                <Gamepad2 className="h-5 w-5 mt-0.5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Plataformas</p>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {game.sources.map((source) => {
                      const Icon = platformIconMap[source]
                      return (
                        <span
                          key={source}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-2.5 py-1.5 text-xs font-medium"
                        >
                          {Icon && <Icon size={14} />}
                          {source}
                        </span>
                      )
                    })}
                  </div>
                </div>
              </div>

              {rawgDetails?.developers && rawgDetails.developers.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Desenvolvedora</p>
                    <p className="text-sm text-muted-foreground">
                      {rawgDetails.developers.map((d) => d.name).join(", ")}
                    </p>
                  </div>
                </>
              )}

              {rawgDetails?.publishers && rawgDetails.publishers.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <p className="text-sm font-medium">Publicadora</p>
                    <p className="text-sm text-muted-foreground">
                      {rawgDetails.publishers.map((p) => p.name).join(", ")}
                    </p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Store links */}
          {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Links da Loja</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {Object.entries(game.storeLinks).map(([store, url]) =>
                  url ? (
                    <Button key={store} variant="outline" className="w-full" asChild>
                      <a href={url} target="_blank" rel="noopener noreferrer">
                        {store}
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  ) : null
                )}
              </CardContent>
            </Card>
          )}
        </div>

        {/* Right content - Description, media, requirements, screenshots */}
        <div className="lg:col-span-3 space-y-8">
          {/* Description Section */}
          <Card>
            <CardHeader>
              <CardTitle>Descrição</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              ) : (
                <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
                  {rawgDetails?.description_raw || game.description}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Reviews & Ratings Section */}
          {!loading && rawgDetails && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Reviews & Avaliações
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {rawgDetails.rating && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Avaliação Geral</p>
                      <div className="flex items-center gap-2">
                        <Star className="h-5 w-5 fill-yellow-500 text-yellow-500" />
                        <p className="text-2xl font-bold">{rawgDetails.rating.toFixed(1)}</p>
                        <p className="text-sm text-muted-foreground">/ 5.0</p>
                      </div>
                      {rawgDetails.ratings_count && (
                        <p className="text-xs text-muted-foreground">
                          {rawgDetails.ratings_count.toLocaleString("pt-BR")} avaliações
                        </p>
                      )}
                    </div>
                  )}
                  
                  {rawgDetails.metacritic && (
                    <div className="space-y-1">
                      <p className="text-sm text-muted-foreground">Metacritic Score</p>
                      <div className="flex items-center gap-2">
                        <div
                          className={`px-2 py-1 rounded font-bold ${
                            rawgDetails.metacritic >= 75
                              ? "bg-green-500 text-white"
                              : rawgDetails.metacritic >= 50
                              ? "bg-yellow-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          {rawgDetails.metacritic}
                        </div>
                        <p className="text-sm text-muted-foreground">Crítica Especializada</p>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Media Section */}
          <div className="space-y-4">
            {/* YouTube Trailer */}
            {youtubeId && (
              <Card>
                <CardHeader>
                  <CardTitle>Trailer Oficial</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${youtubeId}`}
                      title={`${game.name} Trailer`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="rounded-lg"
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* RAWG Movies */}
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : (
              movies.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Gameplay Videos</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {movies.slice(0, 3).map((movie) => (
                      <div key={movie.id}>
                        <p className="text-sm font-medium mb-2">{movie.name}</p>
                        <video
                          controls
                          poster={movie.preview}
                          className="w-full rounded-lg"
                        >
                          <source src={movie.data.max} type="video/mp4" />
                          Seu navegador não suporta a tag de vídeo.
                        </video>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              )
            )}
          </div>

          {/* Requirements Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Requisitos do Sistema</h2>
            {loading ? (
              <Skeleton className="h-64 w-full" />
            ) : pcRequirements ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {pcRequirements.minimum && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Requisitos Mínimos
                      </CardTitle>
                      <CardDescription>PC</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-sm text-muted-foreground whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: pcRequirements.minimum }}
                      />
                    </CardContent>
                  </Card>
                )}

                {pcRequirements.recommended && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Monitor className="h-5 w-5" />
                        Requisitos Recomendados
                      </CardTitle>
                      <CardDescription>PC</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div
                        className="text-sm text-muted-foreground whitespace-pre-line"
                        dangerouslySetInnerHTML={{ __html: pcRequirements.recommended }}
                      />
                    </CardContent>
                  </Card>
                )}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Requisitos do sistema não disponíveis para este jogo.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Screenshots Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">Screenshots</h2>
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-64 w-full" />
                ))}
              </div>
            ) : screenshots.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {screenshots.map((screenshot) => (
                  <div
                    key={screenshot.id}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <Image
                      src={screenshot.image}
                      alt={`${game.name} screenshot`}
                      fill
                      className="object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="pt-6">
                  <p className="text-center text-muted-foreground">
                    Nenhuma screenshot disponível para este jogo.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
