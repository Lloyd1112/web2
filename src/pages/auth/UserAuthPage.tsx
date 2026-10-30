import React, { useState } from 'react';
import { AdminDataService } from '../../services/adminDataService';
import {
  User,
  Lock,
  Phone,
  Mail,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  CheckCircle2,
  KeyRound,
  ShieldCheck,
  X,
  FileText
} from 'lucide-react';

interface UserAuthPageProps {
  onLoginSuccess: (role?: string) => void;
  onBackToHome: () => void;
  initialTab?: 'login' | 'register';
}

export const UserAuthPage: React.FC<UserAuthPageProps> = ({
  onLoginSuccess,
  onBackToHome,
  initialTab = 'login'
}) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>(initialTab);

  // Login form state
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Register form state (Họ tên, Số điện thoại / Gmail, Mật khẩu, Xác nhận mật khẩu, Ô điều khoản)
  const [regFullName, setRegFullName] = useState('');
  const [regContact, setRegContact] = useState(''); // Số điện thoại / Gmail
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [showRegPassword, setShowRegPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Loading & Alerts
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Modal Điều khoản & Chính sách bảo mật
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [termsType, setTermsType] = useState<'privacy' | 'terms'>('privacy');

  // Modal Quên mật khẩu
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [forgotIdentifier, setForgotIdentifier] = useState('');
  const [forgotNewPassword, setForgotNewPassword] = useState('');
  const [forgotMsg, setForgotMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = AdminDataService.login(loginIdentifier, loginPassword);
      setIsLoading(false);
      if (res.success) {
        const user = AdminDataService.getCurrentUser();
        showToast(`Đăng nhập thành công! Chào mừng ${user?.fullName || 'bạn'}`);
        setTimeout(() => {
          onLoginSuccess(user?.role);
        }, 500);
      } else {
        setError(res.error || 'Số điện thoại/Email hoặc mật khẩu không chính xác.');
      }
    }, 350);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // 1. Kiểm tra ô điều khoản theo đúng Hình 2
    if (!agreeTerms) {
      setError('Vui lòng tích chọn đồng ý với Chính sách bảo mật và Điều khoản sử dụng của Nông Sinh Đồng Hành.');
      return;
    }

    // 2. Kiểm tra mật khẩu & xác nhận mật khẩu
    if (regPassword !== regConfirmPassword) {
      setError('Mật khẩu xác nhận không trùng khớp.');
      return;
    }

    if (regPassword.length < 6) {
      setError('Mật khẩu phải có độ dài tối thiểu 6 ký tự.');
      return;
    }

    // 3. Phân biệt Số điện thoại hoặc Gmail
    const trimmedContact = regContact.trim();
    if (!trimmedContact) {
      setError('Vui lòng nhập Số điện thoại hoặc Gmail của bạn.');
      return;
    }

    const isEmail = trimmedContact.includes('@');
    const phoneVal = isEmail ? '' : trimmedContact;
    const emailVal = isEmail ? trimmedContact : '';

    setIsLoading(true);
    setTimeout(() => {
      const res = AdminDataService.registerCitizen({
        fullName: regFullName.trim(),
        phone: phoneVal,
        email: emailVal,
        password: regPassword
      });

      setIsLoading(false);
      if (res.success) {
        showToast('Đăng ký tài khoản thành công! Đang chuyển hướng...');
        setTimeout(() => {
          onLoginSuccess('citizen');
        }, 800);
      } else {
        setError(res.error || 'Đăng ký không thành công. Vui lòng kiểm tra lại thông tin.');
      }
    }, 400);
  };

  const handleForgotPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!forgotIdentifier.trim() || !forgotNewPassword.trim()) {
      setForgotMsg({ type: 'error', text: 'Vui lòng điền đầy đủ thông tin.' });
      return;
    }

    const res = AdminDataService.resetPassword(forgotIdentifier.trim(), forgotNewPassword.trim());
    if (res.success) {
      setForgotMsg({
        type: 'success',
        text: 'Đặt lại mật khẩu thành công! Bạn có thể sử dụng mật khẩu mới để đăng nhập ngay.'
      });
      setTimeout(() => {
        setIsForgotOpen(false);
        setForgotMsg(null);
        setForgotIdentifier('');
        setForgotNewPassword('');
      }, 2000);
    } else {
      setForgotMsg({
        type: 'error',
        text: res.error || res.message || 'Không tìm thấy tài khoản tương ứng.'
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to main website button */}
      <button
        onClick={onBackToHome}
        className="absolute top-5 left-5 inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer border border-white/10 z-20"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Về trang chủ Làng SV</span>
      </button>

      {/* Toast notification */}
      {successToast && (
        <div className="fixed top-6 right-6 z-50 p-4 bg-emerald-900 text-white text-xs font-semibold rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200 border border-emerald-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successToast}</span>
        </div>
      )}

      {/* Main Container Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 relative z-10 animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <User className="w-7 h-7 text-emerald-100" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            CỔNG THÀNH VIÊN & NGƯỜI DÂN
          </h1>
          <p className="text-xs text-slate-500">
            Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ
          </p>
        </div>

        {/* Tab Switcher: Đăng nhập vs Đăng ký */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đăng nhập</span>
          </button>

          <button
            type="button"
            onClick={() => { setActiveTab('register'); setError(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'register'
                ? 'bg-white text-emerald-800 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <User className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đăng ký tài khoản</span>
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* ================= TAB 1: ĐĂNG NHẬP NGƯỜI DÙNG ================= */}
        {activeTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                Số điện thoại, Gmail hoặc Tên tài khoản
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="Nhập SĐT, Gmail hoặc tên tài khoản"
                  className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600 focus:border-emerald-600 transition-all font-medium"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Mật khẩu
                </label>
                <button
                  type="button"
                  onClick={() => { setIsForgotOpen(true); setForgotMsg(null); }}
                  className="text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 hover:underline cursor-pointer"
                >
                  Quên mật khẩu?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showLoginPassword ? 'text' : 'password'}
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600 focus:border-emerald-600 transition-all font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowLoginPassword(!showLoginPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                  title={showLoginPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Login button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng nhập...</span>
                </>
              ) : (
                <span>ĐĂNG NHẬP</span>
              )}
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Chưa có tài khoản?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('register'); setError(null); }}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Đăng ký ngay
              </button>
            </div>

          </form>
        )}

        {/* ================= TAB 2: ĐĂNG KÝ TÀI KHOẢN NGƯỜI DÙNG ================= */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            
            {/* 1. Họ và tên */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regFullName}
                  onChange={(e) => setRegFullName(e.target.value)}
                  placeholder="VD: Nguyễn Văn Ba, Trần Thị Mai..."
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            {/* 2. Số điện thoại / Gmail */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Số điện thoại / Gmail <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={regContact}
                  onChange={(e) => setRegContact(e.target.value)}
                  placeholder="Nhập SĐT hoặc Gmail (VD: 0908123456 hoặc ten@gmail.com)"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600 font-medium"
                />
              </div>
            </div>

            {/* 4. Mật khẩu */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full pl-9 pr-10 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
                <button
                  type="button"
                  onClick={() => setShowRegPassword(!showRegPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  {showRegPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* 5. Xác nhận mật khẩu */}
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Xác nhận mật khẩu <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showRegPassword ? 'text' : 'password'}
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            {/* 6. Ô ĐIỀU KHOẢN CHUẨN NHƯ TRONG HÌNH 2 */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-slate-700 select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 mt-0.5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                />
                <span className="text-xs leading-relaxed">
                  Tôi đồng ý với{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setTermsType('privacy');
                      setIsTermsModalOpen(true);
                    }}
                    className="font-medium text-emerald-800 underline hover:text-emerald-950 inline cursor-pointer"
                  >
                    Chính sách bảo mật
                  </button>{' '}
                  và{' '}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setTermsType('terms');
                      setIsTermsModalOpen(true);
                    }}
                    className="font-medium text-emerald-800 underline hover:text-emerald-950 inline cursor-pointer"
                  >
                    Điều khoản sử dụng
                  </button>{' '}
                  của Nông Sinh Đồng Hành
                </span>
              </label>
            </div>

            {/* Register button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 mt-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng ký...</span>
                </>
              ) : (
                <span>ĐĂNG KÝ TÀI KHOẢN</span>
              )}
            </button>

            <div className="text-center pt-2 text-xs text-slate-500">
              Đã có tài khoản?{' '}
              <button
                type="button"
                onClick={() => { setActiveTab('login'); setError(null); }}
                className="font-bold text-emerald-700 hover:underline cursor-pointer"
              >
                Đăng nhập ngay
              </button>
            </div>

          </form>
        )}

      </div>

      {/* ================= MODAL QUÊN MẬT KHẨU ================= */}
      {isForgotOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <KeyRound className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Khôi phục & Đặt lại mật khẩu
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsForgotOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {forgotMsg && (
              <div className={`p-3 rounded-xl text-xs flex items-start gap-2 ${
                forgotMsg.type === 'success' 
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                {forgotMsg.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
                )}
                <span>{forgotMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleForgotPasswordSubmit} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số điện thoại, Gmail hoặc Tên tài khoản:
                </label>
                <input
                  type="text"
                  required
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="Nhập SĐT hoặc Gmail của bạn"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mật khẩu mới muốn đặt:
                </label>
                <input
                  type="password"
                  required
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  placeholder="Nhập tối thiểu 6 ký tự"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsForgotOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
                >
                  Đóng
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
                >
                  Xác nhận đặt lại
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL ĐIỀU KHOẢN VÀ CHÍNH SÁCH BẢO MẬT ================= */}
      {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <FileText className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  {termsType === 'privacy' 
                    ? 'Chính sách bảo mật - Nông Sinh Đồng Hành' 
                    : 'Điều khoản sử dụng - Nông Sinh Đồng Hành'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsTermsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="overflow-y-auto space-y-3 text-xs text-slate-700 leading-relaxed pr-1 flex-1">
              {termsType === 'privacy' ? (
                <>
                  <p>
                    <strong>1. Mục đích thu thập thông tin:</strong> Hệ thống chỉ thu thập họ tên, số điện thoại và email của người dân, sinh viên và chuyên gia nhằm phục vụ kết nối giải quyết bài toán thực tế tại Xã Bình Mỹ, theo dõi tiến độ công việc và tiếp nhận phản hồi đánh giá kết quả nghiệm thu.
                  </p>
                  <p>
                    <strong>2. Bảo mật thông tin:</strong> Chúng tôi cam kết bảo mật tuyệt đối thông tin cá nhân của người dân. Thông tin liên hệ chỉ được chia sẻ cho đội ngũ sinh viên và chuyên gia được Ban Quản lý phân công trực tiếp phụ trách bài toán.
                  </p>
                  <p>
                    <strong>3. Quyền của người dùng:</strong> Người dùng có toàn quyền xem lại các bài toán đã gửi, cập nhật thông tin cá nhân hoặc yêu cầu xóa dữ liệu bất kỳ lúc nào thông qua Cổng Người dân.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    <strong>1. Trách nhiệm người tham gia:</strong> Người dân và các hộ sản xuất cam kết cung cấp thông tin trung thực, chính xác về hiện trạng khó khăn, nhu cầu hỗ trợ và tinh thần phối hợp cùng đội ngũ sinh viên, chuyên gia.
                  </p>
                  <p>
                    <strong>2. Quy trình đồng hành:</strong> Các giải pháp được triển khai trên tinh thần hỗ trợ cộng đồng, chuyển giao tri thức đổi mới sáng tạo vì sự phát triển bền vững của Xã Bình Mỹ.
                  </p>
                  <p>
                    <strong>3. Đánh giá & Phản hồi:</strong> Sau khi hoàn thành mô hình, người dân có quyền và trách nhiệm gửi phản hồi khách quan qua bảng khảo sát 5 câu hỏi để hoàn thiện chất lượng phục vụ.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 border-t border-slate-100 flex justify-end shrink-0">
              <button
                type="button"
                onClick={() => {
                  setAgreeTerms(true);
                  setIsTermsModalOpen(false);
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Đồng ý & Đóng
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
