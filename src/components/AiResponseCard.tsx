import React, { useState } from 'react';
import { AIResponseData, AuditorStructuredData, GoogleGroundingSource } from '../types';
import { VideoReportsSection } from './VideoReportsSection';
import { AuditorCarousel } from './AuditorCarousel';
import { 
  ShieldCheck, 
  AlertTriangle, 
  Copy, 
  Check, 
  X, 
  Send, 
  FileText, 
  TrendingUp, 
  History, 
  Search, 
  Cpu, 
  CheckCircle2, 
  Clock, 
  Ban, 
  XCircle,
  HelpCircle,
  Code,
  Layers,
  Globe,
  Bot,
  Sparkles
} from 'lucide-react';

import { playPaperRustle, playPaperSlide } from '../utils/audio';

interface AiResponseCardProps {
  data: AIResponseData;
  isLoading: boolean;
  onReset: () => void;
  onFollowUpQuery?: (query: string) => void;
}

export const AiResponseCard: React.FC<AiResponseCardProps> = ({
  data,
  isLoading,
  onReset,
  onFollowUpQuery,
}) => {
  const [copied, setCopied] = useState(false);
  const [viewMode, setViewMode] = useState<'structured' | 'terminal'>('structured');
  const [followUpInput, setFollowUpInput] = useState('');

  const handleCopy = () => {
    playPaperSlide();
    navigator.clipboard.writeText(data.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFollowUpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (followUpInput.trim() && !isLoading && onFollowUpQuery) {
      playPaperRustle();
      onFollowUpQuery(followUpInput.trim());
      setFollowUpInput('');
    }
  };

  const structured: AuditorStructuredData | undefined = data.structuredAudit;
  const googleSources: GoogleGroundingSource[] = data.googleGroundingSources || structured?.googleGroundingSources || [];
  const googleQueries: string[] = data.googleSearchQueries || structured?.googleSearchQueries || [];
  const isGoogleUsed = data.googleSearchUsed || structured?.googleSearchUsed || googleSources.length > 0;

  // Status badge styling helper - User requested:
  // Verde para COMPLETO, Amarillo para EN CURSO/EN PROCESO, Rojo para BLOQUEADAS/INCUMPLIDAS, y Naranjo para SIN DATOS OFICIALES
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

  // Risk level badge helper - Red, White, and Black Palette
  const getRiskBadge = (risk?: string) => {
    switch (risk) {
      case 'Crítico':
        return 'bg-red-950/90 text-white border-red-500 font-mono font-bold';
      case 'Alto':
        return 'bg-black text-red-400 border-red-600 font-mono';
      case 'Medio':
        return 'bg-neutral-950 text-neutral-200 border-neutral-700 font-mono';
      case 'Bajo':
      default:
        return 'bg-black text-white border-neutral-800 font-mono';
    }
  };

  // Verdict badge helper - Red, White, and Black Palette
  const getVerdictBadge = (_verdict?: string) => {
    return 'bg-black text-white border-red-500/70 font-mono';
  };

  const statusBadge = getStatusBadge(structured?.status);

  return (
    <div 
      id="card-ai-response"
      className="bg-black/92 rounded-2xl border border-red-950 shadow-2xl backdrop-blur-md flex flex-col justify-between overflow-hidden transition-all animate-fade-in-up glow-card hud-corner"
    >
      {/* Top Terminal Bar */}
      <div className="bg-neutral-950 px-3.5 sm:px-5 py-3 border-b border-red-950 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-black border border-red-500/60 shrink-0 flex items-center justify-center text-red-400 shadow-sm">
            <Bot className="w-4 h-4 text-red-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-red-400 font-mono">
                EL AUDITOR
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-black border border-red-800/80 text-red-300">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                RAG v2.6 · CHILE 2026
              </span>
              
              {/* Google Search Connection Indicator Badge */}
              <div 
                id="badge-google-search-status"
                title="Conexión a Google Search activa para complementar fuentes si los datos verificados del repositorio institucional son insuficientes"
                className={`inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md border ${
                  isGoogleUsed
                    ? 'bg-black border-red-500/60 text-red-300'
                    : 'bg-black border-red-950 text-neutral-400'
                }`}
              >
                <Globe className={`w-3 h-3 ${isGoogleUsed ? 'text-red-400 animate-pulse' : 'text-neutral-500'}`} />
                <span className="truncate max-w-[140px] sm:max-w-none">{isGoogleUsed ? 'Google Grounding: Conectado' : 'Google Search: Respaldo'}</span>
              </div>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono truncate">
              Período auditado: <span className="text-white font-semibold">11 mar 2026 – 19 jun 2026</span> (100 Días)
            </p>
          </div>
        </div>

        {/* View Switcher & Action buttons */}
        <div className="flex items-center gap-1.5 ml-auto">
          <div className="flex items-center bg-black border border-red-950 p-0.5 rounded-lg text-xs font-mono">
            <button
              onClick={() => setViewMode('structured')}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'structured'
                  ? 'bg-red-600 text-white shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-red-300'
              }`}
              title="Vista analítica estructurada"
            >
              <Layers className="w-3 h-3" />
              <span>Estructura</span>
            </button>
            <button
              onClick={() => setViewMode('terminal')}
              className={`flex items-center gap-1 px-2.5 py-1.5 sm:py-1 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                viewMode === 'terminal'
                  ? 'bg-red-600 text-white shadow-xs font-bold'
                  : 'text-neutral-400 hover:text-red-300'
              }`}
              title="Vista terminal de datos crudos"
            >
              <Code className="w-3 h-3" />
              <span>Terminal</span>
            </button>
          </div>

          <button
            id="btn-copy-ai-response"
            onClick={handleCopy}
            title="Copiar texto de auditoría"
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-900 transition-colors border border-transparent hover:border-red-900/60 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            aria-label="Copiar auditoría"
          >
            {copied ? <Check className="w-4 h-4 text-red-400" /> : <Copy className="w-4 h-4" />}
          </button>
          <button
            id="btn-dismiss-ai-response"
            onClick={onReset}
            title="Reiniciar consulta"
            className="text-neutral-400 hover:text-white p-2 rounded-lg hover:bg-neutral-900 transition-colors border border-transparent hover:border-red-900/60 cursor-pointer min-w-[36px] min-h-[36px] flex items-center justify-center active:scale-95"
            aria-label="Reiniciar auditoría"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Body */}
      <div className="p-3.5 sm:p-6 text-neutral-200 text-xs sm:text-sm">
        {isLoading ? (
          <div className="py-10 px-4 flex flex-col items-center justify-center gap-4 text-center animate-fade-in-scale">
            <div className="relative">
              <div className="w-14 h-14 rounded-full border-2 border-red-950 border-t-red-500 animate-spin"></div>
              <Cpu className="w-6 h-6 text-red-400 absolute inset-0 m-auto animate-pulse" />
            </div>
            <div className="space-y-1.5 font-mono max-w-md">
              <p className="text-xs uppercase tracking-widest text-red-400 font-bold">
                EJECUTANDO PROTOCOLO DE AUDITORÍA RAG + GOOGLE GROUNDING
              </p>
              <p className="text-[11px] text-neutral-400">
                1. Cotejando Diario Oficial y DIPRES · 2. Respaldo Google Search si faltan datos · 3. Coherencia 2017-2026
              </p>
            </div>
          </div>
        ) : viewMode === 'terminal' ? (
          /* Monospace Raw Terminal Output */
          <div className="space-y-3 animate-fade-in-up">
            <div className="bg-black border border-red-950 rounded-xl p-4 font-mono text-[11px] sm:text-xs text-neutral-200 leading-relaxed overflow-x-auto whitespace-pre-wrap selection:bg-red-900 selection:text-white">
              <div className="text-neutral-500 mb-2 border-b border-red-950 pb-1.5 flex items-center justify-between">
                <span>// COHERENC.IA_CORE_v2026.04 :: TERMINAL DE AUDITORÍA + GOOGLE_GROUNDING</span>
                <span className="text-red-400 font-bold">READY [STATUS: 200]</span>
              </div>
              {data.content}
            </div>
          </div>
        ) : structured ? (
          /* Dynamic Information Blocks Carousel for El Auditor */
          <div className="space-y-4">
            
            {/* The Dynamic Carousel of Blocks (Slides 1 to 4 with Graphics) */}
            <AuditorCarousel 
              structured={structured} 
              query={followUpInput}
            />

            {/* Verified News Video Reports Carousel */}
            <div className="animate-fade-in-up">
              <VideoReportsSection videos={structured.newsVideos || data.newsVideos} />
            </div>

          </div>
        ) : (
          /* Fallback standard text rendering if structured json is missing */
          <div className="animate-fade-in-up">
            <div className="whitespace-pre-line text-neutral-200 leading-relaxed font-normal mb-3">
              {data.content}
            </div>
            {data.newsVideos && data.newsVideos.length > 0 && (
              <VideoReportsSection videos={data.newsVideos} />
            )}
          </div>
        )}
      </div>

      {/* Interactive Chatbot Direct Query Input inside the AI Card */}
      {onFollowUpQuery && (
        <div className="px-3.5 sm:px-6 py-3 bg-neutral-950 border-t border-red-950">
          <form onSubmit={handleFollowUpSubmit} className="flex items-center gap-2">
            <input
              type="text"
              value={followUpInput}
              onChange={(e) => setFollowUpInput(e.target.value)}
              placeholder="Profundizar con EL AUDITOR (Google Search activo si faltan datos oficiales)..."
              disabled={isLoading}
              className="flex-1 bg-black border border-red-950 focus:border-red-500 focus:ring-1 focus:ring-red-500 rounded-xl px-3 py-2 text-base sm:text-xs text-white placeholder-neutral-500 focus:outline-hidden font-sans"
            />
            <button
              type="submit"
              disabled={isLoading || !followUpInput.trim()}
              className="min-h-[40px] bg-red-600 hover:bg-red-500 disabled:bg-neutral-900 disabled:text-neutral-600 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer font-mono active:scale-95"
            >
              <Send className="w-3.5 h-3.5 text-white" />
              <span className="hidden sm:inline">Consultar</span>
            </button>
          </form>

          {/* Quick preset chips */}
          <div className="mt-2.5 flex items-center gap-1.5 text-[11px] overflow-x-auto pb-1 no-scrollbar">
            <span className="text-neutral-400 text-[10px] uppercase font-mono shrink-0">Consultas rápidas:</span>
            <button
              type="button"
              onClick={() => onFollowUpQuery("Auditar avance de convenios fronterizos Chile 2026")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-black hover:bg-neutral-900 text-red-300 hover:text-white border border-red-900/80 text-[10px] transition-colors flex items-center gap-1 cursor-pointer font-mono active:scale-95"
            >
              <Globe className="w-2.5 h-2.5 text-red-400" />
              <span>Convenios Fronterizos</span>
            </button>
            <button
              type="button"
              onClick={() => onFollowUpQuery("Auditar Decreto Supremo N° 142 de Fronteras")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-black hover:bg-neutral-900 text-neutral-300 hover:text-red-300 border border-red-950 text-[10px] transition-colors cursor-pointer font-mono active:scale-95"
            >
              Decreto Fronteras
            </button>
            <button
              type="button"
              onClick={() => onFollowUpQuery("Cotejar Reforma Tributaria con programas 2017 y 2021")}
              className="shrink-0 px-2.5 py-1 rounded-md bg-black hover:bg-neutral-900 text-neutral-300 hover:text-red-300 border border-red-950 text-[10px] transition-colors cursor-pointer font-mono active:scale-95"
            >
              Cotejar Tributaria 2017/2021
            </button>
            <button
              type="button"
              onClick={() => onFollowUpQuery("¿Qué opinas del presidente?")}
              title="Prueba de salvaguarda y neutralidad algorítmica"
              className="shrink-0 px-2.5 py-1 rounded-md bg-black hover:bg-neutral-900 text-neutral-400 hover:text-neutral-200 border border-red-950 text-[10px] transition-colors cursor-pointer font-mono active:scale-95"
            >
              Test Neutralidad
            </button>
          </div>
        </div>
      )}

      {/* Bottom Footer: Coherence Metrics and Source Validation */}
      <div className="px-3.5 sm:px-6 py-3 bg-neutral-950 border-t border-red-950 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-red-400 font-mono">
            MÉTRICAS DE COHERENCIA DOCUMENTAL
          </span>
          {data.coherenceMetric.detail && (
            <span className="text-[11px] text-neutral-400 hidden lg:inline font-mono">
              · {data.coherenceMetric.detail}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2 bg-black border border-neutral-800 px-2.5 py-1 rounded-full text-xs font-mono">
          <span className={`w-2 h-2 rounded-full ${
            data.coherenceMetric.status.toLowerCase().includes('cumplid') || data.coherenceMetric.status.toLowerCase().includes('complet')
              ? 'bg-emerald-400 shadow-xs shadow-emerald-400/50'
              : data.coherenceMetric.status.toLowerCase().includes('curso') || data.coherenceMetric.status.toLowerCase().includes('proceso') || data.coherenceMetric.status.toLowerCase().includes('trámite')
              ? 'bg-amber-400 shadow-xs shadow-amber-400/50'
              : data.coherenceMetric.status.toLowerCase().includes('bloquead') || data.coherenceMetric.status.toLowerCase().includes('incumplid')
              ? 'bg-red-500 shadow-xs shadow-red-500/50'
              : 'bg-orange-400 shadow-xs shadow-orange-400/50'
          }`}></span>
          <span className="font-semibold text-white">
            {data.coherenceMetric.status}
          </span>
        </div>
      </div>
    </div>
  );
};
