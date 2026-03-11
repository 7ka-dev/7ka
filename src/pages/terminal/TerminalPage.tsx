import type { JSX } from 'react'

const BOOT_LINES = [
  { text: 'BIOS v1.07 — POST CHECK...', status: 'OK' },
  { text: 'LOADING KERNEL...', status: 'OK' },
  { text: 'MOUNTING FILESYSTEMS...', status: 'OK' },
  { text: 'STARTING NETWORK...', status: 'WARN', warn: 'SEVERAL OPEN PORTS' },
  { text: 'SCANNING FOR THREATS...', status: 'FOUND', warn: "1 FOUND (that's you)" },
  { text: '──────────────────────────────────────────', status: null },
  { text: 'Welcome to 7ka.dev public gateway.', status: null },
  { text: 'We know you\'re there. Type help if lost.', status: null },
  { text: '──────────────────────────────────────────', status: null },
]

const ASCII_LOGO = `  ███████╗██╗  ██╗ █████╗     ██████╗ ███████╗██╗   ██╗
     ███╔╝██║ ██╔╝██╔══██╗    ██╔══██╗██╔════╝██║   ██║
    ███╔╝ █████╔╝ ███████║    ██║  ██║█████╗  ██║   ██║
   ███╔╝  ██╔═██╗ ██╔══██║    ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ███████╗██║  ██╗██║  ██║    ██████╔╝███████╗ ╚████╔╝
  ╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝    ╚═════╝ ╚══════╝  ╚═══╝`

export function TerminalPage(): JSX.Element {
  return (
    <div className="fixed inset-0 flex flex-col bg-[#0d0b08] font-mono p-8 overflow-hidden">

      {/* Scanlines */}
      <div
        className="fixed inset-0 pointer-events-none z-[9999]"
        style={{
          background: 'repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.08) 2px,rgba(0,0,0,0.08) 4px)',
        }}
      />

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none z-[9998]"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
        }}
      />

      {/* Top meta */}
      <div className="text-[0.58rem] text-[#6b5a2a] tracking-[0.2em] uppercase mb-5">
        <span className="text-[#4a3d1e]">NODE:</span> 7KA-GATEWAY &nbsp;|&nbsp;
        <span className="text-[#4a3d1e]">UPTIME:</span> classified &nbsp;|&nbsp;
        <span className="text-[#4a3d1e]">LOCATION:</span>{' '}
        <span className="bg-[#6b5a2a] text-[#6b5a2a] rounded-sm px-0.5 select-none">REDACTED</span>
      </div>

      {/* ASCII Logo */}
      <pre
        className="leading-snug mb-6 whitespace-pre select-none"
        style={{
          fontSize: 'clamp(0.36rem, 0.95vw, 0.72rem)',
          color: '#7a6535',
          textShadow: '0 0 8px rgba(200,168,75,0.15)',
        }}
      >
        {ASCII_LOGO}
      </pre>

      {/* Boot lines */}
      <div className="flex-1 overflow-hidden pb-4">
        {BOOT_LINES.map((line, i) => (
          <div
            key={i}
            className="leading-loose tracking-[0.04em]"
            style={{
              fontSize: 'clamp(0.6rem, 1.05vw, 0.8rem)',
              color: '#c8a84b',
              textShadow: '0 0 6px rgba(200,168,75,0.3)',
            }}
          >
            {line.status === null
              ? <span>{line.text}</span>
              : (
                <>
                  <span>{line.text} </span>
                  {line.status === 'OK' && (
                    <span style={{ color: '#8aad5a', textShadow: '0 0 6px rgba(138,173,90,0.4)' }}>OK</span>
                  )}
                  {(line.status === 'WARN' || line.status === 'FOUND') && (
                    <span style={{ color: '#c8a84b', textShadow: '0 0 8px rgba(200,168,75,0.5)' }}>
                      {line.warn}
                    </span>
                  )}
                </>
              )
            }
          </div>
        ))}
      </div>

      {/* Input line */}
      <div
        className="flex items-center gap-2 pt-2 border-t"
        style={{
          fontSize: 'clamp(0.6rem, 1.05vw, 0.8rem)',
          borderColor: '#3d2e0f',
          color: '#c8a84b',
          textShadow: '0 0 6px rgba(200,168,75,0.3)',
        }}
      >
        <span className="whitespace-nowrap">guest@7ka.dev:~$</span>
        <span
          className="inline-block w-[0.55em] h-[1em] align-middle animate-pulse"
          style={{
            background: '#c8a84b',
            boxShadow: '0 0 6px rgba(200,168,75,0.8)',
          }}
        />
      </div>

    </div>
  )
}