import React, { useState, useEffect } from 'react';
import { AdminDataService, AdminNewsItem } from '../../services/adminDataService';
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  XCircle,
  Eye,
  Calendar,
  User,
  Newspaper,
  Check,
  X,
  AlertTriangle,
  Globe,
  RefreshCw
} from 'lucide-react';

export const AdminNewsPage: React.FC = () => {
  const [newsList, setNewsList] = useState<AdminNewsItem[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<AdminNewsItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formCategory, setFormCategory] = useState<'Tin tức' | 'Sự kiện' | 'Thông báo' | 'Dự án'>('Tin tức');
  const [formSummary, setFormSummary] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formImage, setFormImage] = useState('');
  const [formAuthor, setFormAuthor] = useState('Ban Truyền thông Làng SV');
  const [formPublishedDate, setFormPublishedDate] = useState(new Date().toLocaleDateString('vi-VN'));
  const [formIsPublished, setFormIsPublished] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = () => {
    const list = AdminDataService.getNews();
    setNewsList(list);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenNew = () => {
    setEditingItem(null);
    setFormTitle('');
    setFormCategory('Tin tức');
    setFormSummary('');
    setFormContent('');
    setFormImage('https://images.unsplash.com/photo-1544928141-565b0f10c6d4?auto=format&fit=crop&w=800&q=80');
    setFormAuthor('Ban Truyền thông Làng SV');
    setFormPublishedDate(new Date().toLocaleDateString('vi-VN'));
    setFormIsPublished(true);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (item: AdminNewsItem) => {
    setEditingItem(item);
    setFormTitle(item.title);
    setFormCategory(item.category);
    setFormSummary(item.summary);
    setFormContent(item.content);
    setFormImage(item.image);
    setFormAuthor(item.author);
    setFormPublishedDate(item.publishedDate);
    setFormIsPublished(item.isPublished);
    setIsFormOpen(true);
  };

  const handleSave = () => {
    if (!formTitle.trim()) {
      alert('Vui lòng nhập tiêu đề bài viết!');
      return;
    }

    const itemToSave: AdminNewsItem = {
      id: editingItem ? editingItem.id : `news-${Date.now()}`,
      title: formTitle.trim(),
      category: formCategory,
      summary: formSummary.trim(),
      content: formContent.trim(),
      image: formImage.trim() || 'https://images.unsplash.com/photo-1544928141-565b0f10c6d4?auto=format&fit=crop&w=800&q=80',
      author: formAuthor.trim() || 'Admin',
      publishedDate: formPublishedDate,
      isPublished: formIsPublished,
      views: editingItem ? editingItem.views : 0
    };

    AdminDataService.saveNews(itemToSave);
    loadNews();
    setIsFormOpen(false);
    showToast(`Đã lưu bài viết "${itemToSave.title}" thành công!`);
  };

  const handleDelete = (id: string) => {
    AdminDataService.deleteNews(id);
    loadNews();
    setDeleteConfirmId(null);
    showToast('Đã xóa bài viết thành công.');
  };

  const filteredList = newsList.filter(item => {
    const matchSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.author.toLowerCase().includes(searchQuery.toLowerCase());

    const matchCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchStatus =
      selectedStatus === 'all' ||
      (selectedStatus === 'published' && item.isPublished) ||
      (selectedStatus === 'draft' && !item.isPublished);

    return matchSearch && matchCategory && matchStatus;
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

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Truyền thông & Sự kiện
            </span>
            <span className="text-xs text-slate-600">Đồng bộ trang Tin tức & Sự kiện</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900">Quản lý Tin tức, Sự kiện & Thông báo</h1>
          <p className="text-sm text-slate-700 mt-0.5">
            Đăng tải hoạt động cộng đồng, hội thảo sáng tạo và các thông báo mới của Làng Sinh Viên.
          </p>
        </div>

        <button
          onClick={handleOpenNew}
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Tạo bài viết mới</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          
          <div className="md:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-600 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm theo tiêu đề bài viết, nội dung tóm tắt, tác giả..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
            />
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả danh mục</option>
              <option value="Tin tức">Tin tức</option>
              <option value="Sự kiện">Sự kiện</option>
              <option value="Thông báo">Thông báo</option>
              <option value="Dự án">Dự án</option>
            </select>
          </div>

          <div className="md:col-span-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 text-slate-700"
            >
              <option value="all">Tất cả trạng thái ({newsList.length})</option>
              <option value="published">Đã xuất bản</option>
              <option value="draft">Bản nháp / Chưa xuất bản</option>
            </select>
          </div>

        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3.5 px-4">Bài viết</th>
                <th className="py-3.5 px-4">Danh mục</th>
                <th className="py-3.5 px-4">Tác giả</th>
                <th className="py-3.5 px-4">Ngày đăng</th>
                <th className="py-3.5 px-4">Lượt xem</th>
                <th className="py-3.5 px-4">Trạng thái</th>
                <th className="py-3.5 px-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredList.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center mx-auto mb-3">
                      <Newspaper className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-slate-700">Chưa có bài viết nào</p>
                  </td>
                </tr>
              ) : (
                filteredList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                    
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3 max-w-[340px]">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                        />
                        <div>
                          <div className="font-bold text-slate-900 text-xs leading-snug line-clamp-2">
                            {item.title}
                          </div>
                          <div className="text-[11px] text-slate-600 line-clamp-1 mt-0.5">
                            {item.summary}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.category}
                      </span>
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-700 font-medium whitespace-nowrap">
                      {item.author}
                    </td>

                    <td className="py-3 px-4 text-xs text-slate-600 whitespace-nowrap">
                      {item.publishedDate}
                    </td>

                    <td className="py-3 px-4 text-xs font-mono text-slate-600 whitespace-nowrap">
                      {item.views} lượt
                    </td>

                    <td className="py-3 px-4 whitespace-nowrap">
                      {item.isPublished ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Đã xuất bản
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-600">
                          Bản nháp
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => handleOpenEdit(item)}
                          title="Chỉnh sửa bài viết"
                          className="p-1.5 bg-slate-100 hover:bg-emerald-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => setDeleteConfirmId(item.id)}
                          title="Xóa bài viết"
                          className="p-1.5 bg-slate-100 hover:bg-rose-600 hover:text-white rounded-lg text-slate-600 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete confirm dialog */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-6 shadow-2xl border border-slate-200 animate-scale-up space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <div className="text-center">
              <h3 className="text-base font-bold text-slate-900">Xác nhận xóa bài viết?</h3>
              <p className="text-xs text-slate-600 mt-1">Bài viết sẽ bị xóa khỏi hệ thống.</p>
            </div>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl hover:bg-slate-200"
              >
                Hủy
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                className="px-4 py-2 bg-rose-600 text-white text-xs font-bold rounded-xl hover:bg-rose-700"
              >
                Đồng ý xóa
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[92vh] flex flex-col shadow-2xl border border-slate-200 animate-scale-up">
            
            <div className="p-6 border-b border-slate-200 flex items-center justify-between bg-slate-50/70 rounded-t-3xl">
              <h2 className="text-xl font-black text-slate-900">
                {editingItem ? 'Chỉnh sửa bài viết' : 'Tạo mới tin tức / sự kiện'}
              </h2>
              <button
                onClick={() => setIsFormOpen(false)}
                className="w-9 h-9 rounded-full bg-white border border-slate-200 hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Tiêu đề bài viết <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="Nhập tiêu đề tin tức, sự kiện..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-hidden text-slate-800"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Danh mục
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                  >
                    <option value="Tin tức">Tin tức</option>
                    <option value="Sự kiện">Sự kiện</option>
                    <option value="Thông báo">Thông báo</option>
                    <option value="Dự án">Dự án</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Tác giả / Ban phụ trách
                  </label>
                  <input
                    type="text"
                    value={formAuthor}
                    onChange={(e) => setFormAuthor(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Ảnh bìa (URL)
                </label>
                <input
                  type="text"
                  value={formImage}
                  onChange={(e) => setFormImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Mô tả tóm tắt
                </label>
                <textarea
                  rows={2}
                  value={formSummary}
                  onChange={(e) => setFormSummary(e.target.value)}
                  placeholder="Tóm tắt ngắn gọn nội dung hiển thị ở danh sách tin tức..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Nội dung chi tiết
                </label>
                <textarea
                  rows={6}
                  value={formContent}
                  onChange={(e) => setFormContent(e.target.value)}
                  placeholder="Soạn thảo nội dung bài viết..."
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:outline-hidden text-slate-800"
                />
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-3">
                <input
                  type="checkbox"
                  id="publishToggle"
                  checked={formIsPublished}
                  onChange={(e) => setFormIsPublished(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                />
                <label htmlFor="publishToggle" className="text-xs font-bold text-slate-800 cursor-pointer">
                  Xuất bản ngay (Hiển thị ra trang Tin tức công khai cho độc giả)
                </label>
              </div>

            </div>

            <div className="p-4 sm:p-6 border-t border-slate-200 bg-slate-50/70 rounded-b-3xl flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="px-4 py-2 bg-white border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold rounded-xl"
              >
                Hủy bỏ
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-md transition-colors"
              >
                Lưu bài viết
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
