import React from 'react';
import { VerifiedSource } from '../types';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Globe } from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface SourcesColumnProps {
  sources: VerifiedSource[];
  totalSources: number;
  onOpenAllSources: () => void;
  onSelectSource: (source: VerifiedSource) => void;
}

export const SourcesColumn: React.FC<SourcesColumnProps> = ({
  sources,
  totalSources,
  onOpenAllSources,
  onSelectSource,
}) => {
  const handleSourceClick = (source: VerifiedSource) => {
    playPaperSlide();
    onSelectSource(source);
  };

  const handleAllSourcesClick = () => {
    playPinClick();
    onOpenAllSources();
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
      className="bg-black/92 rounded-2xl border border-red-950 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full animate-fade-in-up delay-250 glow-card"
    >
      <div>
        {/* Card Header */}
        <div className="border-b border-red-950 pb-3 mb-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-400 flex items-center gap-1.5 font-mono">
              <ShieldCheck className="w-4 h-4 text-red-400" />
              <span>FUENTES VERIFICADAS</span>
            </h2>
            <span className="text-[10px] font-mono text-red-400/80 bg-neutral-950 border border-red-900/80 px-2 py-0.5 rounded">
              11 mar – 19 jun
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-normal mt-0.5">
            Vector de datos institucionales + Google Grounding en tiempo real
          </p>
        </div>

        {/* Sources List with Mobile Touch Targets >= 44px */}
        <div className="space-y-2.5">
          {sources.map((item) => {
            const isGoogle = item.isGoogleSearchSource || item.verificationTier === 'GOOGLE_SEARCH_GROUNDING';
            const score = item.confidenceScore ?? 95;
            const style = getConfidenceStyle(score, isGoogle);
            const statusText = item.verificationStatus || style.levelLabel;

            return (
              <div
                key={item.id}
                id={`source-item-${item.id}`}
                onClick={() => handleSourceClick(item)}
                className="group cursor-pointer p-3 rounded-xl transition-all flex flex-col gap-2 shadow-xs border bg-neutral-950/70 hover:bg-neutral-900 border-red-950/80 hover:border-red-700 min-h-[44px] active:scale-[0.98]"
              >
                {/* Header row: Ref & Title + Confidence Badge */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-baseline gap-2 min-w-0">
                    <span className="shrink-0 text-[11px] font-mono font-bold transition-colors text-red-400 group-hover:text-red-300">
                      {item.refNumber}
                    </span>
                    <p className="text-xs sm:text-sm font-bold text-white group-hover:text-red-300 transition-colors leading-snug truncate">
                      {item.name}
                    </p>
                  </div>

                  {/* Visual Confidence Score Badge */}
                  <div 
                    id={`confidence-badge-${item.id}`}
                    title={`Score de certeza oficial: ${score}% · ${statusText}`}
                    className={`shrink-0 flex items-center gap-1 px-2 py-0.5 rounded-md border text-[10px] font-mono font-bold ${style.badgeBg}`}
                  >
                    {isGoogle ? (
                      <Globe className="w-2.5 h-2.5 text-red-400" />
                    ) : (
                      <span className={`w-1.5 h-1.5 rounded-full ${style.dotColor} animate-pulse`}></span>
                    )}
                    <span>{score}%</span>
                  </div>
                </div>

                {/* Source Detail */}
                <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed">
                  {item.detail}
                </p>

                {/* Visual Confidence Meter Bar & Verification Status Tag */}
                <div className="pt-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-neutral-400 font-mono flex items-center gap-1">
                      {isGoogle ? (
                        <Globe className="w-3 h-3 text-red-400" />
                      ) : (
                        <CheckCircle2 className="w-3 h-3 text-red-400" />
                      )}
                      <span className="text-neutral-300 font-medium truncate max-w-[170px] sm:max-w-[220px]">{statusText}</span>
                    </span>
                    <span className={`font-mono font-semibold ${style.textColor}`}>
                      {score}/100
                    </span>
                  </div>

                  {/* Micro Progress Bar */}
                  <div className="w-full h-1 bg-black rounded-full overflow-hidden border border-red-950">
                    <div 
                      className={`h-full ${style.barFill} transition-all duration-500 rounded-full`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3.5 mt-4 border-t border-red-950">
        <button
          id="btn-open-all-sources"
          onClick={handleAllSourcesClick}
          className="w-full min-h-[44px] py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-xs text-neutral-300 hover:text-red-300 font-medium flex items-center justify-between transition-colors group cursor-pointer border border-red-950/70 hover:border-red-800"
        >
          <span>+ {totalSources - sources.length > 0 ? totalSources - sources.length : 38} fuentes adicionales indexadas</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-red-400" />
        </button>
      </div>
    </div>
  );
};
