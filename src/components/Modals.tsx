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
  const [wpThemeMode, setWpThemeMode] = useState<'dark' | 'light'>('dark');

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
<div class="coherencia-wp-embed" style="width:100%;max-width:1280px;margin:1.5rem auto;border-radius:16px;overflow:hidden;border:1px solid #ef4444;box-shadow:0 20px 25px -5px rgba(0,0,0,0.5);background:#000000;">
  <iframe src="${currentOrigin}" title="COHERENCIA - El Auditor Gubernamental 2026" style="width:100%;height:920px;border:0;display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" loading="lazy"></iframe>
</div>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2.5 sm:p-4 bg-black/92 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-neutral-950 rounded-2xl shadow-2xl border border-red-900/80 overflow-hidden max-h-[92vh] sm:max-h-[88vh] flex flex-col text-neutral-100 animate-fade-in-scale">
        
        {/* Modal Header */}
        <div className="px-4 sm:px-6 py-3.5 sm:py-4 border-b border-red-950 flex items-center justify-between bg-black/95">
          <div className="flex items-center gap-2.5 min-w-0">
            {activeModal === 'metodologia' && <ShieldCheck className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'repositorio' && <Database className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'fuentes' && <CheckCircle2 className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'acerca' && <BookOpen className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'share' && <Share2 className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'wordpress' && <Layers className="w-5 h-5 text-red-400 shrink-0" />}
            {activeModal === 'docDetail' && <FileText className="w-5 h-5 text-red-400 shrink-0" />}

            <h3 className="font-bold text-white text-sm sm:text-base font-mono truncate">
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
            className="text-neutral-400 hover:text-white p-2 min-w-[44px] min-h-[44px] rounded-xl hover:bg-neutral-900 flex items-center justify-center transition-colors cursor-pointer shrink-0 active:scale-95"
            aria-label="Cerrar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-4 text-sm text-neutral-300 leading-relaxed bg-black">
          
          {/* Metodología */}
          {activeModal === 'metodologia' && (
            <div className="space-y-4">
              <div className="p-4 bg-neutral-950 rounded-xl border border-red-900/80 text-neutral-200">
                <div className="flex items-center justify-between gap-2 mb-1">
                  <p className="font-bold text-white font-mono">Principio de Trazabilidad y Verificabilidad</p>
                  <span className="text-[10px] font-mono bg-black text-red-300 px-2 py-0.5 rounded border border-red-800 shrink-0">
                    11 MAR 2026 – 19 JUN 2026
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  <strong className="text-white font-mono">COHERENC<span className="text-red-500">.IA</span></strong> investiga exclusivamente el período comprendido entre el <strong className="text-white">11 de Marzo de 2026</strong> y el <strong className="text-white">19 de Junio de 2026</strong>, correspondiente a los primeros 100 días de mandato gubernamental en Chile. Aplica modelos de procesamiento de lenguaje natural y cotejo documental indexando fuentes oficiales primarias y secundarias con sello institucional, conectándose dinámicamente a <strong className="text-red-400 font-semibold">Google Search</strong> cuando se requiere respaldo documental complementario en la web.
                </p>
              </div>

              <div className="space-y-3">
                <div className="border border-red-950 rounded-xl p-3.5 bg-neutral-950/80">
                  <h4 className="font-bold text-red-400 text-xs uppercase tracking-wider mb-1 font-mono">
                    1. Ingesta Continua del Diario Oficial (11 mar – 19 jun 2026)
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Extracción automatizada de Decretos Supremos, Resoluciones Exentas y Leyes promulgadas durante los primeros 100 días de gobierno con categorización semántica por ministerio ejecutor.
                  </p>
                </div>

                <div className="border border-red-950 rounded-xl p-3.5 bg-neutral-950/80">
                  <h4 className="font-bold text-red-400 text-xs uppercase tracking-wider mb-1 flex items-center gap-1.5 font-mono">
                    <Globe className="w-3.5 h-3.5 text-red-400" />
                    <span>2. Conexión de Respaldo a Google Search Grounding</span>
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Si una consulta aborda temáticas no indexadas o requiere evidencia suplementaria en tiempo real, el chatbot invoca la herramienta de búsqueda web de Google para cotejar fuentes abiertas y corroborar la vigencia fáctica.
                  </p>
                </div>

                <div className="border border-red-950 rounded-xl p-3.5 bg-neutral-950/80">
                  <h4 className="font-bold text-red-400 text-xs uppercase tracking-wider mb-1 font-mono">
                    3. Cotejo de Coherencia Presupuestaria (DIPRES/Hacienda)
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    Cálculo prospectivo de viabilidad fiscal comparando metas programáticas contra balances estructurales de gasto público e informes financieros del Congreso Nacional en el período marzo-junio 2026.
                  </p>
                </div>

                <div className="border border-red-950 rounded-xl p-3.5 bg-neutral-950/80">
                  <h4 className="font-bold text-red-400 text-xs uppercase tracking-wider mb-1 font-mono">
                    4. Ética Algorítmica, Transmedia y Neutralidad
                  </h4>
                  <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                    El sistema no emite juicios de opinión política. Cada respuesta prospectiva de la IA exige citación explícita del vector de datos de origen con métrica de confianza cuantificada y contraste con los programas presidenciales 2017-2021.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Repositorio */}
          {activeModal === 'repositorio' && (
            <div className="space-y-4">
              {/* Search & Filter */}
              <div className="flex flex-col sm:flex-row gap-2.5 font-mono">
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-red-400 absolute left-3 top-3 sm:top-2.5" />
                  <input
                    type="text"
                    placeholder="Buscar decretos, discursos, informes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-9 pr-3 py-2.5 sm:py-2 text-base sm:text-xs bg-black border border-red-950 rounded-xl text-white placeholder-neutral-500 focus:outline-hidden focus:border-red-500"
                  />
                </div>
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="min-h-[40px] text-xs bg-black border border-red-950 rounded-xl px-3 py-2 text-neutral-200 focus:outline-hidden focus:border-red-500"
                >
                  <option value="todos" className="bg-black text-white">Todos los tipos</option>
                  <option value="Decreto" className="bg-black text-white">Decretos</option>
                  <option value="Discurso" className="bg-black text-white">Discursos</option>
                  <option value="Informe" className="bg-black text-white">Informes</option>
                  <option value="Ley" className="bg-black text-white">Leyes</option>
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
                      className="p-3.5 border border-red-950 rounded-xl hover:border-red-500/60 bg-neutral-950/80 hover:bg-neutral-900 transition-all flex items-start justify-between gap-3 group"
                    >
                      <div>
                        <div className="flex items-center gap-2 mb-1 flex-wrap">
                          <span className="inline-block bg-black text-red-300 border border-red-900 text-[10px] font-semibold px-2 py-0.5 rounded font-mono">
                            {doc.type}
                          </span>
                          <span className="text-xs font-bold text-white group-hover:text-red-300 transition-colors">
                            {doc.title}
                          </span>
                          <span className="text-[11px] text-neutral-400 font-mono">· {doc.date}</span>
                        </div>
                        <p className="text-xs text-neutral-300">{doc.summary}</p>
                        {doc.entity && (
                          <p className="text-[10px] text-red-400 mt-1 font-mono">{doc.entity}</p>
                        )}
                      </div>

                      <button
                        onClick={() => {
                          onClose();
                          onSelectDocAndAudit(doc);
                        }}
                        className="shrink-0 text-xs font-bold text-white bg-red-600 hover:bg-red-500 px-3 py-1.5 rounded-lg shadow-sm transition-all font-mono cursor-pointer"
                      >
                        Auditar
                      </button>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Fuentes Verificadas */}
          {activeModal === 'fuentes' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between gap-2 flex-wrap pb-2 border-b border-red-950 font-mono">
                <p className="text-xs text-neutral-400">
                  Fuentes oficiales indexadas y respaldo Google Search:
                </p>
                <div className="flex items-center gap-1 bg-black p-0.5 rounded-lg border border-red-950 text-xs">
                  <button
                    onClick={() => setSourcesFilter('all')}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      sourcesFilter === 'all' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Todas ({allSources.length})
                  </button>
                  <button
                    onClick={() => setSourcesFilter('official')}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                      sourcesFilter === 'official' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Oficiales
                  </button>
                  <button
                    onClick={() => setSourcesFilter('google')}
                    className={`px-2 py-0.5 rounded-md text-[11px] font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                      sourcesFilter === 'google' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
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
                    const statusText = s.verificationStatus || (isGoogle ? 'Google Search Grounding' : score >= 95 ? 'Primaria Estatal' : 'Validación Oficial');

                    return (
                      <div
                        key={s.id}
                        className="p-3.5 border rounded-xl flex items-center justify-between gap-3 transition-colors bg-neutral-950/80 border-red-950 hover:border-red-700"
                      >
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap font-mono">
                            <span className="text-xs font-bold text-red-400">
                              {s.refNumber}
                            </span>
                            <span className="text-xs font-bold text-white truncate font-sans">{s.name}</span>
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded-md border font-semibold flex items-center gap-1 bg-black border-red-800 text-red-300">
                              {isGoogle && <Globe className="w-2.5 h-2.5 text-red-400" />}
                              <span>{score}% · {statusText}</span>
                            </span>
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">{s.detail}</p>
                          {s.verifiedDate && (
                            <p className="text-[10px] text-red-400 font-mono mt-1">Verificación: {s.verifiedDate}</p>
                          )}
                        </div>

                        <a
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="shrink-0 text-xs text-neutral-400 hover:text-red-400 p-2 rounded-lg hover:bg-black transition-colors"
                          title="Ver enlace a fuente"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Acerca de */}
          {activeModal === 'acerca' && (
            <div className="space-y-3.5">
              <div className="flex items-center gap-3.5 p-3.5 bg-neutral-950 rounded-xl border border-red-950">
                <div className="w-12 h-12 rounded-xl bg-black border border-red-500/60 p-0.5 shrink-0 shadow-sm flex items-center justify-center text-red-400">
                  <Bot className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h4 className="font-bold text-white text-base font-mono">
                    COHERENC<span className="text-red-500">.IA</span> <span className="text-neutral-400 text-xs">v2.6</span>
                  </h4>
                  <p className="text-xs text-neutral-400 font-mono">Sistema de auditoría ciudadana y fact-checking gubernamental automatizado</p>
                </div>
              </div>

              <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                <strong className="text-white font-mono">COHERENC<span className="text-red-500">.IA</span></strong> es un observatorio digital impulsado por IA para auditar de forma transparente el cumplimiento de compromisos y decretos en los primeros 100 días de mandato presidencial, investigando minuciosamente el período entre el <strong className="text-white">11 de Marzo de 2026</strong> y el <strong className="text-white">19 de Junio de 2026</strong>, con capacidades de búsqueda en vivo con Google Search.
              </p>

              <div className="text-xs text-neutral-400 border-t border-red-950 pt-3 space-y-1 font-mono">
                <p><strong>Período investigado:</strong> 11 de Marzo de 2026 – 19 de Junio de 2026 (100 días de gobierno).</p>
                <p><strong>Diseñado para:</strong> Periodismo de datos, análisis de políticas públicas y auditoría ciudadana abierta.</p>
              </div>
            </div>
          )}

          {/* Compartir o Traspaso a WordPress */}
          {(activeModal === 'share' || activeModal === 'wordpress') && (
            <div className="space-y-4">
              {activeModal === 'share' && (
                <div>
                  <p className="text-xs text-neutral-300 mb-2">
                    Comparte esta auditoría pública con enlaces directos al análisis prospectivo y las fuentes verificadas:
                  </p>

                  <div className="flex items-center gap-2 p-2 bg-black border border-red-950 rounded-xl">
                    <input
                      type="text"
                      readOnly
                      value={currentHref}
                      className="w-full bg-transparent text-xs text-neutral-200 focus:outline-hidden pl-2 font-mono"
                    />
                    <button
                      onClick={() => {
                        if (navigator.clipboard && currentHref) {
                          navigator.clipboard.writeText(currentHref).catch(() => {});
                        }
                        setCopiedLink(true);
                        setTimeout(() => setCopiedLink(false), 2000);
                      }}
                      className="px-4 py-1.5 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-lg transition-all flex items-center gap-1 shrink-0 cursor-pointer font-mono"
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
              <div className="p-4 bg-black rounded-xl border border-red-950">
                <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
                  <span className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5 font-mono">
                    <ShieldCheck className="w-4 h-4 text-red-400" />
                    <span>Arquitectura WordPress v2.0 · Compatible con todos los Temas</span>
                  </span>
                  <span className="text-[10px] font-mono bg-black text-red-300 px-2 py-0.5 rounded border border-red-800">
                    WP 6.0 – 6.7 · FSE & Clásicos
                  </span>
                </div>
                <p className="text-xs text-neutral-300 leading-relaxed font-sans">
                  El traspaso a WordPress ha sido actualizado con el motor <strong className="text-red-400">EL AUDITOR 2026</strong> (análisis multipárrafo en 3 capas, 14 compromisos de los 100 días, Google Search Grounding y videos de fuentes verificadas). Puedes integrarlo en <strong className="text-white">cualquier tema existente de WordPress</strong> mediante el Plugin Universal o instalar el Tema Completo v2.0.
                </p>
              </div>

              {/* Option 1: Universal Plugin */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-red-950 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-black text-red-300 px-2 py-0.5 rounded border border-red-900 font-semibold">
                        Opción 1 · Recomendado para Temas Existentes
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Plugin Universal WordPress (coherencia-plugin.zip)
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed font-sans">
                      100% compatible con Astra, GeneratePress, Kadence, Hello Elementor, Divi, OceanWP, Twenty Twenty-Four y Twenty Twenty-Five. Encapsula estilos con <code>.coherencia-wp-scope</code> sin alterar las cabeceras ni menús de tu tema activo.
                    </p>
                  </div>
                  <a
                    id="btn-download-wp-plugin"
                    href="/coherencia-plugin.zip"
                    download="coherencia-plugin.zip"
                    className="shrink-0 px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 font-mono cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Descargar Plugin (.zip)</span>
                  </a>
                </div>
                <div className="text-[11px] text-neutral-400 bg-black rounded-lg px-3 py-2 border border-red-950 font-mono">
                  Instalación: WP Admin → Plugins → Añadir nuevo → Subir plugin → Usa el bloque Gutenberg <strong>"COHERENCIA · El Auditor"</strong> o el shortcode <strong>[coherencia_auditor]</strong>
                </div>
              </div>

              {/* Option 2: Full Theme */}
              <div className="p-4 bg-neutral-950 rounded-xl border border-red-950 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-mono uppercase bg-black text-neutral-300 px-2 py-0.5 rounded border border-red-950 font-semibold">
                        Opción 2 · Tema Dedicado + Full Site Editing
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-white mt-1">
                      Tema WordPress Completo v2.0 (coherencia-theme.zip)
                    </h4>
                    <p className="text-xs text-neutral-400 mt-0.5 leading-relaxed font-sans">
                      Incluye <code>theme.json</code> (Gutenberg / Block Themes), jerarquía completa (<code>front-page.php</code>, <code>page.php</code>, <code>single.php</code>, <code>index.php</code>), soporte para menús nativos y panel en <em>Ajustes → COHERENCIA IA</em>.
                    </p>
                  </div>
                  <a
                    id="btn-download-wp-theme"
                    href="/coherencia-theme.zip"
                    download="coherencia-theme.zip"
                    className="shrink-0 px-4 py-2 bg-black hover:bg-neutral-900 border border-red-900 text-white text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5 font-mono cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-red-400" />
                    <span>Descargar Tema (.zip)</span>
                  </a>
                </div>
              </div>

              {/* Option 3: Shortcode & HTML Embed */}
              <div className="p-4 bg-black rounded-xl border border-red-950 space-y-3">
                <div className="flex items-center justify-between gap-2 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <Code className="w-4 h-4 text-red-400" />
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                      Shortcode e Inserción Directa en Temas (Gutenberg / Elementor / Divi)
                    </h4>
                  </div>

                  <div className="flex items-center gap-1 bg-neutral-950 p-0.5 rounded-lg border border-red-950 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => setWpThemeMode('dark')}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                        wpThemeMode === 'dark' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Modo Oscuro
                    </button>
                    <button
                      type="button"
                      onClick={() => setWpThemeMode('light')}
                      className={`px-2 py-0.5 rounded-md font-semibold transition-all cursor-pointer ${
                        wpThemeMode === 'light' ? 'bg-red-600 text-white' : 'text-neutral-400 hover:text-white'
                      }`}
                    >
                      Modo Claro
                    </button>
                  </div>
                </div>

                {/* Shortcode Box */}
                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-mono">
                    1. Shortcode para cualquier tema o constructor de páginas:
                  </span>
                  <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-red-950 rounded-xl">
                    <code className="text-xs text-red-400 font-mono flex-1 pl-2">{shortcodeSnippet}</code>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(shortcodeSnippet);
                        setCopiedShortcode(true);
                        setTimeout(() => setCopiedShortcode(false), 2000);
                      }}
                      className="px-3 py-1 bg-black hover:bg-neutral-900 border border-red-900 text-neutral-200 text-xs font-semibold rounded-lg transition-all cursor-pointer font-mono"
                    >
                      {copiedShortcode ? '¡Shortcode copiado!' : 'Copiar Shortcode'}
                    </button>
                  </div>
                </div>

                {/* Custom HTML Block */}
                <div className="space-y-1">
                  <span className="text-[11px] text-neutral-400 block font-mono">
                    2. Bloque HTML Autónomo (Pegar en bloque "HTML Personalizado" de WordPress sin instalar archivos):
                  </span>
                  <div className="flex items-center gap-2 p-2 bg-neutral-950 border border-red-950 rounded-xl">
                    <input
                      type="text"
                      readOnly
                      value={iframeEmbedSnippet}
                      className="w-full bg-transparent text-[11px] font-mono text-neutral-400 focus:outline-hidden pl-2"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(iframeEmbedSnippet);
                        setCopiedEmbed(true);
                        setTimeout(() => setCopiedEmbed(false), 2000);
                      }}
                      className="shrink-0 px-3 py-1 bg-black hover:bg-neutral-900 border border-red-900 text-neutral-200 text-xs font-semibold rounded-lg transition-all cursor-pointer font-mono"
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
            <div className="space-y-3.5">
              <div className="flex items-center gap-2 font-mono">
                <span className="bg-black text-red-300 border border-red-800 text-xs font-semibold px-2 py-0.5 rounded">
                  {selectedDoc.type}
                </span>
                <span className="text-xs text-neutral-400">{selectedDoc.date}</span>
              </div>

              <p className="text-sm font-bold text-white font-sans">{selectedDoc.title}</p>
              <p className="text-xs text-neutral-300 leading-relaxed font-sans">{selectedDoc.summary}</p>
              {selectedDoc.entity && (
                <p className="text-xs text-neutral-400 font-mono"><strong>Organismo emisor:</strong> {selectedDoc.entity}</p>
              )}

              <div className="pt-3 border-t border-red-950 flex justify-end gap-2">
                <button
                  onClick={() => {
                    handleClose();
                    handleAuditDoc(selectedDoc);
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white text-xs font-bold rounded-xl shadow-lg transition-all font-mono cursor-pointer"
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
