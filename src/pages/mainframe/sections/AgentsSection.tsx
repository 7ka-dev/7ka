import { useState } from 'react'
import type { JSX } from 'react'

import { AGENTS } from '@/entities/agent'
import type { Agent } from '@/entities/agent'
import { OsWindow } from '@/widgets/os-window'

const STATUS_COLOR: Record<string, string> = {
  active:     '#c8a84b',
  ghost:      '#5a4a2a',
  terminated: '#6a2a1a',
}

const STATUS_LABEL: Record<string, string> = {
  active:     'ACTIVE',
  ghost:      'UNKNOWN',
  terminated: 'TERMINATED',
}

function AgentCard({ agent, onClick }: { agent: Agent; onClick: () => void }): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="text-left p-4 border transition-none"
      style={{
        borderColor: '#2a2015',
        background: '#0d0b08',
        width: '100%',
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <span
          className="text-[0.65rem] tracking-[0.2em]"
          style={{ color: '#f0c040' }}
        >
          AGENT-{agent.id}
        </span>
        <span
          className="text-[0.55rem] tracking-[0.15em]"
          style={{ color: STATUS_COLOR[agent.status] }}
        >
          {STATUS_LABEL[agent.status]}
        </span>
      </div>

      <div
        className="text-[0.7rem] tracking-[0.05em] mb-2"
        style={{ color: '#c8a84b' }}
      >
        {agent.role}
      </div>

      <div
        className="text-[0.6rem] tracking-[0.08em] mb-3"
        style={{ color: '#5a4a2a' }}
      >
        {agent.level} — {agent.industry}
      </div>

      <div className="flex flex-wrap gap-1">
        {agent.skills.map(skill => (
          <span
            key={skill}
            className="text-[0.55rem] tracking-[0.05em] px-1.5 py-0.5"
            style={{ background: '#1a1408', color: '#8a7040', border: '1px solid #2a2015' }}
          >
            {skill}
          </span>
        ))}
      </div>
    </button>
  )
}

function AgentDossier({ agent }: { agent: Agent }): JSX.Element {
  return (
    <div className="flex flex-col gap-6" style={{ color: '#c8a84b' }}>
      <div className="flex gap-8">
        {/* ID block */}
        <div className="flex flex-col gap-2 shrink-0">
          <div
            className="flex items-center justify-center"
            style={{
              width: '80px',
              height: '100px',
              border: '1px solid #2a2015',
              background: '#0a0905',
              color: '#2a2015',
              fontSize: '0.5rem',
              letterSpacing: '0.1em',
            }}
          >
            NO PHOTO
          </div>
          <div
            className="text-center text-[0.55rem] tracking-[0.15em]"
            style={{ color: '#f0c040' }}
          >
            AGENT-{agent.id}
          </div>
        </div>

        {/* Fields */}
        <div className="flex flex-col gap-2 flex-1">
          {[
            { label: 'STATUS',   value: STATUS_LABEL[agent.status] ?? agent.status },
            { label: 'ROLE',     value: agent.role },
            { label: 'LEVEL',    value: agent.level || '████' },
            { label: 'INDUSTRY', value: agent.industry },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4">
              <span
                className="text-[0.55rem] tracking-[0.15em] shrink-0"
                style={{ color: '#5a4a2a', width: '70px' }}
              >
                {label}
              </span>
              <span className="text-[0.65rem] tracking-[0.05em]">{value}</span>
            </div>
          ))}
        </div>
      </div>

      <div
        className="border-t pt-4"
        style={{ borderColor: '#2a2015' }}
      >
        <div
          className="text-[0.55rem] tracking-[0.2em] uppercase mb-2"
          style={{ color: '#5a4a2a' }}
        >
          BACKGROUND
        </div>
        <p className="text-[0.65rem] leading-relaxed">{agent.background}</p>
      </div>

      <div>
        <div
          className="text-[0.55rem] tracking-[0.2em] uppercase mb-2"
          style={{ color: '#5a4a2a' }}
        >
          OPERATIONAL HISTORY
        </div>
        <p className="text-[0.65rem] leading-relaxed">{agent.operationalHistory}</p>
      </div>

      <div
        className="border-t pt-4 italic"
        style={{ borderColor: '#2a2015', color: '#5a4a2a' }}
      >
        <div
          className="text-[0.55rem] tracking-[0.2em] uppercase mb-2 not-italic"
          style={{ color: '#5a4a2a' }}
        >
          NOTE FROM COMMAND
        </div>
        <p className="text-[0.65rem] leading-relaxed">{agent.commandNote}</p>
      </div>
    </div>
  )
}

export function AgentsSection(): JSX.Element {
  const [selected, setSelected] = useState<Agent | null>(null)

  return (
    <>
      <div className="mb-4">
        <div
          className="text-[0.55rem] tracking-[0.25em] uppercase mb-1"
          style={{ color: '#5a4a2a' }}
        >
          PERSONNEL FILES — UNIT-7
        </div>
        <div
          className="text-[0.6rem] tracking-[0.1em]"
          style={{ color: '#3a2e18' }}
        >
          {AGENTS.filter(a => a.status === 'active').length} ACTIVE &nbsp;·&nbsp;
          {AGENTS.filter(a => a.status === 'terminated').length} TERMINATED &nbsp;·&nbsp;
          {AGENTS.filter(a => a.status === 'ghost').length} UNKNOWN
        </div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {AGENTS.map(agent => (
          <AgentCard
            key={agent.id}
            agent={agent}
            onClick={() => { setSelected(agent) }}
          />
        ))}
      </div>

      {selected !== null && (
        <OsWindow
          title={`PERSONNEL FILE — AGENT-${selected.id}`}
          onClose={() => { setSelected(null) }}
        >
          <AgentDossier agent={selected} />
        </OsWindow>
      )}
    </>
  )
}