export type AgentStatus = 'active' | 'ghost' | 'terminated'

export interface AgentLocation {
  city: string
  lat: number
  lng: number
}

export interface Agent {
  id: string
  status: AgentStatus
  role: string
  industry: string
  level: string
  skills: string[]
  background: string
  operationalHistory: string
  commandNote: string
  location?: AgentLocation
}

export const AGENTS: Agent[] = [
  {
    id: '001',
    status: 'active',
    role: 'Full-Stack Engineer',
    industry: '██████████',
    level: 'Senior',
    skills: ['TypeScript', 'React', 'Node.js', 'PostgreSQL'],
    background: '[PLACEHOLDER: Agent 001 to fill]',
    operationalHistory: '[PLACEHOLDER: Agent 001 to fill]',
    commandNote: '"Shows up. Writes code. Occasionally asks good questions. We keep them."',
    location: { city: 'ST. PETERSBURG', lat: 59.9, lng: 30.3 },
  },
  {
    id: '002',
    status: 'active',
    role: 'Backend / Infra',
    industry: '██████████',
    level: 'Senior',
    skills: ['Python', 'Go', 'AWS', 'Kubernetes'],
    background: '[PLACEHOLDER: Agent 002 to fill]',
    operationalHistory: '[PLACEHOLDER: Agent 002 to fill]',
    commandNote: '"Keeps the lights on. Rarely explains how. We have stopped asking."',
    location: { city: 'YEKATERINBURG', lat: 56.8, lng: 60.6 },
  },
  {
    id: '003',
    status: 'active',
    role: 'Product / Design',
    industry: '██████████',
    level: 'Manager',
    skills: ['UX/UI', 'Figma', 'Strategy'],
    background: '[PLACEHOLDER: Agent 003 to fill]',
    operationalHistory: '[PLACEHOLDER: Agent 003 to fill]',
    commandNote: '"Makes things look intentional. Even when they are not."',
    location: { city: 'LESNOY', lat: 58.6, lng: 59.8 },
  },
  {
    id: '004',
    status: 'active',
    role: 'Data / ML',
    industry: '██████████',
    level: 'Senior',
    skills: ['Python', 'PyTorch', 'Pipelines'],
    background: '[PLACEHOLDER: Agent 004 to fill]',
    operationalHistory: '[PLACEHOLDER: Agent 004 to fill]',
    commandNote: '"Talks to machines. Machines listen. We find this unsettling."',
    location: { city: 'GUNMA', lat: 36.5, lng: 139.0 },
  },
  {
    id: '007',
    status: 'ghost',
    role: '████████████████',
    industry: '████████████████████████',
    level: '████',
    skills: ['███████', '███████'],
    background: '████████████████████████████████████████████████████████████████████████',
    operationalHistory: '████████████████████████████████████████████████████████████████████████',
    commandNote: '"There is no AGENT-007. There never was. Stop asking."',
  },
  {
    id: '0010',
    status: 'terminated',
    role: 'Junior Developer',
    industry: 'intern. just an intern.',
    level: '',
    skills: ['enthusiasm', 'git push -f'],
    background: 'Hired as junior developer. Enthusiasm: high. Judgment: low. We were optimistic.',
    operationalHistory: 'Pushing to main without a PR. Asking what a foreign key is. The last DROP TABLE.',
    commandNote: '"We don\'t talk about it."',
  },
]
