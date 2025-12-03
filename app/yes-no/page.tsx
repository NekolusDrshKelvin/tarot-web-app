"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { TarotCard } from "@/components/tarot-card"
import { allCards, type TarotCard as TarotCardType } from "@/lib/tarot-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { HelpCircle, RotateCcw, CheckCircle, XCircle, MinusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

interface Answer {
  card: TarotCardType
  isReversed: boolean
  answer: "yes" | "no" | "maybe"
}

export default function YesNoPage() {
  const [question, setQuestion] = useState("")
  const [answer, setAnswer] = useState<Answer | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const getAnswer = () => {
    if (!question.trim()) return

    setIsDrawing(true)
    setAnswer(null)

    setTimeout(() => {
      const shuffled = [...allCards].sort(() => Math.random() - 0.5)
      const card = shuffled[0]
      const isReversed = Math.random() > 0.5

      let finalAnswer: "yes" | "no" | "maybe" = card.yesNo
      if (isReversed) {
        if (card.yesNo === "yes") finalAnswer = "maybe"
        else if (card.yesNo === "no") finalAnswer = "maybe"
      }

      setAnswer({ card, isReversed, answer: finalAnswer })
      setIsDrawing(false)
    }, 1500)
  }

  const reset = () => {
    setQuestion("")
    setAnswer(null)
  }

  const getAnswerDisplay = () => {
    if (!answer) return null

    const displays = {
      yes: {
        text: "YES",
        textMM: "ဟုတ်ကဲ့",
        icon: CheckCircle,
        color: "text-emerald-400",
        bg: "bg-emerald-500/20",
        border: "border-emerald-500/30",
      },
      no: {
        text: "NO",
        textMM: "မဟုတ်ပါ",
        icon: XCircle,
        color: "text-red-400",
        bg: "bg-red-500/20",
        border: "border-red-500/30",
      },
      maybe: {
        text: "MAYBE",
        textMM: "ဖြစ်နိုင်သည်",
        icon: MinusCircle,
        color: "text-amber-400",
        bg: "bg-amber-500/20",
        border: "border-amber-500/30",
      },
    }

    return displays[answer.answer]
  }

  const answerDisplay = getAnswerDisplay()

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-dark/20 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-foreground">Yes/No </span>
            <span className="bg-gradient-to-r from-sky-light to-cyan bg-clip-text text-transparent">Question</span>
          </h1>
          <p className="text-muted-foreground">Ask a question and receive your answer</p>
          <p className="text-sky-light/80 text-sm">မေးခွန်းတစ်ခုမေးပြီး အဖြေကို ရယူပါ</p>
        </div>

        <div className="max-w-xl mx-auto space-y-8">
          {/* Question Input */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-foreground">Your Question / သင့်မေးခွန်း</label>
            <Input
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Type your yes/no question here..."
              className="bg-card border-sky/30 focus:border-sky-light"
              disabled={!!answer}
            />
            {!answer && (
              <Button
                onClick={getAnswer}
                disabled={!question.trim() || isDrawing}
                className="w-full bg-gradient-to-r from-sky to-cyan text-background hover:opacity-90 shadow-lg shadow-sky/25"
              >
                <HelpCircle className="w-5 h-5 mr-2" />
                {isDrawing ? "Reading the cards..." : "Get Answer"}
              </Button>
            )}
          </div>

          {/* Drawing Animation */}
          {isDrawing && (
            <div className="flex justify-center">
              <div className="w-32 h-48 rounded-2xl border-2 border-sky/50 bg-gradient-to-br from-sky-dark via-background to-sky-dark flex items-center justify-center animate-pulse shadow-xl shadow-sky/20">
                <div className="p-3 rounded-full bg-gradient-to-br from-sky to-cyan">
                  <HelpCircle className="w-10 h-10 text-background animate-spin" />
                </div>
              </div>
            </div>
          )}

          {/* Answer Display */}
          {answer && answerDisplay && (
            <div className="space-y-6 animate-fade-in">
              {/* Answer Badge */}
              <div className={cn("p-6 rounded-2xl text-center border", answerDisplay.bg, answerDisplay.border)}>
                <answerDisplay.icon className={cn("w-16 h-16 mx-auto mb-3", answerDisplay.color)} />
                <h2 className={cn("text-4xl font-bold", answerDisplay.color)}>{answerDisplay.text}</h2>
                <p className={cn("text-xl", answerDisplay.color)}>{answerDisplay.textMM}</p>
              </div>

              {/* Card Display */}
              <div className="flex flex-col items-center gap-4">
                <TarotCard card={answer.card} isReversed={answer.isReversed} isFlipped={true} size="lg" />
                <div className="text-center">
                  <h3 className="font-semibold text-lg">{answer.card.name}</h3>
                  <p className="text-sky-light">{answer.card.nameMM}</p>
                  {answer.isReversed && <span className="text-sm text-red-400">(Reversed / ပြောင်းပြန်)</span>}
                </div>
              </div>

              {/* Meaning */}
              <div className="p-6 rounded-2xl bg-card border border-sky/30 shadow-lg shadow-sky/10">
                <h4 className="font-semibold text-sky-light mb-2">
                  {answer.isReversed ? "Reversed Meaning" : "Upright Meaning"}
                </h4>
                <p className="text-foreground mb-3">
                  {answer.isReversed ? answer.card.reversedMeaning : answer.card.uprightMeaning}
                </p>
                <p className="text-sky-light/80">
                  {answer.isReversed ? answer.card.reversedMeaningMM : answer.card.uprightMeaningMM}
                </p>
              </div>

              <Button
                variant="outline"
                onClick={reset}
                className="w-full border-sky/50 text-sky-light hover:bg-sky/10 bg-transparent"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Ask Another Question / နောက်မေးခွန်းတစ်ခုမေးပါ
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
