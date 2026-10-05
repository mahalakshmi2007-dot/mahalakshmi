'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, Mail, MapPin, Send } from 'lucide-react'
import { useState, type FormEvent } from 'react'
import { EASE } from '@/lib/motion'
import { SITE } from '@/lib/site'
import { GithubIcon, LinkedinIcon, Reveal, SectionHeading } from './primitives'

const CHANNELS = [
  { label: 'Email', value: SITE.email, href: `mailto:${SITE.email}`, icon: Mail, external: false },
  { label: 'GitHub', value: 'mahalakshmi2007-dot', href: SITE.github, icon: GithubIcon, external: true },
  { label: 'LinkedIn', value: 'Mahalakshmi S', href: SITE.linkedin, icon: LinkedinIcon, external: true },
  { label: 'Location', value: SITE.location, href: null, icon: MapPin, external: false },
] as const

const inputClass =
  'w-full rounded-2xl border border-ink/12 bg-background/70 px-4 py-3.5 text-base text-ink placeholder:text-muted-foreground/70 transition-[border-color,box-shadow] duration-300 focus:border-brand focus:outline-none focus:ring-4 focus:ring-brand/15'

export function Contact() {
  const [opened, setOpened] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    const subject = `Portfolio enquiry from ${name}`
    const body = `${message}\n\n— ${name} (${email})`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    setOpened(true)
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="08"
            eyebrow="Contact"
            title="Let's connect"
            description="Have an opportunity, project idea, or collaboration in mind? I'd love to hear from you."
          />
          <ul className="mt-10 divide-y divide-ink/10 border-y border-ink/10">
            {CHANNELS.map((c, i) => {
              const Icon = c.icon
              const inner = (
                <>
                  <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-white">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                      {c.label}
                    </span>
                    <span className="mt-0.5 block truncate font-medium text-ink">{c.value}</span>
                  </span>
                  {c.href && (
                    <ArrowUpRight
                      aria-hidden
                      className="size-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand"
                    />
                  )}
                </>
              )
              return (
                <motion.li
                  key={c.label}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.1 + i * 0.07 }}
                >
                  {c.href ? (
                    <a
                      href={c.href}
                      {...(c.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="group flex items-center gap-4 py-4"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex items-center gap-4 py-4">{inner}</div>
                  )}
                </motion.li>
              )
            })}
          </ul>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="rounded-[2rem] border border-ink/10 bg-card/70 p-6 shadow-[0_40px_80px_-50px_oklch(0.19_0.025_275/0.35)] backdrop-blur sm:p-10"
            aria-describedby="contact-form-note"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-name" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  Name
                </label>
                <input id="contact-name" name="name" required autoComplete="name" placeholder="Your name" className={inputClass} />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="contact-email" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                  Email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>
            <div className="mt-5 flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink">
                Message
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                placeholder="Tell me about the opportunity or idea…"
                className={`${inputClass} resize-y`}
              />
            </div>
            <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p id="contact-form-note" className="max-w-xs text-sm leading-relaxed text-muted-foreground">
                This opens your email app with the message pre-filled — nothing is sent from this website.
              </p>
              <button
                type="submit"
                className="group inline-flex h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:bg-brand"
              >
                Send message
                <Send aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-1" />
              </button>
            </div>
            <p role="status" className="mt-4 min-h-5 text-sm text-brand">
              {opened ? 'Your email app should now be open with this message ready to send.' : ''}
            </p>
          </form>
        </Reveal>
      </div>
    </section>
  )
}
