import React, { useState, useEffect } from 'react';
import {
  X,
  RefreshCw,
  ExternalLink,
  Search,
  FileText,
  Database,
  Filter,
  Radio,
  Tv,
  Scale,
  Building2,
  TrendingUp,
  BookOpen,
  Landmark,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { playPinClick, playPaperRustle } from '../utils/audio';
import { ScrapedDocument } from '../types';

export interface ScraperSourceConfig {
  id: string;
  name: string;
  shortName: string;
  domain: string;
  channelType: string;
  channels: string[];
  description: string;
  url: string;
  sourceHierarchyLevel?: 1 | 2 | 3;
  sourceHierarchyLabel?: string;
  status: 'ONLINE' | 'SCRAPING' | 'SYNCED' | 'RATE_LIMITED';
  lastScraped: string;
  documentsCount: number;
  sampleKeywords: string[];
}

interface ScrapingMonitorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuditDocument: (query: string) => void;
}

export const ScrapingMonitorModal: React.FC<ScrapingMonitorModalProps> = ({
  isOpen,
  onClose,
  onAuditDocument
}) => {
  const [sources, setSources] = useState<ScraperSourceConfig[]>([]);
  const [documents, setDocuments] = useState<ScrapedDocument[]>([]);
  const [selectedSourceFilter, setSelectedSourceFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isScraping, setIsScraping] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Hoy a las 11:08');

  useEffect(() => {
    if (isOpen) {
      fetch('/api/scrape/sources')
        .then(res => res.json())
        .then(data => {
          if (data && data.sources) {
            setSources(data.sources);
          }
        })
        .catch(err => console.warn('Could not fetch scrape sources:', err));

      fetch('/api/scrape/documents')
        .then(res => res.json())
        .then(data => {
          if (data && data.documents) {
            setDocuments(data.documents);
          }
        })
        .catch(err => console.warn('Could not fetch scrape documents:', err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleTriggerScrape = async () => {
    playPaperRustle();
    setIsScraping(true);
    try {
      const res = await fetch('/api/scrape/trigger', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sourceId: selectedSourceFilter })
      });
      const data = await res.json();
      if (data && data.success) {
        setLastSyncTime(data.timestamp);
        if (data.scrapedSources) {
          setSources(data.scrapedSources);
        }
        const docRes = await fetch(`/api/scrape/documents?sourceId=${selectedSourceFilter}&query=${encodeURIComponent(searchQuery)}`);
        const docData = await docRes.json();
        if (docData && docData.documents) {
          setDocuments(docData.documents);
        }
      }
    } catch (err) {
      console.error('Error triggering scrape:', err);
    } finally {
      setIsScraping(false);
    }
  };

  const getSourceIcon = (sourceId: string) => {
    switch (sourceId) {
      case 'diario_oficial': return <FileText className="w-4 h-4 text-[#009ee3]" />;
      case 'dipres': return <TrendingUp className="w-4 h-4 text-[#059669]" />;
      case 'programa_kast': return <BookOpen className="w-4 h-4 text-[#4f46e5]" />;
      case 'bcentral_ine': return <Building2 className="w-4 h-4 text-[#d97706]" />;
      case 'contraloria': return <Scale className="w-4 h-4 text-[#7c3aed]" />;
      case 'camara_diputados': return <Landmark className="w-4 h-4 text-[#0284c7]" />;
      case 'senado': return <Landmark className="w-4 h-4 text-[#0369a1]" />;
      case 'meganoticias': return <Tv className="w-4 h-4 text-[#e11d48]" />;
      case 'biobio': return <Radio className="w-4 h-4 text-[#ca8a04]" />;
      default: return <Database className="w-4 h-4 text-[#667180]" />;
    }
  };

  const filteredDocs = documents.filter(doc => {
    const matchesSource = selectedSourceFilter === 'all' || doc.sourceId === selectedSourceFilter;
    const matchesQuery = !searchQuery.trim() ||
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.keywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (doc.officialRef && doc.officialRef.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSource && matchesQuery;
  });

  return (
    <div
      className="fixed inset-0 z-50 bg-[#363d47]/45 dark:bg-black/65 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-fade-in-scale"
      onClick={onClose}
    >
      <div
        className="wii-surface rounded-[28px] w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden text-[#363d47] dark:text-slate-100 font-sans"
        onClick={e => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="bg-gradient-to-b from-white to-[#eef3f8] dark:from-[#1e2633] dark:to-[#161c26] px-4 sm:px-6 py-3.5 border-b border-[#cfd7e2] dark:border-[#2d3848] flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full wii-cyan-btn flex items-center justify-center shrink-0">
              <Database className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base sm:text-lg font-extrabold text-[#363d47] dark:text-slate-100 tracking-tight">
                  Sistema de Scraping & Fuentes en Vivo
                </h3>
                <span className="text-[11px] font-bold bg-[#ecfdf5] dark:bg-emerald-950/60 border border-[#6ee7b7] dark:border-emerald-700/60 text-[#047857] dark:text-emerald-300 px-2.5 py-0.5 rounded-full flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] dark:bg-emerald-400 animate-pulse"></span>
                  <span>9 Fuentes Monitoreadas</span>
                </span>
              </div>
              <p className="text-xs text-[#5d6876] dark:text-slate-400">
                Extracción de actos administrativos, decretos, debates legislativos y cobertura periodística (100 días).
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              playPinClick();
              onClose();
            }}
            className="w-10 h-10 rounded-full wii-pill-btn flex items-center justify-center cursor-pointer shrink-0"
            aria-label="Cerrar modal"
          >
            <X className="w-4 h-4 text-[#434c59] dark:text-slate-300" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-[#f6f9fc] dark:bg-[#171f2b] px-4 sm:px-6 py-3 border-b border-[#d8dfe8] dark:border-[#2a3444] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="w-4 h-4 text-[#009ee3] dark:text-[#38bdf8] absolute left-3.5 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Filtrar por palabra clave (ej: frontera, DIPRES, RUF, subsidio)..."
                className="w-full bg-white dark:bg-[#0f141d] border-[1.5px] border-[#c7d0dc] dark:border-[#344256] focus:border-[#32b8f2] focus:outline-hidden text-xs rounded-full pl-10 pr-4 py-2 text-[#363d47] dark:text-slate-100 placeholder-[#828d9c] dark:placeholder-slate-400 font-sans shadow-[inset_0_2px_4px_rgba(66,82,102,0.05)] dark:shadow-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="text-[11px] text-[#667180] dark:text-slate-400 hidden sm:inline">
              Última extracción: <strong className="text-[#363d47] dark:text-slate-200">{lastSyncTime}</strong>
            </span>

            <button
              type="button"
              onClick={handleTriggerScrape}
              disabled={isScraping}
              className="px-4 py-2 rounded-full wii-cyan-btn text-xs font-bold flex items-center gap-2 cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isScraping ? 'animate-spin' : ''}`} />
              <span>{isScraping ? 'Extrayendo datos en vivo...' : 'Ejecutar Scraping en Vivo'}</span>
            </button>
          </div>
        </div>

        {/* 9 Source Filter Badges */}
        <div className="px-4 sm:px-6 py-2.5 bg-[#eef3f8] dark:bg-[#141b26] border-b border-[#cfd7e2] dark:border-[#2a3444] flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          <span className="text-[11px] text-[#5d6876] dark:text-slate-400 font-semibold mr-1 flex items-center gap-1 shrink-0">
            <Filter className="w-3 h-3 text-[#009ee3] dark:text-[#38bdf8]" />
            <span>Fuente:</span>
          </span>

          <button
            onClick={() => {
              playPinClick();
              setSelectedSourceFilter('all');
            }}
            className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 cursor-pointer ${
              selectedSourceFilter === 'all' ? 'wii-cyan-btn' : 'wii-pill-btn'
            }`}
          >
            Todas ({documents.length})
          </button>

          {sources.map(src => {
            const isSelected = selectedSourceFilter === src.id;
            return (
              <button
                key={src.id}
                onClick={() => {
                  playPinClick();
                  setSelectedSourceFilter(src.id);
                }}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 cursor-pointer ${
                  isSelected ? 'wii-cyan-btn' : 'wii-pill-btn'
                }`}
                title={src.description}
              >
                {getSourceIcon(src.id)}
                <span>{src.shortName}</span>
                <span className="text-[10px] opacity-80">({src.documentsCount})</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1 bg-[#f4f7fa] dark:bg-[#121720]">
          {/* Source Status Mini Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pb-2">
            <div className="p-3.5 rounded-2xl wii-card flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#667180] dark:text-slate-400 block font-bold">
                  Fuentes Oficiales del Estado
                </span>
                <span className="text-sm font-bold text-[#363d47] dark:text-slate-100">
                  Diario Oficial, DIPRES, CGR, BCCh
                </span>
              </div>
              <ShieldCheck className="w-5 h-5 text-[#059669] dark:text-emerald-400 shrink-0" />
            </div>

            <div className="p-3.5 rounded-2xl wii-card flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#667180] dark:text-slate-400 block font-bold">
                  Poder Legislativo
                </span>
                <span className="text-sm font-bold text-[#363d47] dark:text-slate-100">
                  Cámara de Diputadas/os & Senado
                </span>
              </div>
              <Landmark className="w-5 h-5 text-[#009ee3] dark:text-[#38bdf8] shrink-0" />
            </div>

            <div className="p-3.5 rounded-2xl wii-card flex items-center justify-between">
              <div>
                <span className="text-[11px] uppercase tracking-wider text-[#667180] dark:text-slate-400 block font-bold">
                  Medios & Redes Sociales
                </span>
                <span className="text-sm font-bold text-[#363d47] dark:text-slate-100">
                  Meganoticias & Bíobío (Web / IG)
                </span>
              </div>
              <Tv className="w-5 h-5 text-[#e11d48] dark:text-rose-400 shrink-0" />
            </div>
          </div>

          {/* List of Scraped Documents */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs text-[#667180] dark:text-slate-400 border-b border-[#d8dfe8] dark:border-[#2a3444] pb-2 font-medium">
              <span>Registros extraídos e indexados ({filteredDocs.length}):</span>
              <span>Cotejo de los primeros 100 días de gobierno</span>
            </div>

            {filteredDocs.length === 0 ? (
              <div className="py-12 text-center text-[#5d6876] dark:text-slate-400 space-y-2">
                <FileText className="w-8 h-8 mx-auto text-[#9aa5b4] dark:text-slate-500" />
                <p className="text-sm">No se encontraron registros scrapeados con el filtro actual.</p>
                <button
                  onClick={() => {
                    setSelectedSourceFilter('all');
                    setSearchQuery('');
                  }}
                  className="text-xs text-[#0095d9] dark:text-[#38bdf8] hover:text-[#0073aa] dark:hover:text-[#7dd3fc] font-bold cursor-pointer underline"
                >
                  Restablecer filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {filteredDocs.map(doc => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-2xl wii-card flex flex-col justify-between space-y-3 group"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[11px] font-bold text-[#0369a1] dark:text-sky-300 bg-[#ebf8ff] dark:bg-sky-950/60 border border-[#7dd3fc] dark:border-sky-700/60 px-2.5 py-0.5 rounded-full flex items-center gap-1.5">
                          {getSourceIcon(doc.sourceId)}
                          <span>{doc.channelOrigin}</span>
                        </span>
                        <div className="flex items-center gap-2">
                          {doc.sourceHierarchyLabel && (
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                              doc.sourceHierarchyLevel === 1
                                ? 'bg-[#ecfdf5] dark:bg-emerald-950/60 border-[#6ee7b7] dark:border-emerald-700/60 text-[#047857] dark:text-emerald-300'
                                : doc.sourceHierarchyLevel === 2
                                ? 'bg-[#ebf8ff] dark:bg-sky-950/60 border-[#7dd3fc] dark:border-sky-700/60 text-[#0369a1] dark:text-sky-300'
                                : 'bg-[#fffbeb] dark:bg-amber-950/60 border-[#fcd34d] dark:border-amber-700/60 text-[#b45309] dark:text-amber-300'
                            }`}>
                              {doc.sourceHierarchyLabel}
                            </span>
                          )}
                          <span className="text-[11px] text-[#667180] dark:text-slate-400">
                            {doc.publishedDate}
                          </span>
                        </div>
                      </div>

                      <h4 className="text-sm font-bold text-[#363d47] dark:text-slate-100 group-hover:text-[#0088c7] dark:group-hover:text-[#38bdf8] transition-colors leading-snug">
                        {doc.title}
                      </h4>

                      {doc.officialRef && (
                        <div className="text-[11px] font-mono font-semibold text-[#4b5461] dark:text-slate-300 bg-[#eef3f8] dark:bg-[#1a2230] px-2.5 py-0.5 rounded-full inline-block border border-[#cfd7e2] dark:border-[#2f3b4d]">
                          Ref: {doc.officialRef}
                        </div>
                      )}

                      <p className="text-xs text-[#4b5461] dark:text-slate-300 leading-relaxed line-clamp-3">
                        {doc.summary}
                      </p>

                      <div className="p-2.5 rounded-xl bg-[#f1f6fb] dark:bg-[#16202e] border-l-3 border-[#32b8f2] dark:border-[#38bdf8] text-[11px] text-[#4b5461] dark:text-slate-300 leading-relaxed space-y-1">
                        <div className="flex flex-wrap items-center gap-1.5 text-[10px] font-mono font-bold text-[#0369a1] dark:text-[#38bdf8]">
                          <span className="uppercase">{doc.excerptType || 'Resumen documental'}</span>
                          {doc.excerptLocation && (
                            <span className="font-normal text-[#667180] dark:text-slate-400">· {doc.excerptLocation}</span>
                          )}
                        </div>
                        <p className={doc.excerptType === 'Cita textual' && doc.isLiveVerified ? 'italic font-serif' : ''}>
                          {doc.excerptType === 'Cita textual' && doc.isLiveVerified
                            ? `"${doc.extractedSnippet}"`
                            : doc.extractedSnippet}
                        </p>
                      </div>
                    </div>

                    <div className="pt-2.5 border-t border-[#e3e8ef] dark:border-[#2a3444] flex items-center justify-between gap-2">
                      {doc.url && doc.url.startsWith('http') ? (
                        <a
                          href={doc.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[11px] text-[#0095d9] dark:text-[#38bdf8] hover:text-[#0073aa] dark:hover:text-[#7dd3fc] flex items-center gap-1 transition-colors font-sans font-semibold"
                          title={doc.url}
                        >
                          <span>Abrir documento ({doc.sourceDomain})</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      ) : (
                        <div className="text-[11px] text-[#667180] dark:text-slate-400 flex items-center gap-1 font-sans">
                          <ShieldCheck className="w-3 h-3 text-[#9aa5b4] dark:text-slate-500" />
                          <span>Trazabilidad oficial (sin enlace web)</span>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => {
                          playPinClick();
                          onClose();
                          onAuditDocument(`Auditoría sobre documento de ${doc.sourceName}: ${doc.title}`);
                        }}
                        className="px-3.5 py-1.5 rounded-full wii-cyan-btn text-xs font-bold flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <span>Auditar en chat</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
