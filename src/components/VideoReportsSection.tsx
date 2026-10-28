import React, { useState, useRef, useEffect } from 'react';
import { NewsVideoReport } from '../types';
import { 
  Play, 
  Youtube, 
  CheckCircle, 
  Clock, 
  ExternalLink, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft,
  ChevronRight,
  Tv, 
  X,
  Volume2
} from 'lucide-react';
import { playPaperSlide, playPinClick } from '../utils/audio';

interface VideoReportsSectionProps {
  videos?: NewsVideoReport[];
}

export const VideoReportsSection: React.FC<VideoReportsSectionProps> = ({ videos }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [activeVideo, setActiveVideo] = useState<NewsVideoReport | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  if (!videos || videos.length === 0) {
    return null;
  }

  // Update active slide index on scroll
  const handleScroll = () => {
    if (!carouselRef.current) return;
    const { scrollLeft, clientWidth } = carouselRef.current;
    if (clientWidth > 0) {
      const firstCard = carouselRef.current.children[0] as HTMLElement | undefined;
      const cardWidth = firstCard ? firstCard.offsetWidth + 14 : 340;
      const newIndex = Math.round(scrollLeft / cardWidth);
      setCurrentIndex(Math.max(0, Math.min(newIndex, videos.length - 1)));
    }
  };

  useEffect(() => {
    const el = carouselRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [videos.length]);

  // Close active embedded video on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && activeVideo) {
        setActiveVideo(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeVideo]);

  const scrollToIndex = (index: number) => {
    playPaperSlide();
    const targetIdx = Math.max(0, Math.min(index, videos.length - 1));
    setCurrentIndex(targetIdx);
    if (carouselRef.current) {
      const card = carouselRef.current.children[targetIdx] as HTMLElement;
      if (card) {
        card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
      } else {
        carouselRef.current.scrollTo({ left: targetIdx * 340, behavior: 'smooth' });
      }
    }
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPaperSlide();
    const nextIdx = currentIndex > 0 ? currentIndex - 1 : videos.length - 1;
    scrollToIndex(nextIdx);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    playPaperSlide();
    const nextIdx = currentIndex < videos.length - 1 ? currentIndex + 1 : 0;
    scrollToIndex(nextIdx);
  };

  const handleSelectVideo = (vid: NewsVideoReport) => {
    playPinClick();
    setActiveVideo(vid);
  };

  return (
    <div 
      id="section-verified-news-videos" 
      className="bg-black/92 border border-red-950 rounded-xl overflow-hidden mt-3 transition-all glow-card"
    >
      {/* Accordion / Header Bar with Carousel Controls */}
      <div className="w-full min-h-[48px] px-3.5 sm:px-4 py-2.5 bg-neutral-950 flex flex-wrap items-center justify-between gap-2 border-b border-red-950">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer flex-1 py-1"
          title={isOpen ? 'Ocultar carrusel de videos' : 'Mostrar carrusel de videos'}
        >
          <div className="p-1.5 rounded-lg bg-black text-red-400 border border-red-500/40 shrink-0">
            <Tv className="w-4 h-4 text-red-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold text-white uppercase font-mono tracking-wider truncate">
                REPORTAJES EN VIDEO DE FUENTES VERIFICADAS
              </span>
              <span className="text-[10px] bg-black text-red-300 px-1.5 py-0.5 rounded font-mono font-semibold border border-red-500/50">
                Carrusel · {videos.length} videos
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-neutral-400 font-mono truncate">
              Cobertura periodística (T13, 24 Horas TVN, Meganoticias, CNN Chile, BioBio)
            </p>
          </div>
        </button>

        {/* Carousel Quick Navigation Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto font-mono">
          {isOpen && videos.length > 1 && (
            <div className="flex items-center gap-1 bg-black p-1 rounded-lg border border-red-950">
              <span className="text-[10px] text-neutral-400 px-1.5 font-medium">
                <strong className="text-white">{currentIndex + 1}</strong> / {videos.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                title="Video anterior"
                aria-label="Video anterior"
                className="w-7 h-7 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                title="Siguiente video"
                aria-label="Siguiente video"
                className="w-7 h-7 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-900 transition-colors cursor-pointer"
            title={isOpen ? 'Ocultar reportajes' : 'Ver reportajes'}
            aria-label={isOpen ? 'Ocultar reportajes' : 'Ver reportajes'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4 text-red-400" /> : <ChevronDown className="w-4 h-4 text-red-400" />}
          </button>
        </div>
      </div>

      {/* Expanded Carousel Content */}
      {isOpen && (
        <div className="p-3 sm:p-4 space-y-3 bg-black">
          
          {/* Active Inline Embedded Video Player if selected */}
          {activeVideo && (
            <div className="bg-neutral-950 rounded-xl border border-red-500/60 p-3 sm:p-4 space-y-2.5 relative animate-fade-in-scale shadow-2xl">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-red-950">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-md bg-black border border-red-500/60 text-red-400 shrink-0">
                    <Youtube className="w-4 h-4 text-red-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md font-sans">
                      {activeVideo.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-mono">
                      <span className="text-red-300 font-semibold flex items-center gap-0.5">
                        {activeVideo.channel}
                        <CheckCircle className="w-2.5 h-2.5 text-red-400" />
                      </span>
                      <span>· {activeVideo.publishedDate}</span>
                      <span>· {activeVideo.duration}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {videos.length > 1 && (
                    <button
                      type="button"
                      onClick={() => {
                        const currentIdx = videos.findIndex(v => v.id === activeVideo.id);
                        const nextIdx = (currentIdx + 1) % videos.length;
                        setActiveVideo(videos[nextIdx]);
                        scrollToIndex(nextIdx);
                      }}
                      className="text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-neutral-900 hover:bg-neutral-800 text-[11px] flex items-center gap-1 font-mono min-h-[38px] border border-red-950 cursor-pointer active:scale-95"
                      title="Pasar al siguiente reportaje coherente con la búsqueda"
                    >
                      <span className="hidden sm:inline">Siguiente coherente</span>
                      <ChevronRight className="w-3.5 h-3.5 text-red-400" />
                    </button>
                  )}
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-red-300 p-2 rounded-lg hover:bg-black text-[11px] flex items-center gap-1 font-mono min-h-[38px]"
                    title="Abrir en YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">YouTube</span>
                  </a>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-neutral-400 hover:text-white p-2 min-h-[40px] min-w-[40px] rounded-lg hover:bg-neutral-900 flex items-center justify-center cursor-pointer active:scale-95"
                    title="Cerrar reproductor"
                    aria-label="Cerrar reproductor"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Responsive Video Container with Iframe */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-red-950 shadow-inner">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-2.5 bg-black rounded-lg border border-red-950 text-[11px] text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-start gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-red-400 shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    <strong className="text-white">Resumen del reportaje: </strong>
                    {activeVideo.summary}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="min-h-[36px] inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] font-bold transition-colors font-mono active:scale-95"
                  >
                    <span>Ver en YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Carousel Slider Track */}
          <div className="relative">
            {/* Left Scroll Button Overlay for Desktop */}
            {videos.length > 2 && (
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Desplazar videos a la izquierda"
                className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/90 hover:bg-neutral-900 border border-red-800 text-white shadow-xl items-center justify-center cursor-pointer active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-red-400" />
              </button>
            )}

            {/* Carousel Horizontal Scroll Track */}
            <div 
              ref={carouselRef}
              className="flex items-stretch gap-3.5 overflow-x-auto pb-2 scroll-smooth snap-x snap-mandatory no-scrollbar"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {videos.map((vid, idx) => {
                const isSelected = activeVideo?.id === vid.id;
                const isCurrent = currentIndex === idx;
                const thumbnailUrl = `https://i.ytimg.com/vi/${vid.youtubeVideoId}/hqdefault.jpg`;

                return (
                  <div
                    key={vid.id}
                    className={`snap-start shrink-0 w-[285px] sm:w-[325px] md:w-[340px] rounded-xl border transition-all flex flex-col justify-between overflow-hidden group animate-fade-in-up glow-card select-none ${
                      isSelected
                        ? 'bg-black border-red-500 shadow-md ring-1 ring-red-500/40'
                        : isCurrent
                        ? 'bg-neutral-950 border-red-800/80 hover:bg-black hover:border-red-600'
                        : 'bg-neutral-950/90 border-red-950 hover:bg-black hover:border-red-700'
                    }`}
                  >
                    {/* YouTube Video Thumbnail Banner */}
                    <div 
                      onClick={() => handleSelectVideo(vid)}
                      className="relative aspect-video w-full bg-black overflow-hidden cursor-pointer border-b border-red-950"
                    >
                      <img
                        src={thumbnailUrl}
                        alt={vid.title}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.src.includes('mqdefault')) {
                            target.src = `https://i.ytimg.com/vi/${vid.youtubeVideoId}/mqdefault.jpg`;
                          }
                        }}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-85 group-hover:opacity-100"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
                      
                      {/* Center Play Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-red-600 group-hover:bg-red-500 text-white flex items-center justify-center shadow-lg shadow-black/80 group-hover:scale-110 active:scale-95 transition-all">
                          <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                        </div>
                      </div>

                      {/* Top-Left Channel Badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-black/90 backdrop-blur-xs border border-red-900/80 px-2 py-0.5 rounded-md">
                        <span className="text-[10px] font-bold text-red-300 flex items-center gap-1 font-mono">
                          {vid.channel}
                          {vid.channelVerified && (
                            <CheckCircle className="w-2.5 h-2.5 text-red-400" />
                          )}
                        </span>
                      </div>

                      {/* Bottom-Right Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-black/90 border border-red-950 px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-200 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-red-400" />
                        <span>{vid.duration}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Category & Date */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          {vid.relatedCategory ? (
                            <span className="text-[9px] uppercase font-mono tracking-wider bg-black text-red-300 px-1.5 py-0.5 rounded border border-red-900">
                              {vid.relatedCategory}
                            </span>
                          ) : <span />}
                          <span className="text-[10px] text-neutral-400 font-mono">
                            {vid.publishedDate}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 
                          onClick={() => handleSelectVideo(vid)}
                          className="text-xs sm:text-sm font-semibold text-white leading-snug group-hover:text-red-300 transition-colors line-clamp-2 mb-1.5 cursor-pointer font-sans"
                        >
                          {vid.title}
                        </h4>

                        {/* Summary */}
                        <p className="text-[11px] text-neutral-400 line-clamp-2 leading-relaxed mb-2.5">
                          {vid.summary}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-red-950/80 mt-auto">
                        <button
                          type="button"
                          onClick={() => handleSelectVideo(vid)}
                          className="min-h-[38px] px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-[10px] sm:text-[11px] font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer font-mono active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-current text-white" />
                          <span>{isSelected ? 'Reproduciendo' : 'Reproducir'}</span>
                        </button>

                        <a
                          href={vid.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] px-3 py-1.5 text-[10px] sm:text-[11px] font-semibold text-neutral-300 hover:text-white bg-black hover:bg-neutral-900 border border-red-950 rounded-lg transition-colors flex items-center gap-1 font-mono active:scale-95"
                          title="Abrir video real en YouTube"
                        >
                          <span>En YouTube</span>
                          <ExternalLink className="w-3 h-3 text-red-400" />
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Scroll Button Overlay for Desktop */}
            {videos.length > 2 && (
              <button
                type="button"
                onClick={handleNext}
                aria-label="Desplazar videos a la derecha"
                className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-black/90 hover:bg-neutral-900 border border-red-800 text-white shadow-xl items-center justify-center cursor-pointer active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>

          {/* Carousel Pagination Dots and Controls */}
          {videos.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 pt-1">
              {videos.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => scrollToIndex(dotIdx)}
                  aria-label={`Ir al video ${dotIdx + 1}`}
                  className={`h-1.5 rounded-full transition-all cursor-pointer ${
                    currentIndex === dotIdx
                      ? 'w-6 bg-red-500'
                      : 'w-1.5 bg-neutral-800 hover:bg-neutral-600'
                  }`}
                />
              ))}
            </div>
          )}

        </div>
      )}
    </div>
  );
};
