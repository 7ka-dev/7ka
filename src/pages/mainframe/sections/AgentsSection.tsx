import type { JSX } from 'react'

import { AGENTS } from '@/entities/agent'
import type { Agent } from '@/entities/agent'

// ─── stamp config ─────────────────────────────────────────────────────────────

const STAMP: Record<string, { label: string; color: string; rotation: string }> = {
  active:     { label: 'VERIFIED',      color: '#1a3a6b', rotation: 'rotate(-4deg)' },
  ghost:      { label: 'NEVER EXISTED', color: '#8b1a1a', rotation: 'rotate(6deg)'  },
  terminated: { label: 'CASE CLOSED',   color: '#8b1a1a', rotation: 'rotate(-8deg)' },
}

// ─── agent card ───────────────────────────────────────────────────────────────

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }): JSX.Element {
  const stamp = STAMP[agent.status]

  return (
    <button
      onClick={onClick}
      className="relative h-full text-left p-5 border overflow-hidden cursor-pointer"
      style={{ background: '#f0ebe0', borderColor: '#c8b898', boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[3px]"
        style={{ background: 'repeating-linear-gradient(90deg,#1a3a6b 0,#1a3a6b 10px,transparent 10px,transparent 14px)' }}
      />
      <div className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#8a7a60' }}>
        AGENT-{agent.id}
      </div>
      <div className="text-xl font-bold tracking-[0.15em] uppercase text-center mb-2" style={{ color: '#1a1408' }}>
        {agent.codename}
      </div>
      <div className="text-xs tracking-[0.1em] text-center" style={{ color: '#6a5a40' }}>
        {agent.role}
      </div>
      {stamp !== undefined && (
        <div
          className="absolute bottom-4 right-4 text-[0.55rem] font-bold tracking-[0.2em] uppercase border-2 px-2 py-1 opacity-70 select-none pointer-events-none"
          style={{ color: stamp.color, borderColor: stamp.color, transform: stamp.rotation }}
        >
          {stamp.label}
        </div>
      )}
    </button>
  )
}

// ─── agent dossier (exported for OsShell) ────────────────────────────────────

export function AgentDossier({ agentId }: { agentId: string }): JSX.Element {
  const agent = AGENTS.find(a => a.id === agentId)
  const stamp = agent ? STAMP[agent.status] : undefined

  if (!agent) {
    return (
      <div className="text-sm" style={{ color: '#8b1a1a' }}>FILE NOT FOUND. IT NEVER EXISTED.</div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="relative flex gap-6 pb-6 border-b" style={{ borderColor: '#c8b898' }}>
        <div
          className="absolute top-0 left-0 right-0 h-[3px]"
          style={{ background: 'repeating-linear-gradient(90deg,#1a3a6b 0,#1a3a6b 10px,transparent 10px,transparent 14px)' }}
        />
        <div className="shrink-0 flex flex-col items-center gap-2 mt-4">
          <div
            className="relative flex items-center justify-center text-2xl font-bold overflow-hidden"
            style={{ width: '90px', height: '110px', background: '#c8b898', border: '1px solid #a89878', color: '#8a7a60' }}
          >
            ?
            <span
              className="absolute bottom-0 left-0 right-0 text-center text-[0.4rem] py-0.5 font-bold tracking-wider"
              style={{ background: '#8b1a1a', color: '#f0ebe0' }}
            >
              ID REDACTED
            </span>
          </div>
          <div className="text-xs tracking-[0.15em] font-bold" style={{ color: '#6a5a40' }}>
            AGENT-{agent.id}
          </div>
        </div>
        <div className="flex flex-col gap-3 flex-1 mt-4">
          <div className="text-lg font-bold tracking-[0.1em] uppercase" style={{ color: '#1a1408' }}>
            {agent.codename}
          </div>
          <div className="text-sm" style={{ color: '#6a5a40' }}>{agent.role}</div>
          <div className="flex flex-col gap-2 mt-1">
            {[
              { label: 'LEVEL',  value: agent.level || '████' },
              { label: 'SECTOR', value: agent.industry        },
            ].map(({ label, value }) => (
              <div key={label} className="flex gap-3">
                <span className="text-xs tracking-[0.15em] shrink-0" style={{ color: '#8a7a60', width: '60px' }}>{label}</span>
                <span className="text-sm font-medium" style={{ color: '#1a1408' }}>{value}</span>
              </div>
            ))}
          </div>
        </div>
        {stamp !== undefined && (
          <div
            className="absolute top-6 right-2 text-[0.55rem] font-bold tracking-[0.2em] uppercase border-2 px-2 py-1 opacity-60 select-none pointer-events-none"
            style={{ color: stamp.color, borderColor: stamp.color, transform: stamp.rotation }}
          >
            {stamp.label}
          </div>
        )}
      </div>

      <div>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>BACKGROUND</div>
        <p className="text-sm leading-relaxed" style={{ color: '#2a1f00' }}>{agent.background}</p>
      </div>

      <div>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>OPERATIONAL HISTORY</div>
        <p className="text-sm leading-relaxed" style={{ color: '#2a1f00' }}>{agent.operationalHistory}</p>
      </div>

      <div className="border-t pt-4" style={{ borderColor: '#c8b898' }}>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>NOTE FROM COMMAND</div>
        <p className="text-sm leading-relaxed italic" style={{ color: '#6a5a40' }}>{agent.commandNote}</p>
      </div>
    </div>
  )
}

// ─── section ──────────────────────────────────────────────────────────────────

export function AgentsSection({ onOpen }: { onOpen: (id: string) => void }): JSX.Element {
  return (
    <>
      <div className="mb-8">
        <div className="text-sm tracking-[0.25em] uppercase mb-1" style={{ color: '#5a4a2a' }}>
          PERSONNEL FILES — UNIT-7
        </div>
        <div className="text-xs tracking-[0.1em]" style={{ color: '#3a2e18' }}>
          {AGENTS.filter(a => a.status === 'active').length} ACTIVE &nbsp;·&nbsp;
          {AGENTS.filter(a => a.status === 'terminated').length} TERMINATED &nbsp;·&nbsp;
          {AGENTS.filter(a => a.status === 'ghost').length} UNKNOWN
        </div>
      </div>
      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
        {AGENTS.map(agent => (
          <AgentCard key={agent.id} agent={agent} onClick={() => { onOpen(agent.id) }} />
        ))}
      </div>
    </>
  )
}