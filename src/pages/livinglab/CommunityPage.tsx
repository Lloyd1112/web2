import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Users, 
  GraduationCap, 
  FlaskConical, 
  Building2, 
  Handshake, 
  FolderKanban, 
  Mail, 
  X, 
  CheckCircle2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { mockCommunityMembers } from '../../data/livingLabData';
import { CommunityMember, CommunityRoleKey } from '../../types/livingLab';

export const CommunityPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<CommunityRoleKey>('all');
  const [selectedMember, setSelectedMember] = useState<CommunityMember | null>(null);

  const filteredMembers = useMemo(() => {
    return mockCommunityMembers.filter((mem) => {
      const matchesSearch = 
        mem.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mem.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mem.skills.some(s => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
        mem.bio.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = selectedRole === 'all' || mem.roleType === selectedRole;

      return matchesSearch && matchesRole;
    });
  }, [searchTerm, selectedRole]);

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* ===================== HERO HEADER ===================== */}
      <section className="bg-white border-b border-slate-200/90 pt-8 sm:pt-10 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00875a] text-xs font-bold border border-emerald-200">
            <Users className="w-3.5 h-3.5" />
            <span>MẠNG LƯỚI ĐỒNG HÀNH</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            CỘNG ĐỒNG LÀNG SV
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Kết nối những người cùng muốn tạo ra giá trị cho Bình Mỹ – sinh viên, giảng viên, chuyên gia, doanh nghiệp và bà con địa phương.
          </p>

        </div>
      </section>

      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* ===================== SEARCH & FILTER BAR ===================== */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm thành viên, kỹ năng (CNTT, Y tế...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-sm focus:outline-hidden focus:border-[#00875a]"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'student', label: '👨🎓 Sinh viên' },
              { id: 'expert', label: '👨🔬 Chuyên gia' },
              { id: 'business', label: '🏢 Doanh nghiệp' },
              { id: 'partner', label: '🤝 Đối tác địa phương' },
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setSelectedRole(r.id as CommunityRoleKey)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedRole === r.id
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>

        </div>

        {/* Counter */}
        <div className="text-xs text-slate-500 font-semibold px-2">
          Hiển thị <span className="text-slate-900 font-extrabold">{filteredMembers.length}</span> thành viên trong mạng lưới Living Lab
        </div>

        {/* ===================== MEMBERS GRID ===================== */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {filteredMembers.map((mem) => (
            <div
              key={mem.id}
              className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div className="space-y-4">
                
                {/* Avatar & Role badge */}
                <div className="flex items-start justify-between">
                  <img
                    src={mem.avatar}
                    alt={mem.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 group-hover:border-[#00875a] transition-colors shadow-2xs"
                  />
                  <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${
                    mem.roleType === 'student' ? 'bg-sky-50 text-sky-700 border border-sky-200' :
                    mem.roleType === 'expert' ? 'bg-purple-50 text-purple-700 border border-purple-200' :
                    mem.roleType === 'business' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}>
                    {mem.roleLabel}
                  </span>
                </div>

                {/* Name & Department */}
                <div className="space-y-1">
                  <h3 className="text-base font-black text-slate-900 group-hover:text-[#00875a] transition-colors line-clamp-1">
                    {mem.name}
                  </h3>
                  <div className="text-xs text-slate-500 line-clamp-2 leading-snug">
                    {mem.department}
                  </div>
                </div>

                {/* Skills tags */}
                <div className="space-y-1.5 pt-1">
                  <div className="flex flex-wrap gap-1.5">
                    {mem.skills.slice(0, 3).map((sk, idx) => (
                      <span
                        key={idx}
                        className="text-[10.5px] font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded-md"
                      >
                        {sk}
                      </span>
                    ))}
                    {mem.skills.length > 3 && (
                      <span className="text-[10px] text-slate-400 font-semibold px-1 py-0.5">
                        +{mem.skills.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Projects participated */}
                <div className="text-xs text-slate-500 flex items-center gap-1.5 pt-2 border-t border-slate-100 font-medium">
                  <FolderKanban className="w-3.5 h-3.5 text-[#00875a]" />
                  <span>Đã tham gia: <strong className="text-slate-800">{mem.joinedProjectsCount} dự án</strong></span>
                </div>

              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-slate-100 mt-4">
                <button
                  onClick={() => setSelectedMember(mem)}
                  className="w-full text-xs font-bold text-slate-700 hover:text-[#00875a] hover:bg-emerald-50 bg-slate-50 py-2.5 px-3 rounded-xl transition-all cursor-pointer text-center"
                >
                  XEM HỒ SƠ
                </button>
              </div>

            </div>
          ))}
        </div>

      </section>

      {/* ===================== MEMBER DETAIL MODAL ===================== */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 sm:p-7 relative space-y-5">
            
            <button
              onClick={() => setSelectedMember(null)}
              className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-4">
              <img
                src={selectedMember.avatar}
                alt={selectedMember.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-xs"
              />
              <div className="min-w-0">
                <h3 className="text-xl font-black text-slate-900">{selectedMember.name}</h3>
                <div className="text-xs font-bold text-[#00875a]">{selectedMember.roleLabel}</div>
                <div className="text-xs text-slate-500 mt-0.5">{selectedMember.department}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Tiểu sử &amp; Định hướng:</div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                "{selectedMember.bio}"
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Kỹ năng chuyên môn:</div>
              <div className="flex flex-wrap gap-1.5">
                {selectedMember.skills.map((sk, idx) => (
                  <span key={idx} className="text-xs font-bold text-slate-800 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-lg">
                    {sk}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-800 uppercase tracking-wide">Dự án đã tham gia tại Bình Mỹ:</div>
              <div className="space-y-1.5">
                {selectedMember.featuredProjects.map((p, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#00875a]" />
                    <span className="font-semibold">{p}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Mail className="w-3.5 h-3.5 text-[#00875a]" />
                <span>{selectedMember.email}</span>
              </span>
              <button
                onClick={() => setSelectedMember(null)}
                className="bg-[#00875a] hover:bg-[#00734c] text-white px-4 py-2 rounded-xl font-bold transition-all"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
