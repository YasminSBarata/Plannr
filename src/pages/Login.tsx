import { useState } from 'react'
import type { FormEvent } from 'react'
import { useAuth } from '../auth/AuthContext'
import { useNavigate } from 'react-router-dom'
import Header from '../components/ui/atoms/header'
import { CardForm } from '../components/ui/molecules/cardForm'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const { signIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await signIn(email, password)
      navigate('/')
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao fazer login'

      if (errorMessage.includes('Invalid login credentials')) {
        setError('Email ou senha incorretos')
      } else if (errorMessage.includes('Email not confirmed')) {
        setError('Por favor, confirme seu email antes de fazer login')
      } else if (errorMessage.includes('Too many requests')) {
        setError('Muitas tentativas. Tente novamente mais tarde')
      } else {
        setError(errorMessage)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-primary-50 flex flex-col">
      <Header />
      <CardForm
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onNavigateToEsqueceuSenha={() => navigate('/forgot-password')}
      />
    </div>
  )
}
