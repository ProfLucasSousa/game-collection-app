"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import type { Game } from "@/lib/types"
import { platformIconMap } from "./platform-icons"

interface GameModalProps {
  game: Game
  onClose: () => void
}

export function GameModal({ game, onClose }: GameModalProps) {
  const coverUrl = `/covers/${game.id}.jpg`

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    },
    [onClose]
  )

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.body.style.overflow = ""
    }
  }, [handleKeyDown])

  const classificationColor =
    game.classification === "AAA"
      ? "bg-primary/20 text-primary border-primary/30"
      : game.classification === "AA"
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : "bg-amber-500/20 text-amber-400 border-amber-500/30"

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-md p-4"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label={`Details for ${game.name}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl border border-border bg-card shadow-2xl shadow-primary/5"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-card/80 backdrop-blur-sm border border-border text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
            aria-label="Close modal"
          >
            <svg
              width="16"
              height="16"
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

          {/* Hero image */}
          <div className="relative aspect-video w-full overflow-hidden bg-muted">
            <img
              src={coverUrl || "/placeholder.svg"}
              alt={`${game.name} cover art`}
              className="h-full w-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement
                target.style.display = "none"
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

            {/* Title overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <span
                  className={`inline-flex items-center rounded-md border px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${classificationColor}`}
                >
                  {game.classification}
                </span>
                <span className="inline-flex items-center rounded-md border border-border/50 bg-card/60 px-2 py-0.5 text-xs font-mono text-muted-foreground backdrop-blur-sm">
                  {game.releaseYear}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-foreground text-balance">
                {game.name}
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-col gap-5 p-6">
            {/* Platforms */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Plataformas
              </h4>
              <div className="flex flex-wrap gap-2">
                {game.sources.map((source) => {
                  const Icon = platformIconMap[source]
                  if (!Icon) return null
                  return (
                    <span
                      key={source}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-secondary px-3 py-1.5 text-xs font-medium"
                    >
                      <Icon size={14} />
                      {source}
                    </span>
                  )
                })}
              </div>
            </div>

            {/* Genres */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Generos
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {game.genres.map((genre) => (
                  <span
                    key={genre}
                    className="rounded-lg bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                Descricao
              </h4>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {game.description}
              </p>
            </div>

            {/* Trailer */}
            {game.trailerYoutube && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Trailer
                </h4>
                <a
                  href={game.trailerYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-4 py-2.5 text-sm font-medium hover:bg-secondary/80 hover:border-red-500/50 transition-all group"
                >
                  <svg
                    className="h-5 w-5 text-red-500 group-hover:scale-110 transition-transform"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                  </svg>
                  <span>Assistir no YouTube</span>
                </a>
              </div>
            )}

            {/* Store Links */}
            {game.storeLinks && Object.keys(game.storeLinks).length > 0 && (
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                  Comprar em
                </h4>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(game.storeLinks).map(([storeName, storeUrl]) => {
                    if (!storeUrl) return null
                    const Icon = platformIconMap[storeName]
                    return (
                      <a
                        key={storeName}
                        href={storeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg border border-border bg-secondary px-3 py-2 text-sm font-medium hover:bg-secondary/80 hover:border-primary/50 transition-all group"
                      >
                        {Icon && <Icon size={16} />}
                        <span>{storeName}</span>
                        <svg
                          className="h-3.5 w-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )
                  })}
                </div>
              </div>
            )}

            {/* View Details Button */}
            <div className="pt-4 border-t border-border">
              <Link
                href={`/game/${game.id}`}
                className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-all group"
              >
                <span>Ver Mais Detalhes</span>
                <svg
                  className="h-4 w-4 group-hover:translate-x-1 transition-transform"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
