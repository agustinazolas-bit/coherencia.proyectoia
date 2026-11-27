import React, { useState } from 'react';
import { AIResponseData, AuditorStructuredData, GoogleGroundingSource, ChatMessage } from '../types';
import { AuditorCarousel } from './AuditorCarousel';
import { CitizenAuditView } from './CitizenAuditView';
import { ChatPanel } from './ChatPanel';
import { 
  Copy, 
  Check, 
  X, 
  Send, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Ban, 
  XCircle,
  HelpCircle,
  Code,
  Layers,
  Bot,
  UserCheck,
  MessageSquare
} from 'lucide-react';

import { playPaperRustle, playPaperSlide } from '../utils/audio';

type AiViewMode = 'citizen' | 'auditor' | 'terminal' | 'chat';

interface AiResponseCardProps {
  data: AIResponseData;
  query?: string;
  verifiedSourcesCount?: number;
  isLoading: boolean;
  onReset: () => void;
  onFollowUpQuery?: (query: string) => void;
  chatMessages?: ChatMessage[];
  isChatLoading?: boolean;
  onSendChatMessage?: (message: string) => void;
  onClearChat?: () => void;
  onOpenSourcesModal?: () => void;
  activeViewMode?: AiViewMode;
  onViewModeChange?: (mode: AiViewMode) => void;
}

