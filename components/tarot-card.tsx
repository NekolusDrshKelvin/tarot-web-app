"use client"

import type React from "react"

import { useState } from "react"
import type { TarotCard as TarotCardType } from "@/lib/tarot-data"
import { cn } from "@/lib/utils"
import {
  Sun,
  Moon,
  Star,
  Sparkles,
  Heart,
  Sword,
  Coins,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Crown,
  Zap,
  Eye,
  Scale,
  Skull,
  Power as Tower,
  Compass,
  CloudSun,
  Globe,
  Wand,
} from "lucide-react"

interface TarotCardProps {
  card: TarotCardType
  isReversed?: boolean
  isFlipped?: boolean
  onClick?: () => void
  showMeaning?: boolean
  size?: "sm" | "md" | "lg"
}

const suitColors: Record<string, string> = {
  wands: "from-orange-400 via-amber-500 to-orange-600",
  cups: "from-sky via-cyan to-teal",
  swords: "from-slate-300 via-slate-400 to-slate-500",
  pentacles: "from-emerald-400 via-teal to-cyan",
  major: "from-sky-dark via-sky to-cyan",
}

// Modern icons for suits
const SuitIcon = ({ suit }: { suit: string }) => {
  switch (suit) {
    case "wands":
      return <Flame className="w-6 h-6" />
    case "cups":
      return <Droplets className="w-6 h-6" />
    case "swords":
      return <Sword className="w-6 h-6" />
    case "pentacles":
      return <Coins className="w-6 h-6" />
    default:
      return <Star className="w-6 h-6" />
  }
}

// Modern icons for major arcana
const getMajorIcon = (name: string) => {
  const iconMap: Record<string, React.ReactNode> = {
    "The Fool": <Wind className="w-10 h-10" />,
    "The Magician": <Wand className="w-10 h-10" />,
    "The High Priestess": <Moon className="w-10 h-10" />,
    "The Empress": <Crown className="w-10 h-10" />,
    "The Emperor": <Mountain className="w-10 h-10" />,
    "The Hierophant": <Eye className="w-10 h-10" />,
    "The Lovers": <Heart className="w-10 h-10" />,
    "The Chariot": <Compass className="w-10 h-10" />,
    Strength: <Zap className="w-10 h-10" />,
    "The Hermit": <Sparkles className="w-10 h-10" />,
    "Wheel of Fortune": <Globe className="w-10 h-10" />,
    Justice: <Scale className="w-10 h-10" />,
    "The Hanged Man": <Eye className="w-10 h-10" />,
    Death: <Skull className="w-10 h-10" />,
    Temperance: <Droplets className="w-10 h-10" />,
    "The Devil": <Flame className="w-10 h-10" />,
    "The Tower": <Tower className="w-10 h-10" />,
    "The Star": <Star className="w-10 h-10" />,
    "The Moon": <Moon className="w-10 h-10" />,
    "The Sun": <Sun className="w-10 h-10" />,
    Judgement: <CloudSun className="w-10 h-10" />,
    "The World": <Globe className="w-10 h-10" />,
  }
  return iconMap[name] || <Star className="w-10 h-10" />
}

export function TarotCard({
  card,
  isReversed = false,
  isFlipped = false,
  onClick,
  showMeaning = false,
  size = "md",
}: TarotCardProps) {
  const [flipped, setFlipped] = useState(isFlipped)

  const sizeClasses = {
    sm: "w-24 h-36",
    md: "w-32 h-48",
    lg: "w-40 h-60",
  }

  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      setFlipped(!flipped)
    }
  }

  const suitKey = card.type === "major" ? "major" : card.suit || "major"

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        className={cn(sizeClasses[size], "relative cursor-pointer transition-transform duration-300 hover:scale-105")}
        onClick={handleClick}
      >
        <div
          className={cn("absolute inset-0 transition-transform duration-500", flipped && "rotate-y-180")}
          style={{
            transformStyle: "preserve-3d",
            transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
          }}
        >
          {/* Card Back - Modern sky blue design */}
          <div
            className="absolute inset-0 rounded-2xl border-2 border-sky/50 bg-gradient-to-br from-sky-dark via-background to-sky-dark flex items-center justify-center overflow-hidden shadow-xl shadow-sky/20"
            style={{ backfaceVisibility: "hidden" }}
          >
            {/* Decorative pattern */}
            <div className="absolute inset-3 border border-sky/30 rounded-xl" />
            <div className="absolute inset-6 border border-sky/20 rounded-lg" />

            {/* Center icon */}
            <div className="relative z-10 p-4 rounded-full bg-gradient-to-br from-sky to-cyan shadow-lg">
              <Star className="w-8 h-8 text-background" />
            </div>

            {/* Star background effect */}
            <div className="absolute inset-0 star-bg opacity-40" />

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
          </div>

          {/* Card Front - Modern design with icons */}
          <div
            className={cn(
              "absolute inset-0 rounded-2xl border-2 border-sky/50 overflow-hidden shadow-xl",
              `bg-gradient-to-br ${suitColors[suitKey]}`,
              isReversed && "rotate-180",
            )}
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-white/10" />

            {/* Inner border */}
            <div className="absolute inset-2 border border-white/30 rounded-xl" />

            {/* Card Content */}
            <div className="relative h-full flex flex-col items-center justify-between p-3 text-white">
              {/* Card number/name at top */}
              <div className="text-xs font-bold text-center opacity-90 truncate w-full drop-shadow-md">
                {card.number !== undefined ? `${card.number}` : card.name}
              </div>

              {/* Main icon in center */}
              <div className="flex-1 flex items-center justify-center">
                <div className="p-3 rounded-full bg-white/20 backdrop-blur-sm shadow-lg">
                  {card.type === "major" ? getMajorIcon(card.name) : <SuitIcon suit={card.suit || ""} />}
                </div>
              </div>

              {/* Card info at bottom */}
              <div className="flex flex-col items-center gap-0.5">
                {card.suit && (
                  <div className="flex items-center gap-1">
                    <SuitIcon suit={card.suit} />
                  </div>
                )}
                <span className="text-xs font-medium opacity-90 drop-shadow-md">
                  {card.type === "major" ? "Major Arcana" : card.suit}
                </span>
              </div>
            </div>

            {/* Reversed Indicator */}
            {isReversed && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-bold shadow-lg">
                R
              </div>
            )}

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Card Name & Meaning */}
      {showMeaning && flipped && (
        <div className="text-center max-w-xs animate-fade-in">
          <h3 className="font-semibold text-sky-light text-sm">
            {card.name}
            {isReversed && " (Reversed)"}
          </h3>
          <p className="text-xs text-muted-foreground mt-1">{card.nameMM}</p>
        </div>
      )}
    </div>
  )
}
