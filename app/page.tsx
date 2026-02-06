import { parseGames } from "@/lib/games"
import { GameLibrary } from "@/components/game-library"

export default function Page() {
  const games = parseGames()

  return <GameLibrary games={games} />
}
