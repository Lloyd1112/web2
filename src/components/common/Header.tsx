import React, { useState, useEffect, useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Search, 
  Menu, 
  X, 
  ChevronDown, 
  HeartHandshake, 
  Stethoscope, 
  HeartPulse,
  GraduationCap, 
  Lightbulb, 
  Globe2, 
  Sparkles,
  ArrowRight,
  Sprout,
  Palmtree
} from 'lucide-react';
import hutechLogo from '../../assets/hutech-logo.png';
import { getPathForTab } from '../../routes';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenCollaboration,
  onOpenSearch,
}) => {
  const { language, setLanguage, t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProjectsDropdownOpen, setIsProjectsDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnterProjects = () => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setIsProjectsDropdownOpen(true);
  };

  const handleMouseLeaveProjects = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setIsProjectsDropdownOpen(false);
    }, 200);
  };

  const handleNavClick = (tabId: string) => {
    setActiveTab(tabId);
    setMobileMenuOpen(false);
    setIsProjectsDropdownOpen(false);
  };

  // Check if current tab is any of the projects / pillar pages
  const isProjectActive = [
    'projects', 
    'agriculture',
    'health-models', 
    'tourism',
    'training', 
    'consulting', 
    'international', 
    'doctors'
  ].includes(activeTab);

  // 3 Trụ cột / Lĩnh vực dưới dropdown "Dự án": Nông Nghiệp, Y tế, Du lịch
  const projectSubItems = [
    {
      id: 'agriculture',
      titleVi: 'Nông nghiệp',
      titleEn: 'Agriculture',
      descVi: 'Nông nghiệp sinh thái tuần hoàn, dược liệu & sản phẩm OCOP',
      descEn: 'Agro-ecology, circular farming, medicinal herbs & OCOP',
      icon: Sprout,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 group-hover/sub:bg-amber-100/80 text-amber-600'
    },
    {
      id: 'health-models',
      titleVi: 'Y tế',
      titleEn: 'Healthcare',
      descVi: 'Y tế cộng đồng, chăm sóc người cao tuổi & Living Lab y tế số',
      descEn: 'Community health, elderly care & digital health Living Lab',
      icon: HeartPulse,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 group-hover/sub:bg-emerald-100/80 text-emerald-600'
    },
    {
      id: 'tourism',
      titleVi: 'Du lịch',
      titleEn: 'Tourism',
      descVi: 'Du lịch sinh thái miệt vườn, Wellness Farmstay & ẩm thực dưỡng sinh',
      descEn: 'River eco-tours, wellness farmstay & healing gastronomy',
      icon: Palmtree,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 group-hover/sub:bg-sky-100/80 text-sky-600'
    }
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/98 backdrop-blur-md shadow-md border-b border-slate-200/90' 
        : 'bg-white border-b border-slate-200 shadow-2xs'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-4">
          
          {/* Brand Logo (HUTECH & Làng Sinh Viên Bình Mỹ) */}
          <a 
            href={getPathForTab('home')}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3.5 cursor-pointer select-none flex-shrink-0 group"
          >
            <div className="h-11 w-auto flex items-center justify-center flex-shrink-0">
              <img 
                src={hutechLogo} 
                alt="HUTECH University Logo" 
                className="h-11 w-auto object-contain drop-shadow-2xs group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col justify-center select-none border-l-2 border-slate-200 pl-3">
              <span className="text-[12px] xl:text-[13px] font-black tracking-tight text-slate-900 uppercase leading-none">
                {language === 'vi' ? 'LÀNG SINH VIÊN' : 'STUDENT VILLAGE'}
              </span>
              <span className="text-[10px] xl:text-[10.5px] font-extrabold tracking-wider text-pum-green uppercase leading-tight mt-1">
                {language === 'vi' ? 'ĐỔI MỚI SÁNG TẠO BÌNH MỸ' : 'BINH MY INNOVATION CAMPUS'}
              </span>
            </div>
          </a>

          {/* ================= EXACT 5 MENU ITEMS AS USER IMAGE ================= */}
          {/* Trang chủ | Dự án ⌄ | Thông tin về chúng tôi | Sự kiện | Liên hệ */}
          <nav className="hidden lg:flex items-center space-x-8 xl:space-x-10 h-full">
            
            {/* 1. Trang chủ */}
            <a
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`h-full inline-flex items-center text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                activeTab === 'home'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-800 hover:text-[#00875a]'
              }`}
            >
              {language === 'vi' ? 'Trang chủ' : 'Home'}
            </a>

            {/* 2. Dự án ⌄ */}
            <div 
              className="relative h-full flex items-center"
              onMouseEnter={handleMouseEnterProjects}
              onMouseLeave={handleMouseLeaveProjects}
            >
              <a
                href={getPathForTab('health-models')}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('health-models');
                }}
                className={`h-full inline-flex items-center gap-1.5 text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                  isProjectActive
                    ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                    : 'text-slate-800 hover:text-[#00875a]'
                }`}
              >
                <span>{language === 'vi' ? 'Dự án' : 'Projects'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${
                  isProjectsDropdownOpen ? 'rotate-180 text-[#00875a]' : 'text-slate-500'
                }`} />
              </a>

              {/* Mega Dropdown for Dự án */}
              {isProjectsDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 w-96 bg-white rounded-2xl shadow-xl border border-slate-200/90 p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
                  <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#00875a] px-3 py-1.5 border-b border-slate-100 mb-1 flex items-center justify-between">
                    <span>{language === 'vi' ? 'Hệ thống dự án & mô hình' : 'Pillars & Models'}</span>
                    <span className="text-[10px] text-slate-400 font-semibold">{language === 'vi' ? 'Chọn lĩnh vực' : 'Select'}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    {projectSubItems.map((item) => {
                      const IconComp = item.icon;
                      const isSubActive = activeTab === item.id;
                      return (
                        <a
                          key={item.id}
                          href={getPathForTab(item.id)}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.id);
                          }}
                          className={`p-3 rounded-xl cursor-pointer transition-all flex items-start gap-3 group/sub ${
                            isSubActive 
                              ? 'bg-pum-lightGreen/40 border border-pum-green/20' 
                              : 'hover:bg-slate-50'
                          }`}
                        >
                          <div className={`w-9 h-9 rounded-xl ${item.bgColor} flex items-center justify-center flex-shrink-0 mt-0.5 shadow-2xs transition-colors`}>
                            <IconComp className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 group-hover/sub:text-[#00875a] leading-snug">
                              {language === 'vi' ? item.titleVi : item.titleEn}
                            </p>
                            <p className="text-xs text-slate-500 leading-tight mt-0.5">
                              {language === 'vi' ? item.descVi : item.descEn}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 3. Bài toán thực tế */}
            <a
              href={getPathForTab('real-problems')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('real-problems');
              }}
              className={`h-full inline-flex items-center text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                activeTab === 'real-problems'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-800 hover:text-[#00875a]'
              }`}
            >
              {language === 'vi' ? 'Bài toán thực tế' : 'Real-World Problems'}
            </a>

            {/* 4. Thông tin về chúng tôi */}
            <a
              href={getPathForTab('about')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`h-full inline-flex items-center text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                activeTab === 'about'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-800 hover:text-[#00875a]'
              }`}
            >
              {language === 'vi' ? 'Thông tin về chúng tôi' : 'About Us'}
            </a>

            {/* 4. Sự kiện */}
            <a
              href={getPathForTab('events')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('events');
              }}
              className={`h-full inline-flex items-center text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                activeTab === 'events'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-800 hover:text-[#00875a]'
              }`}
            >
              {language === 'vi' ? 'Sự kiện' : 'Events'}
            </a>

            {/* 5. Liên hệ */}
            <a
              href={getPathForTab('contact')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`h-full inline-flex items-center text-[15px] xl:text-[16px] transition-colors relative font-semibold ${
                activeTab === 'contact' || activeTab === 'news-contact'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3.5px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-800 hover:text-[#00875a]'
              }`}
            >
              {language === 'vi' ? 'Liên hệ' : 'Contact'}
            </a>

          </nav>

          {/* Right Action Controls: Search + Language Switcher + Prominent CTA */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-slate-100 hover:bg-pum-lightGreen/60 text-slate-600 hover:text-pum-green flex items-center justify-center transition-colors shadow-2xs"
              title={language === 'vi' ? 'Tìm kiếm' : 'Search'}
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Language Switcher Pill */}
            <div className="flex items-center bg-slate-100 p-1 rounded-full text-xs font-bold text-slate-600 border border-slate-200/80">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'vi' 
                    ? 'bg-pum-green text-white shadow-2xs' 
                    : 'hover:text-pum-green'
                }`}
              >
                VI
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-2.5 py-1 rounded-full transition-all ${
                  language === 'en' 
                    ? 'bg-pum-green text-white shadow-2xs' 
                    : 'hover:text-pum-green'
                }`}
              >
                EN
              </button>
            </div>

            {/* Signature PUM Orange CTA Button */}
            <button
              onClick={() => onOpenCollaboration('general', '')}
              className="inline-flex items-center gap-2 font-bold px-5 py-2.5 rounded-full text-white bg-pum-orange hover:bg-pum-orangeHover transition-all text-xs tracking-wide shadow-sm hover:shadow-md active:scale-95 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Collaborate'}</span>
            </button>

          </div>

          {/* Mobile Hamburger & Quick Controls */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setLanguage(language === 'vi' ? 'en' : 'vi')}
              className="px-2.5 py-1 rounded-full bg-slate-100 text-xs font-bold text-slate-700"
            >
              {language.toUpperCase()}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="w-10 h-10 rounded-full bg-pum-lightGreen/50 text-pum-green flex items-center justify-center transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-4 pb-6 shadow-xl animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col gap-1.5">
            
            {/* 1. Trang chủ */}
            <a
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                activeTab === 'home' 
                  ? 'bg-pum-green text-white shadow-xs' 
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Trang chủ' : 'Home'}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>

            {/* 2. Dự án (Collapsible on mobile) */}
            <div>
              <button
                onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                className={`w-full px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                  isProjectActive 
                    ? 'bg-pum-lightGreen/60 text-pum-green font-extrabold' 
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{language === 'vi' ? 'Dự án' : 'Projects'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${mobileProjectsOpen ? 'rotate-180' : ''}`} />
              </button>

              {mobileProjectsOpen && (
                <div className="pl-4 pr-2 py-2 flex flex-col gap-1 border-l-2 border-pum-green/30 ml-4 my-1">
                  {projectSubItems.map((item) => {
                    const IconComp = item.icon;
                    return (
                      <a
                        key={item.id}
                        href={getPathForTab(item.id)}
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.id);
                        }}
                        className={`px-3 py-2.5 rounded-xl text-left text-xs font-bold transition-colors flex items-center gap-2.5 ${
                          activeTab === item.id 
                            ? 'bg-pum-green text-white' 
                            : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <IconComp className={`w-4 h-4 ${activeTab === item.id ? 'text-white' : item.color}`} />
                        <span>{language === 'vi' ? item.titleVi : item.titleEn}</span>
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

              {/* 3. Bài toán thực tế */}
              <a
                href={getPathForTab('real-problems')}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('real-problems');
                }}
                className={`px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                  activeTab === 'real-problems' 
                    ? 'bg-pum-green text-white shadow-xs' 
                    : 'text-slate-800 hover:bg-slate-100'
                }`}
              >
                <span>{language === 'vi' ? 'Bài toán thực tế' : 'Real-World Problems'}</span>
                <ArrowRight className="w-4 h-4 opacity-70" />
              </a>

              {/* 4. Thông tin về chúng tôi */}
            <a
              href={getPathForTab('about')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                activeTab === 'about' 
                  ? 'bg-pum-green text-white shadow-xs' 
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Thông tin về chúng tôi' : 'About Us'}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>

            {/* 4. Sự kiện */}
            <a
              href={getPathForTab('events')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('events');
              }}
              className={`px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                activeTab === 'events' 
                  ? 'bg-pum-green text-white shadow-xs' 
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Sự kiện' : 'Events'}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>

            {/* 5. Liên hệ */}
            <a
              href={getPathForTab('contact')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className={`px-4 py-3 rounded-2xl text-left font-bold text-sm transition-colors flex items-center justify-between ${
                activeTab === 'contact' || activeTab === 'news-contact'
                  ? 'bg-pum-green text-white shadow-xs' 
                  : 'text-slate-800 hover:bg-slate-100'
              }`}
            >
              <span>{language === 'vi' ? 'Liên hệ' : 'Contact'}</span>
              <ArrowRight className="w-4 h-4 opacity-70" />
            </a>

          </nav>

          <div className="mt-5 pt-4 border-t border-slate-200">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCollaboration('general', '');
              }}
              className="w-full py-3.5 rounded-full font-bold text-sm text-white bg-pum-orange hover:bg-pum-orangeHover flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer"
            >
              <HeartHandshake className="w-4 h-4" />
              <span>{language === 'vi' ? 'Đề xuất hợp tác' : 'Collaborate With Us'}</span>
            </button>
          </div>
        </div>
      )}

    </header>
  );
};
