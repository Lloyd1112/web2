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
  ArrowRight,
  Trash2,
  AlertTriangle,
  Users,
  Award,
  MessageSquare,
  Share2,
  ExternalLink,
  ShieldCheck,
  Copy,
  Sparkles,
  TrendingUp,
  HandHeart,
  Plus
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
  const [problemToDelete, setProblemToDelete] = useState<RealProblem | null>(null);
  const [selectedProblemIds, setSelectedProblemIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Quản lý Phân công nhóm & Nghiệm thu
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedAssigneeId, setSelectedAssigneeId] = useState('');
  const [customTeamName, setCustomTeamName] = useState('');
  const [isCompletionModalOpen, setIsCompletionModalOpen] = useState(false);
  const [completionSummaryInput, setCompletionSummaryInput] = useState('');

  // Modal Thêm bài toán mới từ Web Admin
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProblemCategory>('agriculture');
  const [newContactName, setNewContactName] = useState('');
  const [newOrganizationName, setNewOrganizationName] = useState('');
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newLocation, setNewLocation] = useState('Ấp 1, Xã Bình Mỹ, Củ Chi, TP.HCM');
  const [newDescription, setNewDescription] = useState('');
  const [newSupportNeeded, setNewSupportNeeded] = useState('');
  const [newStatus, setNewStatus] = useState<ProblemStatus>('verified');

  const handleCreateProblem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDescription.trim()) {
      showToast('Vui lòng nhập đầy đủ tiêu đề và mô tả bài toán.');
      return;
    }

    const code = AdminDataService.generateProblemCode();
    const now = new Date().toLocaleDateString('vi-VN');
    const createdProblem: RealProblem = {
      id: `prob-${Date.now()}`,
      code,
      title: newTitle.trim(),
      category: newCategory,
      categoryDetail: newCategory === 'agriculture' ? 'Nông nghiệp' : newCategory === 'health' ? 'Y tế' : newCategory === 'tourism' ? 'Du lịch' : 'Khác',
      submitterType: 'Đại diện đơn vị địa phương',
      contactName: newContactName.trim() || 'Ban Quản trị / Người dân',
      organizationName: newOrganizationName.trim() || 'Xã Bình Mỹ, Củ Chi',
      phoneNumber: newPhoneNumber.trim() || '0908 123 456',
      email: newEmail.trim() || 'binhmy@langsinhvien.site',
      location: newLocation.trim() || 'Xã Bình Mỹ, Củ Chi, TP.HCM',
      description: newDescription.trim(),
      occurredTime: 'Từ 6 tháng đến 1 năm',
      affectedAudience: 'Cộng đồng địa phương',
      desiredOutcome: 'Ứng dụng giải pháp đổi mới sáng tạo, chuyển đổi số nâng cao chất lượng đời sống bà con',
      supportNeeded: newSupportNeeded ? newSupportNeeded.split(',').map(s => s.trim()) : ['Công nghệ / Kỹ thuật', 'Nguồn lực sinh viên'],
      readyToCoordinate: 'Có',
      canSupportTesting: 'Có',
      status: newStatus,
      isPublic: newStatus !== 'pending' && newStatus !== 'rejected',
      createdAt: now,
      updatedAt: now,
      images: ['/assets/problems/card1.jpg'],
      statusLogs: [
        { id: `log-${Date.now()}`, status: newStatus, note: 'Khởi tạo trực tiếp từ Web Admin', updatedAt: now, updatedBy: 'Admin' }
      ]
    };

    AdminDataService.saveProblem(createdProblem);
    setIsCreateModalOpen(false);
    // Reset form
    setNewTitle('');
    setNewDescription('');
    setNewSupportNeeded('');
    setNewContactName('');
    setNewOrganizationName('');
    setNewPhoneNumber('');
    setNewEmail('');
    loadProblems();
    showToast(`Đã thêm bài toán "${createdProblem.title}" thành công! Dữ liệu đã đồng bộ ra Trang chủ & Trang Bài toán.`);
  };

  useEffect(() => {
    loadProblems();
    const unsubscribe = AdminDataService.subscribe(() => {
      loadProblems();
    });
    return unsubscribe;
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

  const handleDeleteProblem = (id: string) => {
    AdminDataService.deleteProblem(id);
    loadProblems();
    if (activeProblem?.id === id) {
      setActiveProblem(null);
    }
    setProblemToDelete(null);
    setSelectedProblemIds(prev => prev.filter(item => item !== id));
    showToast('Đã xóa bài toán thực tế thành công!');
  };

  const handleConfirmBulkDelete = () => {
    if (selectedProblemIds.length === 0) return;
    const count = selectedProblemIds.length;
    AdminDataService.deleteMultipleProblems(selectedProblemIds);
    setSelectedProblemIds([]);
    setIsBulkDeleteOpen(false);
    loadProblems();
    if (activeProblem && selectedProblemIds.includes(activeProblem.id)) {
      setActiveProblem(null);
    }
    showToast(`Đã xóa thành công ${count} bài toán thực tế!`);
  };

  const toggleSelectAll = () => {
    if (selectedProblemIds.length === filteredProblems.length) {
      setSelectedProblemIds([]);
    } else {
      setSelectedProblemIds(filteredProblems.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProblemIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
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
      case 'completed':
        return { text: 'Đã hoàn thành', color: 'bg-emerald-100 text-emerald-800 border-emerald-300' };
      case 'evaluating':
        return { text: 'Chờ đánh giá kết quả', color: 'bg-amber-100 text-amber-900 border-amber-300' };
      case 'in_progress':
        return { text: 'Đang triển khai', color: 'bg-purple-100 text-purple-800 border-purple-300' };
      case 'seeking_support':
        return { text: 'Đang kết nối nguồn lực', color: 'bg-sky-100 text-sky-800 border-sky-300' };
      case 'verified':
        return { text: 'Đã xác minh (Công khai)', color: 'bg-teal-100 text-teal-800 border-teal-300' };
      case 'rejected':
        return { text: 'Đã từ chối', color: 'bg-rose-100 text-rose-800 border-rose-300' };
      case 'cancelled':
        return { text: 'Tạm dừng / Hủy', color: 'bg-slate-100 text-slate-700 border-slate-300' };
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
      AdminDataService.updateProblemWorkflowStatus(activeProblem.id, 'verified', 'Admin duyệt xác minh bài toán', 'Admin');
      showToast(`Đã duyệt & công khai bài toán "${activeProblem.title}" thành công!`);
    } else if (moderationAction === 'reject') {
      AdminDataService.updateProblemWorkflowStatus(activeProblem.id, 'rejected', reasonInput || 'Không phù hợp tiêu chí', 'Admin');
      showToast(`Đã chuyển bài toán sang trạng thái từ chối.`);
    } else if (moderationAction === 'request_update') {
      AdminDataService.updateProblemWorkflowStatus(activeProblem.id, 'needs_update' as any, reasonInput, 'Admin');
      showToast(`Đã lưu yêu cầu bổ sung thông tin.`);
    }

    setModerationAction(null);
    setReasonInput('');
    loadProblems();
    const updated = AdminDataService.getProblemById(activeProblem.id);
    setActiveProblem(updated);
  };

  const handleWorkflowTransition = (newStatus: ProblemStatus, note?: string) => {
    if (!activeProblem) return;
    AdminDataService.updateProblemWorkflowStatus(activeProblem.id, newStatus, note, 'Admin');
    showToast(`Đã chuyển trạng thái bài toán sang: ${getStatusBadge(newStatus).text}`);
    loadProblems();
    const updated = AdminDataService.getProblemById(activeProblem.id);
    setActiveProblem(updated);
  };

  const handleAssignTeam = () => {
    if (!activeProblem) return;
    const users = AdminDataService.getUsers();
    const assignee = users.find(u => u.id === selectedAssigneeId);
    const teamName = customTeamName.trim() || assignee?.fullName || 'Nhóm sinh viên / Chuyên gia';
    const memberIds = selectedAssigneeId ? [selectedAssigneeId] : [];

    AdminDataService.assignTeamToProblem(activeProblem.id, teamName, memberIds);
    showToast(`Đã phân công "${teamName}" phụ trách bài toán!`);
    setIsAssignModalOpen(false);
    setSelectedAssigneeId('');
    setCustomTeamName('');
    loadProblems();
    const updated = AdminDataService.getProblemById(activeProblem.id);
    setActiveProblem(updated);
  };

  const handleApproveMilestone = (updateId: string) => {
    if (!activeProblem) return;
    AdminDataService.approveProgressUpdate(activeProblem.id, updateId, 'Admin đã duyệt nghiệm thu mốc công việc');
    showToast('Đã phê duyệt mốc tiến độ thành công!');
    loadProblems();
    const updated = AdminDataService.getProblemById(activeProblem.id);
    setActiveProblem(updated);
  };

  const handleConfirmCompletion = () => {
    if (!activeProblem) return;
    AdminDataService.updateProblemWorkflowStatus(
      activeProblem.id,
      'completed',
      completionSummaryInput.trim() || 'Admin xác nhận hoàn thành nghiệm thu bài toán',
      'Admin'
    );
    const updated = AdminDataService.getProblemById(activeProblem.id);
    if (updated) {
      updated.completionSummary = completionSummaryInput.trim() || activeProblem.completionSummary || 'Đã hoàn thành và chuyển giao cho người dân';
      AdminDataService.saveProblem(updated);
      setActiveProblem(updated);
    }
    setIsCompletionModalOpen(false);
    setCompletionSummaryInput('');
    showToast('Đã xác nhận hoàn thành bài toán! Hệ thống đã mở tiếp nhận Feedback.');
    loadProblems();
  };

  const handleCreateFeedbackToken = () => {
    if (!activeProblem) return;
    try {
      const tok = AdminDataService.generateFeedbackToken(activeProblem.id);
      const url = `${window.location.origin}/feedback?token=${tok.token}`;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(url);
      }
      showToast(`Đã tạo liên kết Feedback: ${tok.token} (Đã tự động sao chép link)`);
      loadProblems();
      const updated = AdminDataService.getProblemById(activeProblem.id);
      setActiveProblem(updated);
    } catch (e: any) {
      showToast(e.message || 'Lỗi khi tạo mã token.');
    }
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

        <div className="flex items-center gap-2.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setIsCreateModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-[#00875a] hover:bg-[#00734c] transition-all cursor-pointer shadow-xs active:scale-98"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Thêm bài toán mới</span>
          </button>

          <button
            type="button"
            onClick={loadProblems}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all cursor-pointer shadow-2xs"
          >
            <RefreshCw className="w-3.5 h-3.5 text-slate-500" />
            <span>Làm mới dữ liệu</span>
          </button>
        </div>
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
            <option value="pending">1. Chờ xác minh</option>
            <option value="verified">2. Đã xác minh (Công khai)</option>
            <option value="seeking_support">3. Đang kết nối nguồn lực</option>
            <option value="in_progress">4. Đang triển khai</option>
            <option value="evaluating">5. Chờ đánh giá kết quả</option>
            <option value="completed">6. Đã hoàn thành</option>
            <option value="rejected">Đã từ chối</option>
            <option value="cancelled">Tạm dừng / Hủy</option>
          </select>
        </div>

      </div>

      {/* Thanh thao tác hàng loạt khi có chọn bài toán */}
      {selectedProblemIds.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-xs font-bold text-rose-950">
              Đã chọn <strong>{selectedProblemIds.length}</strong> bài toán
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProblemIds([])}
              className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
            <button
              onClick={() => setIsBulkDeleteOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa các bài đã chọn ({selectedProblemIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Problems Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3.5 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filteredProblems.length > 0 && selectedProblemIds.length === filteredProblems.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                    title="Chọn tất cả"
                  />
                </th>
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
                  <td colSpan={9} className="py-12 text-center text-slate-400">
                    Không tìm thấy bài toán nào phù hợp với bộ lọc hiện tại.
                  </td>
                </tr>
              ) : (
                filteredProblems.map((p) => {
                  const statusInfo = getStatusBadge(p.status);
                  const code = p.id.startsWith('prob-') ? `BM-${p.id.replace('prob-', '').padStart(3, '0')}` : p.id;
                  const isChecked = selectedProblemIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50/60 transition-colors ${isChecked ? 'bg-rose-50/30' : ''}`}>
                      <td className="py-3.5 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelect(p.id)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                        />
                      </td>
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

                          <button
                            onClick={() => setProblemToDelete(p)}
                            className="px-2.5 py-1.5 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-600 hover:text-white font-bold transition-all cursor-pointer flex items-center gap-1 border border-rose-200 hover:border-rose-600 shadow-2xs"
                            title="Xóa bài toán này"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Xóa</span>
                          </button>
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

              {/* ================= QUẢN LÝ TIẾN ĐỘ 6 GIAI ĐOẠN & PHÂN CÔNG ================= */}
              <div className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-emerald-50/40 border border-emerald-200/80 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-bold text-xs">
                      6
                    </span>
                    <div>
                      <h4 className="font-extrabold text-sm text-slate-900">
                        Điều hành Tiến độ 6 Giai đoạn & Phân công thực hiện
                      </h4>
                      <p className="text-[11px] text-slate-500">
                        Quy trình chuẩn: Tiếp nhận → Thẩm định → Kết nối → Triển khai → Nghiệm thu → Đánh giá người dân
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 font-medium">Tiến độ tổng:</span>
                    <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs">
                      {activeProblem.progressPercentage || (activeProblem.status === 'completed' ? 100 : 20)}%
                    </span>
                  </div>
                </div>

                {/* Chuyển nhanh trạng thái giai đoạn */}
                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-700 block uppercase tracking-wider">
                    Chuyển giai đoạn bài toán:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => handleWorkflowTransition('pending', 'Admin chuyển về chờ xác minh')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'pending'
                          ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                          : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      1. Chờ xác minh
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWorkflowTransition('verified', 'Admin duyệt xác minh bài toán')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'verified'
                          ? 'bg-teal-600 text-white border-teal-700 shadow-xs'
                          : 'bg-white hover:bg-teal-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      2. Đã xác minh (Công khai)
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWorkflowTransition('seeking_support', 'Admin mở kết nối nguồn lực')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'seeking_support'
                          ? 'bg-sky-600 text-white border-sky-700 shadow-xs'
                          : 'bg-white hover:bg-sky-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      3. Đang kết nối nguồn lực
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWorkflowTransition('in_progress', 'Admin xác nhận triển khai')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'in_progress'
                          ? 'bg-purple-600 text-white border-purple-700 shadow-xs'
                          : 'bg-white hover:bg-purple-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      4. Đang triển khai
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWorkflowTransition('evaluating', 'Admin chuyển giai đoạn chờ đánh giá')}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'evaluating'
                          ? 'bg-amber-600 text-white border-amber-700 shadow-xs'
                          : 'bg-white hover:bg-amber-50 text-slate-700 border-slate-200'
                      }`}
                    >
                      5. Chờ đánh giá kết quả
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsCompletionModalOpen(true)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all cursor-pointer ${
                        activeProblem.status === 'completed'
                          ? 'bg-emerald-600 text-white border-emerald-700 shadow-xs'
                          : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-300'
                      }`}
                    >
                      ✓ 6. Xác nhận hoàn thành
                    </button>
                  </div>
                </div>

                {/* Khối Phân công nhóm thực hiện */}
                <div className="p-4 rounded-xl bg-white border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Đội ngũ thực hiện phụ trách:
                    </span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <Users className="w-4 h-4 text-emerald-600" />
                      <strong className="text-sm font-extrabold text-slate-900">
                        {activeProblem.assignedTeam || 'Chưa phân công nhóm thực hiện'}
                      </strong>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setCustomTeamName(activeProblem.assignedTeam || '');
                      setSelectedAssigneeId(activeProblem.assignedMemberIds?.[0] || '');
                      setIsAssignModalOpen(true);
                    }}
                    className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 text-xs font-bold transition-all border border-slate-200 cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                  >
                    <Users className="w-3.5 h-3.5 text-slate-500" />
                    <span>{activeProblem.assignedTeam ? 'Thay đổi nhóm phụ trách' : 'Phân công nhóm'}</span>
                  </button>
                </div>

                {/* Khối Quản lý các mốc cập nhật tiến độ (Milestones & Evidence) */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                      <TrendingUp className="w-4 h-4 text-emerald-600" />
                      <span>Nhật ký mốc tiến độ thực tế ({(activeProblem.progressUpdates || []).length})</span>
                    </span>
                  </div>

                  {(!activeProblem.progressUpdates || activeProblem.progressUpdates.length === 0) ? (
                    <div className="p-4 rounded-xl bg-white border border-dashed border-slate-200 text-center text-xs text-slate-400">
                      Chưa có mốc tiến độ nào được gửi từ đội ngũ thực hiện.
                    </div>
                  ) : (
                    <div className="space-y-2.5">
                      {activeProblem.progressUpdates.map((update) => (
                        <div
                          key={update.id}
                          className="p-3.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs space-y-2"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div className="flex items-center gap-2">
                              {update.isApproved ? (
                                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                              ) : (
                                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                              )}
                              <span className="font-extrabold text-xs text-slate-900">
                                {update.title}
                              </span>
                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                update.isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                              }`}>
                                {update.isApproved ? 'Đã duyệt nghiệm thu' : 'Chờ Admin duyệt'}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 font-mono">
                              {update.submittedAt} • {update.submittedBy}
                            </div>
                          </div>

                          <p className="text-xs text-slate-700 leading-relaxed pl-6">
                            {update.description}
                          </p>

                          {/* Hình ảnh bằng chứng nếu có */}
                          {update.evidenceImages && update.evidenceImages.length > 0 && (
                            <div className="pl-6 flex flex-wrap gap-2 pt-1">
                              {update.evidenceImages.map((img, i) => (
                                <a
                                  key={i}
                                  href={img}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="w-14 h-14 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 hover:opacity-90 transition-opacity block"
                                >
                                  <img src={img} alt="Evidence" className="w-full h-full object-cover" />
                                </a>
                              ))}
                            </div>
                          )}

                          {/* Nút duyệt mốc nếu chưa duyệt */}
                          {!update.isApproved && (
                            <div className="pl-6 pt-1 flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleApproveMilestone(update.id)}
                                className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer flex items-center gap-1"
                              >
                                <Check className="w-3 h-3" />
                                <span>Phê duyệt mốc này</span>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* ================= KHỐI FEEDBACK & LIÊN KẾT ĐÁNH GIÁ (KHI HOÀN THÀNH) ================= */}
                {activeProblem.status === 'completed' && (
                  <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-300 space-y-3 animate-in fade-in">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-emerald-700" />
                        <div>
                          <strong className="text-xs font-bold text-emerald-950 block">
                            ĐÁNH GIÁ (FEEDBACK) TỪ NGƯỜI DÂN SAU NGHIỆM THU
                          </strong>
                          <span className="text-[11px] text-emerald-700">
                            Bài toán đã hoàn thành. Hệ thống đang sẵn sàng tiếp nhận khảo sát 5 câu hỏi chuẩn.
                          </span>
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={handleCreateFeedbackToken}
                        className="px-3.5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-1.5 self-start sm:self-auto"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                        <span>Tạo link Feedback cho người dân</span>
                      </button>
                    </div>

                    {/* Danh sách Feedback đã nhận cho bài toán này */}
                    {(() => {
                      const fbs = AdminDataService.getFeedbacks().filter(f => f.problemId === activeProblem.id);
                      if (fbs.length === 0) {
                        return (
                          <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-slate-500">
                            Chưa có phản hồi nào được gửi cho bài toán này. Hãy nhấn nút <strong>"Tạo link Feedback cho người dân"</strong> để gửi link cho hộ dân qua Zalo hoặc tin nhắn.
                          </div>
                        );
                      }
                      return (
                        <div className="space-y-2">
                          <span className="text-xs font-bold text-slate-700 block">
                            Đã nhận {fbs.length} phản hồi từ người dân:
                          </span>
                          {fbs.map(fb => (
                            <div key={fb.id} className="p-3 bg-white rounded-xl border border-emerald-200 space-y-1.5 text-xs">
                              <div className="flex items-center justify-between">
                                <div className="font-bold text-slate-900 flex items-center gap-2">
                                  <span>{fb.citizenName || 'Người dân'}</span>
                                  <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 font-bold text-[10px]">
                                    ★ {fb.rating}/5 sao
                                  </span>
                                </div>
                                <span className="text-[11px] text-slate-400 font-mono">{fb.createdAt}</span>
                              </div>
                              <p className="text-slate-700 italic">
                                "{fb.comments || 'Rất cảm ơn đội ngũ sinh viên và chuyên gia đã nhiệt tình hỗ trợ!'}"
                              </p>
                            </div>
                          ))}
                        </div>
                      );
                    })()}
                  </div>
                )}
              </div>

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

                <button
                  onClick={() => setProblemToDelete(activeProblem)}
                  className="px-3.5 py-2 rounded-xl bg-white border border-rose-200 hover:bg-rose-600 hover:text-white text-rose-600 font-bold text-xs cursor-pointer flex items-center gap-1.5 transition-colors"
                  title="Xóa bài toán này"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Xóa bài toán</span>
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

      {/* ================= MODAL XÁC NHẬN XÓA BÀI TOÁN ================= */}
      {problemToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-base font-extrabold text-slate-900">
                Xác nhận xóa bài toán thực tế?
              </h3>
              <p className="text-xs text-slate-500">
                Bạn đang chuẩn bị xóa bài toán:
              </p>
              <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                <span className="font-mono text-[11px] font-bold text-slate-500 block">
                  {problemToDelete.id.startsWith('prob-') ? `BM-${problemToDelete.id.replace('prob-', '').padStart(3, '0')}` : problemToDelete.id}
                </span>
                <p className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-2">
                  {problemToDelete.title}
                </p>
                <p className="text-[11px] text-slate-500 mt-1">
                  Người gửi: <span className="font-semibold text-slate-700">{problemToDelete.contactName}</span> ({problemToDelete.location})
                </p>
              </div>
              <p className="text-[11px] text-rose-600 font-medium pt-1">
                ⚠️ Dữ liệu bài toán sẽ bị xóa vĩnh viễn khỏi hệ thống và không thể khôi phục.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setProblemToDelete(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={() => handleDeleteProblem(problemToDelete.id)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Xác nhận xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XÁC NHẬN XÓA HÀNG LOẠT ================= */}
      {isBulkDeleteOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            
            <div className="text-center space-y-2">
              <h3 className="text-base font-extrabold text-slate-900">
                Xác nhận xóa {selectedProblemIds.length} bài toán đã chọn?
              </h3>
              <p className="text-xs text-slate-600">
                Bạn đã chọn {selectedProblemIds.length} bài toán để xóa. Tất cả dữ liệu của các bài toán này sẽ bị xóa vĩnh viễn khỏi hệ thống.
              </p>
              <p className="text-[11px] text-rose-600 font-medium pt-1">
                ⚠️ Hành động này không thể hoàn tác.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsBulkDeleteOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleConfirmBulkDelete}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Đồng ý xóa ({selectedProblemIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL PHÂN CÔNG NHÓM THỰC HIỆN ================= */}
      {isAssignModalOpen && activeProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="font-extrabold text-slate-900 text-sm">
                  Phân công Đội ngũ Thực hiện
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Bài toán: <strong className="text-slate-800">{activeProblem.title}</strong>
            </p>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Chọn Sinh viên / Chuyên gia đã có tài khoản trong hệ thống:
                </label>
                <select
                  value={selectedAssigneeId}
                  onChange={(e) => {
                    setSelectedAssigneeId(e.target.value);
                    const user = AdminDataService.getUserById(e.target.value);
                    if (user && !customTeamName) {
                      setCustomTeamName(`${user.fullName} (${user.organization || (user.role === 'student' ? 'Sinh viên HUTECH' : 'Chuyên gia')})`);
                    }
                  }}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 cursor-pointer"
                >
                  <option value="">-- Chọn tài khoản thực thi (Tùy chọn) --</option>
                  {AdminDataService.getUsers()
                    .filter(u => u.role === 'student' || u.role === 'expert')
                    .map(u => (
                      <option key={u.id} value={u.id}>
                        {u.fullName} [{u.role === 'student' ? 'Sinh viên' : 'Chuyên gia'}] - {u.organization || u.username}
                      </option>
                    ))
                  }
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tên Đội ngũ / Trưởng nhóm phụ trách (Hiển thị công khai):
                </label>
                <input
                  type="text"
                  value={customTeamName}
                  onChange={(e) => setCustomTeamName(e.target.value)}
                  placeholder="VD: CLB ĐMST Sinh viên HUTECH, ThS. BS. Trần Hoàng Quân..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:bg-white focus:outline-emerald-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsAssignModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleAssignTeam}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Xác nhận phân công</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL XÁC NHẬN NGHIỆM THU HOÀN THÀNH ================= */}
      {isCompletionModalOpen && activeProblem && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto">
              <Award className="w-6 h-6" />
            </div>

            <div className="text-center space-y-1">
              <h3 className="text-base font-extrabold text-slate-900">
                Xác nhận Nghiệm thu & Hoàn thành Bài toán
              </h3>
              <p className="text-xs text-slate-500">
                Sau khi xác nhận hoàn thành, hệ thống sẽ mở quyền gửi khảo sát Feedback (5 câu hỏi) cho người dân và chuyển giao kết quả.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <span className="font-bold text-slate-700 block">Bài toán thực tế:</span>
              <p className="text-slate-900 font-semibold mt-0.5">{activeProblem.title}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <label className="block font-bold text-slate-700">
                Tóm tắt kết quả nghiệm thu & Sản phẩm chuyển giao:
              </label>
              <textarea
                rows={4}
                value={completionSummaryInput}
                onChange={(e) => setCompletionSummaryInput(e.target.value)}
                placeholder="VD: Đã lắp đặt hoàn chỉnh hệ thống tưới phun sương tự động và hướng dẫn 15 hộ dân Ấp 4 vận hành thành công; đạt chỉ tiêu giảm 35% chi phí nước..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 leading-relaxed"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setIsCompletionModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmCompletion}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Nghiệm thu & Đánh dấu Hoàn thành</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL THÊM BÀI TOÁN MỚI TỪ WEB ADMIN ================= */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    Thêm Bài toán thực tế mới
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Bài toán sẽ tự động đồng bộ ngay lập tức ra Trang chủ và Trang Bài toán thực tế
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleCreateProblem} className="overflow-y-auto space-y-4 py-4 pr-1 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Tiêu đề bài toán thực tế <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="VD: Cải tạo hệ thống tưới tiêu và chống xói mòn kênh rạch Ấp 3..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Lĩnh vực trọng điểm <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as ProblemCategory)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-emerald-600 font-medium cursor-pointer"
                  >
                    <option value="agriculture">Nông nghiệp sinh thái</option>
                    <option value="health">Y tế - Sức khỏe cộng đồng</option>
                    <option value="tourism">Du lịch trải nghiệm & Văn hóa</option>
                    <option value="other">Môi trường & Đổi mới sáng tạo khác</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Trạng thái công khai <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={newStatus}
                    onChange={(e) => setNewStatus(e.target.value as ProblemStatus)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:outline-emerald-600 font-medium cursor-pointer"
                  >
                    <option value="verified">Đã xác minh (Công khai ngay lên Trang chủ & Web)</option>
                    <option value="seeking_support">Đang tìm nguồn lực / Nhóm sinh viên</option>
                    <option value="in_progress">Đang triển khai thực địa</option>
                    <option value="completed">Đã hoàn thành giải quyết</option>
                    <option value="pending">Chờ duyệt (Chưa công khai)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Người / Hộ đề xuất
                  </label>
                  <input
                    type="text"
                    value={newContactName}
                    onChange={(e) => setNewContactName(e.target.value)}
                    placeholder="VD: Nguyễn Văn Ba, Chú Tám..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Đơn vị / Tổ hợp tác
                  </label>
                  <input
                    type="text"
                    value={newOrganizationName}
                    onChange={(e) => setNewOrganizationName(e.target.value)}
                    placeholder="VD: Tổ hợp tác rau sạch Ấp 2, HTX Nông nghiệp..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Số điện thoại liên hệ
                  </label>
                  <input
                    type="tel"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    placeholder="VD: 0908 123 456"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">
                    Địa điểm cụ thể
                  </label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="VD: Ấp 1, Xã Bình Mỹ, Củ Chi, TP.HCM"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Mô tả chi tiết bài toán & Nỗi đau thực tế <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={4}
                  required
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Mô tả cụ thể hiện trạng, khó khăn gặp phải, nguyên nhân và thiệt hại thực tế của bà con / địa phương..."
                  className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600 leading-relaxed"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  Nhu cầu hỗ trợ cần kết nối (ngăn cách bởi dấu phẩy)
                </label>
                <input
                  type="text"
                  value={newSupportNeeded}
                  onChange={(e) => setNewSupportNeeded(e.target.value)}
                  placeholder="VD: Công nghệ sinh học, Tự động hóa tưới tiêu, Tìm đầu ra bao tiêu"
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 focus:bg-white focus:outline-emerald-600"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-xl cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#00875a] hover:bg-[#00734c] text-white font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Lưu & Đồng bộ lên Website</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
