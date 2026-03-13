import { useState } from 'react'
import type { JSX } from 'react'

import { detectOs } from '@/shared/config/detectOs'
import { useAppStore } from '@/shared/store'
import { GatewayOs } from '@/widgets/gateway-os'

const os = detectOs()

export function GatewayMachine(): JSX.Element {
  const gatewayView = useAppStore(s => s.gatewayView)
  const openBrowser = useAppStore(s => s.openBrowser)
  const openTerminal = useAppStore(s => s.openTerminal)
  const [popupOpen, setPopupOpen] = useState(false)

  return (
    <GatewayOs
      os={os}
      view={gatewayView}
      popupOpen={popupOpen}
      onOpenTerminal={openTerminal}
      onOpenBrowser={openBrowser}
      onClosePopup={() => { setPopupOpen(false) }}
    />
  )
}