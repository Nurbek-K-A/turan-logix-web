export type LogoVariant = 'dark' | 'light' | 'bw'
export type LogoSize = 'sm' | 'md' | 'lg' | 'xl'

export const COLORS: Record<LogoVariant, { turan: string; logix: string; tagline: string; icon: string; divider: string }> = {
  dark: {
    icon:    '#9bb8d0',
    turan:   '#f4f8fc',
    logix:   '#9bb8d0',
    tagline: '#90a0ae',
    divider: '#f4f8fc',
  },
  light: {
    icon:    '#2f5572',
    turan:   '#08111a',
    logix:   '#2f5572',
    tagline: '#52606e',
    divider: '#08111a',
  },
  bw: {
    turan:   '#1a1a1a',
    logix:   '#555555',
    tagline: '#666666',
    icon:    '#222222',
    divider: '#aaaaaa',
  },
}
