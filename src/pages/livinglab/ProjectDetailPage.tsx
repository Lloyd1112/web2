import React, { useState } from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Users, 
  TrendingUp, 
  Award, 
  GraduationCap, 
  FlaskConical, 
  Tractor, 
  Building2, 
  ArrowRight, 
  Image as ImageIcon, 
  FileText, 
  Lightbulb, 
  Sparkles,
  Layers,
  ChevronRight
} from 'lucide-react';
import { ProjectItem } from '../../types/livingLab';

interface ProjectDetailPageProps {
  project: ProjectItem;
  onBack: () => void;
  onNavigateToProblem?: (problemId: string) => void;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({
  project,
  onBack,
  onNavigateToProblem
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'photos' | 'lessons'>('overview');

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* Top Breadcrumb & Back bar */}
      <div className="bg-white border-b border-slate-200/90 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#00875a] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại danh sách Dự án</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Mã dự án:</span>
            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {project.code}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* ===================== HERO PROJECT CARD ===================== */}
        <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-9 shadow-xs space-y-6">
          
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800">
              <span className="text-base">{project.fieldEmoji}</span>
              <span>{project.fieldLabel}</span>
            </span>

            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4 text-[#00875a]" />
              <span>✓ Đã thử nghiệm tại Bình Mỹ</span>
            </div>
          </div>

          <div className="space-y-3">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
              {project.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-3xl">
              "{project.summary}"
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-2 font-medium">
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-[#00875a]" />
                <span>{project.location}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-[#00875a]" />
                <span>{project.membersCount} thành viên liên ngành</span>
              </div>
              <div className="flex items-center gap-1.5">
                <TrendingUp className="w-4 h-4 text-[#00875a]" />
                <span>Hoàn thành {project.progressPercent}%</span>
              </div>
            </div>
          </div>

          {/* Quick Tabs Navigation */}
          <div className="flex items-center gap-2 border-t border-slate-100 pt-4 overflow-x-auto scrollbar-none text-xs font-bold">
            {[
              { id: 'overview', label: 'Tổng quan & Giải pháp' },
              { id: 'impact', label: 'Kết quả & Tác động thực tế' },
              { id: 'photos', label: 'Hình ảnh thử nghiệm tại vườn' },
              { id: 'lessons', label: 'Bài học & Đề xuất nhân rộng' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-xl transition-all cursor-pointer whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-[#00875a] text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>

        {/* ===================== TAB 1: OVERVIEW & SOLUTION ===================== */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start animate-fade-in">
            
            {/* Left 8 Cols: Problem & Solution Statement */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* SECTION: VẤN ĐỀ */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                    VẤN ĐỀ XUẤT PHÁT ĐIỂM
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-[#F7FAF8] p-4 rounded-2xl border border-slate-100">
                  {project.problemStatement}
                </p>
              </div>

              {/* SECTION: GIẢI PHÁP */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-3">
                <div className="flex items-center gap-2 border-b border-slate-100 pb-2.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#00875a]" />
                  <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                    GIẢI PHÁP ĐỒNG SÁNG TẠO
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                  {project.solutionStatement}
                </p>
              </div>

              {/* SECTION: QUÁ TRÌNH (TIMELINE) */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                    <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                      QUÁ TRÌNH THỰC HIỆN
                    </h3>
                  </div>
                  <span className="text-xs font-bold text-[#00875a]">
                    Tiến độ: {project.progressPercent}%
                  </span>
                </div>

                <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-emerald-200">
                  {project.timeline.map((step, idx) => (
                    <div key={idx} className="relative space-y-1">
                      <div className={`absolute -left-6 top-0.5 w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        step.completed
                          ? 'bg-[#00875a] border-white text-white'
                          : step.current
                          ? 'bg-amber-500 border-white text-white animate-pulse'
                          : 'bg-slate-200 border-white text-slate-500'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-3 h-3" />
                        ) : (
                          <span className="text-[9px] font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-slate-400">GIAI ĐOẠN {step.phase}:</span>
                        <h4 className={`text-xs sm:text-sm font-bold ${
                          step.completed ? 'text-slate-900' : step.current ? 'text-[#00875a]' : 'text-slate-500'
                        }`}>
                          {step.title}
                        </h4>
                        {step.current && (
                          <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                            Đang thực hiện
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Right 4 Cols: NHÓM THỰC HIỆN (3 Sinh viên, 1 Chuyên gia, 1 Hộ dân) */}
            <div className="lg:col-span-4 space-y-6">
              
              <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-xs space-y-4">
                
                <div className="border-b border-slate-100 pb-2.5 space-y-1">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Thành phần liên ngành
                  </div>
                  <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                    <Users className="w-4 h-4 text-[#00875a]" />
                    <span>NHÓM THỰC HIỆN</span>
                  </h3>
                  <div className="text-xs text-slate-500">
                    👨🎓 3 Sinh viên • 👨🔬 1 Chuyên gia • 👨🌾 1 Hộ dân
                  </div>
                </div>

                <div className="space-y-3">
                  {project.teamMembers.map((member, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all"
                    >
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-slate-900 truncate">
                            {member.name}
                          </span>
                          <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full ${
                            member.type === 'student' ? 'bg-sky-100 text-sky-800' :
                            member.type === 'expert' ? 'bg-purple-100 text-purple-800' :
                            'bg-emerald-100 text-emerald-800'
                          }`}>
                            {member.typeLabel}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 truncate mt-0.5">
                          {member.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('impact')}
                    className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-2.5 px-4 rounded-xl text-xs font-bold shadow-2xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                  >
                    <span>Xem kết quả &amp; tác động</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>

            </div>

          </div>
        )}

        {/* ===================== TAB 2: KẾT QUẢ & TÁC ĐỘNG (Section 13) ===================== */}
        {activeTab === 'impact' && (
          <div className="space-y-8 animate-fade-in">
            
            {/* Impact Process Chain (Before -> Solution -> Testing -> Result) */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              
              <div className="text-center max-w-2xl mx-auto space-y-1">
                <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
                  Chuỗi tác động thực tế
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  KẾT QUẢ &amp; TÁC ĐỘNG TẠI BÌNH MỸ
                </h3>
                <p className="text-xs text-slate-500">
                  Quy trình chuyển hóa từ khó khăn thực tế thành hiệu quả đo lường được
                </p>
              </div>

              {/* 4-Step Visual Flow */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
                
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-2 text-center">
                  <div className="text-xs font-black text-amber-700 uppercase">1. BEFORE (TRƯỚC ĐÂY)</div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {project.impact.beforeText}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-sky-50/80 border border-sky-200 space-y-2 text-center">
                  <div className="text-xs font-black text-sky-700 uppercase">2. GIẢI PHÁP ĐƯỢC XÂY DỰNG</div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {project.impact.solutionText}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 space-y-2 text-center">
                  <div className="text-xs font-black text-emerald-800 uppercase">3. THỬ NGHIỆM TẠI BÌNH MỸ</div>
                  <p className="text-xs text-slate-700 leading-snug">
                    {project.impact.testingText}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-br from-[#00875a] to-[#044c35] text-white space-y-2 text-center shadow-xs">
                  <div className="text-xs font-black text-amber-300 uppercase">4. KẾT QUẢ ĐẠT ĐƯỢC</div>
                  <p className="text-xs text-white/90 leading-snug">
                    Hiệu quả được hộ dân và BQL Làng SV công nhận
                  </p>
                </div>

              </div>

            </div>

            {/* Impact Stat Cards (Matching Prompt 13: 20 Hộ tham gia, 5 Hộ thử nghiệm, +30% Lượt tiếp cận) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {project.impact.stats.map((st, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-2 text-center group hover:border-emerald-300 transition-all"
                >
                  <div className="text-3xl sm:text-4xl font-black text-[#00875a] group-hover:scale-105 transition-transform duration-200">
                    {st.value}
                  </div>
                  <div className="text-xs sm:text-sm font-bold text-slate-900">
                    {st.label}
                  </div>
                  {st.change && (
                    <div className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full inline-block">
                      {st.change}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Before & After Table */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                <FileText className="w-5 h-5 text-[#00875a]" />
                <h4 className="text-base font-black text-slate-900">
                  Bảng So Sánh Hiệu Quả Trước &amp; Sau Thử Nghiệm
                </h4>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-[13px]">
                  <thead>
                    <tr className="border-b border-slate-200 text-slate-400 font-bold uppercase text-[11px]">
                      <th className="py-3 px-4 w-1/4">Khía cạnh đánh giá</th>
                      <th className="py-3 px-4 w-3/8 text-amber-700 bg-amber-50/50 rounded-tl-xl">Trước thử nghiệm (Before)</th>
                      <th className="py-3 px-4 w-3/8 text-emerald-800 bg-emerald-50/50 rounded-tr-xl">Sau thử nghiệm (After)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 font-medium">
                    {project.impact.beforeAfter.map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-bold text-slate-900">{row.aspect}</td>
                        <td className="py-3.5 px-4 text-slate-600 bg-amber-50/20">{row.before}</td>
                        <td className="py-3.5 px-4 text-emerald-900 font-semibold bg-emerald-50/20">{row.after}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* ===================== TAB 3: REAL PHOTOS ===================== */}
        {activeTab === 'photos' && (
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6 animate-fade-in">
            <div className="border-b border-slate-100 pb-3 space-y-1">
              <div className="flex items-center gap-2 text-[#00875a] font-bold text-xs uppercase tracking-wide">
                <ImageIcon className="w-4 h-4" />
                <span>Hình ảnh thực tế</span>
              </div>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Ghi Nhận Thực Địa Tại Living Lab &amp; Vườn Nông Hộ Bình Mỹ
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {project.impact.realPhotos.map((photo, idx) => (
                <div key={idx} className="space-y-2 rounded-2xl overflow-hidden border border-slate-200 shadow-2xs group">
                  <div className="h-48 overflow-hidden bg-slate-100">
                    <img
                      src={photo.url}
                      alt={photo.caption}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-3 text-xs text-slate-700 leading-snug font-medium">
                    {photo.caption}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===================== TAB 4: LESSONS & SCALING ===================== */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-fade-in">
            
            {/* Bài học kinh nghiệm */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-amber-600 border-b border-slate-100 pb-3">
                <Lightbulb className="w-5 h-5" />
                <h4 className="text-base font-black text-slate-900">
                  Bài Học Kinh Nghiệm Rút Ra
                </h4>
              </div>

              <ul className="space-y-3">
                {project.impact.lessons.map((ls, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                    <span>{ls}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Đề xuất nhân rộng */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-[#00875a] border-b border-slate-100 pb-3">
                <Sparkles className="w-5 h-5" />
                <h4 className="text-base font-black text-slate-900">
                  Kế Hoạch &amp; Đề Xuất Nhân Rộng
                </h4>
              </div>

              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-medium bg-emerald-50/50 p-4 rounded-2xl border border-emerald-100">
                "{project.impact.scalingPlan}"
              </p>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 text-xs text-slate-500 space-y-1">
                <div className="font-bold text-slate-800">Cơ chế hỗ trợ nhân rộng:</div>
                <div>Ban quản lý Làng SV kết nối nguồn vốn hỗ trợ thanh niên khởi nghiệp và các quỹ đổi mới sáng tạo để nhân rộng mô hình ra toàn xã.</div>
              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
