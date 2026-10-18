import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDataService } from '../services/adminDataService';
import { 
  AboutIntroConfig, 
  ExpertDomain, 
  TeamMember, 
  TeamRole 
} from '../types';
import {
  Users,
  Sparkles,
  ArrowRight,
  ChevronRight,
  Laptop,
  Sprout,
  Compass,
  BookOpen,
  TrendingUp,
  HeartPulse,
  Briefcase,
  Shield,
  GraduationCap,
  Building2,
  ExternalLink,
  X,
  Mail,
  Phone,
  Globe,
  Filter,
  CheckCircle2,
  ArrowLeft
} from 'lucide-react';

const DOMAIN_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Laptop,
  Sprout,
  Compass,
  BookOpen,
  TrendingUp,
  HeartPulse,
  Briefcase,
  Shield
};

interface AboutPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCollaboration, onNavigate }) => {
  const { language } = useLanguage();

  // Real-time state from AdminDataService
  const [intro, setIntro] = useState<AboutIntroConfig>(AdminDataService.getAboutIntro());
  const [domains, setDomains] = useState<ExpertDomain[]>(AdminDataService.getExpertDomains());
  const [members, setMembers] = useState<TeamMember[]>(AdminDataService.getTeamMembers());

  // Navigation / Filter states
  // 'overview' = standard design view matching screenshot
  // or a domain slug string = dedicated view of that specific domain
  // 'all-executive' | 'all-management' | 'all-student' | 'all-experts'
  const [selectedView, setSelectedView] = useState<string>('overview');
  const [activeDomainFilter, setActiveDomainFilter] = useState<string>('all');

  // Modal inspection for individual member
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Subscribe to Admin updates
  useEffect(() => {
    const refreshData = () => {
      setIntro(AdminDataService.getAboutIntro());
      setDomains(AdminDataService.getExpertDomains());
      setMembers(AdminDataService.getTeamMembers());
    };
    refreshData();
    const unsubscribe = AdminDataService.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  // Filter only active members for public display, sorted by order
  const activeMembers = members
    .filter(m => m.status === 'active')
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  const executiveMembers = activeMembers.filter(m => m.group === 'executive');
  const managementMembers = activeMembers.filter(m => m.group === 'management');
  const studentMembers = activeMembers.filter(m => m.group === 'student');
  const expertMembers = activeMembers.filter(m => m.group === 'expert');

  // Active domains sorted by order
  const activeDomains = domains
    .filter(d => d.isActive !== false && d.status !== 'hidden')
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));

