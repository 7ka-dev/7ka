import type { JSX } from 'react'

import { OPERATIONS, INCIDENT_LOG } from '@/entities/operation'
import type { Operation } from '@/entities/operation'

// ─── stamp system ─────────────────────────────────────────────────────────────

interface Stamp {
  label:    string
  color:    string
  rotation: string
}

function getStamps(op: Operation): Stamp[] {
  const stamps: Stamp[] = []

  const statusStamp: Record<string, Stamp> = {
    active:     { label: 'ACTIVE',     color: '#1a3a6b', rotation: 'rotate(-5deg)'  },
    suspended:  { label: 'SUSPENDED',  color: '#996b00', rotation: 'rotate(4deg)'   },
    delivered:  { label: 'DELIVERED',  color: '#1a4a2a', rotation: 'rotate(-3deg)'  },
    classified: { label: 'CLASSIFIED', color: '#8b1a1a', rotation: 'rotate(6deg)'   },
  }

  const s = statusStamp[op.status]
  if (s !== undefined) stamps.push(s)

  if (op.hasIncident) {
    stamps.push({ label: 'INCIDENT', color: '#8b1a1a', rotation: 'rotate(-11deg)' })
  }

  return stamps
}

function StampBadge({ stamp }: { stamp: Stamp }): JSX.Element {
  return (
    <div
      className="inline-block text-[0.52rem] font-bold tracking-[0.2em] uppercase border-2 px-2 py-0.5 opacity-75 select-none pointer-events-none"
      style={{ color: stamp.color, borderColor: stamp.color, transform: stamp.rotation }}
    >
      {stamp.label}
    </div>
  )
}

// ─── op card ──────────────────────────────────────────────────────────────────

function OpCard({ op, onClick }: { op: Operation; onClick: () => void }): JSX.Element {
  const stamps = getStamps(op)

  return (
    <button
      onClick={onClick}
      className="relative text-left border overflow-hidden cursor-pointer flex flex-col"
      style={{ height: '160px', background: '#f0ebe0', borderColor: '#c8b898', boxShadow: '2px 2px 0 rgba(0,0,0,0.15)' }}
    >
      <div className="px-4 py-1.5 border-b shrink-0" style={{ background: '#e0d8c8', borderColor: '#c8b898' }}>
        <span className="text-xs tracking-[0.2em] uppercase" style={{ color: '#8a7a60' }}>CASE-{op.id}</span>
      </div>
      <div className="px-4 pt-3 pb-2 flex-1">
        <div className="text-base font-bold tracking-[0.05em] uppercase line-clamp-2" style={{ color: '#1a1408' }}>
          {op.name}
        </div>
      </div>
      <div className="px-4 pb-3 flex flex-wrap gap-2 items-end">
        {stamps.map((stamp, i) => <StampBadge key={i} stamp={stamp} />)}
      </div>
    </button>
  )
}

// ─── op dossier (exported for OsShell) ───────────────────────────────────────

const LEVEL_COLOR: Record<string, string> = {
  normal:   '#6a5a40',
  warning:  '#996b00',
  critical: '#8b1a1a',
}

