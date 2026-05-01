"use client"

import { useMemo, useState, useEffect } from "react"
import Link from "next/link"
import { Sparkles, Trophy, Clock, Gamepad2, Monitor } from "lucide-react"
import { Game } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { platformIconMap } from "@/components/platform-icons"

interface FeaturedGamesProps {
  games: Game[]
}

// Função para gerar jogos do dia baseado na data
function getDailyGames(games: Game[], count: number, seed: number): Game[] {
  // Shuffle usando seed baseado na data
  const shuffled = [...games].sort((a, b) => {
    const hashA = hashCode(a.id + seed.toString())
    const hashB = hashCode(b.id + seed.toString())
    return hashA - hashB
  })
  
  return shuffled.slice(0, count)
}

// Função de hash simples para consistência
function hashCode(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i)
    hash = (hash << 5) - hash + char
    hash = hash & hash // Convert to 32bit integer
  }
  return Math.abs(hash)
}

// Função para obter seed do dia (muda à meia-noite)
function getDailySeed(): number {
  const now = new Date()
  const year = now.getFullYear()
  const month = now.getMonth() + 1
  const day = now.getDate()
  return year * 10000 + month * 100 + day
}

export function FeaturedGames({ games }: FeaturedGamesProps) {
  const [dailySeed, setDailySeed] = useState(getDailySeed())

  // Atualizar seed quando o dia mudar
  useEffect(() => {
    const updateSeed = () => {
      setDailySeed(getDailySeed())
    }

    // Verificar a cada minuto se o dia mudou
    const interval = setInterval(updateSeed, 60000)
    return () => clearInterval(interval)
  }, [])

  // Filtrar jogos AAA
  const aaaGames = useMemo(() => {
    const filtered = games.filter((game) => game.classification === "AAA")
    return getDailyGames(filtered, 4, dailySeed)
  }, [games, dailySeed])

  // Filtrar clássicos (jogos mais antigos, antes de 2015) excluindo os já selecionados em AAA
  const classicGames = useMemo(() => {
    const aaaGameIds = new Set(aaaGames.map((game) => game.id))
    const filtered = games.filter(
      (game) => game.releaseYear < 2015 && !aaaGameIds.has(game.id)
    )
    return getDailyGames(filtered, 4, dailySeed + 1) // +1 para seed diferente
  }, [games, dailySeed, aaaGames])

  // Filtrar jogos de Xbox Console
  const xboxGames = useMemo(() => {
    const aaaGameIds = new Set(aaaGames.map((game) => game.id))
    const classicGameIds = new Set(classicGames.map((game) => game.id))
    const filtered = games.filter(
      (game) =>
        game.sources.includes("Xbox Console") &&
        !aaaGameIds.has(game.id) &&
        !classicGameIds.has(game.id)
    )
    return getDailyGames(filtered, 4, dailySeed + 2)
  }, [games, dailySeed, aaaGames, classicGames])

  // Filtrar jogos de PC (todas as outras fontes: Steam, Amazon, Epic, etc.)
  const pcGames = useMemo(() => {
    const aaaGameIds = new Set(aaaGames.map((game) => game.id))
    const classicGameIds = new Set(classicGames.map((game) => game.id))
    const xboxGameIds = new Set(xboxGames.map((game) => game.id))
    const filtered = games.filter(
      (game) =>
        !game.sources.includes("Xbox Console") &&
        !aaaGameIds.has(game.id) &&
        !classicGameIds.has(game.id) &&
        !xboxGameIds.has(game.id)
    )
    return getDailyGames(filtered, 4, dailySeed + 3)
  }, [games, dailySeed, aaaGames, classicGames, xboxGames])

  return (
    <div className="space-y-6 mb-8">
      {/* Jogos AAA */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Trophy className="h-5 w-5 text-primary" />
            Jogos AAA em Destaque
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Diário
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {aaaGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                  <img
                    src={`/covers/${game.id}.jpg`}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* AAA Badge */}
                  <div className="absolute top-1 left-1">
                    <Badge className="bg-primary/90 text-primary-foreground border-primary text-xs">
                      AAA
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="font-semibold text-xs line-clamp-2 mb-0.5 group-hover:text-primary transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-0.5">
                        {game.sources.slice(0, 2).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={10} /> : null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Clássicos Imperdíveis */}
      <Card className="border-amber-500/20 bg-gradient-to-br from-card to-amber-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Clock className="h-5 w-5 text-amber-500" />
            Clássicos Imperdíveis
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Diário
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {classicGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-500/20">
                  <img
                    src={`/covers/${game.id}.jpg`}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Classic Badge */}
                  <div className="absolute top-1 left-1">
                    <Badge className="bg-amber-500/90 text-white border-amber-500 text-xs">
                      Clássico
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="font-semibold text-xs line-clamp-2 mb-0.5 group-hover:text-amber-500 transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-0.5">
                        {game.sources.slice(0, 2).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={10} /> : null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Xbox Console */}
      <Card className="border-green-500/20 bg-gradient-to-br from-card to-green-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Gamepad2 className="h-5 w-5 text-green-500" />
            Xbox Console
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Diário
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {xboxGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-green-500/50 transition-all hover:shadow-lg hover:shadow-green-500/10"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-green-500/20 to-emerald-500/20">
                  <img
                    src={`/covers/${game.id}.jpg`}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* Xbox Badge */}
                  <div className="absolute top-1 left-1">
                    <Badge className="bg-green-500/90 text-white border-green-500 text-xs">
                      Xbox
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="font-semibold text-xs line-clamp-2 mb-0.5 group-hover:text-green-500 transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-0.5">
                        {game.sources.slice(0, 2).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={10} /> : null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* PC Games */}
      <Card className="border-blue-500/20 bg-gradient-to-br from-card to-blue-500/5">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Monitor className="h-5 w-5 text-blue-500" />
            Recomendações PC
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Diário
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {pcGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-blue-500/50 transition-all hover:shadow-lg hover:shadow-blue-500/10"
              >
                <div className="aspect-[3/4] relative overflow-hidden bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
                  <img
                    src={`/covers/${game.id}.jpg`}
                    alt={game.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.style.display = "none"
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
                  
                  {/* PC Badge */}
                  <div className="absolute top-1 left-1">
                    <Badge className="bg-blue-500/90 text-white border-blue-500 text-xs">
                      PC
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-2">
                    <h3 className="font-semibold text-xs line-clamp-2 mb-0.5 group-hover:text-blue-500 transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-0.5">
                        {game.sources.slice(0, 2).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={10} /> : null
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
