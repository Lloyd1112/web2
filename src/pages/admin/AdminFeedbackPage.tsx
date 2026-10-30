import React, { useState, useEffect } from 'react';
import { ProblemFeedback, FeedbackToken, RealProblem } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import {
  Sparkles,
  Star,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Eye,
  EyeOff,
  Copy,
  Link as LinkIcon,
  Plus,
  RefreshCw,
  Clock,
  Trash2,
  AlertCircle,
  ShieldCheck,
  Send,
  ThumbsUp,
  MessageSquare,
  Award,
  Check,
  Share2
} from 'lucide-react';

export const AdminFeedbackPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<ProblemFeedback[]>([]);
  const [tokens, setTokens] = useState<FeedbackToken[]>([]);
  const [completedProblems, setCompletedProblems] = useState<RealProblem[]>([]);
  const [stats, setStats] = useState(AdminDataService.getFeedbackStats());

  const [activeTab, setActiveTab] = useState<'feedbacks' | 'tokens'>('feedbacks');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRatingFilter, setSelectedRatingFilter] = useState<string>('all');
  const [selectedApprovalFilter, setSelectedApprovalFilter] = useState<string>('all');

  // Modal tạo liên kết feedback mới
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [selectedProblemId, setSelectedProblemId] = useState('');
  const [citizenNameInput, setCitizenNameInput] = useState('');
  const [citizenPhoneInput, setCitizenPhoneInput] = useState('');
  const [daysValidInput, setDaysValidInput] = useState(30);

  // Toast / Copy message
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  useEffect(() => {
    loadData();
    const unsub = AdminDataService.subscribe(loadData);
    return unsub;
  }, []);

  const loadData = () => {
    const fbList = AdminDataService.getFeedbacks();
    const tokenList = AdminDataService.getFeedbackTokens();
    const problems = AdminDataService.getProblems();
    const completed = problems.filter(p => p.status === 'completed');

    setFeedbacks(fbList);
    setTokens(tokenList);
    setCompletedProblems(completed);
    setStats(AdminDataService.getFeedbackStats());
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleToggleApproval = (id: string) => {
    const isNowApproved = AdminDataService.toggleFeedbackApproval(id);
    showToast(isNowApproved ? 'Đã duyệt công khai phản hồi!' : 'Đã ẩn phản hồi khỏi website công khai.');
    loadData();
  };

  const handleDeleteFeedback = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa phản hồi này?')) {
      AdminDataService.deleteFeedback(id);
      showToast('Đã xóa phản hồi thành công.');
      loadData();
    }
  };

  const handleCopyLink = (token: string) => {
    const baseUrl = window.location.origin;
    const link = `${baseUrl}/feedback?token=${token}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(link);
      setCopiedToken(token);
      showToast('Đã sao chép liên kết Feedback vào bộ nhớ tạm! Có thể dán gửi Zalo/SMS.');
      setTimeout(() => setCopiedToken(null), 2500);
    }
  };

  const handleRevokeToken = (token: string) => {
    if (window.confirm('Bạn có chắc muốn thu hồi liên kết này? Người dân sẽ không thể gửi đánh giá bằng link này nữa.')) {
      AdminDataService.revokeFeedbackToken(token);
      showToast('Đã thu hồi liên kết đánh giá thành công.');
      loadData();
    }
  };

  const handleGenerateToken = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblemId) {
      showToast('Vui lòng chọn bài toán đã hoàn thành.');
      return;
    }

    try {
      const newToken = AdminDataService.generateFeedbackToken(
        selectedProblemId,
        citizenNameInput.trim() || undefined,
        citizenPhoneInput.trim() || undefined,
        daysValidInput
      );
      showToast(`Đã tạo liên kết đánh giá thành công: ${newToken.token}`);
      setIsGenerateModalOpen(false);
      setSelectedProblemId('');
      setCitizenNameInput('');
      setCitizenPhoneInput('');
      setActiveTab('tokens');
      loadData();
    } catch (e: any) {
      showToast(e.message || 'Lỗi khi tạo mã liên kết.');
    }
  };

  // Lọc phản hồi
  const filteredFeedbacks = feedbacks.filter(f => {
    if (selectedRatingFilter !== 'all' && f.rating !== Number(selectedRatingFilter)) return false;
    if (selectedApprovalFilter === 'approved' && !f.isApproved) return false;
    if (selectedApprovalFilter === 'pending' && f.isApproved) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        f.problemTitle.toLowerCase().includes(q) ||
        f.problemCode.toLowerCase().includes(q) ||
        f.citizenName.toLowerCase().includes(q) ||
        (f.comments && f.comments.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6">

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight flex items-center gap-2.5">
            <Sparkles className="w-6 h-6 text-emerald-600" />
            <span>Quản lý Phản hồi & Đánh giá của Người dân</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Theo dõi điểm hài lòng, duyệt phản hồi công khai và tạo liên kết gửi qua Zalo / SMS cho người dân.
          </p>
        </div>

        <button
          onClick={() => setIsGenerateModalOpen(true)}
          className="px-5 py-2.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2 shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo liên kết Feedback mới</span>
        </button>
      </div>

      {/* Thẻ thống kê Dashboard thực tế */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Tổng số Feedback</span>
          <p className="text-2xl font-black text-slate-900">{stats.totalFeedbacks}</p>
          <span className="text-[10px] text-slate-400">Từ các bài toán đã giải quyết</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Điểm hài lòng trung bình</span>
          <div className="flex items-center gap-2">
            <p className="text-2xl font-black text-amber-500">{stats.avgRating}</p>
            <div className="flex text-amber-400">
              <Star className="w-4 h-4 fill-amber-400" />
            </div>
          </div>
          <span className="text-[10px] text-slate-400">Thang đo chuẩn 1 đến 5 sao</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Tỷ lệ giải quyết cao</span>
          <p className="text-2xl font-black text-emerald-600">{stats.highResolutionPercent}%</p>
          <span className="text-[10px] text-slate-400">Đạt hoàn toàn hoặc phần lớn</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase">Đánh giá rất hữu ích</span>
          <p className="text-2xl font-black text-sky-600">{stats.usefulPercent}%</p>
          <span className="text-[10px] text-slate-400">Phục vụ thiết thực đời sống</span>
        </div>
      </div>

      {/* Tabs chuyển đổi giữa Danh sách Phản hồi và Quản lý Liên kết Token */}
      <div className="flex items-center gap-3 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('feedbacks')}
          className={`pb-3 text-xs font-bold transition-all relative cursor-pointer ${
            activeTab === 'feedbacks'
              ? 'text-[#00875a] border-b-2 border-[#00875a]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Danh sách Phản hồi ({feedbacks.length})
        </button>
        <button
          onClick={() => setActiveTab('tokens')}
          className={`pb-3 text-xs font-bold transition-all relative cursor-pointer ${
            activeTab === 'tokens'
              ? 'text-[#00875a] border-b-2 border-[#00875a]'
              : 'text-slate-500 hover:text-slate-900'
          }`}
        >
          Quản lý Liên kết Token ({tokens.length})
        </button>
      </div>

      {/* TAB 1: DANH SÁCH PHẢN HỒI FEEDBACK */}
      {activeTab === 'feedbacks' && (
        <div className="space-y-4">
          
          {/* Bộ lọc và Tìm kiếm */}
          <div className="bg-white p-4 rounded-2xl border border-slate-200 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Tìm theo tên người dân, mã bài toán, nội dung ý kiến..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedRatingFilter}
                onChange={(e) => setSelectedRatingFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-emerald-600"
              >
                <option value="all">Tất cả số sao</option>
                <option value="5">5 sao</option>
                <option value="4">4 sao</option>
                <option value="3">3 sao</option>
                <option value="2">2 sao</option>
                <option value="1">1 sao</option>
              </select>

              <select
                value={selectedApprovalFilter}
                onChange={(e) => setSelectedApprovalFilter(e.target.value)}
                className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 font-semibold focus:outline-emerald-600"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="approved">Đã duyệt công khai</option>
                <option value="pending">Chờ duyệt</option>
              </select>
            </div>
          </div>

          {/* Bảng danh sách Feedback */}
          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            {filteredFeedbacks.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                Chưa có phản hồi nào phù hợp với bộ lọc tìm kiếm.
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {filteredFeedbacks.map((fb) => (
                  <div key={fb.id} className="p-5 hover:bg-slate-50/70 transition-colors space-y-3">
                    
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          {fb.problemCode}
                        </span>
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900">
                          {fb.problemTitle}
                        </h3>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${
                          fb.isApproved 
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-300' 
                            : 'bg-amber-50 text-amber-800 border-amber-300'
                        }`}>
                          {fb.isApproved ? 'Đã duyệt công khai' : 'Đang ẩn (Chờ duyệt)'}
                        </span>

                        <button
                          onClick={() => handleToggleApproval(fb.id)}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                            fb.isApproved
                              ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                              : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                          }`}
                        >
                          {fb.isApproved ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                          <span>{fb.isApproved ? 'Ẩn phản hồi' : 'Duyệt công khai'}</span>
                        </button>

                        <button
                          onClick={() => handleDeleteFeedback(fb.id)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                          title="Xóa phản hồi"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Điểm sao & 4 Câu trả lời trắc nghiệm */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">1. Điểm hài lòng:</span>
                        <div className="flex items-center gap-1 text-amber-500 font-bold mt-0.5">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star 
                              key={s} 
                              className={`w-3.5 h-3.5 ${s <= fb.rating ? 'fill-amber-400 text-amber-500' : 'text-slate-300'}`} 
                            />
                          ))}
                          <span className="text-slate-800 ml-1">({fb.rating}/5)</span>
                        </div>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">2. Mức độ giải quyết:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">
                          {fb.resolutionLevel === 'hoan_toan' && 'Đã giải quyết hoàn toàn'}
                          {fb.resolutionLevel === 'phan_lon' && 'Đã giải quyết phần lớn'}
                          {fb.resolutionLevel === 'mot_phan' && 'Mới giải quyết một phần'}
                          {fb.resolutionLevel === 'chua_dat' && 'Chưa đạt kết quả'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">3. Tính hữu ích:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">
                          {fb.usefulness === 'rat_huu_ich' && 'Rất hữu ích'}
                          {fb.usefulness === 'huu_ich_mot_phan' && 'Hữu ích một phần'}
                          {fb.usefulness === 'chua_huu_ich' && 'Chưa hữu ích'}
                        </span>
                      </div>

                      <div>
                        <span className="text-[10px] text-slate-400 block font-semibold">4. Quá trình phối hợp:</span>
                        <span className="font-bold text-slate-800 mt-0.5 block">
                          {fb.coordinationRating === 'rat_tot' && 'Rất tốt'}
                          {fb.coordinationRating === 'tot' && 'Tốt'}
                          {fb.coordinationRating === 'binh_thuong' && 'Bình thường'}
                          {fb.coordinationRating === 'chua_tot' && 'Chưa tốt'}
                        </span>
                      </div>
                    </div>

                    {/* Ý kiến góp ý (nếu có) */}
                    {fb.comments && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800 italic leading-relaxed">
                        <span className="font-bold text-slate-700 not-italic">5. Ý kiến người dân: </span>
                        "{fb.comments}"
                      </div>
                    )}

                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                      <span>Đánh giá bởi: <strong className="text-slate-700">{fb.citizenName}</strong> {fb.citizenPhone && `(${fb.citizenPhone})`}</span>
                      <span>Ngày gửi: {fb.createdAt}</span>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: QUẢN LÝ LIÊN KẾT TOKEN (CHO NGƯỜI DÂN KHÔNG ĐĂNG NHẬP) */}
      {activeTab === 'tokens' && (
        <div className="space-y-4">
          <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs text-emerald-900 flex items-start gap-3">
            <LinkIcon className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Cơ chế liên kết Feedback bảo mật:</p>
              <p className="mt-0.5 leading-relaxed text-emerald-800">
                Admin có thể tạo mã truy cập ngẫu nhiên, khó đoán (token) cho từng bài toán đã hoàn thành và sao chép gửi qua Zalo/SMS/Email. Người dân không cần tạo tài khoản vẫn có thể xác thực và đánh giá an toàn. Mỗi liên kết có thể thu hồi hoặc gia hạn bất cứ lúc nào.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-2xs">
            {tokens.length === 0 ? (
              <div className="p-12 text-center text-slate-500 text-xs">
                Chưa có liên kết token nào được tạo. Nhấn "Tạo liên kết Feedback mới" để bắt đầu.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase text-[10px] tracking-wider">
                    <tr>
                      <th className="py-3 px-4">Mã Token</th>
                      <th className="py-3 px-4">Bài toán tương ứng</th>
                      <th className="py-3 px-4">Người nhận (Dự kiến)</th>
                      <th className="py-3 px-4">Hạn dùng</th>
                      <th className="py-3 px-4">Trạng thái</th>
                      <th className="py-3 px-4 text-right">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tokens.map((tok) => {
                      const isUsed = tok.status === 'evaluated';
                      const isRevoked = tok.status === 'revoked';
                      return (
                        <tr key={tok.token} className="hover:bg-slate-50/70">
                          <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                            {tok.token}
                          </td>
                          <td className="py-3.5 px-4 max-w-xs">
                            <span className="font-bold text-slate-800 line-clamp-1">{tok.problemTitle}</span>
                            <span className="text-[10px] text-slate-400 font-mono">{tok.problemCode}</span>
                          </td>
                          <td className="py-3.5 px-4">
                            <span className="font-semibold text-slate-700 block">{tok.citizenName}</span>
                            {tok.citizenPhone && <span className="text-[11px] text-slate-400 font-mono">{tok.citizenPhone}</span>}
                          </td>
                          <td className="py-3.5 px-4 font-mono text-slate-600">
                            {tok.expiresAt}
                          </td>
                          <td className="py-3.5 px-4">
                            <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                              isUsed ? 'bg-emerald-100 text-emerald-800' :
                              isRevoked ? 'bg-rose-100 text-rose-800' :
                              tok.status === 'sent' ? 'bg-sky-100 text-sky-800' :
                              'bg-amber-100 text-amber-800'
                            }`}>
                              {isUsed && 'Đã đánh giá'}
                              {isRevoked && 'Đã thu hồi'}
                              {tok.status === 'sent' && 'Đã gửi'}
                              {tok.status === 'created' && 'Mới tạo (Chưa gửi)'}
                            </span>
                          </td>
                          <td className="py-3.5 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              {!isRevoked && !isUsed && (
                                <button
                                  onClick={() => handleCopyLink(tok.token)}
                                  className="px-3 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 font-bold text-[11px] transition-colors cursor-pointer flex items-center gap-1"
                                  title="Sao chép liên kết"
                                >
                                  {copiedToken === tok.token ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                                  <span>{copiedToken === tok.token ? 'Đã chép' : 'Sao chép'}</span>
                                </button>
                              )}

                              {!isRevoked && !isUsed && (
                                <button
                                  onClick={() => handleRevokeToken(tok.token)}
                                  className="px-2.5 py-1 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-[11px] transition-colors cursor-pointer"
                                  title="Thu hồi liên kết"
                                >
                                  Thu hồi
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL TẠO LIÊN KẾT FEEDBACK TOKEN MỚI */}
      {isGenerateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 p-6 space-y-5 animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="text-sm sm:text-base font-black text-slate-900 flex items-center gap-2">
                <LinkIcon className="w-4 h-4 text-emerald-600" />
                <span>Tạo liên kết Feedback cho bài toán</span>
              </h3>
              <button
                onClick={() => setIsGenerateModalOpen(false)}
                className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
              >
                Đóng
              </button>
            </div>

            <form onSubmit={handleGenerateToken} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Chọn bài toán đã hoàn thành <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={selectedProblemId}
                  onChange={(e) => setSelectedProblemId(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium"
                >
                  <option value="">-- Chọn bài toán đã hoàn thành --</option>
                  {completedProblems.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.code || 'BM-XXX'} — {p.title} ({p.contactName})
                    </option>
                  ))}
                </select>
                {completedProblems.length === 0 && (
                  <p className="text-[11px] text-amber-700 mt-1">
                    * Hiện chưa có bài toán nào ở trạng thái "Đã hoàn thành". Hãy nghiệm thu bài toán trước khi tạo liên kết.
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tên người dân / đại diện tiếp nhận
                </label>
                <input
                  type="text"
                  value={citizenNameInput}
                  onChange={(e) => setCitizenNameInput(e.target.value)}
                  placeholder="Để trống sẽ lấy theo người đăng bài toán"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Số điện thoại
                  </label>
                  <input
                    type="tel"
                    value={citizenPhoneInput}
                    onChange={(e) => setCitizenPhoneInput(e.target.value)}
                    placeholder="VD: 0903 xxx xxx"
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thời hạn hiệu lực (Ngày)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="90"
                    value={daysValidInput}
                    onChange={(e) => setDaysValidInput(Number(e.target.value))}
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium font-mono"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsGenerateModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={completedProblems.length === 0}
                  className="px-6 py-2.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
                >
                  TẠO LIÊN KẾT AN TOÀN
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
