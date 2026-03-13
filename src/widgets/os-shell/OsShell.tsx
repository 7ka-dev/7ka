import { useEffect, useState } from 'react'
import type { JSX } from 'react'

import { AGENTS } from '@/entities/agent'
import { AgentsSection } from '@/pages/mainframe/sections/AgentsSection'
import { MapSection } from '@/pages/mainframe/sections/MapSection'
import { OpsSection } from '@/pages/mainframe/sections/OpsSection'
import { useAppStore } from '@/shared/store'
import { ScanLines } from '@/shared/ui/scanlines'
import { OsSidebar } from '@/widgets/os-sidebar'

const ACTIVE_AGENTS = AGENTS.filter((a) => a.status === 'active').length
const ONE_SECOND_MS = 1000

function useJstClock(): string {
  const [time, setTime] = useState(() =>
    new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false }),
  )

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date().toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour12: false }))
    }, ONE_SECOND_MS)
    return (): void => {
      clearInterval(id)
    }
  }, [])

  return time
}

function OsTopBar(): JSX.Element {
  const time = useJstClock()

  return (
    <div
      className="flex items-center justify-between px-6 py-3 shrink-0 border-b select-none"
      style={{ borderColor: '#2a2015', background: '#0a0905' }}
    >
      <span className="text-base tracking-[0.25em] uppercase" style={{ color: '#5a4a2a' }}>
        UNIT-7 // BUILD 0.7.4-UNSTABLE
      </span>

      <div className="flex items-center gap-8 text-sm tracking-[0.15em] uppercase" style={{ color: '#3a2e18' }}>
        <span>
          MEM: 640K <span style={{ color: '#5a4a2a' }}>(should be enough)</span>
        </span>
        <span>
          AGENTS: <span style={{ color: '#c8a84b' }}>{ACTIVE_AGENTS} ACTIVE</span>
        </span>
        <span>
          THREATS: <span style={{ color: '#c8a84b' }}>SEVERAL</span>
        </span>
        <span className="text-base" style={{ color: '#8a7040' }}>
          {time} JST
        </span>
      </div>
    </div>
  )
}

export function OsShell(): JSX.Element {
  const activeSection = useAppStore((s) => s.activeSection)

  return (
    <div className="flex flex-col h-full">
      <ScanLines />
      <OsTopBar />

      <div className="flex flex-1 overflow-hidden">
        <OsSidebar />

        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Section label bar */}
          <div
            className="flex items-center justify-between px-6 py-3 border-b shrink-0"
            style={{ borderColor: '#2a2015' }}
          >
            <span className="text-sm tracking-[0.25em] uppercase" style={{ color: '#5a4a2a' }}>
              INTERNAL ACCESS TERMINAL
            </span>
            <span className="text-sm tracking-[0.2em]" style={{ color: '#5a4a2a' }}>
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
                <div className="text-base tracking-[0.3em] uppercase">SELECT SECTION</div>
                <div className="text-[3rem] tracking-[0.5em]" style={{ color: '#2a2015' }}>
                  ▓▓▓▓▓▓▓▓▓▓▓▓
                </div>
              </div>
            )}

            {activeSection === 'agents' && <AgentsSection />}
            {activeSection === 'ops' && <OpsSection />}
            {activeSection === 'map' && <MapSection />}
            {activeSection === 'logs' && <div style={{ color: '#c8a84b' }}>LOGS PLACEHOLDER</div>}
            {activeSection === 'tools' && <div style={{ color: '#c8a84b' }}>TOOLS PLACEHOLDER</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
