import React, { useState } from 'react';
import { 
  Send, 
  CheckCircle2, 
  Upload, 
  ShieldCheck, 
  FileText, 
  AlertCircle, 
  MapPin, 
  ArrowLeft,
  Building,
  User,
  Phone,
  HelpCircle
} from 'lucide-react';

interface SubmitProblemPageProps {
  onBackToHome: () => void;
  onNavigateToProblems: () => void;
}

export const SubmitProblemPage: React.FC<SubmitProblemPageProps> = ({
  onBackToHome,
  onNavigateToProblems
}) => {
  const [problemTitle, setProblemTitle] = useState('');
  const [field, setField] = useState('Nông nghiệp');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Ấp 1, Xã Bình Mỹ, Củ Chi');
  const [desiredOutcome, setDesiredOutcome] = useState('');
  const [proposerName, setProposerName] = useState('');
  const [proposerPhone, setProposerPhone] = useState('');
  const [proposerRole, setProposerRole] = useState('Hộ nông dân sản xuất');
  const [fileName, setFileName] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!problemTitle.trim() || !description.trim() || !proposerName.trim() || !proposerPhone.trim()) {
      setErrorMessage('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setErrorMessage('');
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setProblemTitle('');
    setDescription('');
    setDesiredOutcome('');
    setProposerName('');
    setProposerPhone('');
    setFileName('');
    setIsSubmitted(false);
    setErrorMessage('');
  };

  return (
    <div className="w-full bg-[#F7FAF8] text-slate-800 pb-16 animate-fade-in min-h-screen">
      
      {/* Top Bar */}
      <div className="bg-white border-b border-slate-200/90 py-4">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-slate-600 hover:text-[#00875a] transition-colors cursor-pointer group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Quay lại Trang chủ</span>
          </button>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 space-y-8">
        
        {isSubmitted ? (
          /* ================= SUCCESS STATE ================= */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-8 sm:p-12 shadow-sm text-center space-y-6 animate-fade-in">
            <div className="w-20 h-20 rounded-full bg-emerald-100 text-[#00875a] flex items-center justify-center mx-auto shadow-sm">
              <CheckCircle2 className="w-12 h-12 stroke-[2.2]" />
            </div>

            <div className="space-y-3">
              <span className="text-xs font-bold text-[#00875a] uppercase tracking-wider bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                Đã tiếp nhận vào hệ thống thẩm định
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                GỬI ĐỀ XUẤT THÀNH CÔNG!
              </h2>
              <div className="p-5 bg-[#F7FAF8] rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-700 leading-relaxed max-w-xl mx-auto text-left space-y-3">
                <p>
                  ✓ <strong>Đề xuất của bạn đã được gửi đến Ban quản lý Làng SV.</strong>
                </p>
                <p>
                  Ban quản lý sẽ cử chuyên viên và sinh viên thực địa liên hệ trực tiếp qua số điện thoại <strong>{proposerPhone}</strong> để khảo sát và thẩm định tính xác thực.
                </p>
                <p className="text-emerald-800 font-semibold border-t border-slate-200 pt-2">
                  Sau khi được xác minh, vấn đề phù hợp sẽ được công khai trên hệ thống "Bài toán Bình Mỹ" để kết nối nguồn lực giải quyết.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={onNavigateToProblems}
                className="bg-[#00875a] hover:bg-[#00734c] text-white px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold shadow-xs transition-all active:scale-95 cursor-pointer"
              >
                Xem các Bài toán đã xác minh
              </button>
              <button
                onClick={handleReset}
                className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 px-6 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all active:scale-95 cursor-pointer"
              >
                Gửi thêm đề xuất khác
              </button>
            </div>
          </div>
        ) : (
          /* ================= MAIN SUBMIT FORM ================= */
          <div className="bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-10 shadow-sm space-y-7">
            
            {/* Header Notice */}
            <div className="space-y-2 border-b border-slate-100 pb-6">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#00875a] bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                <ShieldCheck className="w-4 h-4" />
                <span>DÀNH CHO HỘ DÂN &amp; ĐƠN VỊ ĐỊA PHƯƠNG</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                GỬI ĐỀ XUẤT VẤN ĐỀ
              </h1>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                "Bạn đang gặp vấn đề gì tại Bình Mỹ?"
              </p>

              {/* Protocol explainer banner */}
              <div className="p-4 bg-amber-50/70 rounded-2xl border border-amber-200/80 text-[11.5px] text-amber-950 space-y-1 mt-3">
                <div className="font-bold flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-amber-700" />
                  <span>Quy trình thẩm định khách quan (Đây không phải đăng bài tự do):</span>
                </div>
                <div className="text-slate-600 leading-relaxed pl-5">
                  Gửi đề xuất vấn đề → Ban quản lý thẩm định thực địa → Xác minh bài toán → Công khai trên hệ thống → Kêu gọi kết nối nguồn lực sinh viên &amp; chuyên gia.
                </div>
              </div>
            </div>

            {errorMessage && (
              <div className="flex items-center gap-2 p-3.5 bg-red-50 text-red-700 text-xs rounded-xl border border-red-200">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Tên vấn đề */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Tên vấn đề cần giải quyết <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Khó tiếp cận kênh quảng bá nông sản số cho hộ trồng bưởi..."
                  value={problemTitle}
                  onChange={(e) => setProblemTitle(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00875a] focus:ring-2 focus:ring-emerald-100"
                />
              </div>

              {/* Lĩnh vực */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Lĩnh vực liên quan <span className="text-red-500">*</span>
                </label>
                <select
                  value={field}
                  onChange={(e) => setField(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 font-bold bg-white focus:outline-hidden focus:border-[#00875a] cursor-pointer"
                >
                  <option value="Nông nghiệp">🌱 Nông nghiệp (Sản xuất, bảo quản, tiêu thụ, chuyển đổi số)</option>
                  <option value="Y tế">🏥 Y tế (Chăm sóc sức khỏe cộng đồng, người già, dinh dưỡng)</option>
                  <option value="Du lịch">🏝️ Du lịch (Du lịch nông nghiệp, sinh thái, làng nghề)</option>
                  <option value="Môi trường & Sinh thái">🌍 Môi trường &amp; Xử lý rác thải nông thôn</option>
                  <option value="Khác">💡 Lĩnh vực khác tại địa phương</option>
                </select>
              </div>

              {/* Mô tả vấn đề */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Mô tả chi tiết vấn đề đang gặp phải <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Mô tả cụ thể khó khăn, thực trạng hiện tại, nguyên nhân chính mà bà con hoặc đơn vị đang gặp phải..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00875a] focus:ring-2 focus:ring-emerald-100 resize-none"
                />
              </div>

              {/* Địa điểm */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#00875a]" />
                  <span>Địa điểm cụ thể tại Bình Mỹ</span>
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Ấp 1, đường Bình Mỹ, gần cầu Rạch Tra..."
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                />
              </div>

              {/* Bạn mong muốn giải quyết */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Bạn mong muốn giải quyết thế nào / Kết quả kỳ vọng
                </label>
                <textarea
                  rows={3}
                  placeholder="Ví dụ: Mong muốn có một website giới thiệu bưởi sạch, hướng dẫn cách livestream bán hàng hoặc có tem truy xuất nguồn gốc..."
                  value={desiredOutcome}
                  onChange={(e) => setDesiredOutcome(e.target.value)}
                  className="w-full p-3 rounded-2xl border border-slate-200 text-xs sm:text-sm text-slate-800 focus:outline-hidden focus:border-[#00875a] resize-none"
                />
              </div>

              {/* Thông tin người đề xuất */}
              <div className="space-y-3 pt-3 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Thông tin người / Đơn vị đề xuất <span className="text-red-500">*</span>
                </label>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    placeholder="Họ và tên người đại diện *"
                    value={proposerName}
                    onChange={(e) => setProposerName(e.target.value)}
                    className="p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                  />
                  <input
                    type="tel"
                    placeholder="Số điện thoại / Zalo liên hệ *"
                    value={proposerPhone}
                    onChange={(e) => setProposerPhone(e.target.value)}
                    className="p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 focus:outline-hidden focus:border-[#00875a]"
                  />
                  <select
                    value={proposerRole}
                    onChange={(e) => setProposerRole(e.target.value)}
                    className="p-3 rounded-2xl border border-slate-200 text-xs text-slate-800 font-semibold bg-white focus:outline-hidden focus:border-[#00875a] cursor-pointer"
                  >
                    <option value="Hộ nông dân sản xuất">Hộ nông dân sản xuất</option>
                    <option value="Hộ kinh doanh cá thể">Hộ kinh doanh cá thể</option>
                    <option value="Doanh nghiệp địa phương">Doanh nghiệp địa phương</option>
                    <option value="Hợp tác xã / Tổ hợp tác">Hợp tác xã / Tổ hợp tác</option>
                    <option value="Cán bộ / Đoàn thể xã">Cán bộ / Đoàn thể xã</option>
                    <option value="Người dân địa phương">Người dân địa phương</option>
                  </select>
                </div>
              </div>

              {/* Hình ảnh / tài liệu đính kèm */}
              <div className="space-y-1.5 pt-1">
                <label className="text-xs font-bold text-slate-800 uppercase tracking-wide block">
                  Hình ảnh / Tài liệu thực tế đính kèm (nếu có)
                </label>
                <div 
                  onClick={() => setFileName('anh_chup_thuc_dia_binh_my.jpg')}
                  className="border-2 border-dashed border-slate-200 hover:border-emerald-400 p-5 rounded-2xl text-center cursor-pointer transition-colors bg-slate-50/50"
                >
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                  <div className="text-xs font-bold text-slate-700">
                    {fileName ? (
                      <span className="text-[#00875a]">✓ Đã đính kèm: {fileName}</span>
                    ) : (
                      <span>Nhấp để tải lên ảnh chụp thực tế hoặc tài liệu mô tả</span>
                    )}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    Hỗ trợ định dạng JPG, PNG, PDF (Dung lượng tối đa 15MB)
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-3.5 px-6 rounded-2xl text-xs sm:text-sm font-black shadow-sm flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>GỬI ĐỀ XUẤT CHO BAN QUẢN LÝ</span>
                </button>
                <p className="text-[11px] text-slate-400 text-center mt-2 leading-relaxed">
                  Thông tin của bạn được bảo mật và chỉ phục vụ công tác khảo sát, thẩm định của Ban quản lý Living Lab.
                </p>
              </div>

            </form>

          </div>
        )}

      </div>

    </div>
  );
};
