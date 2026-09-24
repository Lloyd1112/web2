import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  mockActivityFieldsData,
  mockStatsData,
  mockEventsData,
  mockPartnersData
} from '../data/mockData';
import { ScrollReveal } from '../components/common/ScrollReveal';
import {
  ArrowRight,
  ChevronRight,
  HeartHandshake,
  HeartPulse,
  GraduationCap,
  Lightbulb,
  Globe,
  Stethoscope,
  Handshake,
  Users,
  FileText,
  MessageSquareShare,
  UserCheck,
  Building2,
  School,
  ShieldCheck,
  Sparkles,
  Mail,
  UserPlus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize2,
  X
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language, t } = useLanguage();
  const [partnerTab, setPartnerTab] = useState<string>('university');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);

  // Background Video State & Ref
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const partnerTabs = [
    { id: 'university', labelVi: 'Trường đại học', labelEn: 'Universities', icon: <School className="w-4 h-4" /> },
    { id: 'hospital', labelVi: 'Bệnh viện và cơ sở y tế', labelEn: 'Hospitals & Clinics', icon: <HeartHandshake className="w-4 h-4" /> },
    { id: 'institute', labelVi: 'Viện nghiên cứu', labelEn: 'Research Institutes', icon: <Sparkles className="w-4 h-4" /> },
    { id: 'enterprise', labelVi: 'Doanh nghiệp', labelEn: 'Enterprises', icon: <Building2 className="w-4 h-4" /> },
    { id: 'government', labelVi: 'Cơ quan quản lý', labelEn: 'Regulatory Bodies', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'international', labelVi: 'Tổ chức quốc tế', labelEn: 'Intl Organizations', icon: <Globe className="w-4 h-4" /> },
  ];

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800">

      {/* ===================== HERO SECTION ===================== */}
      <section className="relative overflow-hidden bg-slate-900 h-[310px] sm:h-[330px] lg:h-[340px] flex items-center shadow-inner group/hero">
        {/* Background Video: Live campus footage, lake, students with hero-reference.jpg poster fallback */}
        <video
          ref={videoRef}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          poster="/hero-reference.jpg"
          className="absolute inset-0 w-full h-full object-cover object-center sm:object-right lg:object-center transform scale-[1.01]"
        >
          <source src="/intro-video.mp4" type="video/mp4" />
          <source src="/Video_gioi_thieu_Lang_Sinh_Vien_DMST_Binh_My.mp4" type="video/mp4" />
        </video>

        {/* Gradient Overlay: Deep Blue on the left fading smoothly to reveal campus and students */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, rgba(4, 53, 97, 0.95) 0%, rgba(4, 57, 102, 0.80) 36%, rgba(4, 57, 102, 0.18) 68%, rgba(0, 0, 0, 0.05) 100%), linear-gradient(180deg, rgba(0, 50, 90, 0.10) 0%, rgba(0, 45, 82, 0.22) 100%)`
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
          <div className="max-w-2xl text-white space-y-3">

            {/* Title with solid clean sans-serif typography */}
            <h1 className="text-[32px] sm:text-[38px] lg:text-[44px] font-black text-white leading-[1.15] tracking-tight drop-shadow-md">
              {language === 'vi' ? (
                <>
                  Làng Sinh Viên <br />
                  Đổi Mới Sáng Tạo Bình Mỹ
                </>
              ) : (
                <>
                  Binh My Innovative <br />
                  Student Village
                </>
              )}
            </h1>

            {/* Subtitle - balanced without breaking "y tế" */}
            <p className="text-xs sm:text-[13.5px] text-white/95 font-medium leading-[1.55] max-w-xl drop-shadow-xs">
              {language === 'vi' ? (
                <>
                  Kết nối đào tạo, nghiên cứu và hợp tác quốc tế để phát triển <br className="hidden sm:inline" />
                  hệ sinh thái y tế – du lịch – nông nghiệp bền vững.
                </>
              ) : (
                t('heroSubtitle')
              )}
            </p>

            {/* Action Buttons matching Hình 2 + Video Button */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-1">
              {/* Button 1: Khám phá các mô hình */}
              <button
                onClick={() => onNavigate('health-models')}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#079b56] hover:bg-[#06874b] text-white font-bold text-xs sm:text-[13px] shadow-xs hover:shadow-md active:scale-95 transition-all group"
              >
                <span>{t('exploreModels')}</span>
                <span className="text-sm leading-none font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              {/* Button 2: Đăng ký chương trình */}
              <button
                onClick={() => onNavigate('training')}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-[#078be9] hover:bg-[#067ad1] text-white font-bold text-xs sm:text-[13px] shadow-xs hover:shadow-md active:scale-95 transition-all group"
              >
                <span>{t('registerProgram')}</span>
                <span className="text-sm leading-none font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              {/* Button 3: Đề xuất hợp tác */}
              <button
                onClick={() => onOpenCollaboration('general')}
                className="inline-flex items-center justify-center gap-1.5 px-4 sm:px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white font-bold text-xs sm:text-[13px] border border-white/90 backdrop-blur-xs shadow-xs hover:shadow-md active:scale-95 transition-all group"
              >
                <span>{t('proposeCollaboration')}</span>
                <span className="text-sm leading-none font-bold group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

              {/* Button 4: Xem video giới thiệu */}
              <button
                onClick={() => setIsVideoModalOpen(true)}
                className="inline-flex items-center justify-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-full bg-emerald-500/25 hover:bg-emerald-500/40 text-emerald-200 hover:text-white font-bold text-xs sm:text-[13px] border border-emerald-400/50 backdrop-blur-xs shadow-xs hover:shadow-md active:scale-95 transition-all group"
              >
                <Play className="w-3.5 h-3.5 fill-current text-emerald-400 group-hover:scale-110 transition-transform" />
                <span>{language === 'vi' ? 'Xem video' : 'Watch Video'}</span>
              </button>
            </div>

          </div>
        </div>

        {/* Floating Quick Video Controls on Hero Banner */}
        <div className="absolute right-4 sm:right-6 lg:right-8 bottom-3 sm:bottom-4 z-20 flex items-center gap-2">
          <div className="flex items-center gap-1 p-1 rounded-full bg-slate-950/65 hover:bg-slate-950/85 backdrop-blur-md border border-white/20 text-white shadow-lg transition-all">
            {/* Play / Pause Toggle */}
            <button
              onClick={togglePlay}
              title={isPlaying ? (language === 'vi' ? 'Tạm dừng video' : 'Pause video') : (language === 'vi' ? 'Phát video' : 'Play video')}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            </button>

            {/* Mute / Unmute Toggle */}
            <button
              onClick={toggleMute}
              title={isMuted ? (language === 'vi' ? 'Bật âm thanh' : 'Unmute') : (language === 'vi' ? 'Tắt âm thanh' : 'Mute')}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-emerald-400" />}
            </button>

            {/* Fullscreen Video Modal */}
            <button
              onClick={() => setIsVideoModalOpen(true)}
              title={language === 'vi' ? 'Xem video đầy đủ' : 'Expand full video'}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/20 hover:bg-white/30 text-[11px] font-bold transition-colors"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden md:inline">{language === 'vi' ? 'Xem đầy đủ' : 'Full view'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* ===================== 5 LĨNH VỰC HOẠT ĐỘNG CHÍNH ===================== */}
      <section className="py-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" delay={50}>
          <div className="mb-7">
            <h2 className="text-2xl sm:text-[26px] font-black text-slate-900 tracking-tight">
              {t('fiveFieldsTitle')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 font-semibold">
              {t('fiveFieldsSubtitle')}
            </p>
          </div>
        </ScrollReveal>

        {/* 5 Cards Row matching Image 2 with staggered scroll reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 sm:gap-4">

          {/* Card 1: Ba mô hình y tế (Mint / Green) */}
          <ScrollReveal direction="up" delay={80} className="h-full">
            <div
              onClick={() => onNavigate('health-models')}
              className="h-full bg-gradient-to-br from-[#e8faf5] to-[#d9f2ee] hover:from-[#dcfce7] hover:to-[#cffae6] border border-[#a7f3d0]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-[#0ba65c] text-white flex items-center justify-center mb-3.5 shadow-xs">
                  <HeartPulse className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-[#0ba65c]">01</div>
                <h3 className="text-[16px] font-extrabold text-slate-900 mt-1 group-hover:text-[#0ba65c] transition-colors tracking-tight">
                  {language === 'vi' ? 'Ba mô hình y tế' : '3 Healthcare Models'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                  {language === 'vi'
                    ? 'Y tế cộng đồng; Chăm sóc người cao tuổi; Health and Wellness; Kết hợp y tế – du lịch – nông nghiệp.'
                    : 'Community Health; Elderly Care; Health & Wellness; Integrating Healthcare – Tourism – Agriculture.'}
                </p>
              </div>
              <div className="pt-5">
                <div className="w-7 h-7 rounded-full bg-[#0ba65c] text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Đào tạo nhân lực y tế (Sky / Blue) */}
          <ScrollReveal direction="up" delay={160} className="h-full">
            <div
              onClick={() => onNavigate('training')}
              className="h-full bg-gradient-to-br from-[#eaf5ff] to-[#dceeff] hover:from-[#e0f2fe] hover:to-[#d0ebff] border border-[#bae6fd]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-[#087ee4] text-white flex items-center justify-center mb-3.5 shadow-xs">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-[#087ee4]">02</div>
                <h3 className="text-[16px] font-extrabold text-slate-900 mt-1 group-hover:text-[#087ee4] transition-colors tracking-tight">
                  {language === 'vi' ? 'Đào tạo nhân lực y tế' : 'Workforce Training'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                  {language === 'vi'
                    ? 'Chương trình đào tạo, thực hành Living Lab, đào tạo theo đặt hàng, đào tạo quốc tế.'
                    : 'Training programs, Living Lab practice, customized on-demand training, international certification.'}
                </p>
              </div>
              <div className="pt-5">
                <div className="w-7 h-7 rounded-full bg-[#087ee4] text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 3: Tư vấn phát triển dự án (Yellow / Gold) */}
          <ScrollReveal direction="up" delay={240} className="h-full">
            <div
              onClick={() => onNavigate('consulting')}
              className="h-full bg-gradient-to-br from-[#fff8df] to-[#fff2c9] hover:from-[#fef3c7] hover:to-[#feeeb0] border border-[#fde68a]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-[#eaa500] text-white flex items-center justify-center mb-3.5 shadow-xs">
                  <Lightbulb className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-[#eaa500]">03</div>
                <h3 className="text-[16px] font-extrabold text-slate-900 mt-1 group-hover:text-[#eaa500] transition-colors tracking-tight">
                  {language === 'vi' ? 'Tư vấn phát triển dự án' : 'Project Consulting'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                  {language === 'vi'
                    ? 'Tư vấn 3 dự án y tế trụ cột và 12 mô hình kinh tế phụ trợ.'
                    : 'Consulting 3 pillar healthcare projects and 12 auxiliary economic models.'}
                </p>
              </div>
              <div className="pt-5">
                <div className="w-7 h-7 rounded-full bg-[#eaa500] text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 4: Hợp tác quốc tế (Purple) */}
          <ScrollReveal direction="up" delay={320} className="h-full">
            <div
              onClick={() => onNavigate('international')}
              className="h-full bg-gradient-to-br from-[#f0efff] to-[#e9e6ff] hover:from-[#ede9fe] hover:to-[#e4dfff] border border-[#ddd6fe]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-[#6652e4] text-white flex items-center justify-center mb-3.5 shadow-xs">
                  <Globe className="w-5 h-5" />
                </div>
                <div className="text-xs font-black text-[#6652e4]">04</div>
                <h3 className="text-[16px] font-extrabold text-slate-900 mt-1 group-hover:text-[#6652e4] transition-colors tracking-tight">
                  {language === 'vi' ? 'Hợp tác quốc tế' : 'Intl Cooperation'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                  {language === 'vi'
                    ? 'Hợp tác đào tạo, nghiên cứu, trao đổi học thuật, chuyên gia và bác sĩ quốc tế.'
                    : 'Training partnerships, joint research, academic exchange, international faculty and physicians.'}
                </p>
              </div>
              <div className="pt-5">
                <div className="w-7 h-7 rounded-full bg-[#6652e4] text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 5: Bác sĩ xuyên biên giới (Cyan / Doctor) */}
          <ScrollReveal direction="up" delay={400} className="h-full">
            <div
              onClick={() => onNavigate('doctors')}
              className="h-full bg-gradient-to-br from-[#eafafd] to-[#ddf3f8] hover:from-[#d5f5fa] hover:to-[#c8eff6] border border-[#a5f3fc]/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between cursor-pointer transition-all duration-200 hover:-translate-y-1 shadow-xs hover:shadow-md group"
            >
              <div>
                <div className="w-11 h-11 rounded-full bg-[#079cb1] text-white flex items-center justify-center mb-3.5 shadow-xs">
                  {/* Doctor avatar matching Image 2 */}
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-none stroke-current stroke-[2] stroke-linecap-round stroke-linejoin-round">
                    <circle cx="12" cy="7" r="4" />
                    <path d="M6 21v-2a6 6 0 0 1 12 0v2" />
                    <path d="M9 13.5v1.5a3 3 0 0 0 6 0v-1.5" />
                    <circle cx="12" cy="18" r="0.75" fill="currentColor" />
                  </svg>
                </div>
                <div className="text-xs font-black text-[#079cb1]">05</div>
                <h3 className="text-[16px] font-extrabold text-slate-900 mt-1 group-hover:text-[#079cb1] transition-colors tracking-tight">
                  {language === 'vi' ? 'Bác sĩ xuyên biên giới' : 'Doctors Across Borders'}
                </h3>
                <p className="text-[11px] sm:text-xs text-slate-600 mt-2 font-medium leading-relaxed">
                  {language === 'vi'
                    ? 'Trao đổi bác sĩ, giảng dạy, nghiên cứu, hội chẩn, chuyển giao kỹ thuật và hoạt động cộng đồng.'
                    : 'Physician exchange, clinical teaching, research, tele-consultation, and community healthcare missions.'}
                </p>
              </div>
              <div className="pt-5">
                <div className="w-7 h-7 rounded-full bg-[#079cb1] text-white flex items-center justify-center text-xs font-bold shadow-xs group-hover:translate-x-1 transition-transform">
                  →
                </div>
              </div>
            </div>
          </ScrollReveal>

        </div>
      </section>

      {/* ===================== SPLIT SECTION: NHỮNG CON SỐ NỔI BẬT & SỰ KIỆN ===================== */}
      <section className="py-8 max-w-[1340px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* Left: Những con số nổi bật (7 cols) */}
          <div className="lg:col-span-7">
            <ScrollReveal direction="up" delay={50}>
              <div className="mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('statsTitle')}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5 font-medium">
                  {t('statsSubtitle')}
                </p>
              </div>
            </ScrollReveal>

            {/* 6 Statistic Cards Grid with High Contrast & Crisp White Backgrounds */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5">

              {/* Stat 1 */}
              <ScrollReveal direction="up" delay={100}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-emerald-300">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100/90 text-emerald-800 ring-1 ring-emerald-300 flex items-center justify-center mb-2">
                    <Handshake className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Đối tác trong nước & quốc tế' : 'Domestic & Intl Partners'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +100
                  </span>
                </div>
              </ScrollReveal>

              {/* Stat 2 */}
              <ScrollReveal direction="up" delay={150}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-sky-300">
                  <div className="w-10 h-10 rounded-xl bg-sky-100/90 text-sky-800 ring-1 ring-sky-300 flex items-center justify-center mb-2">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Chương trình đào tạo' : 'Training Programs'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +50
                  </span>
                </div>
              </ScrollReveal>

              {/* Stat 3 */}
              <ScrollReveal direction="up" delay={200}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-purple-300">
                  <div className="w-10 h-10 rounded-xl bg-purple-100/90 text-purple-800 ring-1 ring-purple-300 flex items-center justify-center mb-2">
                    <Users className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Bác sĩ, chuyên gia tham gia' : 'Doctors & Experts Joined'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +500
                  </span>
                </div>
              </ScrollReveal>

              {/* Stat 4 */}
              <ScrollReveal direction="up" delay={250}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-blue-300">
                  <div className="w-10 h-10 rounded-xl bg-blue-100/90 text-blue-800 ring-1 ring-blue-300 flex items-center justify-center mb-2">
                    <FileText className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Dự án được tư vấn' : 'Consulted Projects'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +30
                  </span>
                </div>
              </ScrollReveal>

              {/* Stat 5 */}
              <ScrollReveal direction="up" delay={300}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-teal-300">
                  <div className="w-10 h-10 rounded-xl bg-teal-100/90 text-teal-800 ring-1 ring-teal-300 flex items-center justify-center mb-2">
                    <MessageSquareShare className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Hội thảo & đề tài nghiên cứu' : 'Seminars & Research'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +20
                  </span>
                </div>
              </ScrollReveal>

              {/* Stat 6 */}
              <ScrollReveal direction="up" delay={350}>
                <div className="bg-white hover:bg-slate-50/80 rounded-2xl p-4 border border-slate-200/90 text-center flex flex-col items-center justify-between min-h-[148px] transition-all shadow-xs hover:shadow-md hover:border-cyan-300">
                  <div className="w-10 h-10 rounded-xl bg-cyan-100/90 text-cyan-800 ring-1 ring-cyan-300 flex items-center justify-center mb-2">
                    <UserCheck className="w-5 h-5" />
                  </div>
                  <span className="text-xs text-slate-700 font-bold leading-tight">
                    {language === 'vi' ? 'Người dân được hưởng lợi' : 'Community Beneficiaries'}
                  </span>
                  <span className="text-2xl font-black text-slate-900 mt-1.5 tracking-tight">
                    +10.000
                  </span>
                </div>
              </ScrollReveal>

            </div>
          </div>

          {/* Right: Chương trình và sự kiện sắp diễn ra (5 cols) */}
          <div className="lg:col-span-5">
            <ScrollReveal direction="up" delay={100}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {t('eventsTitle')}
                </h3>
                <button
                  onClick={() => onNavigate('news-contact')}
                  className="text-xs font-bold text-[#0072ce] hover:underline flex items-center gap-0.5"
                >
                  <span>{t('viewAll')}</span>
                  <span>→</span>
                </button>
              </div>
            </ScrollReveal>

            {/* Event List */}
            <div className="space-y-2.5">
              {mockEventsData.map((ev, idx) => {
                const colors = [
                  'bg-blue-100 text-blue-700 ring-1 ring-blue-300',
                  'bg-amber-100 text-amber-700 ring-1 ring-amber-300',
                  'bg-purple-100 text-purple-700 ring-1 ring-purple-300',
                  'bg-rose-100 text-rose-700 ring-1 ring-rose-300',
                  'bg-emerald-100 text-emerald-700 ring-1 ring-emerald-300',
                ];
                return (
                  <ScrollReveal key={ev.id} direction="up" delay={150 + idx * 50}>
                    <div
                      onClick={() => setSelectedEvent(ev)}
                      className="bg-white hover:bg-slate-50 rounded-xl p-2.5 border border-slate-200/90 flex items-center justify-between cursor-pointer transition-all shadow-2xs hover:shadow-xs group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-11 rounded-lg border border-slate-300 flex flex-col items-center justify-center text-center bg-slate-50/90 flex-shrink-0">
                          <span className="text-xs font-black text-slate-900 leading-none">{ev.day}</span>
                          <span className="text-[9px] font-bold text-slate-500 mt-0.5">{language === 'vi' ? ev.monthVi : ev.monthEn}</span>
                        </div>
                        <div className={`w-7 h-7 rounded-md ${colors[idx % colors.length]} flex items-center justify-center flex-shrink-0`}>
                          {idx === 0 && <GraduationCap className="w-4 h-4" />}
                          {idx === 1 && <MessageSquareShare className="w-4 h-4" />}
                          {idx === 2 && <Globe className="w-4 h-4" />}
                          {idx === 3 && <FileText className="w-4 h-4" />}
                          {idx === 4 && <HeartHandshake className="w-4 h-4" />}
                        </div>
                        <span className="text-xs font-bold text-slate-900 group-hover:text-[#0072ce] line-clamp-1">
                          {language === 'vi' ? ev.titleVi : ev.titleEn}
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-800 flex-shrink-0" />
                    </div>
                  </ScrollReveal>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ===================== ĐỐI TÁC TIÊU BIỂU ===================== */}
      <section className="py-8 max-w-[1340px] mx-auto px-4 sm:px-6">
        <div>
          <ScrollReveal direction="up" delay={50}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t('partnersTitle')}
              </h3>
              <button
                onClick={() => onNavigate('international')}
                className="text-xs font-bold text-[#0072ce] hover:underline flex items-center gap-0.5"
              >
                <span>{t('viewAll')}</span>
                <span>→</span>
              </button>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-6 overflow-x-auto pb-3 mb-5 border-b border-slate-200 text-xs font-semibold text-slate-600 no-scrollbar">
              {partnerTabs.map((tab) => {
                const isActive = partnerTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setPartnerTab(tab.id)}
                    className={`flex items-center gap-1.5 whitespace-nowrap pb-2 -mb-3 transition-colors ${isActive
                        ? 'text-[#00875a] font-extrabold border-b-2 border-[#00875a]'
                        : 'hover:text-slate-900'
                      }`}
                  >
                    {tab.icon}
                    <span>{language === 'vi' ? tab.labelVi : tab.labelEn}</span>
                  </button>
                );
              })}
            </div>
          </ScrollReveal>

          {/* 7 Partner Logos Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3.5">

            {/* 1. Đại học Công nghệ TP.HCM (HUTECH) */}
            <ScrollReveal direction="up" delay={100}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="h-8 flex items-center justify-center mb-1">
                  <img
                    src="/hutech-partner-logo.png"
                    alt="ĐẠI HỌC CÔNG NGHỆ TP.HCM"
                    className="h-7 sm:h-8 max-w-[90px] w-auto object-contain"
                  />
                </div>
                <span className="text-[9.5px] sm:text-[10px] font-extrabold text-slate-900 uppercase tracking-tight leading-tight">
                  {language === 'vi' ? 'ĐẠI HỌC CÔNG NGHỆ TP.HCM' : 'HUTECH UNIVERSITY'}
                </span>
              </div>
            </ScrollReveal>

            {/* 2. Bệnh viện Bạch Mai */}
            <ScrollReveal direction="up" delay={140}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="w-8 h-8 mb-1 text-emerald-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-none stroke-current stroke-2">
                    <circle cx="12" cy="12" r="9" />
                    <path d="M12 8v8" />
                    <path d="M8 12h8" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-tight">
                  {language === 'vi' ? 'BỆNH VIỆN BẠCH MAI' : 'BACH MAI HOSPITAL'}
                </span>
              </div>
            </ScrollReveal>

            {/* 3. Viện Pasteur TP.HCM */}
            <ScrollReveal direction="up" delay={180}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="w-8 h-8 mb-1 text-blue-700 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-tight">
                  {language === 'vi' ? 'VIỆN PASTEUR' : 'PASTEUR INSTITUTE'}
                </span>
                <span className="text-[8px] text-slate-500 uppercase font-semibold">
                  {language === 'vi' ? 'TP. HỒ CHÍ MINH' : 'HO CHI MINH CITY'}
                </span>
              </div>
            </ScrollReveal>

            {/* 4. Vingroup */}
            <ScrollReveal direction="up" delay={220}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="w-8 h-8 mb-1 text-red-600 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
                  </svg>
                </div>
                <span className="text-[11px] font-black text-red-600 tracking-wider">
                  VINGROUP
                </span>
              </div>
            </ScrollReveal>

            {/* 5. Bộ Y tế */}
            <ScrollReveal direction="up" delay={260}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="w-8 h-8 mb-1 text-blue-900 flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
                  </svg>
                </div>
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-tight">
                  {language === 'vi' ? 'BỘ Y TẾ' : 'MINISTRY OF HEALTH'}
                </span>
              </div>
            </ScrollReveal>

            {/* 6. WHO */}
            <ScrollReveal direction="up" delay={300}>
              <div className="bg-white rounded-xl p-3 border border-slate-200/90 shadow-2xs flex flex-col items-center justify-center text-center h-[92px] hover:border-slate-400 transition-colors">
                <div className="w-8 h-8 mb-1 text-sky-600 flex items-center justify-center">
                  <Globe className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-extrabold text-sky-800 leading-none">
                  World Health
                </span>
                <span className="text-[8px] font-extrabold text-sky-800 leading-none mt-0.5">
                  Organization
                </span>
              </div>
            </ScrollReveal>

            {/* 7. More ... */}
            <ScrollReveal direction="up" delay={340}>
              <div
                onClick={() => onOpenCollaboration('partner')}
                className="bg-slate-100/80 hover:bg-slate-200/80 rounded-xl p-3 border border-slate-200 flex items-center justify-center text-center h-[92px] cursor-pointer transition-colors"
              >
                <span className="text-xl font-black text-slate-500">...</span>
              </div>
            </ScrollReveal>

          </div>

        </div>
      </section>

      {/* ===================== BOTTOM CTA BANNER ===================== */}
      <section className="py-4 max-w-[1340px] mx-auto px-4 sm:px-6 mb-6">
        <ScrollReveal direction="up" delay={100}>
          <div
            className="rounded-2xl overflow-hidden px-6 py-4.5 sm:px-8 sm:py-5 border border-white/60 relative shadow-sm"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0.15) 50%, rgba(255, 255, 255, 0) 80%), url('/tea-hills-banner.jpg')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center 45%',
              backgroundRepeat: 'no-repeat'
            }}
          >
            <div className="relative z-10 flex flex-col xl:flex-row items-center justify-between gap-5">

              {/* Statement on left (Spans horizontally) */}
              <div className="flex-1 max-w-2xl xl:max-w-3xl text-center xl:text-left">
                <h3 className="text-sm sm:text-[14.5px] xl:text-[15.5px] font-bold text-slate-800 leading-snug tracking-tight">
                  {t('ctaText')}
                </h3>
              </div>

              {/* 3 Buttons in center-right */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 flex-shrink-0">
                {/* Button 1: Trở thành đối tác */}
                <button
                  onClick={() => onOpenCollaboration('partner')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-xs active:scale-95 transition-all whitespace-nowrap"
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>{t('becomePartner')}</span>
                </button>

                {/* Button 2: Đăng ký chuyên gia */}
                <button
                  onClick={() => onOpenCollaboration('expert')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#0072ce] hover:bg-[#005fb0] text-white text-xs font-bold shadow-xs active:scale-95 transition-all whitespace-nowrap"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>{t('registerExpert')}</span>
                </button>

                {/* Button 3: Gửi yêu cầu tư vấn */}
                <button
                  onClick={() => onOpenCollaboration('consulting')}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 text-xs font-bold border border-slate-300 shadow-2xs active:scale-95 transition-all whitespace-nowrap"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-600" />
                  <span>{t('sendConsultingReq')}</span>
                </button>
              </div>

              {/* Handshake graphic emblem on far right */}
              <div className="hidden xl:flex items-center justify-center w-14 h-14 rounded-full border-2 border-white/80 bg-white/15 backdrop-blur-xs shadow-xs flex-shrink-0 p-2.5">
                <img
                  src="/handshake-icon.png"
                  alt="Hợp tác đối tác"
                  className="w-full h-full object-contain drop-shadow-xs"
                />
              </div>

            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Detail Modal for Selected Event */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-2xl p-6 max-w-lg w-full shadow-2xl border border-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold px-2.5 py-1 bg-emerald-100 text-emerald-800 rounded-full">
                {language === 'vi' ? selectedEvent.categoryVi : selectedEvent.categoryEn}
              </span>
              <button
                onClick={() => setSelectedEvent(null)}
                className="text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="my-4 space-y-3">
              <h4 className="text-base font-bold text-slate-900 leading-snug">
                {language === 'vi' ? selectedEvent.titleVi : selectedEvent.titleEn}
              </h4>
              <div className="text-xs text-slate-600 space-y-1 bg-slate-50 p-3 rounded-xl">
                <p><strong>{language === 'vi' ? 'Thời gian:' : 'Time:'}</strong> {selectedEvent.time}, {selectedEvent.day} {language === 'vi' ? selectedEvent.monthVi : selectedEvent.monthEn} 2025</p>
                <p><strong>{language === 'vi' ? 'Địa điểm:' : 'Location:'}</strong> {language === 'vi' ? selectedEvent.locationVi : selectedEvent.locationEn}</p>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed font-medium">
                {language === 'vi' ? selectedEvent.descriptionVi : selectedEvent.descriptionEn}
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSelectedEvent(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl"
              >
                {language === 'vi' ? 'Đóng' : 'Close'}
              </button>
              <button
                onClick={() => {
                  const title = language === 'vi' ? selectedEvent.titleVi : selectedEvent.titleEn;
                  setSelectedEvent(null);
                  onOpenCollaboration('training', title);
                }}
                className="px-4 py-2 text-xs font-bold bg-[#00875a] text-white rounded-xl hover:bg-[#00734c]"
              >
                {language === 'vi' ? 'Đăng ký tham gia' : 'Register Now'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* High-Definition Video Intro Modal */}
      {isVideoModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-fade-in"
          onClick={() => setIsVideoModalOpen(false)}
        >
          <div
            className="relative w-full max-w-4xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-white/20 flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 bg-slate-900 border-b border-white/10 text-white">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Play className="w-4 h-4 fill-current" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white leading-tight">
                    {language === 'vi' ? 'Video Giới Thiệu Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ' : 'Binh My Innovative Student Village - Intro Video'}
                  </h3>
                  <p className="text-[11px] text-slate-400 font-medium">
                    {language === 'vi' ? 'Hệ sinh thái Y tế – Du lịch – Nông nghiệp bền vững' : 'Healthcare - Tourism - Sustainable Agriculture'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Video Player */}
            <div className="relative w-full bg-black aspect-video flex items-center justify-center">
              <video
                controls
                autoPlay
                className="w-full h-full object-contain"
              >
                <source src="/intro-video.mp4" type="video/mp4" />
                <source src="/Video_gioi_thieu_Lang_Sinh_Vien_DMST_Binh_My.mp4" type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ thẻ video.
              </video>
            </div>

            {/* Modal Footer */}
            <div className="px-4 sm:px-6 py-3 bg-slate-950 flex flex-wrap items-center justify-between gap-3 text-white border-t border-white/10">
              <p className="text-xs text-slate-400 font-medium hidden sm:block">
                {language === 'vi' ? 'Trải nghiệm toàn diện không gian đào tạo và nghiên cứu thực nghiệm tại Bình Mỹ.' : 'Experience the training and experimental research space at Binh My.'}
              </p>
              <div className="flex items-center gap-2 ml-auto">
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onNavigate('health-models');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#079b56] hover:bg-[#06874b] text-white text-xs font-bold transition-all"
                >
                  {t('exploreModels')}
                </button>
                <button
                  onClick={() => {
                    setIsVideoModalOpen(false);
                    onOpenCollaboration('general');
                  }}
                  className="px-3 py-1.5 rounded-lg bg-[#078be9] hover:bg-[#067ad1] text-white text-xs font-bold transition-all"
                >
                  {t('proposeCollaboration')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

