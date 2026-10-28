import React, { useState } from 'react';
import { GovernmentCommitment } from '../types';
import { CommitmentComparisonView } from './CommitmentComparisonView';
import { playPaperSlide, playPinClick } from '../utils/audio';
import { 
  X, 
  Search, 
  CheckCircle2, 
  Clock, 
  Ban, 
  XCircle, 
  HelpCircle,
  FileText, 
  Calendar, 
  ExternalLink,
  Layers,
  Filter,
  Columns3,
  CheckSquare,
  Square,
  ArrowRightLeft
} from 'lucide-react';

interface CommitmentsModalProps {
  isOpen: boolean;
  commitments: GovernmentCommitment[];
  onClose: () => void;
  onAuditCommitment?: (commitment: GovernmentCommitment) => void;
  onSelectCommitmentAndAudit?: (commitment: GovernmentCommitment) => void;
}

export const CommitmentsModal: React.FC<CommitmentsModalProps> = ({
  isOpen,
  commitments,
  onClose,
  onAuditCommitment,
  onSelectCommitmentAndAudit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedArea, setSelectedArea] = useState<string>('TODAS');
  const [selectedStatus, setSelectedStatus] = useState<string>('TODOS');
  const [selectedCommitmentIds, setSelectedCommitmentIds] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'compare'>('list');

  if (!isOpen) return null;

  const areas = ['TODAS', 'Seguridad y Fronteras', 'Economía e Impuestos', 'Reforma del Estado', 'Salud y Listas de Espera', 'Educación y Social'];
  const statuses = ['TODOS', 'CUMPLIDA', 'EN CURSO', 'BLOQUEADA', 'INCUMPLIDA', 'SIN_DATOS'];

  const filteredCommitments = commitments.filter((c) => {
    const matchesSearch = 
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.officialDocRef.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.area.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesArea = selectedArea === 'TODAS' || c.area === selectedArea;
    const matchesStatus = selectedStatus === 'TODOS' || c.status === selectedStatus;

    return matchesSearch && matchesArea && matchesStatus;
  });

  const toggleSelectCommitment = (id: string) => {
    playPinClick();
    if (selectedCommitmentIds.includes(id)) {
      setSelectedCommitmentIds(selectedCommitmentIds.filter((item) => item !== id));
    } else {
      if (selectedCommitmentIds.length >= 4) {
        return;
      }
      setSelectedCommitmentIds([...selectedCommitmentIds, id]);
    }
  };

  const selectAllFiltered = () => {
    playPinClick();
    const firstFour = filteredCommitments.slice(0, 3).map((c) => c.id);
    setSelectedCommitmentIds(firstFour);
  };

  const clearSelection = () => {
    playPinClick();
    setSelectedCommitmentIds([]);
    if (viewMode === 'compare') {
      setViewMode('list');
    }
  };

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
          barColor: 'bg-emerald-500'
        };
      case 'EN CURSO':
      case 'EN PROCESO':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
          label: 'En trámite / curso',
          className: 'bg-amber-950/70 text-amber-300 border-amber-500/60 font-semibold',
          barColor: 'bg-amber-500'
        };
      case 'BLOQUEADA':
        return {
          icon: <Ban className="w-3.5 h-3.5 text-red-400" />,
          label: 'Bloqueada',
          className: 'bg-red-950/70 text-red-300 border-red-500/60 font-semibold',
          barColor: 'bg-red-600'
        };
      case 'INCUMPLIDA':
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-red-400" />,
          label: 'Incumplida',
          className: 'bg-red-950/70 text-red-300 border-red-500/60 font-semibold',
          barColor: 'bg-red-600'
        };
      case 'SIN_DATOS':
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-orange-400" />,
          label: 'Sin datos oficiales',
          className: 'bg-orange-950/70 text-orange-300 border-orange-500/60 font-semibold',
          barColor: 'bg-orange-500'
        };
    }
  };

  const selectedCommitmentsList = commitments.filter((c) => selectedCommitmentIds.includes(c.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-neutral-950 rounded-2xl shadow-2xl border border-red-900/80 overflow-hidden h-[95vh] sm:max-h-[90vh] flex flex-col text-neutral-100 animate-fade-in-scale">
        
        {/* Header (min 44px close button touch target) */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-red-950 flex items-center justify-between bg-black/95">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="p-2 rounded-xl bg-black border border-red-500/50 text-red-400 shrink-0">
              <Layers className="w-5 h-5 text-red-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-bold text-white text-sm sm:text-base md:text-lg truncate font-mono">
                  Comparativas Dinámicas
                </h3>
                <span className="text-[10px] font-mono bg-black text-red-300 px-2 py-0.5 rounded border border-red-800 hidden sm:inline">
                  14 Medidas · 100 Días
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-neutral-400 truncate font-mono">
                Fiscalización documental y cotejo dinámico de las 14 medidas prioritarias del gobierno (Chile 2026)
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white p-2.5 min-w-[44px] min-h-[44px] rounded-xl hover:bg-neutral-900 flex items-center justify-center transition-colors shrink-0 cursor-pointer active:scale-95"
            title="Cerrar modal"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View Mode Switch & Multi-Select Bar */}
        <div className="px-3.5 sm:px-6 py-2.5 bg-black/90 border-b border-red-950 flex flex-wrap items-center justify-between gap-2.5">
          {/* Tabs: List vs Compare */}
          <div className="flex items-center gap-1 bg-black p-1 rounded-xl border border-red-950 font-mono">
            <button
              onClick={() => setViewMode('list')}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                viewMode === 'list'
                  ? 'bg-red-600 text-white shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-red-300'
              }`}
            >
              <span>Lista de Medidas ({filteredCommitments.length})</span>
            </button>
            <button
              onClick={() => {
                if (selectedCommitmentIds.length === 0) {
                  selectAllFiltered();
                }
                setViewMode('compare');
              }}
              className={`min-h-[38px] px-3.5 py-1.5 text-xs font-semibold rounded-lg transition-all flex items-center gap-1.5 cursor-pointer active:scale-95 ${
                viewMode === 'compare'
                  ? 'bg-red-600 text-white shadow-sm font-bold'
                  : 'text-neutral-400 hover:text-red-300'
              }`}
            >
              <Columns3 className="w-3.5 h-3.5" />
              <span>Comparación Cara a Cara</span>
              {selectedCommitmentIds.length > 0 && (
                <span className="ml-1 px-1.5 py-0.2 bg-black text-red-300 border border-red-500 font-bold rounded-full text-[10px]">
                  {selectedCommitmentIds.length}
                </span>
              )}
            </button>
          </div>

          {/* Quick Selection Helpers */}
          <div className="flex items-center gap-2 text-xs font-mono ml-auto">
            {selectedCommitmentIds.length > 0 ? (
              <div className="flex items-center gap-2">
                <span className="text-neutral-300 text-[11px]">
                  <strong className="text-red-400">{selectedCommitmentIds.length}</strong> marcados
                </span>
                <button
                  onClick={clearSelection}
                  className="text-neutral-400 hover:text-white underline text-[11px] transition-colors cursor-pointer py-1 px-2"
                >
                  Desmarcar
                </button>
                {viewMode === 'list' && (
                  <button
                    onClick={() => setViewMode('compare')}
                    className="min-h-[36px] px-3 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs rounded-lg font-bold flex items-center gap-1 transition-colors shadow-xs cursor-pointer active:scale-95"
                  >
                    <span>Ver Comparativa</span>
                    <ArrowRightLeft className="w-3 h-3 text-white" />
                  </button>
                )}
              </div>
            ) : (
              <button
                onClick={selectAllFiltered}
                className="min-h-[36px] px-2 py-1 text-xs text-red-400 hover:text-red-300 font-medium flex items-center gap-1 transition-colors cursor-pointer font-mono"
              >
                <span>Comparar 3 medidas sugeridas</span>
              </button>
            )}
          </div>
        </div>

        {/* Comparison View or Main List View */}
        {viewMode === 'compare' ? (
          <div className="p-3 sm:p-6 overflow-y-auto flex-1 bg-black">
            {selectedCommitmentsList.length === 0 ? (
              <div className="text-center py-12 text-neutral-400 space-y-3 font-mono">
                <Columns3 className="w-8 h-8 text-neutral-600 mx-auto" />
                <p className="text-sm">No has seleccionado compromisos para comparar.</p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={selectAllFiltered}
                    className="min-h-[44px] px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-colors shadow-sm cursor-pointer"
                  >
                    Comparar primeras 3 medidas
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className="min-h-[44px] px-4 py-2 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Volver al listado
                  </button>
                </div>
              </div>
            ) : (
              <CommitmentComparisonView
                selectedCommitments={selectedCommitmentsList}
                onRemoveCommitment={toggleSelectCommitment}
                onClearAll={clearSelection}
                onAuditCommitment={onAuditCommitment}
                onSelectCommitmentAndAudit={onSelectCommitmentAndAudit}
                onClose={onClose}
              />
            )}
          </div>
        ) : (
          /* List Mode */
          <>
            {/* Filters and Search Bar (text-base font on mobile to prevent iOS zoom) */}
            <div className="p-3 sm:p-4 bg-black/90 border-b border-red-950 space-y-2.5">
              <div className="flex flex-col sm:flex-row gap-2">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-red-400 absolute left-3 top-3 sm:top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar por compromiso, decreto, ministerio o ley..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-xs bg-black border border-red-950 rounded-xl text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
                  />
                </div>

                {/* Area & Status Filter */}
                <div className="flex items-center gap-1.5 flex-wrap sm:flex-nowrap font-mono">
                  <select
                    value={selectedArea}
                    onChange={(e) => setSelectedArea(e.target.value)}
                    className="min-h-[40px] text-xs bg-black border border-red-950 rounded-xl px-2.5 py-2 text-neutral-200 focus:outline-hidden focus:border-red-500 flex-1 sm:flex-initial"
                  >
                    {areas.map((area) => (
                      <option key={area} value={area} className="bg-black text-white">
                        {area === 'TODAS' ? 'Todas las áreas' : area}
                      </option>
                    ))}
                  </select>

                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="min-h-[40px] text-xs bg-black border border-red-950 rounded-xl px-2.5 py-2 text-neutral-200 focus:outline-hidden focus:border-red-500 flex-1 sm:flex-initial"
                  >
                    {statuses.map((st) => (
                      <option key={st} value={st} className="bg-black text-white">
                        {st === 'TODOS' ? 'Todos los estados' : st}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Hint text */}
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="text-[11px]">
                  Marca las casillas <Square className="w-3 h-3 inline mx-0.5 text-neutral-500" /> para comparar hasta 4 compromisos en paralelo.
                </span>
                <span className="text-[11px] text-red-400 hidden sm:inline font-bold">
                  58% Tasa de Ejecución Promedio
                </span>
              </div>
            </div>

            {/* Commitments List with Staggered Entrance and Touch-friendly actions */}
            <div className="p-3 sm:p-5 overflow-y-auto space-y-3 flex-1 bg-black">
              {filteredCommitments.length === 0 ? (
                <div className="text-center py-12 text-neutral-400 space-y-2 font-mono">
                  <Filter className="w-8 h-8 text-neutral-600 mx-auto" />
                  <p className="text-sm">No se encontraron compromisos con los filtros seleccionados.</p>
                  <button
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedArea('TODAS');
                      setSelectedStatus('TODOS');
                    }}
                    className="text-xs text-red-400 hover:underline cursor-pointer"
                  >
                    Restablecer filtros
                  </button>
                </div>
              ) : (
                filteredCommitments.map((item, idx) => {
                  const badge = getStatusBadge(item.status);
                  const isSelected = selectedCommitmentIds.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      id={`commitment-item-${item.id}`}
                      className={`bg-neutral-950/80 border rounded-xl p-3.5 sm:p-4 transition-all space-y-3 animate-fade-in-up glow-card ${
                        isSelected 
                          ? 'border-red-500 bg-black shadow-md ring-1 ring-red-500/40' 
                          : 'border-red-950 hover:border-red-800'
                      }`}
                      style={{ animationDelay: `${Math.min(idx * 40, 300)}ms` }}
                    >
                      {/* Top Bar: Select checkbox, Title & Status Badge */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
                        <div className="flex items-start gap-2.5 min-w-0">
                          {/* Selection Checkbox (Touch target >= 44px) */}
                          <button
                            type="button"
                            onClick={() => toggleSelectCommitment(item.id)}
                            title={isSelected ? "Desmarcar para comparar" : "Seleccionar para comparar"}
                            className={`p-2 min-w-[40px] min-h-[40px] rounded-lg transition-colors shrink-0 flex items-center justify-center cursor-pointer active:scale-95 ${
                              isSelected 
                                ? 'text-red-400 bg-black border border-red-500' 
                                : 'text-neutral-500 hover:text-white hover:bg-neutral-900 border border-neutral-800'
                            }`}
                          >
                            {isSelected ? (
                              <CheckSquare className="w-5 h-5 text-red-400" />
                            ) : (
                              <Square className="w-5 h-5 text-neutral-500" />
                            )}
                          </button>

                          <div className="min-w-0">
                            <div className="flex items-center gap-2 mb-1 flex-wrap">
                              <span className="text-[10px] font-semibold uppercase tracking-wider text-red-300 bg-black px-2 py-0.5 rounded border border-red-900 font-mono">
                                {item.area}
                              </span>
                              {item.datePromulgated && (
                                <span className="text-[11px] text-neutral-400 flex items-center gap-1 font-mono">
                                  <Calendar className="w-3 h-3 text-neutral-500" />
                                  {item.datePromulgated}
                                </span>
                              )}
                            </div>
                            <h4 className="text-sm sm:text-base font-bold text-white leading-snug">
                              {item.title}
                            </h4>
                          </div>
                        </div>

                        {/* Status Badge */}
                        <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs font-semibold shrink-0 self-start sm:self-auto font-mono ${badge.className}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-xs text-neutral-300 leading-relaxed pl-0 sm:pl-9">
                        {item.summary}
                      </p>

                      {/* Execution Progress Bar */}
                      <div className="space-y-1 pl-0 sm:pl-9">
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-neutral-400">Nivel de Ejecución Administrativa:</span>
                          <span className="font-bold text-white">{item.executionPct}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden border border-red-950">
                          <div 
                            className={`h-full rounded-full ${badge.barColor} transition-all duration-500`}
                            style={{ width: `${item.executionPct}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Documentation & Audit Action */}
                      <div className="pt-2.5 border-t border-red-950 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs pl-0 sm:pl-9">
                        <div className="flex items-center gap-1.5 text-neutral-400 min-w-0">
                          <FileText className="w-3.5 h-3.5 text-red-400 shrink-0" />
                          <span className="truncate max-w-xs sm:max-w-md text-[11px] font-mono">
                            <strong className="text-white">Respaldo: </strong>
                            {item.officialDocRef}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 justify-end font-mono">
                          <button
                            onClick={() => toggleSelectCommitment(item.id)}
                            className={`min-h-[38px] px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer active:scale-95 ${
                              isSelected
                                ? 'bg-black text-red-300 border-red-500'
                                : 'bg-black hover:bg-neutral-900 text-neutral-300 border-red-950'
                            }`}
                          >
                            <span>{isSelected ? 'Seleccionado' : 'Comparar'}</span>
                          </button>

                          <button
                            onClick={() => {
                              onClose();
                              if (onSelectCommitmentAndAudit) {
                                onSelectCommitmentAndAudit(item);
                              } else if (onAuditCommitment) {
                                onAuditCommitment(item);
                              }
                            }}
                            className="min-h-[38px] shrink-0 px-3.5 py-1.5 bg-red-600 hover:bg-red-500 text-white rounded-lg font-bold text-xs transition-colors flex items-center justify-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
                          >
                            <span>Auditar con IA</span>
                            <ExternalLink className="w-3.5 h-3.5 text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}

        {/* Footer (Mobile friendly buttons) */}
        <div className="px-4 sm:px-6 py-3 bg-neutral-950 border-t border-red-950 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-neutral-400 font-mono">
          <span className="text-[11px] sm:text-xs text-center sm:text-left">
            Fuente: Diario Oficial, DIPRES, Contraloría General y Programas 2017-2026
          </span>
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            {selectedCommitmentIds.length >= 2 && viewMode === 'list' && (
              <button
                onClick={() => setViewMode('compare')}
                className="min-h-[40px] px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white font-bold rounded-lg transition-colors text-xs flex items-center gap-1.5 shadow-sm cursor-pointer active:scale-95"
              >
                <Columns3 className="w-3.5 h-3.5 text-white" />
                <span>Comparar ({selectedCommitmentIds.length})</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="min-h-[40px] px-4 py-2 bg-black hover:bg-neutral-900 border border-red-950 text-white rounded-lg transition-colors font-medium text-xs cursor-pointer active:scale-95"
            >
              Cerrar
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
