import React, { useState } from 'react';
import { 
  AuditorStructuredData, 
  EvidenceClassification,
  NewsVideoReport 
} from '../types';
import { 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  HelpCircle, 
  FileText, 
  ShieldCheck, 
  ChevronDown, 
  ChevronUp, 
  Layers, 
  Tv, 
  ArrowRight, 
  Play, 
  BarChart3, 
  BookOpen, 
  Scale, 
  Sparkles,
  Calendar,
  Ban
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface CitizenAuditViewProps {
  structured: AuditorStructuredData;
  query?: string;
  onSwitchToAuditorMode?: () => void;
  newsVideos?: NewsVideoReport[];
  verifiedSourcesCount?: number;
  onOpenRepository?: () => void;
}

export type CitizenEvaluationStatus = 
  | 'Evidencia suficiente' 
  | 'Evidencia parcial' 
  | 'Información contradictoria' 
  | 'Evidencia insuficiente' 
  | 'Pendiente de actualización';

export function getEvidenceClassificationMeta(classification?: EvidenceClassification): {
  label: EvidenceClassification;
  badgeClass: string;
  description: string;
} {
  switch (classification) {
    case 'CONFIRMADA':
      return {
        label: 'CONFIRMADA',
        badgeClass: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300',
        description: 'Existe documentación primaria oficial (Nivel 1) que demuestra directamente la afirmación.'
      };
    case 'PARCIALMENTE CONFIRMADA':
      return {
        label: 'PARCIALMENTE CONFIRMADA',
        badgeClass: 'bg-amber-950/80 border-amber-500/60 text-amber-300',
        description: 'Existe evidencia documental de una parte de la afirmación, pero persisten brechas o condicionantes.'
      };
    case 'CONTRADICHA':
      return {
        label: 'CONTRADICHA',
        badgeClass: 'bg-rose-950/80 border-rose-500/60 text-rose-300',
        description: 'Existe documentación verificable (CGR, DIPRES o Congreso) que refuta o invalida la afirmación.'
      };
    case 'DESACTUALIZADA':
      return {
        label: 'DESACTUALIZADA',
        badgeClass: 'bg-slate-900 border-slate-500/60 text-slate-300',
        description: 'La información correspondió a otro período o versión programática, pero no refleja el estado vigente.'
      };
    case 'NO VERIFICADA':
    default:
      return {
        label: 'NO VERIFICADA',
        badgeClass: 'bg-orange-950/80 border-orange-500/60 text-orange-300',
        description: 'No se encontró evidencia suficiente para confirmar o refutar; ausencia de evidencia no equivale a inexistencia.'
      };
  }
}

export function mapToCitizenStatus(status?: string, verdict?: string, classification?: EvidenceClassification): {
  label: CitizenEvaluationStatus;
  color: string;
  badgeBg: string;
  icon: React.ReactNode;
  simpleExplanation: string;
} {
  if (classification === 'NO VERIFICADA' || status === 'SIN_DATOS' || status === 'SIN DATOS') {
    return {
      label: 'Evidencia insuficiente',
      color: 'text-orange-400',
      badgeBg: 'bg-orange-950/70 border-orange-500/60 text-orange-300',
      icon: <HelpCircle className="w-4 h-4 text-orange-400 shrink-0" />,
      simpleExplanation: 'Documento no localizado; existencia y contenido no verificados con respaldo primario suficiente.'
    };
  }

  if (classification === 'CONTRADICHA' || (verdict || '').toUpperCase().includes('CONTRADIC') || status === 'BLOQUEADA' || status === 'INCUMPLIDA') {
    return {
      label: 'Información contradictoria',
      color: 'text-rose-400',
      badgeBg: 'bg-rose-950/70 border-rose-500/60 text-rose-300',
      icon: <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />,
      simpleExplanation: 'Existen discrepancias verificadas entre la promesa o anuncio y los dictámenes jurídicos, balances DIPRES o trámite legislativo.'
    };
  }

  if (classification === 'CONFIRMADA' || status === 'CUMPLIDA' || status === 'COMPLETO' || status === 'COMPLETA') {
    return {
      label: 'Evidencia suficiente',
      color: 'text-emerald-400',
      badgeBg: 'bg-emerald-950/70 border-emerald-500/60 text-emerald-300',
      icon: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
      simpleExplanation: 'Existen actos administrativos primarios (Diario Oficial, BCN, DIPRES) y trazabilidad documental verificada.'
    };
  }

  if (classification === 'DESACTUALIZADA') {
    return {
      label: 'Pendiente de actualización',
      color: 'text-slate-300',
      badgeBg: 'bg-slate-900 border-slate-600 text-slate-300',
      icon: <Clock className="w-4 h-4 text-slate-400 shrink-0" />,
      simpleExplanation: 'El antecedente citado corresponde a un período o versión programática anterior no vigente en junio de 2026.'
    };
  }

  return {
    label: 'Evidencia parcial',
    color: 'text-amber-400',
    badgeBg: 'bg-amber-950/70 border-amber-500/60 text-amber-300',
    icon: <Clock className="w-4 h-4 text-amber-400 shrink-0" />,
    simpleExplanation: 'Existe evidencia documental de una parte de la medida, con aspectos financieros, legales o reglamentarios aún pendientes.'
  };
}

export const CitizenAuditView: React.FC<CitizenAuditViewProps> = ({
  structured,
  query,
  onSwitchToAuditorMode,
  newsVideos = [],
  verifiedSourcesCount = 12,
  onOpenRepository
}) => {
  const [openAccordions, setOpenAccordions] = useState<{ [key: string]: boolean }>({
    documents: false,
    methodology: false,
    history: false,
    calculations: false,
    videos: false
  });

  const [selectedVideo, setSelectedVideo] = useState<NewsVideoReport | null>(null);

  const toggleAccordion = (key: string) => {
    playPinClick();
    setOpenAccordions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const derivedClassification: EvidenceClassification = structured.evidenceClassification || (
    structured.status === 'CUMPLIDA' ? 'CONFIRMADA' :
    structured.status === 'BLOQUEADA' || structured.status === 'INCUMPLIDA' ? 'CONTRADICHA' :
    structured.status === 'SIN_DATOS' ? 'NO VERIFICADA' : 'PARCIALMENTE CONFIRMADA'
  );

  const classMeta = getEvidenceClassificationMeta(derivedClassification);
  const statusInfo = mapToCitizenStatus(structured.status, structured.verdict, derivedClassification);
  const allVideos = (structured.newsVideos && structured.newsVideos.length > 0)
    ? structured.newsVideos
    : newsVideos;

  const investigatedQuestion = (query && query.trim()) || structured.theme || "Evaluación verificada de compromisos 2026";
  const queryDateLabel = structured.transparencyReport?.queryDate || "19 jun 2026";

  const documentedActions = structured.evidence || "Documento no localizado; existencia y contenido no verificados.";
  const backingEvidence = structured.epistemicSeparation?.confirmedFacts && structured.epistemicSeparation.confirmedFacts.length > 0
    ? structured.epistemicSeparation.confirmedFacts.join(' · ')
    : (structured.factChecking || "Sin evidencia primaria suficiente para confirmar o refutar.");
  const pendingInfo = structured.transparencyReport?.unverifiedGaps
    ? `${structured.transparencyReport.unverifiedGaps}${structured.transparencyReport.requiredDocumentsForGap ? ` (Documento necesario: ${structured.transparencyReport.requiredDocumentsForGap})` : ''}`
    : (structured.status === 'CUMPLIDA'
      ? "Cierre reglamentario ejecutado; sujeto a evaluación de impacto posterior."
      : "Requiere publicación de informe de ejecución DIPRES o resolución legislativa definitiva.");
  const detectedContradictions = structured.defundingAlert || (structured.verdict === 'CONTRADICTORIO'
    ? "Discrepancia verificada entre anuncios programáticos y dictámenes de legalidad o restricción fiscal."
    : "Sin contradicciones adicionales detectadas fuera de las brechas documentales señaladas.");

  return (
    <div className="space-y-4 font-sans text-neutral-200">
      
      {/* ========================================================================= */}
      {/* NIVEL 1: RESUMEN CIUDADANO Y CLASIFICACIÓN DE EVIDENCIA                   */}
      {/* ========================================================================= */}
      <section className="bg-[#26282e] border border-[#383b43] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        
        <div className="border-b border-[#383b43] pb-3 space-y-2">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-500/30 px-2.5 py-0.5 rounded-md">
                Nivel 1 · Resumen Ciudadano
              </span>
              <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-md border ${classMeta.badgeClass}`}>
                Evidencia: {classMeta.label}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-neutral-400">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span>Consulta: {queryDateLabel}</span>
              </span>
              <span className="text-neutral-600">·</span>
              <span className="flex items-center gap-1 text-neutral-300">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <strong>{verifiedSourcesCount}</strong> fuentes verificadas
              </span>
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-xs text-neutral-400 block font-medium">
              Materia auditada:
            </span>
            <h2 className="text-base sm:text-lg font-bold text-white tracking-tight leading-snug">
              {investigatedQuestion}
            </h2>
          </div>
        </div>

        {/* Evaluation Status Banner */}
        <div className={`p-3.5 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${statusInfo.badgeBg}`}>
          <div className="flex items-start sm:items-center gap-2.5">
            {statusInfo.icon}
            <div>
              <div className="text-xs text-neutral-300 uppercase tracking-wider font-semibold">
                Clasificación: {classMeta.label}
              </div>
              <div className="text-base font-extrabold text-white">
                {statusInfo.label}
              </div>
            </div>
          </div>

          <div className="text-xs text-neutral-300 sm:text-right max-w-md font-normal leading-relaxed">
            {classMeta.description}
          </div>
        </div>

        {/* Plain Language Main Conclusion */}
        <div className="bg-[#202226] border border-[#34373e] p-3.5 sm:p-4 rounded-xl space-y-1.5">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-300 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>Síntesis verificable (sin inferencias no documentadas)</span>
          </span>
          <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed font-sans">
            {structured.epistemicSeparation?.researcherAnalysis || structured.historicalNarrative || structured.evidence}
          </p>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* NIVEL 2: EVIDENCIAS, CONTROL DE CAUSALIDAD Y TRANSPARENCIA                */}
      {/* ========================================================================= */}
      <section className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3.5">
        <div className="flex items-center justify-between pb-2 border-b border-[#34373e] flex-wrap gap-2">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Nivel 2 · Evidencias y Control de Causalidad
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            Jerarquía Nivel 1 (Oficial) → Nivel 2 (Prensa/Estudios) → Nivel 3 (Declaraciones)
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          
          {/* 1. Promesa original */}
          <div className="bg-[#26282e] border border-[#383b43] p-3.5 rounded-xl space-y-1.5">
            <span className="text-[11px] font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500"></span>
              1. Compromiso o afirmación evaluada
            </span>
            <p className="text-xs text-neutral-200 leading-relaxed italic bg-[#202226] p-2.5 rounded-lg border-l-2 border-blue-500">
              "{structured.promise2026}"
            </p>
          </div>

          {/* 2. Documentos primarios verificados */}
          <div className="bg-[#26282e] border border-[#383b43] p-3.5 rounded-xl space-y-1.5">
            <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              2. Documentación primaria citada (Nivel 1)
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {documentedActions}
            </p>
          </div>

          {/* 3. Hechos comprobados vs Declaraciones */}
          <div className="bg-[#26282e] border border-[#383b43] p-3.5 rounded-xl space-y-1.5">
            <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400"></span>
              3. Hechos comprobados vs. Declaraciones
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {backingEvidence}
            </p>
            {structured.epistemicSeparation?.authorityStatements && structured.epistemicSeparation.authorityStatements.length > 0 && (
              <p className="text-[11px] text-neutral-400 border-t border-[#34373e] pt-1.5 mt-1.5">
                <strong className="text-neutral-200">Declaración de autoridad (Nivel 3): </strong>
                {structured.epistemicSeparation.authorityStatements[0]}
              </p>
            )}
          </div>

          {/* 4. Brechas de verificación / Transparencia */}
          <div className="bg-[#26282e] border border-[#383b43] p-3.5 rounded-xl space-y-1.5">
            <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              4. Brechas de verificación y documentos necesarios
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {pendingInfo}
            </p>
          </div>

          {/* 5. Alerta Fiscal / Contradicciones */}
          <div className="bg-[#26282e] border border-[#383b43] p-3.5 rounded-xl space-y-1.5 md:col-span-2">
            <span className="text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400"></span>
              5. Verificación presupuestaria y consistencia jurídica
            </span>
            <p className="text-xs text-neutral-300 leading-relaxed">
              {detectedContradictions}
            </p>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* NIVEL 3: ANÁLISIS AVANZADO (Acordeones dinámicos sin datos fijos)         */}
      {/* ========================================================================= */}
      <section className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-3">
        <div className="flex items-center justify-between pb-2 border-b border-[#34373e]">
          <div className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-white">
              Nivel 3 · Verificación Documental, Jurídica y Presupuestaria
            </h3>
          </div>
          <span className="text-xs text-neutral-400">
            Haz clic para desplegar cada verificación
          </span>
        </div>

        {/* Accordion 1: Documentos originales verificados dinámicamente */}
        <div className="border border-[#383b43] rounded-xl overflow-hidden bg-[#26282e]">
          <button
            type="button"
            onClick={() => toggleAccordion('documents')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2c2e35] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Verificación documental y jurídica específica de esta consulta
              </span>
            </div>
            {openAccordions.documents ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openAccordions.documents && (
            <div className="p-4 pt-2 border-t border-[#383b43] space-y-3 text-xs text-neutral-300 bg-[#202226]">
              {derivedClassification === 'NO VERIFICADA' ? (
                <div className="p-3 rounded-lg bg-orange-950/40 border border-orange-500/40 text-orange-200 flex items-start gap-2">
                  <Ban className="w-4 h-4 text-orange-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-orange-300">Documento no localizado; existencia y contenido no verificados.</strong>
                    <span className="text-neutral-300 block mt-1">
                      Conforme a la regla de integridad periodística, no se muestran decretos, dictámenes ni oficios de otras materias.
                    </span>
                  </div>
                </div>
              ) : null}

              <div className="space-y-2 pl-3 border-l-2 border-blue-500/60">
                <div>
                  <strong className="text-white block">Respaldo documental identificado:</strong>
                  <span className="text-neutral-300">{structured.evidence}</span>
                </div>

                {structured.legalVerification && (
                  <div className="pt-2 border-t border-[#34373e] space-y-1">
                    <strong className="text-blue-300 block">Verificación Jurídica (BCN / CGR):</strong>
                    <p><strong className="text-neutral-200">Rango normativo:</strong> {structured.legalVerification.normRank}</p>
                    <p><strong className="text-neutral-200">Normas/artículos citados:</strong> {structured.legalVerification.articlesCited}</p>
                    <p><strong className="text-neutral-200">Naturaleza jurídica:</strong> {structured.legalVerification.legalNature}</p>
                    {structured.legalVerification.scopeAndControversy && (
                      <p><strong className="text-neutral-200">Alcance y controversia:</strong> {structured.legalVerification.scopeAndControversy}</p>
                    )}
                  </div>
                )}

                {structured.transparencyReport?.documentVerificationNotes && (
                  <p className="text-[11px] text-neutral-400 pt-1">
                    <strong>Nota de trazabilidad ({queryDateLabel}):</strong> {structured.transparencyReport.documentVerificationNotes}
                  </p>
                )}
              </div>

              {onOpenRepository && (
                <button
                  type="button"
                  onClick={onOpenRepository}
                  className="mt-2 text-blue-400 hover:text-blue-300 font-semibold inline-flex items-center gap-1 cursor-pointer"
                >
                  <span>Consultar repositorio documental completo</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>

        {/* Accordion 2: Metodología y Principio Rector */}
        <div className="border border-[#383b43] rounded-xl overflow-hidden bg-[#26282e]">
          <button
            type="button"
            onClick={() => toggleAccordion('methodology')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2c2e35] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Protocolo de verificación, jerarquía de fuentes y principio rector
              </span>
            </div>
            {openAccordions.methodology ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openAccordions.methodology && (
            <div className="p-4 pt-2 border-t border-[#383b43] space-y-2 text-xs text-neutral-300 bg-[#202226]">
              <p>
                <strong className="text-white">Jerarquía de fuentes:</strong> Nivel 1 (Diario Oficial, BCN/Ley Chile, CGR, DIPRES, Hacienda, SUBDERE, Congreso y documentos oficiales) prevalece siempre sobre Nivel 2 (prensa nacional y centros de estudio) y Nivel 3 (declaraciones y redes sociales).
              </p>
              <p>
                <strong className="text-white">Principio rector:</strong> Es preferible una auditoría incompleta pero verificable que una auditoría exhaustiva construida sobre antecedentes no comprobados. Ningún número de decreto, ley o dictamen es supuesto o reconstruido.
              </p>
            </div>
          )}
        </div>

        {/* Accordion 3: Comparación histórica (2017, 2021, 2026) */}
        <div className="border border-[#383b43] rounded-xl overflow-hidden bg-[#26282e]">
          <button
            type="button"
            onClick={() => toggleAccordion('history')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2c2e35] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <Scale className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Verificación histórica y programática (Programas 2017 · 2021 · 2026)
              </span>
            </div>
            {openAccordions.history ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openAccordions.history && (
            <div className="p-4 pt-2 border-t border-[#383b43] space-y-2 text-xs text-neutral-300 bg-[#202226]">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-300 uppercase">
                  Veredicto histórico: {structured.verdict}
                </span>
              </div>
              <p className="leading-relaxed">
                {structured.historicalNarrative}
              </p>
            </div>
          )}
        </div>

        {/* Accordion 4: Verificación presupuestaria y proyección estructurada */}
        <div className="border border-[#383b43] rounded-xl overflow-hidden bg-[#26282e]">
          <button
            type="button"
            onClick={() => toggleAccordion('calculations')}
            className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2c2e35] transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-4 h-4 text-blue-400" />
              <span className="text-xs sm:text-sm font-bold text-white">
                Verificación presupuestaria (DIPRES) y proyección con nivel de incertidumbre
              </span>
            </div>
            {openAccordions.calculations ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
          </button>

          {openAccordions.calculations && (
            <div className="p-4 pt-2 border-t border-[#383b43] space-y-3 text-xs text-neutral-300 bg-[#202226]">
              {structured.budgetVerification && (
                <div className="bg-[#26282e] p-3 rounded-lg border border-[#383b43] space-y-1">
                  <span className="text-blue-300 font-bold block text-[11px] uppercase">Cotejo Presupuestario (Subtítulo / Ejecución):</span>
                  <p><strong className="text-white">Institución / Documento:</strong> {structured.budgetVerification.institution} · {structured.budgetVerification.budgetDocument}</p>
                  <p><strong className="text-white">Subtítulo / Ítem:</strong> {structured.budgetVerification.itemOrSubtitle} ({structured.budgetVerification.period})</p>
                  <p><strong className="text-white">Naturaleza del gasto:</strong> {structured.budgetVerification.spendingNature} · <strong className="text-white">Moneda:</strong> {structured.budgetVerification.currency}</p>
                  <p className="text-neutral-300"><strong className="text-white">Aprobado vs. Ejecutado:</strong> {structured.budgetVerification.approvedVsExecutedNote}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="bg-[#26282e] p-3 rounded-lg border border-[#383b43] space-y-1">
                  <span className="text-neutral-400 block text-[11px]">Proyección Condicional (Incertidumbre: {structured.structuredProjection?.uncertaintyLevel || 'Medio'}):</span>
                  <span className={`text-sm font-bold block ${structured.riskLevel === 'Crítico' ? 'text-rose-400' : structured.riskLevel === 'Alto' ? 'text-orange-400' : structured.riskLevel === 'Medio' ? 'text-amber-400' : 'text-emerald-400'}`}>
                    Riesgo {structured.riskLevel}
                  </span>
                  {structured.structuredProjection ? (
                    <div className="text-[11px] text-neutral-300 space-y-1 pt-1">
                      <p><strong>Antecedentes:</strong> {structured.structuredProjection.antecedents}</p>
                      <p><strong>Supuestos:</strong> {structured.structuredProjection.assumptions}</p>
                      <p><strong>Variables modificadoras:</strong> {structured.structuredProjection.modifyingVariables}</p>
                    </div>
                  ) : (
                    <p className="text-[11px] text-neutral-400 mt-1">{structured.sixMonthProjection}</p>
                  )}
                </div>
                <div className="bg-[#26282e] p-3 rounded-lg border border-[#383b43]">
                  <span className="text-neutral-400 block text-[11px] mb-1">Evaluación de Riesgo Fiscal:</span>
                  <span className={`text-sm font-bold ${structured.hasDefundingRisk ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {structured.hasDefundingRisk ? 'Advertencia Activa (CFA / DIPRES)' : 'Sin desfinanciamiento directo'}
                  </span>
                  <p className="text-[11px] text-neutral-400 mt-1 leading-relaxed">
                    {structured.defundingAlert || 'Sin variaciones presupuestarias adicionales registradas.'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Accordion 5: Catálogo de videos de investigación periodística */}
        {allVideos.length > 0 && (
          <div className="border border-[#383b43] rounded-xl overflow-hidden bg-[#26282e]">
            <button
              type="button"
              onClick={() => toggleAccordion('videos')}
              className="w-full p-3.5 flex items-center justify-between text-left hover:bg-[#2c2e35] transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <Tv className="w-4 h-4 text-blue-400" />
                <span className="text-xs sm:text-sm font-bold text-white">
                  Reportajes periodísticos vinculados ({allVideos.length} videos)
                </span>
              </div>
              {openAccordions.videos ? <ChevronUp className="w-4 h-4 text-neutral-400" /> : <ChevronDown className="w-4 h-4 text-neutral-400" />}
            </button>

            {openAccordions.videos && (
              <div className="p-4 pt-2 border-t border-[#383b43] space-y-3 bg-[#202226]">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allVideos.slice(0, 4).map((vid) => (
                    <div
                      key={vid.id}
                      onClick={() => {
                        playPinClick();
                        setSelectedVideo(vid);
                      }}
                      className="p-2.5 rounded-lg bg-[#26282e] hover:bg-[#2d3037] border border-[#383b43] hover:border-blue-500/50 cursor-pointer flex gap-3 group transition-all"
                    >
                      <div className="relative w-24 h-16 rounded-md overflow-hidden bg-black shrink-0">
                        <img
                          src={`https://img.youtube.com/vi/${vid.youtubeVideoId}/mqdefault.jpg`}
                          alt={vid.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <Play className="w-4 h-4 text-white fill-current" />
                        </div>
                      </div>
                      <div className="min-w-0 flex flex-col justify-between">
                        <span className="text-[11px] font-bold text-white line-clamp-2 leading-snug group-hover:text-blue-300">
                          {vid.title}
                        </span>
                        <div className="text-[10px] text-neutral-400 flex items-center justify-between mt-1">
                          <span>{vid.channel}</span>
                          <span>{vid.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

      </section>

      {/* Switch to Auditor Mode CTA */}
      {onSwitchToAuditorMode && (
        <div className="text-center pt-2">
          <button
            type="button"
            onClick={() => {
              playPaperSlide();
              onSwitchToAuditorMode();
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#202226] hover:bg-[#282a30] border border-[#34373e] hover:border-blue-500 text-xs font-semibold text-neutral-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <span>¿Deseas profundizar técnicamente? Cambiar a <strong>Modo Auditor</strong></span>
            <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
          </button>
        </div>
      )}

      {/* Video Modal Player */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in-scale"
          onClick={() => setSelectedVideo(null)}
        >
          <div 
            className="bg-[#202226] border border-[#34373e] rounded-2xl max-w-2xl w-full overflow-hidden shadow-2xl space-y-3 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#34373e] pb-2">
              <h4 className="text-sm font-bold text-white line-clamp-1">
                {selectedVideo.title}
              </h4>
              <button 
                onClick={() => setSelectedVideo(null)}
                className="text-neutral-400 hover:text-white p-1 rounded-md cursor-pointer"
              >
                ✕
              </button>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-black">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeVideoId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <p className="text-xs text-neutral-300">
              {selectedVideo.summary}
            </p>
          </div>
        </div>
      )}

    </div>
  );
};
