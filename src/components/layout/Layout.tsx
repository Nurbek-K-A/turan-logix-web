import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import RedesignNavbar from '@/components/redesign/Navbar'
import RedesignFooter from '@/components/redesign/Footer'
import FloatingAI from '@/components/redesign/FloatingAI'

const FULL_SCREEN_ROUTES = ['/chat', '/login', '/register', '/cabinet', '/orders']

export default function Layout() {
  const { pathname } = useLocation()
  const isFullScreen = FULL_SCREEN_ROUTES.some(r => pathname.startsWith(r))

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--bg)',
      color: 'var(--text)',
    }}>
      {!isFullScreen && <RedesignNavbar />}
      <main style={{ flex: 1, paddingTop: isFullScreen ? 0 : 61 }}>
        <Outlet />
      </main>
      {!isFullScreen && <RedesignFooter />}
      {!isFullScreen && <FloatingAI />}
    </div>
  )
}