export function OpDossier({ opId }: { opId: string }): JSX.Element {
  const op = OPERATIONS.find(o => o.id === opId)

  if (!op) {
    return <div className="text-sm" style={{ color: '#8b1a1a' }}>CASE FILE NOT FOUND.</div>
  }

  const stamps = getStamps(op)

  return (
    <div className="flex flex-col gap-6">
      <div className="relative pb-6 border-b" style={{ borderColor: '#c8b898' }}>
        <div
          className="h-[3px] mb-4"
          style={{ background: 'repeating-linear-gradient(90deg,#1a3a6b 0,#1a3a6b 10px,transparent 10px,transparent 14px)' }}
        />
        <div className="text-xs tracking-[0.2em] uppercase mb-1" style={{ color: '#8a7a60' }}>CASE-{op.id}</div>
        <div className="text-xl font-bold tracking-[0.08em] uppercase mb-4" style={{ color: '#1a1408' }}>{op.name}</div>
        <div className="flex flex-col gap-2 mb-4">
          {[
            { label: 'STATUS', value: op.status.toUpperCase() },
            { label: 'AGENTS', value: op.agents.map(a => `AGENT-${a}`).join(', ') },
          ].map(({ label, value }) => (
            <div key={label} className="flex gap-4">
              <span className="text-xs tracking-[0.15em] shrink-0" style={{ color: '#8a7a60', width: '65px' }}>{label}</span>
              <span className="text-sm font-medium" style={{ color: '#1a1408' }}>{value}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3">
          {stamps.map((stamp, i) => <StampBadge key={i} stamp={stamp} />)}
        </div>
      </div>

      <div>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>BRIEF</div>
        {op.desc !== null
          ? <p className="text-sm leading-relaxed" style={{ color: '#2a1f00' }}>{op.desc}</p>
          : <p className="text-sm tracking-[0.1em] select-none" style={{ color: '#c8b898' }}>████████████████████████████████████████████████████████</p>
        }
      </div>

      <div>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>ASSIGNED PERSONNEL</div>
        <div className="flex flex-col gap-1">
          {op.agents.map(a => (
            <div key={a} className="text-sm" style={{ color: '#2a1f00' }}>AGENT-{a}</div>
          ))}
        </div>
      </div>

      {op.hasIncident && (
        <div className="border-t pt-4" style={{ borderColor: '#c8b898' }}>
          <div className="text-xs tracking-[0.2em] uppercase mb-4" style={{ color: '#8b1a1a' }}>
            INCIDENT LOG — CASE-{op.id}
          </div>
          <div className="flex flex-col gap-4">
            {INCIDENT_LOG.map(entry => (
              <div key={entry.day} className="flex gap-4">
                <span className="text-xs tracking-[0.1em] shrink-0 font-bold" style={{ color: '#8a7a60', width: '48px' }}>
                  D-{entry.day}
                </span>
                <div className="flex flex-col gap-1">
                  {entry.text !== null && (
                    <span className="text-sm leading-relaxed" style={{ color: LEVEL_COLOR[entry.level] }}>{entry.text}</span>
                  )}
                  {entry.note !== null && (
                    <span className="text-xs leading-relaxed italic" style={{ color: '#8a7a60' }}>{entry.note}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="border-t pt-4" style={{ borderColor: '#c8b898' }}>
        <div className="text-xs tracking-[0.2em] uppercase mb-2" style={{ color: '#8a7a60' }}>SIGNAL LOGS</div>
        <div className="text-xs tracking-wider" style={{ color: '#c8b898' }}>
          [PLACEHOLDER: link to signal log entries for this case]
        </div>
      </div>
    </div>
  )
}

// ─── section ──────────────────────────────────────────────────────────────────

export function OpsSection({ onOpen }: { onOpen: (id: string) => void }): JSX.Element {
  return (
    <>
      <div className="mb-8">
        <div className="text-sm tracking-[0.25em] uppercase mb-1" style={{ color: '#5a4a2a' }}>
          OPERATIONS LOG — UNIT-7
        </div>
        <div className="text-xs tracking-[0.1em]" style={{ color: '#3a2e18' }}>
          {OPERATIONS.filter(o => o.status === 'active').length} ACTIVE &nbsp;·&nbsp;
          {OPERATIONS.filter(o => o.status === 'delivered').length} DELIVERED &nbsp;·&nbsp;
          {OPERATIONS.filter(o => o.status === 'suspended').length} SUSPENDED &nbsp;·&nbsp;
          {OPERATIONS.filter(o => o.status === 'classified').length} CLASSIFIED
        </div>
      </div>
      <div className="grid gap-8" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {OPERATIONS.map(op => (
          <OpCard key={op.id} op={op} onClick={() => { onOpen(op.id) }} />
        ))}
      </div>
    </>
  )
}