import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockHealthModels } from '../data/mockData';
import { AdminDataService, AdminProject } from '../services/adminDataService';
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
  FileText,
  X,
  Building2,
  MapPin,
  Clock,
  FolderOpen,
  Layers,
  Lightbulb,
  ExternalLink
} from 'lucide-react';

interface HealthModelsPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  initialPillar?: 'all' | 'health' | 'tourism' | 'agriculture' | 'innovation';
}

export const HealthModelsPage: React.FC<HealthModelsPageProps> = ({ 
  onOpenCollaboration,
  initialPillar = 'all'
}) => {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState<string>('community-health');
  const [pillarFilter, setPillarFilter] = useState<'all' | 'health' | 'tourism' | 'agriculture' | 'innovation'>(initialPillar);
  const [selectedProject, setSelectedProject] = useState<AdminProject | null>(null);
  const [dataVersion, setDataVersion] = useState<number>(0);

  // Lắng nghe sự kiện thay đổi dữ liệu từ Web Admin (thêm, sửa, xóa, xuất bản)
  useEffect(() => {
    const unsubscribe = AdminDataService.subscribe(() => {
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  // Đồng bộ bộ lọc khi prop initialPillar thay đổi từ thanh điều hướng Header
  useEffect(() => {
    if (initialPillar) {
      setPillarFilter(initialPillar);
    }
  }, [initialPillar]);

  // Lấy danh sách dự án xuất bản công khai từ AdminDataService, lọc theo trụ cột đang chọn
  const filteredProjects = useMemo(() => {
    const allProjects = AdminDataService.getProjects();
    const published = allProjects.filter(p => p.publishStatus === 'published');
    
    if (pillarFilter === 'all') {
      return published;
    }
    if (pillarFilter === 'agriculture') {
      return published.filter(p => p.category === 'agriculture' || p.category === 'agro');
    }
    if (pillarFilter === 'health') {
      return published.filter(p => p.category === 'health' || p.category === 'healthcare' || p.category === 'wellness' || p.category === 'elderly');
    }
    if (pillarFilter === 'tourism') {
      return published.filter(p => p.category === 'tourism' || p.category === 'tour');
    }
    if (pillarFilter === 'innovation') {
      return published.filter(p => p.category === 'innovation' || p.category === 'tech' || p.category === 'technology' || p.category === 'environment');
    }
    return published.filter(p => p.category === pillarFilter);
  }, [pillarFilter, dataVersion]);

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
    if (pillarFilter === 'innovation') {
      return {
        badgeVi: 'Trụ Cột Đổi Mới Sáng Tạo & Công Nghệ',
        badgeEn: 'Innovation & Tech Pillar',
        badgeIcon: Lightbulb,
        badgeColor: 'bg-purple-100 text-purple-800 border-purple-300',
        titleVi: 'Trụ Cột Đổi Mới Sáng Tạo, Năng Lượng Xanh & Chuyển Đổi Số',
        titleEn: 'Innovation, Green Energy & Digital Transformation Pillar',
        descVi: 'Ứng dụng các sáng kiến công nghệ số, chuyển đổi số nông thôn, năng lượng tái tạo thông minh và giải pháp bảo vệ môi trường sinh thái bền vững tại Bình Mỹ.',
        descEn: 'Pioneering smart digital solutions, green renewable energy, and environmental sustainability in rural Binh My.'
      };
    }
    return {
      badgeVi: 'Hệ Sinh Thái Dự Án & 3 Trụ Cột Đột Phá',
      badgeEn: '3-Pillar & Innovation Project Ecosystem',
      badgeIcon: Leaf,
      badgeColor: 'bg-pum-lightGreen text-pum-green border-pum-green/20',
      titleVi: 'Hệ Thống Dự Án Triển Khai & Mô Hình Tích Hợp',
      titleEn: 'Real-World Projects & Integrated Ecosystem Models',
      descVi: 'Mô hình tích hợp đa ngành tiên phong tại Bình Mỹ: Kết nối chặt chẽ giữa 3 trụ cột Y tế chuyên sâu – Du lịch nghỉ dưỡng phục hồi – Nông nghiệp sinh thái tuần hoàn & Đổi mới sáng tạo.',
      descEn: 'Pioneering tri-sector integrated model in Binh My: Interweaving Clinical Healthcare – Restorative Wellness Tourism – Sustainable Agro-Ecology & Innovation.'
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

        {/* 3-Pillar & Innovation Highlight Filter Toolbar */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/90 shadow-xs max-w-4xl mx-auto">
          <div className="text-center text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
            {language === 'vi' ? 'Xem dự án & mô hình theo lĩnh vực' : 'Filter Projects & Models by Pillar'}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-2.5">
            <button
              onClick={() => setPillarFilter('all')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                pillarFilter === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Tất cả lĩnh vực' : 'All Pillars'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('agriculture')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                pillarFilter === 'agriculture'
                  ? 'bg-amber-600 text-white shadow-xs'
                  : 'bg-amber-50 text-amber-700 hover:bg-amber-100/70 border border-amber-200/60'
              }`}
            >
              <Sprout className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Nông nghiệp' : 'Agriculture'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('health')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                pillarFilter === 'health'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100/70 border border-emerald-200/60'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Y tế & Sức khỏe' : 'Healthcare'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('tourism')}
              className={`py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                pillarFilter === 'tourism'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-sky-50 text-sky-700 hover:bg-sky-100/70 border border-sky-200/60'
              }`}
            >
              <Palmtree className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Du lịch sinh thái' : 'Tourism'}</span>
            </button>
            <button
              onClick={() => setPillarFilter('innovation')}
              className={`col-span-2 sm:col-span-1 py-2.5 px-3 rounded-2xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1.5 cursor-pointer ${
                pillarFilter === 'innovation'
                  ? 'bg-purple-600 text-white shadow-xs'
                  : 'bg-purple-50 text-purple-700 hover:bg-purple-100/70 border border-purple-200/60'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Đổi mới sáng tạo' : 'Innovation'}</span>
            </button>
          </div>
        </div>

        {/* ================= PHẦN 1: CÁC DỰ ÁN TRIỂN KHAI THỰC TẾ (ĐỒNG BỘ WEB ADMIN) ================= */}
        <section className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 border-b border-slate-200/80 pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800">
                  {language === 'vi' ? 'Đồng bộ trực tiếp hệ thống' : 'Live Synced Projects'}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {language === 'vi' ? 'Dự Án Đổi Mới Sáng Tạo Triển Khai Thực Tế' : 'Active Real-World Projects'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                {language === 'vi'
                  ? 'Các dự án công nghệ, giải pháp thực tế đang được ươm tạo và chuyển giao tại Bình Mỹ (được cập nhật trực tiếp từ hệ thống quản trị)'
                  : 'Innovative technology projects and practical solutions incubated in Binh My, synced directly with Web Admin.'}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold whitespace-nowrap shadow-2xs">
                {language === 'vi' 
                  ? `Hiện có: ${filteredProjects.length} dự án công khai` 
                  : `${filteredProjects.length} published projects`}
              </span>
            </div>
          </div>

          {/* Lưới danh sách dự án đồng bộ */}
          {filteredProjects.length === 0 ? (
            <div className="bg-white rounded-3xl border border-dashed border-slate-300 p-8 sm:p-12 text-center space-y-4 max-w-2xl mx-auto shadow-xs">
              <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                <FolderOpen className="w-7 h-7" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-slate-800">
                  {language === 'vi' ? 'Chưa có dự án nào trong danh mục này' : 'No projects found in this category'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
                  {language === 'vi'
                    ? 'Các dự án đang được chuẩn bị hoặc đã được điều chỉnh trong hệ thống quản trị. Bạn có thể chọn xem tất cả hoặc gửi đề xuất dự án mới.'
                    : 'Projects are currently being prepared in the admin system. You can switch to All or submit a new project proposal.'}
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setPillarFilter('all')}
                  className="px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  {language === 'vi' ? 'Xem tất cả dự án' : 'View all projects'}
                </button>
                <button
                  onClick={() => onOpenCollaboration('consulting', 'Đề xuất dự án đổi mới sáng tạo mới')}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors cursor-pointer"
                >
                  {language === 'vi' ? 'Đề xuất dự án mới' : 'Propose new project'}
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProjects.map((project, idx) => {
                const fallbackImgs = [
                  '/assets/problems/card1.jpg',
                  '/assets/problems/home_card3.jpg',
                  '/assets/problems/card2.jpg',
                  '/assets/problems/proj_4.jpg'
                ];
                const pImg = project.thumbnail || fallbackImgs[idx % 4];

                return (
                  <div 
                    key={project.id}
                    onClick={() => setSelectedProject(project)}
                    className="bg-white rounded-3xl border border-slate-200/90 overflow-hidden hover:shadow-xl hover:border-emerald-300 transition-all duration-300 flex flex-col group cursor-pointer hover:-translate-y-1"
                  >
                    {/* Thumbnail */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img
                        src={pImg}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = fallbackImgs[idx % 4];
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                      {/* Mã dự án & Trạng thái triển khai */}
                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-lg text-[10.5px] font-black bg-slate-900/85 backdrop-blur-xs text-white border border-white/20 shadow-xs">
                          {project.code}
                        </span>
                        <span className={`px-2.5 py-1 rounded-lg text-[10.5px] font-bold text-white shadow-xs ${
                          project.status === 'in_progress'
                            ? 'bg-emerald-600'
                            : project.status === 'testing'
                              ? 'bg-purple-600'
                              : project.status === 'seeking_resources'
                                ? 'bg-amber-600'
                                : 'bg-teal-700'
                        }`}>
                          {project.status === 'in_progress' 
                            ? (language === 'vi' ? 'Đang triển khai' : 'In Progress') 
                            : (project.status === 'testing' 
                                ? (language === 'vi' ? 'Đang thử nghiệm' : 'Testing') 
                                : (project.status === 'seeking_resources'
                                    ? (language === 'vi' ? 'Tìm nguồn lực' : 'Seeking Resources')
                                    : (language === 'vi' ? 'Đã triển khai' : 'Completed')))}
                        </span>
                      </div>

                      {/* Lĩnh vực / Trụ cột */}
                      <div className="absolute bottom-3 left-3">
                        <span className="px-2.5 py-1 rounded-md text-[10.5px] font-bold bg-white/95 backdrop-blur-xs text-emerald-800 shadow-xs">
                          {project.categoryName || 'Dự án trọng điểm'}
                        </span>
                      </div>
                    </div>

                    {/* Nội dung card */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-emerald-700 transition-colors line-clamp-2">
                          {language === 'vi' ? project.title : (project.titleEn || project.title)}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                          {language === 'vi' ? project.summary : (project.summaryEn || project.summary)}
                        </p>

                        {/* Bài toán nguồn liên kết */}
                        {project.problemTitle && (
                          <div className="pt-1.5">
                            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200/60 text-[11px] text-emerald-800 font-medium">
                              <Sparkles className="w-3 h-3 text-emerald-600 shrink-0" />
                              <span className="truncate max-w-[210px]" title={project.problemTitle}>
                                {language === 'vi' ? `Bài toán: ${project.problemTitle}` : `Problem: ${project.problemTitle}`}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Đơn vị & Nút bấm thao tác */}
                      <div className="space-y-3 pt-3 border-t border-slate-100">
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <div className="flex items-center gap-1.5 truncate max-w-[170px]" title={project.organization}>
                            <Building2 className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span className="truncate font-medium">{project.organization}</span>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" />
                            <span>{project.location || 'Bình Mỹ'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 pt-1">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProject(project);
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all text-center flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <Eye className="w-3.5 h-3.5 text-slate-500" />
                            <span>{language === 'vi' ? 'Xem chi tiết' : 'Details'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              onOpenCollaboration('project', project.title);
                            }}
                            className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all text-center flex items-center justify-center gap-1 shadow-xs cursor-pointer active:scale-95"
                          >
                            <HeartHandshake className="w-3.5 h-3.5 text-white" />
                            <span>{language === 'vi' ? 'Hợp tác' : 'Partner'}</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ================= PHẦN 2: 3 MÔ HÌNH TÍCH HỢP TRỌNG ĐIỂM (KIẾN TRÚC LIVING LAB) ================= */}
        <section className="space-y-8 pt-8 border-t border-slate-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold text-emerald-800 bg-emerald-100/70 border border-emerald-300">
              <Layers className="w-3.5 h-3.5" />
              <span>{language === 'vi' ? 'Khung Kiến Trúc Tổng Thể' : 'Architectural Framework'}</span>
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              {language === 'vi' ? '3 Mô Hình Tích Hợp Đột Phá Tại Bình Mỹ' : 'Three Landmark Integrated Models'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              {language === 'vi'
                ? 'Ba trụ cột liên kết hữu cơ cấu thành hệ sinh thái Living Lab Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ'
                : 'The fundamental multi-sector pillars that power the Binh My Student Living Lab.'}
            </p>
          </div>

          {/* Model Selector Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {mockHealthModels.map((model) => {
              const isSelected = selectedModel === model.id;
              return (
                <button
                  key={model.id}
                  onClick={() => setSelectedModel(model.id)}
                  className={`px-5 py-3 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 cursor-pointer ${
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

                      {/* 3 Action buttons per model */}
                      <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap items-center gap-2.5">
                          <button
                            onClick={() => onOpenCollaboration('consulting', `Tìm hiểu mô hình: ${model.title}`)}
                            className="px-5 py-2.5 rounded-full text-xs font-bold text-pum-green bg-pum-lightGreen/50 hover:bg-pum-lightGreen transition-all active:scale-95 cursor-pointer"
                          >
                            {language === 'vi' ? 'Tìm hiểu mô hình' : 'Learn About Model'}
                          </button>
                          <button
                            onClick={() => onOpenCollaboration('training', `Đăng ký trải nghiệm: ${model.title}`)}
                            className="px-5 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 cursor-pointer"
                          >
                            {language === 'vi' ? 'Đăng ký trải nghiệm' : 'Book an Experience'}
                          </button>
                        </div>
                        <button
                          onClick={() => onOpenCollaboration('partner', `Hợp tác phát triển: ${model.title}`)}
                          className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-pum-orange hover:bg-pum-orangeHover transition-all active:scale-95 shadow-xs flex items-center gap-1.5 cursor-pointer"
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
        </section>

      </div>

      {/* ================= MODAL CHI TIẾT DỰ ÁN THỰC TẾ ================= */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 bg-gradient-to-r from-emerald-700 to-teal-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-white/20 text-emerald-100">
                  {selectedProject.code}
                </span>
                <span className="text-xs font-semibold text-emerald-200">
                  {selectedProject.categoryName || 'Dự án Làng Sinh Viên'}
                </span>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 overflow-y-auto space-y-5 flex-1 text-slate-700">
              {/* Image & Title */}
              <div className="space-y-3">
                <div className="h-48 sm:h-56 w-full rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={selectedProject.thumbnail || '/assets/problems/card1.jpg'}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {language === 'vi' ? selectedProject.title : (selectedProject.titleEn || selectedProject.title)}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {language === 'vi' ? selectedProject.summary : (selectedProject.summaryEn || selectedProject.summary)}
                </p>
              </div>

              {/* Linked Real Problem (if any) */}
              {selectedProject.problemTitle && (
                <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Bài toán thực tế nguồn:</span>
                    </div>
                  </div>
                  <p className="text-xs text-amber-800 font-medium">
                    {selectedProject.problemTitle}
                  </p>
                </div>
              )}

              {/* Organization & Location */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Đơn vị thực hiện:</span>
                  <p className="font-bold text-slate-800">{selectedProject.organization || 'Ban Dự án Làng Sinh Viên'}</p>
                </div>
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-0.5">
                  <span className="text-[11px] text-slate-400 font-semibold">Địa bàn triển khai:</span>
                  <p className="font-bold text-slate-800">{selectedProject.location || 'Bình Mỹ, Củ Chi'}</p>
                </div>
              </div>

              {/* Participating Partners (if any) */}
              {selectedProject.partnerIds && selectedProject.partnerIds.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Đối tác liên kết tham gia:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.partnerIds.map(pId => {
                      const partner = AdminDataService.getPartnerById(pId);
                      if (!partner) return null;
                      return (
                        <div key={pId} className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200 text-xs">
                          {partner.logoUrl && <img src={partner.logoUrl} alt={partner.nameVi} className="w-5 h-5 object-contain" />}
                          <span className="font-medium text-slate-800">{language === 'vi' ? partner.nameVi : (partner.nameEn || partner.nameVi)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Detailed Content */}
              {selectedProject.content && (
                <div className="space-y-1.5">
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Nội dung chi tiết dự án:</h4>
                  <p className="text-xs leading-relaxed text-slate-600 whitespace-pre-line">
                    {selectedProject.content}
                  </p>
                </div>
              )}

              {/* Expected Outcomes */}
              {selectedProject.expectedOutcomes && (
                <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200/60 space-y-1">
                  <span className="text-[11px] font-bold text-emerald-900 uppercase tracking-wider">Kết quả kỳ vọng:</span>
                  <p className="text-xs text-emerald-800">{selectedProject.expectedOutcomes}</p>
                </div>
              )}
            </div>

            {/* Footer action buttons */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Đóng
              </button>
              <button
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  onOpenCollaboration('project', title);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-md shadow-emerald-900/10 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <HeartHandshake className="w-4 h-4" />
                <span>Đề xuất hợp tác cho dự án này</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
