import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPumProjects } from '../../data/mockData';
import { MapPin, ArrowRight, CheckCircle2, Eye } from 'lucide-react';

interface PumFeaturedProjectsProps {
  onNavigate: (tab: string) => void;
  onSelectProject?: (project: typeof mockPumProjects[0]) => void;
}

export const PumFeaturedProjects: React.FC<PumFeaturedProjectsProps> = ({ onNavigate, onSelectProject }) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', labelVi: 'Tất cả dự án', labelEn: 'All Projects' },
    { id: 'healthcare', labelVi: 'Y tế cộng đồng', labelEn: 'Community Health' },
    { id: 'wellness', labelVi: 'Health & Wellness', labelEn: 'Health & Wellness' },
    { id: 'elderly', labelVi: 'Chăm sóc người cao tuổi', labelEn: 'Elderly Care' },
    { id: 'agriculture', labelVi: 'Kinh tế phụ trợ', labelEn: 'Auxiliary Economy' },
  ];

  const filteredProjects = selectedCategory === 'all'
    ? mockPumProjects
    : mockPumProjects.filter(p => p.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24 bg-[#F4F8F5] border-y border-pum-green/10">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-10 gap-6">
          <div>
            <span className="text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2 block">
              {language === 'vi' ? 'Thực chứng từ Living Lab' : 'Evidence from Living Lab'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? 'Dự án & Mô hình trọng điểm' : 'Key Projects & Living Lab Initiatives'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              {language === 'vi'
                ? 'Các dự án thực nghiệm gắn kết trực tiếp giữa đào tạo nhân lực, khám chữa bệnh cộng đồng và phát triển kinh tế xanh tại Bình Mỹ.'
                : 'Pioneering projects connecting workforce training, community healthcare, and green economy in Binh My.'}
            </p>
          </div>

          <button
            onClick={() => onNavigate('consulting')}
            className="inline-flex items-center gap-2 text-sm font-bold text-pum-green hover:text-pum-orange transition-colors self-start lg:self-auto"
          >
            <span>{language === 'vi' ? 'Xem toàn bộ 12 mô hình kinh tế' : 'Explore All 12 Economic Models'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? 'bg-pum-green text-white shadow-sm'
                    : 'bg-white text-slate-700 hover:bg-pum-lightGreen/50 border border-slate-200/80'
                }`}
              >
                {language === 'vi' ? cat.labelVi : cat.labelEn}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-white/95 backdrop-blur-md text-pum-green shadow-xs">
                      {language === 'vi' ? project.categoryName : project.categoryNameEn}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Location badge */}
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                    <MapPin className="w-3.5 h-3.5 text-pum-orange" />
                    <span>{project.location}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-snug mb-3">
                    {language === 'vi' ? project.title : project.titleEn}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed mb-4">
                    {language === 'vi' ? project.summary : project.summaryEn}
                  </p>

                  {/* Impact metrics tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.impactMetrics.map((metric, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-md bg-pum-lightGreen/40 text-pum-green border border-pum-green/15"
                      >
                        <CheckCircle2 className="w-3 h-3 text-pum-orange" />
                        {metric}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer action */}
              <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50/50">
                <span className="text-xs font-bold text-slate-500 group-hover:text-pum-green transition-colors">
                  {language === 'vi' ? 'Mô hình chuẩn hóa' : 'Standardized Model'}
                </span>
                <button
                  onClick={() => {
                    if (onSelectProject) {
                      onSelectProject(project);
                    } else {
                      onNavigate('consulting');
                    }
                  }}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-pum-green group-hover:text-pum-orange transition-colors"
                >
                  <span>{language === 'vi' ? 'Chi tiết' : 'Details'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
