'use client'

import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Image, 
  Video, 
  FileText, 
  Lightbulb,
  Sparkles,
  ArrowRight,
  Save,
  Copy,
  Download,
  LogOut,
  User
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import AuthGuard from '@/components/AuthGuard'
import { User as SupabaseUser } from '@supabase/supabase-js'

interface Tool {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  color: string
  placeholder: string
}

const tools: Tool[] = [
  {
    id: 'caption',
    name: 'Gerador de Legendas',
    description: 'Crie legendas envolventes para suas redes sociais',
    icon: <MessageSquare className="w-6 h-6" />,
    color: 'from-pink-500 to-rose-500',
    placeholder: 'Descreva o conteúdo do seu post (ex: foto de produto, evento, etc.)'
  },
  {
    id: 'image',
    name: 'Criador de Imagens',
    description: 'Gere conceitos visuais para campanhas publicitárias',
    icon: <Image className="w-6 h-6" />,
    color: 'from-purple-500 to-indigo-500',
    placeholder: 'Descreva a imagem que você quer criar (ex: banner promocional, logo, etc.)'
  },
  {
    id: 'video',
    name: 'Gerador de Vídeos',
    description: 'Crie roteiros e conceitos para vídeos promocionais',
    icon: <Video className="w-6 h-6" />,
    color: 'from-blue-500 to-cyan-500',
    placeholder: 'Descreva o tipo de vídeo promocional que você quer criar'
  },
  {
    id: 'script',
    name: 'Criador de Roteiros',
    description: 'Desenvolva roteiros completos para campanhas de marketing',
    icon: <FileText className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-500',
    placeholder: 'Descreva sua campanha de marketing (produto, público-alvo, objetivo)'
  },
  {
    id: 'business_idea',
    name: 'Gerador de Ideias',
    description: 'Descubra novas oportunidades de negócio',
    icon: <Lightbulb className="w-6 h-6" />,
    color: 'from-yellow-500 to-orange-500',
    placeholder: 'Descreva seu nicho ou área de interesse para gerar ideias de negócio'
  }
]

