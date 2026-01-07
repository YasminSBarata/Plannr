import { useState } from 'react'
import type { FormEvent } from 'react'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '../Button.tsx'

interface CardFormProps {
  email: string
  password: string
  error: string
  loading: boolean
  onEmailChange: (email: string) => void
  onPasswordChange: (password: string) => void
  onSubmit: (e: FormEvent) => void
  onNavigateToEsqueceuSenha: () => void
}

export function CardForm({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onNavigateToEsqueceuSenha,
}: CardFormProps) {
  const [mostrarSenha, setMostrarSenha] = useState(false)

  return (
    <div className="flex-1 -mt-10 px-6">
      <div className="bg-primary-50 rounded-3xl shadow-xl p-6">
        {error && <div className="bg-danger/10 text-danger px-4 py-2 rounded-lg mb-4">{error}</div>}

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Email */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-600 block">E-mail</label>
            <div className="relative">
              <Mail
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => onEmailChange(e.target.value)}
                placeholder="seu@email.com"
                required
                className="w-full pl-12 pr-4 py-3 bg-primary-100 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
            </div>
          </div>

          {/* Senha */}
          <div className="space-y-2">
            <label className="text-sm text-neutral-600 block">Senha</label>
            <div className="relative">
              <Lock
                className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400"
                size={20}
              />
              <input
                type={mostrarSenha ? 'text' : 'password'}
                value={password}
                onChange={(e) => onPasswordChange(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full pl-12 pr-12 py-3 bg-primary-100 rounded-xl text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all"
              />
              <button
                type="button"
                onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-primary-500 transition-colors"
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Esqueceu a senha */}
          <div className="text-right">
            <button
              type="button"
              onClick={onNavigateToEsqueceuSenha}
              className="text-sm text-neutral-700 hover:text-primary-600 transition-colors"
            >
              Esqueceu a senha?
            </button>
          </div>

          {/* Botão Entrar */}
          <Button type="submit" disabled={loading} className="w-full py-3 rounded-xl shadow-lg">
            {loading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-neutral-600">
          Não tem conta?{' '}
          <Link to="/register" className="text-neutral-700 hover:text-primary-600 font-medium">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  )
}