export const AiResponseCard: React.FC<AiResponseCardProps> = ({
  data,
  query,
  verifiedSourcesCount,
  isLoading,
  onReset,
  onFollowUpQuery,
  chatMessages = [],
  isChatLoading = false,
  onSendChatMessage,
  onClearChat,
  onOpenSourcesModal,
  activeViewMode,
  onViewModeChange,
}) => {
  const [copied, setCopied] = useState(false);
  const [internalViewMode, setInternalViewMode] = useState<AiViewMode>('citizen');
  const [followUpInput, setFollowUpInput] = useState('');

  const viewMode = activeViewMode ?? internalViewMode;
  const setViewMode = (mode: AiViewMode) => {
    setInternalViewMode(mode);
    onViewModeChange?.(mode);
  };

  const handleCopy = () => {
    playPaperSlide();
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!followUpInput.trim() || isLoading || isChatLoading) return;
    playPaperRustle();
    const text = followUpInput.trim();
    setFollowUpInput('');
    if (onSendChatMessage) {
      setViewMode('chat');
      onSendChatMessage(text);
    } else if (onFollowUpQuery) {
      onFollowUpQuery(text);
    }
  };

  const structured: AuditorStructuredData | undefined = data.structuredAudit;
  const googleSources: GoogleGroundingSource[] = data.googleGroundingSources || structured?.googleGroundingSources || [];
  const googleQueries: string[] = data.googleSearchQueries || structured?.googleSearchQueries || [];
  const isGoogleUsed = data.googleSearchUsed || structured?.googleSearchUsed || googleSources.length > 0;

  // Status badge styling helper
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'CUMPLIDA':
      case 'COMPLETO':
      case 'COMPLETA':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          bg: 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 font-semibold',
          dot: 'bg-emerald-400'
        };
      case 'EN CURSO':
      case 'EN PROCESO':
      case 'EN TRAMITE':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-950/70 border-amber-500/60 text-amber-300 font-semibold',
          dot: 'bg-amber-400'
        };
      case 'BLOQUEADA':
        return {
          icon: <Ban className="w-3.5 h-3.5 text-red-400" />,
          bg: 'bg-red-950/70 border-red-500/60 text-red-300 font-semibold',
          dot: 'bg-red-500'
        };
      case 'INCUMPLIDA':
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-red-400" />,
          bg: 'bg-red-950/70 border-red-500/60 text-red-300 font-semibold',
          dot: 'bg-red-500'
        };
      case 'SIN_DATOS':
      case 'SIN DATOS':
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-orange-400" />,
          bg: 'bg-orange-950/70 border-orange-500/60 text-orange-300 font-semibold',
          dot: 'bg-orange-400'
        };
    }
  };

  void getStatusBadge(structured?.status);
  void googleQueries;
  void isGoogleUsed;

  return (
    <div 
      id="card-ai-response"
      className="bg-[#202226] rounded-2xl border border-[#34373e] shadow-lg flex flex-col justify-between overflow-hidden transition-all animate-fade-in-up font-sans"
    >
      {/* Top Header */}
      <div className="bg-[#1c1e22] px-3.5 sm:px-5 py-3 border-b border-[#34373e] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 shrink-0 flex items-center justify-center text-blue-400 shadow-xs">
            <Bot className="w-4 h-4 text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-sm font-bold uppercase tracking-wider text-white font-sans">
                RESPUESTA DE LA IA
              </span>
              <span className="text-xs text-neutral-400 font-normal">
                (análisis prospectivo)
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate">
              Auditoría verificada de compromisos · Primeros 100 días de gobierno
            </p>
          </div>
        </div>

        {/* View Switcher: Modo Ciudadano | Modo Auditor | Chatbot | Terminal */}
        <div className="flex items-center gap-1.5 ml-auto flex-wrap">
          <div className="flex items-center bg-[#27292f] border border-[#383b43] p-0.5 rounded-lg text-xs font-sans">
            <button
              type="button"
              onClick={() => setViewMode('citizen')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'citizen'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Modo Ciudadano: Resumen claro en 3 niveles"
            >
              <UserCheck className="w-3.5 h-3.5" />
              <span>Ciudadano</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('auditor')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'auditor'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Modo Auditor: Desglose técnico y gráficos"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Auditor</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('chat')}
              className={`flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                viewMode === 'chat'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Chatbot conversacional con citas directas a fuentes verificables"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Chatbot{chatMessages.length > 0 ? ` (${chatMessages.length})` : ''}</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('terminal')}
              className={`flex items-center gap-1 px-2 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer hidden sm:flex whitespace-nowrap shrink-0 ${
                viewMode === 'terminal'
                  ? 'bg-blue-600 text-white font-bold shadow-xs'
                  : 'text-neutral-400 hover:text-white'
              }`}
              title="Vista terminal de datos crudos"
            >
              <Code className="w-3.5 h-3.5" />
              <span>Terminal</span>
            </button>
          </div>

          <button
            id="btn-copy-ai-response"
            onClick={handleCopy}
            title="Copiar texto de auditoría"
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-[#2d3037] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            aria-label="Copiar auditoría"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            id="btn-dismiss-ai-response"
            onClick={onReset}
            title="Reiniciar consulta"
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-[#2d3037] transition-colors cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            aria-label="Reiniciar auditoría"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3 sm:p-4 text-neutral-200 text-xs sm:text-sm">
        {isLoading ? (
          <div className="py-12 px-4 flex flex-col items-center justify-center gap-4 text-center animate-fade-in-scale">
            <div className="relative">
              <div className="w-12 h-12 rounded-full border-2 border-neutral-700 border-t-blue-500 animate-spin"></div>
              <Cpu className="w-5 h-5 text-blue-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1 font-sans max-w-md">
              <p className="text-xs uppercase tracking-widest text-blue-400 font-bold">
                AUDITANDO DOCUMENTOS OFICIALES
              </p>
              <p className="text-xs text-neutral-400">
                Cotejando Diario Oficial, balances fiscales y coherencia histórica...
              </p>
            </div>
          </div>
        ) : viewMode === 'chat' ? (
          <ChatPanel
            messages={chatMessages}
            isLoading={isChatLoading}
            activeTopic={structured?.theme || query}
            onSendMessage={(msg) => onSendChatMessage?.(msg)}
            onClearChat={() => onClearChat?.()}
            onOpenSourcesModal={onOpenSourcesModal}
          />
        ) : viewMode === 'terminal' ? (
          /* Monospace Raw Terminal Output */
          <div className="space-y-3 animate-fade-in-up">
            <div className="bg-[#18191c] border border-[#34373e] rounded-xl p-4 font-mono text-xs text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre-wrap">
              <div className="text-neutral-500 mb-2 border-b border-[#34373e] pb-1.5 flex items-center justify-between">
                <span>COHERENC.IA · REGISTRO DOCUMENTAL DE AUDITORÍA</span>
                <span className="text-blue-400 font-bold">VERIFICACIÓN ACTIVA</span>
              </div>
              {data.content}
            </div>
          </div>
        ) : viewMode === 'citizen' && structured ? (
          /* Level 1, 2, 3 Citizen Mode */
          <div className="animate-fade-in-up">
            <CitizenAuditView 
              structured={structured}
              query={query || structured.theme}
              verifiedSourcesCount={verifiedSourcesCount}
              newsVideos={data.newsVideos}
              onSwitchToAuditorMode={() => setViewMode('auditor')}
            />
          </div>
        ) : structured ? (
          /* Deep Technical Auditor Carousel Mode */
          <div className="space-y-3 animate-fade-in-up">
            <AuditorCarousel 
              structured={structured} 
              query={query || structured.theme}
              newsVideos={data.newsVideos}
            />
          </div>
        ) : (
          /* Fallback standard text rendering if structured json is missing */
          <div className="animate-fade-in-up bg-[#26282e] p-4 rounded-xl border border-[#383b43]">
            <div className="whitespace-pre-line text-neutral-200 leading-relaxed font-sans text-xs sm:text-sm">
              {data.content}
            </div>
          </div>
        )}
      </div>

      {/* Interactive Chatbot Follow-Up Bar (shown when viewing Citizen/Auditor/Terminal modes) */}
      {(onSendChatMessage || onFollowUpQuery) && viewMode !== 'chat' && (
        <div className="px-3.5 sm:px-5 py-3 bg-[#1c1e22] border-t border-[#34373e]">
          <form onSubmit={handleFollowUpSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={followUpInput}
              onChange={(e) => setFollowUpInput(e.target.value)}
              placeholder="Preguntar al Chatbot con fuentes sobre esta auditoría..."
              disabled={isLoading || isChatLoading}
              className="flex-1 bg-[#26282e] border border-[#383b43] focus:border-blue-500 focus:ring-1 focus:ring-blue-500 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-hidden font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || isChatLoading || !followUpInput.trim()}
              className="min-h-[38px] bg-blue-600 hover:bg-blue-500 disabled:bg-neutral-800 disabled:text-neutral-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer font-sans active:scale-95 shadow-sm whitespace-nowrap"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Consultar al Chatbot</span>
            </button>
          </form>
        </div>
      )}

      {/* Bottom Footer: CLASIFICACIÓN DE EVIDENCIA & MÉTRICAS DE COHERENCIA */}
      <div className="px-3.5 sm:px-5 py-3 bg-[#1c1e22] border-t border-[#34373e] flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-white font-sans">
            CLASIFICACIÓN DE EVIDENCIA
          </span>
          {data.coherenceMetric.detail && (
            <span className="text-xs text-neutral-400 hidden lg:inline font-sans">
              · {data.coherenceMetric.detail}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 bg-[#26282e] border border-[#383b43] px-3 py-1 rounded-full text-xs font-sans">
          <span className={`w-2 h-2 rounded-full shadow-xs ${
            (structured?.evidenceClassification === 'CONFIRMADA' || data.coherenceMetric.statusColor === 'green') ? 'bg-emerald-400' :
            (structured?.evidenceClassification === 'CONTRADICHA' || data.coherenceMetric.statusColor === 'red') ? 'bg-rose-400' :
            (structured?.evidenceClassification === 'NO VERIFICADA' || data.coherenceMetric.statusColor === 'orange') ? 'bg-orange-400' :
            'bg-amber-400'
          }`}></span>
          <span className={`font-semibold ${
            (structured?.evidenceClassification === 'CONFIRMADA' || data.coherenceMetric.statusColor === 'green') ? 'text-emerald-300' :
            (structured?.evidenceClassification === 'CONTRADICHA' || data.coherenceMetric.statusColor === 'red') ? 'text-rose-300' :
            (structured?.evidenceClassification === 'NO VERIFICADA' || data.coherenceMetric.statusColor === 'orange') ? 'text-orange-300' :
            'text-amber-300'
          }`}>
            {structured?.evidenceClassification || data.coherenceMetric.status || 'PARCIALMENTE CONFIRMADA'}
          </span>
        </div>
      </div>
    </div>
  );
};
