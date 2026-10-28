<?php
/**
 * Template Part: COHERENCIA EL AUDITOR Dashboard + Modals (v2.0)
 * Reusable in front-page.php and via [coherencia_auditor] shortcode in any WordPress theme/page
 *
 * @package Coherencia
 */

if ( ! defined( 'ABSPATH' ) ) {
    exit;
}
?>

<div class="coherencia-dashboard-container w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 relative z-10">

    <!-- Hero & Searchbar Section -->
    <section class="w-full pt-10 pb-8 text-center px-2 sm:px-6 relative z-10">
        <div class="max-w-3xl mx-auto">
            
            <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tighter mb-3 leading-[1.15] font-sans">
                Auditoría gubernamental <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-sky-400 to-blue-400">automatizada</span>
            </h1>

            <div class="mb-6 space-y-2">
                <p class="text-sm sm:text-base md:text-lg text-slate-300 font-normal max-w-2xl mx-auto leading-relaxed">
                    Unidad de verificación <strong class="text-indigo-300 font-semibold">EL AUDITOR</strong>: Fiscalización documental y prospectiva de los primeros 100 días de gobierno (Chile, 2026).
                </p>
                <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800/90 border border-slate-700 text-xs text-slate-300 shadow-sm font-mono">
                    <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span class="text-slate-400 font-medium font-sans">Período investigado:</span>
                    <span class="text-white font-semibold font-mono">11 de Marzo de 2026 – 19 de Junio de 2026</span>
                    <span class="text-indigo-400 font-medium text-[11px]">(100 días)</span>
                </div>
            </div>

            <!-- Main Search Form -->
            <form id="wp-audit-search-form" class="relative max-w-2xl mx-auto">
                <div class="flex items-center bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20 rounded-2xl shadow-2xl backdrop-blur-md transition-all p-2 pl-4">
                    <svg class="w-5 h-5 text-indigo-400 shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="11" cy="11" r="8" stroke-width="2"></circle>
                        <line x1="21" y1="21" x2="16.65" y2="16.65" stroke-width="2"></line>
                    </svg>

                    <input
                        id="wp-ai-query-input"
                        type="text"
                        placeholder="Pregunta a EL AUDITOR (ej: ¿Es viable el plan de control fronterizo 2026?)..."
                        class="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-500 focus:outline-hidden py-1.5 pr-2 border-0"
                        required
                    />

                    <button
                        id="wp-btn-submit-audit"
                        type="submit"
                        class="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide transition-all flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/25 active:scale-95 cursor-pointer border-0"
                    >
                        <span class="btn-text">ENV</span>
                        <svg class="btn-spinner hidden w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
                        </svg>
                    </button>
                </div>
            </form>

            <!-- Quick Suggestion Chips -->
            <div class="mt-4 sm:mt-5 space-y-2.5">
                <div class="text-xs text-slate-400 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2.5">
                    <span class="text-slate-500 font-medium mr-1 text-[11px] sm:text-xs">Sugerencias rápidas:</span>
                    <button type="button" data-query="¿Es viable el plan de control fronterizo 2026?" class="suggestion-chip px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-indigo-300 border border-slate-700/80 text-[11px] sm:text-xs transition-all cursor-pointer">
                        Plan fronteras y FF.AA.
                    </button>
                    <button type="button" data-query="Cotejar reforma tributaria con programas 2017 y 2021" class="suggestion-chip px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-indigo-300 border border-slate-700/80 text-[11px] sm:text-xs transition-all cursor-pointer">
                        Reforma tributaria vs 2021
                    </button>
                    <button type="button" data-query="Auditar reestructuración de ministerios y funcionarios" class="suggestion-chip px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-indigo-300 border border-slate-700/80 text-[11px] sm:text-xs transition-all cursor-pointer">
                        Fusión de ministerios
                    </button>
                    <button type="button" data-query="Auditar avance en listas de espera de Salud y Fonasa" class="suggestion-chip px-2.5 py-1 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-indigo-300 border border-slate-700/80 text-[11px] sm:text-xs transition-all cursor-pointer">
                        Listas de espera Fonasa
                    </button>
                </div>

                <div class="flex items-center justify-center gap-2 text-[11px] text-slate-400 font-mono">
                    <span class="inline-flex items-center gap-1 text-sky-400 bg-sky-950/40 border border-sky-800/40 px-2 py-0.5 rounded-full">
                        <span class="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                        Google Search Grounding
                    </span>
                    <span class="text-slate-400">Respaldo activo con Google Search y reportajes reales de YouTube</span>
                </div>
            </div>

        </div>
    </section>

    <!-- Main Layout: Top Full-Width EL AUDITOR + Compliance Card, Bottom 2-Column Grid -->
    <div class="space-y-6 mt-3">

        <!-- Top Section: EL AUDITOR & ESTADO DE CUMPLIMIENTO -->
        <div class="space-y-5">

            <!-- EL AUDITOR Card -->
            <div id="wp-card-ai-response" class="bg-slate-900/90 rounded-2xl border border-slate-700/80 shadow-2xl backdrop-blur-md flex flex-col justify-between overflow-hidden transition-all">
                
                <!-- Top Terminal Bar -->
                <div class="bg-slate-950/80 px-4 sm:px-5 py-3 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <div class="flex items-center gap-2.5">
                        <div class="relative w-8 h-8 rounded-lg bg-indigo-600/30 border border-indigo-500/50 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                            IA
                            <span class="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-emerald-400 border border-slate-950"></span>
                        </div>
                        <div>
                            <div class="flex items-center gap-2 flex-wrap">
                                <span class="text-xs font-bold uppercase tracking-wider text-indigo-300">EL AUDITOR</span>
                                <span class="inline-flex items-center gap-1 text-[10px] uppercase font-mono px-2 py-0.5 rounded-md bg-indigo-900/40 border border-indigo-700/50 text-indigo-300">
                                    <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                                    RAG v2.6 · CHILE 2026
                                </span>
                                <div class="inline-flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-md border bg-sky-500/15 border-sky-500/40 text-sky-300">
                                    <span>🌐 Google Search Grounding: Conectado</span>
                                </div>
                            </div>
                            <p class="text-[11px] text-slate-400 font-mono m-0">
                                Período auditado: <span class="text-slate-300 font-semibold">11 mar 2026 – 19 jun 2026</span> · Primeros 100 Días
                            </p>
                        </div>
                    </div>

                    <!-- View Switcher & Actions -->
                    <div class="flex items-center gap-1.5">
                        <div class="flex items-center bg-slate-900 border border-slate-800 p-0.5 rounded-lg text-xs">
                            <button type="button" id="wp-view-structured" class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all bg-indigo-600 text-white border-0 cursor-pointer">
                                Estructura
                            </button>
                            <button type="button" id="wp-view-terminal" class="px-2.5 py-1 rounded-md text-[11px] font-medium transition-all text-slate-400 hover:text-slate-200 bg-transparent border-0 cursor-pointer">
                                Terminal
                            </button>
                        </div>

                        <button id="wp-btn-copy" type="button" title="Copiar texto de auditoría" class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors bg-transparent border-0 cursor-pointer">
                            📋
                        </button>
                        <button id="wp-btn-reset" type="button" title="Reiniciar consulta" class="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 transition-colors bg-transparent border-0 cursor-pointer">
                            ✕
                        </button>
                    </div>
                </div>

                <!-- Main Body: Structured 5-Block View + Terminal View + Real YouTube Videos -->
                <div class="p-4 sm:p-6 text-slate-200 text-xs sm:text-sm">
                    
                    <!-- Structured View Container -->
                    <div id="wp-structured-container" class="space-y-4">
                        <!-- Theme & Status Banner -->
                        <div class="bg-slate-950/60 border border-slate-800 rounded-xl p-3.5 flex flex-wrap items-center justify-between gap-3">
                            <div>
                                <span class="text-[10px] uppercase font-mono tracking-wider text-slate-400 block mb-0.5">AUDITORÍA DE TEMÁTICA</span>
                                <h3 id="wp-audit-theme" class="text-sm sm:text-base font-bold text-white tracking-tight m-0">
                                    Control Fronterizo, Despliegue de FF.AA. y Reconducciones en Macrozona Norte
                                </h3>
                            </div>
                            <div id="wp-audit-status-badge" class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold bg-amber-500/15 border-amber-500/30 text-amber-300">
                                <span>Status: EN CURSO</span>
                            </div>
                        </div>

                        <!-- 1. Registro de Promesa -->
                        <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                            <div class="text-[11px] uppercase font-bold tracking-wider text-indigo-400 mb-1.5 font-mono">
                                1. Registro de Promesa (Programa 2026)
                            </div>
                            <blockquote id="wp-audit-promise" class="italic text-slate-200 border-l-2 border-indigo-500 pl-3 py-0.5 text-xs sm:text-sm font-sans bg-indigo-950/20 rounded-r m-0">
                                "Despliegue operativo inmediato de las Fuerzas Armadas con reglas de uso de la fuerza ampliadas, reforzamiento de zanjas y habilitación de campamentos militares permanentes en pasos no habilitados."
                            </blockquote>
                        </div>

                        <!-- 2. Estado de Ejecución y Evidencia -->
                        <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                            <div class="text-[11px] uppercase font-bold tracking-wider text-indigo-400 mb-1.5 font-mono">
                                2. Estado de Ejecución y Trazabilidad
                            </div>
                            <div class="text-slate-300 text-xs sm:text-sm leading-relaxed">
                                <strong class="text-slate-100 font-semibold">Evidencia documental: </strong>
                                <span id="wp-audit-evidence">Decreto Supremo N° 142 publicado en el Diario Oficial con fecha 15 de abril de 2026; Oficio Ordinario N° 4.810 del Ministerio de Defensa Nacional.</span>
                            </div>
                        </div>

                        <!-- 3. Análisis de Fact-Checking -->
                        <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                            <div class="text-[11px] uppercase font-bold tracking-wider text-indigo-400 mb-1.5 font-mono">
                                3. Análisis de Fact-Checking (Rigor Documental y Métricas)
                            </div>
                            <p id="wp-audit-factchecking" class="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line m-0">El Ejecutivo reporta un control operativo del 85% de los pasos no habilitados en Colchane y Ollagüe mediante el patrullaje conjunto de las FF.AA. y Carabineros.

