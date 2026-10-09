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
          
          {/* Brand Logo (LÀNG SV ĐỔI MỚI SÁNG TẠO BÌNH MỸ) */}
          <a 
            href={getPathForTab('home')}
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('home');
            }}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0 group"
          >
            {/* Green Sprout Leaf Icon */}
            <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 shadow-2xs group-hover:scale-105 transition-transform duration-200">
              <Sprout className="w-6 h-6 text-[#00875a]" />
            </div>
            <div className="flex flex-col justify-center select-none">
              <span className="text-[14px] xl:text-[15px] font-black tracking-tight text-[#00684a] uppercase leading-none">
                LÀNG SV
              </span>
              <span className="text-[9.5px] xl:text-[10px] font-extrabold tracking-wider text-[#00875a] uppercase leading-tight mt-0.5">
                ĐỔI MỚI SÁNG TẠO BÌNH MỸ
              </span>
            </div>
          </a>

          {/* ================= 6 MENU ITEMS MATCHING MOCKUP ================= */}
          {/* Trang chủ | Bài toán thực tế | Dự án | Cộng đồng | Tin tức | Giới thiệu */}
          <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8 h-full">
            
            {/* 1. Trang chủ */}
            <a
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
              className={`h-full inline-flex items-center text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                activeTab === 'home'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-700 hover:text-[#00875a]'
              }`}
            >
              Trang chủ
            </a>

            {/* 2. Bài toán thực tế */}
            <a
              href={getPathForTab('real-problems')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('real-problems');
              }}
              className={`h-full inline-flex items-center text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                activeTab === 'real-problems'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-700 hover:text-[#00875a]'
              }`}
            >
              Bài toán thực tế
            </a>

            {/* 3. Dự án */}
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
                className={`h-full inline-flex items-center gap-1 text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                  isProjectActive
                    ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                    : 'text-slate-700 hover:text-[#00875a]'
                }`}
              >
                <span>Dự án</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${
                  isProjectsDropdownOpen ? 'rotate-180 text-[#00875a]' : 'text-slate-500'
                }`} />
              </a>

              {/* Mega Dropdown for Dự án */}
              {isProjectsDropdownOpen && (
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 w-88 bg-white rounded-2xl shadow-xl border border-slate-200 p-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                >
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
                          className={`p-2.5 rounded-xl cursor-pointer transition-all flex items-center gap-3 group/sub ${
                            isSubActive 
                              ? 'bg-emerald-50 text-[#00875a]' 
                              : 'hover:bg-slate-50 text-slate-800'
                          }`}
                        >
                          <div className={`w-8 h-8 rounded-lg ${item.bgColor} flex items-center justify-center flex-shrink-0`}>
                            <IconComp className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-xs font-bold leading-snug">
                              {item.titleVi}
                            </p>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* 4. Cộng đồng */}
            <a
              href={getPathForTab('about')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`h-full inline-flex items-center text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                activeTab === 'community'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-700 hover:text-[#00875a]'
              }`}
            >
              Cộng đồng
            </a>

            {/* 5. Tin tức */}
            <a
              href={getPathForTab('events')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('events');
              }}
              className={`h-full inline-flex items-center text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                activeTab === 'events'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-700 hover:text-[#00875a]'
              }`}
            >
              Tin tức
            </a>

            {/* 6. Giới thiệu */}
            <a
              href={getPathForTab('about')}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('about');
              }}
              className={`h-full inline-flex items-center text-[14.5px] xl:text-[15px] transition-colors relative font-semibold ${
                activeTab === 'about'
                  ? 'text-[#00875a] font-bold after:content-[\'\'] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[3px] after:bg-[#00875a] after:rounded-t-full'
                  : 'text-slate-700 hover:text-[#00875a]'
              }`}
            >
              Giới thiệu
            </a>

          </nav>

          {/* Right Action Controls: Search + Đăng nhập + Đăng ký */}
          <div className="hidden lg:flex items-center gap-3 flex-shrink-0">
            
            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="w-9 h-9 rounded-full bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#00875a] flex items-center justify-center transition-colors border border-slate-200"
              title="Tìm kiếm"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Button Đăng nhập */}
            <button
              onClick={() => handleNavClick('admin-login')}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-[#00875a] border border-[#00875a] bg-white hover:bg-emerald-50 transition-all shadow-2xs active:scale-95"
            >
              Đăng nhập
            </button>

            {/* Button Đăng ký */}
            <button
              onClick={() => onOpenCollaboration('general', '')}
              className="px-4 py-1.5 rounded-full text-xs font-bold text-white bg-[#00684a] hover:bg-[#005238] transition-all shadow-2xs active:scale-95"
            >
              Đăng ký
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
