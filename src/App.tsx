import { useEffect } from 'react'
import { useAuthStore } from '@/store/authStore'
import { AppRouter }    from '@/router/AppRouter'
import { Spinner }      from '@/components/ui/Spinner'

function App() {
  const initAuth  = useAuthStore((s) => s.initAuth)
  const isLoading = useAuthStore((s) => s.isLoading)

  useEffect(() => {
    const unsubscribe = initAuth()
    return unsubscribe
  }, [initAuth])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-bg">
        <Spinner size="lg" />
      </div>
    )
  }

  return <AppRouter />
}

export default App