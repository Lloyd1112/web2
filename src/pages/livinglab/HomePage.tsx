import React from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  Users, 
  Sparkles, 
  FileText, 
  Send, 
  FolderKanban, 
  TrendingUp, 
  ShieldCheck, 
  Layers
} from 'lucide-react';
import { LivingLabDiagram } from '../../components/livinglab/LivingLabDiagram';
import { mockMainFields, mockProblems, mockLivingLabStats } from '../../data/livingLabData';
import { ProblemItem } from '../../types/livingLab';

interface HomePageProps {
  onNavigate: (tab: string, filter?: string) => void;
  onSelectProblem: (problem: ProblemItem) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onSelectProblem
}) => {
  const featuredProblems = mockProblems.filter(p => p.featured).slice(0, 3);

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 space-y-16 pb-16 animate-fade-in">
      
      {/* ================================================== */}
      {/* 1. HERO SECTION                                   */}
      {/* ================================================== */}
      <section className="relative overflow-hidden pt-8 sm:pt-12 lg:pt-14 pb-6">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left Hero Text Block */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-[#00875a] text-xs font-bold border border-emerald-200/80 shadow-2xs">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>NỀN TẢNG LIVING LAB TẠI BÌNH MỸ</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-black text-slate-900 tracking-tight leading-[1.18]">
                BIẾN BÀI TOÁN THỰC TẾ
                <span className="block text-[#00875a]">
                  THÀNH GIẢI PHÁP
                </span>
                CHO BÌNH MỸ
              </h1>

              {/* Description */}
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
                Kết nối sinh viên, chuyên gia, doanh nghiệp và cộng đồng
                cùng tìm kiếm, xây dựng và thử nghiệm giải pháp
                cho những vấn đề thực tế tại Bình Mỹ.
              </p>

              {/* 2 Primary Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('problems')}
                  className="bg-[#00875a] hover:bg-[#00734c] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm hover:shadow-md flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
                >
                  <span>KHÁM PHÁ BÀI TOÁN</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onNavigate('submit-problem')}
                  className="bg-white hover:bg-slate-50 text-slate-800 border-2 border-slate-300 hover:border-[#00875a] px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-2xs transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#00875a]" />
                  <span>GỬI ĐỀ XUẤT VẤN ĐỀ</span>
                </button>
              </div>

              {/* Sub features indicators */}
              <div className="pt-2 flex flex-wrap items-center gap-5 text-xs text-slate-500 font-semibold border-t border-slate-200/80">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#00875a]" />
                  <span>Chỉ bài toán đã thẩm định</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#0284c7]" />
                  <span>Thực địa thử nghiệm tại vườn</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#d97706]" />
                  <span>Hướng tới nhân rộng</span>
                </div>
              </div>

            </div>

            {/* Right Living Lab Visual Diagram */}
            <div className="lg:col-span-6 flex justify-center">
              <LivingLabDiagram onNavigateToAbout={() => onNavigate('about')} />
            </div>

          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 2. 3 LĨNH VỰC                                      */}
      {/* ================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-1.5">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              3 Trọng tâm phát triển
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Lĩnh Vực Trọng Điểm Tại Bình Mỹ
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Tập trung nguồn lực đa ngành giải quyết triệt để các bài toán cốt lõi của địa phương.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockMainFields.map((field) => (
              <div
                key={field.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-[#F7FAF8] border border-slate-100 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform duration-200 shadow-2xs">
                    {field.emoji}
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {field.title}
                    </h3>
                    <div className="text-xs font-bold text-[#00875a]">
                      {field.tagline}
                    </div>
                  </div>

                  <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                    "{field.description}"
                  </p>
                </div>

                <div className="pt-6">
                  <button
                    onClick={() => onNavigate('problems', field.id)}
                    className={`w-full py-2.5 px-4 rounded-xl text-white text-xs sm:text-[13px] font-bold shadow-2xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer ${field.btnColor}`}
                  >
                    <span>Khám phá bài toán</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 3. BÀI TOÁN NỔI BẬT                                */}
      {/* ================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-xs uppercase tracking-wide">
                <span>⭐ BÀI TOÁN NỔI BẬT</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Vấn Đề Thực Tế Cần Nguồn Lực
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Những vấn đề thực tế tại Bình Mỹ đang cần nguồn lực để cùng giải quyết.
              </p>
            </div>

            <button
              onClick={() => onNavigate('problems')}
              className="text-xs sm:text-[13px] font-bold text-[#00875a] hover:text-[#00734c] flex items-center gap-1 group cursor-pointer self-start sm:self-auto"
            >
              <span>Xem tất cả bài toán ({mockProblems.length})</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          {/* Grid 3 Featured Cards (Matching Prompt 6) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {featuredProblems.map((prob) => (
              <div
                key={prob.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  
                  {/* Top: Field Badge & Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                      <span>{prob.fieldEmoji}</span>
                      <span>{prob.fieldLabel}</span>
                    </span>

                    <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3 h-3 text-[#00875a]" />
                      <span>Đã xác minh</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectProblem(prob)}
                    className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#00875a] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {prob.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    "{prob.summary}"
                  </p>

                  {/* Location */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-[#00875a] flex-shrink-0" />
                    <span>{prob.location}</span>
                  </div>

                  {/* Resources Needed */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[11px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Cần nguồn lực:
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {prob.neededResources.map((res, idx) => (
                        <span
                          key={idx}
                          className="text-[11px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                        >
                          {res}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Bottom Action */}
                <div className="pt-5 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => onSelectProblem(prob)}
                    className="w-full text-xs font-bold text-[#00875a] hover:text-[#00734c] bg-emerald-50/80 hover:bg-emerald-100/80 py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 transition-colors cursor-pointer group/btn"
                  >
                    <span>XEM CHI TIẾT</span>
                    <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 4. THỐNG KÊ (MOCK DATA)                            */}
      {/* ================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#043827] to-[#014d35] rounded-3xl p-8 sm:p-10 text-white shadow-md relative overflow-hidden">
          
          {/* Background decorative circles */}
          <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-emerald-500/10 pointer-events-none" />

          <div className="relative z-10 space-y-6">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/15 pb-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Dữ liệu mô phỏng nền tảng
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  Thống Kê Hoạt Động Living Lab
                </h3>
              </div>
              <span className="text-[11px] text-white/70 italic bg-white/10 px-3 py-1 rounded-full self-start sm:self-auto">
                * Dữ liệu mock data minh họa giao diện
              </span>
            </div>

            {/* 4 Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              
              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-amber-300">
                  {mockLivingLabStats.verifiedProblems}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Bài toán được xác minh
                </div>
                <div className="text-[10px] text-white/60">
                  Đã thẩm định tính khả thi
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-sky-300">
                  {mockLivingLabStats.activeProjects}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Dự án đang triển khai
                </div>
                <div className="text-[10px] text-white/60">
                  Nhóm sinh viên &amp; chuyên gia
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-emerald-300">
                  {mockLivingLabStats.communityMembers}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Thành viên tham gia
                </div>
                <div className="text-[10px] text-white/60">
                  Sinh viên, giảng viên, nông dân
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-xs p-4 sm:p-5 rounded-2xl border border-white/10 space-y-1">
                <div className="text-3xl sm:text-4xl font-black text-teal-300">
                  0{mockLivingLabStats.testedProjects}
                </div>
                <div className="text-xs sm:text-sm font-bold text-white leading-snug">
                  Dự án đã thử nghiệm
                </div>
                <div className="text-[10px] text-white/60">
                  Có bằng chứng thực tế tại vườn
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 5. SƠ ĐỒ CHUỖI GIÁ TRỊ LIVING LAB                  */}
      {/* ================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 space-y-6 shadow-xs">
          
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              Quy trình khép kín
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Chuỗi Giá Trị Living Lab Bình Mỹ
            </h3>
            <p className="text-xs text-slate-500">
              Nguyên tắc vận hành xuyên suốt: Từ bài toán địa phương đến giải pháp nhân rộng.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { step: '01', title: 'BÀI TOÁN', desc: 'Thực tế từ dân & địa phương', color: 'border-emerald-200 bg-emerald-50/50' },
              { step: '02', title: 'KẾT NỐI', desc: 'Ban quản lý thẩm định nguồn lực', color: 'border-sky-200 bg-sky-50/50' },
              { step: '03', title: 'DỰ ÁN', desc: 'Hình thành nhóm đồng sáng tạo', color: 'border-purple-200 bg-purple-50/50' },
              { step: '04', title: 'THỬ NGHIỆM', desc: 'Thực địa trực tiếp tại Bình Mỹ', color: 'border-amber-200 bg-amber-50/50' },
              { step: '05', title: 'KẾT QUẢ', desc: 'Đo lường dữ liệu & tác động', color: 'border-teal-200 bg-teal-50/50' },
              { step: '06', title: 'NHÂN RỘNG', desc: 'Chuyển giao và mở rộng quy mô', color: 'border-rose-200 bg-rose-50/50' },
            ].map((st, idx) => (
              <div key={idx} className={`p-4 rounded-2xl border ${st.color} space-y-1 relative`}>
                <div className="text-[10px] font-black text-slate-400">BƯỚC {st.step}</div>
                <div className="text-xs sm:text-sm font-black text-slate-900 tracking-tight">{st.title}</div>
                <div className="text-[10.5px] text-slate-500 leading-tight">{st.desc}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================================================== */}
      {/* 6. CALL TO ACTION FOR LOCAL RESIDENTS              */}
      {/* ================================================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl border border-emerald-200 p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xs">
          
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              Dành cho hộ dân &amp; doanh nghiệp địa phương
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-slate-900">
              Bạn đang gặp vấn đề thực tế cần giải quyết tại Bình Mỹ?
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
              Hãy gửi mô tả bài toán cho Ban quản lý Làng SV. Đội ngũ chuyên gia và sinh viên sẽ trực tiếp khảo sát thực địa, thẩm định và kết nối nguồn lực cùng bạn xây dựng giải pháp.
            </p>
          </div>

          <button
            onClick={() => onNavigate('submit-problem')}
            className="bg-[#00875a] hover:bg-[#00734c] text-white px-6 py-3.5 rounded-2xl text-xs sm:text-sm font-bold shadow-sm whitespace-nowrap active:scale-95 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>GỬI ĐỀ XUẤT VẤN ĐỀ NGAY</span>
          </button>

        </div>
      </section>

    </div>
  );
};
