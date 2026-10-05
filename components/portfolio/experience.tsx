'use client'

import { motion, useScroll, useSpring } from 'framer-motion'
import { Briefcase } from 'lucide-react'
import { useRef } from 'react'
import { EASE } from '@/lib/motion'
import { EXPERIENCE } from '@/lib/site'
import { SectionHeading } from './primitives'

export function Experience() {
  const listRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 90, damping: 24 })

  return (
    <section id="experience" aria-labelledby="experience-title" className="relative py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading
              id="experience-title"
              index="03"
              eyebrow="Experience"
              title="Internship experience"
              description="Hands-on internships across Python development and full-stack web workflows."
            />
          </div>
        </div>

        <ol ref={listRef} className="relative lg:col-span-7">
          <span aria-hidden className="absolute bottom-0 left-[19px] top-0 w-px bg-ink/10" />
          <motion.span
            aria-hidden
            style={{ scaleY: fill }}
            className="absolute bottom-0 left-[19px] top-0 w-px origin-top bg-gradient-to-b from-brand to-brand-2"
          />
          {EXPERIENCE.map((item, i) => (
            <motion.li
              key={item.company}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative pb-14 pl-16 last:pb-0"
            >
              <span className="absolute left-0 top-0 grid size-10 place-items-center rounded-full border border-ink/10 bg-card shadow-sm">
                <Briefcase aria-hidden className="size-4 text-brand" />
              </span>
              <article className="group rounded-3xl border border-ink/10 bg-card/70 p-6 backdrop-blur transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1 hover:border-brand/30 hover:shadow-[0_30px_60px_-30px_oklch(0.5_0.21_277/0.35)] sm:p-8">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">
                  {String(i + 1).padStart(2, '0')} · Internship
                </p>
                <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em] text-ink md:text-3xl">{item.role}</h3>
                <p className="mt-1 text-lg font-medium text-muted-foreground">{item.company}</p>
                <ul className="mt-6 space-y-3 border-t border-ink/10 pt-6">
                  {item.points.map((point) => (
                    <li key={point} className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
                      <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand/70" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  )
}
