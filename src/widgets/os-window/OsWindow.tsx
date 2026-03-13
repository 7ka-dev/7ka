import type { JSX, ReactNode } from 'react'

type WindowMode = 'portrait' | 'landscape'

interface OsWindowProps {
  title: string
  mode?: WindowMode
  children: ReactNode
  onClose: () => void
}

const WINDOW_GEOMETRY: Record<WindowMode, { width: string; height: string; left: string }> = {
  portrait:  { width: '38%', height: '70vh', left: '31%'   },
  landscape: { width: '65%', height: '70vh', left: '17.5%' },
}

export function OsWindow({ title, mode = 'landscape', children, onClose }: OsWindowProps): JSX.Element {
  const geom = WINDOW_GEOMETRY[mode]

  return (
    <div
      className="absolute z-50 flex flex-col"
      style={{
        width:     geom.width,
        height:    geom.height,
        top:       '10%',
        left:      geom.left,
        border:    '1px solid #3a2e18',
        boxShadow: '4px 4px 0 rgba(0,0,0,0.4)',
      }}
    >
      {/* Title bar */}
      <div
        className="flex items-center justify-between px-4 py-3 shrink-0 border-b select-none"
        style={{ background: '#0a0905', borderColor: '#2a2015', cursor: 'move' }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="w-4 h-4 rounded-full border flex-shrink-0"
            style={{ background: '#6a2a1a', borderColor: '#8b3a2a', cursor: 'pointer' }}
            title="Close"
          />
          <span className="text-sm tracking-[0.2em] uppercase" style={{ color: '#8a7040' }}>
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="text-sm tracking-[0.15em] uppercase"
          style={{ color: '#5a4a2a', cursor: 'pointer' }}
        >
          [CLOSE]
        </button>
      </div>

      {/* Path bar */}
      <div
        className="px-4 py-1.5 shrink-0 border-b text-xs tracking-[0.15em] select-none"
        style={{ background: '#0d0b08', borderColor: '#1a1408', color: '#3a2e18' }}
      >
        /srv/unit7/{mode === 'portrait' ? 'personnel' : 'operations'}/{title.toLowerCase().replace(/\s/g, '-')}
      </div>

      {/* Content — paper bg, fixed height, scrollable */}
      <div
        className="flex-1 overflow-y-auto p-8 [scrollbar-width:thin]"
        style={{
          background: '#f0ebe0',
          color: '#1a1408',
          scrollbarColor: '#c8b898 #e8e0d0',
        }}
      >
        {children}
      </div>
    </div>
  )
}