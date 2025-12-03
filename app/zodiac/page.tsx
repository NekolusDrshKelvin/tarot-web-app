"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { zodiacSigns, majorArcana, type ZodiacSign, type TarotCard } from "@/lib/tarot-data"
import { Button } from "@/components/ui/button"
import {
  Heart,
  GraduationCap,
  User,
  Star,
  RotateCcw,
  Sparkles,
  Flame,
  Droplets,
  Wind,
  Mountain,
  Layers,
  BookOpen,
  Lightbulb,
  TrendingUp,
} from "lucide-react"
import { cn } from "@/lib/utils"

type ReadingType = "love" | "education" | "personal"

interface ThreeCardReading {
  past: { card: TarotCard; reversed: boolean }
  present: { card: TarotCard; reversed: boolean }
  future: { card: TarotCard; reversed: boolean }
}

export default function ZodiacPage() {
  const [selectedSign, setSelectedSign] = useState<ZodiacSign | null>(null)
  const [readingType, setReadingType] = useState<ReadingType>("love")
  const [threeCardReading, setThreeCardReading] = useState<ThreeCardReading | null>(null)
  const [showThreeCardSpread, setShowThreeCardSpread] = useState(false)

  const readingTypes = [
    { type: "love" as const, label: "Love", labelMM: "အချစ်ရေး", icon: Heart, color: "text-pink-400" },
    { type: "education" as const, label: "Education", labelMM: "ပညာရေး", icon: GraduationCap, color: "text-sky-light" },
    { type: "personal" as const, label: "Personal", labelMM: "ကိုယ်ရေး", icon: User, color: "text-cyan" },
  ]

  const getReading = () => {
    if (!selectedSign) return null

    switch (readingType) {
      case "love":
        return { text: selectedSign.love, textMM: selectedSign.loveMM }
      case "education":
        return { text: selectedSign.education, textMM: selectedSign.educationMM }
      case "personal":
        return { text: selectedSign.personal, textMM: selectedSign.personalMM }
    }
  }

  const generateThreeCardReading = () => {
    const shuffled = [...majorArcana].sort(() => Math.random() - 0.5)
    const selectedCards = shuffled.slice(0, 3)

    setThreeCardReading({
      past: { card: selectedCards[0], reversed: Math.random() > 0.5 },
      present: { card: selectedCards[1], reversed: Math.random() > 0.5 },
      future: { card: selectedCards[2], reversed: Math.random() > 0.5 },
    })
    setShowThreeCardSpread(true)
  }

  const generateDetailedSummary = () => {
    if (!threeCardReading || !selectedSign) return null

    const { past, present, future } = threeCardReading
    const readingLabel =
      readingType === "love" ? "romantic" : readingType === "education" ? "academic" : "personal growth"
    const readingLabelMM =
      readingType === "love" ? "အချစ်ရေး" : readingType === "education" ? "ပညာရေး" : "ကိုယ်ရေးကိုယ်တာ တိုးတက်မှု"

    // Past interpretation
    const pastMeaning = past.reversed ? past.card.reversedMeaning : past.card.uprightMeaning
    const pastMeaningMM = past.reversed ? past.card.reversedMeaningMM : past.card.uprightMeaningMM

    // Present interpretation
    const presentMeaning = present.reversed ? present.card.reversedMeaning : present.card.uprightMeaning
    const presentMeaningMM = present.reversed ? present.card.reversedMeaningMM : present.card.uprightMeaningMM

    // Future interpretation
    const futureMeaning = future.reversed ? future.card.reversedMeaning : future.card.uprightMeaning
    const futureMeaningMM = future.reversed ? future.card.reversedMeaningMM : future.card.uprightMeaningMM

    // Calculate overall energy (positive if more upright cards)
    const positiveCards = [!past.reversed, !present.reversed, !future.reversed].filter(Boolean).length
    const overallEnergy = positiveCards >= 2 ? "positive" : "challenging"
    const overallEnergyMM = positiveCards >= 2 ? "အပြုသဘော" : "စိန်ခေါ်မှု"

    // Generate comprehensive summary
    const mainSummaryEN = `Dear ${selectedSign.name}, your 3-card ${readingLabel} reading reveals a profound journey. Your past, represented by ${past.card.name} ${past.reversed ? "(Reversed)" : "(Upright)"}, shows ${pastMeaning.split(".")[0]}. This foundation has shaped who you are today.

Currently, ${present.card.name} ${present.reversed ? "(Reversed)" : "(Upright)"} guides your present moment, indicating ${presentMeaning.split(".")[0]}. Pay close attention to this energy as it's directly affecting your ${readingLabel} path.

Looking ahead, ${future.card.name} ${future.reversed ? "(Reversed)" : "(Upright)"} illuminates your future, promising ${futureMeaning.split(".")[0]}. As a ${selectedSign.element} sign, you possess natural abilities to navigate these energies.`

    const mainSummaryMM = `ချစ်ခင်ရပါသော ${selectedSign.nameMM}၊ သင်၏ ကတ် ၃ ချပ် ${readingLabelMM} ဖတ်ခြင်းက နက်ရှိုင်းသော ခရီးစဉ်တစ်ခုကို ဖော်ပြသည်။ သင့်အတိတ်ကို ${past.card.nameMM} ${past.reversed ? "(ပြောင်းပြန်)" : "(မတ်မတ်)"} က ကိုယ်စားပြုပြီး ${pastMeaningMM.split("။")[0]}။ ဤအခြေခံက ယနေ့သင်ဖြစ်လာပုံကို ပုံဖော်ခဲ့သည်။

လောလောဆယ်၊ ${present.card.nameMM} ${present.reversed ? "(ပြောင်းပြန်)" : "(မတ်မတ်)"} က သင့်ပစ္စုပ္ပန်ကို လမ်းညွှန်နေပြီး ${presentMeaningMM.split("။")[0]}။ ဤစွမ်းအင်က သင့် ${readingLabelMM} လမ်းကြောင်းကို တိုက်ရိုက်သက်ရောက်နေသည်။

ရှေ့သို့ကြည့်ရှုသည့်အခါ၊ ${future.card.nameMM} ${future.reversed ? "(ပြောင်းပြန်)" : "(မတ်မတ်)"} က သင့်အနာဂတ်ကို လင်းလက်စေပြီး ${futureMeaningMM.split("။")[0]}။`

    // Generate advice based on cards
    const adviceEN =
      overallEnergy === "positive"
        ? `The cards suggest a ${overallEnergy} trajectory for your ${readingLabel} journey. Trust in the cosmic energies aligning in your favor. Key actions: Embrace the lessons from ${past.card.name}, actively engage with ${present.card.name}'s energy, and prepare yourself for ${future.card.name}'s blessings.`
        : `While the cards show some ${overallEnergy} aspects in your ${readingLabel} path, remember that challenges are opportunities for growth. Key actions: Learn from ${past.card.name}'s lessons, face ${present.card.name}'s challenges with courage, and trust that ${future.card.name} will bring transformation.`

    const adviceMM =
      overallEnergy === "positive"
        ? `ကတ်များက သင့် ${readingLabelMM} ခရီးစဉ်အတွက် ${overallEnergyMM} လမ်းကြောင်းကို ညွှန်ပြသည်။ သင့်အတွက် ညီညွတ်နေသော စကြာဝဠာစွမ်းအင်များကို ယုံကြည်ပါ။ အဓိကလုပ်ဆောင်ချက်များ- ${past.card.nameMM} မှ သင်ခန်းစာများကို လက်ခံပါ၊ ${present.card.nameMM} ၏ စွမ်းအင်နှင့် တက်ကြွစွာ ပါဝင်ပါ၊ ${future.card.nameMM} ၏ ကောင်းချီးများအတွက် ပြင်ဆင်ပါ။`
        : `ကတ်များက သင့် ${readingLabelMM} လမ်းကြောင်းတွင် ${overallEnergyMM} ရှိသော်လည်း စိန်ခေါ်မှုများသည် တိုးတက်မှုအတွက် အခွင့်အလမ်းများဖြစ်ကြောင်း သတိရပါ။ ${past.card.nameMM} ၏ သင်ခန်းစာများကို သင်ယူပါ၊ ${present.card.nameMM} ၏ စိန်ခေါ်မှုများကို ရဲရင့်စွာ ရင်ဆိုင်ပါ၊ ${future.card.nameMM} က အပြောင်းအလဲကို ယူဆောင်လာမည်ဟု ယုံကြည်ပါ။`

    return {
      mainEN: mainSummaryEN,
      mainMM: mainSummaryMM,
      adviceEN,
      adviceMM,
      overallEnergy,
      overallEnergyMM,
      positiveCards,
    }
  }

  const reading = getReading()
  const detailedSummary = generateDetailedSummary()

  const getElementIcon = (element: string) => {
    switch (element) {
      case "Fire":
        return <Flame className="w-5 h-5" />
      case "Water":
        return <Droplets className="w-5 h-5" />
      case "Earth":
        return <Mountain className="w-5 h-5" />
      case "Air":
        return <Wind className="w-5 h-5" />
      default:
        return <Star className="w-5 h-5" />
    }
  }

  const handleReset = () => {
    setSelectedSign(null)
    setThreeCardReading(null)
    setShowThreeCardSpread(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-dark/20 to-background">
      <Navigation />

      <main className="container mx-auto px-4 py-8 pb-24 md:pb-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            <span className="text-foreground">Zodiac </span>
            <span className="bg-gradient-to-r from-sky-light to-cyan bg-clip-text text-transparent">Reading</span>
          </h1>
          <p className="text-muted-foreground">Select your zodiac sign for personalized insights</p>
          <p className="text-sky-light/80 text-sm">ကိုယ်ပိုင်အကြံဉာဏ်များအတွက် သင့်ရာသီခွင်ကို ရွေးချယ်ပါ</p>
        </div>

        {!selectedSign ? (
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4 max-w-4xl mx-auto">
            {zodiacSigns.map((sign) => (
              <button
                key={sign.name}
                onClick={() => setSelectedSign(sign)}
                className="group p-4 rounded-2xl bg-card border border-border hover:border-sky/50 transition-all hover:shadow-lg hover:shadow-sky/10 text-center"
              >
                <div className="text-3xl mb-2 group-hover:scale-110 transition-transform">{sign.symbol}</div>
                <h3 className="font-semibold text-sm">{sign.name}</h3>
                <p className="text-xs text-sky-light">{sign.nameMM}</p>
                <p className="text-xs text-muted-foreground mt-1">{sign.dateRange}</p>
              </button>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            {/* Sign Header */}
            <div className="p-6 rounded-2xl bg-card border border-sky/30 text-center shadow-lg shadow-sky/10">
              <div className="text-5xl mb-3">{selectedSign.symbol}</div>
              <h2 className="text-2xl font-bold">{selectedSign.name}</h2>
              <p className="text-sky-light text-lg">{selectedSign.nameMM}</p>
              <div className="flex items-center justify-center gap-2 mt-2">
                {getElementIcon(selectedSign.element)}
                <p className="text-sm text-muted-foreground">
                  {selectedSign.dateRange} - {selectedSign.element} Element
                </p>
              </div>
            </div>

            {/* Reading Type Selector */}
            <div className="flex justify-center gap-2">
              {readingTypes.map((type) => (
                <Button
                  key={type.type}
                  variant={readingType === type.type ? "default" : "outline"}
                  onClick={() => setReadingType(type.type)}
                  className={cn(
                    readingType === type.type
                      ? "bg-gradient-to-r from-sky to-cyan text-background hover:opacity-90"
                      : "border-sky/30 hover:border-sky/50 hover:bg-sky/10",
                  )}
                >
                  <type.icon className={cn("w-4 h-4 mr-2", readingType !== type.type && type.color)} />
                  <span className="hidden sm:inline">{type.label}</span>
                  <span className="sm:hidden">{type.labelMM}</span>
                </Button>
              ))}
            </div>

            {/* Reading Content */}
            {reading && (
              <div className="p-6 rounded-2xl bg-card border border-sky/30 shadow-lg shadow-sky/10">
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={cn(
                      "w-10 h-10 rounded-full flex items-center justify-center",
                      readingType === "love" && "bg-pink-500/20",
                      readingType === "education" && "bg-sky/20",
                      readingType === "personal" && "bg-cyan/20",
                    )}
                  >
                    {readingType === "love" && <Heart className="w-5 h-5 text-pink-400" />}
                    {readingType === "education" && <GraduationCap className="w-5 h-5 text-sky-light" />}
                    {readingType === "personal" && <User className="w-5 h-5 text-cyan" />}
                  </div>
                  <div>
                    <h3 className="font-semibold">{readingTypes.find((t) => t.type === readingType)?.label} Reading</h3>
                    <p className="text-sm text-sky-light">
                      {readingTypes.find((t) => t.type === readingType)?.labelMM}ဖတ်ခြင်း
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <p className="text-foreground leading-relaxed">{reading.text}</p>
                  <p className="text-sky-light/80 leading-relaxed">{reading.textMM}</p>
                </div>
              </div>
            )}

            {!showThreeCardSpread && (
              <Button
                onClick={generateThreeCardReading}
                className="w-full bg-gradient-to-r from-sky to-cyan text-background hover:opacity-90 py-6 text-lg"
              >
                <Layers className="w-5 h-5 mr-2" />
                Get 3-Card Astrology Reading / ကတ် ၃ ချပ် နက္ခတ်ဖတ်ခြင်း
              </Button>
            )}

            {showThreeCardSpread && threeCardReading && (
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-1">3-Card Astrology Spread</h3>
                  <p className="text-sky-light">ကတ် ၃ ချပ် နက္ခတ်ဖတ်ခြင်း</p>
                </div>

                {/* Three Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Past Card */}
                  <div className="p-5 rounded-2xl bg-card border border-sky/30 shadow-lg shadow-sky/10">
                    <div className="text-center mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-sky/20 text-sky-light">
                        PAST / အတိတ်
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-24 h-36 mx-auto rounded-xl flex items-center justify-center text-4xl mb-3 border-2 border-sky/40",
                        "bg-gradient-to-br from-sky-dark/50 to-background",
                        threeCardReading.past.reversed && "rotate-180",
                      )}
                    >
                      {threeCardReading.past.card.icon}
                    </div>
                    <h4 className="font-semibold text-center">{threeCardReading.past.card.name}</h4>
                    <p className="text-sm text-sky-light text-center">{threeCardReading.past.card.nameMM}</p>
                    <p
                      className={cn(
                        "text-xs text-center mt-1 px-2 py-0.5 rounded-full mx-auto w-fit",
                        threeCardReading.past.reversed
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-green-500/20 text-green-400",
                      )}
                    >
                      {threeCardReading.past.reversed ? "Reversed / ပြောင်းပြန်" : "Upright / မတ်မတ်"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                      {threeCardReading.past.reversed
                        ? threeCardReading.past.card.reversedMeaning.split(".")[0] + "."
                        : threeCardReading.past.card.uprightMeaning.split(".")[0] + "."}
                    </p>
                  </div>

                  {/* Present Card */}
                  <div className="p-5 rounded-2xl bg-card border border-cyan/40 shadow-lg shadow-cyan/10 md:scale-105">
                    <div className="text-center mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-cyan/20 text-cyan">
                        PRESENT / ပစ္စုပ္ပန်
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-24 h-36 mx-auto rounded-xl flex items-center justify-center text-4xl mb-3 border-2 border-cyan/50",
                        "bg-gradient-to-br from-cyan/20 to-background",
                        threeCardReading.present.reversed && "rotate-180",
                      )}
                    >
                      {threeCardReading.present.card.icon}
                    </div>
                    <h4 className="font-semibold text-center">{threeCardReading.present.card.name}</h4>
                    <p className="text-sm text-cyan text-center">{threeCardReading.present.card.nameMM}</p>
                    <p
                      className={cn(
                        "text-xs text-center mt-1 px-2 py-0.5 rounded-full mx-auto w-fit",
                        threeCardReading.present.reversed
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-green-500/20 text-green-400",
                      )}
                    >
                      {threeCardReading.present.reversed ? "Reversed / ပြောင်းပြန်" : "Upright / မတ်မတ်"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                      {threeCardReading.present.reversed
                        ? threeCardReading.present.card.reversedMeaning.split(".")[0] + "."
                        : threeCardReading.present.card.uprightMeaning.split(".")[0] + "."}
                    </p>
                  </div>

                  {/* Future Card */}
                  <div className="p-5 rounded-2xl bg-card border border-sky/30 shadow-lg shadow-sky/10">
                    <div className="text-center mb-3">
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                        FUTURE / အနာဂတ်
                      </span>
                    </div>
                    <div
                      className={cn(
                        "w-24 h-36 mx-auto rounded-xl flex items-center justify-center text-4xl mb-3 border-2 border-purple-400/40",
                        "bg-gradient-to-br from-purple-900/30 to-background",
                        threeCardReading.future.reversed && "rotate-180",
                      )}
                    >
                      {threeCardReading.future.card.icon}
                    </div>
                    <h4 className="font-semibold text-center">{threeCardReading.future.card.name}</h4>
                    <p className="text-sm text-purple-400 text-center">{threeCardReading.future.card.nameMM}</p>
                    <p
                      className={cn(
                        "text-xs text-center mt-1 px-2 py-0.5 rounded-full mx-auto w-fit",
                        threeCardReading.future.reversed
                          ? "bg-orange-500/20 text-orange-400"
                          : "bg-green-500/20 text-green-400",
                      )}
                    >
                      {threeCardReading.future.reversed ? "Reversed / ပြောင်းပြန်" : "Upright / မတ်မတ်"}
                    </p>
                    <p className="text-xs text-muted-foreground mt-3 text-center leading-relaxed">
                      {threeCardReading.future.reversed
                        ? threeCardReading.future.card.reversedMeaning.split(".")[0] + "."
                        : threeCardReading.future.card.uprightMeaning.split(".")[0] + "."}
                    </p>
                  </div>
                </div>

                {detailedSummary && (
                  <div className="space-y-4">
                    {/* Overall Energy Indicator */}
                    <div
                      className={cn(
                        "p-4 rounded-2xl border text-center",
                        detailedSummary.overallEnergy === "positive"
                          ? "bg-green-500/10 border-green-500/30"
                          : "bg-orange-500/10 border-orange-500/30",
                      )}
                    >
                      <div className="flex items-center justify-center gap-2 mb-2">
                        <TrendingUp
                          className={cn(
                            "w-5 h-5",
                            detailedSummary.overallEnergy === "positive" ? "text-green-400" : "text-orange-400",
                          )}
                        />
                        <span
                          className={cn(
                            "font-semibold",
                            detailedSummary.overallEnergy === "positive" ? "text-green-400" : "text-orange-400",
                          )}
                        >
                          Overall Energy: {detailedSummary.overallEnergy === "positive" ? "Positive" : "Challenging"}(
                          {detailedSummary.positiveCards}/3 Upright)
                        </span>
                      </div>
                      <p
                        className={cn(
                          "text-sm",
                          detailedSummary.overallEnergy === "positive" ? "text-green-400/80" : "text-orange-400/80",
                        )}
                      >
                        အလုံးစုံစွမ်းအင်: {detailedSummary.overallEnergyMM} ({detailedSummary.positiveCards}/၃ မတ်မတ်)
                      </p>
                    </div>

                    {/* Main Summary */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-sky-dark/30 via-card to-cyan/10 border border-sky/40 shadow-xl shadow-sky/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-sky to-cyan flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-background" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Complete Reading Summary</h3>
                          <p className="text-sm text-sky-light">ပြည့်စုံသော ဖတ်ခြင်း အကျဉ်းချုပ်</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        {/* English Summary */}
                        <div className="p-4 rounded-xl bg-background/50 border border-sky/20">
                          <p className="text-foreground leading-relaxed whitespace-pre-line">
                            {detailedSummary.mainEN}
                          </p>
                        </div>

                        {/* Myanmar Summary */}
                        <div className="p-4 rounded-xl bg-background/50 border border-sky/20">
                          <p className="text-sky-light/90 leading-relaxed whitespace-pre-line">
                            {detailedSummary.mainMM}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Advice Section */}
                    <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan/10 via-card to-sky-dark/20 border border-cyan/30 shadow-lg shadow-cyan/10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan to-sky flex items-center justify-center">
                          <Lightbulb className="w-6 h-6 text-background" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold">Guidance & Advice</h3>
                          <p className="text-sm text-cyan">လမ်းညွှန်ချက်နှင့် အကြံပေးချက်</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 rounded-xl bg-background/50 border border-cyan/20">
                          <p className="text-foreground leading-relaxed">{detailedSummary.adviceEN}</p>
                        </div>
                        <div className="p-4 rounded-xl bg-background/50 border border-cyan/20">
                          <p className="text-cyan/80 leading-relaxed">{detailedSummary.adviceMM}</p>
                        </div>
                      </div>
                    </div>

                    {/* Key Themes */}
                    <div className="p-5 rounded-2xl bg-card border border-sky/30">
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-5 h-5 text-sky-light" />
                        <h4 className="font-semibold">Key Themes / အဓိကအကြောင်းအရာများ</h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {[
                          ...threeCardReading.past.card.keywords.slice(0, 2),
                          ...threeCardReading.present.card.keywords.slice(0, 2),
                          ...threeCardReading.future.card.keywords.slice(0, 2),
                        ].map((keyword, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-sm rounded-full bg-sky/20 text-sky-light border border-sky/30"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {[
                          ...threeCardReading.past.card.keywordsMM.slice(0, 2),
                          ...threeCardReading.present.card.keywordsMM.slice(0, 2),
                          ...threeCardReading.future.card.keywordsMM.slice(0, 2),
                        ].map((keyword, i) => (
                          <span
                            key={i}
                            className="px-3 py-1.5 text-sm rounded-full bg-cyan/20 text-cyan border border-cyan/30"
                          >
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* New Reading Button */}
                <Button
                  onClick={generateThreeCardReading}
                  variant="outline"
                  className="w-full border-sky/50 text-sky-light hover:bg-sky/10 bg-transparent"
                >
                  <RotateCcw className="w-4 h-4 mr-2" />
                  New 3-Card Reading / ကတ် ၃ ချပ် အသစ်ဖတ်ရန်
                </Button>
              </div>
            )}

            {/* Element Info */}
            <div className="p-6 rounded-2xl bg-card border border-sky/30 shadow-lg shadow-sky/10">
              <h4 className="font-semibold text-sky-light mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Element / ဒြပ်စင်
              </h4>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-sky/10">{getElementIcon(selectedSign.element)}</div>
                <div>
                  <p className="font-medium">{selectedSign.element}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedSign.element === "Fire" && "မီး - Passionate & Energetic"}
                    {selectedSign.element === "Water" && "ရေ - Emotional & Intuitive"}
                    {selectedSign.element === "Earth" && "မြေ - Practical & Stable"}
                    {selectedSign.element === "Air" && "လေ - Intellectual & Social"}
                  </p>
                </div>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleReset}
              className="w-full border-sky/50 text-sky-light hover:bg-sky/10 bg-transparent"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Choose Another Sign / အခြားရာသီခွင်ကို ရွေးပါ
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
