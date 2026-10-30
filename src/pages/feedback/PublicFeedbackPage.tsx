import React, { useState, useEffect } from 'react';
import { RealProblem, FeedbackToken } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { useLanguage } from '../../context/LanguageContext';
import { ProblemFeedbackModal } from '../../components/feedback/ProblemFeedbackModal';
import {
  Sparkles,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileQuestion,
  MapPin,
  Calendar,
  UserCheck
} from 'lucide-react';

interface PublicFeedbackPageProps {
  onNavigate: (tab: string) => void;
}

export const PublicFeedbackPage: React.FC<PublicFeedbackPageProps> = ({
  onNavigate
}) => {
  const { language } = useLanguage();
  const [tokenInput, setTokenInput] = useState('');
  const [validatedToken, setValidatedToken] = useState<FeedbackToken | null>(null);
  const [validatedProblem, setValidatedProblem] = useState<RealProblem | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  useEffect(() => {
    // Đọc token từ URL query param nếu có: ?token=BM-FB-xxxx
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const urlToken = params.get('token');
      if (urlToken) {
        setTokenInput(urlToken);
        handleValidate(urlToken);
      }
    }
  }, []);

  const handleValidate = (tokStr: string) => {
    setErrorMessage(null);
    setValidatedToken(null);
    setValidatedProblem(null);
    setIsConfirmed(false);

    const res = AdminDataService.validateFeedbackToken(tokStr.trim());
    if (res.valid && res.token && res.problem) {
      setValidatedToken(res.token);
      setValidatedProblem(res.problem);
    } else {
      setErrorMessage(res.error || 'Mã truy cập đánh giá không hợp lệ hoặc đã hết hạn.');
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenInput.trim()) {
      setErrorMessage('Vui lòng nhập mã liên kết đánh giá được cung cấp.');
      return;
    }
    handleValidate(tokenInput.trim());
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Header Title */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-[#00875a] text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/10">
            <Sparkles className="w-7 h-7 text-amber-300" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            CỔNG ĐÁNH GIÁ KẾT QUẢ BÀI TOÁN
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto">
            Dành cho người dân và chủ bài toán nhận được liên kết đánh giá an toàn từ Ban Quản lý Làng Sinh Viên Bình Mỹ.
          </p>
        </div>

        {/* Nhập mã token thủ công nếu chưa có trong URL */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 space-y-4">
          <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-600" />
            <span>Mã liên kết xác thực đánh giá</span>
          </h2>

          <form onSubmit={handleManualSubmit} className="flex gap-2.5">
            <input
              type="text"
              value={tokenInput}
              onChange={(e) => setTokenInput(e.target.value)}
              placeholder="VD: BM-FB-DEMO-2026"
              className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 font-mono font-bold focus:bg-white focus:outline-emerald-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold rounded-xl transition-all shadow-xs cursor-pointer active:scale-95 shrink-0"
            >
              Xác thực mã
            </button>
          </form>

          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-700 flex items-start gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Thông tin bài toán xác thực thành công để người dân kiểm tra */}
        {validatedProblem && validatedToken && (
          <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-lg p-6 space-y-5 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200 w-fit">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Liên kết hợp lệ — Đã xác thực thành công</span>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono font-black text-emerald-800 bg-emerald-100/60 px-2.5 py-0.5 rounded">
                {validatedProblem.code || 'BM-XXX'}
              </span>
              <h3 className="text-lg font-black text-slate-900">
                {validatedProblem.title}
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed font-normal">
                {validatedProblem.description}
              </p>
            </div>

            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Người đăng:</span>
                <span className="font-bold text-slate-800">{validatedProblem.contactName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Địa chỉ:</span>
                <span className="font-bold text-slate-800">{validatedProblem.location}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-500">Trạng thái:</span>
                <span className="font-bold text-emerald-700 uppercase">ĐÃ HOÀN THÀNH NGHIỆM THU</span>
              </div>
            </div>

            {/* Xác nhận bài toán đúng của mình */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <label className="inline-flex items-center gap-2 text-xs font-bold text-slate-800 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isConfirmed}
                  onChange={(e) => setIsConfirmed(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                />
                <span>Tôi xác nhận đúng là bài toán thực tế của tôi</span>
              </label>

              <button
                disabled={!isConfirmed}
                onClick={() => setIsModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-black shadow-md hover:shadow-lg transition-all active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>BẮT ĐẦU ĐÁNH GIÁ KẾT QUẢ</span>
              </button>
            </div>
          </div>
        )}

        {/* Modal Feedback */}
        <ProblemFeedbackModal
          problem={validatedProblem}
          isOpen={isModalOpen}
          accessToken={validatedToken?.token}
          onClose={() => setIsModalOpen(false)}
          onFeedbackSubmitted={() => {
            if (validatedToken) {
              handleValidate(validatedToken.token);
            }
          }}
        />

      </div>
    </div>
  );
};
