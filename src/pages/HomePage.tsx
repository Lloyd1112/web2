import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDataService, AdminProject, AdminNewsItem } from '../services/adminDataService';
import { RealProblem, ProblemCategory, AdminPartner } from '../types';
import { ProblemDetailModal } from '../components/problems/ProblemDetailModal';
import {
  X,
  HeartHandshake,
  Sprout,
  Users,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  Play,
  Volume2,
  VolumeX,
  GraduationCap,
  Calendar,
  Sparkles,
  Zap,
  Activity,
  Compass,
  CheckCircle2,
  FileText,
  AlertCircle,
  Building2,
  Globe2,
  Award,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleToggleMute = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (videoRef.current) {
      const nextMuted = !videoRef.current.muted;
      videoRef.current.muted = nextMuted;
      setIsMuted(nextMuted);
    }
  };

  const handleTogglePlay = () => {
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

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = true;
      videoRef.current.play().catch(err => {
        console.log('Autoplay deferred:', err);
      });
    }
  }, []);

  const [selectedProblem, setSelectedProblem] = useState<RealProblem | null>(null);

  // ================= BỘ LỌC ĐỒNG BỘ VỚI CÁC MỤC =================
  const [selectedPartnerCategory, setSelectedPartnerCategory] = useState<string>('all');
  const [selectedProjectCategory, setSelectedProjectCategory] = useState<string>('all');
  const [selectedProblemCategory, setSelectedProblemCategory] = useState<string>('all');

  const partnerCategories = [
    { id: 'all', labelVi: 'Tất cả đối tác', labelEn: 'All Partners' },
    { id: 'enterprise', labelVi: 'Doanh nghiệp & HTX', labelEn: 'Enterprises' },
    { id: 'university', labelVi: 'Trường đại học', labelEn: 'Universities' },
    { id: 'hospital', labelVi: 'Bệnh viện & Y tế', labelEn: 'Hospitals & Healthcare' },
    { id: 'government', labelVi: 'Chính quyền địa phương', labelEn: 'Local Government' },
    { id: 'international', labelVi: 'Tổ chức quốc tế', labelEn: 'International' },
  ];

  const projectCategories = [
    { id: 'all', labelVi: 'Tất cả dự án', labelEn: 'All Projects' },
    { id: 'agriculture', labelVi: 'Nông nghiệp', labelEn: 'Agriculture' },
    { id: 'health', labelVi: 'Y tế - Sức khỏe', labelEn: 'Healthcare' },
    { id: 'tourism', labelVi: 'Du lịch', labelEn: 'Tourism' },
    { id: 'innovation', labelVi: 'Đổi mới sáng tạo', labelEn: 'Innovation' },
  ];

  const problemCategories = [
    { id: 'all', labelVi: 'Tất cả bài toán', labelEn: 'All Problems' },
    { id: 'agriculture', labelVi: 'Nông nghiệp', labelEn: 'Agriculture' },
    { id: 'health', labelVi: 'Y tế - Sức khỏe', labelEn: 'Healthcare' },
    { id: 'tourism', labelVi: 'Du lịch', labelEn: 'Tourism' },
    { id: 'environment', labelVi: 'Môi trường & ĐMST', labelEn: 'Environment & Innovation' },
  ];

  // State modal chi tiết dự án thực tế
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);

  // State modal chi tiết tin tức / sự kiện đồng bộ từ admin
  const [selectedNewsItem, setSelectedNewsItem] = useState<AdminNewsItem | null>(null);

  // Phiên bản dữ liệu đồng bộ real-time
  const [dataVersion, setDataVersion] = useState<number>(0);

  // Danh sách đối tác đồng hành & chiến lược đồng bộ từ AdminDataService
  const [partnersList, setPartnersList] = useState<AdminPartner[]>(() => {
    return AdminDataService.getPartners();
  });

  useEffect(() => {
    const unsubscribe = AdminDataService.subscribe(() => {
      setPartnersList(AdminDataService.getPartners());
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  // 1. Lấy dữ liệu đối tác theo bộ lọc & chỉ hiển thị đối tác được kích hoạt và cho phép hiển thị trang chủ
  const filteredPartners = useMemo(() => {
    const activeHomepagePartners = partnersList.filter(
      p => p.isActive !== false && p.showOnHomepage !== false
    );

    if (selectedPartnerCategory === 'all') {
      const strategics = activeHomepagePartners.filter(p => p.category === 'strategic' || (p as any).type === 'strategic');
      return strategics.length > 0 ? strategics : activeHomepagePartners.slice(0, 8);
    }
    return activeHomepagePartners.filter(p => 
      p.category === selectedPartnerCategory || 
      (p as any).type === selectedPartnerCategory
    );
  }, [partnersList, selectedPartnerCategory, dataVersion]);

  // 2. Lấy dữ liệu dự án tiêu biểu từ module dự án của hệ thống (đồng bộ với các mục)
  const filteredProjects = useMemo(() => {
    const allProjects = AdminDataService.getProjects();
    const published = allProjects.filter(p => p.publishStatus === 'published' || p.publishStatus !== 'hidden');
    if (selectedProjectCategory === 'all') {
      return published.slice(0, 4);
    }
    if (selectedProjectCategory === 'agriculture') {
      return published.filter(p => p.category === 'agriculture' || p.category === 'agro').slice(0, 4);
    }
    if (selectedProjectCategory === 'health') {
      return published.filter(p => p.category === 'health' || p.category === 'healthcare' || p.category === 'wellness' || p.category === 'elderly').slice(0, 4);
    }
    if (selectedProjectCategory === 'tourism') {
      return published.filter(p => p.category === 'tourism' || p.category === 'tour').slice(0, 4);
    }
    if (selectedProjectCategory === 'innovation') {
      return published.filter(p => p.category === 'innovation' || p.category === 'tech' || p.category === 'technology' || p.category === 'environment').slice(0, 4);
    }
    return published.filter(p => p.category === selectedProjectCategory).slice(0, 4);
  }, [selectedProjectCategory, dataVersion]);

  // 3. Lấy dữ liệu bài toán thực tế đã xác minh / công khai từ hệ thống (đồng bộ với các mục)
  const filteredProblems = useMemo(() => {
    const all = AdminDataService.getProblems();
    const publicOnly = all.filter(p => 
      ((p.status as string) === 'verified' || 
      (p.status as string) === 'published' || 
      p.status === 'seeking_support' || 
      p.status === 'in_progress') &&
      p.status !== 'pending' &&
      (p as any).status !== 'rejected' &&
      (p as any).isPublic !== false
    );
    if (selectedProblemCategory === 'all') {
      return publicOnly.slice(0, 4);
    }
    if (selectedProblemCategory === 'health') {
      return publicOnly.filter(p => (p.category as string) === 'health' || (p.category as string) === 'health-models').slice(0, 4);
    }
    if (selectedProblemCategory === 'environment') {
      return publicOnly.filter(p => (p.category as string) === 'environment' || (p.category as string) === 'other' || p.categoryDetail === 'Môi trường').slice(0, 4);
    }
    return publicOnly.filter(p => (p.category as string) === selectedProblemCategory).slice(0, 4);
  }, [selectedProblemCategory, dataVersion]);

  // 4. Lấy tin tức & sự kiện từ hệ thống
  const latestNews = useMemo(() => {
    const allNews = AdminDataService.getNews();
    const published = allNews.filter(n => n.isPublished !== false);
    return published.slice(0, 3);
  }, [dataVersion]);

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case 'agriculture':
        return { vi: 'NÔNG NGHIỆP', en: 'AGRICULTURE', color: 'bg-[#00875a]' };
      case 'health':
      case 'health-models':
        return { vi: 'Y TẾ - SỨC KHỎE', en: 'HEALTHCARE', color: 'bg-[#e11d48]' };
      case 'tourism':
        return { vi: 'DU LỊCH', en: 'TOURISM', color: 'bg-[#0284c7]' };
      case 'environment':
        return { vi: 'MÔI TRƯỜNG', en: 'ENVIRONMENT', color: 'bg-[#0d9488]' };
      default:
        return { vi: 'ĐỔI MỚI SÁNG TẠO', en: 'INNOVATION', color: 'bg-[#7c3aed]' };
    }
  };

  return (
    <div className="w-full bg-[#fbfdfa] text-slate-800 font-sans relative overflow-x-hidden">
      
      {/* ================= HỌA TIẾT THIÊN NHIÊN (BOTANICAL LEAF ACCENTS) ================= */}
      {/* Top Left Leaf */}
      <div className="absolute top-8 left-0 w-32 h-64 pointer-events-none opacity-25 select-none hidden lg:block z-0">
        <svg viewBox="0 0 120 240" fill="none" className="w-full h-full text-emerald-600">
          <path d="M10 20C40 60 20 120 5 180C40 160 80 120 70 60C65 30 35 15 10 20Z" fill="currentColor" opacity="0.4" />
          <path d="M30 90C60 120 50 170 30 220C70 190 90 140 80 90C75 60 50 75 30 90Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* Top Right Leaf */}
      <div className="absolute top-6 right-0 w-48 h-80 pointer-events-none opacity-30 select-none hidden lg:block z-0">
        <svg viewBox="0 0 180 300" fill="none" className="w-full h-full text-emerald-500">
          <path d="M160 20C100 60 110 140 130 210C80 180 40 130 50 70C60 30 110 15 160 20Z" fill="currentColor" opacity="0.35" />
          <path d="M120 110C80 150 90 210 110 270C65 230 30 180 40 120C50 80 85 95 120 110Z" fill="currentColor" opacity="0.25" />
        </svg>
      </div>

      {/* Bottom Right Leaf */}
      <div className="absolute top-[520px] right-0 w-40 h-72 pointer-events-none opacity-20 select-none hidden lg:block z-0">
        <svg viewBox="0 0 140 260" fill="none" className="w-full h-full text-emerald-600">
          <path d="M130 140C90 170 60 220 70 260C100 250 130 210 140 160Z" fill="currentColor" opacity="0.3" />
        </svg>
      </div>

      {/* ================= 1. HERO SECTION (BỐ CỤC 2 CỘT CHUẨN MỤC TIÊU) ================= */}
      <section className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 lg:pt-12 lg:pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* CỘT TRÁI (6 CỘT) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Nhãn nhỏ phía trên */}
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-amber-900 bg-[#fef3c7] border border-amber-300/80 shadow-2xs">
                <span>✨</span>
                <span>CAMPUS MỞ ĐỔI MỚI SÁNG TẠO</span>
              </span>
              <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                <span className="text-slate-400">⚙</span>
                <span>Hợp tác Đại học – Bệnh viện – Doanh nghiệp</span>
              </span>
            </div>

            {/* Tiêu đề 3 dòng theo màu chuẩn */}
            <div className="space-y-1">
              <h1 className="text-3xl sm:text-4xl lg:text-[50px] font-black tracking-tight leading-[1.15]">
                {/* Dòng 1: Xanh navy đậm */}
                <span className="text-[#0f294a] block">Làng Sinh Viên</span>
                
                {/* Dòng 2: Xanh lá đậm kèm họa tiết lá */}
                <span className="inline-flex items-center gap-2 text-[#00875a]">
                  <span>Đổi Mới Sáng Tạo</span>
                  <svg className="w-8 h-8 lg:w-10 lg:h-10 text-emerald-500 inline-block -translate-y-1 rotate-12 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8 6 6 12 8 18C10 16 16 14 18 8C19 5 16 3 12 2Z" />
                    <path d="M17 11C15 14 14 17 15 20C16 19 20 18 21 14C22 12 20 11 17 11Z" opacity="0.8" />
                  </svg>
                </span>
                
                {/* Dòng 3: Xanh navy đậm */}
                <span className="text-[#0f294a] block">Bình Mỹ</span>
              </h1>
            </div>

            {/* Đoạn mô tả */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl font-normal">
              {language === 'vi' ? (
                <>
                  <strong className="text-slate-800 font-bold">Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ</strong> là nền tảng kết nối các bài toán thực tế của địa phương với sinh viên, chuyên gia và doanh nghiệp, cùng hợp tác xây dựng và thử nghiệm giải pháp trong lĩnh vực y tế – du lịch – nông nghiệp. Hướng đến biến Bình Mỹ thành <strong className="text-slate-800 font-bold">“phòng thí nghiệm sống”</strong>, nơi tri thức được ứng dụng vào thực tiễn, thúc đẩy đổi mới sáng tạo và phát triển cộng đồng bền vững.
                </>
              ) : (
                <>
                  <strong className="text-slate-800 font-bold">Binh My Innovative Student Village</strong> is a platform connecting real-world local challenges with students, experts, and enterprises to co-create and test solutions in healthcare – tourism – agriculture. Aiming to transform Binh My into a <strong className="text-slate-800 font-bold">"Living Lab"</strong>, where knowledge is translated into practice, driving innovation and sustainable community development.
                </>
              )}
            </p>

            {/* Bố trí các nút bấm hành động */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Nút 1: Bài toán thực tế (Xanh lá đậm) */}
              <button
                onClick={() => onNavigate('real-problems')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#00875a] hover:bg-[#00684a] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>{language === 'vi' ? 'Bài toán thực tế' : 'Real-world Challenges'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Nút 2: Đề xuất hợp tác (Màu cam) */}
              <button
                onClick={() => onOpenCollaboration('general', '')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#f97316] hover:bg-[#ea580c] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-white" />
                <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Propose Collaboration'}</span>
              </button>
            </div>

          </div>

          {/* CỘT PHẢI: KHUNG VIDEO GIỚI THIỆU DỰ ÁN (CHUẨN HÌNH 1) */}
          <div className="lg:col-span-6">
            <div 
              onClick={handleTogglePlay}
              className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden shadow-2xl border-4 sm:border-[6px] border-white bg-slate-950 group aspect-video sm:aspect-[16/10] lg:aspect-[16/9.5] cursor-pointer select-none transition-all duration-300 hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)]"
              title={isPlaying ? (language === 'vi' ? 'Nhấn để tạm dừng video' : 'Click to pause video') : (language === 'vi' ? 'Nhấn để tiếp tục phát video' : 'Click to resume video')}
            >
              {/* Video Element */}
              <video
                ref={videoRef}
                src="/Video_gioi_thieu_Lang_Sinh_Vien_DMST_Binh_My.mp4"
                autoPlay
                loop
                muted={isMuted}
                playsInline
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Top Left Floating Tag: Video status badge with teal curved accent */}
              <div className="absolute top-3.5 left-3.5 sm:top-5 sm:left-5 z-20 pointer-events-auto">
                <div className="relative inline-flex items-center">
                  {/* Teal background tab / tail extending to the right matching Hình 1 */}
                  <div className="absolute inset-y-0 -left-1 -right-3.5 bg-gradient-to-r from-teal-900/95 to-teal-700/85 rounded-full shadow-inner" />
                  
                  {/* Main dark pill */}
                  <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full bg-[#18212f]/95 backdrop-blur-md border border-white/10 text-white shadow-md">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444] animate-pulse shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.9)]" />
                    <span className="text-xs sm:text-sm font-bold tracking-tight text-white whitespace-nowrap">
                      {language === 'vi' ? 'Video Giới Thiệu Dự Án' : 'Video Giới Thiệu Dự Án'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Top Right Floating Sound Toggle Pill */}
              <button
                type="button"
                onClick={handleToggleMute}
                className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 z-20 bg-[#1e293b]/90 hover:bg-[#0f172a] backdrop-blur-md text-white px-3.5 sm:px-4 py-1.5 sm:py-2 rounded-full border border-white/15 shadow-lg flex items-center gap-2 text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 cursor-pointer pointer-events-auto"
                title={isMuted ? (language === 'vi' ? 'Bật âm thanh' : 'Unmute') : (language === 'vi' ? 'Tắt âm thanh' : 'Mute')}
              >
                {isMuted ? (
                  <>
                    <VolumeX className="w-4 h-4 text-rose-400 shrink-0" />
                    <span className="font-medium whitespace-nowrap">{language === 'vi' ? 'Bật tiếng' : 'Unmute'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="font-medium whitespace-nowrap">{language === 'vi' ? 'Tắt tiếng' : 'Mute'}</span>
                  </>
                )}
              </button>

              {/* Center Play Button Overlay when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 flex items-center justify-center z-15 pointer-events-none">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/60 backdrop-blur-md border border-white/40 text-white flex items-center justify-center shadow-2xl transition-transform transform scale-100">
                    <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-white text-white translate-x-0.5" />
                  </div>
                </div>
              )}

            </div>
          </div>

        </div>
      </section>

      {/* ================= 2. BỐN LĨNH VỰC HOẠT ĐỘNG (4 PILLARS STRIP CHUẨN HÌNH 1) ================= */}
      <section className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-0">
            
            {/* Thẻ 1: Nông nghiệp bền vững */}
            <div 
              onClick={() => onNavigate('agriculture')}
              className="relative flex items-center gap-3.5 pr-4 cursor-pointer group hover:opacity-90 transition-opacity lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-10 lg:after:w-[1px] lg:after:bg-slate-200/90"
            >
              <div className="w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <img 
                  src="/assets/pillar-icon-1.png" 
                  alt="Nông nghiệp bền vững" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#0f294a] text-[14px] sm:text-[14.5px] leading-snug group-hover:text-[#00875a] transition-colors">
                  Nông nghiệp bền vững
                </h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                  Ứng dụng công nghệ, nâng cao giá trị nông sản địa phương
                </p>
              </div>
            </div>

            {/* Thẻ 2: Y tế – Sức khỏe cộng đồng */}
            <div 
              onClick={() => onNavigate('health-models')}
              className="relative flex items-center gap-3.5 lg:pl-6 pr-4 cursor-pointer group hover:opacity-90 transition-opacity lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-10 lg:after:w-[1px] lg:after:bg-slate-200/90"
            >
              <div className="w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <img 
                  src="/assets/pillar-icon-2.png" 
                  alt="Y tế – Sức khỏe cộng đồng" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#0f294a] text-[14px] sm:text-[14.5px] leading-snug group-hover:text-[#00875a] transition-colors">
                  Y tế – Sức khỏe cộng đồng
                </h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                  Kết nối bác sĩ, chuyên gia chăm sóc sức khỏe toàn diện
                </p>
              </div>
            </div>

            {/* Thẻ 3: Du lịch trải nghiệm */}
            <div 
              onClick={() => onNavigate('tourism')}
              className="relative flex items-center gap-3.5 lg:pl-6 pr-4 cursor-pointer group hover:opacity-90 transition-opacity lg:after:content-[''] lg:after:absolute lg:after:right-0 lg:after:top-1/2 lg:after:-translate-y-1/2 lg:after:h-10 lg:after:w-[1px] lg:after:bg-slate-200/90"
            >
              <div className="w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <img 
                  src="/assets/pillar-icon-3.png" 
                  alt="Du lịch trải nghiệm" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#0f294a] text-[14px] sm:text-[14.5px] leading-snug group-hover:text-[#00875a] transition-colors">
                  Du lịch trải nghiệm
                </h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                  Phát triển sản phẩm du lịch sinh thái gắn với văn hóa địa phương
                </p>
              </div>
            </div>

            {/* Thẻ 4: Hợp tác & Đổi mới sáng tạo */}
            <div 
              onClick={() => onNavigate('projects')}
              className="flex items-center gap-3.5 lg:pl-6 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="w-[58px] h-[58px] sm:w-[60px] sm:h-[60px] rounded-full overflow-hidden shrink-0 group-hover:scale-105 transition-transform shadow-2xs">
                <img 
                  src="/assets/pillar-icon-4.png" 
                  alt="Hợp tác & Đổi mới sáng tạo" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-[#0f294a] text-[14px] sm:text-[14.5px] leading-snug group-hover:text-[#00875a] transition-colors">
                  Hợp tác & Đổi mới sáng tạo
                </h4>
                <p className="text-[12px] text-slate-500 leading-relaxed font-normal">
                  Kết nối sinh viên, chuyên gia, doanh nghiệp và cộng đồng
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. CÁC ĐỐI TÁC CHIẾN LƯỢC & ĐỒNG HÀNH ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        {/* Tiêu đề & Nút đăng ký đối tác */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'vi' ? 'Các đối tác chiến lược' : 'Strategic Partners'}
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                {language === 'vi' 
                  ? 'Mạng lưới liên kết Viện – Trường – Bệnh viện – Doanh nghiệp và Tổ chức quốc tế' 
                  : 'Alliance of Universities, Hospitals, Enterprises & Global Organizations'}
              </span>
            </div>
          </div>

          <button
            onClick={() => onOpenCollaboration('partner', 'Đề xuất hợp tác đối tác')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>{language === 'vi' ? 'Đăng ký đối tác đồng hành' : 'Join as Partner'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bộ lọc đồng bộ danh mục đối tác */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {partnerCategories.map(cat => {
            const isActive = selectedPartnerCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedPartnerCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {language === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Lưới danh sách đối tác (4 cột cho 4 Đối tác chiến lược) */}
        <div className={`grid gap-5 ${
          filteredPartners.length === 3 
            ? 'grid-cols-1 md:grid-cols-3' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4'
        }`}>
          {filteredPartners.slice(0, 8).map(partner => (
            <div
              key={partner.id}
              onClick={() => onOpenCollaboration('partner', partner.nameVi)}
              className={`bg-white rounded-2xl border border-slate-200/80 p-5 hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col justify-between group cursor-pointer hover:-translate-y-1 ${
                (partner as any).category === 'strategic' ? 'ring-1 ring-emerald-500/20 shadow-xs' : ''
              }`}
            >
              <div className="space-y-4">
                {/* Logo Showcase Container - To, rõ nét, cân đối */}
                <div className="w-full h-26 sm:h-28 rounded-xl bg-slate-50/90 border border-slate-100/90 flex items-center justify-center p-3.5 relative overflow-hidden group-hover:bg-emerald-50/30 group-hover:border-emerald-200 transition-all duration-300">
                  {/* Badge định danh */}
                  <span className="absolute top-2.5 right-2.5 text-[10.5px] font-bold px-2.5 py-0.5 rounded-md bg-white/95 backdrop-blur-xs text-emerald-800 border border-emerald-200/80 shadow-2xs z-10">
                    {partner.badge}
                  </span>

                  {partner.logoUrl ? (
                    <img
                      src={partner.logoUrl}
                      alt={partner.nameVi}
                      className="h-14 sm:h-16 w-auto max-w-[90%] max-h-[90%] object-contain rounded-lg filter group-hover:scale-105 transition-transform duration-300 drop-shadow-2xs"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-1.5 text-emerald-700">
                      <div className="w-12 h-12 rounded-xl bg-white border border-emerald-100 shadow-2xs flex items-center justify-center group-hover:scale-110 transition-transform">
                        {partner.category === 'hospital' ? (
                          <Activity className="w-7 h-7 text-rose-600" />
                        ) : partner.category === 'university' ? (
                          <GraduationCap className="w-7 h-7 text-emerald-700" />
                        ) : partner.category === 'international' ? (
                          <Globe2 className="w-7 h-7 text-teal-700" />
                        ) : (
                          <Building2 className="w-7 h-7 text-blue-700" />
                        )}
                      </div>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {partner.category === 'hospital' ? 'Bệnh viện & Y tế' : (partner.category === 'enterprise' ? 'Doanh nghiệp' : 'Tổ chức')}
                      </span>
                    </div>
                  )}
                </div>

                {/* Thông tin đối tác */}
                <div>
                  {(partner as any).roleVi && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/80">
                        <span>★</span>
                        <span>{language === 'vi' ? (partner as any).roleVi : ((partner as any).roleEn || (partner as any).roleVi)}</span>
                      </span>
                    </div>
                  )}
                  <h3 className={`font-black text-slate-900 group-hover:text-[#00875a] transition-colors line-clamp-2 leading-snug ${
                    filteredPartners.length <= 3 ? 'text-base sm:text-lg' : 'text-sm sm:text-[14.5px]'
                  }`}>
                    {language === 'vi' ? partner.nameVi : partner.nameEn}
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-500 line-clamp-3 mt-1.5 leading-relaxed">
                    {language === 'vi' ? partner.subVi : (partner.subVi || partner.nameEn)}
                  </p>
                </div>
              </div>

              {/* Action link */}
              <div className="pt-3.5 mt-3.5 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold group-hover:text-emerald-800">
                <span>{language === 'vi' ? 'Liên kết hợp tác chiến lược' : 'Strategic Collaboration'}</span>
                {partner.websiteUrl ? (
                  <a
                    href={partner.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-[11px] text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2 py-0.5 rounded-md hover:bg-emerald-100 transition-colors"
                    title={language === 'vi' ? 'Truy cập website đối tác' : 'Visit partner website'}
                  >
                    <span>Website</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                ) : (
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================= 4. CÁC DỰ ÁN TIÊU BIỂU ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        {/* Tiêu đề & Nút xem tất cả */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'vi' ? 'Các dự án tiêu biểu' : 'Featured Projects'}
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                {language === 'vi'
                  ? 'Các mô hình đổi mới sáng tạo đang được triển khai tại Bình Mỹ'
                  : 'Active innovation models implemented in Binh My'}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>{language === 'vi' ? 'Xem tất cả' : 'View all'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bộ lọc đồng bộ danh mục dự án */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {projectCategories.map(cat => {
            const isActive = selectedProjectCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedProjectCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {language === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* 4 Card Dự án tiêu biểu */}
        {filteredProjects.length === 0 ? (
          <div className="py-12 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-200">
            <p className="text-sm text-slate-500 font-medium">
              {language === 'vi' ? 'Chưa có dự án nào trong danh mục này.' : 'No projects available in this category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredProjects.map((project, idx) => {
              const fallbackImgs = [
                '/assets/problems/card1.jpg',
                '/assets/problems/home_card3.jpg',
                '/assets/problems/card2.jpg',
                '/assets/problems/proj_4.jpg'
              ];
              const pImg = project.thumbnail || fallbackImgs[idx % 4];

              const handleProjectClick = () => {
                setSelectedProject(project);
              };

              return (
                <div 
                  key={project.id}
                  onClick={handleProjectClick}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-100">
                    <img
                      src={pImg}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackImgs[idx % 4];
                      }}
                    />
                    <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-bold text-white shadow-xs ${
                      project.status === 'in_progress'
                        ? 'bg-emerald-600'
                        : project.status === 'testing'
                          ? 'bg-emerald-600'
                          : project.status === 'seeking_resources'
                            ? 'bg-amber-600'
                            : 'bg-teal-700'
                    }`}>
                      {project.status === 'in_progress' 
                        ? (language === 'vi' ? 'Đang triển khai' : 'In Progress') 
                        : (project.status === 'testing' 
                            ? (language === 'vi' ? 'Đang thử nghiệm' : 'Testing') 
                            : (project.status === 'seeking_resources'
                                ? (language === 'vi' ? 'Đang tìm nguồn lực' : 'Seeking Resources')
                                : (language === 'vi' ? 'Đã triển khai' : 'Completed')))}
                    </span>
                  </div>
                  <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                        {language === 'vi' ? project.title : (project.titleEn || project.title)}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                        {language === 'vi' ? project.summary : (project.summaryEn || project.summary)}
                      </p>
                    </div>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span className="text-emerald-700 font-semibold">{project.categoryName || 'Mô hình trọng điểm'}</span>
                      <span>{project.location || 'Bình Mỹ'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* ================= 5. CÁC BÀI TOÁN THỰC TẾ ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        {/* Tiêu đề & Nút xem tất cả */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                {language === 'vi' ? 'Các bài toán thực tế' : 'Real-World Problems'}
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                {language === 'vi'
                  ? 'Những vấn đề từ cộng đồng đang cần giải pháp đổi mới'
                  : 'Community & enterprise challenges seeking innovative solutions'}
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('real-problems')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1.5 transition-colors cursor-pointer group"
          >
            <span>{language === 'vi' ? 'Xem tất cả' : 'View all'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Bộ lọc đồng bộ danh mục bài toán */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 mb-6 scrollbar-none">
          {problemCategories.map(cat => {
            const isActive = selectedProblemCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedProblemCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-slate-200/80'
                }`}
              >
                {language === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Lưới 4 Card bài toán thực tế */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredProblems.map((problem, index) => {
            const catInfo = getCategoryLabel(problem.category);
            const cardImg = (problem.images && problem.images.length > 0)
              ? problem.images[0]
              : `/assets/problems/home_card${(index % 4) + 1}.jpg`;

            return (
              <div
                key={problem.id}
                onClick={() => setSelectedProblem(problem)}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  <img
                    src={cardImg}
                    alt={problem.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `/assets/problems/home_card${(index % 4) + 1}.jpg`;
                    }}
                  />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10px] font-black tracking-wider uppercase text-white ${catInfo.color} shadow-xs`}>
                    {language === 'vi' ? catInfo.vi : catInfo.en}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                      {language === 'vi' ? problem.title : (problem.titleEn || problem.title)}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{problem.location || 'Bình Mỹ, Củ Chi'}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {language === 'vi' ? problem.description : (problem.descriptionEn || problem.description)}
                    </p>
                  </div>

                  {/* Nhu cầu hỗ trợ & số lượng đề xuất thực tế */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{AdminDataService.getProposalsCountByProblemId(problem.id)} {language === 'vi' ? 'đề xuất' : 'proposals'}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{problem.createdAt || (language === 'vi' ? 'Mới cập nhật' : 'Recently')}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 5. BANNER KÊU GỌI ĐĂNG BÀI TOÁN ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        <div className="bg-gradient-to-r from-emerald-950 via-teal-900 to-[#00875a] rounded-3xl p-6 sm:p-10 text-white relative overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="relative z-10 space-y-2 text-center md:text-left">
            <h3 className="text-xl sm:text-2xl lg:text-3xl font-black">
              Bạn có một bài toán thực tế cần hỗ trợ?
            </h3>
            <p className="text-emerald-100/90 text-sm sm:text-base max-w-2xl">
              Hãy chia sẻ vấn đề của bạn để cùng kết nối sinh viên, chuyên gia và các đơn vị đồng hành tìm giải pháp.
            </p>
          </div>
          <button
            onClick={() => onNavigate('real-problems')}
            className="relative z-10 shrink-0 inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-sm bg-white text-emerald-950 hover:bg-emerald-50 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <span>Gửi bài toán thực tế</span>
            <ArrowRight className="w-4 h-4 text-emerald-800" />
          </button>
        </div>
      </section>

      {/* ================= 6. TIN TỨC – SỰ KIỆN ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Tin tức – Sự kiện
            </h2>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 News Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {latestNews.length > 0 ? (
            latestNews.map((news, idx) => {
              const fallbackNewsImgs = [
                '/assets/problems/news_1.jpg',
                '/assets/problems/news_2.jpg',
                '/assets/problems/news_3.jpg'
              ];
              const nImg = news.image || fallbackNewsImgs[idx % 3];

              return (
                <div 
                  key={news.id}
                  onClick={() => setSelectedNewsItem(news)}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all duration-300 flex items-center gap-4 p-4 cursor-pointer group hover:-translate-y-0.5"
                >
                  <div className="w-24 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0">
                    <img
                      src={nImg}
                      alt={news.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = fallbackNewsImgs[idx % 3];
                      }}
                    />
                  </div>
                  <div className="space-y-1.5 flex-1 min-w-0">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200">
                      {news.category}
                    </span>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#00875a] transition-colors line-clamp-2 leading-snug">
                      {news.title}
                    </h4>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{news.publishedDate}</span>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="col-span-full py-12 text-center text-slate-400 bg-white rounded-2xl border border-dashed border-slate-200">
              <Calendar className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm font-bold text-slate-600">
                {language === 'vi' ? 'Chưa có sự kiện hoặc tin tức mới được xuất bản' : 'No upcoming events or news published yet'}
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                {language === 'vi' ? 'Ban quản trị sẽ cập nhật các sự kiện mới nhất tại đây.' : 'New events will be announced here.'}
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Modal chi tiết bài toán thực tế khi người dùng click vào card */}
      {selectedProblem && (
        <ProblemDetailModal
          problem={selectedProblem}
          onClose={() => setSelectedProblem(null)}
          onOpenProposeSolution={(prob) => {
            setSelectedProblem(null);
            onOpenCollaboration('problem', prob.title);
          }}
        />
      )}

      {/* Modal chi tiết dự án thực tế khi người dùng click vào card */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/20 text-emerald-100">
                  {selectedProject.code}
                </span>
                <span className="text-xs font-semibold text-emerald-200">
                  {selectedProject.categoryName || 'Dự án Làng Sinh Viên'}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-700">
              {/* Image & Title */}
              <div className="space-y-3">
                <div className="h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={selectedProject.thumbnail || '/assets/problems/card1.jpg'}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {language === 'vi' ? selectedProject.title : (selectedProject.titleEn || selectedProject.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'vi' ? selectedProject.summary : (selectedProject.summaryEn || selectedProject.summary)}
                </p>
              </div>

              {/* Linked Real Problem (if any) */}
              {selectedProject.problemTitle && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Bài toán thực tế liên quan:</span>
                    </div>
                    {selectedProject.problemId && (
                      <button
                        type="button"
                        onClick={() => {
                          const prob = AdminDataService.getProblemById(selectedProject.problemId!);
                          if (prob) {
                            setSelectedProject(null);
                            setSelectedProblem(prob);
                          }
                        }}
                        className="text-[11px] font-bold text-emerald-700 hover:text-emerald-900 underline cursor-pointer"
                      >
                        Xem bài toán nguồn &rarr;
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-amber-800">
                    {selectedProject.problemTitle}
                  </p>
                </div>
              )}

              {/* Organization & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Đơn vị thực hiện:</span>
                  <p className="font-bold text-slate-800">{selectedProject.organization || 'Ban Dự án Làng Sinh Viên'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Địa bàn triển khai:</span>
                  <p className="font-bold text-slate-800">{selectedProject.location || 'Bình Mỹ, Củ Chi'}</p>
                </div>
              </div>

              {/* Participating Partners (if any) */}
              {selectedProject.partnerIds && selectedProject.partnerIds.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Đối tác tham gia dự án:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.partnerIds.map(pId => {
                      const partner = AdminDataService.getPartnerById(pId);
                      if (!partner) return null;
                      return (
                        <div key={pId} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          <img src={partner.logoUrl} alt={partner.nameVi} className="w-5 h-5 object-contain" />
                          <span className="font-medium text-slate-800">{language === 'vi' ? partner.nameVi : (partner.nameEn || partner.nameVi)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Content */}
              {selectedProject.content && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nội dung chi tiết:</h4>
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                    {selectedProject.content}
                  </p>
                </div>
              )}

              {/* Expected Outcomes */}
              {selectedProject.expectedOutcomes && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Kết quả kỳ vọng:</span>
                  <p className="text-xs text-emerald-800">{selectedProject.expectedOutcomes}</p>
                </div>
              )}
            </div>

            {/* Footer action buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenCollaboration('project', title);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all flex items-center gap-2 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Đề xuất hợp tác cho dự án này</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết tin tức / sự kiện khi người dùng click vào thẻ trên Trang chủ */}
      {selectedNewsItem && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedNewsItem(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Image */}
            <div className="relative aspect-[16/9] w-full bg-slate-100 shrink-0">
              <img
                src={selectedNewsItem.image || '/assets/problems/banner-clean.png'}
                alt={selectedNewsItem.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/assets/problems/banner-clean.png';
                }}
              />
              <button
                onClick={() => setSelectedNewsItem(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="absolute top-4 left-4 bg-[#00875a] text-white px-3 py-1 rounded-full text-xs font-bold shadow-xs">
                {selectedNewsItem.category}
              </div>
            </div>

            {/* Content Body */}
            <div className="p-6 sm:p-7 overflow-y-auto space-y-4 flex-1 text-slate-700">
              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{selectedNewsItem.publishedDate}</span>
                </div>
                {selectedNewsItem.author && (
                  <>
                    <span>•</span>
                    <span className="text-slate-600 font-medium">Tác giả: {selectedNewsItem.author}</span>
                  </>
                )}
              </div>

              <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                {selectedNewsItem.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                {selectedNewsItem.summary}
              </p>

              {selectedNewsItem.content && selectedNewsItem.content !== selectedNewsItem.summary && (
                <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                  {selectedNewsItem.content}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedNewsItem(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedNewsItem(null);
                    onNavigate('events');
                  }}
                  className="px-4 py-2 rounded-xl border border-emerald-600 text-emerald-700 hover:bg-emerald-50 text-xs font-bold transition-colors cursor-pointer"
                >
                  Xem mục Sự kiện &rarr;
                </button>
                <button
                  onClick={() => {
                    const title = selectedNewsItem.title;
                    setSelectedNewsItem(null);
                    onOpenCollaboration('event', title);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <HeartHandshake className="w-4 h-4" />
                  <span>Đề xuất hợp tác</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default HomePage;
