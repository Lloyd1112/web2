import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';
import hutechLogo from '../../assets/hutech-logo.png';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, setLanguage, t } = useLanguage();

  const navLinks = [
    { id: 'home', labelKey: 'home' },
    { id: 'health-models', labelKey: 'healthModels' },
    { id: 'training', labelKey: 'training' },
    { id: 'consulting', labelKey: 'consulting' },
    { id: 'international', labelKey: 'international' },
    { id: 'doctors', labelKey: 'doctorsAcrossBorders' },
    { id: 'news-contact', labelKey: 'newsContact' },
  ];

  const handleNav = (id: string) => {
    setActiveTab(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#0f172a] text-slate-300 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        
        {/* Main Footer Row */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-md">
              <img 
                src={hutechLogo} 
                alt="HUTECH University Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="text-xs font-bold tracking-tight text-white uppercase leading-tight">
                Làng Sinh Viên
              </span>
              <span className="text-[10px] font-extrabold tracking-wider text-emerald-400 uppercase leading-tight">
                Đổi Mới Sáng Tạo Bình Mỹ
              </span>
            </div>
          </div>

          {/* Nav Links in horizontal list */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium text-slate-300">
            {navLinks.map((item, idx) => (
              <React.Fragment key={item.id}>
                <button
                  onClick={() => handleNav(item.id)}
                  className="hover:text-emerald-400 transition-colors"
                >
                  {t(item.labelKey)}
                </button>
                {idx < navLinks.length - 1 && (
                  <span className="text-slate-700 hidden sm:inline">|</span>
                )}
              </React.Fragment>
            ))}
          </nav>

          {/* Social Icons & Lang */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" title="YouTube">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </a>
              <a href="#" className="w-8 h-8 rounded-full bg-slate-800 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-colors" title="Website">
                <Globe className="w-4 h-4" />
              </a>
            </div>

            <div className="flex items-center text-xs font-bold bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md border border-slate-700">
              <button
                onClick={() => setLanguage('vi')}
                className={`hover:text-emerald-400 ${language === 'vi' ? 'text-emerald-400 font-extrabold' : ''}`}
              >
                VI
              </button>
              <span className="text-slate-600 mx-1.5">|</span>
              <button
                onClick={() => setLanguage('en')}
                className={`hover:text-emerald-400 ${language === 'en' ? 'text-emerald-400 font-extrabold' : ''}`}
              >
                EN
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright line */}
        <div className="pt-6 text-center text-xs text-slate-500">
          <p>{t('footerCopyright')}</p>
        </div>

      </div>
    </footer>
  );
};
