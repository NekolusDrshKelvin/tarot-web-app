"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Sparkles, Moon, Star, HelpCircle, Home, Waves } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", labelMM: "ပင်မ", icon: Home },
  { href: "/reading", label: "Card Reading", labelMM: "ကဒ်ဖတ်ခြင်း", icon: Sparkles },
  { href: "/yes-no", label: "Yes/No", labelMM: "ဟုတ်/မဟုတ်", icon: HelpCircle },
  { href: "/zodiac", label: "Zodiac", labelMM: "ရာသီခွင်", icon: Star },
  { href: "/cards", label: "All Cards", labelMM: "ကဒ်အားလုံး", icon: Moon },
]

export function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-t border-border md:relative md:border-t-0 md:border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Hidden on mobile */}
          <Link href="/" className="hidden md:flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-sky to-cyan flex items-center justify-center shadow-lg shadow-sky/30">
              <Waves className="w-5 h-5 text-background" />
            </div>
            <span className="font-bold text-xl bg-gradient-to-r from-sky-light to-cyan bg-clip-text text-transparent">
              Mystic Tarot
            </span>
          </Link>

          {/* Nav Items */}
          <div className="flex items-center justify-around w-full md:w-auto md:gap-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex flex-col md:flex-row items-center gap-1 md:gap-2 px-3 py-2 rounded-lg transition-all",
                    isActive
                      ? "text-sky-light bg-sky/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted",
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs md:text-sm">{item.label}</span>
                </Link>
              )
            })}
          </div>
        </div>
      </div>
    </nav>
  )
}
