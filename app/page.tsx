import { parseGames } from "@/lib/games"
import { GameLibrary } from "@/components/game-library"

// ISR: Revalidate a cada 5 minutos para pegar novos dados
export const revalidate = 300

export default async function Page() {
  const games = await parseGames()

  return <GameLibrary games={games} />
}
