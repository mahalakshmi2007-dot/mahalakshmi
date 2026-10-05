'use client'

import { motion, useReducedMotion } from 'framer-motion'

const NODES = [
  [50, 14], [78, 26], [88, 52], [74, 80], [46, 88], [20, 74], [12, 46], [26, 20],
  [50, 38], [64, 56], [38, 60], [58, 70], [32, 38],
] as const

const EDGES = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 0],
  [0, 8], [8, 9], [9, 2], [8, 12], [12, 6], [10, 12], [10, 5], [10, 11], [11, 3], [9, 11], [8, 10], [1, 9],
] as const

const HUBS = new Set([0, 3, 6, 8, 11])

export function HeroMobileVisual() {
  const reduce = useReducedMotion()

  return (
    <motion.svg
      viewBox="0 0 100 100"
      aria-hidden
      className="absolute inset-0 size-full"
      animate={reduce ? undefined : { rotate: 360 }}
      transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
    >
      {EDGES.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={NODES[a][0]}
          y1={NODES[a][1]}
          x2={NODES[b][0]}
          y2={NODES[b][1]}
          stroke="var(--brand)"
          strokeOpacity={0.28}
          strokeWidth={0.3}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.9 + i * 0.04 }}
        />
      ))}
      <circle cx="50" cy="50" r="40" fill="none" stroke="var(--ink)" strokeOpacity={0.1} strokeWidth={0.25} />
      {NODES.map(([x, y], i) => (
        <motion.circle
          key={i}
          cx={x}
          cy={y}
          r={HUBS.has(i) ? 1.8 : 1}
          fill={HUBS.has(i) ? 'var(--brand)' : 'var(--ink)'}
          fillOpacity={HUBS.has(i) ? 1 : 0.7}
          animate={reduce ? undefined : { opacity: [0.55, 1, 0.55] }}
          transition={{ duration: 2.8, repeat: Infinity, delay: i * 0.22 }}
        />
      ))}
      {!reduce &&
        [0, 1, 2].map((i) => (
          <motion.circle
            key={`p${i}`}
            r={0.9}
            fill="var(--brand-2)"
            animate={{
              cx: [NODES[i * 3][0], NODES[8][0], NODES[i * 3 + 2][0]],
              cy: [NODES[i * 3][1], NODES[8][1], NODES[i * 3 + 2][1]],
            }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut' }}
          />
        ))}
    </motion.svg>
  )
}
