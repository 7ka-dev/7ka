/* eslint-disable no-magic-numbers */
import type * as D3Geo from 'd3-geo'
import { useEffect, useRef, useState } from 'react'
import type { JSX } from 'react'
import * as topojsonClient from 'topojson-client'
import type { Topology, MultiPolygon } from 'topojson-specification'

import { AGENTS } from '@/entities/agent'

interface GeoFeature {
  type: string
  geometry: { type: string; coordinates: number[][][][] | number[][][] }
}

interface GeoBounds {
  lngMin: number
  latMin: number
  lngMax: number
  latMax: number
}

interface Dot {
  id: string
  city: string
  x: number
  y: number
  labelOffset: { x: number; y: number }
}

interface MapPanel {
  transform: string
  scale: number
  paths: string[]
  dots: Dot[]
}

// ─── layout ───────────────────────────────────────────────────────────────────

const INSET_WIDTH_RATIO = 0.26
const INSET_HEIGHT_RATIO = 0.4
const MAP_FILL_FACTOR = 0.96

// ─── geography ────────────────────────────────────────────────────────────────

const BOUNDS_EURASIA: GeoBounds = { lngMin: -15, latMin: 35, lngMax: 140, latMax: 72 }
const BOUNDS_JAPAN: GeoBounds = { lngMin: 128, latMin: 30, lngMax: 148, latMax: 46 }

const PACIFIC_LNG_THRESHOLD = 128

// ─── dots ─────────────────────────────────────────────────────────────────────

const DEFAULT_LABEL_OFFSET = { x: 8, y: 4 } as const

const LABEL_OFFSETS: Record<string, { x: number; y: number }> = {
  '001': { x: -95, y: 4 },
  '002': { x: 8, y: 18 },
  '003': { x: 8, y: -12 },
  '004': { x: -80, y: 4 },
}

// ─── visual style ─────────────────────────────────────────────────────────────

const MAP_STYLE = {
  bg: '#0a0905',
  land: '#1a1408',
  border: '#2a2015',
  dot: '#c8a84b',
  dotActive: '#f0c040',
  dotRing: '#f0c040',
  dotRingOpacity: 0.3,
  label: '#8a7040',
  labelActive: '#f0c040',
  agentId: '#5a4a2a',
  leaderLine: '#3a2e18',
  font: "'IBM Plex Mono', monospace",
} as const

// ─── world atlas ──────────────────────────────────────────────────────────────

const WORLD_ATLAS_URL = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// ─── agent data ───────────────────────────────────────────────────────────────

const AGENTS_WITH_LOCATION = AGENTS.filter((a) => a.status === 'active' && a.location !== undefined)
const JAPAN_AGENTS = AGENTS_WITH_LOCATION.filter((a) => (a.location?.lng ?? 0) >= PACIFIC_LNG_THRESHOLD)
const EURASIA_AGENTS = AGENTS_WITH_LOCATION.filter((a) => (a.location?.lng ?? 0) < PACIFIC_LNG_THRESHOLD)

// ─── builder ──────────────────────────────────────────────────────────────────

function buildPanel(
  d3geo: typeof D3Geo,
  features: GeoFeature[],
  agents: typeof AGENTS_WITH_LOCATION,
  bounds: GeoBounds,
  width: number,
  height: number,
): MapPanel {
  const { lngMin, latMin, lngMax, latMax } = bounds

  const baseProj = d3geo
    .geoMercator()
    .scale(256 / (2 * Math.PI))
    .translate([128, 128])

  const topLeft = baseProj([lngMin, latMax])
  const bottomRight = baseProj([lngMax, latMin])
  if (!topLeft || !bottomRight) return { transform: '', scale: 1, paths: [], dots: [] }

  const regionW = bottomRight[0] - topLeft[0]
  const regionH = bottomRight[1] - topLeft[1]

  const scale = Math.min(width / regionW, height / regionH) * MAP_FILL_FACTOR

  const regionCx = (topLeft[0] + bottomRight[0]) / 2
  const regionCy = (topLeft[1] + bottomRight[1]) / 2
  const centerX = width / 2
  const centerY = height / 2
  const tx = centerX - regionCx * scale
  const ty = centerY - regionCy * scale

  const transform = `translate(${tx.toFixed(4)},${ty.toFixed(4)}) scale(${scale.toFixed(6)})`
  const pathGen = d3geo.geoPath().projection(baseProj)

  const paths = features.map((f) => pathGen(f as Parameters<typeof pathGen>[0]) ?? '').filter(Boolean)

  const dots = agents
    .map((a) => {
      const loc = a.location
      if (!loc) return null
      const raw = baseProj([loc.lng, loc.lat])
      if (!raw) return null
      return {
        id: a.id,
        city: loc.city,
        x: raw[0] * scale + tx,
        y: raw[1] * scale + ty,
        labelOffset: LABEL_OFFSETS[a.id] ?? DEFAULT_LABEL_OFFSET,
      }
    })
    .filter((d): d is Dot => d !== null)

  return { transform, scale, paths, dots }
}

// ─── SVG panel ────────────────────────────────────────────────────────────────

