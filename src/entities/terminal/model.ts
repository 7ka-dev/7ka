import { useState, useCallback } from 'react'

import type { TerminalLine } from '@/shared/lib'

export interface TerminalState {
  history: TerminalLine[]
  connected: boolean
  currentPath: string
}

interface UseTerminalStateResult {
  history: TerminalLine[]
  connected: boolean
  addLines: (lines: TerminalLine[]) => void
  clearHistory: () => void
}

export function useTerminalState(): UseTerminalStateResult {
  const [history, setHistory] = useState<TerminalLine[]>([])
  const [connected] = useState(false)

  const addLines = useCallback((lines: TerminalLine[]): void => {
    setHistory(prev => [...prev, ...lines])
  }, [])

  const clearHistory = useCallback((): void => {
    setHistory([])
  }, [])

  return { history, connected, addLines, clearHistory }
}