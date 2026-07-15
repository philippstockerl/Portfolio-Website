import type { ReactNode } from 'react'

import { ArrowLeftIcon } from '../components/ui/Icons'

interface PageShellProps {
  backLabel: string
  children: ReactNode
}

export function PageShell({ backLabel, children }: PageShellProps) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-28 pb-28 sm:px-6 sm:pt-32 lg:px-8">
      <a
        href="#/"
        className="inline-flex items-center gap-2 rounded-full border border-line bg-panel px-4 py-2 text-sm font-medium text-muted backdrop-blur transition hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <ArrowLeftIcon className="h-4 w-4" />
        {backLabel}
      </a>
      <div className="mt-12">{children}</div>
    </div>
  )
}
