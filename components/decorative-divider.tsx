import { cn } from "@/lib/utils"

interface DecorativeDividerProps {
  className?: string
}

export default function DecorativeDivider({ className }: DecorativeDividerProps) {
  return (
    <div className={cn("flex items-center justify-center py-8", className)}>
      <div className="flex items-center gap-4">
        <div className="h-px bg-gradient-to-r from-transparent via-maroon-300 to-maroon-300 w-16"></div>

        <svg viewBox="0 0 60 20" className="w-16 h-5 text-maroon-400" fill="currentColor">
          {/* Decorative flame pattern */}
          <path d="M10,10 C15,5 20,8 25,10 C20,12 15,15 10,10 Z" className="fill-flame-500" />
          <path d="M25,10 C30,5 35,8 40,10 C35,12 30,15 25,10 Z" className="fill-maroon-500" />
          <path d="M40,10 C45,5 50,8 55,10 C50,12 45,15 40,10 Z" className="fill-flame-500" />

          {/* Connecting dots */}
          <circle cx="5" cy="10" r="1.5" className="fill-maroon-400" />
          <circle cx="55" cy="10" r="1.5" className="fill-maroon-400" />
        </svg>

        <div className="h-px bg-gradient-to-l from-transparent via-maroon-300 to-maroon-300 w-16"></div>
      </div>
    </div>
  )
}
