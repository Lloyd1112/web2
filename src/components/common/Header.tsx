import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Search, Menu, X } from 'lucide-react';
import hutechLogo from '../../assets/hutech-logo.png';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenCollaboration: (type?: string) => void;
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', labelKey: 'home' },
    { id: 'health-models', labelKey: 'healthModels' },
    { id: 'training', labelKey: 'training' },
    { id: 'consulting', labelKey: 'consulting' },
    { id: 'international', labelKey: 'international' },
    { id: 'doctors', labelKey: 'doctorsAcrossBorders' },
    { id: 'news-contact', labelKey: 'newsContact' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className={`sticky top-0 z-50 transition-all duration-200 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/90' 
        : 'bg-white border-b border-slate-200 shadow-2xs'
    }`}>
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[72px] gap-2">
          
          {/* Logo with HUTECH University */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none flex-shrink-0 pr-1 xl:pr-3 group"
          >
            <div className="h-11 w-auto flex items-center justify-center flex-shrink-0">
              <img 
                src={hutechLogo} 
                alt="HUTECH University Logo" 
                className="h-11 w-auto object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-200"
              />
            </div>
            <div className="flex flex-col justify-center select-none">
              <span className="text-[12px] xl:text-[12.5px] 2xl:text-[13px] font-black tracking-tight text-slate-900 uppercase leading-none">
                {t('siteTitleTop')}
              </span>
              <span className="text-[9.5px] xl:text-[10px] 2xl:text-[10.5px] font-extrabold tracking-tight text-[#00875a] uppercase leading-tight mt-1">
                {t('siteTitleBottom')}
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2 flex-shrink px-1 2xl:px-2">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-2.5 2xl:px-3.5 py-1.5 rounded-full text-[12px] 2xl:text-[13px] font-bold whitespace-nowrap transition-all duration-150 relative ${
                    isActive
                      ? 'text-[#00875a] font-extrabold after:content-[\'\'] after:absolute after:bottom-[-2px] after:left-2.5 after:right-2.5 after:h-[2.5px] after:bg-[#00875a]'
                      : 'text-slate-700 hover:text-[#00875a]'
                  }`}
                >
                  {t(item.labelKey)}
                </button>
              );
            })}
          </nav>

          {/* Right Action: Language + Search + Collaboration Button */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-3 pl-1 2xl:pl-2 flex-shrink-0">
            {/* Language Switch */}
            <div className="flex items-center text-[11px] 2xl:text-[12px] font-black border border-slate-200 rounded-lg px-2 py-1 bg-slate-50 text-slate-700 shadow-2xs whitespace-nowrap">
              <button
                onClick={() => setLanguage('vi')}
                className={`transition-colors px-1 ${
                  language === 'vi' ? 'text-[#00875a] font-black' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                VI
              </button>
              <span className="text-slate-300 mx-0.5">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`transition-colors px-1 ${
                  language === 'en' ? 'text-[#00875a] font-black' : 'text-slate-400 hover:text-slate-700'
                }`}
              >
                EN
              </button>
            </div>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-1.5 2xl:p-2 text-slate-600 hover:text-[#00875a] hover:bg-slate-50 rounded-lg transition-colors"
              title="Tìm kiếm / Search"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
            </button>

            {/* Propose Collaboration CTA Button */}
            <button
              onClick={() => onOpenCollaboration('general')}
              className="bg-[#00875a] hover:bg-[#00734c] text-white px-3.5 2xl:px-5 py-2 2xl:py-2.5 rounded-full text-[11.5px] 2xl:text-xs font-bold shadow-xs active:scale-95 transition-all duration-150 whitespace-nowrap"
            >
              {t('proposeCollaboration')}
            </button>
          </div>

          {/* Mobile / Tablet Menu Toggle (triggers below xl < 1280px) */}
          <div className="flex items-center gap-2 xl:hidden">
            <button 
              onClick={onOpenSearch} 
              className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-800 hover:bg-slate-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile / Tablet Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center text-xs font-bold">
              <button
                onClick={() => setLanguage('vi')}
                className={`px-3 py-1.5 rounded-lg ${language === 'vi' ? 'bg-[#00875a] text-white' : 'text-slate-700 bg-slate-100'}`}
              >
                VI (Tiếng Việt)
              </button>
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1.5 rounded-lg ml-2 ${language === 'en' ? 'bg-[#00875a] text-white' : 'text-slate-700 bg-slate-100'}`}
              >
                EN (English)
              </button>
            </div>
          </div>

          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left px-3 py-2.5 rounded-xl text-sm font-bold transition-all ${
                  activeTab === item.id
                    ? 'bg-emerald-50 text-[#00875a]'
                    : 'text-slate-800 hover:bg-slate-50'
                }`}
              >
                {t(item.labelKey)}
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCollaboration('general');
            }}
            className="w-full mt-3 bg-[#00875a] text-white py-3 rounded-xl font-bold text-sm shadow-md"
          >
            {t('proposeCollaboration')}
          </button>
        </div>
      )}
    </header>
  );
};
