export type LogoVariant = 'dark' | 'light' | 'bw'
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

export const COLORS: Record<LogoVariant, { turan: string; logix: string; tagline: string; icon: string; divider: string }> = {
  dark: {
    turan:   '#f5f0e8',
    logix:   '#c8a96e',
    tagline: '#c8a96e',
    icon:    '#c8a96e',
    divider: '#c8a96e',
  },
  light: {
    turan:   '#1c1a14',
    logix:   '#b8923a',
    tagline: '#857550',
    icon:    '#b8923a',
    divider: '#b8923a',
  },
  bw: {
    turan:   '#1a1a1a',
    logix:   '#555555',
    tagline: '#666666',
    icon:    '#222222',
    divider: '#aaaaaa',
  },
}
