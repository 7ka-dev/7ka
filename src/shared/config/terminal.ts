import type { BootLine } from '@/entities/terminal'

export const ASCII_LOGO = `  ███████╗██╗  ██╗ █████╗      ██████╗ ███████╗██╗   ██╗
     ███╔╝██║ ██╔╝██╔══██╗     ██╔══██╗██╔════╝██║   ██║
    ███╔╝ █████╔╝ ███████║     ██║  ██║█████╗  ██║   ██║
   ███╔╝  ██╔═██╗ ██╔══██║     ██║  ██║██╔══╝  ╚██╗ ██╔╝
   ██╔╝   ██║  ██╗██║  ██║ ██╗ ██████╔╝███████╗ ╚████╔╝ 
   ╚═╝    ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═╝ ╚═════╝ ╚══════╝  ╚═══╝ `

export const BOOT_LINES: BootLine[] = [
  { text: 'BIOS v1.07 — POST CHECK...', status: 'OK' },
  { text: 'LOADING KERNEL 4.19.0-7ka...', status: 'OK' },
  { text: 'MOUNTING FILESYSTEMS...', status: 'OK' },
  { text: '  /dev/sda1 mounted at /', status: null },
  { text: '  /dev/sda2 mounted at /var', status: null },
  { text: '  /dev/sda3 mounted at /srv —', status: 'WARN', warn: 'unexpected volume' },
  { text: '  filesystem check skipped —', status: 'WARN', warn: 'last check: never' },
  { text: 'STARTING SSHD...', status: 'OK' },
  { text: 'STARTING NETWORK INTERFACES...', status: 'OK' },
  { text: 'CHECKING SYSTEM INTEGRITY...', status: 'OK' },
  { text: 'IN1TIALIZING ENVIRONMENT...', status: 'OK' },
  { text: '──────────────────────────────────────────', status: null },
  { text: '7ka-gateway login: guest', status: null },
  { text: 'Last login: ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ from ▓▓▓▓▓▓▓▓▓▓▓▓▓', status: null },
  { text: '──────────────────────────────────────────', status: null },
]