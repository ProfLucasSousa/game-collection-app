import { parseGames } from "@/lib/games"
import { GameLibrary } from "@/components/game-library"

export default async function Page() {
  const games = await parseGames()

  return <GameLibrary games={games} />
}
