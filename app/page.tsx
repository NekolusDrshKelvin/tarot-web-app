import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Sparkles, Moon, Star, HelpCircle, Waves } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-sky-dark/20 to-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-4 overflow-hidden">
        <div className="absolute inset-0 star-bg opacity-30" />
        <div className="absolute top-20 left-10 w-64 h-64 bg-sky/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-teal/5 rounded-full blur-3xl" />

        <div className="container mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky/10 border border-sky/30 mb-8 backdrop-blur-sm">
            <Waves className="w-4 h-4 text-sky-light" />
            <span className="text-sm text-sky-light">Mystic Tarot Reading</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-balance">
            <span className="text-foreground">Discover Your </span>
            <span className="bg-gradient-to-r from-sky-light via-cyan to-teal bg-clip-text text-transparent">
              Destiny
            </span>
          </h1>

          <p className="text-lg text-muted-foreground mb-2 max-w-xl mx-auto">
            Unlock the secrets of the universe with our modern tarot readings
          </p>
          <p className="text-lg text-sky-light/80 mb-8 max-w-xl mx-auto font-medium">
            တာရိုဖတ်ခြင်းဖြင့် စကြဝဠာ၏လျှို့ဝှက်ချက်များကို ဖော်ထုတ်ပါ
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-gradient-to-r from-sky to-cyan text-background hover:opacity-90 shadow-lg shadow-sky/25"
            >
              <Link href="/reading">
                <Sparkles className="w-5 h-5 mr-2" />
                Start Reading
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-sky/50 text-sky-light hover:bg-sky/10 bg-transparent backdrop-blur-sm"
            >
              <Link href="/yes-no">
                <HelpCircle className="w-5 h-5 mr-2" />
                Yes/No Question
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">Choose Your Reading</h2>
          <p className="text-center text-muted-foreground mb-12">သင့်ဖတ်ခြင်းကို ရွေးချယ်ပါ</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {/* Card Reading */}
            <Link href="/reading" className="group">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-sky/50 transition-all hover:shadow-lg hover:shadow-sky/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-sky to-cyan flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-sky/20">
                  <Moon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Card Reading</h3>
                <p className="text-sm text-sky-light mb-2">ကဒ်ဖတ်ခြင်း</p>
                <p className="text-sm text-muted-foreground">
                  Draw cards to reveal insights about your past, present, and future
                </p>
              </div>
            </Link>

            {/* Yes/No */}
            <Link href="/yes-no" className="group">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-sky/50 transition-all hover:shadow-lg hover:shadow-sky/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal to-emerald-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-teal/20">
                  <HelpCircle className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Yes/No Reading</h3>
                <p className="text-sm text-sky-light mb-2">ဟုတ်/မဟုတ် မေးခွန်း</p>
                <p className="text-sm text-muted-foreground">Get a quick answer to your burning questions</p>
              </div>
            </Link>

            {/* Zodiac */}
            <Link href="/zodiac" className="group">
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-sky/50 transition-all hover:shadow-lg hover:shadow-sky/10">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan to-sky-light flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-cyan/20">
                  <Star className="w-7 h-7 text-background" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Zodiac Reading</h3>
                <p className="text-sm text-sky-light mb-2">ရာသီခွင်ဖတ်ခြင်း</p>
                <p className="text-sm text-muted-foreground">
                  Explore love, education, and personal insights by your sign
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-border mb-16 md:mb-0">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">Mystic Tarot - Modern Tarot Reading with Myanmar Translations</p>
          <p className="text-xs text-sky-light/60 mt-1">တာရိုဖတ်ခြင်း - မြန်မာဘာသာပြန်ဆိုချက်များဖြင့်</p>
        </div>
      </footer>
    </div>
  )
}
