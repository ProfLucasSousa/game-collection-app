"use client"

import { motion } from "framer-motion"
import {
  SteamIcon,
  EpicIcon,
  XboxIcon,
  XboxPcIcon,
  GogIcon,
  UbisoftIcon,
  EaIcon,
  AmazonIcon,
} from "./platform-icons"

interface HeaderProps {
  totalGames: number
}

const platforms = [
  { name: "Steam", icon: SteamIcon },
  { name: "Epic Games", icon: EpicIcon },
  { name: "Xbox", icon: XboxIcon },
  { name: "Xbox PC", icon: XboxPcIcon },
  { name: "GOG", icon: GogIcon },
  { name: "Ubisoft", icon: UbisoftIcon },
  { name: "EA", icon: EaIcon },
  { name: "Amazon", icon: AmazonIcon },
]

export function Header({ totalGames }: HeaderProps) {
  return (
    <header className="border-b border-border bg-gradient-to-b from-card/80 via-card/50 to-transparent backdrop-blur-xl">
      <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-6 lg:py-12">
        {/* Hero Section */}
        <div className="flex flex-col gap-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-4">
              <motion.div
                initial={{ rotate: -10, scale: 0.9 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", damping: 15 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 border-2 border-primary/20 shadow-lg"
              >
                <svg
                  className="h-8 w-8 text-primary"
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
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                  GameVault
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Coleção Completa de Jogos
                </p>
              </div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-2 rounded-xl border border-border bg-card px-4 py-2.5 shadow-sm"
            >
              <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              <span className="text-lg font-mono font-bold text-foreground">
                {totalGames}
              </span>
              <span className="text-sm text-muted-foreground">jogos</span>
            </motion.div>
          </div>

          <div className="flex flex-col gap-3">
            <p className="text-base text-muted-foreground max-w-3xl leading-relaxed">
              Explore uma coleção curada de jogos clássicos e modernos. Filtre por plataforma, 
              gênero, classificação ou ano de lançamento para descobrir seus próximos favoritos.
            </p>

            {/* Platforms */}
            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                Plataformas disponíveis
              </span>
              <div className="flex items-center gap-3 flex-wrap">
                {platforms.map((platform, index) => {
                  const PlatformIcon = platform.icon
                  return (
                    <motion.div
                      key={platform.name}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      className="group relative"
                    >
                      <div className="flex items-center gap-2 rounded-lg border border-border bg-card/50 px-3 py-2 hover:bg-card hover:border-primary/50 transition-all duration-200 cursor-default">
                        <div className="flex items-center justify-center">
                          <PlatformIcon size={20} />
                        </div>
                        <span className="text-xs font-medium text-foreground">
                          {platform.name}
                        </span>
                      </div>
                    </motion.div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
