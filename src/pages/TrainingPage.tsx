import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockTrainingPrograms, mockTargetAudiences } from '../data/mockData';
import { 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  Award, 
  Stethoscope, 
  Briefcase, 
  Cpu, 
  Languages, 
  Users, 
  UserPlus, 
  Building2 
} from 'lucide-react';

interface TrainingPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const TrainingPage: React.FC<TrainingPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const renderProgramIcon = (iconName: string) => {
    switch (iconName) {
      case 'Stethoscope': return <Stethoscope className="w-5 h-5 text-pum-green" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-pum-orange" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-sky-600" />;
      case 'Languages': return <Languages className="w-5 h-5 text-purple-600" />;
      default: return <Sparkles className="w-5 h-5 text-pum-green" />;
    }
  };

  const filteredPrograms = selectedCategory === 'all'
    ? mockTrainingPrograms
    : mockTrainingPrograms.filter(p => p.category === selectedCategory);

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <GraduationCap className="w-3.5 h-3.5 text-pum-orange" />
            <span>{language === 'vi' ? 'Nguồn Nhân Lực Chất Lượng Cao' : 'High-Quality Talent Pipeline'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Đào Tạo Nguồn Nhân Lực Y Tế Chuẩn Thực Tiễn' : 'Healthcare Workforce & Competency Training'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Đào tạo theo nhu cầu sử dụng – Thực hành trên bài toán thật tại Living Lab – Đánh giá theo chuẩn năng lực – Kết nối việc làm và cơ hội quốc tế.'
              : 'Demand-driven curricula – Real-case practice at Living Lab – Competency-based evaluation – Direct job matching & global career mobility.'}
          </p>
        </div>

        {/* 4 Action Buttons Bar (Rule s.md) */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedCategory('all')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-green text-white hover:bg-pum-greenAlt transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Xem chương trình' : 'View Programs'}
          </button>
          <button
            onClick={() => onOpenCollaboration('training', 'Đăng ký học chương trình y tế')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-orange text-white hover:bg-pum-orangeHover transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Đăng ký học' : 'Enroll Now'}
          </button>
          <button
            onClick={() => onOpenCollaboration('consulting', 'Đặt hàng đào tạo nhân lực theo yêu cầu')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-white text-pum-green border-2 border-pum-green hover:bg-pum-lightGreen/30 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Đặt hàng đào tạo' : 'Custom Corporate Training'}
          </button>
          <button
            onClick={() => onOpenCollaboration('expert', 'Đăng ký trở thành Giảng viên thỉnh giảng')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Trở thành giảng viên' : 'Join as Faculty'}
          </button>
        </div>

        {/* 4.1. CHUỖI ĐÀO TẠO NĂNG LỰC 5 BƯỚC */}
        <div className="bg-gradient-to-r from-pum-greenDark via-pum-green to-pum-greenAlt text-white rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-black uppercase tracking-widest text-pum-orange">
              {language === 'vi' ? 'Mô hình đào tạo giá trị' : 'Value-Driven Model'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black mt-1 text-white">
              {language === 'vi' ? 'Chuỗi Đào Tạo Năng Lực 5 Bước Chuẩn Hóa' : '5-Stage Competency-Based Pipeline'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-4 relative">
            {[
              { step: '01', titleVi: 'Khảo sát nhu cầu', titleEn: 'Needs Survey', descVi: 'Lắng nghe nhu cầu từ bệnh viện, trung tâm và cộng đồng', descEn: 'Direct surveys from healthcare providers' },
              { step: '02', titleVi: 'Đào tạo chuẩn', titleEn: 'Core Curriculum', descVi: 'Lý thuyết tích hợp gắn với chuẩn quốc tế & công nghệ số', descEn: 'International medical standards' },
              { step: '03', titleVi: 'Thực hành Living Lab', titleEn: 'Living Lab Practice', descVi: 'Trực tiếp thao tác trên các ca bệnh và tình huống thực tế', descEn: 'Hands-on practice on real cases' },
              { step: '04', titleVi: 'Đánh giá & Chứng nhận', titleEn: 'Certification', descVi: 'Thi tay nghề chuẩn năng lực, cấp chứng chỉ hành nghề', descEn: 'Competency tests and certifications' },
              { step: '05', titleVi: 'Tuyển dụng & Khởi nghiệp', titleEn: 'Placement & Ventures', descVi: 'Kết nối việc làm ngay tại hệ sinh thái hoặc khởi nghiệp', descEn: 'Job placement & startup incubation' },
            ].map((st, i) => (
              <div key={i} className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 flex flex-col justify-between group hover:bg-white/15 transition-colors">
                <div>
                  <span className="text-3xl font-black text-pum-orange">{st.step}</span>
                  <h3 className="text-sm font-bold text-white mt-2 leading-snug">
                    {language === 'vi' ? st.titleVi : st.titleEn}
                  </h3>
                </div>
                <p className="text-[11px] text-white/70 mt-3 pt-3 border-t border-white/10 leading-relaxed">
                  {language === 'vi' ? st.descVi : st.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 4.2. CÁC NHÓM CHƯƠNG TRÌNH ĐÀO TẠO */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-pum-green mb-1 block">
                {language === 'vi' ? 'Chương trình tuyển sinh' : 'Curricula'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {language === 'vi' ? 'Các Nhóm Chương Trình Đào Tạo' : 'Program Categories'}
              </h2>
            </div>
            {/* Category filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                  selectedCategory === 'all' 
                    ? 'bg-pum-green text-white shadow-2xs' 
                    : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                {language === 'vi' ? 'Tất cả' : 'All'}
              </button>
              {['specialized', 'management', 'technology', 'language', 'innovation'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold capitalize transition-all ${
                    selectedCategory === cat 
                      ? 'bg-pum-green text-white shadow-2xs' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPrograms.map((program) => (
              <div
                key={program.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-extrabold uppercase tracking-wide text-pum-orange">
                      {program.categoryName}
                    </span>
                    <div className="w-10 h-10 rounded-xl bg-pum-lightGreen/40 flex items-center justify-center">
                      {renderProgramIcon(program.icon)}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {program.items.map((it, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-pum-green flex-shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-semibold">
                      <Clock className="w-3.5 h-3.5 text-pum-orange" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1 font-semibold">
                      <Award className="w-3.5 h-3.5 text-pum-green" />
                      {program.level}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenCollaboration('training', `Đăng ký khóa học: ${program.categoryName}`)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-pum-green hover:text-pum-orange transition-colors"
                  >
                    <span>{language === 'vi' ? 'Đăng ký' : 'Enroll'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4.3. ĐỐI TƯỢNG ĐÀO TẠO */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-pum-green mb-1 block">
              {language === 'vi' ? 'Mạng lưới người học' : 'Beneficiaries'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? 'Đối Tượng Đào Tạo Mục Tiêu' : 'Target Trainee Groups'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {mockTargetAudiences.map((aud) => (
              <div key={aud.id} className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 hover:border-pum-green transition-colors">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 text-pum-green flex items-center justify-center mb-3 shadow-2xs">
                  <Users className="w-5 h-5" />
                </div>
                <h3 className="text-sm font-bold text-slate-900 leading-snug mb-1">
                  {aud.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  {aud.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
