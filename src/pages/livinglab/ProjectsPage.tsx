import React, { useState, useMemo } from 'react';
import { 
  Search, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Users, 
  Layers, 
  TrendingUp, 
  Sparkles,
  FolderKanban,
  Award
} from 'lucide-react';
import { mockProjects } from '../../data/livingLabData';
import { ProjectItem, FieldKey } from '../../types/livingLab';

interface ProjectsPageProps {
  onSelectProject: (project: ProjectItem) => void;
}

export const ProjectsPage: React.FC<ProjectsPageProps> = ({ onSelectProject }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<FieldKey>('all');

  const featuredProject = mockProjects.find(p => p.isFeatured) || mockProjects[0];

  const filteredProjects = useMemo(() => {
    return mockProjects.filter((proj) => {
      const matchesSearch = 
        proj.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        proj.code.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesField = selectedField === 'all' || proj.field === selectedField;

      return matchesSearch && matchesField;
    });
  }, [searchTerm, selectedField]);

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* ===================== HERO HEADER ===================== */}
      <section className="bg-white border-b border-slate-200/90 pt-8 sm:pt-10 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00875a] text-xs font-bold border border-emerald-200">
            <FolderKanban className="w-3.5 h-3.5" />
            <span>DỰ ÁN ĐỒNG SÁNG TẠO LIVING LAB</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            DỰ ÁN TẠI BÌNH MỸ
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Những dự án đang được triển khai và đã tạo ra tác động thực tế cho cộng đồng, hộ sản xuất và đời sống tại Bình Mỹ.
          </p>

        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ===================== FEATURED PROJECT CARD (Matching Prompt 11) ===================== */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider text-amber-500">
            <Sparkles className="w-4 h-4" />
            <span>⭐ DỰ ÁN NỔI BẬT</span>
          </div>

          <div className="bg-white rounded-3xl border border-emerald-200 p-6 sm:p-9 shadow-md relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 group">
            
            <div className="space-y-4 max-w-2xl">
              
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 text-xs font-black px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
                  <span>{featuredProject.fieldEmoji}</span>
                  <span>{featuredProject.fieldLabel}</span>
                </span>

                <span className="inline-flex items-center gap-1 text-xs font-bold text-[#00875a] bg-emerald-100/60 px-3 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>✓ Đã thử nghiệm</span>
                </span>
              </div>

              <h2 
                onClick={() => onSelectProject(featuredProject)}
                className="text-2xl sm:text-3xl font-black text-slate-900 group-hover:text-[#00875a] transition-colors leading-tight cursor-pointer"
              >
                {featuredProject.title}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                "{featuredProject.summary}"
              </p>

              {/* Progress & Team members counter */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400">Thành viên tham gia</div>
                  <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <Users className="w-4 h-4 text-[#00875a]" />
                    <span>👥 {featuredProject.membersCount} thành viên</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">3 SV, 1 Chuyên gia, 1 Hộ dân</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="text-[11px] font-bold text-slate-400">Tiến độ dự án</div>
                  <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1.5 mt-0.5">
                    <TrendingUp className="w-4 h-4 text-emerald-600" />
                    <span>📊 {featuredProject.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1.5">
                    <div className="bg-[#00875a] h-full rounded-full" style={{ width: `${featuredProject.progressPercent}%` }} />
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 hidden sm:block">
                  <div className="text-[11px] font-bold text-slate-400">Thực địa thử nghiệm</div>
                  <div className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-1 mt-0.5">
                    <MapPin className="w-4 h-4 text-[#00875a]" />
                    <span className="truncate">{featuredProject.location.split(',')[0]}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">5 hộ nông dân tham gia</div>
                </div>

              </div>

            </div>

            {/* Right Action Box */}
            <div className="lg:w-72 w-full flex flex-col justify-center items-center p-6 bg-emerald-50/60 rounded-2xl border border-emerald-100 space-y-3 flex-shrink-0">
              <div className="w-12 h-12 rounded-full bg-[#00875a] text-white flex items-center justify-center shadow-xs">
                <Award className="w-6 h-6" />
              </div>
              <div className="text-center">
                <div className="text-xs font-bold text-slate-900">Bằng chứng thử nghiệm</div>
                <div className="text-[11px] text-slate-500 mt-0.5">Đã đo lường số liệu tác động trước &amp; sau</div>
              </div>
              <button
                onClick={() => onSelectProject(featuredProject)}
                className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-3 px-5 rounded-xl text-xs sm:text-sm font-black shadow-xs active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>XEM DỰ ÁN</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

        {/* ===================== SEARCH & FILTER BAR ===================== */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm dự án..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#00875a]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'agriculture', label: '🌱 Nông nghiệp' },
              { id: 'healthcare', label: '🏥 Y tế' },
              { id: 'tourism', label: '🏝️ Du lịch' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setSelectedField(f.id as FieldKey)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedField === f.id
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

        </div>

        {/* ===================== OTHER PROJECTS GRID ===================== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-3.5">
                
                {/* Field & Tested Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                    <span>{proj.fieldEmoji}</span>
                    <span>{proj.fieldLabel}</span>
                  </span>

                  <span className="inline-flex items-center gap-1 text-[10.5px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                    <CheckCircle2 className="w-3 h-3 text-[#00875a]" />
                    <span>{proj.statusLabel}</span>
                  </span>
                </div>

                {/* Title */}
                <h3
                  onClick={() => onSelectProject(proj)}
                  className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#00875a] transition-colors leading-snug cursor-pointer line-clamp-2"
                >
                  {proj.title}
                </h3>

                {/* Summary */}
                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                  "{proj.summary}"
                </p>

                {/* Location */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#00875a] flex-shrink-0" />
                  <span>{proj.location}</span>
                </div>

                {/* Progress bar */}
                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <div className="flex items-center justify-between text-[11px] font-bold">
                    <span className="text-slate-400">Tiến độ thực hiện</span>
                    <span className="text-[#00875a]">{proj.progressPercent}%</span>
                  </div>
                  <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-[#00875a] h-full rounded-full transition-all duration-500" 
                      style={{ width: `${proj.progressPercent}%` }} 
                    />
                  </div>
                </div>

                {/* Members snippet */}
                <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>{proj.membersCount} thành viên</span>
                  </span>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {proj.code}
                  </span>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-5 border-t border-slate-100 mt-4">
                <button
                  onClick={() => onSelectProject(proj)}
                  className="w-full text-xs font-bold text-[#00875a] hover:text-white bg-emerald-50 hover:bg-[#00875a] py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer group/btn"
                >
                  <span>Xem dự án</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

    </div>
  );
};
