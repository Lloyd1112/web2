import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockTrainingPrograms, mockTargetAudiences } from '../data/mockData';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  BookOpen, 
  Clock, 
  Award, 
  Stethoscope, 
  Briefcase, 
  Cpu, 
  Languages, 
  UserPlus, 
  Layers, 
  Send 
} from 'lucide-react';

interface TrainingPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const renderProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-emerald-600" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-sky-600" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-amber-500" />;
      case 'Languages': return <Languages className="w-5 h-5 text-purple-600" />;
      default: return <Sparkles className="w-5 h-5 text-teal-600" />;
    }
  };

  const filteredPrograms = selectedCategory === 'all'
    ? mockTrainingPrograms
    : mockTrainingPrograms.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-100 text-sky-800 text-xs font-bold tracking-wide uppercase">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Nguồn Nhân Lực Chất Lượng Cao</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Đào Tạo Nguồn Nhân Lực Y Tế Chuẩn Thực Tiễn
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Đào tạo theo nhu cầu thực tế – Thực hành trên bài toán thật tại Living Lab – Đánh giá theo chuẩn năng lực – Kết nối việc làm và cơ hội quốc tế.
          </p>
        </div>

        {/* 4 Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            Xem toàn bộ chương trình
          </button>
          <button
            onClick={() => onOpenCollaboration('training', 'Đăng ký học chương trình y tế')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm"
          >
            Đăng ký học
          </button>
          <button
            onClick={() => onOpenCollaboration('consulting', 'Đặt hàng đào tạo nhân lực theo yêu cầu')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Đặt hàng đào tạo
          </button>
          <button
            onClick={() => onOpenCollaboration('expert', 'Đăng ký trở thành Giảng viên thỉnh giảng')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm"
          >
            Trở thành giảng viên
          </button>
        </div>

        {/* 4.1. CHUỖI ĐÀO TẠO NĂNG LỰC (PIPELINE) */}
        <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-emerald-400">Quy Trình Chuẩn Hóa</span>
            <h2 className="text-2xl font-bold mt-1 text-white">Chuỗi Đào Tạo Năng Lực 5 Bước</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {[
              { step: '01', title: 'Khảo sát nhu cầu', desc: 'Lắng nghe nhu cầu từ bệnh viện, trung tâm và cộng đồng' },
              { step: '02', title: 'Đào tạo chuẩn', desc: 'Lý thuyết tích hợp gắn với chuẩn quốc tế & công nghệ số' },
              { step: '03', title: 'Thực hành Living Lab', desc: 'Trực tiếp thao tác trên các ca bệnh và tình huống thực tế' },
              { step: '04', title: 'Đánh giá & Chứng nhận', desc: 'Kiểm tra năng lực thực hành và cấp chứng chỉ uy tín' },
              { step: '05', title: 'Việc làm & Khởi nghiệp', desc: 'Kết nối tuyển dụng hoặc ươm mầm dự án y tế mới' },
            ].map((item, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/10 flex flex-col justify-between hover:bg-white/15 transition-all">
                <div>
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/30 text-emerald-300 flex items-center justify-center font-black text-sm mb-3">
                    {item.step}
                  </div>
                  <h4 className="font-bold text-sm text-white">{item.title}</h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">{item.desc}</p>
                </div>
                {idx < 4 && (
                  <div className="hidden sm:block text-emerald-400 font-bold text-lg mt-3 text-right">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 4.2. CÁC NHÓM CHƯƠNG TRÌNH ĐÀO TẠO */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                Các Nhóm Chương Trình Đào Tạo Trọng Điểm
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Lộ trình thiết kế tinh gọn, bám sát yêu cầu hội nhập và hiện đại hóa y tế
              </p>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar">
              {[
                { id: 'all', label: 'Tất cả' },
                { id: 'specialized', label: 'Chuyên môn' },
                { id: 'management', label: 'Quản trị' },
                { id: 'technology', label: 'Công nghệ số' },
                { id: 'language', label: 'Ngoại ngữ' },
                { id: 'innovation', label: 'Đổi mới sáng tạo' },
              ].map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-sky-600 text-white'
                      : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((prog) => (
              <div
                key={prog.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                      {renderProgramIcon(prog.icon)}
                    </div>
                    <span className="text-[11px] font-bold px-2.5 py-1 bg-slate-100 text-slate-700 rounded-full">
                      {prog.duration}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700 transition-colors mb-2">
                    {prog.categoryName}
                  </h3>
                  <div className="text-xs text-sky-600 font-semibold mb-4">
                    Chuẩn: {prog.level}
                  </div>

                  <ul className="space-y-2 border-t border-slate-100 pt-4">
                    {prog.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100">
                  <button
                    onClick={() => onOpenCollaboration('training', prog.categoryName)}
                    className="w-full py-2.5 rounded-xl bg-sky-50 group-hover:bg-sky-600 text-sky-700 group-hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Đăng ký khóa học này</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4.3. ĐỐI TƯỢNG ĐÀO TẠO */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="max-w-2xl mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-sky-600">Đối tượng phục vụ</span>
            <h2 className="text-2xl font-bold mt-1 text-slate-900">7 Nhóm Đối Tượng Đào Tạo Đa Dạng</h2>
            <p className="text-xs text-slate-500 mt-1">
              Chương trình được cá nhân hóa theo từng nhu cầu phát triển năng lực chuyên môn
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mockTargetAudiences.map((aud) => (
              <div
                key={aud.id}
                className="bg-slate-50/80 hover:bg-sky-50/50 rounded-2xl p-5 border border-slate-100 hover:border-sky-200 transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="w-9 h-9 rounded-xl bg-white shadow-xs border border-slate-200 flex items-center justify-center text-sky-600 font-bold mb-3 group-hover:scale-110 transition-transform">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-sm text-slate-800 leading-snug group-hover:text-sky-800">
                    {aud.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {aud.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-200/60">
                  <button
                    onClick={() => onOpenCollaboration('training', aud.title)}
                    className="text-xs font-bold text-sky-600 hover:text-sky-700 flex items-center gap-1"
                  >
                    <span>Tư vấn lộ trình</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
