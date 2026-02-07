"use client"

import { useState, useMemo, useCallback, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Game } from "@/lib/types"
import {
  filterGames,
  getAllGenres,
  getAllSources,
  getAllClassifications,
} from "@/lib/games"
import { Header } from "./header"
import { FilterBar } from "./filter-bar"
import { GameCard, GameCardSkeleton } from "./game-card"

const GAMES_PER_PAGE = 24

interface GameLibraryProps {
  games: Game[]
}

export function GameLibrary({ games }: GameLibraryProps) {
  const [search, setSearch] = useState("")
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [selectedClassifications, setSelectedClassifications] = useState<
    string[]
  >([])
  const [visibleCount, setVisibleCount] = useState(GAMES_PER_PAGE)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const allGenres = useMemo(() => {
    const genreMap = getAllGenres(games)
    return Array.from(genreMap.keys())
  }, [games])

  const allSources = useMemo(() => getAllSources(games), [games])
  const allClassifications = useMemo(
    () => getAllClassifications(games),
    [games]
  )

  const filteredGames = useMemo(() => {
    return filterGames(
      games,
      search,
      selectedGenres,
      selectedSources,
      selectedClassifications
    )
  }, [games, search, selectedGenres, selectedSources, selectedClassifications])

  const visibleGames = useMemo(
    () => filteredGames.slice(0, visibleCount),
    [filteredGames, visibleCount]
  )

  const hasMore = visibleCount < filteredGames.length

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(GAMES_PER_PAGE)
  }, [search, selectedGenres, selectedSources, selectedClassifications])

  // Infinite scroll observer
  useEffect(() => {
    if (!loadMoreRef.current || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true)
          // Small delay for smooth loading feel
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + GAMES_PER_PAGE, filteredGames.length)
            )
            setIsLoadingMore(false)
          }, 300)
        }
      },
      { rootMargin: "200px" }
    )

    observer.observe(loadMoreRef.current)
    return () => observer.disconnect()
  }, [hasMore, isLoadingMore, filteredGames.length])

  const handleGenreToggle = useCallback((genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    )
  }, [])

  const handleSourceToggle = useCallback((source: string) => {
    setSelectedSources((prev) =>
      prev.includes(source)
        ? prev.filter((s) => s !== source)
        : [...prev, source]
    )
  }, [])

  const handleClassificationToggle = useCallback(
    (classification: string) => {
      setSelectedClassifications((prev) =>
        prev.includes(classification)
          ? prev.filter((c) => c !== classification)
          : [...prev, classification]
      )
    },
    []
  )

  const handleClearFilters = useCallback(() => {
    setSearch("")
    setSelectedGenres([])
    setSelectedSources([])
    setSelectedClassifications([])
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Header totalGames={games.length} />
      
      <div className="flex">
        {/* Left sidebar for filters */}
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          genres={allGenres}
          selectedGenres={selectedGenres}
          onGenreToggle={handleGenreToggle}
          sources={allSources}
          selectedSources={selectedSources}
          onSourceToggle={handleSourceToggle}
          classifications={allClassifications}
          selectedClassifications={selectedClassifications}
          onClassificationToggle={handleClassificationToggle}
          totalFiltered={filteredGames.length}
          totalGames={games.length}
          onClearFilters={handleClearFilters}
        />

        {/* Main content area */}
        <main className="flex-1 px-4 py-6 lg:px-6 lg:pl-4">
        <AnimatePresence mode="wait">
          {filteredGames.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center py-24 gap-4"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted">
                <svg
                  className="h-8 w-8 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <div className="text-center">
                <h3 className="text-lg font-semibold text-foreground">
                  Nenhum jogo encontrado
                </h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Tente ajustar os filtros ou a busca
                </p>
              </div>
              <button
                onClick={handleClearFilters}
                className="rounded-lg border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/20 transition-colors"
              >
                Limpar filtros
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
                {visibleGames.map((game, index) => (
                  <GameCard key={game.id} game={game} index={index} />
                ))}
                {isLoadingMore &&
                  Array.from({ length: 6 }).map((_, i) => (
                    <GameCardSkeleton key={`skeleton-${i}`} />
                  ))}
              </div>

              {/* Infinite scroll trigger */}
              {hasMore && (
                <div
                  ref={loadMoreRef}
                  className="flex items-center justify-center py-12"
                >
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:200ms]" />
                    <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse [animation-delay:400ms]" />
                    <span className="ml-2 text-xs font-medium">
                      Carregando mais jogos...
                    </span>
                  </div>
                </div>
              )}

              {!hasMore && filteredGames.length > GAMES_PER_PAGE && (
                <div className="flex items-center justify-center py-12">
                  <p className="text-xs text-muted-foreground">
                    Todos os{" "}
                    <span className="font-mono font-bold text-foreground">
                      {filteredGames.length}
                    </span>{" "}
                    jogos carregados
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
