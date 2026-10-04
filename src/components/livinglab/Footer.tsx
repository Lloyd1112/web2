import React from 'react';
import { 
  Sprout, 
  MapPin, 
  Phone, 
  Mail, 
  ArrowRight,
  ShieldCheck,
  HeartHandshake
} from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleNavClick = (tab: string) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Tagline */}
          <div className="lg:col-span-5 space-y-4">
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-[#00875a] to-emerald-400 flex items-center justify-center text-white shadow-sm">
                <Sprout className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-sm font-black tracking-tight text-white uppercase leading-none">
                  LÀNG SV
                </span>
                <span className="text-[11px] font-extrabold tracking-tight text-emerald-400 uppercase leading-tight mt-1">
                  ĐỔI MỚI SÁNG TẠO BÌNH MỸ
                </span>
              </div>
            </div>

            <p className="text-base font-bold text-emerald-400 italic">
              "Kết nối – Đồng hành – Kiến tạo giá trị"
            </p>

            <p className="text-xs sm:text-[13px] text-slate-400 leading-relaxed max-w-md">
              Nền tảng hỗ trợ mô hình Living Lab tại Bình Mỹ. Kết nối bài toán thực tế của địa phương 
              với nguồn lực sinh viên, chuyên gia và doanh nghiệp để đồng sáng tạo, thử nghiệm và nhân rộng giải pháp bền vững.
            </p>

            <div className="flex items-center gap-4 text-xs font-semibold text-slate-400 pt-1">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Thẩm định chính danh</span>
              </span>
              <span className="flex items-center gap-1.5 text-sky-400">
                <HeartHandshake className="w-4 h-4" />
                <span>Đồng hành phi lợi nhuận</span>
              </span>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Khám phá nền tảng
            </h4>
            <ul className="space-y-2 text-xs sm:text-[13px]">
              <li>
                <button
                  onClick={() => handleNavClick('home')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Trang chủ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('problems')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Bài toán Bình Mỹ (Đã xác minh)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('projects')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Dự án tại Bình Mỹ</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('community')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Cộng đồng Làng SV</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('about')}
                  className="hover:text-emerald-400 transition-colors flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-slate-500" />
                  <span>Về Làng SV &amp; Mô hình Living Lab</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNavClick('submit-problem')}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1.5"
                >
                  <ArrowRight className="w-3 h-3 text-emerald-400" />
                  <span>Gửi đề xuất vấn đề địa phương</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Headquarters */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-extrabold text-white uppercase tracking-wider">
              Ban quản lý Làng SV Bình Mỹ
            </h4>
            
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Trụ sở Living Lab: Ấp Bình Mỹ, Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Hotline kết nối: (84) 28 1234 5678</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>Email tiếp nhận: livinglab@binhmyhub.edu.vn</span>
              </div>
            </div>

            {/* Value Chain Pill Summary */}
            <div className="mt-4 p-3 bg-slate-800/80 rounded-xl border border-slate-700/80 text-[11px] text-slate-300">
              <span className="font-bold text-emerald-400 block mb-1">Chuỗi giá trị Living Lab:</span>
              <div className="flex flex-wrap gap-1 text-[10px] font-semibold text-slate-400">
                <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">Bài toán</span>
                <span>→</span>
                <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">Nguồn lực</span>
                <span>→</span>
                <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">Dự án</span>
                <span>→</span>
                <span className="bg-slate-700/60 px-1.5 py-0.5 rounded">Thử nghiệm</span>
                <span>→</span>
                <span className="bg-emerald-900/60 text-emerald-300 px-1.5 py-0.5 rounded">Nhân rộng</span>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <div>
            © 2026 Làng SV Đổi mới sáng tạo Bình Mỹ. Nền tảng Living Lab kết nối giải pháp vì cộng đồng.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400">Quy chế thẩm định bài toán</span>
            <span>•</span>
            <span className="text-slate-400">Chính sách đồng hành</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
