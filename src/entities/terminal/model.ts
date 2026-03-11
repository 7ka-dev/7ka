export type BootLineStatus = 'OK' | 'WARN' | 'FOUND' | null

export interface BootLine {
  text: string
  status: BootLineStatus
  warn?: string
}

export interface TerminalState {
  input: string
  history: string[]
  connected: boolean
  currentPath: string
}