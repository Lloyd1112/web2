import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPartners } from '../../data/mockData';
import { Building2, Award } from 'lucide-react';

export const PumPartners: React.FC = () => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelVi: 'Tất cả đối tác', labelEn: 'All Partners' },
    { id: 'university', labelVi: 'Trường đại học', labelEn: 'Universities' },
    { id: 'hospital', labelVi: 'Bệnh viện & Y tế', labelEn: 'Hospitals & Healthcare' },
    { id: 'enterprise', labelVi: 'Doanh nghiệp', labelEn: 'Enterprises' },
    { id: 'international', labelVi: 'Tổ chức quốc tế', labelEn: 'International Bodies' },
  ];

  const filteredPartners = selectedCategory === 'all'
    ? mockPartners
    : mockPartners.filter(p => p.category === selectedCategory);

  return (
    <section className="py-16 lg:py-20 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2 block">
            {language === 'vi' ? 'Mạng lưới đồng hành tin cậy' : 'Our Trusted Alliance'}
          </span>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Đối tác chiến lược & Đồng hành' : 'Strategic Partners & Collaborators'}
          </h2>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-pum-green text-white shadow-sm'
                    : 'bg-[#F8FAF9] text-slate-700 hover:bg-pum-lightGreen/50 border border-slate-200/80'
                }`}
              >
                {language === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Partners Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredPartners.map((partner) => (
            <div
              key={partner.id}
              className="bg-[#F8FAF9] rounded-2xl p-5 border border-slate-200/80 hover:border-pum-green hover:shadow-md hover:-translate-y-1 transition-all duration-200 flex flex-col items-center justify-center text-center group"
            >
              <div className="w-12 h-12 rounded-xl bg-white border border-slate-200/80 text-pum-green group-hover:bg-pum-green group-hover:text-white group-hover:border-pum-green flex items-center justify-center mb-3 transition-colors shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>
              <h4 className="text-xs font-bold text-slate-800 leading-snug group-hover:text-pum-green transition-colors">
                {language === 'vi' ? partner.nameVi : partner.nameEn}
              </h4>
              {(partner.subVi || partner.subEn) && (
                <span className="text-[10px] text-slate-500 mt-1 line-clamp-1">
                  {language === 'vi' ? partner.subVi : partner.subEn}
                </span>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
