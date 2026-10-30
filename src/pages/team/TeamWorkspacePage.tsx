import React, { useState, useEffect } from 'react';
import { RealProblem, ProblemProgressUpdate, AppUser } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { useLanguage } from '../../context/LanguageContext';
import { ProblemTimeline } from '../../components/problems/ProblemTimeline';
import {
  FolderKanban,
  CheckCircle2,
  Clock,
  Plus,
  Send,
  Upload,
  FileText,
  Image as ImageIcon,
  User,
  Calendar,
  AlertCircle,
  TrendingUp,
  MapPin,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Award
} from 'lucide-react';

interface TeamWorkspacePageProps {
  onNavigate: (tab: string) => void;
  onOpenProblemDetail?: (problemId: string) => void;
}

export const TeamWorkspacePage: React.FC<TeamWorkspacePageProps> = ({
  onNavigate,
  onOpenProblemDetail
}) => {
  const { language } = useLanguage();
  const [currentUser, setCurrentUser] = useState<AppUser | null>(null);
  const [assignedProblems, setAssignedProblems] = useState<RealProblem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<RealProblem | null>(null);

  // Form Cập nhật tiến độ mới
  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateDesc, setUpdateDesc] = useState('');
  const [updateDate, setUpdateDate] = useState(new Date().toLocaleDateString('vi-VN'));
  const [isCompletedMilestone, setIsCompletedMilestone] = useState(true);
  const [evidenceUrl, setEvidenceUrl] = useState('');
  const [evidenceDocName, setEvidenceDocName] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isReportingCompletion, setIsReportingCompletion] = useState(false);
  const [completionSummary, setCompletionSummary] = useState('');

  useEffect(() => {
    loadData();
    const unsub = AdminDataService.subscribe(loadData);
    return unsub;
  }, []);

  const loadData = () => {
    const user = AdminDataService.getCurrentUser();
    setCurrentUser(user);

    if (user) {
      const list = AdminDataService.getProblemsByAssignedUser(user.id);
      // Nếu user là sinh viên hoặc chuyên gia chưa có bài nào gán trực tiếp, hiển thị các bài đang triển khai để tiện thao tác
      if (list.length === 0) {
        const inProg = AdminDataService.getProblems().filter(p => p.status === 'in_progress' || p.status === 'evaluating');
        setAssignedProblems(inProg);
        if (!selectedProblem && inProg.length > 0) setSelectedProblem(inProg[0]);
      } else {
        setAssignedProblems(list);
        if (!selectedProblem && list.length > 0) setSelectedProblem(list[0]);
      }
    } else {
      // Khách hoặc chưa đăng nhập: hiển thị demo các bài đang triển khai
      const inProg = AdminDataService.getProblems().filter(p => p.status === 'in_progress' || p.status === 'evaluating');
      setAssignedProblems(inProg);
      if (!selectedProblem && inProg.length > 0) setSelectedProblem(inProg[0]);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleSelectProblem = (p: RealProblem) => {
    const latest = AdminDataService.getProblemById(p.id) || p;
    setSelectedProblem(latest);
    setIsAddingUpdate(false);
    setIsReportingCompletion(false);
  };

  const handleAddUpdateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblem) return;

    if (!updateTitle.trim() || !updateDesc.trim()) {
      showToast('Vui lòng nhập tiêu đề và mô tả công việc.');
      return;
    }

    const images = evidenceUrl.trim() ? [evidenceUrl.trim()] : undefined;

    const res = AdminDataService.addProgressUpdate(selectedProblem.id, {
      title: updateTitle.trim(),
      description: updateDesc.trim(),
      date: updateDate,
      completed: isCompletedMilestone,
      evidenceImages: images,
      evidenceDocName: evidenceDocName.trim() || undefined,
      submittedBy: currentUser?.fullName || 'Nhóm Sinh viên Thực hiện',
      submittedRole: 'team_member'
    });

    if (res) {
      showToast('Đã gửi báo cáo tiến độ thành công! Ban Quản lý sẽ xem xét và phê duyệt.');
      setUpdateTitle('');
      setUpdateDesc('');
      setEvidenceUrl('');
      setEvidenceDocName('');
      setIsAddingUpdate(false);
      const updated = AdminDataService.getProblemById(selectedProblem.id);
      if (updated) setSelectedProblem(updated);
    }
  };

  const handleReportCompletionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProblem) return;

    if (!completionSummary.trim()) {
      showToast('Vui lòng nhập tóm tắt kết quả thực tế đạt được.');
      return;
    }

    // Chuyển sang trạng thái evaluating (Chờ đánh giá kết quả)
    AdminDataService.updateProblemWorkflowStatus(
      selectedProblem.id,
      'evaluating',
      `Nhóm thực hiện gửi báo cáo nghiệm thu: ${completionSummary}`,
      currentUser?.fullName || 'Nhóm thực hiện'
    );

    const updated = AdminDataService.getProblemById(selectedProblem.id);
    if (updated) {
      updated.completionSummary = completionSummary.trim();
      AdminDataService.saveProblem(updated);
      setSelectedProblem(updated);
    }

    setIsReportingCompletion(false);
    setCompletionSummary('');
    showToast('Đã nộp báo cáo kết quả thành công! Đang chờ Ban Quản trị nghiệm thu.');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* Toast alert */}
        {toastMessage && (
          <div className="fixed top-20 right-6 z-50 p-4 bg-slate-900 text-white rounded-2xl shadow-xl flex items-center gap-3 text-xs font-semibold animate-in fade-in slide-in-from-top-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Header khu vực làm việc */}
        <div className="bg-gradient-to-r from-emerald-800 via-teal-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>KHU VỰC LÀM VIỆC DÀNH CHO NHÓM THỰC HIỆN & CHUYÊN GIA</span>
              </span>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Không Gian Báo Cáo Tiến Độ & Minh Chứng
              </h1>
              <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
                Xin chào <strong className="text-white">{currentUser?.fullName || 'Bạn'}</strong> 
                {currentUser?.organization && ` (${currentUser.organization})`}. Theo dõi nhiệm vụ, cập nhật công việc thực địa và nộp kết quả nghiệm thu cho Ban Quản lý Làng SV.
              </p>
            </div>

            {/* Role switch / login quick reminder */}
            <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigate('admin-login')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-bold border border-white/20 transition-all cursor-pointer backdrop-blur-md flex items-center justify-center gap-2"
              >
                <User className="w-4 h-4" />
                <span>{currentUser ? 'Chuyển tài khoản' : 'Đăng nhập tài khoản'}</span>
              </button>
              <button
                onClick={() => onNavigate('real-problems')}
                className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-black transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Xem tất cả bài toán</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid 2 Cột: Cột trái danh sách bài toán, Cột phải chi tiết và cập nhật */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* CỘT TRÁI: Danh sách bài toán được giao (4 cột) */}
          <div className="lg:col-span-4 bg-white rounded-3xl border border-slate-200/90 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h2 className="text-sm font-black text-slate-900 tracking-tight flex items-center gap-2">
                <FolderKanban className="w-4 h-4 text-emerald-600" />
                <span>Bài toán được phân công ({assignedProblems.length})</span>
              </h2>
            </div>

            {assignedProblems.length === 0 ? (
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-500 space-y-2">
                <AlertCircle className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="font-bold text-slate-700">Chưa có bài toán phân công trực tiếp</p>
                <p>Khi Ban Quản lý giao bài toán cho bạn, thông tin nhiệm vụ sẽ hiển thị tại đây.</p>
              </div>
            ) : (
              <div className="space-y-2.5">
                {assignedProblems.map((p) => {
                  const isSelected = selectedProblem?.id === p.id;
                  const updatesCount = p.progressUpdates?.length || 0;
                  return (
                    <div
                      key={p.id}
                      onClick={() => handleSelectProblem(p)}
                      className={`p-3.5 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-emerald-50/80 border-[#00875a] shadow-xs ring-1 ring-emerald-500/30'
                          : 'bg-slate-50/70 border-slate-200 hover:bg-white hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-[11px] font-mono font-bold text-emerald-800 bg-white px-2 py-0.5 rounded border border-emerald-200">
                          {p.code || 'BM-XXX'}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          p.status === 'completed' ? 'bg-emerald-100 text-emerald-800' :
                          p.status === 'evaluating' ? 'bg-amber-100 text-amber-800' :
                          'bg-sky-100 text-sky-800'
                        }`}>
                          {p.status === 'completed' && 'Đã hoàn thành'}
                          {p.status === 'evaluating' && 'Chờ đánh giá'}
                          {p.status === 'in_progress' && 'Đang triển khai'}
                          {p.status === 'seeking_support' && 'Kết nối nguồn lực'}
                          {p.status === 'verified' && 'Đã xác minh'}
                        </span>
                      </div>

                      <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                        {p.title}
                      </h3>

                      <div className="mt-2 flex items-center justify-between text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-rose-500" />
                          <span className="truncate max-w-[140px]">{p.location}</span>
                        </span>
                        <span className="font-semibold text-emerald-700">
                          {p.progressPercentage || 0}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* CỘT PHẢI: Không gian làm việc, cập nhật tiến độ & nộp kết quả (8 cột) */}
          <div className="lg:col-span-8 space-y-6">

            {selectedProblem ? (
              <div className="space-y-6">

                {/* Banner tóm tắt bài toán đang chọn */}
                <div className="bg-white rounded-3xl border border-slate-200/90 shadow-sm p-6 space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
                    <div className="space-y-1">
                      <span className="text-xs font-black text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        {selectedProblem.code || 'BM-XXX'}
                      </span>
                      <h2 className="text-lg sm:text-xl font-black text-slate-900 leading-snug mt-1">
                        {selectedProblem.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => setIsAddingUpdate(!isAddingUpdate)}
                        className="px-4 py-2 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                      >
                        <Plus className="w-4 h-4" />
                        <span>Thêm cập nhật tiến độ</span>
                      </button>

                      {selectedProblem.status === 'in_progress' && (
                        <button
                          onClick={() => setIsReportingCompletion(!isReportingCompletion)}
                          className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer active:scale-95"
                        >
                          <Award className="w-4 h-4" />
                          <span>Báo cáo hoàn thành</span>
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Chi tiết yêu cầu bài toán */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block font-semibold">Chủ bài toán / Hộ dân:</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">{selectedProblem.contactName}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block font-semibold">Địa bàn thực địa:</span>
                      <span className="font-bold text-slate-800 mt-0.5 block">{selectedProblem.location}</span>
                    </div>
                    <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                      <span className="text-slate-400 block font-semibold">Kết quả mong đợi:</span>
                      <span className="font-bold text-slate-800 mt-0.5 block truncate">{selectedProblem.desiredOutcome}</span>
                    </div>
                  </div>
                </div>

                {/* FORM THÊM CẬP NHẬT TIẾN ĐỘ & TẢI MINH CHỨNG */}
                {isAddingUpdate && (
                  <div className="bg-white rounded-3xl border-2 border-emerald-500 shadow-md p-6 space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                      <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-emerald-600" />
                        <span>Cập nhật mốc tiến độ & minh chứng công việc</span>
                      </h3>
                      <button
                        onClick={() => setIsAddingUpdate(false)}
                        className="text-xs text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        Đóng form
                      </button>
                    </div>

                    <form onSubmit={handleAddUpdateSubmit} className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Tiêu đề công việc / Mốc hoàn thành <span className="text-rose-500">*</span>
                        </label>
                        <input
                          type="text"
                          required
                          value={updateTitle}
                          onChange={(e) => setUpdateTitle(e.target.value)}
                          placeholder="VD: Khảo sát thực địa và thử nghiệm màng sinh học Chitosan đợt 1"
                          className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 font-medium"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1">
                            Ngày thực hiện <span className="text-rose-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            value={updateDate}
                            onChange={(e) => setUpdateDate(e.target.value)}
                            placeholder="DD/MM/YYYY"
                            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 font-medium font-mono"
                          />
                        </div>

                        <div className="flex items-center pt-6">
                          <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                            <input
                              type="checkbox"
                              checked={isCompletedMilestone}
                              onChange={(e) => setIsCompletedMilestone(e.target.checked)}
                              className="rounded text-emerald-600 focus:ring-emerald-500 w-4 h-4"
                            />
                            <span>Đã hoàn thành mốc công việc này</span>
                          </label>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-700 mb-1">
                          Mô tả chi tiết công việc và kết quả đạt được <span className="text-rose-500">*</span>
                        </label>
                        <textarea
                          rows={3}
                          required
                          value={updateDesc}
                          onChange={(e) => setUpdateDesc(e.target.value)}
                          placeholder="Mô tả các bước triển khai, thông số kỹ thuật, số lượng hộ dân tham gia hoặc phản hồi tại hiện trường..."
                          className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-emerald-600 font-medium leading-relaxed"
                        />
                      </div>

                      {/* Tải hình ảnh & tài liệu minh chứng */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-200">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <ImageIcon className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Hình ảnh minh chứng (URL hoặc ảnh)</span>
                          </label>
                          <input
                            type="text"
                            value={evidenceUrl}
                            onChange={(e) => setEvidenceUrl(e.target.value)}
                            placeholder="/assets/problems/card1.jpg hoặc link ảnh"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-mono text-[11px]"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Tên tài liệu / Biên bản nghiệm thu</span>
                          </label>
                          <input
                            type="text"
                            value={evidenceDocName}
                            onChange={(e) => setEvidenceDocName(e.target.value)}
                            placeholder="VD: Bien_ban_khao_sat_thuc_dia.pdf"
                            className="w-full px-3 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-emerald-600"
                          />
                        </div>
                      </div>

                      <div className="flex items-center justify-end gap-3 pt-2">
                        <button
                          type="button"
                          onClick={() => setIsAddingUpdate(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 cursor-pointer"
                        >
                          Hủy bỏ
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                          <Send className="w-3.5 h-3.5" />
                          <span>GỬI BÁO CÁO CẬP NHẬT</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* FORM BÁO CÁO KẾT QUẢ CUỐI CÙNG CHO ADMIN */}
                {isReportingCompletion && (
                  <div className="bg-amber-50 rounded-3xl border-2 border-amber-400 p-6 space-y-4 animate-in fade-in">
                    <div className="flex items-center justify-between pb-3 border-b border-amber-200">
                      <h3 className="text-sm font-bold text-amber-950 flex items-center gap-2">
                        <Award className="w-4 h-4 text-amber-600" />
                        <span>Nộp báo cáo hoàn thành nhiệm vụ để Admin nghiệm thu</span>
                      </h3>
                      <button
                        onClick={() => setIsReportingCompletion(false)}
                        className="text-xs text-amber-800 hover:text-amber-950 cursor-pointer"
                      >
                        Đóng
                      </button>
                    </div>

                    <form onSubmit={handleReportCompletionSubmit} className="space-y-3">
                      <p className="text-xs text-amber-900 leading-relaxed">
                        Sau khi nộp báo cáo, trạng thái bài toán sẽ chuyển thành <strong>"Chờ đánh giá kết quả"</strong>. Khi Admin nghiệm thu và xác nhận "Đã hoàn thành", hệ thống sẽ chính thức mở liên kết đánh giá Feedback cho người dân.
                      </p>
                      <textarea
                        rows={3}
                        required
                        value={completionSummary}
                        onChange={(e) => setCompletionSummary(e.target.value)}
                        placeholder="Tóm tắt kết quả cụ thể: Giải pháp đã hoàn thành như thế nào? Hiệu quả mang lại cho người dân?..."
                        className="w-full p-3 bg-white border border-amber-300 rounded-xl text-xs text-slate-900 focus:outline-emerald-600 font-medium leading-relaxed"
                      />
                      <div className="flex justify-end gap-3 pt-1">
                        <button
                          type="button"
                          onClick={() => setIsReportingCompletion(false)}
                          className="px-4 py-2 rounded-xl text-xs font-semibold text-amber-900 cursor-pointer"
                        >
                          Hủy
                        </button>
                        <button
                          type="submit"
                          className="px-6 py-2.5 rounded-full bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold shadow-md transition-all active:scale-95 cursor-pointer flex items-center gap-2"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>NỘP BÁO CÁO NGHIỆM THU</span>
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* TIMELINE TIẾN ĐỘ THỰC TẾ CHI TIẾT */}
                <ProblemTimeline problem={selectedProblem} />

              </div>
            ) : (
              <div className="p-12 text-center bg-white rounded-3xl border border-slate-200 text-slate-500 text-xs">
                Chọn một bài toán ở danh sách bên trái để xem tiến độ và nộp cập nhật công việc.
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
