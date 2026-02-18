import { notFound } from "next/navigation"
import { parseGames } from "@/lib/games"
import { GameDetailView } from "@/components/game-detail-view"

interface PageProps {
  params: Promise<{ id: string }>
}

export async function generateStaticParams() {
  const games = parseGames()
  return games.map((game) => ({
    id: game.id,
  }))
}

export default async function GamePage({ params }: PageProps) {
  const { id } = await params
  const games = parseGames()
  const game = games.find((g) => g.id === id)

  if (!game) {
    notFound()
  }

  return <GameDetailView game={game} />
}
