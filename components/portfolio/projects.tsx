'use client'

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useRef, type ReactNode } from 'react'
import { EASE } from '@/lib/motion'
import { PROJECTS, SITE, type Project } from '@/lib/site'
import { cn } from '@/lib/utils'
import { CtaLink, SectionHeading } from './primitives'
import { ExpenseVisual, RouteVisual, TableVisual } from './project-visuals'

const VISUALS = {
  expense: ExpenseVisual,
  route: RouteVisual,
  table: TableVisual,
}

function TiltPanel({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const rotateX = useSpring(useTransform(py, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 18 })
  const rotateY = useSpring(useTransform(px, [-0.5, 0.5], [-7, 7]), { stiffness: 150, damping: 18 })
  const shiftX = useSpring(useTransform(px, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 20 })
  const shiftY = useSpring(useTransform(py, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 20 })

  return (
    <div className={cn('[perspective:1200px]', className)}>
      <motion.div
        ref={ref}
        data-cursor="project"
        onPointerMove={(e) => {
          if (reduce || e.pointerType !== 'mouse' || !ref.current) return
          const rect = ref.current.getBoundingClientRect()
          px.set((e.clientX - rect.left) / rect.width - 0.5)
          py.set((e.clientY - rect.top) / rect.height - 0.5)
        }}
        onPointerLeave={() => {
          px.set(0)
          py.set(0)
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="group/visual relative size-full overflow-hidden rounded-[1.75rem] border border-ink/10 bg-gradient-to-br from-card via-card to-brand-soft shadow-[0_40px_80px_-40px_oklch(0.19_0.025_275/0.35)]"
      >
        <div aria-hidden className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
        <div
          aria-hidden
          className="absolute -bottom-1/3 -right-1/4 size-2/3 rounded-full bg-[radial-gradient(circle,oklch(0.85_0.08_277/0.6),transparent_65%)] blur-2xl transition-transform duration-1000 group-hover/visual:-translate-x-10 group-hover/visual:-translate-y-6"
        />
        <motion.div
          style={{ x: shiftX, y: shiftY }}
          className="relative size-full p-4 transition-transform duration-700 group-hover/visual:scale-[1.03] sm:p-8"
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  )
}

function TechTags({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies">
      {tech.map((t, i) => (
        <motion.li
          key={t}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 + i * 0.05 }}
          className="rounded-full border border-ink/12 bg-background/80 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-ink/80 transition-colors duration-300 group-hover/card:border-brand/30 hover:text-brand"
        >
          {t}
        </motion.li>
      ))}
    </ul>
  )
}

function ProjectLinks({ project }: { project: Project }) {
  if (project.links.length === 0) {
    return (
      <div className="flex flex-wrap items-center gap-3">
        <CtaLink href={SITE.github} target="_blank" rel="noopener noreferrer" variant="secondary" icon="external">
          Browse GitHub profile
        </CtaLink>
      </div>
    )
  }
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.links.map((link) => (
        <CtaLink
          key={link.href + link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          variant={link.variant}
          icon="external"
          aria-label={`${link.label} — ${project.title} (opens in new tab)`}
        >
          {link.label}
        </CtaLink>
      ))}
    </div>
  )
}

function ProjectHeader({ project }: { project: Project }) {
  return (
    <div>
      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
        <span className="text-brand">{project.number}</span>
        <span aria-hidden className="h-px w-8 bg-ink/20" />
        <span className="text-muted-foreground">{project.category}</span>
      </div>
      <h3 className="mt-4 text-balance text-4xl font-semibold tracking-[-0.04em] text-ink md:text-5xl">
        {project.title}
      </h3>
    </div>
  )
}

function SplitCard({ project, reverse }: { project: Project; reverse?: boolean }) {
  const Visual = VISUALS[project.visual]
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-labelledby={`${project.id}-title`}
      className="group/card grid items-center gap-8 lg:grid-cols-2 lg:gap-14"
    >
      <TiltPanel className={cn('aspect-[7/5]', reverse && 'lg:order-2')}>
        <Visual />
      </TiltPanel>
      <div className={cn('flex flex-col gap-7', reverse && 'lg:order-1')}>
        <div id={`${project.id}-title`}>
          <ProjectHeader project={project} />
        </div>
        <div className="space-y-3">
          {project.description.map((p) => (
            <p key={p} className="text-pretty leading-relaxed text-muted-foreground">
              {p}
            </p>
          ))}
        </div>
        {project.highlights && (
          <dl className="grid gap-5 rounded-2xl border border-ink/10 bg-card/60 p-5 backdrop-blur sm:grid-cols-2">
            {project.highlights.map((h) => (
              <div key={h.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">{h.label}</dt>
                <dd>
                  <ul className="mt-3 space-y-1.5">
                    {h.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-ink/85">
                        <span aria-hidden className="mt-[7px] size-1 shrink-0 rounded-full bg-ink/40" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        )}
        <TechTags tech={project.tech} />
        <ProjectLinks project={project} />
      </div>
    </motion.article>
  )
}

function WideCard({ project }: { project: Project }) {
  const Visual = VISUALS[project.visual]
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.9, ease: EASE }}
      aria-labelledby={`${project.id}-title`}
      className="group/card rounded-[2rem] border border-ink/10 bg-card/50 p-3 backdrop-blur sm:p-4"
    >
      <TiltPanel className="aspect-[16/9] sm:aspect-[720/260]">
        <Visual />
      </TiltPanel>
      <div className="grid gap-8 px-3 pb-4 pt-8 sm:px-5 md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:gap-14 md:pb-6">
        <div id={`${project.id}-title`} className="flex flex-col gap-6">
          <ProjectHeader project={project} />
          <TechTags tech={project.tech} />
        </div>
        <div className="flex flex-col gap-6">
          <ul className="space-y-3">
            {project.description.map((p) => (
              <li key={p} className="flex gap-3 text-pretty leading-relaxed text-muted-foreground">
                <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand/70" />
                {p}
              </li>
            ))}
          </ul>
          <ProjectLinks project={project} />
        </div>
      </div>
    </motion.article>
  )
}

export function Projects() {
  const [spendwise, movemate, sql] = PROJECTS
  return (
    <section id="projects" aria-labelledby="projects-heading" className="relative py-24 md:py-36">
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ink/15 to-transparent" />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          id="projects-heading"
          index="04"
          eyebrow="Work"
          title="Selected projects"
          description="Building practical applications across AI, full-stack development and data analytics."
        />
        <div className="mt-16 flex flex-col gap-24 md:mt-24 md:gap-32">
          <SplitCard project={spendwise} />
          <SplitCard project={movemate} reverse />
          <WideCard project={sql} />
        </div>
      </div>
    </section>
  )
}
