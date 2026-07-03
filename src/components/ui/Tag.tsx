export function Tag({ children }: { children: string }) {
  return (
    <span className="rounded-full border border-line bg-panel-strong px-3 py-1 font-mono text-[0.68rem] tracking-wide text-muted">
      {children}
    </span>
  )
}
