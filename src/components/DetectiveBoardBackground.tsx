import React from 'react';

interface DetectiveBoardBackgroundProps {
  darkMode?: boolean;
  opacity?: number; // 0 to 1, default 0.28
}

export const DetectiveBoardBackground: React.FC<DetectiveBoardBackgroundProps> = ({
  darkMode = true,
  opacity = 0.28
}) => {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none animate-board-reveal"
    >
      {/* Layer 1: Textured Detective Corkboard / Pinboard Photographic Layer */}
      <div 
        className="absolute inset-0 transition-opacity duration-700"
        style={{ opacity: darkMode ? opacity : opacity * 0.7 }}
      >
        <img
          src="/assets/aistudio/image_9d2fb2ed.png"
          alt=""
          role="presentation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover filter contrast-125 brightness-90 saturate-75"
        />
      </div>

      {/* Layer 2: Secondary cork grain & warmth overlay from reference 3 */}
      <div 
        className="absolute inset-0 mix-blend-overlay transition-opacity duration-700"
        style={{ opacity: darkMode ? 0.16 : 0.25 }}
      >
        <img
          src="/assets/aistudio/image_3fc25125.png"
          alt=""
          role="presentation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Layer 3: Vignette Scrim (Concentrates clarity on the center content cards) */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-gradient-to-b from-black/80 via-black/60 to-black/90'
            : 'bg-gradient-to-b from-neutral-950/85 via-neutral-950/65 to-neutral-950/90'
        }`}
      />

      {/* Subtle radial center spotlight in deep red / dark noir */}
      <div
        className={`absolute inset-0 ${
          darkMode
            ? 'bg-[radial-gradient(circle_at_50%_35%,rgba(239,68,68,0.08)_0%,rgba(0,0,0,0.85)_75%)]'
            : 'bg-[radial-gradient(circle_at_50%_35%,rgba(239,68,68,0.05)_0%,rgba(10,10,10,0.85)_75%)]'
        }`}
      />

      {/* Opening Animation: Dim, flickering flashlight / lamp beam that sweeps and reveals the board */}
      <div 
        className="absolute inset-0 z-20 pointer-events-none animate-detective-light-reveal overflow-hidden"
      >
        <div className="absolute inset-0 animate-detective-beam" />
      </div>

      {/* Layer 4: SVG Red Threads Linking Evidence Nodes */}
      <svg
        className="absolute inset-0 w-full h-full overflow-visible opacity-55 sm:opacity-65 transition-opacity duration-500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="thread-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="1" dy="2" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.85" />
          </filter>
          <filter id="pin-shadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="1.5" dy="3" stdDeviation="3" floodColor="#000000" floodOpacity="0.9" />
          </filter>
          <linearGradient id="red-thread-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>

        {/* Thread 1: Top-Left note -> Center audit apex */}
        <path
          d="M 90 95 Q 320 180 500 230"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.6"
          filter="url(#thread-shadow)"
          strokeDasharray="4 1"
          opacity="0.8"
        />

        {/* Thread 2: Center audit apex -> Top-Right DIPRES note */}
        <path
          d="M 500 230 Q 820 160 1180 110"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.6"
          filter="url(#thread-shadow)"
          strokeDasharray="4 1"
          opacity="0.75"
        />

        {/* Thread 3: Center audit apex -> Bottom-Left Contraloría clipping */}
        <path
          d="M 500 230 Q 280 480 80 620"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.4"
          filter="url(#thread-shadow)"
          strokeDasharray="5 1.5"
          opacity="0.7"
        />

        {/* Thread 4: Center audit apex -> Bottom-Right 100 Days matrix */}
        <path
          d="M 500 230 Q 880 460 1200 680"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.5"
          filter="url(#thread-shadow)"
          strokeDasharray="4 1"
          opacity="0.75"
        />

        {/* Thread 5: Cross-tension tie between Top-Left and Bottom-Left notes */}
        <path
          d="M 90 95 Q 40 340 80 620"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.2"
          filter="url(#thread-shadow)"
          strokeDasharray="6 2"
          opacity="0.5"
        />

        {/* Thread 6: Cross-tension tie between Top-Right and Bottom-Right */}
        <path
          d="M 1180 110 Q 1240 380 1200 680"
          fill="none"
          stroke="url(#red-thread-grad)"
          strokeWidth="1.2"
          filter="url(#thread-shadow)"
          strokeDasharray="6 2"
          opacity="0.5"
        />
      </svg>

      {/* Layer 5: Evidence Paper Clippings & Pinned Notes (Positioned along outer margins) */}
      <div className="absolute inset-0 max-w-7xl mx-auto pointer-events-none">
        
        {/* Note 1: Top-Left (Diario Oficial) */}
        <div className="hidden xl:block absolute -left-20 top-24 w-52 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/60 rounded shadow-xl -rotate-2 transform transition-all duration-300 opacity-65 hover:opacity-90">
          {/* Push Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
              <circle cx="12" cy="12" r="7" fill="#ef4444" />
              <circle cx="10" cy="10" r="2.5" fill="#fca5a5" />
              <circle cx="12" cy="12" r="1.5" fill="#7f1d1d" />
            </svg>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold border-b border-neutral-700/60 pb-1 flex items-center justify-between">
            <span>EVIDENCIA #01</span>
            <span className="text-neutral-400">11-MAR-2026</span>
          </div>
          <p className="mt-1.5 text-[11px] font-sans text-neutral-200 leading-snug font-medium">
            Diario Oficial N° 43.812: Publicación de Decretos de Reestructuración.
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>INDEXADO</span>
            <span className="text-red-400 font-semibold">VERIFICADO ✓</span>
          </div>
        </div>

        {/* Note 2: Top-Right (DIPRES & Hacienda) */}
        <div className="hidden xl:block absolute -right-20 top-20 w-52 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/60 rounded shadow-xl rotate-3 transform transition-all duration-300 opacity-65 hover:opacity-90">
          {/* Push Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
              <circle cx="12" cy="12" r="7" fill="#ffffff" />
              <circle cx="10" cy="10" r="2.5" fill="#e5e5e5" />
              <circle cx="12" cy="12" r="1.5" fill="#525252" />
            </svg>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-white font-bold border-b border-neutral-700/60 pb-1 flex items-center justify-between">
            <span>EVIDENCIA #02</span>
            <span className="text-neutral-400">DIPRES T1</span>
          </div>
          <p className="mt-1.5 text-[11px] font-sans text-neutral-200 leading-snug font-medium">
            Partida 50 Hacienda: Informe de Ejecución Presupuestaria Trimestral.
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>TRAZABILIDAD</span>
            <span className="text-white font-semibold">BALANCES FISCALES</span>
          </div>
        </div>

        {/* Note 3: Bottom-Left (Contraloría Dictámenes) */}
        <div className="hidden 2xl:block absolute -left-28 bottom-36 w-52 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/60 rounded shadow-xl rotate-1 transform transition-all duration-300 opacity-60 hover:opacity-90">
          {/* Push Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
              <circle cx="12" cy="12" r="7" fill="#ef4444" />
              <circle cx="10" cy="10" r="2.5" fill="#fca5a5" />
              <circle cx="12" cy="12" r="1.5" fill="#7f1d1d" />
            </svg>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold border-b border-neutral-700/60 pb-1 flex items-center justify-between">
            <span>EVIDENCIA #03</span>
            <span className="text-neutral-400">CGR CHILE</span>
          </div>
          <p className="mt-1.5 text-[11px] font-sans text-neutral-200 leading-snug font-medium">
            Dictamen CGR N° 18.420: Control preventivo de legalidad y toma de razón.
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>EXPEDIENTE</span>
            <span className="text-red-400 font-semibold">COHERENTE ✓</span>
          </div>
        </div>

        {/* Note 4: Bottom-Right (100 Días / 14 Medidas) */}
        <div className="hidden 2xl:block absolute -right-28 bottom-40 w-52 p-3 bg-neutral-900/90 backdrop-blur-sm border border-neutral-700/60 rounded shadow-xl -rotate-2 transform transition-all duration-300 opacity-60 hover:opacity-90">
          {/* Push Pin */}
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-4 h-4">
            <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md">
              <circle cx="12" cy="12" r="7" fill="#ef4444" />
              <circle cx="10" cy="10" r="2.5" fill="#fca5a5" />
              <circle cx="12" cy="12" r="1.5" fill="#7f1d1d" />
            </svg>
          </div>
          <div className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold border-b border-neutral-700/60 pb-1 flex items-center justify-between">
            <span>EVIDENCIA #04</span>
            <span className="text-neutral-400">100 DÍAS</span>
          </div>
          <p className="mt-1.5 text-[11px] font-sans text-neutral-200 leading-snug font-medium">
            Matriz de Cumplimiento: 14 medidas auditadas vs. programa oficial.
          </p>
          <div className="mt-1.5 flex items-center justify-between text-[9px] font-mono text-neutral-400">
            <span>PERÍODO</span>
            <span className="text-neutral-300 font-semibold">11 MAR - 19 JUN</span>
          </div>
        </div>

      </div>

      {/* Realistic push-pins positioned at the central evidence junctions (Red & White palette) */}
      <div className="absolute top-[28%] left-[22%] hidden lg:block pointer-events-none opacity-80">
        <svg viewBox="0 0 24 24" className="w-4 h-4 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]">
          <circle cx="12" cy="12" r="6" fill="#ef4444" />
          <circle cx="10" cy="10" r="2" fill="#ffffff" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute top-[28%] right-[22%] hidden lg:block pointer-events-none opacity-80">
        <svg viewBox="0 0 24 24" className="w-4 h-4 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]">
          <circle cx="12" cy="12" r="6" fill="#ffffff" />
          <circle cx="10" cy="10" r="2" fill="#737373" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-[32%] left-[16%] hidden lg:block pointer-events-none opacity-75">
        <svg viewBox="0 0 24 24" className="w-4 h-4 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]">
          <circle cx="12" cy="12" r="6" fill="#ef4444" />
          <circle cx="10" cy="10" r="2" fill="#ffffff" opacity="0.6" />
        </svg>
      </div>

      <div className="absolute bottom-[32%] right-[16%] hidden lg:block pointer-events-none opacity-75">
        <svg viewBox="0 0 24 24" className="w-4 h-4 filter drop-shadow-[0_3px_5px_rgba(0,0,0,0.9)]">
          <circle cx="12" cy="12" r="6" fill="#ffffff" />
          <circle cx="10" cy="10" r="2" fill="#737373" opacity="0.6" />
        </svg>
      </div>

    </div>
  );
};