Sin embargo, los registros estadísticos de la Jefatura Nacional de Migraciones de la PDI consignan una reconducción efectiva del 42.8% debido a la falta de acuerdos bilaterales de recepción con autoridades del país vecino, generando un desacople entre la narrativa comunicacional y el registro administrativo de frontera.</p>
                        </div>

                        <!-- 4 & 5 Grid -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                            <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                                <div class="flex items-center justify-between gap-2 mb-1.5">
                                    <span class="text-[11px] uppercase font-bold tracking-wider text-indigo-400 font-mono">4. Proyección (6 meses)</span>
                                    <span id="wp-audit-risk" class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-sky-500/20 text-sky-300 border-sky-500/40">Riesgo: Medio</span>
                                </div>
                                <p id="wp-audit-projection" class="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line m-0">Saturación de capacidades logísticas del Ejército en zona altiplánica y aumento de judicialización por detenciones sin flagrancia formal.</p>
                            </div>

                            <div class="bg-slate-950/40 border border-slate-800/80 rounded-xl p-3.5">
                                <div class="flex items-center justify-between gap-2 mb-1.5">
                                    <span class="text-[11px] uppercase font-bold tracking-wider text-indigo-400 font-mono">5. Veredicto Histórico</span>
                                    <span id="wp-audit-verdict" class="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-indigo-500/20 text-indigo-300 border-indigo-500/40">EVOLUCIÓN PRAGMÁTICA</span>
                                </div>
                                <p id="wp-audit-history" class="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line m-0">En 2017 y 2021 se planteó la creación de un 'Comando Conjunto Fronterizo' autónomo. En 2026 se optó pragmáticamente por extender el DFL de Infraestructura Crítica existente para evitar dilaciones en el Congreso.</p>
                            </div>
                        </div>

                        <!-- Alerta de Desfinanciamiento -->
                        <div id="wp-audit-alert-box" class="rounded-xl p-3.5 border bg-amber-950/30 border-amber-500/40 text-amber-200">
                            <span class="text-[10px] uppercase font-mono font-bold tracking-wider block mb-0.5 text-amber-300">
                                ⚠️ ALERTA DE DESFINANCIAMIENTO (ANÁLISIS DE FACTIBILIDAD PRESUPUESTARIA DIPRES)
                            </span>
                            <p id="wp-audit-alert" class="text-xs leading-relaxed whitespace-pre-line m-0">La mantención del despliegue extendido del Ejército compromete $18.400 millones de la partida 11 del Tesoro Público sin glosa suplementaria tramitada ante DIPRES.</p>
                        </div>
                    </div>

                    <!-- Raw Terminal View Container (Hidden by default) -->
                    <div id="wp-terminal-container" class="hidden">
                        <div class="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed overflow-x-auto whitespace-pre-wrap">
                            <div class="text-slate-500 mb-2 border-b border-slate-800/80 pb-1.5 flex items-center justify-between">
                                <span>// COHERENCIA_CORE_v2026.2 :: TERMINAL DE AUDITORÍA + GOOGLE_GROUNDING</span>
                                <span class="text-emerald-400 font-bold">READY [STATUS: 200]</span>
                            </div>
                            <div id="wp-ai-text">[ AUDITORÍA DE TEMÁTICA: Control Fronterizo y Despliegue de FF.AA. en Macrozona Norte ]
