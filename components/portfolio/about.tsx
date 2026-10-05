'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { EDUCATION } from '@/lib/site'
import { Reveal, SectionHeading } from './primitives'

const LABELS = ['AI / ML', 'Full-Stack', 'Data Analytics', 'Python']

const JOURNEY = [
  { label: 'Foundation', value: 'B.Tech · AI & Data Science' },
  { label: 'Internships', value: 'Alfido Tech · CodeTech' },
  { label: 'Building', value: 'SpendWise AI · MoveMate · SQL Analysis' },
  { label: 'Now', value: 'Open to opportunities' },
]

function CgpaRing() {
  const radius = 44
  const circumference = 2 * Math.PI * radius
  const fraction = EDUCATION.cgpa / 10

  return (
    <div className="relative size-32 shrink-0">
      <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
        <circle cx="50" cy="50" r={radius} fill="none" stroke="var(--border)" strokeWidth="4" />
        <motion.circle
          cx="50"
          cy="50"
          r={radius}
          fill="none"
          stroke="url(#cgpa-gradient)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          whileInView={{ strokeDashoffset: circumference * (1 - fraction) }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.2 }}
        />
        <defs>
          <linearGradient id="cgpa-gradient" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand)" />
            <stop offset="100%" stopColor="var(--brand-2)" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 grid place-content-center text-center">
        <span className="text-3xl font-semibold tracking-tight text-ink">{EDUCATION.cgpa}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">/ 10 CGPA</span>
      </div>
    </div>
  )
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading id="about-title" index="01" eyebrow="About" title="About me" />

        <div className="mt-14 grid gap-12 lg:mt-20 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-7">
            <Reveal>
              <p className="text-pretty text-2xl font-medium leading-snug tracking-[-0.02em] text-ink md:text-3xl md:leading-snug">
                I am a B.Tech Artificial Intelligence and Data Science student with an{' '}
                <span className="text-brand">8.6/10 CGPA</span>, focused on building AI-powered web applications
                and data-driven solutions.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-8 md:grid-cols-2">
              <Reveal delay={0.1}>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  I work across frontend development, backend APIs, machine learning, and data analytics, with
                  hands-on experience using Python, FastAPI, React, TypeScript, SQL, and Scikit-learn.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="text-pretty leading-relaxed text-muted-foreground">
                  My goal is to build practical software where intelligent systems and great user experiences
                  come together.
                </p>
              </Reveal>
            </div>
            <ul className="mt-10 flex flex-wrap gap-2.5" aria-label="Focus areas">
              {LABELS.map((label, i) => (
                <motion.li
                  key={label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.25 + i * 0.07 }}
                  className="rounded-full border border-ink/12 bg-card/70 px-4 py-2 font-mono text-[11px] uppercase tracking-[0.16em] text-ink backdrop-blur transition-colors hover:border-brand/40 hover:text-brand"
                >
                  {label}
                </motion.li>
              ))}
            </ul>
          </div>

          <Reveal delay={0.15} className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-3xl border border-ink/10 bg-card/70 p-6 shadow-[0_30px_60px_-30px_oklch(0.19_0.025_275/0.2)] backdrop-blur sm:p-8">
              <div aria-hidden className="absolute -right-10 -top-10 size-40 bg-dots opacity-60 [mask-image:radial-gradient(circle,black,transparent_70%)]" />
              <div className="relative flex items-center gap-6">
                <CgpaRing />
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Based in</p>
                  <p className="mt-1 font-medium text-ink">Coimbatore, Tamil Nadu</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Focus</p>
                  <p className="mt-1 font-medium text-ink">AI × Full-Stack</p>
                </div>
              </div>

              <ol className="relative mt-8 space-y-6 border-t border-ink/10 pt-8">
                <span aria-hidden className="absolute bottom-2 left-[5px] top-10 w-px bg-gradient-to-b from-brand/60 to-ink/10" />
                {JOURNEY.map((step, i) => (
                  <motion.li
                    key={step.label}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, ease: EASE, delay: 0.3 + i * 0.1 }}
                    className="relative flex gap-5 pl-0"
                  >
                    <span
                      aria-hidden
                      className={`relative mt-1.5 size-[11px] shrink-0 rounded-full border-2 ${
                        i === JOURNEY.length - 1 ? 'border-emerald-500 bg-emerald-500' : 'border-brand bg-card'
                      }`}
                    />
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{step.label}</p>
                      <p className="mt-1 text-sm font-medium text-ink">{step.value}</p>
                    </div>
                  </motion.li>
                ))}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
