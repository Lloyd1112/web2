import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem } from '../../types';
import { AdminDataService, AdminProposal } from '../../services/adminDataService';
import { X, Send, CheckCircle2, User, Phone, Mail, FileText, Sparkles, Building2 } from 'lucide-react';

interface ProposeSolutionModalProps {
  problem: RealProblem | null;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

export const ProposeSolutionModal: React.FC<ProposeSolutionModalProps> = ({
  problem,
  onClose,
  onSubmitSuccess
}) => {
  const { language } = useLanguage();
  const [proposerName, setProposerName] = useState('');
  const [role, setRole] = useState('Sinh viên');
  const [organization, setOrganization] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [proposalContent, setProposalContent] = useState('');
  const [resources, setResources] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const roles = [
    { key: 'Sinh viên', labelVi: 'Sinh viên', labelEn: 'Student' },
    { key: 'Giảng viên / Nhà khoa học', labelVi: 'Giảng viên / Nhà khoa học', labelEn: 'Lecturer / Researcher' },
    { key: 'Bác sĩ / Chuyên gia y tế', labelVi: 'Bác sĩ / Chuyên gia y tế', labelEn: 'Doctor / Medical Expert' },
    { key: 'Doanh nghiệp / HTX', labelVi: 'Doanh nghiệp / HTX', labelEn: 'Enterprise / Cooperative' },
    { key: 'Tình nguyện viên', labelVi: 'Tình nguyện viên', labelEn: 'Volunteer' },
    { key: 'Khác', labelVi: 'Khác', labelEn: 'Other' }
  ];

  if (!problem) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!proposerName.trim()) {
      newErrors.proposerName = language === 'vi' ? 'Vui lòng nhập họ và tên của bạn' : 'Please enter your full name';
    }
    if (!phone.trim()) {
      newErrors.phone = language === 'vi' ? 'Vui lòng nhập số điện thoại liên hệ' : 'Please enter your contact phone number';
    } else if (!/^[0-9+\s\-()]{9,15}$/.test(phone.trim())) {
      newErrors.phone = language === 'vi' ? 'Số điện thoại không hợp lệ' : 'Invalid phone number format';
    }
    if (!proposalContent.trim()) {
      newErrors.proposalContent = language === 'vi' ? 'Vui lòng mô tả hướng giải quyết hoặc hỗ trợ của bạn' : 'Please describe your proposed solution or support';
    } else if (proposalContent.trim().length < 20) {
      newErrors.proposalContent = language === 'vi' ? 'Nội dung đề xuất cần ít nhất 20 ký tự' : 'Proposal details must be at least 20 characters';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const probCode = problem.id.startsWith('prob-')
      ? `BM-${problem.id.replace('prob-', '').padStart(3, '0')}`
      : 'BM-001';

    // Lưu proposal vào hệ thống tập trung của toàn website
    const newProposal: AdminProposal = {
      id: `prop-${Date.now()}`,
      problemId: problem.id,
      problemCode: probCode,
      problemTitle: (language === 'en' && problem.titleEn) ? problem.titleEn : problem.title,
      role: role as any,
      fullName: proposerName.trim(),
      organization: organization.trim() || undefined,
      phone: phone.trim(),
      email: email.trim() || undefined,
      selectedFields: [problem.categoryDetail || problem.category],
      solutionContent: proposalContent.trim(),
      availability: resources.trim() || 'Tư vấn / hỗ trợ theo từng dự án',
      status: 'new',
      createdAt: new Date().toLocaleDateString('vi-VN'),
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    AdminDataService.saveProposal(newProposal);

    setSubmitted(true);
    setTimeout(() => {
      onSubmitSuccess();
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base leading-snug">
                {language === 'vi' ? 'Đề xuất tham gia giải quyết bài toán' : 'Propose Solution to Challenge'}
              </h3>
              <p className="text-xs text-emerald-100 line-clamp-1 max-w-md">
                {(language === 'en' && problem.titleEn) ? problem.titleEn : problem.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {submitted ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">
                {language === 'vi' ? 'Đề xuất đã được gửi thành công!' : 'Proposal Submitted Successfully!'}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                {language === 'vi' 
                  ? 'Ban quản lý Làng SV Bình Mỹ đã ghi nhận đề xuất của bạn và sẽ chủ động kết nối bạn với chủ bài toán cùng nhóm chuyên gia phụ trách trong vòng 24 - 48 giờ làm việc.'
                  : 'Binh My Student Village Management has received your proposal and will coordinate between you and the challenge owner within 24-48 business hours.'}
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
                <span className="font-bold shrink-0">{language === 'vi' ? 'Lưu ý:' : 'Note:'}</span>
                <span>
                  {language === 'vi' 
                    ? 'Thông tin đề xuất của bạn sẽ được gửi tới Ban quản lý Làng SV để thẩm định và tổ chức kết nối hỗ trợ trực tiếp cho chủ bài toán.'
                    : 'Your proposal will be submitted to the Student Village Management Board for review and direct coordination with the challenge owner.'}
                </span>
              </div>

              {/* Vai trò */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  {language === 'vi' ? 'Bạn tham gia với tư cách là' : 'You are participating as'} <span className="text-rose-500">*</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {roles.map((r) => (
                    <button
                      key={r.key}
                      type="button"
                      onClick={() => setRole(r.key)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold text-center border transition-all ${
                        role === r.key
                          ? 'bg-emerald-600 text-white border-emerald-600 shadow-2xs font-bold'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {language === 'vi' ? r.labelVi : r.labelEn}
                    </button>
                  ))}
                </div>
              </div>

              {/* Tên & Đơn vị */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Họ và tên' : 'Full Name'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={proposerName}
                      onChange={(e) => setProposerName(e.target.value)}
                      placeholder={language === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${errors.proposerName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'} focus:outline-emerald-500`}
                    />
                  </div>
                  {errors.proposerName && <p className="text-[11px] text-rose-500 mt-0.5">{errors.proposerName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Trường / Đơn vị công tác' : 'University / Organization'}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      value={organization}
                      onChange={(e) => setOrganization(e.target.value)}
                      placeholder={language === 'vi' ? 'ĐH HUTECH / Bệnh viện...' : 'University / Hospital / Company...'}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* SĐT & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Số điện thoại liên hệ' : 'Contact Phone Number'} <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={language === 'vi' ? '0912 345 678' : '+84 912 345 678'}
                      className={`w-full pl-9 pr-3 py-2 text-xs rounded-xl border ${errors.phone ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'} focus:outline-emerald-500`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-500 mt-0.5">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Email' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="email@example.com"
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500"
                    />
                  </div>
                </div>
              </div>

              {/* Nội dung đề xuất */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'vi' ? 'Mô tả hướng giải quyết / Đề xuất hỗ trợ' : 'Proposed Solution / Support Plan'} <span className="text-rose-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={proposalContent}
                  onChange={(e) => setProposalContent(e.target.value)}
                  placeholder={language === 'vi' ? 'Ví dụ: Nhóm sinh viên Công nghệ sinh học chúng tôi có thể xuống khảo sát thực tế và chuyển giao công thức nấm vi sinh đối kháng Trichoderma phối trộn bản địa...' : 'E.g., Our biotech student team can conduct an on-site field survey and provide biological microbial solutions...'}
                  className={`w-full p-3 text-xs rounded-xl border ${errors.proposalContent ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'} focus:outline-emerald-500 leading-relaxed`}
                />
                {errors.proposalContent && <p className="text-[11px] text-rose-500 mt-0.5">{errors.proposalContent}</p>}
              </div>

              {/* Nguồn lực có thể đóng góp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  {language === 'vi' ? 'Nguồn lực hoặc phương tiện có thể mang lại' : 'Available Resources or Equipment'}
                </label>
                <input
                  type="text"
                  value={resources}
                  onChange={(e) => setResources(e.target.value)}
                  placeholder={language === 'vi' ? 'Nhân lực tình nguyện, máy đo chỉ số, tài liệu quy trình, hạt giống/chế phẩm thử nghiệm...' : 'Volunteer personnel, test devices, guideline documents, testing inputs...'}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500"
                />
              </div>

              {/* Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors"
                >
                  {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-full text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md flex items-center gap-2 active:scale-95 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{language === 'vi' ? 'Gửi đề xuất hỗ trợ' : 'Submit Support Proposal'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
