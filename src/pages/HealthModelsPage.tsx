import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockHealthModels } from '../data/mockData';
import { 
  HeartHandshake, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Activity, 
  Palmtree, 
  Leaf, 
  Stethoscope, 
  Eye, 
  Users, 
  FileText 
} from 'lucide-react';

interface HealthModelsPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HealthModelsPage: React.FC<HealthModelsPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [selectedModel, setSelectedModel] = useState<string>('community-health');

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold tracking-wide uppercase">
            <Leaf className="w-3.5 h-3.5" />
            <span>Hệ Sinh Thái Đột Phá</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Ba Mô Hình Y Tế Kết Hợp Du Lịch & Nông Nghiệp
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Mô hình tích hợp đa ngành tiên phong tại Việt Nam: Kết nối y tế chuyên sâu, chăm sóc lão khoa và nghỉ dưỡng phục hồi sức khỏe với hệ sinh thái nông nghiệp sạch Bình Mỹ.
          </p>
        </div>

        {/* Model Selector Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {mockHealthModels.map((model) => {
            const isSelected = selectedModel === model.id;
            return (
              <button
                key={model.id}
                onClick={() => setSelectedModel(model.id)}
                className={`px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 flex items-center gap-2.5 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-600/30 scale-102'
                    : 'bg-white text-slate-700 hover:bg-emerald-50 border border-slate-200'
                }`}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black ${
                  isSelected ? 'bg-white text-emerald-700' : 'bg-slate-100 text-slate-600'
                }`}>
                  {model.number}
                </span>
                <span>{model.title}</span>
              </button>
            );
          })}
        </div>

        {/* 3 Detailed Healthcare Models Showcase */}
        <div className="space-y-12">
          {mockHealthModels.map((model) => (
            <div
              key={model.id}
              id={model.id}
              className={`bg-white rounded-3xl border border-slate-200/90 overflow-hidden shadow-card transition-all duration-300 ${
                selectedModel === model.id ? 'ring-2 ring-emerald-500/50 shadow-xl' : ''
              }`}
            >
              <div className="grid grid-cols-1 lg:grid-cols-12">
                
                {/* Left Image & Overlay Badge */}
                <div className="lg:col-span-5 relative min-h-[300px] lg:min-h-full">
                  <img
                    src={model.image}
                    alt={model.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                  <div className="absolute top-4 left-4 bg-emerald-600/90 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                    {model.badge}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 text-white">
                    <span className="text-3xl font-black text-emerald-400">{model.number}</span>
                    <h3 className="text-xl font-bold mt-1 text-white">{model.title}</h3>
                    <p className="text-xs text-slate-200 mt-1 line-clamp-2">{model.tagline}</p>
                  </div>
                </div>

                {/* Right Detailed Functions & Connections */}
                <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 space-y-6">
                  
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                      {model.title}
                    </h2>
                    <p className="text-sm font-semibold text-emerald-700 mt-1">
                      {model.tagline}
                    </p>
                    <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                      {model.description}
                    </p>
                  </div>

                  {/* 2 Feature Boxes */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                    
                    {/* Functions List */}
                    <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wide mb-3">
                        <Activity className="w-4 h-4 text-emerald-600" />
                        <span>Chức năng hoạt động chính</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-600">
                        {model.functions.map((fn, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{fn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Agriculture & Tourism Connection */}
                    <div className="bg-emerald-50/50 rounded-2xl p-4 border border-emerald-100">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 uppercase tracking-wide mb-3">
                        <Palmtree className="w-4 h-4 text-emerald-700" />
                        <span>Kết nối Du lịch – Nông nghiệp</span>
                      </div>
                      <ul className="space-y-2 text-xs text-slate-700">
                        {model.connections.map((cn, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <Leaf className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span>{cn}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                  </div>

                  {/* 3 Action Buttons per Model */}
                  <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                    {/* Button 1: Tìm hiểu dự án */}
                    <button
                      onClick={() => onOpenCollaboration('consulting', model.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Tìm hiểu dự án</span>
                    </button>

                    {/* Button 2: Đăng ký trải nghiệm */}
                    <button
                      onClick={() => onOpenCollaboration('training', model.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Đăng ký trải nghiệm</span>
                    </button>

                    {/* Button 3: Hợp tác phát triển */}
                    <button
                      onClick={() => onOpenCollaboration('partner', model.title)}
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-xs active:scale-95 transition-all"
                    >
                      <HeartHandshake className="w-3.5 h-3.5" />
                      <span>Hợp tác phát triển</span>
                    </button>
                  </div>

                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};
