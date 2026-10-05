'use client'

import { motion } from 'framer-motion'
import { Download, Eye } from 'lucide-react'
import { EASE } from '@/lib/motion'
import { RESUME_URL } from '@/lib/site'
import { Magnetic } from './primitives'

export function ResumeCta() {
  return (
    <section id="resume" aria-labelledby="resume-title" className="relative px-3 py-16 sm:px-6 md:py-24">
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.9, ease: EASE }}
        className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.25rem] bg-ink px-6 py-16 text-white sm:px-12 md:py-24"
      >
        <div aria-hidden className="absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_top_right,black,transparent_70%)]" />
        <div aria-hidden className="animate-blob absolute -right-24 -top-24 size-96 rounded-full bg-[radial-gradient(circle,oklch(0.55_0.2_277/0.8),transparent_65%)] blur-2xl" />
        <div aria-hidden className="animate-blob absolute -bottom-32 left-1/4 size-80 rounded-full bg-[radial-gradient(circle,oklch(0.6_0.13_230/0.5),transparent_65%)] blur-2xl" style={{ animationDelay: '-10s' }} />

        <div className="relative grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-end">
          <div>
            <p className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              <span className="text-white">07</span>
              <span aria-hidden className="h-px w-10 bg-white/30" />
              Resume
            </p>
            <h2
              id="resume-title"
              className="mt-6 text-balance text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.04em] sm:text-5xl lg:text-7xl"
            >
              Let&apos;s build something <span className="text-[oklch(0.78_0.12_277)]">intelligent.</span>
            </h2>
            <p className="mt-6 max-w-md text-pretty text-lg leading-relaxed text-white/70">
              Interested in full-stack development, AI/ML, and data-driven applications.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Magnetic className="w-full sm:w-auto">
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-white px-7 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-colors hover:bg-brand-soft sm:w-auto"
              >
                <Eye aria-hidden className="size-4 transition-transform group-hover:scale-110" />
                View resume
              </a>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <a
                href={RESUME_URL}
                download="Mahalakshmi-S-Resume.pdf"
                className="group inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full border border-white/25 px-7 font-mono text-xs font-medium uppercase tracking-[0.14em] text-white transition-colors hover:border-white hover:bg-white/10 sm:w-auto"
              >
                <Download aria-hidden className="size-4 transition-transform group-hover:translate-y-0.5" />
                Download resume
              </a>
            </Magnetic>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