[ PERÍODO INVESTIGADO: 11 de Marzo de 2026 – 19 de Junio de 2026 · Primeros 100 Días ]

1. REGISTRO DE PROMESA (2026):
"Despliegue operativo inmediato de las Fuerzas Armadas con reglas de uso de la fuerza ampliadas, reforzamiento de zanjas y habilitación de campamentos militares permanentes en pasos no habilitados."

2. ESTADO DE EJECUCIÓN:
Status: EN CURSO
Evidencia: Decreto Supremo N° 142 publicado en el Diario Oficial con fecha 15 de abril de 2026; Oficio Ordinario N° 4.810 del Ministerio de Defensa Nacional.

3. ANÁLISIS DE FACT-CHECKING:
El Ejecutivo reporta un control del 85% de los pasos no habilitados en Colchane y Ollagüe. No obstante, los registros de Carabineros de Chile y la PDI consignan una reconducción efectiva del 42.8% debido a la falta de acuerdos bilaterales de recepción con autoridades del país vecino.

4. PROYECCIÓN DE IMPACTO:
Escenario 6 meses: Saturación de capacidades logísticas del Ejército en zona altiplánica y aumento de judicialización por detenciones sin flagrancia formal.
Nivel de Riesgo: Medio

5. VEREDICTO DE COHERENCIA:
Relato Histórico: En 2017 y 2021 se planteó la creación de un 'Comando Conjunto Fronterizo' autónomo. En 2026 se optó pragmáticamente por extender el DFL de Infraestructura Crítica existente para evitar dilaciones en el Congreso.
Veredicto: EVOLUCIÓN PRAGMÁTICA

