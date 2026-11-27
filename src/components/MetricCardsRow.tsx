import React from 'react';
import { FileText, ShieldAlert, Scale, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import { playPinClick } from '../utils/audio';

interface MetricCardsRowProps {
  onOpenCommitments: () => void;
  onOpenRepository: () => void;
  onOpenSources: () => void;
}

export const MetricCardsRow: React.FC<MetricCardsRowProps> = ({
  onOpenCommitments,
  onOpenRepository,
  onOpenSources
}) => {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 my-3">
      
      {/* Metric 1: 48 Documentos Oficiales */}
      <div 
        onClick={() => {
          playPinClick();
          onOpenRepository();
        }}
        className="bg-[#202226] hover:bg-[#24262c] border border-[#34373e] hover:border-blue-500/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all shadow-md group active:scale-[0.99]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Documentos
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-blue-300 transition-colors">
            48
          </div>
          <p className="text-xs text-neutral-400 line-clamp-1">
            Decretos, dictámenes e informes
          </p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#34373e] flex items-center justify-between text-[11px] text-blue-400">
          <span>Ver repositorio</span>
          <span>→</span>
        </div>
      </div>

      {/* Metric 2: 14 Medidas Evaluadas */}
      <div 
        onClick={() => {
          playPinClick();
          onOpenCommitments();
        }}
        className="bg-[#202226] hover:bg-[#24262c] border border-[#34373e] hover:border-blue-500/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all shadow-md group active:scale-[0.99]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Medidas Clave
          </span>
          <div className="w-7 h-7 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
            <Scale className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-emerald-300 transition-colors">
            14
          </div>
          <p className="text-xs text-neutral-400 line-clamp-1">
            Compromisos prioritarios 100 días
          </p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#34373e] flex items-center justify-between text-[11px] text-emerald-400">
          <span>Comparar estado</span>
          <span>→</span>
        </div>
      </div>

      {/* Metric 3: 5 Órganos de Control */}
      <div 
        onClick={() => {
          playPinClick();
          onOpenSources();
        }}
        className="bg-[#202226] hover:bg-[#24262c] border border-[#34373e] hover:border-blue-500/50 rounded-xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all shadow-md group active:scale-[0.99]"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Control Público
          </span>
          <div className="w-7 h-7 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
            <Building2 className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight group-hover:text-amber-300 transition-colors">
            5
          </div>
          <p className="text-xs text-neutral-400 line-clamp-1">
            CGR, DIPRES, CFA, BCCh, INE
          </p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#34373e] flex items-center justify-between text-[11px] text-amber-400">
          <span>Fuentes verificadas</span>
          <span>→</span>
        </div>
      </div>

      {/* Metric 4: 100 Días Evaluados */}
      <div className="bg-[#202226] border border-[#34373e] rounded-xl p-4 sm:p-5 flex flex-col justify-between shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">
            Período
          </span>
          <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Calendar className="w-4 h-4" />
          </div>
        </div>
        <div className="space-y-0.5">
          <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            100 <span className="text-sm font-semibold text-neutral-400">Días</span>
          </div>
          <p className="text-xs text-neutral-400 line-clamp-1">
            11 mar – 19 jun 2026
          </p>
        </div>
        <div className="mt-2.5 pt-2 border-t border-[#34373e] flex items-center justify-between text-[11px] text-neutral-400">
          <span>Gobierno de Chile</span>
          <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
        </div>
      </div>

    </div>
  );
};
