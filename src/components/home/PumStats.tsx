import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Award, Users, Stethoscope, Briefcase, GraduationCap, HeartHandshake } from 'lucide-react';

export const PumStats: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      id: 'pillars',
      icon: Award,
      value: '05',
      labelVi: 'Trụ cột chiến lược',
      labelEn: 'Strategic Pillars',
      subVi: 'Y tế, Đào tạo, Tư vấn, Quốc tế, Bác sĩ',
      subEn: 'Healthcare, Training, Consulting, Global',
      color: 'text-pum-green',
      bgIcon: 'bg-pum-lightGreen/50'
    },
    {
      id: 'models',
      icon: Briefcase,
      value: '12',
      labelVi: 'Mô hình kinh tế phụ trợ',
      labelEn: 'Economic Auxiliary Models',
      subVi: 'Nông nghiệp, Sản phẩm OCOP, Du lịch, Đổi mới',
      subEn: 'Agritech, OCOP, Eco-tourism, Innovation',
      color: 'text-pum-orange',
      bgIcon: 'bg-orange-50'
    },
    {
      id: 'experts',
      icon: Stethoscope,
      value: '100+',
      labelVi: 'Bác sĩ & Chuyên gia',
      labelEn: 'Doctors & Senior Experts',
      subVi: 'Trong nước & mạng lưới quốc tế',
      subEn: 'Domestic & International Network',
      color: 'text-pum-green',
      bgIcon: 'bg-pum-lightGreen/50'
    },
    {
      id: 'workforce',
      icon: GraduationCap,
      value: '1.500+',
      labelVi: 'Nhân lực & Sinh viên',
      labelEn: 'Trained Workforce & Students',
      subVi: 'Đào tạo kỹ năng & thực hành Living Lab',
      subEn: 'Competency training & Living Lab practice',
      color: 'text-sky-700',
      bgIcon: 'bg-sky-50'
    },
    {
      id: 'community',
      icon: HeartHandshake,
      value: '10.000+',
      labelVi: 'Người dân thụ hưởng',
      labelEn: 'Community Beneficiaries',
      subVi: 'Khám sàng lọc, tư vấn & chăm sóc sức khỏe',
      subEn: 'Health screening, consultation & wellness',
      color: 'text-rose-700',
      bgIcon: 'bg-rose-50'
    }
  ];

  return (
    <section className="bg-pum-lightGreen/35 border-y border-pum-green/15 py-12 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2">
            {language === 'vi' ? 'Hiệu quả & Tác động xã hội' : 'Social Impact & Performance'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Các con số nổi bật kiến tạo giá trị' : 'Key Milestones Across Ecosystem'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'vi' ? '(Số liệu cam kết & cập nhật theo tiến độ triển khai)' : '(Verified figures updated according to progress)'}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6">
          {stats.map((s) => {
            const IconComponent = s.icon;
            return (
              <div
                key={s.id}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-slate-200/80 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-10 h-10 rounded-xl ${s.bgIcon} flex items-center justify-center mb-4`}>
                    <IconComponent className={`w-5 h-5 ${s.color}`} />
                  </div>
                  <div className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight mb-1">
                    {s.value}
                  </div>
                  <h3 className="text-sm font-bold text-slate-800 leading-snug">
                    {language === 'vi' ? s.labelVi : s.labelEn}
                  </h3>
                </div>
                <p className="text-[11px] text-slate-500 leading-normal mt-3 pt-3 border-t border-slate-100">
                  {language === 'vi' ? s.subVi : s.subEn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
