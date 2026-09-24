import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockConsultingPackages, mockEconomicGroups, mockBrandFramework } from '../data/mockData';
import { 
  Lightbulb, 
  CheckCircle2, 
  ArrowRight, 
  ArrowDown,
  Layers, 
  ShieldCheck, 
  Send, 
  Sprout, 
  ShoppingBag, 
  Palmtree, 
  GraduationCap, 
  HelpCircle,
  FileCheck2,
  Sparkles,
  Megaphone,
  HeartHandshake,
  HeartPulse,
  Star,
  Award
} from 'lucide-react';

interface ConsultingPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const ConsultingPage: React.FC<ConsultingPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'core' | 'economic' | 'brand'>('core');
  const [selectedBranchId, setSelectedBranchId] = useState<string | null>(null);

  const renderGroupIcon = (name: string) => {
    if (name.includes('Nông nghiệp')) return <Sprout className="w-5 h-5 text-emerald-600" />;
    if (name.includes('Sản phẩm')) return <ShoppingBag className="w-5 h-5 text-amber-500" />;
    if (name.includes('Du lịch')) return <Palmtree className="w-5 h-5 text-sky-600" />;
    return <GraduationCap className="w-5 h-5 text-purple-600" />;
  };

  const renderPillarIcon = (iconName: string) => {
    if (iconName === 'HeartPulse') return <HeartPulse className="w-5 h-5 text-emerald-600" />;
    if (iconName === 'Sparkles') return <Sparkles className="w-5 h-5 text-amber-500" />;
    return <Palmtree className="w-5 h-5 text-sky-600" />;
  };

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 text-amber-800 text-xs font-bold tracking-wide uppercase">
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Chuyên Gia & Giải Pháp Toàn Diện</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Trung Tâm Tư Vấn & Phát Triển Dự Án
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Đồng hành cùng địa phương, bệnh viện và doanh nghiệp tư vấn khả thi, thiết kế mô hình hoạt động và chuyển giao 3 dự án y tế trụ cột cùng 12 mô hình kinh tế phụ trợ bền vững.
          </p>
        </div>

        {/* 5.3. QUY TRÌNH TIẾP NHẬN DỰ ÁN 6 BƯỚC */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Quy Trình Chuẩn Hóa</span>
            <h2 className="text-2xl font-bold mt-1 text-slate-900">Lộ Trình Tiếp Nhận & Triển Khai 6 Giai Đoạn</h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {[
              { step: '01', name: 'Gửi nhu cầu', desc: 'Tiếp nhận thông tin & hiện trạng ban đầu' },
              { step: '02', name: 'Khảo sát thực địa', desc: 'Đánh giá địa bàn, tài nguyên & đối tượng' },
              { step: '03', name: 'Thiết kế mô hình', desc: 'Quy hoạch chức năng, tài chính & dịch vụ' },
              { step: '04', name: 'Thí điểm Lab', desc: 'Chạy thử nghiệm trên quy mô thu nhỏ' },
              { step: '05', name: 'Đánh giá tác động', desc: 'Đo lường hiệu quả y tế & kinh tế' },
              { step: '06', name: 'Nhân rộng quy mô', desc: 'Chuyển giao và vận hành bền vững' },
            ].map((st, idx) => (
              <div
                key={idx}
                className="bg-amber-50/40 hover:bg-amber-50 rounded-2xl p-4 border border-amber-200/60 transition-all flex flex-col justify-between text-center group"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white font-black text-xs flex items-center justify-center mx-auto mb-2 shadow-xs group-hover:scale-110 transition-transform">
                    {st.step}
                  </div>
                  <h4 className="font-bold text-xs text-slate-800">{st.name}</h4>
                  <p className="text-[11px] text-slate-500 mt-1 leading-snug">{st.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => onOpenCollaboration('consulting', 'Gửi yêu cầu tư vấn theo quy trình')}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-amber-500/25 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Gửi yêu cầu tư vấn ngay</span>
            </button>
          </div>
        </div>

        {/* 5.1 & 5.2 TABS: BA DỰ ÁN TRỤ CỘT vs 12 MÔ HÌNH KINH TẾ PHỤ TRỢ vs CHIẾN LƯỢC THƯƠNG HIỆU */}
        <div>
          <div className="max-w-5xl lg:max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8">
            <button
              onClick={() => setActiveTab('core')}
              className={`w-full py-3.5 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col xl:flex-row items-center justify-center min-h-[58px] ${
                activeTab === 'core'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 shadow-2xs'
              }`}
            >
              <span className="leading-snug">Tư vấn 3 Dự Án Y Tế Trụ Cột</span>
              <span className="whitespace-nowrap text-[11px] sm:text-xs xl:text-sm font-medium xl:font-bold opacity-90 xl:opacity-100 xl:ml-1 mt-0.5 xl:mt-0">
                (10 Gói Dịch Vụ)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('economic')}
              className={`w-full py-3.5 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col xl:flex-row items-center justify-center min-h-[58px] ${
                activeTab === 'economic'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 shadow-2xs'
              }`}
            >
              <span className="leading-snug">Tư vấn 12 Mô Hình Kinh Tế Phụ Trợ</span>
              <span className="whitespace-nowrap text-[11px] sm:text-xs xl:text-sm font-medium xl:font-bold opacity-90 xl:opacity-100 xl:ml-1 mt-0.5 xl:mt-0">
                (4 Nhóm)
              </span>
            </button>
            <button
              onClick={() => setActiveTab('brand')}
              className={`w-full py-3.5 px-3 sm:px-4 rounded-2xl text-xs sm:text-sm font-bold transition-all text-center flex flex-col xl:flex-row items-center justify-center min-h-[58px] ${
                activeTab === 'brand'
                  ? 'bg-amber-500 text-white shadow-md shadow-amber-500/25 ring-2 ring-amber-500/20'
                  : 'bg-white text-slate-700 hover:bg-amber-50 hover:text-amber-900 border border-slate-200 shadow-2xs'
              }`}
            >
              <span className="leading-snug">Chiến lược thương hiệu</span>
              <span className="whitespace-nowrap text-[11px] sm:text-xs xl:text-sm font-medium xl:font-bold opacity-90 xl:opacity-100 xl:ml-1 mt-0.5 xl:mt-0">
                (3 Nhánh)
              </span>
            </button>
          </div>

          {/* TAB 1: 3 CORE HEALTHCARE PROJECTS & 10 PACKAGES */}
          {activeTab === 'core' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* 3 Core Projects */}
              <div className="lg:col-span-5 space-y-4">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  3 Dự Án Y Tế Trọng Điểm Tiếp Nhận Tư Vấn
                </h3>
                {[
                  {
                    title: '1. Trung tâm Y tế cộng đồng & Living Lab',
                    desc: 'Thiết kế hệ thống sàng lọc ban đầu, trạm y tế số, phòng telehealth và khu thử nghiệm lâm sàng mở.',
                  },
                  {
                    title: '2. Trung tâm Chăm sóc người cao tuổi',
                    desc: 'Quy hoạch khu bán trú Daycare, phòng phục hồi chức năng, vườn trị liệu dưỡng sinh và chuyển giao quy trình lão khoa.',
                  },
                  {
                    title: '3. Trung tâm Health and Wellness Farm',
                    desc: 'Phát triển mô hình Farmstay trị liệu, detox dinh dưỡng, yoga/thiền và thương mại hóa sản phẩm thảo dược OCOP.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs hover:border-amber-300 transition-colors">
                    <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                    <button
                      onClick={() => onOpenCollaboration('consulting', item.title)}
                      className="mt-3 text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1"
                    >
                      <span>Yêu cầu gói tư vấn</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* 10 Consulting Packages */}
              <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-bold text-amber-600 uppercase">Danh mục dịch vụ</span>
                  <h3 className="text-lg font-bold text-slate-900">10 Gói Tư Vấn Chuyên Sâu Từng Hạng Mục</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                  {mockConsultingPackages.map((pkg, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-slate-50 hover:bg-amber-50/50 border border-slate-100 hover:border-amber-200 transition-colors flex items-start gap-2.5 text-xs text-slate-700"
                    >
                      <FileCheck2 className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                      <span className="font-medium leading-snug">{pkg}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Cần tư vấn gói tùy biến riêng biệt?</span>
                  <button
                    onClick={() => onOpenCollaboration('consulting', 'Gói tư vấn tùy chỉnh')}
                    className="text-xs font-bold text-amber-600 hover:underline"
                  >
                    Liên hệ chuyên gia
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: 12 ECONOMIC MODELS IN 4 GROUPS */}
          {activeTab === 'economic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockEconomicGroups.map((grp, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all"
                >
                  <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center">
                      {renderGroupIcon(grp.groupName)}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">
                      {grp.groupName}
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {grp.models.map((m, mIdx) => (
                      <div key={mIdx} className="bg-slate-50/70 p-4 rounded-2xl border border-slate-100/80">
                        <h4 className="font-bold text-xs text-slate-800 flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500" />
                          <span>{m.title}</span>
                        </h4>
                        <p className="text-xs text-slate-600 mt-1.5 leading-relaxed pl-5.5">
                          {m.description}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => onOpenCollaboration('consulting', grp.groupName)}
                      className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                    >
                      <span>Tư vấn phát triển nhóm mô hình này</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: CHIẾN LƯỢC THƯƠNG HIỆU */}
          {activeTab === 'brand' && (
            <div className="space-y-10 animate-fade-in">
              {/* SƠ ĐỒ TRỰC QUAN: MÔ HÌNH CHIẾN LƯỢC THƯƠNG HIỆU */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
                <div className="text-center max-w-3xl mx-auto mb-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    Sơ Đồ Cấu Trúc Chiến Lược Thương Hiệu
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 tracking-tight">
                    Hệ Thống Chuyển Hóa & Sản Phẩm Trải Nghiệm Bình Mỹ
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed font-medium">
                    Từ 3 trụ cột phát triển ban đầu, chuyển hóa thành 3 không gian trải nghiệm bản địa đặc sắc và cùng hội tụ kiến tạo nên Hệ sinh thái Sản phẩm trải nghiệm Bình Mỹ độc bản.
                  </p>
                </div>

                {/* DIAGRAM FLOW */}
                <div className="max-w-5xl mx-auto">
                  {/* TOP ROW: 3 TRỤ CỘT & MIDDLE ROW: 3 KHÔNG GIAN TRẢI NGHIỆM */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
                    {mockBrandFramework.branches.map((b) => (
                      <div 
                        key={b.id} 
                        onClick={() => setSelectedBranchId(b.id === selectedBranchId ? null : b.id)}
                        className={`flex flex-col items-center cursor-pointer transition-all duration-300 ${
                          selectedBranchId && selectedBranchId !== b.id ? 'opacity-50 scale-98' : 'opacity-100 scale-100'
                        }`}
                      >
                        {/* Box 1: Trụ cột (Top level) */}
                        <div className="w-full text-center p-4 sm:p-5 rounded-2xl bg-white border-2 border-slate-200 shadow-xs hover:border-amber-400 hover:shadow-md transition-all group">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 text-slate-700 mx-auto mb-2.5 flex items-center justify-center group-hover:scale-110 transition-transform">
                            {renderPillarIcon(b.pillarIcon)}
                          </div>
                          <h3 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                            {b.pillar}
                          </h3>
                          <span className="text-[11px] font-semibold text-slate-400 mt-0.5 block">
                            Trụ cột cốt lõi
                          </span>
                        </div>

                        {/* Downward Connector Arrow */}
                        <div className="flex flex-col items-center py-3 text-slate-400">
                          <div className="w-0.5 h-6 bg-amber-200" />
                          <ArrowDown className="w-4 h-4 text-amber-500 -mt-1 animate-bounce" />
                        </div>

                        {/* Box 2: Không gian trải nghiệm (Middle level) */}
                        <div className={`w-full text-center p-4 sm:p-5 rounded-2xl ${b.bgLight} border-2 ${b.borderLight} shadow-xs hover:shadow-md hover:border-amber-400 transition-all`}>
                          <span className={`inline-block text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full mb-1.5 ${b.badgeColor}`}>
                            Không gian trải nghiệm
                          </span>
                          <h4 className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                            {b.experience}
                          </h4>
                          <p className="text-[11px] text-slate-600 mt-1.5 leading-snug line-clamp-2">
                            {b.experienceDesc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* CONVERGING CONNECTOR LINES TO BOTTOM BOX */}
                  <div className="relative py-6">
                    {/* Desktop Converging Tree Line */}
                    <div className="hidden md:block">
                      <div className="h-6 border-b-2 border-l-2 border-r-2 border-amber-300 rounded-b-3xl mx-auto w-[68%]" />
                      <div className="w-0.5 h-6 bg-amber-400 mx-auto" />
                      <div className="flex justify-center -mt-1">
                        <ArrowDown className="w-5 h-5 text-amber-500 animate-bounce" />
                      </div>
                    </div>
                    {/* Mobile Arrow */}
                    <div className="md:hidden flex flex-col items-center">
                      <div className="w-0.5 h-6 bg-amber-300" />
                      <ArrowDown className="w-5 h-5 text-amber-500 animate-bounce" />
                    </div>
                  </div>

                  {/* BOTTOM ROW: SẢN PHẨM TRẢI NGHIỆM BÌNH MỸ */}
                  <div className="max-w-2xl mx-auto">
                    <div 
                      onClick={() => setSelectedBranchId(selectedBranchId === 'target' ? null : 'target')}
                      className="text-center p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white shadow-xl shadow-amber-500/20 border-2 border-amber-300 hover:scale-[1.01] transition-transform cursor-pointer relative overflow-hidden"
                    >
                      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xs text-amber-100 text-[11px] font-black uppercase tracking-wider mb-2">
                        <Star className="w-3.5 h-3.5 text-amber-200 fill-amber-200" />
                        <span>Điểm Hội Tụ Giá Trị Thương Hiệu</span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                        {mockBrandFramework.targetProduct.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-amber-100 mt-2 font-medium max-w-xl mx-auto leading-relaxed">
                        {mockBrandFramework.targetProduct.description}
                      </p>
                      <div className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-amber-200 hover:text-white transition-colors">
                        <span>Nhấp để xem chi tiết danh mục sản phẩm trải nghiệm</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* CHI TIẾT 3 NHÁNH CHUYỂN HÓA GIÁ TRỊ */}
              <div className="space-y-6">
                <div className="text-center max-w-2xl mx-auto">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Hạng Mục Chuyên Sâu</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-1">
                    3 Nhánh Vận Hành & Không Gian Trải Nghiệm Bản Địa
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {mockBrandFramework.branches.map((b) => (
                    <div
                      key={b.id}
                      className={`bg-white rounded-3xl p-6 border-2 transition-all flex flex-col justify-between ${
                        selectedBranchId === b.id 
                          ? 'border-amber-500 ring-2 ring-amber-500/20 shadow-lg' 
                          : 'border-slate-200/80 hover:border-amber-300 shadow-xs'
                      }`}
                    >
                      <div>
                        {/* Header Badge */}
                        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-slate-100">
                          <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                            {renderPillarIcon(b.pillarIcon)}
                          </div>
                          <div>
                            <div className="text-[11px] font-semibold text-slate-500">
                              Trụ cột: <span className="text-slate-800 font-bold">{b.pillar}</span>
                            </div>
                            <h4 className="text-base font-extrabold text-slate-900">
                              {b.experience}
                            </h4>
                          </div>
                        </div>

                        {/* Orientation description */}
                        <p className="text-xs text-slate-600 leading-relaxed font-medium mb-4">
                          {b.experienceDesc}
                        </p>

                        {/* Items list */}
                        <div className="space-y-2.5">
                          {b.items.map((item, iIdx) => (
                            <div key={iIdx} className="p-3 rounded-xl bg-slate-50/80 border border-slate-100 flex items-start gap-2.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                              <span className="leading-snug">{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <div className="pt-4 mt-6 border-t border-slate-100">
                        <button
                          onClick={() => onOpenCollaboration('consulting', `${b.pillar} ➔ ${b.experience}`)}
                          className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-500 text-amber-800 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                        >
                          <span>Tư vấn phát triển nhánh này</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* CHI TIẾT ĐIỂM HỘI TỤ: SẢN PHẨM TRẢI NGHIỆM BÌNH MỸ */}
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xs">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 mb-8 border-b border-slate-100">
                  <div>
                    <span className="text-xs font-extrabold uppercase tracking-widest text-amber-600">Điểm Hội Tụ Thương Hiệu</span>
                    <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
                      Hệ Sinh Thái Sản Phẩm Trải Nghiệm Bình Mỹ
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1.5 font-medium">
                      4 nhóm sản phẩm – dịch vụ đặc trưng kết tinh từ Y tế xanh, Văn hóa sáng tạo và Nông nghiệp sinh thái.
                    </p>
                  </div>
                  <button
                    onClick={() => onOpenCollaboration('consulting', 'Hệ sinh thái Sản phẩm trải nghiệm Bình Mỹ')}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-sm shadow-amber-500/25 active:scale-95 transition-all self-start md:self-auto cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Đăng ký hợp tác phát triển sản phẩm</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockBrandFramework.targetProduct.offerings.map((pkg, idx) => (
                    <div 
                      key={idx}
                      className="p-5 rounded-2xl bg-slate-50/70 hover:bg-amber-50/40 border border-slate-200/80 hover:border-amber-300 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800">
                            {pkg.badge}
                          </span>
                          <span className="text-xs font-black text-amber-600">0{idx + 1}</span>
                        </div>
                        <h4 className="text-sm font-bold text-slate-900">
                          {pkg.title}
                        </h4>
                        <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                          {pkg.desc}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between">
                        <button
                          onClick={() => onOpenCollaboration('consulting', pkg.title)}
                          className="text-xs font-bold text-amber-600 hover:text-amber-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Yêu cầu gói dịch vụ</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* BOTTOM CUSTOM CONSULTATION BANNER */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-bold text-sm sm:text-base text-slate-900">Cần tư vấn chiến lược thương hiệu may đo riêng?</h4>
                  <p className="text-xs text-slate-500 mt-1">Đội ngũ chuyên gia thương hiệu & truyền thông của chúng tôi sẵn sàng đồng hành khảo sát, xây dựng bản đồ định vị và chuyển giao quy trình thực chiến.</p>
                </div>
                <button
                  onClick={() => onOpenCollaboration('consulting', 'Tư vấn chiến lược thương hiệu Sản phẩm trải nghiệm Bình Mỹ')}
                  className="px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs whitespace-nowrap shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer shrink-0"
                >
                  Liên hệ chuyên gia thương hiệu
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
