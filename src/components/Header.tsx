import React, { useState } from 'react';
import { Share2, Menu, X, Sparkles, BookOpen, Database, Info, Clock, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  activeTab: 'inicio' | 'fuentes' | 'metodologia' | 'acerca';
  onSelectTab: (tab: 'inicio' | 'fuentes' | 'metodologia' | 'acerca') => void;
  onOpenShare: () => void;
  darkMode: boolean;
  onToggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  onOpenShare,
  darkMode,
  onToggleTheme,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (tab: 'inicio' | 'fuentes' | 'metodologia' | 'acerca') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="w-full bg-gradient-to-b from-white/95 via-[#f5f8fc]/95 to-[#e9eff6]/95 dark:from-[#1b232f]/95 dark:via-[#161c26]/95 dark:to-[#11161e]/95 border-b-2 border-[#94d8f8] dark:border-[#0284c7]/70 backdrop-blur-md sticky top-0 z-40 shadow-[0_6px_22px_rgba(66,82,102,0.08)] dark:shadow-[0_6px_24px_rgba(0,0,0,0.4)] transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 sm:h-16 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div
          id="brand-logo"
          onClick={() => onSelectTab('inicio')}
          className="flex items-center gap-2.5 cursor-pointer group select-none py-1 shrink-0"
        >
          <div className="w-9 h-9 rounded-full wii-cyan-btn flex items-center justify-center text-white transition-transform group-hover:scale-105">
            <Clock className="w-4 h-4" />
          </div>
          <span className="font-sans font-extrabold tracking-tight text-[#434c59] dark:text-slate-100 text-lg sm:text-xl uppercase flex items-center whitespace-nowrap">
            <span>COHERENC</span>
            <span className="text-[#009ee3] dark:text-[#38bdf8] group-hover:text-[#32b8f2] transition-colors">.IA</span>
          </span>
        </div>

        {/* Desktop Navigation Capsules */}
        <nav className="hidden md:flex items-center gap-2 lg:gap-3 text-sm font-medium font-sans">
          <button
            id="nav-inicio"
            onClick={() => onSelectTab('inicio')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-xs lg:text-sm font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'inicio'
                ? 'wii-cyan-btn'
                : 'text-[#515b69] dark:text-slate-300 hover:text-[#0b5d87] dark:hover:text-[#7dd3fc] hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_2px_8px_rgba(50,184,242,0.2)]'
            }`}
          >
            Conversación
          </button>

          <button
            id="nav-fuentes"
            onClick={() => onSelectTab('fuentes')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-xs lg:text-sm font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'fuentes'
                ? 'wii-cyan-btn'
                : 'text-[#515b69] dark:text-slate-300 hover:text-[#0b5d87] dark:hover:text-[#7dd3fc] hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_2px_8px_rgba(50,184,242,0.2)]'
            }`}
          >
            Fuentes
          </button>

          <button
            id="nav-metodologia"
            onClick={() => onSelectTab('metodologia')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-xs lg:text-sm font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'metodologia'
                ? 'wii-cyan-btn'
                : 'text-[#515b69] dark:text-slate-300 hover:text-[#0b5d87] dark:hover:text-[#7dd3fc] hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_2px_8px_rgba(50,184,242,0.2)]'
            }`}
          >
            Metodología
          </button>

          <button
            id="nav-acerca"
            onClick={() => onSelectTab('acerca')}
            className={`px-4 py-1.5 rounded-full transition-all cursor-pointer text-xs lg:text-sm font-semibold whitespace-nowrap shrink-0 ${
              activeTab === 'acerca'
                ? 'wii-cyan-btn'
                : 'text-[#515b69] dark:text-slate-300 hover:text-[#0b5d87] dark:hover:text-[#7dd3fc] hover:bg-white/90 dark:hover:bg-slate-800/80 hover:shadow-[0_2px_8px_rgba(50,184,242,0.2)]'
            }`}
          >
            Acerca de
          </button>
        </nav>

        {/* Right utility buttons (Circular Wii Chrome Buttons) */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <button
            id="btn-share-header"
            onClick={onOpenShare}
            title="Compartir o exportar"
            className="w-11 h-11 sm:w-9 sm:h-9 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full wii-pill-btn flex items-center justify-center active:scale-95 cursor-pointer"
            aria-label="Compartir"
          >
            <Share2 className="w-4 h-4 text-[#515b69] dark:text-slate-200" />
          </button>

          <button
            id="btn-theme-toggle"
            onClick={onToggleTheme}
            title={darkMode ? 'Cambiar a modo claro Wii' : 'Activar modo oscuro'}
            className="h-11 sm:h-9 px-3 sm:px-3.5 min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 rounded-full wii-pill-btn text-[#009ee3] dark:text-[#7dd3fc] flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer text-xs font-semibold"
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Activar modo oscuro'}
          >
            {darkMode ? (
              <>
                <Sun className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="hidden lg:inline text-slate-200">Claro</span>
              </>
            ) : (
              <>
                <Moon className="w-4 h-4 text-[#009ee3] shrink-0" />
                <span className="hidden lg:inline text-[#424b57]">Oscuro</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] rounded-full wii-pill-btn flex items-center justify-center active:scale-95 cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#363d47] dark:text-slate-100" /> : <Menu className="w-5 h-5 text-[#434c59] dark:text-slate-200" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#cfd7e2] dark:border-[#2d3848] bg-[#f5f8fc]/98 dark:bg-[#151c26]/98 px-4 py-3 space-y-2 animate-fade-in-scale shadow-xl backdrop-blur-xl">
          <button
            onClick={() => handleMobileNav('inicio')}
            className={`w-full min-h-[44px] px-4 py-2.5 rounded-2xl text-sm font-sans font-semibold flex items-center justify-between transition-all cursor-pointer ${
              activeTab === 'inicio'
                ? 'wii-cyan-btn'
                : 'wii-pill-btn'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className={`w-4 h-4 ${activeTab === 'inicio' ? 'text-white' : 'text-[#009ee3] dark:text-[#38bdf8]'}`} />
              <span>Conversación</span>
            </div>
            <span className={`text-xs ${activeTab === 'inicio' ? 'text-white/90' : 'text-[#6c7785] dark:text-slate-400'}`}>
              Chat con fuentes
            </span>
          </button>

          <div className="grid grid-cols-3 gap-2 pt-1">
            <button
              onClick={() => handleMobileNav('fuentes')}
              className={`min-h-[44px] p-2.5 rounded-2xl text-xs font-sans flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'fuentes'
                  ? 'wii-cyan-btn font-semibold'
                  : 'wii-pill-btn'
              }`}
            >
              <Database className={`w-4 h-4 ${activeTab === 'fuentes' ? 'text-white' : 'text-[#009ee3] dark:text-[#38bdf8]'}`} />
              <span>Fuentes</span>
            </button>

            <button
              onClick={() => handleMobileNav('metodologia')}
              className={`min-h-[44px] p-2.5 rounded-2xl text-xs font-sans flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'metodologia'
                  ? 'wii-cyan-btn font-semibold'
                  : 'wii-pill-btn'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${activeTab === 'metodologia' ? 'text-white' : 'text-[#009ee3] dark:text-[#38bdf8]'}`} />
              <span>Metodología</span>
            </button>

            <button
              onClick={() => handleMobileNav('acerca')}
              className={`min-h-[44px] p-2.5 rounded-2xl text-xs font-sans flex flex-col items-center justify-center gap-1 transition-all cursor-pointer ${
                activeTab === 'acerca'
                  ? 'wii-cyan-btn font-semibold'
                  : 'wii-pill-btn'
              }`}
            >
              <Info className={`w-4 h-4 ${activeTab === 'acerca' ? 'text-white' : 'text-[#009ee3] dark:text-[#38bdf8]'}`} />
              <span>Acerca de</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
