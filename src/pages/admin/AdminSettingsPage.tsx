import React, { useState, useEffect } from 'react';
import { AdminDataService, AdminUser } from '../../services/adminDataService';
import {
  Settings,
  User,
  ShieldCheck,
  Bell,
  Database,
  RefreshCw,
  Download,
  CheckCircle2,
  AlertTriangle,
  Server,
  Lock,
  Globe,
  Sliders
} from 'lucide-react';

export const AdminSettingsPage: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [emailNotify, setEmailNotify] = useState(true);
  const [autoVerify, setAutoVerify] = useState(false);
  const [requireAttachment, setRequireAttachment] = useState(false);
  const [portalSync, setPortalSync] = useState(true);

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);

  useEffect(() => {
    setCurrentUser(AdminDataService.getCurrentUser());
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleResetData = () => {
    AdminDataService.resetToSampleData();
    setResetConfirmOpen(false);
    showToast('Đã khôi phục toàn bộ cơ sở dữ liệu mẫu ban đầu!');
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleExportJson = () => {
    const data = {
      problems: AdminDataService.getProblems(),
      proposals: AdminDataService.getProposals(),
      projects: AdminDataService.getProjects(),
      news: AdminDataService.getNews(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `binhmy_admin_data_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Đã tải xuống bản sao lưu dữ liệu JSON!');
  };

  return (
    <div className="space-y-6 max-w-5xl">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded-full border border-slate-200">
            Hệ thống & Cấu hình
          </span>
          <span className="text-xs text-slate-400">Phiên bản Admin v2.1</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900">Cài đặt Hệ thống Quản trị</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Quản lý tài khoản Admin, thiết lập quy trình kiểm duyệt và trạng thái kết nối máy chủ.
        </p>
      </div>

      {/* 1. Admin Profile Card */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-4 h-4 text-emerald-600" />
          Thông tin Tài khoản Quản trị
        </h2>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
          <img
            src={currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'}
            alt="Avatar"
            className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-sm"
          />
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-slate-900 text-base">{currentUser?.fullName || 'Lloyd1112 (Admin)'}</span>
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800 uppercase">
                {currentUser?.role || 'Super Admin'}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-mono">
              Tên đăng nhập: <strong className="text-slate-800">{currentUser?.username || 'admin'}</strong> • Email: <strong className="text-slate-800">{currentUser?.email || 'admin@binhmy.edu.vn'}</strong>
            </p>
            <p className="text-xs text-slate-400">
              Quyền hạn: Toàn quyền kiểm duyệt bài toán, quản lý đề xuất hợp tác, xuất bản dự án và tin tức.
            </p>
          </div>
        </div>
      </div>

      {/* 2. System Settings & Workflow controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Sliders className="w-4 h-4 text-emerald-600" />
          Quy chuẩn Nghiệp vụ & Thông báo
        </h2>

        <div className="space-y-3">
          
          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
            <input
              type="checkbox"
              checked={emailNotify}
              onChange={(e) => setEmailNotify(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-emerald-600 rounded-sm focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Thông báo email tức thì khi có bài toán hoặc đơn hợp tác mới</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Gửi thông báo đến hòm thư điều hành admin@binhmy.edu.vn ngay khi người dân hoặc sinh viên gửi form.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
            <input
              type="checkbox"
              checked={portalSync}
              onChange={(e) => setPortalSync(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-emerald-600 rounded-sm focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Đồng bộ dữ liệu thời gian thực giữa Quản trị và Cổng thông tin công khai</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Các bài toán và dự án sau khi được Admin ấn "Duyệt & Công khai" sẽ hiển thị ngay lập tức ra ngoài website.
              </div>
            </div>
          </label>

          <label className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200 cursor-pointer hover:bg-slate-100/60 transition-colors">
            <input
              type="checkbox"
              checked={autoVerify}
              onChange={(e) => setAutoVerify(e.target.checked)}
              className="w-4 h-4 mt-0.5 text-emerald-600 rounded-sm focus:ring-emerald-500"
            />
            <div>
              <div className="text-xs font-bold text-slate-800">Chế độ tự động xác minh bài toán (Không khuyến nghị)</div>
              <div className="text-[11px] text-slate-500 mt-0.5">
                Mặc định tắt. Theo quy định Mục 6.5, bài toán do người dùng gửi lên luôn phải ở trạng thái "Chờ xác minh" để Admin rà soát.
              </div>
            </div>
          </label>

        </div>
      </div>

      {/* 3. Database & Deployment Architecture (Section 11) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Server className="w-4 h-4 text-emerald-600" />
          Kiến trúc Backend & Lưu trữ (Mục 11 Master Prompt)
        </h2>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs text-slate-600 leading-relaxed">
          <p>
            <strong className="text-slate-800">Trạng thái lưu trữ hiện tại:</strong> Hệ thống đang sử dụng cơ chế lưu trữ <strong>AdminDataService (Local Persistence v3)</strong>, kết nối dữ liệu dùng chung giữa các trang công khai (Trang chủ, Bài toán thực tế, Đề xuất giải pháp) và khu vực Quản trị Admin. Dữ liệu tạo mới, duyệt bài, đổi trạng thái và tạo dự án đều được lưu giữ bền vững trong trình duyệt.
          </p>

          <div className="p-3 bg-white rounded-xl border border-slate-200 font-mono text-[11px] space-y-1 text-slate-700">
            <div className="text-emerald-700 font-bold">• API Endpoints sẵn sàng tích hợp Backend (Node.js / Express / Spring Boot):</div>
            <div>- GET /api/admin/problems & PATCH /api/admin/problems/:id/moderate</div>
            <div>- GET /api/admin/proposals & PATCH /api/admin/proposals/:id/status</div>
            <div>- GET /api/admin/projects & POST /api/admin/projects (Create / Publish)</div>
            <div>- POST /api/admin/auth/login & GET /api/admin/auth/me</div>
          </div>
        </div>

        {/* Data Tools */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleExportJson}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-colors"
          >
            <Download className="w-4 h-4 text-slate-600" />
            <span>Sao lưu dữ liệu (Export JSON)</span>
          </button>

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-xl text-xs font-bold transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-rose-600" />
            <span>Khôi phục dữ liệu mẫu ban đầu</span>
          </button>
        </div>
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-scale-up space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Khôi phục dữ liệu ban đầu?</h3>
              <p className="text-xs text-slate-500 mt-1">
                Tất cả bài toán, đơn đề xuất và dự án bạn đã chỉnh sửa sẽ được đặt lại về dữ liệu ban đầu của dự án Bình Mỹ.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={handleResetData}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700"
              >
                Xác nhận khôi phục
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
