'use client'

import { Clock, Mail, LogOut } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function PendingApprovalPage() {
  const router = useRouter()

  const handleLogout = async () => {
    if (supabase) {
      await supabase.auth.signOut()
      router.push('/auth')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Clock className="w-10 h-10 text-yellow-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-4">
          Aguardando Aprovação
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          Sua conta foi criada com sucesso! Agora você precisa aguardar a aprovação do administrador para acessar a plataforma.
        </p>

        {/* Info Box */}
        <div className="bg-blue-500/20 border border-blue-500/30 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Mail className="w-5 h-5 text-blue-400" />
            <span className="text-blue-300 font-medium">O que acontece agora?</span>
          </div>
          <p className="text-blue-200 text-sm text-left">
            O administrador foi notificado sobre seu registro e irá revisar sua solicitação. Você receberá um email quando sua conta for aprovada.
          </p>
        </div>

        {/* Status */}
        <div className="flex items-center justify-center gap-2 mb-6">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-yellow-300 text-sm">Status: Pendente</span>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleLogout}
            className="w-full bg-white/5 hover:bg-white/10 border border-white/10 text-white py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
          >
            <LogOut className="w-5 h-5" />
            Sair da Conta
          </button>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-xs mt-6">
          Tem dúvidas? Entre em contato conosco em{' '}
          <a href="mailto:contato@agenciagoose.com" className="text-purple-400 hover:text-purple-300">
            contato@agenciagoose.com
          </a>
        </p>
      </div>
    </div>
  )
}