function HubGooseApp() {
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null)
  const [prompt, setPrompt] = useState('')
  const [result, setResult] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)

  useEffect(() => {
    // Obter usuário atual
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    getUser()
  }, [])

  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  const generateContent = async () => {
    if (!selectedTool || !prompt.trim()) return

    setIsGenerating(true)
    
    try {
      // Simulação de geração de conteúdo com IA
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      let generatedContent = ''
      
      switch (selectedTool.id) {
        case 'caption':
          generatedContent = `🚀 ${prompt}\n\n✨ Transforme sua presença digital com conteúdo autêntico!\n\n#marketing #conteudo #digital #sucesso #empreendedorismo\n\n👆 Curta se você concorda!\n💬 Comente sua opinião\n🔄 Compartilhe com quem precisa ver`
          break
        case 'image':
          generatedContent = `Conceito Visual: ${prompt}\n\n📐 Especificações:\n• Dimensões: 1080x1080px (Instagram) / 1200x628px (Facebook)\n• Paleta: Cores vibrantes com contraste alto\n• Tipografia: Sans-serif moderna e legível\n• Elementos: Ícones minimalistas, gradientes suaves\n• Call-to-Action: Botão destacado no canto inferior direito\n\n🎨 Sugestões de Design:\n• Background com gradiente ${selectedTool.color.replace('from-', '').replace('to-', ' para ')}\n• Texto principal em branco/preto para contraste\n• Logo da marca no canto superior\n• Espaço negativo para respiração visual`
          break
        case 'video':
          generatedContent = `🎬 Roteiro de Vídeo: ${prompt}\n\n⏱️ Duração: 30-60 segundos\n\n📝 Estrutura:\n[0-5s] Hook: Pergunta impactante ou estatística\n[5-15s] Problema: Apresente a dor do público\n[15-40s] Solução: Mostre seu produto/serviço\n[40-55s] Call-to-Action: Convite claro para ação\n[55-60s] Branding: Logo e contato\n\n🎥 Elementos Visuais:\n• Transições dinâmicas\n• Texto animado sobreposto\n• Música de fundo energética\n• Cores da marca em destaque\n\n📱 Adaptações:\n• Versão vertical para Stories/Reels\n• Versão horizontal para YouTube/LinkedIn\n• Legendas para visualização sem som`
          break
        case 'script':
          generatedContent = `📋 Roteiro de Campanha: ${prompt}\n\n🎯 Objetivo: Aumentar conversões e engajamento\n\n📊 Estratégia:\n1. Pesquisa de público-alvo\n2. Definição de personas\n3. Criação de conteúdo segmentado\n4. Distribuição multicanal\n5. Análise de resultados\n\n📝 Conteúdos Sugeridos:\n• Posts educativos (60%)\n• Conteúdo promocional (20%)\n• Entretenimento/lifestyle (20%)\n\n📅 Cronograma:\n• Semana 1-2: Teaser e awareness\n• Semana 3-4: Educação e valor\n• Semana 5-6: Conversão e vendas\n• Semana 7-8: Retenção e fidelização\n\n📈 KPIs:\n• Alcance e impressões\n• Taxa de engajamento\n• Cliques no link\n• Conversões\n• ROI da campanha`
          break
        case 'business_idea':
          generatedContent = `💡 Ideias de Negócio: ${prompt}\n\n🚀 Oportunidades Identificadas:\n\n1. **Consultoria Especializada**\n   • Nicho: ${prompt}\n   • Modelo: Serviços B2B\n   • Investimento: Baixo\n   • Potencial: Alto\n\n2. **Plataforma Digital**\n   • Conceito: Marketplace/SaaS\n   • Público: Empresas do setor\n   • Monetização: Assinatura mensal\n   • Escalabilidade: Muito alta\n\n3. **Produto Físico Inovador**\n   • Categoria: Solução prática\n   • Diferencial: Tecnologia/design\n   • Canal: E-commerce + varejo\n   • Margem: Média-alta\n\n📊 Análise de Mercado:\n• Tamanho do mercado: Em crescimento\n• Concorrência: Moderada\n• Barreiras de entrada: Baixas-médias\n• Tendências: Favoráveis\n\n💰 Próximos Passos:\n1. Validação com público-alvo\n2. MVP (Produto Mínimo Viável)\n3. Teste de mercado\n4. Captação de recursos\n5. Escalonamento`
          break
      }
      
      setResult(generatedContent)
    } catch (error) {
      console.error('Erro ao gerar conteúdo:', error)
      setResult('Erro ao gerar conteúdo. Tente novamente.')
    } finally {
      setIsGenerating(false)
    }
  }

  const saveContent = async () => {
    if (!selectedTool || !result) return

    try {
      const { data, error } = await supabase
        .from('content_generations')
        .insert([
          {
            tool_type: selectedTool.id,
            prompt: prompt,
            result: result,
            user_id: user?.id
          }
        ])
        .select()

      if (error) throw error

      alert('Conteúdo salvo com sucesso!')
    } catch (error) {
      console.error('Erro ao salvar:', error)
      alert('Erro ao salvar conteúdo. Verifique sua conexão com o Supabase.')
    }
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(result)
    alert('Conteúdo copiado para a área de transferência!')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/20 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">HubGoose</h1>
                <p className="text-purple-200 text-sm">Hub de Marketing com IA</p>
              </div>
            </div>
            
            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <p className="text-white font-medium text-sm">
                    {user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Usuário'}
                  </p>
                  <p className="text-purple-200 text-xs">
                    {user?.email}
                  </p>
                </div>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors group"
                title="Sair"
              >
                <LogOut className="w-5 h-5 text-white group-hover:text-red-300" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!selectedTool ? (
          /* Grid de Ferramentas */
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Potencialize seu Marketing com IA
              </h2>
              <p className="text-xl text-purple-200 max-w-3xl mx-auto">
                Escolha uma ferramenta abaixo e deixe nossa inteligência artificial 
                criar conteúdo profissional para suas campanhas
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  onClick={() => setSelectedTool(tool)}
                  className="group cursor-pointer bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105 hover:bg-white/10"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${tool.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    {tool.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {tool.name}
                  </h3>
                  <p className="text-purple-200 mb-4">
                    {tool.description}
                  </p>
                  <div className="flex items-center text-purple-300 group-hover:text-white transition-colors">
                    <span className="text-sm font-medium">Começar agora</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* Interface da Ferramenta Selecionada */
          <div className="space-y-6">
            {/* Header da Ferramenta */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    setSelectedTool(null)
                    setPrompt('')
                    setResult('')
                  }}
                  className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors"
                >
                  <ArrowRight className="w-5 h-5 text-white rotate-180" />
                </button>
                <div className={`w-12 h-12 bg-gradient-to-r ${selectedTool.color} rounded-xl flex items-center justify-center`}>
                  {selectedTool.icon}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTool.name}</h2>
                  <p className="text-purple-200">{selectedTool.description}</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">
                    Descreva o que você precisa
                  </label>
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder={selectedTool.placeholder}
                    className="w-full h-40 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20 resize-none"
                  />
                </div>
                <button
                  onClick={generateContent}
                  disabled={!prompt.trim() || isGenerating}
                  className={`w-full py-3 px-6 rounded-xl font-medium transition-all duration-300 ${
                    !prompt.trim() || isGenerating
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : `bg-gradient-to-r ${selectedTool.color} text-white hover:scale-105 hover:shadow-lg`
                  }`}
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Gerando conteúdo...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>Gerar com IA</span>
                    </div>
                  )}
                </button>
              </div>

              {/* Output */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="block text-white font-medium">
                    Conteúdo Gerado
                  </label>
                  {result && (
                    <div className="flex space-x-2">
                      <button
                        onClick={copyToClipboard}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Copiar"
                      >
                        <Copy className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={saveContent}
                        className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                        title="Salvar"
                      >
                        <Save className="w-4 h-4 text-white" />
                      </button>
                    </div>
                  )}
                </div>
                <div className="h-40 bg-white/10 border border-white/20 rounded-xl p-4 overflow-y-auto">
                  {result ? (
                    <pre className="text-white whitespace-pre-wrap text-sm leading-relaxed">
                      {result}
                    </pre>
                  ) : (
                    <p className="text-purple-300 text-center mt-16">
                      O conteúdo gerado aparecerá aqui...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-black/20 backdrop-blur-sm border-t border-white/10 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Sparkles className="w-5 h-5 text-purple-400" />
              <span className="text-white font-medium">HubGoose</span>
            </div>
            <p className="text-purple-200 text-sm">
              Transformando ideias em conteúdo de alta qualidade com inteligência artificial
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default function HubGoose() {
  return (
    <AuthGuard>
      <HubGooseApp />
    </AuthGuard>
  )
}