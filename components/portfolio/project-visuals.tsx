'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { EASE } from '@/lib/motion'

const inView = { once: true, margin: '-80px' } as const

export function ExpenseVisual() {
  const reduce = useReducedMotion()
  const bars = [0.38, 0.55, 0.32, 0.62, 0.48, 0.9, 0.44, 0.58]
  const anomaly = 5
  const baseY = 250
  const maxH = 170
  const barW = 22
  const gap = 18
  const startX = 40
  const tops = bars.map((h, i) => ({ x: startX + i * (barW + gap) + barW / 2, y: baseY - h * maxH }))
  const trend = tops.filter((_, i) => i !== anomaly)
  const linePath = trend.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y - 14}`).join(' ')
  const last = trend[trend.length - 1]
  const forecastPath = `M${last.x},${last.y - 14} L${last.x + 40},${last.y - 28} L${last.x + 80},${last.y - 36}`

  return (
    <svg viewBox="0 0 420 300" className="size-full" aria-hidden>
      {[70, 130, 190, 250].map((y) => (
        <line key={y} x1="24" x2="396" y1={y} y2={y} stroke="var(--ink)" strokeOpacity="0.07" />
      ))}
      {bars.map((h, i) => (
        <motion.rect
          key={i}
          x={startX + i * (barW + gap)}
          y={baseY - h * maxH}
          width={barW}
          height={h * maxH}
          rx={6}
          fill={i === anomaly ? 'url(#anomaly-fill)' : 'var(--brand)'}
          fillOpacity={i === anomaly ? 1 : 0.18 + (i % 3) * 0.12}
          style={{ transformBox: 'fill-box', transformOrigin: 'bottom' }}
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: EASE, delay: 0.1 + i * 0.06 }}
        />
      ))}
      <motion.path
        d={linePath}
        fill="none"
        stroke="var(--ink)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 1.4, ease: EASE, delay: 0.5 }}
      />
      <motion.path
        d={forecastPath}
        fill="none"
        stroke="var(--brand-2)"
        strokeWidth="2"
        strokeDasharray="4 6"
        strokeLinecap="round"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ duration: 0.6, delay: 1.6 }}
      />
      <motion.circle
        cx={last.x + 80}
        cy={last.y - 36}
        r="4"
        fill="var(--brand-2)"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={inView}
        transition={{ delay: 1.9 }}
      />
      <g transform={`translate(${tops[anomaly].x} ${tops[anomaly].y - 22})`}>
        <circle r="7" fill="var(--card)" stroke="var(--brand)" strokeWidth="2" />
        {!reduce && (
          <motion.circle
            r="7"
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.5"
            animate={{ r: [7, 18], opacity: [0.7, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeOut' }}
          />
        )}
      </g>
      <g fontFamily="var(--font-geist-mono)" fontSize="9" letterSpacing="1.4" fill="var(--muted-foreground)">
        <text x="24" y="40">CATEGORIZE</text>
        <text x="122" y="40">FORECAST</text>
        <text x="206" y="40">DETECT</text>
        <circle cx="16" cy="37" r="3" fill="var(--brand)" fillOpacity="0.4" />
        <circle cx="114" cy="37" r="3" fill="var(--brand-2)" />
        <circle cx="198" cy="37" r="3" fill="var(--brand)" />
      </g>
      <defs>
        <linearGradient id="anomaly-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--brand)" />
          <stop offset="100%" stopColor="var(--brand-2)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function RouteVisual() {
  const reduce = useReducedMotion()
  const blocks: { x: number; y: number; w: number; h: number; o: number }[] = []
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 7; c++) {
      const seed = (r * 7 + c) * 37
      blocks.push({
        x: 24 + c * 54,
        y: 24 + r * 52,
        w: 40 + (seed % 3) * 2,
        h: 36 + (seed % 4) * 2,
        o: 0.05 + ((seed % 5) / 5) * 0.12,
      })
    }
  }
  const route = 'M54,240 C54,180 120,190 150,150 S230,96 270,110 S340,70 356,44'

  return (
    <svg viewBox="0 0 420 300" className="size-full" aria-hidden>
      {blocks.map((b, i) => (
        <motion.rect
          key={i}
          x={b.x}
          y={b.y}
          width={b.w}
          height={b.h}
          rx={6}
          fill="var(--ink)"
          fillOpacity={b.o}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: (i % 7) * 0.04 + Math.floor(i / 7) * 0.05 }}
        />
      ))}
      <path d={route} fill="none" stroke="var(--card)" strokeWidth="10" strokeLinecap="round" />
      <motion.path
        d={route}
        fill="none"
        stroke="url(#route-gradient)"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={inView}
        transition={{ duration: 1.8, ease: EASE, delay: 0.4 }}
      />
      {!reduce && (
        <motion.path
          d={route}
          fill="none"
          stroke="var(--card)"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeDasharray="2 22"
          animate={{ strokeDashoffset: [0, -48] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
        />
      )}
      {[
        { x: 54, y: 240, label: 'ORIGIN', fill: 'var(--ink)' },
        { x: 356, y: 44, label: 'DESTINATION', fill: 'var(--brand)' },
      ].map((pin, i) => (
        <motion.g
          key={pin.label}
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.5, delay: i === 0 ? 0.3 : 2 }}
        >
          <circle cx={pin.x} cy={pin.y} r="12" fill={pin.fill} fillOpacity="0.14" />
          <circle cx={pin.x} cy={pin.y} r="5.5" fill={pin.fill} stroke="var(--card)" strokeWidth="2" />
          <text
            x={i === 0 ? pin.x + 18 : pin.x - 18}
            y={pin.y + 3}
            textAnchor={i === 0 ? 'start' : 'end'}
            fontFamily="var(--font-geist-mono)"
            fontSize="9"
            letterSpacing="1.4"
            fill="var(--ink)"
          >
            {pin.label}
          </text>
        </motion.g>
      ))}
      <defs>
        <linearGradient id="route-gradient" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--ink)" />
          <stop offset="100%" stopColor="var(--brand)" />
        </linearGradient>
      </defs>
    </svg>
  )
}

export function TableVisual() {
  const reduce = useReducedMotion()
  const cols = [70, 110, 80, 90, 60]
  const rows = 7
  const rowH = 28
  const startX = 24
  const startY = 52
  const keywords = ['SELECT', 'WHERE', 'GROUP BY', 'SUM()', 'ORDER BY']
  const highlighted = new Set(['2-3', '4-3', '5-1', '1-4'])

  return (
    <svg viewBox="0 0 720 260" className="size-full" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <g>
        {Array.from({ length: rows }).map((_, r) => {
          let x = startX
          return (
            <g key={r}>
              {cols.map((w, c) => {
                const cell = (
                  <motion.rect
                    key={c}
                    x={x}
                    y={startY + r * rowH}
                    width={w - 8}
                    height={rowH - 10}
                    rx={4}
                    fill={r === 0 ? 'var(--ink)' : highlighted.has(`${r}-${c}`) ? 'var(--brand)' : 'var(--ink)'}
                    fillOpacity={r === 0 ? 0.75 : highlighted.has(`${r}-${c}`) ? 0.75 : 0.07 + ((r + c) % 3) * 0.03}
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={inView}
                    transition={{ duration: 0.4, delay: r * 0.06 + c * 0.03 }}
                  />
                )
                x += w
                return cell
              })}
            </g>
          )
        })}
        {!reduce && (
          <motion.rect
            x={startX - 6}
            width={cols.reduce((a, b) => a + b, 0) + 4}
            height={rowH - 2}
            rx={6}
            fill="none"
            stroke="var(--brand)"
            strokeWidth="1.5"
            initial={{ y: startY + rowH - 4 }}
            animate={{ y: [startY + rowH - 4, startY + (rows - 1) * rowH - 4, startY + rowH - 4] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          />
        )}
      </g>
      <g fontFamily="var(--font-geist-mono)" fontSize="11" letterSpacing="1.5">
        {keywords.map((kw, i) => (
          <motion.g
            key={kw}
            initial={{ opacity: 0, x: 12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={inView}
            transition={{ duration: 0.5, ease: EASE, delay: 0.4 + i * 0.12 }}
          >
            <rect x={490} y={52 + i * 36} width={i % 2 ? 120 : 150} height={24} rx={12} fill="var(--card)" stroke="var(--ink)" strokeOpacity="0.12" />
            <circle cx={504} cy={64 + i * 36} r={3} fill={i === 3 ? 'var(--brand-2)' : 'var(--brand)'} />
            <text x={514} y={68 + i * 36} fill="var(--ink)">
              {kw}
            </text>
          </motion.g>
        ))}
      </g>
    </svg>
  )
}
