import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useLanguage } from '../../context/LanguageContext';
import { RealProblem, ProblemCategory } from '../../types';
import { AdminDataService } from '../../services/adminDataService';
import { 
  Home, 
  ChevronRight, 
  ArrowLeft, 
  User, 
  FileText, 
  HeartHandshake, 
  Image as ImageIcon, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Building2, 
  Upload, 
  Plus, 
  Trash2, 
  Save, 
  Send, 
  CheckCircle2, 
  Check, 
  AlertCircle, 
  Sparkles,
  Lock,
  FileSpreadsheet
} from 'lucide-react';

interface PostProblemViewProps {
  onBackToList: () => void;
  onSubmitSuccess: (newProblem: RealProblem) => void;
}

export const PostProblemView: React.FC<PostProblemViewProps> = ({
  onBackToList,
  onSubmitSuccess
}) => {
  const { language } = useLanguage();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);

  // Stepper state (1 -> 5)
  const [currentStep, setCurrentStep] = useState<number>(1);

  // ================= Form States =================
  // Step 1: Thông tin người đăng
  const [submitterType, setSubmitterType] = useState('Nông dân / Hộ sản xuất');
  const [contactName, setContactName] = useState('');
  const [organizationName, setOrganizationName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('Ấp 4, Xã Bình Mỹ, Củ Chi');

  // Step 2: Thông tin bài toán
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<ProblemCategory>('agriculture');
  const [description, setDescription] = useState('');
  const [occurredTime, setOccurredTime] = useState('Mới phát sinh');
  const [affectedAudiences, setAffectedAudiences] = useState<string[]>(['Bản thân / hộ sản xuất']);
  const [cause, setCause] = useState('');
  const [triedSolutions, setTriedSolutions] = useState('');
  const [damages, setDamages] = useState('');

  // Step 3: Nhu cầu hỗ trợ
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [supportNeeded, setSupportNeeded] = useState<string[]>(['Công nghệ / CNTT']);
  const [readyToCoordinate, setReadyToCoordinate] = useState('Có');
  const [canSupportTesting, setCanSupportTesting] = useState('Có');

  // Step 4: Hình ảnh và tài liệu minh chứng
  const [uploadedImages, setUploadedImages] = useState<string[]>([]);
  const [docFile, setDocFile] = useState<{ name: string; size: number } | null>(null);
  const [imageDescription, setImageDescription] = useState('');

  // Step 5: Xác nhận và gửi bài
  const [confirmAccuracy, setConfirmAccuracy] = useState(false);
  const [confirmContact, setConfirmContact] = useState(false);
  const [confirmPublicImages, setConfirmPublicImages] = useState(false);

  // UI / Status states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedProblem, setSubmittedProblem] = useState<RealProblem | null>(null);
  const [draftToast, setDraftToast] = useState(false);
  const [lockNotice, setLockNotice] = useState<string | null>(null);

  // Khóa cuộn trang và lắng nghe phím Escape khi hiển thị modal thành công
  useEffect(() => {
    if (!isSubmitted) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onBackToList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isSubmitted, onBackToList]);

  // Load draft from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem('binhmy_problem_form_draft');
      if (saved) {
        const d = JSON.parse(saved);
        if (d.submitterType) setSubmitterType(d.submitterType);
        if (d.contactName) setContactName(d.contactName);
        if (d.organizationName) setOrganizationName(d.organizationName);
        if (d.phoneNumber) setPhoneNumber(d.phoneNumber);
        if (d.email) setEmail(d.email);
        if (d.location) setLocation(d.location);
        if (d.title) setTitle(d.title);
        if (d.category) setCategory(d.category);
        if (d.description) setDescription(d.description);
        if (d.occurredTime) setOccurredTime(d.occurredTime);
        if (d.affectedAudiences) setAffectedAudiences(d.affectedAudiences);
        if (d.cause) setCause(d.cause);
        if (d.triedSolutions) setTriedSolutions(d.triedSolutions);
        if (d.damages) setDamages(d.damages);
        if (d.desiredOutcome) setDesiredOutcome(d.desiredOutcome);
        if (d.supportNeeded) setSupportNeeded(d.supportNeeded);
        if (d.readyToCoordinate) setReadyToCoordinate(d.readyToCoordinate);
        if (d.canSupportTesting) setCanSupportTesting(d.canSupportTesting);
        if (d.imageDescription) setImageDescription(d.imageDescription);
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Save draft
  const handleSaveDraft = () => {
    try {
      const d = {
        submitterType,
        contactName,
        organizationName,
        phoneNumber,
        email,
        location,
        title,
        category,
        description,
        occurredTime,
        affectedAudiences,
        cause,
        triedSolutions,
        damages,
        desiredOutcome,
        supportNeeded,
        readyToCoordinate,
        canSupportTesting,
        imageDescription
      };
      localStorage.setItem('binhmy_problem_form_draft', JSON.stringify(d));
      setDraftToast(true);
      setTimeout(() => setDraftToast(false), 3000);
    } catch (e) {
      console.error(e);
    }
  };

  // Image Upload handler
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const validFiles: File[] = [];
    let fileError = '';

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      if (!['image/jpeg', 'image/png', 'image/webp', 'image/jpg'].includes(file.type)) {
        fileError = 'Định dạng không hợp lệ. Chỉ chấp nhận JPG, JPEG, PNG, WEBP.';
        continue;
      }
      if (file.size > 10 * 1024 * 1024) {
        fileError = 'Dung lượng ảnh vượt quá 10MB.';
        continue;
      }
      validFiles.push(file);
    }

    if (fileError) {
      setErrors(prev => ({ ...prev, images: fileError }));
    } else {
      setErrors(prev => {
        const n = { ...prev };
        delete n.images;
        return n;
      });
    }

    validFiles.forEach(file => {
      if (uploadedImages.length >= 5) return;
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

  // Document Upload handler
  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, doc: language === 'vi' ? 'Tài liệu không được vượt quá 10MB.' : 'Document must not exceed 10MB.' }));
      return;
    }
    setDocFile({ name: file.name, size: file.size });
    setErrors(prev => {
      const n = { ...prev };
      delete n.doc;
      return n;
    });
  };

  // Toggle Affected Audiences
  const toggleAffectedAudience = (item: string) => {
    setAffectedAudiences(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  // Toggle Support Needed
  const toggleSupportNeeded = (item: string) => {
    setSupportNeeded(prev => 
      prev.includes(item) ? prev.filter(x => x !== item) : [...prev, item]
    );
  };

  // ================= KIỂM TRA ĐIỀU KIỆN HOÀN THÀNH TỪNG BƯỚC =================
  const isStepCompleted = (step: number): boolean => {
    if (step === 1) {
      const validName = contactName.trim().length > 0;
      const validPhone = phoneNumber.trim().length > 0 && /^[0-9+\s\-()]{9,15}$/.test(phoneNumber.trim());
      const validLoc = location.trim().length > 0;
      const validEmail = !email.trim() || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
      return validName && validPhone && validLoc && validEmail;
    }

    if (step === 2) {
      const validTitle = title.trim().length >= 6;
      const validDesc = description.trim().length >= 15;
      const validAudience = affectedAudiences.length > 0;
      return isStepCompleted(1) && validTitle && validDesc && validAudience;
    }

    if (step === 3) {
      const validOutcome = desiredOutcome.trim().length > 0;
      const validSupport = supportNeeded.length > 0;
      return isStepCompleted(2) && validOutcome && validSupport;
    }

    if (step === 4) {
      const validImages = uploadedImages.length > 0;
      return isStepCompleted(3) && validImages;
    }

    if (step === 5) {
      return isStepCompleted(4) && confirmAccuracy && confirmContact && confirmPublicImages;
    }

    return false;
  };

  // Tính bước tối đa đã mở khóa
  const getMaxUnlockedStep = (): number => {
    if (!isStepCompleted(1)) return 1;
    if (!isStepCompleted(2)) return 2;
    if (!isStepCompleted(3)) return 3;
    if (!isStepCompleted(4)) return 4;
    return 5;
  };

  const maxUnlockedStep = getMaxUnlockedStep();

  // Validate chi tiết khi người dùng bấm Tiếp tục
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!contactName.trim()) {
        newErrors.contactName = language === 'vi' ? 'Vui lòng nhập họ và tên người liên hệ.' : 'Please enter the contact person\'s name.';
      }
      if (!phoneNumber.trim()) {
        newErrors.phoneNumber = language === 'vi' ? 'Vui lòng nhập số điện thoại liên hệ.' : 'Please enter a contact phone number.';
      } else if (!/^[0-9+\s\-()]{9,15}$/.test(phoneNumber.trim())) {
        newErrors.phoneNumber = language === 'vi' ? 'Số điện thoại không hợp lệ (từ 9 đến 15 số).' : 'Invalid phone number (9 to 15 digits).';
      }
      if (!location.trim()) {
        newErrors.location = language === 'vi' ? 'Vui lòng nhập địa điểm phát sinh vấn đề.' : 'Please enter the location of the problem.';
      }
      if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
        newErrors.email = language === 'vi' ? 'Email không hợp lệ.' : 'Invalid email address.';
      }
    }

    if (step === 2) {
      if (!title.trim()) {
        newErrors.title = language === 'vi' ? 'Vui lòng nhập tên bài toán bạn đang gặp phải.' : 'Please enter the problem title.';
      } else if (title.trim().length < 6) {
        newErrors.title = language === 'vi' ? 'Tên bài toán cần ít nhất 6 ký tự.' : 'Title must be at least 6 characters.';
      }
      if (!description.trim()) {
        newErrors.description = language === 'vi' ? 'Vui lòng mô tả cụ thể vấn đề bạn đang gặp phải.' : 'Please describe the problem in detail.';
      } else if (description.trim().length < 15) {
        newErrors.description = language === 'vi' ? 'Vui lòng mô tả chi tiết hơn (tối thiểu 15 ký tự).' : 'Please describe in more detail (min 15 characters).';
      }
      if (affectedAudiences.length === 0) {
        newErrors.affectedAudiences = language === 'vi' ? 'Vui lòng chọn ít nhất một đối tượng bị ảnh hưởng.' : 'Please select at least one affected party.';
      }
    }

    if (step === 3) {
      if (!desiredOutcome.trim()) {
        newErrors.desiredOutcome = language === 'vi' ? 'Vui lòng nêu kết quả bạn mong muốn đạt được.' : 'Please state the desired outcome.';
      }
      if (supportNeeded.length === 0) {
        newErrors.supportNeeded = language === 'vi' ? 'Vui lòng chọn ít nhất 1 nguồn lực cần hỗ trợ.' : 'Please select at least 1 support area needed.';
      }
    }

    if (step === 4) {
      if (uploadedImages.length === 0) {
        newErrors.images = language === 'vi' ? 'Bắt buộc tải lên ít nhất 1 hình ảnh minh chứng thực tế.' : 'At least 1 photo is required as evidence.';
      }
    }

    if (step === 5) {
      if (!confirmAccuracy) {
        newErrors.confirmAccuracy = language === 'vi' ? 'Vui lòng xác nhận thông tin cung cấp là đúng.' : 'Please confirm the information provided is accurate.';
      }
      if (!confirmContact) {
        newErrors.confirmContact = language === 'vi' ? 'Vui lòng đồng ý để Ban quản lý xem xét và liên hệ xác minh.' : 'Please agree to let the board review and verify.';
      }
      if (!confirmPublicImages) {
        newErrors.confirmPublicImages = language === 'vi' ? 'Vui lòng đồng ý để các hình ảnh được chọn công khai.' : 'Please agree to public display of the selected images.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Xử lý chuyển bước tiếp theo
  const goToNextStep = () => {
    if (validateStep(currentStep)) {
      setLockNotice(null);
      const next = Math.min(currentStep + 1, 5);
      setCurrentStep(next);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    } else {
      setLockNotice(
        language === 'vi'
          ? `Vui lòng hoàn thành đầy đủ các thông tin bắt buộc (*) ở Bước ${currentStep} trước khi tiếp tục.`
          : `Please fill in all required fields (*) in Step ${currentStep} before proceeding.`
      );
      setTimeout(() => setLockNotice(null), 4000);
    }
  };

  // Xử lý quay lại bước trước
  const goToPrevStep = () => {
    setLockNotice(null);
    const prev = Math.max(currentStep - 1, 1);
    setCurrentStep(prev);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Xử lý click trực tiếp vào Stepper
  const handleStepClick = (targetStep: number) => {
    if (targetStep === currentStep) return;

    // Nếu người dùng muốn nhảy cóc tới bước chưa mở khóa
    if (targetStep > maxUnlockedStep) {
      validateStep(currentStep);
      setLockNotice(
        language === 'vi'
          ? `Bạn cần hoàn thành xong Bước ${maxUnlockedStep} trước mới có thể điền Bước ${targetStep}.`
          : `You must complete Step ${maxUnlockedStep} before moving to Step ${targetStep}.`
      );
      setTimeout(() => setLockNotice(null), 4500);
      return;
    }

    // Cho phép đi tới bước đã mở khóa hoặc quay lại các bước trước
    setLockNotice(null);
    setCurrentStep(targetStep);
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Submit form hoàn tất
  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!validateStep(1) || !validateStep(2) || !validateStep(3) || !validateStep(4) || !validateStep(5)) {
      if (!validateStep(1)) setCurrentStep(1);
      else if (!validateStep(2)) setCurrentStep(2);
      else if (!validateStep(3)) setCurrentStep(3);
      else if (!validateStep(4)) setCurrentStep(4);
      else setCurrentStep(5);
      setLockNotice(
        language === 'vi'
          ? 'Vui lòng kiểm tra lại các trường thông tin bắt buộc còn thiếu.'
          : 'Please check and complete all required fields.'
      );
      return;
    }

    setIsSubmitting(true);

    const newProb: RealProblem = {
      id: `prob-${Date.now()}`,
      submitterType,
      contactName: contactName.trim(),
      organizationName: organizationName.trim() || undefined,
      phoneNumber: phoneNumber.trim(),
      email: email.trim() || undefined,
      location: location.trim(),
      title: title.trim(),
      category,
      categoryDetail: category === 'agriculture' ? 'Nông nghiệp' : category === 'health' ? 'Y tế' : category === 'tourism' ? 'Du lịch' : 'Khác',
      description: description.trim(),
      occurredTime,
      affectedAudience: affectedAudiences.join(', '),
      cause: cause.trim() || undefined,
      triedSolutions: triedSolutions.trim() || undefined,
      damages: damages.trim() || undefined,
      desiredOutcome: desiredOutcome.trim(),
      supportNeeded,
      readyToCoordinate,
      canSupportTesting,
      images: uploadedImages.length > 0 ? uploadedImages : ['/assets/problems/card1.jpg'],
      evidenceDocName: docFile ? docFile.name : undefined,
      imageDescription: imageDescription.trim() || undefined,
      status: 'pending', // ⚠️ Mặc định: Chờ xác minh -> Không công khai trên danh sách
      createdAt: language === 'vi' ? 'Hôm nay' : 'Today',
      isPublic: false
    };

    // Lưu bền vững vào cơ sở dữ liệu hệ thống
    AdminDataService.saveProblem(newProb);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedProblem(newProb);
      setIsSubmitted(true);
      onSubmitSuccess(newProb);
      localStorage.removeItem('binhmy_problem_form_draft');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 600);
  };

  // Danh sách các bước
  const stepsList = language === 'vi' ? [
    { number: 1, label: 'Thông tin người đăng' },
    { number: 2, label: 'Thông tin bài toán' },
    { number: 3, label: 'Nhu cầu hỗ trợ' },
    { number: 4, label: 'Hình ảnh và tài liệu' },
    { number: 5, label: 'Xác nhận và gửi bài' }
  ] : [
    { number: 1, label: 'Submitter Info' },
    { number: 2, label: 'Problem Details' },
    { number: 3, label: 'Support Request' },
    { number: 4, label: 'Photos & Files' },
    { number: 5, label: 'Review & Submit' }
  ];

  // ================= MAIN STEP-BY-STEP PAGE RENDER =================
  return (
    <div className={`w-full bg-[#f8fafc] py-5 sm:py-8 min-h-screen text-slate-800 transition-opacity duration-200 ${isSubmitted ? 'pointer-events-none select-none opacity-40' : ''}`}>
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 space-y-5">

        {/* ================= 1. BREADCRUMBS ================= */}
        <nav className="flex items-center gap-2 text-xs sm:text-sm text-slate-500">
          <button 
            onClick={onBackToList}
            className="flex items-center gap-1 hover:text-emerald-700 transition-colors cursor-pointer"
            title={language === 'vi' ? 'Trang chủ bài toán' : 'Problems Home'}
          >
            <Home className="w-4 h-4 text-slate-400" />
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <button 
            onClick={onBackToList}
            className="hover:text-emerald-700 transition-colors cursor-pointer"
          >
            {language === 'vi' ? 'Bài toán thực tế' : 'Real-World Problems'}
          </button>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="font-semibold text-slate-800">
            {language === 'vi' ? 'Đăng bài toán' : 'Submit Problem'}
          </span>
        </nav>

        {/* ================= 2. BANNER CHÍNH (ĐÃ LÀM SẠCH CHỮ TRÙNG LẶP NỀN) ================= */}
        <div className="relative w-full rounded-2xl overflow-hidden border border-[#cbe8dc] bg-gradient-to-r from-[#eef8f4] via-[#f7fcfa] to-[#e8f5ee] p-5 sm:p-7 shadow-2xs">
          {/* Tranh phong cảnh Bình Mỹ góc phải (không che đè chữ bên trái) */}
          <div 
            className="absolute right-0 top-0 bottom-0 w-3/5 sm:w-1/2 bg-no-repeat bg-right bg-cover opacity-70 pointer-events-none mix-blend-multiply"
            style={{ 
              backgroundImage: "url('/assets/problems/banner-clean.png')",
              backgroundPosition: 'right center'
            }}
          />
          {/* Lớp gradient mịn che sạch chữ cũ bên trái */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#eef8f4] via-[#eef8f4] via-45% to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="w-11 h-11 rounded-2xl bg-white/95 border border-emerald-200/90 shadow-xs flex items-center justify-center text-[#00875a] shrink-0">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-[#00875a]">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.07 0 2.09-.17 3.05-.48C9.53 19.8 6 15.3 6 10c0-2.32.78-4.45 2.09-6.16C9.36 2.68 10.63 2 12 2z" opacity="0.3" />
                  <path d="M21.71 2.29a1 1 0 0 0-1.09-.21C16.5 3.73 13.5 6.2 11.5 9.5c-2.3 3.8-2.6 8.3-.7 12.3a1 1 0 0 0 .9.62c.1 0 .2 0 .3-.02a1 1 0 0 0 .8-.8c1.3-4.8 4.6-8.7 8.9-10.7 2.1-1 3.4-3.1 3.5-5.5a1 1 0 0 0-.5-.88z" />
                </svg>
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl lg:text-[26px] font-bold text-[#006842] tracking-tight leading-snug">
                  {language === 'vi' ? 'Đăng bài toán thực tế' : 'Submit Real-World Problem'}
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  {language === 'vi' 
                    ? 'Chia sẻ vấn đề bạn đang gặp phải để nhận được sự hỗ trợ từ cộng đồng.' 
                    : 'Share challenges you are facing to receive community support and solutions.'}
                </p>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-2 text-[#006842] italic font-semibold text-sm bg-white/85 px-4 py-2 rounded-full border border-emerald-100 shadow-2xs backdrop-blur-xs">
              <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{language === 'vi' ? 'Cùng nhau kiến tạo giải pháp cho Bình Mỹ' : 'Co-creating innovative solutions for Binh My'}</span>
            </div>
          </div>
        </div>

        {/* ================= 3. THANH STEPPER 5 BƯỚC (CĂN CHỈNH CHUẨN 100% THEO ẢNH MẪU) ================= */}
        <div className="bg-white rounded-2xl border border-slate-200/90 py-5 sm:py-6 px-4 sm:px-8 shadow-2xs">
          <div className="relative max-w-4xl mx-auto">

            {/* Hàng chứa các vòng tròn và đường kẻ nối xuyên tâm */}
            <div className="relative flex items-center justify-between">
              
              {/* Đường kẻ nối ngang xuyên tâm chính xác 100% */}
              <div className="absolute left-[5%] right-[5%] top-1/2 -translate-y-1/2 h-[2px] bg-slate-200 z-0 pointer-events-none">
                <div 
                  className="h-full bg-[#00875a] transition-all duration-300"
                  style={{ width: `${((Math.max(currentStep, maxUnlockedStep) - 1) / 4) * 100}%` }}
                />
              </div>

              {/* 5 Vòng tròn số */}
              {stepsList.map((st) => {
                const isActive = currentStep === st.number;
                const isDone = isStepCompleted(st.number) && st.number < currentStep;
                const isUnlocked = st.number <= maxUnlockedStep;
                const isLocked = st.number > maxUnlockedStep;

                return (
                  <div key={st.number} className="relative z-10 flex flex-col items-center">
                    <button
                      type="button"
                      onClick={() => handleStepClick(st.number)}
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold transition-all duration-200 shadow-2xs ${
                        isActive
                          ? 'bg-[#00875a] text-white ring-4 ring-emerald-100 ring-offset-1'
                          : isDone
                          ? 'bg-[#00875a] text-white hover:bg-[#00734c] cursor-pointer'
                          : isUnlocked
                          ? 'bg-white text-[#0284c7] border-2 border-[#38bdf8] hover:border-[#0284c7] cursor-pointer'
                          : 'bg-white text-[#0284c7] border-2 border-[#7dd3fc]/80 opacity-70 hover:opacity-100 cursor-pointer'
                      }`}
                      title={
                        isLocked 
                          ? (language === 'vi' ? `Bước ${st.number}: Hoàn thành bước trước để tiếp tục` : `Step ${st.number}: Complete previous step to unlock`)
                          : (language === 'vi' ? `Bước ${st.number}: ${st.label}` : `Step ${st.number}: ${st.label}`)
                      }
                    >
                      {isDone ? (
                        <Check className="w-5 h-5 stroke-[2.5]" />
                      ) : (
                        st.number
                      )}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Hàng chứa nhãn chữ phía dưới - tách riêng giúp tất cả vòng tròn đồng trục ngang tuyệt đối */}
            <div className="grid grid-cols-5 gap-1 sm:gap-2 mt-3 text-center">
              {stepsList.map((st) => {
                const isActive = currentStep === st.number;
                const isDone = isStepCompleted(st.number) && st.number < currentStep;

                return (
                  <button
                    key={st.number}
                    type="button"
                    onClick={() => handleStepClick(st.number)}
                    className="flex justify-center focus:outline-hidden cursor-pointer"
                  >
                    <span
                      className={`text-[11px] sm:text-xs leading-snug transition-colors ${
                        isActive
                          ? 'font-bold text-[#006842]'
                          : isDone
                          ? 'font-semibold text-slate-700 hover:text-slate-900'
                          : 'font-normal text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {st.label}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>
        </div>

        {/* ================= 4. KHU VỰC CHÍNH 2 CỘT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

          {/* ================= CỘT TRÁI (LỚN): CHỈ HIỂN THỊ FORM HIỆN TẠI ================= */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-5">

            {/* Thông báo khóa bước nếu người dùng nhảy cóc */}
            {lockNotice && (
              <div className="bg-amber-50 border border-amber-300 text-amber-900 px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-fade-in">
                <span className="flex items-center gap-2 font-medium">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  <span>{lockNotice}</span>
                </span>
                <button
                  type="button"
                  onClick={() => setLockNotice(null)}
                  className="text-amber-700 hover:text-amber-900 font-bold ml-2 text-xs p-1"
                >
                  ✕
                </button>
              </div>
            )}

            {/* Toast thông báo lưu bản nháp */}
            {draftToast && (
              <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow-2xs animate-fade-in">
                <span className="flex items-center gap-2 font-medium">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  {language === 'vi' ? 'Đã lưu bản nháp thành công vào trình duyệt của bạn!' : 'Draft saved successfully to your browser!'}
                </span>
                <span className="text-[11px] text-emerald-600 font-mono">
                  {new Date().toLocaleTimeString(language === 'vi' ? 'vi-VN' : 'en-US')}
                </span>
              </div>
            )}

            {/* FORM A: THÔNG TIN NGƯỜI ĐĂNG (BƯỚC 1) */}
            {currentStep === 1 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all animate-fade-in">
                {/* Header thanh A */}
                <div className="bg-[#eef8f4] border-b border-[#d2ede0] px-5 py-3.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                    <User className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-[#006842] text-sm sm:text-base">
                    {language === 'vi' ? 'A. Thông tin người đăng' : 'A. Submitter Information'}
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Bạn là ai? * */}
                    <div className="space-y-2">
                      <label className="block text-xs font-bold text-slate-800">
                        {language === 'vi' ? 'Bạn là ai?' : 'Who are you?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 pt-0.5">
                        {[
                          { value: 'Nông dân / Hộ sản xuất', vi: 'Nông dân / Hộ sản xuất', en: 'Farmer / Household Producer' },
                          { value: 'Doanh nghiệp', vi: 'Doanh nghiệp', en: 'Enterprise / Corporation' },
                          { value: 'Cơ sở kinh doanh', vi: 'Cơ sở kinh doanh', en: 'Business Establishment' },
                          { value: 'Đơn vị địa phương', vi: 'Đơn vị địa phương', en: 'Local Organization / Authority' },
                          { value: 'Khác', vi: 'Khác', en: 'Other' }
                        ].map((item) => (
                          <label 
                            key={item.value} 
                            className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-emerald-800"
                          >
                            <input
                              type="radio"
                              name="submitterType"
                              value={item.value}
                              checked={submitterType === item.value}
                              onChange={(e) => setSubmitterType(e.target.value)}
                              className="w-4 h-4 text-[#00875a] focus:ring-[#00875a] cursor-pointer"
                            />
                            <span>{language === 'vi' ? item.vi : item.en}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Họ và tên & Tên hộ sản xuất */}
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Họ và tên người liên hệ' : 'Full Name of Contact Person'} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          value={contactName}
                          onChange={(e) => {
                            setContactName(e.target.value);
                            if (errors.contactName) setErrors(prev => ({ ...prev, contactName: '' }));
                          }}
                          placeholder={language === 'vi' ? "Nhập họ và tên" : "Enter full name"}
                          className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-[#00875a] transition-all ${
                            errors.contactName ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                        {errors.contactName && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.contactName}</p>
                        )}
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Tên hộ sản xuất, doanh nghiệp hoặc đơn vị' : 'Name of household, business, or unit'}
                        </label>
                        <div className="relative">
                          <Building2 className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="text"
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                            placeholder={language === 'vi' ? "Nhập tên (không bắt buộc)" : "Enter name (optional)"}
                            className="w-full pl-9 pr-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-[#00875a] transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Hàng 2: Số điện thoại + Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        {language === 'vi' ? 'Số điện thoại liên hệ' : 'Contact Phone Number'} <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => {
                            setPhoneNumber(e.target.value);
                            if (errors.phoneNumber) setErrors(prev => ({ ...prev, phoneNumber: '' }));
                          }}
                          placeholder={language === 'vi' ? "Nhập số điện thoại" : "Enter phone number"}
                          className={`w-full pl-9 pr-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-[#00875a] transition-all ${
                            errors.phoneNumber ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        Email
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            if (errors.email) setErrors(prev => ({ ...prev, email: '' }));
                          }}
                          placeholder={language === 'vi' ? "Nhập email (không bắt buộc)" : "Enter email (optional)"}
                          className={`w-full pl-9 pr-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-[#00875a] transition-all ${
                            errors.email ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                          }`}
                        />
                      </div>
                      {errors.email && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Hàng 3: Địa điểm phát sinh vấn đề */}
                  <div>
                    <label className="block text-xs font-bold text-slate-800 mb-1.5">
                      {language === 'vi' ? 'Địa điểm phát sinh vấn đề' : 'Problem Location'} <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (errors.location) setErrors(prev => ({ ...prev, location: '' }));
                        }}
                        placeholder={language === 'vi' ? "Nhập địa chỉ hoặc khu vực tại Bình Mỹ" : "Enter address or hamlet in Binh My"}
                        className={`w-full pl-9 pr-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-[#00875a] transition-all ${
                          errors.location ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-[11px] text-red-500 mt-1">{errors.location}</p>
                    )}
                  </div>
                </div>

                {/* Nút điều hướng chân Form 1 */}
                <div className="bg-slate-50/70 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={onBackToList}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Quay lại danh sách' : 'Back to list'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-98"
                  >
                    <span>{language === 'vi' ? 'Tiếp tục: Thông tin bài toán' : 'Next: Problem Details'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM B: THÔNG TIN BÀI TOÁN (BƯỚC 2) */}
            {currentStep === 2 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all animate-fade-in">
                {/* Header thanh B */}
                <div className="bg-[#f0f7fe] border-b border-[#d6e8fb] px-5 py-3.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1d75c2] text-white flex items-center justify-center shrink-0">
                    <FileText className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-[#1d75c2] text-sm sm:text-base">
                    {language === 'vi' ? 'B. Thông tin bài toán' : 'B. Problem Information'}
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Hàng 1: Tên bài toán + Lĩnh vực */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        {language === 'vi' ? 'Tên bài toán bạn đang gặp phải' : 'Title of the Problem You Face'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={title}
                        onChange={(e) => {
                          setTitle(e.target.value);
                          if (errors.title) setErrors(prev => ({ ...prev, title: '' }));
                        }}
                        placeholder={language === 'vi' ? "Ví dụ: Khó quảng bá nông sản đến khách hàng" : "E.g., Difficulty promoting local produce to consumers"}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 transition-all ${
                          errors.title ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.title && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.title}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-1.5">
                        {language === 'vi' ? 'Bài toán thuộc lĩnh vực nào?' : 'Which category does this belong to?'} <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as ProblemCategory)}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-sky-600 transition-all cursor-pointer"
                      >
                        <option value="agriculture">{language === 'vi' ? 'Nông nghiệp' : 'Agriculture'}</option>
                        <option value="health">{language === 'vi' ? 'Y tế' : 'Healthcare'}</option>
                        <option value="tourism">{language === 'vi' ? 'Du lịch' : 'Tourism'}</option>
                        <option value="other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                      </select>
                    </div>
                  </div>

                  {/* Hàng 2: Bạn đang gặp vấn đề gì? + Vấn đề này xảy ra từ khi nào? */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {language === 'vi' ? 'Bạn đang gặp vấn đề gì?' : 'What problem are you facing?'} <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400">{description.length}/500</span>
                      </div>
                      <textarea
                        rows={4}
                        maxLength={500}
                        value={description}
                        onChange={(e) => {
                          setDescription(e.target.value);
                          if (errors.description) setErrors(prev => ({ ...prev, description: '' }));
                        }}
                        placeholder={language === 'vi' ? "Hãy mô tả cụ thể khó khăn hoặc vấn đề mà bạn đang gặp phải..." : "Please describe specific challenges or bottlenecks you are experiencing..."}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all ${
                          errors.description ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.description && (
                        <p className="text-[11px] text-red-500 mt-0.5">{errors.description}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {language === 'vi' ? 'Vấn đề này xảy ra từ khi nào?' : 'When did this problem start?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 pt-0.5">
                        {[
                          { value: 'Mới phát sinh', vi: 'Mới phát sinh', en: 'Recently emerged' },
                          { value: 'Dưới 6 tháng', vi: 'Dưới 6 tháng', en: 'Under 6 months' },
                          { value: 'Từ 6 tháng đến 1 năm', vi: 'Từ 6 tháng đến 1 năm', en: '6 months to 1 year' },
                          { value: 'Trên 1 năm', vi: 'Trên 1 năm', en: 'Over 1 year' },
                          { value: 'Khác', vi: 'Khác', en: 'Other' }
                        ].map((item) => (
                          <label 
                            key={item.value} 
                            className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-sky-700"
                          >
                            <input
                              type="radio"
                              name="occurredTime"
                              value={item.value}
                              checked={occurredTime === item.value}
                              onChange={(e) => setOccurredTime(e.target.value)}
                              className="w-4 h-4 text-sky-600 focus:ring-sky-500 cursor-pointer"
                            />
                            <span>{language === 'vi' ? item.vi : item.en}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Hàng 3: Vấn đề ảnh hưởng đến ai? + Nguyên nhân của vấn đề */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {language === 'vi' ? 'Vấn đề ảnh hưởng đến ai hoặc hoạt động nào?' : 'Who or what is affected by this issue?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="space-y-2 pt-0.5">
                        {[
                          { value: 'Bản thân / hộ sản xuất', vi: 'Bản thân / hộ sản xuất', en: 'Myself / Household producer' },
                          { value: 'Khách hàng', vi: 'Khách hàng', en: 'Customers / Consumers' },
                          { value: 'Nhân viên / doanh nghiệp', vi: 'Nhân viên / doanh nghiệp', en: 'Employees / Enterprise operations' },
                          { value: 'Cộng đồng địa phương', vi: 'Cộng đồng địa phương', en: 'Local community' },
                          { value: 'Khác', vi: 'Khác', en: 'Other' }
                        ].map((item) => (
                          <label 
                            key={item.value} 
                            className="flex items-center gap-2.5 text-xs text-slate-700 cursor-pointer hover:text-sky-700"
                          >
                            <input
                              type="checkbox"
                              checked={affectedAudiences.includes(item.value)}
                              onChange={() => toggleAffectedAudience(item.value)}
                              className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                            />
                            <span>{language === 'vi' ? item.vi : item.en}</span>
                          </label>
                        ))}
                      </div>
                      {errors.affectedAudiences && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.affectedAudiences}</p>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {language === 'vi' ? 'Bạn cho rằng nguyên nhân của vấn đề là gì?' : 'What do you think is causing this problem?'}
                        </label>
                        <span className="text-[10px] text-slate-400">{cause.length}/500</span>
                      </div>
                      <textarea
                        rows={4}
                        maxLength={500}
                        value={cause}
                        onChange={(e) => setCause(e.target.value)}
                        placeholder={language === 'vi' ? "Hãy mô tả nguyên nhân theo suy nghĩ của bạn..." : "Describe what you think caused this problem..."}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Hàng 4: Đã thử giải quyết bằng cách nào? + Gây ra khó khăn/thiệt hại gì? */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {language === 'vi' ? 'Bạn đã thử giải quyết vấn đề này bằng cách nào?' : 'How have you tried to solve this problem?'}
                        </label>
                        <span className="text-[10px] text-slate-400">{triedSolutions.length}/500</span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={500}
                        value={triedSolutions}
                        onChange={(e) => setTriedSolutions(e.target.value)}
                        placeholder={language === 'vi' ? "Ví dụ: Tự tìm hiểu, nhờ người quen, chưa có giải pháp..." : "E.g., Self-researched, consulted acquaintances, no solution yet..."}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {language === 'vi' ? 'Vấn đề gây ra những khó khăn hoặc thiệt hại gì?' : 'What difficulties or damages has it caused?'}
                        </label>
                        <span className="text-[10px] text-slate-400">{damages.length}/500</span>
                      </div>
                      <textarea
                        rows={3}
                        maxLength={500}
                        value={damages}
                        onChange={(e) => setDamages(e.target.value)}
                        placeholder={language === 'vi' ? "Ví dụ: Khó tiếp cận khách hàng, mất thời gian, chi phí cao..." : "E.g., Hard to reach customers, lost time, high costs..."}
                        className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* Nút điều hướng chân Form 2 */}
                <div className="bg-slate-50/70 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Quay lại bước 1' : 'Back to Step 1'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-98"
                  >
                    <span>{language === 'vi' ? 'Tiếp tục: Nhu cầu hỗ trợ' : 'Next: Support Request'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM C: NHU CẦU HỖ TRỢ (BƯỚC 3) */}
            {currentStep === 3 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all animate-fade-in">
                {/* Header thanh C */}
                <div className="bg-[#f0f7fe] border-b border-[#d6e8fb] px-5 py-3.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1d75c2] text-white flex items-center justify-center shrink-0">
                    <HeartHandshake className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-[#1d75c2] text-sm sm:text-base">
                    {language === 'vi' ? 'C. Nhu cầu hỗ trợ' : 'C. Support Request'}
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Hàng 1: Kết quả mong muốn + Nguồn lực cần hỗ trợ */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <div className="flex items-center justify-between mb-1.5">
                        <label className="block text-xs font-bold text-slate-800">
                          {language === 'vi' ? 'Bạn mong muốn vấn đề được giải quyết như thế nào?' : 'How do you want this problem solved?'} <span className="text-red-500">*</span>
                        </label>
                        <span className="text-[10px] text-slate-400">{desiredOutcome.length}/500</span>
                      </div>
                      <textarea
                        rows={6}
                        maxLength={500}
                        value={desiredOutcome}
                        onChange={(e) => {
                          setDesiredOutcome(e.target.value);
                          if (errors.desiredOutcome) setErrors(prev => ({ ...prev, desiredOutcome: '' }));
                        }}
                        placeholder={language === 'vi' ? "Mô tả kết quả mà bạn mong muốn đạt được..." : "Describe the results you hope to achieve..."}
                        className={`w-full px-3.5 py-2.5 bg-white border rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all ${
                          errors.desiredOutcome ? 'border-red-400 bg-red-50/20' : 'border-slate-200'
                        }`}
                      />
                      {errors.desiredOutcome && (
                        <p className="text-[11px] text-red-500 mt-1">{errors.desiredOutcome}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {language === 'vi' ? 'Bạn cần những nguồn lực nào?' : 'What resources or support do you need?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
                        <div className="space-y-2">
                          {[
                            { value: 'Công nghệ / CNTT', vi: 'Công nghệ / CNTT', en: 'Technology / IT' },
                            { value: 'Marketing / Truyền thông', vi: 'Marketing / Truyền thông', en: 'Marketing / Media' },
                            { value: 'Thiết kế', vi: 'Thiết kế', en: 'Design & Packaging' },
                            { value: 'Kinh doanh / Phát triển thị trường', vi: 'Kinh doanh / Phát triển thị trường', en: 'Business / Market Dev' },
                            { value: 'Nghiên cứu / Khảo sát', vi: 'Nghiên cứu / Khảo sát', en: 'Research / Survey' }
                          ].map((item) => (
                            <label 
                              key={item.value} 
                              className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-sky-700"
                            >
                              <input
                                type="checkbox"
                                checked={supportNeeded.includes(item.value)}
                                onChange={() => toggleSupportNeeded(item.value)}
                                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                              />
                              <span>{language === 'vi' ? item.vi : item.en}</span>
                            </label>
                          ))}
                        </div>

                        <div className="space-y-2">
                          {[
                            { value: 'Chuyên môn y tế', vi: 'Chuyên môn y tế', en: 'Healthcare Expertise' },
                            { value: 'Du lịch', vi: 'Du lịch', en: 'Tourism Expertise' },
                            { value: 'Tài chính', vi: 'Tài chính', en: 'Finance / Investment' },
                            { value: 'Khác', vi: 'Khác', en: 'Other' }
                          ].map((item) => (
                            <label 
                              key={item.value} 
                              className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer hover:text-sky-700"
                            >
                              <input
                                type="checkbox"
                                checked={supportNeeded.includes(item.value)}
                                onChange={() => toggleSupportNeeded(item.value)}
                                className="w-4 h-4 rounded text-sky-600 focus:ring-sky-500 cursor-pointer"
                              />
                              <span>{language === 'vi' ? item.vi : item.en}</span>
                            </label>
                          ))}
                        </div>
                      </div>
                      {errors.supportNeeded && (
                        <p className="text-[11px] text-red-500 mt-1.5">{errors.supportNeeded}</p>
                      )}
                    </div>
                  </div>

                  {/* Hàng 2: Sẵn sàng phối hợp & Hỗ trợ thử nghiệm giải pháp */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {language === 'vi' ? 'Bạn có sẵn sàng phối hợp với sinh viên hoặc chuyên gia không?' : 'Are you ready to coordinate with students or experts?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                        {[
                          { value: 'Có', vi: 'Có', en: 'Yes' },
                          { value: 'Có, nếu được hướng dẫn', vi: 'Có, nếu được hướng dẫn', en: 'Yes, with guidance' },
                          { value: 'Cần trao đổi thêm', vi: 'Cần trao đổi thêm', en: 'Need discussion' }
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer hover:text-sky-700">
                            <input
                              type="radio"
                              name="readyToCoordinate"
                              value={opt.value}
                              checked={readyToCoordinate === opt.value}
                              onChange={(e) => setReadyToCoordinate(e.target.value)}
                              className="w-4 h-4 text-sky-600 focus:ring-sky-500 cursor-pointer"
                            />
                            <span>{language === 'vi' ? opt.vi : opt.en}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-800 mb-2">
                        {language === 'vi' ? 'Bạn có thể hỗ trợ quá trình thử nghiệm giải pháp không?' : 'Can you support testing the solution on-site?'} <span className="text-red-500">*</span>
                      </label>
                      <div className="flex flex-wrap items-center gap-4 text-xs text-slate-700">
                        {[
                          { value: 'Có', vi: 'Có', en: 'Yes' },
                          { value: 'Không', vi: 'Không', en: 'No' },
                          { value: 'Cần trao đổi thêm', vi: 'Cần trao đổi thêm', en: 'Need discussion' }
                        ].map((opt) => (
                          <label key={opt.value} className="flex items-center gap-1.5 cursor-pointer hover:text-sky-700">
                            <input
                              type="radio"
                              name="canSupportTesting"
                              value={opt.value}
                              checked={canSupportTesting === opt.value}
                              onChange={(e) => setCanSupportTesting(e.target.value)}
                              className="w-4 h-4 text-sky-600 focus:ring-sky-500 cursor-pointer"
                            />
                            <span>{language === 'vi' ? opt.vi : opt.en}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Nút điều hướng chân Form 3 */}
                <div className="bg-slate-50/70 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Quay lại bước 2' : 'Back to Step 2'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-98"
                  >
                    <span>{language === 'vi' ? 'Tiếp tục: Hình ảnh và tài liệu' : 'Next: Photos & Files'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM D: HÌNH ẢNH VÀ TÀI LIỆU MINH CHỨNG (BƯỚC 4) */}
            {currentStep === 4 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all animate-fade-in">
                {/* Header thanh D */}
                <div className="bg-[#f0f7fe] border-b border-[#d6e8fb] px-5 py-3.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1d75c2] text-white flex items-center justify-center shrink-0">
                    <ImageIcon className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-[#1d75c2] text-sm sm:text-base">
                    {language === 'vi' ? 'D. Hình ảnh và tài liệu minh chứng' : 'D. Photos & Evidence Documents'}
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
                    
                    {/* Cột trái: Khung tải ảnh thực tế + Tài liệu đính kèm */}
                    <div className="space-y-4">
                      {/* Vùng kéo thả upload ảnh */}
                      <div 
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-sky-300 hover:border-sky-500 rounded-2xl p-6 text-center bg-sky-50/40 hover:bg-sky-50/70 transition-all cursor-pointer group"
                      >
                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleImageUpload}
                          multiple
                          accept="image/jpeg,image/png,image/webp,image/jpg"
                          className="hidden"
                        />
                        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto text-[#0284c7] shadow-2xs group-hover:scale-105 transition-transform mb-3">
                          <Upload className="w-6 h-6 stroke-[2.2]" />
                        </div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                          {language === 'vi' ? 'Tải lên hình ảnh thực tế' : 'Upload Real-World Photos'} <span className="text-red-500">*</span>
                        </h4>
                        <p className="text-[11px] text-slate-500 mt-1">
                          {language === 'vi' ? 'Kéo thả hình ảnh vào đây hoặc nhấn để chọn từ thiết bị.' : 'Drag & drop photos here or click to browse.'}
                        </p>
                        <div className="mt-3">
                          <button
                            type="button"
                            className="px-4 py-1.5 bg-[#0284c7] hover:bg-[#0369a1] text-white text-xs font-semibold rounded-lg shadow-2xs transition-colors pointer-events-none"
                          >
                            {language === 'vi' ? 'Chọn hình ảnh' : 'Choose Images'}
                          </button>
                        </div>
                      </div>

                      <p className="text-[10px] text-slate-400">
                        {language === 'vi' ? 'JPG, JPEG, PNG, WEBP · Tối đa 5 ảnh · Mỗi ảnh < 10MB' : 'JPG, JPEG, PNG, WEBP · Max 5 photos · Under 10MB each'}
                      </p>
                      {errors.images && (
                        <p className="text-[11px] text-red-500 font-medium">{errors.images}</p>
                      )}

                      {/* Tài liệu đính kèm (nếu có) */}
                      <div className="pt-2 border-t border-slate-100">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xs font-bold text-slate-800 block">
                              {language === 'vi' ? 'Tài liệu đính kèm (nếu có)' : 'Attached Document (optional)'}
                            </span>
                            <span className="text-[10px] text-slate-400">
                              {language === 'vi' ? 'PDF, DOC, DOCX, XLSX... · Tối đa 10MB' : 'PDF, DOC, DOCX, XLSX... · Max 10MB'}
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => docInputRef.current?.click()}
                            className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-medium cursor-pointer transition-colors"
                          >
                            {language === 'vi' ? 'Chọn file' : 'Choose file'}
                          </button>
                          <input
                            type="file"
                            ref={docInputRef}
                            onChange={handleDocUpload}
                            accept=".pdf,.doc,.docx,.xlsx,.xls,.txt"
                            className="hidden"
                          />
                        </div>

                        {docFile && (
                          <div className="mt-2.5 p-2 bg-slate-50 rounded-lg border border-slate-200 flex items-center justify-between text-xs text-slate-700">
                            <div className="flex items-center gap-2 truncate">
                              <FileSpreadsheet className="w-4 h-4 text-emerald-600 shrink-0" />
                              <span className="truncate">{docFile.name}</span>
                              <span className="text-slate-400 text-[10px]">({Math.round(docFile.size / 1024)} KB)</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setDocFile(null)}
                              className="text-red-500 hover:text-red-700 ml-2 p-1"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                        {errors.doc && (
                          <p className="text-[11px] text-red-500 mt-1">{errors.doc}</p>
                        )}
                      </div>
                    </div>

                    {/* Cột phải: 5 ô ảnh đã chọn & Mô tả hình ảnh */}
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-xs font-bold text-slate-800">
                            {language === 'vi' ? `Ảnh đã chọn (${uploadedImages.length}/5)` : `Selected Photos (${uploadedImages.length}/5)`} <span className="text-red-500">*</span>
                          </label>
                          <span className="text-[10px] text-slate-400">
                            {language === 'vi' ? 'Bắt buộc tối thiểu 1 ảnh' : 'Minimum 1 photo required'}
                          </span>
                        </div>

                        {/* 5 slot ảnh */}
                        <div className="grid grid-cols-5 gap-2">
                          {[0, 1, 2, 3, 4].map((slotIdx) => {
                            const imgUrl = uploadedImages[slotIdx];
                            if (imgUrl) {
                              return (
                                <div 
                                  key={slotIdx} 
                                  className="relative aspect-square rounded-xl overflow-hidden border border-slate-200 bg-slate-50 group"
                                >
                                  <img 
                                    src={imgUrl} 
                                    alt={`Ảnh ${slotIdx + 1}`} 
                                    className="w-full h-full object-cover" 
                                  />
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveImage(slotIdx)}
                                    className="absolute inset-0 bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    title={language === 'vi' ? 'Xóa ảnh này' : 'Remove this photo'}
                                  >
                                    <Trash2 className="w-4 h-4" />
                                  </button>
                                </div>
                              );
                            }

                            if (slotIdx === uploadedImages.length) {
                              return (
                                <button
                                  key={slotIdx}
                                  type="button"
                                  onClick={() => fileInputRef.current?.click()}
                                  className="aspect-square rounded-xl border-2 border-dashed border-sky-300 hover:border-sky-500 bg-sky-50/50 flex flex-col items-center justify-center text-sky-600 transition-colors cursor-pointer"
                                  title={language === 'vi' ? 'Thêm ảnh' : 'Add photo'}
                                >
                                  <Plus className="w-4 h-4" />
                                  <span className="text-[9px] font-semibold mt-0.5">
                                    {language === 'vi' ? 'Thêm ảnh' : 'Add photo'}
                                  </span>
                                </button>
                              );
                            }

                            return (
                              <div
                                key={slotIdx}
                                className="aspect-square rounded-xl border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-300"
                              >
                                <ImageIcon className="w-4 h-4" />
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Mô tả hình ảnh minh chứng */}
                      <div>
                        <div className="flex items-center justify-between mb-1.5">
                          <label className="block text-xs font-bold text-slate-800">
                            {language === 'vi' ? 'Mô tả hình ảnh minh chứng' : 'Photo Context & Description'}
                          </label>
                          <span className="text-[10px] text-slate-400">{imageDescription.length}/100</span>
                        </div>
                        <textarea
                          rows={3}
                          maxLength={100}
                          value={imageDescription}
                          onChange={(e) => setImageDescription(e.target.value)}
                          placeholder={language === 'vi' ? "Giải thích ảnh thể hiện vấn đề gì, ở đâu và trong hoàn cảnh nào..." : "Explain what the photo shows, location, and circumstances..."}
                          className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-sky-600 resize-none transition-all"
                        />
                      </div>
                    </div>

                  </div>
                </div>

                {/* Nút điều hướng chân Form 4 */}
                <div className="bg-slate-50/70 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Quay lại bước 3' : 'Back to Step 3'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={goToNextStep}
                    className="px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-[#00875a] hover:bg-[#00734c] transition-colors shadow-2xs cursor-pointer flex items-center gap-1.5 active:scale-98"
                  >
                    <span>{language === 'vi' ? 'Tiếp tục: Xác nhận và gửi bài' : 'Next: Review & Submit'}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* FORM E: XÁC NHẬN VÀ GỬI BÀI (BƯỚC 5) */}
            {currentStep === 5 && (
              <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden transition-all animate-fade-in">
                {/* Header thanh E */}
                <div className="bg-[#eef8f4] border-b border-[#d2ede0] px-5 py-3.5 flex items-center gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#00875a] text-white flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-3.5 h-3.5" />
                  </div>
                  <h2 className="font-bold text-[#006842] text-sm sm:text-base">
                    {language === 'vi' ? 'E. Xác nhận và gửi bài' : 'E. Review & Submit'}
                  </h2>
                </div>

                <div className="p-5 sm:p-6 space-y-5">
                  {/* Bản tóm tắt nhanh thông tin đã nhập */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 text-xs space-y-2">
                    <div className="font-bold text-slate-800 text-[13px] border-b border-slate-200 pb-1.5 flex items-center justify-between">
                      <span>{language === 'vi' ? 'Tóm tắt bài toán gửi đi' : 'Submission Summary'}</span>
                      <span className="text-[11px] font-normal text-slate-500">
                        {language === 'vi' ? 'Vui lòng rà soát trước khi gửi' : 'Please review before submission'}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-600 pt-1">
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Người liên hệ:' : 'Contact Person:'}</strong> {contactName || (language === 'vi' ? '(Chưa nhập)' : '(Not entered)')} ({submitterType})
                      </div>
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Điện thoại:' : 'Phone:'}</strong> {phoneNumber || (language === 'vi' ? '(Chưa nhập)' : '(Not entered)')}
                      </div>
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Tiêu đề:' : 'Title:'}</strong> {title || (language === 'vi' ? '(Chưa nhập)' : '(Not entered)')}
                      </div>
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Địa điểm:' : 'Location:'}</strong> {location || (language === 'vi' ? '(Chưa nhập)' : '(Not entered)')}
                      </div>
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Lĩnh vực:' : 'Category:'}</strong> {category === 'agriculture' ? (language === 'vi' ? 'Nông nghiệp' : 'Agriculture') : category === 'health' ? (language === 'vi' ? 'Y tế' : 'Healthcare') : category === 'tourism' ? (language === 'vi' ? 'Du lịch' : 'Tourism') : (language === 'vi' ? 'Khác' : 'Other')}
                      </div>
                      <div>
                        <strong className="text-slate-800">{language === 'vi' ? 'Ảnh minh chứng:' : 'Evidence Photos:'}</strong> {uploadedImages.length} {language === 'vi' ? 'ảnh' : 'photos'}
                      </div>
                    </div>
                  </div>

                  {/* 3 Checkboxes cam kết */}
                  <div className="space-y-3 pt-1">
                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmAccuracy}
                        onChange={(e) => {
                          setConfirmAccuracy(e.target.checked);
                          if (errors.confirmAccuracy) setErrors(prev => ({ ...prev, confirmAccuracy: '' }));
                        }}
                        className="w-4 h-4 mt-0.5 rounded text-[#00875a] focus:ring-[#00875a] cursor-pointer"
                      />
                      <span>
                        {language === 'vi' 
                          ? 'Tôi xác nhận thông tin cung cấp là đúng theo hiểu biết của mình.' 
                          : 'I confirm the provided information is true to the best of my knowledge.'} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.confirmAccuracy && (
                      <p className="text-[11px] text-red-500 pl-6">{errors.confirmAccuracy}</p>
                    )}

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmContact}
                        onChange={(e) => {
                          setConfirmContact(e.target.checked);
                          if (errors.confirmContact) setErrors(prev => ({ ...prev, confirmContact: '' }));
                        }}
                        className="w-4 h-4 mt-0.5 rounded text-[#00875a] focus:ring-[#00875a] cursor-pointer"
                      />
                      <span>
                        {language === 'vi'
                          ? 'Tôi đồng ý để Ban quản lý Làng SV xem xét thông tin và liên hệ nhằm xác minh bài toán.'
                          : 'I agree to allow the Innovation Village Board to review information and contact me for verification.'} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.confirmContact && (
                      <p className="text-[11px] text-red-500 pl-6">{errors.confirmContact}</p>
                    )}

                    <label className="flex items-start gap-2.5 text-xs text-slate-700 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={confirmPublicImages}
                        onChange={(e) => {
                          setConfirmPublicImages(e.target.checked);
                          if (errors.confirmPublicImages) setErrors(prev => ({ ...prev, confirmPublicImages: '' }));
                        }}
                        className="w-4 h-4 mt-0.5 rounded text-[#00875a] focus:ring-[#00875a] cursor-pointer"
                      />
                      <span>
                        {language === 'vi'
                          ? 'Tôi đồng ý để các hình ảnh được chọn công khai hiển thị cùng bài toán sau khi được phê duyệt.'
                          : 'I agree that selected photos may be publicly displayed once approved.'} <span className="text-red-500">*</span>
                      </span>
                    </label>
                    {errors.confirmPublicImages && (
                      <p className="text-[11px] text-red-500 pl-6">{errors.confirmPublicImages}</p>
                    )}
                  </div>

                  {/* Dòng bảo mật thông tin & Nút hành động */}
                  <div className="pt-3 border-t border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-2 text-[11px] text-slate-500">
                      <Lock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span>
                        {language === 'vi' 
                          ? 'Không công khai số điện thoại, email hoặc thông tin liên hệ riêng tư của người đăng trên bài viết.' 
                          : 'Phone numbers, emails, and private personal contact information will NOT be published.'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2.5 shrink-0">
                      <button
                        type="button"
                        onClick={handleSaveDraft}
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                      >
                        <Save className="w-4 h-4 text-slate-500" />
                        <span>{language === 'vi' ? 'Lưu bản nháp' : 'Save Draft'}</span>
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-[#00875a] hover:bg-[#00734c] text-white text-xs sm:text-sm font-semibold transition-all shadow-2xs disabled:opacity-50 cursor-pointer active:scale-98"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            <span>{language === 'vi' ? 'Đang gửi...' : 'Submitting...'}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{language === 'vi' ? 'Gửi bài toán để xác minh' : 'Submit Problem for Verification'}</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>

                {/* Nút điều hướng chân Form 5 */}
                <div className="bg-slate-50/70 border-t border-slate-200/80 px-5 py-3.5 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={goToPrevStep}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>{language === 'vi' ? 'Quay lại bước 4' : 'Back to Step 4'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* Nút Quay lại chung ở góc dưới cùng */}
            <div className="pt-2">
              <button
                type="button"
                onClick={onBackToList}
                className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'vi' ? 'Quay lại danh sách bài toán' : 'Back to problems list'}</span>
              </button>
            </div>

          </div>

          {/* ================= CỘT PHẢI (SIDEBAR): LƯU Ý QUAN TRỌNG & CALLOUT CARD ================= */}
          <div className="lg:col-span-4 xl:col-span-3 space-y-4">

            {/* Card 1: Lưu ý quan trọng (Đúng theo ảnh mẫu) */}
            <div className="bg-white border border-slate-200/90 rounded-2xl p-5 space-y-4 shadow-2xs">
              <div className="flex items-center gap-2 text-[#006842]">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <h3 className="font-bold text-sm sm:text-[15px] leading-tight">
                  {language === 'vi' ? 'Lưu ý quan trọng' : 'Important Notes'}
                </h3>
              </div>

              <div className="space-y-3 pt-1 text-xs text-slate-600 leading-relaxed">
                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <p>
                    {language === 'vi' 
                      ? 'Vui lòng cung cấp thông tin càng chi tiết càng tốt để chúng tôi có thể hỗ trợ bạn hiệu quả hơn.' 
                      : 'Please provide as much detail as possible to help match you with effective solutions.'}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <p>
                    {language === 'vi'
                      ? 'Bắt buộc tải lên ít nhất 1 hình ảnh minh chứng về vấn đề bạn đang gặp phải.'
                      : 'At least 1 photo showing the real-world issue is required.'}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <p>
                    {language === 'vi'
                      ? 'Ban quản lý sẽ kiểm tra và xác minh thông tin trước khi bài toán được công khai.'
                      : 'The board reviews and verifies information before the problem is published.'}
                  </p>
                </div>

                <div className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <p>
                    {language === 'vi'
                      ? 'Bạn sẽ nhận được thông báo khi có phản hồi hoặc cần bổ sung thông tin.'
                      : 'You will receive updates when proposals are made or additional information is needed.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Card 2: Chia sẻ bài toán của bạn (Callout theo ảnh mẫu) */}
            <div className="bg-gradient-to-b from-[#eaf8f1] to-[#eef7fd] border border-[#cbe8dc] rounded-2xl p-6 text-center space-y-3.5 shadow-2xs relative overflow-hidden">
              {/* Minh họa cuốn sổ + cây bút và lá xanh */}
              <div className="w-16 h-16 mx-auto relative flex items-center justify-center">
                <div className="w-14 h-14 rounded-full bg-white/80 shadow-2xs flex items-center justify-center">
                  <svg viewBox="0 0 44 44" fill="none" className="w-10 h-10">
                    <circle cx="22" cy="22" r="20" fill="#D7F3E6" />
                    <rect x="13" y="11" width="18" height="23" rx="2.5" fill="white" stroke="#cbe8dc" strokeWidth="1" />
                    <line x1="16.5" y1="16.5" x2="27.5" y2="16.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <line x1="16.5" y1="20.5" x2="27.5" y2="20.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <line x1="16.5" y1="24.5" x2="27.5" y2="24.5" stroke="#15803D" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
                    <g transform="rotate(25 28 11)">
                      <rect x="26.5" y="6" width="3.5" height="13" rx="1.5" fill="#0C4A6E" />
                      <path d="M26.5 19L28.25 22.5L30 19H26.5Z" fill="#0284C7" />
                    </g>
                    <path d="M29 23C32 23 35 25 35 28C35 30 32 30 29 28Z" fill="#15803D" />
                  </svg>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-[#006842] text-sm sm:text-base">
                  {language === 'vi' ? 'Chia sẻ bài toán của bạn' : 'Share Your Challenge'}
                </h4>
                <p className="text-xs text-sky-700 font-medium mt-0.5">
                  {language === 'vi' ? 'Cùng nhau tìm ra giải pháp!' : 'Co-creating solutions together!'}
                </p>
              </div>

              {/* Chiếc lá trang trí góc phải */}
              <div className="absolute right-3 bottom-3 text-emerald-600/70 pointer-events-none">
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
                </svg>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* ================= MODAL SUBMISSION SUCCESS (PORTAL VÀO BODY) ================= */}
      {typeof document !== 'undefined' && isSubmitted && createPortal(
        <div 
          className="fixed inset-0 z-[9999] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto animate-fade-in pointer-events-auto select-auto"
          onClick={onBackToList}
          role="dialog"
          aria-modal="true"
        >
          {/* Hộp Card màu trắng bên ngoài */}
          <div 
            className="relative my-auto bg-white rounded-3xl p-4 sm:p-6 shadow-2xl max-w-[480px] w-full border border-slate-100 animate-fade-in"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Hộp bo góc màu xanh bạc hà bên trong */}
            <div className="bg-[#eaf7f0] rounded-2xl sm:rounded-[22px] p-6 sm:p-8 text-center space-y-4">
              
              {/* Vòng tròn xanh lá đậm chứa dấu tích trắng */}
              <div className="w-14 h-14 rounded-full bg-[#1b804e] text-white flex items-center justify-center mx-auto shadow-xs">
                <Check className="w-7 h-7 stroke-[3.5]" />
              </div>

              {/* Tiêu đề thông báo */}
              <h3 className="text-xl sm:text-[22px] font-bold text-[#006842] leading-snug">
                {language === 'vi' ? 'Gửi bài toán thành công!' : 'Problem Submitted Successfully!'}
              </h3>

              {/* Nội dung 3 dòng theo đúng ảnh mẫu */}
              <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed font-normal">
                {language === 'vi' ? (
                  <>
                    Bài toán của bạn đã được gửi thành công. Ban quản lý Làng SV<br className="hidden sm:inline" />
                    {' '}sẽ xem xét thông tin và liên hệ khi cần xác minh thêm.<br className="hidden sm:inline" />
                    {' '}Bài toán chỉ được công khai sau khi được phê duyệt.
                  </>
                ) : (
                  <>
                    Your problem has been submitted successfully. The Village board<br className="hidden sm:inline" />
                    {' '}will review information and contact you if needed.<br className="hidden sm:inline" />
                    {' '}The problem will be published once officially verified.
                  </>
                )}
              </p>

              {/* Nút Đóng màu xanh bo tròn */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBackToList}
                  className="w-36 sm:w-40 py-2.5 rounded-full bg-[#1b804e] hover:bg-[#156d42] text-white text-sm font-semibold transition-all shadow-xs cursor-pointer active:scale-95"
                >
                  {language === 'vi' ? 'Đóng' : 'Close'}
                </button>
              </div>

            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