function PanelSvg({
  panel,
  width,
  height,
  hovered,
  onHover,
  clipId,
}: {
  panel: MapPanel
  width: number
  height: number
  hovered: string | null
  onHover: (id: string | null) => void
  clipId: string
}): JSX.Element {
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width.toString()} ${height.toString()}`}
      style={{ display: 'block' }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect x={0} y={0} width={width} height={height} />
        </clipPath>
      </defs>
      <rect width={width} height={height} fill={MAP_STYLE.bg} />

      <g clipPath={`url(#${clipId})`} transform={panel.transform}>
        {panel.paths.map((d, i) => (
          <path key={i} d={d} fill={MAP_STYLE.land} stroke={MAP_STYLE.border} strokeWidth={1 / panel.scale} />
        ))}
      </g>

      {panel.dots.map((dot) => {
        const active = hovered === dot.id
        const lx = dot.x + dot.labelOffset.x
        const ly = dot.y + dot.labelOffset.y
        return (
          <g
            key={dot.id}
            onMouseEnter={() => {
              onHover(dot.id)
            }}
            onMouseLeave={() => {
              onHover(null)
            }}
            style={{ cursor: 'default' }}
          >
            {Math.abs(dot.labelOffset.x) > 20 && (
              <line
                x1={dot.x}
                y1={dot.y}
                x2={dot.labelOffset.x < 0 ? lx + 80 : lx}
                y2={ly}
                stroke={MAP_STYLE.leaderLine}
                strokeWidth={0.5}
              />
            )}
            <circle
              cx={dot.x}
              cy={dot.y}
              r={active ? 9 : 5}
              fill="none"
              stroke={MAP_STYLE.dotRing}
              strokeWidth={0.5}
              opacity={MAP_STYLE.dotRingOpacity}
            />
            <circle cx={dot.x} cy={dot.y} r={2.5} fill={active ? MAP_STYLE.dotActive : MAP_STYLE.dot} />
            <text
              x={lx}
              y={ly}
              fontSize={8}
              fill={active ? MAP_STYLE.labelActive : MAP_STYLE.label}
              fontFamily={MAP_STYLE.font}
              letterSpacing={1}
            >
              {dot.city}
            </text>
            <text
              x={lx}
              y={ly + 10}
              fontSize={6.5}
              fill={MAP_STYLE.agentId}
              fontFamily={MAP_STYLE.font}
              letterSpacing={0.5}
            >
              AGENT-{dot.id}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ─── exported component ───────────────────────────────────────────────────────

export function MapSection(): JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dims, setDims] = useState({ w: 800, h: 480 })
  const [main, setMain] = useState<MapPanel | null>(null)
  const [inset, setInset] = useState<MapPanel | null>(null)
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      const entry = entries[0]
      if (!entry) return
      const { width, height } = entry.contentRect
      if (width > 0 && height > 0) setDims({ w: Math.round(width), h: Math.round(height) })
    })
    observer.observe(el)
    return (): void => {
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    let cancelled = false

    async function load(): Promise<void> {
      const d3geo = await import('d3-geo')
      const topo = await fetch(WORLD_ATLAS_URL)
        .then((r) => r.json())
        .then((data: unknown) => data as Topology)

      if (cancelled) return

      const countries = topo.objects['countries'] as MultiPolygon
      const collection = topojsonClient.feature(topo, countries) as unknown as { features: GeoFeature[] }
      const features = collection.features

      const insetW = Math.round(dims.w * INSET_WIDTH_RATIO)
      const insetH = Math.round(dims.h * INSET_HEIGHT_RATIO)

      setMain(buildPanel(d3geo, features, EURASIA_AGENTS, BOUNDS_EURASIA, dims.w, dims.h))
      setInset(buildPanel(d3geo, features, JAPAN_AGENTS, BOUNDS_JAPAN, insetW, insetH))
    }

    void load()
    return (): void => {
      cancelled = true
    }
  }, [dims])

  const insetW = Math.round(dims.w * INSET_WIDTH_RATIO)
  const insetH = Math.round(dims.h * INSET_HEIGHT_RATIO)
  const showInset = inset !== null && JAPAN_AGENTS.length > 0

  return (
    <div className="flex flex-col h-full gap-3">
      <div>
        <div className="text-[0.55rem] tracking-[0.25em] uppercase mb-1" style={{ color: MAP_STYLE.agentId }}>
          FIELD DEPLOYMENT — UNIT-7
        </div>
        <div className="text-[0.6rem] tracking-[0.1em]" style={{ color: MAP_STYLE.leaderLine }}>
          {AGENTS_WITH_LOCATION.length} AGENTS TRACKED &nbsp;·&nbsp; SECTORS: EURASIA
          {JAPAN_AGENTS.length > 0 ? ' / PACIFIC' : ''}
        </div>
      </div>

      <div
        ref={containerRef}
        className="flex-1 relative border overflow-hidden"
        style={{ borderColor: MAP_STYLE.border, minHeight: 0 }}
      >
        {main !== null ? (
          <PanelSvg
            panel={main}
            width={dims.w}
            height={dims.h}
            hovered={hovered}
            onHover={setHovered}
            clipId="clip-main"
          />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-[0.6rem] tracking-[0.2em]"
            style={{ background: MAP_STYLE.bg, color: MAP_STYLE.leaderLine }}
          >
            LOADING CARTOGRAPHIC DATA...
          </div>
        )}

        {showInset && (
          <div
            className="absolute bottom-0 right-0 overflow-hidden"
            style={{
              width: insetW,
              height: insetH,
              borderTop: `1px solid ${MAP_STYLE.leaderLine}`,
              borderLeft: `1px solid ${MAP_STYLE.leaderLine}`,
            }}
          >
            <div
              className="absolute top-0 left-0 z-10 px-2 py-0.5 text-[0.5rem] tracking-[0.18em] select-none"
              style={{
                background: MAP_STYLE.bg,
                color: MAP_STYLE.leaderLine,
                borderBottom: `1px solid ${MAP_STYLE.border}`,
                borderRight: `1px solid ${MAP_STYLE.border}`,
              }}
            >
              SECTOR: PACIFIC
            </div>
            <PanelSvg
              panel={inset}
              width={insetW}
              height={insetH}
              hovered={hovered}
              onHover={setHovered}
              clipId="clip-inset"
            />
          </div>
        )}
      </div>
    </div>
  )
}
