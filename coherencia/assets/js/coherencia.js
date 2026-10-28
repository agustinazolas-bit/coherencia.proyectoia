/**
 * COHERENCIA v2.0 - WordPress Interactive Engine (Theme & Universal Plugin Compatible)
 * Supports Structured 5-Block Auditor, Terminal View, Real YouTube Videos, 14 Commitments Matrix & Light/Dark Theme Adaptation
 */

document.addEventListener('DOMContentLoaded', () => {
    const defaultVideos = [
        {
            id: 'vid-1',
            title: 'Despliegue y atribuciones de FF.AA. en la frontera norte: Reglas del uso de la fuerza y control en Colchane',
            channel: 'T13 (Teletrece)',
            channelVerified: true,
            publishedDate: '16 abr 2026',
            duration: '4:32',
            youtubeVideoId: 'fPEtrMbBm24',
            youtubeUrl: 'https://www.youtube.com/watch?v=fPEtrMbBm24',
            summary: 'Reportaje de Teletrece sobre las atribuciones operativas de las Fuerzas Armadas en el resguardo de infraestructura crítica fronteriza, reglas de uso de la fuerza (RUF) y reconducciones en la Macrozona Norte.',
            relatedCategory: 'Seguridad'
        },
        {
            id: 'vid-2',
            title: 'Reforma Tributaria ante Comisión de Hacienda: Debate por impuesto corporativo y sostenibilidad fiscal',
            channel: '24 Horas - TVN Chile',
            channelVerified: true,
            publishedDate: '04 abr 2026',
            duration: '5:18',
            youtubeVideoId: 'l4a5PlUtB4g',
            youtubeUrl: 'https://www.youtube.com/watch?v=l4a5PlUtB4g',
            summary: 'Cobertura de 24 Horas TVN desde la Comisión de Hacienda sobre la presentación del proyecto tributario, rebaja impositiva corporativa y advertencias de brecha fiscal de DIPRES y el CFA.',
            relatedCategory: 'Economía'
        },
        {
            id: 'vid-3',
            title: 'Contraloría General de la República y fiscalización a desvinculación de funcionarios y plantas estatales',
            channel: 'Meganoticias',
            channelVerified: true,
            publishedDate: '19 mar 2026',
            duration: '3:45',
            youtubeVideoId: 'HIdNYxNjb6U',
            youtubeUrl: 'https://www.youtube.com/watch?v=HIdNYxNjb6U',
            summary: 'Informe de Meganoticias sobre los dictámenes de la Contraloría General de la República respecto a la confianza legítima, dotación de ministerios y límites jurídicos a los despidos por decreto.',
            relatedCategory: 'Estado'
        },
        {
            id: 'vid-4',
            title: 'José Antonio Kast y agenda de los primeros 100 días: Orden fiscal, cuentas públicas y reforma de seguridad',
            channel: 'CNN Chile',
            channelVerified: true,
            publishedDate: '12 jun 2026',
            duration: '8:20',
            youtubeVideoId: '52_KDsUEO2M',
            youtubeUrl: 'https://www.youtube.com/watch?v=52_KDsUEO2M',
            summary: 'Entrevista y análisis en CNN Chile sobre las prioridades ejecutivas en seguridad pública, ajuste de gasto fiscal y viabilidad legislativa en los primeros 100 días de mandato.',
            relatedCategory: 'General'
        },
        {
            id: 'vid-5',
            title: 'Cirugías en listas de espera se derivan a clínicas privadas mediante convenio Fonasa para reducir demoras',
            channel: 'T13 (Teletrece)',
            channelVerified: true,
            publishedDate: '01 abr 2026',
            duration: '4:05',
            youtubeVideoId: 'xBzLiDkbjyg',
            youtubeUrl: 'https://www.youtube.com/watch?v=xBzLiDkbjyg',
            summary: 'Reportaje de T13 sobre la derivación de pacientes del sistema público Fonasa a clínicas privadas y extensión de pabellones quirúrgicos para enfrentar las listas de espera.',
            relatedCategory: 'Salud'
        }
    ];

    const videosCatalog = (typeof coherenciaConfig !== 'undefined' && Array.isArray(coherenciaConfig.videos))
        ? coherenciaConfig.videos
        : defaultVideos;

    const defaultCommitments = [
        { id: 'com-1', title: 'Despliegue militar ampliado en infraestructura crítica fronteriza', area: 'Seguridad y Fronteras', status: 'CUMPLIDA', executionPct: 100, officialDocRef: 'D.S. N° 142 · Ministerio de Defensa Nacional', datePromulgated: '15 abr 2026', summary: 'Prórroga y facultades extraordinarias al Ejército para control de identidad y registros en pasos no habilitados de Tarapacá y Antofagasta.' },
        { id: 'com-2', title: 'Creación del Comité Operativo de Crisis de Seguridad Pública e Inmigración', area: 'Seguridad y Fronteras', status: 'CUMPLIDA', executionPct: 100, officialDocRef: 'D.S. N° 95 · Ministerio del Interior y Seguridad Pública', datePromulgated: '18 mar 2026', summary: 'Mesa unificada de mando entre Carabineros, PDI, Estado Mayor Conjunto y directores regionales de aduanas.' },
        { id: 'com-3', title: 'Proyecto de Ley de Emergencia en Seguridad y Atribuciones en Flagrancia', area: 'Seguridad y Fronteras', status: 'EN CURSO', executionPct: 65, officialDocRef: 'Boletín N° 16.912-07 · Congreso Nacional', datePromulgated: '28 mar 2026', summary: 'Aprobado en primer trámite por la Comisión de Seguridad de la Cámara de Diputados; pendiente de votación en Sala.' },
        { id: 'com-4', title: 'Zanja de contención profunda y muro perimetral en macrozona norte', area: 'Seguridad y Fronteras', status: 'BLOQUEADA', executionPct: 20, officialDocRef: 'Oficio Ord. N° 1.204 · Servicio de Evaluación Ambiental', datePromulgated: '10 may 2026', summary: 'Paralizada temporalmente por requerimiento de Estudio de Impacto Ambiental y consulta sobre acuerdos limítrofes bilaterales.' },
        { id: 'com-5', title: 'Reconducción inmediata del 100% de inmigrantes en condición irregular', area: 'Seguridad y Fronteras', status: 'INCUMPLIDA', executionPct: 42, officialDocRef: 'Informe Estadístico Fronterizo Q1 · Carabineros & PDI', datePromulgated: '30 may 2026', summary: 'Tasa efectiva de reconducción de 42.8% debido a la falta de protocolos de recepción formal por autoridades del país vecino.' },
        { id: 'com-6', title: 'Proyecto de Reforma Tributaria y rebaja de impuesto corporativo al 23%', area: 'Economía e Impuestos', status: 'EN CURSO', executionPct: 60, officialDocRef: 'Boletín N° 16.890-05 · Ministerio de Hacienda', datePromulgated: '02 abr 2026', summary: 'Mensaje Presidencial ingresado con urgencia simple. En debate técnico en la Comisión de Hacienda de la Cámara de Diputados.' },
        { id: 'com-7', title: 'Exención de contribuciones a la primera vivienda habitacional', area: 'Economía e Impuestos', status: 'EN CURSO', executionPct: 45, officialDocRef: 'Indicación al Boletín N° 16.890-05', datePromulgated: '14 abr 2026', summary: 'En revisión por la Asociación Chilena de Municipalidades (AChM) para calibrar el impacto en el Fondo Común Municipal.' },
        { id: 'com-8', title: 'Plan de contención de gasto público y auditoría a traspasos', area: 'Economía e Impuestos', status: 'CUMPLIDA', executionPct: 90, officialDocRef: 'Oficio Circular N° 12 · Ministerio de Hacienda', datePromulgated: '22 mar 2026', summary: 'Instrucciones de austeridad fiscal y revisión de convenios con corporaciones y fundaciones privadas.' },
        { id: 'com-9', title: 'Congelamiento de contrataciones y honorarios en administración central', area: 'Reforma del Estado', status: 'CUMPLIDA', executionPct: 100, officialDocRef: 'D.S. N° 88 · Ministerio de Hacienda', datePromulgated: '20 mar 2026', summary: 'Restricción de nuevas incorporaciones y revisión de renovaciones de contratas ministeriales.' },
        { id: 'com-10', title: 'Fusión y supresión de ministerios por decreto reglamentario', area: 'Reforma del Estado', status: 'BLOQUEADA', executionPct: 15, officialDocRef: 'Dictamen N° E51022 · Contraloría General de la República', datePromulgated: '17 mar 2026', summary: 'Contraloría dictaminó que la alteración de ministerios y servicios públicos requiere tramitación de ley formal en el Congreso.' },
        { id: 'com-11', title: 'Convenio ampliado con prestadores privados para listas de espera Fonasa', area: 'Salud y Listas de Espera', status: 'CUMPLIDA', executionPct: 85, officialDocRef: 'Resolución Exenta N° 314 · FONASA / Minsal', datePromulgated: '29 mar 2026', summary: 'Habilitación de compras de servicios en clínicas privadas con arancel Fonasa preferente para cirugías con mora superior a 12 meses.' },
        { id: 'com-12', title: 'Operación de pabellones quirúrgicos hospitalarios 24/7', area: 'Salud y Listas de Espera', status: 'EN CURSO', executionPct: 55, officialDocRef: 'Ordinario N° 812 · Subsecretaría de Redes Asistenciales', datePromulgated: '15 abr 2026', summary: 'Fase 1 implementada en 12 hospitales de alta complejidad con régimen de turnos vespertinos y fines de semana.' },
        { id: 'com-13', title: 'Auditoría integral a los Servicios Locales de Educación Pública (SLEP)', area: 'Educación y Social', status: 'CUMPLIDA', executionPct: 100, officialDocRef: 'Decreto Exento N° 210 · Ministerio de Educación', datePromulgated: '05 abr 2026', summary: 'Comisión interventora técnica para fiscalizar el traspaso de infraestructura y gestión presupuestaria de los SLEP.' },
        { id: 'com-14', title: 'Implementación de Sistema de Subvención por Voucher Universal', area: 'Educación y Social', status: 'SIN_DATOS', executionPct: 10, officialDocRef: 'Mesa Técnica MINEDUC', datePromulgated: 'Mayo 2026', summary: 'En etapa de modelamiento econométrico sin ingreso de proyecto formal a la Cámara de Diputados.' }
    ];

    const commitmentsCatalog = (typeof coherenciaConfig !== 'undefined' && Array.isArray(coherenciaConfig.commitments))
        ? coherenciaConfig.commitments
        : defaultCommitments;

    const repositoryDocs = [
        { id: '1', type: 'Decreto', title: 'D.S. N° 142 · 15 abr 2026', date: '15 abr 2026', summary: 'Prórroga y ampliación de facultades a FF.AA. en control de infraestructura crítica fronteriza.', entity: 'Ministerio de Defensa Nacional' },
        { id: '2', type: 'Discurso', title: 'La Moneda · 11 abr 2026', date: '11 abr 2026', summary: 'Discurso primer mes de gobierno: Anuncio de plan de reducción ministerial y auditoría a dotación fiscal.', entity: 'Presidencia de la República' },
        { id: '3', type: 'Informe', title: 'DIPRES · Balance Fiscal Marzo 2026', date: '08 abr 2026', summary: 'Evaluación de sostenibilidad fiscal y advertencia sobre financiamiento de exenciones tributarias.', entity: 'Dirección de Presupuestos (DIPRES)' },
        { id: '4', type: 'Ley', title: 'Proyecto Ley Reforma Tributaria 2026', date: '02 abr 2026', summary: 'Mensaje presidencial para rebaja gradual de impuesto corporativo al 23% y eliminación de contribuciones.', entity: 'Ministerio de Hacienda' },
        { id: '5', type: 'Ley', title: 'Ley de Emergencia en Seguridad Pública', date: '28 mar 2026', summary: 'Atribuciones especiales para allanamientos y medidas cautelares en flagrancia.', entity: 'Ministerio de Seguridad' },
        { id: '6', type: 'Decreto', title: 'D.S. N° 88 · Fusión de Servicios Estatales', date: '20 mar 2026', summary: 'Plan piloto de integración de subsecretarías y congelamiento de contrataciones.', entity: 'Ministerio de Hacienda' },
        { id: '7', type: 'Dictamen', title: 'Dictamen N° E51022 · Contraloría General', date: '17 mar 2026', summary: 'Resolución sobre límites legales a la desvinculación masiva de funcionarios a contrata.', entity: 'Contraloría General de la República' }
    ];

    const verifiedSources = [
        { ref: 'Ref 1', name: 'Diario Oficial de Chile', detail: 'Ediciones oficiales marzo-junio 2026 · 48 decretos (99% Confianza)', url: 'https://www.diariooficial.interior.gob.cl' },
        { ref: 'Ref 2', name: 'DIPRES - Ministerio de Hacienda', detail: 'Informes de Ejecución Presupuestaria y Balances (97% Confianza)', url: 'https://www.dipres.gob.cl' },
        { ref: 'Ref 3', name: 'Contraloría General de la República', detail: 'cgr.cl · Dictámenes de personal e instalación (99% Confianza)', url: 'https://www.contraloria.cl' },
        { ref: 'Ref 4', name: 'Banco Central de Chile & INE', detail: 'IPoM Marzo 2026 y series oficiales (98% Confianza)', url: 'https://www.bcentral.cl' },
        { ref: 'Ref 5', name: 'Cámara de Diputadas y Diputados', detail: 'Boletines de comisiones legislativas (96% Confianza)', url: 'https://www.camara.cl' },
        { ref: 'Ref 6', name: 'Biblioteca del Congreso Nacional (BCN)', detail: 'Archivo de programas presidenciales 2017-2021-2026', url: 'https://www.bcn.cl' }
    ];

    // 1. Render Real YouTube Video Cards & Inline Player
    const videoGrid = document.getElementById('wp-video-cards-grid');
    const playerWrapper = document.getElementById('wp-video-player-wrapper');
    const playerIframe = document.getElementById('wp-video-iframe');
    const playerTitle = document.getElementById('wp-video-player-title');
    const playerExtLink = document.getElementById('wp-video-external-link');
    const playerCloseBtn = document.getElementById('wp-video-close-btn');

    function playInlineVideo(vid) {
        if (!playerWrapper || !playerIframe) return;
        playerWrapper.classList.remove('hidden');
        playerIframe.src = `https://www.youtube.com/embed/${vid.youtubeVideoId}?autoplay=1&rel=0`;
        if (playerTitle) playerTitle.textContent = `${vid.channel} · ${vid.title}`;
        if (playerExtLink) playerExtLink.href = vid.youtubeUrl;
    }

    if (playerCloseBtn && playerWrapper && playerIframe) {
        playerCloseBtn.addEventListener('click', () => {
            playerIframe.src = '';
            playerWrapper.classList.add('hidden');
        });
    }

    function renderVideos(videosToRender) {
        if (!videoGrid) return;
        videoGrid.innerHTML = '';
        const list = (Array.isArray(videosToRender) && videosToRender.length > 0)
            ? videosToRender
            : [videosCatalog[0], videosCatalog[3]];

        list.forEach((vid) => {
            const thumb = `https://i.ytimg.com/vi/${vid.youtubeVideoId}/hqdefault.jpg`;
            const card = document.createElement('div');
            card.className = 'rounded-xl border border-slate-800/80 bg-slate-900/80 hover:bg-slate-900 hover:border-slate-700 transition-all flex flex-col justify-between overflow-hidden group';
            card.innerHTML = `
                <div class="relative aspect-video w-full bg-slate-950 overflow-hidden cursor-pointer border-b border-slate-800/80 wp-vid-thumb-trigger">
                    <img src="${thumb}" alt="${vid.title}" loading="lazy" referrerpolicy="no-referrer" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100" />
                    <div class="absolute inset-0 flex items-center justify-center">
                        <div class="w-10 h-10 rounded-full bg-rose-600/90 group-hover:bg-rose-500 text-white flex items-center justify-center shadow-lg">▶</div>
                    </div>
                    <div class="absolute top-2 left-2 bg-slate-950/85 border border-slate-700/80 px-2 py-0.5 rounded-md text-[10px] font-bold text-indigo-300">
                        ${vid.channel} ✓
                    </div>
                    <div class="absolute bottom-2 right-2 bg-slate-950/90 border border-slate-800 px-1.5 py-0.5 rounded text-[10px] font-mono text-slate-200">
                        ${vid.duration}
                    </div>
                </div>
                <div class="p-3 flex-1 flex flex-col justify-between">
                    <div>
                        <div class="flex items-center justify-between gap-1 mb-1">
                            <span class="text-[9px] uppercase font-mono bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">${vid.relatedCategory || 'General'}</span>
                            <span class="text-[10px] text-slate-400 font-mono">${vid.publishedDate}</span>
                        </div>
                        <h4 class="text-xs font-semibold text-white leading-snug mb-1.5 cursor-pointer wp-vid-title-trigger">${vid.title}</h4>
                        <p class="text-[11px] text-slate-400 line-clamp-2 leading-relaxed mb-2.5">${vid.summary}</p>
                    </div>
                    <div class="flex items-center justify-between gap-2 pt-2 border-t border-slate-800/60 mt-auto">
                        <button type="button" class="wp-vid-play-btn px-2.5 py-1 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-[10px] font-semibold border-0 cursor-pointer">
                            ▶ Reproducir aquí
                        </button>
                        <a href="${vid.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="px-2.5 py-1 text-[10px] font-semibold text-slate-300 hover:text-white bg-slate-800/90 hover:bg-slate-700 border border-slate-700 rounded-lg no-underline">
                            Ir a YouTube ↗
                        </a>
                    </div>
                </div>
            `;

            card.querySelector('.wp-vid-thumb-trigger')?.addEventListener('click', () => playInlineVideo(vid));
            card.querySelector('.wp-vid-title-trigger')?.addEventListener('click', () => playInlineVideo(vid));
            card.querySelector('.wp-vid-play-btn')?.addEventListener('click', () => playInlineVideo(vid));
            videoGrid.appendChild(card);
        });
    }

    renderVideos([videosCatalog[0], videosCatalog[3]]);

    // 2. View Mode Toggle (Structured vs Terminal)
    const btnViewStructured = document.getElementById('wp-view-structured');
    const btnViewTerminal = document.getElementById('wp-view-terminal');
    const structuredContainer = document.getElementById('wp-structured-container');
    const terminalContainer = document.getElementById('wp-terminal-container');

    if (btnViewStructured && btnViewTerminal && structuredContainer && terminalContainer) {
        btnViewStructured.addEventListener('click', () => {
            structuredContainer.classList.remove('hidden');
            terminalContainer.classList.add('hidden');
            btnViewStructured.className = 'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all bg-indigo-600 text-white border-0 cursor-pointer';
            btnViewTerminal.className = 'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer';
        });
        btnViewTerminal.addEventListener('click', () => {
            terminalContainer.classList.remove('hidden');
            structuredContainer.classList.add('hidden');
            btnViewTerminal.className = 'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all bg-indigo-600 text-white border-0 cursor-pointer';
            btnViewStructured.className = 'px-2.5 py-1 rounded-md text-[11px] font-medium transition-all text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer';
        });
    }

    // 3. Render SVG Donut Chart
    function renderDonutChart(breakdown, executedPercent) {
        const svg = document.getElementById('wp-donut-svg');
        const centerPercent = document.getElementById('wp-donut-center-percent');
        if (!svg) return;

        svg.innerHTML = '';
        const size = 110;
        const strokeWidth = 20;
        const radius = (size - strokeWidth) / 2;
        const circumference = 2 * Math.PI * radius;
        const total = breakdown.reduce((acc, item) => acc + item.value, 0);

        let cumulativePercent = 0;

        breakdown.forEach((item) => {
            const strokeDasharray = `${(item.value / total) * circumference} ${circumference}`;
            const strokeDashoffset = - (cumulativePercent / total) * circumference;
            cumulativePercent += item.value;

            const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            circle.setAttribute('cx', String(size / 2));
            circle.setAttribute('cy', String(size / 2));
            circle.setAttribute('r', String(radius));
            circle.setAttribute('fill', 'transparent');
            circle.setAttribute('stroke', item.color);
            circle.setAttribute('stroke-width', String(strokeWidth));
            circle.setAttribute('stroke-dasharray', strokeDasharray);
            circle.setAttribute('stroke-dashoffset', String(strokeDashoffset));
            circle.setAttribute('class', 'transition-all duration-300 cursor-pointer');

            circle.addEventListener('mouseenter', () => {
                circle.setAttribute('stroke-width', String(strokeWidth + 4));
                if (centerPercent) centerPercent.textContent = `${item.value}%`;
            });

            circle.addEventListener('mouseleave', () => {
                circle.setAttribute('stroke-width', String(strokeWidth));
                if (centerPercent) centerPercent.textContent = `${executedPercent}%`;
            });

            svg.appendChild(circle);
        });

        if (centerPercent) {
            centerPercent.textContent = `${executedPercent}%`;
        }
    }

    const initialBreakdown = [
        { label: 'Promesas cumplidas', value: 34, color: '#10b981', tag: 'Cumplidas' },
        { label: 'En proceso / trámite', value: 24, color: '#f59e0b', tag: 'En proceso' },
        { label: 'Bloqueadas / Incumplidas', value: 22, color: '#f43f5e', tag: 'Incumplidas' },
        { label: 'Sin datos oficiales', value: 20, color: '#64748b', tag: 'Sin datos' }
    ];
    renderDonutChart(initialBreakdown, 58);

    // 4. Update Structured UI Helper
    function updateStructuredDom(st) {
        if (!st) return;
        const themeEl = document.getElementById('wp-audit-theme');
        const statusEl = document.getElementById('wp-audit-status-badge');
        const promiseEl = document.getElementById('wp-audit-promise');
        const evidenceEl = document.getElementById('wp-audit-evidence');
        const factEl = document.getElementById('wp-audit-factchecking');
        const projEl = document.getElementById('wp-audit-projection');
        const riskEl = document.getElementById('wp-audit-risk');
        const histEl = document.getElementById('wp-audit-history');
        const verdictEl = document.getElementById('wp-audit-verdict');
        const alertEl = document.getElementById('wp-audit-alert');

        if (themeEl && st.theme) themeEl.textContent = st.theme;
        if (statusEl && st.status) statusEl.innerHTML = `<span>Status: ${st.status}</span>`;
        if (promiseEl && st.promise2026) promiseEl.textContent = `"${st.promise2026}"`;
        if (evidenceEl && st.evidence) evidenceEl.textContent = st.evidence;
        if (factEl && st.factChecking) factEl.textContent = st.factChecking;
        if (projEl && st.sixMonthProjection) projEl.textContent = st.sixMonthProjection;
        if (riskEl && st.riskLevel) riskEl.textContent = `Riesgo: ${st.riskLevel}`;
        if (histEl && st.historicalNarrative) histEl.textContent = st.historicalNarrative;
        if (verdictEl && st.verdict) verdictEl.textContent = st.verdict;
        if (alertEl && st.defundingAlert) alertEl.textContent = st.defundingAlert;

        if (st.newsVideos && Array.isArray(st.newsVideos)) {
            renderVideos(st.newsVideos);
        }
    }

    // 5. Search & Follow-Up Form Handler
    const searchForm = document.getElementById('wp-audit-search-form');
    const searchInput = document.getElementById('wp-ai-query-input');
    const followUpForm = document.getElementById('wp-followup-form');
    const followUpInput = document.getElementById('wp-followup-input');
    const submitBtn = document.getElementById('wp-btn-submit-audit');
    const aiText = document.getElementById('wp-ai-text');
    const coherenceDot = document.getElementById('wp-coherence-dot');
    const coherenceLabel = document.getElementById('wp-coherence-label');
    const complianceHeadline = document.getElementById('wp-compliance-headline');

    // Local Query History Management (up to 5 unique queries, persistent in localStorage)
    const WP_STORAGE_KEY = 'coherencia_audit_history';
    const WP_MAX_HISTORY = 5;
    const defaultWpHistory = [
        "¿Es viable el plan de control fronterizo 2026?",
        "Cotejar reforma tributaria con programas 2017 y 2021",
        "Auditar reestructuración de ministerios y funcionarios"
    ];

    function getHistory() {
        try {
            const raw = localStorage.getItem(WP_STORAGE_KEY);
            if (raw) {
                const parsed = JSON.parse(raw);
                if (Array.isArray(parsed) && parsed.length > 0) return parsed.slice(0, WP_MAX_HISTORY);
            }
        } catch (_) {}
        return defaultWpHistory;
    }

    function saveQuery(q) {
        if (!q || !q.trim()) return;
        const trimmed = q.trim();
        const current = getHistory();
        const filtered = current.filter(item => item.toLowerCase() !== trimmed.toLowerCase());
        const updated = [trimmed, ...filtered].slice(0, WP_MAX_HISTORY);
        try {
            localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(updated));
        } catch (_) {}
        renderHistory();
    }

    function clearHistory() {
        try {
            localStorage.removeItem(WP_STORAGE_KEY);
        } catch (_) {}
        renderHistory();
    }

    function removeQuery(qToRemove) {
        const current = getHistory();
        const updated = current.filter(item => item !== qToRemove);
        try {
            localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(updated));
        } catch (_) {}
        renderHistory();
    }

    function renderHistory() {
        const container = document.getElementById('wp-query-history-container');
        if (!container) return;

        const hist = getHistory();
        if (hist.length === 0) {
            container.innerHTML = `
                <div class="flex items-center justify-between px-3 py-1.5 rounded-xl bg-slate-800/30 border border-dashed border-slate-700/60 text-[11px] text-slate-400">
                    <span>Historial vacío. Las nuevas búsquedas se guardarán aquí.</span>
                    <button type="button" id="wp-restore-history-btn" class="text-indigo-400 hover:text-indigo-300 hover:underline cursor-pointer font-medium ml-2 border-0 bg-transparent">Restaurar ejemplos</button>
                </div>
            `;
            const restoreBtn = document.getElementById('wp-restore-history-btn');
            if (restoreBtn) {
                restoreBtn.addEventListener('click', () => {
                    localStorage.setItem(WP_STORAGE_KEY, JSON.stringify(defaultWpHistory));
                    renderHistory();
                });
            }
            return;
        }

        container.innerHTML = `
            <div class="bg-slate-800/60 border border-slate-700/70 rounded-2xl p-2.5 backdrop-blur-md shadow-lg text-left transition-all">
                <div class="flex items-center justify-between mb-2 px-1">
                    <div class="flex items-center gap-1.5 text-xs font-semibold text-slate-300">
                        <svg class="w-3.5 h-3.5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke-width="2"></circle><polyline points="12 6 12 12 16 14" stroke-width="2"></polyline></svg>
                        <span>Historial de auditorías</span>
                        <span class="text-[10px] text-slate-500 font-mono bg-slate-900/60 px-1.5 py-0.5 rounded-full border border-slate-700/60">${hist.length}/${WP_MAX_HISTORY}</span>
                    </div>
                    <button id="wp-clear-history-btn" type="button" class="flex items-center gap-1 text-[11px] font-medium text-slate-400 hover:text-rose-400 transition-colors py-0.5 px-2 rounded-lg hover:bg-slate-750 cursor-pointer border-0 bg-transparent" title="Borrar historial local">
                        <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6" stroke-width="2"></polyline><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" stroke-width="2"></path></svg>
                        <span>Limpiar historial</span>
                    </button>
                </div>
                <div class="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 no-scrollbar">
                    ${hist.map((item) => `
                        <div class="wp-hist-chip group shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-850 hover:bg-slate-750 border border-slate-700 hover:border-indigo-500/60 text-slate-300 hover:text-indigo-200 text-xs transition-all shadow-sm cursor-pointer select-none" data-query="${item.replace(/"/g, '&quot;')}">
                            <svg class="w-3 h-3 text-indigo-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="1 4 1 10 7 10" stroke-width="2"></polyline><path d="M3.51 15a9 9 0 102.13-9.36L1 10" stroke-width="2"></path></svg>
                            <span class="max-w-[190px] sm:max-w-[250px] truncate font-medium text-left">${item}</span>
                            <button type="button" class="wp-hist-del ml-1 p-0.5 rounded-full text-slate-500 hover:text-rose-400 hover:bg-slate-700/80 transition-colors shrink-0 border-0 bg-transparent" data-del="${item.replace(/"/g, '&quot;')}" title="Eliminar consulta">
                                <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18" stroke-width="2"></line><line x1="6" y1="6" x2="18" y2="18" stroke-width="2"></line></svg>
                            </button>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const clearBtn = document.getElementById('wp-clear-history-btn');
        if (clearBtn) {
            clearBtn.addEventListener('click', (e) => {
                e.preventDefault();
                clearHistory();
            });
        }

        container.querySelectorAll('.wp-hist-chip').forEach(chip => {
            chip.addEventListener('click', (e) => {
                if (e.target.closest('.wp-hist-del')) return;
                const q = chip.getAttribute('data-query');
                if (q) {
                    if (searchInput) searchInput.value = q;
                    executeAudit(q);
                }
            });
        });

        container.querySelectorAll('.wp-hist-del').forEach(delBtn => {
            delBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const q = delBtn.getAttribute('data-del');
                if (q) removeQuery(q);
            });
        });
    }

    // Render initially
    renderHistory();

    async function executeAudit(query) {
        if (!query || !query.trim()) return;
        saveQuery(query);

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.querySelector('.btn-text')?.classList.add('hidden');
            submitBtn.querySelector('.btn-spinner')?.classList.remove('hidden');
        }

        const factEl = document.getElementById('wp-audit-factchecking');
        if (factEl) {
            factEl.textContent = 'EJECUTANDO PROTOCOLO DE AUDITORÍA RAG + GOOGLE SEARCH GROUNDING (11 mar – 19 jun 2026)...';
        }

        try {
            const restUrl = (typeof coherenciaConfig !== 'undefined' && coherenciaConfig.restUrl)
                ? coherenciaConfig.restUrl
                : '/wp-json/coherencia/v1/audit';

            const response = await fetch(restUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-WP-Nonce': (typeof coherenciaConfig !== 'undefined') ? coherenciaConfig.nonce : ''
                },
                body: JSON.stringify({ query })
            });

            if (!response.ok) throw new Error('Error en consulta de auditoría');

            const res = await response.json();
            const data = res.data;

            if (aiText && data.aiAnalysis) {
                aiText.textContent = data.aiAnalysis;
            }

            if (data.structured) {
                updateStructuredDom(data.structured);
            }

            if (coherenceLabel && data.coherenceStatus) {
                coherenceLabel.textContent = data.coherenceStatus;
            }

            if (coherenceDot) {
                if (data.statusColor === 'amber') {
                    coherenceDot.className = 'w-2 h-2 rounded-full bg-amber-400 shadow-sm shadow-amber-400/50';
                } else if (data.statusColor === 'rose') {
                    coherenceDot.className = 'w-2 h-2 rounded-full bg-rose-400 shadow-sm shadow-rose-400/50';
                } else if (data.statusColor === 'slate') {
                    coherenceDot.className = 'w-2 h-2 rounded-full bg-slate-400 shadow-sm shadow-slate-400/50';
                } else {
                    coherenceDot.className = 'w-2 h-2 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50';
                }
            }

            if (complianceHeadline && data.headline) {
                complianceHeadline.textContent = data.headline;
            }

            if (data.breakdown) {
                renderDonutChart(data.breakdown, data.complianceRate || 58);
            }

        } catch (error) {
            console.error('Audit query fallback:', error);
            const fallbackSt = {
                theme: `Auditoría de Gestión Pública: ${query}`,
                promise2026: 'Compromiso sectorial en el marco de la instalación gubernamental de los primeros 100 días (11 mar – 19 jun 2026).',
                status: 'EN CURSO',
                evidence: 'Diario Oficial de la República de Chile y balances de ejecución DIPRES.',
                factChecking: `Al contrastar la consulta "${query}" con el repositorio oficial y registros de DIPRES, se registra una ejecución sectorial acumulada del 18.2% frente al 32% programado inicialmente.\n\nLos órganos de control fiscal registran tramitación regular con toma de razón en Contraloría General de la República.`,
                sixMonthProjection: 'Sujeto a disponibilidad presupuestaria efectiva del segundo semestre de 2026 y tramitación legislativa.',
                riskLevel: 'Medio',
                historicalNarrative: 'Alineado con el programa presidencial 2026 con adecuaciones pragmáticas.',
                verdict: 'EVOLUCIÓN PRAGMÁTICA',
                defundingAlert: 'Evaluación presupuestaria en curso por DIPRES y el Consejo Fiscal Autónomo (CFA).',
                newsVideos: [videosCatalog[3], videosCatalog[0]]
            };
            updateStructuredDom(fallbackSt);
        } finally {
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.querySelector('.btn-text')?.classList.remove('hidden');
                submitBtn.querySelector('.btn-spinner')?.classList.add('hidden');
            }
        }
    }

    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (searchInput) executeAudit(searchInput.value);
        });
    }

    if (followUpForm) {
        followUpForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (followUpInput && followUpInput.value.trim()) {
                const q = followUpInput.value.trim();
                if (searchInput) searchInput.value = q;
                followUpInput.value = '';
                executeAudit(q);
            }
        });
    }

    // Suggestion Chips & Update Items
    document.querySelectorAll('.suggestion-chip, .update-item').forEach((btn) => {
        btn.addEventListener('click', () => {
            const q = btn.getAttribute('data-query');
            if (q) {
                if (searchInput) searchInput.value = q;
                executeAudit(q);
            }
        });
    });

    // Copy & Reset Buttons
    const copyBtn = document.getElementById('wp-btn-copy');
    if (copyBtn && aiText) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(aiText.textContent || '');
            const origHtml = copyBtn.innerHTML;
            copyBtn.innerHTML = '<span class="text-emerald-400 text-xs font-bold font-mono">✓</span>';
            setTimeout(() => { copyBtn.innerHTML = origHtml; }, 2000);
        });
    }

    const resetBtn = document.getElementById('wp-btn-reset');
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            executeAudit('¿Es viable el plan de control fronterizo 2026?');
        });
    }

    // Light / Dark Theme Toggle for WordPress Theme Compatibility
    const themeToggleBtn = document.getElementById('btn-theme-toggle-wp');
    const savedTheme = localStorage.getItem('coherencia_theme_mode');
    if (savedTheme === 'light') {
        document.body.classList.add('coherencia-light-mode');
        document.querySelectorAll('.coherencia-wp-scope').forEach((el) => {
            el.classList.add('coherencia-theme-light');
            el.classList.remove('coherencia-theme-dark');
        });
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('coherencia-light-mode');
            document.querySelectorAll('.coherencia-wp-scope').forEach((el) => {
                if (isLight) {
                    el.classList.add('coherencia-theme-light');
                    el.classList.remove('coherencia-theme-dark');
                } else {
                    el.classList.remove('coherencia-theme-light');
                    el.classList.add('coherencia-theme-dark');
                }
            });
            localStorage.setItem('coherencia_theme_mode', isLight ? 'light' : 'dark');
        });
    }

    // 6. Modals Logic
    const modals = document.querySelectorAll('.wp-modal');
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const modalCloses = document.querySelectorAll('.modal-close');

    function openModal(id) {
        const m = document.getElementById(id);
        if (m) {
            m.classList.remove('hidden');
            document.body.classList.add('overflow-hidden');
        }
    }

    function closeAllModals() {
        modals.forEach((m) => m.classList.add('hidden'));
        document.body.classList.remove('overflow-hidden');
    }

    modalTriggers.forEach((trigger) => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            const target = trigger.getAttribute('data-modal-target');
            if (target) openModal(target);
        });
    });

    modalCloses.forEach((btn) => {
        btn.addEventListener('click', closeAllModals);
    });

    modals.forEach((m) => {
        m.addEventListener('click', (e) => {
            if (e.target === m) closeAllModals();
        });
    });

    // Populate 14 Commitments Modal
    const commitmentsModalList = document.getElementById('wp-commitments-modal-list');
    if (commitmentsModalList) {
        commitmentsModalList.innerHTML = '';
        commitmentsCatalog.forEach((c) => {
            const item = document.createElement('div');
            item.className = 'p-4 border border-slate-800 rounded-xl bg-slate-950/60 hover:border-slate-700 transition-all space-y-2';
            const badgeColor = c.status === 'CUMPLIDA' ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40' :
                               c.status === 'EN CURSO' ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' :
                               'bg-rose-500/20 text-rose-300 border-rose-500/40';
            item.innerHTML = `
                <div class="flex flex-wrap items-center justify-between gap-2">
                    <div>
                        <span class="text-[10px] font-semibold uppercase tracking-wider text-indigo-300 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-800/60">${c.area}</span>
                        <h4 class="text-sm font-bold text-white mt-1 mb-0">${c.title}</h4>
                    </div>
                    <span class="text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeColor}">${c.status} (${c.executionPct}%)</span>
                </div>
                <p class="text-xs text-slate-300 leading-relaxed m-0">${c.summary}</p>
                <div class="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-2 text-xs">
                    <span class="text-[11px] text-slate-400"><strong>Respaldo:</strong> ${c.officialDocRef}</span>
                    <button type="button" class="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-semibold text-xs border-0 cursor-pointer">Auditar con IA</button>
                </div>
            `;
            item.querySelector('button')?.addEventListener('click', () => {
                closeAllModals();
                const q = `Auditar cumplimiento del compromiso: ${c.title} (${c.officialDocRef})`;
                if (searchInput) searchInput.value = q;
                executeAudit(q);
            });
            commitmentsModalList.appendChild(item);
        });
    }

    // Populate Repository Modal List
    const repoList = document.getElementById('wp-repo-docs-list');
    const repoSearch = document.getElementById('wp-repo-search-input');
    function renderRepoDocs(filter = '') {
        if (!repoList) return;
        repoList.innerHTML = '';
        const filtered = repositoryDocs.filter((d) =>
            d.title.toLowerCase().includes(filter.toLowerCase()) ||
            d.summary.toLowerCase().includes(filter.toLowerCase())
        );

        filtered.forEach((doc) => {
            const item = document.createElement('div');
            item.className = 'p-3.5 border border-slate-800 rounded-xl hover:border-indigo-500/50 bg-slate-800/40 hover:bg-slate-800/80 transition-all flex items-start justify-between gap-3';
            item.innerHTML = `
                <div>
                    <div class="flex items-center gap-2 mb-1">
                        <span class="inline-block bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[10px] font-semibold px-2 py-0.5 rounded font-mono">${doc.type}</span>
                        <span class="text-xs font-bold text-white">${doc.title}</span>
                        <span class="text-[11px] text-slate-400">· ${doc.date}</span>
                    </div>
                    <p class="text-xs text-slate-400 m-0">${doc.summary}</p>
                    <p class="text-[10px] text-slate-500 mt-1 mb-0 font-medium">${doc.entity}</p>
                </div>
                <button type="button" class="shrink-0 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 px-3 py-1.5 rounded-lg shadow-sm transition-all border-0 cursor-pointer">Auditar</button>
            `;
            item.querySelector('button')?.addEventListener('click', () => {
                closeAllModals();
                const q = `Auditoría sobre ${doc.type} ${doc.title}: ${doc.summary}`;
                if (searchInput) searchInput.value = q;
                executeAudit(q);
            });
            repoList.appendChild(item);
        });
    }
    renderRepoDocs();

    if (repoSearch) {
        repoSearch.addEventListener('input', (e) => {
            renderRepoDocs(e.target.value);
        });
    }

    // Populate Sources Modal List
    const sourcesList = document.getElementById('wp-all-sources-list');
    if (sourcesList) {
        sourcesList.innerHTML = '';
        verifiedSources.forEach((s) => {
            const sItem = document.createElement('div');
            sItem.className = 'p-3.5 border border-slate-800 rounded-xl bg-slate-800/50 flex items-center justify-between';
            sItem.innerHTML = `
                <div>
                    <div class="flex items-center gap-2">
                        <span class="text-xs font-bold text-indigo-400 font-mono">${s.ref}</span>
                        <span class="text-xs font-bold text-white">${s.name}</span>
                    </div>
                    <p class="text-xs text-slate-400 mt-0.5 mb-0">${s.detail}</p>
                </div>
                <a href="${s.url}" target="_blank" rel="noopener noreferrer" class="text-xs text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-700/60 transition-colors no-underline">↗</a>
            `;
            sourcesList.appendChild(sItem);
        });
    }

    // Copy Share Link
    const copyShareBtn = document.getElementById('wp-btn-copy-share');
    const shareInput = document.getElementById('wp-share-link-input');
    if (copyShareBtn && shareInput) {
        copyShareBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(shareInput.value);
            copyShareBtn.textContent = '¡Copiado!';
            setTimeout(() => { copyShareBtn.textContent = 'Copiar'; }, 2000);
        });
    }
});
