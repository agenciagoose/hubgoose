'use client'

import { Shield, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-md w-full text-center">
        {/* Icon */}
        <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
          <Shield className="w-10 h-10 text-red-400" />
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-white mb-4">
          Acesso Negado
        </h1>

        {/* Description */}
        <p className="text-gray-300 mb-6 leading-relaxed">
          Você não tem permissão para acessar esta área. Esta seção é restrita apenas para administradores.
        </p>

        {/* Info Box */}
        <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 mb-6">
          <p className="text-red-200 text-sm">
            Se você acredita que isso é um erro, entre em contato com o administrador do sistema.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link
            href="/"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Voltar ao Início
          </Link>
        </div>

        {/* Footer */}
        <p className="text-gray-400 text-xs mt-6">
          Precisa de ajuda? Entre em contato em{' '}
          <a href="mailto:contato@agenciagoose.com" className="text-purple-400 hover:text-purple-300">
            contato@agenciagoose.com
          </a>
        </p>
      </div>
    </div>
  )
}