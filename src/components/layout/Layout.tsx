import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'

const FULL_SCREEN_ROUTES = ['/chat']

export default function Layout() {
  const { pathname } = useLocation()
  const isFullScreen = FULL_SCREEN_ROUTES.includes(pathname)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className={
      isFullScreen
        ? 'h-screen overflow-hidden flex flex-col bg-navy-900 dark:bg-navy-900 light:bg-gray-50 transition-colors duration-300'
        : 'min-h-screen flex flex-col bg-navy-900 dark:bg-navy-900 light:bg-gray-50 transition-colors duration-300'
    }>
      <Navbar />
      <main className={isFullScreen ? 'flex-1 flex flex-col overflow-hidden' : 'flex-1'}>
        <Outlet />
      </main>
      {!isFullScreen && <Footer />}
    </div>
  )
}
