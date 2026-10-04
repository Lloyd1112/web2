import React, { useState } from 'react';
import { 
  Sprout, 
  Send, 
  User, 
  LogOut, 
  Menu, 
  X, 
  CheckCircle2,
  ChevronDown
} from 'lucide-react';
import { UserSession } from '../../types/livingLab';

interface HeaderProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  userSession: UserSession;
  onOpenLoginModal: () => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onNavigate,
  userSession,
  onOpenLoginModal,
  onLogout,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Trang chủ' },
    { id: 'problems', label: 'Bài toán Bình Mỹ' },
    { id: 'projects', label: 'Dự án' },
    { id: 'community', label: 'Cộng đồng' },
    { id: 'about', label: 'Về Làng SV' },
  ];

  const handleNavClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
    setUserDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/90 shadow-2xs transition-all">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-2">
          
          {/* Left: Brand Logo & Title */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0 group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00875a] to-emerald-400 flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[13px] sm:text-[14px] font-black tracking-tight text-slate-900 uppercase leading-none">
                LÀNG SV
              </span>
              <span className="text-[10px] sm:text-[11px] font-extrabold tracking-tight text-[#00875a] uppercase leading-tight mt-1">
                ĐỔI MỚI SÁNG TẠO BÌNH MỸ
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-2 rounded-xl text-[13.5px] font-bold transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'text-[#00875a] bg-emerald-50/80 shadow-2xs font-extrabold'
                      : 'text-slate-600 hover:text-[#00875a] hover:bg-slate-50'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-2.5">
            
            {/* Primary Action Button: Gửi đề xuất vấn đề (Not inside nav) */}
            <button
              onClick={() => handleNavClick('submit-problem')}
              className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-[13px] font-bold shadow-xs active:scale-95 transition-all cursor-pointer ${
                currentTab === 'submit-problem'
                  ? 'bg-[#00734c] text-white ring-2 ring-emerald-300'
                  : 'bg-[#00875a] hover:bg-[#00734c] text-white'
              }`}
            >
              <Send className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Gửi đề xuất vấn đề</span>
            </button>

            {/* Login / User Session Profile State */}
            {userSession.isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl border border-slate-200 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all cursor-pointer"
                >
                  <img 
                    src={userSession.avatar} 
                    alt={userSession.name}
                    className="w-8 h-8 rounded-full object-cover border border-emerald-500" 
                  />
                  <div className="text-left hidden md:block">
                    <div className="text-xs font-bold text-slate-800 leading-none">
                      {userSession.name}
                    </div>
                    <div className="text-[10px] text-[#00875a] font-semibold mt-0.5">
                      {userSession.role}
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* User Dropdown */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1 z-50 animate-fade-in">
                    <div className="px-3 py-2 border-b border-slate-100 mb-1">
                      <div className="text-xs font-bold text-slate-900">{userSession.name}</div>
                      <div className="text-[11px] text-slate-500">{userSession.role}</div>
                    </div>
                    <button
                      onClick={() => handleNavClick('community')}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Xem hồ sơ cộng đồng</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onOpenLoginModal();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:bg-slate-100 flex items-center gap-2 cursor-pointer"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Đổi vai trò demo</span>
                    </button>
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer border-t border-slate-100 pt-2"
                    >
                      <LogOut className="w-4 h-4 text-red-500" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={onOpenLoginModal}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs sm:text-[13px] font-bold text-slate-700 hover:text-[#00875a] hover:border-emerald-300 hover:bg-slate-50 transition-all cursor-pointer"
              >
                Đăng nhập
              </button>
            )}

          </div>

          {/* Mobile Menu Trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={() => handleNavClick('submit-problem')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold bg-[#00875a] text-white flex items-center gap-1"
            >
              <Send className="w-3 h-3" />
              <span>Gửi đề xuất</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-2 shadow-lg animate-fade-in">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold transition-colors ${
                currentTab === item.id
                  ? 'bg-emerald-50 text-[#00875a] font-extrabold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.label}
            </button>
          ))}
          
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            {userSession.isLoggedIn ? (
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                <div className="flex items-center gap-2.5">
                  <img src={userSession.avatar} alt={userSession.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <div className="text-xs font-bold text-slate-800">{userSession.name}</div>
                    <div className="text-[10px] text-[#00875a] font-semibold">{userSession.role}</div>
                  </div>
                </div>
                <button onClick={onLogout} className="text-xs text-red-500 font-bold hover:underline">
                  Đăng xuất
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLoginModal();
                }}
                className="w-full py-2.5 text-center text-sm font-bold text-slate-700 border border-slate-200 rounded-xl hover:bg-slate-50"
              >
                Đăng nhập
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
