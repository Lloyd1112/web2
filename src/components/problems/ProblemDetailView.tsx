import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem } from '../../types';
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

  // Danh sách hình ảnh của bài toán
  const images = problem.images && problem.images.length > 0
    ? problem.images
    : ['/assets/problems/card1.jpg', '/assets/problems/card3.jpg', '/assets/problems/card6.jpg'];

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

  const displayTitle = (language === 'en' && problem.titleEn) ? problem.titleEn : problem.title;
  const displayDescription = (language === 'en' && problem.descriptionEn) ? problem.descriptionEn : problem.description;
  const displayLocation = (language === 'en' && problem.locationEn) ? problem.locationEn : problem.location;

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
        'Thiếu kiến thức về marketing và bán hàng online.',
        'Chưa có kênh quảng bá phù hợp với đặc thù nông sản địa phương.',
        'Hạn chế về nguồn lực tài chính và nhân lực.'
      ] : [
        'Lack of online marketing and e-commerce experience.',
        'Absence of specialized promotional channels for local produce.',
        'Limited financial and personnel resources.'
      ]);

  // Phân tích danh sách giải pháp đã thử
  const triedSolutionsList: string[] = (language === 'en' && problem.triedSolutionsEn)
    ? problem.triedSolutionsEn.split(';').map((s: string) => s.trim()).filter(Boolean)
    : problem.triedSolutions
    ? problem.triedSolutions.split(';').map((s: string) => s.trim()).filter(Boolean)
    : (language === 'vi' ? [
        'Đăng bài lên mạng xã hội (Facebook, Zalo) nhưng chưa hiệu quả.',
        'Tham gia một số hội chợ, sự kiện địa phương.',
        'Nhờ người quen hỗ trợ chụp ảnh sản phẩm.'
      ] : [
        'Posted on social media (Facebook, Zalo) with limited conversion.',
        'Participated in a few local trade fairs and farmers markets.',
        'Asked acquaintances to take product photos.'
      ]);

  // Danh sách ảnh minh chứng có caption
  const evidenceImages = [
    {
      src: images[0] || '/assets/problems/card1.jpg',
      caption: (language === 'en' && problem.imageDescriptionEn) 
        ? problem.imageDescriptionEn 
        : (problem.imageDescription || (language === 'vi' ? 'Ảnh chụp thực tế vườn rau của hộ sản xuất' : 'Field photo of local production garden'))
    },
    {
      src: images[1] || '/assets/problems/card3.jpg',
      caption: language === 'vi' ? 'Sản phẩm nông sản đang trồng' : 'Agricultural produce under cultivation'
    },
    {
      src: images[2] || '/assets/problems/card6.jpg',
      caption: language === 'vi' ? 'Sản phẩm khi bán tại chợ địa phương' : 'Produce at local trading market'
    }
  ];

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

                  {/* Hàng 4 ảnh nhỏ (Thumbnails) */}
                  <div className="grid grid-cols-4 gap-2">
                    {images.slice(0, 3).map((img, idx) => (
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

                    {/* Ô xem thêm ảnh +2 */}
                    <div
                      onClick={() => setLightboxImage(images[images.length - 1] || currentImage)}
                      className="relative aspect-square rounded-lg overflow-hidden border border-slate-200 cursor-pointer group shadow-2xs"
                    >
                      <img 
                        src={images[3] || images[0]} 
                        alt="more" 
                        className="w-full h-full object-cover brightness-50"
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xs group-hover:scale-110 transition-transform">
                        +{Math.max(2, images.length - 3)}
                      </div>
                    </div>
                  </div>
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
                  { id: 'docs', label: language === 'vi' ? 'Tài liệu (1)' : 'Documents (1)' },
                  { id: 'proposals', label: language === 'vi' ? 'Đề xuất tham gia (5)' : 'Proposals (5)' }
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

                {/* PHẦN: HÌNH ẢNH MINH CHỨNG */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <ImageIcon className="w-4 h-4 text-slate-500" />
                    <span>{language === 'vi' ? `Hình ảnh minh chứng (${evidenceImages.length})` : `Evidence Photos (${evidenceImages.length})`}</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                    {evidenceImages.map((img, idx) => (
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

                    {/* Ô xem thêm ảnh +2 */}
                    <div 
                      onClick={() => setLightboxImage(evidenceImages[0].src)}
                      className="aspect-[4/3] rounded-xl border border-dashed border-slate-300 hover:border-emerald-500 bg-slate-50/60 hover:bg-emerald-50/30 flex flex-col items-center justify-center gap-1 cursor-pointer transition-colors text-slate-500 hover:text-emerald-700"
                    >
                      <ImageIcon className="w-5 h-5" />
                      <span className="text-xs font-semibold">{language === 'vi' ? 'Xem thêm ảnh' : 'View more'}</span>
                      <span className="text-[11px] font-bold text-emerald-600">+2</span>
                    </div>
                  </div>
                </div>

                {/* PHẦN: TÀI LIỆU ĐÍNH KÈM (1) */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center gap-2 text-slate-800 font-bold text-sm">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>{language === 'vi' ? 'Tài liệu đính kèm (1)' : 'Attached Documents (1)'}</span>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      {/* PDF Red Icon */}
                      <div className="w-10 h-10 rounded-lg bg-rose-500 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
                        PDF
                      </div>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                          {problem.evidenceDocName || (language === 'vi' ? 'Hình ảnh sản phẩm.pdf' : 'Problem Evidence Documents.pdf')}
                        </h4>
                        <p className="text-[11px] text-slate-400">
                          2.4 MB · PDF
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => alert(language === 'vi' ? 'Đang tải xuống tài liệu minh chứng...' : 'Downloading evidence document...')}
                      className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-[#00875a] hover:border-[#00875a] flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
                      title={language === 'vi' ? 'Tải xuống' : 'Download'}
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* FOOTER CỦA THẺ NỘI DUNG */}
                <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? `Ngày đăng: ${problem.createdAt}` : `Posted: ${problem.createdAt}`}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5" />
                      <span>{language === 'vi' ? 'Lượt xem: 128' : 'Views: 128'}</span>
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
                  <span>{language === 'vi' ? 'Số điện thoại: 09xx xxx xxx' : 'Phone: 09xx xxx xxx'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>{language === 'vi' ? `Địa điểm: ${problem.location}, Củ Chi, TPHCM` : `Location: ${displayLocation}, Cu Chi, HCMC`}</span>
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
                    12
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'vi' ? 'Lượt xem' : 'Views'}
                  </div>
                </div>

                <div className="bg-[#f0f7fe] rounded-xl p-2.5">
                  <div className="text-base sm:text-lg font-bold text-[#1d75c2]">
                    3
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    {language === 'vi' ? 'Lượt quan tâm' : 'Interested'}
                  </div>
                </div>

                <div className="bg-[#f0f7fe] rounded-xl p-2.5">
                  <div className="text-base sm:text-lg font-bold text-[#1d75c2]">
                    0
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
                {(language === 'vi' 
                  ? ['Marketing', 'Truyền thông', 'Thiết kế']
                  : ['Marketing', 'Media', 'Design']
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
