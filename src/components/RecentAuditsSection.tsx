import React from 'react';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  XCircle, 
  FileText, 
  ArrowRight, 
  Database, 
  Layers, 
  ShieldCheck,
  TrendingUp
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

export interface RecentAuditItem {
  id: string;
  title: string;
  category: string;
  description: string;
  status: 'Evidencia suficiente' | 'Evidencia parcial' | 'Información contradictoria' | 'Evidencia insuficiente' | 'Pendiente de actualización';
  statusExplanation: string;
  date: string;
  sourcesCount: number;
  query: string;
}

export const RECENT_AUDITS_DATA: RecentAuditItem[] = [
  {
    id: 'audit-1',
    title: 'Plan de control y patrullaje militar fronterizo 2026',
    category: 'Seguridad',
    description: 'Auditoría sobre el despliegue de FF.AA. en infraestructura crítica fronteriza, reglas de uso de la fuerza (RUF) y reconducciones efectivas en Colchane.',
    status: 'Evidencia suficiente',
    statusExplanation: 'Decretos publicados en Diario Oficial y balance operativo de Defensa comprobados.',
    date: '28 abr 2026',
    sourcesCount: 14,
    query: '¿Es viable el plan de control fronterizo 2026 y despliegue militar?'
  },
  {
    id: 'audit-2',
    title: 'Reforma tributaria de primera categoría y reactivación económica',
    category: 'Economía',
    description: 'Evaluación del impacto fiscal de la reducción propuesta al impuesto corporativo, compensaciones tributarias y estimación de recaudación de DIPRES.',
    status: 'Información contradictoria',
    statusExplanation: 'Discrepancia entre la meta de crecimiento y las advertencias del Consejo Fiscal Autónomo (CFA).',
    date: '18 abr 2026',
    sourcesCount: 22,
    query: 'Cotejar reforma tributaria con programas 2017 y 2021 y balance DIPRES'
  },
  {
    id: 'audit-3',
    title: 'Fusión de ministerios y reestructuración de funcionarios',
    category: 'Gasto público',
    description: 'Análisis de viabilidad del proyecto de unificación ministerial sin ley orgánica constitucional y auditoría de desvinculaciones.',
    status: 'Evidencia parcial',
    statusExplanation: 'Existe instructivo interno pero requiere reforma legal aprobada en el Congreso.',
    date: '02 may 2026',
    sourcesCount: 16,
    query: 'Auditar reestructuración de ministerios y funcionarios públicos'
  },
  {
    id: 'audit-4',
    title: 'Cárceles de alta seguridad y régimen penitenciario de aislamiento',
    category: 'Seguridad',
    description: 'Verificación del plan de inversión carcelaria, inhibición de señal celular e implementación de módulos de aislamiento estricto.',
    status: 'Evidencia suficiente',
    statusExplanation: 'Convenio MOP-Gendarmería adjudicado y decretos de fondos de emergencia vigentes.',
    date: '22 may 2026',
    sourcesCount: 19,
    query: '¿Qué evidencia existe sobre el plan de cárceles de alta seguridad?'
  }
];

interface RecentAuditsSectionProps {
  onSelectAudit: (query: string) => void;
  onOpenRepository: () => void;
  onOpenComparativas: () => void;
  selectedCategory?: string;
}

