"use client"

import { useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
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
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
