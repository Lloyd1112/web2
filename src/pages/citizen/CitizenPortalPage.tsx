import React, { useState, useEffect } from 'react';
import { RealProblem, AppUser } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { useLanguage } from '../../context/LanguageContext';
import { ProblemTimeline } from '../../components/problems/ProblemTimeline';
import { ProblemFeedbackModal } from '../../components/feedback/ProblemFeedbackModal';
import {
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  AlertCircle,
  FileQuestion,
  ArrowRight,
  TrendingUp,
  Award,
  HelpCircle
} from 'lucide-react';

interface CitizenPortalPageProps {
  onNavigate: (tab: string) => void;
  onOpenProblemDetail?: (id: string) => void;
}

export const CitizenPortalPage: React.FC<CitizenPortalPageProps> = ({
  onNavigate,
  onOpenProblemDetail
}) => {
  const { language } = useLanguage();
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [myProblems, setMyProblems] = useState<RealProblem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<RealProblem | null>(null);

  // Tra cứu theo mã bài toán cho người dân không đăng nhập
  const [lookupCode, setLookupCode] = useState('');
  const [lookupResult, setLookupResult] = useState<RealProblem | null>(null);
  const [lookupError, setLookupError] = useState<string | null>(null);

  // Modal Feedback
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [feedbackProblem, setFeedbackProblem] = useState<RealProblem | null>(null);

  useEffect(() => {
    loadData();
    const unsub = AdminDataService.subscribe(loadData);
    return unsub;
  }, []);

  const loadData = () => {
    const user = AdminDataService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      const list = AdminDataService.getProblemsByCitizen(user.id);
      if (list.length > 0) {
        setMyProblems(list);
        if (!selectedProblem) setSelectedProblem(list[0]);
      } else {
        // Fallback demo: hiển thị bài toán của người dân
        const all = AdminDataService.getProblems();
        setMyProblems(all.slice(0, 3));
        if (!selectedProblem && all.length > 0) setSelectedProblem(all[0]);
      }
    } else {
      const all = AdminDataService.getProblems();
      setMyProblems(all.slice(0, 3));
      if (!selectedProblem && all.length > 0) setSelectedProblem(all[0]);
    }
  };

  const handleLookup = (e: React.FormEvent) => {
    e.preventDefault();
    setLookupError(null);
    setLookupResult(null);

    if (!lookupCode.trim()) {
      setLookupError('Vui lòng nhập mã bài toán cần tra cứu (VD: BM-001)');
      return;
    }

    const found = AdminDataService.getProblemByCode(lookupCode.trim());
    if (found) {
      setLookupResult(found);
      setSelectedProblem(found);
    } else {
      setLookupError(`Không tìm thấy bài toán nào có mã "${lookupCode}". Vui lòng kiểm tra lại mã đã được cung cấp.`);
    }
  };

  const handleOpenFeedbackModal = (p: RealProblem) => {
    setFeedbackProblem(p);
    setIsFeedbackOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* Hero Banner */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
                <span>CỔNG THEO DÕI TIẾN ĐỘ DÀNH CHO NGƯỜI DÂN & HỘ DÂN BÌNH MỸ</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Theo Dõi Tiến Độ Giải Quyết & Đánh Giá Kết Quả
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Nơi bà con nông dân, hộ sản xuất và doanh nghiệp địa phương theo dõi trực tiếp các giai đoạn giải quyết bài toán của mình, xem hình ảnh thực tế và gửi phản hồi đánh giá khi hoàn thành.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('real-problems')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Gửi thêm bài toán mới</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Khối Tra cứu nhanh bằng Mã bài toán (Cho người dân không cần đăng nhập) */}
        <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-black text-slate-900 tracking-tight flex items-center gap-2">
                <Search className="w-4 h-4 text-emerald-600" />
                <span>Tra cứu tiến độ nhanh bằng Mã bài toán (BM-xxx)</span>
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Nếu không đăng nhập, bà con vẫn có thể tra cứu an toàn bằng mã bài toán đã được cấp khi gửi biểu mẫu.
              </p>
            </div>
          </div>

          <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={lookupCode}
                onChange={(e) => setLookupCode(e.target.value)}
                placeholder="Nhập mã bài toán (Ví dụ: BM-001, BM-002...)"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono focus:bg-white focus:outline-emerald-600 transition-all font-semibold"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-xs cursor-pointer active:scale-95 flex items-center justify-center gap-1.5"
            >
              <span>TRA CỨU TIẾN ĐỘ</span>
            </button>
          </form>

          {lookupError && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{lookupError}</span>
            </div>
          )}
        </div>

        {/* Nội dung danh sách bài toán & Chi tiết tiến độ */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CỘT TRÁI: Danh sách bài toán của tôi (4 cột) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-emerald-600" />
                <span>Danh sách bài toán ({myProblems.length})</span>
              </h3>
            </div>

            <div className="space-y-2.5">
              {myProblems.map((p) => {
                const isSelected = selectedProblem?.id === p.id;
                const hasFb = AdminDataService.getFeedbacksByProblemId(p.id).length > 0;
                return (
                  <div
                    key={p.id}
                    onClick={() => setSelectedProblem(p)}
                    className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-emerald-50/80 border-[#00875a] shadow-xs ring-1 ring-emerald-500/30'
                        : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2 mb-1.5">
                      <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                        {p.code || 'BM-XXX'}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        p.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                        p.status === 'evaluating' ? 'bg-amber-100 text-amber-800' :
                        'bg-sky-100 text-sky-800'
                      }`}>
                        {p.status === 'completed' && 'Đã hoàn thành'}
                        {p.status === 'evaluating' && 'Chờ đánh giá'}
                        {p.status === 'in_progress' && 'Đang triển khai'}
                        {p.status === 'seeking_support' && 'Kết nối nguồn lực'}
                        {p.status === 'verified' && 'Đã xác minh'}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {p.title}
                    </h4>

                    <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500">
                      <span>{p.createdAt}</span>
                      {p.status === 'completed' && (
                        <span className={`font-bold px-2 py-0.5 rounded text-[10px] ${
                          hasFb ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-900 animate-pulse'
                        }`}>
                          {hasFb ? '✓ Đã gửi Feedback' : '★ Chờ đánh giá'}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* CỘT PHẢI: Timeline và Đánh giá Feedback (8 cột) */}
          <div className="lg:col-span-8 space-y-6">
            {selectedProblem ? (
              <div className="space-y-6">

                {/* Banner Tóm tắt bài toán & Nút Đánh giá Feedback */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                    <div>
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
                        {selectedProblem.code || 'BM-XXX'}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">
                        {selectedProblem.title}
                      </h2>
                    </div>

                    {/* Nút gửi đánh giá chỉ mở khi bài toán completed */}
                    {selectedProblem.status === 'completed' && (
                      <button
                        onClick={() => handleOpenFeedbackModal(selectedProblem)}
                        className="px-5 py-2.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer flex items-center gap-2 shrink-0"
                      >
                        <Sparkles className="w-4 h-4 text-amber-300" />
                        <span>Đánh giá kết quả (Feedback)</span>
                      </button>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-normal">
                    {selectedProblem.description}
                  </p>
                </div>

                {/* Timeline trực quan 6 giai đoạn */}
                <ProblemTimeline
                  problem={selectedProblem}
                  onOpenFeedback={() => handleOpenFeedbackModal(selectedProblem)}
                  hasFeedbackAlready={AdminDataService.getFeedbacksByProblemId(selectedProblem.id).length > 0}
                />

              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
                Chọn một bài toán ở danh sách bên trái hoặc nhập mã BM-xxx để xem tiến độ chi tiết.
              </div>
            )}
          </div>

        </div>

        {/* Modal Feedback */}
        <ProblemFeedbackModal
          problem={feedbackProblem}
          isOpen={isFeedbackOpen}
          onClose={() => setIsFeedbackOpen(false)}
          onFeedbackSubmitted={() => {
            loadData();
          }}
        />

      </div>
    </div>
  );
};
