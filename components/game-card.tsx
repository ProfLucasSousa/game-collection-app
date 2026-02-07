"use client"

import { useState, useCallback, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import type { Game } from "@/lib/types"
import { platformIconMap } from "./platform-icons"
import { GameModal } from "./game-modal"

interface GameCardProps {
  game: Game
  index: number
}

export function GameCard({ game, index }: GameCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const imageRef = useRef<HTMLImageElement>(null)

  const coverUrl = `/covers/${game.id}.jpg`

  // Verificar se a imagem já está carregada (para eager loading)
  useEffect(() => {
    if (imageRef.current?.complete && imageRef.current.naturalHeight > 0) {
      setImageLoaded(true)
    }
  }, [])

  const classificationColor =
    game.classification === "AAA"
      ? "bg-primary/20 text-primary border-primary/30"
      : game.classification === "AA"
        ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
        : "bg-amber-500/20 text-amber-400 border-amber-500/30"

  const handleImageLoad = useCallback(() => setImageLoaded(true), [])
  const handleImageError = useCallback(() => setImageError(true), [])

  return (
    <>
      <motion.article
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: Math.min(index * 0.02, 0.4) }}
        className="group relative flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 cursor-pointer"
        onClick={() => setShowModal(true)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            setShowModal(true)
          }
        }}
        aria-label={`View details for ${game.name}`}
      >
        {/* Cover Image */}
        <div className="relative aspect-[3/4] w-full overflow-hidden bg-muted">
          {!imageError ? (
            <img
              ref={imageRef}
              src={coverUrl}
              alt={`${game.name} cover art`}
              className={`h-full w-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? "opacity-100" : "opacity-0"
              }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading={index < 24 ? "eager" : "lazy"}
            />
          ) : null}

          {(!imageLoaded || imageError) && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-muted p-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-secondary">
                <svg
                  className="h-6 w-6 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
                  />
                </svg>
              </div>
              <span className="text-center text-xs text-muted-foreground leading-tight line-clamp-2">
                {game.name}
              </span>
            </div>
          )}

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent opacity-60" />

          {/* Classification badge */}
          <div className="absolute left-2 top-2">
            <span
              className={`inline-flex items-center rounded-md border px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${classificationColor}`}
            >
              {game.classification}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute right-2 top-2">
            <span className="inline-flex items-center rounded-md border border-border/50 bg-card/80 px-1.5 py-0.5 text-[10px] font-mono font-medium text-muted-foreground backdrop-blur-sm">
              {game.releaseYear}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col gap-2 p-3">
          <h3 className="text-sm font-semibold leading-tight text-foreground line-clamp-2 group-hover:text-primary transition-colors">
            {game.name}
          </h3>

          {/* Genres */}
          <div className="flex flex-wrap gap-1">
            {game.genres.slice(0, 3).map((genre) => (
              <span
                key={genre}
                className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-secondary-foreground"
              >
                {genre}
              </span>
            ))}
            {game.genres.length > 3 && (
              <span className="rounded bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                +{game.genres.length - 3}
              </span>
            )}
          </div>

          {/* Platform icons */}
          <div className="mt-auto flex items-center gap-1.5 pt-1">
            {game.sources.map((source) => {
              const Icon = platformIconMap[source]
              if (!Icon) return null
              return (
                <span
                  key={source}
                  className="opacity-70 transition-opacity group-hover:opacity-100"
                  title={source}
                >
                  <Icon size={14} />
                </span>
              )
            })}
          </div>
        </div>
      </motion.article>

      {showModal && (
        <GameModal game={game} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}

export function GameCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-border bg-card">
      <div className="aspect-[3/4] w-full animate-shimmer" />
      <div className="flex flex-col gap-2 p-3">
        <div className="h-4 w-3/4 rounded animate-shimmer" />
        <div className="flex gap-1">
          <div className="h-4 w-12 rounded animate-shimmer" />
          <div className="h-4 w-10 rounded animate-shimmer" />
        </div>
        <div className="flex gap-1.5 pt-1">
          <div className="h-3.5 w-3.5 rounded animate-shimmer" />
          <div className="h-3.5 w-3.5 rounded animate-shimmer" />
        </div>
      </div>
    </div>
  )
}
