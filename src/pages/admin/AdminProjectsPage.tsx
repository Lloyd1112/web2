import React, { useState, useEffect } from 'react';
import {
  AdminDataService,
  AdminProject,
  ProjectImplementationStatus,
  ProjectPublishStatus
} from '../../services/adminDataService';
import { RealProblem, AdminPartner } from '../../types';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  Building2,
  MapPin,
  Calendar,
  Tag,
  FolderKanban,
  Check,
  X,
  AlertTriangle,
  Upload,
  Globe,
  Layers,
  ArrowRight,
  RefreshCw,
  ExternalLink
} from 'lucide-react';

interface AdminProjectsPageProps {
  onOpenProblemDetail?: (problemId: string) => void;
  prefilledProblem?: RealProblem | null;
  onClearPrefilledProblem?: () => void;
}

export const AdminProjectsPage: React.FC<AdminProjectsPageProps> = ({
  onOpenProblemDetail,
  prefilledProblem,
  onClearPrefilledProblem
}) => {
  const [projects, setProjects] = useState<AdminProject[]>([]);
  const [problemsList, setProblemsList] = useState<RealProblem[]>([]);
  const [partnersList, setPartnersList] = useState<AdminPartner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedImplStatus, setSelectedImplStatus] = useState<string>('all');
  const [selectedPublishStatus, setSelectedPublishStatus] = useState<string>('all');

  // Form modal state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<AdminProject | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [selectedProjectIds, setSelectedProjectIds] = useState<string[]>([]);
  const [isBulkDeleteOpen, setIsBulkDeleteOpen] = useState(false);

  // Form inputs
  const [formCode, setFormCode] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formTitleEn, setFormTitleEn] = useState('');
  const [formThumbnail, setFormThumbnail] = useState('');
  const [formSummary, setFormSummary] = useState('');
  const [formSummaryEn, setFormSummaryEn] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formProblemId, setFormProblemId] = useState('');
  const [formCategory, setFormCategory] = useState('agriculture');
  const [formCategoryName, setFormCategoryName] = useState('Nông nghiệp công nghệ cao');
  const [formLocation, setFormLocation] = useState('Xã Bình Mỹ, Huyện Củ Chi, TP.HCM');
  const [formOrganization, setFormOrganization] = useState('');
  const [formTeamMembers, setFormTeamMembers] = useState('');
  const [formNeededResources, setFormNeededResources] = useState('');
  const [formExpectedOutcomes, setFormExpectedOutcomes] = useState('');
  const [formActualImpact, setFormActualImpact] = useState('');
  const [formPeriod, setFormPeriod] = useState('2026 - 2027');
  const [formImplStatus, setFormImplStatus] = useState<ProjectImplementationStatus>('in_progress');
  const [formPublishStatus, setFormPublishStatus] = useState<ProjectPublishStatus>('published');
  const [formPartnerIds, setFormPartnerIds] = useState<string[]>([]);

  useEffect(() => {
    loadData();
    const unsubscribe = AdminDataService.subscribe(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  // Handle prefilled problem coming from "Tạo dự án từ bài toán này"
  useEffect(() => {
    if (prefilledProblem) {
      initCreateFromProblem(prefilledProblem);
    }
  }, [prefilledProblem]);

  const loadData = () => {
    const list = AdminDataService.getProjects();
    setProjects([...list]);
    const probList = AdminDataService.getProblems();
    setProblemsList([...probList]);
    const partList = AdminDataService.getPartners();
    setPartnersList([...partList]);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const initCreateFromProblem = (problem: RealProblem) => {
    setEditingProject(null);
    setFormCode(`DA-BM-${String(projects.length + 1).padStart(3, '0')}`);
    setFormTitle(`Dự án: Ứng dụng giải pháp cho ${problem.title}`);
    setFormTitleEn(problem.titleEn ? `Project: Innovation solution for ${problem.titleEn}` : '');
    setFormThumbnail(problem.images?.[0] || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80');
    setFormSummary(problem.description || '');
    setFormSummaryEn(problem.descriptionEn || '');
    setFormContent(`Dự án được khởi tạo trực tiếp từ bài toán thực tế của địa phương: "${problem.title}".\n\nMục tiêu: Giải quyết triệt để nhu cầu: ${problem.desiredOutcome || 'nâng cao hiệu quả sản xuất cho người dân'}.\n\nĐối tượng hưởng lợi: ${problem.affectedAudience || 'Cộng đồng địa phương Bình Mỹ'}.`);
    setFormProblemId(problem.id);
    setFormCategory(problem.category);
    setFormCategoryName(problem.categoryDetail || problem.category);
    setFormLocation(problem.location || 'Xã Bình Mỹ, Huyện Củ Chi, TP.HCM');
    setFormOrganization(problem.organizationName || problem.contactName || 'Ban Dự án Làng Sinh Viên Bình Mỹ');
    setFormTeamMembers('Sinh viên tình nguyện, Chuyên gia cố vấn Viện/Trường');
    setFormNeededResources(problem.supportNeeded ? problem.supportNeeded.join(', ') : 'Công nghệ, Vốn tài trợ, Thiết bị');
    setFormExpectedOutcomes(problem.desiredOutcome || '');
    setFormActualImpact('');
    setFormPeriod('2026 - 2027');
    setFormImplStatus('recruiting');
    setFormPublishStatus('draft'); // Mặc định bản nháp để Admin hoàn thiện

    setIsFormOpen(true);
    if (onClearPrefilledProblem) onClearPrefilledProblem();
  };

  const handleOpenNew = () => {
    setEditingProject(null);
    setFormCode(`DA-BM-${String(projects.length + 1).padStart(3, '0')}`);
    setFormTitle('');
    setFormTitleEn('');
    setFormThumbnail('https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80');
    setFormSummary('');
    setFormSummaryEn('');
    setFormContent('');
    setFormProblemId('');
    setFormCategory('agriculture');
    setFormCategoryName('Nông nghiệp công nghệ cao');
    setFormLocation('Xã Bình Mỹ, Huyện Củ Chi, TP.HCM');
    setFormOrganization('Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ');
    setFormPartnerIds([]);
    setFormTeamMembers('');
    setFormNeededResources('');
    setFormExpectedOutcomes('');
    setFormActualImpact('');
    setFormPeriod('2026 - 2027');
    setFormImplStatus('seeking_resources');
    setFormPublishStatus('published');
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project: AdminProject) => {
    setEditingProject(project);
    setFormCode(project.code);
    setFormTitle(project.title);
    setFormTitleEn(project.titleEn || '');
    setFormThumbnail(project.thumbnail);
    setFormSummary(project.summary);
    setFormSummaryEn(project.summaryEn || '');
    setFormContent(project.content);
    setFormProblemId(project.problemId || '');
    setFormCategory(project.category);
    setFormCategoryName(project.categoryName);
    setFormLocation(project.location);
    setFormOrganization(project.organization);
    setFormPartnerIds(project.partnerIds || []);
    setFormTeamMembers(project.teamMembers ? project.teamMembers.join(', ') : '');
    setFormNeededResources(project.neededResources || '');
    setFormExpectedOutcomes(project.expectedOutcomes || '');
    setFormActualImpact(project.actualImpact || '');
    setFormPeriod(project.implementationPeriod || '2026 - 2027');
    setFormImplStatus(project.status);
    setFormPublishStatus(project.publishStatus);
    setIsFormOpen(true);
  };

  const handleSaveProject = (overridePublishStatus?: ProjectPublishStatus) => {
    if (!formTitle.trim()) {
      alert('Vui lòng nhập tên dự án!');
      return;
    }

    const linkedProblem = problemsList.find(p => p.id === formProblemId);

    const projectToSave: AdminProject = {
      id: editingProject ? editingProject.id : `proj-${Date.now()}`,
      code: formCode || `DA-BM-${Date.now().toString().slice(-4)}`,
      title: formTitle.trim(),
      titleEn: formTitleEn.trim() || undefined,
      thumbnail: formThumbnail.trim() || 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=600&q=80',
      summary: formSummary.trim(),
      summaryEn: formSummaryEn.trim() || undefined,
      content: formContent.trim(),
      problemId: formProblemId || undefined,
      problemTitle: linkedProblem ? linkedProblem.title : (formProblemId ? editingProject?.problemTitle : undefined),
      category: formCategory,
      categoryName: formCategoryName,
      location: formLocation.trim(),
      organization: formOrganization.trim() || 'Làng Sinh Viên Bình Mỹ',
      partnerIds: formPartnerIds,
      teamMembers: formTeamMembers ? formTeamMembers.split(',').map(s => s.trim()).filter(Boolean) : [],
      neededResources: formNeededResources.trim() || undefined,
      expectedOutcomes: formExpectedOutcomes.trim() || undefined,
      actualImpact: formActualImpact.trim() || undefined,
      implementationPeriod: formPeriod.trim(),
      status: formImplStatus,
      publishStatus: overridePublishStatus || formPublishStatus,
      createdAt: editingProject ? editingProject.createdAt : new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    AdminDataService.saveProject(projectToSave);
    loadData();
    setIsFormOpen(false);
    showToast(`Đã lưu dự án "${projectToSave.title}" thành công!`);
  };

  const handleDelete = (id: string) => {
    AdminDataService.deleteProject(id);
    setProjects(prev => prev.filter(p => p.id !== id));
    setSelectedProjectIds(prev => prev.filter(item => item !== id));
    setDeleteConfirmId(null);
    showToast('Đã xóa dự án khỏi hệ thống.');
  };

  const handleConfirmBulkDelete = () => {
    if (selectedProjectIds.length === 0) return;
    const count = selectedProjectIds.length;
    AdminDataService.deleteMultipleProjects(selectedProjectIds);
    setProjects(prev => prev.filter(p => !selectedProjectIds.includes(p.id)));
    setSelectedProjectIds([]);
    setIsBulkDeleteOpen(false);
    showToast(`Đã xóa thành công ${count} dự án khỏi hệ thống.`);
  };

  const toggleSelectAll = () => {
    if (selectedProjectIds.length === filteredProjects.length) {
      setSelectedProjectIds([]);
    } else {
      setSelectedProjectIds(filteredProjects.map(p => p.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedProjectIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleTogglePublish = (p: AdminProject) => {
    const nextStatus: ProjectPublishStatus = p.publishStatus === 'published' ? 'hidden' : 'published';
    AdminDataService.updateProjectPublishStatus(p.id, nextStatus);
    setProjects(prev => prev.map(item => item.id === p.id ? { ...item, publishStatus: nextStatus } : item));
    showToast(nextStatus === 'published' ? `Đã xuất bản dự án "${p.title}" lên Trang chủ!` : `Đã ẩn dự án "${p.title}" khỏi Trang chủ.`);
  };

  const handleCycleImplStatus = (p: AdminProject) => {
    const flow: ProjectImplementationStatus[] = ['in_progress', 'testing', 'seeking_resources', 'completed'];
    const currentIdx = flow.indexOf(p.status);
    const nextStatus = currentIdx >= 0 ? flow[(currentIdx + 1) % flow.length] : 'in_progress';
    AdminDataService.updateProjectImplStatus(p.id, nextStatus);
    setProjects(prev => prev.map(item => item.id === p.id ? { ...item, status: nextStatus } : item));
    showToast(`Đã cập nhật tiến độ dự án "${p.title}"`);
  };

  // Status helper badges
  const getImplStatusBadge = (status: ProjectImplementationStatus) => {
    switch (status) {
      case 'seeking_resources':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            <Clock className="w-3 h-3 text-amber-600" />
            Tìm kiếm nguồn lực
          </span>
        );
      case 'recruiting':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-200">
            <Sparkles className="w-3 h-3 text-blue-600" />
            Tuyển thành viên/đối tác
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Đang triển khai
          </span>
        );
      case 'testing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-100 text-purple-800 border border-purple-200">
            Đang thử nghiệm
          </span>
        );
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-teal-100 text-teal-800 border border-teal-200">
            <CheckCircle2 className="w-3 h-3 text-teal-600" />
            Đã hoàn thành
          </span>
        );
      case 'paused':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Tạm dừng
          </span>
        );
      default:
        return null;
    }
  };

  const getPublishStatusBadge = (pubStatus: ProjectPublishStatus) => {
    switch (pubStatus) {
      case 'published':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
            <Globe className="w-3 h-3 text-emerald-600" />
            Đã xuất bản
          </span>
        );
      case 'draft':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">
            Bản nháp
          </span>
        );
      case 'hidden':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200">
            Đã ẩn
          </span>
        );
      case 'archived':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-rose-100 text-rose-700 border border-rose-200">
            Đã lưu trữ
          </span>
        );
      default:
        return null;
    }
  };

  // Filtered projects
  const filteredProjects = projects.filter(p => {
    const matchSearch =
      p.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.problemTitle && p.problemTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
      p.organization.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchImpl = selectedImplStatus === 'all' || p.status === selectedImplStatus;
    const matchPub = selectedPublishStatus === 'all' || p.publishStatus === selectedPublishStatus;

    return matchSearch && matchCategory && matchImpl && matchPub;
  });

  return (
    <div className="space-y-6">
      
      {/* Toast */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header and Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Nghiệp vụ Dự án
            </span>
            <span className="text-xs text-slate-600">Đồng bộ trang công khai & Quản trị</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Quản lý Dự án Đổi mới Sáng tạo</h1>
          <p className="text-sm text-slate-700 mt-0.5">
            Tạo, xuất bản và theo dõi tiến độ các dự án ươm tạo từ bài toán địa phương Bình Mỹ.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo dự án mới</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo mã dự án, tên dự án, bài toán nguồn, đơn vị..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
            />
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả lĩnh vực</option>
              <option value="agriculture">Nông nghiệp</option>
              <option value="health">Y tế</option>
              <option value="tourism">Du lịch</option>
              <option value="innovation">Đổi mới sáng tạo</option>
              <option value="education">Giáo dục</option>
              <option value="environment">Môi trường</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedImplStatus}
              onChange={(e) => setSelectedImplStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tiến độ triển khai</option>
              <option value="seeking_resources">Tìm kiếm nguồn lực</option>
              <option value="recruiting">Tuyển thành viên</option>
              <option value="in_progress">Đang triển khai</option>
              <option value="testing">Đang thử nghiệm</option>
              <option value="completed">Đã hoàn thành</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <select
              value={selectedPublishStatus}
              onChange={(e) => setSelectedPublishStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Xuất bản ({projects.length})</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp</option>
              <option value="hidden">Đã ẩn</option>
              <option value="archived">Lưu trữ</option>
            </select>
          </div>

        </div>

        <div className="flex items-center gap-3 pt-2 border-t border-slate-100 text-xs text-slate-700">
          <span className="font-semibold text-slate-700">Hiển thị {filteredProjects.length} dự án</span>
          <span>•</span>
          <span className="text-emerald-700 font-medium">Xuất bản: {projects.filter(p => p.publishStatus === 'published').length}</span>
          <span>•</span>
          <span className="text-amber-700 font-medium">Bản nháp: {projects.filter(p => p.publishStatus === 'draft').length}</span>
          <span>•</span>
          <span className="text-blue-700 font-medium">Đang triển khai: {projects.filter(p => p.status === 'in_progress').length}</span>
        </div>
      </div>

      {/* Thanh thao tác hàng loạt khi có chọn dự án */}
      {selectedProjectIds.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-2xl p-3 px-4 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse" />
            <span className="text-xs font-bold text-rose-950">
              Đã chọn <strong>{selectedProjectIds.length}</strong> dự án
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedProjectIds([])}
              className="px-3 py-1.5 rounded-xl bg-white border border-rose-200 text-xs font-semibold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
            >
              Bỏ chọn
            </button>
            <button
              onClick={() => setIsBulkDeleteOpen(true)}
              className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Xóa các dự án đã chọn ({selectedProjectIds.length})</span>
            </button>
          </div>
        </div>
      )}

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-3 w-10 text-center">
                  <input
                    type="checkbox"
                    checked={filteredProjects.length > 0 && selectedProjectIds.length === filteredProjects.length}
                    onChange={toggleSelectAll}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                    title="Chọn tất cả"
                  />
                </th>
                <th className="py-3.5 px-4">Dự án</th>
                <th className="py-3.5 px-4">Bài toán nguồn</th>
                <th className="py-3.5 px-4">Lĩnh vực & Đơn vị</th>
                <th className="py-3.5 px-4">Triển khai</th>
                <th className="py-3.5 px-4">Xuất bản</th>
                <th className="py-3.5 px-4">Cập nhật</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProjects.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3">
                      <FolderKanban className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Chưa có dự án nào phù hợp</p>
                    <p className="text-xs text-slate-600 mt-1">Hãy tạo dự án mới hoặc chọn lọc từ bài toán đã duyệt</p>
                  </td>
                </tr>
              ) : (
                filteredProjects.map((p) => {
                  const isChecked = selectedProjectIds.includes(p.id);
                  return (
                    <tr key={p.id} className={`hover:bg-slate-50/70 transition-colors ${isChecked ? 'bg-rose-50/30' : ''}`}>
                      <td className="py-3 px-3 text-center">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => toggleSelect(p.id)}
                          className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                        />
                      </td>

                      {/* Project thumbnail & title */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3 max-w-[280px]">
                          <img
                            src={p.thumbnail}
                            alt={p.title}
                            className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                          />
                          <div>
                            <div className="font-mono text-[11px] font-bold text-slate-600">{p.code}</div>
                            <div className="font-bold text-slate-900 text-xs leading-snug line-clamp-2 hover:text-emerald-700">
                              {p.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Linked Problem */}
                      <td className="py-3 px-4">
                        {p.problemTitle ? (
                          <div className="max-w-[220px]">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded-sm border border-emerald-200 block mb-0.5 w-fit">
                              Liên kết bài toán
                            </span>
                            <span
                              onClick={() => p.problemId && onOpenProblemDetail && onOpenProblemDetail(p.problemId)}
                              className="text-xs font-medium text-slate-800 line-clamp-1 hover:text-emerald-700 cursor-pointer"
                              title={p.problemTitle}
                            >
                              {p.problemTitle}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-600 italic">Dự án độc lập</span>
                        )}
                      </td>

                      {/* Category & Organization */}
                      <td className="py-3 px-4">
                        <div className="text-xs font-semibold text-slate-800">{p.categoryName}</div>
                        <div className="text-[11px] text-slate-600 truncate max-w-[160px]" title={p.organization}>
                          {p.organization}
                        </div>
                        {p.partnerIds && p.partnerIds.length > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                              {p.partnerIds.length} đối tác tham gia
                            </span>
                          </div>
                        )}
                      </td>

                      {/* Implementation status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleCycleImplStatus(p)}
                          title="Bấm để chuyển đổi nhanh tiến độ triển khai"
                          className="cursor-pointer hover:opacity-80 transition-opacity active:scale-95 text-left inline-block"
                        >
                          {getImplStatusBadge(p.status)}
                        </button>
                      </td>

                      {/* Publish status */}
                      <td className="py-3 px-4 whitespace-nowrap">
                        <button
                          type="button"
                          onClick={() => handleTogglePublish(p)}
                          title="Bấm để chuyển đổi nhanh Ẩn / Xuất bản công khai lên Trang chủ"
                          className="cursor-pointer hover:opacity-80 transition-opacity active:scale-95 text-left inline-block"
                        >
                          {getPublishStatusBadge(p.publishStatus)}
                        </button>
                      </td>

                      {/* Updated date */}
                      <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                        {p.updatedAt}
                      </td>

                      {/* Actions */}
                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(p)}
                            title="Chỉnh sửa dự án"
                            className="p-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-600 transition-colors cursor-pointer"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(p.id)}
                            title="Xóa dự án này"
                            className="p-1.5 bg-rose-50 hover:bg-rose-600 hover:text-white rounded-lg text-rose-600 border border-rose-200 hover:border-rose-600 transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
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
      </div>

      {/* Delete confirmation dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
          <div 
            className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            {(() => {
              const target = projects.find(p => p.id === deleteConfirmId);
              return (
                <div className="text-center space-y-2">
                  <h3 className="text-base font-extrabold text-slate-900">Xác nhận xóa dự án?</h3>
                  {target && (
                    <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200 text-left">
                      <span className="font-mono text-[11px] font-bold text-slate-500 block">{target.code}</span>
                      <p className="font-bold text-slate-900 text-xs mt-0.5 line-clamp-2">{target.title}</p>
                    </div>
                  )}
                  <p className="text-xs text-rose-600 font-medium">
                    ⚠️ Dự án này sẽ bị xóa vĩnh viễn khỏi hệ thống. Hành động này không thể hoàn tác.
                  </p>
                </div>
              );
            })()}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Đồng ý xóa</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete confirmation dialog */}
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
                Xác nhận xóa {selectedProjectIds.length} dự án đã chọn?
              </h3>
              <p className="text-xs text-slate-600">
                Bạn đã chọn {selectedProjectIds.length} dự án để xóa. Toàn bộ dữ liệu của các dự án này sẽ bị xóa vĩnh viễn khỏi hệ thống.
              </p>
              <p className="text-[11px] text-rose-600 font-medium pt-1">
                ⚠️ Hành động này không thể hoàn tác.
              </p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsBulkDeleteOpen(false)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200 cursor-pointer transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmBulkDelete}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700 cursor-pointer transition-colors flex items-center gap-1.5 shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Đồng ý xóa ({selectedProjectIds.length})</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= FORM MODAL TẠO / SỬA DỰ ÁN ================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-scale-up">
            
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 rounded-t-3xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800">
                    {formCode}
                  </span>
                  <span className="text-xs text-slate-600">
                    {editingProject ? 'Chỉnh sửa thông tin dự án' : 'Tạo mới dự án đổi mới sáng tạo'}
                  </span>
                </div>
                <h2 className="text-xl font-black text-slate-900">
                  {editingProject ? formTitle : 'Biểu mẫu Dự án Đổi mới sáng tạo'}
                </h2>
              </div>

              <button
                onClick={() => setIsFormOpen(false)}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Form Body */}
            <div className="p-6 overflow-y-auto flex-1 space-y-5">
              
              {/* Linked Problem Picker */}
              <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-200 space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider text-emerald-800">
                  Liên kết bài toán thực tế nguồn (Nghiệp vụ 8.3)
                </label>
                <select
                  value={formProblemId}
                  onChange={(e) => {
                    const pid = e.target.value;
                    setFormProblemId(pid);
                    const selected = problemsList.find(p => p.id === pid);
                    if (selected && !formTitle) {
                      setFormTitle(`Dự án giải pháp: ${selected.title}`);
                      setFormCategory(selected.category);
                      setFormCategoryName(selected.categoryDetail || selected.category);
                      setFormLocation(selected.location);
                      setFormSummary(selected.description);
                    }
                  }}
                  className="w-full px-3 py-2 bg-white border border-emerald-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                >
                  <option value="">-- Dự án độc lập (Không liên kết bài toán) --</option>
                  {problemsList.map(prob => (
                    <option key={prob.id} value={prob.id}>
                      [{prob.status === 'verified' || prob.isPublic ? 'Đã duyệt' : 'Đang xử lý'}] {prob.id.toUpperCase()} - {prob.title}
                    </option>
                  ))}
                </select>
                <p className="text-[11px] text-emerald-700">
                  Khi chọn bài toán, hệ thống sẽ tự động gán dữ liệu nguồn và liên kết đơn đề xuất tương ứng.
                </p>
              </div>

              {/* Title & Title En */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên dự án (Tiếng Việt) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    placeholder="VD: Hệ thống tưới nhỏ giọt kết hợp IoT cho vườn rau Củ Chi"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tên dự án (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={formTitleEn}
                    onChange={(e) => setFormTitleEn(e.target.value)}
                    placeholder="VD: IoT Drip Irrigation System for Cu Chi Vegetable Farms"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Thumbnail URL & Location */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Ảnh đại diện URL
                  </label>
                  <input
                    type="text"
                    value={formThumbnail}
                    onChange={(e) => setFormThumbnail(e.target.value)}
                    placeholder="URL ảnh https://..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Địa điểm triển khai
                  </label>
                  <input
                    type="text"
                    value={formLocation}
                    onChange={(e) => setFormLocation(e.target.value)}
                    placeholder="Xã Bình Mỹ, Củ Chi..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Category & Organization */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Lĩnh vực dự án
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => {
                      setFormCategory(e.target.value);
                      const map: Record<string, string> = {
                        agriculture: 'Nông nghiệp công nghệ cao',
                        health: 'Y tế & Sức khỏe cộng đồng',
                        tourism: 'Du lịch sinh thái & Văn hóa',
                        innovation: 'Đổi mới sáng tạo',
                        education: 'Đào tạo & Nhân lực',
                        environment: 'Môi trường & Tuần hoàn'
                      };
                      setFormCategoryName(map[e.target.value] || e.target.value);
                    }}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  >
                    <option value="agriculture">Nông nghiệp công nghệ cao</option>
                    <option value="health">Y tế & Sức khỏe cộng đồng</option>
                    <option value="tourism">Du lịch sinh thái & Văn hóa</option>
                    <option value="innovation">Đổi mới sáng tạo</option>
                    <option value="education">Đào tạo & Nhân lực</option>
                    <option value="environment">Môi trường & Tuần hoàn</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Đơn vị / Nhóm thực hiện
                  </label>
                  <input
                    type="text"
                    value={formOrganization}
                    onChange={(e) => setFormOrganization(e.target.value)}
                    placeholder="VD: CLB Khởi nghiệp Nông nghiệp Trường ĐH Nông Lâm"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Summary */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả ngắn dự án
                </label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn mục đích và nội dung cốt lõi của dự án..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Detailed Content */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung chi tiết & Kế hoạch
                </label>
                <textarea
                  rows={4}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Trình bày giải pháp kỹ thuật, phương pháp triển khai, đối tượng thụ hưởng..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                />
              </div>

              {/* Team Members & Resources Needed */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thành viên / Cố vấn tham gia (ngăn cách dấu phẩy)
                  </label>
                  <input
                    type="text"
                    value={formTeamMembers}
                    onChange={(e) => setFormTeamMembers(e.target.value)}
                    placeholder="TS. Nguyễn Văn A, SV. Trần B..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nguồn lực cần huy động thêm
                  </label>
                  <input
                    type="text"
                    value={formNeededResources}
                    onChange={(e) => setFormNeededResources(e.target.value)}
                    placeholder="Cảm biến IoT, Vốn tài trợ 30 triệu, Chuyên gia vi sinh..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Expected outcomes & Period */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Kết quả mong đợi
                  </label>
                  <input
                    type="text"
                    value={formExpectedOutcomes}
                    onChange={(e) => setFormExpectedOutcomes(e.target.value)}
                    placeholder="Tiết kiệm 40% nước tưới, tăng năng suất 15%..."
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Thời gian triển khai
                  </label>
                  <input
                    type="text"
                    value={formPeriod}
                    onChange={(e) => setFormPeriod(e.target.value)}
                    placeholder="Q1/2026 - Q4/2026"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              {/* Participating Partners Selection (Nghiệp vụ 5 & 6) */}
              <div className="p-4 bg-slate-50/90 rounded-2xl border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Đối tác tham gia dự án (Đồng bộ từ Quản lý đối tác):
                  </label>
                  <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Đã chọn {formPartnerIds.length} đối tác
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 max-h-48 overflow-y-auto p-2 bg-white rounded-xl border border-slate-200">
                  {partnersList.length === 0 ? (
                    <span className="text-xs text-slate-400 italic p-2 col-span-full">Chưa có đối tác nào trong hệ thống</span>
                  ) : (
                    partnersList.map((partner) => {
                      const isSelected = formPartnerIds.includes(partner.id);
                      return (
                        <label
                          key={partner.id}
                          className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all select-none ${
                            isSelected
                              ? 'bg-emerald-50/80 border-emerald-400 text-emerald-950 font-semibold shadow-2xs'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => {
                              if (isSelected) {
                                setFormPartnerIds(prev => prev.filter(id => id !== partner.id));
                              } else {
                                setFormPartnerIds(prev => [...prev, partner.id]);
                              }
                            }}
                            className="w-3.5 h-3.5 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                          />
                          {partner.logoUrl ? (
                            <img src={partner.logoUrl} alt={partner.nameVi} className="w-5 h-5 object-contain rounded shrink-0 bg-white" />
                          ) : (
                            <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                          )}
                          <span className="truncate" title={partner.nameVi}>{partner.nameVi}</span>
                        </label>
                      );
                    })
                  )}
                </div>
                <p className="text-[11px] text-slate-500">
                  Đối tác được chọn sẽ hiển thị trong trang chi tiết dự án. Nếu đối tác tắt hiển thị ở trang chủ, liên kết với dự án vẫn được bảo toàn.
                </p>
              </div>

              {/* Status Section: Implementation Status & Publish Status */}
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Trạng thái triển khai thực tế:
                  </label>
                  <select
                    value={formImplStatus}
                    onChange={(e) => setFormImplStatus(e.target.value as ProjectImplementationStatus)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                  >
                    <option value="seeking_resources">Đang tìm kiếm nguồn lực</option>
                    <option value="recruiting">Đang tuyển thành viên/đối tác</option>
                    <option value="in_progress">Đang triển khai</option>
                    <option value="testing">Đang thử nghiệm mô hình</option>
                    <option value="completed">Đã hoàn thành</option>
                    <option value="paused">Tạm dừng</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1">
                    Trạng thái xuất bản website (Nghiệp vụ 8.4):
                  </label>
                  <select
                    value={formPublishStatus}
                    onChange={(e) => setFormPublishStatus(e.target.value as ProjectPublishStatus)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden font-medium"
                  >
                    <option value="published">Xuất bản (Hiển thị ra ngoài website)</option>
                    <option value="draft">Bản nháp (Chỉ xem trong Admin)</option>
                    <option value="hidden">Ẩn (Không hiện trên danh sách công khai)</option>
                    <option value="archived">Lưu trữ</option>
                  </select>
                </div>
              </div>

            </div>

            {/* Modal Actions */}
            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 rounded-b-3xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                >
                  Hủy bỏ
                </button>
                {editingProject && (
                  <button
                    type="button"
                    onClick={() => {
                      const idToDelete = editingProject.id;
                      setIsFormOpen(false);
                      setDeleteConfirmId(idToDelete);
                    }}
                    className="px-4 py-2 bg-white border border-rose-300 hover:bg-rose-50 text-rose-700 text-xs font-bold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                    <span>Xóa dự án này</span>
                  </button>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleSaveProject('draft')}
                  className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition-colors cursor-pointer"
                >
                  Lưu bản nháp
                </button>

                <button
                  type="button"
                  onClick={() => handleSaveProject('published')}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Globe className="w-4 h-4" />
                  <span>Xuất bản ngay</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
