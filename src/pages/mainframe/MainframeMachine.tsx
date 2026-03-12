import type { JSX } from 'react'

import { useAppStore } from '@/shared/store'

export function MainframeMachine(): JSX.Element {
  const toGateway = useAppStore(s => s.toGateway)

  return (
    <div
      className="fixed inset-0 flex items-center justify-center font-mono"
      style={{ background: '#0d0b08', color: '#c8a84b' }}
    >
      <div>
        <div>YAKOR MAINFRAME — ACCESS GRANTED</div>
        <button onClick={toGateway}>disconnect</button>
      </div>
    </div>
  )
}