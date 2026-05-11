import { Suspense, lazy, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import '@/i18n'
import { useThemeStore, useAuthStore } from '@/store'
import Layout from '@/components/layout/Layout'
import LoadingScreen from '@/components/ui/LoadingScreen'

const Home = lazy(() => import('@/pages/Home'))
const Login = lazy(() => import('@/pages/Login'))
const Register = lazy(() => import('@/pages/Register'))
const Cabinet = lazy(() => import('@/pages/Cabinet'))
const Orders = lazy(() => import('@/pages/Orders'))
const OrderDetail = lazy(() => import('@/pages/OrderDetail'))
const Services = lazy(() => import('@/pages/Services'))
const Routes_ = lazy(() => import('@/pages/Routes'))
const About = lazy(() => import('@/pages/About'))
const Contacts = lazy(() => import('@/pages/Contacts'))
const Chat = lazy(() => import('@/pages/Chat'))
const NotFound = lazy(() => import('@/pages/NotFound'))

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, staleTime: 5 * 60 * 1000 },
    mutations: { retry: 0 },
  },
})

function PrivateRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />
}

export default function App() {
  const { theme } = useThemeStore()

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  // Listen for auth logout event from axios interceptor
  useEffect(() => {
    const { logout } = useAuthStore.getState()
    window.addEventListener('auth:logout', logout)
    return () => window.removeEventListener('auth:logout', logout)
  }, [])

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Suspense fallback={<LoadingScreen />}>
            <Routes>
              <Route element={<Layout />}>
                <Route path="/" element={<Home />} />
                <Route path="/services" element={<Services />} />
                <Route path="/routes" element={<Routes_ />} />
                <Route path="/about" element={<About />} />
                <Route path="/contacts" element={<Contacts />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/cabinet"
                  element={<PrivateRoute><Cabinet /></PrivateRoute>}
                />
                <Route
                  path="/orders"
                  element={<PrivateRoute><Orders /></PrivateRoute>}
                />
                <Route
                  path="/orders/:id"
                  element={<PrivateRoute><OrderDetail /></PrivateRoute>}
                />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'dark:bg-dark-700 dark:text-white',
            duration: 4000,
          }}
        />
      </QueryClientProvider>
    </HelmetProvider>
  )
}
