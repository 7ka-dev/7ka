import type { JSX } from 'react'

import { useAppStore } from '@/shared/store'
import type { OsSection } from '@/shared/store'

const SECTIONS: { id: OsSection; label: string; key: string }[] = [
  { id: 'agents', label: 'PERSONNEL',  key: '1' },
  { id: 'ops',    label: 'OPERATIONS', key: '2' },
  { id: 'map',    label: 'FIELD MAP',  key: '3' },
  { id: 'logs',   label: 'SIGNAL LOG', key: '4' },
  { id: 'tools',  label: 'ARSENAL',    key: '5' },
]

export function OsSidebar(): JSX.Element {
  const activeSection = useAppStore(s => s.activeSection)
  const setSection    = useAppStore(s => s.setSection)
  const toGateway     = useAppStore(s => s.toGateway)

  return (
    <div
      className="flex flex-col h-full py-8 px-4 gap-1 border-r select-none"
      style={{ borderColor: '#2a2015', width: '180px' }}
    >
      <div
        className="text-[0.55rem] tracking-[0.25em] uppercase mb-6"
        style={{ color: '#5a4a2a' }}
      >
        UNIT-7 // α
      </div>

      {SECTIONS.map(s => (
        <button
          key={s.id}
          onClick={() => { setSection(s.id) }}
          className="flex items-center gap-3 px-2 py-1.5 text-left transition-none"
          style={{
            fontSize: '0.7rem',
            letterSpacing: '0.08em',
            color: activeSection === s.id ? '#f0c040' : '#c8a84b',
            background: activeSection === s.id ? '#1a1408' : 'transparent',
            borderLeft: activeSection === s.id ? '2px solid #f0c040' : '2px solid transparent',
          }}
        >
          <span style={{ color: '#5a4a2a' }}>[{s.key}]</span>
          {s.label}
        </button>
      ))}

      <div className="flex-1" />

      <button
        onClick={toGateway}
        className="text-left px-2 py-1.5"
        style={{
          fontSize: '0.65rem',
          letterSpacing: '0.08em',
          color: '#5a4a2a',
        }}
      >
        ← DISCONNECT
      </button>
    </div>
  )
}