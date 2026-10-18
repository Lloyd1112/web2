import React, { useState, useEffect } from 'react';
import { AdminDataService, AdminUser } from '../../services/adminDataService';
import {
  LayoutDashboard,
  FileQuestion,
  Users,
  FolderKanban,
  Newspaper,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Handshake,
  UserCheck
} from 'lucide-react';

interface AdminLayoutProps {
  currentTab: string;
  onNavigate: (tab: string) => void;
  onLogout: () => void;
  children: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({
  currentTab,
  onNavigate,
  onLogout,
  children
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [stats, setStats] = useState(AdminDataService.getDashboardStats());
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(AdminDataService.getCurrentUser());
    const updateStats = () => setStats(AdminDataService.getDashboardStats());
    updateStats();
    const unsubscribe = AdminDataService.subscribe(updateStats);
    const interval = setInterval(updateStats, 3000);
    return () => {
      unsubscribe();
      clearInterval(interval);
    };
  }, []);

  const navItems = [
    {
      id: 'admin-dashboard',
      label: 'Tổng quan',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'admin-problems',
      label: 'Bài toán thực tế',
      icon: FileQuestion,
      badge: stats.pendingProblems > 0 ? stats.pendingProblems : null,
      badgeColor: 'bg-amber-500 text-white'
    },
    {
      id: 'admin-proposals',
      label: 'Đơn đề xuất hợp tác',
      icon: Users,
      badge: stats.newProposals > 0 ? stats.newProposals : null,
      badgeColor: 'bg-emerald-600 text-white'
    },
    {
      id: 'admin-projects',
      label: 'Quản lý dự án',
      icon: FolderKanban,
      badge: stats.totalProjects > 0 ? stats.totalProjects : null,
      badgeColor: 'bg-slate-200 text-slate-700'
    },
    {
      id: 'admin-partners',
      label: 'Quản lý đối tác',
      icon: Handshake,
      badge: (stats as any).totalPartners > 0 ? (stats as any).totalPartners : null,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'admin-news',
      label: 'Tin tức & Sự kiện',
      icon: Newspaper,
      badge: null
    },
    {
      id: 'admin-about',
      label: 'Quản lý Về chúng tôi',
      icon: UserCheck,
      badge: (stats as any).totalTeamMembers > 0 ? (stats as any).totalTeamMembers : null,
      badgeColor: 'bg-emerald-100 text-emerald-800'
    },
    {
      id: 'admin-settings',
      label: 'Cài đặt hệ thống',
      icon: Settings,
      badge: null
    }
  ];

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 flex flex-col font-sans">
      
      {/* ================= TOPBAR ================= */}
      <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        
        {/* Left: Mobile hamburger + Brand title */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 lg:hidden cursor-pointer"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 hidden lg:flex cursor-pointer"
            title="Đóng / mở sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center font-black shadow-xs">
              <ShieldCheck className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <span className="font-extrabold text-sm sm:text-base text-slate-900 tracking-tight">
                LÀNG SV BÌNH MỸ
              </span>
              <span className="hidden sm:inline-block ml-2 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-[#006842] border border-emerald-200">
                ADMIN PORTAL
              </span>
            </div>
          </div>
        </div>

        {/* Right: Quick actions, notifications, user pill */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Link to public website */}
          <button
            onClick={() => onNavigate('home')}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-emerald-700 hover:bg-emerald-50/60 border border-slate-200 transition-all cursor-pointer"
            title="Mở giao diện website người dùng"
          >
            <span>Xem website</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsNotifOpen(!isNotifOpen)}
              className="p-2 rounded-xl text-slate-600 hover:bg-slate-100 relative cursor-pointer"
              title="Thông báo công việc mới"
            >
              <Bell className="w-4 h-4" />
              {(stats.pendingProblems > 0 || stats.newProposals > 0) && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            {isNotifOpen && (
              <div 
                className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 p-3 z-50 text-xs space-y-2 animate-in fade-in"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="font-bold text-slate-800 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span>Thông báo công việc cần duyệt</span>
                  <span className="text-[10px] text-slate-400">Tự động cập nhật</span>
                </div>

                <div className="space-y-1.5">
                  <div 
                    onClick={() => { onNavigate('admin-problems'); setIsNotifOpen(false); }}
                    className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-amber-500" />
                      <span>Bài toán chờ duyệt</span>
                    </div>
                    <span className="font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 text-[10px]">
                      {stats.pendingProblems}
                    </span>
                  </div>

                  <div 
                    onClick={() => { onNavigate('admin-proposals'); setIsNotifOpen(false); }}
                    className="p-2 rounded-xl hover:bg-slate-50 cursor-pointer flex items-center justify-between border border-transparent hover:border-slate-200"
                  >
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <span>Đơn đề xuất hợp tác mới</span>
                    </div>
                    <span className="font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px]">
                      {stats.newProposals}
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill & Logout */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full overflow-hidden border border-emerald-400 bg-emerald-100 shrink-0">
              <img
                src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="hidden sm:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                {currentUser?.fullName || 'Quản trị viên'}
              </div>
              <div className="text-[10px] text-emerald-700 font-semibold">
                Super Admin
              </div>
            </div>

            <button
              onClick={onLogout}
              className="p-1.5 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer ml-1"
              title="Đăng xuất khỏi hệ thống Admin"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

        </div>

      </header>

      {/* ================= BODY WITH SIDEBAR & CONTENT ================= */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* DESKTOP SIDEBAR */}
        <aside
          className={`bg-white border-r border-slate-200 transition-all duration-300 hidden lg:flex flex-col justify-between shrink-0 ${
            isSidebarOpen ? 'w-64' : 'w-20'
          }`}
        >
          {/* Menu Items */}
          <div className="p-3.5 space-y-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#00875a] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                  title={item.label}
                >
                  <div className="flex items-center gap-3 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-white' : 'text-slate-500'}`} />
                    {isSidebarOpen && <span className="truncate">{item.label}</span>}
                  </div>

                  {isSidebarOpen && item.badge !== null && (
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-slate-100 space-y-2">
            {isSidebarOpen ? (
              <div className="text-[11px] text-slate-400">
                <p className="font-medium text-slate-600">Làng SV Đổi mới sáng tạo</p>
                <p>Phiên bản Admin 2.4.0</p>
              </div>
            ) : (
              <div className="text-center text-[10px] text-slate-400 font-bold">
                v2.4
              </div>
            )}
          </div>
        </aside>

        {/* MOBILE DRAWER SIDEBAR */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 lg:hidden flex">
            <div 
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs animate-fade-in"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <div className="w-72 bg-white h-full relative z-50 p-4 flex flex-col justify-between shadow-2xl animate-in slide-in-from-left duration-200">
              <div className="space-y-2">
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="font-extrabold text-sm text-slate-900">MENU QUẢN TRỊ</span>
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-1 text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-1.5 pt-2">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    const isActive = currentTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => {
                          onNavigate(item.id);
                          setIsMobileMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between p-3 rounded-2xl text-xs font-semibold cursor-pointer ${
                          isActive
                            ? 'bg-[#00875a] text-white'
                            : 'text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4" />
                          <span>{item.label}</span>
                        </div>
                        {item.badge !== null && (
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isActive ? 'bg-white/20 text-white' : item.badgeColor
                          }`}>
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center justify-center gap-2 p-2.5 rounded-xl bg-rose-50 text-rose-700 text-xs font-bold hover:bg-rose-100 cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* MAIN OUTLET AREA */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1400px] mx-auto space-y-6">
            {children}
          </div>
        </main>

      </div>

    </div>
  );
};
