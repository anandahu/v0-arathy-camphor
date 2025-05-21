export default function DecorativeDivider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center my-8 ${className}`}>
      <div className="h-px bg-amber-300 w-16"></div>
      <div className="mx-4 text-amber-500">✦</div>
      <div className="h-px bg-amber-300 w-16"></div>
    </div>
  )
}
