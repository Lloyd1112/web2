import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { 
  Building2, 
  Target, 
  Sparkles, 
  ShieldCheck, 
  Users, 
  Globe2, 
  HeartHandshake, 
  GraduationCap, 
  CheckCircle2, 
  ArrowRight,
  MapPin,
  Award
} from 'lucide-react';

interface AboutPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate: (tab: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenCollaboration, onNavigate }) => {
  const { language } = useLanguage();

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Hero Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <Building2 className="w-3.5 h-3.5 text-pum-orange" />
            <span>{language === 'vi' ? 'Giới Thiệu Tổng Quan' : 'About Us'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Thông Tin Về Chúng Tôi' : 'About Binh My Student Village'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ là mô hình campus mở tiên phong, kết nối nhà trường, bệnh viện, bác sĩ quốc tế, nhà khoa học, doanh nghiệp và cộng đồng nhằm phát triển hệ sinh thái y tế – du lịch – nông nghiệp bền vững.'
              : 'Binh My Innovative Student Village is a pioneering open campus model connecting academia, hospitals, global doctors, scientists, enterprises, and local communities to develop a sustainable health – tourism – agriculture ecosystem.'}
          </p>
        </div>

        {/* 2-Column Story: Mission & Vision */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-6 relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
            <img
              src="/assets/pum/AboutUs_headerphoto-1-e1710851068894-1200x788.jpg"
              alt="Về chúng tôi - Làng Sinh Viên Bình Mỹ"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-transparent to-transparent flex items-end p-6">
              <span className="text-white text-sm font-bold">
                {language === 'vi' ? 'Khuôn viên Campus Mở Bình Mỹ, Củ Chi, TP.HCM' : 'Open Campus Campus in Binh My, Cu Chi, HCMC'}
              </span>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6">
            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pum-lightGreen/50 text-pum-green flex items-center justify-center mb-3">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {language === 'vi' ? 'Tầm Nhìn Chiến Lược' : 'Our Strategic Vision'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Trở thành trung tâm kiểu mẫu tại Đông Nam Á về đổi mới sáng tạo gắn liền với thực nghiệm Living Lab trong y tế cộng đồng, chăm sóc người cao tuổi và nông nghiệp sinh thái tuần hoàn.'
                  : 'To become a flagship innovation hub in Southeast Asia integrating real-world Living Lab trials in community healthcare, geriatric eldercare, and circular ecological agriculture.'}
              </p>
            </div>

            <div className="bg-white p-7 rounded-3xl border border-slate-200/80 shadow-2xs">
              <div className="w-10 h-10 rounded-xl bg-pum-orange/15 text-pum-orange flex items-center justify-center mb-3">
                <HeartHandshake className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                {language === 'vi' ? 'Sứ Mệnh Phụng Sự' : 'Our Core Mission'}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {language === 'vi'
                  ? 'Tạo dựng môi trường đào tạo thực chiến trên bài toán thật cho sinh viên; nâng cao chất lượng chăm sóc sức khỏe cho người dân cơ sở; và thúc đẩy chuỗi giá trị nông nghiệp sạch bản địa.'
                  : 'Creating a hands-on training ground on real challenges for students; enhancing healthcare quality for grassroots communities; and fostering indigenous green agro-value chains.'}
              </p>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Alliance */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-2xs">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-pum-green mb-1 block">
              {language === 'vi' ? 'Mô hình liên kết 4 nhà' : 'Quadruple Helix Model'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? 'Sức Mạnh Từ Sự Hợp Tác Đa Bên' : 'Power of Multi-Stakeholder Alliance'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                titleVi: 'Nhà Trường & Viện',
                titleEn: 'Academia & Institutes',
                descVi: 'HUTECH và các trường đại học đối tác cung cấp nguồn lực đào tạo, nghiên cứu và sinh viên tài năng.',
                descEn: 'HUTECH and partner universities providing academic excellence, research and talented youth.',
                icon: GraduationCap,
                color: 'text-pum-green',
                bg: 'bg-pum-lightGreen/40'
              },
              {
                titleVi: 'Bác Sĩ & Bệnh Viện',
                titleEn: 'Hospitals & Doctors',
                descVi: 'Mạng lưới chuyên gia lâm sàng quốc tế và tuyến trên tham gia hội chẩn, đào tạo và giám sát chuyên môn.',
                descEn: 'International and tertiary clinical specialists leading tele-rounds and medical supervision.',
                icon: Users,
                color: 'text-pum-orange',
                bg: 'bg-orange-50'
              },
              {
                titleVi: 'Doanh Nghiệp & HTX',
                titleEn: 'Enterprises & Co-ops',
                descVi: 'Đầu tư công nghệ, bao tiêu sản phẩm OCOP nông nghiệp sạch và thương mại hóa kết quả nghiên cứu.',
                descEn: 'Investing technology, off-taking clean OCOP products and commercializing R&D outcomes.',
                icon: Building2,
                color: 'text-sky-600',
                bg: 'bg-sky-50'
              },
              {
                titleVi: 'Chính Quyền & Cộng Đồng',
                titleEn: 'Authorities & Community',
                descVi: 'Ủng hộ chính sách, tạo quỹ đất, cùng tham gia các chương trình sàng lọc sức khỏe và thụ hưởng trực tiếp.',
                descEn: 'Policy support, community participation in health screenings and direct beneficiaries.',
                icon: ShieldCheck,
                color: 'text-rose-600',
                bg: 'bg-rose-50'
              },
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 flex flex-col justify-between">
                  <div>
                    <div className={`w-12 h-12 rounded-xl ${item.bg} ${item.color} flex items-center justify-center mb-4`}>
                      <IconComp className="w-6 h-6" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-2">
                      {language === 'vi' ? item.titleVi : item.titleEn}
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {language === 'vi' ? item.descVi : item.descEn}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Action Callout */}
        <div className="bg-gradient-to-r from-pum-greenDark via-pum-green to-pum-greenAlt text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl">
          <div>
            <span className="text-xs font-black uppercase tracking-widest text-pum-orange mb-2 block">
              {language === 'vi' ? 'Đồng hành kiến tạo' : 'Join Our Vision'}
            </span>
            <h3 className="text-2xl sm:text-3xl font-black text-white">
              {language === 'vi' ? 'Bạn muốn tìm hiểu sâu hơn về các dự án?' : 'Want to explore our active projects?'}
            </h3>
            <p className="text-sm text-white/80 mt-2 max-w-xl">
              {language === 'vi'
                ? 'Khám phá ngay 3 mô hình y tế trụ cột và 12 mô hình kinh tế phụ trợ đang được vận hành thực tế tại Bình Mỹ.'
                : 'Explore our 3 pillar healthcare models and 12 auxiliary economic models operating in Binh My.'}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => onNavigate('health-models')}
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-pum-green bg-white hover:bg-slate-100 shadow-md active:scale-95 transition-all"
            >
              {language === 'vi' ? 'Xem các dự án' : 'View Projects'}
            </button>
            <button
              onClick={() => onOpenCollaboration('general', 'Liên hệ hợp tác cùng Làng Sinh Viên')}
              className="px-6 py-3.5 rounded-full font-bold text-xs uppercase tracking-wider text-white bg-pum-orange hover:bg-pum-orangeHover shadow-md active:scale-95 transition-all"
            >
              {language === 'vi' ? 'Liên hệ chúng tôi' : 'Contact Us'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
