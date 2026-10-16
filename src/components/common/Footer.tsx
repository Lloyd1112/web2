import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { 
  Send, 
  Mail, 
  MapPin, 
  ShieldCheck, 
  CheckCircle2
} from 'lucide-react';
import { getPathForTab } from '../../routes';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const { language } = useLanguage();
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#1b3834] text-slate-300 relative overflow-hidden pt-12 sm:pt-14 pb-8 sm:pb-10 border-t border-emerald-800/40 font-sans">
      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid matching Hình 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10">
          
          {/* CỘT 1: THƯƠNG HIỆU & GIỚI THIỆU (4 CỘT) */}
          <div className="lg:col-span-4 space-y-4">
            <a 
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="flex items-center gap-3.5 cursor-pointer group inline-flex select-none"
            >
              <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-md flex items-center justify-center shrink-0 border border-white/20 group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="/logo.png" 
                  alt="Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ" 
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[15px] font-black tracking-tight text-white uppercase leading-none">
                  LÀNG SINH VIÊN
                </span>
                <span className="text-[11px] font-extrabold tracking-wider text-[#f97316] uppercase leading-tight mt-1">
                  ĐỔI MỚI SÁNG TẠO BÌNH MỸ
                </span>
              </div>
            </a>

            <p className="text-xs sm:text-[13px] text-slate-300/90 leading-relaxed max-w-sm font-normal">
              Hệ sinh thái campus mở liên kết đào tạo, nghiên cứu ứng dụng, chuyển giao công nghệ và hợp tác quốc tế vì sức khỏe cộng đồng và nông nghiệp sinh thái bền vững.
            </p>

            {/* Badges / Accreditation */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 border border-white/15 text-[11px] sm:text-xs font-medium text-white/90 shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-orange-400 shrink-0" />
                <span>Standardized Living Lab Model</span>
              </div>
              
              <div className="inline-flex items-center px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white/70">
                <span className="text-xs font-black tracking-widest text-emerald-300/90">ANEI</span>
              </div>
            </div>
          </div>

          {/* CỘT 2: MÔ HÌNH & ĐÀO TẠO (3 CỘT) */}
          <div className="lg:col-span-2 xl:col-span-3">
            <h4 className="text-sm font-black text-white tracking-wider uppercase mb-4">
              MÔ HÌNH & ĐÀO TẠO
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-slate-300">
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => { e.preventDefault(); handleNav('health-models'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Y tế cộng đồng & Living Lab
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => { e.preventDefault(); handleNav('health-models'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Chăm sóc người cao tuổi
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('agriculture')}
                  onClick={(e) => { e.preventDefault(); handleNav('agriculture'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Health & Wellness Farm
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('training')}
                  onClick={(e) => { e.preventDefault(); handleNav('training'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Đào tạo điều dưỡng & KTV
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('consulting')}
                  onClick={(e) => { e.preventDefault(); handleNav('consulting'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Quản trị y tế & Chăm sóc số
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 3: TƯ VẤN & QUỐC TẾ (2 CỘT) */}
          <div className="lg:col-span-3 xl:col-span-2">
            <h4 className="text-sm font-black text-white tracking-wider uppercase mb-4">
              TƯ VẤN & QUỐC TẾ
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px] text-slate-300">
              <li>
                <a 
                  href={getPathForTab('real-problems')}
                  onClick={(e) => { e.preventDefault(); handleNav('real-problems'); }} 
                  className="text-amber-400 font-bold hover:text-amber-300 transition-colors inline-flex items-center gap-1.5 py-0.5 group"
                >
                  <span className="text-amber-400 text-xs">✦</span>
                  <span className="group-hover:underline">Bài toán thực tế Bình Mỹ</span>
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('about')}
                  onClick={(e) => { e.preventDefault(); handleNav('about'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Thông tin về chúng tôi
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('health-models')}
                  onClick={(e) => { e.preventDefault(); handleNav('health-models'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  3 Dự án y tế trụ cột
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('projects')}
                  onClick={(e) => { e.preventDefault(); handleNav('projects'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  12 Mô hình kinh tế
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('doctors')}
                  onClick={(e) => { e.preventDefault(); handleNav('doctors'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Bác sĩ xuyên biên giới
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('international')}
                  onClick={(e) => { e.preventDefault(); handleNav('international'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Hợp tác quốc tế
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('events')}
                  onClick={(e) => { e.preventDefault(); handleNav('events'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Sự kiện & Tin tức
                </a>
              </li>
              <li>
                <a 
                  href={getPathForTab('contact')}
                  onClick={(e) => { e.preventDefault(); handleNav('contact'); }} 
                  className="hover:text-amber-400 transition-colors block py-0.5"
                >
                  Liên hệ & Tiếp nhận hợp tác
                </a>
              </li>
            </ul>
          </div>

          {/* CỘT 4: BẢN TIN ĐỔI MỚI SÁNG TẠO (3 CỘT) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-sm font-black text-white tracking-wider uppercase">
              BẢN TIN ĐỔI MỚI SÁNG TẠO
            </h4>
            
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed font-normal">
              Đăng ký để nhận các báo cáo nghiên cứu, lời mời hội thảo y khoa quốc tế và cơ hội hợp tác mới nhất.
            </p>

            {/* Newsletter Input Box matching Hình 2 */}
            <form onSubmit={handleSubscribe} className="relative flex items-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Địa chỉ email của bạn..."
                required
                className="w-full pl-4 pr-12 py-2.5 rounded-full bg-[#244540] border border-emerald-700/40 text-white placeholder-slate-400 text-xs sm:text-[13px] focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all shadow-inner"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 rounded-full bg-[#f97316] hover:bg-[#ea580c] text-white flex items-center justify-center transition-transform active:scale-95 shadow-md cursor-pointer"
                title="Gửi đăng ký nhận bản tin"
              >
                <Send className="w-3.5 h-3.5 -translate-x-0.5 translate-y-0.5 text-white" />
              </button>
            </form>

            {subscribed && (
              <p className="text-xs text-emerald-400 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Cảm ơn bạn đã đăng ký nhận bản tin!
              </p>
            )}

            {/* Contact details with icons */}
            <div className="space-y-2 pt-1 text-xs sm:text-[13px] text-slate-300">
              <div className="flex items-start gap-2.5 leading-snug">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <a 
                  href="mailto:contact@langsinhvienbinhmy.edu.vn" 
                  className="hover:text-white transition-colors"
                >
                  contact@langsinhvienbinhmy.edu.vn
                </a>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 border-t border-emerald-800/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Phát triển bền vững cùng cộng đồng.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hover:text-white cursor-pointer transition-colors">Điều khoản sử dụng</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer transition-colors">Bảo mật thông tin</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
