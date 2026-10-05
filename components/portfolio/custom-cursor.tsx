'use client'

import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useMediaQuery } from '@/lib/motion'

type CursorMode = 'default' | 'interactive' | 'project'

export function CustomCursor() {
  const finePointer = useMediaQuery('(hover: hover) and (pointer: fine)')
  const reduce = useReducedMotion()
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.5 })
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.5 })
  const [mode, setMode] = useState<CursorMode>('default')
  const [visible, setVisible] = useState(false)

  const enabled = finePointer && !reduce

  useEffect(() => {
    if (!enabled) return
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setVisible(true)
    }
    const over = (e: PointerEvent) => {
      const target = e.target as HTMLElement | null
      if (!target?.closest) return
      if (target.closest('[data-cursor="project"]') && !target.closest('a,button')) {
        setMode('project')
      } else if (target.closest('a,button,input,textarea,label,[data-cursor="hover"]')) {
        setMode('interactive')
      } else {
        setMode('default')
      }
    }
    const leave = () => setVisible(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const size = mode === 'project' ? 84 : mode === 'interactive' ? 44 : 22

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[120]"
      style={{ x: sx, y: sy }}
    >
      <motion.div
        className="grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-brand/50"
        animate={{
          width: size,
          height: size,
          opacity: visible ? 1 : 0,
          backgroundColor:
            mode === 'project' ? 'oklch(0.5 0.21 277 / 0.92)' : mode === 'interactive' ? 'oklch(0.5 0.21 277 / 0.08)' : 'oklch(0.5 0.21 277 / 0)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {mode === 'project' && (
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white">Explore</span>
        )}
      </motion.div>
    </motion.div>
  )
}
