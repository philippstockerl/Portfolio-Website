import type { SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement>

const defaultProps = {
  'aria-hidden': true,
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  strokeWidth: 1.8,
  viewBox: '0 0 24 24',
} as const

export function ArrowDownIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M12 3v12" />
      <path d="m7 10 5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  )
}

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M7 17 17 7" />
      <path d="M7 7h10v10" />
    </svg>
  )
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  )
}

export function MenuIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  )
}

export function MoonIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <path d="M20.5 14.4A8.4 8.4 0 0 1 9.6 3.5 8.5 8.5 0 1 0 20.5 14.4Z" />
    </svg>
  )
}

export function SunIcon(props: IconProps) {
  return (
    <svg {...defaultProps} {...props}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.9 4.9 1.4 1.4" />
      <path d="m17.7 17.7 1.4 1.4" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m4.9 19.1 1.4-1.4" />
      <path d="m17.7 6.3 1.4-1.4" />
    </svg>
  )
}
