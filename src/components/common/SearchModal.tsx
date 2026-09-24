import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, BookOpen, HeartPulse, Stethoscope, Briefcase } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { mockActivityFields, mockHealthModels, mockTrainingPrograms, mockDoctorProfiles, mockEvents } from '../../data/mockData';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tabId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose, onNavigate }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const q = query.toLowerCase().trim();

  // Search results
  const matchedModels = q ? mockHealthModels.filter(m => m.title.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)) : [];
  const matchedPrograms = q ? mockTrainingPrograms.filter(p => p.categoryName.toLowerCase().includes(q) || p.items.some(i => i.toLowerCase().includes(q))) : [];
  const matchedDoctors = q ? mockDoctorProfiles.filter(d => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q)) : [];
  const matchedEvents = q ? mockEvents.filter((e: any) => (e.titleVi || e.title || '').toLowerCase().includes(q) || (e.categoryVi || e.category || '').toLowerCase().includes(q)) : [];

  const handleSelect = (tab: string) => {
    onNavigate(tab);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200/80 transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        
        {/* Search Input Bar - Clean borderless spotlight style */}
        <div className="flex items-center px-4 sm:px-5 py-3.5 sm:py-4 border-b border-slate-100 gap-3 sm:gap-3.5 bg-slate-50/60">
          <Search className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            placeholder={language === 'vi' ? 'Nhập từ khóa tìm kiếm (vd: Living Lab, Điều dưỡng, Bác sĩ...)' : 'Type to search (e.g. Living Lab, Nursing, Doctors...)'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 w-full bg-transparent text-slate-800 placeholder-slate-400 text-sm sm:text-[15px] font-medium border-0 outline-none focus:outline-none focus:ring-0 focus:border-0 shadow-none p-0 m-0"
            style={{ border: 'none', outline: 'none', boxShadow: 'none', WebkitAppearance: 'none' }}
          />
          {query && (
            <button 
              onClick={() => setQuery('')} 
              className="p-1 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200/60 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button 
            onClick={onClose} 
            className="text-[11px] font-bold text-slate-500 hover:text-slate-800 px-2 py-1 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-md shadow-2xs transition-colors whitespace-nowrap cursor-pointer"
          >
            ESC
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-5 space-y-4">
          {!q ? (
            <div className="py-6 sm:py-8 text-center">
              <p className="text-xs sm:text-sm font-semibold text-slate-400">
                {language === 'vi' ? 'Gợi ý tìm kiếm phổ biến:' : 'Popular searches:'}
              </p>
              <div className="flex flex-wrap items-center justify-center gap-2 mt-3">
                {['Living Lab', 'Chăm sóc người cao tuổi', 'Health & Wellness', 'Đào tạo điều dưỡng', 'Hợp tác Harvard', 'OCOP Bình Mỹ'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setQuery(tag)}
                    className="text-xs bg-slate-100 hover:bg-emerald-50 hover:text-emerald-700 text-slate-600 px-3 py-1.5 rounded-full transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchedModels.length === 0 && matchedPrograms.length === 0 && matchedDoctors.length === 0 && matchedEvents.length === 0 && (
                <div className="py-8 text-center text-slate-500 text-sm">
                  {language === 'vi' ? `Không tìm thấy kết quả phù hợp cho "${query}"` : `No results found for "${query}"`}
                </div>
              )}

              {matchedModels.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {language === 'vi' ? 'Mô hình Y tế' : 'Healthcare Models'}
                  </h4>
                  <div className="space-y-1.5">
                    {matchedModels.map(m => (
                      <div
                        key={m.id}
                        onClick={() => handleSelect('health-models')}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <HeartPulse className="w-5 h-5 text-emerald-600" />
                          <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">{m.title}</p>
                            <p className="text-xs text-slate-500 line-clamp-1">{m.tagline}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedPrograms.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {language === 'vi' ? 'Chương trình Đào tạo' : 'Training Programs'}
                  </h4>
                  <div className="space-y-1.5">
                    {matchedPrograms.map(p => (
                      <div
                        key={p.id}
                        onClick={() => handleSelect('training')}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-blue-50/70 border border-transparent hover:border-blue-200 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <BookOpen className="w-5 h-5 text-blue-600" />
                          <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-blue-700">{p.categoryName}</p>
                            <p className="text-xs text-slate-500">{p.items.slice(0, 2).join(', ')}...</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedDoctors.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {language === 'vi' ? 'Bác sĩ & Chuyên gia' : 'Doctors & Experts'}
                  </h4>
                  <div className="space-y-1.5">
                    {matchedDoctors.map(d => (
                      <div
                        key={d.id}
                        onClick={() => handleSelect('doctors')}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-teal-50/70 border border-transparent hover:border-teal-200 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <Stethoscope className="w-5 h-5 text-teal-600" />
                          <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-teal-700">{d.name} {d.flag}</p>
                            <p className="text-xs text-slate-500">{d.specialty} • {d.organization}</p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-teal-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedEvents.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                    {language === 'vi' ? 'Sự kiện & Hội thảo' : 'Events & Seminars'}
                  </h4>
                  <div className="space-y-1.5">
                    {matchedEvents.map((e: any) => (
                      <div
                        key={e.id}
                        onClick={() => handleSelect('home')}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 border border-transparent hover:border-slate-200 cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-xs font-bold px-2 py-1 bg-emerald-100 text-emerald-800 rounded-md">
                            {e.day} {language === 'vi' ? (e.monthVi || e.month) : (e.monthEn || e.month)}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-slate-800 group-hover:text-emerald-700">
                              {language === 'vi' ? (e.titleVi || e.title) : (e.titleEn || e.title)}
                            </p>
                            <p className="text-xs text-slate-500">
                              {language === 'vi' ? (e.locationVi || e.location) : (e.locationEn || e.location)}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-600" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

      </div>
    </div>
  );
};
