import React from 'react';
import { GovernmentCommitment } from '../types';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  Ban, 
  XCircle, 
  HelpCircle,
  FileText, 
  Calendar, 
  ExternalLink,
  ShieldCheck, 
  Columns3
} from 'lucide-react';

interface CommitmentComparisonViewProps {
  selectedCommitments: GovernmentCommitment[];
  onRemoveCommitment: (id: string) => void;
  onClearAll: () => void;
  onAuditCommitment?: (commitment: GovernmentCommitment) => void;
  onSelectCommitmentAndAudit?: (commitment: GovernmentCommitment) => void;
  onClose: () => void;
}

export const CommitmentComparisonView: React.FC<CommitmentComparisonViewProps> = ({
  selectedCommitments,
  onRemoveCommitment,
  onClearAll,
  onAuditCommitment,
  onSelectCommitmentAndAudit,
  onClose,
}) => {
  // Status badge styling helper - User requested:
  // Verde para COMPLETO, Amarillo para EN CURSO/EN PROCESO, Rojo para BLOQUEADAS/INCUMPLIDAS, y Naranjo para SIN DATOS OFICIALES
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CUMPLIDA':
      case 'COMPLETO':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          label: 'Cumplida',
          className: 'bg-emerald-950/70 text-emerald-300 border-emerald-500/60 font-semibold',
          barColor: 'bg-emerald-500',
          dotColor: 'bg-emerald-400'
        };
      case 'EN CURSO':
      case 'EN PROCESO':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
          label: 'En trámite / curso',
          className: 'bg-amber-950/70 text-amber-300 border-amber-500/60 font-semibold',
          barColor: 'bg-amber-500',
          dotColor: 'bg-amber-400'
        };
      case 'BLOQUEADA':
        return {
          icon: <Ban className="w-3.5 h-3.5 text-red-400" />,
          label: 'Bloqueada',
          className: 'bg-red-950/70 text-red-300 border-red-500/60 font-semibold',
          barColor: 'bg-red-600',
          dotColor: 'bg-red-500'
        };
      case 'INCUMPLIDA':
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-red-400" />,
          label: 'Incumplida',
          className: 'bg-red-950/70 text-red-300 border-red-500/60 font-semibold',
          barColor: 'bg-red-600',
          dotColor: 'bg-red-500'
        };
      case 'SIN_DATOS':
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-orange-400" />,
          label: 'Sin datos oficiales',
          className: 'bg-orange-950/70 text-orange-300 border-orange-500/60 font-semibold',
          barColor: 'bg-orange-500',
          dotColor: 'bg-orange-400'
        };
    }
  };

  const avgExecution = selectedCommitments.length > 0
    ? Math.round(selectedCommitments.reduce((acc, c) => acc + c.executionPct, 0) / selectedCommitments.length)
    : 0;

  return (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Comparison Summary Banner */}
      <div className="bg-black border border-red-950 rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-neutral-950 text-red-400 border border-red-800/80 shrink-0">
            <Columns3 className="w-4 h-4 text-red-400" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2 font-mono">
              <span>Comparación Cara a Cara ({selectedCommitments.length} medidas)</span>
              <span className="text-[10px] font-mono font-normal bg-neutral-950 text-red-300 px-2 py-0.5 rounded border border-red-800">
                Auditadas 100 Días
              </span>
            </h4>
            <p className="text-[11px] text-neutral-400 font-mono">
              Contraste de estado de cumplimiento, respaldo documental y avance administrativo
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
          <div className="text-left sm:text-right">
            <span className="text-[10px] text-neutral-400 uppercase font-mono block">Promedio Grupo</span>
            <span className="text-xs sm:text-sm font-mono font-bold text-red-400">{avgExecution}% Ejecutado</span>
          </div>
          <button
            onClick={onClearAll}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white hover:bg-neutral-900 rounded-lg border border-transparent hover:border-red-900 transition-colors font-mono cursor-pointer"
          >
            Limpiar selección
          </button>
        </div>
      </div>

      {/* Side-by-Side Responsive Grid */}
      <div className={`grid grid-cols-1 ${selectedCommitments.length === 2 ? 'md:grid-cols-2' : selectedCommitments.length >= 3 ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'} gap-3.5`}>
        {selectedCommitments.map((comm) => {
          const badge = getStatusBadge(comm.status);

          return (
            <div
              key={comm.id}
              id={`compare-card-${comm.id}`}
              className="bg-neutral-950/90 border border-red-950 rounded-xl p-4 flex flex-col justify-between space-y-3.5 shadow-lg relative overflow-hidden group hover:border-red-600 transition-all"
            >
              {/* Header: Area + Remove button */}
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300 bg-black px-2 py-0.5 rounded border border-red-900 truncate font-mono">
                    {comm.area}
                  </span>
                  <button
                    onClick={() => onRemoveCommitment(comm.id)}
                    title="Quitar de comparación"
                    className="text-neutral-400 hover:text-white p-1 rounded-md hover:bg-black transition-colors shrink-0 cursor-pointer"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h4 className="text-sm font-bold text-white leading-snug line-clamp-2">
                  {comm.title}
                </h4>

                {comm.datePromulgated && (
                  <p className="text-[11px] text-neutral-400 flex items-center gap-1 mt-1 font-mono">
                    <Calendar className="w-3 h-3 text-neutral-500" />
                    <span>Fecha: {comm.datePromulgated}</span>
                  </p>
                )}
              </div>

              {/* Status and Progress Bar Block */}
              <div className="p-2.5 rounded-lg bg-black border border-red-950 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-mono text-neutral-400">Estado</span>
                  <div className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border text-[11px] font-semibold font-mono ${badge.className}`}>
                    {badge.icon}
                    <span>{badge.label}</span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className="text-neutral-400">Avance de Gestión:</span>
                    <span className="font-bold text-white">{comm.executionPct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-red-950">
                    <div 
                      className={`h-full rounded-full ${badge.barColor} transition-all duration-500`}
                      style={{ width: `${comm.executionPct}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Summary Description */}
              <div className="text-xs text-neutral-300 leading-relaxed bg-black/60 p-2.5 rounded-lg border border-red-950">
                <p className="text-[10px] uppercase font-mono text-red-400 mb-1 flex items-center gap-1 font-bold">
                  <FileText className="w-3 h-3 text-red-400" />
                  <span>Alcance de la Medida</span>
                </p>
                <p className="line-clamp-4 text-neutral-300">{comm.summary}</p>
              </div>

              {/* Official Document Reference & Audit Button */}
              <div className="pt-2 border-t border-red-950 space-y-2.5">
                <div className="p-2 bg-black rounded-lg border border-red-950 text-[11px] text-neutral-300">
                  <span className="font-semibold text-red-300 block mb-0.5 flex items-center gap-1 font-mono">
                    <ShieldCheck className="w-3 h-3 text-red-400" />
                    <span>Respaldo Documental Oficial:</span>
                  </span>
                  <p className="text-neutral-200 font-mono text-[10px] leading-tight">
                    {comm.officialDocRef}
                  </p>
                </div>

                <button
                  onClick={() => {
                    onClose();
                    if (onSelectCommitmentAndAudit) {
                      onSelectCommitmentAndAudit(comm);
                    } else if (onAuditCommitment) {
                      onAuditCommitment(comm);
                    }
                  }}
                  className="w-full py-2 px-3 bg-red-600 hover:bg-red-500 text-white font-mono font-bold rounded-lg text-xs transition-all flex items-center justify-center gap-1.5 shadow-sm active:scale-98 cursor-pointer"
                >
                  <span>Auditar esta medida con IA</span>
                  <ExternalLink className="w-3 h-3 text-white" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
