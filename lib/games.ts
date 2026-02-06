import gamesData from "@/data/games.json"
import type { GameRaw, Game } from "./types"

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
}

export function parseGames(): Game[] {
  return (gamesData as GameRaw[]).map((raw) => {
    const sources = Array.isArray(raw.Source) ? raw.Source : [raw.Source]
    return {
      id: slugify(raw.Name),
      name: raw.Name,
      description: raw.Description,
      releaseYear: raw.ReleaseYear,
      genres: raw.Genres,
      sources,
      classification: raw.Classification,
      coverUrl: null,
      screenshotUrl: null,
    }
  })
}

export function getAllGenres(games: Game[]): Map<string, number> {
  const genreMap = new Map<string, number>()
  games.forEach((game) => {
    game.genres.forEach((genre) => {
      genreMap.set(genre, (genreMap.get(genre) || 0) + 1)
    })
  })
  return new Map([...genreMap.entries()].sort((a, b) => b[1] - a[1]))
}

export function getAllSources(games: Game[]): Map<string, number> {
  const sourceMap = new Map<string, number>()
  games.forEach((game) => {
    game.sources.forEach((source) => {
      sourceMap.set(source, (sourceMap.get(source) || 0) + 1)
    })
  })
  return new Map([...sourceMap.entries()].sort((a, b) => b[1] - a[1]))
}

export function getAllClassifications(games: Game[]): Map<string, number> {
  const classMap = new Map<string, number>()
  games.forEach((game) => {
    classMap.set(game.classification, (classMap.get(game.classification) || 0) + 1)
  })
  return new Map([...classMap.entries()].sort((a, b) => b[1] - a[1]))
}

export function filterGames(
  games: Game[],
  search: string,
  genres: string[],
  sources: string[],
  classifications: string[]
): Game[] {
  return games.filter((game) => {
    const matchSearch =
      !search ||
      game.name.toLowerCase().includes(search.toLowerCase()) ||
      game.description.toLowerCase().includes(search.toLowerCase())

    const matchGenre =
      genres.length === 0 || game.genres.some((g) => genres.includes(g))

    const matchSource =
      sources.length === 0 || game.sources.some((s) => sources.includes(s))

    const matchClassification =
      classifications.length === 0 ||
      classifications.includes(game.classification)

    return matchSearch && matchGenre && matchSource && matchClassification
  })
}
