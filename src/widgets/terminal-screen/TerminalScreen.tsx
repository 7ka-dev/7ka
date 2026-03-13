import { useEffect, useRef, useCallback } from 'react'
import type { JSX } from 'react'

import { resolveCommand, makeTerminalLine } from '@/features/terminal-command'
import type { CommandBlock } from '@/features/terminal-command'
import { useTerminalInput } from '@/features/terminal-input'
import { ASCII_LOGO } from '@/shared/config'
import { makeLine } from '@/shared/lib'
import { useAppStore } from '@/shared/store'
import { ScanLines } from '@/shared/ui/scanlines'
import { TerminalMetaBar } from '@/shared/ui/terminal-meta-bar'
import { Vignette } from '@/shared/ui/vignette'

const PROMPT = 'guest@7ka.dev:~$'

export function TerminalScreen(): JSX.Element {
  const history = useAppStore((s) => s.terminalHistory)
  const addLines = useAppStore((s) => s.addLines)
  const bottomRef = useRef<HTMLDivElement>(null)
  const hasBooted = useAppStore((s) => s.hasBooted)
  const setHasBooted = useAppStore((s) => s.setHasBooted)
  const busyRef = useRef(false)

  const playBlock = useCallback(
    (block: CommandBlock): void => {
      busyRef.current = true

      if (block.command && block.command !== '__boot__') {
        addLines([makeTerminalLine(`${PROMPT} ${block.command}`, true)])
      }

      let delay = 0
      for (const [i, line] of block.output.entries()) {
        delay += line.printTime
        setTimeout(() => {
          addLines([makeLine(line.text)])
          if (i === block.output.length - 1) {
            busyRef.current = false
            block.onComplete?.()
          }
        }, delay)
      }

      if (block.output.length === 0) {
        busyRef.current = false
        block.onComplete?.()
      }
    },
    [addLines],
  )

  useEffect(() => {
    if (hasBooted) return
    setHasBooted() // ← set immediately, before playBlock
    const result = resolveCommand('__boot__')
    if (result.type === 'block') playBlock(result.block)
  }, [playBlock, setHasBooted, hasBooted])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'instant' })
  }, [history])

  const handleSubmit = useCallback(
    (raw: string): void => {
      if (busyRef.current) return

      const result = resolveCommand(raw)

      switch (result.type) {
        case 'block':
          playBlock(result.block)
          break
        case 'unknown':
          addLines([makeTerminalLine(`${PROMPT} ${raw}`, true)])
          addLines([makeLine(`<e>command not found: ${raw}</e> <d>— try <g>help</g></d>`)])
          break
      }
    },
    [playBlock, addLines],
  )

  const { input } = useTerminalInput({ onSubmit: handleSubmit, enabled: true })

  return (
    <div
      className="fixed inset-0 flex flex-col p-8 overflow-hidden font-mono"
      style={{ background: '#080a08', color: '#39ff14' }}
    >
      <ScanLines />
      <Vignette />
      <TerminalMetaBar />

      <pre
        className="leading-snug mb-6 whitespace-pre select-none"
        style={{
          fontSize: 'clamp(0.36rem, 0.95vw, 0.72rem)',
          color: '#1a8c00',
          textShadow: '0 0 8px rgba(57,255,20,0.15)',
        }}
      >
        {ASCII_LOGO}
      </pre>

      <div className="flex-1 overflow-y-auto pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {history.map((line) => (
          <div
            key={line.id}
            className="leading-loose tracking-[0.04em]"
            style={{
              fontSize: 'clamp(0.6rem, 1.05vw, 0.8rem)',
              color: '#39ff14',
              textShadow: '0 0 6px rgba(57,255,20,0.3)',
            }}
            dangerouslySetInnerHTML={{ __html: line.html }}
          />
        ))}
        <div ref={bottomRef} />
      </div>

      <div
        className="flex items-center pt-2 border-t"
        style={{
          fontSize: 'clamp(0.6rem, 1.05vw, 0.8rem)',
          borderColor: '#0a3d00',
          color: '#39ff14',
          textShadow: '0 0 6px rgba(57,255,20,0.3)',
        }}
      >
        <span className="whitespace-nowrap">{PROMPT}&nbsp;</span>
        <span>{input}</span>
        <span
          className="inline-block w-[0.55em] h-[1em] align-middle animate-pulse"
          style={{ background: '#39ff14', boxShadow: '0 0 6px rgba(57,255,20,0.8)' }}
        />
      </div>
    </div>
  )
}
