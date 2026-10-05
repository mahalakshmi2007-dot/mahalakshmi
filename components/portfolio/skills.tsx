'use client'

import { motion } from 'framer-motion'
import { EASE } from '@/lib/motion'
import { SKILL_GROUPS } from '@/lib/site'
import { SectionHeading } from './primitives'

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="relative py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading id="skills-title" index="02" eyebrow="Toolkit" title="Technical skills" />
          <p className="max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground md:text-right">
            The languages, frameworks and methods I use to take ideas from data to deployed product.
          </p>
        </div>

        <ul className="mt-14 border-t border-ink/10 md:mt-20">
          {SKILL_GROUPS.map((group, gi) => (
            <motion.li
              key={group.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: EASE, delay: 0.04 * gi }}
              className="group relative grid gap-5 border-b border-ink/10 py-7 md:grid-cols-[minmax(0,5fr)_minmax(0,8fr)] md:gap-10 md:py-9"
            >
              <span
                aria-hidden
                className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-brand transition-transform duration-500 group-hover:scale-y-100"
              />
              <div className="flex items-baseline gap-5 pl-0 transition-transform duration-500 group-hover:translate-x-3">
                <span className="font-mono text-xs text-brand">{String(gi + 1).padStart(2, '0')}</span>
                <h3 className="text-2xl font-semibold uppercase tracking-[-0.03em] text-ink md:text-3xl">
                  {group.name}
                </h3>
              </div>
              <ul className="flex flex-wrap gap-2.5" aria-label={`${group.name} skills`}>
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.92 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, ease: EASE, delay: 0.1 + i * 0.04 }}
                    whileHover={{ y: -3 }}
                    className="cursor-default rounded-full border border-ink/12 bg-card/80 px-4 py-2 text-sm font-medium text-ink shadow-[0_1px_0_oklch(0.19_0.025_275/0.04)] transition-[border-color,box-shadow,color] duration-300 hover:border-brand/40 hover:text-brand hover:shadow-[0_8px_24px_-8px_oklch(0.5_0.21_277/0.35)]"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  )
}
