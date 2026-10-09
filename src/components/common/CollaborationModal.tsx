import React, { useState, useEffect, useRef } from 'react';
import { X, CheckCircle2, Building, User, Phone, Mail, ArrowLeft, ChevronDown, CheckSquare, Upload, FileText, Info, Trash2, Check } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import entrepreneurImg from '../../assets/joinus-entrepreneurs.jpg';
import expertsImg from '../../assets/joinus-experts.jpg';
import vacanciesImg from '../../assets/joinus-vacancies.jpg';
import arrowImg from '../../assets/joinus-arrow.svg';

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
  const { language, setLanguage } = useLanguage();
  const [viewMode, setViewMode] = useState<'cards' | 'sme' | 'partner' | 'vacancies'>('cards');
  const [formStep, setFormStep] = useState<1 | 2 | 3>(1);
  const [submitted, setSubmitted] = useState(false);

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    department: '',
    message: '',
  });
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);

  // Vacancy / Recruitment Form State (Matching Image 1)
  const [vacancyForm, setVacancyForm] = useState({
    fullName: '',
    email: '',
    phoneCountry: 'Hà Lan',
    phoneDialCode: '+31',
    phone: '',
    cvFileName: '',
    coverLetterFileName: '',
    coverLetterTextMode: false,
    coverLetterText: '',
    meetsEligibility: 'yes', // 'yes' | 'no'
    languages: ['Tiếng Anh'] as string[],
    otherLanguage: '',
    livedAbroad: '',
    multiculturalExp: '',
    agreePrivacy: false,
    agreeScreening: false,
    agreeRetention180Days: false,
  });
  const [vacancySubmitted, setVacancySubmitted] = useState(false);
  const cvFileInputRef = useRef<HTMLInputElement>(null);
  const coverLetterFileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState({
    // Step 1: About your Company or Organisation
    companyName: '',
    country: 'Vietnam',
    establishedYear: '',
    sector: '',
    description: '',
    supportRequest: '',
    // Step 2: Contact and Practical Details
    firstName: '',
    surname: '',
    jobTitle: '',
    gender: '',
    phone: '',
    email: '',
    preferredLanguage: 'Vietnamese',
    companyAddress: '',
    cityArea: '',
    website: '',
    socialMedia: '',
    representativeContact: 'No',
    // Step 3: Additional Details
    employeeCount: '',
    annualRevenue: '',
    isPrivatelyOwned: '',
    companyType: '',
    agreedConditions: false,
    additionalRemarks: '',
  });

  // Reset to cards view or direct form when modal is opened afresh
  useEffect(() => {
    if (isOpen) {
      if (defaultType === 'partner') {
        setViewMode('partner');
        setPartnerSubmitted(false);
      } else if (defaultType === 'vacancies') {
        setViewMode('vacancies');
        setVacancySubmitted(false);
      } else if (defaultTitle && defaultType !== 'general') {
        setViewMode('sme');
        setFormStep(1);
        setSubmitted(false);
      } else {
        setViewMode('cards');
        setFormStep(1);
        setSubmitted(false);
        setPartnerSubmitted(false);
        setVacancySubmitted(false);
      }
    }
  }, [isOpen, defaultType, defaultTitle]);

  // Support ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectCard = (category: 'sme' | 'partner' | 'vacancies') => {
    if (category === 'partner') {
      setViewMode('partner');
      setPartnerSubmitted(false);
    } else if (category === 'vacancies') {
      setViewMode('vacancies');
      setVacancySubmitted(false);
    } else {
      setViewMode('sme');
      setFormStep(1);
      setSubmitted(false);
    }
  };

  const handleNextToStep2 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(2);
  };

  const handleNextToStep3 = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStep(3);
  };

  const handleSubmitFinal = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormStep(1);
    setViewMode('cards');
    onClose();
  };

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPartnerSubmitted(true);
  };

  const handlePartnerReset = () => {
    setPartnerSubmitted(false);
    setPartnerForm({
      fullName: '',
      phone: '',
      email: '',
      department: '',
      message: '',
    });
    setViewMode('cards');
    onClose();
  };

  const handleVacancySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!vacancyForm.agreePrivacy || !vacancyForm.agreeScreening || !vacancyForm.agreeRetention180Days) {
      alert(
        language === 'vi'
          ? 'Vui lòng đánh dấu chọn tất cả các điều khoản thỏa thuận pháp lý bắt buộc.'
          : 'Please accept all required legal agreement checkboxes.'
      );
      return;
    }
    setVacancySubmitted(true);
  };

  const handleVacancyReset = () => {
    setVacancySubmitted(false);
    setVacancyForm({
      fullName: '',
      email: '',
      phoneCountry: 'Hà Lan',
      phoneDialCode: '+31',
      phone: '',
      cvFileName: '',
      coverLetterFileName: '',
      coverLetterTextMode: false,
      coverLetterText: '',
      meetsEligibility: 'yes',
      languages: ['Tiếng Anh'],
      otherLanguage: '',
      livedAbroad: '',
      multiculturalExp: '',
      agreePrivacy: false,
      agreeScreening: false,
      agreeRetention180Days: false,
    });
    setViewMode('cards');
    onClose();
  };

  const toggleVacancyLanguage = (lang: string) => {
    setVacancyForm(prev => {
      const exists = prev.languages.includes(lang);
      return {
        ...prev,
        languages: exists ? prev.languages.filter(l => l !== lang) : [...prev.languages, lang]
      };
    });
  };

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVacancyForm(prev => ({ ...prev, cvFileName: e.target.files![0].name }));
    }
  };

  const handleCoverLetterFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVacancyForm(prev => ({ ...prev, coverLetterFileName: e.target.files![0].name }));
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dimmed Backdrop below Header */}
      <div
        className="fixed inset-0 top-[72px] bg-slate-900/65 backdrop-blur-xs transition-opacity animate-fade-in"
        onClick={onClose}
      />

      {/* Full-width Wide Mega Panel Flush with Header */}
      <div className="relative top-[72px] left-0 right-0 w-full bg-[#1F473E] border-b border-emerald-900/80 shadow-2xl z-50 max-h-[calc(100vh-72px)] overflow-y-auto animate-in slide-in-from-top-3 duration-250">
        
        {/* Close Button at top right */}
        <button
          onClick={onClose}
          className="absolute top-5 right-6 sm:right-10 lg:right-12 xl:right-16 z-30 w-11 h-11 rounded-full bg-white/15 hover:bg-white/25 text-white flex items-center justify-center transition-colors cursor-pointer shadow-md"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* ================= VIEW 1: WIDE FULL-WIDTH 4-COLUMN PANEL ================= */}
        {viewMode === 'cards' && (
          <div className="w-full max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-8 sm:py-10 lg:py-12 select-none animate-in fade-in duration-200">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 xl:gap-8 items-stretch">
              
              {/* Card 1: Với tư cách là doanh nghiệp vừa và nhỏ hoặc tổ chức */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard('sme');
                }}
                className="group relative flex flex-col bg-[#D6E7D8] hover:bg-white text-[#13382c] transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-1 rounded-xs"
              >
                <div className="w-full h-52 sm:h-56 lg:h-60 xl:h-64 overflow-hidden relative">
                  <img
                    src={entrepreneurImg}
                    alt="Với tư cách là doanh nghiệp vừa và nhỏ hoặc tổ chức"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5 xl:p-6 flex-grow justify-start min-h-[140px] xl:min-h-[155px]">
                  <h3 className="font-bold text-base sm:text-lg lg:text-[18.5px] leading-snug text-[#13382c]">
                    {language === 'vi'
                      ? 'Với tư cách là doanh nghiệp vừa và nhỏ hoặc tổ chức'
                      : 'As SME or organisation'}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#13382c]/85 mt-2">
                    {language === 'vi'
                      ? 'Hãy hợp tác với Làng Sinh Viên Bình Mỹ và cùng nhau xây dựng một tương lai tốt đẹp hơn cho cộng đồng của bạn.'
                      : 'Collaborate with Binh My Student Village and build a better future for your community.'}
                  </p>
                </div>
              </div>

              {/* Card 2: Với tư cách là đối tác */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard('partner');
                }}
                className="group relative flex flex-col bg-[#D6E7D8] hover:bg-white text-[#13382c] transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-1 rounded-xs"
              >
                <div className="w-full h-52 sm:h-56 lg:h-60 xl:h-64 overflow-hidden relative">
                  <img
                    src={expertsImg}
                    alt="Với tư cách là đối tác"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5 xl:p-6 flex-grow justify-start min-h-[140px] xl:min-h-[155px]">
                  <h3 className="font-bold text-base sm:text-lg lg:text-[18.5px] leading-snug text-[#13382c]">
                    {language === 'vi' ? 'Với tư cách là đối tác' : 'As partner'}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#13382c]/85 mt-2">
                    {language === 'vi'
                      ? 'Làng Sinh Viên Bình Mỹ tin tưởng vào sức mạnh của sự hợp tác để nâng cao hiệu quả.'
                      : 'Binh My Student Village believes in the power of collaboration to enhance impact.'}
                  </p>
                </div>
              </div>

              {/* Column 3: "Or, check out our vacancies" and hand-drawn orange arrow */}
              <div className="hidden lg:flex items-center justify-center relative w-full h-full py-4 px-2">
                <img
                  src={arrowImg}
                  alt="Or, check out our vacancies"
                  className="w-full h-auto object-contain max-h-[340px] select-none pointer-events-none"
                />
              </div>

              {/* Mobile/Tablet Fallback Connector */}
              <div className="lg:hidden flex flex-col items-center justify-center py-4 text-center">
                <span className="text-[#D6E7D8] font-bold text-sm tracking-wide mb-2">
                  {language === 'vi' ? 'Hoặc, khám phá các vị trí tuyển dụng' : 'Or, check out our vacancies'}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#E68E54] text-white flex items-center justify-center shadow-md animate-bounce font-bold text-sm">
                  ↓
                </div>
              </div>

              {/* Card 3: Vị trí tuyển dụng */}
              <div
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelectCard('vacancies');
                }}
                className="group relative flex flex-col bg-[#D6E7D8] hover:bg-white text-[#13382c] transition-all duration-300 shadow-md hover:shadow-2xl cursor-pointer overflow-hidden transform hover:-translate-y-1 rounded-xs"
              >
                <div className="w-full h-52 sm:h-56 lg:h-60 xl:h-64 overflow-hidden relative">
                  <img
                    src={vacanciesImg}
                    alt="Vị trí tuyển dụng"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="flex flex-col gap-1.5 p-5 xl:p-6 flex-grow justify-start min-h-[140px] xl:min-h-[155px]">
                  <h3 className="font-bold text-base sm:text-lg lg:text-[18.5px] leading-snug text-[#13382c]">
                    {language === 'vi' ? 'Vị trí tuyển dụng' : 'Vacancies'}
                  </h3>
                  <p className="text-xs sm:text-[13.5px] leading-relaxed text-[#13382c]/85 mt-2">
                    {language === 'vi'
                      ? 'Nhân viên, chuyên gia, quản lý quốc gia và đại diện quốc gia'
                      : 'Employee, expert, country manager and country representative'}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* ================= VIEW 2: MULTI-STEP "APPLY FOR ADVICE" FORM ================= */}
        {viewMode === 'sme' && (
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-in fade-in duration-200">
            
            {/* Top Navigation Row: Back Button */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setViewMode('cards')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D6E7D8] hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{language === 'vi' ? 'Quay lại các lựa chọn' : 'Back to options'}</span>
              </button>
            </div>

            {/* Main Form White Paper Card */}
            <div className="bg-white rounded-xs shadow-2xl overflow-hidden border border-slate-200">
              
              {/* Header Bar: Brand & Language Selector */}
              <div className="bg-[#13382c] px-6 py-2.5 flex items-center justify-between text-white border-b border-emerald-900">
                <div className="flex items-center gap-2 font-black tracking-wider text-sm sm:text-base">
                  <span>{language === 'vi' ? 'LÀNG SINH VIÊN BÌNH MỸ' : 'BINH MY STUDENT VILLAGE'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-10 lg:p-12 text-slate-800">
                
                {/* Title and Orange Accent Bar */}
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-normal text-slate-900 tracking-tight">
                  {language === 'vi' ? 'Đăng ký nhận tư vấn' : 'Apply for advice'}
                </h1>
                <div className="w-full h-[2px] bg-[#E68E54] mt-3 mb-5" />

                {submitted ? (
                  <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-emerald-100 text-[#13382c] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {language === 'vi' ? 'Gửi đăng ký thành công!' : 'Application Submitted!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === 'vi'
                        ? 'Cảm ơn bạn đã gửi hồ sơ đăng ký tư vấn. Đội ngũ chuyên gia Làng Sinh Viên Bình Mỹ sẽ xem xét và liên hệ với bạn trong thời gian sớm nhất.'
                        : 'Thank you for submitting your application. The Binh My Student Village team will contact you to further process your application.'}
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handleReset}
                        className="px-8 py-2.5 bg-[#13382c] hover:bg-emerald-900 text-white font-bold text-xs rounded-xs shadow-md transition-colors cursor-pointer"
                      >
                        {language === 'vi' ? 'Hoàn tất' : 'Done'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    {/* Progress Bar (0% at Step 1, 33% at Step 2, 66% at Step 3) */}
                    <div className="w-full bg-slate-100 h-5 mb-5 relative flex items-center overflow-hidden border border-slate-200 rounded-none">
                      {formStep === 1 && (
                        <div className="h-full flex items-center pl-2">
                          <span className="text-[10px] font-bold text-slate-500">0%</span>
                        </div>
                      )}
                      {formStep === 2 && (
                        <div
                          className="bg-[#E68E54] h-full text-white text-[10px] font-bold flex items-center justify-center transition-all duration-300"
                          style={{ width: '33%' }}
                        >
                          33%
                        </div>
                      )}
                      {formStep === 3 && (
                        <div
                          className="bg-[#E68E54] h-full text-white text-[10px] font-bold flex items-center justify-center transition-all duration-300"
                          style={{ width: '66%' }}
                        >
                          66%
                        </div>
                      )}
                    </div>

                    {/* Step 1 Introduction & Notes */}
                    {formStep === 1 && (
                      <>
                        <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mb-3">
                          {language === 'vi'
                            ? 'Cảm ơn bạn đã quan tâm đến việc hợp tác cùng Làng Sinh Viên Bình Mỹ. Trong biểu mẫu này, chúng tôi mong bạn cung cấp một số thông tin về công ty hoặc tổ chức của bạn. Biểu mẫu này mất khoảng 10 phút để hoàn thành. Nếu bạn không chắc chắn về một số câu trả lời, vui lòng cung cấp ước tính tốt nhất của bạn. Sau đó, chuyên viên Làng Sinh Viên Bình Mỹ sẽ liên hệ với bạn để tiếp tục xử lý hồ sơ.'
                            : 'Thank you for your interest in collaborating with Binh My Student Village. In this form, we ask you to provide some information on your company or organisation. This form takes about 10 minutes to complete. If you are unsure about some answers, please provide your best estimate. Afterwards, a Binh My Student Village staff member will contact you to further process your application.'}
                        </p>

                        <div className="text-xs sm:text-[12.5px] text-slate-700 mb-6">
                          <p className="font-bold mb-1">{language === 'vi' ? 'Lưu ý:' : 'Notes:'}</p>
                          <ul className="list-disc pl-5 space-y-1 text-slate-600">
                            <li>
                              {language === 'vi'
                                ? 'Vui lòng chỉ gửi một biểu mẫu cho mỗi công ty/tổ chức!'
                                : 'Please only submit one form per company/organisation!'}
                            </li>
                            <li>
                              {language === 'vi'
                                ? 'Nếu bạn đã từng nộp hồ sơ tư vấn Làng Sinh Viên Bình Mỹ trước đây, vui lòng liên hệ trực tiếp chuyên viên phụ trách và KHÔNG điền lại biểu mẫu này.'
                                : 'If you have applied for advice before, please contact our coordinator directly and do NOT fill out this form.'}
                            </li>
                          </ul>
                        </div>
                      </>
                    )}

                    {/* Step 2 Introduction */}
                    {formStep === 2 && (
                      <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mb-6">
                        {language === 'vi'
                          ? 'Điền thông tin liên hệ của người được ủy quyền ký kết và đại diện cho tổ chức của bạn. Người này sẽ nhận tất cả các thông báo và yêu cầu phối hợp từ Làng Sinh Viên Bình Mỹ.'
                          : 'Fill in the contact details of the person who is authorized to sign and act on behalf of your organisation. This person will receive all communications and requests for action of Binh My Student Village.'}
                      </p>
                    )}

                    {/* Step 3 Introduction */}
                    {formStep === 3 && (
                      <p className="text-xs sm:text-[12.5px] text-slate-600 leading-relaxed mb-6">
                        {language === 'vi'
                          ? 'Các câu hỏi trong phần này giúp chúng tôi hiểu rõ hơn về quy mô và cơ cấu của công ty hoặc tổ chức của bạn. Câu trả lời của bạn chỉ được sử dụng để xác minh tính phù hợp của hồ sơ.'
                          : 'The questions in this section help us understand the size and structure of your company or organisation. Your answers are used only to check eligibility.'}
                      </p>
                    )}

                    {/* ================= STEP 1: ABOUT YOUR COMPANY OR ORGANISATION ================= */}
                    {formStep === 1 && (
                      <form onSubmit={handleNextToStep2} className="space-y-6">
                        <div className="border border-slate-200/90 rounded-none p-5 sm:p-7 bg-white space-y-5">
                          
                          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight pb-1">
                            {language === 'vi'
                              ? 'Thông tin về Công ty hoặc Tổ chức của bạn'
                              : 'About your Company or Organisation'}
                          </h2>

                          {/* 1. Name of Company or Organisation */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi'
                                ? 'Tên Công ty hoặc Tổ chức *'
                                : 'Name of Company or Organisation *'}
                            </label>
                            <input
                              required
                              type="text"
                              value={formData.companyName}
                              onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#13382c]"
                            />
                          </div>

                          {/* 2. Country */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi' ? 'Quốc gia *' : 'Country *'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Lưu ý: Nếu quốc gia hoặc địa bàn của bạn không có trong danh sách, vui lòng chọn Khác (Other).'
                                : 'Please note: if your country is not in the list, please select Other.'}
                            </p>
                            <select
                              required
                              value={formData.country}
                              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#13382c]"
                            >
                              <option value="Vietnam">{language === 'vi' ? 'Việt Nam' : 'Vietnam'}</option>
                              <option value="Netherlands">{language === 'vi' ? 'Hà Lan' : 'Netherlands'}</option>
                              <option value="Japan">{language === 'vi' ? 'Nhật Bản' : 'Japan'}</option>
                              <option value="Germany">{language === 'vi' ? 'Đức' : 'Germany'}</option>
                              <option value="France">{language === 'vi' ? 'Pháp' : 'France'}</option>
                              <option value="Other">{language === 'vi' ? 'Quốc gia khác...' : 'Other country...'}</option>
                            </select>
                          </div>

                          {/* 3. In which year was your company/organisation established? */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Năm thành lập công ty/tổ chức của bạn? *'
                                : 'In which year was your company/organisation established? *'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Lưu ý: Làng Sinh Viên Bình Mỹ ưu tiên hợp tác với các doanh nghiệp và tổ chức đã hoạt động từ 1-2 năm trở lên'
                                : 'Please note: Binh My Student Village prioritizes businesses and organisations active for at least 1-2 years'}
                            </p>
                            <input
                              required
                              type="text"
                              placeholder="e.g. 2020"
                              value={formData.establishedYear}
                              onChange={(e) => setFormData({ ...formData, establishedYear: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#13382c]"
                            />
                          </div>

                          {/* 4. In which sector does your company/organisation work? */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Công ty/tổ chức của bạn hoạt động trong lĩnh vực nào? *'
                                : 'In which sector does your company/organisation work? *'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Nếu bạn chưa chắc chắn, hãy chọn phương án phù hợp nhất'
                                : 'If you are unsure, choose the option that fits best'}
                            </p>
                            <select
                              required
                              value={formData.sector}
                              onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#13382c]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn lĩnh vực' : 'Select'}</option>
                              <option value="Agriculture & Food Processing">{language === 'vi' ? 'Nông nghiệp & Chế biến thực phẩm, Dược liệu' : 'Agriculture & Food Processing'}</option>
                              <option value="Healthcare & Wellness">{language === 'vi' ? 'Y tế & Chăm sóc sức khỏe' : 'Healthcare & Wellness'}</option>
                              <option value="Tourism & Hospitality">{language === 'vi' ? 'Du lịch & Nghỉ dưỡng sinh thái' : 'Tourism & Hospitality'}</option>
                              <option value="Education & Training">{language === 'vi' ? 'Giáo dục & Đào tạo nguồn nhân lực' : 'Education & Training'}</option>
                              <option value="Digital Health & Technology">{language === 'vi' ? 'Y tế số & Đổi mới sáng tạo' : 'Digital Health & Technology'}</option>
                              <option value="Circular Economy & Ecology">{language === 'vi' ? 'Kinh tế tuần hoàn & Chuỗi giá trị OCOP' : 'Circular Economy & Ecology'}</option>
                              <option value="Other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                            </select>
                          </div>

                          {/* 5. Description of your company or organisation */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Mô tả về công ty hoặc tổ chức của bạn *'
                                : 'Description of your company or organisation *'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1 leading-snug">
                              {language === 'vi'
                                ? 'Các loại sản phẩm hoặc dịch vụ bạn cung cấp là gì? Khách hàng mục tiêu là ai? Bạn có sứ mệnh xã hội hoặc môi trường không? Nếu có thể áp dụng, vui lòng nêu rõ: số lượng và chủng loại giống, nguyên vật liệu; diện tích và loại đất nông nghiệp; số lượng và loại máy móc/thiết bị; quy mô và hiện trạng cơ sở vật chất; v.v.'
                                : 'What types of products or services do you offer? Who are the target customers? Do you have a social or environmental mission? If applicable, please mention: numbers and types of breeds, varieties, or materials used; hectares and types of farmland; numbers and types of machinery/equipment used; the size and state of your facilities; etc.'}
                            </p>
                            <span className="text-[11px] text-[#e06d33] font-medium block mb-1">
                              {language === 'vi'
                                ? 'Bạn có thể viết khoảng 300-350 từ (tối đa 2.000 ký tự)'
                                : 'You can write around 300-350 words (max. 2,000 characters)'}
                            </span>
                            <textarea
                              required
                              rows={5}
                              maxLength={2000}
                              value={formData.description}
                              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#13382c] resize-y"
                            />
                          </div>

                          {/* 6. Main request for support */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Nhu cầu hỗ trợ chính từ Làng Sinh Viên Bình Mỹ *'
                                : 'Main request for Binh My Student Village support *'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1 leading-snug">
                              {language === 'vi'
                                ? 'Mô tả một vấn đề cụ thể bạn muốn giải quyết và kết quả bạn đang hướng tới. Thêm các chi tiết chính như sản phẩm hoặc dịch vụ, hiện trạng, những gì bạn đã thử nghiệm và số liệu liên quan. Nếu có các chủ đề phụ khác, hãy liệt kê ngắn gọn ở cuối.'
                                : 'Describe one specific problem you want to solve and the result you are aiming for. Add key details such as product or service, current situation, what you have tried, and relevant numbers. If you have other minor topics, list them briefly at the end.'}
                            </p>
                            <span className="text-[11px] text-[#e06d33] font-medium block mb-1">
                              {language === 'vi'
                                ? 'Bạn có thể viết khoảng 300-350 từ (tối đa 2.000 ký tự)'
                                : 'You can write around 300-350 words (max. 2,000 characters)'}
                            </span>
                            <textarea
                              required
                              rows={5}
                              maxLength={2000}
                              value={formData.supportRequest}
                              onChange={(e) => setFormData({ ...formData, supportRequest: e.target.value })}
                              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#13382c] resize-y"
                            />
                          </div>

                        </div>

                        {/* Bottom Actions: Next Button */}
                        <div className="pt-2">
                          <button
                            type="submit"
                            className="bg-[#103E36] hover:bg-[#1a4f45] text-white px-7 py-1.5 text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            {language === 'vi' ? 'Tiếp theo' : 'Next'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ================= STEP 2: CONTACT AND PRACTICAL DETAILS (IMAGE SCREENSHOT) ================= */}
                    {formStep === 2 && (
                      <form onSubmit={handleNextToStep3} className="space-y-6">
                        <div className="border border-slate-200/90 rounded-none p-5 sm:p-7 bg-white space-y-5">
                          
                          <h2 className="text-xl sm:text-2xl font-bold italic text-slate-900 tracking-tight pb-1">
                            {language === 'vi'
                              ? 'Thông tin liên hệ thực tế'
                              : 'Contact and Practical Details'}
                          </h2>

                          {/* 1. First Name */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Tên' : 'First Name'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              required
                              type="text"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 2. Surname */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Họ và tên đệm' : 'Surname'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              required
                              type="text"
                              value={formData.surname}
                              onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 3. Job Title (Optional) */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Chức vụ / Chức danh' : 'Job Title'}
                            </label>
                            <input
                              type="text"
                              value={formData.jobTitle}
                              onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 4. Gender */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Giới tính' : 'Gender'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <select
                              required
                              value={formData.gender}
                              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="Male">{language === 'vi' ? 'Nam' : 'Male'}</option>
                              <option value="Female">{language === 'vi' ? 'Nữ' : 'Female'}</option>
                              <option value="Other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                            </select>
                          </div>

                          {/* 5. (Mobile) Phone */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi' ? 'Số điện thoại di động' : '(Mobile) Phone'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi' ? 'Vui lòng thêm mã quốc gia (+84)' : 'Please add the country code (+XX)'}
                            </p>
                            <input
                              required
                              type="tel"
                              placeholder={language === 'vi' ? 'Nhập số điện thoại' : 'Provide a telephone number'}
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 6. E-mail address */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Địa chỉ E-mail' : 'E-mail address'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              required
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 7. Language */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Ngôn ngữ giao tiếp' : 'Language'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <select
                              required
                              value={formData.preferredLanguage}
                              onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="Vietnamese">{language === 'vi' ? 'Tiếng Việt' : 'Vietnamese'}</option>
                              <option value="English">{language === 'vi' ? 'Tiếng Anh' : 'English'}</option>
                              <option value="French">{language === 'vi' ? 'Tiếng Pháp' : 'French'}</option>
                              <option value="Japanese">{language === 'vi' ? 'Tiếng Nhật' : 'Japanese'}</option>
                              <option value="Dutch">{language === 'vi' ? 'Tiếng Hà Lan' : 'Dutch'}</option>
                              <option value="Other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                            </select>
                          </div>

                          {/* 8. Company Address */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Địa chỉ công ty (Số nhà + Tên đường)' : 'Company Address (Street + Number)'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              required
                              type="text"
                              value={formData.companyAddress}
                              onChange={(e) => setFormData({ ...formData, companyAddress: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 9. City/Area */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Thành phố / Tỉnh thành' : 'City/Area'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <input
                              required
                              type="text"
                              value={formData.cityArea}
                              onChange={(e) => setFormData({ ...formData, cityArea: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 10. Company Website (Optional) */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi' ? 'Website công ty' : 'Company Website'}
                            </label>
                            <input
                              type="text"
                              value={formData.website}
                              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 11. Social Media URL (Optional) */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi' ? 'Đường dẫn mạng xã hội' : 'Social Media URL'}
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              Facebook, Instagram, etc.
                            </p>
                            <input
                              type="text"
                              placeholder="Facebook, Instagram, etc."
                              value={formData.socialMedia}
                              onChange={(e) => setFormData({ ...formData, socialMedia: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white"
                            />
                          </div>

                          {/* 12. Did you get in touch with us through a Representative? */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi'
                                ? 'Bạn đã liên hệ với chúng tôi thông qua Đại diện của Làng Sinh Viên Bình Mỹ chưa?'
                                : 'Did you get in touch with us through a Làng Sinh Viên Bình Mỹ Representative?'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <div className="flex items-center gap-6 mt-1.5 text-xs text-slate-700">
                              <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="representativeContact"
                                  value="No"
                                  checked={formData.representativeContact === 'No'}
                                  onChange={() => setFormData({ ...formData, representativeContact: 'No' })}
                                  className="text-[#103E36] focus:ring-[#103E36]"
                                />
                                <span>{language === 'vi' ? 'Không' : 'No'}</span>
                              </label>
                              <label className="inline-flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  name="representativeContact"
                                  value="Yes"
                                  checked={formData.representativeContact === 'Yes'}
                                  onChange={() => setFormData({ ...formData, representativeContact: 'Yes' })}
                                  className="text-[#103E36] focus:ring-[#103E36]"
                                />
                                <span>{language === 'vi' ? 'Có' : 'Yes'}</span>
                              </label>
                            </div>
                          </div>

                        </div>

                        {/* Bottom Actions: Previous & Next side-by-side matching screenshot */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setFormStep(1)}
                            className="px-5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            {language === 'vi' ? 'Quay lại' : 'Previous'}
                          </button>
                          <button
                            type="submit"
                            className="bg-[#103E36] hover:bg-[#1a4f45] text-white px-6 py-1.5 text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            {language === 'vi' ? 'Tiếp theo' : 'Next'}
                          </button>
                        </div>
                      </form>
                    )}

                    {/* ================= STEP 3: ADDITIONAL DETAILS (IMAGE SCREENSHOT) ================= */}
                    {formStep === 3 && (
                      <form onSubmit={handleSubmitFinal} className="space-y-6">
                        <div className="border border-slate-200/90 rounded-none p-5 sm:p-7 bg-white space-y-5">
                          
                          <h2 className="text-xl sm:text-2xl font-bold italic text-slate-900 tracking-tight pb-1">
                            {language === 'vi' ? 'Thông tin bổ sung' : 'Additional Details'}
                          </h2>

                          {/* 1. Employee Count */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Hiện tại, có bao nhiêu người làm việc trong công ty/tổ chức của bạn?'
                                : 'Currently, how many people work in your company/organisation in total?'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Vui lòng bao gồm tất cả người lao động có hợp đồng (bao gồm bán thời gian, thời vụ, tạm thời hoặc các loại hợp đồng khác).'
                                : 'Please include all workers who have a contract (including part-time, seasonal, temporary, or other contract types).'}
                            </p>
                            <select
                              required
                              value={formData.employeeCount}
                              onChange={(e) => setFormData({ ...formData, employeeCount: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="1-10">1 - 10</option>
                              <option value="11-50">11 - 50</option>
                              <option value="51-100">51 - 100</option>
                              <option value="101-250">101 - 250</option>
                              <option value="250+">{language === 'vi' ? 'Nhiều hơn 250' : 'More than 250'}</option>
                            </select>
                          </div>

                          {/* 2. Annual Revenue */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Trong năm tài chính vừa qua, doanh thu hoặc ngân sách hàng năm của công ty/tổ chức bạn là bao nhiêu (tính bằng euro)?'
                                : "Last financial year, what was your company's/organisation's annual revenue or budget (in euros)?"} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Một con số ước tính là đủ. Thông tin này chỉ được sử dụng để kiểm tra tính phù hợp.'
                                : 'An estimate is sufficient. This information is used only to check eligibility.'}
                            </p>
                            <select
                              required
                              value={formData.annualRevenue}
                              onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="<50k">{language === 'vi' ? 'Dưới 50.000' : 'Less than 50,000'}</option>
                              <option value="50k-250k">50,000 - 250,000</option>
                              <option value="250k-500k">250,000 - 500,000</option>
                              <option value="500k-1m">500,000 - 1,000,000</option>
                              <option value=">1m">{language === 'vi' ? 'Nhiều hơn 1.000.000' : 'More than 1,000,000'}</option>
                            </select>
                          </div>

                          {/* 3. Privately Owned */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Công ty hoặc tổ chức của bạn có hơn 50% vốn sở hữu tư nhân không?'
                                : 'Is your company or organisation more than 50% privately owned?'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Điều này có nghĩa là quyền sở hữu chủ yếu thuộc về cá nhân hoặc các nhóm tư nhân, không phải do chính phủ hoặc các cơ quan công lập.'
                                : 'This means owned mainly by individuals or private groups, not by the government or public institutions.'}
                            </p>
                            <select
                              required
                              value={formData.isPrivatelyOwned}
                              onChange={(e) => setFormData({ ...formData, isPrivatelyOwned: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="Yes">{language === 'vi' ? 'Có' : 'Yes'}</option>
                              <option value="No">{language === 'vi' ? 'Không' : 'No'}</option>
                            </select>
                          </div>

                          {/* 4. Company Type */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-0.5">
                              {language === 'vi'
                                ? 'Vui lòng chọn phương án mô tả đúng nhất về công ty hoặc tổ chức của bạn.'
                                : 'Please select the option that best describes your company or organisation.'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <p className="text-[11px] text-slate-500 mb-1">
                              {language === 'vi'
                                ? 'Lưu ý: Hợp tác xã là một nhóm các công ty/nông dân có chung mục tiêu kinh doanh.'
                                : 'Note: A cooperative is a group of companies/farmers with a shared business goal.'}
                            </p>
                            <select
                              required
                              value={formData.companyType}
                              onChange={(e) => setFormData({ ...formData, companyType: e.target.value })}
                              className="w-full px-3 py-1.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36]"
                            >
                              <option value="">{language === 'vi' ? 'Chọn' : 'Select'}</option>
                              <option value="Private company">{language === 'vi' ? 'Công ty tư nhân' : 'Private company'}</option>
                              <option value="Cooperative">{language === 'vi' ? 'Hợp tác xã' : 'Cooperative'}</option>
                              <option value="Non-governmental organisation">{language === 'vi' ? 'Tổ chức phi chính phủ / Xã hội' : 'Non-governmental organisation'}</option>
                              <option value="Educational or research institution">{language === 'vi' ? 'Viện nghiên cứu / Cơ sở giáo dục' : 'Educational or research institution'}</option>
                              <option value="Healthcare facility">{language === 'vi' ? 'Cơ sở y tế / Bệnh viện' : 'Healthcare facility'}</option>
                              <option value="Other">{language === 'vi' ? 'Khác' : 'Other'}</option>
                            </select>
                          </div>

                          {/* 5. Conditions */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi'
                                ? 'Vui lòng đọc các điều kiện của Làng Sinh Viên Bình Mỹ:'
                                : 'Please read the Làng Sinh Viên Bình Mỹ conditions:'} <span className="text-red-500 font-bold">*</span>
                            </label>
                            <ul className="list-disc pl-5 space-y-1.5 text-[11px] sm:text-xs text-slate-600 leading-relaxed bg-slate-50 p-3.5 border border-slate-200">
                              <li>
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'Tôi xác nhận công ty/tổ chức của mình không ủng hộ lao động trẻ em hoặc lao động cưỡng bức'
                                    : 'I confirm my company/organisation does not support child labour or forced labour'}
                                </span>{' '}
                                {language === 'vi'
                                  ? '(phù hợp với các hướng dẫn của OECD) và không hoạt động trong các lĩnh vực vũ khí, đạn dược, chất phóng xạ, cờ bạc sòng bạc, nội dung độc hại, hoặc truyền thông phân biệt chủng tộc/chống dân chủ.'
                                  : '(in line with OECD guidelines), and does not operate in weapons and ammunition, radioactive materials, gambling and casinos, pornography and prostitution, or racist and anti-democratic media.'}
                              </li>
                              <li>
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'Tôi xác nhận không thể tiếp cận chuyên môn cần thiết tại địa phương'
                                    : 'I confirm I cannot access the required expertise locally'}
                                </span>
                                {language === 'vi'
                                  ? ', do chuyên môn chưa có sẵn hoặc vượt quá khả năng tài chính hiện tại.'
                                  : ', either because it is not available to me or I cannot afford it.'}
                              </li>
                              <li>
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'Tôi xác nhận nhân viên và bản thân tôi sẽ luôn sẵn sàng'
                                    : 'I confirm that my staff and I will be available'}
                                </span>{' '}
                                {language === 'vi'
                                  ? 'làm việc cùng chuyên gia Làng Sinh Viên Bình Mỹ trong suốt dự án.'
                                  : 'to work with the Làng Sinh Viên Bình Mỹ expert throughout the project.'}
                              </li>
                              <li>
                                {language === 'vi'
                                  ? 'Nếu có chuyên gia đến làm việc, tôi xác nhận '
                                  : 'If a Làng Sinh Viên Bình Mỹ expert visits, I confirm that '}
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'tôi sẽ chi trả các chi phí địa phương'
                                    : 'I will pay for their local costs'}
                                </span>{' '}
                                {language === 'vi'
                                  ? '(chỗ ở, bữa ăn, đi lại nội địa) và áp dụng các biện pháp đảm bảo an toàn, sức khỏe.'
                                  : '(accommodation, meals, and local transport) and take precautions to ensure their health and safety.'}
                              </li>
                              <li>
                                {language === 'vi'
                                  ? 'Tôi hiểu rằng Làng Sinh Viên Bình Mỹ sẽ chi trả phụ cấp cho nhân sự tham gia và '
                                  : 'I understand that Làng Sinh Viên Bình Mỹ will pay the staff involved and that '}
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'tôi không cần phải trả thêm bất kỳ khoản phí nào cho họ'
                                    : 'I do not need to pay any extra fee for them'}
                                </span>.
                              </li>
                              <li>
                                {language === 'vi'
                                  ? 'Tôi xác nhận '
                                  : 'I confirm that '}
                                <span className="font-semibold text-slate-800">
                                  {language === 'vi'
                                    ? 'tôi sẽ sắp xếp và chi trả phiên dịch viên'
                                    : 'I will arrange and pay for a translator'}
                                </span>{' '}
                                {language === 'vi'
                                  ? '(từ tiếng Anh sang ngôn ngữ địa phương) nếu cần.'
                                  : '(from English to my language) if needed.'}
                              </li>
                              <li>
                                {language === 'vi'
                                  ? 'Ngoài biểu mẫu này, tôi đồng ý hoàn thành biểu mẫu đánh giá sau dự án và hai khảo sát theo dõi hàng năm. Quyền riêng tư và bảo mật dữ liệu luôn được đảm bảo.'
                                  : 'In addition to this form, I agree to complete an evaluation form after the project and two annual follow-up surveys. Data privacy and security are ensured (see: Privacy Statement - Làng Sinh Viên Bình Mỹ).'}
                              </li>
                            </ul>

                            <div className="mt-3">
                              <label className="inline-flex items-center gap-2 cursor-pointer text-xs text-slate-800">
                                <input
                                  required
                                  type="radio"
                                  name="agreedConditions"
                                  checked={formData.agreedConditions}
                                  onChange={() => setFormData({ ...formData, agreedConditions: true })}
                                  className="text-[#103E36] focus:ring-[#103E36]"
                                />
                                <span>
                                  {language === 'vi'
                                    ? 'Tôi đã đọc, hiểu và đồng ý với các Điều kiện của Làng Sinh Viên Bình Mỹ.'
                                    : 'I have read, understood and agree to the Làng Sinh Viên Bình Mỹ Conditions.'}
                                </span>
                              </label>
                            </div>
                          </div>

                          {/* 6. Additional Remarks */}
                          <div>
                            <label className="block text-xs font-bold text-slate-800 mb-1">
                              {language === 'vi'
                                ? 'Bạn có thêm ý kiến hoặc ghi chú nào khác không?'
                                : 'Do you have any additional remarks?'}
                            </label>
                            <textarea
                              rows={5}
                              maxLength={2000}
                              value={formData.additionalRemarks}
                              onChange={(e) => setFormData({ ...formData, additionalRemarks: e.target.value })}
                              className="w-full px-3 py-2 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] resize-y bg-white"
                            />
                            <span className="text-[11px] text-[#E78044] font-normal block mt-1">
                              {language === 'vi'
                                ? 'Bạn có thể viết khoảng 300-350 từ (tối đa 2.000 ký tự)'
                                : 'You can write around 300-350 words (max. 2,000 characters)'}
                            </span>
                          </div>

                        </div>

                        {/* Bottom Actions: Previous & Submit matching screenshot */}
                        <div className="pt-2 flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setFormStep(2)}
                            className="px-5 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-300 rounded-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            {language === 'vi' ? 'Quay lại' : 'Previous'}
                          </button>
                          <button
                            type="submit"
                            className="bg-[#103E36] hover:bg-[#1a4f45] text-white px-7 py-1.5 text-xs font-bold rounded-xs cursor-pointer transition-colors shadow-2xs"
                          >
                            {language === 'vi' ? 'Gửi đơn đăng ký' : 'Submit'}
                          </button>
                        </div>
                      </form>
                    )}

                  </>
                )}

              </div>

              {/* Bottom Footer Signature matching screenshot */}
              <div className="bg-[#dce9e2] px-6 py-2.5 border-t border-slate-200 text-center">
                <span className="text-xs text-slate-700 font-semibold block">
                  {language === 'vi'
                    ? 'Làng Sinh Viên Bình Mỹ. Cùng nhau phát triển.'
                    : 'Binh My Student Village. Together we grow.'}
                </span>
              </div>
              <div className="bg-[#103E36] px-6 py-3 text-center">
                <span className="text-[11px] text-slate-300 block">
                  Copyright © 2026. All rights reserved.
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW 3: PARTNER REGISTRATION FORM ("VÀO ĐI CHẠM" / "GET IN TOUCH") ================= */}
        {viewMode === 'partner' && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-in fade-in duration-200">
            
            {/* Top Navigation Row: Back Button */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setViewMode('cards')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D6E7D8] hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{language === 'vi' ? 'Quay lại các lựa chọn' : 'Back to options'}</span>
              </button>
            </div>

            {/* Main Form White Paper Card */}
            <div className="bg-white rounded-xs shadow-2xl overflow-hidden border border-slate-200">
              
              {/* Header Bar: Brand & Language Selector */}
              <div className="bg-[#103E36] px-6 py-3 flex items-center justify-between text-white border-b border-emerald-950">
                <div className="flex items-center gap-2 font-black tracking-wider text-sm sm:text-base">
                  <span>{language === 'vi' ? 'LÀNG SINH VIÊN BÌNH MỸ.' : 'BINH MY STUDENT VILLAGE.'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-10 lg:p-14 text-slate-800">
                
                {partnerSubmitted ? (
                  <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-emerald-100 text-[#103E36] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">
                      {language === 'vi' ? 'Gửi liên hệ đối tác thành công!' : 'Partner Inquiry Submitted!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === 'vi'
                        ? 'Cảm ơn bạn đã liên hệ hợp tác với Làng Sinh Viên Bình Mỹ. Bộ phận phụ trách sẽ xem xét thông tin và kết nối với bạn trong thời gian sớm nhất.'
                        : 'Thank you for reaching out to Binh My Student Village. Our partnership team will review your message and contact you shortly.'}
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handlePartnerReset}
                        className="px-8 py-2.5 bg-[#103E36] hover:bg-emerald-900 text-white font-bold text-xs rounded-xs shadow-md transition-colors cursor-pointer"
                      >
                        {language === 'vi' ? 'Hoàn tất' : 'Done'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    {/* Title with hand-drawn orange oval around 'chạm' / 'touch' */}
                    <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#143d32] tracking-tight mb-4 flex items-center flex-wrap gap-2.5">
                      <span>{language === 'vi' ? 'Vào đi' : 'Get in'}</span>
                      <span className="relative inline-block px-4 py-0.5 text-[#143d32]">
                        <span className="absolute -inset-x-2.5 -inset-y-1.5 border-[2.5px] border-[#F17422] rounded-[50%] -rotate-2 pointer-events-none" />
                        <span>{language === 'vi' ? 'chạm' : 'touch'}</span>
                      </span>
                    </h1>

                    {/* Description Paragraph 1 */}
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mb-3">
                      {language === 'vi'
                        ? 'Bạn có thắc mắc gì về Làng Sinh Viên Bình Mỹ hoặc các dịch vụ của chúng tôi không? Bạn muốn trở thành đối tác hoặc tình nguyện viên của Làng Sinh Viên Bình Mỹ? Bạn có thể tìm thấy rất nhiều thông tin trên trang web này, hoặc bạn có thể liên hệ trực tiếp với chúng tôi.'
                        : 'Do you have questions about Binh My Student Village or our services? Would you like to become a partner or volunteer of Binh My Student Village? You can find a lot of information on this website, or you can contact us directly.'}
                    </p>

                    {/* Description Paragraph 2 with Link */}
                    <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed mb-8">
                      {language === 'vi' ? 'Trước khi làm vậy, vui lòng kiểm tra ' : 'Before doing so, please check our '}
                      <a
                        href="#faq"
                        onClick={(e) => { e.preventDefault(); }}
                        className="underline text-slate-800 font-medium hover:text-[#143d32] transition-colors"
                      >
                        {language === 'vi' ? 'phần Câu hỏi thường gặp của chúng tôi.' : 'frequently asked questions.'}
                      </a>
                    </p>

                    {/* Partner Form */}
                    <form onSubmit={handlePartnerSubmit} className="space-y-5">
                      
                      {/* Field 1: Tên * */}
                      <div>
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Tên' : 'Name'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          value={partnerForm.fullName}
                          onChange={(e) => setPartnerForm({ ...partnerForm, fullName: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white text-slate-800"
                        />
                      </div>

                      {/* Field 2: Số điện thoại */}
                      <div>
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Số điện thoại' : 'Phone number'}
                        </label>
                        <input
                          type="tel"
                          value={partnerForm.phone}
                          onChange={(e) => setPartnerForm({ ...partnerForm, phone: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white text-slate-800"
                        />
                      </div>

                      {/* Field 3: Địa chỉ email * */}
                      <div>
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Địa chỉ email' : 'Email address'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <input
                          required
                          type="email"
                          value={partnerForm.email}
                          onChange={(e) => setPartnerForm({ ...partnerForm, email: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] bg-white text-slate-800"
                        />
                      </div>

                      {/* Field 4: Phòng * */}
                      <div>
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Phòng' : 'Department'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <select
                          required
                          value={partnerForm.department}
                          onChange={(e) => setPartnerForm({ ...partnerForm, department: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-none bg-white focus:outline-hidden focus:border-[#103E36] text-slate-800 cursor-pointer"
                        >
                          <option value="">{language === 'vi' ? 'Chọn một bộ phận' : 'Select a department'}</option>
                          <option value="strategic-partnerships">
                            {language === 'vi' ? 'Hợp tác phát triển & Đối tác chiến lược' : 'Strategic Partnerships & Development'}
                          </option>
                          <option value="medical-workforce">
                            {language === 'vi' ? 'Đào tạo & Phát triển nguồn nhân lực y tế' : 'Medical Workforce Training'}
                          </option>
                          <option value="consulting-livinglab">
                            {language === 'vi' ? 'Tư vấn dự án & Living Lab Bình Mỹ' : 'Project Advisory & Living Lab'}
                          </option>
                          <option value="doctors-across-borders">
                            {language === 'vi' ? 'Bác sĩ xuyên biên giới & Chuyên gia quốc tế' : 'Doctors Across Borders & Global Experts'}
                          </option>
                          <option value="research-innovation">
                            {language === 'vi' ? 'Nghiên cứu khoa học & Đổi mới sáng tạo' : 'Scientific Research & Innovation'}
                          </option>
                          <option value="other">
                            {language === 'vi' ? 'Bộ phận khác' : 'Other Department'}
                          </option>
                        </select>
                      </div>

                      {/* Field 5: Tin nhắn của bạn * */}
                      <div>
                        <label className="block text-xs sm:text-[13px] font-bold text-slate-800 mb-1.5">
                          {language === 'vi' ? 'Tin nhắn của bạn' : 'Your message'} <span className="text-red-500 font-bold">*</span>
                        </label>
                        <textarea
                          required
                          rows={6}
                          placeholder={language === 'vi' ? 'Bắt đầu gõ' : 'Start typing'}
                          value={partnerForm.message}
                          onChange={(e) => setPartnerForm({ ...partnerForm, message: e.target.value })}
                          className="w-full px-3.5 py-2.5 text-xs sm:text-sm border border-slate-300 rounded-none focus:outline-hidden focus:border-[#103E36] resize-y bg-white text-slate-800 placeholder:text-slate-400"
                        />
                      </div>

                      {/* Submit Button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          className="bg-[#F17422] hover:bg-[#e06516] text-white font-bold text-xs sm:text-sm px-8 py-2.5 rounded-full cursor-pointer transition-colors shadow-md active:scale-95"
                        >
                          {language === 'vi' ? 'Nộp' : 'Submit'}
                        </button>
                      </div>

                    </form>
                  </div>
                )}

              </div>

              {/* Bottom Footer Signature matching screenshot */}
              <div className="bg-[#dce9e2] px-6 py-2.5 border-t border-slate-200 text-center">
                <span className="text-xs text-slate-700 font-semibold block">
                  {language === 'vi'
                    ? 'Làng Sinh Viên Bình Mỹ. Cùng nhau phát triển.'
                    : 'Binh My Student Village. Together we grow.'}
                </span>
              </div>
              <div className="bg-[#103E36] px-6 py-3 text-center">
                <span className="text-[11px] text-slate-300 block">
                  Copyright © 2026. All rights reserved.
                </span>
              </div>

            </div>

          </div>
        )}

        {/* ================= VIEW 4: VACANCIES APPLICATION FORM (HÌNH 1 - PUM RECRUITMENT SPEC) ================= */}
        {viewMode === 'vacancies' && (
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 animate-in fade-in duration-200">
            
            {/* Top Navigation Row: Back Button */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => setViewMode('cards')}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#D6E7D8] hover:text-white transition-colors cursor-pointer group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                <span>{language === 'vi' ? 'Quay lại các lựa chọn' : 'Back to options'}</span>
              </button>
            </div>

            {/* Main Form Box with Pale Mint Background matching Image 1 */}
            <div className="bg-[#EDF5F1] rounded-xs shadow-2xl overflow-hidden border border-[#AECBBD]">
              
              {/* Header Bar: Brand & Language Selector */}
              <div className="bg-[#103E36] px-6 py-3 flex items-center justify-between text-white border-b border-emerald-950">
                <div className="flex items-center gap-2 font-black tracking-wider text-sm sm:text-base">
                  <span>{language === 'vi' ? 'LÀNG SINH VIÊN BÌNH MỸ.' : 'BINH MY STUDENT VILLAGE.'}</span>
                </div>
                <button
                  type="button"
                  onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
                  className="inline-flex items-center gap-1.5 text-xs text-slate-200 hover:text-white cursor-pointer"
                >
                  <span>{language === 'vi' ? 'Tiếng Việt' : 'English'}</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Main Content Area */}
              <div className="p-6 sm:p-10 lg:p-12 text-[#13382c]">
                
                {vacancySubmitted ? (
                  <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
                    <div className="w-16 h-16 bg-emerald-100 text-[#103E36] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>
                    <h3 className="text-2xl font-bold text-[#13382c]">
                      {language === 'vi' ? 'Nộp hồ sơ ứng tuyển thành công!' : 'Application Submitted Successfully!'}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {language === 'vi'
                        ? 'Cảm ơn bạn đã quan tâm ứng tuyển vị trí tại Làng Sinh Viên Bình Mỹ. Ban nhân sự và hội đồng chuyên môn sẽ xem xét hồ sơ của bạn và phản hồi trong thời gian sớm nhất.'
                        : 'Thank you for applying for a position at Binh My Student Village. Our talent committee will review your application and contact you soon.'}
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={handleVacancyReset}
                        className="px-8 py-2.5 bg-[#103E36] hover:bg-emerald-900 text-white font-bold text-xs rounded-xs shadow-md transition-colors cursor-pointer"
                      >
                        {language === 'vi' ? 'Hoàn tất' : 'Done'}
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleVacancySubmit} className="space-y-6">

                    {/* SECTION 1: THÔNG TIN CỦA TÔI */}
                    <div>
                      <h2 className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#13382c] mb-1">
                        {language === 'vi' ? 'THÔNG TIN CỦA TÔI' : 'MY INFORMATION'}
                      </h2>
                      <p className="text-xs text-slate-600 mb-4">
                        {language === 'vi' ? 'Hãy điền thông tin bên dưới' : 'Please fill in your details below'}
                      </p>

                      <div className="space-y-4">
                        {/* HỌ VÀ TÊN* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-1.5">
                            {language === 'vi' ? 'HỌ VÀ TÊN' : 'FULL NAME'} <span className="text-red-500 font-bold">*</span>
                          </label>
                          <input
                            required
                            type="text"
                            placeholder={language === 'vi' ? 'Họ và tên' : 'Your full name'}
                            value={vacancyForm.fullName}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, fullName: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden transition-colors"
                          />
                        </div>

                        {/* ĐỊA CHỈ EMAIL* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-1.5">
                            {language === 'vi' ? 'ĐỊA CHỈ EMAIL' : 'EMAIL ADDRESS'} <span className="text-red-500 font-bold">*</span>
                          </label>
                          <input
                            required
                            type="email"
                            placeholder={language === 'vi' ? 'Địa chỉ email của bạn' : 'Your email address'}
                            value={vacancyForm.email}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, email: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden transition-colors"
                          />
                        </div>

                        {/* SỐ ĐIỆN THOẠI* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-1.5">
                            {language === 'vi' ? 'SỐ ĐIỆN THOẠI' : 'PHONE NUMBER'} <span className="text-red-500 font-bold">*</span>
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <select
                              value={vacancyForm.phoneCountry}
                              onChange={(e) => {
                                const selected = e.target.value;
                                let code = '+84';
                                if (selected === 'Hà Lan') code = '+31';
                                else if (selected === 'Hoa Kỳ') code = '+1';
                                else if (selected === 'Nhật Bản') code = '+81';
                                else if (selected === 'Đức') code = '+49';
                                else if (selected === 'Pháp') code = '+33';
                                else if (selected === 'Anh Quốc') code = '+44';
                                else if (selected === 'Khác') code = '+00';
                                setVacancyForm({ ...vacancyForm, phoneCountry: selected, phoneDialCode: code });
                              }}
                              className="px-3 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs text-slate-800 rounded-none focus:outline-hidden cursor-pointer"
                            >
                              <option value="Hà Lan">🇳🇱 Hà Lan (+31)</option>
                              <option value="Việt Nam">🇻🇳 Việt Nam (+84)</option>
                              <option value="Hoa Kỳ">🇺🇸 Hoa Kỳ (+1)</option>
                              <option value="Nhật Bản">🇯🇵 Nhật Bản (+81)</option>
                              <option value="Đức">🇩🇪 Đức (+49)</option>
                              <option value="Pháp">🇫🇷 Pháp (+33)</option>
                              <option value="Anh Quốc">🇬🇧 Anh Quốc (+44)</option>
                              <option value="Khác">🌐 Khác</option>
                            </select>

                            <input
                              required
                              type="tel"
                              placeholder={vacancyForm.phoneDialCode ? `${vacancyForm.phoneDialCode} 12345678` : 'Số điện thoại'}
                              value={vacancyForm.phone}
                              onChange={(e) => setVacancyForm({ ...vacancyForm, phone: e.target.value })}
                              className="sm:col-span-2 px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden transition-colors"
                            />
                          </div>
                        </div>

                      </div>
                    </div>

                    <div className="border-b border-[#C2D9CD] my-6" />

                    {/* SECTION 2: CV HOẶC SƠ YẾU LÝ LỊCH* */}
                    <div>
                      <h2 className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#13382c] mb-1">
                        {language === 'vi' ? 'CV HOẶC SƠ YẾU LÝ LỊCH' : 'CV OR RESUME'} <span className="text-red-500 font-bold">*</span>
                      </h2>
                      <p className="text-xs text-slate-600 mb-3">
                        {language === 'vi' ? 'Tải lên tệp CV hoặc sơ yếu lý lịch của bạn' : 'Upload your CV or resume file'}
                      </p>

                      <input
                        type="file"
                        ref={cvFileInputRef}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleCvFileChange}
                        className="hidden"
                      />

                      {vacancyForm.cvFileName ? (
                        <div className="flex items-center justify-between p-4 bg-[#DFEBE4] border border-[#9CBDAD]">
                          <div className="flex items-center gap-2.5 overflow-hidden">
                            <FileText className="w-5 h-5 text-[#13382c] flex-shrink-0" />
                            <span className="text-xs sm:text-sm font-bold text-[#13382c] truncate">
                              {vacancyForm.cvFileName}
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => setVacancyForm({ ...vacancyForm, cvFileName: '' })}
                            className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-bold cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                            <span>{language === 'vi' ? 'Xóa tệp' : 'Remove'}</span>
                          </button>
                        </div>
                      ) : (
                        <div
                          onClick={() => cvFileInputRef.current?.click()}
                          className="border border-[#9CBDAD] bg-[#DFEBE4]/70 hover:bg-[#DFEBE4] p-6 text-center cursor-pointer transition-colors"
                        >
                          <p className="text-xs sm:text-sm text-slate-700">
                            <span className="text-[#F17422] font-bold">
                              {language === 'vi' ? 'Tải lên một tệp' : 'Upload a file'}
                            </span>{' '}
                            {language === 'vi' ? 'hoặc kéo và thả vào đây' : 'or drag and drop here'}
                          </p>
                          <p className="text-[11px] text-slate-600 mt-1">
                            {language === 'vi'
                              ? 'Các định dạng tệp được chấp nhận: PDF, DOC, DOCX, JPEG và PNG với dung lượng tối đa 50MB.'
                              : 'Accepted file formats: PDF, DOC, DOCX, JPEG and PNG up to 50MB.'}
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="border-b border-[#C2D9CD] my-6" />

                    {/* SECTION 3: THƯ XIN VIỆC */}
                    <div>
                      <h2 className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#13382c] mb-1">
                        {language === 'vi' ? 'THƯ XIN VIỆC' : 'COVER LETTER'}
                      </h2>
                      <p className="text-xs text-slate-600 mb-3">
                        {language === 'vi' ? 'Tải lên thư xin việc của bạn' : 'Upload your cover letter'}
                      </p>

                      <input
                        type="file"
                        ref={coverLetterFileInputRef}
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleCoverLetterFileChange}
                        className="hidden"
                      />

                      {vacancyForm.coverLetterTextMode ? (
                        <div>
                          <textarea
                            rows={5}
                            placeholder={language === 'vi' ? 'Nhập nội dung thư xin việc của bạn tại đây...' : 'Write your cover letter here...'}
                            value={vacancyForm.coverLetterText}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, coverLetterText: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden resize-y"
                          />
                          <button
                            type="button"
                            onClick={() => setVacancyForm({ ...vacancyForm, coverLetterTextMode: false })}
                            className="text-xs text-[#F17422] underline hover:text-[#d45e14] mt-2 block cursor-pointer"
                          >
                            {language === 'vi' ? 'Tải lên một tệp thay vì viết ở đây' : 'Upload a file instead of writing here'}
                          </button>
                        </div>
                      ) : vacancyForm.coverLetterFileName ? (
                        <div>
                          <div className="flex items-center justify-between p-4 bg-[#DFEBE4] border border-[#9CBDAD]">
                            <div className="flex items-center gap-2.5 overflow-hidden">
                              <FileText className="w-5 h-5 text-[#13382c] flex-shrink-0" />
                              <span className="text-xs sm:text-sm font-bold text-[#13382c] truncate">
                                {vacancyForm.coverLetterFileName}
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setVacancyForm({ ...vacancyForm, coverLetterFileName: '' })}
                              className="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800 font-bold cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                              <span>{language === 'vi' ? 'Xóa tệp' : 'Remove'}</span>
                            </button>
                          </div>
                          <button
                            type="button"
                            onClick={() => setVacancyForm({ ...vacancyForm, coverLetterTextMode: true })}
                            className="text-xs text-[#F17422] underline hover:text-[#d45e14] mt-2 block cursor-pointer"
                          >
                            {language === 'vi' ? 'Hãy viết nó ở đây thay vì tải nó lên' : 'Write it here instead of uploading'}
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div
                            onClick={() => coverLetterFileInputRef.current?.click()}
                            className="border border-[#9CBDAD] bg-[#DFEBE4]/70 hover:bg-[#DFEBE4] p-6 text-center cursor-pointer transition-colors"
                          >
                            <p className="text-xs sm:text-sm text-slate-700">
                              <span className="text-[#F17422] font-bold">
                                {language === 'vi' ? 'Tải lên một tệp' : 'Upload a file'}
                              </span>{' '}
                              {language === 'vi' ? 'hoặc kéo và thả vào đây' : 'or drag and drop here'}
                            </p>
                            <p className="text-[11px] text-slate-600 mt-1">
                              {language === 'vi'
                                ? 'Các định dạng tệp được chấp nhận: PDF, DOC, DOCX, JPEG và PNG với dung lượng tối đa 50MB.'
                                : 'Accepted file formats: PDF, DOC, DOCX, JPEG and PNG up to 50MB.'}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => setVacancyForm({ ...vacancyForm, coverLetterTextMode: true })}
                            className="text-xs text-[#F17422] underline hover:text-[#d45e14] mt-2 block cursor-pointer"
                          >
                            {language === 'vi' ? 'Hãy viết nó ở đây thay vì tải nó lên' : 'Write it here instead of uploading'}
                          </button>
                        </div>
                      )}
                    </div>

                    <div className="border-b border-[#C2D9CD] my-6" />

                    {/* SECTION 4: CÂU HỎI */}
                    <div>
                      <h2 className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#13382c] mb-1">
                        {language === 'vi' ? 'CÂU HỎI' : 'QUESTIONS'}
                      </h2>
                      <p className="text-xs text-slate-600 mb-4">
                        {language === 'vi' ? 'Vui lòng điền thêm câu hỏi' : 'Please answer the additional questions'}
                      </p>

                      {/* Information Callout Box matching Image 1 */}
                      <div className="bg-[#D9E9E0] border border-[#B1CEBF] p-4.5 mb-6 text-slate-800 text-xs sm:text-[12.5px] leading-relaxed">
                        <div className="flex items-start gap-2.5 mb-2 font-bold text-[#13382c]">
                          <Info className="w-4 h-4 text-[#13382c] flex-shrink-0 mt-0.5" />
                          <span>
                            {language === 'vi'
                              ? 'Vui lòng xem xét kỹ các tiêu chí đủ điều kiện của chúng tôi:'
                              : 'Please carefully review our eligibility criteria:'}
                          </span>
                        </div>
                        <ul className="space-y-1.5 pl-6 text-slate-700 list-disc">
                          <li>
                            {language === 'vi'
                              ? 'Để đảm bảo tối thiểu hai năm hoạt động sau khi đăng ký, việc đăng ký có thể được thực hiện cho đến hết năm dương lịch mà bạn tròn 69 tuổi.'
                              : 'To ensure a minimum of two active years post-registration, candidates may apply up to the calendar year turning 69.'}
                          </li>
                          <li>
                            {language === 'vi'
                              ? 'Bạn đang cư trú hợp pháp tại Hà Lan hoặc Việt Nam và có đầy đủ hồ sơ pháp lý liên quan.'
                              : 'You are legally residing with valid registration records.'}
                          </li>
                          <li>
                            {language === 'vi'
                              ? 'Bạn có bảo hiểm y tế cơ bản hợp lệ.'
                              : 'You hold valid basic health insurance.'}
                          </li>
                          <li>
                            {language === 'vi'
                              ? 'Bạn có ít nhất 5 năm kinh nghiệm chuyên môn liên quan.'
                              : 'You possess at least 5 years of relevant professional experience.'}
                          </li>
                          <li>
                            {language === 'vi'
                              ? 'Bạn có thể cung cấp sơ yếu lý lịch và thư xin việc bằng tiếng Anh hoặc tiếng Việt.'
                              : 'You can provide CV and cover letter in English or Vietnamese.'}
                          </li>
                        </ul>
                      </div>

                      <div className="space-y-5">
                        
                        {/* Question 1: BAN CÓ ĐÁP ỨNG CÁC TIÊU CHÍ ĐỦ ĐIỀU KIỆN KHÔNG?* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-2">
                            {language === 'vi'
                              ? 'BẠN CÓ ĐÁP ỨNG CÁC TIÊU CHÍ ĐỦ ĐIỀU KIỆN KHÔNG?'
                              : 'DO YOU MEET THE ELIGIBILITY CRITERIA?'}{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </label>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                              <input
                                type="radio"
                                name="eligibility"
                                checked={vacancyForm.meetsEligibility === 'yes'}
                                onChange={() => setVacancyForm({ ...vacancyForm, meetsEligibility: 'yes' })}
                                className="accent-[#F17422] w-4 h-4 cursor-pointer"
                              />
                              <span>
                                {language === 'vi'
                                  ? 'Vâng, tôi đáp ứng tất cả các tiêu chí đủ điều kiện.'
                                  : 'Yes, I meet all the eligibility criteria.'}
                              </span>
                            </label>
                            <label className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                              <input
                                type="radio"
                                name="eligibility"
                                checked={vacancyForm.meetsEligibility === 'no'}
                                onChange={() => setVacancyForm({ ...vacancyForm, meetsEligibility: 'no' })}
                                className="accent-[#F17422] w-4 h-4 cursor-pointer"
                              />
                              <span>
                                {language === 'vi'
                                  ? 'Không, tôi không đáp ứng tất cả các tiêu chí đủ điều kiện.'
                                  : 'No, I do not meet all the eligibility criteria.'}
                              </span>
                            </label>
                          </div>
                        </div>

                        {/* Question 2: BẠN NÓI ĐƯỢC NHỮNG NGÔN NGỮ NÀO Ở TRÌNH ĐỘ B1 TRỞ LÊN?* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-2 leading-relaxed">
                            {language === 'vi'
                              ? 'BẠN NÓI ĐƯỢC NHỮNG NGÔN NGỮ NÀO Ở TRÌNH ĐỘ B1 TRỞ LÊN? (CÓ KHẢ NĂNG HIỂU VÀ GIAO TIẾP TRONG CÁC TÌNH HUỐNG HÀNG NGÀY, BÀY TỎ Ý KIẾN VÀ XỬ LÝ CÁC CÔNG VIỆC HOẶC CHUYẾN ĐI ĐƠN GIẢN.)'
                              : 'WHICH LANGUAGES DO YOU SPEAK AT B1 LEVEL OR ABOVE?'}{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </label>
                          <div className="space-y-2 pl-0.5">
                            {[
                              { id: 'Tiếng Anh', labelVi: 'Tiếng Anh', labelEn: 'English' },
                              { id: 'Tiếng Tây Ban Nha', labelVi: 'Tiếng Tây Ban Nha', labelEn: 'Spanish' },
                              { id: 'Tiếng Pháp', labelVi: 'Tiếng Pháp', labelEn: 'French' },
                              { id: 'Tiếng Nhật', labelVi: 'Tiếng Nhật', labelEn: 'Japanese' },
                              { id: 'Khác', labelVi: 'Khác', labelEn: 'Other' },
                            ].map((langItem) => (
                              <label key={langItem.id} className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                                <input
                                  type="checkbox"
                                  checked={vacancyForm.languages.includes(langItem.id)}
                                  onChange={() => toggleVacancyLanguage(langItem.id)}
                                  className="accent-[#F17422] w-4 h-4 rounded-none cursor-pointer"
                                />
                                <span>{language === 'vi' ? langItem.labelVi : langItem.labelEn}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Question 3: BẠN ĐÃ TỪNG SỐNG HOẶC LÀM VIỆC Ở NƯỚC NGOÀI HƠN 6 THÁNG CHƯA, VÀ NẾU CÓ THÌ Ở ĐÂU?* */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-1.5 leading-relaxed">
                            {language === 'vi'
                              ? 'BẠN ĐÃ TỪNG SỐNG HOẶC LÀM VIỆC Ở NƯỚC NGOÀI HƠN 6 THÁNG CHƯA, VÀ NẾU CÓ THÌ Ở ĐÂU?'
                              : 'HAVE YOU LIVED OR WORKED ABROAD FOR OVER 6 MONTHS, AND IF SO, WHERE?'}{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </label>
                          <textarea
                            required
                            rows={4}
                            value={vacancyForm.livedAbroad}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, livedAbroad: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden resize-y"
                          />
                        </div>

                        {/* Question 4: NẾU BẠN CHƯA TỪNG SỐNG HOẶC LÀM VIỆC Ở NƯỚC NGOÀI... */}
                        <div>
                          <label className="block text-xs font-bold text-[#13382c] uppercase tracking-wide mb-1.5 leading-relaxed">
                            {language === 'vi'
                              ? 'NẾU BẠN CHƯA TỪNG SỐNG HOẶC LÀM VIỆC Ở NƯỚC NGOÀI, VUI LÒNG CHIA SẺ KINH NGHIỆM (CHUYÊN MÔN) CỦA BẠN VỚI CÁC NỀN VĂN HÓA KHÁC NHAU.'
                              : 'IF YOU HAVE NOT LIVED OR WORKED ABROAD, PLEASE SHARE YOUR PROFESSIONAL EXPERIENCE WORKING WITH DIVERSE CULTURES.'}
                          </label>
                          <textarea
                            rows={4}
                            value={vacancyForm.multiculturalExp}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, multiculturalExp: e.target.value })}
                            className="w-full px-3.5 py-2.5 bg-[#E2EDE7] border border-[#9CBDAD] focus:border-[#13382c] focus:bg-white text-xs sm:text-sm text-slate-800 rounded-none focus:outline-hidden resize-y"
                          />
                        </div>

                      </div>
                    </div>

                    <div className="border-b border-[#C2D9CD] my-6" />

                    {/* SECTION 5: THỎA THUẬN PHÁP LÝ */}
                    <div>
                      <h2 className="text-xs sm:text-[13.5px] font-black uppercase tracking-wider text-[#13382c] mb-3">
                        {language === 'vi' ? 'THỎA THUẬN PHÁP LÝ' : 'LEGAL AGREEMENT'}
                      </h2>

                      <div className="space-y-3">
                        <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                          <input
                            type="checkbox"
                            checked={vacancyForm.agreePrivacy}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, agreePrivacy: e.target.checked })}
                            className="mt-0.5 accent-[#F17422] w-4 h-4 rounded-none cursor-pointer"
                          />
                          <span>
                            {language === 'vi' ? 'Tôi đồng ý với công ty ' : 'I agree with the company '}
                            <a
                              href="#privacy"
                              onClick={(e) => e.preventDefault()}
                              className="text-[#F17422] underline font-medium hover:text-[#d45e14]"
                            >
                              {language === 'vi' ? 'chính sách bảo mật' : 'privacy policy'}
                            </a>{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                          <input
                            type="checkbox"
                            checked={vacancyForm.agreeScreening}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, agreeScreening: e.target.checked })}
                            className="mt-0.5 accent-[#F17422] w-4 h-4 rounded-none cursor-pointer"
                          />
                          <span>
                            {language === 'vi'
                              ? 'Tôi đã đọc được rằng sàng lọc là một phần của quy trình nộp đơn'
                              : 'I acknowledge that screening is a formal part of the application process'}{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </span>
                        </label>

                        <label className="flex items-start gap-2.5 cursor-pointer text-xs sm:text-[13px] text-slate-800">
                          <input
                            type="checkbox"
                            checked={vacancyForm.agreeRetention180Days}
                            onChange={(e) => setVacancyForm({ ...vacancyForm, agreeRetention180Days: e.target.checked })}
                            className="mt-0.5 accent-[#F17422] w-4 h-4 rounded-none cursor-pointer"
                          />
                          <span>
                            {language === 'vi'
                              ? 'Tôi đồng ý với thời hạn lưu giữ dữ liệu của mình là 180 ngày.'
                              : 'I agree to the data retention period of 180 days.'}{' '}
                            <span className="text-red-500 font-bold">*</span>
                          </span>
                        </label>
                      </div>

                      <p className="text-[11.5px] text-slate-600 italic mt-4">
                        {language === 'vi'
                          ? 'Tất cả các trường được đánh dấu bằng * là bắt buộc.'
                          : 'All fields marked with * are required.'}
                      </p>

                      {/* Submit Button matching Image 1 */}
                      <div className="text-center pt-6">
                        <button
                          type="submit"
                          className="bg-[#FF6B35] hover:bg-[#e65a25] text-white font-bold text-xs sm:text-sm px-14 py-3 rounded-none uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer"
                        >
                          {language === 'vi' ? 'Gửi' : 'Submit'}
                        </button>
                      </div>

                    </div>

                  </form>
                )}

              </div>

              {/* Bottom Footer Signature matching screenshot */}
              <div className="bg-[#dce9e2] px-6 py-2.5 border-t border-slate-200 text-center">
                <span className="text-xs text-slate-700 font-semibold block">
                  {language === 'vi'
                    ? 'Làng Sinh Viên Bình Mỹ. Cùng nhau phát triển.'
                    : 'Binh My Student Village. Together we grow.'}
                </span>
              </div>
              <div className="bg-[#103E36] px-6 py-3 text-center">
                <span className="text-[11px] text-slate-300 block">
                  Copyright © 2026. All rights reserved.
                </span>
              </div>

            </div>

          </div>
        )}

      </div>
    </div>
  );
};
