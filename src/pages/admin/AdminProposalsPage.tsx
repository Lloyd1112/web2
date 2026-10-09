import React, { useState, useEffect } from 'react';
import { AdminDataService, AdminProposal, ProposalStatus } from '../../services/adminDataService';
import {
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  Building2,
  User,
  FileText,
  Tag,
  ArrowRight,
  ExternalLink,
  MessageSquare,
  ShieldCheck,
  Check,
  X,
  AlertCircle,
  Paperclip,
  Calendar,
  Sparkles,
  FolderPlus,
  RefreshCw,
  Send
} from 'lucide-react';

interface AdminProposalsPageProps {
  onOpenProblemDetail?: (problemId: string) => void;
  onOpenProjectDetail?: (projectId: string) => void;
  onCreateProjectFromProposal?: (proposal: AdminProposal) => void;
  preSelectedProposalId?: string | null;
}

export const AdminProposalsPage: React.FC<AdminProposalsPageProps> = ({
  onOpenProblemDetail,
  onOpenProjectDetail,
  onCreateProjectFromProposal,
  preSelectedProposalId
}) => {
  const [proposals, setProposals] = useState<AdminProposal[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Detail modal state
  const [activeProposal, setActiveProposal] = useState<AdminProposal | null>(null);
  const [newStatus, setNewStatus] = useState<ProposalStatus>('new');
  const [internalNoteInput, setInternalNoteInput] = useState('');
  const [assignedToInput, setAssignedToInput] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    loadProposals();
  }, []);

  useEffect(() => {
    if (preSelectedProposalId) {
      const p = AdminDataService.getProposalById(preSelectedProposalId);
      if (p) {
        setActiveProposal(p);
        setNewStatus(p.status);
        setInternalNoteInput(p.internalNotes || '');
        setAssignedToInput(p.assignedTo || '');
      }
    }
  }, [preSelectedProposalId]);

  const loadProposals = () => {
    const list = AdminDataService.getProposals();
    setProposals(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const openProposalDetail = (p: AdminProposal) => {
    setActiveProposal(p);
    setNewStatus(p.status);
    setInternalNoteInput(p.internalNotes || '');
    setAssignedToInput(p.assignedTo || '');
  };

  const handleUpdateStatusAndNotes = () => {
    if (!activeProposal) return;
    const ok = AdminDataService.updateProposalStatus(
      activeProposal.id,
      newStatus,
      internalNoteInput,
      assignedToInput
    );
    if (ok) {
      loadProposals();
      const updated = AdminDataService.getProposalById(activeProposal.id);
      if (updated) setActiveProposal(updated);
      showToast(`Đã cập nhật trạng thái đơn ${activeProposal.id} thành công!`);
    }
  };

  // Status badge helper
  const getStatusBadge = (status: ProposalStatus) => {
    switch (status) {
      case 'new':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Mới tiếp nhận
          </span>
        );
      case 'reviewing':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Clock className="w-3 h-3 text-blue-600" />
            Đang xem xét
          </span>
        );
      case 'needs_info':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <AlertCircle className="w-3 h-3 text-amber-600" />
            Cần bổ sung
          </span>
        );
      case 'contacted':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-800 border border-indigo-200">
            <Phone className="w-3 h-3 text-indigo-600" />
            Đã liên hệ
          </span>
        );
      case 'connecting':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            <Sparkles className="w-3 h-3 text-purple-600" />
            Đang kết nối
          </span>
        );
      case 'connected':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-600" />
            Đã kết nối thành công
          </span>
        );
      case 'unsuitable':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-200">
            <X className="w-3 h-3 text-red-600" />
            Không phù hợp
          </span>
        );
      case 'closed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Đã đóng
          </span>
        );
      default:
        return null;
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case 'Sinh viên':
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-sky-50 text-sky-700 border border-sky-200">Sinh viên</span>;
      case 'Chuyên gia':
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">Chuyên gia</span>;
      case 'Doanh nghiệp':
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">Doanh nghiệp</span>;
      case 'Đơn vị hỗ trợ / Tổ chức':
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-700 border border-amber-200">Đơn vị hỗ trợ</span>;
      default:
        return <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-50 text-slate-700 border border-slate-200">{role}</span>;
    }
  };

  // Filtered proposals
  const filteredProposals = proposals.filter(p => {
    const matchSearch =
      p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.problemTitle && p.problemTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.problemCode && p.problemCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (p.organization && p.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.phone.includes(searchQuery);

    const matchRole = selectedRole === 'all' || p.role === selectedRole;
    const matchStatus = selectedStatus === 'all' || p.status === selectedStatus;

    return matchSearch && matchRole && matchStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Title */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Nghiệp vụ Hợp tác
            </span>
            <span className="text-xs text-slate-600">Đơn đề xuất từ website công khai</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Quản lý Đơn đề xuất hợp tác</h1>
          <p className="text-sm text-slate-700 mt-0.5">
            Tiếp nhận và xử lý kết nối giải pháp từ sinh viên, chuyên gia và doanh nghiệp với các bài toán thực tế.
          </p>
        </div>

        <button
          onClick={loadProposals}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-3.5 py-2 bg-white border border-slate-200 hover:border-slate-300 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs hover:bg-slate-50 transition-colors"
        >
          <RefreshCw className="w-3.5 h-3.5 text-slate-600" />
          Làm mới danh sách
        </button>
      </div>

      {/* Search and Filters Toolbar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          {/* Search box */}
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã đơn, người gửi, số điện thoại, tên bài toán..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all text-slate-800 placeholder-slate-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-600 hover:text-slate-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Role Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả vai trò</option>
              <option value="Sinh viên">Sinh viên</option>
              <option value="Chuyên gia">Chuyên gia</option>
              <option value="Doanh nghiệp">Doanh nghiệp</option>
              <option value="Đơn vị hỗ trợ / Tổ chức">Đơn vị hỗ trợ / Tổ chức</option>
              <option value="Khác">Khác</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả trạng thái ({proposals.length})</option>
              <option value="new">Mới tiếp nhận</option>
              <option value="reviewing">Đang xem xét</option>
              <option value="needs_info">Cần bổ sung</option>
              <option value="contacted">Đã liên hệ</option>
              <option value="connecting">Đang kết nối các bên</option>
              <option value="connected">Đã kết nối thành công</option>
              <option value="unsuitable">Không phù hợp</option>
              <option value="closed">Đã đóng</option>
            </select>
          </div>

        </div>

        {/* Quick summary counters */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs text-slate-700">
          <span className="font-semibold text-slate-700">Tổng cộng: {filteredProposals.length} đơn</span>
          <span className="text-slate-500">•</span>
          <span className="text-emerald-700 font-medium">Mới: {proposals.filter(p => p.status === 'new').length}</span>
          <span className="text-slate-500">•</span>
          <span className="text-blue-700 font-medium">Đang xử lý: {proposals.filter(p => ['reviewing', 'contacted', 'connecting'].includes(p.status)).length}</span>
          <span className="text-slate-500">•</span>
          <span className="text-teal-700 font-medium">Đã kết nối: {proposals.filter(p => p.status === 'connected').length}</span>
        </div>
      </div>

      {/* Proposals Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Mã đơn</th>
                <th className="py-3.5 px-4">Người đề xuất</th>
                <th className="py-3.5 px-4">Vai trò</th>
                <th className="py-3.5 px-4">Bài toán / Dự án liên quan</th>
                <th className="py-3.5 px-4">Lĩnh vực hỗ trợ</th>
                <th className="py-3.5 px-4">Ngày gửi</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProposals.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3">
                      <FileText className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Không tìm thấy đơn hợp tác nào</p>
                    <p className="text-xs text-slate-600 mt-1">Thử thay đổi bộ lọc tìm kiếm hoặc từ khóa</p>
                  </td>
                </tr>
              ) : (
                filteredProposals.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    {/* Code */}
                    <td className="py-3 px-4 font-mono font-bold text-xs text-slate-900">
                      {item.id}
                    </td>

                    {/* Proposer */}
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{item.fullName}</div>
                      <div className="text-xs text-slate-600 flex items-center gap-1.5 mt-0.5">
                        {item.organization && (
                          <span className="truncate max-w-[140px]" title={item.organization}>
                            {item.organization}
                          </span>
                        )}
                        <span className="text-slate-500">({item.phone})</span>
                      </div>
                    </td>

                    {/* Role */}
                    <td className="py-3 px-4">
                      {getRoleBadge(item.role)}
                    </td>

                    {/* Linked Problem / Project */}
                    <td className="py-3 px-4">
                      {item.problemTitle ? (
                        <div className="max-w-[240px]">
                          <span className="inline-block text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200 mr-1.5">
                            {item.problemCode || 'Bài toán'}
                          </span>
                          <span className="text-xs font-medium text-slate-800 line-clamp-1 hover:text-emerald-700 cursor-pointer"
                            onClick={() => item.problemId && onOpenProblemDetail && onOpenProblemDetail(item.problemId)}
                            title={item.problemTitle}
                          >
                            {item.problemTitle}
                          </span>
                        </div>
                      ) : item.projectTitle ? (
                        <div className="max-w-[240px]">
                          <span className="inline-block text-[10px] font-bold text-blue-800 bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-200 mr-1.5">
                            Dự án
                          </span>
                          <span className="text-xs font-medium text-slate-800 line-clamp-1" title={item.projectTitle}>
                            {item.projectTitle}
                          </span>
                        </div>
                      ) : (
                        <span className="text-xs text-slate-600 italic">Đề xuất chung</span>
                      )}
                    </td>

                    {/* Selected fields */}
                    <td className="py-3 px-4">
                      <div className="flex flex-wrap gap-1 max-w-[180px]">
                        {item.selectedFields && item.selectedFields.slice(0, 2).map((field, idx) => (
                          <span key={idx} className="text-[11px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded-sm">
                            {field}
                          </span>
                        ))}
                        {item.selectedFields && item.selectedFields.length > 2 && (
                          <span className="text-[11px] text-slate-600">
                            +{item.selectedFields.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Date */}
                    <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {item.createdAt}
                    </td>

                    {/* Status */}
                    <td className="py-3 px-4 whitespace-nowrap">
                      {getStatusBadge(item.status)}
                    </td>

                    {/* Action */}
                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={() => openProposalDetail(item)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-xs font-semibold text-slate-700 transition-colors"
                      >
                        <span>Xử lý đơn</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= DETAIL & MODERATION MODAL ================= */}
      {activeProposal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-start justify-between bg-slate-50/70 rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-200 text-slate-800">
                    {activeProposal.id}
                  </span>
                  {getStatusBadge(activeProposal.status)}
                  {getRoleBadge(activeProposal.role)}
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  Đơn đề xuất giải pháp từ {activeProposal.fullName}
                </h2>
                <p className="text-xs text-slate-600 mt-0.5">
                  Thời gian gửi: {activeProposal.createdAt} • Cập nhật lần cuối: {activeProposal.updatedAt}
                </p>
              </div>

              <button
                onClick={() => setActiveProposal(null)}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-6">
              
              {/* Internal Privacy Warning Badge */}
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-3 text-xs text-amber-800">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
                <span>
                  <strong>Bảo mật thông tin:</strong> Số điện thoại, email và ghi chú nội bộ chỉ hiển thị với Quản trị viên được phân quyền. Không công khai thông tin này ra ngoài.
                </span>
              </div>

              {/* Grid 2 Columns: Submitter info & Linked problem */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* 1. Submitter Card */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-600" />
                    Thông tin người đề xuất
                  </h3>
                  <div>
                    <div className="font-bold text-slate-900 text-base">{activeProposal.fullName}</div>
                    <div className="text-xs text-slate-600 font-medium">{activeProposal.role}</div>
                  </div>
                  {activeProposal.organization && (
                    <div className="text-xs text-slate-600 flex items-center gap-1.5">
                      <Building2 className="w-3.5 h-3.5 text-slate-600" />
                      <span>{activeProposal.organization}</span>
                    </div>
                  )}
                  <div className="text-xs text-slate-700 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span className="font-mono font-medium">{activeProposal.phone}</span>
                  </div>
                  {activeProposal.email && (
                    <div className="text-xs text-slate-700 flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-600" />
                      <span className="font-mono">{activeProposal.email}</span>
                    </div>
                  )}
                </div>

                {/* 2. Linked Problem / Project Card */}
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2.5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-emerald-600" />
                    Nguồn liên kết bài toán / dự án
                  </h3>
                  
                  {activeProposal.problemTitle ? (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md">
                        {activeProposal.problemCode || 'BM-XXX'}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                        {activeProposal.problemTitle}
                      </h4>
                      {activeProposal.problemId && onOpenProblemDetail && (
                        <button
                          onClick={() => {
                            setActiveProposal(null);
                            onOpenProblemDetail(activeProposal.problemId!);
                          }}
                          className="mt-2 text-xs font-bold text-emerald-700 hover:text-emerald-800 flex items-center gap-1"
                        >
                          <span>Xem chi tiết bài toán nguồn</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ) : activeProposal.projectTitle ? (
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 bg-blue-100 px-2 py-0.5 rounded-md">
                        Dự án
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1 leading-snug">
                        {activeProposal.projectTitle}
                      </h4>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-600">Đơn đề xuất năng lực tổng thể, chưa gắn mã bài toán cụ thể.</p>
                  )}
                </div>

              </div>

              {/* Proposal Content */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-600" />
                  Nội dung phương án giải quyết đề xuất
                </h3>
                <div className="p-4 rounded-2xl bg-white border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-line shadow-2xs font-sans">
                  {activeProposal.solutionContent}
                </div>
              </div>

              {/* Skills and Availability */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Fields */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">
                    Lĩnh vực & Chuyên môn hỗ trợ
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProposal.selectedFields && activeProposal.selectedFields.map((field, idx) => (
                      <span key={idx} className="px-2.5 py-1 bg-white border border-slate-200 text-slate-700 rounded-lg text-xs font-medium">
                        {field}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability & Attachment */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider">
                    Khả năng & Thời gian cam kết
                  </h4>
                  <p className="text-xs font-semibold text-slate-800">
                    {activeProposal.availability || 'Chưa cung cấp'}
                  </p>
                  {activeProposal.fileName && (
                    <div className="pt-2 border-t border-slate-200">
                      <span className="text-xs text-slate-600 block mb-1">Tài liệu đính kèm:</span>
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-mono text-slate-700">
                        <Paperclip className="w-3.5 h-3.5 text-slate-600" />
                        <span>{activeProposal.fileName}</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>

              {/* Moderation Controls: Status transition & Internal notes */}
              <div className="p-5 bg-slate-50 rounded-2xl border-2 border-slate-200 space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-emerald-600" />
                  Xử lý & Cập nhật trạng thái đơn
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Status dropdown */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Chuyển trạng thái xử lý:
                    </label>
                    <select
                      value={newStatus}
                      onChange={(e) => setNewStatus(e.target.value as ProposalStatus)}
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    >
                      <option value="new">1. Mới tiếp nhận</option>
                      <option value="reviewing">2. Đang xem xét</option>
                      <option value="needs_info">3. Cần bổ sung thông tin</option>
                      <option value="contacted">4. Đã liên hệ người gửi</option>
                      <option value="connecting">5. Đang kết nối các bên</option>
                      <option value="connected">6. Đã kết nối thành công</option>
                      <option value="unsuitable">7. Không phù hợp</option>
                      <option value="closed">8. Đã đóng</option>
                    </select>
                  </div>

                  {/* Assign to officer */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cán bộ phụ trách kết nối:
                    </label>
                    <input
                      type="text"
                      value={assignedToInput}
                      onChange={(e) => setAssignedToInput(e.target.value)}
                      placeholder="VD: Ban Dự án Sinh viên / Thầy Tuấn Anh"
                      className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    />
                  </div>

                </div>

                {/* Internal notes textarea */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ghi chú nội bộ Admin (chỉ lưu trong hệ thống):
                  </label>
                  <textarea
                    rows={3}
                    value={internalNoteInput}
                    onChange={(e) => setInternalNoteInput(e.target.value)}
                    placeholder="Ghi nhận cuộc gọi trao đổi, tiến độ gặp gỡ, phân công tiếp theo..."
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                  />
                </div>

                {/* Status history log if any */}
                {activeProposal.statusHistory && activeProposal.statusHistory.length > 0 && (
                  <div className="pt-3 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-600 block mb-2">Lịch sử xử lý:</span>
                    <div className="space-y-1.5 max-h-32 overflow-y-auto text-xs text-slate-600">
                      {activeProposal.statusHistory.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-2 bg-white p-2 rounded-lg border border-slate-100">
                          <span className="font-mono text-slate-600">{item.updatedAt}</span>
                          <span className="font-semibold text-slate-700">[{item.status}]</span>
                          <span className="text-slate-600">{item.note || 'Cập nhật trạng thái'}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

            </div>

            {/* Modal Footer Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 rounded-b-3xl flex flex-wrap items-center justify-between gap-3">
              
              {/* Optional: Incubate into Project button */}
              {onCreateProjectFromProposal && (
                <button
                  type="button"
                  onClick={() => {
                    const p = activeProposal;
                    setActiveProposal(null);
                    onCreateProjectFromProposal(p);
                  }}
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 rounded-xl text-xs font-bold transition-colors"
                >
                  <FolderPlus className="w-4 h-4 text-emerald-700" />
                  <span>Hình thành Dự án mới từ đơn này</span>
                </button>
              )}

              <div className="flex items-center gap-2 ml-auto">
                <button
                  type="button"
                  onClick={() => setActiveProposal(null)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors"
                >
                  Đóng
                </button>

                <button
                  type="button"
                  onClick={handleUpdateStatusAndNotes}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Lưu cập nhật xử lý</span>
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};
