import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockHealthModels } from '../data/mockData';
import { 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Leaf, 
  Palmtree, 
  Stethoscope, 
  HeartPulse,
  Sprout,
  Eye, 
  FileText 
} from 'lucide-react';

interface HealthModelsPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  initialPillar?: 'all' | 'health' | 'tourism' | 'agriculture';
}

export const HealthModelsPage: React.FC<HealthModelsPageProps> = ({ 
  onOpenCollaboration,
  initialPillar = 'all'
}) => {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState<string>('community-health');
  const [pillarFilter, setPillarFilter] = useState<'all' | 'health' | 'tourism' | 'agriculture'>(initialPillar);

  // Sync pillar filter when initialPillar prop changes
  React.useEffect(() => {
    if (initialPillar) {
      setPillarFilter(initialPillar);
    }
  }, [initialPillar]);

  const modelImages: Record<string, string> = {
    'community-health': '/assets/pum/hero_visual2-e1710851129461-1200x836.jpg',
    'elderly-care': '/assets/pum/AboutUs_headerphoto-1-e1710851068894-1200x788.jpg',
    'health-wellness': '/assets/pum/Uganda_Fruit_Vegetables_processing_006-e1706769474884-1200x771.jpg',
  };

  // Dynamic header content based on current pillar filter
  const getHeaderInfo = () => {
    if (pillarFilter === 'agriculture') {
      return {
        badgeVi: 'Trụ Cột Nông Nghiệp Sinh Thái & OCOP',
        badgeEn: 'Agro-Ecology & OCOP Pillar',
        badgeIcon: Sprout,
        badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
        titleVi: 'Trụ Cột Nông Nghiệp Tuần Hoàn – Công Nghệ Cao & Chuỗi Giá Trị OCOP',
        titleEn: 'Circular Agro-Ecology & OCOP Value Chain Pillar',
        descVi: 'Mô hình nông nghiệp tuần hoàn bền vững, bảo tồn vùng dược liệu sạch GACP-WHO, ứng dụng chuyển đổi số nông nghiệp và thương mại hóa sản phẩm OCOP Bình Mỹ Xanh kết nối chặt chẽ với Y tế và Du lịch sinh thái.',
        descEn: 'Sustainable circular agro-ecology, GACP-WHO medicinal herb farms, digital farming applications, and green OCOP value chain linked to healthcare and eco-tourism.'
      };
    }
    if (pillarFilter === 'tourism') {
      return {
        badgeVi: 'Trụ Cột Du Lịch Sinh Thái & Nghỉ Dưỡng',
        badgeEn: 'Eco-Tourism & Wellness Pillar',
        badgeIcon: Palmtree,
        badgeColor: 'bg-sky-100 text-sky-800 border-sky-300',
        titleVi: 'Trụ Cột Du Lịch Sinh Thái Miệt Vườn & Nghỉ Dưỡng Phục Hồi Wellness',
        titleEn: 'Agro-Tourism & Restorative Wellness Retreat Pillar',
        descVi: 'Khai thác cảnh quan ven sông trù phú Bình Mỹ, phát triển các tour du lịch sinh thái nông nghiệp, Wellness Farmstay và thưởng thức ẩm thực dưỡng sinh bản địa giúp tái tạo năng lượng thể chất và tinh thần.',
        descEn: 'Harnessing the serene riverside landscape of Binh My, developing agro-eco tours, wellness farmstay retreats, and healing cuisine to revitalize physical and mental wellness.'
      };
    }
    if (pillarFilter === 'health') {
      return {
        badgeVi: 'Trụ Cột Y Tế & Chăm Sóc Sức Khỏe Toàn Diện',
        badgeEn: 'Comprehensive Healthcare Pillar',
        badgeIcon: HeartPulse,
        badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-300',
        titleVi: 'Trụ Cột Y Tế Cộng Đồng, Lão Khoa & Health and Wellness',
        titleEn: 'Community Healthcare, Geriatric Care & Wellness Pillar',
        descVi: 'Hệ thống y tế tích hợp từ trạm y tế sàng lọc cơ sở, trung tâm chăm sóc bán trú ban ngày cho người cao tuổi đến mô hình phục hồi năng lượng và Living Lab công nghệ y tế số tiên phong.',
        descEn: 'Integrated healthcare ecosystem from grassroots screening, elderly daycare, and physical therapy to restorative wellness and pioneering digital health Living Lab.'
      };
    }
    return {
      badgeVi: 'Hệ Sinh Thái 3 Trụ Cột Đột Phá',
      badgeEn: '3-Pillar Integrated Ecosystem',
      badgeIcon: Leaf,
      badgeColor: 'bg-pum-lightGreen text-pum-green border-pum-green/20',
      titleVi: 'Ba Mô Hình Y Tế Kết Hợp Du Lịch & Nông Nghiệp',
      titleEn: 'Three Healthcare Models with Tourism & Agriculture',
      descVi: 'Mô hình tích hợp đa ngành tiên phong tại Bình Mỹ: Kết nối chặt chẽ giữa 3 trụ cột Y tế chuyên sâu – Du lịch nghỉ dưỡng phục hồi – Nông nghiệp sinh thái tuần hoàn & OCOP.',
      descEn: 'Pioneering tri-sector integrated model in Binh My: Interweaving Clinical Healthcare – Restorative Wellness Tourism – Sustainable Agro-Ecology & OCOP.'
    };
  };

  const headerInfo = getHeaderInfo();
  const BadgeIcon = headerInfo.badgeIcon;

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border ${headerInfo.badgeColor}`}>
            <BadgeIcon className="w-3.5 h-3.5" />
            <span>{language === 'vi' ? headerInfo.badgeVi : headerInfo.badgeEn}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight animate-fade-in">
            {language === 'vi' ? headerInfo.titleVi : headerInfo.titleEn}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed animate-fade-in">
            {language === 'vi' ? headerInfo.descVi : headerInfo.descEn}
          </p>
        </div>

        {/* 3-Pillar Highlight Filter Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs max-w-3xl mx-auto">
          <div className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            {language === 'vi' ? 'Xem nhanh theo góc nhìn 3 trụ cột' : 'View by 3 Core Pillars'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
            <button
              onClick={() => setPillarFilter('all')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                pillarFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Tất cả (3 Trụ cột)' : 'All 3 Pillars'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('health')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                pillarFilter === 'health'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-200/60'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Trụ cột Y tế' : 'Healthcare'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('tourism')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                pillarFilter === 'tourism'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100/70 border border-sky-200/60'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Trụ cột Du lịch' : 'Tourism'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('agriculture')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 ${
                pillarFilter === 'agriculture'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100/70 border border-amber-200/60'
              }`}
            >
              <Leaf className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Trụ cột Nông nghiệp' : 'Agriculture'}</span>
            </button>
          </div>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {mockHealthModels.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-pum-green text-white shadow-md'
                    : 'bg-white text-slate-700 hover:bg-pum-lightGreen/40 border border-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  isSelected ? 'bg-white text-pum-green' : 'bg-slate-100 text-slate-600'
                }`}>
                  {model.number}
                </span>
                <span>{model.title}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Detailed Healthcare Models Showcase */}
        <div className="space-y-12">
          {mockHealthModels.map((model) => {
            const imgSrc = modelImages[model.id] || model.image;
            const anyModel = model as any;
            const healthPoints = anyModel.healthAspects || model.functions;
            const tourismPoints = anyModel.tourismAspects || model.connections;
            const agriculturePoints = anyModel.agricultureAspects || model.connections;

            return (
              <div
                key={model.id}
                id={model.id}
                className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm transition-all duration-300 ${
                  selectedModel === model.id ? 'ring-2 ring-pum-green/50 shadow-xl' : ''
                }`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  
                  {/* Left Image & Overlay Badge */}
                  <div className="lg:col-span-4 relative min-h-[300px] lg:min-h-full">
                    <img
                      src={imgSrc}
                      alt={model.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/85 via-slate-900/35 to-transparent" />
                    <div className="absolute top-4 left-4 bg-pum-green/95 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      {model.badge}
                    </div>
                    <div className="absolute bottom-6 left-6 right-6 text-white">
                      <span className="text-3xl font-black text-pum-orange">{model.number}</span>
                      <h3 className="text-xl font-bold mt-1 text-white leading-snug">{model.title}</h3>
                      <p className="text-xs text-slate-200 mt-1 line-clamp-2">{model.tagline}</p>
                    </div>
                  </div>

                  {/* Right: Explicit 3-Pillar Breakdown (Y tế - Du lịch - Nông nghiệp) */}
                  <div className="lg:col-span-8 p-6 sm:p-8 space-y-5">
                    
                    {/* Pillar 1: Y tế */}
                    {(pillarFilter === 'all' || pillarFilter === 'health') && (
                      <div className="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-200/70 transition-all">
                        <h4 className="text-xs font-black uppercase tracking-wider text-emerald-800 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Stethoscope className="w-4 h-4 text-emerald-600" />
                            <span>{language === 'vi' ? 'Trụ cột 1: Chức Năng Y Tế & Chăm Sóc' : 'Pillar 1: Healthcare & Clinical Functions'}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-900">Y TẾ</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                          {healthPoints.map((fn: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-emerald-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{fn}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pillar 2: Du lịch */}
                    {(pillarFilter === 'all' || pillarFilter === 'tourism') && (
                      <div className="bg-sky-50/60 p-4 sm:p-5 rounded-2xl border border-sky-200/70 transition-all">
                        <h4 className="text-xs font-black uppercase tracking-wider text-sky-800 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Palmtree className="w-4 h-4 text-sky-600" />
                            <span>{language === 'vi' ? 'Trụ cột 2: Kết Nối Du Lịch & Nghỉ Dưỡng Wellness' : 'Pillar 2: Tourism & Wellness Integration'}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-200 text-sky-900">DU LỊCH</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                          {tourismPoints.map((conn: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-sky-100">
                              <Sparkles className="w-3.5 h-3.5 text-sky-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{conn}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Pillar 3: Nông nghiệp */}
                    {(pillarFilter === 'all' || pillarFilter === 'agriculture') && (
                      <div className="bg-amber-50/60 p-4 sm:p-5 rounded-2xl border border-amber-200/70 transition-all">
                        <h4 className="text-xs font-black uppercase tracking-wider text-amber-800 mb-2.5 flex items-center justify-between">
                          <span className="flex items-center gap-1.5">
                            <Leaf className="w-4 h-4 text-amber-600" />
                            <span>{language === 'vi' ? 'Trụ cột 3: Gắn Kết Nông Nghiệp Tuần Hoàn & OCOP' : 'Pillar 3: Agro-Ecology & OCOP Value Chain'}</span>
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">NÔNG NGHIỆP</span>
                        </h4>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-700">
                          {agriculturePoints.map((agri: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2 bg-white/80 p-2.5 rounded-xl border border-amber-100">
                              <CheckCircle2 className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                              <span className="leading-snug">{agri}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* 3 Action buttons per model as specified in rule s.md */}
                    <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap items-center gap-2.5">
                        <button
                          onClick={() => onOpenCollaboration('consulting', `Tìm hiểu dự án: ${model.title}`)}
                          className="px-5 py-2.5 rounded-full text-xs font-bold text-pum-green bg-pum-lightGreen/50 hover:bg-pum-lightGreen transition-all active:scale-95"
                        >
                          {language === 'vi' ? 'Tìm hiểu dự án' : 'Learn About Project'}
                        </button>
                        <button
                          onClick={() => onOpenCollaboration('training', `Đăng ký trải nghiệm: ${model.title}`)}
                          className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95"
                        >
                          {language === 'vi' ? 'Đăng ký trải nghiệm' : 'Book an Experience'}
                        </button>
                      </div>
                      <button
                        onClick={() => onOpenCollaboration('partner', `Hợp tác phát triển: ${model.title}`)}
                        className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-pum-orange hover:bg-pum-orangeHover transition-all active:scale-95 shadow-xs flex items-center gap-1.5"
                      >
                        <span>{language === 'vi' ? 'Hợp tác phát triển' : 'Co-Develop Model'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
