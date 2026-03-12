import type { JSX } from 'react'

import { GatewayMachine } from '@/pages/gateway'
import { MainframeMachine } from '@/pages/mainframe'
import { useAppStore } from '@/shared/store'

export default function App(): JSX.Element {
  const machine = useAppStore(s => s.machine)

  return machine === 'gateway'
    ? <GatewayMachine />
    : <MainframeMachine />
}