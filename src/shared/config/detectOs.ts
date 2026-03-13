export type OsType = 'mac' | 'win'

export function detectOs(): OsType {
  return navigator.userAgent.toLowerCase().includes('mac') ? 'mac' : 'win'
}
