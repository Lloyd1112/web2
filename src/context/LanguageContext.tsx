import React, { createContext, useContext, useState } from 'react';
import { Language } from '../types';

interface Translations {
  [key: string]: {
    vi: string;
    en: string;
  };
}

export const translations: Translations = {
  // Navigation
  siteTitleTop: {
    vi: 'LÀNG SINH VIÊN',
    en: 'STUDENT VILLAGE'
  },
  siteTitleBottom: {
    vi: 'ĐỔI MỚI SÁNG TẠO BÌNH MỸ',
    en: 'BINH MY INNOVATION & CREATIVITY'
  },
  home: {
    vi: 'Trang chủ',
    en: 'Home'
  },
  healthModels: {
    vi: 'Ba mô hình y tế',
    en: '3 Healthcare Models'
  },
  training: {
    vi: 'Đào tạo nhân lực y tế',
    en: 'Workforce Training'
  },
  consulting: {
    vi: 'Tư vấn dự án',
    en: 'Project Consulting'
  },
  international: {
    vi: 'Hợp tác quốc tế',
    en: 'Intl Cooperation'
  },
  doctorsAcrossBorders: {
    vi: 'Bác sĩ xuyên biên giới',
    en: 'Doctors Across Borders'
  },
  newsContact: {
    vi: 'Tin tức & Liên hệ',
    en: 'News & Contact'
  },
  proposeCollaboration: {
    vi: 'Đề xuất hợp tác',
    en: 'Propose Collaboration'
  },

  // Hero Section
  heroTitle1: {
    vi: 'Làng Sinh Viên',
    en: 'Binh My Innovative'
  },
  heroTitle2: {
    vi: 'Đổi Mới Sáng Tạo Bình Mỹ',
    en: 'Student Village'
  },
  heroSubtitle: {
    vi: 'Kết nối đào tạo, nghiên cứu và hợp tác quốc tế để phát triển hệ sinh thái y tế – du lịch – nông nghiệp bền vững.',
    en: 'Connecting education, research, and international cooperation to foster a sustainable healthcare – tourism – agriculture ecosystem.'
  },
  exploreModels: {
    vi: 'Khám phá các mô hình',
    en: 'Explore Models'
  },
  registerProgram: {
    vi: 'Đăng ký chương trình',
    en: 'Register Program'
  },

  // 5 Focus Areas
  fiveFieldsTitle: {
    vi: '5 lĩnh vực hoạt động chính',
    en: '5 Core Activity Domains'
  },
  fiveFieldsSubtitle: {
    vi: 'Tạo giá trị từ tri thức – Kết nối vì sức khỏe cộng đồng và phát triển bền vững.',
    en: 'Creating value from knowledge – Connecting for community health and sustainable development.'
  },

  // Statistics
  statsTitle: {
    vi: 'Những con số nổi bật',
    en: 'Key Highlights & Figures'
  },
  statsSubtitle: {
    vi: '(Chỉ công bố khi có dữ liệu chính thức)',
    en: '(Officially verified released figures)'
  },
  statPartners: {
    vi: 'Đối tác trong nước & quốc tế',
    en: 'Domestic & Intl Partners'
  },
  statPrograms: {
    vi: 'Chương trình đào tạo',
    en: 'Training Programs'
  },
  statDoctors: {
    vi: 'Bác sĩ, chuyên gia tham gia',
    en: 'Doctors & Experts Joined'
  },
  statProjects: {
    vi: 'Dự án được tư vấn',
    en: 'Consulted Projects'
  },
  statResearch: {
    vi: 'Hội thảo & đề tài nghiên cứu',
    en: 'Seminars & Research Topics'
  },
  statBeneficiaries: {
    vi: 'Người dân được hưởng lợi',
    en: 'Community Beneficiaries'
  },

  // Events
  eventsTitle: {
    vi: 'Chương trình và sự kiện sắp diễn ra',
    en: 'Upcoming Programs & Events'
  },
  viewAll: {
    vi: 'Xem tất cả',
    en: 'View All'
  },

  // Partners
  partnersTitle: {
    vi: 'Đối tác tiêu biểu',
    en: 'Distinguished Partners'
  },
  tabUniversities: {
    vi: 'Trường đại học',
    en: 'Universities'
  },
  tabHospitals: {
    vi: 'Bệnh viện và cơ sở y tế',
    en: 'Hospitals & Clinics'
  },
  tabInstitutes: {
    vi: 'Viện nghiên cứu',
    en: 'Research Institutes'
  },
  tabEnterprises: {
    vi: 'Doanh nghiệp',
    en: 'Enterprises'
  },
  tabGovernment: {
    vi: 'Cơ quan quản lý',
    en: 'Regulatory Bodies'
  },
  tabInternational: {
    vi: 'Tổ chức quốc tế',
    en: 'Intl Organizations'
  },

  // CTA Bottom
  ctaText: {
    vi: 'Cùng chúng tôi xây dựng hệ sinh thái đào tạo, nghiên cứu và dịch vụ y tế gắn với sự phát triển bền vững của Bình Mỹ.',
    en: 'Join us in building an education, research and healthcare service ecosystem dedicated to sustainable development.'
  },
  becomePartner: {
    vi: 'Trở thành đối tác',
    en: 'Become a Partner'
  },
  registerExpert: {
    vi: 'Đăng ký chuyên gia',
    en: 'Register as Expert'
  },
  sendConsultingReq: {
    vi: 'Gửi yêu cầu tư vấn',
    en: 'Submit Inquiry'
  },

  // Footer
  footerCopyright: {
    vi: '© 2025 Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Tất cả quyền được bảo lưu.',
    en: '© 2025 Binh My Innovative Student Village. All rights reserved.'
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('vi');

  const t = (key: string): string => {
    if (translations[key] && translations[key][language]) {
      return translations[key][language];
    }
    return key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
