import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, History, Trash2, X, RotateCcw, ArrowRight } from 'lucide-react';
import { playPaperRustle, playPaperSlide, playPinClick } from '../utils/audio';

interface HeroSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  currentQuery: string;
}

const STORAGE_KEY = 'coherencia_audit_history';
const MAX_HISTORY = 5;

const DEFAULT_HISTORY = [
  "¿Es viable el plan de control fronterizo 2026?",
  "Cotejar reforma tributaria con programas 2017 y 2021",
  "Auditar reestructuración de ministerios y funcionarios"
];

const QUICK_SUGGESTIONS = [
  { label: "Plan fronteras y FF.AA.", query: "¿Es viable el plan de control fronterizo 2026?" },
  { label: "Reforma tributaria vs 2021", query: "Cotejar reforma tributaria con programas 2017 y 2021" },
  { label: "Fusión de ministerios", query: "Auditar reestructuración de ministerios y funcionarios" }
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading,
  currentQuery
}) => {
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed.slice(0, MAX_HISTORY);
        }
      }
    } catch (err) {
      console.warn('Error reading audit history from localStorage:', err);
    }
    return DEFAULT_HISTORY;
  });

  const hasMounted = useRef(false);

  const saveQueryToHistory = (query: string) => {
    const trimmed = query.trim();
    if (!trimmed) return;
    setHistory((prev) => {
      const filtered = prev.filter((q) => q.toLowerCase() !== trimmed.toLowerCase());
      const updated = [trimmed, ...filtered].slice(0, MAX_HISTORY);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Error saving audit history to localStorage:', err);
      }
      return updated;
    });
  };

  useEffect(() => {
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }
    if (currentQuery && currentQuery.trim()) {
      saveQueryToHistory(currentQuery.trim());
    }
  }, [currentQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      playPaperRustle();
      const query = inputValue.trim();
      saveQueryToHistory(query);
      onSearch(query);
    }
  };

  const handleSuggestionClick = (text: string) => {
    playPaperSlide();
    setInputValue(text);
    saveQueryToHistory(text);
    onSearch(text);
  };

  const handleHistoryItemClick = (query: string) => {
    playPaperSlide();
    setInputValue(query);
    saveQueryToHistory(query);
    onSearch(query);
  };

  const handleClearHistory = (e: React.MouseEvent) => {
    e.preventDefault();
    playPinClick();
    setHistory([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (err) {
      console.warn('Error clearing audit history from localStorage:', err);
    }
  };

  const handleRemoveQuery = (e: React.MouseEvent, queryToRemove: string) => {
    e.stopPropagation();
    setHistory((prev) => {
      const updated = prev.filter((q) => q !== queryToRemove);
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (err) {
        console.warn('Error saving updated audit history:', err);
      }
      return updated;
    });
  };

  return (
    <section className="w-full pt-6 sm:pt-10 pb-6 sm:pb-8 text-center px-2 sm:px-6 relative z-10 animate-fade-in-up">
      <div className="max-w-3xl mx-auto">
        
        {/* Main Heading with Red, White & Black Typography */}
        <div className="space-y-2 mb-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/90 border border-red-900/80 text-[11px] sm:text-xs text-neutral-200 shadow-sm font-mono animate-fade-in-scale">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-red-400 font-semibold">11 Mar – 19 Jun 2026</span>
            <span className="text-neutral-400">· 100 Días de Gobierno</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight sm:tracking-tighter leading-tight sm:leading-[1.15] font-sans">
            Auditoría gubernamental <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-200">automatizada</span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="text-xs sm:text-base text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed mb-4 sm:mb-5 px-2">
          Unidad de verificación <strong className="text-red-400 font-semibold font-mono">EL AUDITOR</strong>: Fiscalización documental y prospectiva basada en Diario Oficial, DIPRES y programas 2017-2026.
        </p>

        {/* Local Query History Bar - Mobile optimized */}
        <div className="mb-3 sm:mb-4 max-w-2xl mx-auto text-left">
          {history.length > 0 ? (
            <div className="bg-black/90 border border-red-950/90 rounded-2xl p-2.5 backdrop-blur-md shadow-xl transition-all">
              <div className="flex items-center justify-between mb-2 px-1">
                <div className="flex items-center gap-1.5 text-xs font-semibold text-neutral-200 font-mono">
                  <History className="w-3.5 h-3.5 text-red-400" />
                  <span>Historial de consultas</span>
                  <span className="text-[10px] text-red-400 font-mono bg-neutral-950 px-1.5 py-0.5 rounded-full border border-red-900/80">
                    {history.length}/{MAX_HISTORY}
                  </span>
                </div>
                <button
                  id="btn-clear-query-history"
                  type="button"
                  onClick={handleClearHistory}
                  className="flex items-center gap-1 text-[11px] font-medium text-neutral-400 hover:text-red-400 transition-colors py-1 px-2 rounded-lg hover:bg-neutral-900 cursor-pointer"
                  title="Borrar todas las consultas del historial local"
                >
                  <Trash2 className="w-3 h-3" />
                  <span>Limpiar</span>
                </button>
              </div>

              {/* Horizontal scrollable chips with touch optimization */}
              <div 
                id="query-history-chips-container"
                className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar scroll-smooth"
              >
                {history.map((queryText, idx) => (
                  <div
                    key={`${queryText}-${idx}`}
                    role="button"
                    tabIndex={0}
                    onClick={() => handleHistoryItemClick(queryText)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleHistoryItemClick(queryText);
                      }
                    }}
                    className="group shrink-0 inline-flex items-center gap-1.5 px-3 py-2 min-h-[38px] rounded-xl bg-neutral-950 hover:bg-neutral-900 border border-red-950 hover:border-red-500/70 text-neutral-200 hover:text-red-300 text-xs transition-all shadow-xs cursor-pointer active:scale-95 select-none"
                    title={`Re-ejecutar auditoría: "${queryText}"`}
                  >
                    <RotateCcw className="w-3 h-3 text-red-400 shrink-0 group-hover:rotate-[-45deg] transition-transform" />
                    <span className="max-w-[170px] sm:max-w-[250px] md:max-w-[290px] truncate font-medium text-left">
                      {queryText}
                    </span>
                    <button
                      type="button"
                      onClick={(e) => handleRemoveQuery(e, queryText)}
                      className="ml-1 p-1 rounded-full text-neutral-500 hover:text-red-400 hover:bg-neutral-800 transition-colors shrink-0"
                      title="Eliminar del historial"
                      aria-label={`Eliminar consulta ${queryText}`}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>

        {/* Search Bar Form */}
        <form 
          id="audit-search-form"
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto"
        >
          <div className="flex items-center bg-black/92 hover:bg-neutral-950 border border-red-900/80 hover:border-red-600 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/30 rounded-2xl shadow-2xl backdrop-blur-md transition-all p-1.5 sm:p-2 pl-3 sm:pl-4">
            
            <Search className="w-5 h-5 text-red-400 shrink-0 mr-2" />

            <input
              id="ai-query-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Pregunta a EL AUDITOR (ej: ¿Es viable el plan fronterizo?)..."
              disabled={isLoading}
              className="w-full bg-transparent text-base sm:text-base text-white placeholder-neutral-500 focus:outline-hidden py-2 pr-2 font-sans leading-normal"
            />

            {/* Submit Button */}
            <button
              id="btn-submit-audit"
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`min-h-[44px] px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold tracking-wide transition-all flex items-center justify-center gap-1.5 font-mono ${
                isLoading
                  ? 'bg-neutral-900 text-neutral-500 cursor-not-allowed'
                  : inputValue.trim()
                  ? 'bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-600/30 active:scale-95 cursor-pointer font-extrabold'
                  : 'bg-neutral-950 text-neutral-500 hover:bg-neutral-900 hover:text-neutral-300'
              }`}
              aria-label="Enviar auditoría"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="hidden sm:inline">AUDITANDO</span>
                </>
              ) : (
                <>
                  <span>ENV</span>
                  <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* Quick Suggestions Chips */}
        <div className="mt-3.5 sm:mt-4 space-y-2.5">
          <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap">
            <span className="text-neutral-400 text-[11px] font-mono mr-1">Sugerencias:</span>
            {QUICK_SUGGESTIONS.map((sug, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSuggestionClick(sug.query)}
                className="min-h-[34px] px-3 py-1.5 rounded-lg bg-neutral-950 hover:bg-neutral-900 text-neutral-300 hover:text-red-400 border border-red-950 hover:border-red-600 text-[11px] sm:text-xs transition-all active:scale-95 cursor-pointer font-sans"
              >
                {sug.label}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-center gap-2 text-[10px] sm:text-[11px] text-neutral-400 font-mono">
            <span className="inline-flex items-center gap-1 text-red-400 bg-red-950/70 border border-red-800/70 px-2 py-0.5 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
              Google Search Grounding
            </span>
            <span className="text-neutral-400 hidden sm:inline">Respaldo activo con Google Search en caso de requerir fuentes complementarias</span>
          </div>
        </div>

      </div>
    </section>
  );
};
