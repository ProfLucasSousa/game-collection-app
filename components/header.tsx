"use client"

import { motion } from "framer-motion"

interface HeaderProps {
  totalGames: number
}

export function Header({ totalGames }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-4 py-5 lg:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 0, scale: 1 }}
              transition={{ type: "spring", damping: 15 }}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 border border-primary/20"
            >
              <svg
                className="h-5 w-5 text-primary"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="2" y="6" width="20" height="12" rx="2" />
                <path d="M6 12h4M8 10v4" />
                <circle cx="17" cy="10" r="1" />
                <circle cx="15" cy="13" r="1" />
              </svg>
            </motion.div>
            <div>
              <h1 className="text-lg font-bold text-foreground tracking-tight">
                GameVault
              </h1>
              <p className="text-xs text-muted-foreground">
                Minha biblioteca de jogos
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-1.5">
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-mono font-bold text-foreground">
                {totalGames}
              </span>
              <span className="text-xs text-muted-foreground">jogos</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
