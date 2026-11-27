import React from 'react';
import { VerifiedSource } from '../types';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface SourcesColumnProps {
  sources: VerifiedSource[];
  totalSources: number;
  onOpenAllSources: () => void;
  onSelectSource: (source: VerifiedSource) => void;
  onOpenScrapingMonitor?: () => void;
}

export const SourcesColumn: React.FC<SourcesColumnProps> = ({
  sources,
  totalSources,
  onOpenAllSources,
  onSelectSource,
  onOpenScrapingMonitor,
}) => {
  const handleSourceClick = (source: VerifiedSource) => {
    playPaperSlide();
    onSelectSource(source);
  };

  const handleAllSourcesClick = () => {
    playPinClick();
    onOpenAllSources();
  };

  const handleScrapingClick = () => {
    playPinClick();
    if (onOpenScrapingMonitor) {
      onOpenScrapingMonitor();
    } else {
      onOpenAllSources();
    }
  };
  // Helper for confidence badge colors and labels - Red, White, and Black theme
  const getConfidenceStyle = (score: number = 95, isGoogle?: boolean) => {
    if (isGoogle) {
      return {
        badgeBg: 'bg-red-950/70 border-red-500/40 text-red-300',
        barFill: 'bg-red-500',
        dotColor: 'bg-red-500',
        textColor: 'text-red-400',
        levelLabel: 'Google Search Grounding'
      };
    }
    if (score >= 95) {
      return {
        badgeBg: 'bg-black border-red-500/60 text-white font-bold',
        barFill: 'bg-red-600',
        dotColor: 'bg-red-500',
        textColor: 'text-white',
        levelLabel: 'Certeza Primaria'
      };
    }
    if (score >= 90) {
      return {
        badgeBg: 'bg-neutral-900 border-red-800/80 text-white',
        barFill: 'bg-red-500',
        dotColor: 'bg-white',
        textColor: 'text-white',
        levelLabel: 'Certeza Alta'
      };
    }
    return {
      badgeBg: 'bg-neutral-900 border-neutral-700 text-neutral-300',
      barFill: 'bg-neutral-600',
      dotColor: 'bg-neutral-600',
      textColor: 'text-neutral-300',
      levelLabel: 'Validación Cruzada'
    };
  };

  return (
    <div 
      id="card-verified-sources"
      className="bg-[#202226] rounded-2xl border border-[#34373e] p-4 sm:p-5 shadow-lg flex flex-col justify-between h-full animate-fade-in-up delay-150"
    >
      <div>
        {/* Card Header matching reference image */}
        <div className="border-b border-[#34373e]/70 pb-3 mb-3.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white flex items-center gap-1.5 font-sans">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <span>FUENTES VERIFICADAS</span>
          </h2>
          <p className="text-xs text-neutral-400 font-normal mt-0.5 font-sans">
            Vector de datos
          </p>
        </div>

        {/* Sources List matching the reference image layout */}
        <div className="space-y-2.5">
          {sources.map((item) => {
            const level = item.sourceHierarchyLevel ?? (item.verificationTier === 'GOOGLE_SEARCH_GROUNDING' ? 2 : 1);
            const levelBadge = level === 1
              ? { label: 'Nivel 1 · Primaria', cls: 'text-emerald-300 bg-emerald-950/60 border-emerald-500/40' }
              : level === 2
              ? { label: 'Nivel 2 · Secundaria', cls: 'text-blue-300 bg-blue-950/60 border-blue-500/40' }
              : { label: 'Nivel 3 · Complementaria', cls: 'text-amber-300 bg-amber-950/60 border-amber-500/40' };

            return (
              <div
                key={item.id}
                id={`source-item-${item.id}`}
                onClick={() => handleSourceClick(item)}
                className="group cursor-pointer p-2.5 rounded-xl transition-all flex flex-col gap-1 border bg-[#26282e]/80 hover:bg-[#2d3037] border-[#383b43] hover:border-blue-500/50 min-h-[44px] active:scale-[0.98]"
              >
                {/* Header row: Ref & Title */}
                <div className="flex items-center justify-between gap-2 min-w-0">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="shrink-0 text-xs font-mono font-bold text-blue-400 group-hover:text-blue-300">
                      {item.refNumber}
                    </span>
                    <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors leading-snug truncate font-sans">
                      {item.name}
                    </p>
                  </div>
                  <span className={`shrink-0 text-[10px] font-semibold px-1.5 py-0.5 rounded border ${levelBadge.cls}`}>
                    {levelBadge.label}
                  </span>
                </div>

                {/* Source Detail */}
                <p className="text-[11px] text-neutral-400 line-clamp-1 leading-relaxed font-sans pl-6">
                  {item.detail}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Links: Scraping System & All Sources */}
      <div className="pt-3.5 mt-4 border-t border-[#34373e]/70 space-y-2">
        <button
          type="button"
          onClick={handleScrapingClick}
          className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/40 text-xs text-blue-300 hover:text-white font-bold flex items-center justify-between transition-all group cursor-pointer shadow-xs active:scale-95"
        >
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Sistema de Scraping (9 Fuentes)</span>
          </div>
          <ArrowUpRight className="w-4 h-4 text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        <button
          id="btn-open-all-sources"
          onClick={handleAllSourcesClick}
          className="w-full min-h-[38px] py-1.5 px-3 rounded-xl bg-[#26282e] hover:bg-[#2d3037] text-xs text-neutral-300 hover:text-white font-medium flex items-center justify-between transition-colors group cursor-pointer border border-[#383b43] hover:border-neutral-500 font-sans"
        >
          <span>+ {totalSources - sources.length > 0 ? totalSources - sources.length : 38} fuentes adicionales verificadas</span>
          <span className="text-neutral-500 group-hover:text-neutral-300">›</span>
        </button>
      </div>
    </div>
  );
};
