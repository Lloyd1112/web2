import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Handshake, UserPlus, Send, ArrowRight } from 'lucide-react';

interface PumCtaBannerProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate: (tab: string) => void;
}

export const PumCtaBanner: React.FC<PumCtaBannerProps> = ({ onOpenCollaboration, onNavigate }) => {
  const { language } = useLanguage();

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-r from-pum-greenDark via-pum-green to-pum-greenAlt text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-pum-orange/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest bg-pum-orange text-white shadow-sm mb-6">
          {language === 'vi' ? 'Khởi đầu đồng hành cùng Bình Mỹ' : 'Start Your Journey With Us'}
        </span>

        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight max-w-4xl mx-auto mb-6">
          {language === 'vi'
            ? 'Cùng chúng tôi xây dựng hệ sinh thái đào tạo, nghiên cứu và dịch vụ y tế bền vững'
            : 'Join Us in Building a Sustainable Healthcare, Research, and Education Ecosystem'}
        </h2>

        <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
          {language === 'vi'
            ? 'Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ luôn sẵn sàng chào đón các đối tác trường đại học, bệnh viện, doanh nghiệp và chuyên gia quốc tế cùng chung tay phụng sự cộng đồng.'
            : 'We welcome universities, hospitals, corporate innovators, and global medical specialists to create lasting social and economic impact.'}
        </p>

        {/* 3 Call to Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          
          <button
            onClick={() => onOpenCollaboration('partner', language === 'vi' ? 'Trở thành đối tác chiến lược' : 'Strategic Partnership')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-full text-pum-green bg-white hover:bg-slate-100 transition-all duration-200 active:scale-95 shadow-lg text-sm"
          >
            <Handshake className="w-4 h-4 text-pum-orange" />
            <span>{language === 'vi' ? 'Trở thành đối tác' : 'Become a Partner'}</span>
          </button>

          <button
            onClick={() => onOpenCollaboration('doctor', language === 'vi' ? 'Đăng ký chuyên gia / Bác sĩ' : 'Register as Expert')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-full text-white bg-pum-orange hover:bg-pum-orangeHover transition-all duration-200 active:scale-95 shadow-lg text-sm"
          >
            <UserPlus className="w-4 h-4" />
            <span>{language === 'vi' ? 'Đăng ký chuyên gia' : 'Register as Expert'}</span>
          </button>

          <button
            onClick={() => onOpenCollaboration('consulting', language === 'vi' ? 'Gửi yêu cầu tư vấn dự án' : 'Project Consultation Request')}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-7 py-4 rounded-full text-white bg-white/10 hover:bg-white/20 border border-white/25 transition-all duration-200 active:scale-95 text-sm"
          >
            <Send className="w-4 h-4" />
            <span>{language === 'vi' ? 'Gửi yêu cầu tư vấn' : 'Submit Inquiry'}</span>
          </button>

        </div>

      </div>
    </section>
  );
};
