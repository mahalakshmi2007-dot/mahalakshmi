export function SiteBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,black,transparent_75%)]" />
      <div className="animate-blob absolute -left-[10%] -top-[15%] size-[55vmax] rounded-full bg-[radial-gradient(circle,oklch(0.85_0.08_277/0.55),transparent_65%)] blur-3xl" />
      <div
        className="animate-blob absolute -right-[15%] top-[35%] size-[45vmax] rounded-full bg-[radial-gradient(circle,oklch(0.9_0.06_230/0.5),transparent_65%)] blur-3xl"
        style={{ animationDelay: '-8s' }}
      />
      <div className="absolute inset-0 bg-noise opacity-[0.05] mix-blend-multiply" />
    </div>
  )
}
