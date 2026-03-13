import type { JSX } from 'react'

import { OsShell } from '@/widgets/os-shell'

export function MainframeMachine(): JSX.Element {

  return (
    <div className="fixed inset-0 font-mono overflow-hidden" style={{ background: '#0d0b08', color: '#c8a84b' }}>
      <OsShell />
    </div>
  )
}
