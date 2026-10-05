'use client'

import { createContext, useContext, useSyncExternalStore } from 'react'

export const EASE = [0.22, 1, 0.36, 1] as const

export const IntroContext = createContext(false)
export const useIntroDone = () => useContext(IntroContext)

export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (callback) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', callback)
      return () => mql.removeEventListener('change', callback)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
