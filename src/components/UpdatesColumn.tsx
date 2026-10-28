import React from 'react';
import { DataUpdate } from '../types';
import { ArrowUpRight, FileCheck } from 'lucide-react';
import { playPaperRustle, playPinClick } from '../utils/audio';

interface UpdatesColumnProps {
  updates: DataUpdate[];
  totalIndexedDocs: number;
  onOpenRepository: () => void;
  onSelectDocument: (doc: DataUpdate) => void;
}

export const UpdatesColumn: React.FC<UpdatesColumnProps> = ({
  updates,
  totalIndexedDocs,
  onOpenRepository,
  onSelectDocument,
}) => {
  const handleDocClick = (doc: DataUpdate) => {
    playPaperRustle();
    onSelectDocument(doc);
  };

  const handleRepositoryClick = () => {
    playPinClick();
    onOpenRepository();
  };
  return (
    <div 
      id="card-latest-updates"
      className="bg-black/92 rounded-2xl border border-red-950 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between h-full animate-fade-in-up delay-200 glow-card"
    >
      <div>
        {/* Card Header */}
        <div className="border-b border-red-950 pb-3 mb-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-400 font-mono flex items-center gap-1.5">
              <FileCheck className="w-4 h-4 text-red-400" />
              <span>ÚLTIMAS ACTUALIZACIONES</span>
            </h2>
            <span className="text-[10px] font-mono text-red-400/80 bg-neutral-950 border border-red-900/80 px-2 py-0.5 rounded">
              11 mar – 19 jun
            </span>
          </div>
          <p className="text-xs text-neutral-400 font-normal mt-0.5">
            del vector de datos institucional (100 días)
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-2">
          {updates.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => handleDocClick(item)}
              className="group cursor-pointer p-3 rounded-xl bg-neutral-950/70 hover:bg-neutral-900 border border-red-950/80 hover:border-red-700/80 transition-all flex items-start gap-2.5 min-h-[44px] active:scale-[0.98]"
            >
              {/* Type Badge */}
              <span className="shrink-0 inline-block bg-black text-red-300 border border-red-800/80 text-[11px] font-semibold px-2 py-1 rounded-md font-mono mt-0.5">
                {item.type}
              </span>

              {/* Title & Date */}
              <div className="min-w-0 flex-1">
                <p className="text-xs sm:text-sm font-medium text-neutral-200 group-hover:text-red-400 transition-colors leading-snug">
                  {item.title}
                </p>
                {item.summary && (
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5">
                    {item.summary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link */}
      <div className="pt-3.5 mt-4 border-t border-red-950">
        <button
          id="btn-open-repo-updates"
          onClick={handleRepositoryClick}
          className="w-full min-h-[44px] py-2 px-3 rounded-xl bg-neutral-950 hover:bg-neutral-900 text-xs text-neutral-300 hover:text-red-300 font-medium flex items-center justify-between transition-colors group cursor-pointer border border-red-950/70 hover:border-red-800"
        >
          <span>+ {totalIndexedDocs - updates.length > 0 ? totalIndexedDocs - updates.length : 41} documentos más en el repositorio</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-red-400" />
        </button>
      </div>
    </div>
  );
};
