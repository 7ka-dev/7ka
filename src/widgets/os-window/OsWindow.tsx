import type { JSX, ReactNode } from 'react'

interface OsWindowProps {
  title: string
  children: ReactNode
  onClose: () => void
}

export function OsWindow({ title, children, onClose }: OsWindowProps): JSX.Element {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.7)' }}
      onClick={onClose}
    >
      <div
        className="flex flex-col overflow-hidden"
        style={{
          background: '#0d0b08',
          border: '1px solid #2a2015',
          width: 'min(720px, 90vw)',
          maxHeight: '80vh',
          boxShadow: '0 0 40px rgba(200,168,75,0.08)',
        }}
        onClick={(e) => {
          e.stopPropagation()
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center justify-between px-4 py-2 shrink-0 border-b select-none"
          style={{ borderColor: '#2a2015' }}
        >
          <span className="text-[0.6rem] tracking-[0.2em] uppercase" style={{ color: '#f0c040' }}>
            {title}
          </span>
          <button onClick={onClose} className="text-[0.6rem] tracking-[0.15em] uppercase" style={{ color: '#5a4a2a' }}>
            [CLOSE]
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{children}</div>
      </div>
    </div>
  )
}
