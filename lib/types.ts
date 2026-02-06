export interface GameRaw {
  Name: string
  Description: string
  ReleaseYear: number
  Genres: string[]
  Source: string | string[]
  Classification: string
}

export interface Game {
  id: string
  name: string
  description: string
  releaseYear: number
  genres: string[]
  sources: string[]
  classification: string
  coverUrl: string | null
  screenshotUrl: string | null
}

export type PlatformSource =
  | "Steam"
  | "Epic"
  | "Xbox PC"
  | "Xbox Console"
  | "GOG"
  | "Ubisoft"
  | "EA"
  | "Amazon"

export type Classification = "AAA" | "AA" | "Indie"

export interface FilterState {
  search: string
  genres: string[]
  sources: string[]
  classifications: string[]
}
