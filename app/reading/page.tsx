"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TarotCard } from "@/components/tarot-card"
import { allCards, type TarotCard as TarotCardType } from "@/lib/tarot-data"
import { Button } from "@/components/ui/button"
import { Shuffle, RotateCcw, Sparkles } from "lucide-react"
import { cn } from "@/lib/utils"

interface DrawnCard {
  card: TarotCardType
  isReversed: boolean
  position: string
  positionMM: string
}

const positions = [
  { name: "Past", nameMM: "အတိတ်" },
  { name: "Present", nameMM: "ပစ္စုပ္ပန်" },
  { name: "Future", nameMM: "အနာဂတ်" },
]

export default function ReadingPage() {
  const [drawnCards, setDrawnCards] = useState<DrawnCard[]>([])
  const [isDrawing, setIsDrawing] = useState(false)
  const [selectedCard, setSelectedCard] = useState<DrawnCard | null>(null)

  const drawCards = () => {
    setIsDrawing(true)
    setSelectedCard(null)

    setTimeout(() => {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5)
      const selected = shuffled.slice(0, 3).map((card, index) => ({
        card,
        isReversed: Math.random() > 0.5,
        position: positions[index].name,
        positionMM: positions[index].nameMM,
      }))
      setDrawnCards(selected)
      setIsDrawing(false)
    }, 1000)
  }

  const reset = () => {
    setDrawnCards([])
    setSelectedCard(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-dark/20 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-foreground">Tarot </span>
            <span className="bg-gradient-to-r from-sky-light to-cyan bg-clip-text text-transparent">Reading</span>
          </h1>
          <p className="text-muted-foreground">3-Card Spread: Past, Present, Future</p>
          <p className="text-sky-light/80 text-sm">၃ ကဒ်ဖြန့်ခြင်း - အတိတ်၊ ပစ္စုပ္ပန်၊ အနာဂတ်</p>
        </div>

        {drawnCards.length === 0 ? (
          <div className="flex flex-col items-center gap-8">
            <div className="relative">
              <div
                className={cn(
                  "w-40 h-60 rounded-2xl border-2 border-sky/50 bg-gradient-to-br from-sky-dark via-background to-sky-dark flex items-center justify-center shadow-xl shadow-sky/20",
                  isDrawing && "animate-pulse",
                )}
              >
                <div className="absolute inset-3 border border-sky/30 rounded-xl flex items-center justify-center">
                  <div className="p-4 rounded-full bg-gradient-to-br from-sky to-cyan">
                    <Sparkles className={cn("w-10 h-10 text-background", isDrawing && "animate-spin")} />
                  </div>
                </div>
                <div className="absolute inset-0 star-bg opacity-30 rounded-2xl" />
              </div>
            </div>

            <Button
              size="lg"
              onClick={drawCards}
              disabled={isDrawing}
              className="bg-gradient-to-r from-sky to-cyan text-background hover:opacity-90 shadow-lg shadow-sky/25"
            >
              <Shuffle className="w-5 h-5 mr-2" />
              {isDrawing ? "Drawing..." : "Draw Cards"}
            </Button>
          </div>
        ) : (
          <div className="space-y-8">
            {/* Cards Display */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              {drawnCards.map((drawnCard, index) => (
                <div key={index} className="flex flex-col items-center gap-3">
                  <div className="text-center mb-2">
                    <p className="font-semibold text-foreground">{drawnCard.position}</p>
                    <p className="text-sm text-sky-light">{drawnCard.positionMM}</p>
                  </div>
                  <div
                    onClick={() => setSelectedCard(drawnCard)}
                    className={cn(
                      "transition-all cursor-pointer",
                      selectedCard === drawnCard && "ring-2 ring-sky-light rounded-2xl",
                    )}
                  >
                    <TarotCard card={drawnCard.card} isReversed={drawnCard.isReversed} isFlipped={true} size="lg" />
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-medium">{drawnCard.card.name}</p>
                    <p className="text-xs text-sky-light">{drawnCard.card.nameMM}</p>
                    {drawnCard.isReversed && <span className="text-xs text-red-400">(Reversed / ပြောင်းပြန်)</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Card Meaning */}
            {selectedCard && (
              <div className="max-w-2xl mx-auto p-6 rounded-2xl bg-card border border-sky/30 animate-fade-in shadow-lg shadow-sky/10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 rounded-full bg-gradient-to-br from-sky to-cyan">
                    <Sparkles className="w-6 h-6 text-background" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedCard.card.name}
                      {selectedCard.isReversed && " (Reversed)"}
                    </h3>
                    <p className="text-sky-light">{selectedCard.card.nameMM}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedCard.position} Position / {selectedCard.positionMM}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sky-light mb-1">
                      {selectedCard.isReversed ? "Reversed Meaning" : "Upright Meaning"}
                    </h4>
                    <p className="text-foreground">
                      {selectedCard.isReversed ? selectedCard.card.reversedMeaning : selectedCard.card.uprightMeaning}
                    </p>
                    <p className="text-sky-light/80 mt-2">
                      {selectedCard.isReversed
                        ? selectedCard.card.reversedMeaningMM
                        : selectedCard.card.uprightMeaningMM}
                    </p>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sky-light mb-1">Keywords / သော့ချက်စကားလုံးများ</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.card.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-sky/10 text-sky-light text-sm border border-sky/30"
                        >
                          {keyword} / {selectedCard.card.keywordsMM[i]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                variant="outline"
                onClick={reset}
                className="border-sky/50 text-sky-light hover:bg-sky/10 bg-transparent"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                New Reading / ဖတ်ခြင်းအသစ်
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
