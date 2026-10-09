import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Users,
  GraduationCap,
  Handshake,
  Landmark,
  FileText,
  Lightbulb,
  Building2,
  MapPin,
  MessageSquare,
  Clock,
  ArrowRight,
  ChevronRight,
  Sprout,
  Sun,
  HeartPulse,
  Compass,
  Calendar,
  Sparkles
} from 'lucide-react';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-white text-slate-800 font-sans">
      
      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative min-h-[540px] lg:min-h-[600px] flex items-center overflow-hidden bg-slate-900">
        
        {/* Background Image: Aerial countryside view of Binh My */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2000&q=85"
            alt="Bình Mỹ Riverside Landscape"
            className="w-full h-full object-cover object-center scale-105 transform animate-fade-in"
          />
          {/* Subtle warm sunset & sunlight gradient overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/80 to-white/20 lg:to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/60 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Headline & Action Buttons (7 cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              <div className="space-y-1.5">
                <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black tracking-tight text-[#0f294a] leading-[1.18]">
                  Kết nối tri thức<br />
                  Giải quyết bài toán thực tế<br />
                  tại Bình Mỹ
                </h1>
              </div>

              <p className="text-sm sm:text-base text-slate-700 leading-relaxed max-w-xl font-medium">
                Nơi sinh viên, chuyên gia, doanh nghiệp và cộng đồng cùng chung tay phát triển y tế – du lịch – nông nghiệp, biến Bình Mỹ thành một Living Lab – phòng thí nghiệm sống.
              </p>

              {/* Two Call-to-Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('real-problems')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-white bg-[#00684a] hover:bg-[#005238] transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
                >
                  <span className="text-base">🌱</span>
                  <span>Xem các bài toán thực tế</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>

                <button
                  onClick={() => onNavigate('health-models')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold text-[#0f294a] bg-white/95 hover:bg-white border border-slate-700/80 transition-all shadow-xs hover:shadow-md active:scale-95 cursor-pointer"
                >
                  <span>Khám phá dự án</span>
                  <ArrowRight className="w-4 h-4 ml-0.5" />
                </button>
              </div>

            </div>

            {/* Right Calligraphy Quote (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end justify-center text-center lg:text-right pt-4 lg:pt-0">
              <div className="max-w-md space-y-2">
                <p 
                  className="text-2xl sm:text-3xl lg:text-[34px] font-serif italic text-slate-800 leading-snug tracking-wide"
                  style={{ fontFamily: "'Playfair Display', 'Caveat', serif" }}
                >
                  Từ những<br />
                  <span className="font-semibold text-slate-900">bài toán thực tế</span><br />
                  đến những giá trị bền vững
                </p>

                {/* Hand-drawn Green Curved Brush Underline */}
                <div className="flex justify-center lg:justify-end pt-1">
                  <svg 
                    className="w-48 sm:w-64 h-5 text-[#00875a]" 
                    viewBox="0 0 250 20" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M3 14C50 4 150 2 247 16" 
                      stroke="currentColor" 
                      strokeWidth="3.5" 
                      strokeLinecap="round" 
                    />
                  </svg>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ================= 2. BỐN KHỐI ĐỐI TƯỢNG (4 STAKEHOLDER CARDS) ================= */}
      <section className="relative z-20 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 -mt-8 sm:-mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Nông dân & Doanh nghiệp */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Nông dân & Doanh nghiệp
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Đăng bài toán thực tế từ sản xuất và đời sống
            </p>
          </div>

          {/* Card 2: Sinh viên & Giới trẻ */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Sinh viên & Giới trẻ
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Đóng góp ý tưởng, tham gia giải quyết và học hỏi thực tế
            </p>
          </div>

          {/* Card 3: Chuyên gia & Đối tác */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Handshake className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Chuyên gia & Đối tác
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Cung cấp giải pháp, nguồn lực và đồng hành triển khai
            </p>
          </div>

          {/* Card 4: Địa phương */}
          <div className="bg-white rounded-2xl p-5 shadow-lg border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-sm mb-1">
              Địa phương
            </h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Hỗ trợ, kết nối và lan tỏa tác động tích cực
            </p>
          </div>

        </div>
      </section>

      {/* ================= 3. THỐNG KÊ ẤN TƯỢNG (STATS COUNTER STRIP) ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Stat 1: 125+ */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 bg-emerald-50/50 flex items-center justify-center text-[#00875a] shrink-0">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">
                125+
              </div>
              <p className="text-xs text-slate-500 font-medium leading-tight">
                Bài toán thực tế đã được tiếp nhận
              </p>
            </div>
          </div>

          {/* Stat 2: 80+ */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 bg-emerald-50/50 flex items-center justify-center text-[#00875a] shrink-0">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">
                80+
              </div>
              <p className="text-xs text-slate-500 font-medium leading-tight">
                Sinh viên & chuyên gia tham gia
              </p>
            </div>
          </div>

          {/* Stat 3: 25+ */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 bg-emerald-50/50 flex items-center justify-center text-[#00875a] shrink-0">
              <Lightbulb className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">
                25+
              </div>
              <p className="text-xs text-slate-500 font-medium leading-tight">
                Dự án đang triển khai
              </p>
            </div>
          </div>

          {/* Stat 4: 10+ */}
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border-2 border-emerald-500/30 bg-emerald-50/50 flex items-center justify-center text-[#00875a] shrink-0">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-black text-slate-900 leading-none mb-1">
                10+
              </div>
              <p className="text-xs text-slate-500 font-medium leading-tight">
                Đối tác doanh nghiệp và tổ chức
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 4. BÀI TOÁN THỰC TẾ NỔI BẬT ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Bài toán thực tế nổi bật
            </h2>
          </div>

          <button
            onClick={() => onNavigate('real-problems')}
            className="text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Problems Cards Row */}
        <div className="relative">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            
            {/* Problem Card 1: Nông nghiệp */}
            <div 
              onClick={() => onNavigate('real-problems')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/assets/problems/card1.jpg"
                  alt="Tìm giải pháp xử lý sâu bệnh trên cây có múi"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-black tracking-wider uppercase text-white bg-[#00875a] shadow-xs">
                  NÔNG NGHIỆP
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                    Tìm giải pháp xử lý sâu bệnh trên cây có múi
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bình Mỹ, Củ Chi</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    Vườn cây có múi bị sâu bệnh, năng suất giảm, cần giải pháp sinh học an toàn, hiệu quả lâu dài...
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>12 đề xuất</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>2 tuần trước</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Card 2: Du lịch */}
            <div 
              onClick={() => onNavigate('real-problems')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/assets/problems/card3.jpg"
                  alt="Phát triển sản phẩm du lịch sinh thái đường sông"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-black tracking-wider uppercase text-white bg-[#0284c7] shadow-xs">
                  DU LỊCH
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                    Phát triển sản phẩm du lịch sinh thái đường sông
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bình Mỹ, Củ Chi</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    Cần ý tưởng xây dựng tour du lịch trải nghiệm kết hợp nông nghiệp và văn hóa địa phương...
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>8 đề xuất</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>3 tuần trước</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Card 3: Y tế - Sức khỏe */}
            <div 
              onClick={() => onNavigate('real-problems')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/assets/problems/card2.jpg"
                  alt="Hỗ trợ chăm sóc sức khỏe người cao tuổi tại địa phương"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-black tracking-wider uppercase text-white bg-[#e11d48] shadow-xs">
                  Y TẾ - SỨC KHỎE
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                    Hỗ trợ chăm sóc sức khỏe người cao tuổi tại địa phương
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bình Mỹ, Củ Chi</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    Cần giải pháp theo dõi sức khỏe tại nhà, kết nối y tế cộng đồng và nâng cao nhận thức...
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>10 đề xuất</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>1 tháng trước</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Problem Card 4: Môi trường */}
            <div 
              onClick={() => onNavigate('real-problems')}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
            >
              <div className="relative h-44 overflow-hidden bg-slate-100">
                <img
                  src="/assets/problems/card5.jpg"
                  alt="Cải thiện chất lượng nước kênh rạch nội đồng"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[10.5px] font-black tracking-wider uppercase text-white bg-[#0d9488] shadow-xs">
                  MÔI TRƯỜNG
                </span>
              </div>
              <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                <div className="space-y-1.5">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                    Cải thiện chất lượng nước kênh rạch nội đồng
                  </h3>
                  <div className="flex items-center gap-1 text-[11px] text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Bình Mỹ, Củ Chi</span>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed pt-1">
                    Nước kênh bị ô nhiễm, ảnh hưởng đến sản xuất và sinh hoạt, cần giải pháp xử lý phù hợp...
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                  <div className="flex items-center gap-1">
                    <MessageSquare className="w-3.5 h-3.5 text-slate-400" />
                    <span>6 đề xuất</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>1 tháng trước</span>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Carousel Next Arrow Indicator on the right edge */}
          <button 
            onClick={() => onNavigate('real-problems')}
            className="hidden lg:flex absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white border border-slate-200 shadow-md hover:shadow-lg items-center justify-center text-slate-700 hover:text-[#00875a] transition-all z-10 cursor-pointer active:scale-95"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </section>

      {/* ================= 5. DỰ ÁN TIÊU BIỂU ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Dự án tiêu biểu
            </h2>
          </div>

          <button
            onClick={() => onNavigate('health-models')}
            className="text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Projects Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          
          {/* Project 1: Nông nghiệp IoT */}
          <div 
            onClick={() => onNavigate('health-models')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src="/assets/pum/offer_cover_image_fat586sebws8.jpg"
                alt="Mô hình trồng rau sạch ứng dụng IoT"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors mb-2">
                  Mô hình trồng rau sạch ứng dụng IoT
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Đang triển khai
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Sprout className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Nông nghiệp</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bình Mỹ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 2: Tour du lịch */}
          <div 
            onClick={() => onNavigate('health-models')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src="/assets/problems/card3.jpg"
                alt="Tour du lịch trải nghiệm làng quê"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors mb-2">
                  Tour du lịch trải nghiệm làng quê
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-blue-50 text-blue-700 border border-blue-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Đang thử nghiệm
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5 text-blue-600" />
                  <span>Du lịch</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bình Mỹ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 3: Y tế */}
          <div 
            onClick={() => onNavigate('health-models')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src="/assets/problems/card6.jpg"
                alt="Chăm sóc sức khỏe cộng đồng"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors mb-2">
                  Chăm sóc sức khỏe cộng đồng
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Đã triển khai
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <HeartPulse className="w-3.5 h-3.5 text-rose-500" />
                  <span>Y tế</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bình Mỹ</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project 4: Năng lượng sạch */}
          <div 
            onClick={() => onNavigate('health-models')}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
          >
            <div className="relative h-44 overflow-hidden bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1509391365360-2e959784a276?auto=format&fit=crop&w=600&q=80"
                alt="Giải pháp năng lượng sạch cho nông hộ"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
              <div>
                <h3 className="font-bold text-slate-900 text-sm leading-snug group-hover:text-[#00875a] transition-colors mb-2">
                  Giải pháp năng lượng sạch cho nông hộ
                </h3>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Đang tìm nguồn lực
                </span>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1">
                  <Sun className="w-3.5 h-3.5 text-amber-500" />
                  <span>Môi trường</span>
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5 text-slate-400" />
                  <span>Bình Mỹ</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 6. BANNER KÊU GỌI (CTA BANNER) ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="relative rounded-3xl overflow-hidden shadow-xl bg-gradient-to-r from-[#1b3d2b] via-[#215337] to-[#14422a] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 border border-emerald-800/40">
          
          {/* Subtle sprout seedling image on left background */}
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 flex items-center justify-center shrink-0 border border-white/20">
              <span className="text-3xl sm:text-4xl">🌱</span>
            </div>
            <div className="space-y-1">
              <h3 className="text-xl sm:text-2xl font-black text-white leading-snug">
                Bạn có một bài toán thực tế cần hỗ trợ?
              </h3>
              <p className="text-xs sm:text-sm text-emerald-100/90 font-medium">
                Hãy chia sẻ, chúng tôi sẽ cùng bạn tìm giải pháp!
              </p>
            </div>
          </div>

          {/* Button Đăng bài toán ngay */}
          <button
            onClick={() => onNavigate('real-problems')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-bold text-slate-900 bg-white hover:bg-emerald-50 transition-all shadow-md hover:shadow-lg active:scale-95 shrink-0 cursor-pointer"
          >
            <span>Đăng bài toán ngay</span>
            <ArrowRight className="w-4 h-4" />
          </button>

        </div>
      </section>

      {/* ================= 7. TIN TỨC - SỰ KIỆN ================= */}
      <section className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-6 bg-[#00875a] rounded-full" />
            <h2 className="text-xl sm:text-2xl font-black text-slate-900">
              Tin tức - Sự kiện
            </h2>
          </div>

          <button
            onClick={() => onNavigate('events')}
            className="text-xs sm:text-sm font-bold text-[#00875a] hover:text-[#00684a] flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Xem tất cả</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 3 Horizontal News Items */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* News Item 1 */}
          <div 
            onClick={() => onNavigate('events')}
            className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img
                src="/assets/pum/hero_visual2-e1710851129461.jpg"
                alt="Làng SV Bình Mỹ khởi động chuỗi dự án đổi mới sáng tạo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                Làng SV Bình Mỹ khởi động chuỗi dự án đổi mới sáng tạo
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>20/04/2025</span>
              </div>
            </div>
          </div>

          {/* News Item 2 */}
          <div 
            onClick={() => onNavigate('events')}
            className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80"
                alt="Sinh viên trải nghiệm thực tế tại các mô hình nông nghiệp"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                Sinh viên trải nghiệm thực tế tại các mô hình nông nghiệp
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>15/04/2025</span>
              </div>
            </div>
          </div>

          {/* News Item 3 */}
          <div 
            onClick={() => onNavigate('events')}
            className="flex items-center gap-3.5 bg-white p-3 rounded-2xl border border-slate-200 hover:shadow-lg transition-all duration-300 group cursor-pointer"
          >
            <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden shrink-0 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=600&q=80"
                alt="Kết nối doanh nghiệp với sinh viên sáng tạo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="space-y-1.5 flex-1">
              <h4 className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-[#00875a] transition-colors line-clamp-2">
                Kết nối doanh nghiệp với sinh viên sáng tạo
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>10/04/2025</span>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};

export default HomePage;