[ALERTA DE DESFINANCIAMIENTO: La mantención del despliegue extendido del Ejército compromete $18.400 millones de la partida 11 del Tesoro Público sin glosa suplementaria tramitada ante DIPRES.]</div>
                        </div>
                    </div>

                    <!-- Real Verified News Videos Section (YouTube Embed + Direct Links) -->
                    <div id="wp-videos-section" class="bg-slate-950/70 border border-indigo-900/40 rounded-xl overflow-hidden mt-4">
                        <div class="px-3.5 py-2.5 bg-slate-900/90 flex items-center justify-between border-b border-slate-800/80">
                            <div class="flex items-center gap-2">
                                <span class="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs">📺</span>
                                <div>
                                    <span class="text-[11px] font-bold text-slate-200 uppercase font-mono tracking-wider">REPORTAJES EN VIDEO DE FUENTES VERIFICADAS (YOUTUBE REAL)</span>
                                    <p class="text-[10px] text-slate-400 m-0">Cobertura periodística verificada (T13 Teletrece, 24 Horas TVN, Meganoticias, CNN Chile)</p>
                                </div>
                            </div>
                        </div>

                        <div class="p-3 sm:p-4 space-y-3">
                            <!-- Inline Active YouTube Player -->
                            <div id="wp-video-player-wrapper" class="hidden bg-slate-900 rounded-xl border border-indigo-500/40 p-3 space-y-2">
                                <div class="flex items-center justify-between gap-2 pb-2 border-b border-slate-800">
                                    <span id="wp-video-player-title" class="text-xs font-bold text-white truncate">Reproductor YouTube</span>
                                    <div class="flex items-center gap-2">
                                        <a id="wp-video-external-link" href="https://www.youtube.com/watch?v=fPEtrMbBm24" target="_blank" rel="noopener noreferrer" class="text-rose-300 hover:text-white text-[11px] font-semibold no-underline">Abrir en YouTube ↗</a>
                                        <button type="button" id="wp-video-close-btn" class="text-slate-400 hover:text-white bg-transparent border-0 cursor-pointer text-xs">✕</button>
                                    </div>
                                </div>
                                <div class="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-slate-800">
                                    <iframe id="wp-video-iframe" src="" title="Reportaje YouTube" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen referrerpolicy="strict-origin-when-cross-origin" class="w-full h-full border-0"></iframe>
                                </div>
                            </div>

                            <!-- Video Cards Grid populated by coherencia.js -->
                            <div id="wp-video-cards-grid" class="grid grid-cols-1 sm:grid-cols-2 gap-3"></div>
                        </div>
                    </div>

                </div>

                <!-- Follow-Up Direct Query Form inside EL AUDITOR -->
                <div class="px-4 sm:px-6 py-3 bg-slate-950/60 border-t border-slate-800/80">
                    <form id="wp-followup-form" class="flex items-center gap-2">
                        <input
                            id="wp-followup-input"
                            type="text"
                            placeholder="Profundizar con EL AUDITOR (Google Search activo si faltan datos oficiales)..."
                            class="flex-1 bg-slate-900/90 border border-slate-700/80 focus:border-indigo-500 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-hidden"
                        />
                        <button type="submit" class="bg-indigo-600 hover:bg-indigo-500 text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all shrink-0 border-0 cursor-pointer">
                            Consultar
                        </button>
                    </form>
                </div>

                <!-- Coherence Metrics Footer -->
                <div class="px-4 sm:px-6 py-3 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2">
                    <span class="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-indigo-400 font-mono">
                        MÉTRICAS DE COHERENCIA DOCUMENTAL · COTEJADO CON DIARIO OFICIAL Y DIPRES
                    </span>
                    <div class="flex items-center gap-2 bg-slate-900 border border-slate-700/80 px-2.5 py-1 rounded-full text-xs">
                        <span id="wp-coherence-dot" class="w-2 h-2 rounded-full bg-amber-400 shadow-xs shadow-amber-400/50"></span>
                        <span id="wp-coherence-label" class="font-semibold text-slate-200">En curso</span>
                    </div>
                </div>
            </div>

            <!-- ESTADO DE CUMPLIMIENTO (100 Días) Card -->
            <div id="wp-card-compliance" class="bg-slate-800/70 rounded-2xl border border-slate-700/80 p-5 shadow-xl backdrop-blur-sm flex flex-col justify-between">
                <div>
                    <div class="border-b border-slate-700/60 pb-2.5 mb-3 flex items-start justify-between">
                        <div>
                            <h2 class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400 m-0">
                                ESTADO DE CUMPLIMIENTO
                            </h2>
                            <p class="text-xs text-slate-400 font-normal mt-0.5 mb-0">
                                (fact-checking · 100 días de gobierno)
                            </p>
                        </div>
                        <span class="text-[10px] font-mono bg-slate-900 border border-slate-700/70 text-slate-300 px-2 py-0.5 rounded-md">
                            11 mar – 19 jun 2026
                        </span>
                    </div>

                    <div class="flex items-center justify-between gap-2 mb-3.5 bg-slate-900/60 border border-slate-700/60 rounded-xl px-3 py-2">
                        <div class="flex items-center gap-2">
                            <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-sm shadow-emerald-400/50 shrink-0"></span>
                            <span id="wp-compliance-headline" class="text-xs sm:text-sm font-bold text-white tracking-wide">
                                58% de compromisos 100 días en ejecución
                            </span>
                        </div>
                        <span class="text-[10px] font-mono text-slate-400">100 días auditados</span>
                    </div>

                    <div class="flex items-center justify-between gap-4 pt-1">
                        <div class="relative w-24 h-24 shrink-0 flex items-center justify-center">
                            <svg id="wp-donut-svg" class="w-full h-full transform -rotate-90" viewBox="0 0 110 110"></svg>
                            <div class="absolute inset-0 flex flex-col items-center justify-center pointer-events-none text-center">
                                <span id="wp-donut-center-percent" class="text-[11px] font-bold text-slate-200">58%</span>
                            </div>
                        </div>

                        <div id="wp-compliance-legend" class="space-y-1.5 min-w-0 flex-1">
                            <div class="flex items-center justify-between text-[11px] sm:text-xs">
                                <div class="flex items-center gap-2 truncate pr-1">
                                    <span class="w-2 h-2 rounded-full shrink-0 bg-emerald-500"></span>
                                    <span class="text-slate-300 font-medium truncate">Promesas cumplidas</span>
                                </div>
                                <span class="text-white font-semibold shrink-0">34%</span>
                            </div>
                            <div class="flex items-center justify-between text-[11px] sm:text-xs">
                                <div class="flex items-center gap-2 truncate pr-1">
                                    <span class="w-2 h-2 rounded-full shrink-0 bg-amber-500"></span>
                                    <span class="text-slate-300 font-medium truncate">En proceso / trámite</span>
                                </div>
                                <span class="text-white font-semibold shrink-0">24%</span>
                            </div>
                            <div class="flex items-center justify-between text-[11px] sm:text-xs">
                                <div class="flex items-center gap-2 truncate pr-1">
                                    <span class="w-2 h-2 rounded-full shrink-0 bg-rose-500"></span>
                                    <span class="text-slate-300 font-medium truncate">Bloqueadas / Incumplidas</span>
                                </div>
                                <span class="text-white font-semibold shrink-0">22%</span>
                            </div>
                            <div class="flex items-center justify-between text-[11px] sm:text-xs">
                                <div class="flex items-center gap-2 truncate pr-1">
                                    <span class="w-2 h-2 rounded-full shrink-0 bg-slate-500"></span>
                                    <span class="text-slate-300 font-medium truncate">Sin datos oficiales</span>
                                </div>
                                <span class="text-white font-semibold shrink-0">20%</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-4 pt-3 border-t border-slate-700/60">
                        <button type="button" data-modal-target="modal-compromisos" class="modal-trigger w-full py-2 px-3 rounded-xl bg-indigo-600/20 hover:bg-indigo-600/30 border border-indigo-500/40 text-indigo-200 hover:text-white text-xs font-semibold flex items-center justify-between transition-colors cursor-pointer">
                            <span>Explorar Matriz de 14 Compromisos Oficiales (100 Días)</span>
                            <span>→</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>

        <!-- Bottom Section: 2-Column Grid (Left: Últimas actualizaciones | Right: Fuentes verificadas) -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            
            <!-- Left Column: ÚLTIMAS ACTUALIZACIONES -->
            <div class="h-full">
                <div id="wp-card-updates" class="bg-slate-800/70 rounded-2xl border border-slate-700/80 p-5 shadow-xl backdrop-blur-sm flex flex-col justify-between h-full">
                    <div>
                        <div class="border-b border-slate-700/60 pb-3 mb-4">
                            <h2 class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400 m-0">
                                ÚLTIMAS ACTUALIZACIONES
                            </h2>
                            <p class="text-xs text-slate-400 font-normal mt-0.5 mb-0">
                                del vector de datos (11 mar – 19 jun 2026)
                            </p>
                        </div>

                        <div id="wp-updates-list" class="space-y-3.5">
                            <div class="update-item group cursor-pointer p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start gap-3 border border-transparent hover:border-slate-600/50" data-query="Auditoría sobre Decreto D.S. N° 142 · 15 abr 2026: Prórroga y ampliación de facultades a FF.AA. en control de infraestructura crítica fronteriza.">
                                <span class="shrink-0 inline-block bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Decreto</span>
                                <div class="min-w-0 flex-1">
                                    <p class="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug m-0">D.S. N° 142 · 15 abr 2026</p>
                                    <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5 mb-0">Prórroga y ampliación de facultades a FF.AA. en frontera norte...</p>
                                </div>
                            </div>

                            <div class="update-item group cursor-pointer p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start gap-3 border border-transparent hover:border-slate-600/50" data-query="Auditoría sobre Discurso La Moneda · 11 abr 2026: Plan de reducción ministerial y dotación fiscal.">
                                <span class="shrink-0 inline-block bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Discurso</span>
                                <div class="min-w-0 flex-1">
                                    <p class="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug m-0">La Moneda · 11 abr 2026</p>
                                    <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5 mb-0">Discurso primer mes de gobierno: Plan de reducción ministerial...</p>
                                </div>
                            </div>

                            <div class="update-item group cursor-pointer p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start gap-3 border border-transparent hover:border-slate-600/50" data-query="Auditoría sobre Informe DIPRES · Balance Fiscal Marzo 2026: Evaluación de sostenibilidad fiscal y exenciones tributarias.">
                                <span class="shrink-0 inline-block bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Informe</span>
                                <div class="min-w-0 flex-1">
                                    <p class="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug m-0">DIPRES · Balance Fiscal Marzo 2026</p>
                                    <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5 mb-0">Evaluación de sostenibilidad fiscal y advertencia sobre exenciones...</p>
                                </div>
                            </div>

                            <div class="update-item group cursor-pointer p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start gap-3 border border-transparent hover:border-slate-600/50" data-query="Auditoría sobre Ley Proyecto Reforma Tributaria 2026: Rebaja de impuesto corporativo al 23%.">
                                <span class="shrink-0 inline-block bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 text-xs font-semibold px-2 py-0.5 rounded-md">Ley</span>
                                <div class="min-w-0 flex-1">
                                    <p class="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-indigo-400 transition-colors leading-snug m-0">Proyecto Ley Reforma Tributaria 2026</p>
                                    <p class="text-[11px] text-slate-400 line-clamp-1 mt-0.5 mb-0">Mensaje presidencial para rebaja gradual de impuesto corporativo al 23%...</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="pt-4 mt-4 border-t border-slate-700/60">
                        <button type="button" data-modal-target="modal-repositorio" class="modal-trigger text-xs text-slate-400 hover:text-indigo-400 font-medium flex items-center gap-1.5 transition-colors group bg-transparent border-0 cursor-pointer">
                            <span>+ 48 documentos indexados en el repositorio</span>
                            <span>↗</span>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Right Column: FUENTES VERIFICADAS -->
            <div class="h-full">
                <div id="wp-card-sources" class="bg-slate-800/70 rounded-2xl border border-slate-700/80 p-5 shadow-xl backdrop-blur-sm flex flex-col justify-between h-full">
                    <div>
                        <div class="border-b border-slate-700/60 pb-3 mb-4">
                            <h2 class="text-xs sm:text-sm font-semibold uppercase tracking-widest text-indigo-400 m-0">
                                FUENTES VERIFICADAS
                            </h2>
                            <p class="text-xs text-slate-400 font-normal mt-0.5 mb-0">
                                Vector de datos institucional + Google Search Grounding
                            </p>
                        </div>

                        <div id="wp-sources-list" class="space-y-3.5">
                            <a href="https://www.diariooficial.interior.gob.cl" target="_blank" rel="noopener noreferrer" class="p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start justify-between gap-3.5 border border-transparent hover:border-slate-600/50 no-underline">
                                <div class="flex items-start gap-3">
                                    <span class="shrink-0 text-xs font-bold text-indigo-400 pt-0.5">Ref 1</span>
                                    <div>
                                        <p class="text-xs sm:text-sm font-bold text-slate-100 m-0">Diario Oficial de Chile</p>
                                        <p class="text-[11px] text-slate-400 mt-0.5 mb-0">Ediciones oficiales marzo-junio 2026 · 99% Confianza</p>
                                    </div>
                                </div>
                                <span class="text-xs text-slate-400">↗</span>
                            </a>

                            <a href="https://www.dipres.gob.cl" target="_blank" rel="noopener noreferrer" class="p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start justify-between gap-3.5 border border-transparent hover:border-slate-600/50 no-underline">
                                <div class="flex items-start gap-3">
                                    <span class="shrink-0 text-xs font-bold text-indigo-400 pt-0.5">Ref 2</span>
                                    <div>
                                        <p class="text-xs sm:text-sm font-bold text-slate-100 m-0">DIPRES - Ministerio de Hacienda</p>
                                        <p class="text-[11px] text-slate-400 mt-0.5 mb-0">Informes de Ejecución Presupuestaria Q1-Q2 · 97% Confianza</p>
                                    </div>
                                </div>
                                <span class="text-xs text-slate-400">↗</span>
                            </a>

                            <a href="https://www.contraloria.cl" target="_blank" rel="noopener noreferrer" class="p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start justify-between gap-3.5 border border-transparent hover:border-slate-600/50 no-underline">
                                <div class="flex items-start gap-3">
                                    <span class="shrink-0 text-xs font-bold text-indigo-400 pt-0.5">Ref 3</span>
                                    <div>
                                        <p class="text-xs sm:text-sm font-bold text-slate-100 m-0">Contraloría General de la República</p>
                                        <p class="text-[11px] text-slate-400 mt-0.5 mb-0">Dictámenes administrativos y toma de razón · 99% Confianza</p>
                                    </div>
                                </div>
                                <span class="text-xs text-slate-400">↗</span>
                            </a>

                            <a href="https://www.bcentral.cl" target="_blank" rel="noopener noreferrer" class="p-2.5 -mx-2 rounded-xl hover:bg-slate-700/50 transition-all flex items-start justify-between gap-3.5 border border-transparent hover:border-slate-600/50 no-underline">
                                <div class="flex items-start gap-3">
                                    <span class="shrink-0 text-xs font-bold text-indigo-400 pt-0.5">Ref 4</span>
                                    <div>
                                        <p class="text-xs sm:text-sm font-bold text-slate-100 m-0">Banco Central de Chile & INE</p>
                                        <p class="text-[11px] text-slate-400 mt-0.5 mb-0">IPoM Marzo 2026 y series estadísticas oficiales · 98% Confianza</p>
                                    </div>
                                </div>
                                <span class="text-xs text-slate-400">↗</span>
                            </a>
                        </div>
                    </div>

                    <div class="pt-4 mt-4 border-t border-slate-700/60">
                        <button type="button" data-modal-target="modal-fuentes" class="modal-trigger text-xs text-slate-400 hover:text-indigo-400 font-medium flex items-center gap-1.5 transition-colors group bg-transparent border-0 cursor-pointer">
                            <span>+ 44 fuentes verificadas y respaldo Google Search</span>
                            <span>↗</span>
                        </button>
                    </div>
                </div>
            </div>

        </div>

    </div>

