import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, Sparkles, ShieldCheck, HeartHandshake, Volume2, VolumeX, Play, Pause } from 'lucide-react';

interface PumHeroProps {
  onNavigate: (tab: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const PumHero: React.FC<PumHeroProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleTogglePlay = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#F8FAF9] via-white to-[#F4F8F5] pt-8 pb-16 lg:pt-14 lg:pb-24">
      {/* Subtle background decorative shapes */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-pum-lightGreen/30 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-80 h-80 rounded-full bg-pum-orange/10 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Tagline / Category pill */}
        <div className="flex items-center gap-2 mb-6">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase bg-pum-lightGreen text-pum-green border border-pum-green/20 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-pum-orange" />
            {language === 'vi' ? 'Campus Mở Đổi Mới Sáng Tạo' : 'Open Innovation Campus'}
          </span>
          <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold text-slate-500">
            <ShieldCheck className="w-3.5 h-3.5 text-pum-green" />
            {language === 'vi' ? 'Hợp tác Đại học – Bệnh viện – Doanh nghiệp' : 'Academia – Hospital – Industry Alliance'}
          </span>
        </div>

        {/* Main Grid: Headline & Actions on Left, Video Player on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Heading, Subtitle & 3 Action Buttons */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl 2xl:text-[54px] font-black text-slate-900 tracking-tight leading-[1.15] mb-5">
              {language === 'vi' ? (
                <>
                  Làng Sinh Viên <br />
                  <span className="text-pum-green">Đổi Mới Sáng Tạo</span> <br />
                  <span className="text-slate-800">Bình Mỹ</span>
                </>
              ) : (
                <>
                  Binh My <br />
                  <span className="text-pum-green">Innovative Student</span> <br />
                  <span className="text-slate-800">Village Campus</span>
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              {language === 'vi'
                ? 'Mô hình campus mở kết nối nhà trường, bệnh viện, bác sĩ quốc tế, nhà khoa học, doanh nghiệp và cộng đồng nhằm phát triển hệ sinh thái y tế – du lịch – nông nghiệp bền vững.'
                : 'An open campus model connecting universities, hospitals, international specialists, enterprises and communities to build a sustainable healthcare – tourism – agriculture ecosystem.'}
            </p>

            {/* 3 Core Action Buttons in PUM signature design */}
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3.5">

              {/* Button 1: Khám phá các mô hình (Primary Green) */}
              <button
                onClick={() => onNavigate('health-models')}
                className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full text-white bg-pum-green hover:bg-pum-greenAlt transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>{language === 'vi' ? 'Khám phá các mô hình' : 'Explore Models'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Button 2: Đăng ký chương trình (Outline Green) */}
              <button
                onClick={() => onNavigate('training')}
                className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full text-pum-green bg-white hover:bg-pum-lightGreen/40 border-2 border-pum-green transition-all duration-200 active:scale-95 shadow-2xs cursor-pointer"
              >
                <span>{language === 'vi' ? 'Đăng ký chương trình' : 'Training Programs'}</span>
              </button>

              {/* Button 3: Đề xuất hợp tác (Signature PUM Orange) */}
              <button
                onClick={() => onOpenCollaboration('general', language === 'vi' ? 'Đề xuất hợp tác chiến lược' : 'Strategic Collaboration Proposal')}
                className="inline-flex items-center justify-center gap-2 font-bold px-6 py-3.5 rounded-full text-white bg-pum-orange hover:bg-pum-orangeHover transition-all duration-200 active:scale-95 shadow-md hover:shadow-lg cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Propose Collaboration'}</span>
              </button>

            </div>

            {/* Quick stats mini-bar */}
            <div className="mt-10 pt-6 border-t border-slate-200/80 flex items-center gap-6 text-xs text-slate-500">
              <div>
                <span className="block font-black text-lg text-pum-green leading-none mb-1">05</span>
                <span>{language === 'vi' ? 'Trụ cột hoạt động' : 'Core Pillars'}</span>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div>
                <span className="block font-black text-lg text-pum-green leading-none mb-1">12</span>
                <span>{language === 'vi' ? 'Mô hình kinh tế' : 'Economic Models'}</span>
              </div>
              <div className="w-px h-7 bg-slate-200" />
              <div>
                <span className="block font-black text-lg text-pum-orange leading-none mb-1">100+</span>
                <span>{language === 'vi' ? 'Bác sĩ & Chuyên gia' : 'Doctors & Experts'}</span>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Video Showcase */}
          <div className="lg:col-span-6 relative pb-6 sm:pb-4">
            {/* Ambient decorative glow behind video player */}
            <div className="absolute -inset-1 bg-gradient-to-r from-pum-green/25 to-pum-orange/25 rounded-3xl blur-xl opacity-70 group-hover:opacity-100 transition duration-700 pointer-events-none" />

            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 group">
              {/* Video Element */}
              <div className="relative aspect-[16/10] sm:aspect-video w-full overflow-hidden bg-black flex items-center justify-center">
                <video
                  ref={videoRef}
                  src="/Video_gioi_thieu_Lang_Sinh_Vien_DMST_Binh_My.mp4"
                  poster="/assets/pum/hero_visual2-e1710851129461-1200x836.jpg"
                  controls
                  autoPlay
                  muted={isMuted}
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  Your browser does not support the video tag.
                </video>

                {/* Top Left Floating Tag: Video status badge */}
                <div className="absolute top-3 left-3 pointer-events-none flex items-center gap-2 bg-slate-900/80 backdrop-blur-md text-white px-3 py-1.5 rounded-full text-xs font-bold border border-white/10 shadow-lg z-10">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span>{language === 'vi' ? 'Video Giới Thiệu Dự Án' : 'Official Intro Video'}</span>
                </div>

                {/* Top Right Floating Sound Toggle */}
                <button
                  type="button"
                  onClick={handleToggleMute}
                  className="absolute top-3 right-3 z-20 bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-full backdrop-blur-md border border-white/20 transition-all hover:scale-105 active:scale-95 shadow-lg flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                  title={isMuted ? (language === 'vi' ? 'Bật âm thanh' : 'Unmute') : (language === 'vi' ? 'Tắt âm thanh' : 'Mute')}
                  aria-label="Toggle mute"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-rose-400" />
                      <span className="text-[11px]">{language === 'vi' ? 'Bật tiếng' : 'Unmute'}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-[11px]">{language === 'vi' ? 'Tắt tiếng' : 'Mute'}</span>
                    </>
                  )}
                </button>

                {/* Center Play Button Overlay when paused */}
                {!isPlaying && (
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    className="absolute inset-0 m-auto w-16 h-16 rounded-full bg-pum-orange/90 hover:bg-pum-orange text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-110 z-10 cursor-pointer border-2 border-white/40"
                    aria-label="Play video"
                  >
                    <Play className="w-7 h-7 fill-white translate-x-0.5" />
                  </button>
                )}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
