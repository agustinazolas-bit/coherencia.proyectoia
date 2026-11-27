import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, ChatCitation, EvidenceClassification } from '../types';
import {
  Send,
  ExternalLink,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  XCircle,
  Clock,
  BookOpen,
  RotateCcw,
  Loader2,
  MessageSquare,
  Radio,
  History,
  Info,
  Tv
} from 'lucide-react';
import { playPaperRustle, playPinClick } from '../utils/audio';

interface ChatPanelProps {
  messages: ChatMessage[];
  isLoading: boolean;
  activeTopic?: string;
  onSendMessage: (message: string) => void;
  onClearChat: () => void;
  onOpenSourcesModal?: () => void;
  onOpenScrapingModal?: () => void;
  fullPageMode?: boolean;
}

const STORAGE_KEY = 'coherencia_chat_history';
const MAX_HISTORY = 5;

const THEMATIC_AREAS = [
  {
    id: 'all',
    label: 'Todas las áreas',
    prompts: [
      'Verifica el Decreto N° 76 de Interior sobre fronteras',
      '¿Qué establece la Ley N° 21.850 (Boletín N° 18.216-05)?',
      '¿Qué establece la Ley N° 18.575 sobre ministerios y SEREMIs?',
      '¿Existe algún decreto que elimine el IVA durante 2026?'
    ]
  },
  {
    id: 'economia',
    label: 'Economía',
    prompts: [
      'Verifica la Ley N° 21.831 sobre endeudamiento fiscal 2026',
      '¿Qué informan los IFP 1T, 2T y 3T de DIPRES y el CFA sobre ajuste fiscal?',
      '¿Qué cifras oficiales reportan el IPoM Junio 2026 y los boletines INE?',
      'Verifica la Ley N° 21.811 sobre precio del kerosene doméstico'
    ]
  },
  {
    id: 'seguridad',
    label: 'Seguridad',
    prompts: [
      'Verifica la Ley N° 21.845 (Boletín N° 16.481-25) sobre flagrancia',
      'Verifica la Ley N° 21.810 sobre Gendarmería en Fuerzas de Orden',
      'Verifica el Boletín N° 15.805-07 sobre Reglas del Uso de la Fuerza',
      'Verifica el Boletín N° 99999-05 (prueba de inexistencia documental)'
    ]
  },
  {
    id: 'educacion',
    label: 'Educación',
    prompts: [
      'Verifica la Ley N° 21.827 sobre seguridad en comunidades educativas',
      'Verifica el Decreto N° 29 de Educación sobre Estrategia de Educación Pública',
      '¿Qué establece el Boletín N° 18.389-04 sobre admisión escolar (SAE)?',
      '¿Existe una ley promulgada en 2026 para voucher escolar universal?'
    ]
  },
  {
    id: 'salud',
    label: 'Salud',
    prompts: [
      '¿Qué establece la Ley N° 21.736 sobre Sistema de Acceso Priorizado Fonasa?',
      'Verifica el Decreto N° 7 de Salud sobre alerta por virus respiratorios',
      '¿Dónde consultar el estado oficial de listas de espera y garantías GES?',
      'Verifica si existe la Resolución Exenta N° 340 de 2026 con texto completo'
    ]
  },
  {
    id: 'gasto',
    label: 'Gasto público',
    prompts: [
      'Verifica la Resolución N° 1.932 de Contraloría sobre viviendas fiscales',
      'Verifica la Resolución N° 2 de Contraloría sobre rendición de cuentas',
      '¿Qué límites fija la Ley N° 18.575 sobre fusión de ministerios y SEREMIs?',
      'Verifica el Boletín N° 14.801-07 sobre fondos previsionales'
    ]
  }
];

