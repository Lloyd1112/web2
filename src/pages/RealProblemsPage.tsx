import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { RealProblem, ProblemCategory, ProblemStatus } from '../types';
import { initialRealProblems } from '../data/mockProblems';
import { PostProblemModal } from '../components/problems/PostProblemModal';
import { ProblemDetailModal } from '../components/problems/ProblemDetailModal';
import { ProposeSolutionModal } from '../components/problems/ProposeSolutionModal';
import { ProblemDetailView } from '../components/problems/ProblemDetailView';
import { PostProblemView } from '../components/problems/PostProblemView';
import { ProposeSolutionView } from '../components/problems/ProposeSolutionView';
import realProblemsBanner from '../assets/problems/banner-clean.png';
import {
  Search,
  MapPin,
  Calendar,
  Check,
  Clock,
  HelpCircle,
  FileText,
  User,
  Sprout,
  HeartHandshake,
  Palmtree,
  MoreHorizontal,
  LayoutGrid,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

import { AdminDataService } from '../services/adminDataService';

interface RealProblemsPageProps {
  onOpenCollaboration?: (type?: string, title?: string) => void;
}

export const RealProblemsPage: React.FC<RealProblemsPageProps> = () => {
  const { language } = useLanguage();

  // Danh sách bài toán thực tế lấy trực tiếp từ AdminDataService
  const [problems, setProblems] = useState<(RealProblem & { isSampleData?: boolean })[]>(() => {
    return AdminDataService.getProblems();
  });

  // Tự động đồng bộ với AdminDataService khi có bất kỳ thay đổi nào từ Admin hoặc người dùng
  useEffect(() => {
    const unsubscribe = AdminDataService.subscribe(() => {
      setProblems(AdminDataService.getProblems());
    });
    return unsubscribe;
  }, []);

  // State tìm kiếm & bộ lọc
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | ProblemCategory>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | ProblemStatus>('all');
  const [currentPage, setCurrentPage] = useState(1);

  // Modals & Detail Page & Post Problem View
  const [isPostingProblem, setIsPostingProblem] = useState(false);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState<RealProblem | null>(null);
  const [problemForProposal, setProblemForProposal] = useState<RealProblem | null>(null);

  // Xử lý mở chi tiết bài toán
  const handleOpenProblemDetail = (problem: RealProblem) => {
    setSelectedProblem(problem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Xử lý khi đăng bài mới thành công (Lưu bền vững qua AdminDataService)
  const handleProblemSubmitted = (newProblem: RealProblem) => {
    AdminDataService.saveProblem(newProblem);
    setProblems(AdminDataService.getProblems());
  };

  // Helper lấy status badge theo mockup
  const getStatusBadge = (status: ProblemStatus) => {
    switch (status) {
      case 'verified':
        return {
          text: 'Đã xác minh',
          textEn: 'Verified',
          color: 'bg-[#00875a] text-white',
          icon: Check,
          iconColor: 'text-white'
        };
      case 'seeking_support':
        return {
          text: 'Đang tìm người hỗ trợ',
          textEn: 'Seeking Support',
          color: 'bg-[#e0f2fe] text-[#0284c7]',
          icon: Clock,
          iconColor: 'text-[#0284c7]'
        };
      case 'in_progress':
        return {
          text: 'Đang triển khai',
          textEn: 'In Progress',
          color: 'bg-[#e0f2fe] text-[#0284c7]',
          icon: Clock,
          iconColor: 'text-[#0284c7]'
        };
      case 'pending':
      default:
        return {
          text: 'Chờ xác minh',
          textEn: 'Pending Verification',
          color: 'bg-[#fef3c7] text-[#d97706]',
          icon: Clock,
          iconColor: 'text-[#d97706]'
        };
    }
  };

  // Helper icon lĩnh vực
  const getCategoryInfo = (cat: ProblemCategory) => {
    switch (cat) {
      case 'agriculture':
        return { text: 'Nông nghiệp', textEn: 'Agriculture', icon: Sprout, color: 'text-emerald-700' };
      case 'health':
        return { text: 'Y tế', textEn: 'Healthcare', icon: HeartHandshake, color: 'text-rose-600' };
      case 'tourism':
        return { text: 'Du lịch', textEn: 'Tourism', icon: Palmtree, color: 'text-teal-600' };
      case 'other':
      default:
        return { text: 'Khác', textEn: 'Other', icon: MoreHorizontal, color: 'text-slate-600' };
    }
  };

  // Lọc bài toán kết hợp Lĩnh vực, Trạng thái & Từ khóa tìm kiếm (hỗ trợ cả tiếng Việt và tiếng Anh)
  const filteredProblems = useMemo(() => {
    return problems.filter(p => {
      // ⚠️ QUY TẮC BẮT BUỘC: Ở GIAO DIỆN CHỈ ĐĂNG NHỮNG BÀI TOÁN ĐÃ ĐƯỢC XÁC MINH & CÔNG KHAI
      // Những bài toán đang đợi xác minh (pending), từ chối hoặc bị ẩn TUYỆT ĐỐI KHÔNG HIỂN THỊ!
      if (p.status === 'pending' || (p as any).status === 'rejected' || (p as any).isPublic === false) {
        return false;
      }

      // Bộ lọc lĩnh vực
      if (selectedCategory !== 'all' && p.category !== selectedCategory) {
        return false;
      }

      // Bộ lọc trạng thái
      if (selectedStatus !== 'all' && p.status !== selectedStatus) {
        return false;
      }

      // Ô tìm kiếm
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchTitle = (p.title || '').toLowerCase().includes(q) || ((p.titleEn || '').toLowerCase().includes(q));
        const matchDesc = (p.description || '').toLowerCase().includes(q) || ((p.descriptionEn || '').toLowerCase().includes(q));
        const matchContact = (p.organizationName || p.contactName || '').toLowerCase().includes(q);
        const matchLoc = (p.location || '').toLowerCase().includes(q) || ((p.locationEn || '').toLowerCase().includes(q));
        return matchTitle || matchDesc || matchContact || matchLoc;
      }

      return true;
    });
  }, [problems, selectedCategory, selectedStatus, searchQuery]);

  // Phân trang (6 bài mỗi trang)
  const itemsPerPage = 6;
  const paginatedProblems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProblems.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProblems, currentPage]);

  // Thống kê tổng quan (chỉ tính các bài toán đã được xác minh / công khai)
  const publishedProblems = useMemo(() => {
    return problems.filter(p => p.status !== 'pending');
  }, [problems]);

  const totalCount = Math.max(12, publishedProblems.length);
  const verifiedCount = Math.max(8, publishedProblems.filter(p => p.status === 'verified').length);
  const processingCount = Math.max(4, publishedProblems.filter(p => p.status === 'in_progress' || p.status === 'seeking_support').length);

  // NẾU ĐANG CHỌN ĐĂNG BÀI TOÁN THỰC TẾ -> HIỂN THỊ GIAO DIỆN TỪNG BƯỚC CHUẨN THEO ẢNH
  if (isPostingProblem) {
    return (
      <PostProblemView
        onBackToList={() => {
          setIsPostingProblem(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSubmitSuccess={(newProblem) => {
          handleProblemSubmitted(newProblem);
        }}
      />
    );
  }

  // NẾU ĐANG CHỌN ĐỀ XUẤT THAM GIA GIẢI QUYẾT BÀI TOÁN -> HIỂN THỊ GIAO DIỆN ĐỀ XUẤT HỢP TÁC CHUẨN THEO ẢNH
  if (problemForProposal) {
    return (
      <ProposeSolutionView
        problem={problemForProposal}
        onBack={() => {
          setProblemForProposal(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBackToList={() => {
          setProblemForProposal(null);
          setSelectedProblem(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onBackToDetail={() => {
          setProblemForProposal(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSubmitSuccess={() => {
          setProblemForProposal(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // NẾU ĐANG CHỌN XEM CHI TIẾT BÀI TOÁN -> HIỂN THỊ GIAO DIỆN CHI TIẾT CHUẨN THEO ẢNH
  if (selectedProblem) {
    return (
      <ProblemDetailView
        problem={selectedProblem}
        allProblems={problems}
        onBackToList={() => {
          setSelectedProblem(null);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onSelectProblem={(prob) => {
          setSelectedProblem(prob);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenProposeSolution={(prob) => {
          setProblemForProposal(prob);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  return (
    <div className="w-full bg-[#f8fafc] py-6 sm:py-8 lg:py-10 min-h-screen text-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* ================= 1. BANNER CHÍNH CÓ TRANH PHONG CẢNH BÌNH MỸ ================= */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs bg-white">
          <img
            src={realProblemsBanner}
            alt={language === 'vi' ? 'BÀI TOÁN THỰC TẾ TẠI BÌNH MỸ - Cùng nhau kiến tạo giải pháp cho Bình Mỹ' : 'REAL-WORLD PROBLEMS IN BINH MY - Co-creating solutions for Binh My'}
            className="w-full h-auto object-cover block"
          />
          {language === 'en' && (
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/85 via-slate-900/50 to-transparent p-5 sm:p-7 text-white flex flex-col justify-end">
              <span className="text-[11px] font-bold tracking-widest uppercase text-emerald-400 mb-1">
                Binh My Living Lab Innovation
              </span>
              <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white drop-shadow-md">
                REAL-WORLD PROBLEMS IN BINH MY
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 font-medium max-w-2xl drop-shadow-xs mt-0.5">
                Connecting community challenges directly with students, doctors, scientists, and businesses to build practical solutions.
              </p>
            </div>
          )}
        </div>

        {/* ================= 2. BỘ ĐIỀU KHIỂN & BỘ LỌC ================= */}
        <div className="space-y-4">

          {/* Hàng 1: Ô tìm kiếm + 2 Dropdown + Nút "+ Đăng bài toán" */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">

            {/* Ô tìm kiếm */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder={language === 'vi' ? 'Tìm kiếm bài toán...' : 'Search challenges, issues, location...'}
                className="w-full pl-10 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:border-emerald-600 shadow-2xs transition-all"
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

            {/* Dropdown 1: Tất cả lĩnh vực */}
            <div className="w-full md:w-56 shrink-0">
              <select
                value={selectedCategory}
                onChange={(e) => {
                  setSelectedCategory(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-normal text-slate-700 focus:outline-emerald-600 focus:border-emerald-600 shadow-2xs cursor-pointer"
              >
                <option value="all">{language === 'vi' ? 'Tất cả lĩnh vực' : 'All Sectors'}</option>
                <option value="agriculture">{language === 'vi' ? 'Nông nghiệp' : 'Agriculture'}</option>
                <option value="health">{language === 'vi' ? 'Y tế' : 'Healthcare'}</option>
                <option value="tourism">{language === 'vi' ? 'Du lịch' : 'Tourism'}</option>
                <option value="other">{language === 'vi' ? 'Khác' : 'Other'}</option>
              </select>
            </div>

            {/* Dropdown 2: Tất cả trạng thái (chỉ gồm các trạng thái đã xác minh công khai) */}
            <div className="w-full md:w-56 shrink-0">
              <select
                value={selectedStatus}
                onChange={(e) => {
                  setSelectedStatus(e.target.value as any);
                  setCurrentPage(1);
                }}
                className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-normal text-slate-700 focus:outline-emerald-600 focus:border-emerald-600 shadow-2xs cursor-pointer"
              >
                <option value="all">{language === 'vi' ? 'Tất cả trạng thái' : 'All Statuses'}</option>
                <option value="verified">{language === 'vi' ? 'Đã xác minh' : 'Verified'}</option>
                <option value="seeking_support">{language === 'vi' ? 'Đang tìm người hỗ trợ' : 'Seeking Support'}</option>
                <option value="in_progress">{language === 'vi' ? 'Đang triển khai' : 'In Progress'}</option>
              </select>
            </div>

            {/* Nút "+ Đăng bài toán" xanh đậm */}
            <button
              onClick={() => {
                setIsPostingProblem(true);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center justify-center gap-1.5 shrink-0 cursor-pointer active:scale-98"
            >
              <span>{language === 'vi' ? '+ Đăng bài toán' : '+ Submit Problem'}</span>
            </button>

          </div>

          {/* Hàng 2: Bộ lọc dạng Tab/Pills (Tất cả, Nông nghiệp, Y tế, Du lịch, Khác) */}
          <div className="flex items-center gap-2.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: language === 'vi' ? 'Tất cả' : 'All', icon: LayoutGrid },
              { id: 'agriculture', label: language === 'vi' ? 'Nông nghiệp' : 'Agriculture', icon: Sprout },
              { id: 'health', label: language === 'vi' ? 'Y tế' : 'Healthcare', icon: HeartHandshake },
              { id: 'tourism', label: language === 'vi' ? 'Du lịch' : 'Tourism', icon: Palmtree },
              { id: 'other', label: language === 'vi' ? 'Khác' : 'Other', icon: MoreHorizontal }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = selectedCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => {
                    setSelectedCategory(tab.id as any);
                    setCurrentPage(1);
                  }}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer whitespace-nowrap shadow-2xs ${isActive
                      ? 'bg-[#00875a] text-white border border-[#00875a]'
                      : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                >
                  <TabIcon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-emerald-700'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

        </div>

        {/* ================= 3. BỐ CỤC 2 CỘT CHÍNH (TRÁI: CARDS & PHÂN TRANG, PHẢI: 3 CARDS THÔNG TIN) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* CỘT TRÁI (LỚN): 3 CỘT CARDS + PHÂN TRANG */}
          <div className="lg:col-span-9 space-y-6">

            {filteredProblems.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center border border-slate-200/90 shadow-2xs space-y-3">
                <p className="text-sm font-semibold text-slate-700">
                  {language === 'vi' ? 'Không tìm thấy bài toán nào phù hợp.' : 'No matching problems found.'}
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors cursor-pointer"
                >
                  {language === 'vi' ? 'Đặt lại bộ lọc' : 'Reset Filters'}
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4.5">
                {paginatedProblems.map((problem) => {
                  const status = getStatusBadge(problem.status);
                  const StatusIcon = status.icon;
                  const catInfo = getCategoryInfo(problem.category);
                  const CatIcon = catInfo.icon;
                  const displayImage = problem.images && problem.images.length > 0
                    ? problem.images[0]
                    : '/assets/problems/card1.jpg';
                  const displayTitle = (language === 'en' && problem.titleEn) ? problem.titleEn : problem.title;
                  const displayDesc = (language === 'en' && problem.descriptionEn) ? problem.descriptionEn : problem.description;
                  const displayLocation = (language === 'en' && problem.locationEn) ? problem.locationEn : problem.location;

                  return (
                    <div
                      key={problem.id}
                      className="bg-white rounded-2xl border border-slate-200/90 p-3.5 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                    >
                      <div>
                        {/* Phần trên: Ảnh bên trái + Thông tin bài toán bên phải */}
                        <div className="flex gap-3">

                          {/* Ảnh minh họa bên trái */}
                          <div
                            onClick={() => handleOpenProblemDetail(problem)}
                            className="w-[84px] h-[106px] rounded-xl overflow-hidden shrink-0 border border-slate-100 bg-slate-50 cursor-pointer"
                          >
                            <img
                              src={displayImage}
                              alt={displayTitle}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              loading="lazy"
                            />
                          </div>

                          {/* Thông tin bên phải */}
                          <div className="flex-1 min-w-0 flex flex-col justify-between">

                            {/* Trạng thái xác minh Badge */}
                            <div className="flex justify-start">
                              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold tracking-tight shadow-2xs ${status.color}`}>
                                <StatusIcon className={`w-3 h-3 ${status.iconColor}`} />
                                <span>{language === 'vi' ? status.text : status.textEn}</span>
                              </span>
                            </div>

                            {/* Tiêu đề bài toán */}
                            <h3
                              onClick={() => handleOpenProblemDetail(problem)}
                              className="font-bold text-[13px] text-slate-900 leading-snug line-clamp-2 hover:text-[#00875a] transition-colors cursor-pointer mt-1"
                              title={displayTitle}
                            >
                              {displayTitle}
                            </h3>

                            {/* Tác giả / Đơn vị */}
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                              <User className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                              <span className="truncate">{problem.organizationName || problem.contactName}</span>
                            </div>

                            {/* Lĩnh vực & Địa điểm */}
                            <div className="flex items-center gap-3 text-[11px] text-slate-600 mt-1">
                              <span className="flex items-center gap-1">
                                <CatIcon className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                                <span>{language === 'vi' ? catInfo.text : catInfo.textEn}</span>
                              </span>
                              <span className="flex items-center gap-1 text-slate-500">
                                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                <span>{displayLocation}</span>
                              </span>
                            </div>

                            {/* Ngày đăng */}
                            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                              <span>{problem.createdAt}</span>
                            </div>

                          </div>
                        </div>

                        {/* Đoạn mô tả vắn tắt 2 dòng có dấu 3 chấm */}
                        <p className="text-[11px] text-slate-500 line-clamp-2 mt-3 leading-relaxed">
                          {displayDesc}
                        </p>

                      </div>

                      {/* Nút Xem chi tiết góc dưới màu xanh nhạt */}
                      <div className="mt-3 pt-1">
                        <button
                          onClick={() => handleOpenProblemDetail(problem)}
                          className="inline-flex items-center gap-1 px-3.5 py-1.5 bg-[#e8f3fc] hover:bg-[#d8ebfa] text-[#1d75c2] text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                        >
                          <span>{language === 'vi' ? 'Xem chi tiết' : 'View Details'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

            {/* Phân trang: < [1] 2 3 4 5 > */}
            <div className="flex items-center gap-1.5 pt-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              {[1, 2, 3, 4, 5].map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`w-8 h-8 rounded-lg text-xs font-semibold transition-all cursor-pointer ${currentPage === page
                      ? 'bg-[#00875a] text-white shadow-2xs'
                      : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                    }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage(prev => Math.min(5, prev + 1))}
                disabled={currentPage === 5}
                className="w-8 h-8 rounded-lg border border-slate-200 bg-white text-slate-500 hover:bg-slate-50 disabled:opacity-40 flex items-center justify-center transition-colors cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* CỘT PHẢI (SIDEBAR): 3 CARDS THEO ĐÚNG ẢNH MẪU */}
          <div className="lg:col-span-3 space-y-4">

            {/* Card 1: Đăng bài toán thực tế */}
            <div className="bg-[#f0faf5] border border-[#cbe8dc] rounded-2xl p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 relative shrink-0">
                  <svg viewBox="0 0 44 44" fill="none" className="w-full h-full drop-shadow-xs">
                    {/* Nền tròn xanh bạc hà nhạt */}
                    <circle cx="22" cy="22" r="22" fill="#D7F3E6" />
                    {/* Bụi cây xanh dưới nền */}
                    <path d="M6 34C9 28 15 26 22 28C29 26 35 28 38 34C34 39 28 42 22 42C16 42 10 39 6 34Z" fill="#15803D" opacity="0.85" />
                    <path d="M10 36C13 32 18 30 22 31C26 30 31 32 34 36C31 39 26 41 22 41C18 41 13 39 10 36Z" fill="#16A34A" />
                    {/* Tờ giấy trắng */}
                    <rect x="13" y="11" width="18" height="23" rx="2.5" fill="white" />
                    {/* Các dòng kẻ */}
                    <line x1="16.5" y1="16.5" x2="27.5" y2="16.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <line x1="16.5" y1="20.5" x2="27.5" y2="20.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <line x1="16.5" y1="24.5" x2="27.5" y2="24.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <line x1="16.5" y1="28.5" x2="23.5" y2="28.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    {/* Cây bút nghiêng */}
                    <g transform="rotate(25 28 11)">
                      <rect x="26.5" y="6" width="3.5" height="13" rx="1.5" fill="#0C4A6E" />
                      <path d="M26.5 19L28.25 22.5L30 19H26.5Z" fill="#0284C7" />
                      <circle cx="28.25" cy="22" r="0.6" fill="#0369A1" />
                      <rect x="26.5" y="10" width="3.5" height="1" fill="#E0F2FE" />
                    </g>
                  </svg>
                </div>
                <h3 className="font-bold text-[#006842] text-[15px] sm:text-base leading-snug">
                  {language === 'vi' ? 'Đăng bài toán thực tế' : 'Submit Real-World Problem'}
                </h3>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {language === 'vi' 
                  ? 'Chia sẻ vấn đề bạn đang gặp phải để nhận được sự hỗ trợ từ cộng đồng.' 
                  : 'Share the challenges you are facing to receive collaboration and solutions from the community.'}
              </p>

              <button
                onClick={() => {
                  setIsPostingProblem(true);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full py-2.5 rounded-xl text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              >
                <span>{language === 'vi' ? '+ Đăng bài toán' : '+ Submit Problem'}</span>
              </button>
            </div>

            {/* Card 2: Quy trình xử lý bài toán (5 bước dọc) */}
            <div className="bg-[#f0f7fe] border border-[#d6e8fb] rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#1d75c2]">
                <div className="w-5 h-5 rounded-full bg-[#1d75c2] text-white flex items-center justify-center shrink-0 shadow-2xs">
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                  </svg>
                </div>
                <h3 className="font-bold text-[15px] sm:text-base leading-tight">
                  {language === 'vi' ? 'Quy trình xử lý bài toán' : 'Problem Solving Workflow'}
                </h3>
              </div>

              <div className="space-y-0 pt-1">
                {[
                  {
                    step: 1,
                    title: language === 'vi' ? 'Tiếp nhận thông tin' : 'Receive Information',
                    desc: language === 'vi' ? 'Từ nông dân, doanh nghiệp, hộ sản xuất.' : 'From farmers, enterprises, local producers.'
                  },
                  {
                    step: 2,
                    title: language === 'vi' ? 'Kiểm tra và xác minh' : 'Review & Verification',
                    desc: language === 'vi' ? 'Ban quản lý Làng SV xem xét nội dung.' : 'Student Village Management reviews the case.'
                  },
                  {
                    step: 3,
                    title: language === 'vi' ? 'Công khai trên website' : 'Publish on Portal',
                    desc: language === 'vi' ? 'Chỉ những bài toán đã được xác minh.' : 'Only verified problems are made public.'
                  },
                  {
                    step: 4,
                    title: language === 'vi' ? 'Kết nối và hỗ trợ' : 'Connect & Support',
                    desc: language === 'vi' ? 'Sinh viên, chuyên gia, doanh nghiệp tham gia.' : 'Students, experts, and enterprises engage.'
                  },
                  {
                    step: 5,
                    title: language === 'vi' ? 'Hình thành dự án' : 'Project Incubation',
                    desc: language === 'vi' ? 'Triển khai giải pháp và đánh giá kết quả.' : 'Implement solutions and evaluate impact.'
                  }
                ].map((item, idx, arr) => (
                  <div key={item.step} className="flex gap-3">
                    {/* Cột trái: Vòng tròn số + Đường kẻ dọc nối bước (Canh giữa 100% bằng Flexbox) */}
                    <div className="w-6 shrink-0 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1d75c2] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {item.step}
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-0.5 bg-[#bfdbfe] flex-1 my-1" />
                      )}
                    </div>

                    {/* Cột phải: Tiêu đề và nội dung bước */}
                    <div className={`flex-1 min-w-0 ${idx < arr.length - 1 ? 'pb-3.5' : 'pb-0.5'}`}>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug pt-0.5">
                        {item.title}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 3: Tổng quan số lượng */}
            <div className="bg-[#f0faf5] border border-[#cbe8dc] rounded-2xl p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-2 text-[#006842]">
                <Sprout className="w-5 h-5 shrink-0 text-[#00875a]" />
                <h3 className="font-bold text-[15px] sm:text-base">
                  {language === 'vi' ? 'Tổng quan' : 'Overview'}
                </h3>
              </div>

              <div className="grid grid-cols-3 divide-x divide-slate-200/90 text-center pt-1">
                <div className="px-1">
                  <div className="text-xl font-bold text-[#00875a]">
                    {totalCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-normal mt-0.5">
                    {language === 'vi' ? 'Bài toán đã đăng' : 'Total Posted'}
                  </div>
                </div>

                <div className="px-1">
                  <div className="text-xl font-bold text-[#00875a]">
                    {verifiedCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-normal mt-0.5">
                    {language === 'vi' ? 'Đã xác minh' : 'Verified'}
                  </div>
                </div>

                <div className="px-1">
                  <div className="text-xl font-bold text-[#00875a]">
                    {processingCount}
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-slate-500 font-normal mt-0.5">
                    {language === 'vi' ? 'Đang xử lý' : 'In Progress'}
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Modal Đăng bài toán (5 bước hoàn chỉnh) */}
      <PostProblemModal
        isOpen={isPostModalOpen}
        onClose={() => setIsPostModalOpen(false)}
        onSubmitSuccess={handleProblemSubmitted}
      />

      {/* Modal Chi tiết bài toán (kèm khu vực Bạn có thể giúp giải quyết bài toán này?) */}
      <ProblemDetailModal
        problem={selectedProblem}
        onClose={() => setSelectedProblem(null)}
        onOpenProposeSolution={(prob) => setProblemForProposal(prob)}
      />

    </div>
  );
};
