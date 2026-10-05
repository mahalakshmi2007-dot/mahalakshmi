'use client'

import { ArrowUp, Mail } from 'lucide-react'
import { SITE } from '@/lib/site'
import { GithubIcon, LinkedinIcon } from './primitives'

const LINKS = [
  { label: 'GitHub', href: SITE.github, icon: GithubIcon, external: true },
  { label: 'LinkedIn', href: SITE.linkedin, icon: LinkedinIcon, external: true },
  { label: 'Email', href: `mailto:${SITE.email}`, icon: Mail, external: false },
]

export function Footer() {
  return (
    <footer className="relative border-t border-ink/10">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-4xl font-semibold uppercase tracking-[-0.04em] text-ink sm:text-5xl">
              Mahalakshmi <span className="text-brand">S</span>
            </p>
            <p className="mt-3 max-w-md text-sm text-muted-foreground">{SITE.title}</p>
          </div>
          <ul className="flex flex-wrap gap-2">
            {LINKS.map((link) => {
              const Icon = link.icon
              return (
                <li key={link.label}>
                  <a
                    href={link.href}
                    {...(link.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="group inline-flex h-11 items-center gap-2 rounded-full border border-ink/12 px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:border-brand/40 hover:text-brand"
                  >
                    <Icon className="size-4" aria-hidden />
                    {link.label}
                  </a>
                </li>
              )
            })}
          </ul>
        </div>
        <div className="mt-12 flex items-center justify-between gap-4 border-t border-ink/10 pt-6">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground">© 2026 Mahalakshmi S</p>
          <a
            href="#home"
            className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-ink transition-colors hover:text-brand"
          >
            Back to top
            <span className="grid size-9 place-items-center rounded-full border border-ink/12 transition-[transform,border-color] duration-300 group-hover:-translate-y-1 group-hover:border-brand/40">
              <ArrowUp aria-hidden className="size-4" />
            </span>
          </a>
        </div>
      </div>
    </footer>
  )
}
