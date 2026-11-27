import React, { useState } from 'react';
import { ScrapedDocument, NewsVideoReport, VerifiedSource } from '../types';
import { 
  FileText, 
  ExternalLink, 
  Search, 
  Filter, 
  ArrowRight, 
  ShieldCheck, 
  AlertCircle, 
  Calendar, 
  Building2, 
  Scale, 
  TrendingUp, 
  Tv, 
  Radio, 
  BookOpen, 
  Layers, 
  CheckCircle2, 
  Clock, 
  ArrowLeft,
  Sparkles,
  Info
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface SearchResultsViewProps {
  query: string;
  searchResults: ScrapedDocument[];
  explanation?: string;
  onAuditDocument: (docTitle: string, docSummary: string) => void;
  onBackToSearch: () => void;
  onSelectAuditQuery?: (query: string) => void;
  newsVideos?: NewsVideoReport[];
  sources?: VerifiedSource[];
}

// Filter categories for search results
const SOURCE_FILTERS = [
  { id: 'all', label: 'Todos los resultados' },
  { id: 'diario_oficial', label: 'Diario Oficial' },
  { id: 'dipres', label: 'DIPRES / Hacienda' },
  { id: 'contraloria', label: 'Contraloría (CGR)' },
  { id: 'legislativo', label: 'Cámara & Senado' },
  { id: 'programa_kast', label: 'Programa Kast 2026' },
  { id: 'prensa', label: 'Prensa (Meganoticias/Bío Bío)' }
];

// Curated verifiable audits that citizens can explore with complete decrees
const VERIFIABLE_SUGGESTED_AUDITS = [
  {
    topic: "Control Fronterizo y FF.AA. en Macrozona Norte",
    query: "Auditoría sobre despliegue de Fuerzas Armadas en frontera norte y reglas de uso de la fuerza",
    decree: "Decreto Supremo N° 123 y N° 142",
    badge: "Decreto Promulgado"
  },
  {
    topic: "Reforma Tributaria y Rebaja al 23%",
    query: "Reforma tributaria y rebaja del impuesto de primera categoría al 23%",
    decree: "Boletín N° 18.216-05 (Congreso)",
    badge: "En Trámite"
  },
  {
    topic: "Marco Orgánico Ministerial y Administración Pública",
    query: "Verifica la Ley N° 18.575 sobre creación y fusión de ministerios",
    decree: "Ley N° 18.575 (BCN Ley Chile)",
    badge: "Ley Orgánica Constitucional"
  },
  {
    topic: "Listas de Espera y Convenios Fonasa",
    query: "Convenio nacional para listas de espera quirúrgicas con Fonasa",
    decree: "Resolución Exenta N° 314 FONASA",
    badge: "Resolución Administrativa"
  },
  {
    topic: "Inexpropiabilidad de Fondos de Pensiones",
    query: "Verifica el Boletín N° 14.801-07 sobre fondos previsionales",
    decree: "Boletín N° 14.801-07 Senado",
    badge: "Proyecto Legislativo"
  }
];

export const SearchResultsView: React.FC<SearchResultsViewProps> = ({
  query,
  searchResults,
  explanation,
  onAuditDocument,
  onBackToSearch,
  onSelectAuditQuery,
  newsVideos = [],
  sources = []
}) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [localQuery, setLocalQuery] = useState(query);
  const [filterText, setFilterText] = useState('');

  // Source icon helper
  const getSourceIcon = (sourceId: string) => {
    switch (sourceId) {
      case 'diario_oficial':
        return <FileText className="w-4 h-4 text-blue-400" />;
      case 'dipres':
        return <TrendingUp className="w-4 h-4 text-emerald-400" />;
      case 'contraloria':
        return <Scale className="w-4 h-4 text-purple-400" />;
      case 'camara_diputados':
      case 'senado':
        return <Building2 className="w-4 h-4 text-indigo-400" />;
      case 'programa_kast':
        return <BookOpen className="w-4 h-4 text-sky-400" />;
      case 'meganoticias':
        return <Tv className="w-4 h-4 text-rose-400" />;
      case 'biobio':
        return <Radio className="w-4 h-4 text-amber-400" />;
      default:
        return <FileText className="w-4 h-4 text-neutral-400" />;
    }
  };

  // Filter documents by source chip and local text filter
  const filteredDocs = searchResults.filter(doc => {
    // Source chip filter
    if (activeFilter === 'legislativo') {
      if (doc.sourceId !== 'camara_diputados' && doc.sourceId !== 'senado') return false;
    } else if (activeFilter === 'prensa') {
      if (doc.sourceId !== 'meganoticias' && doc.sourceId !== 'biobio') return false;
    } else if (activeFilter !== 'all' && doc.sourceId !== activeFilter) {
      return false;
    }

    // Secondary text filter
    if (filterText.trim()) {
      const q = filterText.toLowerCase();
      const match = 
        doc.title.toLowerCase().includes(q) ||
        doc.summary.toLowerCase().includes(q) ||
        doc.keywords.some(k => k.toLowerCase().includes(q)) ||
        doc.sourceName.toLowerCase().includes(q);
      if (!match) return false;
    }

    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in-up font-sans">
      
      {/* Top Banner: Explanation and Back Button */}
      <div className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-lg space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                playPaperSlide();
                onBackToSearch();
              }}
              className="px-3.5 py-2 rounded-xl bg-[#27292f] hover:bg-[#2f323a] border border-[#383b43] hover:border-blue-500 text-xs font-bold text-white flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
            >
              <ArrowLeft className="w-4 h-4 text-blue-400" />
              <span>Nueva búsqueda</span>
            </button>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 bg-amber-950/70 border border-amber-500/40 px-2.5 py-0.5 rounded-full inline-flex items-center gap-1.5">
                <AlertCircle className="w-3 h-3 text-amber-400" />
                <span>Resultado de Búsqueda Documental</span>
              </span>
            </div>
          </div>

          <div className="text-xs text-neutral-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
            <span>9 fuentes oficiales y medios monitoreados</span>
          </div>
        </div>

        {/* Query & Explanation Text */}
        <div className="border-t border-[#2d3036] pt-3.5 space-y-2">
          <h2 className="text-xl sm:text-2xl font-extrabold text-white">
            Búsqueda Documental Exhaustiva: <span className="text-blue-400">"{query}"</span>
          </h2>
          <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl">
            {explanation || "Clasificación: NO VERIFICADA. Documento no localizado con evidencia primaria concluyente en el archivo indexado. Conforme al principio de integridad periodística, no se emiten suposiciones y se despliegan resultados documentales ordenados por jerarquía de fuentes (Nivel 1 Oficial → Nivel 2 Secundaria → Nivel 3 Complementaria):"}
          </p>
        </div>

        {/* Fast Filter Search Input */}
        <div className="pt-1 flex items-center bg-[#1a1c20] border border-[#34373e] rounded-xl px-3.5 py-2 focus-within:border-blue-500">
          <Search className="w-4 h-4 text-neutral-400 mr-2 shrink-0" />
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Filtrar dentro de los documentos encontrados por palabra clave..."
            className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-neutral-500 focus:outline-hidden"
          />
          {filterText && (
            <button
              onClick={() => setFilterText('')}
              className="text-xs text-neutral-400 hover:text-white px-1.5 py-0.5 rounded-md hover:bg-neutral-800"
            >
              Limpiar
            </button>
          )}
        </div>

        {/* Source Categories Tabs */}
        <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap pt-1 border-t border-[#2b2d33]">
          <span className="text-xs text-neutral-400 mr-1 hidden sm:inline-flex items-center gap-1">
            <Filter className="w-3 h-3 text-blue-400" />
            <span>Fuente:</span>
          </span>
          {SOURCE_FILTERS.map(f => {
            const isSelected = activeFilter === f.id;
            return (
              <button
                key={f.id}
                onClick={() => {
                  playPinClick();
                  setActiveFilter(f.id);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer border ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-500 font-semibold shadow-xs'
                    : 'bg-[#27292f] text-neutral-300 border-[#383b43] hover:border-neutral-500 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Grid: Left Documents (8 cols), Right Verifiable Audits & Videos (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        
        {/* Left Column: List of Scraped Documents */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between text-xs text-neutral-400 px-1">
            <span>
              Mostrando <strong className="text-white font-semibold">{filteredDocs.length}</strong> de <strong className="text-neutral-300">{searchResults.length}</strong> documentos indexados
            </span>
            <span className="text-[11px] text-blue-400">
              Período: 11 mar – 19 jun 2026
            </span>
          </div>

          {filteredDocs.length === 0 ? (
            <div className="bg-[#202226] border border-[#34373e] rounded-2xl p-8 text-center space-y-3">
              <FileText className="w-10 h-10 text-neutral-500 mx-auto" />
              <h3 className="text-sm font-bold text-neutral-300">
                No se encontraron documentos con el filtro aplicado
              </h3>
              <p className="text-xs text-neutral-400 max-w-md mx-auto">
                Prueba seleccionando "Todos los resultados" o buscando con términos más generales como "frontera", "impuestos", "dipres" o "decreto".
              </p>
              <button
                onClick={() => {
                  setActiveFilter('all');
                  setFilterText('');
                }}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Restablecer filtros
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {filteredDocs.map((doc) => (
                <div
                  key={doc.id}
                  className="bg-[#202226] hover:bg-[#23262c] border border-[#34373e] hover:border-blue-500/50 rounded-2xl p-4 sm:p-5 transition-all shadow-md group space-y-3"
                >
                  {/* Top Metadata Row */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-[#27292f] border border-[#383b43]">
                        {getSourceIcon(doc.sourceId)}
                      </div>
                      <div>
                        <span className="font-semibold text-white">
                          {doc.sourceName}
                        </span>
                        <span className="text-neutral-400 text-[11px] ml-2">
                          · {doc.channelOrigin}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      {doc.sourceHierarchyLabel && (
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${
                          doc.sourceHierarchyLevel === 1
                            ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                            : doc.sourceHierarchyLevel === 2
                            ? 'bg-blue-950/60 border-blue-500/40 text-blue-300'
                            : 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                        }`}>
                          {doc.sourceHierarchyLabel}
                        </span>
                      )}
                      {doc.officialRef && (
                        <span className="text-[10px] font-mono font-bold bg-[#181a1d] border border-[#383b43] text-blue-300 px-2 py-0.5 rounded-md">
                          {doc.officialRef}
                        </span>
                      )}
                      <span className="text-neutral-400 text-[11px] flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-neutral-500" />
                        <span>{doc.publishedDate}</span>
                      </span>
                    </div>
                  </div>

                  {/* Document Title */}
                  <h3 className="text-sm sm:text-base font-bold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {doc.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {doc.summary}
                  </p>

                  {/* Extracted Official Excerpt / Summary (Rule C: quotes only when live-verified verbatim) */}
                  {doc.extractedSnippet && (
                    <div className="p-3 rounded-xl bg-[#181a1d]/90 border border-[#30333b] text-xs text-neutral-300 border-l-2 border-l-blue-500 leading-relaxed space-y-1">
                      <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono text-blue-300">
                        <span className="uppercase font-bold">
                          {doc.excerptType || 'Resumen documental'}
                        </span>
                        {doc.excerptLocation && (
                          <span className="text-neutral-400">· {doc.excerptLocation}</span>
                        )}
                      </div>
                      <p className={doc.excerptType === 'Cita textual' && doc.isLiveVerified ? 'font-serif italic' : ''}>
                        {doc.excerptType === 'Cita textual' && doc.isLiveVerified
                          ? `"${doc.extractedSnippet}"`
                          : doc.extractedSnippet}
                      </p>
                    </div>
                  )}

                  {/* Keywords & Bottom Actions */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-[#2b2d33]">
                    {/* Keyword Chips */}
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="text-[10px] uppercase font-bold text-neutral-400 bg-[#27292f] px-2 py-0.5 rounded-md">
                        {doc.category}
                      </span>
                      {doc.keywords.slice(0, 4).map((kw, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] text-neutral-400 bg-[#1c1e22] px-2 py-0.5 rounded-md border border-[#32353c]"
                        >
                          #{kw}
                        </span>
                      ))}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex items-center gap-2 ml-auto">
                      {doc.url && (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 rounded-lg bg-[#27292f] hover:bg-[#30333b] border border-[#383b43] text-xs text-neutral-300 hover:text-white transition-all flex items-center gap-1.5 font-medium"
                          title="Abrir portal oficial de la institución"
                        >
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
                          <span>Ver portal oficial</span>
                        </a>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          playPinClick();
                          onAuditDocument(doc.title, doc.summary);
                        }}
                        className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm active:scale-95 cursor-pointer"
                        title="Ejecutar auditoría detallada de este documento con EL AUDITOR"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-white" />
                        <span>Auditar este documento</span>
                        <ArrowRight className="w-3 h-3 text-white" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Suggested Audits & Verified Video Reports */}
        <div className="lg:col-span-4 space-y-4">
          
          {/* Box 1: Consultas con Auditoría Verificada y Decretos Completos */}
          <div className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Auditorías Oficiales Disponibles
              </h3>
            </div>
            <p className="text-xs text-neutral-400">
              Estas políticas cuentan con decretos supremos, dictámenes o proyectos ingresados verificables en los 100 días:
            </p>

            <div className="space-y-2 pt-1">
              {VERIFIABLE_SUGGESTED_AUDITS.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => {
                    playPaperSlide();
                    if (onSelectAuditQuery) {
                      onSelectAuditQuery(item.query);
                    }
                  }}
                  className="w-full text-left p-3 rounded-xl bg-[#27292f] hover:bg-[#2f323a] border border-[#383b43] hover:border-blue-500/60 transition-all cursor-pointer group space-y-1 block"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-mono text-blue-400 font-semibold truncate max-w-[180px]">
                      {item.decree}
                    </span>
                    <span className="text-neutral-400 bg-[#1e2024] px-1.5 py-0.5 rounded text-[10px]">
                      {item.badge}
                    </span>
                  </div>
                  <div className="text-xs font-semibold text-white group-hover:text-blue-300 transition-colors leading-snug">
                    {item.topic}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Box 2: Reportajes Periodísticos Verificados */}
          {newsVideos && newsVideos.length > 0 && (
            <div className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <Tv className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                  Reportajes y Coberturas en Video
                </h3>
              </div>
              <p className="text-xs text-neutral-400">
                Crónicas de prensa chilena verificada respecto a medidas de los primeros 100 días:
              </p>

              <div className="space-y-2 pt-1">
                {newsVideos.slice(0, 3).map((vid) => (
                  <div
                    key={vid.id}
                    className="p-3 rounded-xl bg-[#27292f] border border-[#383b43] space-y-2"
                  >
                    <div className="flex items-center justify-between text-[10px] text-neutral-400">
                      <span className="font-bold text-rose-400">{vid.channel}</span>
                      <span>{vid.duration}</span>
                    </div>
                    <div className="text-xs font-semibold text-white leading-snug line-clamp-2">
                      {vid.title}
                    </div>
                    <a
                      href={vid.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 font-medium"
                    >
                      <span>Ver reportaje en YouTube</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Box 3: Monitor de las 9 Fuentes Oficiales */}
          <div className="bg-[#202226] border border-[#34373e] rounded-2xl p-4 sm:p-5 shadow-md space-y-2.5">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-blue-400 animate-pulse" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-white">
                Fuentes Monitoreadas (9)
              </h3>
            </div>
            <ul className="text-xs text-neutral-300 space-y-1.5">
              <li className="flex items-center justify-between">
                <span>Diario Oficial de Chile</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>DIPRES - Min. Hacienda</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Programa Kast 2026/2021/2017</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Banco Central & INE</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Contraloría General (CGR)</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Cámara de Diputadas y Diputados</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Senado de la República</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Meganoticias (Web/Instagram)</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
              <li className="flex items-center justify-between">
                <span>Bíobío (Prensa/Instagram)</span>
                <span className="text-[10px] text-emerald-400 font-bold">Activo</span>
              </li>
            </ul>
          </div>

        </div>

      </div>

    </div>
  );
};
