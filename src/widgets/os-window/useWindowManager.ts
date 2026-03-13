import { useState, useCallback } from 'react'

import type { OsWindowState } from '@/widgets/os-window'

type WindowKind = OsWindowState['kind']
type WindowMode = OsWindowState['mode']

const MODE_FOR_KIND: Record<WindowKind, WindowMode> = {
  agent: 'portrait',
  op: 'landscape',
}

const TITLE_FOR_KIND: Record<WindowKind, (entityId: string) => string> = {
  agent: (id) => `PERSONNEL FILE — AGENT-${id}`,
  op: (id) => `CASE FILE — ${id}`,
}

const CASCADE_COLUMNS = 6
const CASCADE_OFFSET = 28
const INITIAL_X = 60
const INITIAL_Y = 40
const BASE_Z = 10

export function useWindowManager(): {
  windows: OsWindowState[]
  openWindow: (kind: WindowKind, entityId: string) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  moveWindow: (id: string, x: number, y: number) => void
} {
  const [windows, setWindows] = useState<OsWindowState[]>([])
  const [nextZ, setNextZ] = useState(BASE_Z)

  const openWindow = useCallback(
    (kind: WindowKind, entityId: string): void => {
      setWindows((prev) => {
        // focus existing instead of opening duplicate
        const existing = prev.find((w) => w.kind === kind && w.entityId === entityId)
        if (existing) {
          const maxZ = Math.max(...prev.map((w) => w.zIndex)) + 1
          return prev.map((w) => (w.id === existing.id ? { ...w, zIndex: maxZ } : w))
        }

        const count = prev.length
        const x = INITIAL_X + (count % CASCADE_COLUMNS) * CASCADE_OFFSET
        const y = INITIAL_Y + (count % CASCADE_COLUMNS) * CASCADE_OFFSET

        setNextZ((z) => z + 1)

        const win: OsWindowState = {
          id: `${kind}-${entityId}-${Date.now().toString()}`,
          title: TITLE_FOR_KIND[kind](entityId),
          mode: MODE_FOR_KIND[kind],
          x,
          y,
          zIndex: nextZ,
          kind,
          entityId,
        }
        return [...prev, win]
      })
    },
    [nextZ],
  )

  const closeWindow = useCallback((id: string): void => {
    setWindows((prev) => prev.filter((w) => w.id !== id))
  }, [])

  const focusWindow = useCallback((id: string): void => {
    setWindows((prev) => {
      const maxZ = Math.max(...prev.map((w) => w.zIndex), BASE_Z) + 1
      return prev.map((w) => (w.id === id ? { ...w, zIndex: maxZ } : w))
    })
  }, [])

  const moveWindow = useCallback((id: string, x: number, y: number): void => {
    setWindows((prev) => prev.map((w) => (w.id === id ? { ...w, x, y } : w)))
  }, [])

  return { windows, openWindow, closeWindow, focusWindow, moveWindow }
}
