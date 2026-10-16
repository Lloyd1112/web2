import React, { useState, useEffect } from 'react';
import { AdminDataService, AdminProposal, AdminProject } from '../../services/adminDataService';
import { RealProblem } from '../../types';
import {
  FileQuestion,
  Users,
  FolderKanban,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
  Sparkles,
  AlertTriangle,
  Building2,
  PlusCircle,
  Eye,
  Calendar,
  Send
} from 'lucide-react';

interface AdminDashboardPageProps {
  onNavigate: (tab: string, extraId?: string) => void;
  onOpenProblemDetail: (id: string) => void;
  onOpenProposalDetail: (id: string) => void;
  onOpenProjectDetail: (id: string) => void;
  onCreateProject: () => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({
  onNavigate,
  onOpenProblemDetail,
  onOpenProposalDetail,
  onOpenProjectDetail,
  onCreateProject
}) => {
  const [stats, setStats] = useState(AdminDataService.getDashboardStats());
  const [pendingProblems, setPendingProblems] = useState<RealProblem[]>([]);
  const [newProposals, setNewProposals] = useState<AdminProposal[]>([]);
  const [recentProjects, setRecentProjects] = useState<AdminProject[]>([]);

  useEffect(() => {
    loadData();
    const unsubscribe = AdminDataService.subscribe(() => {
      loadData();
    });
    return unsubscribe;
  }, []);

  const loadData = () => {
    setStats(AdminDataService.getDashboardStats());
    const allProblems = AdminDataService.getProblems();
    setPendingProblems(allProblems.filter(p => p.status === 'pending').slice(0, 5));

    const allProposals = AdminDataService.getProposals();
    setNewProposals(allProposals.filter(p => p.status === 'new').slice(0, 5));

    const allProjects = AdminDataService.getProjects();
    setRecentProjects(allProjects.slice(0, 4));
  };

  return (
    <div className="space-y-6">
      
      {/* 1. Header greeting & quick actions */}
      <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-3xl p-6 sm:p-8 text-white flex flex-col md:flex-row md:items-center justify-between gap-5 shadow-lg shadow-emerald-950/10 relative overflow-hidden">
        <div className="space-y-1 relative z-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-white/15 text-emerald-200 backdrop-blur-xs mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Hệ thống Quản trị Living Lab Bình Mỹ</span>
          </div>
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold tracking-tight">
            Tổng quan Hoạt động & Kiểm duyệt
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl leading-relaxed">
            Theo dõi dòng chảy kết nối bài toán thực tế của địa phương với các đề xuất giải pháp sáng tạo và dự án ươm tạo.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 relative z-10">
          <button
            onClick={() => onNavigate('admin-problems')}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-900 text-xs font-bold hover:bg-emerald-50 transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <Clock className="w-4 h-4 text-amber-600" />
            <span>Duyệt bài toán ({stats.pendingProblems})</span>
          </button>

          <button
            onClick={() => onNavigate('admin-proposals')}
            className="px-4 py-2.5 rounded-xl bg-white/15 hover:bg-white/20 text-white text-xs font-bold transition-all border border-white/20 cursor-pointer flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-emerald-300" />
            <span>Xử lý đơn mới ({stats.newProposals})</span>
          </button>

          <button
            onClick={onCreateProject}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo dự án mới</span>
          </button>
        </div>

        {/* Decorative background glow */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* 2. Primary 4 Statistics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: Bài toán thực tế */}
        <div 
          onClick={() => onNavigate('admin-problems')}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Bài toán thực tế
            </span>
            <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileQuestion className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.totalProblems}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>Đã công khai: <strong className="text-emerald-700 font-bold">{stats.publicProblems}</strong></span>
              <span>Chờ duyệt: <strong className="text-amber-600 font-bold">{stats.pendingProblems}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 2: Đơn đề xuất hợp tác */}
        <div 
          onClick={() => onNavigate('admin-proposals')}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Đơn đề xuất hợp tác
            </span>
            <div className="w-9 h-9 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.totalProposals}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>Đơn mới: <strong className="text-rose-600 font-bold">{stats.newProposals}</strong></span>
              <span>Đang kết nối: <strong className="text-sky-700 font-bold">{stats.connectingProposals}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 3: Dự án ươm tạo */}
        <div 
          onClick={() => onNavigate('admin-projects')}
          className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs hover:shadow-md transition-all cursor-pointer space-y-3 group"
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Dự án đổi mới sáng tạo
            </span>
            <div className="w-9 h-9 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center group-hover:scale-105 transition-transform">
              <FolderKanban className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900 tracking-tight">
              {stats.totalProjects}
            </div>
            <div className="flex items-center justify-between text-xs text-slate-500 mt-1">
              <span>Đã xuất bản: <strong className="text-purple-700 font-bold">{stats.publishedProjects}</strong></span>
              <span>Đang chạy: <strong className="text-emerald-700 font-bold">{stats.inProgressProjects}</strong></span>
            </div>
          </div>
        </div>

        {/* Card 4: Tỷ lệ kết nối thành công */}
        <div className="bg-white rounded-2xl p-5 border border-slate-200/90 shadow-2xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Kết nối thành công
            </span>
            <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-teal-800 tracking-tight">
              {stats.connectedProposals} đơn
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Đã hình thành nhóm giải quyết hoặc liên kết dự án
            </div>
          </div>
        </div>

      </div>

      {/* 3. Three Actionable Queues Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* GROUP 1: BÀI TOÁN CẦN DUYỆT (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center shrink-0">
                <Clock className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">
                Bài toán cần duyệt ({pendingProblems.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigate('admin-problems')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {pendingProblems.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p>Hiện không có bài toán nào đang chờ kiểm duyệt.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {pendingProblems.map((p) => (
                <div
                  key={p.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                        Chờ xác minh
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {p.createdAt}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {p.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      Gửi bởi: <strong className="text-slate-700">{p.contactName}</strong> ({p.organizationName || p.submitterType})
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenProblemDetail(p.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shrink-0 shadow-2xs cursor-pointer active:scale-95"
                  >
                    Xem & duyệt
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* GROUP 2: ĐƠN HỢP TÁC MỚI (6 cols) */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center shrink-0">
                <Users className="w-3.5 h-3.5" />
              </div>
              <h2 className="font-bold text-sm text-slate-900">
                Đơn đề xuất hợp tác mới ({newProposals.length})
              </h2>
            </div>
            <button
              onClick={() => onNavigate('admin-proposals')}
              className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {newProposals.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
              <p>Chưa có đơn đề xuất hợp tác mới nào cần xử lý.</p>
            </div>
          ) : (
            <div className="space-y-2.5">
              {newProposals.map((prop) => (
                <div
                  key={prop.id}
                  className="p-3.5 rounded-xl border border-slate-100 hover:border-slate-200 bg-slate-50/50 hover:bg-slate-50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800">
                        Mới tiếp nhận
                      </span>
                      <span className="text-[11px] font-semibold text-emerald-700">
                        [{prop.role}]
                      </span>
                      <span className="text-[11px] text-slate-400">
                        {prop.createdAt}
                      </span>
                    </div>
                    <h3 className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {prop.fullName} ({prop.phone})
                    </h3>
                    <p className="text-[11px] text-slate-500 truncate">
                      Bài toán: <span className="font-medium text-slate-700">{prop.problemTitle || prop.problemCode}</span>
                    </p>
                  </div>

                  <button
                    onClick={() => onOpenProposalDetail(prop.id)}
                    className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white bg-[#1d75c2] hover:bg-[#155a96] transition-colors shrink-0 shadow-2xs cursor-pointer active:scale-95"
                  >
                    Xử lý đơn
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* 4. GROUP 3: DỰ ÁN GẦN ĐÂY */}
      <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-2xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center shrink-0">
              <FolderKanban className="w-3.5 h-3.5" />
            </div>
            <h2 className="font-bold text-sm text-slate-900">
              Dự án đổi mới sáng tạo gần đây
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onCreateProject}
              className="text-xs font-bold text-[#00875a] hover:underline flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>Thêm dự án</span>
            </button>
            <button
              onClick={() => onNavigate('admin-projects')}
              className="text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1 cursor-pointer"
            >
              <span>Xem tất cả ({stats.totalProjects})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentProjects.map((proj) => (
            <div
              key={proj.id}
              className="rounded-2xl border border-slate-200/90 overflow-hidden bg-white hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="h-32 bg-slate-100 relative overflow-hidden">
                  <img
                    src={proj.thumbnail}
                    alt={proj.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs">
                      {proj.categoryName}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold shadow-xs ${
                      proj.publishStatus === 'published' 
                        ? 'bg-emerald-600 text-white' 
                        : 'bg-slate-700 text-white'
                    }`}>
                      {proj.publishStatus === 'published' ? 'Đã xuất bản' : 'Bản nháp'}
                    </span>
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <span className="text-[10px] font-bold text-purple-700 block">
                    {proj.code}
                  </span>
                  <h3 className="font-bold text-xs text-slate-900 line-clamp-2 leading-snug">
                    {proj.title}
                  </h3>
                  <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                    {proj.summary}
                  </p>
                </div>
              </div>

              <div className="p-4 pt-0">
                <button
                  onClick={() => onOpenProjectDetail(proj.id)}
                  className="w-full py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Quản lý dự án</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
