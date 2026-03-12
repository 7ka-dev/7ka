import type { JSX } from 'react'

import { useAppStore } from '@/shared/store'
import { TerminalScreen } from '@/widgets/terminal-screen'

export function GatewayMachine(): JSX.Element {
  const gatewayView = useAppStore(s => s.gatewayView)

  return (
    <>
      {gatewayView === 'terminal' && <TerminalScreen />}
      {gatewayView === 'browser' && <div>BROWSER PLACEHOLDER</div>}
    </>
  )
}