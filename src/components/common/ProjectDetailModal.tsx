import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PumProject } from '../../types';
import { X, MapPin, CheckCircle2, ArrowRight, Calendar, Building2 } from 'lucide-react';

interface ProjectDetailModalProps {
  project: PumProject | null;
  onClose: () => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onOpenCollaboration,
}) => {
  const { language } = useLanguage();

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with image */}
        <div className="relative aspect-[16/9] w-full bg-slate-100 flex-shrink-0">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors shadow-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="absolute bottom-4 left-4">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white text-pum-green shadow-xs">
              {language === 'vi' ? project.categoryName : project.categoryNameEn}
            </span>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
            <MapPin className="w-4 h-4 text-pum-orange" />
            <span>{project.location}</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug mb-4">
            {language === 'vi' ? project.title : project.titleEn}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6">
            {language === 'vi' ? project.summary : project.summaryEn}
          </p>

          {/* Impact Metrics */}
          <div className="mb-6 bg-pum-lightGreen/30 rounded-2xl p-4 border border-pum-green/15">
            <h4 className="text-xs font-black uppercase tracking-wider text-pum-green mb-3">
              {language === 'vi' ? 'Kết quả & Chỉ số tác động' : 'Impact Metrics & Results'}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {project.impactMetrics.map((metric, idx) => (
                <div key={idx} className="bg-white rounded-xl p-3 border border-slate-200/80 shadow-2xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-pum-orange flex-shrink-0" />
                  <span className="text-xs font-bold text-slate-800">{metric}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-end gap-3">
            <button
              onClick={onClose}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-bold"
            >
              {language === 'vi' ? 'Đóng' : 'Close'}
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCollaboration('consulting', project.title);
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-pum-orange hover:bg-pum-orangeHover text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <span>{language === 'vi' ? 'Tư vấn / Chuyển giao mô hình này' : 'Consult / Adopt this Model'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
