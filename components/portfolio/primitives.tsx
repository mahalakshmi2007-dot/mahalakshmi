'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { useRef, type ComponentProps, type ReactNode } from 'react'
import { EASE } from '@/lib/motion'
import { cn } from '@/lib/utils'

export function Magnetic({
  children,
  strength = 0.28,
  className,
}: {
  children: ReactNode
  strength?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 })

  return (
    <motion.div
      ref={ref}
      className={cn('inline-flex', className)}
      style={{ x: sx, y: sy }}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== 'mouse' || !ref.current) return
        const rect = ref.current.getBoundingClientRect()
        x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
        y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
      }}
      onPointerLeave={() => {
        x.set(0)
        y.set(0)
      }}
    >
      {children}
    </motion.div>
  )
}

type CtaProps = ComponentProps<'a'> & {
  variant?: 'primary' | 'secondary' | 'ghost' | 'light'
  icon?: 'right' | 'external' | 'none'
}

export function CtaLink({
  variant = 'primary',
  icon = 'right',
  className,
  children,
  ...props
}: CtaProps) {
  const Icon = icon === 'external' ? ArrowUpRight : ArrowRight
  return (
    <a
      {...props}
      className={cn(
        'group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 font-mono text-xs font-medium uppercase tracking-[0.14em] transition-[background-color,color,box-shadow,border-color] duration-300',
        variant === 'primary' &&
          'bg-ink text-primary-foreground shadow-[0_10px_30px_-12px_oklch(0.5_0.21_277/0.55)] hover:bg-brand',
        variant === 'secondary' &&
          'border border-ink/15 bg-card/70 text-ink backdrop-blur hover:border-brand/50 hover:text-brand',
        variant === 'ghost' && 'px-3 text-muted-foreground hover:text-brand',
        variant === 'light' && 'bg-white text-ink hover:bg-brand-soft',
        className,
      )}
    >
      <span className="relative">{children}</span>
      {icon !== 'none' && (
        <Icon
          aria-hidden
          className={cn(
            'size-4 transition-transform duration-300',
            icon === 'external'
              ? 'group-hover:-translate-y-0.5 group-hover:translate-x-0.5'
              : 'group-hover:translate-x-1',
          )}
        />
      )}
    </a>
  )
}

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  description,
  className,
  id,
}: {
  index: string
  eyebrow: string
  title: string
  description?: string
  className?: string
  id?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      <motion.div
        className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        initial={{ opacity: 0, x: -12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: EASE }}
      >
        <span className="text-brand">{index}</span>
        <span aria-hidden className="h-px w-10 bg-ink/20" />
        <span>{eyebrow}</span>
      </motion.div>
      <motion.h2
        id={id}
        initial="hidden"
        whileInView="shown"
        viewport={{ once: true, margin: '-60px' }}
        className="mt-5 overflow-hidden pb-1 text-balance text-4xl font-semibold uppercase leading-[0.95] tracking-[-0.035em] text-ink sm:text-5xl lg:text-6xl"
      >
        <motion.span
          className="block"
          variants={{ hidden: { y: '105%' }, shown: { y: 0 } }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.05 }}
        >
          {title}
        </motion.span>
      </motion.h2>
      {description && (
        <Reveal delay={0.15} y={16}>
          <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        </Reveal>
      )}
    </div>
  )
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.37-3.87-1.37-.53-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.08-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.8 1.19 1.82 1.19 3.08 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  )
}
