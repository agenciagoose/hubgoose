'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { User } from '@supabase/supabase-js'

interface AuthGuardProps {
  children: React.ReactNode
}

export default function AuthGuard({ children }: AuthGuardProps) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o Supabase está configurado
    if (!isSupabaseConfigured() || !supabase) {
      setLoading(false)
      router.push('/auth')
      return
    }

    // Verificar sessão atual
    const getSession = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Erro ao obter sessão:', error)
          setLoading(false)
          router.push('/auth')
          return
        }

        setUser(session?.user ?? null)
        setLoading(false)
        
        if (!session) {
          router.push('/auth')
        }
      } catch (error) {
        console.error('Erro na verificação de sessão:', error)
        setLoading(false)
        router.push('/auth')
      }
    }

    getSession()

    // Escutar mudanças de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user ?? null)
        
        if (event === 'SIGNED_OUT' || !session) {
          router.push('/auth')
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [router])

  // Mostrar mensagem se Supabase não estiver configurado
  if (!isSupabaseConfigured()) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
          <div className="w-16 h-16 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">Configuração Necessária</h2>
          <p className="text-gray-300 mb-6">
            Para usar o HubGoose, você precisa conectar sua conta Supabase.
          </p>
          <div className="space-y-3 text-sm text-gray-400">
            <p>1. Vá em <strong className="text-white">Configurações do Projeto</strong></p>
            <p>2. Clique em <strong className="text-white">Integrações</strong></p>
            <p>3. Conecte sua conta <strong className="text-white">Supabase</strong></p>
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // Redirecionamento já foi feito
  }

  return <>{children}</>
}