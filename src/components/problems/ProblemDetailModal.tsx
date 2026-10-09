import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem } from '../../types';
import { 
  X, 
  MapPin, 
  Calendar, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Sparkles, 
  Share2, 
  UserCheck, 
  ChevronLeft, 
  ChevronRight,
  ShieldCheck,
  FileText,
  HelpCircle,
  TrendingUp,
  HandHeart,
  Maximize2,
  Send,
  Building,
  Info
} from 'lucide-react';

interface ProblemDetailModalProps {
  problem: (RealProblem & { isSampleData?: boolean }) | null;
  onClose: () => void;
  onOpenProposeSolution: (problem: RealProblem) => void;
}

export const ProblemDetailModal: React.FC<ProblemDetailModalProps> = ({
  problem,
  onClose,
  onOpenProposeSolution
}) => {
  const { language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomOpen, setIsZoomOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  if (!problem) return null;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'verified':
        return {
          text: 'Đã xác minh',
          textEn: 'Verified',
          color: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: ShieldCheck
        };
      case 'seeking_support':
        return {
          text: 'Đang tìm người hỗ trợ',
          textEn: 'Seeking Support',
          color: 'bg-amber-100 text-amber-900 border-amber-300',
          icon: HandHeart
        };
      case 'in_progress':
        return {
          text: 'Đang triển khai',
          textEn: 'In Progress',
          color: 'bg-sky-100 text-sky-800 border-sky-300',
          icon: TrendingUp
        };
      case 'pending':
      default:
        return {
          text: 'Chờ xác minh',
          textEn: 'Pending Verification',
          color: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: Clock
        };
    }
  };

  const getCategoryBadge = (cat: string) => {
    switch (cat) {
      case 'agriculture':
        return { text: 'Nông nghiệp', textEn: 'Agriculture', color: 'bg-amber-500 text-white' };
      case 'health':
        return { text: 'Y tế & Sức khỏe', textEn: 'Healthcare', color: 'bg-emerald-600 text-white' };
      case 'tourism':
        return { text: 'Du lịch', textEn: 'Tourism', color: 'bg-sky-600 text-white' };
      default:
        return { text: 'Lĩnh vực khác', textEn: 'Other', color: 'bg-purple-600 text-white' };
    }
  };

  const statusInfo = getStatusBadge(problem.status);
  const StatusIcon = statusInfo.icon;
  const categoryInfo = getCategoryBadge(problem.category);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const images = problem.images && problem.images.length > 0 
    ? problem.images 
    : ['https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1000&q=80'];

  return (
    <>
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header Bar */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryInfo.color}`}>
                {categoryInfo.text}
              </span>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${statusInfo.color}`}>
                <StatusIcon className="w-3.5 h-3.5" />
                <span>{statusInfo.text}</span>
              </span>
              {problem.isSampleData && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-500 border border-slate-200">
                  Dữ liệu mẫu minh họa
                </span>
              )}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-200/60 transition-colors relative"
                title="Sao chép liên kết chia sẻ"
              >
                <Share2 className="w-4 h-4" />
                {copied && (
                  <span className="absolute -bottom-8 right-0 bg-slate-900 text-white text-[10px] px-2 py-1 rounded-md whitespace-nowrap shadow-md">
                    Đã sao chép!
                  </span>
                )}
              </button>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                aria-label="Đóng chi tiết"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Modal Body */}
          <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800">
            
            {/* Title & Metadata */}
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
                {problem.title}
              </h2>
              <div className="mt-3 flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-500">
                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                  <UserCheck className="w-4 h-4 text-emerald-600" />
                  <span>{problem.organizationName || problem.contactName}</span>
                  {problem.submitterType && (
                    <span className="text-slate-400 font-normal">({problem.submitterType})</span>
                  )}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-rose-500" />
                  <span>{problem.location}</span>
                </span>
                <span className="inline-flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-slate-400" />
                  <span>Ngày gửi: {problem.createdAt}</span>
                </span>
              </div>
            </div>

            {/* Gallery Image Slider: Ảnh lớn ở phía trên/trái, ảnh bổ sung dạng thumbnail gallery */}
            <div className="space-y-2.5">
              <div className="relative rounded-2xl overflow-hidden aspect-[16/9] bg-slate-900 group">
                <img
                  src={images[selectedImageIndex]}
                  alt={problem.title}
                  className="w-full h-full object-cover transition-transform duration-300"
                />
                
                {/* Nút phóng to */}
                <button
                  onClick={() => setIsZoomOpen(true)}
                  className="absolute bottom-3 right-3 bg-slate-900/80 hover:bg-slate-900 text-white px-3 py-1.5 rounded-xl backdrop-blur-xs transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  <span>Xem ảnh lớn</span>
                </button>

                {/* Next / Prev Buttons */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
                      className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 text-white flex items-center justify-center transition-all opacity-80 hover:opacity-100 cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Gallery Thumbnails Strip */}
              {images.length > 1 && (
                <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`relative w-20 h-14 rounded-xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                        selectedImageIndex === idx ? 'border-emerald-600 scale-105 shadow-xs' : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              )}

              {/* Mô tả hình ảnh minh chứng */}
              {problem.imageDescription && (
                <p className="text-xs text-slate-500 italic bg-slate-50 p-3 rounded-xl border border-slate-100">
                  📷 {problem.imageDescription}
                </p>
              )}
            </div>

            {/* Chi tiết nội dung bài toán */}
            <div className="space-y-4 text-xs sm:text-sm">
              
              {/* Mô tả vấn đề */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <h4 className="font-extrabold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-500" />
                  <span>Mô tả cụ thể vấn đề & khó khăn</span>
                </h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-line pt-1">
                  {problem.description}
                </p>
                <div className="pt-2 border-t border-slate-200/60 flex flex-wrap gap-4 text-xs text-slate-500">
                  {problem.occurredTime && (
                    <span><strong>Thời gian phát sinh:</strong> {problem.occurredTime}</span>
                  )}
                  {problem.affectedAudience && (
                    <span><strong>Đối tượng ảnh hưởng:</strong> {problem.affectedAudience}</span>
                  )}
                </div>
              </div>

              {/* Nguyên nhân & Thiệt hại */}
              {(problem.cause || problem.damages) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {problem.cause && (
                    <div className="p-4 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5">
                      <h4 className="font-bold text-rose-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <HelpCircle className="w-3.5 h-3.5 text-rose-600" />
                        <span>Nguyên nhân nhận định</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">
                        {problem.cause}
                      </p>
                    </div>
                  )}

                  {problem.damages && (
                    <div className="p-4 rounded-2xl bg-amber-50/40 border border-amber-100 space-y-1.5">
                      <h4 className="font-bold text-amber-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                        <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                        <span>Khó khăn / Thiệt hại gây ra</span>
                      </h4>
                      <p className="text-xs text-slate-700 leading-relaxed pt-1">
                        {problem.damages}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Giải pháp đã thử */}
              {problem.triedSolutions && (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                  <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                    Các giải pháp đã từng thử nghiệm
                  </h4>
                  <p className="text-xs text-slate-700 leading-relaxed pt-1">
                    {problem.triedSolutions}
                  </p>
                </div>
              )}

              {/* Kết quả mong muốn */}
              <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-2">
                <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Kết quả mong muốn đạt được</span>
                </h4>
                <p className="text-slate-800 font-medium leading-relaxed pt-1">
                  {problem.desiredOutcome}
                </p>
              </div>

              {/* Nguồn lực cần hỗ trợ */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Nguồn lực cần hỗ trợ
                </h4>
                <div className="flex flex-wrap gap-2">
                  {problem.supportNeeded && problem.supportNeeded.length > 0 ? (
                    problem.supportNeeded.map((item, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 rounded-full text-xs font-bold bg-white border border-emerald-200 text-emerald-800 shadow-2xs"
                      >
                        ✦ {item}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-slate-500">Cần tư vấn hỗ trợ tổng thể</span>
                  )}
                </div>

                <div className="pt-2 border-t border-slate-200/60 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  <div>
                    <span className="font-semibold text-slate-700">Sẵn sàng phối hợp sinh viên/chuyên gia:</span>{' '}
                    <span className="text-emerald-700 font-bold">{problem.readyToCoordinate || 'Có'}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-slate-700">Hỗ trợ thử nghiệm tại chỗ:</span>{' '}
                    <span className="text-emerald-700 font-bold">{problem.canSupportTesting || 'Có'}</span>
                  </div>
                </div>

                {problem.evidenceDocName && (
                  <div className="pt-2 border-t border-slate-200/60 flex items-center gap-2 text-xs text-slate-600">
                    <FileText className="w-4 h-4 text-emerald-600" />
                    <span>Tài liệu đính kèm: </span>
                    <span className="font-bold text-slate-800 underline cursor-pointer">{problem.evidenceDocName}</span>
                  </div>
                )}
              </div>

              {/* ================= KHU VỰC NỔI BẬT: BẠN CÓ THỂ GIÚP GIẢI QUYẾT BÀI TOÁN NÀY? ================= */}
              {problem.status !== 'pending' ? (
                <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-700 to-slate-900 text-white shadow-xl relative overflow-hidden space-y-3 text-center sm:text-left">
                  <div className="absolute top-0 right-0 w-60 h-60 bg-white/10 rounded-full blur-2xl pointer-events-none" />

                  <div className="relative flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="space-y-1 max-w-lg">
                      <span className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-amber-300 text-[11px] font-black uppercase tracking-wider">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Living Lab Đồng Sáng Tạo</span>
                      </span>
                      <h3 className="text-lg sm:text-xl font-black text-white tracking-tight">
                        BẠN CÓ THỂ GIÚP GIẢI QUYẾT BÀI TOÁN NÀY?
                      </h3>
                      <p className="text-xs text-emerald-100 leading-relaxed">
                        “Hãy đề xuất tham gia hoặc hỗ trợ để cùng xây dựng giải pháp thực tế cho cộng đồng.”
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        onClose();
                        onOpenProposeSolution(problem);
                      }}
                      className="px-6 py-3 rounded-full text-xs font-black uppercase tracking-wider text-emerald-950 bg-amber-400 hover:bg-amber-300 transition-all shadow-lg hover:shadow-xl active:scale-95 shrink-0 flex items-center gap-2 cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>ĐỀ XUẤT THAM GIA GIẢI QUYẾT</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>
                    Bài toán này hiện đang trong quá trình <strong>Chờ Ban quản lý xác minh</strong>. Chỉ những bài toán đã được phê duyệt công khai mới tiếp nhận đề xuất giải quyết.
                  </span>
                </div>
              )}

              {/* Cam kết bảo mật */}
              <div className="p-3 bg-slate-100 rounded-xl text-[11px] text-slate-500 flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  Ban quản lý Làng SV bảo mật số điện thoại và email của người đăng; chỉ kết nối khi có đề xuất giải pháp phù hợp được duyệt.
                </span>
              </div>

            </div>

          </div>

          {/* Modal Footer */}
          <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between gap-3 shrink-0">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Đóng
            </button>

            {problem.status !== 'pending' && (
              <button
                onClick={() => {
                  onClose();
                  onOpenProposeSolution(problem);
                }}
                className="px-5 py-2 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Đề xuất tham gia giải quyết</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Modal Zoom Full Image */}
      {isZoomOpen && (
        <div 
          className="fixed inset-0 z-60 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsZoomOpen(false)}
        >
          <button
            onClick={() => setIsZoomOpen(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full bg-white/20 hover:bg-white/40 cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={images[selectedImageIndex]}
            alt="zoom view"
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-2xl shadow-2xl"
          />
        </div>
      )}
    </>
  );
};
