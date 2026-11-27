/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Modals } from './components/Modals';
import { ScrapingMonitorModal } from './components/ScrapingMonitorModal';
import { ChatPanel } from './components/ChatPanel';
import { Download } from 'lucide-react';
import { allRepositoryDocuments, allVerifiedSourcesData } from './data/mockData';
import { DataUpdate, ChatMessage } from './types';
import { playPaperSlide, playPinClick } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState<'inicio' | 'fuentes' | 'metodologia' | 'acerca'>('inicio');
  const [activeModal, setActiveModal] = useState<'metodologia' | 'repositorio' | 'fuentes' | 'acerca' | 'share' | 'wordpress' | 'docDetail' | null>(null);
  const [isScrapingModalOpen, setIsScrapingModalOpen] = useState(false);
  const [selectedDoc] = useState<DataUpdate | null>(null);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('coherencia_theme') === 'dark';
    } catch {
      return false;
    }
  });
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isChatLoading, setIsChatLoading] = useState(false);

  // Sync dark mode class on <html> and persist preference
  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    try {
      localStorage.setItem('coherencia_theme', darkMode ? 'dark' : 'light');
    } catch {
      // Ignore storage errors
    }
  }, [darkMode]);

  const activeTopic = useMemo(() => {
    const userTurns = chatMessages.filter((m) => m.role === 'user');
    if (userTurns.length === 0) return undefined;
    const latest = userTurns[0].content.trim();
    return latest.length > 56 ? `${latest.slice(0, 56)}…` : latest;
  }, [chatMessages]);

  const handleSendChatMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isChatLoading) return;

    const timestamp = new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' });
    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: trimmed,
      timestamp,
    };

    const previousUserMsg = [...chatMessages].reverse().find((m) => m.role === 'user');
    const previousAssistantMsg = [...chatMessages].reverse().find((m) => m.role === 'assistant');

    const nextHistory = [...chatMessages, userMessage];
    setChatMessages(nextHistory);
    setIsChatLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: chatMessages.map((m) => ({ role: m.role, content: m.content })),
          auditContext: previousUserMsg
            ? {
                query: previousUserMsg.content,
                evidenceClassification: previousAssistantMsg?.evidenceClassification,
              }
            : undefined,
        }),
      });

      const payload = await response.json();
      if (!response.ok || !payload?.success || !payload?.reply) {
        const errMsg = payload?.error || `Error HTTP ${response.status} al consultar el motor documental.`;
        setChatMessages((prev) => [
          ...prev,
          {
            id: `err-${Date.now()}`,
            role: 'assistant',
            content: '',
            timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
            evidenceClassification: 'NO VERIFICADA',
            citations: Array.isArray(payload?.citations) ? payload.citations : [],
            errorMessage: errMsg,
          },
        ]);
        return;
      }

      setChatMessages((prev) => [...prev, payload.reply as ChatMessage]);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error de red al conectar con el servidor de verificación.';
      setChatMessages((prev) => [
        ...prev,
        {
          id: `err-${Date.now()}`,
          role: 'assistant',
          content: '',
          timestamp: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
          evidenceClassification: 'NO VERIFICADA',
          errorMessage: message,
        },
      ]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handleClearChat = () => {
    setChatMessages([]);
  };

  const handleTabSelect = (tab: 'inicio' | 'fuentes' | 'metodologia' | 'acerca') => {
    playPaperSlide();
    setActiveTab(tab);
    if (tab === 'inicio') {
      setActiveModal(null);
      setIsScrapingModalOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (tab === 'fuentes') {
      setIsScrapingModalOpen(true);
    } else if (tab === 'metodologia') {
      setActiveModal('metodologia');
    } else if (tab === 'acerca') {
      setActiveModal('acerca');
    }
  };

  const handleDocAuditInChat = (doc: DataUpdate) => {
    playPinClick();
    setActiveModal(null);
    setActiveTab('inicio');
    handleSendChatMessage(`¿Qué antecedentes oficiales respaldan ${doc.type} (${doc.title})?`);
  };

  return (
    <div className="min-h-screen text-[#363d47] dark:text-slate-100 font-sans antialiased flex flex-col justify-between selection:bg-[#32b8f2] selection:text-white relative overflow-x-hidden transition-colors">
      {/* Header Navigation */}
      <Header
        activeTab={activeTab}
        onSelectTab={handleTabSelect}
        onOpenShare={() => setActiveModal('share')}
        darkMode={darkMode}
        onToggleTheme={() => setDarkMode(!darkMode)}
      />

      {/* Primary Chat-First Workspace */}
      <main className="w-full max-w-5xl mx-auto px-3 sm:px-6 py-4 flex-1 flex flex-col relative z-10">
        <ChatPanel
          fullPageMode={true}
          messages={chatMessages}
          isLoading={isChatLoading}
          activeTopic={activeTopic}
          onSendMessage={handleSendChatMessage}
          onClearChat={handleClearChat}
          onOpenSourcesModal={() => setActiveModal('fuentes')}
          onOpenScrapingModal={() => setIsScrapingModalOpen(true)}
        />
      </main>

      {/* Footer with Nintendo Wii Cyan Rim & Chrome Capsules */}
      <footer className="w-full border-t-2 border-[#94d8f8] dark:border-[#0284c7]/70 bg-gradient-to-b from-[#f6f9fc] to-[#e6ecf3] dark:from-[#161c26] dark:to-[#10151d] py-4 px-4 text-center text-xs text-[#5d6876] dark:text-slate-400 relative z-10 font-sans shadow-[0_-6px_20px_rgba(66,82,102,0.06)] dark:shadow-[0_-6px_24px_rgba(0,0,0,0.35)]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-center md:text-left justify-center">
            <span className="w-2.5 h-2.5 rounded-full bg-[#32b8f2] shadow-[0_0_8px_rgba(50,184,242,0.75)] shrink-0"></span>
            <span className="text-[#4b5563] dark:text-slate-300 font-medium">
              <strong className="text-[#363d47] dark:text-white font-sans">COHERENC<span className="text-[#009ee3] dark:text-[#38bdf8]">.IA</span></strong> · Fact-checking conversacional con fuentes verificables (11 mar – 19 jun 2026)
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-[#4b5563] dark:text-slate-300 flex-wrap justify-center font-sans">
            <button
              id="btn-footer-wordpress-export"
              onClick={() => setActiveModal('wordpress')}
              className="min-h-[38px] font-semibold cursor-pointer wii-pill-btn px-3.5 py-1.5 rounded-full flex items-center gap-2 active:scale-95"
              title="Descargar Tema o Plugin Universal para cualquier sitio WordPress"
            >
              <Download className="w-3.5 h-3.5 text-[#009ee3] dark:text-[#38bdf8]" />
              <span>Traspaso WordPress</span>
            </button>

            <button onClick={() => setActiveModal('metodologia')} className="min-h-[38px] px-2.5 py-1.5 hover:text-[#0095d9] dark:hover:text-[#38bdf8] font-medium transition-colors cursor-pointer">
              Metodología
            </button>
            <button onClick={() => setActiveModal('repositorio')} className="min-h-[38px] px-2.5 py-1.5 hover:text-[#0095d9] dark:hover:text-[#38bdf8] font-medium transition-colors cursor-pointer">
              Repositorio
            </button>
            <button onClick={() => setActiveModal('acerca')} className="min-h-[38px] px-2.5 py-1.5 hover:text-[#0095d9] dark:hover:text-[#38bdf8] font-medium transition-colors cursor-pointer">
              Acerca de
            </button>
          </div>
        </div>
      </footer>

      {/* Interactive Modals */}
      <Modals
        activeModal={activeModal}
        selectedDoc={selectedDoc}
        selectedSource={null}
        allDocs={allRepositoryDocuments}
        allSources={allVerifiedSourcesData}
        onClose={() => {
          setActiveModal(null);
          setActiveTab('inicio');
        }}
        onSelectDocAndAudit={handleDocAuditInChat}
      />

      {/* Sistema de Scraping en Vivo (9 Fuentes de Información) */}
      <ScrapingMonitorModal
        isOpen={isScrapingModalOpen}
        onClose={() => {
          setIsScrapingModalOpen(false);
          setActiveTab('inicio');
        }}
        onAuditDocument={(query) => {
          setIsScrapingModalOpen(false);
          setActiveTab('inicio');
          handleSendChatMessage(query);
        }}
      />
    </div>
  );
}
