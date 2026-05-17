import { notFound } from "next/navigation"
import { parseGames } from "@/lib/games"
import { GameDetailView } from "@/components/game-detail-view"

interface PageProps {
  params: Promise<{ id: string }>
}

// ISR: Revalidate a cada 5 minutos para pegar novos jogos
export const revalidate = 300

export default async function GamePage({ params }: PageProps) {
  const { id } = await params
  const games = await parseGames()
  const game = games.find((g) => g.id === id)

  if (!game) {
    notFound()
  }

  return <GameDetailView game={game} />
}
