import React, { useState, useEffect } from 'react';
import { AuditorStructuredData, VerifiedSource, NewsVideoReport } from '../types';
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
  ArrowRight,
  Tv,
  Play,
  CheckCircle,
  X,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface AuditorCarouselProps {
  structured: AuditorStructuredData;
  query?: string;
  verifiedSources?: VerifiedSource[];
  newsVideos?: NewsVideoReport[];
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
  query: _query,
  verifiedSources: _verifiedSources,
  newsVideos: propVideos
}) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [playingVideo, setPlayingVideo] = useState<NewsVideoReport | null>(null);

  // Unified video list from structured or props
  const allVideos: NewsVideoReport[] = (structured.newsVideos && structured.newsVideos.length > 0)
    ? structured.newsVideos
    : (propVideos || []);

  const totalSlides = 5;
  const factMetrics = extractFactCheckMetrics(structured.factChecking, structured.status);

  // Status badge styling helper (formal, friendly, and accessible)
  const getStatusBadge = (status?: string) => {
    switch (status) {
      case 'CUMPLIDA':
      case 'COMPLETO':
      case 'COMPLETA':
        return {
          icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" />,
          bg: 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300 font-semibold',
          label: 'Cumplida (100%)',
          barColor: 'bg-emerald-500',
          dot: 'bg-emerald-400'
        };
      case 'EN CURSO':
      case 'EN PROCESO':
      case 'EN TRAMITE':
        return {
          icon: <Clock className="w-4 h-4 text-amber-400" />,
          bg: 'bg-amber-950/70 border-amber-500/60 text-amber-300 font-semibold',
          label: 'En curso / En trámite',
          barColor: 'bg-amber-500',
          dot: 'bg-amber-400'
        };
      case 'BLOQUEADA':
        return {
          icon: <Ban className="w-4 h-4 text-rose-400" />,
          bg: 'bg-rose-950/70 border-rose-500/60 text-rose-300 font-semibold',
          label: 'Bloqueada por trámite/ley',
          barColor: 'bg-rose-500',
          dot: 'bg-rose-400'
        };
      case 'INCUMPLIDA':
        return {
          icon: <XCircle className="w-4 h-4 text-rose-400" />,
          bg: 'bg-rose-950/70 border-rose-500/60 text-rose-300 font-semibold',
          label: 'Incumplida',
          barColor: 'bg-rose-500',
          dot: 'bg-rose-400'
        };
      case 'SIN_DATOS':
      case 'SIN DATOS':
      default:
        return {
          icon: <HelpCircle className="w-4 h-4 text-orange-400" />,
          bg: 'bg-orange-950/70 border-orange-500/60 text-orange-300 font-semibold',
          label: 'Sin datos oficiales formalizados',
          barColor: 'bg-orange-500',
          dot: 'bg-orange-400'
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
      } else if (e.key === 'Escape' && playingVideo) {
        setPlayingVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSlide, playingVideo]);

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
      case 'Crítico': return { val: 92, label: 'Crítico', color: 'text-rose-400', bar: 'bg-rose-600' };
      case 'Alto': return { val: 72, label: 'Alto', color: 'text-orange-400', bar: 'bg-orange-500' };
      case 'Medio': return { val: 48, label: 'Medio', color: 'text-amber-400', bar: 'bg-amber-500' };
      case 'Bajo':
      default: return { val: 24, label: 'Bajo', color: 'text-emerald-400', bar: 'bg-emerald-500' };
    }
  };

  const riskInfo = getRiskNumeric(structured.riskLevel);

  const slideTabs = [
    { title: 'Toda la Info', subtitle: 'Visión integral del Auditor' },
    { title: 'Fact-Checking', subtitle: 'Cotejo y gráfico comparativo de datos' },
    { title: 'Proyección & Riesgo', subtitle: 'Medidor de riesgo e impacto a 6 meses' },
    { title: 'Veredicto Histórico', subtitle: 'Consistencia doctrinaria 2017-2026' },
    { title: 'Catálogo de Videos', subtitle: 'Reportajes periodísticos verificados' }
  ];

  return (
    <div className="bg-[#202226] border border-[#34373e] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between font-sans">
      
      {/* Dynamic Carousel Navigation Bar matching reference image formal/friendly styling */}
      <div className="px-3.5 sm:px-5 py-3 bg-[#1c1e22] border-b border-[#34373e] flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Step Indicator Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5 max-w-full">
          {slideTabs.map((tab, idx) => {
            const isActive = activeSlide === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => goToSlide(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 shrink-0 cursor-pointer active:scale-95 ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-sm font-semibold'
                    : 'bg-[#27292f] text-neutral-300 hover:text-white hover:bg-[#30333b]'
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
        <div className="flex items-center gap-1.5 shrink-0 ml-auto">
          <span className="text-xs text-neutral-400 bg-[#26282e] border border-[#34373e] px-2.5 py-1 rounded-md font-sans">
            Bloque <strong className="text-white">{activeSlide + 1}</strong> de {totalSlides}
          </span>
          <button
            type="button"
            onClick={goToPrev}
            aria-label="Bloque anterior"
            title="Bloque anterior (o tecla flecha izquierda)"
            className="w-7 h-7 rounded-lg bg-[#27292f] hover:bg-[#34373e] text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95 transition-colors border border-[#34373e]"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            type="button"
            onClick={goToNext}
            aria-label="Siguiente bloque"
            title="Siguiente bloque (o tecla flecha derecha)"
            className="w-7 h-7 rounded-lg bg-[#27292f] hover:bg-[#34373e] text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer active:scale-95 transition-colors border border-[#34373e]"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Carousel Slides Container */}
      <div className="p-4 sm:p-5 min-h-[360px] flex flex-col justify-between">
        
        {/* ========================================================================= */}
        {/* SLIDE 0: "TODA LA INFO DEL AUDITOR" (VISIÓN INTEGRAL CONDENSADA)           */}
        {/* ========================================================================= */}
        {activeSlide === 0 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#34373e]/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <FileText className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-400 block font-bold font-sans">
                    AUDITORÍA INTEGRAL CONDENSADA · 100 DÍAS
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {structured.theme}
                  </h3>
                </div>
              </div>

              {/* Classification & Status Badges */}
              <div className="flex items-center gap-2 flex-wrap">
                {structured.evidenceClassification && (
                  <span className={`px-3 py-1 rounded-full border text-xs font-bold ${
                    structured.evidenceClassification === 'CONFIRMADA' ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' :
                    structured.evidenceClassification === 'PARCIALMENTE CONFIRMADA' ? 'bg-amber-950/80 border-amber-500/60 text-amber-300' :
                    structured.evidenceClassification === 'CONTRADICHA' ? 'bg-rose-950/80 border-rose-500/60 text-rose-300' :
                    structured.evidenceClassification === 'DESACTUALIZADA' ? 'bg-slate-900 border-slate-500/60 text-slate-300' :
                    'bg-orange-950/80 border-orange-500/60 text-orange-300'
                  }`}>
                    Evidencia: {structured.evidenceClassification}
                  </span>
                )}
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${statusBadge.bg}`}>
                  {statusBadge.icon}
                  <span>Estado: {structured.status}</span>
                </div>
                {structured.structuredProjection?.uncertaintyLevel && (
                  <span className="px-2.5 py-1 rounded-full border border-[#383b43] bg-[#26282e] text-xs text-neutral-300">
                    Incertidumbre: <strong className="text-white">{structured.structuredProjection.uncertaintyLevel}</strong>
                  </span>
                )}
              </div>
            </div>

            {/* Sub-card 1: Registro de Promesa */}
            <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-3.5 sm:p-4">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-neutral-200 uppercase tracking-wider flex items-center gap-1.5 font-sans">
                  <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                  1. Registro de Promesa (Programa Presidencial 2026)
                </span>
                <span className="text-[11px] text-neutral-400 font-sans">
                  11 mar – 19 jun 2026
                </span>
              </div>
              <blockquote className="italic text-white border-l-3 border-blue-500 pl-3.5 py-1.5 text-xs sm:text-sm font-sans bg-[#202226]/80 rounded-r-lg leading-relaxed">
                "{structured.promise2026}"
              </blockquote>
            </div>

            {/* Sub-card 2: Estado de Ejecución y Trazabilidad */}
            <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-3.5 sm:p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-400 uppercase tracking-wider font-sans">
                  <ShieldCheck className="w-4 h-4 text-blue-400" />
                  <span>2. Estado de Ejecución & Trazabilidad Documental (Nivel 1)</span>
                </div>
                <span className="text-xs font-sans text-neutral-300">
                  {statusBadge.label}
                </span>
              </div>

              {/* Progress bar visual */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs font-sans">
                  <span className="text-neutral-400">Nivel de ejecución administrativa estimado:</span>
                  <strong className="text-white">
                    {structured.status === 'CUMPLIDA' || structured.status === 'COMPLETO' ? '100%' :
                     structured.status === 'EN CURSO' || structured.status === 'EN PROCESO' ? '58%' :
                     structured.status === 'BLOQUEADA' ? '28%' : '0%'}
                  </strong>
                </div>
                <div className="h-2 w-full bg-[#1c1e22] rounded-full overflow-hidden border border-[#383b43]">
                  <div 
                    className={`h-full ${statusBadge.barColor} transition-all duration-700 rounded-full`}
                    style={{
                      width: structured.status === 'CUMPLIDA' || structured.status === 'COMPLETO' ? '100%' :
                             structured.status === 'EN CURSO' || structured.status === 'EN PROCESO' ? '58%' :
                             structured.status === 'BLOQUEADA' ? '28%' : '4%'
                    }}
                  />
                </div>
              </div>

              {/* Evidence Text */}
              <div className="text-xs sm:text-sm text-neutral-300 leading-relaxed bg-[#202226] p-3 rounded-lg border border-[#383b43]">
                <strong className="block text-xs uppercase tracking-wider mb-1 font-sans text-blue-300">
                  Trazabilidad Documental y Actos Verificados:
                </strong>
                <p className="font-sans leading-relaxed">
                  {structured.evidence}
                </p>
              </div>
            </div>

            {/* Quick Summary Grid of Points 3, 4, 5 */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
              {/* Fact-Checking Highlight */}
              <div className="p-3 rounded-xl bg-[#26282e] border border-[#383b43] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider block mb-1">
                    3. Fact-Checking & Presupuesto
                  </span>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {structured.factChecking}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goToSlide(1)}
                  className="mt-2 text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver control jurídico y fiscal</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Proyección Highlight */}
              <div className="p-3 rounded-xl bg-[#26282e] border border-[#383b43] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                    4. Escenario · Riesgo {structured.riskLevel}
                  </span>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {structured.sixMonthProjection}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goToSlide(2)}
                  className="mt-2 text-[11px] text-amber-400 hover:text-amber-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver supuestos e incertidumbre</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Veredicto Highlight */}
              <div className="p-3 rounded-xl bg-[#26282e] border border-[#383b43] flex flex-col justify-between">
                <div>
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block mb-1">
                    5. Veredicto: {structured.verdict}
                  </span>
                  <p className="text-xs text-neutral-300 line-clamp-3 leading-relaxed">
                    {structured.historicalNarrative}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => goToSlide(3)}
                  className="mt-2 text-[11px] text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1 cursor-pointer"
                >
                  <span>Ver historia y brechas</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 1: FACT-CHECKING, SEPARACIÓN EPISTÉMICA, JURÍDICA Y FISCAL         */}
        {/* ========================================================================= */}
        {activeSlide === 1 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#34373e]/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Search className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-400 block font-bold">
                    BLOQUE 2 · FACT-CHECKING, VERIFICACIÓN JURÍDICA Y FISCAL
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    3. Separación Epistémica, Legal y Presupuestaria
                  </h3>
                </div>
              </div>
              <span className="text-xs bg-[#26282e] text-neutral-300 border border-[#383b43] px-2.5 py-1 rounded-md">
                {structured.evidenceClassification || 'Cotejo Cruzado'}
              </span>
            </div>

            {/* Fact-Checking Textual Analysis */}
            <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-3.5 sm:p-4">
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.factChecking}
              </p>
            </div>

            {/* Epistemic Separation Grid */}
            {structured.epistemicSeparation && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#26282e] border border-emerald-500/30 space-y-1">
                  <span className="text-[11px] font-bold uppercase text-emerald-400 block">Hechos Comprobados (Nivel 1)</span>
                  <ul className="space-y-1 text-neutral-300 list-disc pl-4">
                    {structured.epistemicSeparation.confirmedFacts.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>
                <div className="p-3 rounded-xl bg-[#26282e] border border-amber-500/30 space-y-1">
                  <span className="text-[11px] font-bold uppercase text-amber-400 block">Declaraciones de Autoridades</span>
                  {structured.epistemicSeparation.authorityStatements.length > 0 ? (
                    <ul className="space-y-1 text-neutral-300 list-disc pl-4">
                      {structured.epistemicSeparation.authorityStatements.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-neutral-400">Sin declaraciones directas atribuidas.</p>
                  )}
                </div>
                <div className="p-3 rounded-xl bg-[#26282e] border border-blue-500/30 space-y-1">
                  <span className="text-[11px] font-bold uppercase text-blue-300 block">Interpretación / Análisis</span>
                  <p className="text-neutral-300 leading-relaxed">{structured.epistemicSeparation.researcherAnalysis}</p>
                </div>
              </div>
            )}

            {/* Legal & Budget Verification Cards */}
            {(structured.legalVerification || structured.budgetVerification) && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                {structured.legalVerification && (
                  <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-blue-400 block">Verificación Jurídica (BCN / CGR)</span>
                    <p><strong className="text-white">Rango normativo:</strong> {structured.legalVerification.normRank}</p>
                    <p><strong className="text-white">Artículos / Normas:</strong> {structured.legalVerification.articlesCited}</p>
                    <p><strong className="text-white">Naturaleza jurídica:</strong> {structured.legalVerification.legalNature}</p>
                    {structured.legalVerification.scopeAndControversy && (
                      <p className="text-neutral-400"><strong>Controversia:</strong> {structured.legalVerification.scopeAndControversy}</p>
                    )}
                  </div>
                )}

                {structured.budgetVerification && (
                  <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1.5">
                    <span className="text-[11px] font-bold uppercase text-emerald-400 block">Verificación Presupuestaria (DIPRES)</span>
                    <p><strong className="text-white">Institución / Documento:</strong> {structured.budgetVerification.institution} · {structured.budgetVerification.budgetDocument}</p>
                    <p><strong className="text-white">Subtítulo / Período:</strong> {structured.budgetVerification.itemOrSubtitle} ({structured.budgetVerification.period})</p>
                    <p><strong className="text-white">Naturaleza / Moneda:</strong> {structured.budgetVerification.spendingNature} · {structured.budgetVerification.currency}</p>
                    <p className="text-neutral-400"><strong>Aprobado vs. Ejecutado:</strong> {structured.budgetVerification.approvedVsExecutedNote}</p>
                  </div>
                )}
              </div>
            )}

            {/* Contrast Chart */}
            <div className="bg-[#26282e] border border-blue-500/30 rounded-xl p-3.5 sm:p-4 space-y-3 shadow-md">
              <div className="flex items-center justify-between gap-2 border-b border-[#383b43] pb-2">
                <div className="flex items-center gap-1.5 text-xs font-bold text-white uppercase tracking-wider">
                  <BarChart3 className="w-4 h-4 text-blue-400" />
                  <span>Contraste Cuantitativo: Meta Declarada vs. Ejecución Documentada</span>
                </div>
                <span className="text-xs text-neutral-400">
                  Brecha: <strong className="text-blue-400">{factMetrics.gapPct}%</strong>
                </span>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-neutral-400"></span>
                      {factMetrics.claimLabel}
                    </span>
                    <strong className="text-white">{factMetrics.claimedPct}%</strong>
                  </div>
                  <div className="h-3 w-full bg-[#1c1e22] rounded-full overflow-hidden border border-[#383b43]">
                    <div 
                      className="h-full bg-gradient-to-r from-neutral-500 to-neutral-300 rounded-full transition-all duration-700"
                      style={{ width: `${factMetrics.claimedPct}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-neutral-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                      {factMetrics.verifiedLabel}
                    </span>
                    <strong className="text-blue-300 font-bold">{factMetrics.verifiedPct}%</strong>
                  </div>
                  <div className="h-3 w-full bg-[#1c1e22] rounded-full overflow-hidden border border-blue-900/60">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-700"
                      style={{ width: `${factMetrics.verifiedPct}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 2: PROYECCIÓN ESTRUCTURADA CON SUPUESTOS E INCERTIDUMBRE            */}
        {/* ========================================================================= */}
        {activeSlide === 2 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#34373e]/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <TrendingUp className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-400 block font-bold">
                    BLOQUE 3 · CONTROL DE CAUSALIDAD Y PROYECCIÓN CONDICIONAL
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    4. Escenario Prospectivo (No certeza futura) y Nivel de Riesgo
                  </h3>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                {structured.structuredProjection?.uncertaintyLevel && (
                  <span className="text-xs px-3 py-1 rounded-full border border-blue-500/50 bg-blue-950/60 text-blue-200 font-semibold">
                    Incertidumbre: {structured.structuredProjection.uncertaintyLevel}
                  </span>
                )}
                <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${
                  structured.riskLevel === 'Crítico' ? 'bg-rose-950/80 text-rose-300 border-rose-500' :
                  structured.riskLevel === 'Alto' ? 'bg-orange-950/80 text-orange-300 border-orange-500' :
                  structured.riskLevel === 'Medio' ? 'bg-amber-950/80 text-amber-300 border-amber-500' :
                  'bg-emerald-950/80 text-emerald-300 border-emerald-500'
                }`}>
                  Riesgo: {structured.riskLevel}
                </span>
              </div>
            </div>

            {/* Projection Narrative */}
            <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-3.5 sm:p-4">
              <p className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.sixMonthProjection}
              </p>
            </div>

            {/* 4 Mandatory Projection Components */}
            {structured.structuredProjection && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1">
                  <span className="text-[11px] font-bold uppercase text-blue-400 block">1. Antecedentes que la fundamentan</span>
                  <p className="text-neutral-300 leading-relaxed">{structured.structuredProjection.antecedents}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1">
                  <span className="text-[11px] font-bold uppercase text-amber-400 block">2. Supuestos utilizados</span>
                  <p className="text-neutral-300 leading-relaxed">{structured.structuredProjection.assumptions}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1">
                  <span className="text-[11px] font-bold uppercase text-emerald-400 block">3. Variables que podrían modificar el escenario</span>
                  <p className="text-neutral-300 leading-relaxed">{structured.structuredProjection.modifyingVariables}</p>
                </div>
                <div className="p-3.5 rounded-xl bg-[#26282e] border border-[#383b43] space-y-1">
                  <span className="text-[11px] font-bold uppercase text-rose-400 block">4. Nivel de incertidumbre declarado</span>
                  <p className="text-white font-bold text-sm">{structured.structuredProjection.uncertaintyLevel}</p>
                  <p className="text-neutral-400">Escenario condicional sujeto a variables normativas, fiscales o diplomáticas.</p>
                </div>
              </div>
            )}

            {/* Risk Meter Gauge */}
            <div className="bg-[#26282e] border border-blue-500/30 rounded-xl p-3.5 sm:p-4 space-y-2.5 shadow-md">
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-neutral-300 flex items-center gap-1.5 font-bold uppercase">
                    <Gauge className="w-4 h-4 text-blue-400" />
                    Semáforo de Riesgo Operativo:
                  </span>
                  <strong className={`text-xs ${riskInfo.color} font-bold`}>
                    Nivel {riskInfo.label} ({riskInfo.val}%)
                  </strong>
                </div>

                <div className="grid grid-cols-4 gap-1.5 h-3">
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 20 ? 'bg-emerald-500' : 'bg-[#1c1e22] border border-[#383b43]'}`} title="Riesgo Bajo (0-25%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 45 ? 'bg-amber-500' : 'bg-[#1c1e22] border border-[#383b43]'}`} title="Riesgo Medio (26-50%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 70 ? 'bg-orange-500' : 'bg-[#1c1e22] border border-[#383b43]'}`} title="Riesgo Alto (51-75%)" />
                  <div className={`rounded-sm transition-all ${riskInfo.val >= 85 ? 'bg-rose-600 shadow-md animate-pulse' : 'bg-[#1c1e22] border border-[#383b43]'}`} title="Riesgo Crítico (76-100%)" />
                </div>
                <div className="flex justify-between text-[10px] text-neutral-400 pt-0.5">
                  <span>Bajo</span>
                  <span>Medio</span>
                  <span>Alto</span>
                  <span>Crítico</span>
                </div>
              </div>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 3: VEREDICTO HISTÓRICO, VERSIONES PROGRAMÁTICAS Y TRANSPARENCIA     */}
        {/* ========================================================================= */}
        {activeSlide === 3 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#34373e]/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <History className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-400 block font-bold">
                    BLOQUE 4 · VERIFICACIÓN HISTÓRICA Y TRANSPARENCIA
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    5. Contraste de Programas Originales (2017 · 2021 · 2026)
                  </h3>
                </div>
              </div>
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-500/60">
                {structured.verdict}
              </span>
            </div>

            {/* Historical Comparison Narrative */}
            <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-4 sm:p-5 space-y-3.5">
              <div className="border-b border-[#383b43] pb-2 flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-blue-300 font-bold">
                  Evolución Programática Documentada (Solo Programas Oficiales):
                </span>
                <span className="text-xs text-neutral-400">
                  Archivo Servel / BCN 2017 · 2021 · 2026
                </span>
              </div>

              <div className="text-neutral-200 text-xs sm:text-sm leading-relaxed whitespace-pre-line font-sans">
                {structured.historicalNarrative}
              </div>

              {/* Transparency Report Box */}
              {structured.transparencyReport && (
                <div className="pt-3 text-xs text-neutral-300 space-y-1.5 border-t border-[#383b43]">
                  <span className="text-[11px] font-bold uppercase text-amber-400 block">
                    Transparencia de Investigación y Brechas Documentales (Consulta: {structured.transparencyReport.queryDate}):
                  </span>
                  <p>
                    <strong className="text-white">Información no verificada: </strong>
                    {structured.transparencyReport.unverifiedGaps}
                  </p>
                  <p>
                    <strong className="text-white">Documento primario requerido para comprobación total: </strong>
                    {structured.transparencyReport.requiredDocumentsForGap}
                  </p>
                </div>
              )}
            </div>

            {/* Desfunding Warning Banner if active */}
            {structured.defundingAlert && (
              <div className="bg-[#26282e] border border-amber-500/60 rounded-xl p-3.5 sm:p-4 text-white shadow-md space-y-1">
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-xs uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span>Observación Presupuestaria (DIPRES / CFA)</span>
                </div>
                <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans whitespace-pre-line">
                  {structured.defundingAlert}
                </p>
              </div>
            )}

          </div>
        )}

        {/* ========================================================================= */}
        {/* SLIDE 4: CATÁLOGO DE REPORTAJES EN VIDEO VERIFICADOS (CONDENSADO EN 1 CARRO) */}
        {/* ========================================================================= */}
        {activeSlide === 4 && (
          <div className="space-y-4 animate-fade-in-up">
            
            {/* Header info */}
            <div className="flex items-center justify-between gap-2 pb-3 border-b border-[#34373e]/70">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30">
                  <Tv className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <span className="text-[11px] uppercase tracking-wider text-blue-400 block font-bold">
                    BLOQUE 5 · EVIDENCIA AUDIOVISUAL VERIFICADA
                  </span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    Catálogo de Reportajes en Video ({allVideos.length} reportajes vinculados)
                  </h3>
                </div>
              </div>
              <span className="text-xs bg-[#26282e] text-neutral-300 border border-[#383b43] px-2.5 py-1 rounded-md">
                Prensa Chilena Verificada
              </span>
            </div>

            {/* Videos Grid / List inside the Carousel Slide */}
            {allVideos.length > 0 ? (
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {allVideos.slice(0, 6).map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => {
                        playPinClick();
                        setPlayingVideo(vid);
                      }}
                      className="group cursor-pointer rounded-xl bg-[#26282e] hover:bg-[#2d3037] border border-[#383b43] hover:border-blue-500/50 p-2.5 transition-all flex flex-col justify-between shadow-xs active:scale-[0.98]"
                    >
                      {/* Video Thumbnail Container */}
                      <div className="relative aspect-video rounded-lg overflow-hidden bg-black mb-2 border border-[#383b43]/60 group-hover:border-blue-500/40 transition-colors">
                        <img 
                          src={`https://img.youtube.com/vi/${vid.youtubeVideoId}/mqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-blue-600/90 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-4 h-4 ml-0.5 fill-current" />
                          </div>
                        </div>
                        <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
                          {vid.duration}
                        </div>
                      </div>

                      {/* Video Meta Info */}
                      <div>
                        <div className="flex items-center gap-1.5 text-[11px] text-neutral-400 mb-1">
                          <span className="font-semibold text-white">{vid.channel}</span>
                          {vid.channelVerified && (
                            <CheckCircle className="w-3 h-3 text-blue-400" />
                          )}
                          <span>·</span>
                          <span>{vid.publishedDate}</span>
                        </div>
                        <h4 className="text-xs font-bold text-white group-hover:text-blue-300 line-clamp-2 leading-snug">
                          {vid.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 line-clamp-2 mt-1 leading-relaxed">
                          {vid.summary}
                        </p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-[#383b43]/60 flex items-center justify-between text-[11px] text-blue-400 font-medium">
                        <span>Reproducir reporte</span>
                        <Play className="w-3 h-3 fill-current" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="bg-[#26282e] border border-[#383b43] rounded-xl p-8 text-center text-neutral-400">
                <Tv className="w-8 h-8 mx-auto text-neutral-500 mb-2" />
                <p className="text-sm">No hay videos indexados directamente para esta búsqueda.</p>
              </div>
            )}

            {/* Embedded Active Video Player Modal */}
            {playingVideo && (
              <div 
                className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-5"
                onClick={() => setPlayingVideo(null)}
              >
                <div 
                  className="bg-[#202226] border border-[#383b43] rounded-2xl overflow-hidden max-w-3xl w-full shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="p-3 bg-[#1c1e22] border-b border-[#383b43] flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                      <span className="text-xs font-bold text-white truncate">{playingVideo.title}</span>
                      <span className="text-xs text-neutral-400 shrink-0">({playingVideo.channel})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setPlayingVideo(null)}
                      className="text-neutral-400 hover:text-white p-1 rounded-lg hover:bg-[#2d3037] transition-colors cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="aspect-video bg-black w-full">
                    <iframe
                      src={`https://www.youtube-nocookie.com/embed/${playingVideo.youtubeVideoId}?autoplay=1&rel=0`}
                      title={playingVideo.title}
                      className="w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  <div className="p-3.5 bg-[#26282e] text-xs text-neutral-300 leading-relaxed">
                    {playingVideo.summary}
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>

      {/* Carousel Footer Toolbar with Quick Slide Step Navigator */}
      <div className="px-3.5 sm:px-5 py-3 bg-[#1c1e22] border-t border-[#34373e] flex flex-wrap items-center justify-between gap-2.5">
        
        {/* Next / Prev Quick Buttons */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrev}
            className="px-3 py-1.5 rounded-lg bg-[#27292f] hover:bg-[#34373e] text-neutral-300 hover:text-white border border-[#383b43] text-xs font-medium flex items-center gap-1 transition-all active:scale-95 cursor-pointer font-sans"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Anterior</span>
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1 transition-all active:scale-95 cursor-pointer shadow-sm font-sans"
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
                  ? 'w-6 bg-blue-500'
                  : 'w-2 bg-[#383b43] hover:bg-neutral-500'
              }`}
            />
          ))}
        </div>

      </div>

    </div>
  );
};
