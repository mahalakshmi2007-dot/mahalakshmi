'use client'

import { Canvas, useFrame } from '@react-three/fiber'
import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'

const INK = '#22203f'
const BRAND = '#4f46e5'
const BRAND_2 = '#0ea5e9'

type Pointer = MutableRefObject<{ x: number; y: number }>

function seeded(seed: number) {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function useDotTexture() {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = canvas.height = 64
    const ctx = canvas.getContext('2d')!
    const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
    g.addColorStop(0, 'rgba(255,255,255,1)')
    g.addColorStop(0.4, 'rgba(255,255,255,0.95)')
    g.addColorStop(1, 'rgba(255,255,255,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, 64, 64)
    const texture = new THREE.CanvasTexture(canvas)
    texture.colorSpace = THREE.SRGBColorSpace
    return texture
  }, [])
}

function Network({ pointer, reduced }: { pointer: Pointer; reduced: boolean }) {
  const outer = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Group>(null!)
  const core = useRef<THREE.Mesh>(null!)
  const ring = useRef<THREE.Mesh>(null!)
  const dot = useDotTexture()

  const data = useMemo(() => {
    const rand = seeded(11)
    const count = 96
    const points: THREE.Vector3[] = []
    const golden = Math.PI * (3 - Math.sqrt(5))
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      const radius = 2.05 + (rand() - 0.5) * 0.6
      points.push(new THREE.Vector3(Math.cos(theta) * r * radius, y * radius, Math.sin(theta) * r * radius))
    }
    const edgeKeys = new Set<string>()
    const edges: [number, number][] = []
    points.forEach((p, i) => {
      const nearest = points
        .map((q, j) => ({ j, d: p.distanceTo(q) }))
        .filter(({ j, d }) => j !== i && d < 1.25)
        .sort((a, b) => a.d - b.d)
        .slice(0, 3)
      for (const { j } of nearest) {
        const key = i < j ? `${i}-${j}` : `${j}-${i}`
        if (!edgeKeys.has(key)) {
          edgeKeys.add(key)
          edges.push([i, j])
        }
      }
    })
    const nodePositions = new Float32Array(points.flatMap((p) => [p.x, p.y, p.z]))
    const hubPositions = new Float32Array(
      points.filter((_, i) => i % 9 === 0).flatMap((p) => [p.x, p.y, p.z]),
    )
    const linePositions = new Float32Array(
      edges.flatMap(([a, b]) => [points[a].x, points[a].y, points[a].z, points[b].x, points[b].y, points[b].z]),
    )
    const pulses = Array.from({ length: 30 }, () => ({
      edge: Math.floor(rand() * edges.length),
      t: rand(),
      speed: 0.25 + rand() * 0.45,
    }))
    return { points, edges, nodePositions, hubPositions, linePositions, pulses, rand }
  }, [])

  const geometries = useMemo(() => {
    const make = (arr: Float32Array) => {
      const g = new THREE.BufferGeometry()
      g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
      return g
    }
    return {
      nodes: make(data.nodePositions),
      hubs: make(data.hubPositions),
      lines: make(data.linePositions),
      pulses: make(new Float32Array(data.pulses.length * 3)),
    }
  }, [data])

  useEffect(() => {
    return () => {
      Object.values(geometries).forEach((g) => g.dispose())
      dot.dispose()
    }
  }, [geometries, dot])

  useFrame((_, rawDelta) => {
    const delta = Math.min(rawDelta, 0.05)
    const speed = reduced ? 0 : 1
    inner.current.rotation.y += delta * 0.07 * speed
    outer.current.rotation.x = THREE.MathUtils.lerp(outer.current.rotation.x, pointer.current.y * 0.28, 0.04)
    outer.current.rotation.y = THREE.MathUtils.lerp(outer.current.rotation.y, pointer.current.x * 0.4, 0.04)
    core.current.rotation.x += delta * 0.18 * speed
    core.current.rotation.y += delta * 0.12 * speed
    ring.current.rotation.z += delta * 0.1 * speed

    const attr = geometries.pulses.getAttribute('position') as THREE.BufferAttribute
    data.pulses.forEach((pulse, i) => {
      pulse.t += delta * pulse.speed * speed
      if (pulse.t > 1) {
        pulse.t = 0
        pulse.edge = Math.floor(data.rand() * data.edges.length)
      }
      const [a, b] = data.edges[pulse.edge]
      const pa = data.points[a]
      const pb = data.points[b]
      attr.setXYZ(i, pa.x + (pb.x - pa.x) * pulse.t, pa.y + (pb.y - pa.y) * pulse.t, pa.z + (pb.z - pa.z) * pulse.t)
    })
    attr.needsUpdate = true
  })

  return (
    <group ref={outer}>
      <group ref={inner}>
        <lineSegments geometry={geometries.lines}>
          <lineBasicMaterial color={BRAND} transparent opacity={0.2} depthWrite={false} />
        </lineSegments>
        <points geometry={geometries.nodes}>
          <pointsMaterial map={dot} color={INK} size={0.075} transparent opacity={0.8} depthWrite={false} sizeAttenuation />
        </points>
        <points geometry={geometries.hubs}>
          <pointsMaterial map={dot} color={BRAND} size={0.17} transparent opacity={0.95} depthWrite={false} sizeAttenuation />
        </points>
        <points geometry={geometries.pulses}>
          <pointsMaterial map={dot} color={BRAND_2} size={0.11} transparent depthWrite={false} sizeAttenuation />
        </points>
      </group>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.72, 1]} />
        <meshBasicMaterial color={INK} wireframe transparent opacity={0.22} />
      </mesh>
      <mesh rotation={[Math.PI / 2.4, 0.3, 0]} ref={ring}>
        <torusGeometry args={[2.9, 0.006, 8, 160]} />
        <meshBasicMaterial color={BRAND} transparent opacity={0.35} />
      </mesh>
      <mesh rotation={[Math.PI / 1.8, -0.5, 0]}>
        <torusGeometry args={[3.25, 0.004, 8, 160]} />
        <meshBasicMaterial color={INK} transparent opacity={0.12} />
      </mesh>
    </group>
  )
}

function Dust({ reduced }: { reduced: boolean }) {
  const ref = useRef<THREE.Points>(null!)
  const dot = useDotTexture()
  const geometry = useMemo(() => {
    const rand = seeded(3)
    const arr = new Float32Array(240 * 3)
    for (let i = 0; i < arr.length; i += 3) {
      arr[i] = (rand() - 0.5) * 12
      arr[i + 1] = (rand() - 0.5) * 8
      arr[i + 2] = (rand() - 0.5) * 6
    }
    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3))
    return g
  }, [])

  useFrame((state, delta) => {
    if (reduced) return
    ref.current.rotation.y += Math.min(delta, 0.05) * 0.015
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.12
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial map={dot} color="#8b8fb8" size={0.035} transparent opacity={0.6} depthWrite={false} />
    </points>
  )
}

export default function HeroScene({ active, reduced }: { active: boolean; reduced: boolean }) {
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
      frameloop={active ? 'always' : 'never'}
      aria-hidden
    >
      <Network pointer={pointer} reduced={reduced} />
      <Dust reduced={reduced} />
    </Canvas>
  )
}
