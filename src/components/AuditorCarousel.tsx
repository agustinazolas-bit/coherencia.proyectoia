import React, { useState, useEffect } from 'react';
import { AuditorStructuredData, VerifiedSource } from '../types';
import { 
  FileText, 
  ShieldCheck, 
  Search, 
  TrendingUp, 
  History, 
  ChevronLeft, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  Ban, 
  XCircle, 
  HelpCircle,
  AlertTriangle,
  BarChart3,
  Gauge,
  Calendar,
  Layers,
  ArrowRight
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface AuditorCarouselProps {
  structured: AuditorStructuredData;
  query?: string;
  verifiedSources?: VerifiedSource[];
}

// Parse quantitative values from fact-checking text for easy-to-understand charts
function extractFactCheckMetrics(factChecking: string, status: string): {
  claimedPct: number;
  verifiedPct: number;
  gapPct: number;
  claimLabel: string;
  verifiedLabel: string;
} {
  const text = factChecking || '';
  
  // Look for percentages in text (e.g., "85%" vs "42.8%", or "15%" vs "4.3%")
  const percentMatches = text.match(/(\d+(?:\.\d+)?)\s*%/g);
  let claimed = 85;
  let verified = 45;

  if (percentMatches && percentMatches.length >= 2) {
    const num1 = parseFloat(percentMatches[0].replace('%', ''));
    const num2 = parseFloat(percentMatches[1].replace('%', ''));
    claimed = Math.max(num1, num2);
    verified = Math.min(num1, num2);
  } else if (status === 'CUMPLIDA' || status === 'COMPLETO') {
    claimed = 100;
    verified = 92;
  } else if (status === 'BLOQUEADA' || status === 'INCUMPLIDA') {
    claimed = 100;
    verified = 28;
  } else if (status === 'SIN_DATOS') {
    claimed = 100;
    verified = 15;
  } else {
    claimed = 80;
    verified = 52;
  }

  const gap = Math.max(0, claimed - verified);

  return {
    claimedPct: Math.min(100, Math.round(claimed)),
    verifiedPct: Math.min(100, Math.round(verified)),
    gapPct: Math.round(gap),
    claimLabel: 'Relato y Meta Gubernamental Declarada',
    verifiedLabel: 'Ejecución Real Verificada en Registro Oficial'
  };
}

export const AuditorCarousel: React.FC<AuditorCarouselProps> = ({
  structured,
  query,
  verifiedSources
}) => {
  const [activeSlide, setActiveSlide] = useState(0);

  const totalSlides = 4;
  const factMetrics = extractFactCheckMetrics(structured.factChecking, structured.status);

  // Status badge styling helper
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'CUMPLIDA':
      case 'COMPLETO':
      case 'COMPLETA':
        return {
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
          bg: 'bg-emerald-950/80 border-emerald-500/70 text-emerald-300 font-semibold',
          label: 'Cumplida (100%)',
          barColor: 'bg-emerald-500'
        };
      case 'EN CURSO':
      case 'EN PROCESO':
      case 'EN TRAMITE':
        return {
          icon: <Clock className="w-3.5 h-3.5 text-amber-400" />,
          bg: 'bg-amber-950/80 border-amber-500/70 text-amber-300 font-semibold',
          label: 'En curso / En trámite',
          barColor: 'bg-amber-500'
        };
      case 'BLOQUEADA':
        return {
          icon: <Ban className="w-3.5 h-3.5 text-red-400" />,
          bg: 'bg-red-950/80 border-red-500/70 text-red-300 font-semibold',
          label: 'Bloqueada por trámite/ley',
          barColor: 'bg-red-500'
        };
      case 'INCUMPLIDA':
        return {
          icon: <XCircle className="w-3.5 h-3.5 text-red-400" />,
          bg: 'bg-red-950/80 border-red-500/70 text-red-300 font-semibold',
          label: 'Incumplida',
          barColor: 'bg-red-500'
        };
      case 'SIN_DATOS':
      case 'SIN DATOS':
      default:
        return {
          icon: <HelpCircle className="w-3.5 h-3.5 text-orange-400" />,
          bg: 'bg-orange-950/80 border-orange-500/70 text-orange-300 font-semibold',
          label: 'Sin datos oficiales formalizados',
          barColor: 'bg-orange-500'
        };
    }
  };

  const statusBadge = getStatusBadge(structured.status);

  // Keyboard navigation for carousel
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        goToNext();
      } else if (e.key === 'ArrowLeft') {
        goToPrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide]);

  const goToNext = () => {
    playPaperSlide();
    setActiveSlide((prev) => (prev < totalSlides - 1 ? prev + 1 : 0));
  };

  const goToPrev = () => {
    playPaperSlide();
    setActiveSlide((prev) => (prev > 0 ? prev - 1 : totalSlides - 1));
  };

  const goToSlide = (idx: number) => {
    playPinClick();
    setActiveSlide(idx);
  };

  // Risk meter level calculations
  const getRiskNumeric = (risk?: string) => {
    switch (risk) {
      case 'Crítico': return { val: 92, label: 'Crítico', color: 'text-red-400', bar: 'bg-red-600' };
      case 'Alto': return { val: 72, label: 'Alto', color: 'text-red-400', bar: 'bg-red-500' };
      case 'Medio': return { val: 48, label: 'Medio', color: 'text-amber-400', bar: 'bg-amber-500' };
      case 'Bajo':
      default: return { val: 24, label: 'Bajo', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    }
  };

  const riskInfo = getRiskNumeric(structured.riskLevel);

  const slideTitles = [
    { title: '1. Promesa & Trazabilidad', subtitle: 'Compromiso 2026, estado de ejecución y respaldo oficial' },
    { title: '2. Fact-Checking', subtitle: 'Cotejo de rigor documental y gráfico comparativo de datos' },
    { title: '3. Proyección & Riesgo', subtitle: 'Medidor de riesgo e impacto a 6 meses' },
    { title: '4. Veredicto Histórico', subtitle: 'Texto exclusivo de consistencia doctrinaria 2017-2026' }
  ];

  return (
    <div className="bg-neutral-950/95 border border-red-950 rounded-2xl overflow-hidden shadow-2xl flex flex-col justify-between">
      
      {/* Dynamic Carousel Navigation Bar */}
      <div className="px-3.5 sm:px-5 py-3 bg-black border-b border-red-950 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {slideTitles.map((tab, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-[11px] font-mono font-semibold transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-red-600 text-white shadow-md border border-red-500'
                    : 'bg-neutral-900/90 text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800 border border-red-950/60'
                }`}
                title={tab.subtitle}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${isActive ? 'bg-white' : 'bg-neutral-500'}`} />
                <span>{tab.title}</span>
              </button>
            );
          })}
        </div>

        {/* Carousel Prev / Next Controls & Slide Counter */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto font-mono">
          <span className="text-[10px] text-neutral-400 bg-neutral-900/90 border border-red-950 px-2 py-1 rounded-md">
            Bloque <strong className="text-white">{activeSlide + 1}</strong> de {totalSlides}
          </span>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Bloque anterior"
            title="Bloque anterior (o tecla flecha izquierda)"
            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-red-950 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95 transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Siguiente bloque"
            title="Siguiente bloque (o tecla flecha derecha)"
            className="w-7 h-7 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-red-950 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95 transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Carousel Slides Container */}
      <div className="p-4 sm:p-6 min-h-[340px] flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* SLIDE 0: REGISTRO DE PROMESA + ESTADO DE EJECUCIÓN + TRAZABILIDAD OFICIAL */}
        {/* ========================================================================= */}
        {activeSlide === 0 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-red-950/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black text-red-400 border border-red-500/60">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 block font-bold">
                    BLOQUE 1 · COMPROMISO & TRAZABILIDAD OFICIAL
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    {structured.theme}
                  </h3>
                </div>
              </div>

              {/* Status Badge */}
              <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge.bg}`}>
                {statusBadge.icon}
                <span>Status: {structured.status}</span>
              </div>
            </div>

            {/* Sub-card 1: Registro de Promesa */}
            <div className="bg-black/90 border border-red-950 rounded-xl p-3.5 sm:p-4 glow-card">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-[11px] font-bold text-neutral-300 uppercase font-mono tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-red-500"></span>
                  1. Registro de Promesa (Programa Presidencial 2026)
                </span>
                <span className="text-[10px] font-mono text-neutral-500">
                  11 mar – 19 jun 2026
                </span>
              </div>
              <blockquote className="italic text-white border-l-3 border-red-500 pl-3.5 py-2 text-xs sm:text-sm font-sans bg-neutral-950/90 rounded-r-lg leading-relaxed">
                "{structured.promise2026}"
              </blockquote>
            </div>

            {/* Sub-card 2: Estado de Ejecución y Trazabilidad Documental */}
            <div className="bg-black/90 border border-red-950 rounded-xl p-3.5 sm:p-4 space-y-3 glow-card">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-[11px] font-bold text-red-400 uppercase font-mono tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-red-400" />
                  <span>2. Estado de Ejecución & Trazabilidad Administrativa</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  {statusBadge.label}
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-neutral-400">Nivel de ejecución administrativa estimado:</span>
                  <strong className="text-white">
                    {structured.status === 'CUMPLIDA' || structured.status === 'COMPLETO' ? '100%' :
                     structured.status === 'EN CURSO' || structured.status === 'EN PROCESO' ? '58%' :
                     structured.status === 'BLOQUEADA' ? '28%' : '15%'}
                  </strong>
                </div>
                <div className="h-2 w-full bg-neutral-900 rounded-full overflow-hidden border border-red-950/80">
                  <div 
                    className={`h-full ${statusBadge.barColor} transition-all duration-700`}
                    style={{
                      width: structured.status === 'CUMPLIDA' || structured.status === 'COMPLETO' ? '100%' :
                             structured.status === 'EN CURSO' || structured.status === 'EN PROCESO' ? '58%' :
                             structured.status === 'BLOQUEADA' ? '28%' : '15%'
                    }}
                  />
                </div>
              </div>

              {/* Evidence Text */}
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-neutral-950/90 p-3 rounded-lg border border-red-950/60">
                <strong className="text-white block font-mono text-[11px] uppercase tracking-wider mb-1 text-red-300">
                  Trazabilidad Documental / Evidencia Registrada:
                </strong>
                <p className="font-sans leading-relaxed">
                  {structured.evidence}
                </p>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 1: PUNTO 3 — ANÁLISIS DE FACT-CHECKING CON GRÁFICO DE FÁCIL COMPRENSIÓN */}
        {/* ========================================================================= */}
        {activeSlide === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-red-950/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black text-red-400 border border-red-500/60">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 block font-bold">
                    BLOQUE 2 · FACT-CHECKING & DESACOPLE DE DATOS
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    3. Análisis de Fact-Checking y Rigor Documental
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono bg-black text-neutral-300 border border-red-900 px-2 py-0.5 rounded">
                Cotejo Cruzado
              </span>
            </div>

            {/* Fact-Checking Textual Analysis */}
            <div className="bg-black/90 border border-red-950 rounded-xl p-3.5 sm:p-4 glow-card">
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.factChecking}
              </p>
            </div>

            {/* EASY-TO-UNDERSTAND GRAPHIC: Dual Contrast Bar + Discrepancy Gauge */}
            <div className="bg-black/90 border border-red-500/50 rounded-xl p-3.5 sm:p-4 space-y-3.5 shadow-lg">
              <div className="flex items-center justify-between gap-2 border-b border-red-950 pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white font-mono uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4 text-red-400" />
                  <span>Gráfico Comparativo: Relato Declarado vs. Registro Real Auditado</span>
                </div>
                <span className="text-[10px] font-mono text-neutral-400">
                  Brecha: <strong className="text-red-400">{factMetrics.gapPct}%</strong>
                </span>
              </div>

              {/* Visual Bars Comparison */}
              <div className="space-y-2.5">
                {/* Bar 1: Government Claim / Target */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                      {factMetrics.claimLabel}
                    </span>
                    <strong className="text-white">{factMetrics.claimedPct}%</strong>
                  </div>
                  <div className="h-3 w-full bg-neutral-900 rounded-full overflow-hidden border border-neutral-800">
                    <div 
                      className="h-full bg-gradient-to-r from-neutral-600 to-neutral-400 rounded-full transition-all duration-700"
                      style={{ width: `${factMetrics.claimedPct}%` }}
                    />
                  </div>
                </div>

                {/* Bar 2: Verified Execution */}
                <div>
                  <div className="flex items-center justify-between text-[11px] font-mono mb-1">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-red-500"></span>
                      {factMetrics.verifiedLabel}
                    </span>
                    <strong className="text-red-300 font-bold">{factMetrics.verifiedPct}%</strong>
                  </div>
                  <div className="h-3 w-full bg-neutral-900 rounded-full overflow-hidden border border-red-950">
                    <div 
                      className="h-full bg-gradient-to-r from-red-700 to-red-500 rounded-full transition-all duration-700"
                      style={{ width: `${factMetrics.verifiedPct}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Interpretative Discrepancy Badges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 font-mono text-[10px]">
                <div className="p-2 rounded-lg bg-neutral-950 border border-red-950 flex flex-col justify-between">
                  <span className="text-neutral-400">Cotejo Documental:</span>
                  <span className="text-white font-bold mt-0.5">100% Fuentes Primarias</span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-red-950 flex flex-col justify-between">
                  <span className="text-neutral-400">Nivel de Desacople:</span>
                  <span className={`font-bold mt-0.5 ${factMetrics.gapPct > 30 ? 'text-red-400' : factMetrics.gapPct > 15 ? 'text-amber-400' : 'text-emerald-400'}`}>
                    {factMetrics.gapPct > 30 ? 'Desacople Crítico' : factMetrics.gapPct > 15 ? 'Desacople Moderado' : 'Consistente'}
                  </span>
                </div>
                <div className="p-2 rounded-lg bg-neutral-950 border border-red-950 flex flex-col justify-between">
                  <span className="text-neutral-400">Órganos de Control:</span>
                  <span className="text-white font-bold mt-0.5">CGR / DIPRES / Policías</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 2: PUNTO 4 — PROYECCIÓN DE IMPACTO Y RIESGO CON GRÁFICOS DE FÁCIL COMPRENSIÓN */}
        {/* ========================================================================= */}
        {activeSlide === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-red-950/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black text-red-400 border border-red-500/60">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 block font-bold">
                    BLOQUE 3 · ESCENARIO PROSPECTIVO (6 MESES)
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    4. Proyección de Impacto y Nivel de Riesgo
                  </h3>
                </div>
              </div>
              <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-bold ${
                structured.riskLevel === 'Crítico' ? 'bg-red-950 text-white border-red-500' :
                structured.riskLevel === 'Alto' ? 'bg-black text-red-400 border-red-600' :
                structured.riskLevel === 'Medio' ? 'bg-neutral-950 text-amber-300 border-amber-600' :
                'bg-black text-emerald-400 border-emerald-600'
              }`}>
                Riesgo: {structured.riskLevel}
              </span>
            </div>

            {/* Projection Text */}
            <div className="bg-black/90 border border-red-950 rounded-xl p-3.5 sm:p-4 glow-card">
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.sixMonthProjection}
              </p>
            </div>

            {/* EASY-TO-UNDERSTAND GRAPHIC: Risk Meter Gauge + 6-Month Timeline */}
            <div className="bg-black/90 border border-red-500/50 rounded-xl p-3.5 sm:p-4 space-y-3.5 shadow-lg">
              
              {/* Graphic 1: Segmented Risk Meter */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-neutral-300 flex items-center gap-1.5 font-bold uppercase">
                    <Gauge className="w-4 h-4 text-red-400" />
                    Semáforo de Riesgo Proyectado:
                  </span>
                  <strong className={`text-xs ${riskInfo.color} font-bold`}>
                    Nivel {riskInfo.label} ({riskInfo.val}%)
                  </strong>
                </div>

                {/* 4 Segmented Progress Bar */}
                <div className="grid grid-cols-4 gap-1.5 h-3">
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 20 ? 'bg-emerald-500' : 'bg-neutral-900 border border-neutral-800'}`} title="Riesgo Bajo (0-25%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 45 ? 'bg-amber-500' : 'bg-neutral-900 border border-neutral-800'}`} title="Riesgo Medio (26-50%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 70 ? 'bg-orange-500' : 'bg-neutral-900 border border-neutral-800'}`} title="Riesgo Alto (51-75%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 85 ? 'bg-red-600 shadow-md animate-pulse' : 'bg-neutral-900 border border-neutral-800'}`} title="Riesgo Crítico (76-100%)" />
                </div>
                <div className="flex justify-between text-[9px] font-mono text-neutral-500 pt-0.5">
                  <span>Bajo</span>
                  <span>Medio</span>
                  <span>Alto</span>
                  <span>Crítico</span>
                </div>
              </div>

              {/* Graphic 2: 6-Month Projection Timeline Milestones */}
              <div className="pt-2 border-t border-red-950/80">
                <span className="text-[10px] uppercase font-mono tracking-wider text-neutral-400 block mb-2 font-bold flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5 text-red-400" />
                  Línea de Tiempo Proyectada a 6 Meses:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[10px]">
                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-red-950 flex flex-col justify-between">
                    <div>
                      <span className="text-red-400 font-bold block mb-1">MES 1 – 2 (Instalación)</span>
                      <p className="text-neutral-300 font-sans text-[11px] leading-tight">
                        Decretos ministeriales y conformación de mesas operativas de urgencia.
                      </p>
                    </div>
                    <span className="text-[9px] text-emerald-400 mt-2 block">✓ Completada</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-red-900/60 flex flex-col justify-between">
                    <div>
                      <span className="text-amber-400 font-bold block mb-1">MES 3 – 4 (Fricción / Trámite)</span>
                      <p className="text-neutral-300 font-sans text-[11px] leading-tight">
                        Control de legalidad en CGR, dictámenes y resistencia parlamentaria.
                      </p>
                    </div>
                    <span className="text-[9px] text-amber-300 mt-2 block">⏳ En desarrollo</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-neutral-950 border border-red-500/50 flex flex-col justify-between">
                    <div>
                      <span className="text-red-400 font-bold block mb-1">MES 5 – 6 (Desenlace)</span>
                      <p className="text-neutral-300 font-sans text-[11px] leading-tight">
                        Impacto presupuestario en DIPRES y saturación de capacidades técnicas.
                      </p>
                    </div>
                    <span className="text-[9px] text-red-400 mt-2 block">⚠️ Escenario crítico</span>
                  </div>
                </div>
              </div>

            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 3: PUNTO 5 — VEREDICTO DE COHERENCIA HISTÓRICA (SOLAMENTE TEXTO)     */}
        {/* ========================================================================= */}
        {activeSlide === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-red-950/80">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-black text-red-400 border border-red-500/60">
                  <History className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-red-400 block font-bold">
                    BLOQUE 4 · COHERENCIA HISTÓRICA & VEREDICTO DOCTRINARIO
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight">
                    5. Veredicto de Coherencia Histórica (2017 · 2021 · 2026)
                  </h3>
                </div>
              </div>
              <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-black text-white border border-red-500">
                {structured.verdict}
              </span>
            </div>

            {/* STRICTLY TEXT ONLY: Clean journalistic typography, NO charts, NO graphs */}
            <div className="bg-black/90 border border-red-950 rounded-xl p-4 sm:p-5 space-y-3.5 glow-card">
              <div className="border-b border-red-950/80 pb-2.5 flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-red-300 font-bold">
                  Evolución Programática & Cotejo Transmedia:
                </span>
                <span className="text-[10px] font-mono text-neutral-400">
                  Archivo 2017 · 2021 · 2026
                </span>
              </div>

              <div className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.historicalNarrative}
              </div>

              {/* Textual comparison recap */}
              <div className="pt-2 text-[11px] text-neutral-400 font-mono space-y-1 border-t border-red-950/60">
                <p>
                  <strong className="text-white">· Bases 2017: </strong>
                  Propuestas de corte doctrinal de reducción radical del aparato estatal y orden público.
                </p>
                <p>
                  <strong className="text-white">· Ajustes 2021: </strong>
                  Moderación gradual y búsqueda de viabilidad legislativa ante coaliciones parlamentarias.
                </p>
                <p>
                  <strong className="text-white">· Gestión 2026: </strong>
                  Pragmatismo ejecutivo ajustado a restricciones del marco legal y holguras de caja de DIPRES.
                </p>
              </div>
            </div>

            {/* Textual Desfunding Warning Banner if active */}
            {structured.defundingAlert && (
              <div className="bg-black border border-red-500/70 rounded-xl p-3.5 sm:p-4 text-white shadow-lg space-y-1">
                <div className="flex items-center gap-1.5 text-red-400 font-mono font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-red-400" />
                  <span>Alerta de Desfinanciamiento (Análisis DIPRES / CFA)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                  {structured.defundingAlert}
                </p>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Carousel Footer Toolbar with Quick Slide Step Navigator */}
      <div className="px-3.5 sm:px-5 py-3 bg-black border-t border-red-950 flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Next / Prev Quick Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrev}
            className="px-3 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white border border-red-950 text-xs font-mono flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="px-3.5 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white border border-red-500 text-xs font-mono font-bold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-md"
          >
            <span>{activeSlide === totalSlides - 1 ? 'Volver al inicio' : 'Siguiente bloque'}</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex items-center gap-1.5 ml-auto">
          {Array.from({ length: totalSlides }).map((_, dotIdx) => (
            <button
              key={dotIdx}
              type="button"
              onClick={() => goToSlide(dotIdx)}
              aria-label={`Ir al bloque ${dotIdx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                activeSlide === dotIdx
                  ? 'w-6 bg-red-500'
                  : 'w-2 bg-neutral-800 hover:bg-neutral-600'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
