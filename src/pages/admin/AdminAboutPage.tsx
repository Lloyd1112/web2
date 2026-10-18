import React, { useState, useEffect, useId } from 'react';
import { 
  AdminDataService 
} from '../../services/adminDataService';
import { 
  AboutIntroConfig, 
  TeamRole, 
  ExpertDomain, 
  TeamMember, 
  TeamMemberGroup, 
  TeamMemberStatus 
} from '../../types';
import {
  Users,
  UserCheck,
  GraduationCap,
  Sparkles,
  Plus,
  Search,
  Filter,
  Edit2,
  Trash2,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Upload,
  Image as ImageIcon,
  CheckCircle2,
  AlertTriangle,
  X,
  Laptop,
  Sprout,
  Compass,
  BookOpen,
  TrendingUp,
  HeartPulse,
  Save,
  RotateCcw,
  Briefcase,
  Shield,
  Layers,
  ArrowRight
} from 'lucide-react';

// Domain icon mapper
const DOMAIN_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Laptop,
  Sprout,
  Compass,
  BookOpen,
  TrendingUp,
  HeartPulse,
  Briefcase,
  Shield
};

export const AdminAboutPage: React.FC = () => {
  const introBannerInputId = useId();
  const memberAvatarInputId = useId();
  // Active Tab
  const [activeTab, setActiveTab] = useState<'intro' | 'executive_mgmt' | 'student' | 'expert' | 'domains' | 'roles'>('executive_mgmt');

  // Core Data loaded from AdminDataService
  const [intro, setIntro] = useState<AboutIntroConfig>(AdminDataService.getAboutIntro());
  const [roles, setRoles] = useState<TeamRole[]>(AdminDataService.getTeamRoles());
  const [domains, setDomains] = useState<ExpertDomain[]>(AdminDataService.getExpertDomains());
  const [members, setMembers] = useState<TeamMember[]>(AdminDataService.getTeamMembers());

  // Search & Filters
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState<string>('all');
  const [filterDomain, setFilterDomain] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Modals state
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<TeamRole | null>(null);

  const [isDomainModalOpen, setIsDomainModalOpen] = useState(false);
  const [editingDomain, setEditingDomain] = useState<ExpertDomain | null>(null);

  // Reassignment & Delete Confirmation Modals
  const [roleToDelete, setRoleToDelete] = useState<TeamRole | null>(null);
  const [reassignTargetRoleId, setReassignTargetRoleId] = useState<string>('');

  const [domainToDelete, setDomainToDelete] = useState<ExpertDomain | null>(null);
  const [reassignTargetDomainId, setReassignTargetDomainId] = useState<string>('');

  const [memberToDelete, setMemberToDelete] = useState<TeamMember | null>(null);

  // Toast / Alerts
  const [toastMessage, setToastMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const showToast = (type: 'success' | 'error', text: string) => {
    setToastMessage({ type, text });
    setTimeout(() => setToastMessage(null), 4000);
  };

  // Subscribe to real-time updates
  useEffect(() => {
    const refreshData = () => {
      setIntro(AdminDataService.getAboutIntro());
      setRoles(AdminDataService.getTeamRoles());
      setDomains(AdminDataService.getExpertDomains());
      setMembers(AdminDataService.getTeamMembers());
    };
    refreshData();
    const unsubscribe = AdminDataService.subscribe(refreshData);
    return () => unsubscribe();
  }, []);

  // --- Intro config save ---
  const handleSaveIntro = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      AdminDataService.saveAboutIntro(intro);
      showToast('success', 'Đã lưu cấu hình phần giới thiệu thành công!');
    } catch {
      showToast('error', 'Lưu cấu hình thất bại.');
    }
  };

  // --- Member save ---
  const handleSaveMember = (memberData: Partial<TeamMember>) => {
    if (!memberData.name || !memberData.name.trim()) {
      showToast('error', 'Họ và tên là bắt buộc.');
      return;
    }
    if (!memberData.group) {
      showToast('error', 'Vui lòng chọn nhóm thành viên.');
      return;
    }

    const id = editingMember ? editingMember.id : `member-${Date.now()}`;
    const matchedRole = roles.find(r => r.id === memberData.roleId);
    const matchedDomain = domains.find(d => d.id === memberData.domainId);

    const newMember: TeamMember = {
      id,
      name: memberData.name.trim(),
      fullName: memberData.name.trim(),
      group: memberData.group as TeamMemberGroup,
      roleId: memberData.roleId || (matchedRole ? matchedRole.id : `role-${Date.now()}`),
      role: memberData.role || (matchedRole ? matchedRole.name : ''),
      roleName: memberData.role || (matchedRole ? matchedRole.name : ''),
      domainId: memberData.domainId,
      domainName: memberData.domainName || (matchedDomain ? matchedDomain.name : undefined),
      avatar: memberData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      organization: memberData.organization,
      major: memberData.major,
      bio: memberData.bio,
      shortBio: memberData.bio,
      status: memberData.status || 'active',
      order: typeof memberData.order === 'number' ? memberData.order : (members.length + 1),
      email: memberData.email,
      phone: memberData.phone,
      linkedin: memberData.linkedin,
      createdAt: editingMember?.createdAt,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    AdminDataService.saveTeamMember(newMember);
    setIsMemberModalOpen(false);
    setEditingMember(null);
    showToast('success', editingMember ? 'Đã cập nhật thông tin thành viên!' : 'Đã thêm thành viên mới thành công!');
  };

  // --- Member toggle status ---
  const handleToggleMemberStatus = (id: string) => {
    AdminDataService.toggleTeamMemberStatus(id);
    showToast('success', 'Đã chuyển đổi trạng thái hiển thị!');
  };

  // --- Member delete ---
  const handleConfirmDeleteMember = () => {
    if (!memberToDelete) return;
    AdminDataService.deleteTeamMember(memberToDelete.id);
    showToast('success', `Đã xóa thành viên "${memberToDelete.name}" thành công.`);
    setMemberToDelete(null);
  };

  // --- Member move up / down ---
  const handleMoveMember = (member: TeamMember, direction: 'up' | 'down') => {
    const groupMembers = members.filter(m => m.group === member.group).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    const currentIndex = groupMembers.findIndex(m => m.id === member.id);
    if (currentIndex === -1) return;

    const targetIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    if (targetIndex < 0 || targetIndex >= groupMembers.length) return;

    const targetMember = groupMembers[targetIndex];
    const currentOrder = member.order ?? currentIndex;
    const targetOrder = targetMember.order ?? targetIndex;

    // Swap orders
    AdminDataService.updateTeamMemberOrder(member.id, targetOrder);
    AdminDataService.updateTeamMemberOrder(targetMember.id, currentOrder);
    showToast('success', 'Đã thay đổi thứ tự hiển thị!');
  };

  // --- Role Save ---
  const handleSaveRole = (roleData: Partial<TeamRole>) => {
    if (!roleData.name || !roleData.name.trim()) {
      showToast('error', 'Tên chức vụ là bắt buộc.');
      return;
    }

    const id = editingRole ? editingRole.id : `role-${Date.now()}`;
    const newRole: TeamRole = {
      id,
      name: roleData.name.trim(),
      description: roleData.description,
      targetGroup: roleData.targetGroup || 'all',
      isActive: roleData.isActive !== false,
      order: typeof roleData.order === 'number' ? roleData.order : (roles.length + 1)
    };

    AdminDataService.saveTeamRole(newRole);
    setIsRoleModalOpen(false);
    setEditingRole(null);
    showToast('success', editingRole ? 'Đã cập nhật chức vụ và đồng bộ các thành viên liên quan!' : 'Đã thêm chức vụ mới!');
  };

  // --- Role Delete ---
  const handleDeleteRoleClick = (role: TeamRole) => {
    const res = AdminDataService.deleteTeamRole(role.id);
    if (res.success) {
      showToast('success', `Đã xóa chức vụ "${role.name}" thành công.`);
    } else {
      // Need reassignment
      setRoleToDelete(role);
      const otherRoles = roles.filter(r => r.id !== role.id);
      setReassignTargetRoleId(otherRoles.length > 0 ? otherRoles[0].id : '');
    }
  };

  const handleConfirmReassignAndDeleteRole = () => {
    if (!roleToDelete || !reassignTargetRoleId) return;
    const targetRole = roles.find(r => r.id === reassignTargetRoleId);
    if (!targetRole) return;

    const reassignedCount = AdminDataService.reassignMembersRole(roleToDelete.id, targetRole.id, targetRole.name);
    const deleteRes = AdminDataService.deleteTeamRole(roleToDelete.id);
    if (deleteRes.success) {
      showToast('success', `Đã chuyển ${reassignedCount} thành viên sang chức vụ "${targetRole.name}" và xóa chức vụ cũ.`);
      setRoleToDelete(null);
    } else {
      showToast('error', deleteRes.error || 'Xóa chức vụ thất bại.');
    }
  };

  // --- Domain Save ---
  const handleSaveDomain = (domainData: Partial<ExpertDomain>) => {
    if (!domainData.name || !domainData.name.trim()) {
      showToast('error', 'Tên lĩnh vực là bắt buộc.');
      return;
    }

    const id = editingDomain ? editingDomain.id : `domain-${Date.now()}`;
    const slug = domainData.slug || domainData.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

    const newDomain: ExpertDomain = {
      id,
      name: domainData.name.trim(),
      slug,
      description: domainData.description || '',
      icon: domainData.icon || 'Sparkles',
      order: typeof domainData.order === 'number' ? domainData.order : (domains.length + 1),
      isActive: domainData.isActive !== false
    };

    AdminDataService.saveExpertDomain(newDomain);
    setIsDomainModalOpen(false);
    setEditingDomain(null);
    showToast('success', editingDomain ? 'Đã cập nhật lĩnh vực chuyên môn!' : 'Đã thêm lĩnh vực chuyên môn mới!');
  };

  // --- Domain Delete ---
  const handleDeleteDomainClick = (domain: ExpertDomain) => {
    const res = AdminDataService.deleteExpertDomain(domain.id);
    if (res.success) {
      showToast('success', `Đã xóa lĩnh vực "${domain.name}" thành công.`);
    } else {
      // Need reassignment
      setDomainToDelete(domain);
      const otherDomains = domains.filter(d => d.id !== domain.id);
      setReassignTargetDomainId(otherDomains.length > 0 ? otherDomains[0].id : '');
    }
  };

  const handleConfirmReassignAndDeleteDomain = () => {
    if (!domainToDelete || !reassignTargetDomainId) return;
    const targetDomain = domains.find(d => d.id === reassignTargetDomainId);
    if (!targetDomain) return;

    const reassignedCount = AdminDataService.reassignMembersDomain(domainToDelete.id, targetDomain.id, targetDomain.name);
    const deleteRes = AdminDataService.deleteExpertDomain(domainToDelete.id);
    if (deleteRes.success) {
      showToast('success', `Đã chuyển ${reassignedCount} chuyên gia sang lĩnh vực "${targetDomain.name}" và xóa lĩnh vực cũ.`);
      setDomainToDelete(null);
    } else {
      showToast('error', deleteRes.error || 'Xóa lĩnh vực thất bại.');
    }
  };

  // --- Helpers for Filtering ---
  const filteredMembers = members.filter(m => {
    if (activeTab === 'executive_mgmt') {
      if (m.group !== 'executive' && m.group !== 'management') return false;
      if (filterGroup !== 'all' && m.group !== filterGroup) return false;
    } else if (activeTab === 'student') {
      if (m.group !== 'student') return false;
    } else if (activeTab === 'expert') {
      if (m.group !== 'expert') return false;
      if (filterDomain !== 'all' && m.domainId !== filterDomain) return false;
    }

    if (filterStatus !== 'all' && m.status !== filterStatus) return false;

    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const memberName = (m.name || m.fullName || '').toLowerCase();
      const memberRole = (m.role || m.roleName || '').toLowerCase();
      const memberBio = (m.bio || m.shortBio || '').toLowerCase();
      const memberOrg = (m.organization || '').toLowerCase();
      if (!memberName.includes(q) && !memberRole.includes(q) && !memberBio.includes(q) && !memberOrg.includes(q)) {
        return false;
      }
    }

    return true;
  });

  return (
    <div className="space-y-6 pb-12 font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className={`fixed top-20 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-xl shadow-xl text-white text-sm font-semibold transition-all transform animate-in fade-in slide-in-from-top-4 ${
          toastMessage.type === 'success' ? 'bg-emerald-600' : 'bg-rose-600'
        }`}>
          {toastMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5 flex-shrink-0" /> : <AlertTriangle className="w-5 h-5 flex-shrink-0" />}
          <span>{toastMessage.text}</span>
        </div>
      )}

      {/* Top Banner Header */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-emerald-600" />
            <span>Quản trị Thông tin về chúng tôi & Đội ngũ</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Quản Lý Thông Tin Về Chúng Tôi & Đội Ngũ
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Toàn bộ thay đổi về Ban điều hành, Quản lý, Sinh viên, Chuyên gia và Lĩnh vực chuyên môn được đồng bộ tự động ra website công khai.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => {
              setEditingMember(null);
              setIsMemberModalOpen(true);
            }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Thêm Thành Viên / Chuyên Gia</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl border border-slate-200 p-2 shadow-2xs flex flex-wrap gap-1.5">
        <button
          onClick={() => setActiveTab('intro')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'intro'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Nội Dung Giới Thiệu</span>
        </button>

        <button
          onClick={() => setActiveTab('executive_mgmt')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'executive_mgmt'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <UserCheck className="w-4 h-4" />
          <span>Ban Điều Hành & Quản Lý ({members.filter(m => m.group === 'executive' || m.group === 'management').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('student')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'student'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <GraduationCap className="w-4 h-4" />
          <span>Đội Ngũ Sinh Viên ({members.filter(m => m.group === 'student').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('expert')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'expert'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Chuyên Gia Theo Ngành ({members.filter(m => m.group === 'expert').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('domains')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'domains'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Lĩnh Vực Chuyên Môn ({domains.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('roles')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            activeTab === 'roles'
              ? 'bg-emerald-600 text-white shadow-xs'
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
          }`}
        >
          <Shield className="w-4 h-4" />
          <span>Chức Vụ & Vai Trò ({roles.length})</span>
        </button>
      </div>

      {/* ================= TAB 1: NỘI DUNG GIỚI THIỆU ================= */}
      {activeTab === 'intro' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 shadow-2xs space-y-5">
            <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span>Chỉnh sửa thông tin Header & Banner Giới thiệu</span>
            </h2>

            <form onSubmit={handleSaveIntro} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Huy hiệu nhỏ (Badge)
                  </label>
                  <input
                    type="text"
                    value={intro.badge}
                    onChange={(e) => setIntro({ ...intro, badge: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="VỀ CHÚNG TÔI"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                    Khẩu hiệu chân trang (Slogan)
                  </label>
                  <input
                    type="text"
                    value={intro.slogan}
                    onChange={(e) => setIntro({ ...intro, slogan: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="Kết nối tri thức – Kiến tạo giải pháp – Phát triển Bình Mỹ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Tiêu đề chính (Title)
                </label>
                <input
                  type="text"
                  value={intro.title}
                  onChange={(e) => setIntro({ ...intro, title: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 font-semibold"
                  placeholder="Đội ngũ và Chuyên gia cho Bình Mỹ"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Đoạn văn mô tả mục tiêu
                </label>
                <textarea
                  rows={4}
                  value={intro.description}
                  onChange={(e) => setIntro({ ...intro, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Làng SV Đổi mới sáng tạo Bình Mỹ là nơi kết nối tri thức..."
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Chữ viết nghệ thuật trên ảnh (Handwritten text)
                </label>
                <textarea
                  rows={3}
                  value={intro.handwrittenNote || ''}
                  onChange={(e) => setIntro({ ...intro, handwrittenNote: e.target.value })}
                  className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                  placeholder="Kết nối tri thức&#10;Kiến tạo giá trị&#10;cho Bình Mỹ"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                  Ảnh Banner lớn bên phải
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={intro.bannerImage}
                    onChange={(e) => setIntro({ ...intro, bannerImage: e.target.value })}
                    className="flex-1 px-3.5 py-2.5 text-sm rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                    placeholder="URL ảnh hoặc chọn file bên cạnh"
                  />
                  <label
                    htmlFor={introBannerInputId}
                    className="px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1.5 text-xs font-bold text-slate-700"
                  >
                    <Upload className="w-4 h-4 text-emerald-600" />
                    <span>Tải ảnh</span>
                  </label>
                  <input
                    id={introBannerInputId}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      if (file.size > 4 * 1024 * 1024) {
                        showToast('error', 'Kích thước ảnh không được vượt quá 4MB.');
                        return;
                      }
                      const reader = new FileReader();
                      reader.onload = () => {
                        if (typeof reader.result === 'string') {
                          setIntro({ ...intro, bannerImage: reader.result });
                          showToast('success', 'Đã tải ảnh lên thành công!');
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </div>
              </div>

              <div className="border-t border-slate-200 pt-4 space-y-4">
                <h3 className="text-sm font-bold text-slate-800">Cấu hình Banner Kêu gọi hành động (Bottom CTA)</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Tiêu đề CTA</label>
                    <input
                      type="text"
                      value={intro.ctaTitle || ''}
                      onChange={(e) => setIntro({ ...intro, ctaTitle: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300"
                      placeholder="Bạn là sinh viên, chuyên gia, doanh nghiệp?"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nút chính</label>
                    <input
                      type="text"
                      value={intro.ctaPrimaryButtonText || ''}
                      onChange={(e) => setIntro({ ...intro, ctaPrimaryButtonText: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300"
                      placeholder="Tham gia đội ngũ"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Mô tả CTA</label>
                  <textarea
                    rows={2}
                    value={intro.ctaDescription || ''}
                    onChange={(e) => setIntro({ ...intro, ctaDescription: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-300"
                    placeholder="Hãy cùng Làng SV Đổi mới sáng tạo Bình Mỹ..."
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
                >
                  <Save className="w-4 h-4" />
                  <span>Lưu Thay Đổi Nội Dung</span>
                </button>
              </div>
            </form>
          </div>

          {/* Real-time Preview */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-900 text-white p-4 rounded-2xl flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Xem trước trực tiếp (Live Preview)</span>
              <span className="text-[11px] text-slate-400">Cập nhật ngay theo form</span>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm p-6 relative">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold">
                  <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
                  <span>{intro.badge}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 leading-tight">
                  {intro.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed line-clamp-4">
                  {intro.description}
                </p>
                <div className="text-xs font-bold text-emerald-700 flex items-center gap-1.5 pt-2">
                  <Sprout className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{intro.slogan}</span>
                </div>
              </div>

              <div className="mt-5 rounded-xl overflow-hidden border border-slate-200 aspect-[16/9] relative">
                <img
                  src={intro.bannerImage}
                  alt="Banner preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80';
                  }}
                />
                {intro.handwrittenNote && (
                  <div className="absolute top-3 right-3 bg-white/85 backdrop-blur-xs px-3 py-2 rounded-xl text-[11px] font-bold text-emerald-900 shadow-md whitespace-pre-line text-right italic">
                    {intro.handwrittenNote}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2, 3, 4: THÀNH VIÊN THEO NHÓM ================= */}
      {(activeTab === 'executive_mgmt' || activeTab === 'student' || activeTab === 'expert') && (
        <div className="space-y-4">
          {/* Filter Bar */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            <div className="flex-1 flex flex-wrap items-center gap-2.5">
              {/* Search input */}
              <div className="relative min-w-[240px] flex-1 max-w-md">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Tìm theo họ tên, chức danh, đơn vị..."
                  className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                />
                {searchTerm && (
                  <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Group sub-filter for executive_mgmt tab */}
              {activeTab === 'executive_mgmt' && (
                <select
                  value={filterGroup}
                  onChange={(e) => setFilterGroup(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium text-slate-700 bg-white"
                >
                  <option value="all">Tất cả nhóm</option>
                  <option value="executive">Ban điều hành</option>
                  <option value="management">Đội ngũ quản lý</option>
                </select>
              )}

              {/* Domain filter for expert tab */}
              {activeTab === 'expert' && (
                <select
                  value={filterDomain}
                  onChange={(e) => setFilterDomain(e.target.value)}
                  className="px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium text-slate-700 bg-white"
                >
                  <option value="all">Tất cả 6 lĩnh vực</option>
                  {domains.map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
                </select>
              )}

              {/* Status filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 text-xs rounded-xl border border-slate-300 font-medium text-slate-700 bg-white"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Đang hiển thị</option>
                <option value="hidden">Đã ẩn</option>
                <option value="draft">Bản nháp</option>
              </select>

              {(searchTerm || filterGroup !== 'all' || filterDomain !== 'all' || filterStatus !== 'all') && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setFilterGroup('all');
                    setFilterDomain('all');
                    setFilterStatus('all');
                  }}
                  className="text-xs text-rose-600 hover:underline font-bold px-2 py-1"
                >
                  Đặt lại lọc
                </button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">
                Hiển thị <strong>{filteredMembers.length}</strong> thành viên
              </span>
              <button
                onClick={() => {
                  setEditingMember(null);
                  setIsMemberModalOpen(true);
                }}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm</span>
              </button>
            </div>
          </div>

          {/* Members Table / Card List */}
          {filteredMembers.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center">
              <Users className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <h3 className="text-base font-bold text-slate-700">Chưa tìm thấy thành viên nào</h3>
              <p className="text-xs text-slate-500 mt-1">Vui lòng thử thay đổi từ khóa tìm kiếm hoặc thêm thành viên mới.</p>
              <button
                onClick={() => {
                  setEditingMember(null);
                  setIsMemberModalOpen(true);
                }}
                className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-bold"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Thêm thành viên ngay</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredMembers.map((member) => (
                <div
                  key={member.id}
                  className={`bg-white rounded-2xl border p-4 shadow-2xs transition-all flex flex-col justify-between hover:shadow-md ${
                    member.status === 'hidden'
                      ? 'border-slate-300 opacity-60 bg-slate-50/50'
                      : member.status === 'draft'
                      ? 'border-amber-200 bg-amber-50/30'
                      : 'border-slate-200'
                  }`}
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 border border-slate-200 shadow-2xs">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                        }}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-1">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider ${
                          member.group === 'executive'
                            ? 'bg-emerald-100 text-emerald-800'
                            : member.group === 'management'
                            ? 'bg-blue-100 text-blue-800'
                            : member.group === 'student'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-teal-100 text-teal-800'
                        }`}>
                          {member.group === 'executive'
                            ? 'Ban điều hành'
                            : member.group === 'management'
                            ? 'Quản lý'
                            : member.group === 'student'
                            ? 'Sinh viên'
                            : 'Chuyên gia'}
                        </span>

                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                          member.status === 'active'
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : member.status === 'hidden'
                            ? 'bg-slate-100 text-slate-600'
                            : 'bg-amber-100 text-amber-800'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            member.status === 'active' ? 'bg-emerald-500' : member.status === 'hidden' ? 'bg-slate-400' : 'bg-amber-500'
                          }`} />
                          {member.status === 'active' ? 'Hiển thị' : member.status === 'hidden' ? 'Ẩn' : 'Bản nháp'}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-slate-900 truncate" title={member.name}>
                        {member.name}
                      </h4>
                      <p className="text-xs font-semibold text-emerald-700 truncate" title={member.role}>
                        {member.role || 'Chưa cập nhật chức vụ'}
                      </p>
                      {member.domainName && (
                        <p className="text-[11px] text-slate-500 truncate mt-0.5">
                          {member.domainName}
                        </p>
                      )}
                      {member.major && member.group === 'student' && (
                        <p className="text-[11px] text-purple-700 truncate mt-0.5 font-medium">
                          Ngành: {member.major}
                        </p>
                      )}
                    </div>
                  </div>

                  {member.bio && (
                    <p className="text-xs text-slate-600 mt-3 line-clamp-2 leading-relaxed bg-slate-50 p-2 rounded-xl">
                      {member.bio}
                    </p>
                  )}

                  {/* Actions Bar */}
                  <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1">
                      <button
                        title="Di chuyển lên"
                        onClick={() => handleMoveMember(member, 'up')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoveUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        title="Di chuyển xuống"
                        onClick={() => handleMoveMember(member, 'down')}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                      >
                        <MoveDown className="w-3.5 h-3.5" />
                      </button>
                      <span className="text-[11px] text-slate-400 font-mono ml-1">#{member.order ?? '-'}</span>
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        title={member.status === 'active' ? 'Ẩn khỏi website' : 'Hiển thị trên website'}
                        onClick={() => handleToggleMemberStatus(member.id)}
                        className={`p-1.5 rounded-lg transition-colors ${
                          member.status === 'active'
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:bg-slate-100'
                        }`}
                      >
                        {member.status === 'active' ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>

                      <button
                        title="Chỉnh sửa thông tin"
                        onClick={() => {
                          setEditingMember(member);
                          setIsMemberModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>

                      <button
                        title="Xóa thành viên"
                        onClick={() => setMemberToDelete(member)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ================= TAB 5: LĨNH VỰC CHUYÊN MÔN ================= */}
      {activeTab === 'domains' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Danh mục Lĩnh vực Chuyên môn ({domains.length})</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Các nhóm lĩnh vực hiển thị trên trang Về chúng tôi. Mỗi lĩnh vực gắn với các chuyên gia tương ứng.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingDomain(null);
                setIsDomainModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Lĩnh Vực Mới</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {domains.map((domain) => {
              const IconComp = DOMAIN_ICONS[domain.icon] || Sparkles;
              const expertCount = members.filter(m => m.domainId === domain.id).length;

              return (
                <div
                  key={domain.id}
                  className={`bg-white rounded-2xl border p-5 shadow-2xs flex flex-col justify-between transition-all ${
                    !domain.isActive ? 'border-slate-300 opacity-60 bg-slate-50' : 'border-slate-200 hover:shadow-md'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold">
                          {expertCount} chuyên gia
                        </span>
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                          domain.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                        }`}>
                          {domain.isActive ? 'Hiển thị' : 'Ẩn'}
                        </span>
                      </div>
                    </div>

                    <h4 className="text-base font-bold text-slate-900 mb-1">{domain.name}</h4>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">{domain.description}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-2">slug: /{domain.slug}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 font-mono">Thứ tự: #{domain.order ?? '-'}</span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => {
                          setEditingDomain(domain);
                          setIsDomainModalOpen(true);
                        }}
                        className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                        title="Chỉnh sửa lĩnh vực"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteDomainClick(domain)}
                        className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Xóa lĩnh vực"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ================= TAB 6: CHỨC VỤ & VAI TRÒ ================= */}
      {activeTab === 'roles' && (
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-2xs flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Quản lý Chức Vụ & Vai Trò Chuẩn ({roles.length})</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Chức vụ được quản lý độc lập. Khi cập nhật tên chức vụ, hệ thống tự động đồng bộ sang tất cả thành viên đang nắm giữ.
              </p>
            </div>
            <button
              onClick={() => {
                setEditingRole(null);
                setIsRoleModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Thêm Chức Vụ Mới</span>
            </button>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-slate-500 uppercase font-bold border-b border-slate-200">
                  <tr>
                    <th className="px-4 py-3">STT</th>
                    <th className="px-4 py-3">Tên chức vụ / Vai trò</th>
                    <th className="px-4 py-3">Nhóm áp dụng</th>
                    <th className="px-4 py-3">Mô tả nhiệm vụ</th>
                    <th className="px-4 py-3 text-center">Số thành viên đang dùng</th>
                    <th className="px-4 py-3 text-center">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {roles.map((role, idx) => {
                    const memberCount = members.filter(m => m.roleId === role.id || m.role === role.name).length;

                    return (
                      <tr key={role.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="px-4 py-3 font-mono text-slate-400">{idx + 1}</td>
                        <td className="px-4 py-3 font-bold text-slate-900">{role.name}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                            role.targetGroup === 'executive'
                              ? 'bg-emerald-100 text-emerald-800'
                              : role.targetGroup === 'management'
                              ? 'bg-blue-100 text-blue-800'
                              : role.targetGroup === 'student'
                              ? 'bg-purple-100 text-purple-800'
                              : role.targetGroup === 'expert'
                              ? 'bg-teal-100 text-teal-800'
                              : 'bg-slate-100 text-slate-700'
                          }`}>
                            {role.targetGroup === 'executive'
                              ? 'Ban điều hành'
                              : role.targetGroup === 'management'
                              ? 'Quản lý'
                              : role.targetGroup === 'student'
                              ? 'Sinh viên'
                              : role.targetGroup === 'expert'
                              ? 'Chuyên gia'
                              : 'Tất cả'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-slate-500 max-w-xs truncate">{role.description || '-'}</td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                            memberCount > 0 ? 'bg-emerald-50 text-emerald-700 font-mono' : 'bg-slate-100 text-slate-400'
                          }`}>
                            {memberCount}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-center">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            role.isActive ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                          }`}>
                            {role.isActive ? 'Đang dùng' : 'Ngừng dùng'}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex items-center gap-1.5">
                            <button
                              onClick={() => {
                                setEditingRole(role);
                                setIsRoleModalOpen(true);
                              }}
                              className="p-1.5 rounded-lg text-blue-600 hover:bg-blue-50 transition-colors"
                              title="Sửa chức vụ"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => handleDeleteRoleClick(role)}
                              className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-50 transition-colors"
                              title="Xóa chức vụ"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: THÊM / SỬA THÀNH VIÊN ================= */}
      {isMemberModalOpen && (
        <MemberFormModal
          member={editingMember}
          roles={roles}
          domains={domains}
          membersCount={members.length}
          onClose={() => {
            setIsMemberModalOpen(false);
            setEditingMember(null);
          }}
          onSave={handleSaveMember}
          memberAvatarInputId={memberAvatarInputId}
        />
      )}

      {/* ================= MODAL: THÊM / SỬA CHỨC VỤ ================= */}
      {isRoleModalOpen && (
        <RoleFormModal
          role={editingRole}
          onClose={() => {
            setIsRoleModalOpen(false);
            setEditingRole(null);
          }}
          onSave={handleSaveRole}
        />
      )}

      {/* ================= MODAL: THÊM / SỬA LĨNH VỰC ================= */}
      {isDomainModalOpen && (
        <DomainFormModal
          domain={editingDomain}
          onClose={() => {
            setIsDomainModalOpen(false);
            setEditingDomain(null);
          }}
          onSave={handleSaveDomain}
        />
      )}

      {/* ================= MODAL: CHUYỂN CHỨC VỤ KHI XÓA ================= */}
      {roleToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Chuyển thành viên trước khi xóa chức vụ
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Chức vụ <strong>"{roleToDelete.name}"</strong> hiện đang được phân công cho các thành viên trong hệ thống. Để bảo toàn dữ liệu, vui lòng chọn chức vụ thay thế cho họ:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Chức vụ thay thế mới
              </label>
              <select
                value={reassignTargetRoleId}
                onChange={(e) => setReassignTargetRoleId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              >
                {roles
                  .filter(r => r.id !== roleToDelete.id)
                  .map(r => (
                    <option key={r.id} value={r.id}>{r.name} ({r.targetGroup})</option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setRoleToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReassignAndDeleteRole}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Chuyển đổi & Xóa chức vụ cũ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: CHUYỂN LĨNH VỰC KHI XÓA ================= */}
      {domainToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-amber-600">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Chuyển chuyên gia trước khi xóa lĩnh vực
              </h3>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Lĩnh vực <strong>"{domainToDelete.name}"</strong> hiện đang có chuyên gia trực thuộc. Vui lòng chọn lĩnh vực mới để chuyển các chuyên gia này sang:
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
                Lĩnh vực mới tiếp nhận chuyên gia
              </label>
              <select
                value={reassignTargetDomainId}
                onChange={(e) => setReassignTargetDomainId(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300"
              >
                {domains
                  .filter(d => d.id !== domainToDelete.id)
                  .map(d => (
                    <option key={d.id} value={d.id}>{d.name}</option>
                  ))}
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDomainToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmReassignAndDeleteDomain}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Chuyển chuyên gia & Xóa lĩnh vực cũ
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL: XÁC NHẬN XÓA THÀNH VIÊN ================= */}
      {memberToDelete && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-xl bg-rose-100 flex items-center justify-center flex-shrink-0">
                <Trash2 className="w-5 h-5 text-rose-600" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Xác nhận xóa thành viên</h3>
                <p className="text-xs text-slate-500">Hành động này không thể hoàn tác.</p>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Bạn có chắc chắn muốn xóa thành viên <strong>"{memberToDelete.name}"</strong> ({memberToDelete.role}) khỏi hệ thống?
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setMemberToDelete(null)}
                className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteMember}
                className="px-4 py-2 rounded-xl bg-rose-600 text-xs font-bold text-white hover:bg-rose-700 shadow-sm"
              >
                Xác nhận xóa
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

// ================= SUBCOMPONENT: MODAL FORM THÀNH VIÊN =================
interface MemberFormModalProps {
  member: TeamMember | null;
  roles: TeamRole[];
  domains: ExpertDomain[];
  membersCount: number;
  onClose: () => void;
  onSave: (data: Partial<TeamMember>) => void;
  memberAvatarInputId: string;
}

const MemberFormModal: React.FC<MemberFormModalProps> = ({
  member,
  roles,
  domains,
  membersCount,
  onClose,
  onSave,
  memberAvatarInputId
}) => {
  const [formData, setFormData] = useState<Partial<TeamMember>>({
    name: member?.name || '',
    group: member?.group || 'executive',
    roleId: member?.roleId || (roles[0]?.id || ''),
    role: member?.role || (roles[0]?.name || ''),
    domainId: member?.domainId || (domains[0]?.id || ''),
    domainName: member?.domainName || (domains[0]?.name || ''),
    avatar: member?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    organization: member?.organization || '',
    major: member?.major || '',
    bio: member?.bio || '',
    status: member?.status || 'active',
    order: typeof member?.order === 'number' ? member?.order : (membersCount + 1),
    email: member?.email || '',
    phone: member?.phone || '',
    linkedin: member?.linkedin || ''
  });

  // Filter roles matching selected group
  const relevantRoles = roles.filter(
    r => r.targetGroup === 'all' || r.targetGroup === formData.group
  );

  const handleGroupChange = (grp: TeamMemberGroup) => {
    const defaultRole = roles.find(r => r.targetGroup === grp || r.targetGroup === 'all');
    setFormData({
      ...formData,
      group: grp,
      roleId: defaultRole?.id || '',
      role: defaultRole?.name || ''
    });
  };

  const handleRoleChange = (roleId: string) => {
    const selected = roles.find(r => r.id === roleId);
    setFormData({
      ...formData,
      roleId,
      role: selected ? selected.name : formData.role
    });
  };

  const handleDomainChange = (domainId: string) => {
    const selected = domains.find(d => d.id === domainId);
    setFormData({
      ...formData,
      domainId,
      domainName: selected ? selected.name : ''
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 shadow-2xl space-y-5 my-8">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <UserCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-slate-900">
                {member ? 'Chỉnh Sửa Thông Tin Thành Viên' : 'Thêm Thành Viên / Chuyên Gia Mới'}
              </h3>
              <p className="text-xs text-slate-500">Cập nhật đầy đủ thông tin để hiển thị ngoài trang website.</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-4"
        >
          {/* Avatar & Basic */}
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 flex-shrink-0 relative group">
              <img
                src={formData.avatar}
                alt="Avatar preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
                }}
              />
            </div>

            <div className="flex-1 space-y-2 w-full">
              <label className="block text-xs font-bold text-slate-700 uppercase">Ảnh đại diện</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={formData.avatar}
                  onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
                  className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500"
                  placeholder="URL ảnh hoặc tải file bên cạnh"
                />
                <label
                  htmlFor={memberAvatarInputId}
                  className="px-3 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 cursor-pointer flex items-center gap-1 text-xs font-bold text-slate-700"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Tải ảnh</span>
                </label>
                <input
                  id={memberAvatarInputId}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (!file) return;
                    if (file.size > 3 * 1024 * 1024) {
                      alert('Ảnh vượt quá dung lượng cho phép 3MB.');
                      return;
                    }
                    const reader = new FileReader();
                    reader.onload = () => {
                      if (typeof reader.result === 'string') {
                        setFormData({ ...formData, avatar: reader.result });
                      }
                    };
                    reader.readAsDataURL(file);
                  }}
                />
              </div>
              <p className="text-[11px] text-slate-400">Khuyến nghị tỉ lệ 1:1, ảnh rõ mặt, dung lượng dưới 3MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Họ và tên <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 font-semibold"
                placeholder="Ví dụ: Nguyễn Văn Hùng"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Nhóm thành viên <span className="text-rose-500">*</span>
              </label>
              <select
                value={formData.group}
                onChange={(e) => handleGroupChange(e.target.value as TeamMemberGroup)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium"
              >
                <option value="executive">Ban điều hành</option>
                <option value="management">Đội ngũ quản lý</option>
                <option value="student">Đội ngũ sinh viên</option>
                <option value="expert">Đội ngũ chuyên gia</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Chức vụ / Vai trò
              </label>
              <div className="space-y-1.5">
                <select
                  value={formData.roleId || ''}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium"
                >
                  <option value="">-- Chọn từ danh mục chức vụ --</option>
                  {relevantRoles.map(r => (
                    <option key={r.id} value={r.id}>{r.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  placeholder="Hoặc nhập chức vụ tùy chỉnh..."
                  className="w-full px-3.5 py-1.5 text-xs rounded-xl border border-slate-200 text-slate-600"
                />
              </div>
            </div>

            {/* Lĩnh vực (Quan trọng đối với chuyên gia) */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Lĩnh vực chuyên môn {formData.group === 'expert' && <span className="text-rose-500">*</span>}
              </label>
              <select
                value={formData.domainId || ''}
                onChange={(e) => handleDomainChange(e.target.value)}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-medium"
              >
                <option value="">-- Không phân ngành / Chung --</option>
                {domains.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Đơn vị công tác / Đại học
              </label>
              <input
                type="text"
                value={formData.organization || ''}
                onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
                placeholder="Ví dụ: Đại học Quốc Gia TP.HCM"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Ngành học / Chuyên môn
              </label>
              <input
                type="text"
                value={formData.major || ''}
                onChange={(e) => setFormData({ ...formData, major: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
                placeholder="Ví dụ: Công nghệ thông tin / Nông nghiệp công nghệ cao"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mô tả trách nhiệm / Giới thiệu ngắn
            </label>
            <textarea
              rows={3}
              value={formData.bio || ''}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
              placeholder="Định hướng chiến lược, kết nối các đơn vị, quản lý dự án..."
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Thứ tự hiển thị
              </label>
              <input
                type="number"
                value={formData.order ?? 1}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                Trạng thái hiển thị
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as TeamMemberStatus })}
                className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-semibold"
              >
                <option value="active">Hiển thị công khai</option>
                <option value="hidden">Ẩn (Không xuất hiện)</option>
                <option value="draft">Bản nháp</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hủy bỏ
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              Lưu Thành Viên
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= SUBCOMPONENT: MODAL FORM CHỨC VỤ =================
interface RoleFormModalProps {
  role: TeamRole | null;
  onClose: () => void;
  onSave: (data: Partial<TeamRole>) => void;
}

const RoleFormModal: React.FC<RoleFormModalProps> = ({ role, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<TeamRole>>({
    name: role?.name || '',
    targetGroup: role?.targetGroup || 'all',
    description: role?.description || '',
    isActive: role?.isActive !== false,
    order: role?.order ?? 1
  });

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {role ? 'Chỉnh Sửa Chức Vụ & Vai Trò' : 'Thêm Chức Vụ Mới'}
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tên chức vụ / Vai trò <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-semibold"
              placeholder="Ví dụ: Trưởng ban điều hành, Cố vấn..."
            />
            {role && (
              <p className="text-[11px] text-amber-600 mt-1 font-medium">
                Lưu ý: Thay đổi tên sẽ tự động đồng bộ sang tất cả thành viên đang nắm giữ chức vụ này.
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Nhóm áp dụng
            </label>
            <select
              value={formData.targetGroup}
              onChange={(e) => setFormData({ ...formData, targetGroup: e.target.value as any })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
            >
              <option value="all">Tất cả các nhóm</option>
              <option value="executive">Ban điều hành</option>
              <option value="management">Đội ngũ quản lý</option>
              <option value="student">Đội ngũ sinh viên</option>
              <option value="expert">Chuyên gia</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mô tả nhiệm vụ
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
              placeholder="Mô tả phạm vi trách nhiệm..."
            />
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="roleIsActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded-sm"
            />
            <label htmlFor="roleIsActive" className="text-xs font-bold text-slate-700 cursor-pointer">
              Đang hoạt động (Cho phép gán cho thành viên)
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              Lưu Chức Vụ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// ================= SUBCOMPONENT: MODAL FORM LĨNH VỰC =================
interface DomainFormModalProps {
  domain: ExpertDomain | null;
  onClose: () => void;
  onSave: (data: Partial<ExpertDomain>) => void;
}

const DomainFormModal: React.FC<DomainFormModalProps> = ({ domain, onClose, onSave }) => {
  const [formData, setFormData] = useState<Partial<ExpertDomain>>({
    name: domain?.name || '',
    description: domain?.description || '',
    icon: domain?.icon || 'Sparkles',
    order: domain?.order ?? 1,
    isActive: domain?.isActive !== false
  });

  const availableIcons = ['Laptop', 'Sprout', 'Compass', 'BookOpen', 'TrendingUp', 'HeartPulse', 'Briefcase', 'Shield'];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900">
            {domain ? 'Chỉnh Sửa Lĩnh Vực Chuyên Môn' : 'Thêm Lĩnh Vực Mới'}
          </h3>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSave(formData);
          }}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Tên lĩnh vực <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300 font-semibold"
              placeholder="Ví dụ: Công nghệ thông tin & Chuyển đổi số"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
              Mô tả lĩnh vực
            </label>
            <textarea
              rows={2}
              value={formData.description || ''}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl border border-slate-300"
              placeholder="Chuyên gia về lập trình, hệ thống, an ninh mạng..."
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">
              Biểu tượng đại diện
            </label>
            <div className="grid grid-cols-4 gap-2">
              {availableIcons.map(iconName => {
                const IconComp = DOMAIN_ICONS[iconName] || Sparkles;
                const isSelected = formData.icon === iconName;
                return (
                  <button
                    key={iconName}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon: iconName })}
                    className={`p-2.5 rounded-xl border flex flex-col items-center gap-1 transition-all ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50 text-emerald-700 font-bold'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <IconComp className="w-5 h-5" />
                    <span className="text-[10px]">{iconName}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="domainIsActive"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="w-4 h-4 text-emerald-600 rounded-sm"
            />
            <label htmlFor="domainIsActive" className="text-xs font-bold text-slate-700 cursor-pointer">
              Bật hiển thị lĩnh vực trên website công khai
            </label>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"
            >
              Lưu Lĩnh Vực
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
