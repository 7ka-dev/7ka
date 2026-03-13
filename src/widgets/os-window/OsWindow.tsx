import { useCallback, useRef } from 'react'
import type { JSX, ReactNode } from 'react'

type WindowMode = 'portrait' | 'landscape'

export interface OsWindowState {
  id:       string
  title:    string
  mode:     WindowMode
  x:        number
  y:        number
  zIndex:   number
  entityId: string
  kind:     'agent' | 'op'
}

interface OsWindowProps {
  win:      OsWindowState
  children: ReactNode
  onClose:  (id: string) => void
  onFocus:  (id: string) => void
  onMove:   (id: string, x: number, y: number) => void
}

const WINDOW_WIDTH: Record<WindowMode, number> = {
  portrait:  420,
  landscape: 680,
}

const WINDOW_HEIGHT = 560

export function OsWindow({ win, children, onClose, onFocus, onMove }: OsWindowProps): JSX.Element {
  const dragRef = useRef<{ startX: number; startY: number; winX: number; winY: number } | null>(null)

  const handleTitleMouseDown = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('button')) return
    onFocus(win.id)
    dragRef.current = { startX: e.clientX, startY: e.clientY, winX: win.x, winY: win.y }

    const onMouseMove = (ev: MouseEvent): void => {
      if (!dragRef.current) return
      onMove(win.id, dragRef.current.winX + ev.clientX - dragRef.current.startX, dragRef.current.winY + ev.clientY - dragRef.current.startY)
    }
    const onMouseUp = (): void => {
      dragRef.current = null
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseup', onMouseUp)
    }
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('mouseup', onMouseUp)
  }, [win, onFocus, onMove])

  return (
    <div
      className="absolute flex flex-col overflow-hidden"
      style={{
        left:      win.x,
        top:       win.y,
        width:     WINDOW_WIDTH[win.mode],
        height:    WINDOW_HEIGHT,
        zIndex:    win.zIndex,
        border:    '1px solid #3a2e18',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
      }}
      onMouseDown={() => { onFocus(win.id) }}
    >
      {/* Title bar — drag handle */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0 border-b select-none"
        style={{ background: '#0a0905', borderColor: '#2a2015', cursor: 'move' }}
        onMouseDown={handleTitleMouseDown}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => { onClose(win.id) }}
            className="w-4 h-4 rounded-full border flex-shrink-0 cursor-pointer"
            style={{ background: '#6a2a1a', borderColor: '#8b3a2a' }}
            title="Close"
          />
          <span className="text-sm tracking-[0.2em] uppercase" style={{ color: '#8a7040' }}>
            {win.title}
          </span>
        </div>
        <button
          onClick={() => { onClose(win.id) }}
          className="text-sm tracking-[0.15em] uppercase cursor-pointer"
          style={{ color: '#5a4a2a' }}
          onMouseEnter={e => { e.currentTarget.style.color = '#c8a84b' }}
          onMouseLeave={e => { e.currentTarget.style.color = '#5a4a2a' }}
        >
          [CLOSE]
        </button>
      </div>

      {/* Path bar */}
      <div
        className="px-4 py-1.5 shrink-0 border-b text-xs tracking-[0.15em] select-none"
        style={{ background: '#0d0b08', borderColor: '#1a1408', color: '#3a2e18' }}
      >
        /srv/unit7/{win.mode === 'portrait' ? 'personnel' : 'operations'}/{win.title.toLowerCase().replace(/\s/g, '-')}
      </div>

      {/* Content */}
      <div
        className="flex-1 overflow-y-auto p-8 [scrollbar-width:thin]"
        style={{ background: '#f0ebe0', color: '#1a1408', scrollbarColor: '#c8b898 #e8e0d0' }}
      >
        {children}
      </div>
    </div>
  )
}