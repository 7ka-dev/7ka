import { create } from 'zustand'

import type { TerminalLine } from '@/shared/lib'

type Machine = 'gateway' | 'mainframe'
type GatewayView = 'terminal' | 'browser'
type OsSection = 'agents' | 'ops' | 'map' | 'logs' | 'tools' | null

interface AppStore {
  machine: Machine
  gatewayView: GatewayView
  terminalHistory: TerminalLine[]
  activeSection: OsSection
  setSection: (section: OsSection) => void

  toMainframe: () => void
  toGateway: () => void
  openBrowser: () => void
  openTerminal: () => void
  addLines: (lines: TerminalLine[]) => void
  clearHistory: () => void
}

export const useAppStore = create<AppStore>((set) => ({
  machine: 'gateway',
  gatewayView: 'terminal',
  terminalHistory: [],

  toMainframe: (): void => {
    set({ machine: 'mainframe' })
  },
  toGateway: (): void => {
    set({ machine: 'gateway' })
  },
  openBrowser: (): void => {
    set({ gatewayView: 'browser' })
  },
  openTerminal: (): void => {
    set({ gatewayView: 'terminal' })
  },
  addLines: (lines): void => {
    set((s) => ({ terminalHistory: [...s.terminalHistory, ...lines] }))
  },
  clearHistory: (): void => {
    set({ terminalHistory: [] })
  },
  activeSection: null,
  setSection: (section): void => { set({ activeSection: section }); },
}))

export type { OsSection }