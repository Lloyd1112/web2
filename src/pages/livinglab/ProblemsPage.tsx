import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  MapPin, 
  CheckCircle2, 
  ArrowRight, 
  Layers, 
  Send,
  AlertCircle,
  Eye,
  Users
} from 'lucide-react';
import { mockProblems } from '../../data/livingLabData';
import { ProblemItem, FieldKey, ProblemStatusKey } from '../../types/livingLab';

interface ProblemsPageProps {
  initialFieldFilter?: string;
  onSelectProblem: (problem: ProblemItem) => void;
  onNavigateToSubmit: () => void;
}

export const ProblemsPage: React.FC<ProblemsPageProps> = ({
  initialFieldFilter = 'all',
  onSelectProblem,
  onNavigateToSubmit
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedField, setSelectedField] = useState<FieldKey>(initialFieldFilter as FieldKey);
  const [selectedStatus, setSelectedStatus] = useState<ProblemStatusKey>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'priority'>('newest');

  // Filter and sort logic
  const filteredProblems = useMemo(() => {
    return mockProblems.filter((prob) => {
      // 1. Search filter
      const matchesSearch = 
        prob.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prob.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prob.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        prob.neededResources.some(r => r.toLowerCase().includes(searchTerm.toLowerCase()));

      // 2. Field filter
      const matchesField = selectedField === 'all' || prob.field === selectedField;

      // 3. Status filter
      const matchesStatus = selectedStatus === 'all' || prob.status === selectedStatus;

      return matchesSearch && matchesField && matchesStatus;
    }).sort((a, b) => {
      if (sortBy === 'priority') {
        if (a.featured && !b.featured) return -1;
        if (!a.featured && b.featured) return 1;
      }
      return 0; // default order is newest
    });
  }, [searchTerm, selectedField, selectedStatus, sortBy]);

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* ===================== HERO HEADER ===================== */}
      <section className="bg-white border-b border-slate-200/90 pt-8 sm:pt-10 pb-8">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#00875a] text-xs font-bold border border-emerald-200">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>DANH SÁCH BÀI TOÁN ĐÃ THẨM ĐỊNH</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            BÀI TOÁN BÌNH MỸ
          </h1>

          <p className="text-sm sm:text-base text-slate-600 max-w-3xl leading-relaxed">
            Những vấn đề thực tế đã được Ban quản lý Làng SV xác minh
            đang cần nguồn lực (sinh viên, chuyên gia, doanh nghiệp) cùng xây dựng và thử nghiệm giải pháp.
          </p>

        </div>
      </section>

      {/* ===================== SEARCH & FILTER BAR ===================== */}
      <section className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        
        {/* Controls Card */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-5 sm:p-6 shadow-xs space-y-4">
          
          {/* Row 1: Search Box */}
          <div className="relative">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm kiếm bài toán theo từ khóa, kỹ năng cần (Marketing, CNTT, Thiết kế...)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00875a] focus:ring-2 focus:ring-emerald-100 transition-all"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-slate-600"
              >
                Xóa
              </button>
            )}
          </div>

          {/* Row 2: Category Filter Pills + Status + Sort */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-1 border-t border-slate-100">
            
            {/* Lĩnh vực filter pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <span className="text-xs font-bold text-slate-400 mr-1 hidden sm:inline">Lĩnh vực:</span>
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

            {/* Trạng thái filter dropdown & Sort dropdown */}
            <div className="flex items-center gap-3 text-xs">
              
              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold hidden md:inline">Trạng thái:</span>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value as ProblemStatusKey)}
                  className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="all">Tất cả trạng thái</option>
                  <option value="seeking_resources">Đang tìm nguồn lực</option>
                  <option value="in_progress">Đang triển khai</option>
                  <option value="solved">Đã giải quyết</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400 font-semibold hidden md:inline">Sắp xếp:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as 'newest' | 'priority')}
                  className="bg-slate-100 text-slate-700 font-bold px-3 py-1.5 rounded-xl border border-slate-200 focus:outline-hidden cursor-pointer"
                >
                  <option value="newest">Mới nhất</option>
                  <option value="priority">Ưu tiên nổi bật</option>
                </select>
              </div>

            </div>

          </div>

        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between text-xs text-slate-500 font-semibold px-2">
          <div>
            Hiển thị <span className="text-slate-900 font-extrabold">{filteredProblems.length}</span> bài toán phù hợp
          </div>
          {(searchTerm || selectedField !== 'all' || selectedStatus !== 'all') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedField('all');
                setSelectedStatus('all');
              }}
              className="text-[#00875a] hover:underline font-bold"
            >
              Đặt lại bộ lọc
            </button>
          )}
        </div>

        {/* ===================== PROBLEMS GRID ===================== */}
        {filteredProblems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
            {filteredProblems.map((prob) => (
              <div
                key={prob.id}
                className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div className="space-y-3.5">
                  
                  {/* Top Bar: Field + Verification Badge + Status */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-1 rounded-full bg-slate-100 text-slate-800">
                      <span>{prob.fieldEmoji}</span>
                      <span>{prob.fieldLabel}</span>
                    </span>

                    <span className={`text-[10.5px] font-bold px-2 py-0.5 rounded-full border ${
                      prob.status === 'seeking_resources'
                        ? 'bg-amber-50 text-amber-700 border-amber-200'
                        : prob.status === 'in_progress'
                        ? 'bg-sky-50 text-sky-700 border-sky-200'
                        : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    }`}>
                      {prob.statusLabel}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    onClick={() => onSelectProblem(prob)}
                    className="text-base sm:text-lg font-black text-slate-900 group-hover:text-[#00875a] transition-colors leading-snug cursor-pointer line-clamp-2"
                  >
                    {prob.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    "{prob.summary}"
                  </p>

                  {/* Location & Verification */}
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 pt-1">
                    <div className="flex items-center gap-1.5 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-[#00875a] flex-shrink-0" />
                      <span>{prob.location}</span>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-700 font-bold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#00875a]" />
                      <span>Đã xác minh</span>
                    </div>
                  </div>

                  {/* Needed Resources */}
                  <div className="pt-2 border-t border-slate-100">
                    <div className="text-[10.5px] font-bold text-slate-400 mb-1.5 uppercase tracking-wide">
                      Nguồn lực cần kết nối:
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

                {/* Bottom Action Button */}
                <div className="pt-5 border-t border-slate-100 mt-4">
                  <button
                    onClick={() => onSelectProblem(prob)}
                    className="w-full text-xs font-bold text-[#00875a] hover:text-white bg-emerald-50 hover:bg-[#00875a] py-2.5 px-4 rounded-xl flex items-center justify-center gap-1 transition-all cursor-pointer group/btn"
                  >
                    <span>Xem chi tiết</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>

              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
              <AlertCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">
              Không tìm thấy bài toán phù hợp
            </h4>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Hãy thử tìm kiếm với từ khóa khác hoặc điều chỉnh bộ lọc lĩnh vực và trạng thái.
            </p>
          </div>
        )}

        {/* ===================== RESIDENT PROPOSAL NOTICE BANNER ===================== */}
        <div className="bg-gradient-to-r from-slate-900 to-[#043827] rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-1.5 max-w-2xl">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wide">
              Quy chế thẩm định Living Lab
            </div>
            <h3 className="text-lg sm:text-xl font-black">
              Bạn có vấn đề tại địa phương chưa xuất hiện trên hệ thống?
            </h3>
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed">
              Để đảm bảo tính xác thực, hệ thống không cho phép đăng bài tự do. Người dân và hộ sản xuất có thể gửi đề xuất để Ban quản lý khảo sát và công khai bài toán.
            </p>
          </div>

          <button
            onClick={onNavigateToSubmit}
            className="bg-[#00875a] hover:bg-[#00734c] text-white px-5 py-3 rounded-2xl text-xs sm:text-[13px] font-bold shadow-xs whitespace-nowrap active:scale-95 transition-all flex items-center gap-2 cursor-pointer flex-shrink-0"
          >
            <Send className="w-4 h-4" />
            <span>Gửi đề xuất vấn đề để thẩm định →</span>
          </button>
        </div>

      </section>

    </div>
  );
};
