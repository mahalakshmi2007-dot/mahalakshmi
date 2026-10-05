'use client'

import { motion } from 'framer-motion'
import { Award } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { CERTIFICATIONS } from '@/lib/site'
import { SectionHeading } from './primitives'

export function Certifications() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="certifications-title" index="05" eyebrow="Credentials" title="Certifications" />
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-4">
          {CERTIFICATIONS.map((cert, i) => (
            <motion.li
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: i * 0.08 }}
              className="group relative flex min-h-56 flex-col justify-between overflow-hidden rounded-3xl border border-ink/10 bg-card/70 p-6 backdrop-blur transition-[border-color,box-shadow,transform] duration-500 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[0_30px_60px_-30px_oklch(0.5_0.21_277/0.4)]"
            >
              <div
                aria-hidden
                className="absolute -right-12 -top-12 size-36 rounded-full bg-[radial-gradient(circle,oklch(0.88_0.07_277/0.7),transparent_70%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-start justify-between">
                <span className="grid size-11 place-items-center rounded-2xl bg-brand-soft text-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                  <Award aria-hidden className="size-5" />
                </span>
                <span className="font-mono text-xs text-muted-foreground">{String(i + 1).padStart(2, '0')}</span>
              </div>
              <div className="relative mt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-brand">{cert.issuer}</p>
                <h3 className="mt-2 text-xl font-semibold tracking-[-0.02em] text-ink">{cert.title}</h3>
              </div>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
