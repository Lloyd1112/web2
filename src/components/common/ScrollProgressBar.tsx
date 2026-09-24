import React, { useState, useEffect } from 'react';

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(Math.max(progress, 0), 100));
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3.5px] bg-transparent pointer-events-none">
      <div 
        className="h-full bg-gradient-to-r from-[#00875a] via-[#00a86b] to-[#0284c7] transition-[width] duration-75 ease-out shadow-[0_0_8px_rgba(0,168,107,0.7)]"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
