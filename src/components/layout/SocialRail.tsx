import { emailAddress, socialLinks } from '../../content/portfolio'

export function SocialRail({ label }: { label: string }) {
  return (
    <aside
      aria-label={label}
      className="fixed top-1/2 left-7 z-20 hidden -translate-y-1/2 flex-col items-center gap-2 2xl:flex"
    >
      {socialLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noreferrer"
          aria-label={link.label}
          className="grid h-10 w-10 place-items-center rounded-full border border-line bg-header transition hover:-translate-y-0.5 hover:border-accent focus-visible:outline-2 focus-visible:outline-accent"
        >
          <img src={link.icon} alt="" className="theme-icon h-4 w-4" />
        </a>
      ))}
      <a
        href={`mailto:${emailAddress}`}
        className="mt-2 rounded-full border border-line bg-header px-2 py-4 font-mono text-[0.68rem] tracking-wide text-muted transition [writing-mode:vertical-rl] hover:border-accent hover:text-ink focus-visible:outline-2 focus-visible:outline-accent"
      >
        {emailAddress}
      </a>
    </aside>
  )
}
