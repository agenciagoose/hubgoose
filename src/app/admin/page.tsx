'use client'

import { useState, useEffect } from 'react'
import { Users, UserCheck, Clock, Mail, CheckCircle, X } from 'lucide-react'
import { getPendingUsers, getAllUsers, approveUser, UserProfile } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'

export default function AdminPage() {
  const [pendingUsers, setPendingUsers] = useState<UserProfile[]>([])
  const [allUsers, setAllUsers] = useState<UserProfile[]>([])
  const [loading, setLoading] = useState(true)
  const [approving, setApproving] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'pending' | 'all'>('pending')

  useEffect(() => {
    loadUsers()
  }, [])

  const loadUsers = async () => {
    setLoading(true)
    try {
      const [pending, all] = await Promise.all([
        getPendingUsers(),
        getAllUsers()
      ])
      setPendingUsers(pending)
      setAllUsers(all)
    } catch (error) {
      console.error('Erro ao carregar usuários:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApproveUser = async (userId: string) => {
    setApproving(userId)
    try {
      const success = await approveUser(userId)
      if (success) {
        // Recarregar listas
        await loadUsers()
      }
    } catch (error) {
      console.error('Erro ao aprovar usuário:', error)
    } finally {
      setApproving(null)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const UserCard = ({ user, showApproveButton = false }: { user: UserProfile, showApproveButton?: boolean }) => (
    <div className="bg-white/5 border border-white/10 rounded-lg p-4">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-gray-400" />
            <span className="text-white font-medium">{user.email}</span>
          </div>
          
          <div className="flex items-center gap-4 text-sm text-gray-400">
            <span>Tipo: {user.role === 'admin' ? 'Administrador' : 'Cliente'}</span>
            <span>Criado: {formatDate(user.created_at)}</span>
          </div>

          <div className="flex items-center gap-2 mt-2">
            {user.approved ? (
              <div className="flex items-center gap-1 text-green-400">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Aprovado</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-yellow-400">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Pendente</span>
              </div>
            )}
          </div>
        </div>

        {showApproveButton && !user.approved && (
          <button
            onClick={() => handleApproveUser(user.id)}
            disabled={approving === user.id}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {approving === user.id ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <UserCheck className="w-4 h-4" />
            )}
            Aprovar
          </button>
        )}
      </div>
    </div>
  )

  return (
    <AuthGuard requireAdmin={true}>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie usuários e aprovações da plataforma</p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{pendingUsers.length}</p>
                  <p className="text-gray-400 text-sm">Aguardando Aprovação</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center">
                  <UserCheck className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">
                    {allUsers.filter(u => u.approved).length}
                  </p>
                  <p className="text-gray-400 text-sm">Usuários Aprovados</p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">{allUsers.length}</p>
                  <p className="text-gray-400 text-sm">Total de Usuários</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
            <div className="flex bg-white/5 rounded-xl p-1 mb-6">
              <button
                onClick={() => setActiveTab('pending')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'pending'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Clock className="w-4 h-4" />
                Pendentes ({pendingUsers.length})
              </button>
              <button
                onClick={() => setActiveTab('all')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
                  activeTab === 'all'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Users className="w-4 h-4" />
                Todos os Usuários ({allUsers.length})
              </button>
            </div>

            {/* Content */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-gray-400">Carregando usuários...</p>
              </div>
            ) : (
              <div className="space-y-4">
                {activeTab === 'pending' ? (
                  pendingUsers.length > 0 ? (
                    pendingUsers.map((user) => (
                      <UserCard key={user.id} user={user} showApproveButton={true} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                      <p className="text-gray-400">Nenhum usuário aguardando aprovação</p>
                    </div>
                  )
                ) : (
                  allUsers.length > 0 ? (
                    allUsers.map((user) => (
                      <UserCard key={user.id} user={user} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-400">Nenhum usuário encontrado</p>
                    </div>
                  )
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </AuthGuard>
  )
}