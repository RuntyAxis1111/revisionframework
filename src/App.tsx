import { useAuth } from "@/contexts/AuthContext"
import { SignInPage } from "@/components/signin-page"
import { AccessDenied } from "@/components/access-denied"
import { Dashboard } from "@/components/dashboard"

export default function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-black border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-black">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <SignInPage />
  }

  // Check if user email is from @hybecorp.com
  const isAuthorized = user.email?.endsWith('@hybecorp.com')

  if (!isAuthorized) {
    return <AccessDenied />
  }

  return <Dashboard />
}