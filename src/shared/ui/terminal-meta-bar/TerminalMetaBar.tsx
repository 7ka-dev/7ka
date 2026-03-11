import type { JSX } from 'react'

export function TerminalMetaBar(): JSX.Element {
  return (
    <div
      className="text-[0.58rem] tracking-[0.2em] uppercase mb-5"
      style={{ color: '#0a3d00' }}
    >
      <span style={{ color: '#1a8c00' }}>NODE:</span> 7KA-GATEWAY
      &nbsp;|&nbsp;
      <span style={{ color: '#1a8c00' }}>UPTIME:</span> classified
      &nbsp;|&nbsp;
      <span style={{ color: '#1a8c00' }}>LOCATION:</span>{' '}
      <span
        className="rounded-sm px-0.5 select-none"
        style={{ background: '#0a3d00', color: '#0a3d00' }}
      >
        ▓▓▓▓▓▓▓▓▓▓▓
      </span>
    </div>
  )
}