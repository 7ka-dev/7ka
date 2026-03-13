import { useCallback, useRef, useState } from 'react'
import type { JSX } from 'react'

import type { OsType } from '@/shared/config/detectOs'

interface TransmissionPopupProps {
  os: OsType
  onClose: () => void
}

const INITIAL_X = 120
const INITIAL_Y = 80
const POPUP_WIDTH = 320
const POPUP_HEIGHT = 200

export function GatewayWindow({ os, onClose }: TransmissionPopupProps): JSX.Element {
  const [pos, setPos] = useState({ x: INITIAL_X, y: INITIAL_Y })
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)

  const handleTitleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLDivElement>): void => {
      if ((e.target as HTMLElement).closest('button')) return
      dragRef.current = { startX: e.clientX, startY: e.clientY, winX: pos.x, winY: pos.y }

      const onMouseMove = (ev: MouseEvent): void => {
        if (!dragRef.current) return
        setPos({
          x: dragRef.current.winX + ev.clientX - dragRef.current.startX,
          y: dragRef.current.winY + ev.clientY - dragRef.current.startY,
        })
      }
      const onMouseUp = (): void => {
        dragRef.current = null
        window.removeEventListener('mousemove', onMouseMove)
        window.removeEventListener('mouseup', onMouseUp)
      }
      window.addEventListener('mousemove', onMouseMove)
      window.addEventListener('mouseup', onMouseUp)
    },
    [pos],
  )

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      style={{
        left: pos.x,
        top: pos.y,
        width: POPUP_WIDTH,
        height: POPUP_HEIGHT,
        zIndex: 100,
        boxShadow: '0 8px 32px rgba(0,0,0,0.6)',
      }}
    >
      {os === 'mac' ? (
        <MacTitleBar onClose={onClose} onMouseDown={handleTitleMouseDown} />
      ) : (
        <WinTitleBar onClose={onClose} onMouseDown={handleTitleMouseDown} />
      )}

      {/* Content */}
      <div
        className="flex-1 flex flex-col items-center justify-center gap-6 p-6"
        style={{ background: os === 'mac' ? 'rgba(28,28,28,0.96)' : '#1a1a1a' }}
      >
        <div
          className="text-xs tracking-[0.25em] uppercase text-center"
          style={{ color: os === 'mac' ? '#606060' : '#808080' }}
        >
          TRANSMISSION CHANNEL
        </div>

        <button
          className="px-6 py-2 text-xs tracking-[0.2em] uppercase font-mono cursor-pointer"
          style={{
            background: 'transparent',
            border: '1px solid #3a2e18',
            color: '#c8a84b',
            transition: 'all 0.1s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1a1408'
            e.currentTarget.style.color = '#f0c040'
            e.currentTarget.style.borderColor = '#f0c040'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#c8a84b'
            e.currentTarget.style.borderColor = '#3a2e18'
          }}
        >
          INITIATE CONTACT
        </button>

        <div className="text-[0.6rem] tracking-wider text-center" style={{ color: '#3a2e18' }}>
          [PLACEHOLDER: transmission event]
        </div>
      </div>
    </div>
  )
}

// ─── title bars ───────────────────────────────────────────────────────────────

function MacTitleBar({
  onClose,
  onMouseDown,
}: {
  onClose: () => void
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}): JSX.Element {
  return (
    <div
      className="flex items-center gap-2 px-3 shrink-0 select-none"
      style={{ height: '32px', background: '#2a2a2a', borderBottom: '1px solid #3a3a3a', cursor: 'move' }}
      onMouseDown={onMouseDown}
    >
      <button onClick={onClose} className="w-3 h-3 rounded-full cursor-pointer" style={{ background: '#ff5f57' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
      <div className="w-3 h-3 rounded-full" style={{ background: '#404040' }} />
      <span className="flex-1 text-center text-[0.6rem] tracking-widest uppercase" style={{ color: '#606060' }}>
        SIGNAL
      </span>
    </div>
  )
}

function WinTitleBar({
  onClose,
  onMouseDown,
}: {
  onClose: () => void
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void
}): JSX.Element {
  return (
    <div
      className="flex items-center justify-between px-3 shrink-0 select-none"
      style={{ height: '32px', background: '#1a1a1a', borderBottom: '1px solid #333', cursor: 'move' }}
      onMouseDown={onMouseDown}
    >
      <span className="text-[0.6rem] tracking-widest uppercase" style={{ color: '#808080' }}>
        SIGNAL
      </span>
      <div className="flex items-center">
        <button
          onClick={onClose}
          className="flex items-center justify-center text-xs cursor-pointer"
          style={{ width: '32px', height: '32px', color: '#808080', background: 'transparent' }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#c42b1c'
            e.currentTarget.style.color = '#fff'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#808080'
          }}
        >
          ✕
        </button>
      </div>
    </div>
  )
}
