import React, { useState } from 'react';
import { AdminDataService } from '../../services/adminDataService';
import { ShieldCheck, Lock, User, Eye, EyeOff, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

interface AdminLoginPageProps {
  onLoginSuccess: () => void;
  onBackToHome: () => void;
}

export const AdminLoginPage: React.FC<AdminLoginPageProps> = ({
  onLoginSuccess,
  onBackToHome
}) => {
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('admin123');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    setTimeout(() => {
      const res = AdminDataService.login(username, password);
      setIsLoading(false);
      if (res.success) {
        onLoginSuccess();
      } else {
        setError(res.error || 'Đăng nhập không thành công.');
      }
    }, 400);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex flex-col justify-center items-center p-4 relative overflow-hidden font-sans">
      
      {/* Decorative background glows */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Back to main website button */}
      <button
        onClick={onBackToHome}
        className="absolute top-6 left-6 inline-flex items-center gap-2 text-xs font-semibold text-slate-300 hover:text-white bg-white/10 hover:bg-white/15 px-4 py-2 rounded-xl backdrop-blur-md transition-all cursor-pointer border border-white/10"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        <span>Về trang chủ Làng SV</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 space-y-6 relative z-10 animate-in zoom-in-95 duration-200">
        
        {/* Header / Logo */}
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center mx-auto shadow-lg shadow-emerald-900/20">
            <ShieldCheck className="w-7 h-7 text-emerald-100" />
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            CỔNG QUẢN TRỊ ADMIN
          </h1>
          <p className="text-xs text-slate-500">
            Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ
          </p>
        </div>

        {/* Error alert */}
        {error && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-2xl flex items-start gap-2.5 text-xs text-rose-700 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Tài khoản hoặc Email
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin hoặc admin@binhmy.edu.vn"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600 focus:border-emerald-600 transition-all font-medium"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 uppercase tracking-wider">
              Mật khẩu quản trị
            </label>
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

          {/* Login button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-70 mt-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Đang xác thực quyền truy cập...</span>
              </>
            ) : (
              <span>ĐĂNG NHẬP VÀO HỆ THỐNG</span>
            )}
          </button>

        </form>

        {/* Demo credentials hint */}
        <div className="p-3 bg-emerald-50/80 border border-emerald-200/80 rounded-2xl text-[11px] text-emerald-900 space-y-1">
          <div className="font-bold flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Tài khoản thử nghiệm sẵn có:</span>
          </div>
          <p className="text-emerald-800 pl-5">
            Tài khoản: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">admin</code> | Mật khẩu: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-emerald-200">admin123</code>
          </p>
        </div>

        {/* Footer info */}
        <p className="text-center text-[10px] text-slate-400">
          Khu vực bảo mật nội bộ Ban Quản lý Làng SV Bình Mỹ. Mọi phiên đăng nhập đều được lưu nhật ký.
        </p>

      </div>
    </div>
  );
};
