import type { JSX } from 'react'

export function Vignette(): JSX.Element {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[9998]"
      style={{
        background:
          'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.7) 100%)',
      }}
    />
  )
}