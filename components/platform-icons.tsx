import React from "react"
import Image from "next/image"

interface IconProps {
  className?: string
  size?: number
}

export function SteamIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/Steam_Games_logo.png"
      alt="Steam"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function EpicIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/Epic_Games_logo.png"
      alt="Epic Games"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function XboxIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/xbox-games-logo-symbol-19.png"
      alt="Xbox"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function GogIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/gog_games_logo.jpg"
      alt="GOG"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function UbisoftIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/Ubisoft_logo.png"
      alt="Ubisoft"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function EaIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/EA_Games_logo.png"
      alt="EA"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function AmazonIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/amazon_games_logo.jpg"
      alt="Amazon"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export function XboxPcIcon({ className, size = 20 }: IconProps) {
  return (
    <Image
      src="/logos/Windows-New-Logo.png"
      alt="Xbox PC"
      width={size}
      height={size}
      className={className}
      style={{ objectFit: "contain" }}
    />
  )
}

export const platformIconMap: Record<
  string,
  React.ComponentType<IconProps>
> = {
  Steam: SteamIcon,
  Epic: EpicIcon,
  "Xbox PC": XboxPcIcon,
  "Xbox Console": XboxIcon,
  GOG: GogIcon,
  Ubisoft: UbisoftIcon,
  EA: EaIcon,
  Amazon: AmazonIcon,
}