export const RecentAuditsSection: React.FC<RecentAuditsSectionProps> = ({
  onSelectAudit,
  onOpenRepository,
  onOpenComparativas,
  selectedCategory = 'all'
}) => {
  // Filter if specific category selected
  const filteredAudits = selectedCategory === 'all'
    ? RECENT_AUDITS_DATA
    : RECENT_AUDITS_DATA.filter(a => a.category.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(a.category.toLowerCase()));

  const auditsToShow = filteredAudits.length > 0 ? filteredAudits : RECENT_AUDITS_DATA;

  const getStatusBadge = (status: RecentAuditItem['status']) => {
    switch (status) {
      case 'Evidencia suficiente':
        return {
          bg: 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300',
          dot: 'bg-emerald-400',
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
        };
      case 'Evidencia parcial':
        return {
          bg: 'bg-amber-950/70 border-amber-500/60 text-amber-300',
          dot: 'bg-amber-400',
          icon: <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
        };
      case 'Información contradictoria':
        return {
          bg: 'bg-rose-950/70 border-rose-500/60 text-rose-300',
          dot: 'bg-rose-400',
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0" />
        };
      case 'Evidencia insuficiente':
        return {
          bg: 'bg-orange-950/70 border-orange-500/60 text-orange-300',
          dot: 'bg-orange-400',
          icon: <HelpCircle className="w-3.5 h-3.5 text-orange-400 shrink-0" />
        };
      case 'Pendiente de actualización':
      default:
        return {
          bg: 'bg-slate-900 border-slate-600 text-slate-300',
          dot: 'bg-slate-400',
          icon: <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        };
    }
  };

  const handleCardClick = (query: string) => {
    playPaperSlide();
    onSelectAudit(query);
  };

  return (
    <div className="w-full space-y-6 pt-2 pb-4">
      
      {/* 1. SEGUIMIENTO GUBERNAMENTAL (Panorama general conciso y comprensible) */}
      <section className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#34373e]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Seguimiento Gubernamental
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Estado de los Primeros 100 Días de Gobierno
            </h2>
            <p className="text-xs text-neutral-400 mt-0.5">
              Evaluación consolidada sobre 14 medidas prioritarias basadas en decretos del Diario Oficial y DIPRES.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                playPinClick();
                onOpenComparativas();
              }}
              className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-2 cursor-pointer transition-all active:scale-95 shadow-sm"
            >
              <Layers className="w-4 h-4" />
              <span>Explorar las 14 medidas</span>
            </button>
          </div>
        </div>

        {/* Global Progress Indicators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          <div className="bg-[#26282e] border border-[#383b43] p-3 rounded-xl">
            <div className="text-xs text-neutral-400 mb-1 flex items-center justify-between">
              <span>Avance global</span>
              <span className="text-blue-400 font-bold">58%</span>
            </div>
            <div className="h-2 w-full bg-[#181a1d] rounded-full overflow-hidden mb-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: '58%' }}></div>
            </div>
            <span className="text-[11px] text-neutral-300">
              100 días evaluados (11 mar - 19 jun 2026)
            </span>
          </div>

          <div className="bg-[#26282e] border border-[#383b43] p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Evidencia suficiente</div>
              <div className="text-base font-bold text-white">4 medidas (28.6%)</div>
              <div className="text-[10px] text-emerald-400">Decretadas y en ejecución</div>
            </div>
          </div>

          <div className="bg-[#26282e] border border-[#383b43] p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-950/60 border border-amber-500/40 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Evidencia parcial</div>
              <div className="text-base font-bold text-white">6 medidas (42.8%)</div>
              <div className="text-[10px] text-amber-400">En tramitación o diseño</div>
            </div>
          </div>

          <div className="bg-[#26282e] border border-[#383b43] p-3 rounded-xl flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-950/60 border border-rose-500/40 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5 text-rose-400" />
            </div>
            <div>
              <div className="text-xs text-neutral-400">Con contradicciones</div>
              <div className="text-base font-bold text-white">4 medidas (28.6%)</div>
              <div className="text-[10px] text-rose-400">Brecha fiscal o legal detectada</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. AUDITORÍAS RECIENTES */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              <Database className="w-4 h-4 text-blue-400" />
              <span>Auditorías Recientes</span>
            </h2>
            <p className="text-xs text-neutral-400">
              Verificaciones documentales completadas con fuentes primarias cotejadas.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              playPinClick();
              onOpenRepository();
            }}
            className="text-xs text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1.5 cursor-pointer py-1 px-2.5 rounded-lg hover:bg-[#202226] transition-colors"
          >
            <span>Ver repositorio completo (+45 documentos)</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {auditsToShow.map((audit) => {
            const badge = getStatusBadge(audit.status);
            return (
              <div
                key={audit.id}
                onClick={() => handleCardClick(audit.query)}
                className="bg-[#202226] hover:bg-[#24262c] border border-[#34373e] hover:border-blue-500/50 rounded-xl p-4 flex flex-col justify-between transition-all cursor-pointer shadow-md group active:scale-[0.99]"
              >
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider bg-[#26282e] border border-[#383b43] px-2 py-0.5 rounded-md">
                      {audit.category}
                    </span>
                    <span className="text-[11px] text-neutral-400">
                      Actualizado: {audit.date}
                    </span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {audit.title}
                  </h3>

                  <p className="text-xs text-neutral-300 leading-relaxed line-clamp-2">
                    {audit.description}
                  </p>

                  {/* Evaluation Status & Explanation */}
                  <div className={`p-2 rounded-lg border text-xs flex flex-col gap-1 ${badge.bg}`}>
                    <div className="flex items-center gap-1.5 font-semibold">
                      {badge.icon}
                      <span>Estado: {audit.status}</span>
                    </div>
                    <span className="text-[11px] opacity-90 pl-5">
                      {audit.statusExplanation}
                    </span>
                  </div>
                </div>

                {/* Footer of Card with Sources and CTA */}
                <div className="mt-3.5 pt-3 border-t border-[#34373e] flex items-center justify-between gap-2">
                  <span className="text-[11px] text-neutral-400 flex items-center gap-1">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>{audit.sourcesCount} fuentes cotejadas</span>
                  </span>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCardClick(audit.query);
                    }}
                    className="text-xs text-blue-400 group-hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <span>Consultar análisis completo</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
};
