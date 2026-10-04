import React from 'react';
import { 
  ArrowLeft, 
  MapPin, 
  CheckCircle2, 
  Sparkles, 
  Rocket, 
  Users, 
  GraduationCap, 
  FlaskConical, 
  Building2, 
  Palette, 
  Code2, 
  Megaphone, 
  ShieldCheck, 
  Clock, 
  Eye,
  FileCheck2,
  FolderKanban
} from 'lucide-react';
import { ProblemItem } from '../../types/livingLab';

interface ProblemDetailPageProps {
  problem: ProblemItem;
  onBack: () => void;
  onOpenParticipateModal: () => void;
  onNavigateToProject?: (projectId: string) => void;
}

export const ProblemDetailPage: React.FC<ProblemDetailPageProps> = ({
  problem,
  onBack,
  onOpenParticipateModal,
  onNavigateToProject
}) => {
  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* Top Breadcrumb & Back bar */}
      <div className="bg-white border-b border-slate-200/90 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#00875a] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại Bài toán</span>
          </button>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>Mã bài toán:</span>
            <span className="font-mono font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
              {problem.code}
            </span>
          </div>
        </div>
      </div>

      {/* Main 2-Column Content */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ===================== LEFT COLUMN: PROBLEM DETAILS ===================== */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-9 shadow-xs space-y-7">
            
            {/* Field Badge & Verified Badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs font-black px-3.5 py-1.5 rounded-full bg-slate-100 text-slate-800">
                <span className="text-base">{problem.fieldEmoji}</span>
                <span>{problem.fieldLabel}</span>
              </span>

              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                <CheckCircle2 className="w-4 h-4 text-[#00875a]" />
                <span>✓ Bài toán đã xác minh</span>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight tracking-tight">
                {problem.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-1.5 font-semibold">
                  <MapPin className="w-4 h-4 text-[#00875a]" />
                  <span>{problem.location}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>Xác minh ngày: {problem.verifiedDate}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Eye className="w-3.5 h-3.5 text-slate-400" />
                  <span>{problem.views} lượt xem</span>
                </div>
              </div>
            </div>

            {/* Status Notification Banner */}
            <div className="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200/80 flex items-start gap-3 text-xs sm:text-[13px] text-emerald-950">
              <ShieldCheck className="w-5 h-5 text-[#00875a] flex-shrink-0 mt-0.5" />
              <div className="space-y-0.5 leading-relaxed">
                <span className="font-bold">Đã thẩm định tính xác thực bởi Ban quản lý Làng SV:</span> Bài toán xuất phát từ nhu cầu thực tiễn của {problem.proposerName} ({problem.proposerType}), đã được khảo sát thực địa và sẵn sàng kết nối nhóm giải pháp.
              </div>
            </div>

            {/* SECTION 1: VẤN ĐỀ */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#00875a]" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  VẤN ĐỀ
                </h3>
              </div>
              <p className="text-sm sm:text-[15px] text-slate-700 leading-relaxed bg-[#F7FAF8] p-4 sm:p-5 rounded-2xl border border-slate-100 font-medium">
                "{problem.problemDescription}"
              </p>
            </div>

            {/* SECTION 2: NGUYÊN NHÂN */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  NGUYÊN NHÂN CỐT LÕI
                </h3>
              </div>
              <ul className="space-y-2.5 pt-1">
                {problem.causes.map((cause, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-2 h-2 rounded-full bg-amber-500 mt-2 flex-shrink-0" />
                    <span>{cause}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* SECTION 3: MỤC TIÊU */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 border-b border-slate-100 pb-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                <h3 className="text-base sm:text-lg font-black text-slate-900 uppercase tracking-wide">
                  MỤC TIÊU CẦN ĐẠT ĐƯỢC
                </h3>
              </div>
              <div className="p-4 sm:p-5 bg-sky-50/60 rounded-2xl border border-sky-100 text-xs sm:text-sm text-sky-950 leading-relaxed font-semibold">
                "{problem.objectives}"
              </div>
            </div>

            {/* SECTION 4: TÁC ĐỘNG KỲ VỌNG */}
            {problem.impactExpected && (
              <div className="space-y-2 pt-1">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wide">
                  Tác động kỳ vọng đối với Bình Mỹ:
                </div>
                <div className="text-xs sm:text-sm text-slate-700 font-medium bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {problem.impactExpected}
                </div>
              </div>
            )}

            {/* Related Project link if in progress */}
            {problem.relatedProjectId && (
              <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 gap-3">
                <div className="flex items-center gap-2.5">
                  <FolderKanban className="w-5 h-5 text-[#00875a]" />
                  <div>
                    <div className="text-xs font-bold text-slate-900">
                      Bài toán này đã hình thành nhóm dự án triển khai
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Nhóm sinh viên &amp; chuyên gia đang thực hiện tại Bình Mỹ
                    </div>
                  </div>
                </div>
                {onNavigateToProject && (
                  <button
                    onClick={() => onNavigateToProject(problem.relatedProjectId!)}
                    className="text-xs font-bold text-[#00875a] hover:underline flex items-center gap-1 self-start sm:self-auto cursor-pointer"
                  >
                    <span>Xem dự án đang triển khai →</span>
                  </button>
                )}
              </div>
            )}

          </div>

          {/* ===================== RIGHT COLUMN: STICKY RESOURCE CARD ===================== */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 shadow-sm space-y-6">
              
              <div className="space-y-1">
                <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  Nhu cầu kết nối
                </div>
                <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <span>ĐANG CẦN NGUỒN LỰC</span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Làng SV đang kêu gọi các nhân tố có chuyên môn tham gia hình thành nhóm giải pháp:
                </p>
              </div>

              {/* Resource Badges Grid */}
              <div className="space-y-2.5">
                {[
                  { label: 'Sinh viên', desc: 'Thực chiến đề tài & đồ án thực địa', icon: GraduationCap, color: 'text-sky-600 bg-sky-50' },
                  { label: 'Marketing', desc: 'Xây dựng kênh quảng bá & nội dung số', icon: Megaphone, color: 'text-amber-600 bg-amber-50' },
                  { label: 'CNTT', desc: 'Phát triển website / ứng dụng / IoT', icon: Code2, color: 'text-purple-600 bg-purple-50' },
                  { label: 'Thiết kế', desc: 'Bao bì, nhận diện thương hiệu, UI/UX', icon: Palette, color: 'text-rose-600 bg-rose-50' },
                  { label: 'Chuyên gia', desc: 'Cố vấn chuyên môn & chuyển giao kỹ thuật', icon: FlaskConical, color: 'text-emerald-600 bg-emerald-50' },
                ].map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-2.5 rounded-2xl border border-slate-100 hover:border-slate-200 transition-colors"
                    >
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${item.color}`}>
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-slate-800 leading-tight">
                          {item.label}
                        </div>
                        <div className="text-[10.5px] text-slate-400 truncate">
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Big CTA Button: ĐỀ XUẤT THAM GIA */}
              <div className="pt-2 space-y-2">
                <button
                  onClick={onOpenParticipateModal}
                  className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-3.5 px-5 rounded-2xl text-xs sm:text-sm font-black shadow-md hover:shadow-lg flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer group"
                >
                  <Rocket className="w-4 h-4 group-hover:-translate-y-0.5 transition-transform" />
                  <span>🚀 ĐỀ XUẤT THAM GIA</span>
                </button>

                <p className="text-[11px] text-slate-400 text-center leading-relaxed">
                  Đề xuất của bạn sẽ được gửi tới Ban quản lý Làng SV để thẩm định và liên hệ ghép nhóm.
                </p>
              </div>

              {/* Protocol Note */}
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="font-bold text-slate-700">Quy trình ghép nhóm:</div>
                <div className="text-[10.5px] leading-relaxed">
                  1. Tiếp nhận đề xuất → 2. Phỏng vấn năng lực → 3. Ban quản lý thành lập nhóm dự án → 4. Khảo sát thực địa cùng nông hộ.
                </div>
              </div>

            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
