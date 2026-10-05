'use client'

import { motion } from 'framer-motion'
import { GraduationCap, MapPin } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { EDUCATION } from '@/lib/site'
import { Reveal, SectionHeading } from './primitives'

export function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="education-title" index="06" eyebrow="Academics" title="Education" />
        <Reveal className="mt-14 md:mt-20">
          <article className="relative grid overflow-hidden rounded-[2rem] border border-ink/10 bg-card/70 backdrop-blur md:grid-cols-[auto_1fr_auto]">
            <div aria-hidden className="absolute inset-y-0 right-0 w-1/2 bg-dots opacity-40 [mask-image:linear-gradient(to_left,black,transparent)]" />
            <div className="relative flex items-center gap-4 border-b border-ink/10 p-6 md:border-b-0 md:border-r md:p-10">
              <span className="grid size-14 place-items-center rounded-2xl bg-ink text-white">
                <GraduationCap aria-hidden className="size-6" />
              </span>
            </div>
            <div className="relative p-6 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">Degree</p>
              <h3 className="mt-3 text-balance text-2xl font-semibold tracking-[-0.03em] text-ink md:text-3xl">
                {EDUCATION.degree}
              </h3>
              <p className="mt-4 flex items-start gap-2 text-pretty text-muted-foreground">
                <MapPin aria-hidden className="mt-1 size-4 shrink-0 text-brand" />
                {EDUCATION.institution}
              </p>
            </div>
            <div className="relative flex items-center gap-4 border-t border-ink/10 p-6 md:flex-col md:items-start md:justify-center md:border-l md:border-t-0 md:p-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">CGPA</p>
              <p className="text-5xl font-semibold tracking-[-0.04em] text-ink">
                {EDUCATION.cgpa}
                <span className="text-xl text-muted-foreground">/10</span>
              </p>
              <div className="ml-auto h-1.5 w-28 overflow-hidden rounded-full bg-ink/10 md:ml-0" aria-hidden>
                <motion.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-brand to-brand-2"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: EDUCATION.cgpa / 10 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.4, ease: EASE, delay: 0.3 }}
                />
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  )
}
