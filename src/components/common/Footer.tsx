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
  HeartHandshake,
  Sprout
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
    <footer className="bg-[#063124] text-slate-300 relative overflow-hidden pt-12 pb-10 border-t border-emerald-900/60">
      
      {/* Organic curved subtle top highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-600 via-teal-400 to-emerald-600 opacity-60" />

      <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-10 pb-10 border-b border-emerald-800/40">
          
          {/* Column 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <a 
              href={getPathForTab('home')}
              onClick={(e) => {
                e.preventDefault();
                handleNav('home');
              }}
              className="flex items-center gap-3 cursor-pointer group inline-flex"
            >
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white border border-white/20">
                <Sprout className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-black tracking-tight text-white uppercase leading-none">
                  LÀNG SV
                </span>
                <span className="text-[10px] font-bold tracking-wider text-emerald-400 uppercase leading-tight mt-1">
                  ĐỔI MỚI SÁNG TẠO BÌNH MỸ
                </span>
              </div>
            </a>

            <p className="text-xs text-slate-300/90 leading-relaxed max-w-sm">
              Kết nối tri thức - Kiến tạo giá trị - Phát triển Bình Mỹ bền vững.
            </p>
          </div>

          {/* Column 2: Liên kết nhanh (2.5 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-3.5">
              Liên kết nhanh
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-300">
              <a 
                href={getPathForTab('home')}
                onClick={(e) => { e.preventDefault(); handleNav('home'); }} 
                className="hover:text-emerald-400 transition-colors block py-0.5"
              >
                Trang chủ
              </a>
              <a 
                href={getPathForTab('events')}
                onClick={(e) => { e.preventDefault(); handleNav('events'); }} 
                className="hover:text-emerald-400 transition-colors block py-0.5"
              >
                Tin tức
              </a>
              <a 
                href={getPathForTab('real-problems')}
                onClick={(e) => { e.preventDefault(); handleNav('real-problems'); }} 
                className="hover:text-emerald-400 transition-colors block py-0.5"
              >
                Bài toán thực tế
              </a>
              <a 
                href={getPathForTab('about')}
                onClick={(e) => { e.preventDefault(); handleNav('about'); }} 
                className="hover:text-emerald-400 transition-colors block py-0.5"
              >
                Giới thiệu
              </a>
              <a 
                href={getPathForTab('health-models')}
                onClick={(e) => { e.preventDefault(); handleNav('health-models'); }} 
                className="hover:text-emerald-400 transition-colors block py-0.5"
              >
                Dự án
              </a>
            </div>
          </div>

          {/* Column 3: Hỗ trợ (2.5 cols) */}
          <div className="lg:col-span-2">
            <h4 className="text-sm font-bold text-white mb-3.5">
              Hỗ trợ
            </h4>
            <ul className="space-y-2 text-xs text-slate-300">
              <li>
                <span className="hover:text-emerald-400 cursor-pointer transition-colors block">
                  Hướng dẫn sử dụng
                </span>
              </li>
              <li>
                <span className="hover:text-emerald-400 cursor-pointer transition-colors block">
                  Câu hỏi thường gặp
                </span>
              </li>
              <li>
                <a 
                  href={getPathForTab('contact')}
                  onClick={(e) => { e.preventDefault(); handleNav('contact'); }}
                  className="hover:text-emerald-400 transition-colors block"
                >
                  Liên hệ
                </a>
              </li>
              <li>
                <span className="hover:text-emerald-400 cursor-pointer transition-colors block">
                  Chính sách bảo mật
                </span>
              </li>
            </ul>
          </div>

          {/* Column 4: Kết nối với chúng tôi (3 cols) */}
          <div className="lg:col-span-3">
            <h4 className="text-sm font-bold text-white mb-3.5">
              Kết nối với chúng tôi
            </h4>
            
            {/* Social Icons matching mockup */}
            <div className="flex items-center gap-2.5 pt-1">
              {/* Facebook */}
              <a 
                href="#facebook" 
                className="w-9 h-9 rounded-full bg-[#1877f2] hover:opacity-90 flex items-center justify-center text-white transition-transform active:scale-95 shadow-sm"
                title="Facebook"
              >
                <span className="font-black text-sm">f</span>
              </a>

              {/* YouTube */}
              <a 
                href="#youtube" 
                className="w-9 h-9 rounded-full bg-[#ff0000] hover:opacity-90 flex items-center justify-center text-white transition-transform active:scale-95 shadow-sm"
                title="YouTube"
              >
                <span className="text-xs">▶</span>
              </a>

              {/* Zalo / Chat */}
              <a 
                href="#zalo" 
                className="w-9 h-9 rounded-full bg-[#0068ff] hover:opacity-90 flex items-center justify-center text-white text-[11px] font-black transition-transform active:scale-95 shadow-sm"
                title="Zalo"
              >
                <span>Zalo</span>
              </a>

              {/* TikTok */}
              <a 
                href="#tiktok" 
                className="w-9 h-9 rounded-full bg-slate-900 border border-slate-700 hover:opacity-90 flex items-center justify-center text-white text-xs font-bold transition-transform active:scale-95 shadow-sm"
                title="TikTok"
              >
                <span>d</span>
              </a>
            </div>

            <p className="text-[11px] text-slate-400 mt-4 leading-normal">
              Email: contact@langsinhvienbinhmy.edu.vn<br />
              Ấp 1, Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh
            </p>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
          <p>
            © 2026 Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Phát triển bền vững cùng cộng đồng.
          </p>
          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="hover:text-white cursor-pointer">Điều khoản sử dụng</span>
            <span>•</span>
            <span className="hover:text-white cursor-pointer">Bảo mật thông tin</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
