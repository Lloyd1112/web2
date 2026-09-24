import React, { useState } from 'react';
import { X, CheckCircle2, Send, Building, User, FileText, Phone, Mail, MapPin } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface CollaborationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultType?: string;
  defaultTitle?: string;
}

export const CollaborationModal: React.FC<CollaborationModalProps> = ({
  isOpen,
  onClose,
  defaultType = 'general',
  defaultTitle = '',
}) => {
  const { language } = useLanguage();
  const [formType, setFormType] = useState<string>(defaultType);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    role: '',
    projectInterested: defaultTitle || 'Ba mô hình y tế & Living Lab',
    currentSituation: '',
    locationScale: 'Xã Bình Mỹ, Củ Chi, TP.HCM',
    beneficiaries: '',
    resources: '',
    expertNeeds: '',
    expectedTime: 'Quý 3/2025',
    notes: '',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-100">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 px-6 py-5 text-white flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">
              {formType === 'partner' && (language === 'vi' ? 'Đăng ký Trở thành Đối tác' : 'Partner Registration')}
              {formType === 'expert' && (language === 'vi' ? 'Đăng ký Chuyên gia / Bác sĩ' : 'Expert & Doctor Registration')}
              {formType === 'consulting' && (language === 'vi' ? 'Gửi Yêu cầu Tư vấn Dự án' : 'Project Consulting Request')}
              {formType === 'training' && (language === 'vi' ? 'Đăng ký Khóa học & Đào tạo' : 'Course Enrollment')}
              {formType === 'general' && (language === 'vi' ? 'Đề xuất Hợp tác Phát triển' : 'Collaboration Proposal')}
            </h3>
            <p className="text-xs text-emerald-100 mt-1">
              {language === 'vi' 
                ? 'Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ sẽ liên hệ lại trong 24 giờ làm việc.'
                : 'We will get back to you within 24 business hours.'}
            </p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-xl font-bold text-slate-800">
                {language === 'vi' ? 'Gửi đề xuất thành công!' : 'Submitted Successfully!'}
              </h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                {language === 'vi'
                  ? 'Cảm ơn quý đối tác và chuyên gia đã quan tâm đồng hành cùng Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Ban điều phối sẽ liên hệ sớm nhất.'
                  : 'Thank you for your interest in collaborating with Binh My Innovative Student Village. Our team will contact you shortly.'}
              </p>
              <button
                onClick={handleReset}
                className="mt-4 px-6 py-2.5 bg-emerald-600 text-white font-bold rounded-xl hover:bg-emerald-700 transition-colors shadow-md"
              >
                {language === 'vi' ? 'Đóng cửa sổ' : 'Close'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Switcher */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2 pb-2">
                {[
                  { id: 'partner', label: language === 'vi' ? 'Đối tác' : 'Partner' },
                  { id: 'expert', label: language === 'vi' ? 'Chuyên gia' : 'Expert' },
                  { id: 'consulting', label: language === 'vi' ? 'Tư vấn' : 'Consulting' },
                  { id: 'training', label: language === 'vi' ? 'Đào tạo' : 'Training' },
                  { id: 'general', label: language === 'vi' ? 'Tổng quát' : 'General' },
                ].map((t) => (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => setFormType(t.id)}
                    className={`py-2 px-2 rounded-lg text-xs font-bold text-center border transition-all ${
                      formType === t.id
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-700 shadow-xs'
                        : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Basic Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Họ và tên *' : 'Full Name *'}
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={language === 'vi' ? 'BS. Nguyễn Văn A' : 'Dr. John Doe'}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Đơn vị / Cơ quan công tác *' : 'Organization *'}
                  </label>
                  <div className="relative">
                    <Building className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="text"
                      placeholder={language === 'vi' ? 'Đại học / Bệnh viện / Doanh nghiệp' : 'Hospital / University'}
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Email liên hệ *' : 'Email Address *'}
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="email"
                      placeholder="contact@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Số điện thoại *' : 'Phone Number *'}
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      required
                      type="tel"
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-hidden"
                    />
                  </div>
                </div>
              </div>

              {/* Consulting / Project Specific Fields */}
              {formType === 'consulting' ? (
                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div className="text-xs font-bold text-emerald-700 uppercase tracking-wide">
                    {language === 'vi' ? 'Thông tin chi tiết yêu cầu tư vấn' : 'Consulting Request Details'}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'vi' ? 'Dự án quan tâm' : 'Project of Interest'}
                    </label>
                    <select
                      value={formData.projectInterested}
                      onChange={(e) => setFormData({ ...formData, projectInterested: e.target.value })}
                      className="w-full py-2 px-3 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden bg-white"
                    >
                      <option>1. Trung tâm Y tế cộng đồng và Living Lab</option>
                      <option>2. Trung tâm Chăm sóc người cao tuổi</option>
                      <option>3. Trung tâm Health and Wellness</option>
                      <option>4. HTX Vùng nguyên liệu dược liệu</option>
                      <option>5. Nông nghiệp thông minh – tuần hoàn</option>
                      <option>6. OCOP Bình Mỹ Xanh & Chuỗi giá trị</option>
                      <option>7. Du lịch nông nghiệp & Wellness Farm</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {language === 'vi' ? 'Địa điểm, quy mô dự kiến' : 'Location & Scale'}
                      </label>
                      <input
                        type="text"
                        placeholder="Vd: 5 hecta tại Bình Mỹ"
                        value={formData.locationScale}
                        onChange={(e) => setFormData({ ...formData, locationScale: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        {language === 'vi' ? 'Thời gian triển khai dự kiến' : 'Expected Timeline'}
                      </label>
                      <input
                        type="text"
                        placeholder="Vd: Quý 3/2025"
                        value={formData.expectedTime}
                        onChange={(e) => setFormData({ ...formData, expectedTime: e.target.value })}
                        className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      {language === 'vi' ? 'Hiện trạng & Vấn đề cần giải quyết' : 'Current Challenges'}
                    </label>
                    <textarea
                      rows={2}
                      placeholder={language === 'vi' ? 'Mô tả ngắn gọn nhu cầu quy hoạch, nhân lực, mô hình kinh doanh...' : 'Describe your current issues and expectations...'}
                      value={formData.currentSituation}
                      onChange={(e) => setFormData({ ...formData, currentSituation: e.target.value })}
                      className="w-full px-3 py-1.5 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    {language === 'vi' ? 'Nội dung đề xuất hợp tác / Ghi chú' : 'Proposal Details / Notes'}
                  </label>
                  <textarea
                    rows={3}
                    placeholder={language === 'vi' ? 'Chia sẻ thêm về mong muốn hợp tác nghiên cứu, đào tạo hoặc thử nghiệm tại Living Lab...' : 'Provide details regarding your proposal...'}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500 outline-hidden"
                  />
                </div>
              )}

              <div className="pt-3 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                >
                  {language === 'vi' ? 'Hủy bỏ' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <Send className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Gửi đề xuất ngay' : 'Submit Now'}</span>
                </button>
              </div>

            </form>
          )}
        </div>

      </div>
    </div>
  );
};
