import React, { useState } from 'react';
import { X, Search, ExternalLink, ShieldCheck, Database, FileText, CheckCircle2, Share2, BookOpen, Globe, Check, Download, Code, Layers, Bot } from 'lucide-react';
import { DataUpdate, VerifiedSource } from '../types';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface ModalsProps {
  activeModal: 'metodologia' | 'repositorio' | 'fuentes' | 'acerca' | 'share' | 'wordpress' | 'docDetail' | null;
  selectedDoc: DataUpdate | null;
  selectedSource: VerifiedSource | null;
  allDocs: DataUpdate[];
  allSources: VerifiedSource[];
  onClose: () => void;
  onSelectDocAndAudit: (doc: DataUpdate) => void;
}

export const Modals: React.FC<ModalsProps> = ({
  activeModal,
  selectedDoc,
  selectedSource: _selectedSource,
  allDocs,
  allSources,
  onClose,
  onSelectDocAndAudit,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('todos');
  const [sourcesFilter, setSourcesFilter] = useState<'all' | 'official' | 'google'>('all');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedShortcode, setCopiedShortcode] = useState(false);
  const [copiedEmbed, setCopiedEmbed] = useState(false);
  const [wpThemeMode, setWpThemeMode] = useState<'dark' | 'light'>('light');

  const handleClose = () => {
    playPaperSlide();
    onClose();
  };

  const handleAuditDoc = (doc: DataUpdate) => {
    playPinClick();
    onSelectDocAndAudit(doc);
  };

  if (!activeModal) return null;

  const shortcodeSnippet = wpThemeMode === 'light'
    ? '[coherencia_auditor theme="light" width="wide"]'
    : '[coherencia_auditor theme="dark" width="wide"]';

  const currentOrigin = typeof window !== 'undefined' ? window.location.origin : '';
  const currentHref = typeof window !== 'undefined' ? window.location.href : '';

  const iframeEmbedSnippet = `<!-- Bloque HTML Autónomo COHERENCIA v2.0 (Compatible con Gutenberg, Elementor, Divi, Astra, GeneratePress) -->
<div class="coherencia-wp-embed" style="width:100%;max-width:1280px;margin:1.5rem auto;border-radius:24px;overflow:hidden;border:1.5px solid #cfd7e2;box-shadow:0 16px 36px rgba(66,82,102,0.12);background:#f5f8fc;">
  <iframe src="${currentOrigin}" title="COHERENCIA - El Auditor Gubernamental 2026" style="width:100%;height:920px;border:0;display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy"></iframe>
</div>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-[#363d47]/45 dark:bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl wii-surface rounded-[28px] overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col text-[#363d47] dark:text-slate-100 animate-fade-in-scale">

        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-[#cfd7e2] dark:border-[#2d3848] flex items-center justify-between bg-gradient-to-b from-white to-[#eef3f8] dark:from-[#1e2633] dark:to-[#161c26]">
          <div className="flex items-center gap-2.5 min-w-0">
            {activeModal === 'metodologia' && <ShieldCheck className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'repositorio' && <Database className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'fuentes' && <CheckCircle2 className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'acerca' && <BookOpen className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'share' && <Share2 className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'wordpress' && <Layers className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}
            {activeModal === 'docDetail' && <FileText className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />}

            <h3 className="font-extrabold text-[#363d47] dark:text-slate-100 text-sm sm:text-base font-sans truncate">
              {activeModal === 'metodologia' && 'Metodología y Principios Éticos'}
              {activeModal === 'repositorio' && 'Repositorio de Vectores y Documentos'}
              {activeModal === 'fuentes' && 'Fuentes Oficiales y Respaldo Google Search'}
              {activeModal === 'acerca' && 'Acerca de COHERENC.IA'}
              {activeModal === 'share' && 'Compartir y Exportar Auditoría'}
              {activeModal === 'wordpress' && 'Traspaso a WordPress y Compatibilidad con Temas (v2.0)'}
              {activeModal === 'docDetail' && (selectedDoc?.title || 'Detalle del Documento')}
            </h3>
          </div>

          <button
            onClick={handleClose}
            className="w-10 h-10 rounded-full wii-pill-btn flex items-center justify-center cursor-pointer shrink-0 active:scale-95"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 text-[#434c59] dark:text-slate-300" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-[#4b5461] dark:text-slate-300 leading-relaxed bg-[#f4f7fa] dark:bg-[#121720] font-sans">

          {/* Metodología */}
          {activeModal === 'metodologia' && (
            <div className="space-y-4">
              <div className="p-4 wii-card rounded-2xl text-[#3d4652] dark:text-slate-200">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <p className="font-bold text-[#363d47] dark:text-slate-100 font-sans">Protocolo Obligatorio de Verificación y Fact-Checking</p>
                  <span className="text-[10px] font-mono font-bold bg-[#ebf8ff] dark:bg-sky-950/60 text-[#0369a1] dark:text-sky-300 px-2.5 py-0.5 rounded-full border border-[#7dd3fc] dark:border-sky-700/60 shrink-0">
                    11 MAR 2026 – 19 JUN 2026
                  </span>
                </div>
                <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                  <strong className="text-[#363d47] dark:text-slate-100 font-sans">Principio Rector:</strong> Es preferible una auditoría incompleta pero verificable que una auditoría exhaustiva construida sobre antecedentes no comprobados. Nunca se inventan, completan, reconstruyen o suponen números de decretos, dictámenes, leyes, oficios o cifras presupuestarias.
                </p>
              </div>

              <div className="space-y-3">
                <div className="wii-card rounded-2xl p-4">
                  <h4 className="font-bold text-[#0088c7] dark:text-[#38bdf8] text-xs uppercase tracking-wider mb-1 font-sans">
                    1. Jerarquía Estricta de Fuentes (Nivel 1 → Nivel 2 → Nivel 3)
                  </h4>
                  <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                    <strong>Nivel 1 (Primarias Oficiales):</strong> Diario Oficial, BCN (Ley Chile), Contraloría General, DIPRES, Min. Hacienda, SUBDERE, Ministerios/GOREs, Congreso y documentos oficiales. <strong>Nivel 2 (Secundarias):</strong> Prensa nacional con estándares periodísticos, BCCh, INE y centros académicos. <strong>Nivel 3 (Complementarias):</strong> Declaraciones públicas y RRSS (nunca sustituyen documentos oficiales).
                  </p>
                </div>

                <div className="wii-card rounded-2xl p-4">
                  <h4 className="font-bold text-[#0088c7] dark:text-[#38bdf8] text-xs uppercase tracking-wider mb-1 font-sans">
                    2. Clasificación Exclusiva de Evidencia (5 Categorías)
                  </h4>
                  <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                    Toda afirmación se clasifica exclusivamente como: <strong>CONFIRMADA</strong>, <strong>PARCIALMENTE CONFIRMADA</strong>, <strong>NO VERIFICADA</strong>, <strong>CONTRADICHA</strong> o <strong>DESACTUALIZADA</strong>. La ausencia de evidencia no se confunde con evidencia de inexistencia; si un documento no se localiza, se declara expresamente <em>"Documento no localizado; existencia y contenido no verificados"</em>.
                  </p>
                </div>

                <div className="wii-card rounded-2xl p-4">
                  <h4 className="font-bold text-[#0088c7] dark:text-[#38bdf8] text-xs uppercase tracking-wider mb-1 font-sans">
                    3. Verificación Presupuestaria (DIPRES) y Jurídica (BCN / CGR)
                  </h4>
                  <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                    Las cifras económicas identifican institución, documento presupuestario, subtítulo/ítem, período, moneda y distinción entre presupuesto aprobado, vigente y ejecución efectiva (separando ahorro efectivo, contención, redistribución o sobrecosto). Las normas distinguen entre LOC, quórum calificado, ley ordinaria y pronunciamientos CGR.
                  </p>
                </div>

                <div className="wii-card rounded-2xl p-4">
                  <h4 className="font-bold text-[#0088c7] dark:text-[#38bdf8] text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-sans">
                    <Globe className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
                    <span>4. Control de Causalidad, Proyecciones y Búsqueda Exhaustiva</span>
                  </h4>
                  <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                    Se separan hechos comprobados, declaraciones de autoridades, interpretaciones periodísticas y análisis. Toda proyección declara antecedentes, supuestos, variables modificadoras y nivel de incertidumbre, y las comparaciones históricas (2017 · 2021 · 2026) contrastan únicamente programas oficiales originales identificando año y versión.
                  </p>
                </div>

                <div className="wii-card rounded-2xl p-4 border border-[#7dd3fc] dark:border-sky-700/60">
                  <h4 className="font-bold text-[#0088c7] dark:text-[#38bdf8] text-xs uppercase tracking-wider mb-1 font-sans">
                    5. Protocolo de Falla y Validación de Fuentes (Reglas A–E)
                  </h4>
                  <ul className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans space-y-1 list-disc pl-4">
                    <li><strong>A. Pertinencia documental:</strong> Una ley no sustituye un dictamen, un portal institucional general no equivale a un informe numerado y un portal electoral no sustituye un programa oficial.</li>
                    <li><strong>B. Prueba de existencia (5 pasos):</strong> Verificación en vivo de identificador (Senado/BCN XML), fecha válida, organismo emisor, acceso al texto original y respaldo específico; si falla cualquier paso, se clasifica como <strong>NO VERIFICADA</strong>.</li>
                    <li><strong>C. Extractos documentales:</strong> Prohibidas las comillas textuales sin acceso original; se distingue explícitamente entre <em>Cita textual</em>, <em>Paráfrasis</em>, <em>Resumen documental</em> e <em>Interpretación propia</em>.</li>
                    <li><strong>D. Manejo de errores de API:</strong> Ante fallos HTTP 429/500/503 o indisponibilidad del modelo, nunca se simula una respuesta de IA ni se presenta el índice local como verificado; se identifica expresamente como <strong>Recuperación Documental</strong> y se reconoce la incertidumbre.</li>
                    <li><strong>E. Cero relleno artificial:</strong> Respuesta acotada exclusivamente a lo consultado, sin agregar decretos, cifras ni conclusiones no solicitadas.</li>
                  </ul>
                  <p className="text-xs text-[#363d47] dark:text-slate-100 font-semibold mt-2 pt-2 border-t border-[#d8dfe8] dark:border-[#2a3444]">
                    Principio Rector: La recuperación de un documento no equivale a su verificación.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Repositorio */}
          {activeModal === 'repositorio' && (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5 font-sans">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8] absolute left-3.5 top-3 sm:top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar decretos, discursos, informes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 sm:py-2 text-xs bg-white dark:bg-[#0f141d] border-[1.5px] border-[#c7d0dc] dark:border-[#344256] rounded-full text-[#363d47] dark:text-slate-100 placeholder-[#828d9c] dark:placeholder-slate-400 focus:outline-hidden focus:border-[#32b8f2] shadow-[inset_0_2px_4px_rgba(66,82,102,0.05)] dark:shadow-none"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="min-h-[40px] text-xs bg-white dark:bg-[#0f141d] border-[1.5px] border-[#c7d0dc] dark:border-[#344256] rounded-full px-4 py-2 text-[#363d47] dark:text-slate-100 focus:outline-hidden focus:border-[#32b8f2] font-medium"
                >
                  <option value="todos">Todos los tipos</option>
                  <option value="Decreto">Decretos</option>
                  <option value="Discurso">Discursos</option>
                  <option value="Informe">Informes</option>
                  <option value="Ley">Leyes</option>
                </select>
              </div>

              {/* Document items */}
              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {allDocs
                  .filter((d) => {
                    const matchSearch = d.title.toLowerCase().includes(searchTerm.toLowerCase()) || d.summary.toLowerCase().includes(searchTerm.toLowerCase());
                    const matchType = typeFilter === 'todos' || d.type === typeFilter;
                    return matchSearch && matchType;
                  })
                  .map((doc) => (
                    <div
                      key={doc.id}
                      className="p-3.5 rounded-2xl wii-card flex flex-col sm:flex-row sm:items-start justify-between gap-3 group"
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="inline-block bg-[#ebf8ff] dark:bg-sky-950/60 text-[#0369a1] dark:text-sky-300 border border-[#7dd3fc] dark:border-sky-700/60 text-[10px] font-bold px-2.5 py-0.5 rounded-full font-mono">
                            {doc.type}
                          </span>
                          <span className="text-xs font-bold text-[#363d47] dark:text-slate-100 group-hover:text-[#0088c7] dark:group-hover:text-[#38bdf8] transition-colors">
                            {doc.title}
                          </span>
                          <span className="text-[11px] text-[#667180] dark:text-slate-400">· {doc.date}</span>
                        </div>
                        <p className="text-xs text-[#4b5461] dark:text-slate-300">{doc.summary}</p>
                        {doc.entity && (
                          <p className="text-[10px] text-[#0088c7] dark:text-[#38bdf8] font-semibold mt-1">{doc.entity}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-start">
                        {doc.link && doc.link.startsWith('http') && (
                          <a
                            href={doc.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-semibold wii-pill-btn px-3 py-1.5 rounded-full flex items-center gap-1"
                            title={doc.link}
                          >
                            <span>Abrir documento</span>
                            <ExternalLink className="w-3 h-3 text-[#009ee3] dark:text-[#38bdf8]" />
                          </a>
                        )}
                        <button
                          onClick={() => {
                            onClose();
                            onSelectDocAndAudit(doc);
                          }}
                          className="shrink-0 text-xs font-bold wii-cyan-btn px-4 py-1.5 rounded-full cursor-pointer active:scale-95"
                        >
                          Auditar
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Fuentes Verificadas */}
          {activeModal === 'fuentes' && (
            <div className="space-y-3 font-sans">
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2.5 border-b border-[#d8dfe8] dark:border-[#2a3444]">
                <p className="text-xs text-[#5d6876] dark:text-slate-400 font-medium">
                  Fuentes oficiales indexadas y respaldo Google Search:
                </p>
                <div className="flex items-center gap-1.5 bg-white dark:bg-[#1a2230] p-1 rounded-full border border-[#cfd7e2] dark:border-[#2f3b4d] text-xs shadow-xs">
                  <button
                    onClick={() => setSourcesFilter('all')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      sourcesFilter === 'all' ? 'wii-cyan-btn' : 'text-[#515b69] dark:text-slate-300 hover:text-[#0095d9] dark:hover:text-[#38bdf8]'
                    }`}
                  >
                    Todas ({allSources.length})
                  </button>
                  <button
                    onClick={() => setSourcesFilter('official')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                      sourcesFilter === 'official' ? 'wii-cyan-btn' : 'text-[#515b69] dark:text-slate-300 hover:text-[#0095d9] dark:hover:text-[#38bdf8]'
                    }`}
                  >
                    Oficiales
                  </button>
                  <button
                    onClick={() => setSourcesFilter('google')}
                    className={`px-3 py-1 rounded-full text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      sourcesFilter === 'google' ? 'wii-cyan-btn' : 'text-[#515b69] dark:text-slate-300 hover:text-[#0095d9] dark:hover:text-[#38bdf8]'
                    }`}
                  >
                    <Globe className="w-3 h-3" />
                    <span>Google Search</span>
                  </button>
                </div>
              </div>

              <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1">
                {allSources
                  .filter((s) => {
                    const isGoogle = s.isGoogleSearchSource || s.verificationTier === 'GOOGLE_SEARCH_GROUNDING';
                    if (sourcesFilter === 'official') return !isGoogle;
                    if (sourcesFilter === 'google') return isGoogle;
                    return true;
                  })
                  .map((s) => {
                    const isGoogle = s.isGoogleSearchSource || s.verificationTier === 'GOOGLE_SEARCH_GROUNDING';
                    const score = s.confidenceScore ?? 95;
                    const level = s.sourceHierarchyLevel ?? (isGoogle ? 2 : 1);
                    const levelLabel = s.sourceHierarchyLabel || (level === 1 ? 'Nivel 1 · Primaria Oficial' : level === 2 ? 'Nivel 2 · Secundaria Confiable' : 'Nivel 3 · Complementaria');
                    const levelCls = level === 1
                      ? 'bg-[#ecfdf5] dark:bg-emerald-950/60 border-[#6ee7b7] dark:border-emerald-700/60 text-[#047857] dark:text-emerald-300'
                      : level === 2
                      ? 'bg-[#ebf8ff] dark:bg-sky-950/60 border-[#7dd3fc] dark:border-sky-700/60 text-[#0369a1] dark:text-sky-300'
                      : 'bg-[#fffbeb] dark:bg-amber-950/60 border-[#fcd34d] dark:border-amber-700/60 text-[#b45309] dark:text-amber-300';

                    return (
                      <div
                        key={s.id}
                        className="p-3.5 rounded-2xl wii-card flex items-center justify-between gap-3"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-[#0088c7] dark:text-[#38bdf8] font-mono">
                              {s.refNumber}
                            </span>
                            <span className="text-xs font-bold text-[#363d47] dark:text-slate-100 truncate font-sans">{s.name}</span>
                            <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border font-semibold flex items-center gap-1 ${levelCls}`}>
                              {isGoogle && <Globe className="w-2.5 h-2.5" />}
                              <span>{score}% · {levelLabel}</span>
                            </span>
                          </div>
                          <p className="text-xs text-[#4b5461] dark:text-slate-300 mt-1">{s.detail}</p>
                          {s.verifiedDate && (
                            <p className="text-[10px] text-[#667180] dark:text-slate-400 mt-1">Consulta / verificación: {s.verifiedDate}</p>
                          )}
                        </div>

                        {s.url && s.url.startsWith('http') && s.url !== '#' ? (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="shrink-0 w-9 h-9 rounded-full wii-pill-btn flex items-center justify-center"
                            title={`Abrir documento de ${s.name}`}
                          >
                            <ExternalLink className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8]" />
                          </a>
                        ) : (
                          <span className="shrink-0 text-[10px] text-[#5d6876] dark:text-slate-300 font-sans bg-[#eef3f8] dark:bg-slate-800 px-2.5 py-1 rounded-full border border-[#cfd7e2] dark:border-slate-600">
                            Registro interno
                          </span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Acerca de */}
          {activeModal === 'acerca' && (
            <div className="space-y-3.5 font-sans">
              <div className="flex items-center gap-3.5 p-4 wii-card rounded-2xl">
                <div className="w-12 h-12 rounded-2xl wii-cyan-btn p-0.5 shrink-0 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="font-extrabold text-[#363d47] dark:text-slate-100 text-base">
                    COHERENC<span className="text-[#009ee3] dark:text-[#38bdf8]">.IA</span> <span className="text-[#667180] dark:text-slate-400 text-xs font-normal">v2.6</span>
                  </h4>
                  <p className="text-xs text-[#5d6876] dark:text-slate-400">Sistema de auditoría ciudadana y fact-checking gubernamental automatizado</p>
                </div>
              </div>

              <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                <strong className="text-[#363d47] dark:text-slate-100">COHERENC<span className="text-[#009ee3] dark:text-[#38bdf8]">.IA</span></strong> es un observatorio digital impulsado por IA para auditar de forma transparente el cumplimiento de compromisos y decretos en los primeros 100 días de mandato presidencial, investigando minuciosamente el período entre el <strong className="text-[#363d47] dark:text-slate-100">11 de Marzo de 2026</strong> y el <strong className="text-[#363d47] dark:text-slate-100">19 de Junio de 2026</strong>, con capacidades de búsqueda en vivo con Google Search.
              </p>

              <div className="text-xs text-[#5d6876] dark:text-slate-400 border-t border-[#d8dfe8] dark:border-[#2a3444] pt-3 space-y-1">
                <p><strong className="text-[#363d47] dark:text-slate-200">Período investigado:</strong> 11 de Marzo de 2026 – 19 de Junio de 2026 (100 días de gobierno).</p>
                <p><strong className="text-[#363d47] dark:text-slate-200">Diseñado para:</strong> Periodismo de datos, análisis de políticas públicas y auditoría ciudadana abierta.</p>
              </div>
            </div>
          )}

          {/* Compartir o Traspaso a WordPress */}
          {(activeModal === 'share' || activeModal === 'wordpress') && (
            <div className="space-y-4 font-sans">
              {activeModal === 'share' && (
                <div>
                  <p className="text-xs text-[#4b5461] dark:text-slate-300 mb-2">
                    Comparte esta auditoría pública con enlaces directos al análisis prospectivo y las fuentes verificadas:
                  </p>

                  <div className="flex items-center gap-2 p-2 bg-white dark:bg-[#0f141d] border-[1.5px] border-[#cfd7e2] dark:border-[#344256] rounded-full shadow-xs">
                    <input
                      type="text"
                      readOnly
                      value={currentHref}
                      className="w-full bg-transparent text-xs text-[#363d47] dark:text-slate-200 focus:outline-hidden pl-3 font-mono"
                    />
                    <button
                      onClick={() => {
                        if (navigator.clipboard && currentHref) {
                          navigator.clipboard.writeText(currentHref).catch(() => {});
                        }
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="px-4 py-1.5 wii-cyan-btn text-xs font-bold rounded-full flex items-center gap-1 shrink-0 cursor-pointer active:scale-95"
                    >
                      {copiedLink ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-white" />
                          <span>¡Copiado!</span>
                        </>
                      ) : (
                        <span>Copiar</span>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* WordPress Compatibility Banner */}
              <div className="p-4 wii-card rounded-2xl">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-[#363d47] dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8]" />
                    <span>Arquitectura WordPress v2.0 · Compatible con todos los Temas</span>
                  </span>
                  <span className="text-[10px] font-mono bg-[#ebf8ff] dark:bg-sky-950/60 text-[#0369a1] dark:text-sky-300 px-2.5 py-0.5 rounded-full border border-[#7dd3fc] dark:border-sky-700/60 font-semibold">
                    WP 6.0 – 6.7 · FSE & Clásicos
                  </span>
                </div>
                <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">
                  El traspaso a WordPress ha sido actualizado con el motor <strong className="text-[#0369a1] dark:text-[#38bdf8]">EL AUDITOR 2026</strong> (chat con fuentes verificables, jerarquía Nivel 1-2-3, Google Search Grounding y registros audiovisuales). Puedes integrarlo en <strong className="text-[#363d47] dark:text-slate-100">cualquier tema existente de WordPress</strong> mediante el Plugin Universal o instalar el Tema Completo v2.0.
                </p>
              </div>

              {/* Option 1: Universal Plugin */}
              <div className="p-4 wii-card rounded-2xl space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-[#ebf8ff] dark:bg-sky-950/60 text-[#0369a1] dark:text-sky-300 px-2.5 py-0.5 rounded-full border border-[#7dd3fc] dark:border-sky-700/60 font-semibold">
                        Opción 1 · Recomendado para Temas Existentes
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#363d47] dark:text-slate-100 mt-1">
                      Plugin Universal WordPress (coherencia-plugin.zip)
                    </h4>
                    <p className="text-xs text-[#5d6876] dark:text-slate-400 mt-0.5 leading-relaxed font-sans">
                      100% compatible con Astra, GeneratePress, Kadence, Hello Elementor, Divi, OceanWP, Twenty Twenty-Four y Twenty Twenty-Five. Encapsula estilos con <code>.coherencia-wp-scope</code> sin alterar las cabeceras ni menús de tu tema activo.
                    </p>
                  </div>
                  <a
                    id="btn-download-wp-plugin"
                    href="/coherencia-plugin.zip"
                    download="coherencia-plugin.zip"
                    className="shrink-0 px-4 py-2 wii-cyan-btn text-xs font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Plugin (.zip)</span>
                  </a>
                </div>
                <div className="text-[11px] text-[#4b5461] dark:text-slate-300 bg-[#eef3f8] dark:bg-[#17202d] rounded-xl px-3 py-2 border border-[#cfd7e2] dark:border-[#2d3848]">
                  Instalación: WP Admin → Plugins → Añadir nuevo → Subir plugin → Usa el bloque Gutenberg <strong>"COHERENCIA · El Auditor"</strong> o el shortcode <strong>[coherencia_auditor]</strong>
                </div>
              </div>

              {/* Option 2: Full Theme */}
              <div className="p-4 wii-card rounded-2xl space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-[#eef3f8] dark:bg-slate-800 text-[#4b5461] dark:text-slate-300 px-2.5 py-0.5 rounded-full border border-[#cfd7e2] dark:border-slate-600 font-semibold">
                        Opción 2 · Tema Dedicado + Full Site Editing
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-[#363d47] dark:text-slate-100 mt-1">
                      Tema WordPress Completo v2.0 (coherencia-theme.zip)
                    </h4>
                    <p className="text-xs text-[#5d6876] dark:text-slate-400 mt-0.5 leading-relaxed font-sans">
                      Incluye <code>theme.json</code> (Gutenberg / Block Themes), jerarquía completa (<code>front-page.php</code>, <code>page.php</code>, <code>single.php</code>, <code>index.php</code>), soporte para menús nativos y panel en <em>Ajustes → COHERENCIA IA</em>.
                    </p>
                  </div>
                  <a
                    id="btn-download-wp-theme"
                    href="/coherencia-theme.zip"
                    download="coherencia-theme.zip"
                    className="shrink-0 px-4 py-2 wii-pill-btn text-xs font-bold rounded-full flex items-center justify-center gap-1.5 cursor-pointer active:scale-95"
                  >
                    <Download className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
                    <span>Descargar Tema (.zip)</span>
                  </a>
                </div>
              </div>

              {/* Option 3: Shortcode & HTML Embed */}
              <div className="p-4 wii-card rounded-2xl space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8]" />
                    <h4 className="text-xs font-bold text-[#363d47] dark:text-slate-100 uppercase tracking-wider">
                      Shortcode e Inserción Directa en Temas (Gutenberg / Elementor / Divi)
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 bg-[#eef3f8] dark:bg-[#1a2230] p-1 rounded-full border border-[#cfd7e2] dark:border-[#2f3b4d] text-xs">
                    <button
                      type="button"
                      onClick={() => setWpThemeMode('dark')}
                      className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                        wpThemeMode === 'dark' ? 'wii-cyan-btn' : 'text-[#515b69] dark:text-slate-300 hover:text-[#0095d9] dark:hover:text-[#38bdf8]'
                      }`}
                    >
                      Modo Oscuro
                    </button>
                    <button
                      type="button"
                      onClick={() => setWpThemeMode('light')}
                      className={`px-3 py-1 rounded-full font-semibold transition-all cursor-pointer ${
                        wpThemeMode === 'light' ? 'wii-cyan-btn' : 'text-[#515b69] dark:text-slate-300 hover:text-[#0095d9] dark:hover:text-[#38bdf8]'
                      }`}
                    >
                      Modo Claro
                    </button>
                  </div>
                </div>

                {/* Shortcode Box */}
                <div className="space-y-1">
                  <span className="text-[11px] text-[#5d6876] dark:text-slate-400 block">
                    1. Shortcode para cualquier tema o constructor de páginas:
                  </span>
                  <div className="flex items-center gap-2 p-2 bg-[#eef3f8] dark:bg-[#0f141d] border border-[#cfd7e2] dark:border-[#344256] rounded-full">
                    <code className="text-xs text-[#0369a1] dark:text-[#38bdf8] font-mono font-semibold flex-1 pl-3">{shortcodeSnippet}</code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(shortcodeSnippet);
                        setCopiedShortcode(true);
                        setTimeout(() => setCopiedShortcode(false), 2000);
                      }}
                      className="px-3.5 py-1 wii-pill-btn text-xs font-semibold rounded-full cursor-pointer active:scale-95"
                    >
                      {copiedShortcode ? '¡Shortcode copiado!' : 'Copiar Shortcode'}
                    </button>
                  </div>
                </div>

                {/* Custom HTML Block */}
                <div className="space-y-1">
                  <span className="text-[11px] text-[#5d6876] dark:text-slate-400 block">
                    2. Bloque HTML Autónomo (Pegar en bloque "HTML Personalizado" de WordPress sin instalar archivos):
                  </span>
                  <div className="flex items-center gap-2 p-2 bg-[#eef3f8] dark:bg-[#0f141d] border border-[#cfd7e2] dark:border-[#344256] rounded-full">
                    <input
                      type="text"
                      readOnly
                      value={iframeEmbedSnippet}
                      className="w-full bg-transparent text-[11px] font-mono text-[#4b5461] dark:text-slate-300 focus:outline-hidden pl-3"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(iframeEmbedSnippet);
                        setCopiedEmbed(true);
                        setTimeout(() => setCopiedEmbed(false), 2000);
                      }}
                      className="shrink-0 px-3.5 py-1 wii-pill-btn text-xs font-semibold rounded-full cursor-pointer active:scale-95"
                    >
                      {copiedEmbed ? '¡HTML copiado!' : 'Copiar Bloque HTML'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Detalle Documento */}
          {activeModal === 'docDetail' && selectedDoc && (
            <div className="space-y-3.5 font-sans">
              <div className="flex items-center gap-2">
                <span className="bg-[#ebf8ff] dark:bg-sky-950/60 text-[#0369a1] dark:text-sky-300 border border-[#7dd3fc] dark:border-sky-700/60 text-xs font-bold px-3 py-0.5 rounded-full font-mono">
                  {selectedDoc.type}
                </span>
                <span className="text-xs text-[#667180] dark:text-slate-400">{selectedDoc.date}</span>
              </div>

              <p className="text-sm font-bold text-[#363d47] dark:text-slate-100 font-sans">{selectedDoc.title}</p>
              <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed font-sans">{selectedDoc.summary}</p>
              {selectedDoc.entity && (
                <p className="text-xs text-[#5d6876] dark:text-slate-400"><strong className="text-[#363d47] dark:text-slate-200">Organismo emisor:</strong> {selectedDoc.entity}</p>
              )}

              <div className="pt-3 border-t border-[#d8dfe8] dark:border-[#2a3444] flex flex-wrap justify-end gap-2">
                {selectedDoc.link && selectedDoc.link.startsWith('http') && (
                  <a
                    href={selectedDoc.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 wii-pill-btn text-xs font-semibold rounded-full flex items-center gap-1.5"
                    title={selectedDoc.link}
                  >
                    <span>Abrir documento</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
                  </a>
                )}
                <button
                  onClick={() => {
                    handleClose();
                    handleAuditDoc(selectedDoc);
                  }}
                  className="px-5 py-2 wii-cyan-btn text-xs font-bold rounded-full cursor-pointer active:scale-95"
                >
                  Generar Auditoría de Coherencia con IA
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
