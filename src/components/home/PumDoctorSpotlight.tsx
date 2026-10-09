import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { mockDoctorProfiles } from '../../data/mockData';
import { BadgeCheck, Globe2, Stethoscope, ArrowRight, Video } from 'lucide-react';

interface PumDoctorSpotlightProps {
  onNavigate: (tab: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const PumDoctorSpotlight: React.FC<PumDoctorSpotlightProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();
  const spotlightDoctors = mockDoctorProfiles.slice(0, 4);

  return (
    <section className="py-16 lg:py-24 bg-pum-green text-white relative overflow-hidden">
      {/* Decorative background glow */}
      <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 rounded-full bg-white/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-32 -mb-32 w-96 h-96 rounded-full bg-pum-orange/15 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-widest bg-white/10 text-pum-orange border border-white/15 mb-3">
              <Globe2 className="w-3.5 h-3.5" />
              {language === 'vi' ? 'Mạng lưới chuyên gia toàn cầu' : 'Global Medical Network'}
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {language === 'vi' ? 'Bác sĩ Xuyên Biên Giới' : 'Doctors Across Borders'}
            </h2>
            <p className="text-white/80 text-sm sm:text-base mt-2 max-w-xl">
              {language === 'vi'
                ? 'Đội ngũ bác sĩ, chuyên gia y tế quốc tế và trong nước trực tiếp tham gia hội chẩn, đào tạo lâm sàng và phụng sự sức khỏe cộng đồng.'
                : 'International physicians and senior specialists leading clinical teaching, tele-consultation and community outreach.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('doctors')}
              className="inline-flex items-center gap-2 font-bold px-5 py-3 rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/20 transition-all text-xs uppercase tracking-wider"
            >
              <span>{language === 'vi' ? 'Xem danh sách chuyên gia' : 'All Specialists'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => onOpenCollaboration('doctor', language === 'vi' ? 'Mời chuyên gia / Hội chẩn quốc tế' : 'Consult Specialist')}
              className="inline-flex items-center gap-2 font-bold px-5 py-3 rounded-full text-white bg-pum-orange hover:bg-pum-orangeHover transition-all text-xs uppercase tracking-wider shadow-md"
            >
              <Video className="w-4 h-4" />
              <span>{language === 'vi' ? 'Đăng ký Hội chẩn' : 'Book Telehealth'}</span>
            </button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {spotlightDoctors.map((doc) => (
            <div
              key={doc.id}
              className="bg-white/95 text-slate-800 rounded-3xl p-6 border border-white/20 shadow-lg hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Doctor Avatar + Flags */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-200 border-2 border-white shadow-sm flex-shrink-0">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 right-0 text-base leading-none">
                      {doc.flag}
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <h3 className="text-base font-bold text-slate-900 leading-tight">
                        {doc.name}
                      </h3>
                      {doc.verified && (
                        <BadgeCheck className="w-4 h-4 text-pum-green flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-pum-orange mt-0.5">
                      {doc.title}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      {doc.country}
                    </p>
                  </div>
                </div>

                {/* Specialty */}
                <div className="bg-pum-lightGreen/40 rounded-xl p-3 mb-4">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-pum-green mb-1">
                    <Stethoscope className="w-3.5 h-3.5" />
                    <span>{doc.specialty}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {doc.organization}
                  </p>
                </div>

                {/* Research Focus */}
                <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                  <strong className="text-slate-700">{language === 'vi' ? 'Nghiên cứu: ' : 'Focus: '}</strong>
                  {doc.researchFocus}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] font-semibold text-slate-500">
                  {doc.languages.join(' • ')}
                </span>
                <button
                  onClick={() => onOpenCollaboration('doctor', `${doc.name} - ${doc.specialty}`)}
                  className="text-xs font-bold text-pum-green hover:text-pum-orange transition-colors"
                >
                  {language === 'vi' ? 'Kết nối' : 'Connect'} &rarr;
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
