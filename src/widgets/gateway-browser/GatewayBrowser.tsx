import type { JSX } from 'react'

import type { OsType } from '@/shared/config/detectOs'

// ─── mac safari address bar ───────────────────────────────────────────────────

function SafariBar(): JSX.Element {
  return (
    <div
      className="flex items-center gap-3 px-4 shrink-0"
      style={{ height: '44px', background: '#1e1e1e', borderBottom: '1px solid #3a3a3a' }}
    >
      {/* Traffic lights */}
      <div className="flex items-center gap-1.5">
        <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
        <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
      </div>

      {/* Nav arrows */}
      <div className="flex items-center gap-2">
        <span className="text-xs cursor-default" style={{ color: '#404040' }}>
          ‹
        </span>
        <span className="text-xs cursor-default" style={{ color: '#404040' }}>
          ›
        </span>
      </div>

      {/* Address bar */}
      <div
        className="flex-1 flex items-center justify-center px-3 rounded-md text-xs"
        style={{ background: '#2a2a2a', height: '28px', color: '#a0a0a0' }}
      >
        <span style={{ color: '#606060' }}>🔒</span>
        &nbsp;
        <span>7ka.dev</span>
      </div>

      {/* Share / refresh */}
      <span className="text-xs cursor-default" style={{ color: '#404040' }}>
        ↻
      </span>
      <span className="text-xs cursor-default" style={{ color: '#404040' }}>
        ⎋
      </span>
    </div>
  )
}

// ─── win browser bar ──────────────────────────────────────────────────────────

function WinBrowserBar(): JSX.Element {
  return (
    <div
      className="flex items-center gap-2 px-3 shrink-0"
      style={{ height: '40px', background: '#1a1a1a', borderBottom: '1px solid #333' }}
    >
      {/* Title bar controls */}
      <div className="flex items-center gap-1 mr-2">
        <span className="text-xs cursor-default px-1" style={{ color: '#808080' }}>
          —
        </span>
        <span className="text-xs cursor-default px-1" style={{ color: '#808080' }}>
          □
        </span>
        <span className="text-xs cursor-default px-1" style={{ color: '#808080' }}>
          ✕
        </span>
      </div>

      {/* Nav */}
      <span className="text-xs cursor-default" style={{ color: '#404040' }}>
        ←
      </span>
      <span className="text-xs cursor-default" style={{ color: '#404040' }}>
        →
      </span>
      <span className="text-xs cursor-default" style={{ color: '#404040' }}>
        ↻
      </span>

      {/* Address bar */}
      <div
        className="flex-1 flex items-center px-3 text-xs"
        style={{ background: '#2a2a2a', height: '26px', border: '1px solid #404040', color: '#a0a0a0' }}
      >
        🔒 7ka.dev
      </div>

      <span className="text-xs cursor-default px-2" style={{ color: '#606060' }}>
        ···
      </span>
    </div>
  )
}

// ─── page content ─────────────────────────────────────────────────────────────

function PageContent(): JSX.Element {
  return (
    <div
      className="flex-1 overflow-y-auto flex flex-col items-center justify-center p-16 font-mono"
      style={{ background: '#0d0b08', color: '#c8a84b' }}
    >
      <div className="max-w-lg w-full flex flex-col gap-10">
        {/* Header */}
        <div>
          <div className="text-xs tracking-[0.35em] uppercase mb-2" style={{ color: '#5a4a2a' }}>
            UNIT-7 COLLECTIVE
          </div>
          <div className="text-3xl font-bold tracking-[0.1em] uppercase" style={{ color: '#f0c040' }}>
            7KA.DEV
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: '#2a2015' }} />

        {/* What we do */}
        <div>
          <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#5a4a2a' }}>
            WHAT WE DO
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#8a7040' }}>
            [PLACEHOLDER: brief description of collective]
          </p>
        </div>

        {/* Services */}
        <div>
          <div className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: '#5a4a2a' }}>
            CAPABILITIES
          </div>
          <div className="flex flex-col gap-2">
            {['[PLACEHOLDER: capability 1]', '[PLACEHOLDER: capability 2]', '[PLACEHOLDER: capability 3]'].map(
              (item, i) => (
                <div key={i} className="flex gap-3 text-sm" style={{ color: '#8a7040' }}>
                  <span style={{ color: '#3a2e18' }}>—</span>
                  {item}
                </div>
              ),
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="h-px" style={{ background: '#2a2015' }} />

        {/* Contact */}
        <div className="flex flex-col gap-2">
          <div className="text-xs tracking-[0.25em] uppercase mb-1" style={{ color: '#5a4a2a' }}>
            CONTACT
          </div>
          <a href="mailto:hello@7ka.dev" className="text-sm tracking-wider" style={{ color: '#c8a84b' }}>
            hello@7ka.dev
          </a>
          <a href="https://github.com/7ka-dev" className="text-sm tracking-wider" style={{ color: '#5a4a2a' }}>
            github.com/7ka-dev
          </a>
        </div>

        {/* Terminal hint */}
        <div className="text-xs tracking-[0.15em]" style={{ color: '#3a2e18' }}>
          for full access — use the terminal.
        </div>
      </div>
    </div>
  )
}

// ─── exported component ───────────────────────────────────────────────────────

export function GatewayBrowser({ os }: { os: OsType }): JSX.Element {
  return (
    <div className="flex flex-col h-full">
      {os === 'mac' ? <SafariBar /> : <WinBrowserBar />}
      <PageContent />
    </div>
  )
}
