import { cn } from "@/lib/utils"

interface DecorativePatternProps {
  className?: string
}

export default function DecorativePattern({ className }: DecorativePatternProps) {
  return (
    <svg viewBox="0 0 100 100" className={cn("w-16 h-16", className)} fill="currentColor">
      {/* Lotus-inspired pattern */}
      <g transform="translate(50,50)">
        {/* Center flame/drop */}
        <path d="M0,-20 C-8,-15 -8,-5 0,0 C8,-5 8,-15 0,-20 Z" className="fill-flame-500" />

        {/* Petals */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <g key={i} transform={`rotate(${angle})`}>
            <path d="M0,-15 C-5,-20 -5,-25 0,-30 C5,-25 5,-20 0,-15 Z" className="fill-current opacity-60" />
          </g>
        ))}

        {/* Inner circle */}
        <circle r="8" className="fill-maroon-600 opacity-80" />
        <circle r="4" className="fill-flame-400" />
      </g>
    </svg>
  )
}
