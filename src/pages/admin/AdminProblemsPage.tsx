import React, { useState, useEffect } from 'react';
import { AdminDataService } from '../../services/adminDataService';
import { RealProblem, ProblemStatus, ProblemCategory } from '../../types';
import {
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  Eye,
  Check,
  X,
  AlertCircle,
  MapPin,
  Calendar,
  User,
  Building2,
  Phone,
  Mail,
  FolderPlus,
  Archive,
  RefreshCw,
  FileText,
  Tag,
  ArrowRight
} from 'lucide-react';

interface AdminProblemsPageProps {
  onOpenProblemDetail?: (id: string) => void;
  onCreateProjectFromProblem: (problem: RealProblem) => void;
  preSelectedProblemId?: string | null;
}

export const AdminProblemsPage: React.FC<AdminProblemsPageProps> = ({
  onCreateProjectFromProblem,
  preSelectedProblemId
}) => {
  const [problems, setProblems] = useState<RealProblem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Detail / Moderation modal state
  const [activeProblem, setActiveProblem] = useState<RealProblem | null>(null);
  const [moderationAction, setModerationAction] = useState<'approve' | 'reject' | 'request_update' | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProblems();
  }, []);

  useEffect(() => {
    if (preSelectedProblemId) {
      const p = AdminDataService.getProblemById(preSelectedProblemId);
      if (p) setActiveProblem(p);
    }
  }, [preSelectedProblemId]);

  const loadProblems = () => {
    const list = AdminDataService.getProblems();
    setProblems([...list]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Filtered list
  const filteredProblems = problems.filter(p => {
    if (selectedCategory !== 'all' && p.category !== selectedCategory) return false;
    if (selectedStatus !== 'all' && p.status !== selectedStatus) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = (p.title || '').toLowerCase().includes(q);
      const matchSubmitter = (p.contactName || '').toLowerCase().includes(q) || (p.organizationName || '').toLowerCase().includes(q);
      const matchId = p.id.toLowerCase().includes(q);
      const matchLoc = (p.location || '').toLowerCase().includes(q);
      return matchTitle || matchSubmitter || matchId || matchLoc;
    }
    return true;
  });

  const getStatusBadge = (status: ProblemStatus | string) => {
    switch (status) {
      case 'verified':
        return { text: 'Đã xác minh (Công khai)', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'seeking_support':
        return { text: 'Đang tìm người hỗ trợ', color: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'in_progress':
        return { text: 'Đang triển khai', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'rejected':
        return { text: 'Đã từ chối', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'needs_update':
        return { text: 'Yêu cầu bổ sung', color: 'bg-orange-100 text-orange-800 border-orange-300' };
      case 'pending':
      default:
        return { text: 'Chờ xác minh', color: 'bg-amber-100 text-amber-900 border-amber-300' };
    }
  };

  // Moderation handler
  const handleConfirmModeration = () => {
    if (!activeProblem || !moderationAction) return;

    if (moderationAction === 'approve') {
      AdminDataService.updateProblemStatus(activeProblem.id, 'verified');
      showToast(`Đã duyệt & công khai bài toán "${activeProblem.title}" thành công!`);
    } else if (moderationAction === 'reject') {
      AdminDataService.updateProblemStatus(activeProblem.id, 'rejected', reasonInput);
      showToast(`Đã chuyển bài toán sang trạng thái từ chối.`);
    } else if (moderationAction === 'request_update') {
      AdminDataService.updateProblemStatus(activeProblem.id, 'needs_update', reasonInput);
      showToast(`Đã lưu yêu cầu bổ sung thông tin.`);
    }

    setModerationAction(null);
    setReasonInput('');
    loadProblems();
    // Refresh active problem
    const updated = AdminDataService.getProblemById(activeProblem.id);
    setActiveProblem(updated);
  };

  return (
    <div className="space-y-6">

      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 p-4 bg-slate-900 text-white text-xs font-semibold rounded-2xl shadow-xl flex items-center gap-2.5 animate-in slide-in-from-bottom duration-200">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header title & stats preview */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
            Quản lý & Kiểm duyệt Bài toán thực tế
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tiếp nhận, kiểm tra tính xác thực và quyết định công khai các bài toán của người dân và doanh nghiệp.
          </p>
        </div>

        <button
          onClick={loadProblems}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs self-start sm:self-auto"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
          <span>Làm mới dữ liệu</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center gap-3">
        
        {/* Search */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo mã bài toán, tiêu đề, người gửi, địa điểm..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600 focus:border-emerald-600 transition-all"
          />
        </div>

        {/* Category filter */}
        <div className="w-full md:w-48">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-emerald-600 font-medium cursor-pointer"
          >
            <option value="all">Tất cả lĩnh vực</option>
            <option value="agriculture">Nông nghiệp</option>
            <option value="health">Y tế</option>
            <option value="tourism">Du lịch</option>
            <option value="other">Khác</option>
          </select>
        </div>

        {/* Status filter */}
        <div className="w-full md:w-52">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 focus:outline-emerald-600 font-medium cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác minh</option>
            <option value="verified">Đã xác minh / Công khai</option>
            <option value="seeking_support">Đang tìm người hỗ trợ</option>
            <option value="in_progress">Đang triển khai</option>
            <option value="needs_update">Yêu cầu bổ sung</option>
            <option value="rejected">Từ chối</option>
          </select>
        </div>

      </div>

      {/* Problems Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-4">Mã</th>
                <th className="py-3.5 px-4">Tiêu đề bài toán</th>
                <th className="py-3.5 px-4">Người / Đơn vị gửi</th>
                <th className="py-3.5 px-4">Lĩnh vực</th>
                <th className="py-3.5 px-4">Địa điểm</th>
                <th className="py-3.5 px-4">Ngày gửi</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProblems.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    Không tìm thấy bài toán nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((p) => {
                  const statusInfo = getStatusBadge(p.status);
                  const code = p.id.startsWith('prob-') ? `BM-${p.id.replace('prob-', '').padStart(3, '0')}` : p.id;
                  return (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-600">
                        {code}
                      </td>
                      <td className="py-3.5 px-4 max-w-xs">
                        <button
                          onClick={() => setActiveProblem(p)}
                          className="font-bold text-slate-900 hover:text-emerald-700 transition-colors text-left line-clamp-2 cursor-pointer"
                        >
                          {p.title}
                        </button>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{p.contactName}</div>
                        <div className="text-[11px] text-slate-400 truncate max-w-[150px]">
                          {p.organizationName || p.submitterType}
                        </div>
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className="capitalize font-medium text-slate-700">
                          {p.categoryDetail || p.category}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 max-w-[140px] truncate text-slate-500">
                        {p.location}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap text-slate-500 font-mono text-[11px]">
                        {p.createdAt}
                      </td>
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold border ${statusInfo.color}`}>
                          {statusInfo.text}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right whitespace-nowrap">
                        <div className="inline-flex items-center gap-1.5">
                          <button
                            onClick={() => setActiveProblem(p)}
                            className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-all cursor-pointer flex items-center gap-1"
                            title="Xem chi tiết và kiểm duyệt"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Chi tiết</span>
                          </button>

                          {p.status === 'pending' && (
                            <button
                              onClick={() => {
                                setActiveProblem(p);
                                setModerationAction('approve');
                              }}
                              className="px-2.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all cursor-pointer"
                              title="Duyệt nhanh bài toán"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        <div className="p-4 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Hiển thị <strong>{filteredProblems.length}</strong> bài toán</span>
          <span>Chỉ bài toán có trạng thái <strong>Đã xác minh / Công khai</strong> mới xuất hiện trên website người dùng</span>
        </div>
      </div>

      {/* ================= MODAL CHI TIẾT & KIỂM DUYỆT BÀI TOÁN ================= */}
      {activeProblem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div 
            className="bg-white rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[92vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            
            {/* Modal Header */}
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#00875a] text-white flex items-center justify-center font-bold">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900">
                    Chi tiết & Kiểm duyệt Bài toán thực tế
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Mã: {activeProblem.id.startsWith('prob-') ? `BM-${activeProblem.id.replace('prob-', '').padStart(3, '0')}` : activeProblem.id} • Ngày gửi: {activeProblem.createdAt}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(activeProblem.status).color}`}>
                  {getStatusBadge(activeProblem.status).text}
                </span>
                <button
                  onClick={() => { setActiveProblem(null); setModerationAction(null); }}
                  className="w-8 h-8 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-slate-700 transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 text-xs sm:text-sm">
              
              {/* Tiêu đề & Thông tin người đăng */}
              <div className="space-y-3">
                <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug">
                  {activeProblem.title}
                </h2>

                {/* Box thông tin liên hệ riêng tư (Dành cho Admin) */}
                <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 space-y-2">
                  <div className="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <User className="w-4 h-4 text-emerald-700" />
                    <span>THÔNG TIN LIÊN HỆ NGƯỜI ĐĂNG (BẢO MẬT ADMIN)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-1">
                    <div>
                      <span className="text-slate-500 block">Họ và tên:</span>
                      <strong className="text-slate-800 font-semibold">{activeProblem.contactName}</strong> ({activeProblem.submitterType})
                    </div>
                    <div>
                      <span className="text-slate-500 block">Số điện thoại:</span>
                      <strong className="text-slate-800 font-semibold">{activeProblem.phoneNumber || '090x xxx xxx'}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block">Email liên hệ:</span>
                      <strong className="text-slate-800 font-semibold">{activeProblem.email || 'lienhe@example.com'}</strong>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 pt-1 border-t border-emerald-200/60 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-700 shrink-0" />
                    <span><strong>Địa điểm:</strong> {activeProblem.location}</span>
                  </div>
                </div>
              </div>

              {/* Chi tiết nội dung bài toán */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                    Mô tả thực trạng & Khó khăn
                  </span>
                  <p className="text-slate-700 leading-relaxed whitespace-pre-line text-xs">
                    {activeProblem.description}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                    Nguyên nhân & Thiệt hại
                  </span>
                  <div className="space-y-1.5 text-xs text-slate-700">
                    <p><strong>Nguyên nhân:</strong> {activeProblem.cause || 'Chưa cung cấp'}</p>
                    <p><strong>Thiệt hại / Khó khăn:</strong> {activeProblem.damages || 'Chưa cung cấp'}</p>
                    <p><strong>Giải pháp đã thử:</strong> {activeProblem.triedSolutions || 'Chưa từng áp dụng'}</p>
                  </div>
                </div>

              </div>

              {/* Nhu cầu hỗ trợ & Kỳ vọng */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                  Nhu cầu hỗ trợ & Kỳ vọng
                </span>
                <p className="text-xs text-slate-700">
                  <strong>Kết quả mong muốn:</strong> {activeProblem.desiredOutcome}
                </p>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-xs font-semibold text-slate-500">Lĩnh vực cần hỗ trợ:</span>
                  {activeProblem.supportNeeded.map((s, idx) => (
                    <span key={idx} className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-100 text-emerald-800">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Hình ảnh minh chứng */}
              {activeProblem.images && activeProblem.images.length > 0 && (
                <div className="space-y-2">
                  <span className="font-bold text-slate-800 block text-xs uppercase tracking-wider">
                    Hình ảnh minh chứng thực tế ({activeProblem.images.length})
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {activeProblem.images.map((img, idx) => (
                      <div key={idx} className="h-28 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                        <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* KHUNG THAO TÁC KIỂM DUYỆT NẾU CHỌN ACTION */}
              {moderationAction && (
                <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 space-y-3 animate-in fade-in">
                  <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-700" />
                    <span>
                      {moderationAction === 'approve' && 'Xác nhận Duyệt & Công khai bài toán này lên website'}
                      {moderationAction === 'reject' && 'Xác nhận Từ chối bài toán này'}
                      {moderationAction === 'request_update' && 'Gửi Yêu cầu bổ sung thông tin cho người đăng'}
                    </span>
                  </h4>

                  {moderationAction !== 'approve' && (
                    <textarea
                      rows={3}
                      value={reasonInput}
                      onChange={(e) => setReasonInput(e.target.value)}
                      placeholder="Nhập lý do từ chối hoặc nội dung cần người đăng bổ sung thêm..."
                      className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs text-slate-800 focus:outline-emerald-600 leading-relaxed"
                    />
                  )}

                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleConfirmModeration}
                      className={`px-5 py-2 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer ${
                        moderationAction === 'approve' 
                          ? 'bg-[#00875a] hover:bg-[#00734c]' 
                          : moderationAction === 'reject'
                          ? 'bg-rose-600 hover:bg-rose-700'
                          : 'bg-amber-600 hover:bg-amber-700'
                      }`}
                    >
                      Xác nhận thực hiện
                    </button>
                    <button
                      onClick={() => setModerationAction(null)}
                      className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-amber-100 cursor-pointer"
                    >
                      Hủy bỏ
                    </button>
                  </div>
                </div>
              )}

            </div>

            {/* Modal Action Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
              
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => setModerationAction('approve')}
                  className="px-4 py-2 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Duyệt & Công khai</span>
                </button>

                <button
                  onClick={() => setModerationAction('request_update')}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>Yêu cầu bổ sung</span>
                </button>

                <button
                  onClick={() => setModerationAction('reject')}
                  className="px-3.5 py-2 rounded-xl bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 font-bold text-xs cursor-pointer flex items-center gap-1.5"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Từ chối</span>
                </button>
              </div>

              {/* Nút quan trọng: Tạo dự án từ bài toán này */}
              <button
                onClick={() => {
                  onCreateProjectFromProblem(activeProblem);
                  setActiveProblem(null);
                }}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                title="Tạo dự án mới với thông tin nguồn từ bài toán này"
              >
                <FolderPlus className="w-4 h-4" />
                <span>Tạo dự án từ bài toán này</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
