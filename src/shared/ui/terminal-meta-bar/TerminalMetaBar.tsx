import { useEffect, useState } from 'react'
import type { JSX } from 'react'

interface IpData {
  city: string
  country_name: string
}

function useLocation(): string {
  const [location, setLocation] = useState<string>('RESOLVING...')

  useEffect((): void => {
    fetch('https://ipapi.co/json/')
      .then((r) => r.json())
      .then((data: IpData) => {
        setLocation(`${data.city.toUpperCase()}, ${data.country_name.toUpperCase()}`)
      })
      .catch(() => {
        setLocation('UNKNOWN')
      })
  }, [])

  return location
}

export function TerminalMetaBar(): JSX.Element {
  const location = useLocation()

  return (
    <div className="text-sm tracking-[0.2em] uppercase mb-5" style={{ color: '#0a3d00' }}>
      <span style={{ color: '#1a8c00' }}>NODE:</span> 7KA-GATEWAY &nbsp;|&nbsp;
      <span style={{ color: '#1a8c00' }}>UPTIME:</span> CLASSIFIED &nbsp;|&nbsp;
      <span style={{ color: '#1a8c00' }}>LOCATION:</span>{' '}
      {location === 'RESOLVING...' ? (
        <span style={{ color: '#0a3d00' }}>RESOLVING...</span>
      ) : (
        <span style={{ color: '#39ff14' }}>{location}</span>
      )}
    </div>
  )
}