</div>

<!-- Modals Container -->
<div id="wp-modals-wrapper" class="coherencia-wp-scope">

    <!-- Modal 14 Compromisos (100 Días) -->
    <div id="modal-compromisos" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md">
        <div class="relative w-full max-w-4xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden max-h-[88vh] flex flex-col text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/95">
                <div>
                    <h3 class="font-bold text-white text-base m-0">Matriz de 14 Compromisos Oficiales (Primeros 100 Días)</h3>
                    <p class="text-xs text-slate-400 m-0 mt-0.5">Fiscalización documental del período 11 de marzo – 19 de junio de 2026</p>
                </div>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div class="p-4 sm:p-6 overflow-y-auto space-y-3" id="wp-commitments-modal-list">
                <!-- Populated dynamically by coherencia.js -->
            </div>
        </div>
    </div>

    <!-- Modal Metodología (Ética) -->
    <div id="modal-metodologia" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 class="font-bold text-white text-base m-0">🛡️ Metodología y Principios Éticos (11 mar – 19 jun 2026)</h3>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
                <div class="p-4 bg-indigo-950/40 rounded-xl border border-indigo-500/30 text-indigo-200">
                    <p class="font-semibold mb-1 text-white">Principio de Trazabilidad y Verificabilidad en 3 Capas</p>
                    <p class="text-xs text-indigo-300/90 leading-relaxed m-0">
                        COHERENCIA investiga los primeros 100 días de mandato gubernamental en Chile (11 de marzo al 19 de junio de 2026) aplicando Fact-Checking documental, Proyección de Impacto a 6 meses y Coherencia Histórica (2017-2021-2026), con respaldo en vivo de Google Search.
                    </p>
                </div>
                <div class="border border-slate-800 rounded-xl p-3.5 bg-slate-800/50">
                    <h4 class="font-bold text-indigo-400 text-xs uppercase tracking-wider mb-1">1. Ingesta Continua del Diario Oficial y Contraloría</h4>
                    <p class="text-xs text-slate-400 leading-relaxed m-0">Extracción automatizada de Decretos Supremos, Resoluciones Exentas, Dictámenes CGR y Boletines Legislativos.</p>
                </div>
                <div class="border border-slate-800 rounded-xl p-3.5 bg-slate-800/50">
                    <h4 class="font-bold text-sky-400 text-xs uppercase tracking-wider mb-1">2. Conexión Google Search Grounding + Videos Verificados</h4>
                    <p class="text-xs text-slate-400 leading-relaxed m-0">Vinculación directa a reportajes reales de T13, 24 Horas TVN, Meganoticias y CNN Chile junto con búsqueda web en tiempo real.</p>
                </div>
                <div class="border border-slate-800 rounded-xl p-3.5 bg-slate-800/50">
                    <h4 class="font-bold text-indigo-400 text-xs uppercase tracking-wider mb-1">3. Auditoría de Viabilidad Presupuestaria (DIPRES/CFA)</h4>
                    <p class="text-xs text-slate-400 leading-relaxed m-0">Detección de alertas de desfinanciamiento y brechas fiscales frente a la Ley de Presupuestos vigente.</p>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal Repositorio -->
    <div id="modal-repositorio" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 class="font-bold text-white text-base m-0">🗄️ Repositorio de Vectores y Documentos</h3>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div class="p-6 overflow-y-auto space-y-4 text-sm text-slate-300 leading-relaxed">
                <input id="wp-repo-search-input" type="text" placeholder="Buscar decretos, discursos, informes, leyes..." class="w-full pl-4 pr-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-hidden focus:border-indigo-500" />
                <div id="wp-repo-docs-list" class="space-y-2.5 max-h-[50vh] overflow-y-auto pr-1"></div>
            </div>
        </div>
    </div>

    <!-- Modal Fuentes -->
    <div id="modal-fuentes" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="relative w-full max-w-2xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 class="font-bold text-white text-base m-0">✓ Fuentes Oficiales Verificadas y Google Grounding</h3>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div id="wp-all-sources-list" class="p-6 overflow-y-auto space-y-3 text-sm text-slate-300"></div>
        </div>
    </div>

    <!-- Modal Acerca de -->
    <div id="modal-acerca" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="relative w-full max-w-xl bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden max-h-[85vh] flex flex-col text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 class="font-bold text-white text-base m-0">Acerca de COHERENCIA v2.0</h3>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div class="p-6 space-y-4 text-sm text-slate-300 leading-relaxed">
                <p class="text-xs text-slate-300 m-0">
                    Observatorio digital impulsado por IA para auditar de forma transparente el cumplimiento de compromisos y decretos en los primeros 100 días de mandato presidencial (11 de marzo – 19 de junio de 2026), totalmente compatible con el ecosistema de temas y constructores de bloques de WordPress.
                </p>
            </div>
        </div>
    </div>

    <!-- Modal Compartir -->
    <div id="modal-share" class="wp-modal hidden fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <div class="relative w-full max-w-md bg-slate-900 rounded-2xl shadow-2xl border border-slate-700/80 overflow-hidden text-slate-100">
            <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
                <h3 class="font-bold text-white text-base m-0">Compartir Auditoría</h3>
                <button type="button" class="modal-close text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800 bg-transparent border-0 cursor-pointer">✕</button>
            </div>
            <div class="p-6 space-y-4 text-xs text-slate-300">
                <p class="m-0">Copia el enlace directo a este reporte de auditoría pública:</p>
                <div class="flex items-center gap-2 p-2 bg-slate-800 border border-slate-700 rounded-xl">
                    <input id="wp-share-link-input" type="text" readonly value="<?php echo esc_url( home_url( '/' ) ); ?>" class="w-full bg-transparent text-xs text-slate-300 focus:outline-hidden pl-2 border-0" />
                    <button id="wp-btn-copy-share" type="button" class="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-lg transition-all border-0 cursor-pointer">Copiar</button>
                </div>
            </div>
        </div>
    </div>

</div>
