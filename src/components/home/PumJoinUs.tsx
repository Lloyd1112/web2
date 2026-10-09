import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPumJoinCards } from '../../data/mockData';
import { ArrowRight, Sparkles } from 'lucide-react';

interface PumJoinUsProps {
  onNavigate: (tab: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const PumJoinUs: React.FC<PumJoinUsProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();

  const handleCardClick = (card: typeof mockPumJoinCards[0]) => {
    if (card.actionType === 'partner') {
      onOpenCollaboration('partner', language === 'vi' ? 'Hợp tác Doanh nghiệp & 12 Mô hình Kinh tế' : 'Enterprise Partnership');
    } else {
      onNavigate(card.targetPage);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2">
              <Sparkles className="w-3.5 h-3.5 text-pum-orange" />
              {language === 'vi' ? 'Cơ hội đồng hành & phát triển' : 'Get Involved with Us'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? 'Đồng hành cùng Làng Sinh Viên' : 'Join Us Across the Ecosystem'}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-2xl">
              {language === 'vi'
                ? 'Dù bạn là học viên, chuyên gia y tế, nhà khoa học hay doanh nghiệp, luôn có một vị trí dành riêng cho bạn trong chuỗi giá trị đổi mới sáng tạo.'
                : 'Whether you are a student, medical specialist, researcher or enterprise, there is a dedicated pathway for you to create sustainable impact.'}
            </p>
          </div>
        </div>

        {/* 3 Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {mockPumJoinCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className="group cursor-pointer flex flex-col bg-[#F8FAF9] rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image with zoom effect */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={card.image}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-pum-green shadow-xs">
                    {language === 'vi' ? card.tag : card.tagEn}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-snug mb-3">
                    {language === 'vi' ? card.title : card.titleEn}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed">
                    {language === 'vi' ? card.description : card.descriptionEn}
                  </p>
                </div>

                {/* Card CTA */}
                <div className="mt-6 pt-5 border-t border-slate-200/80 flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-pum-green group-hover:text-pum-orange transition-colors">
                    {language === 'vi' ? card.ctaText : card.ctaTextEn}
                  </span>
                  <div className="w-9 h-9 rounded-full bg-white border border-slate-200 text-pum-green group-hover:bg-pum-orange group-hover:text-white group-hover:border-pum-orange flex items-center justify-center transition-all shadow-2xs">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
