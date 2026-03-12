export type OperationStatus = 'active' | 'suspended' | 'delivered' | 'classified'

export interface Operation {
  id: string
  name: string
  status: OperationStatus
  desc: string | null
  hasIncident: boolean
  agents: string[]
}

export interface IncidentEntry {
  day: string
  level: 'normal' | 'warning' | 'critical'
  text: string | null
  note: string | null
}

export const OPERATIONS: Operation[] = [
  {
    id: '0001',
    name: '[PLACEHOLDER]',
    status: 'active',
    desc: 'Placeholder. Real project. Does something useful. Someone will write this eventually.',
    hasIncident: false,
    agents: ['001', '002'],
  },
  {
    id: '0002',
    name: '[PLACEHOLDER]',
    status: 'active',
    desc: "Also real. Also placeholder. We'll get to it.",
    hasIncident: false,
    agents: ['003', '004'],
  },
  {
    id: '0007',
    name: 'OPERATION GOLDENEYE',
    status: 'classified',
    desc: null,
    hasIncident: false,
    agents: ['007'],
  },
  {
    id: '0042',
    name: 'WORLD DOMINATION — PHASE 1',
    status: 'suspended',
    desc: 'Ambitious. Visionary. Technically sound on paper. Suspended indefinitely after incident with AGENT-0010. Phase 2 contingent on Phase 1. We are aware.',
    hasIncident: true,
    agents: ['0010'],
  },
  {
    id: '0099',
    name: 'THE INTERNET',
    status: 'delivered',
    desc: "Conceptualized, architected, and delivered by UNIT-7. You're welcome. We do not take questions on this.",
    hasIncident: false,
    agents: ['001', '002', '003', '004'],
  },
]

export const INCIDENT_LOG: IncidentEntry[] = [
  {
    day: '001',
    level: 'normal',
    text: 'Agent deployed. Seems capable. We are optimistic.',
    note: 'We were wrong to be optimistic.',
  },
  {
    day: '003',
    level: 'warning',
    text: 'Agent pushed directly to main. No tests. No PR. No remorse.',
    note: 'Said he "didn\'t want to bother anyone." We were bothered.',
  },
  {
    day: '007',
    level: 'critical',
    text: 'SQL INJECTION. OUR OWN DATABASE.',
    note: 'Agent claims it was "just a test." Test of what. He could not say.',
  },
  {
    day: '012',
    level: 'warning',
    text: 'Race condition in production. 3am. Agent unreachable.',
    note: 'Phone off. No explanation. Logs show he was online. We saw the discord green dot.',
  },
  {
    day: '019',
    level: 'normal',
    text: 'Memory leak introduced. Agent calls it a "slow feature."',
    note: 'It is not a feature.',
  },
  {
    day: '023',
    level: 'critical',
    text: 'Agent asked what a foreign key is.',
    note: 'We did not answer. We could not speak.',
  },
  {
    day: '031',
    level: 'warning',
    text: 'Internal question raised: is agent actually on our side?',
    note: 'Consensus: unclear. Behavior consistent with sabotage OR incompetence. Distinction irrelevant.',
  },
  {
    day: '044',
    level: 'critical',
    text: '.ENV FILE PUSHED TO PUBLIC REPOSITORY.',
    note: 'We noticed before clients did. Barely. Agent\'s explanation: "I thought .gitignore was optional."',
  },
  {
    day: '051',
    level: 'normal',
    text: 'Last transmission received. Message incomplete:',
    note: '"guys i think i accidentally drop—"\n[CONNECTION LOST]',
  },
  { day: '052', level: 'normal', text: null, note: 'silence.' },
  { day: '053', level: 'normal', text: null, note: 'silence.' },
  { day: '054', level: 'normal', text: null, note: 'silence.' },
  {
    day: '060',
    level: 'critical',
    text: 'CASE CLOSED. ASSET DECOMMISSIONED.',
    note: 'Cause: negligence, incompetence, and one (1) DROP TABLE.\nCASE-0042 suspended pending motivation. Motivation pending.',
  },
]
