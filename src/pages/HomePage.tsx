import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDataService } from '../services/adminDataService';
import { RealProblem, ProblemCategory } from '../types';
import { ProblemDetailModal } from '../components/problems/ProblemDetailModal';
import {
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
  Workflow,
  LayoutGrid,
  UserCheck,
  GraduationCap,
  Calendar,
  Sparkles,
  Zap,
  Activity,
  Compass,
  CheckCircle2,
  FileText,
  AlertCircle
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [isPlayingVideo, setIsPlayingVideo] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<RealProblem | null>(null);

  // 1. Lấy dữ liệu bài toán thực tế đã xác minh / công khai từ hệ thống
  const verifiedProblems = useMemo(() => {
    const all = AdminDataService.getProblems();
    // Ưu tiên các bài toán đã được xác minh / công khai / đang tìm nguồn lực
    const filtered = all.filter(p => 
      (p.status as string) === 'verified' || 
      (p.status as string) === 'published' || 
      p.status === 'seeking_support' || 
      p.status === 'in_progress' ||
      (p as any).isPublic !== false
    );
    return filtered.slice(0, 4);
  }, []);

  // 2. Lấy danh sách dự án tiêu biểu từ module dự án của hệ thống
  const featuredProjects = useMemo(() => {
    const allProjects = AdminDataService.getProjects();
    const published = allProjects.filter(p => p.publishStatus === 'published' || p.publishStatus !== 'hidden');
    return published.slice(0, 4);
  }, []);

  // 3. Lấy tin tức & sự kiện từ hệ thống
  const latestNews = useMemo(() => {
    const allNews = AdminDataService.getNews();
    const published = allNews.filter(n => n.isPublished !== false);
    return published.slice(0, 3);
  }, []);

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
          
          {/* CỘT TRÁI (7 CỘT) */}
          <div className="lg:col-span-7 space-y-6">
            
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
              Mô hình campus mở kết nối nhà trường, bệnh viện, bác sĩ quốc tế, nhà khoa học, doanh nghiệp và cộng đồng nhằm phát triển hệ sinh thái y tế – du lịch – nông nghiệp bền vững.
            </p>

            {/* Bố trí 3 nút bấm có đầy đủ chức năng */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {/* Nút 1: Khám phá các mô hình (Xanh lá đậm) */}
              <button
                onClick={() => onNavigate('projects')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#00875a] hover:bg-[#00684a] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <span>Khám phá các mô hình</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Nút 2: Đăng ký chương trình (Nền trắng, viền xanh) */}
              <button
                onClick={() => onOpenCollaboration('program', 'Đăng ký chương trình Sinh viên')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-[#00875a] bg-white border-2 border-[#00875a] hover:bg-emerald-50 transition-all shadow-2xs hover:shadow-md active:scale-95 cursor-pointer"
              >
                <span>Đăng ký chương trình</span>
              </button>

              {/* Nút 3: Đề xuất hợp tác (Màu cam) */}
              <button
                onClick={() => onOpenCollaboration('general', '')}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white bg-[#f97316] hover:bg-[#ea580c] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <HeartHandshake className="w-4 h-4 text-white" />
                <span>Đề xuất hợp tác</span>
              </button>
            </div>

            {/* Khu vực 4 khối thống kê ngang dưới Hero */}
            <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 border-t border-slate-200/80">
              
              {/* Nhóm 1: 05 Trụ cột hoạt động */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-emerald-100/70 text-[#00875a] flex items-center justify-center shrink-0">
                  <Workflow className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-none">05</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Trụ cột hoạt động</div>
                </div>
              </div>

              {/* Nhóm 2: 12 Mô hình kinh tế */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-100/70 text-blue-600 flex items-center justify-center shrink-0">
                  <LayoutGrid className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-none">12</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Mô hình kinh tế</div>
                </div>
              </div>

              {/* Nhóm 3: 100+ Bác sĩ & Chuyên gia */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-amber-100/70 text-amber-600 flex items-center justify-center shrink-0">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-none">100+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Bác sĩ & Chuyên gia</div>
                </div>
              </div>

              {/* Nhóm 4: 500+ Sinh viên tham gia */}
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-purple-100/70 text-purple-600 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-base font-black text-slate-900 leading-none">500+</div>
                  <div className="text-[11px] text-slate-500 font-medium mt-0.5">Sinh viên tham gia</div>
                </div>
              </div>

            </div>

          </div>

          {/* CỘT PHẢI: KHUNG VIDEO GIỚI THIỆU DỰ ÁN (5 CỘT) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 group">
              {isPlayingVideo ? (
                <div className="relative h-[340px] sm:h-[380px] w-full bg-black flex items-center justify-center">
                  <video
                    src="/Video_gioi_thieu_Lang_Sinh_Vien_DMST_Binh_My.mp4"
                    controls
                    autoPlay
                    muted={isMuted}
                    className="w-full h-full object-cover"
                    onEnded={() => setIsPlayingVideo(false)}
                  />
                  <button
                    onClick={() => setIsPlayingVideo(false)}
                    className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/75 hover:bg-black text-white text-xs font-semibold z-20 cursor-pointer shadow-md"
                  >
                    Đóng video ✕
                  </button>
                </div>
              ) : (
                <div 
                  className="relative h-[340px] sm:h-[380px] w-full overflow-hidden cursor-pointer"
                  onClick={() => setIsPlayingVideo(true)}
                  title="Nhấn để xem video giới thiệu Làng Sinh Viên Bình Mỹ"
                >
                  <img
                    src="/hero-campus-video.jpg"
                    alt="Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Vòng tròn hiệu ứng tương tác tại nút Play */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-16 h-16 rounded-full border-2 border-white/60 group-hover:scale-125 transition-transform duration-300" />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* ================= 2. BỐN LĨNH VỰC HOẠT ĐỘNG (4 CARDS NGANG) ================= */}
      <section className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="bg-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-100">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 lg:divide-x divide-slate-100">
            
            {/* Thẻ 1: Nông nghiệp bền vững */}
            <div 
              onClick={() => onNavigate('agriculture')}
              className="flex items-start gap-3.5 pt-3 sm:pt-0 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-emerald-100/70 text-[#00875a] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Sprout className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#00875a] transition-colors">
                  Nông nghiệp bền vững
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Ứng dụng công nghệ, nâng cao giá trị nông sản địa phương
                </p>
              </div>
            </div>

            {/* Thẻ 2: Y tế – Sức khỏe cộng đồng */}
            <div 
              onClick={() => onNavigate('health-models')}
              className="flex items-start gap-3.5 pt-3 sm:pt-0 lg:pl-6 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-sky-100/80 text-sky-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <div className="w-5 h-5 rounded-sm bg-sky-600 text-white flex items-center justify-center font-bold text-xs shadow-2xs">
                  +
                </div>
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#00875a] transition-colors">
                  Y tế – Sức khỏe cộng đồng
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kết nối bác sĩ, chuyên gia chăm sóc sức khỏe toàn diện
                </p>
              </div>
            </div>

            {/* Thẻ 3: Du lịch trải nghiệm */}
            <div 
              onClick={() => onNavigate('tourism')}
              className="flex items-start gap-3.5 pt-3 sm:pt-0 lg:pl-6 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100/80 text-amber-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#00875a] transition-colors">
                  Du lịch trải nghiệm
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Phát triển sản phẩm du lịch sinh thái gắn với văn hóa địa phương
                </p>
              </div>
            </div>

            {/* Thẻ 4: Hợp tác & Đổi mới sáng tạo */}
            <div 
              onClick={() => onNavigate('projects')}
              className="flex items-start gap-3.5 pt-3 sm:pt-0 lg:pl-6 cursor-pointer group hover:opacity-90 transition-opacity"
            >
              <div className="w-12 h-12 rounded-full bg-purple-100/80 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                <Users className="w-6 h-6" />
              </div>
              <div className="space-y-0.5">
                <h4 className="font-bold text-slate-900 text-sm group-hover:text-[#00875a] transition-colors">
                  Hợp tác & Đổi mới sáng tạo
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Kết nối sinh viên, chuyên gia, doanh nghiệp và cộng đồng
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. BÀI TOÁN THỰC TẾ NỔI BẬT ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        
        {/* Tiêu đề mục */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Bài toán thực tế nổi bật
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                Những vấn đề từ cộng đồng đang cần giải pháp
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('real-problems')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Lưới 4 Card bài toán thực tế đã xác minh từ hệ thống */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {verifiedProblems.map((problem, index) => {
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
                    {catInfo.vi}
                  </span>
                </div>

                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                      {problem.title}
                    </h3>
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{problem.location || 'Bình Mỹ, Củ Chi'}</span>
                    </div>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                      {problem.description}
                    </p>
                  </div>

                  {/* Nhu cầu hỗ trợ & số lượng đề xuất */}
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                      <span>{(problem as any).proposalsCount || 8} đề xuất</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{problem.createdAt || 'Mới cập nhật'}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= 4. DỰ ÁN TIÊU BIỂU ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-14">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <div className="flex flex-wrap items-baseline gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Dự án tiêu biểu
              </h2>
              <span className="text-xs sm:text-sm text-slate-500 font-normal">
                Các mô hình đổi mới sáng tạo đang được triển khai tại Bình Mỹ
              </span>
            </div>
          </div>

          <button
            onClick={() => onNavigate('projects')}
            className="self-start sm:self-auto text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Project Cards Grid từ module Dự án */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredProjects.map((project, idx) => {
            const fallbackImgs = [
              '/assets/problems/proj_1.jpg',
              '/assets/problems/proj_2.jpg',
              '/assets/problems/proj_3.jpg',
              '/assets/problems/proj_4.jpg'
            ];
            const pImg = project.thumbnail || fallbackImgs[idx % 4];

            return (
              <div 
                key={project.id}
                onClick={() => onNavigate('projects')}
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
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-bold text-white bg-emerald-600 shadow-xs">
                    {project.status === 'in_progress' ? 'Đang triển khai' : (project.status === 'testing' ? 'Đang thử nghiệm' : 'Đã triển khai')}
                  </span>
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                      {project.summary}
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
          {latestNews.map((news, idx) => {
            const fallbackNewsImgs = [
              '/assets/problems/news_1.jpg',
              '/assets/problems/news_2.jpg',
              '/assets/problems/news_3.jpg'
            ];
            const nImg = news.image || fallbackNewsImgs[idx % 3];

            return (
              <div 
                key={news.id}
                onClick={() => onNavigate('events')}
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
          })}
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

    </div>
  );
};

export default HomePage;
