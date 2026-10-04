import React, { useState } from 'react';
import { 
  X, 
  Send, 
  CheckCircle2, 
  GraduationCap, 
  FlaskConical, 
  Building2, 
  Clock, 
  FileText,
  AlertCircle
} from 'lucide-react';
import { ProblemItem } from '../../types/livingLab';

interface ParticipateModalProps {
  isOpen: boolean;
  onClose: () => void;
  problem: ProblemItem | null;
  onProposalSubmitted?: (data: any) => void;
}

export const ParticipateModal: React.FC<ParticipateModalProps> = ({
  isOpen,
  onClose,
  problem,
  onProposalSubmitted
}) => {
  if (!isOpen || !problem) return null;

  const [role, setRole] = useState<'student' | 'expert' | 'business' | 'faculty'>('student');
  const [selectedSkills, setSelectedSkills] = useState<string[]>(['CNTT', 'Marketing']);
  const [contribution, setContribution] = useState('');
  const [availability, setAvailability] = useState('5–10 giờ/tuần');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [organization, setOrganization] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const skillOptions = [
    'CNTT',
    'Marketing',
    'Thiết kế',
    'Truyền thông',
    'Phân tích dữ liệu',
    'Nông nghiệp',
    'Y tế',
    'Quản trị dự án'
  ];

  const handleToggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter(s => s !== skill));
    } else {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !contribution.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setErrorMessage('');
    
    const proposalData = {
      problemId: problem.id,
      problemTitle: problem.title,
      role,
      skills: selectedSkills,
      contribution,
      availability,
      fullName,
      email,
      phone,
      organization,
      submittedAt: new Date().toLocaleDateString('vi-VN')
    };

    onProposalSubmitted?.(proposalData);
    setIsSubmitted(true);
  };

  const handleResetAndClose = () => {
    setIsSubmitted(false);
    setContribution('');
    setFullName('');
    setEmail('');
    setPhone('');
    setOrganization('');
    setErrorMessage('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative my-auto space-y-6">
        
        {/* Close Button */}
        <button
          onClick={handleResetAndClose}
          className="absolute top-5 right-5 p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {isSubmitted ? (
          /* ================= SUCCESS STATE ================= */
          <div className="text-center py-6 space-y-4 animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-9 h-9 stroke-[2.2]" />
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                Gửi đề xuất thành công!
              </h3>
              <p className="text-sm font-semibold text-[#00875a]">
                Bạn đã đăng ký tham gia bài toán: "{problem.title}"
              </p>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/80 text-xs sm:text-[13px] text-slate-600 leading-relaxed max-w-md mx-auto space-y-2 text-left">
                <p>
                  ✓ <strong>Đề xuất của bạn đã được gửi đến Ban quản lý Làng SV để xem xét.</strong>
                </p>
                <p>
                  Để đảm bảo chất lượng và tính phù hợp, <em>Ban quản lý sẽ thẩm định và trực tiếp liên hệ kết nối bạn với nhóm dự án</em> (không tự động ghép người).
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={handleResetAndClose}
                className="bg-[#00875a] hover:bg-[#00734c] text-white px-6 py-2.5 rounded-xl text-xs font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Hoàn tất &amp; Đóng
              </button>
            </div>
          </div>
        ) : (
          /* ================= FORM STATE ================= */
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Header */}
            <div className="space-y-1.5 border-b border-slate-100 pb-4 pr-6">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold text-[#00875a] bg-emerald-50 px-2.5 py-0.5 rounded-full">
                <span>{problem.fieldEmoji}</span>
                <span>{problem.fieldLabel}</span>
                <span>•</span>
                <span>MÃ: {problem.code}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                ĐỀ XUẤT THAM GIA
              </h3>
              <p className="text-xs sm:text-[13px] text-slate-600 font-medium">
                Bạn muốn tham gia giải quyết: <span className="text-[#00875a] font-bold">"{problem.title}"</span>
              </p>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* 1. VAI TRÒ */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                1. Vai trò của bạn <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { id: 'student', label: 'Sinh viên', icon: GraduationCap },
                  { id: 'expert', label: 'Chuyên gia', icon: FlaskConical },
                  { id: 'business', label: 'Doanh nghiệp', icon: Building2 },
                  { id: 'faculty', label: 'Giảng viên', icon: FileText },
                ].map((item) => {
                  const isSelected = role === item.id;
                  const Icon = item.icon;
                  return (
                    <label
                      key={item.id}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'border-[#00875a] bg-emerald-50/70 text-[#00875a] shadow-2xs font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={item.id}
                        checked={isSelected}
                        onChange={() => setRole(item.id as any)}
                        className="sr-only"
                      />
                      <Icon className="w-4 h-4 mb-1" />
                      <span className="text-xs">{item.label}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 2. KỸ NĂNG */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                2. Kỹ năng bạn có thể đóng góp
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {skillOptions.map((skill) => {
                  const isChecked = selectedSkills.includes(skill);
                  return (
                    <label
                      key={skill}
                      className={`flex items-center gap-2 p-2 rounded-xl border text-xs cursor-pointer transition-all ${
                        isChecked
                          ? 'border-emerald-300 bg-emerald-50/50 text-[#00875a] font-bold'
                          : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleSkill(skill)}
                        className="rounded text-[#00875a] focus:ring-emerald-500 w-3.5 h-3.5"
                      />
                      <span className="truncate">{skill}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* 3. BẠN CÓ THỂ ĐÓNG GÓP */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                3. Bạn có thể đóng góp cụ thể gì? <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={3}
                value={contribution}
                onChange={(e) => setContribution(e.target.value)}
                placeholder="Ví dụ: Tôi có thể hỗ trợ xây dựng website, hệ thống quảng bá sản phẩm, chụp ảnh nông sản..."
                className="w-full p-3 rounded-xl border border-slate-200 text-xs sm:text-[13px] text-slate-800 placeholder-slate-400 focus:outline-hidden focus:border-[#00875a] focus:ring-2 focus:ring-emerald-100 resize-none"
              />
            </div>

            {/* 4. THỜI GIAN CÓ THỂ THAM GIA */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#00875a]" />
                <span>Thời gian có thể tham gia</span>
              </label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-200 text-xs sm:text-[13px] text-slate-800 font-semibold focus:outline-hidden focus:border-[#00875a] cursor-pointer bg-white"
              >
                <option value="5–10 giờ/tuần">5–10 giờ/tuần (Bán thời gian linh hoạt)</option>
                <option value="10–15 giờ/tuần">10–15 giờ/tuần (Đồng hành thường xuyên)</option>
                <option value="> 15 giờ/tuần">&gt; 15 giờ/tuần (Toàn tâm tham gia dự án)</option>
              </select>
            </div>

            {/* 5. THÔNG TIN LIÊN HỆ */}
            <div className="space-y-2 pt-1 border-t border-slate-100">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                Thông tin người đề xuất
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Họ và tên *"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                />
                <input
                  type="email"
                  placeholder="Email liên hệ *"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                />
                <input
                  type="tel"
                  placeholder="Số điện thoại / Zalo *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                />
                <input
                  type="text"
                  placeholder="Trường / Đơn vị công tác"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  className="p-2.5 rounded-xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-3 px-5 rounded-2xl text-xs sm:text-sm font-bold shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>GỬI ĐỀ XUẤT</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center mt-2">
                Ban quản lý sẽ thẩm định và phản hồi trong vòng 48h làm việc.
              </p>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