  return (
    <div className="w-full bg-[#fbfdfc] min-h-screen text-slate-800 font-sans pb-16">
      
      {/* ================= HERO HEADER BANNER ================= */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#eaf6f0] via-[#f4faf7] to-[#fbfdfc] pt-10 pb-12 lg:pt-14 lg:pb-16 border-b border-emerald-100/60">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100/80 text-emerald-800 text-xs font-black uppercase tracking-wider">
                <Sprout className="w-4 h-4 text-emerald-600" />
                <span>{intro.badge || intro.badgeVi || 'VỀ CHÚNG TÔI'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight leading-tight">
                {intro.title || intro.titleVi || 'Đội ngũ và Chuyên gia cho Bình Mỹ'}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed text-justify max-w-2xl">
                {intro.description || intro.descVi || ''}
              </p>

              <div className="pt-2 flex items-center gap-2 text-emerald-800 font-bold text-sm sm:text-base">
                <Sprout className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="italic">{intro.slogan || intro.sloganVi || ''}</span>
              </div>
            </div>

            {/* Right Banner Image with Handwritten Note */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/11] bg-slate-100">
                <img
                  src={intro.bannerImage}
                  alt={intro.title || intro.titleVi || 'Banner'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                
                {/* Soft gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent pointer-events-none" />

                {/* Handwritten Callout in top-right */}
                {(intro.handwrittenNote || intro.calloutVi) && (
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-4 py-3 rounded-2xl shadow-lg border border-white/60">
                    <p className="text-xs sm:text-sm font-black text-emerald-800 whitespace-pre-line text-right leading-snug font-serif italic">
                      {intro.handwrittenNote || intro.calloutVi}
                    </p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= BREADCRUMB / VIEW SELECTOR BAR ================= */}
      {selectedView !== 'overview' && (
        <section className="bg-white border-b border-slate-200 py-3 shadow-2xs sticky top-16 z-20">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            <button
              onClick={() => {
                setSelectedView('overview');
                setActiveDomainFilter('all');
              }}
              className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Quay lại trang tổng quan Đội ngũ</span>
            </button>

            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              {selectedView.startsWith('domain-')
                ? `Chuyên ngành: ${domains.find(d => d.slug === selectedView.replace('domain-', ''))?.name || 'Tất cả'}`
                : selectedView === 'all-executive'
                ? 'Danh sách Toàn bộ Ban Điều Hành'
                : selectedView === 'all-management'
                ? 'Danh sách Toàn bộ Đội Ngũ Quản Lý'
                : selectedView === 'all-student'
                ? 'Danh sách Toàn bộ Đội Ngũ Sinh Viên'
                : 'Danh sách Toàn bộ Chuyên Gia'}
            </span>
          </div>
        </section>
      )}

      {/* ================= VIEW: OVERVIEW (MATCHES SCREENSHOT) ================= */}
      {selectedView === 'overview' && (
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-12">
          
          {/* ================= 1. BAN ĐIỀU HÀNH ================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Users className="w-5 h-5 text-emerald-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Ban điều hành
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Là những người chịu trách nhiệm định hướng, kết nối và vận hành hoạt động của Làng SV Đổi mới sáng tạo Bình Mỹ.
                  </p>
                </div>
              </div>

              {executiveMembers.length > 4 && (
                <button
                  onClick={() => setSelectedView('all-executive')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-center group transition-colors"
                >
                  <span>Xem tất cả thành viên</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Horizontal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {executiveMembers.slice(0, 4).map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-500/40 flex items-center gap-3.5 group"
                >
                  <div className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-xs font-bold text-emerald-700 truncate mt-0.5">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-[11px] text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 2. ĐỘI NGŨ QUẢN LÝ ================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-teal-100/70 text-teal-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Briefcase className="w-5 h-5 text-teal-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Đội ngũ quản lý
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Phụ trách vận hành, quản lý các hoạt động chuyên môn và đảm bảo tiến độ dự án.
                  </p>
                </div>
              </div>

              {managementMembers.length > 5 && (
                <button
                  onClick={() => setSelectedView('all-management')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-center group transition-colors"
                >
                  <span>Xem tất cả thành viên</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Horizontal Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {managementMembers.slice(0, 5).map((member) => (
                <div
                  key={member.id}
                  onClick={() => setSelectedMember(member)}
                  className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-500/40 flex items-center gap-3 group"
                >
                  <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-[11px] font-bold text-emerald-700 truncate mt-0.5">
                      {member.role}
                    </p>
                    {member.bio && (
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2 leading-tight">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 3. ĐỘI NGŨ SINH VIÊN ================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-100/70 text-purple-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5 text-purple-700" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Đội ngũ sinh viên
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Những sinh viên nhiệt huyết, năng động và giàu ý tưởng, đến từ nhiều chuyên ngành khác nhau.
                  </p>
                </div>
              </div>

              {studentMembers.length > 6 && (
                <button
                  onClick={() => setSelectedView('all-student')}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-center group transition-colors"
                >
                  <span>Xem tất cả thành viên</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              )}
            </div>

            {/* Vertical Student Cards Grid (6 columns) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
              {studentMembers.slice(0, 6).map((student) => (
                <div
                  key={student.id}
                  onClick={() => setSelectedMember(student)}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-2xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-500/40 flex flex-col group"
                >
                  <div className="aspect-[4/3] bg-slate-100 overflow-hidden relative">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                      }}
                    />
                  </div>

                  <div className="p-3.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                        {student.name}
                      </h3>
                      {student.major && (
                        <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5">
                          {student.major}
                        </p>
                      )}
                    </div>
                    {student.role && (
                      <p className="text-[10px] text-emerald-800 font-semibold truncate mt-2 bg-emerald-50 px-2 py-0.5 rounded-md self-start">
                        {student.role}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ================= 4. ĐỘI NGŨ CHUYÊN GIA THEO NGÀNH ================= */}
          <section className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-100/70 text-amber-800 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                    Đội ngũ chuyên gia theo ngành
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                    Các chuyên gia giàu kinh nghiệm, sẵn sàng đồng hành và hỗ trợ dự án của Làng SV Đổi mới sáng tạo Bình Mỹ.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedView('all-experts')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 self-start sm:self-center group transition-colors"
              >
                <span>Xem tất cả chuyên gia</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>

            {/* List of 6 Domain Rows */}
            <div className="space-y-4">
              {activeDomains.map((domain) => {
                const IconComp = DOMAIN_ICONS[domain.icon] || Sparkles;
                const domainExperts = expertMembers.filter(m => m.domainId === domain.id);

                return (
                  <div
                    key={domain.id}
                    className="bg-white rounded-3xl border border-slate-200/90 p-4 sm:p-5 shadow-2xs hover:shadow-sm transition-all flex flex-col lg:flex-row items-stretch lg:items-center gap-6"
                  >
                    {/* Domain Left Column */}
                    <div className="lg:w-1/4 flex-shrink-0 flex items-start gap-3.5 border-b lg:border-b-0 lg:border-r border-slate-100 pb-4 lg:pb-0 lg:pr-4">
                      <div className="w-12 h-12 rounded-2xl bg-[#005e46] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
                        <IconComp className="w-6 h-6 text-emerald-300" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-slate-900 leading-snug">
                          {domain.name}
                        </h3>
                        <p className="text-[11px] text-slate-500 leading-relaxed mt-1 line-clamp-2">
                          {domain.description}
                        </p>
                        <button
                          onClick={() => setSelectedView(`domain-${domain.slug}`)}
                          className="mt-2 text-[11px] font-bold text-emerald-700 hover:text-emerald-800 inline-flex items-center gap-1 group"
                        >
                          <span>Xem tất cả {domainExperts.length} chuyên gia</span>
                          <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      </div>
                    </div>

                    {/* Domain Right Cards: 4 expert cards */}
                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
                      {domainExperts.slice(0, 4).map((expert) => (
                        <div
                          key={expert.id}
                          onClick={() => setSelectedMember(expert)}
                          className="bg-slate-50/70 hover:bg-emerald-50/40 rounded-2xl p-2.5 border border-slate-200/60 hover:border-emerald-300 transition-all cursor-pointer flex items-center gap-3 group"
                        >
                          <div className="w-11 h-11 rounded-full overflow-hidden bg-white border border-slate-200 flex-shrink-0 shadow-2xs group-hover:scale-105 transition-transform">
                            <img
                              src={expert.avatar}
                              alt={expert.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                              }}
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs font-bold text-slate-900 truncate group-hover:text-emerald-700 transition-colors">
                              {expert.name}
                            </h4>
                            <p className="text-[11px] text-slate-500 truncate mt-0.5 font-medium">
                              {expert.role}
                            </p>
                          </div>
                        </div>
                      ))}

                      {domainExperts.length === 0 && (
                        <div className="col-span-full py-4 text-center text-xs text-slate-400 italic">
                          Chưa có chuyên gia nào được gán vào lĩnh vực này.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* ================= 5. BOTTOM CTA BANNER ================= */}
          <section className="rounded-3xl bg-[#004d3d] text-white p-8 sm:p-10 shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-teal-400/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="flex items-start gap-5 max-w-2xl">
                <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 text-emerald-300 flex items-center justify-center flex-shrink-0 hidden sm:flex">
                  <Sprout className="w-6 h-6 text-emerald-300" />
                </div>
                <div className="space-y-2 text-center sm:text-left">
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                    {intro.ctaTitle || 'Bạn là sinh viên, chuyên gia, doanh nghiệp?'}
                  </h2>
                  <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-light">
                    {intro.ctaDescription ||
                      'Hãy cùng Làng SV Đổi mới sáng tạo Bình Mỹ tạo nên những giá trị thiết thực cho cộng đồng. Tham gia đội ngũ của chúng tôi ngay hôm nay!'}
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 flex-shrink-0 w-full sm:w-auto">
                <button
                  onClick={() => onOpenCollaboration('student', 'Đăng ký tham gia đội ngũ sinh viên')}
                  className="px-6 py-3 rounded-full bg-white text-[#004d3d] hover:bg-emerald-50 text-xs sm:text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>{intro.ctaPrimaryButtonText || 'Tham gia đội ngũ'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => onOpenCollaboration('expert', 'Đăng ký tham gia mạng lưới chuyên gia')}
                  className="px-6 py-3 rounded-full bg-[#00382c] border border-emerald-400/30 text-white hover:bg-[#002f25] text-xs sm:text-sm font-bold transition-all active:scale-95 flex items-center gap-2"
                >
                  <span>{intro.ctaSecondaryButtonText || 'Đăng ký làm chuyên gia'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </section>

        </div>
      )}

      {/* ================= VIEW: DEDICATED DOMAIN VIEW OR ALL MEMBERS ================= */}
      {selectedView !== 'overview' && (
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
          
          {/* Domain Filter Pills if viewing experts */}
          {(selectedView === 'all-experts' || selectedView.startsWith('domain-')) && (
            <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
              <button
                onClick={() => {
                  setSelectedView('all-experts');
                  setActiveDomainFilter('all');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeDomainFilter === 'all' && selectedView === 'all-experts'
                    ? 'bg-emerald-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                Tất cả các ngành ({expertMembers.length})
              </button>

              {activeDomains.map((dom) => {
                const count = expertMembers.filter(m => m.domainId === dom.id).length;
                const isSelected = selectedView === `domain-${dom.slug}` || activeDomainFilter === dom.id;
                return (
                  <button
                    key={dom.id}
                    onClick={() => {
                      setSelectedView(`domain-${dom.slug}`);
                      setActiveDomainFilter(dom.id);
                    }}
                    className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    {dom.name} ({count})
                  </button>
                );
              })}
            </div>
          )}

          {/* Members Grid in Dedicated View */}
          {(() => {
            let displayedMembers: TeamMember[] = [];
            if (selectedView === 'all-executive') {
              displayedMembers = executiveMembers;
            } else if (selectedView === 'all-management') {
              displayedMembers = managementMembers;
            } else if (selectedView === 'all-student') {
              displayedMembers = studentMembers;
            } else if (selectedView === 'all-experts') {
              displayedMembers = expertMembers;
            } else if (selectedView.startsWith('domain-')) {
              const currentSlug = selectedView.replace('domain-', '');
              const matchedDom = domains.find(d => d.slug === currentSlug);
              displayedMembers = matchedDom
                ? expertMembers.filter(m => m.domainId === matchedDom.id)
                : expertMembers;
            }

            if (displayedMembers.length === 0) {
              return (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center max-w-lg mx-auto">
                  <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <h3 className="text-base font-bold text-slate-700">Chưa có thành viên nào trong mục này</h3>
                  <p className="text-xs text-slate-500 mt-1">Dữ liệu có thể được cập nhật từ Admin bất cứ lúc nào.</p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {displayedMembers.map((member) => (
                  <div
                    key={member.id}
                    onClick={() => setSelectedMember(member)}
                    className="bg-white rounded-2xl border border-slate-200/90 p-4 shadow-2xs hover:shadow-md transition-all cursor-pointer hover:border-emerald-500/40 flex flex-col justify-between group"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-2xs group-hover:scale-105 transition-transform duration-300">
                        <img
                          src={member.avatar}
                          alt={member.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors truncate">
                          {member.name}
                        </h4>
                        <p className="text-xs font-bold text-emerald-700 truncate mt-0.5">
                          {member.role}
                        </p>
                        {member.domainName && (
                          <p className="text-[11px] text-slate-500 truncate mt-0.5">
                            {member.domainName}
                          </p>
                        )}
                        {member.major && (
                          <p className="text-[11px] text-purple-700 truncate mt-0.5 font-medium">
                            {member.major}
                          </p>
                        )}
                      </div>
                    </div>

                    {member.bio && (
                      <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50 p-2.5 rounded-xl">
                        {member.bio}
                      </p>
                    )}

                    <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-emerald-700 font-bold">
                      <span>Xem hồ sơ chi tiết</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            );
          })()}

        </div>
      )}

      {/* ================= MODAL: MEMBER DETAIL INSPECTION ================= */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 sm:p-8 shadow-2xl relative space-y-6 my-8 animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Profile Header */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl overflow-hidden bg-slate-100 border-2 border-emerald-500/30 shadow-md flex-shrink-0">
                <img
                  src={selectedMember.avatar}
                  alt={selectedMember.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                  }}
                />
              </div>

              <div className="space-y-1.5 flex-1 min-w-0">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  {selectedMember.group === 'executive'
                    ? 'Ban điều hành'
                    : selectedMember.group === 'management'
                    ? 'Đội ngũ quản lý'
                    : selectedMember.group === 'student'
                    ? 'Đội ngũ sinh viên'
                    : 'Chuyên gia tư vấn'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                  {selectedMember.name}
                </h3>
                <p className="text-sm font-bold text-emerald-700">
                  {selectedMember.role}
                </p>
                {selectedMember.domainName && (
                  <p className="text-xs font-medium text-slate-500">
                    Lĩnh vực: <strong>{selectedMember.domainName}</strong>
                  </p>
                )}
                {selectedMember.organization && (
                  <p className="text-xs text-slate-500 flex items-center justify-center sm:justify-start gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedMember.organization}</span>
                  </p>
                )}
              </div>
            </div>

            {/* Bio Details */}
            {selectedMember.bio && (
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 space-y-1.5">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Giới thiệu & Phạm vi trách nhiệm
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {selectedMember.bio}
                </p>
              </div>
            )}

            {/* Major & Skills */}
            {selectedMember.major && (
              <div className="text-xs text-slate-600">
                <span className="font-bold text-slate-700">Chuyên ngành đào tạo:</span> {selectedMember.major}
              </div>
            )}

            {/* Contact / Collaboration Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-100">
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                {selectedMember.email && (
                  <span className="flex items-center gap-1 text-slate-600">
                    <Mail className="w-3.5 h-3.5" />
                    <span>{selectedMember.email}</span>
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedMember(null);
                    onOpenCollaboration(
                      selectedMember.group === 'expert' ? 'expert' : 'general',
                      `Đề xuất kết nối với ${selectedMember.name} (${selectedMember.role})`
                    );
                  }}
                  className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-1.5"
                >
                  <span>Đề xuất kết nối & Hợp tác</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
