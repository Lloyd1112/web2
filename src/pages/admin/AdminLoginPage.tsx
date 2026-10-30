import React, { useState } from 'react';
import { AdminDataService } from '../../services/adminDataService';
import { UserRole } from '../../types';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowLeft,
  AlertCircle,
  GraduationCap,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Building,
  CheckCircle2,
  KeyRound,
  HelpCircle,
  X
} from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToHome
}) => {
  // Tabs: 'login' | 'register'
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  
  // Selected login persona: 'admin' | 'team' | 'citizen'
  const [loginRoleFilter, setLoginRoleFilter] = useState<'all' | 'admin' | 'team' | 'citizen'>('all');

  // Login form state
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Citizen registration form state
  const [regFullName, setRegFullName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regAddress, setRegAddress] = useState('');
  const [regOrg, setRegOrg] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');

  // Forgot password modal
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
      const res = AdminDataService.login(username, password);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Tài khoản hoặc mật khẩu không chính xác.');
      }
    }, 350);
  };

  const handleQuickLogin = (uname: string, pwd: string) => {
    setError(null);
    setIsLoading(true);
    setTimeout(() => {
      const res = AdminDataService.login(uname, pwd);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Đăng nhập không thành công.');
      }
    }, 250);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (regPassword !== regConfirmPassword) {
      setError('Mật khẩu xác nhận không khớp.');
      return;
    }
    if (regPassword.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự.');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      const res = AdminDataService.registerCitizen({
        fullName: regFullName,
        phone: regPhone,
        email: regEmail,
        address: regAddress,
        organization: regOrg,
        password: regPassword
      });

      setIsLoading(false);
      if (res.success) {
        showToast('Đăng ký tài khoản thành công! Đang chuyển hướng...');
        setTimeout(() => {
          onLoginSuccess();
        }, 800);
      } else {
        setError(res.error || 'Đăng ký thất bại. Vui lòng thử lại.');
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
      setForgotMsg({ type: 'success', text: 'Đặt lại mật khẩu thành công! Bạn có thể đăng nhập ngay với mật khẩu mới.' });
      setTimeout(() => {
        setIsForgotOpen(false);
        setForgotMsg(null);
        setForgotIdentifier('');
        setForgotNewPassword('');
      }, 2000);
    } else {
      setForgotMsg({ type: 'error', text: res.error || res.message || 'Không tìm thấy tài khoản tương ứng.' });
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
      <div className="w-full max-w-xl bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 relative z-10 animate-in zoom-in-95 duration-200 my-8">
        
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-7 h-7 text-emerald-100" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight uppercase">
            HỆ THỐNG TÀI KHOẢN VÀ DỊCH VỤ
          </h1>
          <p className="text-xs text-slate-500">
            Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ • Đồng hành cùng Nhân dân & Doanh nghiệp
          </p>
        </div>

        {/* Tab Switcher: Đăng nhập vs Đăng ký Người dân */}
        <div className="grid grid-cols-2 p-1 bg-slate-100 rounded-2xl text-xs font-bold text-slate-600">
          <button
            type="button"
            onClick={() => { setActiveTab('login'); setError(null); }}
            className={`py-2 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'login'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'hover:text-slate-900'
            }`}
          >
            <KeyRound className="w-3.5 h-3.5 text-emerald-600" />
            <span>Đăng nhập hệ thống</span>
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
            <span>Đăng ký tài khoản Người dân</span>
          </button>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* ================= TAB 1: FORM ĐĂNG NHẬP ================= */}
        {activeTab === 'login' && (
          <div className="space-y-4">
            
            {/* Bộ lọc nhóm quyền đối tượng để hướng dẫn người dùng */}
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                Bạn là đối tượng nào?
              </label>
              <div className="grid grid-cols-3 gap-2 text-[11px] font-semibold">
                <button
                  type="button"
                  onClick={() => setLoginRoleFilter(loginRoleFilter === 'admin' ? 'all' : 'admin')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    loginRoleFilter === 'admin'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Ban Quản lý (Admin)
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRoleFilter(loginRoleFilter === 'team' ? 'all' : 'team')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    loginRoleFilter === 'team'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Sinh viên / Chuyên gia
                </button>
                <button
                  type="button"
                  onClick={() => setLoginRoleFilter(loginRoleFilter === 'citizen' ? 'all' : 'citizen')}
                  className={`p-2 rounded-xl border text-center transition-all cursor-pointer ${
                    loginRoleFilter === 'citizen'
                      ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  Người dân / Hộ KD / HTX
                </button>
              </div>
            </div>

            <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
                  Tài khoản, Email hoặc Số điện thoại
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="VD: admin, sv_hutech, bs_quan, to_rau_ap4..."
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
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600 focus:border-emerald-600 transition-all font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer"
                    title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Nút đăng nhập */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Đang xác thực thông tin...</span>
                  </>
                ) : (
                  <span>ĐĂNG NHẬP VÀO HỆ THỐNG</span>
                )}
              </button>
            </form>

            {/* Khối Đăng nhập nhanh 1-Click phục vụ chấm thi / Demo */}
            <div className="pt-4 border-t border-slate-200 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5 uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Đăng nhập nhanh 1-Click để trải nghiệm (Demo):</span>
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {/* Admin */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('admin', 'admin123')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                    AD
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                      Ban Quản Lý (Admin)
                    </div>
                    <div className="text-[10px] text-slate-400">admin / admin123</div>
                  </div>
                </button>

                {/* Sinh viên HUTECH */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('sv_hutech', 'sv123')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-blue-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                    SV
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                      Sinh viên HUTECH (CLB)
                    </div>
                    <div className="text-[10px] text-slate-400">sv_hutech / sv123</div>
                  </div>
                </button>

                {/* Chuyên gia y tế */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('bs_quan', 'bs123')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-teal-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                    BS
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                      ThS. BS. Trần Hoàng Quân
                    </div>
                    <div className="text-[10px] text-slate-400">bs_quan / bs123</div>
                  </div>
                </button>

                {/* Người dân / Hộ kinh doanh */}
                <button
                  type="button"
                  onClick={() => handleQuickLogin('to_rau_ap4', 'citizen123')}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-left transition-all cursor-pointer flex items-center gap-2.5 group"
                >
                  <div className="w-7 h-7 rounded-lg bg-amber-600 text-white flex items-center justify-center shrink-0 font-bold text-[10px]">
                    ND
                  </div>
                  <div className="truncate">
                    <div className="font-bold text-slate-900 group-hover:text-emerald-800">
                      Tổ Rau Sạch Ấp 4 (Dân)
                    </div>
                    <div className="text-[10px] text-slate-400">to_rau_ap4 / citizen123</div>
                  </div>
                </button>
              </div>
            </div>

          </div>
        )}

        {/* ================= TAB 2: FORM ĐĂNG KÝ NGƯỜI DÂN ================= */}
        {activeTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5 text-xs">
            <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-900">
              <strong className="block text-[11px] font-bold">Dành cho Người dân, Hộ kinh doanh, HTX tại Bình Mỹ</strong>
              <span>Tài khoản giúp bạn đăng bài toán thực tế, theo dõi tiến độ xử lý 6 giai đoạn và gửi phản hồi nghiệm thu trực tuyến.</span>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Họ và tên người đăng ký <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={regFullName}
                onChange={(e) => setRegFullName(e.target.value)}
                placeholder="VD: Nguyễn Văn Ba, Trần Thị Mai..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Số điện thoại <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  required
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="09xx xxx xxx"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Email (Tùy chọn)
                </label>
                <input
                  type="email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Địa chỉ / Ấp tại Bình Mỹ <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={regAddress}
                  onChange={(e) => setRegAddress(e.target.value)}
                  placeholder="VD: Ấp 4, Xã Bình Mỹ, Củ Chi"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tên HTX / Hộ kinh doanh (Nếu có)
                </label>
                <input
                  type="text"
                  value={regOrg}
                  onChange={(e) => setRegOrg(e.target.value)}
                  placeholder="VD: Vườn rau hữu cơ Ba Tuấn"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mật khẩu đăng nhập <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  placeholder="Tối thiểu 6 ký tự"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Xác nhận lại mật khẩu <span className="text-rose-500">*</span>
                </label>
                <input
                  type="password"
                  required
                  value={regConfirmPassword}
                  onChange={(e) => setRegConfirmPassword(e.target.value)}
                  placeholder="Nhập lại mật khẩu"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 mt-3"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Đang đăng ký tài khoản...</span>
                </>
              ) : (
                <span>HOÀN TẤT ĐĂNG KÝ TÀI KHOẢN NGƯỜI DÂN</span>
              )}
            </button>
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
                  Tài khoản, Email hoặc Số điện thoại đăng ký:
                </label>
                <input
                  type="text"
                  required
                  value={forgotIdentifier}
                  onChange={(e) => setForgotIdentifier(e.target.value)}
                  placeholder="VD: to_rau_ap4 hoặc 0903111222"
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mật khẩu mới muốn đặt lại:
                </label>
                <input
                  type="password"
                  required
                  value={forgotNewPassword}
                  onChange={(e) => setForgotNewPassword(e.target.value)}
                  placeholder="Nhập mật khẩu mới"
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

    </div>
  );
};
