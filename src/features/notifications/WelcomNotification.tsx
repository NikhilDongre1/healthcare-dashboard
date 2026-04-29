import { useEffect }      from 'react'
import { useAuthStore }   from '@/store/authStore'
import { useNotification } from '@/hooks/useNotification'

export const WelcomeNotification: React.FC = () => {
  const justLoggedIn      = useAuthStore((s) => s.justLoggedIn)
  const clearJustLoggedIn = useAuthStore((s) => s.clearJustLoggedIn)
  const user              = useAuthStore((s) => s.user)
  const { trigger, requestPermission } = useNotification()

  useEffect(() => {
    if (!justLoggedIn) return

    const fire = async () => {
      await requestPermission()
      const name = user?.displayName ?? user?.email ?? 'Admin'
      await trigger({
        title: 'Welcome back 👋',
        body:  `Signed in as ${name}. You have 3 scheduled appointments today.`,
        tag:   'welcome',
        type:  'success',
        inApp: true,
      })
      clearJustLoggedIn()
    }
    const t = setTimeout(fire, 800)
    return () => clearTimeout(t)
  }, [justLoggedIn, clearJustLoggedIn, user, trigger, requestPermission])

  return null
}