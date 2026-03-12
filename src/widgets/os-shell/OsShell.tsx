import type { JSX } from 'react'

import { useAppStore } from '@/shared/store'
import { OsSidebar } from '@/widgets/os-sidebar'

export function OsShell(): JSX.Element {
  const activeSection = useAppStore(s => s.activeSection)

  return (
    <div className="flex h-full">
      <OsSidebar />

      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Top bar */}
        <div
          className="flex items-center justify-between px-6 py-2 border-b shrink-0"
          style={{ borderColor: '#2a2015' }}
        >
          <span
            className="text-[0.55rem] tracking-[0.25em] uppercase"
            style={{ color: '#5a4a2a' }}
          >
            INTERNAL ACCESS TERMINAL
          </span>
          <span
            className="text-[0.55rem] tracking-[0.2em]"
            style={{ color: '#5a4a2a' }}
          >
            CLEARANCE: α — SESSION ACTIVE
          </span>
        </div>

        {/* Main area */}
        <div className="flex-1 overflow-hidden p-8">
          {activeSection === null && (
            <div
              className="h-full flex flex-col items-center justify-center gap-4 select-none"
              style={{ color: '#3a2e18' }}
            >
              <div className="text-[0.6rem] tracking-[0.3em] uppercase">
                SELECT SECTION
              </div>
              <div
                className="text-[2rem] tracking-[0.5em]"
                style={{ color: '#2a2015' }}
              >
                ▓▓▓▓▓▓▓▓▓▓▓▓
              </div>
            </div>
          )}

          {activeSection === 'agents' && (
            <div style={{ color: '#c8a84b' }}>AGENTS PLACEHOLDER</div>
          )}
          {activeSection === 'ops' && (
            <div style={{ color: '#c8a84b' }}>OPS PLACEHOLDER</div>
          )}
          {activeSection === 'map' && (
            <div style={{ color: '#c8a84b' }}>MAP PLACEHOLDER</div>
          )}
          {activeSection === 'logs' && (
            <div style={{ color: '#c8a84b' }}>LOGS PLACEHOLDER</div>
          )}
          {activeSection === 'tools' && (
            <div style={{ color: '#c8a84b' }}>TOOLS PLACEHOLDER</div>
          )}
        </div>
      </div>
    </div>
  )
}