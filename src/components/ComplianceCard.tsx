import React, { useState } from 'react';
import { ComplianceStatus } from '../types';
import { Layers, ChevronRight } from 'lucide-react';
import { playPinClick, playPaperSlide } from '../utils/audio';

interface ComplianceCardProps {
  compliance: ComplianceStatus;
  onOpenCommitmentsModal?: () => void;
}

export const ComplianceCard: React.FC<ComplianceCardProps> = ({ 
  compliance,
  onOpenCommitmentsModal 
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const handleOpenModal = () => {
    playPinClick();
    playPaperSlide();
    if (onOpenCommitmentsModal) {
      onOpenCommitmentsModal();
    }
  };

  // Status semantic color palette (User requested: Verde COMPLETO, Amarillo EN CURSO/PROCESO, Rojo BLOQUEADAS/INCUMPLIDAS, Naranjo SIN DATOS)
  const statusColors: Record<string, string> = {
    green: '#10b981', // Verde (Cumplidas / Completo)
    amber: '#f59e0b', // Amarillo (En curso / En proceso)
    red: '#ef4444',   // Rojo (Bloqueadas / Incumplidas)
    pale: '#f97316',  // Naranjo (Sin datos oficiales)
  };

  const items = compliance.breakdown.map((item) => ({
    ...item,
    color: statusColors[item.tag] || item.color || '#10b981'
  }));

  // Donut chart geometry calculations
  const total = items.reduce((acc, item) => acc + item.value, 0);
  const size = 110;
  const strokeWidth = 20;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercent = 0;

  return (
    <div 
      id="card-compliance-status"
      className="bg-black/92 rounded-2xl border border-red-950 p-4 sm:p-5 shadow-2xl backdrop-blur-md flex flex-col justify-between animate-fade-in-up delay-100 glow-card"
    >
      <div>
        {/* Header */}
        <div className="border-b border-red-950 pb-2.5 mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-xs sm:text-sm font-semibold uppercase tracking-widest text-red-400 font-mono">
              ESTADO DE CUMPLIMIENTO
            </h2>
            <p className="text-xs text-neutral-400 font-normal mt-0.5">
              (fact-checking · 100 días de gobierno)
            </p>
          </div>
          <span className="text-[10px] font-mono bg-neutral-950 border border-red-900/80 text-red-300 px-2 py-0.5 rounded-md">
            11 mar – 19 jun 2026
          </span>
        </div>

        {/* Headline percentage badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5 bg-neutral-950/90 border border-red-900/70 rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm shadow-red-500/50 shrink-0"></span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              {compliance.headline}
            </span>
          </div>
          <span className="text-[10px] sm:text-xs font-mono text-red-400/80 shrink-0">
            {compliance.daysEvaluated || 100} días auditados
          </span>
        </div>

        {/* Visual Donut Chart + Legend */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-1">
          
          {/* SVG Donut Chart */}
          <div className="relative w-24 h-24 shrink-0 flex items-center justify-center">
            <svg
              className="w-full h-full transform -rotate-90"
              viewBox={`0 0 ${size} ${size}`}
            >
              {items.map((item, idx) => {
                const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`;
                const strokeDashoffset = - (cumulativePercent / total) * circumference;
                cumulativePercent += item.value;

                const isHovered = hoveredIndex === idx;

                return (
                  <circle
                    key={item.label}
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="transparent"
                    stroke={item.color}
                    strokeWidth={isHovered ? strokeWidth + 3 : strokeWidth}
                    strokeDasharray={strokeDasharray}
                    strokeDashoffset={strokeDashoffset}
                    className="transition-all duration-300 cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  />
                );
              })}
            </svg>

            {/* Center Hole Info */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
              {hoveredIndex !== null ? (
                <>
                  <span className="text-[10px] text-neutral-400 font-medium leading-none">
                    {items[hoveredIndex].tag}
                  </span>
                  <span className="text-xs font-bold text-white leading-tight font-mono">
                    {items[hoveredIndex].value}%
                  </span>
                </>
              ) : (
                <span className="text-sm font-bold text-red-400 font-mono">
                  {compliance.executedPercent ?? 58}%
                </span>
              )}
            </div>
          </div>

          {/* Legend */}
          <div className="space-y-2 min-w-0 flex-1 w-full sm:w-auto">
            {items.map((item, idx) => (
              <div 
                key={item.label}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className={`flex items-center justify-between text-xs cursor-pointer transition-opacity p-1 rounded-md hover:bg-neutral-900/50 ${
                  hoveredIndex !== null && hoveredIndex !== idx ? 'opacity-30' : 'opacity-100'
                }`}
              >
                <div className="flex items-center gap-2 truncate pr-1">
                  <span 
                    className="w-2.5 h-2.5 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  ></span>
                  <span className="text-neutral-300 font-medium truncate">
                    {item.label}
                  </span>
                </div>
                <span className="text-white font-semibold shrink-0 font-mono">
                  {item.value}%
                </span>
              </div>
            ))}
          </div>

        </div>

        {/* Action button to open Comparativas Dinámicas */}
        {onOpenCommitmentsModal && (
          <div className="mt-4 pt-3 border-t border-red-950">
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full min-h-[44px] py-2.5 px-3.5 rounded-xl bg-red-950/70 hover:bg-red-900/80 border border-red-800/80 text-red-300 hover:text-white text-xs font-semibold flex items-center justify-between transition-all group cursor-pointer shadow-sm active:scale-[0.98] font-mono"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-red-400" />
                <span>Explorar Comparativas Dinámicas (14 Medidas)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-red-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
