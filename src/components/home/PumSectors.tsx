import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockActivityFieldsData } from '../../data/mockData';
import { 
  HeartHandshake, 
  GraduationCap, 
  Lightbulb, 
  Globe, 
  Stethoscope, 
  ArrowRight 
} from 'lucide-react';

interface PumSectorsProps {
  onNavigate: (tab: string) => void;
}

export const PumSectors: React.FC<PumSectorsProps> = ({ onNavigate }) => {
  const { language } = useLanguage();

  const getSectorIcon = (iconName: string) => {
    switch (iconName) {
      case 'HeartHandshake':
        return HeartHandshake;
      case 'GraduationCap':
        return GraduationCap;
      case 'Lightbulb':
        return Lightbulb;
      case 'Globe':
        return Globe;
      case 'Stethoscope':
        return Stethoscope;
      default:
        return HeartHandshake;
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2 block">
            {language === 'vi' ? 'Hệ sinh thái toàn diện' : 'Holistic Ecosystem'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Năm lĩnh vực hoạt động chiến lược' : 'Five Strategic Focus Areas'}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            {language === 'vi'
              ? 'Mô hình 5 chân kiềng tương hỗ tạo nên sức mạnh tổng hợp của Làng Sinh Viên Bình Mỹ, từ đào tạo nguồn nhân lực đến chuyển giao mô hình cho cộng đồng.'
              : 'A 5-pillar cohesive framework powering Binh My Student Village, linking talent education with real community deployment.'}
          </p>
        </div>

        {/* 5 Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {mockActivityFieldsData.map((field, idx) => {
            const IconComponent = getSectorIcon(field.icon);
            const isFullOnLg = idx === 3 || idx === 4;

            return (
              <div
                key={field.id}
                onClick={() => onNavigate(field.pageId)}
                className={`group cursor-pointer bg-[#F8FAF9] rounded-3xl p-7 lg:p-8 border border-slate-200/80 shadow-2xs hover:shadow-xl hover:border-pum-green/40 hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between ${
                  isFullOnLg ? 'lg:col-span-1.5' : ''
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="text-2xl font-black text-slate-300 group-hover:text-pum-orange transition-colors">
                      {field.number}
                    </span>
                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-pum-green group-hover:bg-pum-green group-hover:text-white group-hover:border-pum-green flex items-center justify-center transition-all shadow-2xs">
                      <IconComponent className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-snug mb-3">
                    {language === 'vi' ? field.title : field.titleEn}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'vi' ? field.description : field.descriptionEn}
                  </p>
                </div>

                <div className="mt-8 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pum-green group-hover:text-pum-orange transition-colors">
                    {language === 'vi' ? 'Tìm hiểu chi tiết' : 'Explore Domain'}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-white border border-slate-200 text-slate-600 group-hover:bg-pum-green group-hover:text-white group-hover:border-pum-green flex items-center justify-center transition-all">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
