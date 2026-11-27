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
      className="bg-[#202226] rounded-2xl border border-[#34373e] p-4 sm:p-5 shadow-lg flex flex-col justify-between animate-fade-in-up delay-100 font-sans"
    >
      <div>
        {/* Header */}
        <div className="border-b border-[#34373e]/70 pb-2.5 mb-3 flex items-start justify-between">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-white font-sans">
              ESTADO DE CUMPLIMIENTO
            </h2>
            <p className="text-xs text-neutral-400 font-normal mt-0.5 font-sans">
              (fact-checking · 100 días de gobierno)
            </p>
          </div>
          <span className="text-xs bg-[#26282e] border border-[#383b43] text-neutral-300 px-2.5 py-0.5 rounded-md font-sans">
            11 mar – 19 jun 2026
          </span>
        </div>

        {/* Headline percentage badge */}
        <div className="flex items-center justify-between gap-2 mb-3.5 bg-[#26282e] border border-[#383b43] rounded-xl px-3 py-2.5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-xs shadow-blue-500/50 shrink-0"></span>
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide font-sans">
              {compliance.headline}
            </span>
          </div>
          <span className="text-xs text-neutral-400 shrink-0 font-sans">
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
          <div className="mt-4 pt-3 border-t border-[#34373e]/70">
            <button
              type="button"
              onClick={handleOpenModal}
              className="w-full min-h-[40px] py-2 px-3.5 rounded-xl bg-[#26282e] hover:bg-[#2d3037] border border-[#383b43] hover:border-blue-500/60 text-neutral-200 hover:text-white text-xs font-semibold flex items-center justify-between transition-all group cursor-pointer shadow-xs active:scale-[0.98] font-sans"
            >
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                <span>Explorar Comparativas Dinámicas (14 Medidas)</span>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-400 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
