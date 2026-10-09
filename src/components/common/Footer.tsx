import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Globe2, 
  Send, 
  Mail, 
  Phone, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2, 
  HeartHandshake 
} from 'lucide-react';
import hutechLogo from '../../assets/hutech-logo.png';
import { getPathForTab } from '../../routes';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language, t } = useLanguage();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleNav = (tabId: string) => {
    setActiveTab(tabId);
  };

  return (
    <footer className="bg-pum-greenDark text-slate-300 border-t border-pum-green/30 pt-16 pb-12">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid: Brand & Mission + 3 Nav Columns + Newsletter Box */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-14 border-b border-white/10">
          
          {/* Column 1: Brand story & Accreditation (4 cols) */}
          <div className="lg:col-span-4">
            <a 
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="flex items-center gap-3 cursor-pointer group mb-5 inline-flex"
            >
              <div className="h-12 w-auto bg-white p-1 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                <img 
                  src={hutechLogo} 
                  alt="HUTECH University Logo" 
                  className="h-10 w-auto object-contain"
                />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tight text-white uppercase leading-none">
                  {language === 'vi' ? 'LÀNG SINH VIÊN' : 'STUDENT VILLAGE'}
                </span>
                <span className="text-xs font-bold tracking-wider text-pum-orange uppercase leading-tight mt-1">
                  {language === 'vi' ? 'ĐỔI MỚI SÁNG TẠO BÌNH MỸ' : 'BINH MY INNOVATION CAMPUS'}
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 max-w-sm">
              {language === 'vi'
                ? 'Hệ sinh thái campus mở liên kết đào tạo, nghiên cứu ứng dụng, chuyển giao công nghệ và hợp tác quốc tế vì sức khỏe cộng đồng và nông nghiệp sinh thái bền vững.'
                : 'An open campus ecosystem linking education, applied research, technology transfer and international cooperation for community health and sustainable agriculture.'}
            </p>

            {/* Accreditation Badge & PUM Standard */}
            <div className="flex items-center gap-4 pt-2">
              <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-lg border border-white/15">
                <ShieldCheck className="w-4 h-4 text-pum-orange" />
                <span className="text-[11px] font-bold text-white tracking-wide">
                  Standardized Living Lab Model
                </span>
              </div>
              <img 
                src="/assets/pum/anbi-logo.png" 
                alt="ANBI Certification Standard" 
                className="h-7 w-auto object-contain brightness-125 opacity-80"
              />
            </div>
          </div>

          {/* Column 2: 3 Mô hình Y tế & Đào tạo (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {language === 'vi' ? 'Mô hình & Đào tạo' : 'Models & Training'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('health-models');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Y tế cộng đồng & Living Lab' : 'Community Health & Lab'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('health-models');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Chăm sóc người cao tuổi' : 'Elderly Care Center'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('health-models');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Health & Wellness Farm' : 'Health & Wellness Farm'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('training')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('training');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Đào tạo điều dưỡng & KTV' : 'Workforce & Nursing'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('training')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('training');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Quản trị y tế & Chăm sóc số' : 'Healthcare Management'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Tư vấn & Quốc tế (2 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {language === 'vi' ? 'Tư vấn & Quốc tế' : 'Consulting & Global'}
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              <li>
                <a 
                  href={getPathForTab('real-problems')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('real-problems');
                  }} 
                  className="hover:text-pum-orange transition-colors block font-bold text-amber-400"
                >
                  {language === 'vi' ? '✦ Bài toán thực tế Bình Mỹ' : '✦ Real-World Problems'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('about')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('about');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Thông tin về chúng tôi' : 'About Us'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('consulting')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('consulting');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? '3 Dự án y tế trụ cột' : '3 Pillar Health Projects'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('consulting')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('consulting');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? '12 Mô hình kinh tế' : '12 Economic Models'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('doctors')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('doctors');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Bác sĩ xuyên biên giới' : 'Doctors Across Borders'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('international')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('international');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Hợp tác quốc tế' : 'International Cooperation'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('events')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('events');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Sự kiện & Tin tức' : 'Events & News'}
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('contact')}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNav('contact');
                  }} 
                  className="hover:text-pum-orange transition-colors block"
                >
                  {language === 'vi' ? 'Liên hệ & Tiếp nhận hợp tác' : 'Contact & Inquiries'}
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: Newsletter Box & Contact (4 cols) */}
          <div className="lg:col-span-4">
            <h4 className="text-xs font-black uppercase tracking-widest text-white mb-4">
              {language === 'vi' ? 'Bản tin Đổi Mới Sáng Tạo' : 'Innovation Newsletter'}
            </h4>
            <p className="text-xs text-slate-300 mb-4 leading-relaxed">
              {language === 'vi'
                ? 'Đăng ký để nhận các báo cáo nghiên cứu, lời mời hội thảo y khoa quốc tế và cơ hội hợp tác mới nhất.'
                : 'Subscribe to receive the latest clinical research briefs, global symposium invitations, and collaboration calls.'}
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={language === 'vi' ? 'Địa chỉ email của bạn...' : 'Your email address...'}
                  className="w-full bg-white/10 border border-white/20 rounded-full px-4 py-3 text-xs text-white placeholder-slate-400 focus:outline-hidden focus:border-pum-orange transition-colors pr-12"
                />
                <button
                  type="submit"
                  className="absolute right-1.5 top-1.5 w-8 h-8 rounded-full bg-pum-orange hover:bg-pum-orangeHover text-white flex items-center justify-center transition-transform active:scale-95 shadow-sm"
                  aria-label="Subscribe"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
              {subscribed && (
                <p className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {language === 'vi' ? 'Cảm ơn bạn đã đăng ký nhận tin!' : 'Thank you for subscribing!'}
                </p>
              )}
            </form>

            <div className="mt-6 pt-5 border-t border-white/10 space-y-2 text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-pum-orange flex-shrink-0" />
                <span>Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-pum-orange flex-shrink-0" />
                <span>contact@langsinhvienbinhmy.edu.vn</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Bar: Copyright & Ethics */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>
            {language === 'vi'
              ? '© 2026 Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Chuẩn mực hợp tác quốc tế.'
              : '© 2026 Binh My Innovative Student Village. International standards.'}
          </p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <span className="hover:text-white cursor-pointer">Code of Conduct</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Privacy Statement</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Ethics & Compliance</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Living Lab Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
