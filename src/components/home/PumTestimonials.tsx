import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockPumTestimonials } from '../../data/mockData';
import { Quote, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const PumTestimonials: React.FC = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  const prev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? mockPumTestimonials.length - 1 : prevIndex - 1
    );
  };

  const next = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === mockPumTestimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const activeTestimonial = mockPumTestimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-extrabold text-pum-green mb-2">
            <Sparkles className="w-3.5 h-3.5 text-pum-orange" />
            {language === 'vi' ? 'Tiếng nói từ người đồng hành' : 'Voices of Impact'}
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Góc nhìn & Trải nghiệm thực tế' : 'Perspectives & Reflections'}
          </h2>
        </div>

        {/* Large Testimonial Card */}
        <div className="max-w-4xl mx-auto bg-[#F8FAF9] rounded-3xl p-8 sm:p-12 lg:p-14 border border-slate-200/80 shadow-md relative">
          
          <div className="absolute top-8 right-8 text-pum-lightGreen/80 hidden sm:block">
            <Quote className="w-20 h-20" />
          </div>

          <div className="relative z-10">
            {/* Tag Badge */}
            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-pum-lightGreen text-pum-green mb-6">
              {activeTestimonial.tag}
            </span>

            {/* Quote Text */}
            <blockquote className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-800 leading-relaxed mb-8">
              "{language === 'vi' ? activeTestimonial.quote : activeTestimonial.quoteEn}"
            </blockquote>

            {/* Author Profile & Navigation Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-slate-200/80">
              
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex-shrink-0">
                  <img
                    src={activeTestimonial.image}
                    alt={activeTestimonial.author}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-900 leading-snug">
                    {activeTestimonial.author}
                  </h4>
                  <p className="text-xs font-semibold text-pum-green">
                    {language === 'vi' ? activeTestimonial.role : activeTestimonial.roleEn}
                  </p>
                  <p className="text-xs text-slate-500">
                    {activeTestimonial.organization}
                  </p>
                </div>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={prev}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-pum-green hover:text-white hover:border-pum-green flex items-center justify-center transition-all shadow-2xs active:scale-95"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="text-xs font-bold text-slate-500 px-2">
                  {currentIndex + 1} / {mockPumTestimonials.length}
                </span>
                <button
                  onClick={next}
                  className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 hover:bg-pum-green hover:text-white hover:border-pum-green flex items-center justify-center transition-all shadow-2xs active:scale-95"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
