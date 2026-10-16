import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem, ProblemCategory } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { 
  X, 
  Upload, 
  Image as ImageIcon, 
  Trash2, 
  AlertCircle, 
  CheckCircle2, 
  FileText, 
  Save, 
  Send, 
  ShieldCheck, 
  HelpCircle,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  User,
  Check,
  Building,
  Phone,
  Mail,
  MapPin,
  Clock,
  Users
} from 'lucide-react';

interface PostProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitSuccess: (newProblem: RealProblem) => void;
}

export const PostProblemModal: React.FC<PostProblemModalProps> = ({
  isOpen,
  onClose,
  onSubmitSuccess
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Stepper State: 1 -> 5
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form states - Bước 1: Thông tin người đăng
  const [submitterType, setSubmitterType] = useState('Nông dân / Hộ sản xuất');
  const [contactName, setContactName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Ấp 4, Xã Bình Mỹ, Củ Chi');

  // Form states - Bước 2: Thông tin bài toán
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProblemCategory>('agriculture');
  const [categoryDetail, setCategoryDetail] = useState('Nông nghiệp');
  const [description, setDescription] = useState('');
  const [occurredTime, setOccurredTime] = useState('Dưới 6 tháng');
  const [affectedAudience, setAffectedAudience] = useState('Bản thân / hộ sản xuất');
  const [cause, setCause] = useState('');
  const [triedSolutions, setTriedSolutions] = useState('');
  const [damages, setDamages] = useState('');

  // Form states - Bước 3: Nhu cầu hỗ trợ
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [supportNeeded, setSupportNeeded] = useState<string[]>(['Công nghệ / CNTT']);
  const [readyToCoordinate, setReadyToCoordinate] = useState('Có');
  const [canSupportTesting, setCanSupportTesting] = useState('Có');

  // Form states - Bước 4: Hình ảnh & Tài liệu
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [docFile, setDocFile] = useState<{ name: string; size: number } | null>(null);
  const [imageDescription, setImageDescription] = useState('');

  // Form states - Bước 5: Xác nhận & gửi bài
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [confirmContact, setConfirmContact] = useState(false);
  const [confirmPublicImages, setConfirmPublicImages] = useState(false);

  // UI / Validation states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [draftSaved, setDraftSaved] = useState(false);

  // Load draft on mount if available
  useEffect(() => {
    if (isOpen) {
      try {
        const savedDraft = localStorage.getItem('binhmy_problem_draft');
        if (savedDraft) {
          const draft = JSON.parse(savedDraft);
          if (draft.contactName) setContactName(draft.contactName);
          if (draft.phoneNumber) setPhoneNumber(draft.phoneNumber);
          if (draft.title) setTitle(draft.title);
          if (draft.description) setDescription(draft.description);
          if (draft.desiredOutcome) setDesiredOutcome(draft.desiredOutcome);
          if (draft.location) setLocation(draft.location);
          if (draft.submitterType) setSubmitterType(draft.submitterType);
          if (draft.category) setCategory(draft.category);
        }
      } catch (err) {
        console.error('Error loading draft', err);
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Danh sách các bước
  const steps = [
    { number: 1, title: 'Người đăng', desc: 'Thông tin liên hệ' },
    { number: 2, title: 'Bài toán', desc: 'Mô tả vấn đề' },
    { number: 3, title: 'Hỗ trợ', desc: 'Nhu cầu giải quyết' },
    { number: 4, title: 'Hình ảnh', desc: 'Minh chứng thực tế' },
    { number: 5, title: 'Xác nhận', desc: 'Kiểm tra & Gửi' }
  ];

  // Xử lý upload ảnh
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    let fileError = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      // Kiểm tra định dạng: JPG, JPEG, PNG, WEBP
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        fileError = 'Định dạng không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG, WEBP.';
        continue;
      }
      // Giới hạn 5MB
      if (file.size > 5 * 1024 * 1024) {
        fileError = 'Dung lượng ảnh vượt quá 5MB. Vui lòng chọn ảnh nhỏ hơn.';
        continue;
      }
      validFiles.push(file);
    }

    if (fileError) {
      setErrors(prev => ({ ...prev, images: fileError }));
    } else {
      setErrors(prev => {
        const newErr = { ...prev };
        delete newErr.images;
        return newErr;
      });
    }

    // Đọc ảnh thành Data URL
    validFiles.forEach(file => {
      if (uploadedImages.length >= 5) {
        setErrors(prev => ({ ...prev, images: 'Tối đa 5 hình ảnh minh chứng.' }));
        return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedImages(prev => {
            if (prev.length >= 5) return prev;
            return [...prev, event.target!.result as string];
          });
        }
      };
      reader.readAsDataURL(file);
    });

    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleRemoveImage = (index: number) => {
    setUploadedImages(prev => prev.filter((_, i) => i !== index));
  };

  // Upload tài liệu PDF
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, doc: 'Tài liệu không được vượt quá 10MB' }));
      return;
    }
    setDocFile({ name: file.name, size: file.size });
    setErrors(prev => {
      const newErr = { ...prev };
      delete newErr.doc;
      return newErr;
    });
  };

  const toggleSupportItem = (item: string) => {
    setSupportNeeded(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  // Lưu bản nháp
  const handleSaveDraft = () => {
    const draftData = {
      submitterType,
      contactName,
      organizationName,
      phoneNumber,
      email,
      location,
      title,
      category,
      categoryDetail,
      description,
      desiredOutcome
    };
    localStorage.setItem('binhmy_problem_draft', JSON.stringify(draftData));
    setDraftSaved(true);
    setTimeout(() => setDraftSaved(false), 2500);
  };

  // Kiểm tra lỗi theo từng bước trước khi "Tiếp tục"
  const validateStep = (stepNumber: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (stepNumber === 1) {
      if (!contactName.trim()) newErrors.contactName = 'Họ và tên người liên hệ là bắt buộc.';
      if (!phoneNumber.trim()) {
        newErrors.phoneNumber = 'Số điện thoại liên hệ là bắt buộc.';
      } else if (!/^[0-9+\s\-()]{9,15}$/.test(phoneNumber.trim())) {
        newErrors.phoneNumber = 'Số điện thoại không hợp lệ (cần từ 9-12 chữ số).';
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = 'Địa chỉ email không đúng định dạng.';
      }
    }

    if (stepNumber === 2) {
      if (!title.trim()) {
        newErrors.title = 'Tên bài toán bạn đang gặp phải là bắt buộc.';
      } else if (title.trim().length < 8) {
        newErrors.title = 'Tên bài toán cần cụ thể hơn (tối thiểu 8 ký tự).';
      }
      if (!description.trim()) {
        newErrors.description = 'Vui lòng mô tả cụ thể khó khăn hoặc vấn đề.';
      } else if (description.trim().length < 15) {
        newErrors.description = 'Mô tả cần ít nhất 15 ký tự để người hỗ trợ hiểu rõ.';
      }
    }

    if (stepNumber === 3) {
      if (!desiredOutcome.trim()) {
        newErrors.desiredOutcome = 'Vui lòng nêu kết quả mà bạn mong muốn đạt được.';
      }
      if (supportNeeded.length === 0) {
        newErrors.supportNeeded = 'Vui lòng chọn ít nhất 1 nguồn lực cần hỗ trợ.';
      }
    }

    if (stepNumber === 4) {
      if (uploadedImages.length === 0) {
        newErrors.images = 'Bắt buộc tải lên ít nhất 1 hình ảnh minh chứng thực tế.';
      }
    }

    if (stepNumber === 5) {
      if (!confirmAccuracy) newErrors.confirmAccuracy = 'Vui lòng xác nhận thông tin cung cấp là đúng.';
      if (!confirmContact) newErrors.confirmContact = 'Vui lòng đồng ý để Ban quản lý xem xét và liên hệ xác minh.';
      if (!confirmPublicImages) newErrors.confirmPublicImages = 'Vui lòng đồng ý công khai hình ảnh sau khi phê duyệt.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 5));
    }
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  // Submit form hoàn tất
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(5)) return;

    setIsSubmitting(true);

    const newProblem: RealProblem = {
      id: `prob-custom-${Date.now()}`,
      submitterType,
      contactName,
      organizationName: organizationName.trim() || undefined,
      phoneNumber,
      email: email.trim() || undefined,
      location,
      title,
      category,
      categoryDetail,
      description,
      occurredTime,
      affectedAudience,
      cause: cause.trim() || undefined,
      triedSolutions: triedSolutions.trim() || undefined,
      damages: damages.trim() || undefined,
      desiredOutcome,
      supportNeeded,
      readyToCoordinate,
      canSupportTesting,
      images: uploadedImages,
      evidenceDocName: docFile?.name,
      imageDescription: imageDescription.trim() || undefined,
      status: 'pending', // Bài toán mới luôn là "Chờ xác minh"
      createdAt: new Date().toLocaleDateString('vi-VN'),
      isPublic: false
    };

    localStorage.removeItem('binhmy_problem_draft');
    AdminDataService.saveProblem(newProblem);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMessage(true);
      onSubmitSuccess(newProblem);
    }, 700);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-900/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[94vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#00875a] to-emerald-700 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center shadow-xs">
              <Sparkles className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-black tracking-tight leading-tight uppercase">
                ĐĂNG BÀI TOÁN THỰC TẾ TẠI BÌNH MỸ
              </h2>
              <p className="text-xs text-emerald-100">
                Kết nối nông dân, hộ sản xuất và doanh nghiệp với mạng lưới hỗ trợ giải pháp thực tế
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
            aria-label="Đóng biểu mẫu"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* ================= STEPPER PROGRESS BAR (5 BƯỚC) ================= */}
        {!successMessage && (
          <div className="bg-slate-50 border-b border-slate-200 px-4 sm:px-8 py-3.5 shrink-0">
            <div className="flex items-center justify-between max-w-2xl mx-auto relative">
              {/* Line background */}
              <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 -z-0" />
              <div 
                className="absolute left-4 top-4 h-0.5 bg-emerald-600 transition-all duration-300 -z-0"
                style={{ width: `${((currentStep - 1) / 4) * 100}%` }}
              />

              {steps.map((s) => {
                const isCompleted = s.number < currentStep;
                const isCurrent = s.number === currentStep;

                return (
                  <button
                    key={s.number}
                    type="button"
                    onClick={() => {
                      // Cho phép nhảy về các bước trước đã đi qua
                      if (s.number < currentStep) setCurrentStep(s.number);
                    }}
                    className={`relative z-10 flex flex-col items-center gap-1 group cursor-pointer ${
                      s.number < currentStep ? 'cursor-pointer' : ''
                    }`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-black transition-all ${
                      isCompleted 
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : isCurrent 
                        ? 'bg-emerald-600 text-white ring-4 ring-emerald-100 scale-110 shadow-sm'
                        : 'bg-white text-slate-400 border-2 border-slate-200'
                    }`}>
                      {isCompleted ? <Check className="w-4 h-4 stroke-[3]" /> : s.number}
                    </div>
                    <span className={`text-[10px] sm:text-xs font-bold hidden sm:block ${
                      isCurrent ? 'text-emerald-800 font-extrabold' : isCompleted ? 'text-slate-700' : 'text-slate-400'
                    }`}>
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-800 bg-white">
          
          {successMessage ? (
            /* ================= MỤC 5: TRẠNG THÁI SAU KHI GỬI THÀNH CÔNG ================= */
            <div className="py-10 px-4 text-center space-y-4 animate-in zoom-in-95 duration-200">
              <div className="w-20 h-20 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                BÀI TOÁN CỦA BẠN ĐÃ ĐƯỢC GỬI THÀNH CÔNG!
              </h3>

              <div className="bg-emerald-50/70 p-5 rounded-2xl border border-emerald-200 text-slate-700 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed shadow-xs">
                “Ban quản lý Làng SV sẽ xem xét thông tin và liên hệ khi cần xác minh thêm. Bài toán chỉ được công khai sau khi được phê duyệt.”
              </div>

              <div className="pt-2 flex flex-wrap items-center justify-center gap-2">
                <span className="px-3.5 py-1.5 rounded-full text-xs font-extrabold bg-amber-100 text-amber-900 border border-amber-300 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>Trạng thái: Chờ xác minh</span>
                </span>
                <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-slate-100 text-slate-600">
                  Mã bài: #{title.slice(0, 15)}...
                </span>
              </div>

              <p className="text-xs text-slate-500 max-w-md mx-auto pt-2">
                Bài toán đã được ghi nhận vào hệ thống và lưu tạm trên trình duyệt của bạn trong mục <strong>“Chờ xác minh”</strong>.
              </p>

              <div className="pt-4 flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-8 py-3 rounded-full text-xs font-extrabold text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  Hoàn tất & Xem danh sách
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ================= BƯỚC 1: THÔNG TIN NGƯỜI ĐĂNG ================= */}
              {currentStep === 1 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">1</span>
                      <span>BƯỚC 1 – THÔNG TIN NGƯỜI ĐĂNG</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Cung cấp thông tin liên hệ để Ban quản lý có thể xác minh và kết nối người hỗ trợ phù hợp.
                    </p>
                  </div>

                  {/* 1. Bạn là ai? */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Bạn là ai? <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Nông dân / Hộ sản xuất',
                        'Doanh nghiệp',
                        'Cơ sở kinh doanh',
                        'Đơn vị địa phương',
                        'Khác'
                      ].map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSubmitterType(t)}
                          className={`p-3 rounded-2xl border text-xs font-semibold text-left transition-all ${
                            submitterType === t
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-2xs'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Họ tên & Tên hộ/đơn vị */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Họ và tên người liên hệ <span className="text-rose-500">* (Bắt buộc)</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => setContactName(e.target.value)}
                          placeholder="Ví dụ: Nguyễn Văn A"
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border ${
                            errors.contactName ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                          } focus:outline-emerald-500`}
                        />
                      </div>
                      {errors.contactName && <p className="text-[11px] text-rose-500 mt-1">{errors.contactName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Tên hộ sản xuất hoặc doanh nghiệp <span className="text-slate-400 font-normal">(Nếu có)</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          value={organizationName}
                          onChange={(e) => setOrganizationName(e.target.value)}
                          placeholder="Tổ hợp tác rau sạch, HTX Bình Mỹ Xanh..."
                          className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* SĐT & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Số điện thoại liên hệ <span className="text-rose-500">* (Bắt buộc)</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="0912 345 678"
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border ${
                            errors.phoneNumber ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                          } focus:outline-emerald-500`}
                        />
                      </div>
                      {errors.phoneNumber && <p className="text-[11px] text-rose-500 mt-1">{errors.phoneNumber}</p>}
                      <p className="text-[10px] text-slate-400 mt-0.5">🔒 Ban quản lý bảo mật, không công khai số điện thoại trên bài viết.</p>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Email liên hệ <span className="text-slate-400 font-normal">(Không bắt buộc)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="email@example.com"
                          className={`w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border ${
                            errors.email ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                          } focus:outline-emerald-500`}
                        />
                      </div>
                      {errors.email && <p className="text-[11px] text-rose-500 mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  {/* Địa điểm */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Địa điểm phát sinh vấn đề tại Bình Mỹ
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ví dụ: Ấp 4A, Xã Bình Mỹ, Củ Chi..."
                        className="w-full pl-10 pr-3.5 py-2.5 text-xs rounded-xl border border-slate-200 focus:outline-emerald-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= BƯỚC 2: THÔNG TIN BÀI TOÁN ================= */}
              {currentStep === 2 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">2</span>
                      <span>BƯỚC 2 – THÔNG TIN BÀI TOÁN</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Mô tả chi tiết những khó khăn hoặc trở ngại thực tế mà bạn đang đối mặt.
                    </p>
                  </div>

                  {/* Tên bài toán */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tên bài toán bạn đang gặp phải <span className="text-rose-500">* (Bắt buộc)</span>
                    </label>
                    <input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Gợi ý: Khó quảng bá nông sản đến khách hàng / Thiếu giải pháp bảo quản rau sau thu hoạch..."
                      className={`w-full px-3.5 py-2.5 text-xs rounded-xl border ${
                        errors.title ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-emerald-500`}
                    />
                    {errors.title && <p className="text-[11px] text-rose-500 mt-1">{errors.title}</p>}
                  </div>

                  {/* Lĩnh vực */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Bài toán thuộc lĩnh vực nào? <span className="text-rose-500">*</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { cat: 'agriculture', label: 'Nông nghiệp' },
                        { cat: 'health', label: 'Y tế' },
                        { cat: 'tourism', label: 'Du lịch' },
                        { cat: 'other', label: 'Công nghệ' },
                        { cat: 'other', label: 'Kinh doanh / Thị trường' },
                        { cat: 'other', label: 'Môi trường' },
                        { cat: 'other', label: 'Khác' }
                      ].map((item, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setCategoryDetail(item.label);
                            setCategory(item.cat as ProblemCategory);
                          }}
                          className={`p-2.5 rounded-xl border text-xs font-semibold text-center transition-all ${
                            categoryDetail === item.label
                              ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-2xs'
                              : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Mô tả cụ thể */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bạn đang gặp vấn đề gì? <span className="text-rose-500">* (Bắt buộc)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      Hãy mô tả cụ thể khó khăn hoặc vấn đề mà bạn đang gặp phải trong thực tế.
                    </p>
                    <textarea
                      rows={3}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Mô tả cụ thể vấn đề..."
                      className={`w-full p-3.5 text-xs rounded-xl border ${
                        errors.description ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-emerald-500 leading-relaxed`}
                    />
                    {errors.description && <p className="text-[11px] text-rose-500 mt-1">{errors.description}</p>}
                  </div>

                  {/* Thời gian & Đối tượng */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vấn đề bắt đầu từ khi nào?
                      </label>
                      <select
                        value={occurredTime}
                        onChange={(e) => setOccurredTime(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Mới phát sinh">Mới phát sinh</option>
                        <option value="Dưới 6 tháng">Dưới 6 tháng</option>
                        <option value="Từ 6 tháng đến 1 năm">Từ 6 tháng đến 1 năm</option>
                        <option value="Trên 1 năm">Trên 1 năm</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vấn đề ảnh hưởng đến ai hoặc hoạt động nào?
                      </label>
                      <select
                        value={affectedAudience}
                        onChange={(e) => setAffectedAudience(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Bản thân / hộ sản xuất">Bản thân / hộ sản xuất</option>
                        <option value="Khách hàng">Khách hàng</option>
                        <option value="Nhân viên / doanh nghiệp">Nhân viên / doanh nghiệp</option>
                        <option value="Cộng đồng địa phương">Cộng đồng địa phương</option>
                        <option value="Khác">Khác</option>
                      </select>
                    </div>
                  </div>

                  {/* Nguyên nhân, Giải pháp đã thử, Khó khăn thiệt hại */}
                  <div className="space-y-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Theo bạn, nguyên nhân của vấn đề là gì? <span className="text-slate-400 font-normal">(Có thể chưa biết rõ)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={cause}
                        onChange={(e) => setCause(e.target.value)}
                        placeholder="Theo bạn điều gì dẫn đến khó khăn này..."
                        className="w-full p-3 text-xs rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Bạn đã thử giải quyết bằng cách nào? <span className="text-slate-400 font-normal">(Cho phép ghi “Chưa có giải pháp”)</span>
                      </label>
                      <textarea
                        rows={2}
                        value={triedSolutions}
                        onChange={(e) => setTriedSolutions(e.target.value)}
                        placeholder="Những cách đã thử hoặc ghi Chưa có giải pháp..."
                        className="w-full p-3 text-xs rounded-xl border border-slate-200"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Vấn đề gây ra khó khăn hoặc thiệt hại gì?
                      </label>
                      <textarea
                        rows={2}
                        value={damages}
                        onChange={(e) => setDamages(e.target.value)}
                        placeholder="Ví dụ: khó tiếp cận khách hàng, chi phí cao, giảm năng suất..."
                        className="w-full p-3 text-xs rounded-xl border border-slate-200"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* ================= BƯỚC 3: NHU CẦU HỖ TRỢ ================= */}
              {currentStep === 3 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">3</span>
                      <span>BƯỚC 3 – NHU CẦU HỖ TRỢ</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Xác định rõ mong muốn và các nguồn lực bạn đang cần giúp đỡ để đạt kết quả tốt nhất.
                    </p>
                  </div>

                  {/* Kết quả mong muốn */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Bạn mong muốn vấn đề được giải quyết như thế nào? <span className="text-rose-500">* (Bắt buộc)</span>
                    </label>
                    <p className="text-[11px] text-slate-500 mb-1.5">
                      Mô tả kết quả hoặc trạng thái mà bạn mong muốn đạt được.
                    </p>
                    <textarea
                      rows={3}
                      value={desiredOutcome}
                      onChange={(e) => setDesiredOutcome(e.target.value)}
                      placeholder="Mô tả kết quả mong muốn đạt được..."
                      className={`w-full p-3.5 text-xs rounded-xl border ${
                        errors.desiredOutcome ? 'border-rose-400 bg-rose-50/50' : 'border-slate-200'
                      } focus:outline-emerald-500 leading-relaxed`}
                    />
                    {errors.desiredOutcome && <p className="text-[11px] text-rose-500 mt-1">{errors.desiredOutcome}</p>}
                  </div>

                  {/* Các lựa chọn nguồn lực */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-2">
                      Bạn cần những nguồn lực nào? <span className="text-rose-500">* (Chọn một hoặc nhiều mục)</span>
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        'Công nghệ/CNTT',
                        'Marketing/Truyền thông',
                        'Thiết kế',
                        'Kinh doanh/Phát triển thị trường',
                        'Nghiên cứu/Khảo sát',
                        'Chuyên môn y tế',
                        'Du lịch',
                        'Tài chính',
                        'Khác'
                      ].map((item) => {
                        const isSelected = supportNeeded.includes(item);
                        return (
                          <button
                            key={item}
                            type="button"
                            onClick={() => toggleSupportItem(item)}
                            className={`p-2.5 rounded-xl border text-xs font-semibold text-left flex items-center gap-2 transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold shadow-2xs'
                                : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                            }`}
                          >
                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center shrink-0 ${
                              isSelected ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-slate-300 bg-white'
                            }`}>
                              {isSelected && <span className="text-[10px]">✓</span>}
                            </div>
                            <span>{item}</span>
                          </button>
                        );
                      })}
                    </div>
                    {errors.supportNeeded && <p className="text-[11px] text-rose-500 mt-1">{errors.supportNeeded}</p>}
                  </div>

                  {/* Sẵn sàng phối hợp & thử nghiệm */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Bạn có sẵn sàng phối hợp với sinh viên hoặc chuyên gia không?
                      </label>
                      <select
                        value={readyToCoordinate}
                        onChange={(e) => setReadyToCoordinate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Có">Có</option>
                        <option value="Có, nếu được hướng dẫn">Có, nếu được hướng dẫn</option>
                        <option value="Cần trao đổi thêm">Cần trao đổi thêm</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Bạn có thể hỗ trợ quá trình thử nghiệm giải pháp không?
                      </label>
                      <select
                        value={canSupportTesting}
                        onChange={(e) => setCanSupportTesting(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 bg-white"
                      >
                        <option value="Có">Có</option>
                        <option value="Không">Không</option>
                        <option value="Cần trao đổi thêm">Cần trao đổi thêm</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* ================= BƯỚC 4: HÌNH ẢNH VÀ TÀI LIỆU MINH CHỨNG ================= */}
              {currentStep === 4 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">4</span>
                      <span>BƯỚC 4 – HÌNH ẢNH VÀ TÀI LIỆU MINH CHỨNG</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Ảnh minh chứng thực tế giúp chuyên gia và sinh viên nắm bắt đúng hiện trạng để đưa ra giải pháp chuẩn xác.
                    </p>
                  </div>

                  {/* Vùng tải ảnh nét đứt nổi bật */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Tải lên hình ảnh thực tế <span className="text-rose-500">* (Bắt buộc tối thiểu 1 ảnh)</span>
                    </label>

                    <div 
                      onClick={() => fileInputRef.current?.click()}
                      className={`border-2 border-dashed rounded-3xl p-6 sm:p-8 text-center transition-all cursor-pointer ${
                        errors.images 
                          ? 'border-rose-400 bg-rose-50/40' 
                          : 'border-emerald-300 bg-emerald-50/30 hover:bg-emerald-50/60 hover:border-emerald-500'
                      }`}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp,image/jpg"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-3 shadow-xs">
                        <ImageIcon className="w-7 h-7" />
                      </div>
                      <p className="font-extrabold text-sm text-slate-800">
                        Tải lên hình ảnh thực tế
                      </p>
                      <p className="text-xs text-slate-500 mt-1">
                        Kéo thả hình ảnh vào đây hoặc nhấn để chọn từ thiết bị
                      </p>
                      <div className="pt-3">
                        <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-2xs">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Chọn hình ảnh</span>
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400 mt-2">
                        Chấp nhận JPG, JPEG, PNG, WEBP (Tối đa 5 ảnh, mỗi ảnh ≤ 5MB)
                      </p>
                    </div>
                    {errors.images && <p className="text-[11px] text-rose-500 mt-1.5 font-bold">{errors.images}</p>}

                    {/* Danh sách Thumbnails */}
                    {uploadedImages.length > 0 && (
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                          <span>Hình ảnh đã chọn ({uploadedImages.length}/5):</span>
                          <span className="text-[11px] text-slate-400">Nhấn biểu tượng thùng rác để xóa</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                          {uploadedImages.map((imgSrc, idx) => (
                            <div key={idx} className="relative aspect-square rounded-2xl overflow-hidden border border-slate-200 group bg-slate-100 shadow-2xs">
                              <img src={imgSrc} alt={`Minh chứng ${idx + 1}`} className="w-full h-full object-cover" />
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(idx)}
                                className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-md hover:scale-110 transition-transform cursor-pointer"
                                title="Xóa ảnh này"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                              <span className="absolute bottom-1.5 left-1.5 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                                Ảnh {idx + 1}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Mô tả hình ảnh */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Mô tả hình ảnh minh chứng <span className="text-slate-400 font-normal">(Giải thích ngắn gọn ảnh chụp ở đâu, trong hoàn cảnh nào)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      placeholder="Ví dụ: Ảnh chụp luống rau tại vườn ấp 4 vào sáng sớm sau khi thu hoạch..."
                      className="w-full p-3 text-xs rounded-xl border border-slate-200"
                    />
                  </div>

                  {/* Tài liệu PDF bổ sung */}
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Tải lên tài liệu PDF bổ sung <span className="text-slate-400 font-normal">(Không bắt buộc, tối đa 10MB)</span>
                    </label>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => docInputRef.current?.click()}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center gap-2 border border-slate-200 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Chọn tệp tài liệu (PDF, Word)</span>
                      </button>
                      <input
                        ref={docInputRef}
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleDocUpload}
                        className="hidden"
                      />
                      {docFile && (
                        <div className="flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-emerald-800">
                          <FileText className="w-3.5 h-3.5" />
                          <span className="font-semibold">{docFile.name}</span>
                          <button
                            type="button"
                            onClick={() => setDocFile(null)}
                            className="text-slate-400 hover:text-rose-500 ml-1"
                          >
                            ✕
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* ================= BƯỚC 5: XÁC NHẬN VÀ GỬI BÀI ================= */}
              {currentStep === 5 && (
                <div className="space-y-5 animate-in fade-in duration-200">
                  <div className="border-b border-slate-100 pb-3">
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 flex items-center gap-2">
                      <span className="w-6 h-6 rounded-lg bg-emerald-600 text-white font-black text-xs flex items-center justify-center">5</span>
                      <span>BƯỚC 5 – XÁC NHẬN VÀ GỬI BÀI</span>
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Kiểm tra lại tóm tắt thông tin bài toán trước khi gửi để Ban quản lý xác minh.
                    </p>
                  </div>

                  {/* BẢN TÓM TẮT THÔNG TIN (REVIEW SUMMARY CARD) */}
                  <div className="bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200 space-y-3.5 text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <span className="font-extrabold text-slate-800 text-sm">Tóm tắt nội dung bài toán:</span>
                      <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[11px]">
                        {categoryDetail}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <p className="font-black text-slate-900 text-sm leading-snug">
                        {title}
                      </p>
                      <p className="text-slate-600 line-clamp-2">
                        {description}
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-200/80 text-slate-600">
                      <div>
                        <strong>Người đăng:</strong> {contactName} {organizationName && `(${organizationName})`}
                      </div>
                      <div>
                        <strong>Địa điểm:</strong> {location}
                      </div>
                      <div>
                        <strong>Số điện thoại:</strong> {phoneNumber} <span className="text-slate-400">(được bảo mật)</span>
                      </div>
                      <div>
                        <strong>Số ảnh đính kèm:</strong> {uploadedImages.length} hình ảnh
                      </div>
                    </div>

                    {/* Ảnh thu nhỏ */}
                    {uploadedImages.length > 0 && (
                      <div className="flex items-center gap-2 pt-2 overflow-x-auto">
                        {uploadedImages.map((src, i) => (
                          <img key={i} src={src} alt="summary" className="w-12 h-12 rounded-lg object-cover border border-slate-200 shrink-0" />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* 3 Checkbox xác nhận */}
                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmAccuracy}
                        onChange={(e) => setConfirmAccuracy(e.target.checked)}
                        className="mt-0.5 accent-emerald-600 rounded"
                      />
                      <span className="leading-snug">
                        Tôi xác nhận thông tin cung cấp là đúng theo hiểu biết của mình. <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    {errors.confirmAccuracy && <p className="text-[11px] text-rose-500 ml-6">{errors.confirmAccuracy}</p>}

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmContact}
                        onChange={(e) => setConfirmContact(e.target.checked)}
                        className="mt-0.5 accent-emerald-600 rounded"
                      />
                      <span className="leading-snug">
                        Tôi đồng ý để Ban quản lý Làng SV xem xét thông tin và liên hệ nhằm xác minh bài toán. <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    {errors.confirmContact && <p className="text-[11px] text-rose-500 ml-6">{errors.confirmContact}</p>}

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmPublicImages}
                        onChange={(e) => setConfirmPublicImages(e.target.checked)}
                        className="mt-0.5 accent-emerald-600 rounded"
                      />
                      <span className="leading-snug">
                        Tôi đồng ý để các hình ảnh được chọn công khai hiển thị cùng bài toán sau khi được phê duyệt. <span className="text-rose-500">*</span>
                      </span>
                    </label>
                    {errors.confirmPublicImages && <p className="text-[11px] text-rose-500 ml-6">{errors.confirmPublicImages}</p>}
                  </div>

                  {/* Cam kết bảo mật */}
                  <div className="p-3.5 bg-slate-100 rounded-xl text-[11px] text-slate-600 flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>
                      Ban quản lý cam kết không công khai số điện thoại, email hoặc thông tin liên hệ riêng tư của người đăng trên bài viết công khai.
                    </span>
                  </div>
                </div>
              )}

              {/* ================= STEPPER FOOTER BUTTONS ================= */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={handleSaveDraft}
                  className="px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{draftSaved ? 'Đã lưu nháp!' : 'Lưu nháp'}</span>
                </button>

                <div className="flex items-center gap-2.5">
                  {/* Nút Quay lại */}
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      className="px-4 py-2.5 rounded-full text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Quay lại</span>
                    </button>
                  )}

                  {/* Nút Tiếp tục (Bước 1 -> 4) */}
                  {currentStep < 5 && (
                    <button
                      type="button"
                      onClick={handleNextStep}
                      className="px-6 py-2.5 rounded-full text-xs font-black text-white bg-emerald-600 hover:bg-emerald-700 transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Tiếp tục</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  )}

                  {/* Nút Gửi (Bước 5) */}
                  {currentStep === 5 && (
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-7 py-3 rounded-full text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 transition-all shadow-md hover:shadow-lg active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      <Send className="w-4 h-4" />
                      <span>{isSubmitting ? 'ĐANG GỬI...' : 'GỬI BÀI TOÁN ĐỂ XÁC MINH'}</span>
                    </button>
                  )}
                </div>
              </div>

            </form>
          )}

        </div>
      </div>
    </div>
  );
};
