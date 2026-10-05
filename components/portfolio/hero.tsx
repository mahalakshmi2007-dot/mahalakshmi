'use client'

import { motion, useInView, useReducedMotion, useScroll, useTransform, type Variants } from 'framer-motion'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { EASE, useIntroDone, useMediaQuery } from '@/lib/motion'
import { CtaLink, Magnetic } from './primitives'
import { HeroMobileVisual } from './hero-mobile-visual'

const HeroScene = dynamic(() => import('./hero-scene'), { ssr: false })

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
}
const lineReveal: Variants = {
  hidden: { y: '110%' },
  show: { y: 0, transition: { duration: 1, ease: EASE } },
}

export function Hero() {
  const introDone = useIntroDone()
  const reduce = useReducedMotion() ?? false
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const sectionRef = useRef<HTMLElement>(null)
  const visualRef = useRef<HTMLDivElement>(null)
  const visualInView = useInView(visualRef, { margin: '0px 0px -10% 0px' })
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const visualY = useTransform(scrollYProgress, [0, 1], [0, 120])
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60])

  const state = introDone ? 'show' : 'hidden'

  return (
    <section
      id="home"
      ref={sectionRef}
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pt-24"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 sm:px-8 lg:grid-cols-[1.15fr_1fr] lg:gap-6">
        <motion.div style={{ y: textY }} variants={container} initial="hidden" animate={state} className="relative z-10">
          <motion.p
            variants={fadeUp}
            className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.24em] text-brand"
          >
            <span aria-hidden className="h-px w-8 bg-brand" />
            AI & Data Science Student
          </motion.p>

          <h1 id="hero-title" className="mt-6 font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-ink">
            <span className="block overflow-hidden pb-1 text-[clamp(2.4rem,11.5vw,5.5rem)] lg:text-[clamp(3.6rem,6.6vw,6.4rem)]">
              <motion.span variants={lineReveal} className="block">
                Mahalakshmi
              </motion.span>
            </span>
            <span className="flex items-end gap-5 overflow-hidden pb-1">
              <motion.span
                variants={lineReveal}
                className="block bg-gradient-to-br from-brand to-brand-2 bg-clip-text text-[clamp(2.4rem,11.5vw,5.5rem)] text-transparent lg:text-[clamp(3.6rem,6.6vw,6.4rem)]"
              >
                S
              </motion.span>
              <motion.span
                variants={fadeUp}
                aria-hidden
                className="mb-[0.9em] hidden h-px flex-1 bg-gradient-to-r from-ink/25 to-transparent sm:block"
              />
            </span>
          </h1>

          <motion.p
            variants={fadeUp}
            className="mt-6 font-mono text-sm font-medium uppercase tracking-[0.18em] text-ink sm:text-base"
          >
            Full-Stack Developer <span className="text-brand">·</span> AI/ML
          </motion.p>

          <motion.p
            variants={fadeUp}
            className="mt-5 max-w-md text-pretty text-lg leading-relaxed text-muted-foreground"
          >
            Building intelligent, data-driven web applications with modern technologies.
          </motion.p>

          <motion.div variants={fadeUp} className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic className="w-full sm:w-auto">
              <CtaLink href="#projects" className="w-full sm:w-auto">
                View my work
              </CtaLink>
            </Magnetic>
            <Magnetic className="w-full sm:w-auto">
              <CtaLink href="#contact" variant="secondary" className="w-full sm:w-auto">
                Let&apos;s connect
              </CtaLink>
            </Magnetic>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-9 inline-flex items-center gap-2.5 rounded-full border border-ink/10 bg-card/60 px-3.5 py-1.5 backdrop-blur"
          >
            <span className="relative flex size-2">
              <span className="animate-ping-soft absolute inset-0 rounded-full bg-emerald-500" />
              <span className="relative size-2 rounded-full bg-emerald-500" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-ink/80">
              Open to opportunities
            </span>
          </motion.div>
        </motion.div>

        <motion.div
          ref={visualRef}
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={introDone ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 1.4, ease: EASE, delay: 0.75 }}
          className="relative mx-auto aspect-square w-full max-w-[320px] sm:max-w-[420px] lg:max-w-[580px]"
        >
          <div aria-hidden className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle,oklch(0.92_0.05_277/0.9),transparent_68%)]" />
          <div aria-hidden className="absolute inset-[3%] rounded-full border border-dashed border-ink/10" />
          {isDesktop ? (
            <div className="absolute inset-0">
              <HeroScene active={visualInView && introDone} reduced={reduce} />
            </div>
          ) : (
            <HeroMobileVisual />
          )}
          <div
            aria-hidden
            className="pointer-events-none absolute left-[4%] top-[10%] hidden rounded-full border border-ink/10 bg-card/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur md:block"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-brand align-middle" />
            neural.graph
          </div>
          <div
            aria-hidden
            className="pointer-events-none absolute bottom-[12%] right-[2%] hidden rounded-full border border-ink/10 bg-card/70 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur md:block"
          >
            <span className="mr-1.5 inline-block size-1.5 rounded-full bg-brand-2 align-middle" />
            data → insight
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to About section"
        initial={{ opacity: 0 }}
        animate={introDone ? { opacity: 1 } : {}}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-brand md:flex"
      >
        Scroll
        <span className="relative h-10 w-px overflow-hidden bg-ink/15">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-brand"
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          />
        </span>
      </motion.a>
    </section>
  )
}
