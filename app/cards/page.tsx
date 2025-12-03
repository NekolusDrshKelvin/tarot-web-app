"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TarotCard } from "@/components/tarot-card"
import { majorArcana, minorArcana, type TarotCard as TarotCardType } from "@/lib/tarot-data"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { X, Crown, Flame, Droplets, Sword, Coins } from "lucide-react"
import { cn } from "@/lib/utils"

export default function CardsPage() {
  const [selectedCard, setSelectedCard] = useState<TarotCardType | null>(null)
  const [viewReversed, setViewReversed] = useState(false)

  const suitFilters = [
    { suit: "wands", label: "Wands", labelMM: "တုတ်များ", icon: Flame, color: "text-orange-400" },
    { suit: "cups", label: "Cups", labelMM: "ခွက်များ", icon: Droplets, color: "text-sky-light" },
    { suit: "swords", label: "Swords", labelMM: "ဓားများ", icon: Sword, color: "text-slate-400" },
    { suit: "pentacles", label: "Pentacles", labelMM: "ဒင်္ဂါးများ", icon: Coins, color: "text-emerald-400" },
  ]

  const getMinorBySuit = (suit: string) => {
    return minorArcana.filter((card) => card.suit === suit)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-dark/20 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-foreground">All </span>
            <span className="bg-gradient-to-r from-sky-light to-cyan bg-clip-text text-transparent">Cards</span>
          </h1>
          <p className="text-muted-foreground">Browse the complete tarot deck</p>
          <p className="text-sky-light/80 text-sm">တာရိုကဒ်အစုံကို ကြည့်ရှုပါ</p>
        </div>

        <Tabs defaultValue="major" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 mb-6 bg-card border border-sky/30">
            <TabsTrigger
              value="major"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky data-[state=active]:to-cyan data-[state=active]:text-background"
            >
              <Crown className="w-4 h-4 mr-2" />
              Major Arcana
            </TabsTrigger>
            <TabsTrigger
              value="minor"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-sky data-[state=active]:to-cyan data-[state=active]:text-background"
            >
              Minor Arcana
            </TabsTrigger>
          </TabsList>

          {/* Major Arcana */}
          <TabsContent value="major">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
              {majorArcana.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCard(card)}
                  className="cursor-pointer hover:scale-105 transition-transform"
                >
                  <TarotCard card={card} isFlipped={true} size="sm" />
                  <p className="text-xs text-center mt-2 text-muted-foreground truncate">{card.name}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          {/* Minor Arcana */}
          <TabsContent value="minor" className="space-y-8">
            {suitFilters.map((filter) => (
              <div key={filter.suit}>
                <div className="flex items-center gap-2 mb-4">
                  <filter.icon className={cn("w-5 h-5", filter.color)} />
                  <h3 className="font-semibold text-lg">{filter.label}</h3>
                  <span className="text-sm text-sky-light">({filter.labelMM})</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                  {getMinorBySuit(filter.suit).map((card) => (
                    <div
                      key={card.id}
                      onClick={() => setSelectedCard(card)}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      <TarotCard card={card} isFlipped={true} size="sm" />
                      <p className="text-xs text-center mt-2 text-muted-foreground truncate">{card.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </TabsContent>
        </Tabs>

        {/* Card Detail Modal */}
        {selectedCard && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-card rounded-2xl border border-sky/30 p-6 shadow-xl shadow-sky/10">
              <button
                onClick={() => {
                  setSelectedCard(null)
                  setViewReversed(false)
                }}
                className="absolute top-4 right-4 p-2 rounded-full hover:bg-sky/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex flex-col items-center gap-4">
                <TarotCard card={selectedCard} isReversed={viewReversed} isFlipped={true} size="lg" />

                <div className="text-center">
                  <h2 className="text-2xl font-bold">{selectedCard.name}</h2>
                  <p className="text-sky-light text-lg">{selectedCard.nameMM}</p>
                  <p className="text-sm text-muted-foreground capitalize">
                    {selectedCard.type === "major" ? "Major Arcana" : `${selectedCard.suit} Suit`}
                  </p>
                </div>

                {/* Toggle Reversed */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setViewReversed(!viewReversed)}
                  className={cn(
                    "border-sky/50",
                    viewReversed ? "bg-red-500/20 text-red-400 border-red-500/50" : "text-sky-light hover:bg-sky/10",
                  )}
                >
                  {viewReversed ? "Viewing Reversed" : "View Reversed"}
                </Button>

                {/* Meaning Section */}
                <div className="w-full space-y-4 mt-4">
                  <div className="p-4 rounded-xl bg-sky/5 border border-sky/20">
                    <h4 className="font-semibold text-sky-light mb-2">
                      {viewReversed ? "Reversed Meaning / ပြောင်းပြန်အဓိပ္ပာယ်" : "Upright Meaning / မတ်မတ်အဓိပ္ပာယ်"}
                    </h4>
                    <p className="text-foreground text-sm">
                      {viewReversed ? selectedCard.reversedMeaning : selectedCard.uprightMeaning}
                    </p>
                    <p className="text-sky-light/80 text-sm mt-2">
                      {viewReversed ? selectedCard.reversedMeaningMM : selectedCard.uprightMeaningMM}
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-sky/5 border border-sky/20">
                    <h4 className="font-semibold text-sky-light mb-2">Keywords / သော့ချက်စကားလုံးများ</h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedCard.keywords.map((keyword, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 rounded-full bg-sky/10 text-sky-light text-xs border border-sky/30"
                        >
                          {keyword} / {selectedCard.keywordsMM[i]}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-sky/5 border border-sky/20">
                    <h4 className="font-semibold text-sky-light mb-2">Yes/No Answer / ဟုတ်/မဟုတ် အဖြေ</h4>
                    <span
                      className={cn(
                        "px-4 py-2 rounded-full text-sm font-medium",
                        selectedCard.yesNo === "yes" && "bg-emerald-500/20 text-emerald-400",
                        selectedCard.yesNo === "no" && "bg-red-500/20 text-red-400",
                        selectedCard.yesNo === "maybe" && "bg-amber-500/20 text-amber-400",
                      )}
                    >
                      {selectedCard.yesNo === "yes" && "Yes / ဟုတ်ကဲ့"}
                      {selectedCard.yesNo === "no" && "No / မဟုတ်ပါ"}
                      {selectedCard.yesNo === "maybe" && "Maybe / ဖြစ်နိုင်သည်"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
