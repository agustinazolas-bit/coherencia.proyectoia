import React, { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  Search, 
  ArrowRight, 
  Database, 
  ShieldCheck, 
  Calendar, 
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock
} from 'lucide-react';
import { playPaperRustle, playPinClick, playPaperSlide } from '../utils/audio';

interface DataIntelligenceBannerProps {
  onSearchQuery: (query: string) => void;
  onOpenRepository: () => void;
  onOpenCommitments: () => void;
}

export const DataIntelligenceBanner: React.FC<DataIntelligenceBannerProps> = ({
  onSearchQuery,
  onOpenRepository,
  onOpenCommitments
}) => {
  const [selectedType, setSelectedType] = useState<'decretos' | 'presupuesto' | 'coherencia'>('decretos');
  const [selectedArea, setSelectedArea] = useState('Seguridad y Fronteras');
  const [dateFrom, setDateFrom] = useState('Mar 2026');
  const [dateTo, setDateTo] = useState('Jun 2026');

  const handleCreateReport = (e: React.FormEvent) => {
    e.preventDefault();
    playPaperRustle();
    const query = `Auditoría focalizada sobre ${selectedArea}: ${
      selectedType === 'decretos' ? 'decretos e instructivos promulgados' :
      selectedType === 'presupuesto' ? 'asignación presupuestaria y balance DIPRES' :
      'consistencia con programas históricos 2017 y 2021'
    } en el período ${dateFrom} - ${dateTo}`;
    onSearchQuery(query);
  };

  return (
    <section className="bg-[#1a1c21] border border-[#30343d] rounded-2xl overflow-hidden shadow-2xl my-4 text-neutral-200 font-sans">
      
      {/* Top Banner Title inspired by Bureau of Investigative Journalism & CRPD Dashboard */}
      <div className="bg-[#141518] px-4 sm:px-6 py-3 border-b border-[#30343d] flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center text-blue-400">
            <Database className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-extrabold text-white uppercase tracking-wider">
              PANEL DE INTELIGENCIA DOCUMENTAL & AUDITORÍA CIUDADANA
            </h2>
            <p className="text-[11px] text-neutral-400">
              Primeros 100 días de gobierno · Base de datos indexada con trazabilidad legal y fiscal
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-neutral-400 bg-[#202226] border border-[#34373e] px-2.5 py-1 rounded-md">
            Período: <strong className="text-white">11 mar – 19 jun 2026</strong>
          </span>
        </div>
      </div>

      {/* 3-Column Grid Layout matching Image 1: Current Statistics | Explore the Database | Get the Full Data */}
      <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-[#30343d]">
        
        {/* ========================================================================= */}
        {/* COLUMN 1 (4 cols): ESTADÍSTICAS ACTUALES (HIGH IMPACT NUMBERS)             */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#16171a] flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Estadísticas del Ciclo
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-xs shadow-emerald-400/50"></span>
            </div>

            <div className="space-y-3.5">
              {/* Stat 1 */}
              <div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                  14
                </div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Compromisos gubernamentales monitoreados
                </div>
              </div>

              {/* Stat 2 */}
              <div>
                <div className="text-2xl sm:text-3xl font-extrabold text-blue-300 tracking-tight">
                  58%
                </div>
                <div className="text-[11px] uppercase tracking-wider text-neutral-400 font-semibold">
                  Tasa media de avance administrativo
                </div>
              </div>

              {/* Stat 3 */}
              <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#30343d]">
                <div>
                  <div className="text-lg font-bold text-emerald-400">
                    4 medidas
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase">
                    Evidencia suficiente
                  </div>
                </div>
                <div>
                  <div className="text-lg font-bold text-rose-400">
                    4 medidas
                  </div>
                  <div className="text-[10px] text-neutral-400 uppercase">
                    Brecha o contradicción
                  </div>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-neutral-400 leading-relaxed border-t border-[#30343d] pt-3">
            Las cifras corresponden al cruce oficial entre el Diario Oficial, la Dirección de Presupuestos (DIPRES) y dictámenes de la Contraloría General de la República.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 2 (4 cols): EXPLORADOR DE BASE DE DATOS (FILTROS Y CONSULTA)        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#1a1c21] flex flex-col justify-between">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-3">
              Explorar la Base de Datos
            </span>

            {/* Radio Selectors */}
            <div className="space-y-2 mb-4 text-xs font-medium">
              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-200 hover:text-white">
                <input
                  type="radio"
                  name="explorerType"
                  checked={selectedType === 'decretos'}
                  onChange={() => setSelectedType('decretos')}
                  className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Decretos y actos administrativos oficiales</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-200 hover:text-white">
                <input
                  type="radio"
                  name="explorerType"
                  checked={selectedType === 'presupuesto'}
                  onChange={() => setSelectedType('presupuesto')}
                  className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Alertas presupuestarias y balances fiscales (DIPRES)</span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer text-neutral-200 hover:text-white">
                <input
                  type="radio"
                  name="explorerType"
                  checked={selectedType === 'coherencia'}
                  onChange={() => setSelectedType('coherencia')}
                  className="accent-blue-500 w-3.5 h-3.5 cursor-pointer"
                />
                <span>Trazabilidad histórica (Programas 2017 · 2021 · 2026)</span>
              </label>
            </div>

            {/* Dropdown: Área / Ministerio */}
            <div className="space-y-1 mb-3">
              <label className="text-[11px] font-semibold text-neutral-400 uppercase tracking-wider">
                Área / Política Pública:
              </label>
              <select
                value={selectedArea}
                onChange={(e) => setSelectedArea(e.target.value)}
                className="w-full bg-[#202226] border border-[#383b43] text-white text-xs rounded-xl p-2.5 focus:border-blue-500 focus:outline-hidden cursor-pointer"
              >
                <option value="Seguridad y Fronteras">Seguridad, FF.AA. e Infraestructura Crítica</option>
                <option value="Economía y Reforma Tributaria">Economía, Impuestos y Balance Fiscal</option>
                <option value="Modernización y Fusión Ministerial">Reforma del Estado y Empleo Público</option>
                <option value="Salud y Listas de Espera">Salud Pública, GES y Recursos Hospitalarios</option>
                <option value="Educación y Deuda Docente">Educación, Voucher y Deuda Histórica</option>
              </select>
            </div>

            {/* Date Range Selectors */}
            <div className="grid grid-cols-2 gap-2 mb-4">
              <div>
                <label className="text-[10px] text-neutral-400 block mb-1 uppercase">Desde:</label>
                <select
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full bg-[#202226] border border-[#383b43] text-white text-xs rounded-lg p-2 focus:border-blue-500"
                >
                  <option value="Mar 2026">11 Mar 2026</option>
                  <option value="Abr 2026">Abr 2026</option>
                  <option value="May 2026">May 2026</option>
                </select>
              </div>

              <div>
                <label className="text-[10px] text-neutral-400 block mb-1 uppercase">Hasta:</label>
                <select
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full bg-[#202226] border border-[#383b43] text-white text-xs rounded-lg p-2 focus:border-blue-500"
                >
                  <option value="Jun 2026">19 Jun 2026 (100 días)</option>
                  <option value="May 2026">May 2026</option>
                  <option value="Abr 2026">Abr 2026</option>
                </select>
              </div>
            </div>
          </div>

          {/* Action CTA Button matching Image 1 */}
          <button
            type="button"
            onClick={handleCreateReport}
            className="w-full min-h-[42px] px-4 py-2.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white text-xs font-bold tracking-wide rounded-xl transition-all flex items-center justify-between shadow-md cursor-pointer"
          >
            <span>Generar Reporte de Auditoría</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* COLUMN 3 (4 cols): DATOS ABIERTOS & METODOLOGÍA (GET THE FULL DATA)        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-4 p-5 sm:p-6 bg-[#16171a] flex flex-col justify-between space-y-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-300 block mb-2">
              Acceso a la Base de Datos Abierta
            </span>

            <p className="text-xs text-neutral-300 leading-relaxed mb-3">
              Verificamos cada afirmación contrastando fuentes primarias oficiales. Los datos están estructurados en matrices temporales y accesibles públicamente bajo licencia de transparencia.
            </p>

            <button
              type="button"
              onClick={() => {
                playPinClick();
                onOpenRepository();
              }}
              className="w-full min-h-[38px] p-2.5 rounded-xl border border-[#383b43] hover:border-blue-500 bg-[#202226] hover:bg-[#25282f] text-xs font-semibold text-neutral-200 hover:text-white flex items-center justify-between transition-all cursor-pointer shadow-xs mb-4"
            >
              <div className="flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-blue-400" />
                <span>Explorar Repositorio (48 Documentos)</span>
              </div>
              <span className="text-blue-400 font-bold">›</span>
            </button>

            {/* Latest Acts list matching "Latest strike" list in Image 1 */}
            <div className="space-y-1.5 pt-1 border-t border-[#30343d]">
              <span className="text-[10px] uppercase tracking-wider text-neutral-400 font-bold block mb-1">
                Últimos actos indexados:
              </span>
              <div className="text-xs space-y-1">
                <div className="flex items-center justify-between text-neutral-300 py-0.5 border-b border-[#2d3037]">
                  <span className="truncate pr-2">D.S. N° 123 · Despliegue FF.AA. Norte</span>
                  <span className="text-[10px] text-neutral-400 shrink-0">Defensa</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300 py-0.5 border-b border-[#2d3037]">
                  <span className="truncate pr-2">Res. Ex. N° 45 · Balance fiscal 2026</span>
                  <span className="text-[10px] text-neutral-400 shrink-0">DIPRES</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300 py-0.5 border-b border-[#2d3037]">
                  <span className="truncate pr-2">Dictamen CGR N° 8.942 · Contratas</span>
                  <span className="text-[10px] text-neutral-400 shrink-0">Contraloría</span>
                </div>
                <div className="flex items-center justify-between text-neutral-300 py-0.5">
                  <span className="truncate pr-2">D.S. N° 98 · Alta seguridad carcelaria</span>
                  <span className="text-[10px] text-neutral-400 shrink-0">Justicia</span>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2 text-[11px] text-neutral-400 flex items-center justify-between">
            <span>Metodología ética y cotejo primario</span>
            <button
              onClick={() => {
                playPaperSlide();
                onOpenCommitments();
              }}
              className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer underline"
            >
              14 Medidas
            </button>
          </div>
        </div>

      </div>

    </section>
  );
};