export const ChatPanel: React.FC<ChatPanelProps> = ({
  messages,
  isLoading,
  activeTopic,
  onSendMessage,
  onClearChat,
  onOpenSourcesModal,
  onOpenScrapingModal,
  fullPageMode = true,
}) => {
  const [input, setInput] = useState('');
  const [selectedArea, setSelectedArea] = useState('all');
  const [recentQueries, setRecentQueries] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed.slice(0, MAX_HISTORY);
      }
    } catch {
      // Ignore storage errors
    }
    return [];
  });

  const endOfMessagesRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages, isLoading]);

  const recordQuery = (q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setRecentQueries((prev) => {
      const next = [trimmed, ...prev.filter((item) => item.toLowerCase() !== trimmed.toLowerCase())].slice(
        0,
        MAX_HISTORY
      );
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        // Ignore storage errors
      }
      return next;
    });
  };

  const dispatchMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;
    recordQuery(trimmed);
    onSendMessage(trimmed);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    playPaperRustle();
    dispatchMessage(input.trim());
    setInput('');
  };

  const handleStarterClick = (q: string) => {
    if (isLoading) return;
    playPinClick();
    dispatchMessage(q);
  };

  const activeAreaObj = THEMATIC_AREAS.find((a) => a.id === selectedArea) || THEMATIC_AREAS[0];

  const getClassificationMeta = (classification?: EvidenceClassification) => {
    switch (classification) {
      case 'CONFIRMADA':
        return {
          label: 'CONFIRMADA',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#059669] dark:text-emerald-400 shrink-0" />,
          classes: 'text-[#047857] dark:text-emerald-300 border-[#6ee7b7] dark:border-emerald-700/60 bg-[#ecfdf5] dark:bg-emerald-950/60 shadow-xs',
        };
      case 'PARCIALMENTE CONFIRMADA':
        return {
          label: 'PARCIALMENTE CONFIRMADA',
          icon: <Clock className="w-3.5 h-3.5 text-[#d97706] dark:text-amber-400 shrink-0" />,
          classes: 'text-[#b45309] dark:text-amber-300 border-[#fcd34d] dark:border-amber-700/60 bg-[#fffbeb] dark:bg-amber-950/60 shadow-xs',
        };
      case 'CONTRADICHA':
        return {
          label: 'CONTRADICHA',
          icon: <XCircle className="w-3.5 h-3.5 text-[#dc2626] dark:text-rose-400 shrink-0" />,
          classes: 'text-[#b91c1c] dark:text-rose-300 border-[#fca5a5] dark:border-rose-700/60 bg-[#fef2f2] dark:bg-rose-950/60 shadow-xs',
        };
      case 'DESACTUALIZADA':
        return {
          label: 'DESACTUALIZADA',
          icon: <Clock className="w-3.5 h-3.5 text-[#64748b] dark:text-slate-400 shrink-0" />,
          classes: 'text-[#475569] dark:text-slate-300 border-[#cbd5e1] dark:border-slate-600/60 bg-[#f1f5f9] dark:bg-slate-800/70 shadow-xs',
        };
      case 'NO VERIFICADA':
      default:
        return {
          label: 'NO VERIFICADA',
          icon: <HelpCircle className="w-3.5 h-3.5 text-[#ea580c] dark:text-orange-400 shrink-0" />,
          classes: 'text-[#c2410c] dark:text-orange-300 border-[#fdba74] dark:border-orange-700/60 bg-[#fff7ed] dark:bg-orange-950/60 shadow-xs',
        };
    }
  };

  const getHierarchyStyle = (level: 1 | 2 | 3) => {
    if (level === 1) {
      return 'text-[#047857] dark:text-emerald-300 bg-[#ecfdf5] dark:bg-emerald-950/60 border-[#6ee7b7] dark:border-emerald-700/60';
    }
    if (level === 2) {
      return 'text-[#0369a1] dark:text-sky-300 bg-[#ebf8ff] dark:bg-sky-950/60 border-[#7dd3fc] dark:border-sky-700/60';
    }
    return 'text-[#b45309] dark:text-amber-300 bg-[#fffbeb] dark:bg-amber-950/60 border-[#fcd34d] dark:border-amber-700/60';
  };

  const getVerificationOriginMeta = (origin?: ChatMessage['verificationOrigin']) => {
    switch (origin) {
      case 'LIVE_OFFICIAL_VERIFICATION':
        return {
          label: 'Verificación XML en vivo',
          classes: 'text-[#047857] dark:text-emerald-300 border-[#6ee7b7] dark:border-emerald-700/60 bg-[#ecfdf5] dark:bg-emerald-950/50',
        };
      case 'MODEL_LIVE_GROUNDED':
        return {
          label: 'Modelo + Grounding',
          classes: 'text-[#0369a1] dark:text-sky-300 border-[#7dd3fc] dark:border-sky-700/60 bg-[#ebf8ff] dark:bg-sky-950/50',
        };
      case 'DOCUMENT_RETRIEVAL_FALLBACK':
        return {
          label: 'Recuperación Documental (Sin modelo IA)',
          classes: 'text-[#b45309] dark:text-amber-300 border-[#fcd34d] dark:border-amber-700/60 bg-[#fffbeb] dark:bg-amber-950/50',
        };
      case 'VERIFICATION_FAILED':
        return {
          label: 'Verificación fallida / Incompleta',
          classes: 'text-[#b91c1c] dark:text-rose-300 border-[#fca5a5] dark:border-rose-700/60 bg-[#fef2f2] dark:bg-rose-950/50',
        };
      default:
        return null;
    }
  };

  // Render inline **bold** text and interactive [Fuente N] links
  const renderFormattedContent = (content: string, messageId: string, citations?: ChatCitation[]) => {
    const tokens = content.split(/(\[(?:Fuente|Doc|Ref|Web)\s+\d+\]|\*\*[^*]+\*\*)/gi);
    return tokens.map((part, index) => {
      const refMatch = part.match(/^\[((?:Fuente|Doc|Ref|Web)\s+\d+)\]$/i);
      if (refMatch) {
        const refLabel = refMatch[1];
        const refNumMatch = refLabel.match(/\d+/);
        const refIdx = refNumMatch ? parseInt(refNumMatch[0], 10) - 1 : -1;
        const matchedCit =
          citations?.find((c) => c.refNumber.toLowerCase() === refLabel.toLowerCase()) ||
          (refIdx >= 0 && citations && citations[refIdx] ? citations[refIdx] : undefined);

        if (matchedCit && matchedCit.url && matchedCit.url.startsWith('http')) {
          return (
            <a
              key={index}
              href={matchedCit.url}
              target="_blank"
              rel="noopener noreferrer"
              title={`${matchedCit.name} (${matchedCit.sourceHierarchyLabel})`}
              className="inline-flex items-center gap-0.5 mx-0.5 px-2 py-0.5 rounded-full bg-[#e6f6fe] dark:bg-sky-950/70 hover:bg-[#cbeeff] dark:hover:bg-sky-900/80 border border-[#7dd3fc] dark:border-sky-700/70 text-[#0369a1] dark:text-sky-300 hover:text-[#075985] dark:hover:text-sky-200 text-[11px] font-mono font-semibold transition-all shadow-[0_1px_2px_rgba(0,168,232,0.12)] align-baseline"
            >
              <span>{part}</span>
            </a>
          );
        }

        return (
          <button
            key={index}
            type="button"
            onClick={() => {
              const targetEl = document.getElementById(`${messageId}-citations`);
              targetEl?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            }}
            className="inline-flex items-center mx-0.5 px-2 py-0.5 rounded-full bg-[#f1f5f9] dark:bg-slate-800 border border-[#cbd5e1] dark:border-slate-600 text-[#0369a1] dark:text-sky-300 hover:border-[#32b8f2] text-[11px] font-mono font-semibold cursor-pointer align-baseline"
          >
            {part}
          </button>
        );
      }

      const boldMatch = part.match(/^\*\*([^*]+)\*\*$/);
      if (boldMatch) {
        return (
          <strong key={index} className="font-bold text-[#2f3640] dark:text-slate-100">
            {boldMatch[1]}
          </strong>
        );
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  return (
    <div
      className={`flex flex-col wii-surface rounded-[28px] overflow-hidden ${
        fullPageMode ? 'min-h-[calc(100vh-11.5rem)] max-h-[calc(100vh-8.5rem)]' : 'min-h-[420px] max-h-[600px]'
      }`}
    >
      {/* Top Chat Session Toolbar */}
      <div className="px-4 sm:px-5 py-3 bg-gradient-to-b from-white via-[#f7fafe] to-[#edf2f8] dark:from-[#1f2734] dark:via-[#1a212d] dark:to-[#151b25] border-b border-[#cfd7e2] dark:border-[#2d3848] flex flex-wrap items-center justify-between gap-2 shrink-0">
        <div className="flex items-center gap-2.5 text-xs min-w-0">
          <div className="w-7 h-7 rounded-full bg-[#e6f6fe] dark:bg-sky-950/60 border border-[#7dd3fc] dark:border-sky-700/60 flex items-center justify-center shrink-0 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-none">
            <MessageSquare className="w-3.5 h-3.5 text-[#0095d9] dark:text-[#38bdf8]" />
          </div>
          <span className="font-bold text-[#363d47] dark:text-slate-100 truncate">
            {activeTopic ? activeTopic : 'EL AUDITOR · Chat con Fuentes Verificables'}
          </span>
          <span className="text-[#9aa5b4] dark:text-slate-500 hidden sm:inline" aria-hidden="true">·</span>
          <span className="text-[11px] text-[#667180] dark:text-slate-400 hidden sm:inline truncate">
            Balance 100 días (11 mar – 19 jun 2026)
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0 flex-wrap">
          {onOpenScrapingModal && (
            <button
              type="button"
              onClick={() => {
                playPinClick();
                onOpenScrapingModal();
              }}
              className="px-3 py-1.5 rounded-full wii-pill-btn text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
              title="Monitor de las 9 fuentes oficiales y medios"
            >
              <Radio className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
              <span className="hidden sm:inline">9 Fuentes</span>
            </button>
          )}

          {onOpenSourcesModal && (
            <button
              type="button"
              onClick={() => {
                playPinClick();
                onOpenSourcesModal();
              }}
              className="px-3 py-1.5 rounded-full wii-pill-btn text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
              <span className="hidden sm:inline">Índice</span>
            </button>
          )}

          {messages.length > 0 && (
            <button
              id="btn-new-chat"
              type="button"
              onClick={() => {
                playPinClick();
                onClearChat();
                inputRef.current?.focus();
              }}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-full wii-cyan-btn text-[11px] font-bold flex items-center gap-1.5 cursor-pointer whitespace-nowrap disabled:opacity-50"
              title="Iniciar una nueva conversación"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Nueva conversación</span>
            </button>
          )}
        </div>
      </div>

      {/* Scrollable Conversation Area */}
      <div className="flex-1 overflow-y-auto px-3 sm:px-6 py-5 space-y-5 bg-gradient-to-b from-[#f9fbfd] to-[#f1f5f9] dark:from-[#121720] dark:to-[#0d1118]">
        {messages.length === 0 ? (
          <div className="max-w-3xl mx-auto py-4 sm:py-8 space-y-6 animate-fade-in-up">
            {/* Conversational Welcome Headline */}
            <div className="text-center space-y-2.5">
              <h1 className="text-2xl sm:text-4xl font-extrabold text-[#363d47] dark:text-slate-100 tracking-tight text-balance">
                ¿Qué quieres comprobar?
              </h1>
              <p className="text-xs sm:text-sm text-[#5c6674] dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
                Conversa directamente con <strong className="text-[#2f3640] dark:text-white">EL AUDITOR</strong>. Cada respuesta cita sus fuentes (Nivel 1, 2 y 3), distingue hechos de declaraciones y señala cualquier brecha documental.
              </p>
            </div>

            {/* Thematic Area Filter Capsules */}
            <div className="flex items-center justify-center gap-2 flex-wrap">
              {THEMATIC_AREAS.map((area) => {
                const isActive = selectedArea === area.id;
                return (
                  <button
                    key={area.id}
                    type="button"
                    onClick={() => {
                      playPinClick();
                      setSelectedArea(area.id);
                    }}
                    className={`min-h-[36px] px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer whitespace-nowrap ${
                      isActive ? 'wii-cyan-btn' : 'wii-pill-btn'
                    }`}
                  >
                    {area.label}
                  </button>
                );
              })}
            </div>

            {/* 4 Glossy Wii Starter Prompt Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {activeAreaObj.prompts.map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleStarterClick(prompt)}
                  className="p-4 rounded-2xl wii-card text-left text-xs sm:text-[13px] text-[#3d4652] dark:text-slate-200 hover:text-[#0b5d87] dark:hover:text-[#7dd3fc] cursor-pointer flex items-start gap-2.5 group"
                >
                  <span className="text-[#009ee3] dark:text-[#38bdf8] font-extrabold shrink-0 mt-0.5">↳</span>
                  <span className="leading-relaxed font-medium">{prompt}</span>
                </button>
              ))}
            </div>

            {/* Quick Guide Trigger Capsule */}
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => handleStarterClick('¿Qué puedo preguntar y cómo verificas las fuentes?')}
                className="px-4 py-2 rounded-full wii-pill-btn text-xs font-semibold text-[#0369a1] dark:text-sky-300 cursor-pointer flex items-center gap-2"
              >
                <HelpCircle className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />
                <span>¿No sabes por dónde empezar? Pregunta: ¿Qué puedo preguntar?</span>
              </button>
            </div>

            {/* Recent Queries if any */}
            {recentQueries.length > 0 && (
              <div className="pt-3 border-t border-[#d8dfe8] dark:border-[#2a3444] flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-1.5 text-[11px] text-[#667180] dark:text-slate-400 font-medium">
                  <History className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />
                  <span>Consultas recientes:</span>
                </div>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {recentQueries.slice(0, 3).map((rq, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleStarterClick(rq)}
                      className="px-3 py-1 rounded-full wii-pill-btn text-[11px] truncate max-w-[240px] cursor-pointer"
                      title={rq}
                    >
                      {rq}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-5">
            {messages.map((msg) => {
              if (msg.role === 'user') {
                return (
                  <div key={msg.id} className="flex justify-end animate-fade-in-up">
                    <div className="max-w-[85%] sm:max-w-[75%] bg-gradient-to-b from-[#e8f7ff] to-[#d6f0ff] dark:from-[#0c3b5e] dark:to-[#082c48] border border-[#7dd3fc] dark:border-sky-600/60 rounded-3xl rounded-tr-md px-4 sm:px-5 py-3 text-xs sm:text-sm text-[#1a3c5e] dark:text-sky-100 shadow-[0_4px_14px_rgba(0,168,232,0.14),inset_0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[0_4px_14px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(125,211,252,0.18)] space-y-1">
                      <div className="flex items-center justify-between gap-4 text-[10px] text-[#0284c7] dark:text-sky-300 font-mono font-bold tabular-nums">
                        <span>TÚ</span>
                        <span>{msg.timestamp}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap font-medium">{msg.content}</p>
                    </div>
                  </div>
                );
              }

              const classMeta = getClassificationMeta(msg.evidenceClassification);

              return (
                <div key={msg.id} className="flex justify-start animate-fade-in-up">
                  <div className="w-full bg-gradient-to-b from-white to-[#f6f8fb] dark:from-[#1c2330] dark:to-[#161c26] border border-[#cfd7e2] dark:border-[#2f3b4d] rounded-3xl rounded-tl-md p-4 sm:p-5 space-y-3.5 shadow-[0_6px_18px_rgba(66,82,102,0.08),inset_0_1px_0_rgba(255,255,255,0.95)] dark:shadow-[0_8px_24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,0.06)]">
                    {/* Assistant Metadata Header */}
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2.5 border-b border-[#e3e8ef] dark:border-[#2b3646]">
                      <div className="flex items-center gap-2 text-xs">
                        <span className="font-extrabold text-[#363d47] dark:text-slate-100 tracking-wide">EL AUDITOR</span>
                        <span className="text-[#9aa5b4] dark:text-slate-500" aria-hidden="true">·</span>
                        <span className="text-[11px] font-mono tabular-nums text-[#667180] dark:text-slate-400">
                          {msg.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 flex-wrap">
                        {msg.verificationOrigin && (() => {
                          const originMeta = getVerificationOriginMeta(msg.verificationOrigin);
                          if (!originMeta) return null;
                          return (
                            <span
                              className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-semibold ${originMeta.classes}`}
                            >
                              {originMeta.label}
                            </span>
                          );
                        })()}

                        {msg.isGuidance ? (
                          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[11px] font-bold text-[#0369a1] dark:text-sky-300 border-[#7dd3fc] dark:border-sky-700/60 bg-[#ebf8ff] dark:bg-sky-950/60 shadow-xs">
                            <BookOpen className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />
                            <span>GUÍA DE USO</span>
                          </div>
                        ) : msg.evidenceClassification ? (
                          <div
                            className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[11px] font-bold ${classMeta.classes}`}
                          >
                            {classMeta.icon}
                            <span>{classMeta.label}</span>
                          </div>
                        ) : null}
                      </div>
                    </div>

                    {/* Transparent API status notice if repository index was used directly */}
                    {msg.apiStatusNotice && (
                      <div className="px-3.5 py-2 rounded-2xl bg-[#f1f6fb] dark:bg-[#172231] border border-[#cde3f5] dark:border-sky-800/60 text-[11px] text-[#4b5868] dark:text-slate-300 flex items-start gap-2">
                        <Info className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8] shrink-0 mt-0.5" />
                        <span>{msg.apiStatusNotice}</span>
                      </div>
                    )}

                    {/* Error state if request completely failed */}
                    {msg.errorMessage ? (
                      <div className="p-3.5 rounded-2xl bg-[#fef2f2] dark:bg-rose-950/50 border border-[#fca5a5] dark:border-rose-700/60 text-xs text-[#b91c1c] dark:text-rose-200 flex items-start gap-2">
                        <AlertTriangle className="w-4 h-4 text-[#dc2626] dark:text-rose-400 shrink-0 mt-0.5" />
                        <p>{msg.errorMessage}</p>
                      </div>
                    ) : (
                      <>
                        {/* Conversational Answer Body */}
                        <div className="text-xs sm:text-[14px] text-[#3d4652] dark:text-slate-200 leading-relaxed whitespace-pre-line space-y-2">
                          {renderFormattedContent(msg.content, msg.id, msg.citations)}
                        </div>

                        {/* Unverified Gaps Transparency Notice */}
                        {msg.unverifiedGaps && msg.unverifiedGaps.trim() && (
                          <div className="p-3.5 rounded-2xl bg-[#fffbeb] dark:bg-amber-950/40 border border-[#fde68a] dark:border-amber-700/50 space-y-1 text-xs shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-none">
                            <div className="flex items-center gap-1.5 font-bold text-[#b45309] dark:text-amber-300">
                              <AlertTriangle className="w-3.5 h-3.5 text-[#d97706] dark:text-amber-400 shrink-0" />
                              <span>Transparencia documental</span>
                            </div>
                            <p className="text-[#5c5138] dark:text-amber-200/90 leading-relaxed">{msg.unverifiedGaps}</p>
                            {msg.requiredDocumentsForGap && msg.requiredDocumentsForGap.trim() && (
                              <p className="text-[11px] text-[#6d624a] dark:text-amber-300/80 leading-relaxed">
                                <strong className="text-[#453a22] dark:text-amber-200">Documento requerido:</strong>{' '}
                                {msg.requiredDocumentsForGap}
                              </p>
                            )}
                          </div>
                        )}

                        {/* Verified Sources Grid */}
                        {msg.citations && msg.citations.length > 0 && (
                          <div id={`${msg.id}-citations`} className="pt-3 border-t border-[#e3e8ef] dark:border-[#2b3646] space-y-2.5">
                            <div className="flex items-center justify-between text-[11px] text-[#667180] dark:text-slate-400">
                              <span className="font-bold text-[#363d47] dark:text-slate-200">
                                Fuentes citadas ({msg.citations.length})
                              </span>
                              <span>Prioridad Nivel 1 · 2 · 3</span>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {msg.citations.map((cit) => {
                                const hasHttpUrl = cit.url && cit.url.startsWith('http');
                                const isSearchUrl = hasHttpUrl && /\/buscador|listaresultadosavanzada|\?(?:s|q|search)=/i.test(cit.url);
                                let shortTarget = '';
                                if (hasHttpUrl) {
                                  try {
                                    const parsed = new URL(cit.url);
                                    const pathAndQuery = (parsed.pathname !== '/' ? parsed.pathname : '') + parsed.search;
                                    shortTarget = `${parsed.hostname.replace(/^www\./, '')}${pathAndQuery.slice(0, 32)}${pathAndQuery.length > 32 ? '…' : ''}`;
                                  } catch {
                                    shortTarget = '';
                                  }
                                }
                                return (
                                  <div
                                    key={cit.id}
                                    className="p-3 rounded-2xl wii-card flex flex-col justify-between gap-2"
                                  >
                                    <div className="space-y-1">
                                      <div className="flex items-center justify-between gap-1.5 flex-wrap">
                                        <span className="text-[11px] font-mono font-bold text-[#0086c7] dark:text-[#38bdf8]">
                                          [{cit.refNumber}]
                                        </span>
                                        <span
                                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${getHierarchyStyle(
                                            cit.sourceHierarchyLevel
                                          )}`}
                                        >
                                          {cit.sourceHierarchyLabel}
                                        </span>
                                      </div>

                                      <p className="text-xs font-bold text-[#363d47] dark:text-slate-100 leading-snug line-clamp-2">
                                        {cit.name}
                                      </p>

                                      {(cit.officialRef || cit.publishedDate) && (
                                        <p className="text-[11px] text-[#667180] dark:text-slate-400 font-mono tabular-nums">
                                          {[cit.officialRef, cit.publishedDate].filter(Boolean).join(' · ')}
                                        </p>
                                      )}

                                      {(cit.excerptType || cit.isLiveVerified || cit.isGeneralPortal) && (
                                        <div className="flex flex-wrap items-center gap-1 pt-0.5">
                                          {cit.excerptType && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#eef3f8] dark:bg-slate-800/80 border border-[#cfd7e2] dark:border-slate-600/70 text-[#475569] dark:text-slate-300">
                                              {cit.excerptType}
                                            </span>
                                          )}
                                          {cit.isLiveVerified && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#ecfdf5] dark:bg-emerald-950/60 border border-[#6ee7b7] dark:border-emerald-700/60 text-[#047857] dark:text-emerald-300">
                                              XML Oficial en vivo
                                            </span>
                                          )}
                                          {cit.isGeneralPortal && (
                                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#fffbeb] dark:bg-amber-950/60 border border-[#fcd34d] dark:border-amber-700/60 text-[#b45309] dark:text-amber-300">
                                              Portal general · requiere consulta directa
                                            </span>
                                          )}
                                        </div>
                                      )}

                                      {cit.excerptLocation && (
                                        <p className="text-[10px] font-mono text-[#667180] dark:text-slate-400">
                                          Ubicación: {cit.excerptLocation}
                                        </p>
                                      )}

                                      <p className="text-[11px] text-[#4b5461] dark:text-slate-300 leading-relaxed line-clamp-3">
                                        {cit.detail}
                                      </p>
                                    </div>

                                    {hasHttpUrl && (
                                      <a
                                        href={cit.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={cit.url}
                                        className="inline-flex items-center justify-between gap-2 text-[11px] font-semibold text-[#0095d9] dark:text-[#38bdf8] hover:text-[#0073aa] dark:hover:text-[#7dd3fc] transition-colors pt-1 border-t border-[#e7edf4] dark:border-[#2a3444]"
                                      >
                                        <span className="inline-flex items-center gap-1 shrink-0">
                                          <span>
                                            {cit.isGeneralPortal
                                              ? 'Abrir portal institucional'
                                              : isSearchUrl
                                              ? 'Buscar documento'
                                              : 'Abrir documento'}
                                          </span>
                                          <ExternalLink className="w-3 h-3 shrink-0" />
                                        </span>
                                        {shortTarget && (
                                          <span className="text-[10px] font-mono text-[#7a8696] dark:text-slate-400 truncate">
                                            {shortTarget}
                                          </span>
                                        )}
                                      </a>
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}

                        {/* Matched Press Videos (if strictly relevant) */}
                        {msg.newsVideos && msg.newsVideos.length > 0 && (
                          <div className="pt-3 border-t border-[#e3e8ef] dark:border-[#2b3646] space-y-2">
                            <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#434c59] dark:text-slate-200">
                              <Tv className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
                              <span>Registros periodísticos audiovisuales (Nivel 2)</span>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                              {msg.newsVideos.slice(0, 2).map((vid) => (
                                <a
                                  key={vid.id}
                                  href={vid.youtubeUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-3 rounded-2xl wii-card flex flex-col gap-1"
                                >
                                  <div className="flex items-center justify-between gap-2 text-[10px] text-[#667180] dark:text-slate-400 font-mono">
                                    <span className="font-semibold text-[#0369a1] dark:text-sky-300">{vid.channel}</span>
                                    <span>{vid.publishedDate} · {vid.duration}</span>
                                  </div>
                                  <p className="text-xs font-semibold text-[#363d47] dark:text-slate-100 line-clamp-2 leading-snug">
                                    {vid.title}
                                  </p>
                                </a>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Follow-up Prompt Capsules */}
                        {msg.suggestedFollowUps && msg.suggestedFollowUps.length > 0 && (
                          <div className="pt-3 border-t border-[#e3e8ef] dark:border-[#2b3646] flex flex-wrap items-center gap-2">
                            <span className="text-[11px] text-[#667180] dark:text-slate-400 font-medium mr-1">Seguir consultando:</span>
                            {msg.suggestedFollowUps.map((sug, sIdx) => (
                              <button
                                key={sIdx}
                                type="button"
                                onClick={() => handleStarterClick(sug)}
                                disabled={isLoading}
                                className="px-3.5 py-1.5 rounded-full wii-pill-btn text-[11px] font-medium cursor-pointer text-left disabled:opacity-50"
                              >
                                {sug}
                              </button>
                            ))}
                          </div>
                        )}
                      </>
                    )}
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex justify-start animate-fade-in-up">
                <div className="bg-white dark:bg-[#1e2633] border border-[#94d8f8] dark:border-sky-700/60 rounded-3xl rounded-tl-md px-4 py-3 flex items-center gap-2.5 text-xs text-[#3d4652] dark:text-slate-200 shadow-[0_4px_14px_rgba(50,184,242,0.16)] dark:shadow-[0_6px_18px_rgba(0,0,0,0.4)]">
                  <Loader2 className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8] animate-spin shrink-0" />
                  <span className="font-medium">Verificando documentos en Senado/BCN XML, Diario Oficial, DIPRES y fuentes oficiales...</span>
                </div>
              </div>
            )}
            <div ref={endOfMessagesRef} />
          </div>
        )}
      </div>

      {/* Persistent Wii Glossy Chat Composer */}
      <div className="p-3 sm:p-4 bg-gradient-to-b from-[#f6f9fc] to-[#e9eff6] dark:from-[#18202c] dark:to-[#121822] border-t border-[#cfd7e2] dark:border-[#2d3848] shrink-0">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto flex items-center gap-2.5">
          <input
            ref={inputRef}
            id="chatbot-message-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta por decretos, cifras DIPRES, SEREMIs, o escribe «¿Qué puedo preguntar?»..."
            disabled={isLoading}
            className="flex-1 bg-white dark:bg-[#0f141d] border-[1.5px] border-[#c7d0dc] dark:border-[#344256] focus:border-[#32b8f2] dark:focus:border-[#38bdf8] focus:ring-3 focus:ring-[#32b8f2]/25 rounded-full px-5 py-3 text-xs sm:text-sm text-[#363d47] dark:text-slate-100 placeholder-[#828d9c] dark:placeholder-slate-400 focus:outline-hidden font-sans shadow-[inset_0_2px_4px_rgba(66,82,102,0.06),0_1px_0_rgba(255,255,255,0.9)] dark:shadow-[inset_0_2px_6px_rgba(0,0,0,0.45)] transition-all"
          />
          <button
            id="chatbot-send-btn"
            type="submit"
            disabled={isLoading || !input.trim()}
            className="min-h-[46px] px-5 sm:px-6 py-2.5 rounded-full wii-cyan-btn disabled:opacity-45 disabled:shadow-none text-xs sm:text-sm font-bold flex items-center gap-2 shrink-0 cursor-pointer active:scale-95 whitespace-nowrap"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">Enviar</span>
          </button>
        </form>
      </div>
    </div>
  );
};
