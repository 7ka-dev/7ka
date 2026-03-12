import { useState } from 'react'
import type { JSX } from 'react'

import { OPERATIONS, INCIDENT_LOG } from '@/entities/operation'
import type { Operation } from '@/entities/operation'
import { OsWindow } from '@/widgets/os-window'

const STATUS_COLOR: Record<string, string> = {
  active: '#c8a84b',
  suspended: '#ffb300',
  delivered: '#5a8a4a',
  classified: '#5a4a2a',
}

const LEVEL_COLOR: Record<string, string> = {
  normal: '#5a4a2a',
  warning: '#ffb300',
  critical: '#cc4400',
}

function OpCard({ op, onClick }: { op: Operation; onClick: () => void }): JSX.Element {
  return (
    <button
      onClick={onClick}
      className="text-left p-4 border w-full transition-none"
      style={{ borderColor: '#2a2015', background: '#0d0b08' }}
    >
      <div className="flex items-start justify-between mb-2">
        <span className="text-[0.6rem] tracking-[0.2em]" style={{ color: '#f0c040' }}>
          CASE-{op.id}
        </span>
        <span className="text-[0.55rem] tracking-[0.15em]" style={{ color: STATUS_COLOR[op.status] }}>
          {op.status.toUpperCase()}
        </span>
      </div>

      <div className="text-[0.7rem] tracking-[0.05em] mb-2" style={{ color: '#c8a84b' }}>
        {op.name}
      </div>

      {op.desc !== null && (
        <div className="text-[0.6rem] leading-relaxed line-clamp-2" style={{ color: '#5a4a2a' }}>
          {op.desc}
        </div>
      )}

      {op.hasIncident && (
        <div className="mt-2 text-[0.55rem] tracking-[0.15em]" style={{ color: '#cc4400' }}>
          ⚠ INCIDENT REPORT ATTACHED
        </div>
      )}
    </button>
  )
}

function OpDossier({ op }: { op: Operation }): JSX.Element {
  return (
    <div className="flex flex-col gap-6" style={{ color: '#c8a84b' }}>
      <div className="flex flex-col gap-2">
        {[
          { label: 'CASE ID', value: `CASE-${op.id}` },
          { label: 'NAME', value: op.name },
          { label: 'STATUS', value: op.status.toUpperCase() },
          { label: 'AGENTS', value: op.agents.map((a) => `AGENT-${a}`).join(', ') },
        ].map(({ label, value }) => (
          <div key={label} className="flex gap-4">
            <span className="text-[0.55rem] tracking-[0.15em] shrink-0" style={{ color: '#5a4a2a', width: '70px' }}>
              {label}
            </span>
            <span className="text-[0.65rem] tracking-[0.05em]">{value}</span>
          </div>
        ))}
      </div>

      {op.desc !== null && (
        <div className="border-t pt-4" style={{ borderColor: '#2a2015' }}>
          <div className="text-[0.55rem] tracking-[0.2em] uppercase mb-2" style={{ color: '#5a4a2a' }}>
            BRIEF
          </div>
          <p className="text-[0.65rem] leading-relaxed">{op.desc}</p>
        </div>
      )}

      {op.desc === null && (
        <div className="border-t pt-4" style={{ borderColor: '#2a2015', color: '#3a2e18' }}>
          <p className="text-[0.65rem] tracking-[0.1em]">████████████████████████████████████████████████████████</p>
        </div>
      )}

      {op.hasIncident && (
        <div className="border-t pt-4" style={{ borderColor: '#2a2015' }}>
          <div className="text-[0.55rem] tracking-[0.2em] uppercase mb-4" style={{ color: '#cc4400' }}>
            INCIDENT LOG — CASE-0042
          </div>
          <div className="flex flex-col gap-3">
            {INCIDENT_LOG.map((entry) => (
              <div key={entry.day} className="flex gap-4">
                <span className="text-[0.55rem] tracking-[0.1em] shrink-0" style={{ color: '#5a4a2a', width: '40px' }}>
                  D-{entry.day}
                </span>
                <div className="flex flex-col gap-0.5">
                  {entry.text !== null && (
                    <span className="text-[0.62rem] leading-relaxed" style={{ color: LEVEL_COLOR[entry.level] }}>
                      {entry.text}
                    </span>
                  )}
                  {entry.note !== null && (
                    <span className="text-[0.58rem] leading-relaxed italic" style={{ color: '#3a2e18' }}>
                      {entry.note}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function OpsSection(): JSX.Element {
  const [selected, setSelected] = useState<Operation | null>(null)

  return (
    <>
      <div className="mb-4">
        <div className="text-[0.55rem] tracking-[0.25em] uppercase mb-1" style={{ color: '#5a4a2a' }}>
          OPERATIONS LOG — UNIT-7
        </div>
        <div className="text-[0.6rem] tracking-[0.1em]" style={{ color: '#3a2e18' }}>
          {OPERATIONS.filter((o) => o.status === 'active').length} ACTIVE &nbsp;·&nbsp;
          {OPERATIONS.filter((o) => o.status === 'delivered').length} DELIVERED &nbsp;·&nbsp;
          {OPERATIONS.filter((o) => o.status === 'suspended').length} SUSPENDED &nbsp;·&nbsp;
          {OPERATIONS.filter((o) => o.status === 'classified').length} CLASSIFIED
        </div>
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))' }}>
        {OPERATIONS.map((op) => (
          <OpCard
            key={op.id}
            op={op}
            onClick={() => {
              setSelected(op)
            }}
          />
        ))}
      </div>

      {selected !== null && (
        <OsWindow
          title={`CASE FILE — ${selected.name}`}
          onClose={() => {
            setSelected(null)
          }}
        >
          <OpDossier op={selected} />
        </OsWindow>
      )}
    </>
  )
}
