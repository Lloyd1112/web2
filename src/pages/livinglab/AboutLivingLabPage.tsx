import React from 'react';
import { 
  Sprout, 
  GraduationCap, 
  Users, 
  Building2, 
  FlaskConical, 
  Landmark, 
  CheckCircle2, 
  ArrowDown, 
  ArrowRight,
  ShieldCheck,
  Target,
  Sparkles,
  Tractor
} from 'lucide-react';
import { LivingLabDiagram } from '../../components/livinglab/LivingLabDiagram';

interface AboutLivingLabPageProps {
  onNavigateToProblems: () => void;
  onNavigateToSubmit: () => void;
}

export const AboutLivingLabPage: React.FC<AboutLivingLabPageProps> = ({
  onNavigateToProblems,
  onNavigateToSubmit
}) => {
  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* ===================== HERO HEADER ===================== */}
      <section className="bg-white border-b border-slate-200/90 pt-10 pb-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-4 text-center max-w-3xl">
          
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 text-[#00875a] text-xs font-bold border border-emerald-200">
            <Sprout className="w-4 h-4" />
            <span>MÔ HÌNH LIVING LAB ĐẦU TIÊN TẠI BÌNH MỸ</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-slate-900 tracking-tight leading-tight">
            VỀ LÀNG SV ĐỔI MỚI SÁNG TẠO BÌNH MỸ
          </h1>

          <p className="text-base sm:text-lg font-bold text-[#00875a] italic">
            "Kết nối – Đồng hành – Kiến tạo giá trị"
          </p>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
            "Làng SV là mô hình Living Lab kết nối sinh viên, người dân, doanh nghiệp, 
            chuyên gia và chính quyền cùng giải quyết những bài toán thực tế tại Bình Mỹ."
          </p>

        </div>
      </section>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-10 space-y-12">
        
        {/* ===================== SECTION 1: SƠ ĐỒ CHUỖI VẬN HÀNH (Prompt 16) ===================== */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              Cơ chế vận hành chuẩn mực
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Sơ Đồ Chuỗi Giá Trị Living Lab
            </h2>
            <p className="text-xs text-slate-500">
              Quy trình 7 bước biến thách thức địa phương thành mô hình bền vững có khả năng nhân rộng.
            </p>
          </div>

          {/* Sơ đồ dọc / ngang nối tiếp */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative items-stretch">
            {[
              {
                step: '01',
                title: 'BÀI TOÁN',
                sub: 'Vấn đề thực tế từ người dân, nông hộ, doanh nghiệp địa phương gửi về.'
              },
              {
                step: '02',
                title: 'KẾT NỐI',
                sub: 'Ban quản lý thẩm định thực địa, xác minh tính chính danh và phân tích nguồn lực cần.'
              },
              {
                step: '03',
                title: 'ĐỒNG SÁNG TẠO',
                sub: 'Hình thành nhóm liên ngành: sinh viên, chuyên gia, giảng viên và hộ dân cùng lên giải pháp.'
              },
              {
                step: '04',
                title: 'THỬ NGHIỆM',
                sub: 'Thực nghiệm trực tiếp tại vườn, trạm y tế, điểm du lịch của Bình Mỹ.'
              },
              {
                step: '05',
                title: 'ĐÁNH GIÁ',
                sub: 'Đo lường các chỉ số hiệu quả (doanh thu, thời gian, mức độ hài lòng).'
              },
              {
                step: '06',
                title: 'TÁC ĐỘNG',
                sub: 'Tổng kết bằng chứng thực tế, ghi nhận lợi ích cụ thể cho cộng đồng.'
              },
              {
                step: '07',
                title: 'NHÂN RỘNG',
                sub: 'Chuyển giao công nghệ và mở rộng quy mô ra toàn xã và các địa phương lân cận.'
              },
            ].map((st, idx) => (
              <div 
                key={idx} 
                className="bg-[#F7FAF8] border border-slate-200/90 rounded-2xl p-4 flex flex-col justify-between space-y-2 hover:border-emerald-400 transition-colors relative"
              >
                <div>
                  <div className="flex items-center justify-between text-[11px] font-black text-[#00875a]">
                    <span>BƯỚC</span>
                    <span>{st.step}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-black text-slate-900 tracking-tight mt-1">
                    {st.title}
                  </h3>
                  <p className="text-[11px] text-slate-600 leading-snug mt-1">
                    {st.sub}
                  </p>
                </div>
                {idx < 6 && (
                  <div className="hidden lg:flex justify-end text-slate-300">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* ===================== SECTION 2: 5 ĐỐI TƯỢNG VÀ GIÁ TRỊ (Prompt 16) ===================== */}
        <section className="space-y-6">
          
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              Hệ sinh thái đa bên
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              5 Trụ Cột Thành Phần &amp; Giá Trị Cốt Lõi
            </h2>
            <p className="text-xs text-slate-500">
              Mỗi nhân tố đều đóng vai trò quyết định trong việc hình thành và duy trì sự sống còn của Living Lab.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. SINH VIÊN */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4 group hover:border-sky-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold shadow-2xs">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">SINH VIÊN</h3>
                <div className="text-xs font-bold text-[#00875a] italic">
                  "Học từ bài toán thật"
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Rời xa giảng đường lý thuyết, sinh viên bước vào thực địa nông thôn, đối mặt với bài toán thực tế của người dân, trau dồi kỹ năng thực chiến và tạo ra sản phẩm có ích.
              </p>
            </div>

            {/* 2. NGƯỜI DÂN */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4 group hover:border-emerald-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shadow-2xs">
                <Tractor className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">NGƯỜI DÂN &amp; NÔNG HỘ</h3>
                <div className="text-xs font-bold text-[#00875a] italic">
                  "Tiếp cận kiến thức và giải pháp"
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Không phải tự bơi trong khó khăn, bà con được các nhóm sinh viên và chuyên gia cầm tay chỉ việc, ứng dụng công nghệ để nâng cao năng suất, bán hàng tốt hơn và cải thiện sức khỏe.
              </p>
            </div>

            {/* 3. DOANH NGHIỆP */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4 group hover:border-amber-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shadow-2xs">
                <Building2 className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">DOANH NGHIỆP</h3>
                <div className="text-xs font-bold text-[#00875a] italic">
                  "Thử nghiệm sản phẩm và ý tưởng"
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Tiếp cận môi trường thử nghiệm thực địa chi phí thấp, tìm kiếm ý tưởng sáng tạo từ sinh viên, kết nối nguồn nguyên liệu bản địa và thực hiện trách nhiệm cộng đồng (CSR).
              </p>
            </div>

            {/* 4. CHUYÊN GIA */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4 group hover:border-purple-300 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center font-bold shadow-2xs">
                <FlaskConical className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">CHUYÊN GIA &amp; GIẢNG VIÊN</h3>
                <div className="text-xs font-bold text-[#00875a] italic">
                  "Đưa kiến thức vào thực tế"
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Chuyển hóa các công trình nghiên cứu hàn lâm thành ứng dụng hữu ích phục vụ cuộc sống, đồng thời có môi trường thực nghiệm phong phú cho hoạt động công bố khoa học.
              </p>
            </div>

            {/* 5. ĐỊA PHƯƠNG */}
            <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-7 shadow-xs space-y-4 group hover:border-rose-300 transition-all md:col-span-2 lg:col-span-2">
              <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold shadow-2xs">
                <Landmark className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-lg font-black text-slate-900">CHÍNH QUYỀN ĐỊA PHƯƠNG BÌNH MỸ</h3>
                <div className="text-xs font-bold text-[#00875a] italic">
                  "Có dữ liệu và giải pháp phục vụ phát triển"
                </div>
              </div>
              <p className="text-xs sm:text-[13px] text-slate-600 leading-relaxed">
                Nắm bắt chính xác những nút thắt của địa phương qua cơ sở dữ liệu số hóa, giải quyết bài toán phát triển kinh tế nông thôn mới, chuyển đổi số và nâng cao chất lượng an sinh xã hội một cách bền vững.
              </p>
            </div>

          </div>

        </section>

        {/* ===================== SECTION 3: LIVING LAB DIAGRAM EMBED ===================== */}
        <section className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-xs space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider">
              Mô hình kết nối tương tác
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Bình Mỹ – Trái Tim Của Living Lab
            </h2>
            <p className="text-xs text-slate-500">
              Mọi giải pháp đều lấy con người và vùng đất Bình Mỹ làm trọng tâm thử nghiệm.
            </p>
          </div>

          <LivingLabDiagram />

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-slate-100">
            <button
              onClick={onNavigateToProblems}
              className="bg-[#00875a] hover:bg-[#00734c] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Khám phá các bài toán đang mở</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onNavigateToSubmit}
              className="bg-white border-2 border-slate-300 hover:border-[#00875a] text-slate-700 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold active:scale-95 transition-all cursor-pointer"
            >
              Gửi đề xuất vấn đề mới
            </button>
          </div>
        </section>

      </div>

    </div>
  );
};
