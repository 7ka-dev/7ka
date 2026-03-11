import { makeLine } from "@/shared/lib";
import type { TerminalLine } from "@/shared/lib";

export interface OutputLine {
  text: string;
  printTime: number;
}

export interface CommandBlock {
  command: string;
  output: OutputLine[];
  onComplete?: () => void;
}

const T = {
  INSTANT: 0,
  FAST: 80,
  NORMAL: 150,
  SLOW: 200,
  PAUSE: 300,
  DRAMATIC: 500,
};

function o(text: string, printTime = T.INSTANT): OutputLine {
  return { text, printTime };
}

function ol(texts: string[], printTime = T.FAST): OutputLine[] {
  return texts.map((text) => ({ text, printTime }));
}
const COMMANDS: CommandBlock[] = [
  {
    command: "__boot__",
    output: [
      o("BIOS v1.07 — POST CHECK... <g>OK</g>", T.SLOW),
      o("LOADING KERNEL 4.19.0-7ka... <g>OK</g>", T.SLOW),
      o("MOUNTING FILESYSTEMS... <g>OK</g>", T.SLOW),
      o("  /dev/sda1 mounted at /", T.FAST),
      o("  /dev/sda2 mounted at /var", T.FAST),
      o("  /dev/sda3 mounted at /srv — <w>unexpected volume</w>", T.FAST),
      o("  filesystem check skipped — <w>last check: never</w>", T.FAST),
      o("STARTING SSHD... <g>OK</g>", T.SLOW),
      o("STARTING NETWORK INTERFACES... <g>OK</g>", T.SLOW),
      o("CHECKING SYSTEM INTEGRITY... <g>OK</g>", T.SLOW),
      o("IN1TIALIZING ENVIRONMENT... <g>OK</g>", T.SLOW),
      o("──────────────────────────────────────────", T.PAUSE),
      o("7ka-gateway login: guest", T.NORMAL),
      o(
        "Last login: <r>▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓</r> from <r>▓▓▓▓▓▓▓▓▓▓▓▓▓</r>",
        T.NORMAL,
      ),
      o("──────────────────────────────────────────", 0),
    ],
  },
  {
    command: "help",
    output: ol(
      [
        "┌─ COMMANDS ──────────────────────────────────────┐",
        "│  <g>help</g>       this                                 │",
        "│  <g>scan</g>       discover available targets          │",
        "│  <g>probe</g>      query system identity               │",
        "│  <g>ping</g>       establish contact                   │",
        "│  <g>ls</g>         list filesystem                     │",
        "│  <g>ssh unit7</g>  connect to UNIT-7 MAINFRAME         │",
        "│  <g>clear</g>      clear terminal                      │",
        "│  <d>???</d>        try typing random things            │",
        "└─────────────────────────────────────────────────┘",
      ],
      0,
    ),
  },
  {
    command: "scan",
    output: ol(
      [
        "SCANNING...",
        "",
        "  TARGET           STATUS    PROTOCOL",
        "  ──────────────────────────────────────",
        "  <g>agents.7ka</g>      ONLINE    SSH",
        "  <g>projects.7ka</g>    ONLINE    SSH",
        "  <g>secrets.7ka</g>     ONLINE    SSH",
        "  <g>map.7ka</g>         ONLINE    SSH",
        "  <w>0010.7ka</w>        OFFLINE   —",
        "",
        "  → connect via: <g>ssh unit7</g>",
      ],
      T.FAST,
    ),
  },
  {
    command: "probe",
    output: ol(
      [
        "QUERYING...",
        "",
        "  UNIT:     7ka.dev",
        "  TYPE:     collective / dev group",
        "  AGENTS:   4 active, <w>2 anomalous</w>",
        "  PURPOSE:  <r>████████████████████</r>",
        "  FUNDING:  coffee. just coffee.",
        "  STATUS:   operational <d>(loosely)</d>",
        "",
        "  <d>we take on projects. sometimes. when motivated.</d>",
      ],
      T.FAST,
    ),
  },
  {
    command: "ping",
    output: ol(
      [
        "PINGING <g>hello@7ka.dev</g>...",
        "",
        "  64 bytes: icmp_seq=1 ttl=64",
        "  64 bytes: icmp_seq=2 ttl=64",
        "",
        "  round-trip: faster than our actual response time",
        "",
        "  → <g>hello@7ka.dev</g>",
        "  → <g>github.com/7ka-dev</g>",
        "  <d>we will respond. eventually.</d>",
      ],
      T.FAST,
    ),
  },
  {
    command: "ls",
    output: ol(
      [
        "drwxr-xr-x  <g>bin</g>",
        "drwxr-xr-x  <g>etc</g>",
        "drwxr-xr-x  <g>home</g>",
        "drwxr-xr-x  <g>srv</g>   <w>← unexpected volume</w>",
        "drwxr-xr-x  <g>var</g>",
      ],
      0,
    ),
  },
  {
    command: "ls /srv",
    output: ol(
      [
        "drwxr-x---  <g>.</g>",
        "drwxr-xr-x  <g>..</g>",
        "-rw-------  <w>.access</w>",
        "-rw-r--r--  <d>README</d>",
        "-rwxr-x---  <w>unit7.key</w>",
      ],
      0,
    ),
  },
  {
    command: "sudo",
    output: [o("<e>Permission denied.</e> <d>(nice try)</d>")],
  },
  { command: "pwd", output: [o("/home/guest")] },
  {
    command: "whoami",
    output: [o("<d>good question. existential, even.</d>")],
  },
  {
    command: "rm -rf /",
    output: [
      o(
        "<e>we see what you're trying to do.</e> <d>AGENT-0010 also tried this.</d>",
      ),
    ],
  },
  { command: "rm", output: [o("<e>absolutely not.</e>")] },
  {
    command: "hack",
    output: [o("<g>HACKING...</g> <d>you're already in.</d>")],
  },
  { command: "hello", output: [o("<g>hello.</g> <d>we see you.</d>")] },
  {
    command: "hello world",
    output: [o("<g>hello world.</g> <d>classic.</d>")],
  },
  {
    command: "matrix",
    output: [o("<g>follow the white rabbit.</g> <d>we don't have one.</d>")],
  },
  {
    command: "coffee",
    output: [o("<g>BREWING...</g> <d>this entire org runs on coffee.</d>")],
  },
  {
    command: "007",
    output: [o("<w>AGENT-007 DOES NOT EXIST.</w> <d>stop asking.</d>")],
  },
  {
    command: "exit",
    output: [o("<d>you can't leave. you're already here.</d>")],
  },
  {
    command: "vim",
    output: [o("<d>to exit vim: <g>:q!</g> — you're welcome.</d>")],
  },
  { command: "uname", output: [o("UNIT7-OS 0.7.4-unstable #1 SMP x86_64")] },
  {
    command: "uptime",
    output: [o("<d>uptime: long enough to regret it.</d>")],
  },
  {
    command: "top",
    output: ol(
      [
        "<d>PID 1: motivation          — SLEEPING</d>",
        "<d>PID 2: world_domination.sh — SUSPENDED</d>",
        "<d>PID 3: coffee_daemon       — RUNNING (always)</d>",
      ],
      T.FAST,
    ),
  },
];

export type ResolvedCommand =
  | { type: "block"; block: CommandBlock }
  | { type: "clear" }
  | { type: "ssh" }
  | { type: "unknown"; input: string };

export function resolveCommand(raw: string): ResolvedCommand {
  const trimmed = raw.trim();
  const lower = trimmed.toLowerCase();

  if (!lower) return { type: "block", block: { command: "", output: [] } };
  if (lower === "clear") return { type: "clear" };
  if (lower.startsWith("ssh") || lower.startsWith("connect"))
    return { type: "ssh" };

  const match = COMMANDS.find((c) => c.command === lower);
  if (match) return { type: "block", block: match };

  return { type: "unknown", input: trimmed };
}

export function makeTerminalLine(
  text: string,
  isCommand = false,
): TerminalLine {
  return makeLine(text, isCommand);
}
