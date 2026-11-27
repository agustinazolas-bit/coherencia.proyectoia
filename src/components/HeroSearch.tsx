import React, { useState, useEffect, useRef } from 'react';
import { Search, Loader2, History, X, Sparkles, Filter, ArrowRight } from 'lucide-react';
import { playPaperRustle, playPaperSlide, playPinClick } from '../utils/audio';

interface HeroSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
  currentQuery: string;
  selectedCategory?: string;
  onSelectCategory?: (category: string) => void;
}

const STORAGE_KEY = 'coherencia_audit_history';
const MAX_HISTORY = 5;

const DEFAULT_HISTORY = [
  "¿Qué promesas del Gobierno se han cumplido?",
  "¿Cuánto dinero se ha destinado a esta política pública?",
  "¿Es viable el plan de control fronterizo 2026?"
];

// Exact 4 examples requested by user specification
const EXAMPLE_QUESTIONS = [
  "¿Qué promesas del Gobierno se han cumplido?",
  "¿Cuánto dinero se ha destinado a esta política pública?",
  "¿Qué evidencia existe sobre esta medida?",
  "¿Cómo ha cambiado este indicador durante el último año?"
];

// Thematic filters requested by user specification: economía, seguridad, educación, salud y gasto público
const THEMATIC_FILTERS = [
  { id: 'all', label: 'Todas las áreas', sample: '' },
  { id: 'economia', label: 'Economía', sample: 'Auditoría a la reforma tributaria y gasto fiscal 2026' },
  { id: 'seguridad', label: 'Seguridad', sample: 'Despliegue de FF.AA. y control de pasos fronterizos' },
  { id: 'educacion', label: 'Educación', sample: 'Estado de la deuda histórica docente y voucher escolar' },
  { id: 'salud', label: 'Salud', sample: 'Reducción de listas de espera GES y presupuesto hospitalario' },
  { id: 'gasto', label: 'Gasto público', sample: 'Auditoría a transferencias fiscales y programas ministeriales' }
];

