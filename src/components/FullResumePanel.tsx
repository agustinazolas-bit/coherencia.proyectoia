import React from 'react';
import { Download, FileCheck, ShieldCheck, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface FullResumePanelProps {
  onOpenWordPress: () => void;
  onOpenCommitments: () => void;
  query?: string;
}

export const FullResumePanel: React.FC<FullResumePanelProps> = ({
  onOpenWordPress,
  onOpenCommitments,
  query
}) => {
  return (
    <div className="bg-[#1c1e23] border border-[#30343d] rounded-2xl p-4 sm:p-5 shadow-xl flex flex-col justify-between space-y-4 font-sans text-neutral-200">
      
      {/* Top Header matching Mantis Analytics: Date, tags & "Full Resume" */}
      <div className="space-y-2 border-b border-[#30343d] pb-3">
        <div className="flex items-center justify-between gap-2 flex-wrap text-[11px] text-neutral-400">
          <span className="bg-[#26282e] border border-[#383b43] px-2 py-0.5 rounded-md font-mono">
            19 Jun 2026
          </span>
          <span className="bg-blue-950/60 border border-blue-500/30 text-blue-300 px-2 py-0.5 rounded-md font-semibold">
            Diario Oficial · DIPRES · CGR
          </span>
        </div>

        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 block">
            SÍNTESIS EJECUTIVA DE VERIFICACIÓN
          </span>
          <h3 className="text-base sm:text-lg font-extrabold text-white tracking-tight">
            Full Resume (Análisis Prospectivo)
          </h3>
        </div>
      </div>

      {/* Dynamics Analysis Section */}
      <div className="space-y-1.5 bg-[#202227] p-3 rounded-xl border border-[#353942]">
        <span className="text-[11px] uppercase tracking-wider font-bold text-neutral-300 block">
          Análisis de Dinámica & Desacople:
        </span>
        <p className="text-xs text-neutral-300 leading-relaxed font-sans">
          El análisis sobre <strong className="text-white font-medium">"{query || 'las 14 medidas prioritarias'}"</strong> refleja un avance institucional del 58%. Se identifica una brecha entre las declaraciones ministeriales y los actos con toma de razón en Contraloría.
        </p>
      </div>

      {/* Main Theses List (1, 2, 3, 4) strictly formatted like Image 2 */}
      <div className="space-y-2.5">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-300 block">
          Tesis Principales de Auditoría:
        </span>

        <div className="space-y-2 text-xs">
          {/* Thesis 1 */}
          <div className="p-2.5 rounded-lg bg-[#22252c] border border-[#343842] flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              1
            </span>
            <p className="text-neutral-200 leading-relaxed font-sans">
              <strong className="text-white">Fronteras e Infraestructura Crítica:</strong> D.S. N° 123 vigente con patrullajes de FF.AA. en Colchane, pero con advertencia presupuestaria sobre viáticos continuos.
            </p>
          </div>

          {/* Thesis 2 */}
          <div className="p-2.5 rounded-lg bg-[#22252c] border border-[#343842] flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              2
            </span>
            <p className="text-neutral-200 leading-relaxed font-sans">
              <strong className="text-white">Reforma Tributaria e Impuestos:</strong> Reducción al gravamen corporativo enfrenta reparos técnicos del Consejo Fiscal Autónomo (CFA) por sostenibilidad de ingresos.
            </p>
          </div>

          {/* Thesis 3 */}
          <div className="p-2.5 rounded-lg bg-[#22252c] border border-[#343842] flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              3
            </span>
            <p className="text-neutral-200 leading-relaxed font-sans">
              <strong className="text-white">Reestructuración del Estado:</strong> La unificación de ministerios no puede implementarse por simple decreto; requiere trámite legislativo orgánico en el Congreso.
            </p>
          </div>

          {/* Thesis 4 */}
          <div className="p-2.5 rounded-lg bg-[#22252c] border border-[#343842] flex items-start gap-2.5">
            <span className="w-5 h-5 rounded-full bg-blue-600/30 border border-blue-500/40 text-blue-400 font-bold flex items-center justify-center shrink-0 text-[11px]">
              4
            </span>
            <p className="text-neutral-200 leading-relaxed font-sans">
              <strong className="text-white">Régimen Penitenciario de Aislamiento:</strong> Convenio MOP-Gendarmería adjudicado con avance del 72% en inhibición telefónica y módulos de alta seguridad.
            </p>
          </div>
        </div>
      </div>

      {/* Action Download Button matching Image 2 */}
      <div className="pt-2 border-t border-[#30343d] space-y-2">
        <button
          type="button"
          onClick={() => {
            playPinClick();
            onOpenWordPress();
          }}
          className="w-full min-h-[42px] px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold tracking-wide rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Download className="w-4 h-4 text-white" />
          <span>Descargar Resumen Ejecutivo / WordPress</span>
        </button>

        <button
          type="button"
          onClick={() => {
            playPaperSlide();
            onOpenCommitments();
          }}
          className="w-full text-center text-[11px] text-blue-400 hover:text-blue-300 font-semibold cursor-pointer py-1"
        >
          Ver evaluación comparada de las 14 medidas →
        </button>
      </div>

    </div>
  );
};
