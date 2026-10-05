'use client'

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from 'framer-motion'
import { FileText, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { EASE, useIntroDone } from '@/lib/motion'
import { NAV_ITEMS, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import { GithubIcon, LinkedinIcon } from './primitives'

export function Navbar() {
  const introDone = useIntroDone()
  const { scrollY, scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 })
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string>('')

  useMotionValueEvent(scrollY, 'change', (v) => setScrolled(v > 24))

  useEffect(() => {
    const ids = [...NAV_ITEMS.map((n) => n.id), 'resume']
    const els = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el))
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    els.forEach((el) => observer.observe(el))
    const hero = document.getElementById('home')
    const heroObserver = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setActive(''),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    if (hero) heroObserver.observe(hero)
    return () => {
      observer.disconnect()
      heroObserver.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 z-[90] h-0.5 origin-left bg-gradient-to-r from-brand to-brand-2"
        style={{ scaleX: progress }}
      />
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ y: -24, opacity: 0 }}
        animate={introDone ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: EASE, delay: 0.1 }}
      >
        <div
          className={cn(
            'mx-auto mt-2 flex h-16 max-w-7xl items-center justify-between gap-4 rounded-full px-4 transition-all duration-500 sm:px-6',
            scrolled || open
              ? 'mx-2 border border-ink/10 bg-background/70 shadow-[0_8px_30px_-12px_oklch(0.19_0.025_275/0.18)] backdrop-blur-xl sm:mx-4 xl:mx-auto'
              : 'border border-transparent',
          )}
        >
          <a
            href="#home"
            onClick={() => setOpen(false)}
            className="group flex items-center gap-2.5"
            aria-label="Mahalakshmi S — back to top"
          >
            <span className="grid size-8 place-items-center rounded-full bg-ink text-sm font-semibold text-white transition-colors group-hover:bg-brand">
              M
            </span>
            <span className="font-mono text-xs font-medium uppercase tracking-[0.2em] text-ink">
              Mahalakshmi S
            </span>
          </a>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center">
              {NAV_ITEMS.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={active === item.id ? 'true' : undefined}
                    className={cn(
                      'relative block px-2.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors xl:px-3.5',
                      active === item.id ? 'text-ink' : 'text-muted-foreground hover:text-ink',
                    )}
                  >
                    {item.label}
                    {active === item.id && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-2.5 -bottom-0.5 h-px bg-brand xl:inset-x-3.5"
                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <a
              href={SITE.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-brand-soft hover:text-brand sm:grid"
              aria-label="GitHub profile (opens in new tab)"
            >
              <GithubIcon className="size-[18px]" />
            </a>
            <a
              href={SITE.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden size-10 place-items-center rounded-full text-ink/70 transition-colors hover:bg-brand-soft hover:text-brand sm:grid"
              aria-label="LinkedIn profile (opens in new tab)"
            >
              <LinkedinIcon className="size-[17px]" />
            </a>
            <a
              href="#resume"
              className={cn(
                'ml-1 hidden h-10 items-center gap-2 rounded-full bg-ink px-4 font-mono text-[11px] uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand sm:inline-flex',
                active === 'resume' && 'bg-brand',
              )}
            >
              <FileText aria-hidden className="size-3.5" />
              Resume
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              className="ml-1 grid size-11 place-items-center rounded-full text-ink transition-colors hover:bg-brand-soft lg:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[70] bg-background/95 backdrop-blur-xl lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav aria-label="Mobile" className="flex h-full flex-col px-6 pb-8 pt-28">
              <ul className="flex flex-col">
                {NAV_ITEMS.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: EASE, delay: 0.04 * i }}
                    className="border-b border-ink/10"
                  >
                    <a
                      href={`#${item.id}`}
                      onClick={() => setOpen(false)}
                      className="flex items-baseline gap-4 py-3.5 text-2xl font-semibold uppercase tracking-[-0.02em] text-ink"
                    >
                      <span className="font-mono text-xs font-normal text-brand">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <motion.div
                className="mt-auto flex flex-col gap-3"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: EASE, delay: 0.35 }}
              >
                <a
                  href="#resume"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-ink font-mono text-xs uppercase tracking-[0.14em] text-white"
                >
                  <FileText aria-hidden className="size-4" />
                  Resume
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <a
                    href={SITE.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 font-mono text-xs uppercase tracking-[0.14em] text-ink"
                  >
                    <GithubIcon className="size-4" /> GitHub
                  </a>
                  <a
                    href={SITE.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-12 items-center justify-center gap-2 rounded-full border border-ink/15 font-mono text-xs uppercase tracking-[0.14em] text-ink"
                  >
                    <LinkedinIcon className="size-4" /> LinkedIn
                  </a>
                </div>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
