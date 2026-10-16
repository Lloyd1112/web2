import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem } from '../../types';
import { AdminDataService, AdminProposal } from '../../services/adminDataService';
import { 
  Home, 
  ChevronRight, 
  Check, 
  User, 
  MapPin, 
  Calendar, 
  Sprout, 
  HeartHandshake, 
  Palmtree, 
  MoreHorizontal,
  Phone,
  Eye,
  Heart,
  Send,
  FileText,
  Settings,
  Lightbulb,
  Target,
  Users,
  Image as ImageIcon,
  FileCode,
  Download,
  Share2,
  X,
  Clock,
  ArrowRight
} from 'lucide-react';

interface ProblemDetailViewProps {
  problem: RealProblem & { isSampleData?: boolean };
  allProblems: (RealProblem & { isSampleData?: boolean })[];
  onBackToList: () => void;
  onSelectProblem: (problem: RealProblem) => void;
  onOpenProposeSolution: (problem: RealProblem) => void;
}

export const ProblemDetailView: React.FC<ProblemDetailViewProps> = ({
  problem,
  allProblems,
  onBackToList,
  onSelectProblem,
  onOpenProposeSolution
}) => {
  const { language } = useLanguage();

  // Gallery state
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'detail' | 'evidence' | 'docs' | 'proposals'>('detail');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Lấy và đồng bộ lượt xem, lượt quan tâm và đề xuất thực tế
  const [stats, setStats] = useState(() => AdminDataService.getProblemStats(problem.id));
  const [isInterested, setIsInterested] = useState(() => AdminDataService.isProblemInterested(problem.id));
  const [proposalsList, setProposalsList] = useState<AdminProposal[]>(() => AdminDataService.getProposalsByProblemId(problem.id));

  React.useEffect(() => {
    // Tăng lượt xem thực tế khi mở xem bài toán
    const updated = AdminDataService.incrementProblemViews(problem.id);
    setStats(updated);
    setIsInterested(AdminDataService.isProblemInterested(problem.id));
    setProposalsList(AdminDataService.getProposalsByProblemId(problem.id));

    // Lắng nghe đồng bộ real-time
    const unsubscribe = AdminDataService.subscribe(() => {
      setStats(AdminDataService.getProblemStats(problem.id));
      setIsInterested(AdminDataService.isProblemInterested(problem.id));
      setProposalsList(AdminDataService.getProposalsByProblemId(problem.id));
    });
    return unsubscribe;
  }, [problem.id]);

  // Danh sách hình ảnh thực tế của bài toán
  const images = (problem.images && problem.images.length > 0)
    ? problem.images
    : ['/assets/problems/home_card1.jpg'];

  const currentImage = images[activeImageIndex] || images[0];

  // Helper icon lĩnh vực
  const getCategoryInfo = (cat: string) => {
    switch (cat) {
      case 'agriculture':
        return { text: language === 'vi' ? 'Nông nghiệp' : 'Agriculture', icon: Sprout, color: 'text-emerald-700' };
      case 'health':
        return { text: language === 'vi' ? 'Y tế' : 'Healthcare', icon: HeartHandshake, color: 'text-rose-600' };
      case 'tourism':
        return { text: language === 'vi' ? 'Du lịch' : 'Tourism', icon: Palmtree, color: 'text-teal-600' };
      default:
        return { text: language === 'vi' ? 'Khác' : 'Other', icon: MoreHorizontal, color: 'text-slate-600' };
    }
  };

  const catInfo = getCategoryInfo(problem.category);
  const CatIcon = catInfo.icon;

  // Xử lý địa chỉ đồng bộ không trùng lặp Củ Chi
  const cleanLocation = (() => {
    const raw = (language === 'en' && problem.locationEn) ? problem.locationEn : (problem.location || '');
    if (!raw) return language === 'vi' ? 'Xã Bình Mỹ, Củ Chi, TP.HCM' : 'Binh My Commune, Cu Chi, HCMC';
    const lower = raw.toLowerCase();
    if (lower.includes('củ chi') || lower.includes('cu chi') || lower.includes('tphcm') || lower.includes('hcmc') || lower.includes('tp.hcm')) {
      return raw;
    }
    return language === 'vi' ? `${raw}, Củ Chi, TP.HCM` : `${raw}, Cu Chi, HCMC`;
  })();

  const displayTitle = (language === 'en' && problem.titleEn) ? problem.titleEn : problem.title;
  const displayDescription = (language === 'en' && problem.descriptionEn) ? problem.descriptionEn : problem.description;
  const displayLocation = (language === 'en' && problem.locationEn) ? problem.locationEn : cleanLocation;

  // Lọc 3 bài toán tương tự
  const similarProblems = allProblems
    .filter(p => p.id !== problem.id)
    .slice(0, 3);

  // Phân tích danh sách nguyên nhân
  const causeList: string[] = (language === 'en' && problem.causeEn)
    ? problem.causeEn.split(';').map((s: string) => s.trim()).filter(Boolean)
    : problem.cause
    ? problem.cause.split(';').map((s: string) => s.trim()).filter(Boolean)
    : (language === 'vi' ? [
        'Thiếu công nghệ và phương pháp tiếp cận mới.',
        'Hạn chế về nguồn lực cơ sở vật chất và chuyển giao kỹ thuật.',
        'Chưa kết nối được chuỗi tiêu thụ và hỗ trợ chuyên gia.'
      ] : [
        'Lack of modern technology and innovative approach.',
        'Limited equipment and technical transfer capabilities.',
        'Unconnected to specialized experts and distribution chains.'
      ]);

  // Phân tích danh sách giải pháp đã thử
  const triedSolutionsList: string[] = (language === 'en' && problem.triedSolutionsEn)
    ? problem.triedSolutionsEn.split(';').map((s: string) => s.trim()).filter(Boolean)
    : problem.triedSolutions
    ? problem.triedSolutions.split(';').map((s: string) => s.trim()).filter(Boolean)
    : (language === 'vi' ? [
        'Tự khắc phục bằng biện pháp thủ công truyền thống nhưng chưa hiệu quả.',
        'Tìm kiếm hỗ trợ từ mạng lưới người quen địa phương.'
      ] : [
        'Attempted traditional manual fixes with limited results.',
        'Sought advice from local informal connections.'
      ]);

  // Danh sách ảnh minh chứng thực tế có caption đồng bộ
  const evidenceImages = images.map((imgSrc, idx) => ({
    src: imgSrc,
    caption: idx === 0
      ? ((language === 'en' && problem.imageDescriptionEn) 
          ? problem.imageDescriptionEn 
          : (problem.imageDescription || (language === 'vi' ? 'Ảnh chụp thực tế minh chứng bài toán' : 'Field evidence photo')))
      : (language === 'vi' ? `Ảnh minh chứng ${idx + 1}` : `Evidence photo ${idx + 1}`)
  }));

  return (
    <div className="w-full bg-[#f8fafc] py-5 sm:py-7 lg:py-9 min-h-screen text-slate-800 animate-fade-in">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

        {/* ================= 1. BREADCRUMBS ================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 font-medium">
          <button
            onClick={onBackToList}
            className="flex items-center gap-1 hover:text-[#00875a] transition-colors cursor-pointer"
            title={language === 'vi' ? "Quay lại danh sách" : "Back to problem bank"}
          >
            <Home className="w-4 h-4 text-slate-400" />
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <button
            onClick={onBackToList}
            className="hover:text-[#00875a] transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'Bài toán thực tế' : 'Real-World Problems'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span className="text-slate-800 font-semibold truncate max-w-xs sm:max-w-md">
            {language === 'vi' ? 'Chi tiết bài toán' : 'Problem Details'}
          </span>
        </nav>

        {/* ================= 2. BỐ CỤC 2 CỘT CHÍNH ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================= CỘT TRÁI (CHÍNH - 8 CỘT) ================= */}
          <div className="lg:col-span-8 space-y-6">

            {/* THẺ TỔNG QUAN BÀI TOÁN (CARD TRÊN CÙNG) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                
                {/* GALLERY ẢNH BÊN TRÁI */}
                <div className="md:col-span-6 space-y-2.5">
                  {/* Ảnh chính lớn */}
                  <div 
                    onClick={() => setLightboxImage(currentImage)}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 cursor-zoom-in group shadow-2xs"
                  >
                    <img 
                      src={currentImage} 
                      alt={displayTitle}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Hàng ảnh nhỏ (Thumbnails) chỉ hiển thị nếu có nhiều hơn 1 ảnh */}
                  {images.length > 1 && (
                    <div className="grid grid-cols-4 gap-2">
                      {images.slice(0, images.length > 4 ? 3 : 4).map((img, idx) => (
                        <div
                          key={idx}
                          onClick={() => setActiveImageIndex(idx)}
                          className={`aspect-square rounded-lg overflow-hidden border-2 cursor-pointer transition-all shadow-2xs ${
                            activeImageIndex === idx 
                              ? 'border-[#00875a] ring-2 ring-emerald-100' 
                              : 'border-transparent hover:border-slate-300'
                          }`}
                        >
                          <img src={img} alt="thumb" className="w-full h-full object-cover" />
                        </div>
                      ))}

                      {/* Ô xem thêm ảnh chỉ hiện nếu thực tế có nhiều hơn 4 ảnh */}
                      {images.length > 4 && (
                        <div
                          onClick={() => setLightboxImage(images[images.length - 1] || currentImage)}
                          className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 cursor-pointer group shadow-2xs"
                        >
                          <img 
                            src={images[3]} 
                            alt="more" 
                            className="w-full h-full object-cover brightness-50"
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform">
                            +{images.length - 3}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* THÔNG TIN BÀI TOÁN BÊN PHẢI */}
                <div className="md:col-span-6 flex flex-col justify-between h-full space-y-3.5">
                  <div className="space-y-2.5">
                    
                    {/* Badge Trạng thái góc trên */}
                    <div>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-[#00875a] text-white shadow-2xs">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>{language === 'vi' ? 'Đã xác minh' : 'Verified'}</span>
                      </span>
                    </div>

                    {/* Tiêu đề bài toán lớn */}
                    <h1 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                      {displayTitle}
                    </h1>

                    {/* Người đăng */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span>{problem.organizationName || problem.contactName}</span>
                    </div>

                    {/* Lĩnh vực & Địa điểm */}
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <span className="flex items-center gap-1.5">
                        <CatIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{catInfo.text}</span>
                      </span>
                      <span className="flex items-center gap-1.5 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                        <span>{displayLocation}</span>
                      </span>
                    </div>

                    {/* Ngày đăng */}
                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>{problem.createdAt}</span>
                    </div>

                    {/* Đoạn mô tả vắn tắt */}
                    <p className="text-xs text-slate-600 leading-relaxed pt-1">
                      {displayDescription}
                    </p>

                  </div>

                  {/* Thanh hành động dưới cùng của Card */}
                  <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                    <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl">
                      <span>{language === 'vi' ? 'Trạng thái:' : 'Status:'}</span>
                      <span className="font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-600" />
                        {language === 'vi' ? 'Đã xác minh' : 'Verified'}
                      </span>
                    </span>

                    <button
                      onClick={() => onOpenProposeSolution(problem)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer active:scale-98"
                    >
                      <Users className="w-4 h-4" />
                      <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Propose Collaboration'}</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>

            {/* THẺ NỘI DUNG CHI TIẾT (TABS + 5 MỤC CHI TIẾT) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              
              {/* THANH TABS */}
              <div className="flex items-center border-b border-slate-100 px-5 overflow-x-auto">
                {[
                  { id: 'detail', label: language === 'vi' ? 'Thông tin chi tiết' : 'Detailed Information' },
                  { id: 'evidence', label: language === 'vi' ? `Ảnh minh chứng (${evidenceImages.length})` : `Evidence Photos (${evidenceImages.length})` },
                  { id: 'docs', label: language === 'vi' ? (problem.evidenceDocName ? 'Tài liệu (1)' : 'Tài liệu (0)') : (problem.evidenceDocName ? 'Documents (1)' : 'Documents (0)') },
                  { id: 'proposals', label: language === 'vi' ? `Đề xuất tham gia (${proposalsList.length})` : `Proposals (${proposalsList.length})` }
                ].map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`py-3.5 px-4 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap border-b-2 cursor-pointer ${
                      activeTab === tab.id
                        ? 'border-[#00875a] text-[#00875a]'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* NỘI DUNG TAB */}
              <div className="p-5 sm:p-6 space-y-6">

                {/* ================= TAB 1: THÔNG TIN CHI TIẾT ================= */}
                {activeTab === 'detail' && (
                  <div className="space-y-6 animate-fade-in">
                    {/* MỤC 1: MÔ TẢ VẤN ĐỀ */}
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00875a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          1
                        </span>
                        <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {language === 'vi' ? 'Mô tả vấn đề' : 'Problem Description'}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed pl-7">
                        {displayDescription || (language === 'vi' 
                          ? 'Hiện tại, sản phẩm nông sản của gia đình chủ yếu được tiêu thụ qua thương lái hoặc bán trực tiếp tại chợ địa phương. Chúng tôi gặp khó khăn trong việc quảng bá sản phẩm, tiếp cận khách hàng mới và mở rộng thị trường, đặc biệt là kênh bán hàng trực tuyến.' 
                          : 'Currently, agricultural produce is sold mainly through local traders or at the village market. We face challenges in marketing, customer acquisition, and market expansion, especially online sales channels.')}
                      </p>
                    </div>

                    {/* MỤC 2: NGUYÊN NHÂN */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00875a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          2
                        </span>
                        <Settings className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {language === 'vi' ? 'Nguyên nhân' : 'Root Causes'}
                        </h3>
                      </div>
                      <ul className="text-xs sm:text-[13px] text-slate-600 space-y-1.5 pl-7">
                        {causeList.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MỤC 3: GIẢI PHÁP ĐÃ THỬ */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00875a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          3
                        </span>
                        <Lightbulb className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {language === 'vi' ? 'Giải pháp đã thử' : 'Tried Solutions'}
                        </h3>
                      </div>
                      <ul className="text-xs sm:text-[13px] text-slate-600 space-y-1.5 pl-7">
                        {triedSolutionsList.map((item: string, idx: number) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="text-slate-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* MỤC 4: KẾT QUẢ MONG MUỐN */}
                    <div className="space-y-2 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00875a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          4
                        </span>
                        <Target className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {language === 'vi' ? 'Kết quả mong muốn' : 'Desired Outcome'}
                        </h3>
                      </div>
                      <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed pl-7">
                        {(language === 'en' && problem.desiredOutcomeEn)
                          ? problem.desiredOutcomeEn
                          : (problem.desiredOutcome || (language === 'vi' 
                            ? 'Tìm được giải pháp quảng bá nông sản hiệu quả, có thể tiếp cận nhiều khách hàng hơn, tăng doanh thu và mở rộng thị trường tiêu thụ. Mong muốn được hỗ trợ về marketing, công nghệ và thiết kế kênh bán hàng trực tuyến.' 
                            : 'Establish an effective produce promotion strategy to reach more customers, increase revenue, and expand market access with online storefront and marketing guidance.'))}
                      </p>
                    </div>

                    {/* MỤC 5: NGUỒN LỰC CẦN HỖ TRỢ */}
                    <div className="space-y-3 pt-2 border-t border-slate-100">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#00875a] text-white text-[11px] font-bold flex items-center justify-center shrink-0">
                          5
                        </span>
                        <Users className="w-4 h-4 text-emerald-700 shrink-0" />
                        <h3 className="text-sm font-bold text-slate-900">
                          {language === 'vi' ? 'Nguồn lực cần hỗ trợ' : 'Support Needed'}
                        </h3>
                      </div>
                      <div className="flex flex-wrap gap-2 pl-7">
                        {((problem.supportNeeded && problem.supportNeeded.length > 0)
                          ? problem.supportNeeded.map(tag => {
                              if (language === 'vi') return tag;
                              if (tag.includes('Công nghệ') || tag.includes('CNTT')) return 'Technology / IT';
                              if (tag.includes('Marketing') || tag.includes('Truyền thông')) return 'Marketing / Communications';
                              if (tag.includes('Thiết kế')) return 'Design & Packaging';
                              if (tag.includes('Kinh doanh')) return 'Business Development';
                              if (tag.includes('Nghiên cứu')) return 'Research & Survey';
                              if (tag.includes('Y tế')) return 'Medical Support';
                              if (tag.includes('Du lịch')) return 'Tourism Support';
                              if (tag.includes('Tài chính')) return 'Financial Planning';
                              return tag;
                            })
                          : (language === 'vi' 
                              ? ['Marketing / Truyền thông', 'Thiết kế', 'Công nghệ / CNTT', 'Kinh doanh / Phát triển thị trường']
                              : ['Marketing / Communications', 'Design & Packaging', 'Technology / IT', 'Business Development'])
                        ).map((tag, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#0284c7] bg-[#f0f7fe] border border-sky-100 shadow-2xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* PHẦN RÚT GỌN: HÌNH ẢNH MINH CHỨNG */}
                    <div className="pt-4 border-t border-slate-100 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                          <ImageIcon className="w-4 h-4 text-slate-500" />
                          <span>{language === 'vi' ? `Hình ảnh minh chứng (${evidenceImages.length})` : `Evidence Photos (${evidenceImages.length})`}</span>
                        </div>
                        <button
                          onClick={() => setActiveTab('evidence')}
                          className="text-xs font-semibold text-[#00875a] hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          <span>{language === 'vi' ? 'Xem chi tiết tab ảnh' : 'View full gallery'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className={`grid grid-cols-1 ${evidenceImages.length === 1 ? 'sm:grid-cols-2 md:grid-cols-3' : 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'} gap-3`}>
                        {evidenceImages.slice(0, 4).map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setLightboxImage(img.src)}
                            className="group cursor-pointer space-y-1.5"
                          >
                            <div className="aspect-[4/3] rounded-xl overflow-hidden bg-slate-100 border border-slate-100 shadow-2xs">
                              <img 
                                src={img.src} 
                                alt={img.caption}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            </div>
                            <p className="text-[11px] text-slate-500 leading-tight line-clamp-2">
                              {img.caption}
                            </p>
                          </div>
                        ))}

                        {/* Ô xem thêm ảnh CHỈ hiện nếu thực tế có nhiều hơn 4 ảnh */}
                        {evidenceImages.length > 4 && (
                          <div 
                            onClick={() => setActiveTab('evidence')}
                            className="aspect-[4/3] rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-slate-500 hover:text-emerald-700"
                          >
                            <ImageIcon className="w-5 h-5" />
                            <span className="text-xs font-semibold">{language === 'vi' ? 'Xem thêm ảnh' : 'View more'}</span>
                            <span className="text-[11px] font-bold text-emerald-600">+{evidenceImages.length - 4}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* PHẦN RÚT GỌN: TÀI LIỆU ĐÍNH KÈM (Chỉ hiển thị khi có tệp thực tế) */}
                    {problem.evidenceDocName && (
                      <div className="pt-4 border-t border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                            <FileText className="w-4 h-4 text-slate-500" />
                            <span>{language === 'vi' ? 'Tài liệu đính kèm (1)' : 'Attached Documents (1)'}</span>
                          </div>
                          <button
                            onClick={() => setActiveTab('docs')}
                            className="text-xs font-semibold text-[#00875a] hover:underline flex items-center gap-1 cursor-pointer"
                          >
                            <span>{language === 'vi' ? 'Xem tab tài liệu' : 'View documents tab'}</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs uppercase">
                              {problem.evidenceDocName.includes('.') ? problem.evidenceDocName.split('.').pop() : 'DOC'}
                            </div>
                            <div>
                              <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                                {problem.evidenceDocName}
                              </h4>
                              <p className="text-[11px] text-slate-400">
                                {language === 'vi' ? 'Tài liệu đính kèm minh chứng' : 'Attached Evidence Document'}
                              </p>
                            </div>
                          </div>

                          <button
                            onClick={() => alert(language === 'vi' ? `Đang tải xuống tài liệu: ${problem.evidenceDocName}` : `Downloading: ${problem.evidenceDocName}`)}
                            className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#00875a] hover:border-[#00875a] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                            title={language === 'vi' ? 'Tải xuống' : 'Download'}
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= TAB 2: ẢNH MINH CHỨNG CHI TIẾT ================= */}
                {activeTab === 'evidence' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                          <ImageIcon className="w-4 h-4 text-emerald-700" />
                          <span>{language === 'vi' ? `Hình ảnh minh chứng thực tế (${evidenceImages.length})` : `Field Evidence Photos (${evidenceImages.length})`}</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {language === 'vi' ? 'Ảnh chụp tại hiện trường minh chứng thực tế cho bài toán. Nhấp vào ảnh để phóng to xem chi tiết.' : 'Photos captured on-site reflecting actual conditions. Click any photo to enlarge.'}
                        </p>
                      </div>
                    </div>

                    {evidenceImages.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {evidenceImages.map((img, idx) => (
                          <div 
                            key={idx}
                            onClick={() => setLightboxImage(img.src)}
                            className="group cursor-pointer rounded-2xl overflow-hidden border border-slate-200/90 bg-white hover:border-emerald-300 hover:shadow-md transition-all duration-300 flex flex-col"
                          >
                            <div className="relative aspect-[4/3] bg-slate-100 overflow-hidden">
                              <img 
                                src={img.src} 
                                alt={img.caption}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                              <div className="absolute inset-0 bg-slate-900/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <span className="px-3 py-1.5 rounded-full bg-white/95 text-slate-800 text-xs font-semibold shadow-sm flex items-center gap-1.5">
                                  <Eye className="w-3.5 h-3.5 text-emerald-700" />
                                  <span>{language === 'vi' ? 'Xem kích thước lớn' : 'Enlarge Photo'}</span>
                                </span>
                              </div>
                            </div>
                            <div className="p-3 bg-slate-50/50 flex-1 flex flex-col justify-between border-t border-slate-100">
                              <p className="text-xs font-medium text-slate-700 leading-snug">
                                {img.caption}
                              </p>
                              <span className="text-[11px] text-emerald-700 font-semibold mt-2 inline-flex items-center gap-1">
                                <Check className="w-3 h-3" />
                                {language === 'vi' ? 'Ảnh chụp thực tế' : 'Verified Field Photo'}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="py-12 text-center text-slate-400 space-y-2">
                        <ImageIcon className="w-10 h-10 mx-auto text-slate-300 stroke-1" />
                        <p className="text-xs sm:text-sm font-medium text-slate-600">
                          {language === 'vi' ? 'Chưa có ảnh minh chứng bổ sung' : 'No additional evidence photos available'}
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= TAB 3: HỒ SƠ & TÀI LIỆU ================= */}
                {activeTab === 'docs' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-700" />
                          <span>{language === 'vi' ? `Hồ sơ & Tài liệu đính kèm (${problem.evidenceDocName ? 1 : 0})` : `Attached Documents (${problem.evidenceDocName ? 1 : 0})`}</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {language === 'vi' ? 'Các văn bản, báo cáo khảo sát hoặc hồ sơ kỹ thuật bổ trợ cho bài toán.' : 'Reports, survey files, and technical records related to this challenge.'}
                        </p>
                      </div>
                    </div>

                    {problem.evidenceDocName ? (
                      <div className="space-y-3">
                        <div className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-emerald-300 hover:shadow-sm transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-start sm:items-center gap-3.5">
                            <div className="w-12 h-12 rounded-xl bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs uppercase tracking-wider">
                              {problem.evidenceDocName.includes('.') ? problem.evidenceDocName.split('.').pop() : 'DOC'}
                            </div>
                            <div>
                              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                                {problem.evidenceDocName}
                              </h4>
                              <p className="text-xs text-slate-500 mt-0.5">
                                {language === 'vi' ? 'Tài liệu khảo sát thực tế và hồ sơ minh chứng bài toán' : 'Field survey and challenge evidence documentation'}
                              </p>
                              <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                                <span className="inline-flex items-center gap-1 text-emerald-700 font-medium">
                                  <Check className="w-3 h-3" />
                                  {language === 'vi' ? 'Đã kiểm tra & xác nhận bởi UBND Xã Bình Mỹ' : 'Verified by Binh My Commune'}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 self-end sm:self-center">
                            <button
                              onClick={() => alert(language === 'vi' ? `Đang tải xuống tài liệu: ${problem.evidenceDocName}` : `Downloading: ${problem.evidenceDocName}`)}
                              className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer"
                            >
                              <Download className="w-4 h-4" />
                              <span>{language === 'vi' ? 'Tải xuống tài liệu' : 'Download Document'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
                          <FileText className="w-6 h-6 stroke-1" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">
                            {language === 'vi' ? 'Chưa có tài liệu đính kèm cho bài toán này' : 'No documents attached for this challenge yet'}
                          </h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                            {language === 'vi' 
                              ? 'Hồ sơ kỹ thuật hoặc số liệu khảo sát chi tiết sẽ được ban quản trị Living Lab cung cấp trực tiếp cho các đội ngũ gửi đề xuất giải pháp khả thi.' 
                              : 'Technical specifications and raw survey data will be provided directly to teams with viable solution proposals.'}
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => onOpenProposeSolution(problem)}
                            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-[#00875a] bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{language === 'vi' ? 'Gửi đề xuất để nhận hồ sơ' : 'Submit proposal to request docs'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ================= TAB 4: ĐỀ XUẤT THAM GIA ================= */}
                {activeTab === 'proposals' && (
                  <div className="space-y-5 animate-fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 flex items-center gap-2">
                          <Users className="w-4 h-4 text-emerald-700" />
                          <span>{language === 'vi' ? `Đề xuất tham gia giải quyết (${proposalsList.length})` : `Collaboration Proposals (${proposalsList.length})`}</span>
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {language === 'vi' ? 'Các sáng kiến, giải pháp và cam kết đồng hành từ sinh viên, chuyên gia và doanh nghiệp.' : 'Initiatives, solutions, and commitments from students, experts, and enterprises.'}
                        </p>
                      </div>

                      <button
                        onClick={() => onOpenProposeSolution(problem)}
                        className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center gap-1.5 cursor-pointer shrink-0 active:scale-98"
                      >
                        <Send className="w-3.5 h-3.5" />
                        <span>{language === 'vi' ? 'Gửi đề xuất hợp tác' : 'Propose Collaboration'}</span>
                      </button>
                    </div>

                    {proposalsList.length > 0 ? (
                      <div className="space-y-3.5">
                        {proposalsList.map((prop) => {
                          // Badge trạng thái
                          const getStatusBadge = (status: string) => {
                            switch (status) {
                              case 'approved':
                              case 'connected':
                                return { labelVi: 'Đã tiếp nhận & Kết nối', labelEn: 'Accepted & Connected', color: 'bg-emerald-50 text-emerald-700 border-emerald-200' };
                              case 'contacted':
                                return { labelVi: 'Đã liên hệ', labelEn: 'Contacted', color: 'bg-sky-50 text-sky-700 border-sky-200' };
                              case 'reviewing':
                                return { labelVi: 'Đang đánh giá', labelEn: 'Under Review', color: 'bg-purple-50 text-purple-700 border-purple-200' };
                              case 'rejected':
                                return { labelVi: 'Chưa phù hợp', labelEn: 'Not Suitable', color: 'bg-slate-50 text-slate-600 border-slate-200' };
                              default:
                                return { labelVi: 'Chờ xem xét', labelEn: 'Pending Review', color: 'bg-amber-50 text-amber-700 border-amber-200' };
                            }
                          };

                          const badge = getStatusBadge(prop.status);

                          return (
                            <div 
                              key={prop.id}
                              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all space-y-3 shadow-2xs"
                            >
                              {/* Header đề xuất */}
                              <div className="flex flex-wrap items-start justify-between gap-3">
                                <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center shrink-0 border border-emerald-200">
                                    {prop.fullName ? prop.fullName.charAt(0).toUpperCase() : 'U'}
                                  </div>
                                  <div>
                                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                      <span>{prop.fullName}</span>
                                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                                        {prop.role}
                                      </span>
                                    </h4>
                                    <p className="text-xs text-slate-500">
                                      {prop.organization || (language === 'vi' ? 'Đề xuất cá nhân' : 'Individual Proposal')}
                                    </p>
                                  </div>
                                </div>

                                <div className="flex items-center gap-2">
                                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold border ${badge.color}`}>
                                    {language === 'vi' ? badge.labelVi : badge.labelEn}
                                  </span>
                                  <span className="text-[11px] text-slate-400 flex items-center gap-1">
                                    <Clock className="w-3 h-3" />
                                    <span>{prop.createdAt}</span>
                                  </span>
                                </div>
                              </div>

                              {/* Tags lĩnh vực */}
                              {prop.selectedFields && prop.selectedFields.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                  {prop.selectedFields.map((f, i) => (
                                    <span key={i} className="px-2.5 py-0.5 rounded-lg text-[11px] font-medium bg-[#f0f7fe] text-[#0284c7] border border-sky-100">
                                      {f}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Nội dung đề xuất */}
                              <div className="p-3.5 rounded-xl bg-slate-50/70 border border-slate-100 text-xs sm:text-[13px] text-slate-700 leading-relaxed">
                                <p className="font-semibold text-slate-800 mb-1">
                                  {language === 'vi' ? 'Giải pháp đề xuất:' : 'Proposed Solution:'}
                                </p>
                                <p className="whitespace-pre-line">
                                  {prop.solutionContent}
                                </p>
                              </div>

                              {/* Tệp đính kèm & Thời gian sẵn sàng */}
                              <div className="flex flex-wrap items-center justify-between gap-2 pt-1 text-xs text-slate-500">
                                {prop.availability && (
                                  <span className="text-[11px] text-slate-500">
                                    <strong className="text-slate-700">{language === 'vi' ? 'Thời gian tham gia: ' : 'Availability: '}</strong>
                                    {prop.availability}
                                  </span>
                                )}

                                {prop.fileName && (
                                  <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg">
                                    <FileText className="w-3.5 h-3.5" />
                                    <span>{prop.fileName}</span>
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-12 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50 text-center space-y-3">
                        <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                          <Users className="w-6 h-6 stroke-1" />
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-slate-800">
                            {language === 'vi' ? 'Chưa có đề xuất tham gia nào cho bài toán này' : 'No collaboration proposals for this challenge yet'}
                          </h4>
                          <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                            {language === 'vi' 
                              ? 'Hãy là người đầu tiên gửi ý tưởng hoặc đề xuất giải pháp đồng hành cùng bà con xã Bình Mỹ.' 
                              : 'Be the first to submit an idea or proposal to co-create solutions with local people.'}
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={() => onOpenProposeSolution(problem)}
                            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs cursor-pointer active:scale-98"
                          >
                            <Send className="w-3.5 h-3.5" />
                            <span>{language === 'vi' ? 'Gửi đề xuất tham gia ngay' : 'Submit Proposal Now'}</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* FOOTER CỦA THẺ NỘI DUNG */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? `Ngày đăng: ${problem.createdAt}` : `Posted: ${problem.createdAt}`}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? `Lượt xem: ${stats.views}` : `Views: ${stats.views}`}</span>
                    </span>
                  </div>

                  <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full text-xs font-semibold">
                    <Check className="w-3 h-3 stroke-[3]" />
                    {language === 'vi' ? 'Đã xác minh' : 'Verified'}
                  </span>
                </div>

              </div>

            </div>

          </div>

          {/* ================= CỘT PHẢI (SIDEBAR - 4 CỘT) ================= */}
          <div className="lg:col-span-4 space-y-4">

            {/* THẺ 1: THÔNG TIN NGƯỜI ĐĂNG */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <User className="w-4 h-4 text-[#1d75c2]" />
                <span>{language === 'vi' ? 'Thông tin người đăng' : 'Submitter Information'}</span>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <div className="w-10 h-10 rounded-full bg-slate-100 text-[#1d75c2] flex items-center justify-center font-bold text-base shrink-0 border border-slate-200">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900">
                    {problem.contactName || (language === 'vi' ? 'Nguyễn Văn A' : 'Local Representative')}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {language === 'vi' 
                      ? (problem.submitterType || 'Hộ sản xuất (Cá nhân)')
                      : ((problem.submitterType && problem.submitterType.includes('Nông dân')) ? 'Farmer / Producer Household' : (problem.submitterType || 'Producer Household'))}
                  </p>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-100 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {language === 'vi' 
                      ? `Số điện thoại: ${problem.phoneNumber || '0903 123 456'}` 
                      : `Phone: ${problem.phoneNumber || '0903 123 456'}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>
                    {language === 'vi' 
                      ? `Địa điểm: ${cleanLocation}` 
                      : `Location: ${displayLocation || cleanLocation}`}
                  </span>
                </div>
              </div>
            </div>

            {/* THẺ 2: THỐNG KÊ */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Users className="w-4 h-4 text-[#1d75c2]" />
                <span>{language === 'vi' ? 'Thống kê' : 'Statistics'}</span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center pt-1">
                <div className="bg-[#f0f7fe] rounded-xl p-2.5">
                  <div className="text-base sm:text-lg font-bold text-[#1d75c2]">
                    {stats.views}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'vi' ? 'Lượt xem' : 'Views'}
                  </div>
                </div>

                <div 
                  onClick={() => {
                    const res = AdminDataService.toggleProblemInterest(problem.id);
                    setStats(prev => ({ ...prev, interested: res.interested }));
                    setIsInterested(res.hasInterested);
                  }}
                  className={`rounded-xl p-2.5 cursor-pointer transition-all active:scale-95 select-none ${
                    isInterested 
                      ? 'bg-rose-50 border border-rose-200 text-rose-600 shadow-2xs' 
                      : 'bg-[#f0f7fe] hover:bg-sky-100 text-[#1d75c2]'
                  }`}
                  title={language === 'vi' ? (isInterested ? 'Bỏ quan tâm' : 'Nhấn để quan tâm bài toán') : (isInterested ? 'Unfollow' : 'Click to show interest')}
                >
                  <div className={`text-base sm:text-lg font-bold flex items-center justify-center gap-1 ${isInterested ? 'text-rose-600' : 'text-[#1d75c2]'}`}>
                    {isInterested && <Heart className="w-3 h-3 fill-rose-500 text-rose-500 shrink-0" />}
                    <span>{stats.interested}</span>
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'vi' ? (isInterested ? 'Đã quan tâm' : 'Lượt quan tâm') : 'Interested'}
                  </div>
                </div>

                <div className="bg-[#f0f7fe] rounded-xl p-2.5">
                  <div className="text-base sm:text-lg font-bold text-[#1d75c2]">
                    {proposalsList.length}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'vi' ? 'Đề xuất tham gia' : 'Proposals'}
                  </div>
                </div>
              </div>
            </div>

            {/* THẺ 3: CÁC LĨNH VỰC CẦN HỖ TRỢ */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-2xs">
              <h4 className="text-xs font-bold text-slate-800">
                {language === 'vi' ? 'Các lĩnh vực cần hỗ trợ' : 'Key Support Areas'}
              </h4>
              <div className="flex flex-wrap gap-2">
                {(problem.supportNeeded && problem.supportNeeded.length > 0
                  ? problem.supportNeeded
                  : (language === 'vi' 
                      ? ['Tư vấn chuyên môn', 'Giải pháp kỹ thuật'] 
                      : ['Expert Consultation', 'Technical Solutions'])
                ).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl text-xs font-medium text-[#0284c7] bg-[#f0f7fe] border border-sky-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* THẺ 4: CALLOUT CÙNG CHUNG TAY GIẢI QUYẾT BÀI TOÁN NÀY */}
            <div className="rounded-2xl overflow-hidden border border-emerald-100 shadow-2xs bg-white">
              <img 
                src="/assets/problems/community-callout.png" 
                alt={language === 'vi' 
                  ? "Cùng chung tay giải quyết bài toán này! Làng SV kết nối những người có cùng mục tiêu để tạo ra giải pháp thiết thực cho cộng đồng."
                  : "Join hands to co-create solutions for this challenge! Binh My Living Lab connects students and experts."}
                className="w-full h-auto object-cover block"
              />
            </div>

            {/* THẺ 5: ĐỀ XUẤT HỢP TÁC */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Users className="w-4 h-4 text-[#1d75c2]" />
                <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Propose Collaboration'}</span>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi' 
                  ? 'Bạn có thể gửi đề xuất hợp tác hoặc giải pháp hỗ trợ cho bài toán này!'
                  : 'You can submit a collaboration proposal or solution to support this problem!'}
              </p>

              <button
                onClick={() => onOpenProposeSolution(problem)}
                className="w-full py-2.5 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{language === 'vi' ? 'Gửi đề xuất hợp tác' : 'Propose Collaboration'}</span>
              </button>
            </div>

            {/* THẺ 6: BÀI TOÁN TƯƠNG TỰ */}
            <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm">
                <Users className="w-4 h-4 text-[#1d75c2]" />
                <span>{language === 'vi' ? 'Bài toán tương tự' : 'Similar Problems'}</span>
              </div>

              <div className="divide-y divide-slate-100 space-y-2 pt-1">
                {similarProblems.map((sim) => {
                  const simCat = getCategoryInfo(sim.category);
                  const SimCatIcon = simCat.icon;
                  const thumb = sim.images && sim.images[0] ? sim.images[0] : '/assets/problems/card2.jpg';
                  const simTitle = (language === 'en' && sim.titleEn) ? sim.titleEn : sim.title;
                  const simLoc = (language === 'en' && sim.locationEn) ? sim.locationEn : sim.location;

                  return (
                    <div
                      key={sim.id}
                      onClick={() => onSelectProblem(sim)}
                      className="pt-2.5 flex items-center gap-3 cursor-pointer group"
                    >
                      {/* Ảnh nhỏ */}
                      <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-slate-100 bg-slate-50">
                        <img 
                          src={thumb} 
                          alt={simTitle} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>

                      {/* Nội dung */}
                      <div className="flex-1 min-w-0">
                        <h5 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#00875a] transition-colors">
                          {simTitle}
                        </h5>
                        <div className="flex items-center gap-2.5 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center gap-1">
                            <SimCatIcon className="w-3 h-3 text-emerald-600" />
                            <span>{simCat.text}</span>
                          </span>
                          <span className="flex items-center gap-0.5">
                            <MapPin className="w-3 h-3 text-slate-400" />
                            <span>{simLoc}</span>
                          </span>
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {sim.createdAt}
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-[#00875a] group-hover:translate-x-0.5 transition-all shrink-0" />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* LIGHTBOX PHÓNG TO ẢNH */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-4xl max-h-[90vh] rounded-2xl overflow-hidden">
            <img src={lightboxImage} alt={language === 'vi' ? "Phóng to ảnh" : "Enlarged photo"} className="max-w-full max-h-[85vh] object-contain rounded-2xl" />
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
