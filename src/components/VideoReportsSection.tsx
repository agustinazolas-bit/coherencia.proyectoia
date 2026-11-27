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
      className="bg-[#202226] border border-[#34373e] rounded-2xl overflow-hidden mt-3 transition-all shadow-lg font-sans"
    >
      {/* Accordion / Header Bar with Carousel Controls */}
      <div className="w-full min-h-[48px] px-3.5 sm:px-4 py-2.5 bg-[#1c1e22] flex flex-wrap items-center justify-between gap-2 border-b border-[#34373e]">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 min-w-0 text-left cursor-pointer flex-1 py-1"
          title={isOpen ? 'Ocultar carrusel de videos' : 'Mostrar carrusel de videos'}
        >
          <div className="p-1.5 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 shrink-0">
            <Tv className="w-4 h-4 text-blue-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-bold text-white uppercase tracking-wider truncate font-sans">
                REPORTAJES EN VIDEO DE FUENTES VERIFICADAS
              </span>
              <span className="text-[10px] bg-[#27292f] text-blue-300 px-2 py-0.5 rounded-md font-sans font-semibold border border-[#383b43]">
                Carrusel · {videos.length} videos
              </span>
            </div>
            <p className="text-[11px] text-neutral-400 truncate font-sans">
              Cobertura periodística (T13, 24 Horas TVN, Meganoticias, CNN Chile, BioBio)
            </p>
          </div>
        </button>

        {/* Carousel Quick Navigation Toolbar */}
        <div className="flex items-center gap-1.5 shrink-0 ml-auto font-sans">
          {isOpen && videos.length > 1 && (
            <div className="flex items-center gap-1 bg-[#26282e] p-1 rounded-lg border border-[#383b43]">
              <span className="text-[11px] text-neutral-400 px-1.5 font-medium">
                <strong className="text-white">{currentIndex + 1}</strong> / {videos.length}
              </span>
              <button
                type="button"
                onClick={handlePrev}
                title="Video anterior"
                aria-label="Video anterior"
                className="w-7 h-7 rounded-md bg-[#202226] hover:bg-[#2d3037] text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              >
                <ChevronLeft className="w-3.5 h-3.5 text-neutral-300" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                title="Siguiente video"
                aria-label="Siguiente video"
                className="w-7 h-7 rounded-md bg-[#202226] hover:bg-[#2d3037] text-neutral-300 hover:text-white flex items-center justify-center cursor-pointer transition-colors active:scale-95"
              >
                <ChevronRight className="w-3.5 h-3.5 text-neutral-300" />
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg text-neutral-400 hover:text-white hover:bg-[#26282e] transition-colors cursor-pointer"
            title={isOpen ? 'Ocultar reportajes' : 'Ver reportajes'}
            aria-label={isOpen ? 'Ocultar reportajes' : 'Ver reportajes'}
          >
            {isOpen ? <ChevronUp className="w-4 h-4 text-blue-400" /> : <ChevronDown className="w-4 h-4 text-blue-400" />}
          </button>
        </div>
      </div>

      {/* Expanded Carousel Content */}
      {isOpen && (
        <div className="p-3 sm:p-4 space-y-3 bg-[#202226]">
          
          {/* Active Inline Embedded Video Player if selected */}
          {activeVideo && (
            <div className="bg-[#1c1e22] rounded-xl border border-blue-500/50 p-3 sm:p-4 space-y-2.5 relative animate-fade-in-scale shadow-2xl">
              <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#34373e]">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="p-1.5 rounded-md bg-[#26282e] border border-blue-500/40 text-blue-400 shrink-0">
                    <Youtube className="w-4 h-4 text-blue-400" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-white truncate max-w-xs sm:max-w-md font-sans">
                      {activeVideo.title}
                    </p>
                    <div className="flex items-center gap-2 text-[10px] text-neutral-400 font-sans">
                      <span className="text-blue-300 font-semibold flex items-center gap-0.5">
                        {activeVideo.channel}
                        <CheckCircle className="w-2.5 h-2.5 text-blue-400" />
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
                      className="text-neutral-300 hover:text-white px-2.5 py-1.5 rounded-lg bg-[#26282e] hover:bg-[#2d3037] text-xs flex items-center gap-1 font-sans min-h-[38px] border border-[#383b43] cursor-pointer active:scale-95"
                      title="Pasar al siguiente reportaje coherente con la búsqueda"
                    >
                      <span className="hidden sm:inline">Siguiente coherente</span>
                      <ChevronRight className="w-3.5 h-3.5 text-blue-400" />
                    </button>
                  )}
                  <a
                    href={activeVideo.youtubeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-400 hover:text-blue-300 p-2 rounded-lg hover:bg-[#26282e] text-xs flex items-center gap-1 font-sans min-h-[38px]"
                    title="Abrir en YouTube"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">YouTube</span>
                  </a>
                  <button
                    onClick={() => setActiveVideo(null)}
                    className="text-neutral-400 hover:text-white p-2 min-h-[40px] min-w-[40px] rounded-lg hover:bg-[#26282e] flex items-center justify-center cursor-pointer active:scale-95"
                    title="Cerrar reproductor"
                    aria-label="Cerrar reproductor"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Responsive Video Container with Iframe */}
              <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black border border-[#34373e] shadow-inner">
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${activeVideo.youtubeVideoId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  referrerPolicy="strict-origin-when-cross-origin"
                  className="w-full h-full border-0"
                />
              </div>

              <div className="p-2.5 bg-[#26282e] rounded-lg border border-[#383b43] text-xs text-neutral-300 flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-sans">
                <div className="flex items-start gap-2">
                  <Volume2 className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
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
                    className="min-h-[36px] inline-flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors font-sans active:scale-95 shadow-xs"
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
                className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#1c1e22]/95 hover:bg-[#26282e] border border-[#383b43] text-white shadow-xl items-center justify-center cursor-pointer active:scale-95 transition-all"
              >
                <ChevronLeft className="w-4 h-4 text-blue-400" />
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
                    className={`snap-start shrink-0 w-[285px] sm:w-[325px] md:w-[340px] rounded-xl border transition-all flex flex-col justify-between overflow-hidden group animate-fade-in-up select-none ${
                      isSelected
                        ? 'bg-[#1c1e22] border-blue-500 shadow-md ring-1 ring-blue-500/40'
                        : isCurrent
                        ? 'bg-[#26282e] border-blue-500/60 hover:bg-[#2a2d34]'
                        : 'bg-[#23252a] border-[#34373e] hover:bg-[#282a30] hover:border-[#42454e]'
                    }`}
                  >
                    {/* YouTube Video Thumbnail Banner */}
                    <div 
                      onClick={() => handleSelectVideo(vid)}
                      className="relative aspect-video w-full bg-black overflow-hidden cursor-pointer border-b border-[#34373e]"
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
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
                      
                      {/* Center Play Overlay Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-11 h-11 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-black/80 group-hover:scale-110 active:scale-95 transition-all">
                          <Play className="w-5 h-5 fill-current ml-0.5 text-white" />
                        </div>
                      </div>

                      {/* Top-Left Channel Badge */}
                      <div className="absolute top-2 left-2 flex items-center gap-1.5 bg-[#181a1d]/90 backdrop-blur-xs border border-[#383b43] px-2 py-0.5 rounded-md">
                        <span className="text-[10px] font-bold text-neutral-200 flex items-center gap-1 font-sans">
                          {vid.channel}
                          {vid.channelVerified && (
                            <CheckCircle className="w-2.5 h-2.5 text-blue-400" />
                          )}
                        </span>
                      </div>

                      {/* Bottom-Right Duration Badge */}
                      <div className="absolute bottom-2 right-2 bg-[#181a1d]/90 border border-[#383b43] px-1.5 py-0.5 rounded text-[10px] font-mono text-neutral-300 flex items-center gap-1">
                        <Clock className="w-2.5 h-2.5 text-blue-400" />
                        <span>{vid.duration}</span>
                      </div>
                    </div>

                    {/* Card Content Body */}
                    <div className="p-3 sm:p-3.5 flex-1 flex flex-col justify-between font-sans">
                      <div>
                        {/* Category & Date */}
                        <div className="flex items-center justify-between gap-1 mb-1.5">
                          {vid.relatedCategory ? (
                            <span className="text-[10px] uppercase font-bold tracking-wider bg-[#1c1e22] text-blue-300 px-2 py-0.5 rounded-md border border-[#34373e]">
                              {vid.relatedCategory}
                            </span>
                          ) : <span />}
                          <span className="text-[11px] text-neutral-400">
                            {vid.publishedDate}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 
                          onClick={() => handleSelectVideo(vid)}
                          className="text-xs sm:text-sm font-semibold text-white leading-snug group-hover:text-blue-300 transition-colors line-clamp-2 mb-1.5 cursor-pointer font-sans"
                        >
                          {vid.title}
                        </h4>

                        {/* Summary */}
                        <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed mb-2.5">
                          {vid.summary}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#34373e] mt-auto">
                        <button
                          type="button"
                          onClick={() => handleSelectVideo(vid)}
                          className="min-h-[38px] px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer active:scale-95"
                        >
                          <Play className="w-3 h-3 fill-current text-white" />
                          <span>{isSelected ? 'Reproduciendo' : 'Reproducir'}</span>
                        </button>

                        <a
                          href={vid.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-h-[38px] px-3 py-1.5 text-xs font-semibold text-neutral-300 hover:text-white bg-[#1c1e22] hover:bg-[#26282e] border border-[#383b43] rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                          title="Abrir video real en YouTube"
                        >
                          <span>En YouTube</span>
                          <ExternalLink className="w-3 h-3 text-neutral-400" />
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
                className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full bg-[#1c1e22]/90 hover:bg-[#26282e] border border-[#383b43] text-white shadow-xl items-center justify-center cursor-pointer active:scale-95 transition-all"
              >
                <ChevronRight className="w-4 h-4 text-blue-400" />
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
                      ? 'w-6 bg-blue-500'
                      : 'w-1.5 bg-[#383b43] hover:bg-neutral-500'
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
