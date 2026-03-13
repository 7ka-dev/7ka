import { useEffect, useState } from 'react'
import type { JSX } from 'react'

import type { OsType } from '@/shared/config'
import { GatewayBrowser } from '@/widgets/gateway-browser'
import { GatewayWindow } from '@/widgets/gateway-window'
import { TerminalScreen } from '@/widgets/terminal-screen'

type GatewayView = 'terminal' | 'browser'

interface GatewayOsProps {
  os: OsType
  view: GatewayView
  popupOpen: boolean
  onOpenTerminal: () => void
  onOpenBrowser: () => void
  onClosePopup: () => void
}

const ONE_SECOND_MS = 1000
const TIME_DISPLAY_LENGTH = 5

function useLocalClock(): { time: string; date: string } {
  const [now, setNow] = useState(() => new Date())

  useEffect((): (() => void) => {
    const id = setInterval(() => {
      setNow(new Date())
    }, ONE_SECOND_MS)
    return () => {
      clearInterval(id)
    }
  }, [])

  return {
    time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    date: now.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' }),
  }
}

// ─── right panel ──────────────────────────────────────────────────────────────

function RightPanel({
  os,
  view,
  onOpenTerminal,
  onOpenBrowser,
}: {
  os: OsType
  view: GatewayView
  onOpenTerminal: () => void
  onOpenBrowser: () => void
}): JSX.Element {
  const { time, date } = useLocalClock()
  const isMac = os === 'mac'

  const apps = isMac
    ? [
        { label: 'Terminal', icon: '>_', view: 'terminal' as GatewayView, action: onOpenTerminal },
        { label: 'Safari', icon: '◎', view: 'browser' as GatewayView, action: onOpenBrowser },
      ]
    : [
        { label: 'Terminal', icon: '>_', view: 'terminal' as GatewayView, action: onOpenTerminal },
        { label: 'Browser', icon: '◎', view: 'browser' as GatewayView, action: onOpenBrowser },
      ]

  return (
    <div
      className="flex flex-col items-center py-6 gap-6 shrink-0 select-none"
      style={{
        width: '72px',
        background: isMac ? 'rgba(20,20,20,0.85)' : '#111111',
        borderLeft: '1px solid #2a2a2a',
      }}
    >
      {/* Clock */}
      <div className="flex flex-col items-center gap-1">
        <div className="text-sm font-mono font-bold tabular-nums" style={{ color: isMac ? '#e0e0e0' : '#c0c0c0' }}>
          {time.slice(0, TIME_DISPLAY_LENGTH)}
        </div>
        <div className="text-[0.5rem] tracking-wider text-center" style={{ color: '#505050' }}>
          {date}
        </div>
      </div>

      <div className="w-8 h-px" style={{ background: '#2a2a2a' }} />

      {/* App buttons */}
      <div className="flex flex-col gap-4">
        {apps.map(({ label, icon, view: appView, action }) => {
          const isActive = view === appView
          return (
            <button
              key={label}
              onClick={action}
              title={label}
              className="flex flex-col items-center gap-1.5 cursor-pointer"
            >
              <div
                className="flex items-center justify-center"
                style={{
                  width: '44px',
                  height: '44px',
                  background: isActive
                    ? isMac
                      ? 'rgba(255,255,255,0.15)'
                      : 'rgba(0,120,212,0.25)'
                    : 'rgba(255,255,255,0.04)',
                  border: isActive
                    ? isMac
                      ? '1px solid rgba(255,255,255,0.2)'
                      : '1px solid #0078d4'
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: isMac ? '10px' : '4px',
                  color: isActive ? '#ffffff' : '#606060',
                  transition: 'all 0.1s',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.color = '#a0a0a0'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.color = '#606060'
                  }
                }}
              >
                {icon}
              </div>
              {isMac && isActive && <div className="w-1 h-1 rounded-full" style={{ background: '#ffffff' }} />}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ─── mac menu bar ─────────────────────────────────────────────────────────────

function MacMenuBar({ view }: { view: GatewayView }): JSX.Element {
  return (
    <div
      className="flex items-center px-4 shrink-0 select-none gap-5"
      style={{ height: '28px', background: 'rgba(30,30,30,0.92)', borderBottom: '1px solid #3a3a3a' }}
    >
      <span className="text-xs font-bold" style={{ color: '#e0e0e0' }}>
        &#63743;
      </span>
      <span className="text-xs font-semibold" style={{ color: '#ffffff' }}>
        {view === 'terminal' ? 'Terminal' : 'Safari'}
      </span>
      {['File', 'Edit', 'View', 'Window'].map((m) => (
        <span key={m} className="text-xs cursor-default" style={{ color: '#606060' }}>
          {m}
        </span>
      ))}
    </div>
  )
}

// ─── main component ───────────────────────────────────────────────────────────

export function GatewayOs({
  os,
  view,
  popupOpen,
  onOpenTerminal,
  onOpenBrowser,
  onClosePopup,
}: GatewayOsProps): JSX.Element {
  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden" style={{ background: '#0d0d0d' }}>
      {os === 'mac' && <MacMenuBar view={view} />}

      <div className="flex flex-1 overflow-hidden">
        <div className="flex-1 overflow-hidden relative">
          {view === 'terminal' && <TerminalScreen />}
          {view === 'browser' && <GatewayBrowser os={os} />}
          {popupOpen && <GatewayWindow os={os} onClose={onClosePopup} />}
        </div>

        <RightPanel os={os} view={view} onOpenTerminal={onOpenTerminal} onOpenBrowser={onOpenBrowser} />
      </div>
    </div>
  )
}
