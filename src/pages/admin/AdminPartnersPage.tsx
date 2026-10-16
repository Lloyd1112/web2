import React, { useState, useEffect, useRef } from 'react';
import { AdminDataService } from '../../services/adminDataService';
import { AdminPartner, PartnerCategory } from '../../types';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Eye,
  EyeOff,
  ExternalLink,
  Upload,
  Handshake,
  Building2,
  GraduationCap,
  Activity,
  Globe2,
  Landmark,
  X,
  Check,
  AlertTriangle,
  MoveUp,
  MoveDown,
  Sparkles,
  RefreshCw,
  ImageIcon
} from 'lucide-react';

export const AdminPartnersPage: React.FC = () => {
  const [partners, setPartners] = useState<AdminPartner[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal form states
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminPartner | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form input states
  const [formNameVi, setFormNameVi] = useState('');
  const [formNameEn, setFormNameEn] = useState('');
  const [formSubVi, setFormSubVi] = useState('');
  const [formSubEn, setFormSubEn] = useState('');
  const [formCategory, setFormCategory] = useState<PartnerCategory>('strategic');
  const [formBadge, setFormBadge] = useState('');
  const [formRoleVi, setFormRoleVi] = useState('');
  const [formRoleEn, setFormRoleEn] = useState('');
  const [formLogoUrl, setFormLogoUrl] = useState('');
  const [formWebsiteUrl, setFormWebsiteUrl] = useState('');
  const [formOrder, setFormOrder] = useState<number>(1);
  const [formShowOnHomepage, setFormShowOnHomepage] = useState(true);
  const [formIsActive, setFormIsActive] = useState(true);

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadPartners();
    const unsubscribe = AdminDataService.subscribe(() => {
      loadPartners();
    });
    return unsubscribe;
  }, []);

  const loadPartners = () => {
    const list = AdminDataService.getPartners();
    setPartners(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormNameVi('');
    setFormNameEn('');
    setFormSubVi('');
    setFormSubEn('');
    setFormCategory('strategic');
    setFormBadge('Đối tác đồng hành');
    setFormRoleVi('');
    setFormRoleEn('');
    setFormLogoUrl('');
    setFormWebsiteUrl('');
    setFormOrder(partners.length + 1);
    setFormShowOnHomepage(true);
    setFormIsActive(true);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (partner: AdminPartner) => {
    setEditingItem(partner);
    setFormNameVi(partner.nameVi || '');
    setFormNameEn(partner.nameEn || '');
    setFormSubVi(partner.subVi || '');
    setFormSubEn(partner.subEn || '');
    setFormCategory(partner.category || 'strategic');
    setFormBadge(partner.badge || '');
    setFormRoleVi(partner.roleVi || '');
    setFormRoleEn(partner.roleEn || '');
    setFormLogoUrl(partner.logoUrl || '');
    setFormWebsiteUrl(partner.websiteUrl || '');
    setFormOrder(partner.order ?? 1);
    setFormShowOnHomepage(partner.showOnHomepage ?? true);
    setFormIsActive(partner.isActive ?? true);
    setIsFormOpen(true);
  };

  const handleLogoFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Vui lòng chọn tệp hình ảnh (PNG, JPG, SVG, WEBP)!');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        setFormLogoUrl(result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formNameVi.trim()) {
      alert('Vui lòng nhập tên đối tác (Tiếng Việt)!');
      return;
    }

    const partnerToSave: AdminPartner = {
      id: editingItem ? editingItem.id : `partner-${Date.now()}`,
      nameVi: formNameVi.trim(),
      nameEn: formNameEn.trim() || undefined,
      subVi: formSubVi.trim() || undefined,
      subEn: formSubEn.trim() || undefined,
      category: formCategory,
      type: formCategory === 'strategic' ? 'enterprise' : (formCategory as any),
      badge: formBadge.trim() || undefined,
      roleVi: formRoleVi.trim() || undefined,
      roleEn: formRoleEn.trim() || undefined,
      logoUrl: formLogoUrl.trim() || undefined,
      websiteUrl: formWebsiteUrl.trim() || undefined,
      order: Number(formOrder) || 1,
      showOnHomepage: formShowOnHomepage,
      isActive: formIsActive
    };

    AdminDataService.savePartner(partnerToSave);
    loadPartners();
    setIsFormOpen(false);
    showToast(`Đã lưu đối tác "${partnerToSave.nameVi}" thành công!`);
  };

  const handleDelete = (id: string) => {
    const partner = partners.find(p => p.id === id);
    AdminDataService.deletePartner(id);
    loadPartners();
    setDeleteConfirmId(null);
    showToast(`Đã xóa đối tác "${partner?.nameVi || id}" khỏi hệ thống.`);
  };

  const handleToggleActive = (id: string) => {
    const newStatus = AdminDataService.togglePartnerStatus(id);
    loadPartners();
    showToast(newStatus ? 'Đã kích hoạt hiển thị đối tác.' : 'Đã ẩn đối tác khỏi website.');
  };

  const handleToggleHomepage = (id: string) => {
    const newStatus = AdminDataService.togglePartnerHomepage(id);
    loadPartners();
    showToast(newStatus ? 'Đã bật hiển thị trên Trang chủ.' : 'Đã tắt hiển thị trên Trang chủ.');
  };

  const handleMoveOrder = (id: string, direction: 'up' | 'down') => {
    const sorted = [...partners].sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    const currentIndex = sorted.findIndex(p => p.id === id);
    if (currentIndex < 0) return;

    if (direction === 'up' && currentIndex > 0) {
      const prev = sorted[currentIndex - 1];
      const current = sorted[currentIndex];
      const tempOrder = prev.order;
      prev.order = current.order;
      current.order = tempOrder;
      AdminDataService.savePartner(prev);
      AdminDataService.savePartner(current);
      loadPartners();
    } else if (direction === 'down' && currentIndex < sorted.length - 1) {
      const next = sorted[currentIndex + 1];
      const current = sorted[currentIndex];
      const tempOrder = next.order;
      next.order = current.order;
      current.order = tempOrder;
      AdminDataService.savePartner(next);
      AdminDataService.savePartner(current);
      loadPartners();
    }
  };

  // Helper hiển thị tên và badge lĩnh vực
  const getCategoryInfo = (cat: PartnerCategory) => {
    switch (cat) {
      case 'strategic':
        return { label: 'Chiến lược', color: 'bg-emerald-100 text-[#006842] border-emerald-300', icon: Handshake };
      case 'university':
        return { label: 'Trường Đại học', color: 'bg-blue-100 text-blue-800 border-blue-300', icon: GraduationCap };
      case 'hospital':
        return { label: 'Bệnh viện & Y tế', color: 'bg-rose-100 text-rose-800 border-rose-300', icon: Activity };
      case 'enterprise':
        return { label: 'Doanh nghiệp', color: 'bg-amber-100 text-amber-800 border-amber-300', icon: Building2 };
      case 'international':
        return { label: 'Quốc tế', color: 'bg-teal-100 text-teal-800 border-teal-300', icon: Globe2 };
      case 'government':
        return { label: 'Chính quyền', color: 'bg-indigo-100 text-indigo-800 border-indigo-300', icon: Landmark };
      default:
        return { label: 'Đối tác', color: 'bg-slate-100 text-slate-800 border-slate-300', icon: Building2 };
    }
  };

  // Lọc danh sách đối tác
  const filteredPartners = partners.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    const matchSearch =
      !q ||
      item.nameVi.toLowerCase().includes(q) ||
      (item.nameEn && item.nameEn.toLowerCase().includes(q)) ||
      (item.subVi && item.subVi.toLowerCase().includes(q)) ||
      (item.badge && item.badge.toLowerCase().includes(q));

    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;

    let matchStatus = true;
    if (selectedStatus === 'active') matchStatus = item.isActive !== false;
    else if (selectedStatus === 'hidden') matchStatus = item.isActive === false;
    else if (selectedStatus === 'homepage') matchStatus = item.isActive !== false && item.showOnHomepage !== false;

    return matchSearch && matchCategory && matchStatus;
  });

  const totalPartners = partners.length;
  const activeCount = partners.filter(p => p.isActive !== false).length;
  const homepageCount = partners.filter(p => p.isActive !== false && p.showOnHomepage !== false).length;
  const strategicCount = partners.filter(p => p.category === 'strategic').length;

  return (
    <div className="space-y-6">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Mạng lưới đồng hành
            </span>
            <span className="text-xs text-slate-500">Đồng bộ trực tiếp với khu vực Đối tác trên Trang chủ</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Quản lý Đối tác & Đơn vị Đồng hành</h1>
          <p className="text-sm text-slate-600 mt-0.5">
            Thêm mới, cập nhật thông tin, thay đổi logo, thứ tự sắp xếp và bật/tắt hiển thị đối tác trên website.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-[#00875a] hover:bg-[#00734c] text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Thêm đối tác mới</span>
        </button>
      </div>

      {/* Stats Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Tổng số đối tác</span>
          <div className="text-2xl font-black text-slate-900">{totalPartners}</div>
          <div className="text-[11px] text-slate-500">Toàn bộ hồ sơ trong cơ sở dữ liệu</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider">Đối tác chiến lược</span>
          <div className="text-2xl font-black text-emerald-800">{strategicCount}</div>
          <div className="text-[11px] text-slate-500">Trọng tâm HUTECH, UBND, Solar...</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-sky-700 uppercase tracking-wider">Hiển thị Trang chủ</span>
          <div className="text-2xl font-black text-sky-800">{homepageCount}</div>
          <div className="text-[11px] text-slate-500">Đang bật hiển thị trang chủ</div>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Đang hoạt động</span>
          <div className="text-2xl font-black text-slate-900">{activeCount}</div>
          <div className="text-[11px] text-slate-500">Đang hoạt động (Active)</div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm theo tên đối tác, định danh, nhãn..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs p-1"
            >
              ✕
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Filter Category */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-emerald-600 cursor-pointer"
          >
            <option value="all">Tất cả phân loại</option>
            <option value="strategic">Đối tác chiến lược</option>
            <option value="university">Trường Đại học</option>
            <option value="hospital">Bệnh viện & Y tế</option>
            <option value="enterprise">Doanh nghiệp</option>
            <option value="international">Tổ chức quốc tế</option>
            <option value="government">Chính quyền địa phương</option>
          </select>

          {/* Filter Status */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:outline-emerald-600 cursor-pointer"
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="homepage">Hiển thị Trang chủ</option>
            <option value="active">Đang kích hoạt</option>
            <option value="hidden">Đang ẩn</option>
          </select>

          <button
            onClick={loadPartners}
            className="p-2 rounded-xl text-slate-500 hover:bg-slate-100 transition-colors"
            title="Làm mới danh sách"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Partners Data Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider text-[11px]">
                <th className="py-3.5 px-4 w-16 text-center">Thứ tự</th>
                <th className="py-3.5 px-4 w-28 text-center">Logo</th>
                <th className="py-3.5 px-4 min-w-[220px]">Tên đối tác & Định danh</th>
                <th className="py-3.5 px-4 w-36">Phân loại</th>
                <th className="py-3.5 px-4 w-32 text-center">Trang chủ</th>
                <th className="py-3.5 px-4 w-32 text-center">Trạng thái</th>
                <th className="py-3.5 px-4 min-w-[150px]">Website / Liên kết</th>
                <th className="py-3.5 px-4 w-32 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPartners.length === 0 ? (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    <Handshake className="w-10 h-10 mx-auto mb-2 text-slate-300 stroke-[1.5]" />
                    <p className="font-semibold text-slate-600 text-sm">Không tìm thấy đối tác phù hợp</p>
                    <p className="text-xs text-slate-400 mt-1">Hãy thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.</p>
                  </td>
                </tr>
              ) : (
                filteredPartners.map((item, index) => {
                  const catInfo = getCategoryInfo(item.category);
                  const CatIcon = catInfo.icon;

                  return (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.isActive === false ? 'opacity-60 bg-slate-50/40' : ''
                      }`}
                    >
                      {/* Cột 1: Thứ tự & nút di chuyển */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex flex-col items-center justify-center gap-0.5">
                          <span className="font-extrabold text-slate-700 text-xs">
                            #{item.order ?? index + 1}
                          </span>
                          <div className="flex items-center gap-0.5">
                            <button
                              onClick={() => handleMoveOrder(item.id, 'up')}
                              disabled={index === 0}
                              className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Tăng thứ tự hiển thị"
                            >
                              <MoveUp className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => handleMoveOrder(item.id, 'down')}
                              disabled={index === filteredPartners.length - 1}
                              className="p-1 hover:bg-slate-200 rounded text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                              title="Giảm thứ tự hiển thị"
                            >
                              <MoveDown className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      </td>

                      {/* Cột 2: Logo đối tác */}
                      <td className="py-3 px-4 text-center">
                        <div className="w-20 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center p-1.5 mx-auto overflow-hidden">
                          {item.logoUrl ? (
                            <img
                              src={item.logoUrl}
                              alt={item.nameVi}
                              className="max-h-full max-w-full object-contain"
                              onError={(e) => {
                                (e.target as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <CatIcon className="w-6 h-6 text-slate-400" />
                          )}
                        </div>
                      </td>

                      {/* Cột 3: Tên đối tác & Vai trò */}
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-bold text-slate-900 text-sm leading-snug">
                              {item.nameVi}
                            </span>
                            {item.badge && (
                              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                                {item.badge}
                              </span>
                            )}
                          </div>
                          {item.nameEn && (
                            <div className="text-[11.5px] text-slate-500 font-normal">
                              {item.nameEn}
                            </div>
                          )}
                          {item.roleVi && (
                            <div className="text-[11px] text-[#00875a] font-medium">
                              ★ {item.roleVi}
                            </div>
                          )}
                          {item.subVi && (
                            <div className="text-[11px] text-slate-500 line-clamp-1">
                              {item.subVi}
                            </div>
                          )}
                        </div>
                      </td>

                      {/* Cột 4: Phân loại */}
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${catInfo.color}`}>
                          <CatIcon className="w-3 h-3" />
                          <span>{catInfo.label}</span>
                        </span>
                      </td>

                      {/* Cột 5: Hiển thị trên Trang chủ */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleHomepage(item.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10.5px] transition-all cursor-pointer ${
                            item.showOnHomepage !== false
                              ? 'bg-emerald-100 text-[#006842] hover:bg-emerald-200'
                              : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                          }`}
                          title="Bấm để bật / tắt hiển thị trang chủ"
                        >
                          {item.showOnHomepage !== false ? (
                            <>
                              <Eye className="w-3 h-3" />
                              <span>Hiển thị</span>
                            </>
                          ) : (
                            <>
                              <EyeOff className="w-3 h-3" />
                              <span>Ẩn</span>
                            </>
                          )}
                        </button>
                      </td>

                      {/* Cột 6: Trạng thái kích hoạt */}
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => handleToggleActive(item.id)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[10.5px] transition-all cursor-pointer ${
                            item.isActive !== false
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100'
                              : 'bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100'
                          }`}
                          title="Bấm để kích hoạt hoặc tạm dừng đối tác"
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${item.isActive !== false ? 'bg-emerald-600' : 'bg-rose-600'}`} />
                          <span>{item.isActive !== false ? 'Hoạt động' : 'Tạm ẩn'}</span>
                        </button>
                      </td>

                      {/* Cột 7: Website link */}
                      <td className="py-3 px-4">
                        {item.websiteUrl ? (
                          <a
                            href={item.websiteUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-emerald-700 max-w-[180px] truncate group font-medium"
                          >
                            <span className="truncate">{item.websiteUrl.replace(/^https?:\/\//, '')}</span>
                            <ExternalLink className="w-3 h-3 shrink-0 text-slate-400 group-hover:text-emerald-700" />
                          </a>
                        ) : (
                          <span className="text-slate-400 italic">Chưa liên kết</span>
                        )}
                      </td>

                      {/* Cột 8: Hành động (Sửa, Xóa) */}
                      <td className="py-3 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => handleOpenEdit(item)}
                            className="p-1.5 rounded-lg text-slate-600 hover:text-[#00875a] hover:bg-emerald-50 transition-colors cursor-pointer"
                            title="Chỉnh sửa đối tác"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(item.id)}
                            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Xóa đối tác"
                          >
                            <Trash2 className="w-4 h-4" />
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

      {/* ================= MODAL THÊM / CHỈNH SỬA ĐỐI TÁC ================= */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
          <div 
            className="relative my-auto bg-white rounded-3xl p-6 sm:p-7 shadow-2xl max-w-2xl w-full border border-slate-100 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-800 flex items-center justify-center">
                  <Handshake className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-900 text-lg">
                    {editingItem ? 'Chỉnh sửa thông tin đối tác' : 'Thêm đối tác đồng hành mới'}
                  </h3>
                  <p className="text-xs text-slate-500">
                    Thông tin sẽ tự động hiển thị trong mạng lưới đối tác trên Trang chủ.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-8 h-8 rounded-full text-slate-400 hover:bg-slate-100 hover:text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body Form */}
            <form onSubmit={handleSave} className="space-y-4 pt-4">
              
              {/* Row 1: Tên đối tác VI & EN */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tên đối tác (Tiếng Việt) <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formNameVi}
                    onChange={(e) => setFormNameVi(e.target.value)}
                    placeholder="VD: Trường Đại học Công nghệ TP.HCM (HUTECH)"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all font-medium"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Tên đối tác (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={formNameEn}
                    onChange={(e) => setFormNameEn(e.target.value)}
                    placeholder="VD: HUTECH University"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 2: Phân loại & Badge định danh */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Phân loại đối tác <span className="text-rose-500">*</span>
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as PartnerCategory)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white font-medium cursor-pointer"
                  >
                    <option value="strategic">Đối tác chiến lược (Strategic)</option>
                    <option value="university">Trường Đại học (University)</option>
                    <option value="hospital">Bệnh viện & Cơ sở Y tế (Healthcare)</option>
                    <option value="enterprise">Doanh nghiệp & Hợp tác xã (Enterprise)</option>
                    <option value="international">Tổ chức quốc tế (International)</option>
                    <option value="government">Chính quyền địa phương (Government)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Nhãn định danh / Badge thẻ
                  </label>
                  <input
                    type="text"
                    value={formBadge}
                    onChange={(e) => setFormBadge(e.target.value)}
                    placeholder="VD: Bảo trợ học thuật & ĐMST, Doanh nghiệp Năng lượng..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 3: Vai trò / Trụ cột (VI & EN) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Trụ cột / Vai trò chính (Tiếng Việt)
                  </label>
                  <input
                    type="text"
                    value={formRoleVi}
                    onChange={(e) => setFormRoleVi(e.target.value)}
                    placeholder="VD: Trụ cột Năng lượng Xanh & Đổi mới sáng tạo"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Trụ cột / Vai trò chính (Tiếng Anh)
                  </label>
                  <input
                    type="text"
                    value={formRoleEn}
                    onChange={(e) => setFormRoleEn(e.target.value)}
                    placeholder="VD: Green Energy & Innovation Pillar"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Row 4: Mô tả / Sứ mệnh đồng hành (VI & EN) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mô tả vai trò đồng hành (Tiếng Việt)
                  </label>
                  <textarea
                    rows={2}
                    value={formSubVi}
                    onChange={(e) => setFormSubVi(e.target.value)}
                    placeholder="VD: Đơn vị đồng hành giải pháp điện năng lượng mặt trời..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Mô tả vai trò đồng hành (Tiếng Anh)
                  </label>
                  <textarea
                    rows={2}
                    value={formSubEn}
                    onChange={(e) => setFormSubEn(e.target.value)}
                    placeholder="VD: Renewable energy partner providing rooftop solar solutions..."
                    className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all resize-none"
                  />
                </div>
              </div>

              {/* Row 5: Logo URL, Tải logo lên & Preview */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Logo đối tác
                </label>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      value={formLogoUrl}
                      onChange={(e) => setFormLogoUrl(e.target.value)}
                      placeholder="Nhập đường dẫn logo (VD: /partner-solar-ngoc-anh-clean.png hoặc https://...)"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all font-mono"
                    />
                  </div>
                  
                  <input
                    type="file"
                    ref={fileInputRef}
                    accept="image/*"
                    onChange={handleLogoFileUpload}
                    className="hidden"
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-all cursor-pointer shrink-0"
                  >
                    <Upload className="w-3.5 h-3.5 text-slate-600" />
                    <span>Tải ảnh từ máy</span>
                  </button>
                </div>

                {/* Logo Preview Box */}
                {formLogoUrl && (
                  <div className="mt-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/90 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-14 rounded-xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-2xs">
                        <img
                          src={formLogoUrl}
                          alt="Xem trước logo"
                          className="max-h-full max-w-full object-contain"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = '/logo.png';
                          }}
                        />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-slate-800 block">Xem trước Logo</span>
                        <span className="text-[11px] text-slate-500">Logo sẽ hiển thị cân đối trong khung thẻ</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormLogoUrl('')}
                      className="text-xs text-rose-600 hover:underline cursor-pointer"
                    >
                      Xóa ảnh
                    </button>
                  </div>
                )}
              </div>

              {/* Row 6: Website URL & Thứ tự hiển thị */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Đường dẫn Website đối tác
                  </label>
                  <input
                    type="url"
                    value={formWebsiteUrl}
                    onChange={(e) => setFormWebsiteUrl(e.target.value)}
                    placeholder="VD: https://www.hutech.edu.vn"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    Thứ tự sắp xếp
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formOrder}
                    onChange={(e) => setFormOrder(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-emerald-600 focus:bg-white transition-all font-bold"
                  />
                </div>
              </div>

              {/* Row 7: Checkbox Tùy chọn hiển thị */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formShowOnHomepage}
                    onChange={(e) => setFormShowOnHomepage(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    Hiển thị trên Trang chủ (Khu vực Đối tác)
                  </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={formIsActive}
                    onChange={(e) => setFormIsActive(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 cursor-pointer"
                  />
                  <span className="text-xs font-bold text-slate-700">
                    Kích hoạt hoạt động (Active)
                  </span>
                </label>
              </div>

              {/* Footer buttons */}
              <div className="pt-5 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsFormOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-all cursor-pointer"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                >
                  {editingItem ? 'Lưu thay đổi' : 'Tạo mới đối tác'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL XÁC NHẬN XÓA ================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white rounded-3xl p-6 shadow-2xl max-w-sm w-full border border-slate-100 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <h3 className="font-extrabold text-slate-900 text-base">Xác nhận xóa đối tác?</h3>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Hành động này sẽ gỡ bỏ hoàn toàn đối tác này khỏi hệ thống cơ sở dữ liệu và Trang chủ website.
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-colors cursor-pointer"
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
