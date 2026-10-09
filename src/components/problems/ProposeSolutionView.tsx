import React, { useState, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem } from '../../types';
import {
  Home,
  ChevronRight,
  FileText,
  UserCheck,
  MapPin,
  Tag,
  Check,
  User,
  Building2,
  Calendar,
  Send,
  ArrowLeft,
  Upload,
  Info,
  CheckCircle2,
  X,
  Sprout,
  HeartHandshake,
  Palmtree,
  MoreHorizontal,
  Headphones,
  Phone,
  Mail,
  Workflow,
  Sparkles,
  Leaf
} from 'lucide-react';

interface ProposeSolutionViewProps {
  problem: RealProblem;
  onBack: () => void;
  onBackToList: () => void;
  onBackToDetail: () => void;
  onSubmitSuccess: () => void;
}

export const ProposeSolutionView: React.FC<ProposeSolutionViewProps> = ({
  problem,
  onBack,
  onBackToList,
  onBackToDetail,
  onSubmitSuccess
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form states
  const [role, setRole] = useState<'Sinh viên' | 'Chuyên gia' | 'Doanh nghiệp' | 'Đơn vị hỗ trợ / Tổ chức' | 'Khác'>('Sinh viên');
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedFields, setSelectedFields] = useState<string[]>([
    'Marketing / Truyền thông',
    'Kinh doanh / Phát triển thị trường'
  ]);
  const [solutionContent, setSolutionContent] = useState('');
  const [availability, setAvailability] = useState('Tham gia thường xuyên');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Validation & Submitted state
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Helper code bài toán
  const problemCode = problem.id.startsWith('prob-')
    ? `BM-${problem.id.replace('prob-', '').padStart(3, '0')}`
    : `BM-001`;

  // Helper category
  const getCatDetails = () => {
    switch (problem.category) {
      case 'agriculture':
        return { textVi: 'Nông nghiệp', textEn: 'Agriculture', icon: Sprout };
      case 'health':
        return { textVi: 'Y tế', textEn: 'Healthcare', icon: HeartHandshake };
      case 'tourism':
        return { textVi: 'Du lịch', textEn: 'Tourism', icon: Palmtree };
      default:
        return { textVi: 'Khác', textEn: 'Other', icon: MoreHorizontal };
    }
  };

  const catDetails = getCatDetails();
  const CatIcon = catDetails.icon;

  const displayTitle = (language === 'en' && problem.titleEn) ? problem.titleEn : problem.title;
  const displayDesc = (language === 'en' && problem.descriptionEn) ? problem.descriptionEn : problem.description;
  const displayLocation = (language === 'en' && problem.locationEn) ? problem.locationEn : problem.location;
  const displayCategory = language === 'vi' ? catDetails.textVi : catDetails.textEn;
  const displayImage = problem.images && problem.images.length > 0 ? problem.images[0] : '/assets/problems/card1.jpg';

  // Toggle lĩnh vực hỗ trợ
  const handleToggleField = (fieldName: string) => {
    setSelectedFields(prev =>
      prev.includes(fieldName) ? prev.filter(f => f !== fieldName) : [...prev, fieldName]
    );
  };

  // Xử lý tệp đính kèm
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 5 * 1024 * 1024) {
        alert(language === 'vi' ? 'Dung lượng tệp tối đa là 5MB.' : 'File size must be under 5MB.');
        return;
      }
      setUploadedFile(file);
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) {
      newErrors.fullName = language === 'vi' ? 'Vui lòng nhập họ và tên của bạn' : 'Please enter your full name';
    }
    if (!phone.trim()) {
      newErrors.phone = language === 'vi' ? 'Vui lòng nhập số điện thoại' : 'Please enter your phone number';
    } else if (!/^[0-9+\s\-()]{9,15}$/.test(phone.trim())) {
      newErrors.phone = language === 'vi' ? 'Số điện thoại không hợp lệ' : 'Invalid phone number';
    }
    if (selectedFields.length === 0) {
      newErrors.selectedFields = language === 'vi' ? 'Vui lòng chọn ít nhất một lĩnh vực có thể hỗ trợ' : 'Please select at least one support area';
    }
    if (!solutionContent.trim()) {
      newErrors.solutionContent = language === 'vi' ? 'Vui lòng mô tả giải pháp bạn đề xuất' : 'Please describe your proposed solution';
    } else if (solutionContent.trim().length < 20) {
      newErrors.solutionContent = language === 'vi' ? 'Mô tả giải pháp cần ít nhất 20 ký tự' : 'Solution description must be at least 20 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 350, behavior: 'smooth' });
      return;
    }

    // Lưu vào localStorage
    try {
      const stored = localStorage.getItem('binhmy_solution_proposals');
      const list = stored ? JSON.parse(stored) : [];
      list.push({
        id: `prop-${Date.now()}`,
        problemId: problem.id,
        problemCode,
        problemTitle: displayTitle,
        role,
        fullName,
        phone,
        email,
        selectedFields,
        solutionContent,
        availability,
        fileName: uploadedFile?.name || null,
        createdAt: new Date().toLocaleDateString(language === 'vi' ? 'vi-VN' : 'en-US')
      });
      localStorage.setItem('binhmy_solution_proposals', JSON.stringify(list));
    } catch (err) {
      console.error(err);
    }

    setIsSuccessModalOpen(true);
  };

  // 9 lĩnh vực checkbox theo ảnh mẫu
  const supportFieldsList = [
    { key: 'Marketing / Truyền thông', labelVi: 'Marketing / Truyền thông', labelEn: 'Marketing / Communications' },
    { key: 'Công nghệ / CNTT', labelVi: 'Công nghệ / CNTT', labelEn: 'Technology / IT' },
    { key: 'Thiết kế', labelVi: 'Thiết kế', labelEn: 'Design / Media' },
    { key: 'Kinh doanh / Phát triển thị trường', labelVi: 'Kinh doanh / Phát triển thị trường', labelEn: 'Business / Market Growth' },
    { key: 'Nghiên cứu / Khảo sát', labelVi: 'Nghiên cứu / Khảo sát', labelEn: 'Research / Survey' },
    { key: 'Du lịch', labelVi: 'Du lịch', labelEn: 'Tourism / Hospitality' },
    { key: 'Y tế', labelVi: 'Y tế', labelEn: 'Healthcare & Medical' },
    { key: 'Tài chính', labelVi: 'Tài chính', labelEn: 'Finance / Investment' },
    { key: 'Khác', labelVi: 'Khác', labelEn: 'Other Fields' }
  ];

  // 4 phương thức tham gia theo ảnh mẫu
  const availabilityOptions = [
    { key: 'Tham gia thường xuyên', labelVi: 'Tham gia thường xuyên', labelEn: 'Regular Participation' },
    { key: 'Tư vấn / hỗ trợ theo từng dự án', labelVi: 'Tư vấn / hỗ trợ theo từng dự án', labelEn: 'Consulting / Project-based' },
    { key: 'Tham gia bán thời gian', labelVi: 'Tham gia bán thời gian', labelEn: 'Part-time Participation' },
    { key: 'Tư vấn / hỗ trợ theo từng buổi', labelVi: 'Tư vấn / hỗ trợ theo từng buổi', labelEn: 'Session-based Support' }
  ];

  return (
    <div className="w-full bg-[#f8fafc] py-5 sm:py-7 lg:py-9 min-h-screen text-slate-800">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* 1. BREADCRUMBS THEO ĐÚNG ẢNH MẪU */}
        <div className="flex items-center gap-2 text-xs text-slate-500 overflow-x-auto pb-1 whitespace-nowrap">
          <button
            onClick={onBackToList}
            className="hover:text-emerald-700 flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Home className="w-3.5 h-3.5 text-slate-400" />
            <span className="sr-only">Trang chủ</span>
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={onBackToList}
            className="hover:text-emerald-700 transition-colors cursor-pointer shrink-0"
          >
            {language === 'vi' ? 'Bài toán thực tế' : 'Real-World Problems'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <button
            onClick={onBackToDetail}
            className="hover:text-emerald-700 transition-colors cursor-pointer max-w-[240px] sm:max-w-xs truncate"
            title={displayTitle}
          >
            {displayTitle}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          <span className="text-slate-800 font-semibold shrink-0">
            {language === 'vi' ? 'Đề xuất hợp tác' : 'Collaboration Proposal'}
          </span>
        </div>

        {/* 2. TIÊU ĐỀ TRANG CÓ TRANH PHONG CẢNH THƠ MỘNG BÌNH MỸ */}
        <div className="relative bg-gradient-to-r from-emerald-50 via-teal-50/70 to-emerald-100/60 rounded-3xl border border-emerald-200/80 p-5 sm:p-7 shadow-xs overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Cột trái: Icon chiếc lá + Tiêu đề lớn + Phụ đề */}
          <div className="flex items-center gap-4 relative z-10">
            <div className="w-12 h-12 rounded-2xl bg-[#00875a] text-white flex items-center justify-center shadow-md shadow-emerald-900/10 shrink-0">
              <Leaf className="w-6 h-6 text-emerald-100 fill-emerald-100/30" />
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#006842] tracking-tight leading-tight">
                {language === 'vi' ? 'Đề xuất tham gia giải quyết' : 'Propose Solution to Challenge'}
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                {language === 'vi'
                  ? 'Cùng chung tay tìm giải pháp cho các bài toán thực tế tại Bình Mỹ'
                  : 'Join hands to build impactful solutions for real-world challenges in Binh My'}
              </p>
            </div>
          </div>

          {/* Cột phải: Khung thư pháp phong cảnh "Cùng nhau kiến tạo giải pháp cho Bình Mỹ" */}
          <div className="hidden lg:flex items-center gap-3 relative z-10">
            <div className="text-right">
              <p className="font-serif italic text-emerald-800 text-sm font-semibold">
                Cùng nhau
              </p>
              <p className="font-serif italic font-extrabold text-[#006842] text-lg leading-tight">
                kiến tạo giải pháp
              </p>
              <p className="font-serif italic text-emerald-800 text-sm font-semibold">
                cho Bình Mỹ 🍃
              </p>
            </div>
            <div className="w-20 h-14 rounded-2xl overflow-hidden border border-emerald-300 shadow-xs shrink-0">
              <img
                src="/assets/problems/banner-clean.png"
                alt="Bình Mỹ"
                className="w-full h-full object-cover object-right"
              />
            </div>
          </div>

          {/* Họa tiết trang trí nền */}
          <div className="absolute -right-8 -bottom-10 w-44 h-44 bg-emerald-200/40 rounded-full blur-2xl pointer-events-none" />
        </div>

        {/* 3. BỐ CỤC 2 CỘT CHÍNH (TRÁI: FORM CHÍNH, PHẢI: 3 CARDS THÔNG TIN) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* CỘT TRÁI (LỚN - 8/12): 2 CARDS */}
          <div className="lg:col-span-8 space-y-5">

            {/* CARD 1: THÔNG TIN BÀI TOÁN THỰC TẾ (THEO ĐÚNG ẢNH MẪU) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              
              {/* Header Card 1 */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#00875a] text-white flex items-center justify-center shrink-0">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  {language === 'vi' ? 'Thông tin bài toán thực tế' : 'Real-World Problem Details'}
                </h2>
              </div>

              {/* Nội dung Card 1 */}
              <div className="p-5">
                <div className="flex flex-col sm:flex-row gap-4.5 items-start">
                  
                  {/* Ảnh minh họa bên trái */}
                  <div className="w-28 sm:w-36 h-28 sm:h-36 rounded-xl overflow-hidden border border-slate-100 bg-slate-50 shrink-0">
                    <img
                      src={displayImage}
                      alt={displayTitle}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Thông tin bên phải */}
                  <div className="flex-1 min-w-0 space-y-2">
                    
                    {/* Huy hiệu đã xác minh */}
                    <div>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-[#00875a] text-white shadow-2xs">
                        <Check className="w-3 h-3 text-white" />
                        <span>{language === 'vi' ? 'Đã xác minh' : 'Verified'}</span>
                      </span>
                    </div>

                    {/* Tiêu đề bài toán */}
                    <h3 className="font-bold text-base sm:text-[17px] text-slate-900 leading-snug">
                      {displayTitle}
                    </h3>

                    {/* Meta row: Lĩnh vực, Địa điểm, Mã bài toán */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-slate-600 pt-0.5">
                      <span className="flex items-center gap-1 font-medium text-emerald-800">
                        <CatIcon className="w-3.5 h-3.5 text-emerald-700" />
                        <span>{displayCategory}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <MapPin className="w-3.5 h-3.5 text-slate-400" />
                        <span>{displayLocation}</span>
                      </span>
                      <span className="flex items-center gap-1 text-slate-500">
                        <Tag className="w-3.5 h-3.5 text-emerald-600" />
                        <span>
                          {language === 'vi' ? `Mã bài toán: ${problemCode}` : `Problem ID: ${problemCode}`}
                        </span>
                      </span>
                    </div>

                    {/* Mô tả tóm tắt */}
                    <p className="text-xs text-slate-600 leading-relaxed pt-1 line-clamp-3">
                      {displayDesc}
                    </p>

                  </div>
                </div>
              </div>

              {/* Dải thông tin người đăng & ngày gửi dưới chân Card 1 */}
              <div className="bg-slate-50/70 border-t border-slate-100 px-5 py-3 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-600">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{language === 'vi' ? 'Người đăng' : 'Submitter'}</span>
                    <span className="font-semibold text-slate-800 truncate block">{problem.contactName || 'Nguyễn Văn A'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{language === 'vi' ? 'Đơn vị' : 'Organization'}</span>
                    <span className="font-semibold text-slate-800 truncate block">{problem.organizationName || 'Hộ sản xuất (Cá nhân)'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                  <div>
                    <span className="text-[11px] text-slate-400 block">{language === 'vi' ? 'Ngày gửi' : 'Submission Date'}</span>
                    <span className="font-semibold text-slate-800 block">{problem.createdAt || '12/09/2026'}</span>
                  </div>
                </div>
              </div>

            </div>

            {/* CARD 2: FORM THÔNG TIN ĐỀ XUẤT HỢP TÁC (THEO ĐÚNG ẢNH MẪU) */}
            <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
              
              {/* Header Card 2 */}
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2.5">
                <div className="w-6 h-6 rounded-lg bg-[#00875a] text-white flex items-center justify-center shrink-0">
                  <UserCheck className="w-3.5 h-3.5" />
                </div>
                <h2 className="font-bold text-sm text-slate-900">
                  {language === 'vi' ? 'Thông tin đề xuất hợp tác' : 'Collaboration Proposal Form'}
                </h2>
              </div>

              {/* Thân Form */}
              <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-5">
                
                {/* 1. Bạn là ai? * */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {language === 'vi' ? '1. Bạn là ai? *' : '1. Who are you? *'}
                  </label>
                  <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
                    {[
                      { key: 'Sinh viên', labelVi: 'Sinh viên', labelEn: 'Student' },
                      { key: 'Chuyên gia', labelVi: 'Chuyên gia', labelEn: 'Expert / Researcher' },
                      { key: 'Doanh nghiệp', labelVi: 'Doanh nghiệp', labelEn: 'Enterprise' },
                      { key: 'Đơn vị hỗ trợ / Tổ chức', labelVi: 'Đơn vị hỗ trợ / Tổ chức', labelEn: 'Support Entity / NGO' },
                      { key: 'Khác', labelVi: 'Khác', labelEn: 'Other' }
                    ].map((opt) => {
                      const isSelected = role === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setRole(opt.key as any)}
                          className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium border transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50 text-[#006842] border-[#00875a] shadow-2xs font-bold'
                              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                              isSelected ? 'border-[#00875a] bg-[#00875a]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span>{language === 'vi' ? opt.labelVi : opt.labelEn}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Hàng 2: Họ và tên * & Số điện thoại * */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      {language === 'vi' ? '2. Họ và tên *' : '2. Full Name *'}
                    </label>
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder={language === 'vi' ? 'Nhập họ và tên của bạn' : 'Enter your full name'}
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.fullName ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      } rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:border-emerald-600 transition-all`}
                    />
                    {errors.fullName && <p className="text-[11px] text-rose-500 mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      {language === 'vi' ? '3. Số điện thoại *' : '3. Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder={language === 'vi' ? 'Nhập số điện thoại (VD: 09xxxxxxxx)' : 'Enter phone number (e.g. 09xxxxxxxx)'}
                      className={`w-full px-3.5 py-2.5 bg-white border ${
                        errors.phone ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      } rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:border-emerald-600 transition-all`}
                    />
                    {errors.phone && <p className="text-[11px] text-rose-500 mt-1">{errors.phone}</p>}
                  </div>
                </div>

                {/* Hàng 3: Email (không bắt buộc) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {language === 'vi' ? 'Email (không bắt buộc)' : 'Email Address (optional)'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={language === 'vi' ? 'Nhập email của bạn' : 'Enter your email address'}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:border-emerald-600 transition-all"
                  />
                </div>

                {/* 4. Bạn có thể hỗ trợ lĩnh vực nào? * (3 CỘT CHECKBOX) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {language === 'vi' ? '4. Bạn có thể hỗ trợ lĩnh vực nào? *' : '4. Which areas can you support? *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                    {supportFieldsList.map((item) => {
                      const isChecked = selectedFields.includes(item.key);
                      return (
                        <button
                          key={item.key}
                          type="button"
                          onClick={() => handleToggleField(item.key)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isChecked
                              ? 'bg-emerald-50/60 border-emerald-500/80 text-emerald-950 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                              isChecked
                                ? 'bg-[#00875a] border-[#00875a] text-white'
                                : 'border-slate-300 bg-white'
                            }`}
                          >
                            {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span className="text-xs">
                            {language === 'vi' ? item.labelVi : item.labelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  {errors.selectedFields && (
                    <p className="text-[11px] text-rose-500 mt-1">{errors.selectedFields}</p>
                  )}
                </div>

                {/* 5. Bạn đề xuất giải pháp bài toán này như thế nào? * */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {language === 'vi'
                      ? '5. Bạn đề xuất giải pháp bài toán này như thế nào? *'
                      : '5. What is your proposed solution for this problem? *'}
                  </label>
                  <div className="relative">
                    <textarea
                      rows={4}
                      maxLength={500}
                      value={solutionContent}
                      onChange={(e) => setSolutionContent(e.target.value)}
                      placeholder={
                        language === 'vi'
                          ? 'Ví dụ: Xây dựng kế hoạch truyền thông, thiết kế website bán hàng nông sản, hỗ trợ chụp ảnh sản phẩm...'
                          : 'E.g., Develop a marketing strategy, design an e-commerce storefront, assist with agricultural product photography...'
                      }
                      className={`w-full p-3.5 bg-white border ${
                        errors.solutionContent ? 'border-rose-400 bg-rose-50/40' : 'border-slate-200'
                      } rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-emerald-600 focus:border-emerald-600 transition-all leading-relaxed`}
                    />
                    <div className="text-right text-[11px] text-slate-400 mt-1">
                      {solutionContent.length}/500
                    </div>
                  </div>
                  {errors.solutionContent && (
                    <p className="text-[11px] text-rose-500 mt-0.5">{errors.solutionContent}</p>
                  )}
                </div>

                {/* 6. Khả năng tham gia * (2 CỘT RADIO) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-2">
                    {language === 'vi' ? '6. Khả năng tham gia *' : '6. Availability & Commitment *'}
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {availabilityOptions.map((opt) => {
                      const isSelected = availability === opt.key;
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => setAvailability(opt.key)}
                          className={`flex items-center gap-2.5 p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-emerald-50/60 border-emerald-500/80 text-emerald-950 font-semibold'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-[#00875a] bg-[#00875a]' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                          </div>
                          <span className="text-xs">
                            {language === 'vi' ? opt.labelVi : opt.labelEn}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 7. Tài liệu bổ sung (nếu có) */}
                <div>
                  <label className="block text-xs font-bold text-slate-800 mb-1.5">
                    {language === 'vi' ? '7. Tài liệu bổ sung (nếu có)' : '7. Supplementary Documents (if any)'}
                  </label>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleFileChange}
                  />

                  {uploadedFile ? (
                    <div className="p-3.5 bg-emerald-50/70 border border-emerald-300 rounded-xl flex items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-emerald-700 shrink-0" />
                        <span className="font-semibold text-emerald-950 truncate">{uploadedFile.name}</span>
                        <span className="text-[11px] text-emerald-700 shrink-0">
                          ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedFile(null)}
                        className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                        title="Xóa tệp"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="border-2 border-dashed border-slate-200 hover:border-emerald-500 bg-slate-50/50 hover:bg-emerald-50/30 rounded-2xl p-6 text-center transition-all cursor-pointer space-y-2 group"
                    >
                      <div className="w-10 h-10 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center mx-auto group-hover:scale-105 transition-transform">
                        <Upload className="w-5 h-5 text-sky-600" />
                      </div>
                      <p className="text-xs font-semibold text-slate-700">
                        {language === 'vi'
                          ? 'Kéo thả tệp vào đây hoặc nhấn để tải lên'
                          : 'Drag and drop files here or click to browse'}
                      </p>
                      <p className="text-[11px] text-slate-400">
                        {language === 'vi'
                          ? 'Hỗ trợ: PDF, DOC, DOCX, JPG, PNG (tối đa 5MB)'
                          : 'Supports: PDF, DOC, DOCX, JPG, PNG (max 5MB)'}
                      </p>
                    </div>
                  )}
                </div>

                {/* Hộp lưu ý xanh nhạt */}
                <div className="p-3.5 bg-[#f0f7fe] border border-[#d6e8fb] rounded-xl flex items-start gap-2.5 text-xs text-[#1d75c2]">
                  <Info className="w-4 h-4 text-[#1d75c2] shrink-0 mt-0.5" />
                  <p className="leading-relaxed">
                    {language === 'vi'
                      ? 'Sau khi gửi, đề xuất của bạn sẽ được Ban quản lý xem xét. Bạn sẽ nhận được thông báo khi có cập nhật mới.'
                      : 'Once submitted, your proposal will be reviewed by the Management Board. You will be contacted for direct coordination.'}
                  </p>
                </div>

                {/* Hàng nút hành động dưới cùng */}
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-3">
                  <button
                    type="button"
                    onClick={onBack}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? 'Hủy' : 'Cancel'}</span>
                  </button>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-md active:scale-98 cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? 'Gửi đề xuất' : 'Submit Proposal'}</span>
                  </button>
                </div>

              </form>

            </div>

          </div>

          {/* CỘT PHẢI (SIDEBAR - 4/12): 3 CARDS THEO ĐÚNG ẢNH MẪU */}
          <div className="lg:col-span-4 space-y-5">

            {/* SIDEBAR CARD 1: VÌ SAO NÊN THAM GIA? */}
            <div className="bg-[#f0faf5] border border-[#cbe8dc] rounded-2xl p-5 space-y-4 shadow-2xs">
              
              <div className="flex items-center gap-2.5 text-[#006842]">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0">
                  <Sprout className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {language === 'vi' ? 'Vì sao nên tham gia?' : 'Why participate?'}
                </h3>
              </div>

              {/* 4 gạch đầu dòng có dấu tick xanh */}
              <ul className="space-y-3 text-xs text-slate-700 leading-relaxed">
                {[
                  {
                    vi: 'Góp phần giải quyết các vấn đề thực tế của địa phương.',
                    en: 'Contribute directly to solving real-world local problems.'
                  },
                  {
                    vi: 'Tạo cơ hội hợp tác với sinh viên, chuyên gia, doanh nghiệp.',
                    en: 'Collaborate closely with students, experts, and businesses.'
                  },
                  {
                    vi: 'Phát triển kỹ năng và kinh nghiệm thực tế.',
                    en: 'Cultivate practical skills and hands-on living lab experience.'
                  },
                  {
                    vi: 'Lan tỏa giá trị cộng đồng và phát triển bền vững cho Bình Mỹ.',
                    en: 'Spread community values and sustainable development for Binh My.'
                  }
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                    <span>{language === 'vi' ? item.vi : item.en}</span>
                  </li>
                ))}
              </ul>

              {/* Tranh minh họa sinh viên hợp tác + châm ngôn */}
              <div className="pt-3 border-t border-emerald-200/60 flex items-center gap-3">
                <div className="w-16 h-14 rounded-xl overflow-hidden shrink-0 border border-emerald-200">
                  <img
                    src="/assets/problems/community-callout.png"
                    alt="Living Lab Collaboration"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-serif italic text-xs font-bold text-emerald-900 leading-snug">
                    "Mỗi ý tưởng nhỏ đều có thể tạo nên thay đổi lớn"
                  </p>
                  <p className="text-[10px] text-emerald-700 mt-0.5">
                    — Binh My Living Lab
                  </p>
                </div>
              </div>

            </div>

            {/* SIDEBAR CARD 2: LIÊN HỆ HỖ TRỢ */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs">
              
              <div className="flex items-center gap-2.5 text-slate-900">
                <div className="w-7 h-7 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center shrink-0">
                  <Headphones className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {language === 'vi' ? 'Liên hệ hỗ trợ' : 'Support & Contact'}
                </h3>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                {language === 'vi'
                  ? 'Nếu bạn cần thêm thông tin về bài toán, vui lòng liên hệ:'
                  : 'If you need further information regarding this problem, please contact:'}
              </p>

              <div className="space-y-2.5 text-xs text-slate-700 pt-1">
                <div className="flex items-center gap-2.5">
                  <User className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="font-medium">
                    {problem.contactName || 'Nguyễn Văn A'} ({language === 'vi' ? 'Người đăng bài toán' : 'Problem Submitter'})
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                  <span>09xx xxx xxx</span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                  <span className="text-slate-600 truncate">{problem.email || 'nvana@example.com'}</span>
                </div>
              </div>

            </div>

            {/* SIDEBAR CARD 3: QUY TRÌNH XỬ LÝ (4 BƯỚC NỐI DỌC) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-3.5 shadow-2xs">
              
              <div className="flex items-center gap-2.5 text-slate-900">
                <div className="w-7 h-7 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0">
                  <Workflow className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm sm:text-base leading-tight">
                  {language === 'vi' ? 'Quy trình xử lý' : 'Processing Workflow'}
                </h3>
              </div>

              <div className="space-y-0 pt-1">
                {[
                  {
                    step: 1,
                    titleVi: 'Tiếp nhận đơn',
                    titleEn: 'Receive Proposal',
                    descVi: 'Tự động gắn với bài toán bạn chọn.',
                    descEn: 'Automatically linked with selected challenge.'
                  },
                  {
                    step: 2,
                    titleVi: 'Xem xét',
                    titleEn: 'Review & Assessment',
                    descVi: 'Ban quản lý đánh giá năng lực và phù hợp.',
                    descEn: 'Management board evaluates feasibility & compatibility.'
                  },
                  {
                    step: 3,
                    titleVi: 'Liên hệ',
                    titleEn: 'Connect & Align',
                    descVi: 'Kết nối với người đăng bài toán.',
                    descEn: 'Coordinate directly with the problem owner.'
                  },
                  {
                    step: 4,
                    titleVi: 'Kết nối thành công',
                    titleEn: 'Successful Match',
                    descVi: 'Hình thành nhóm giải quyết hoặc dự án.',
                    descEn: 'Forming solution team or incubation project.'
                  }
                ].map((item, idx, arr) => (
                  <div key={item.step} className="flex gap-3">
                    {/* Cột trái: Vòng tròn số + Đường kẻ dọc */}
                    <div className="w-6 shrink-0 flex flex-col items-center">
                      <div className="w-6 h-6 rounded-full bg-[#1d75c2] text-white text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
                        {item.step}
                      </div>
                      {idx < arr.length - 1 && (
                        <div className="w-0.5 bg-[#bfdbfe] flex-1 my-1" />
                      )}
                    </div>

                    {/* Cột phải: Tiêu đề + Nội dung */}
                    <div className={`flex-1 min-w-0 ${idx < arr.length - 1 ? 'pb-3.5' : 'pb-0.5'}`}>
                      <h4 className="text-xs font-bold text-slate-800 leading-snug pt-0.5">
                        {language === 'vi' ? item.titleVi : item.titleEn}
                      </h4>
                      <p className="text-[11px] text-slate-500 leading-tight mt-0.5">
                        {language === 'vi' ? item.descVi : item.descEn}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* 4. MODAL THÔNG BÁO GỬI THÀNH CÔNG */}
      {isSuccessModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-slate-200 p-6 sm:p-8 text-center space-y-5 animate-in zoom-in-95 duration-200">
            
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                {language === 'vi' ? 'Đề xuất hợp tác đã được gửi!' : 'Proposal Submitted Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
                {language === 'vi'
                  ? 'Ban quản lý Làng SV Bình Mỹ đã ghi nhận thông tin đề xuất và sẽ chủ động kết nối bạn với chủ bài toán cùng nhóm chuyên gia trong vòng 24 - 48 giờ làm việc.'
                  : 'Binh My Student Village Management has received your proposal and will coordinate between you and the problem owner within 24-48 business hours.'}
              </p>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onBackToDetail();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                {language === 'vi' ? 'Quay lại chi tiết bài toán' : 'Back to Problem Details'}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSuccessModalOpen(false);
                  onBackToList();
                }}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-all cursor-pointer"
              >
                {language === 'vi' ? 'Xem các bài toán khác' : 'Explore Other Problems'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
