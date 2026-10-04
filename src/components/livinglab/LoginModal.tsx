import React, { useState } from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  FlaskConical, 
  Building2, 
  Tractor,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { UserSession } from '../../types/livingLab';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (session: UserSession) => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess
}) => {
  if (!isOpen) return null;

  const demoAccounts = [
    {
      name: 'Nguyễn Văn An',
      role: 'Sinh viên CNTT (ĐH HUTECH)',
      roleType: 'student' as const,
      icon: GraduationCap,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      desc: 'Muốn tìm bài toán thực tế và tham gia dự án công nghệ'
    },
    {
      name: 'TS. Đặng Minh Tuấn',
      role: 'Chuyên gia Cố vấn ĐMST',
      roleType: 'expert' as const,
      icon: FlaskConical,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
      desc: 'Cố vấn chuyên môn và định hướng nghiên cứu ứng dụng'
    },
    {
      name: 'EcoFarm Bình Mỹ',
      role: 'Doanh nghiệp bao tiêu & Đối tác',
      roleType: 'business' as const,
      icon: Building2,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
      desc: 'Tìm kiếm giải pháp chuyển đổi số và tài trợ thử nghiệm'
    },
    {
      name: 'Chú Ba Nghĩa',
      role: 'Hộ nông dân sản xuất bưởi an toàn',
      roleType: 'resident' as const,
      icon: Tractor,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      desc: 'Gửi đề xuất bài toán thực tế và phối hợp thử nghiệm tại vườn'
    }
  ];

  const handleSelectDemo = (acc: typeof demoAccounts[0]) => {
    onLoginSuccess({
      isLoggedIn: true,
      name: acc.name,
      role: acc.role,
      roleType: acc.roleType,
      avatar: acc.avatar
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 sm:p-7 relative space-y-5">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1 pr-6">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00875a] bg-emerald-50 px-2.5 py-0.5 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>NỀN TẢNG LIVING LAB</span>
          </div>
          <h3 className="text-xl font-black text-slate-900 tracking-tight">
            Đăng nhập hệ thống
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Chọn một tài khoản demo đại diện cho các nhóm đối tượng trong hệ sinh thái Living Lab:
          </p>
        </div>

        {/* Demo Accounts List */}
        <div className="space-y-2.5 pt-1">
          {demoAccounts.map((acc, idx) => {
            const Icon = acc.icon;
            return (
              <div
                key={idx}
                onClick={() => handleSelectDemo(acc)}
                className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={acc.avatar}
                    alt={acc.name}
                    className="w-10 h-10 rounded-full object-cover border border-slate-200 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-bold text-slate-900 group-hover:text-[#00875a] transition-colors truncate">
                      {acc.name}
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 truncate">
                      {acc.role}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate mt-0.5">
                      {acc.desc}
                    </div>
                  </div>
                </div>

                <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-[#00875a] group-hover:translate-x-1 transition-all flex-shrink-0" />
              </div>
            );
          })}
        </div>

        {/* Note */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          💡 Bạn có thể chuyển đổi linh hoạt giữa các vai trò bất cứ lúc nào qua avatar tại góc phải thanh Header.
        </div>

      </div>
    </div>
  );
};
