import React, { useState } from 'react';
import { Share2, Layers, Menu, X, Sparkles, BookOpen, Database, Info } from 'lucide-react';

interface HeaderProps {
  activeTab: 'inicio' | 'metodologia' | 'repositorio' | 'acerca';
  onSelectTab: (tab: 'inicio' | 'metodologia' | 'repositorio' | 'acerca') => void;
  onOpenShare: () => void;
  onOpenComparativas?: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenShare,
  onOpenComparativas,
  darkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (tab: 'inicio' | 'metodologia' | 'repositorio' | 'acerca') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  const handleMobileComparativas = () => {
    if (onOpenComparativas) {
      onOpenComparativas();
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-black/92 border-b border-red-950/80 backdrop-blur-md sticky top-0 z-40 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between">
        
        {/* Brand Title (Top-Left: Noir detective investigative aesthetic in Red, White and Black) */}
        <div 
          id="brand-logo"
          onClick={() => onSelectTab('inicio')}
          className="flex items-center gap-2 cursor-pointer group select-none py-1"
        >
          <span className="font-mono font-extrabold tracking-wider text-white text-lg sm:text-2xl uppercase flex items-center transition-colors">
            <span>COHERENC</span>
            <span className="text-red-500 group-hover:text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.5)] transition-all">.IA</span>
          </span>
        </div>

        {/* Desktop Navigation Links with "Comparativas Dinámicas" */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-7 text-sm font-medium">
          <button
            id="nav-inicio"
            onClick={() => onSelectTab('inicio')}
            className={`transition-colors py-1 cursor-pointer font-mono text-xs lg:text-sm ${
              activeTab === 'inicio'
                ? 'text-red-400 font-bold border-b-2 border-red-400'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Inicio
          </button>

          {/* "Comparativas Dinámicas" navigation button */}
          <button
            id="nav-comparativas-dinamicas"
            onClick={onOpenComparativas}
            className="transition-colors py-1 text-red-300 hover:text-white flex items-center gap-1.5 cursor-pointer group font-mono text-xs lg:text-sm"
            title="Comparativas Dinámicas: Evaluación fiscal y de cumplimiento de las 14 medidas prioritarias"
          >
            <Layers className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-red-400 group-hover:text-red-300">Comparativas Dinámicas</span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
          </button>
          
          <button
            id="nav-metodologia"
            onClick={() => onSelectTab('metodologia')}
            className={`transition-colors py-1 cursor-pointer font-mono text-xs lg:text-sm ${
              activeTab === 'metodologia'
                ? 'text-red-400 font-bold border-b-2 border-red-400'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Metodología
          </button>

          <button
            id="nav-repositorio"
            onClick={() => onSelectTab('repositorio')}
            className={`transition-colors py-1 cursor-pointer font-mono text-xs lg:text-sm ${
              activeTab === 'repositorio'
                ? 'text-red-400 font-bold border-b-2 border-red-400'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Repositorio
          </button>

          <button
            id="nav-acerca"
            onClick={() => onSelectTab('acerca')}
            className={`transition-colors py-1 cursor-pointer font-mono text-xs lg:text-sm ${
              activeTab === 'acerca'
                ? 'text-red-400 font-bold border-b-2 border-red-400'
                : 'text-neutral-300 hover:text-white'
            }`}
          >
            Acerca de
          </button>
        </nav>

        {/* Right utility buttons (Touch targets >= 44px on mobile) */}
        <div className="flex items-center gap-1.5 sm:gap-2.5">
          {/* Quick Comparativas Button for Mobile & Tablet */}
          <button
            type="button"
            onClick={onOpenComparativas}
            className="md:hidden inline-flex items-center gap-1.5 px-3 py-2 min-h-[44px] rounded-xl border border-red-500/50 bg-red-950/80 hover:bg-red-900 text-red-300 text-xs font-semibold active:scale-95 transition-all cursor-pointer font-mono shadow-sm"
            title="Comparativas Dinámicas"
          >
            <Layers className="w-4 h-4 text-red-400" />
            <span className="font-bold">Comparar</span>
          </button>

          {/* Share/Export button (min 44px touch target) */}
          <button
            id="btn-share-header"
            onClick={onOpenShare}
            title="Compartir o exportar auditoría"
            className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-xl border border-red-900/80 bg-neutral-950 hover:bg-neutral-900 hover:border-red-500 flex items-center justify-center text-neutral-300 hover:text-red-400 active:scale-95 transition-all shadow-xs cursor-pointer"
            aria-label="Compartir auditoría"
          >
            <Share2 className="w-4 h-4 text-red-400" />
          </button>

          {/* Visual theme effect toggle */}
          <button
            id="btn-theme-toggle"
            onClick={onToggleTheme}
            title={darkMode ? "Modo Detective Noir Denso" : "Modo Alto Contraste Rojo y Negro"}
            className={`w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-xl border flex items-center justify-center active:scale-95 transition-all shadow-xs cursor-pointer ${
              darkMode
                ? "border-red-900/80 bg-neutral-950 hover:bg-neutral-900 text-red-400"
                : "border-red-500 bg-red-950/80 hover:bg-red-900 text-white shadow-sm shadow-red-500/30"
            }`}
            aria-label="Alternar tema"
          >
            <div className={`w-3.5 h-3.5 rounded-xs border-2 border-current transition-transform duration-300 ${darkMode ? "rotate-45 scale-100" : "rotate-90 scale-110"}`}></div>
          </button>

          {/* Mobile hamburger menu toggle (min 44px touch target) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-xl border border-red-900/80 bg-neutral-950 hover:bg-neutral-900 flex items-center justify-center text-red-400 active:scale-95 transition-all cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-white" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-red-950/90 bg-black/98 px-4 py-3 space-y-2 animate-fade-in-scale shadow-2xl backdrop-blur-xl">
          <button
            onClick={() => handleMobileNav('inicio')}
            className={`w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'inicio'
                ? 'bg-red-600 text-white shadow-sm'
                : 'text-neutral-200 bg-neutral-950 border border-red-950 hover:border-red-700'
            }`}
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-red-400" />
              <span>Panel Principal (Auditor RAG)</span>
            </div>
            <span className="text-[10px] font-mono opacity-80">Chile 2026</span>
          </button>

          <button
            onClick={handleMobileComparativas}
            className="w-full min-h-[44px] px-3.5 py-2.5 rounded-xl text-xs font-mono font-bold flex items-center justify-between text-red-300 bg-red-950/70 border border-red-500/50 hover:bg-red-900/80 transition-all cursor-pointer shadow-xs"
          >
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-red-400" />
              <span>Comparativas Dinámicas (14 Medidas)</span>
            </div>
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          </button>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleMobileNav('metodologia')}
              className={`min-h-[44px] p-2 rounded-xl text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                activeTab === 'metodologia'
                  ? 'bg-red-900/60 border-red-500 text-white font-bold'
                  : 'bg-neutral-950 border-red-950 text-neutral-300 hover:border-red-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[11px]">Metodología</span>
            </button>

            <button
              onClick={() => handleMobileNav('repositorio')}
              className={`min-h-[44px] p-2 rounded-xl text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                activeTab === 'repositorio'
                  ? 'bg-red-900/60 border-red-500 text-white font-bold'
                  : 'bg-neutral-950 border-red-950 text-neutral-300 hover:border-red-700'
              }`}
            >
              <Database className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[11px]">Repositorio</span>
            </button>

            <button
              onClick={() => handleMobileNav('acerca')}
              className={`min-h-[44px] p-2 rounded-xl text-xs font-mono flex flex-col items-center justify-center gap-1 border transition-all cursor-pointer ${
                activeTab === 'acerca'
                  ? 'bg-red-900/60 border-red-500 text-white font-bold'
                  : 'bg-neutral-950 border-red-950 text-neutral-300 hover:border-red-700'
              }`}
            >
              <Info className="w-3.5 h-3.5 text-red-400" />
              <span className="text-[11px]">Acerca de</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
