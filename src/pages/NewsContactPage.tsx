import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockNewsArticles, mockEvents } from '../data/mockData';
import { 
  Newspaper, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  Calendar, 
  Eye, 
  FileDown, 
  Video, 
  Clock, 
  CheckCircle2, 
  Building 
} from 'lucide-react';

interface NewsContactPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const NewsContactPage: React.FC<NewsContactPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'news' | 'docs' | 'contact'>('news');
  const [messageSent, setMessageSent] = useState(false);

  const documents = [
    { title: 'Báo cáo Tổng quan Mô hình Làng Sinh Viên Bình Mỹ 2025', size: '4.8 MB', type: 'PDF' },
    { title: 'Kỷ yếu Hội thảo Khoa học Quốc tế Y tế Cộng đồng & Lão khoa', size: '12.4 MB', type: 'PDF' },
    { title: 'Khung Năng lực Đào tạo Điều dưỡng Living Lab', size: '2.1 MB', type: 'PDF' },
    { title: 'Tài liệu Hướng dẫn Chăm sóc Dinh dưỡng Dưỡng sinh OCOP', size: '3.5 MB', type: 'PDF' },
  ];

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setMessageSent(true);
  };

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-200 text-slate-800 text-xs font-bold tracking-wide uppercase">
            <Newspaper className="w-3.5 h-3.5" />
            <span>Thông Tin & Tương Tác</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tin Tức, Học Thuật & Thông Tin Liên Hệ
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Cập nhật thường xuyên các hoạt động dự án, lịch hội thảo, khóa học sắp khai giảng, tư liệu nghiên cứu và tiếp nhận thông tin từ cộng đồng.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-center gap-3">
          {[
            { id: 'news', label: 'Tin tức & Sự kiện', icon: <Newspaper className="w-4 h-4" /> },
            { id: 'docs', label: 'Tài liệu & Kỷ yếu Video', icon: <FileDown className="w-4 h-4" /> },
            { id: 'contact', label: 'Liên hệ & Bản đồ', icon: <Mail className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === tab.id
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB 1: NEWS & EVENTS */}
        {activeTab === 'news' && (
          <div className="space-y-10">
            {/* Featured Articles */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockNewsArticles.map((art) => (
                <div
                  key={art.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-emerald-600 text-white text-[10px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                        {art.category}
                      </span>
                    </div>

                    <div className="p-5 space-y-2">
                      <div className="flex items-center gap-3 text-[11px] text-slate-400">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3.5 h-3.5" />
                          {art.date}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Eye className="w-3.5 h-3.5" />
                          {art.views} lượt xem
                        </span>
                      </div>

                      <h3 className="font-bold text-sm sm:text-base text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                        {art.title}
                      </h3>

                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-5 pt-0">
                    <button
                      onClick={() => onOpenCollaboration('general', art.title)}
                      className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
                    >
                      <span>Xem chi tiết bài viết</span>
                      <span>→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Upcoming Seminars row */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Lịch Hội Thảo & Khóa Học Sắp Khai Giảng</h3>
              <div className="space-y-3">
                {mockEvents.map((e: any) => (
                  <div key={e.id} className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 bg-slate-50 rounded-2xl border border-slate-100 gap-3">
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-xs rounded-lg">
                        {e.day} {language === 'vi' ? (e.monthVi || e.month) : (e.monthEn || e.month)}
                      </span>
                      <div>
                        <h4 className="text-xs sm:text-sm font-bold text-slate-800">
                          {language === 'vi' ? (e.titleVi || e.title) : (e.titleEn || e.title)}
                        </h4>
                        <p className="text-[11px] text-slate-500">
                          {language === 'vi' ? (e.locationVi || e.location) : (e.locationEn || e.location)} • {e.time}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => onOpenCollaboration('training', language === 'vi' ? (e.titleVi || e.title) : (e.titleEn || e.title))}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-xs self-start sm:self-auto"
                    >
                      {language === 'vi' ? 'Đăng ký tham gia' : 'Register'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: DOCUMENTS & VIDEO LIBRARY */}
        {activeTab === 'docs' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-6">Thư Viện Tài Liệu & Báo Cáo Nghiên Cứu</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {documents.map((doc, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-center justify-between group hover:border-emerald-300 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-red-100 text-red-600 flex items-center justify-center font-bold text-xs">
                        {doc.type}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-slate-800 line-clamp-1">{doc.title}</h4>
                        <span className="text-[10px] text-slate-400">Dung lượng: {doc.size}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => alert(`Đang chuẩn bị tải về: ${doc.title}`)}
                      className="p-2 rounded-lg bg-white border border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 transition-colors"
                      title="Tải về"
                    >
                      <FileDown className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Grand Rounds Library */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Video className="w-5 h-5 text-purple-600" />
                <span>Thư Viện Video Bài Giảng & Grand Rounds Quốc Tế</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: 'Webinar: Ứng dụng Trí tuệ nhân tạo trong sàng lọc tim mạch nông thôn', speaker: 'GS. David Miller (Harvard)', duration: '45 phút' },
                  { title: 'Tọa đàm: Mô hình chăm sóc Daycare chống sa sút trí tuệ Nhật Bản', speaker: 'PGS. Kenji Tanaka (NCGG)', duration: '60 phút' },
                ].map((v, vIdx) => (
                  <div key={vIdx} className="bg-purple-50/40 p-4 rounded-2xl border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{v.title}</h4>
                      <p className="text-[11px] text-purple-700 mt-1">Báo cáo viên: {v.speaker}</p>
                    </div>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-purple-100 text-[10px] text-slate-500">
                      <span>Thời lượng: {v.duration}</span>
                      <button
                        onClick={() => alert(`Đang phát video: ${v.title}`)}
                        className="font-bold text-purple-700 hover:underline"
                      >
                        Xem video trực tuyến →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CONTACT INFO & MAP */}
        {activeTab === 'contact' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Contact Info */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Thông tin liên hệ</span>
                <h3 className="text-2xl font-bold mt-1 text-white">Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Trung tâm đón tiếp, ban điều phối Living Lab và văn phòng hợp tác quốc tế.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Địa chỉ Campus:</strong>
                    Tỉnh lộ 9, Xã Bình Mỹ, Huyện Củ Chi, TP. Hồ Chí Minh, Việt Nam
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-sky-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Điện thoại / Hotline:</strong>
                    (+84) 28 3890 xxxx • Hotline: 0912 345 678
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Email:</strong>
                    contact@langsinhvienbinhmy.edu.vn / info@binhmyvillage.vn
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-purple-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Giờ làm việc:</strong>
                    Thứ 2 – Thứ 6: 08:00 – 17:00 | Thứ 7: 08:00 – 12:00
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800">
                <p className="text-[11px] text-slate-400">
                  Rất hân hạnh được đón tiếp các phái đoàn, viện trường và chuyên gia đến tham quan và làm việc trực tiếp tại Living Lab.
                </p>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2">Gửi Thư Liên Hệ Trực Tuyến</h3>
              <p className="text-xs text-slate-500 mb-6">Điền thông tin bên dưới để gửi câu hỏi hoặc lịch hẹn làm việc với Ban quản lý dự án.</p>

              {messageSent ? (
                <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-base text-slate-800">Cảm ơn bạn đã gửi liên hệ!</h4>
                  <p className="text-xs text-slate-600">Chúng tôi đã nhận được thông điệp và sẽ phản hồi qua email/số điện thoại trong vòng 24h.</p>
                  <button
                    onClick={() => setMessageSent(false)}
                    className="text-xs font-bold text-emerald-700 underline"
                  >
                    Gửi thư khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Họ và tên *</label>
                      <input
                        required
                        type="text"
                        placeholder="Nguyễn Văn A"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Email *</label>
                      <input
                        required
                        type="email"
                        placeholder="email@example.com"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Số điện thoại</label>
                      <input
                        type="tel"
                        placeholder="0912 345 678"
                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Chủ đề quan tâm</label>
                      <select className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-hidden bg-white">
                        <option>Tham quan Living Lab & Campus</option>
                        <option>Đăng ký khóa đào tạo</option>
                        <option>Tư vấn phát triển mô hình</option>
                        <option>Hợp tác nghiên cứu quốc tế</option>
                        <option>Khác</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Nội dung tin nhắn *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Nhập nội dung cần tư vấn hoặc đặt lịch hẹn..."
                      className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-hidden focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs shadow-md active:scale-95 transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Gửi thông điệp ngay</span>
                  </button>
                </form>
              )}
            </div>

          </div>
        )}

      </div>
    </div>
  );
};
