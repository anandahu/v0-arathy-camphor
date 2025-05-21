export default function DecorativePattern({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
          <pattern id="devotional-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
            <path
              d="M10 0H0V10H10V0ZM7 5C7 6.10457 6.10457 7 5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5Z"
              fill="currentColor"
            />
          </pattern>
          <rect width="100%" height="100%" fill="url(#devotional-pattern)" />
        </svg>
      </div>
    </div>
  )
}
