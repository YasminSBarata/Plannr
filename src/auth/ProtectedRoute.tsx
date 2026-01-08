import { Navigate } from 'react-router-dom'
import { useAuth } from './AuthContext'

export function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()

  // Se não estiver logado, redireciona pro login
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // Se estiver logado, mostra o conteúdo
  return <>{children}</>
}
