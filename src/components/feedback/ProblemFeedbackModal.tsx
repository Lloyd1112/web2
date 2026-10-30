import React, { useState, useEffect } from 'react';
import { RealProblem, ProblemFeedback, FeedbackResolutionLevel, FeedbackUsefulness, FeedbackCoordination } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { useLanguage } from '../../context/LanguageContext';
import {
  X,
  Star,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Send,
  MessageSquare,
  ThumbsUp,
  ShieldCheck,
  Building2,
  User,
  Heart
} from 'lucide-react';

interface ProblemFeedbackModalProps {
  problem: RealProblem | null;
  isOpen: boolean;
  onClose: () => void;
  accessToken?: string; // Khi người dân mở qua liên kết token
  onFeedbackSubmitted?: () => void;
}

export const ProblemFeedbackModal: React.FC<ProblemFeedbackModalProps> = ({
  problem,
  isOpen,
  onClose,
  accessToken,
  onFeedbackSubmitted
}) => {
  const { language } = useLanguage();
  const [currentUser, setCurrentUser] = useState(AdminDataService.getCurrentUser());

  // 5 Câu hỏi chuẩn
  const [rating, setRating] = useState<number>(5);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [resolutionLevel, setResolutionLevel] = useState<FeedbackResolutionLevel>('hoan_toan');
  const [usefulness, setUsefulness] = useState<FeedbackUsefulness>('rat_huu_ich');
  const [coordinationRating, setCoordinationRating] = useState<FeedbackCoordination>('rat_tot');
  const [comments, setComments] = useState('');

  // Thông tin người gửi
  const [citizenName, setCitizenName] = useState('');
  const [citizenPhone, setCitizenPhone] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [existingFeedback, setExistingFeedback] = useState<ProblemFeedback | null>(null);

  useEffect(() => {
    if (!isOpen || !problem) return;
    const user = AdminDataService.getCurrentUser();
    setCurrentUser(user);

    // Điền trước thông tin nếu đã đăng nhập hoặc từ bài toán
    setCitizenName(user?.fullName || problem.contactName || '');
    setCitizenPhone(user?.phone || problem.phoneNumber || '');

    // Kiểm tra xem đã có Feedback cho bài toán này chưa
    const existing = AdminDataService.getFeedbacksByProblemId(problem.id);
    if (existing.length > 0) {
      setExistingFeedback(existing[0]);
    } else {
      setExistingFeedback(null);
      setIsSuccess(false);
      setError(null);
      setRating(5);
      setResolutionLevel('hoan_toan');
      setUsefulness('rat_huu_ich');
      setCoordinationRating('rat_tot');
      setComments('');
    }
  }, [isOpen, problem]);

  if (!isOpen || !problem) return null;

  // Điều kiện tiên quyết: Chỉ mở feedback khi bài toán ĐÃ HOÀN THÀNH
  const isCompleted = problem.status === 'completed';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!citizenName.trim()) {
      setError('Vui lòng nhập họ và tên của bạn.');
      return;
    }

    if (!rating || rating < 1) {
      setError('Vui lòng chọn mức độ hài lòng từ 1 đến 5 sao.');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const res = AdminDataService.submitFeedback({
        problemId: problem.id,
        problemCode: problem.code || 'BM-XXX',
        problemTitle: problem.title,
        userId: currentUser?.id,
        citizenName: citizenName.trim(),
        citizenPhone: citizenPhone.trim(),
        rating,
        resolutionLevel,
        usefulness,
        coordinationRating,
        comments: comments.trim(),
        accessToken
      });

      setIsLoading(false);

      if (res.success && res.feedback) {
        setIsSuccess(true);
        setExistingFeedback(res.feedback);
        if (onFeedbackSubmitted) onFeedbackSubmitted();
      } else {
        setError(res.error || 'Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.');
      }
    }, 400);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Header Modal */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/90 shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#00875a] flex items-center justify-center shadow-2xs shrink-0">
              <Sparkles className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-black text-slate-900 tracking-tight">
                {existingFeedback 
                  ? 'Phản hồi đánh giá kết quả bài toán' 
                  : 'Đánh giá kết quả giải quyết bài toán'}
              </h3>
              <p className="text-[11px] text-slate-500 font-mono">
                {problem.code || 'BM-XXX'} — {problem.title}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-200/70 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
            aria-label="Đóng"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">

          {/* Cảnh báo bài toán chưa hoàn thành */}
          {!isCompleted && (
            <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 text-xs">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Chưa đủ điều kiện đánh giá</p>
                <p className="mt-0.5 text-amber-800">
                  Hệ thống chỉ mở tiếp nhận đánh giá Feedback sau khi Ban Quản lý xác nhận bài toán đã hoàn thành nghiệm thu. Trạng thái hiện tại: <span className="font-bold uppercase">{problem.status}</span>.
                </p>
              </div>
            </div>
          )}

          {/* ĐÃ CÓ FEEDBACK / GỬI THÀNH CÔNG */}
          {(isSuccess || existingFeedback) && isCompleted && (
            <div className="space-y-5 animate-in fade-in">
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-2">
                <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h4 className="text-base font-black text-emerald-900">
                  Cảm ơn bạn đã gửi phản hồi!
                </h4>
                <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
                  Ý kiến của bạn là cơ sở quan trọng giúp Làng Sinh Viên và các nhóm nghiên cứu hoàn thiện giải pháp thực tế phục vụ cộng đồng Bình Mỹ.
                </p>
                {!existingFeedback?.isApproved && (
                  <div className="inline-block px-3 py-1 bg-white text-emerald-800 rounded-full text-[11px] font-bold border border-emerald-300 mt-2">
                    Trạng thái: Đã ghi nhận — Đang chờ Ban Quản trị duyệt hiển thị
                  </div>
                )}
              </div>

              {/* Chi tiết đánh giá đã gửi */}
              {existingFeedback && (
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3.5 text-xs">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Người đánh giá:</span>
                    <span className="font-semibold text-slate-900">{existingFeedback.citizenName}</span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Mức độ hài lòng:</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star 
                          key={s} 
                          className={`w-4 h-4 ${s <= existingFeedback.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} 
                        />
                      ))}
                      <span className="ml-1.5 font-bold text-slate-800">({existingFeedback.rating}/5 sao)</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Mức độ giải quyết:</span>
                    <span className="font-semibold text-slate-900">
                      {existingFeedback.resolutionLevel === 'hoan_toan' && 'Đã giải quyết hoàn toàn'}
                      {existingFeedback.resolutionLevel === 'phan_lon' && 'Đã giải quyết phần lớn'}
                      {existingFeedback.resolutionLevel === 'mot_phan' && 'Mới giải quyết một phần'}
                      {existingFeedback.resolutionLevel === 'chua_dat' && 'Chưa đạt kết quả mong muốn'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Mức độ hữu ích:</span>
                    <span className="font-semibold text-slate-900">
                      {existingFeedback.usefulness === 'rat_huu_ich' && 'Rất hữu ích'}
                      {existingFeedback.usefulness === 'huu_ich_mot_phan' && 'Hữu ích một phần'}
                      {existingFeedback.usefulness === 'chua_huu_ich' && 'Chưa hữu ích'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                    <span className="font-bold text-slate-700">Đánh giá quá trình phối hợp:</span>
                    <span className="font-semibold text-slate-900">
                      {existingFeedback.coordinationRating === 'rat_tot' && 'Rất tốt'}
                      {existingFeedback.coordinationRating === 'tot' && 'Tốt'}
                      {existingFeedback.coordinationRating === 'binh_thuong' && 'Bình thường'}
                      {existingFeedback.coordinationRating === 'chua_tot' && 'Chưa tốt'}
                    </span>
                  </div>

                  {existingFeedback.comments && (
                    <div className="pt-1">
                      <span className="font-bold text-slate-700 block mb-1">Ý kiến góp ý:</span>
                      <p className="p-3 bg-white rounded-xl border border-slate-200 text-slate-800 italic leading-relaxed">
                        "{existingFeedback.comments}"
                      </p>
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 text-right pt-1 font-mono">
                    Ngày gửi: {existingFeedback.createdAt}
                  </div>
                </div>
              )}

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Đóng cửa sổ
                </button>
              </div>
            </div>
          )}

          {/* BIỂU MẪU ĐÁNH GIÁ 5 CÂU HỎI (KHI CHƯA GỬI VÀ BÀI TOÁN HOÀN THÀNH) */}
          {!existingFeedback && !isSuccess && isCompleted && (
            <form onSubmit={handleSubmit} className="space-y-6">

              {error && (
                <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}

              {/* Thông tin người phản hồi */}
              <div className="p-4 bg-slate-50/80 rounded-2xl border border-slate-200/80 space-y-3">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-2">
                  <User className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Thông tin người đại diện đánh giá</span>
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Họ và tên <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={citizenName}
                      onChange={(e) => setCitizenName(e.target.value)}
                      placeholder="VD: Nguyễn Văn A"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 mb-1">
                      Số điện thoại liên hệ
                    </label>
                    <input
                      type="tel"
                      value={citizenPhone}
                      onChange={(e) => setCitizenPhone(e.target.value)}
                      placeholder="VD: 0903 xxx xxx"
                      className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* ================= 5 CÂU HỎI BẮT BUỘC THEO QUY CHUẨN ================= */}

              {/* Câu 1: Mức độ hài lòng */}
              <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Câu 1. Mức độ hài lòng chung đối với kết quả giải quyết bài toán: <span className="text-rose-500">*</span>
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                      title={`${star} sao`}
                    >
                      <Star 
                        className={`w-7 h-7 sm:w-8 sm:h-8 transition-colors ${
                          star <= (hoverRating || rating)
                            ? 'fill-amber-400 text-amber-500'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-3 text-xs font-bold text-slate-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                    {rating === 5 && '5/5 — Rất hài lòng'}
                    {rating === 4 && '4/5 — Hài lòng'}
                    {rating === 3 && '3/5 — Bình thường'}
                    {rating === 2 && '2/5 — Chưa hài lòng'}
                    {rating === 1 && '1/5 — Rất không hài lòng'}
                  </span>
                </div>
              </div>

              {/* Câu 2: Mức độ giải quyết */}
              <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Câu 2. Mức độ giải quyết bài toán so với kỳ vọng ban đầu: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {[
                    { id: 'hoan_toan', label: 'Đã giải quyết hoàn toàn' },
                    { id: 'phan_lon', label: 'Đã giải quyết phần lớn' },
                    { id: 'mot_phan', label: 'Mới giải quyết một phần' },
                    { id: 'chua_dat', label: 'Chưa đạt kết quả mong muốn' }
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        resolutionLevel === opt.id
                          ? 'bg-emerald-50/80 border-[#00875a] text-[#00875a] font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="resolutionLevel"
                        value={opt.id}
                        checked={resolutionLevel === opt.id}
                        onChange={() => setResolutionLevel(opt.id as FeedbackResolutionLevel)}
                        className="text-[#00875a] focus:ring-[#00875a]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Câu 3: Mức độ hữu ích */}
              <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Câu 3. Mức độ hữu ích đối với đời sống / hoạt động sản xuất: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1">
                  {[
                    { id: 'rat_huu_ich', label: 'Rất hữu ích' },
                    { id: 'huu_ich_mot_phan', label: 'Hữu ích một phần' },
                    { id: 'chua_huu_ich', label: 'Chưa hữu ích' }
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        usefulness === opt.id
                          ? 'bg-emerald-50/80 border-[#00875a] text-[#00875a] font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="usefulness"
                        value={opt.id}
                        checked={usefulness === opt.id}
                        onChange={() => setUsefulness(opt.id as FeedbackUsefulness)}
                        className="text-[#00875a] focus:ring-[#00875a]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Câu 4: Đánh giá quá trình phối hợp */}
              <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Câu 4. Đánh giá quá trình phối hợp làm việc của Nhóm thực hiện / Chuyên gia: <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  {[
                    { id: 'rat_tot', label: 'Rất tốt' },
                    { id: 'tot', label: 'Tốt' },
                    { id: 'binh_thuong', label: 'Bình thường' },
                    { id: 'chua_tot', label: 'Chưa tốt' }
                  ].map((opt) => (
                    <label
                      key={opt.id}
                      className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer text-xs transition-all ${
                        coordinationRating === opt.id
                          ? 'bg-emerald-50/80 border-[#00875a] text-[#00875a] font-bold shadow-2xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <input
                        type="radio"
                        name="coordinationRating"
                        value={opt.id}
                        checked={coordinationRating === opt.id}
                        onChange={() => setCoordinationRating(opt.id as FeedbackCoordination)}
                        className="text-[#00875a] focus:ring-[#00875a]"
                      />
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Câu 5: Ý kiến góp ý (Văn bản tùy chọn) */}
              <div className="space-y-2 p-4 bg-white rounded-2xl border border-slate-200 shadow-2xs">
                <label className="block text-xs sm:text-sm font-bold text-slate-900">
                  Câu 5. Ý kiến góp ý thêm để nhân rộng hoặc cải tiến (Không bắt buộc):
                </label>
                <textarea
                  rows={3}
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                  placeholder="Nhập cảm nhận, đề xuất bổ sung hoặc thông điệp gửi đến Ban Quản lý và Nhóm sinh viên..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 transition-all font-medium leading-relaxed"
                />
              </div>

              {/* Footer submit */}
              <div className="flex items-center justify-between pt-2">
                <p className="text-[10px] text-slate-400">
                  * Mỗi bài toán chỉ ghi nhận 1 lần đánh giá kết quả hợp lệ.
                </p>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    Hủy bỏ
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="px-6 py-2.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 disabled:opacity-60"
                  >
                    {isLoading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Đang ghi nhận...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-3.5 h-3.5" />
                        <span>GỬI PHẢN HỒI ĐÁNH GIÁ</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};
