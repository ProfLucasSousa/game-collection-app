"use client"

import { useMemo } from "react"
import Link from "next/link"
import { Sparkles, Trophy, Clock, ChevronRight } from "lucide-react"
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
  const dailySeed = useMemo(() => getDailySeed(), [])

  // Filtrar jogos AAA
  const aaaGames = useMemo(() => {
    const filtered = games.filter((game) => game.classification === "AAA")
    return getDailyGames(filtered, 6, dailySeed)
  }, [games, dailySeed])

  // Filtrar clássicos (jogos mais antigos, antes de 2015) excluindo os já selecionados em AAA
  const classicGames = useMemo(() => {
    const aaaGameIds = new Set(aaaGames.map((game) => game.id))
    const filtered = games.filter(
      (game) => game.releaseYear < 2015 && !aaaGameIds.has(game.id)
    )
    return getDailyGames(filtered, 6, dailySeed + 1) // +1 para seed diferente
  }, [games, dailySeed, aaaGames])

  return (
    <div className="space-y-8 mb-8">
      {/* Jogos AAA */}
      <Card className="border-primary/20 bg-gradient-to-br from-card to-primary/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Trophy className="h-6 w-6 text-primary" />
            Jogos AAA em Destaque
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Atualizado diariamente
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {aaaGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-purple-500/20 to-pink-500/20">
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
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-primary/90 text-primary-foreground border-primary">
                      AAA
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-primary transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-1">
                        {game.sources.slice(0, 3).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={12} /> : null
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
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Clock className="h-6 w-6 text-amber-500" />
            Clássicos Imperdíveis
            <Badge variant="outline" className="ml-auto text-xs">
              <Sparkles className="h-3 w-3 mr-1" />
              Atualizado diariamente
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {classicGames.map((game) => (
              <Link
                key={game.id}
                href={`/game/${game.id}`}
                className="group relative overflow-hidden rounded-lg border border-border bg-card hover:border-amber-500/50 transition-all hover:shadow-lg hover:shadow-amber-500/10"
              >
                <div className="aspect-video relative overflow-hidden bg-gradient-to-br from-amber-500/20 to-orange-500/20">
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
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-amber-500/90 text-white border-amber-500">
                      Clássico
                    </Badge>
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="font-semibold text-sm line-clamp-2 mb-1 group-hover:text-amber-500 transition-colors">
                      {game.name}
                    </h3>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>{game.releaseYear}</span>
                      <div className="flex items-center gap-1">
                        {game.sources.slice(0, 3).map((source) => {
                          const Icon = platformIconMap[source]
                          return Icon ? <Icon key={source} size={12} /> : null
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
