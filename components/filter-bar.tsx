"use client"

import { motion } from "framer-motion"
import { platformIconMap, platformColorMap } from "./platform-icons"

interface FilterBarProps {
  search: string
  onSearchChange: (value: string) => void
  genres: string[]
  selectedGenres: string[]
  onGenreToggle: (genre: string) => void
  sources: Map<string, number>
  selectedSources: string[]
  onSourceToggle: (source: string) => void
  classifications: Map<string, number>
  selectedClassifications: string[]
  onClassificationToggle: (classification: string) => void
  totalFiltered: number
  totalGames: number
  onClearFilters: () => void
}

export function FilterBar({
  search,
  onSearchChange,
  genres,
  selectedGenres,
  onGenreToggle,
  sources,
  selectedSources,
  onSourceToggle,
  classifications,
  selectedClassifications,
  onClassificationToggle,
  totalFiltered,
  totalGames,
  onClearFilters,
}: FilterBarProps) {
  const hasFilters =
    selectedGenres.length > 0 ||
    selectedSources.length > 0 ||
    selectedClassifications.length > 0 ||
    search.length > 0

  return (
    <div className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-4 py-4 lg:px-6">
        {/* Search bar */}
        <div className="relative mb-4">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar jogos..."
            className="w-full rounded-lg border border-border bg-card pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/30 transition-colors"
            aria-label="Search games"
          />
          {search && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}
        </div>

        {/* Platform filter */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Plataforma / Origem
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(sources.entries()).map(([source, count]) => {
              const isActive = selectedSources.includes(source)
              const Icon = platformIconMap[source]
              const color = platformColorMap[source]

              return (
                <motion.button
                  key={source}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onSourceToggle(source)}
                  className={`relative inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? `border-primary/50 bg-primary/10 ${color}`
                      : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Filter by ${source}: ${count} games`}
                >
                  {Icon && <Icon size={14} />}
                  <span>{source}</span>
                  <span
                    className={`ml-0.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                      isActive
                        ? "bg-primary/20 text-primary"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Classification filter */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Classificacao
          </h3>
          <div className="flex flex-wrap gap-2">
            {Array.from(classifications.entries()).map(
              ([classification, count]) => {
                const isActive =
                  selectedClassifications.includes(classification)
                const badgeColor =
                  classification === "AAA"
                    ? "border-primary/50 bg-primary/10 text-primary"
                    : classification === "AA"
                      ? "border-blue-500/50 bg-blue-500/10 text-blue-400"
                      : "border-amber-500/50 bg-amber-500/10 text-amber-400"
                const inactiveColor = "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"

                return (
                  <motion.button
                    key={classification}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => onClassificationToggle(classification)}
                    className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${
                      isActive ? badgeColor : inactiveColor
                    }`}
                    aria-pressed={isActive}
                    aria-label={`Filter by ${classification}: ${count} games`}
                  >
                    {classification}
                    <span
                      className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold ${
                        isActive
                          ? "bg-foreground/10"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {count}
                    </span>
                  </motion.button>
                )
              }
            )}
          </div>
        </div>

        {/* Genre filter */}
        <div className="mb-3">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
            Generos
          </h3>
          <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
            {genres.map((genre) => {
              const isActive = selectedGenres.includes(genre)
              return (
                <motion.button
                  key={genre}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onGenreToggle(genre)}
                  className={`rounded-lg border px-2.5 py-1 text-[11px] font-medium transition-all ${
                    isActive
                      ? "border-primary/50 bg-primary/10 text-primary"
                      : "border-border bg-card text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                  aria-pressed={isActive}
                  aria-label={`Filter by genre: ${genre}`}
                >
                  {genre}
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Results count & clear */}
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">
            <span className="font-mono font-bold text-foreground">
              {totalFiltered}
            </span>{" "}
            de{" "}
            <span className="font-mono font-bold text-foreground">
              {totalGames}
            </span>{" "}
            jogos
          </p>
          {hasFilters && (
            <motion.button
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              onClick={onClearFilters}
              className="rounded-lg border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
            >
              Limpar filtros
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}
