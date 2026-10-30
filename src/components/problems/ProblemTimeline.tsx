import React, { useState } from 'react';
import { RealProblem, ProblemStatus, ProblemProgressUpdate } from '../../types';
import { useLanguage } from '../../context/LanguageContext';
import {
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  HandHeart,
  TrendingUp,
  Award,
  AlertCircle,
  FileText,
  Image as ImageIcon,
  UserCheck,
  Calendar,
  Sparkles,
  ChevronDown,
  ChevronUp,
  XCircle,
  ExternalLink
} from 'lucide-react';

interface ProblemTimelineProps {
  problem: RealProblem;
  onOpenFeedback?: () => void;
  hasFeedbackAlready?: boolean;
}

export const ProblemTimeline: React.FC<ProblemTimelineProps> = ({
  problem,
  onOpenFeedback,
  hasFeedbackAlready = false
}) => {
  const { language } = useLanguage();
  const [showHistory, setShowHistory] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // 6 quy trình nghiệp vụ chuẩn
  const STAGES: { key: ProblemStatus; titleVi: string; titleEn: string; descVi: string; descEn: string; icon: any }[] = [
    {
      key: 'pending',
      titleVi: 'Chờ xác minh',
      titleEn: 'Pending',
      descVi: 'Tiếp nhận bài toán và thẩm định thông tin thực tế',
      descEn: 'Receiving problem and verifying on-site information',
      icon: Clock
    },
    {
      key: 'verified',
      titleVi: 'Đã xác minh',
      titleEn: 'Verified',
      descVi: 'Được BQL Làng SV duyệt đủ điều kiện triển khai',
      descEn: 'Approved by Campus Board for project implementation',
      icon: ShieldCheck
    },
    {
      key: 'seeking_support',
      titleVi: 'Kết nối nguồn lực',
      titleEn: 'Connecting',
      descVi: 'Mời gọi sinh viên, chuyên gia và doanh nghiệp đồng hành',
      descEn: 'Connecting students, experts and enterprise partners',
      icon: HandHeart
    },
    {
      key: 'in_progress',
      titleVi: 'Đang triển khai',
      titleEn: 'In Progress',
      descVi: 'Nhóm thực hiện khảo sát và áp dụng giải pháp tại địa bàn',
      descEn: 'Execution team conducting field survey and piloting solution',
      icon: TrendingUp
    },
    {
      key: 'evaluating',
      titleVi: 'Chờ đánh giá',
      titleEn: 'Evaluating',
      descVi: 'Nghiệm thu mô hình và báo cáo kết quả thực tế',
      descEn: 'Acceptance testing and field evaluation report',
      icon: Award
    },
    {
      key: 'completed',
      titleVi: 'Đã hoàn thành',
      titleEn: 'Completed',
      descVi: 'Chuyển giao cho người dân & mở tiếp nhận Feedback',
      descEn: 'Handed over to community and citizen feedback enabled',
      icon: CheckCircle2
    }
  ];

  const stageOrder: Record<string, number> = {
    pending: 1,
    verified: 2,
    seeking_support: 3,
    in_progress: 4,
    evaluating: 5,
    completed: 6,
    rejected: 0,
    cancelled: 0
  };

  const currentStageIndex = stageOrder[problem.status] || 1;
  const isSpecialStatus = problem.status === 'rejected' || problem.status === 'cancelled';

  // Lọc các cập nhật tiến độ công khai đã duyệt (hoặc tất cả nếu do Admin)
  const approvedUpdates = (problem.progressUpdates || []).filter(u => u.isApproved !== false);
  const percent = problem.progressPercentage ?? (currentStageIndex === 6 ? 100 : Math.round(((currentStageIndex - 1) / 5) * 100));

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 sm:p-6 space-y-6">
      
      {/* Header Tiến độ & Trạng thái */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black tracking-wider uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
              {problem.code || 'BM-XXX'}
            </span>
            <h3 className="text-base sm:text-lg font-bold text-slate-900">
              {language === 'vi' ? 'Tiến độ giải quyết bài toán' : 'Solution Progress & Milestones'}
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            {language === 'vi' 
              ? 'Quy trình chuẩn hóa 6 bước từ tiếp nhận đến nghiệm thu & chuyển giao cho người dân'
              : 'Standardized 6-step lifecycle from intake to completion & citizen feedback'}
          </p>
        </div>

        {/* Assigned team tag */}
        {problem.assignedTeam && (
          <div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-xl text-xs font-semibold text-slate-700">
            <UserCheck className="w-4 h-4 text-emerald-600" />
            <span>{problem.assignedTeam}</span>
          </div>
        )}
      </div>

      {/* Progress Bar & Percentage indicator */}
      {!isSpecialStatus && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs font-bold">
            <span className="text-slate-600">
              {language === 'vi' ? 'Mức độ hoàn thành tổng thể:' : 'Overall Completion:'}
            </span>
            <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {percent}%
            </span>
          </div>
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
            <div 
              className="bg-gradient-to-r from-emerald-500 to-[#00875a] h-full rounded-full transition-all duration-700"
              style={{ width: `${percent}%` }}
            />
          </div>
        </div>
      )}

      {/* Special rejected alert */}
      {isSpecialStatus && (
        <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex items-start gap-3">
          <XCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="text-xs">
            <p className="font-bold text-rose-900">
              {problem.status === 'rejected' ? 'Bài toán đã bị từ chối tiếp nhận' : 'Bài toán tạm dừng triển khai'}
            </p>
            {problem.rejectionReason && (
              <p className="text-rose-700 mt-1 font-medium">Lý do: {problem.rejectionReason}</p>
            )}
          </div>
        </div>
      )}

      {/* 6-Stage Visual Timeline Cards */}
      {!isSpecialStatus && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {STAGES.map((stg, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum < currentStageIndex || (stepNum === 6 && currentStageIndex === 6);
            const isCurrent = stepNum === currentStageIndex && currentStageIndex !== 6;
            const isUpcoming = stepNum > currentStageIndex;
            const Icon = stg.icon;

            let cardStyle = 'bg-slate-50 border-slate-200 text-slate-400';
            let badgeStyle = 'bg-slate-200 text-slate-500';

            if (isCompleted) {
              cardStyle = 'bg-emerald-50/70 border-emerald-300 text-emerald-900 shadow-2xs';
              badgeStyle = 'bg-emerald-600 text-white';
            } else if (isCurrent) {
              cardStyle = 'bg-amber-50 border-amber-300 text-amber-950 shadow-sm ring-2 ring-amber-400/40';
              badgeStyle = 'bg-amber-500 text-white animate-pulse';
            }

            return (
              <div 
                key={stg.key}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${cardStyle}`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center ${badgeStyle}`}>
                      {isCompleted ? '✓' : stepNum}
                    </span>
                    <Icon className={`w-4 h-4 ${isCompleted ? 'text-emerald-700' : isCurrent ? 'text-amber-600' : 'text-slate-400'}`} />
                  </div>
                  <p className="text-xs font-bold leading-tight line-clamp-1">
                    {language === 'vi' ? stg.titleVi : stg.titleEn}
                  </p>
                  <p className="text-[10px] text-slate-500 leading-snug mt-1 line-clamp-2">
                    {language === 'vi' ? stg.descVi : stg.descEn}
                  </p>
                </div>

                <div className="mt-2 pt-1 border-t border-slate-200/50 text-[10px] font-semibold">
                  {isCompleted && <span className="text-emerald-700">Đã qua</span>}
                  {isCurrent && <span className="text-amber-700 font-bold">Đang thực hiện</span>}
                  {isUpcoming && <span className="text-slate-400">Giai đoạn tới</span>}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Completion Highlight & Feedback Callout */}
      {problem.status === 'completed' && (
        <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-300/80 shadow-sm space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  {language === 'vi' ? 'Bài toán đã được giải quyết thành công!' : 'Problem Successfully Resolved!'}
                </h4>
                <p className="text-xs text-slate-600">
                  {language === 'vi' 
                    ? `Hoàn tất ngày ${problem.completionDate || 'gần đây'} và đã được Admin nghiệm thu.` 
                    : `Completed on ${problem.completionDate || 'recently'} and approved.`}
                </p>
              </div>
            </div>

            {/* Nút Đánh giá Feedback */}
            {onOpenFeedback && (
              <button
                onClick={onOpenFeedback}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer shrink-0"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{hasFeedbackAlready ? 'Xem phản hồi đã gửi' : 'Đánh giá kết quả (Feedback)'}</span>
              </button>
            )}
          </div>

          {problem.completionSummary && (
            <div className="p-3 bg-white/80 rounded-xl border border-emerald-200 text-xs text-slate-700 font-medium leading-relaxed">
              <span className="font-bold text-emerald-800">Kết quả thực tế: </span>
              {problem.completionSummary}
            </div>
          )}
        </div>
      )}

      {/* Danh sách các mốc tiến độ cụ thể & Minh chứng */}
      <div className="space-y-3">
        <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
          <Calendar className="w-4 h-4 text-emerald-600" />
          <span>
            {language === 'vi' ? 'Nhật ký các mốc công việc đã thực hiện' : 'Work Milestone Log & Evidence'}
          </span>
          <span className="text-[11px] text-slate-500 font-normal">
            ({approvedUpdates.length} mốc ghi nhận)
          </span>
        </h4>

        {approvedUpdates.length === 0 ? (
          <div className="p-6 text-center rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-xs">
            Chưa có cập nhật công việc chi tiết từ nhóm thực hiện. Tiến độ sẽ được hiển thị khi nhóm gửi báo cáo.
          </div>
        ) : (
          <div className="space-y-3">
            {approvedUpdates.map((upd, idx) => (
              <div 
                key={upd.id || idx}
                className="p-3.5 sm:p-4 rounded-xl border border-slate-200 hover:border-emerald-300 bg-white transition-all shadow-2xs flex flex-col sm:flex-row sm:items-start justify-between gap-3"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900">
                      {upd.title}
                    </h5>
                    <span className="text-[11px] text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded-md">
                      {upd.date}
                    </span>
                    {upd.isApproved && (
                      <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-bold border border-emerald-200">
                        Admin đã xác nhận
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-slate-600 font-normal leading-relaxed pl-7">
                    {upd.description}
                  </p>

                  {/* Minh chứng ảnh / file đính kèm */}
                  {(upd.evidenceImages?.length || upd.evidenceDocName) && (
                    <div className="pl-7 pt-2 flex items-center gap-2 flex-wrap">
                      {upd.evidenceImages?.map((img, imgIdx) => (
                        <div 
                          key={imgIdx} 
                          onClick={() => setSelectedImage(img)}
                          className="relative group cursor-pointer w-14 h-14 rounded-lg overflow-hidden border border-slate-200 hover:border-emerald-500 transition-all shadow-2xs"
                        >
                          <img src={img} alt="Minh chứng" className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                          <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                            <ImageIcon className="w-3.5 h-3.5" />
                          </div>
                        </div>
                      ))}
                      {upd.evidenceDocName && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 text-slate-700 text-xs font-medium border border-slate-200">
                          <FileText className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{upd.evidenceDocName}</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="text-[10px] text-slate-400 text-right shrink-0">
                  Ghi nhận bởi: <span className="font-semibold text-slate-600">{upd.submittedBy}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lịch sử thay đổi trạng thái (Collapsible) */}
      {problem.statusLogs && problem.statusLogs.length > 0 && (
        <div className="pt-2 border-t border-slate-100">
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="w-full py-2 flex items-center justify-between text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            <span>Lịch sử chuyển đổi trạng thái hệ thống ({problem.statusLogs.length})</span>
            {showHistory ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showHistory && (
            <div className="mt-2 space-y-2 pl-2 border-l-2 border-slate-200 animate-in fade-in">
              {problem.statusLogs.map((log, lIdx) => (
                <div key={log.id || lIdx} className="text-xs text-slate-600 space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-800">{log.status}</span>
                    <span className="text-[10px] text-slate-400 font-mono">{log.updatedAt}</span>
                    <span className="text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 font-medium">bởi {log.updatedBy}</span>
                  </div>
                  {log.note && <p className="text-slate-500 italic text-[11px]">{log.note}</p>}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Lightbox xem ảnh minh chứng phóng to */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs animate-in fade-in"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-3xl w-full max-h-[85vh] flex flex-col items-center">
            <img 
              src={selectedImage} 
              alt="Minh chứng phóng to" 
              className="max-h-[80vh] w-auto max-w-full rounded-2xl shadow-2xl object-contain"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="mt-3 px-4 py-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Đóng xem ảnh
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
