import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDataService } from '../services/adminDataService';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  CheckCircle2, 
  Building2, 
  HeartHandshake, 
  Users, 
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Compass
} from 'lucide-react';

interface ContactPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate?: (tab: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = ({ 
  onOpenCollaboration,
  onNavigate 
}) => {
  const { language } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    organization: '',
    topic: 'healthcare',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Lưu bền vững vào cơ sở dữ liệu hệ thống
    AdminDataService.saveContactMessage({
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      topic: `${formData.topic} ${formData.organization ? `(${formData.organization})` : ''}`,
      message: formData.message.trim()
    });

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormData({
        fullName: '',
        email: '',
        phone: '',
        organization: '',
        topic: 'healthcare',
        message: ''
      });
    }, 800);
  };

  const contactDepartments = [
    {
      titleVi: 'Ban Điều Phối Dự Án & Campus',
      titleEn: 'Project & Campus Coordination',
      contact: 'Ban Quản Lý Làng Sinh Viên Bình Mỹ',
      email: 'coordination@langsinhvienbinhmy.edu.vn',
      phone: '(+84) 28 5445 7777',
      icon: Building2,
      color: 'text-pum-green',
      bg: 'bg-pum-lightGreen/40'
    },
    {
      titleVi: 'Hợp Tác Quốc Tế & Bác Sĩ Chuyên Gia',
      titleEn: 'Global Cooperation & Doctors Network',
      contact: 'Bộ phận Bác sĩ Xuyên Biên Giới',
      email: 'doctors@langsinhvienbinhmy.edu.vn',
      phone: '(+84) 903 888 999',
      icon: HeartHandshake,
      color: 'text-pum-orange',
      bg: 'bg-orange-50'
    },
    {
      titleVi: 'Đào Tạo Nhân Lực & Tuyển Sinh',
      titleEn: 'Workforce Training & Admissions',
      contact: 'Văn phòng Tuyển sinh & Living Lab',
      email: 'training@langsinhvienbinhmy.edu.vn',
      phone: '(+84) 28 5445 2222',
      icon: Users,
      color: 'text-sky-600',
      bg: 'bg-sky-50'
    }
  ];

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <Mail className="w-3.5 h-3.5 text-pum-orange" />
            <span>{language === 'vi' ? 'Kết Nối Đồng Hành' : 'Get In Touch'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Liên Hệ & Tiếp Nhận Hợp Tác' : 'Contact & Partnership Inquiries'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ luôn sẵn sàng lắng nghe, tư vấn và tiếp nhận các yêu cầu hợp tác từ trường đại học, bệnh viện, chuyên gia và doanh nghiệp.'
              : 'Binh My Innovative Student Village is always ready to consult, partner, and welcome inquiries from universities, hospitals, physicians, and enterprises.'}
          </p>
        </div>

        {/* 3 Department Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {contactDepartments.map((dept, idx) => {
            const IconComp = dept.icon;
            return (
              <div 
                key={idx}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className={`w-12 h-12 rounded-2xl ${dept.bg} ${dept.color} flex items-center justify-center mb-5 shadow-2xs`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1 leading-snug">
                    {language === 'vi' ? dept.titleVi : dept.titleEn}
                  </h3>
                  <p className="text-xs text-slate-500 font-semibold mb-4">
                    {dept.contact}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 space-y-2 text-xs text-slate-700">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-pum-green flex-shrink-0" />
                    <span className="font-medium hover:text-pum-orange transition-colors cursor-pointer">{dept.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-pum-orange flex-shrink-0" />
                    <span className="font-semibold">{dept.phone}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main 2-Column: Contact Form + Campus Address & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Form on Left (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-sm">
            <div className="mb-8">
              <span className="text-xs font-black uppercase tracking-wider text-pum-green">
                {language === 'vi' ? 'Biểu Mẫu Trực Tuyến' : 'Direct Message'}
              </span>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                {language === 'vi' ? 'Gửi Yêu Cầu Cho Chúng Tôi' : 'Send Us a Message'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {language === 'vi' 
                  ? 'Vui lòng điền thông tin bên dưới. Đội ngũ điều phối sẽ phản hồi trong vòng 24 giờ làm việc.'
                  : 'Please fill out the form below. Our coordination team will get back to you within 24 business hours.'}
              </p>
            </div>

            {isSubmitted ? (
              <div className="p-8 bg-pum-lightGreen/30 border border-pum-green/30 rounded-2xl text-center space-y-4 animate-in fade-in">
                <div className="w-16 h-16 rounded-full bg-pum-green text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  {language === 'vi' ? 'Gửi thông tin thành công!' : 'Inquiry Submitted Successfully!'}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                  {language === 'vi'
                    ? 'Cảm ơn bạn đã liên hệ với Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ. Ban điều phối sẽ liên hệ qua email hoặc số điện thoại bạn cung cấp.'
                    : 'Thank you for contacting Binh My Student Village. Our team will reach out via the provided email or phone number.'}
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-4 px-6 py-2.5 rounded-full bg-pum-green text-white font-bold text-xs hover:bg-pum-greenAlt transition-all shadow-sm"
                >
                  {language === 'vi' ? 'Gửi yêu cầu khác' : 'Submit Another Message'}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === 'vi' ? 'Họ và tên *' : 'Full Name *'}
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder={language === 'vi' ? 'Nguyễn Văn A' : 'John Doe'}
                      className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === 'vi' ? 'Địa chỉ Email *' : 'Email Address *'}
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@domain.com"
                      className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === 'vi' ? 'Số điện thoại *' : 'Phone Number *'}
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0903 xxx xxx"
                      className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      {language === 'vi' ? 'Đơn vị / Cơ quan công tác' : 'Organization / Affiliation'}
                    </label>
                    <input
                      type="text"
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder={language === 'vi' ? 'Trường Đại học, Bệnh viện, Doanh nghiệp...' : 'University, Hospital, Enterprise...'}
                      className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'vi' ? 'Nội dung quan tâm / Hợp tác' : 'Subject of Interest'}
                  </label>
                  <select
                    value={formData.topic}
                    onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                  >
                    <option value="healthcare">{language === 'vi' ? 'Hợp tác phát triển 3 Mô hình Y tế' : 'Collaboration on 3 Healthcare Models'}</option>
                    <option value="training">{language === 'vi' ? 'Đăng ký đào tạo / Thực tập Living Lab' : 'Workforce Training & Living Lab'}</option>
                    <option value="doctors">{language === 'vi' ? 'Mời Chuyên gia / Bác sĩ Xuyên Biên Giới' : 'Doctors Across Borders Network'}</option>
                    <option value="consulting">{language === 'vi' ? 'Tư vấn dự án & 12 Mô hình kinh tế' : 'Consulting 12 Economic Models'}</option>
                    <option value="visit">{language === 'vi' ? 'Tham quan học tập / Du lịch trải nghiệm' : 'Campus Visit & Field Study'}</option>
                    <option value="other">{language === 'vi' ? 'Chủ đề hợp tác khác' : 'Other Collaboration Topic'}</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    {language === 'vi' ? 'Nội dung tin nhắn / Đề xuất cụ thể *' : 'Message Details *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={language === 'vi' ? 'Vui lòng mô tả chi tiết nhu cầu hoặc nội dung bạn mong muốn phối hợp...' : 'Please describe your request, expected timeline or inquiry...'}
                    className="w-full px-4 py-3 text-sm border border-slate-200 rounded-xl focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green transition-colors bg-[#F8FAF9]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-bold px-8 py-4 rounded-full text-white bg-pum-orange hover:bg-pum-orangeHover transition-all active:scale-95 shadow-md text-sm"
                  >
                    <Send className="w-4 h-4" />
                    <span>{isSubmitting ? (language === 'vi' ? 'Đang gửi...' : 'Sending...') : (language === 'vi' ? 'Gửi Yêu Cầu Liên Hệ' : 'Send Message')}</span>
                  </button>
                </div>
              </form>
            )}
          </div>

          {/* Campus Location & Info on Right (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Campus Address Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/90 shadow-sm space-y-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-pum-green">
                  {language === 'vi' ? 'Trụ Sở Chính' : 'Main Headquarters'}
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">
                  {language === 'vi' ? 'Khuôn Viên Campus Bình Mỹ' : 'Binh My Campus Grounds'}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-700">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pum-lightGreen/50 text-pum-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-5 h-5 text-pum-orange" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold mb-0.5">
                      {language === 'vi' ? 'Địa chỉ' : 'Location'}:
                    </strong>
                    <span>Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh, Việt Nam</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pum-lightGreen/50 text-pum-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold mb-0.5">
                      {language === 'vi' ? 'Tổng đài tiếp nhận' : 'Hotline'}:
                    </strong>
                    <span>(+84) 28 5445 7777 / 0903 888 999</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pum-lightGreen/50 text-pum-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold mb-0.5">
                      Email:
                    </strong>
                    <span>contact@langsinhvienbinhmy.edu.vn</span>
                  </div>
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-pum-lightGreen/50 text-pum-green flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 font-bold mb-0.5">
                      {language === 'vi' ? 'Giờ mở cửa tiếp đón' : 'Office Hours'}:
                    </strong>
                    <span>{language === 'vi' ? 'Thứ Hai – Thứ Bảy: 08:00 – 17:30' : 'Monday – Saturday: 08:00 – 17:30'}</span>
                  </div>
                </div>
              </div>

              {/* Directions Advice */}
              <div className="pt-4 border-t border-slate-100 bg-[#F8FAF9] p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-xs font-bold text-pum-green mb-1">
                  <Compass className="w-4 h-4 text-pum-orange" />
                  <span>{language === 'vi' ? 'Hướng dẫn đường đi' : 'Getting Here'}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {language === 'vi'
                    ? 'Từ trung tâm TP.HCM đi theo trục Quốc lộ 22 hoặc Tỉnh lộ 9 (Hà Duy Phiên) hướng về cầu Rạch Tra. Xe buýt tuyến 78 và 58 dừng trực tiếp tại cổng Làng Sinh Viên.'
                    : 'From central HCMC via National Highway 22 or Provincial Road 9 toward Rach Tra Bridge. Bus routes 78 & 58 stop right at Campus Entrance.'}
                </p>
              </div>

            </div>

            {/* Quick Proposal Callout */}
            <div className="bg-pum-green text-white rounded-3xl p-7 flex items-center justify-between gap-4 shadow-md">
              <div>
                <h4 className="font-bold text-base text-white">
                  {language === 'vi' ? 'Đề xuất hợp tác chuyên gia?' : 'Have a Specialized Proposal?'}
                </h4>
                <p className="text-xs text-white/80 mt-1">
                  {language === 'vi' ? 'Mở biểu mẫu hợp tác dự án chuẩn hóa' : 'Open standardized consultation intake'}
                </p>
              </div>
              <button
                onClick={() => onOpenCollaboration('general', 'Liên hệ hợp tác trực tiếp')}
                className="px-5 py-2.5 rounded-full bg-pum-orange hover:bg-pum-orangeHover text-white text-xs font-bold whitespace-nowrap shadow-sm active:scale-95"
              >
                {language === 'vi' ? 'Đăng ký ngay' : 'Apply Now'}
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
