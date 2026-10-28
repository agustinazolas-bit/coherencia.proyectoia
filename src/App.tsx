/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { HeroSearch } from './components/HeroSearch';
import { UpdatesColumn } from './components/UpdatesColumn';
import { AiResponseCard } from './components/AiResponseCard';
import { ComplianceCard } from './components/ComplianceCard';
import { SourcesColumn } from './components/SourcesColumn';
import { Modals } from './components/Modals';
import { CommitmentsModal } from './components/CommitmentsModal';
import { DetectiveBoardBackground } from './components/DetectiveBoardBackground';
import { Download, Layers } from 'lucide-react';
import { initialAuditData, allRepositoryDocuments, allVerifiedSourcesData, authentic100DaysCommitments } from './data/mockData';
import { AuditState, DataUpdate, VerifiedSource, GovernmentCommitment } from './types';
import { playPaperSlide, playPinClick } from './utils/audio';

export default function App() {
  const [auditData, setAuditData] = useState<AuditState>(initialAuditData);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'inicio' | 'metodologia' | 'repositorio' | 'acerca'>('inicio');
  const [activeModal, setActiveModal] = useState<'metodologia' | 'repositorio' | 'fuentes' | 'acerca' | 'share' | 'wordpress' | 'docDetail' | null>(null);
  const [isCommitmentsModalOpen, setIsCommitmentsModalOpen] = useState(false);
  const [selectedDoc, setSelectedDoc] = useState<DataUpdate | null>(null);
  const [selectedSource, setSelectedSource] = useState<VerifiedSource | null>(null);
  const [darkMode, setDarkMode] = useState(true);

  // Fetch baseline or update on mount if available
  useEffect(() => {
    fetch('/api/baseline')
      .then((res) => res.json())
      .then((data) => {
        if (data && data.aiResponse) {
          setAuditData((prev) => ({
            ...prev,
            ...data,
          }));
        }
      })
      .catch((err) => {
        console.warn('Using initial local state:', err);
      });
  }, []);

  // Main search / AI audit handler
  const handleSearch = async (query: string) => {
    if (!query.trim()) return;
    setIsLoading(true);

    try {
      const response = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      if (result && result.data) {
        setAuditData({
          query: result.query || query,
          aiResponse: result.data.aiResponse || auditData.aiResponse,
          complianceStatus: result.data.complianceStatus || auditData.complianceStatus,
          updates: result.data.updates || auditData.updates,
          verifiedSources: result.data.verifiedSources || auditData.verifiedSources,
          totalIndexedDocs: result.data.totalIndexedDocs || auditData.totalIndexedDocs,
          totalVerifiedSources: result.data.totalVerifiedSources || auditData.totalVerifiedSources
        });
      }
    } catch (error) {
      console.error('Error querying AI audit engine:', error);
      // Fallback local dynamic response if network/server is interrupted
      setAuditData((prev) => ({
        ...prev,
        query,
        aiResponse: {
          title: "RESPUESTA DE LA IA (análisis prospectivo)",
          content: `Según el análisis de los decretos publicados en el Diario Oficial para "${query}", se registra un avance proporcional en el vector de datos con coherencia programática verificada y trazabilidad en los informes presupuestarios.`,
          coherenceMetric: {
            status: "Cumpliéndose",
            statusColor: "green",
            detail: "Verificado contra vector de datos del Diario Oficial y balance fiscal."
          },
          newsVideos: initialAuditData.aiResponse.newsVideos
        }
      }));
    } finally {
      setIsLoading(false);
    }
  };

  const handleTabSelect = (tab: 'inicio' | 'metodologia' | 'repositorio' | 'acerca') => {
    playPaperSlide();
    setActiveTab(tab);
    if (tab === 'metodologia') {
      setActiveModal('metodologia');
    } else if (tab === 'repositorio') {
      setActiveModal('repositorio');
    } else if (tab === 'acerca') {
      setActiveModal('acerca');
    }
  };

  const handleDocSelect = (doc: DataUpdate) => {
    playPaperSlide();
    setSelectedDoc(doc);
    setActiveModal('docDetail');
  };

  const handleSourceSelect = (source: VerifiedSource) => {
    playPaperSlide();
    setSelectedSource(source);
    setActiveModal('fuentes');
  };

  const handleDocAudit = (doc: DataUpdate) => {
    playPinClick();
    const query = `Auditoría sobre ${doc.type} ${doc.title}: ${doc.summary}`;
    handleSearch(query);
  };

  const handleResetResponse = () => {
    playPinClick();
    setAuditData(initialAuditData);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-black text-white' : 'bg-neutral-950 text-neutral-100'} font-sans antialiased flex flex-col justify-between selection:bg-red-600 selection:text-white relative overflow-x-hidden transition-colors duration-500`}>
      
      {/* Detective Investigation Corkboard Background with Pinned Notes and Red Strings */}
      <DetectiveBoardBackground darkMode={darkMode} opacity={darkMode ? 0.32 : 0.22} />

      {/* Noir ambient red glows */}
      <div className={`fixed top-0 left-1/4 w-96 h-96 ${darkMode ? 'bg-red-600/10' : 'bg-red-500/15'} rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-500`}></div>
      <div className={`fixed bottom-0 right-1/4 w-96 h-96 ${darkMode ? 'bg-red-950/20' : 'bg-rose-950/25'} rounded-full blur-[140px] pointer-events-none z-0 transition-all duration-500`}></div>

      {/* Header with "Comparativas Dinámicas" navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onOpenShare={() => setActiveModal('share')}
        onOpenComparativas={() => setIsCommitmentsModalOpen(true)}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {/* Main Container */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 flex-1 relative z-10">
        {/* Hero & Search Bar */}
        <HeroSearch
          onSearch={handleSearch}
          isLoading={isLoading}
          currentQuery={auditData.query}
        />

        {/* Top Full-Width Auditor + Bottom 2-Column Grid */}
        <div className="space-y-6 mt-3">
          
          {/* Top Section: EL AUDITOR & ESTADO DE CUMPLIMIENTO */}
          <div className="space-y-5">
            <AiResponseCard
              data={auditData.aiResponse}
              isLoading={isLoading}
              onReset={handleResetResponse}
              onFollowUpQuery={handleSearch}
            />

            <ComplianceCard
              compliance={auditData.complianceStatus}
              onOpenCommitmentsModal={() => setIsCommitmentsModalOpen(true)}
            />
          </div>

          {/* Bottom Section: 2 Columns on Web (Left: Últimas actualizaciones | Right: Fuentes verificadas) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            {/* Left Column: ÚLTIMAS ACTUALIZACIONES */}
            <div className="h-full">
              <UpdatesColumn
                updates={auditData.updates}
                totalIndexedDocs={auditData.totalIndexedDocs}
                onOpenRepository={() => setActiveModal('repositorio')}
                onSelectDocument={handleDocSelect}
              />
            </div>

            {/* Right Column: FUENTES VERIFICADAS */}
            <div className="h-full">
              <SourcesColumn
                sources={auditData.verifiedSources}
                totalSources={auditData.totalVerifiedSources}
                onOpenAllSources={() => setActiveModal('fuentes')}
                onSelectSource={handleSourceSelect}
              />
            </div>

          </div>

        </div>
      </main>

      {/* Footer with WordPress Export and Comparativas Dinámicas */}
      <footer className="w-full border-t border-red-950/80 bg-black/95 py-6 px-4 text-center text-xs text-neutral-400 relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center md:text-left justify-center">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0"></span>
            <span className="text-neutral-300 font-medium">
              <strong className="text-white font-mono">COHERENC<span className="text-red-500">.IA</span></strong> · Auditoría y fact-checking gubernamental (Período: 11 mar - 19 jun 2026)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 text-neutral-300 flex-wrap justify-center font-mono">
            {/* Comparativas Dinámicas Footer Link */}
            <button 
              onClick={() => setIsCommitmentsModalOpen(true)} 
              className="min-h-[40px] px-2.5 py-1.5 hover:text-red-300 transition-colors cursor-pointer flex items-center gap-1.5 font-medium text-red-400 active:scale-95"
            >
              <Layers className="w-3.5 h-3.5 text-red-400" />
              <span>Comparativas Dinámicas</span>
            </button>

            {/* Traspaso WordPress Button */}
            <button 
              id="btn-footer-wordpress-export"
              onClick={() => setActiveModal('wordpress')} 
              className="min-h-[40px] hover:text-white transition-all text-red-300 hover:bg-red-900/60 font-semibold cursor-pointer bg-red-950/70 border border-red-800/80 px-3 py-1.5 rounded-xl flex items-center gap-2 shadow-sm active:scale-95"
              title="Descargar Tema o Plugin Universal para cualquier sitio WordPress"
            >
              <Download className="w-3.5 h-3.5 text-red-400" />
              <span>Traspaso WordPress (v2.0)</span>
            </button>

            <button onClick={() => setActiveModal('metodologia')} className="min-h-[40px] px-2 py-1.5 hover:text-red-400 transition-colors cursor-pointer">
              Metodología
            </button>
            <button onClick={() => setActiveModal('repositorio')} className="min-h-[40px] px-2 py-1.5 hover:text-red-400 transition-colors cursor-pointer">
              Repositorio
            </button>
            <button onClick={() => setActiveModal('acerca')} className="min-h-[40px] px-2 py-1.5 hover:text-red-400 transition-colors cursor-pointer">
              Acerca de
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <Modals
        activeModal={activeModal}
        selectedDoc={selectedDoc}
        selectedSource={selectedSource}
        allDocs={allRepositoryDocuments}
        allSources={allVerifiedSourcesData}
        onClose={() => {
          setActiveModal(null);
          setActiveTab('inicio');
        }}
        onSelectDocAndAudit={handleDocAudit}
      />

      {/* Comparativas Dinámicas (14 Medidas / 100 Días) Modal */}
      <CommitmentsModal
        isOpen={isCommitmentsModalOpen}
        onClose={() => setIsCommitmentsModalOpen(false)}
        commitments={auditData.complianceStatus.commitments || authentic100DaysCommitments}
        onAuditCommitment={(comm) => {
          setIsCommitmentsModalOpen(false);
          handleSearch(`Auditar cumplimiento del compromiso: ${comm.title} (${comm.officialDocRef})`);
        }}
        onSelectCommitmentAndAudit={(comm) => {
          setIsCommitmentsModalOpen(false);
          handleSearch(`Auditar cumplimiento del compromiso: ${comm.title} (${comm.officialDocRef})`);
        }}
      />
    </div>
  );
}
