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
      className="bg-[#202226] rounded-2xl border border-[#34373e] p-4 sm:p-5 shadow-lg flex flex-col justify-between h-full animate-fade-in-up delay-100"
    >
      <div>
        {/* Card Header matching reference image */}
        <div className="border-b border-[#34373e]/70 pb-3 mb-3.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-white font-sans flex items-center gap-1.5">
            <FileCheck className="w-4 h-4 text-blue-400" />
            <span>ÚLTIMAS ACTUALIZACIONES</span>
          </h2>
          <p className="text-xs text-neutral-400 font-normal mt-0.5 font-sans">
            del vector de datos
          </p>
        </div>

        {/* Items List */}
        <div className="space-y-2.5">
          {updates.map((item) => (
            <div
              key={item.id}
              onClick={() => handleDocClick(item)}
              className="group cursor-pointer p-2.5 rounded-xl bg-[#26282e]/80 hover:bg-[#2d3037] border border-[#383b43] hover:border-blue-500/50 transition-all flex items-start gap-2.5 min-h-[44px] active:scale-[0.98]"
            >
              {/* Type Badge in rounded pill style as in image */}
              <span className="shrink-0 inline-block bg-blue-950/60 text-blue-300 border border-blue-400/40 text-[11px] font-medium px-2.5 py-0.5 rounded-full font-sans mt-0.5 shadow-xs">
                {item.type}
              </span>

              {/* Title & Date */}
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-neutral-200 group-hover:text-blue-300 transition-colors leading-snug font-sans">
                  {item.title}
                </p>
                {item.summary && (
                  <p className="text-[11px] text-neutral-400 line-clamp-1 mt-0.5 font-sans">
                    {item.summary}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Link matching image */}
      <div className="pt-3.5 mt-4 border-t border-[#34373e]/70">
        <button
          id="btn-open-repo-updates"
          onClick={handleRepositoryClick}
          className="w-full min-h-[40px] py-2 px-3 rounded-xl bg-[#26282e] hover:bg-[#2d3037] text-xs text-neutral-300 hover:text-white font-medium flex items-center justify-between transition-colors group cursor-pointer border border-[#383b43] hover:border-neutral-500 font-sans"
        >
          <span>+ {totalIndexedDocs - updates.length > 0 ? totalIndexedDocs - updates.length : 41} documentos más en el repositorio</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform text-blue-400" />
        </button>
      </div>
    </div>
  );
};
