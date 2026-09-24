import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export const BackToTop: React.FC = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      
      setIsVisible(scrollY > 280);
      
      if (totalHeight > 0) {
        const currentProgress = (scrollY / totalHeight) * 100;
        setProgress(Math.min(Math.max(currentProgress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  // SVG circular ring calculations (radius 18, circumference ~ 113.1)
  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div 
      className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-8 scale-90 pointer-events-none'
      }`}
    >
      <button
        onClick={scrollToTop}
        title={language === 'vi' ? 'Cuộn lên đầu trang' : 'Back to top'}
        aria-label="Back to top"
        className="relative group w-12 h-12 rounded-full bg-white text-slate-800 shadow-lg shadow-slate-900/15 hover:shadow-emerald-500/25 border border-slate-200/80 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
      >
        {/* Circular Progress Ring */}
        <svg className="absolute inset-0 w-12 h-12 -rotate-90 pointer-events-none">
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-slate-100"
            strokeWidth="2.5"
            fill="transparent"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            className="stroke-[#00875a] transition-[stroke-dashoffset] duration-100 ease-out"
            strokeWidth="2.5"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
          />
        </svg>

        {/* Center Arrow Icon */}
        <ArrowUp className="w-5 h-5 text-slate-700 group-hover:text-[#00875a] group-hover:-translate-y-0.5 transition-all duration-200" />

        {/* Tooltip on hover */}
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-md">
          {language === 'vi' ? 'Lên đầu trang' : 'Back to top'}
        </span>
      </button>
    </div>
  );
};
