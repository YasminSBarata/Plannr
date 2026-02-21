import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

/**
 * Define a estrutura do contexto de autenticação.
 * Contém as informações do usuário e métodos para gerenciar o estado de autenticação.
 */
type AuthContextType = {
  user: User | null
  loading: boolean
  signUp: (email: string, password: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

/**
 * Provider que gerencia o estado de autenticação da aplicação.
 * Envolve a árvore de componentes e fornece acesso ao contexto de autenticação.
 */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // Verifica a sessão existente ao montar o componente e escuta mudanças de autenticação
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  /**
   * Registra um novo usuário no sistema.
   * Após o cadastro, o usuário é automaticamente autenticado.
   */
  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      setUser(data.user)
    }
  }

  /**
   * Autentica um usuário existente com email e senha.
   */
  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      setUser(data.user)
    }
  }

  /**
   * Encerra a sessão do usuário atual.
   */
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) throw error

    setUser(null)
  }

  const value = {
    user,
    loading,
    signUp,
    signIn,
    signOut,
  }

  return (
    <AuthContext.Provider value={value}>
      {loading ? <div>Carregando...</div> : children}
    </AuthContext.Provider>
  )
}

/**
 * Hook personalizado para acessar o contexto de autenticação.
 * Deve ser usado apenas dentro de componentes que estão envolvidos pelo AuthProvider.
 */
export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro do AuthProvider')
  }

  return context
}