export const HeroSearch: React.FC<HeroSearchProps> = ({
  onSearch,
  isLoading,
  currentQuery,
  selectedCategory = 'all',
  onSelectCategory
}) => {
  const [inputValue, setInputValue] = useState('');
  const [activeFilter, setActiveFilter] = useState(selectedCategory);
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

  const handleExampleClick = (question: string) => {
    playPaperSlide();
    setInputValue(question);
    saveQueryToHistory(question);
    onSearch(question);
  };

  const handleFilterClick = (filterId: string, sample: string) => {
    playPinClick();
    setActiveFilter(filterId);
    if (onSelectCategory) {
      onSelectCategory(filterId);
    }
    if (sample && !inputValue.trim()) {
      setInputValue(sample);
    }
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

  return (
    <section className="w-full pt-6 sm:pt-10 pb-6 sm:pb-8 text-center px-3 sm:px-6 relative z-10 animate-fade-in-up">
      <div className="max-w-3xl mx-auto space-y-4">
        
        {/* Main Title & Description as requested */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/50 border border-blue-500/30 text-blue-300 text-xs font-medium mb-1">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>Auditoría Ciudadana y Fact-Checking</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight font-sans">
            ¿Qué quieres comprobar?
          </h1>
          <p className="text-sm sm:text-base text-neutral-300 font-normal max-w-2xl mx-auto leading-relaxed">
            Investiga promesas gubernamentales, políticas públicas y declaraciones mediante documentos y datos verificables.
          </p>
        </div>

        {/* Thematic Category Filter Chips */}
        <div className="flex items-center justify-center gap-1.5 sm:gap-2 flex-wrap pt-1">
          <span className="text-xs text-neutral-400 font-medium mr-1 flex items-center gap-1 hidden sm:inline-flex">
            <Filter className="w-3.5 h-3.5 text-blue-400" />
            <span>Filtrar por área:</span>
          </span>
          {THEMATIC_FILTERS.map((cat) => {
            const isSelected = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => handleFilterClick(cat.id, cat.sample)}
                className={`min-h-[36px] px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer active:scale-95 border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 shadow-sm font-semibold'
                    : 'bg-[#202226] text-neutral-300 border-[#34373e] hover:border-neutral-500 hover:text-white'
                }`}
                title={`Filtrar consultas sobre ${cat.label}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Wide Natural Language Search Bar Form */}
        <form 
          id="audit-search-form"
          onSubmit={handleSubmit}
          className="relative max-w-2xl mx-auto my-2"
        >
          <div className="flex items-center bg-[#202226] hover:bg-[#23252a] border border-[#353840] hover:border-[#4b4f5a] focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/25 rounded-xl shadow-xl transition-all p-1.5 pl-3.5 sm:pl-4">
            <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-2" />
            
            <input
              id="ai-query-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Formula una pregunta en lenguaje natural sobre una promesa o medida..."
              disabled={isLoading}
              className="w-full bg-transparent text-sm sm:text-base text-white placeholder-neutral-400 focus:outline-hidden py-2 pr-2 font-sans leading-normal"
            />

            {/* Clear Input button if typed */}
            {inputValue && !isLoading && (
              <button
                type="button"
                onClick={() => setInputValue('')}
                className="p-1.5 text-neutral-400 hover:text-white mr-1 rounded-md transition-colors cursor-pointer"
                aria-label="Borrar texto"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Submit Button with clear label */}
            <button
              id="btn-submit-audit"
              type="submit"
              disabled={isLoading || !inputValue.trim()}
              className={`min-h-[44px] px-5 py-2 rounded-lg text-xs sm:text-sm font-sans font-bold tracking-wide transition-all flex items-center justify-center gap-2 shrink-0 ${
                isLoading
                  ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                  : inputValue.trim()
                  ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-md active:scale-95 cursor-pointer'
                  : 'bg-[#2b2d33] text-neutral-400 hover:bg-[#34373e]'
              }`}
              aria-label="Comprobar mediante auditoría"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-white" />
                  <span className="hidden sm:inline">Comprobando...</span>
                </>
              ) : (
                <>
                  <span>Comprobar</span>
                  <ArrowRight className="w-4 h-4 text-white" />
                </>
              )}
            </button>
          </div>
        </form>

        {/* 4 Natural Language Examples */}
        <div className="space-y-1.5 max-w-2xl mx-auto pt-1">
          <div className="text-xs text-neutral-400 font-medium text-center">
            Ejemplos para comenzar:
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left">
            {EXAMPLE_QUESTIONS.map((question, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleExampleClick(question)}
                className="p-2.5 rounded-lg bg-[#202226]/80 hover:bg-[#26282e] border border-[#34373e] hover:border-blue-500/50 text-xs text-neutral-300 hover:text-white transition-all cursor-pointer flex items-start gap-2 group text-left"
              >
                <span className="text-blue-400 font-bold shrink-0 mt-0.5">↳</span>
                <span className="line-clamp-2 leading-relaxed group-hover:text-blue-200">
                  {question}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Local Query History Bar - clean, compact */}
        {history.length > 0 && (
          <div className="mt-3 max-w-2xl mx-auto flex items-center justify-between gap-2 overflow-x-auto py-1 px-1 text-left text-xs no-scrollbar">
            <div className="flex items-center gap-1.5 shrink-0 text-neutral-400 font-sans text-[11px]">
              <History className="w-3.5 h-3.5 text-blue-400" />
              <span>Consultas previas:</span>
            </div>
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
              {history.slice(0, 3).map((queryText, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleExampleClick(queryText)}
                  className="shrink-0 px-2.5 py-1 rounded-lg bg-[#202226] hover:bg-[#282a30] border border-[#353840] text-neutral-300 hover:text-white text-[11px] truncate max-w-[220px] transition-colors cursor-pointer"
                  title={queryText}
                >
                  {queryText}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={handleClearHistory}
              className="text-[10px] text-neutral-500 hover:text-neutral-300 shrink-0 ml-auto transition-colors cursor-pointer"
            >
              Limpiar
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
