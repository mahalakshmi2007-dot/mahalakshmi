'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { EASE } from '@/lib/motion'

export function IntroLoader({ onDone }: { onDone: () => void }) {
  const reduce = useReducedMotion()
  const [phase, setPhase] = useState<'mark' | 'name' | 'done'>('mark')
  const onDoneRef = useRef(onDone)
  onDoneRef.current = onDone

  useEffect(() => {
    const expand = setTimeout(() => setPhase('name'), reduce ? 0 : 420)
    const finish = setTimeout(
      () => {
        setPhase('done')
        onDoneRef.current()
      },
      reduce ? 200 : 1250,
    )
    return () => {
      clearTimeout(expand)
      clearTimeout(finish)
    }
  }, [reduce])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          aria-hidden
          className="fixed inset-0 z-[150] grid place-items-center bg-background"
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          initial={{ clipPath: 'inset(0 0 0% 0)' }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <div className="flex items-baseline font-semibold uppercase tracking-[-0.04em] text-ink">
            <motion.span
              className="text-5xl sm:text-6xl"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: EASE }}
            >
              M
            </motion.span>
            <motion.span
              className="overflow-hidden whitespace-nowrap text-5xl sm:text-6xl"
              initial={{ maxWidth: 0, opacity: 0 }}
              animate={phase === 'name' ? { maxWidth: '14ch', opacity: 1 } : {}}
              transition={{ duration: 0.6, ease: EASE }}
            >
              ahalakshmi&nbsp;
            </motion.span>
            <motion.span
              className="text-5xl text-brand sm:text-6xl"
              initial={{ opacity: 0 }}
              animate={phase === 'name' ? { opacity: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              S
            </motion.span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
