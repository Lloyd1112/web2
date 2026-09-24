import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import {
  Globe,
  GraduationCap,
  Microscope,
  MessageSquareShare,
  Building2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Award,
  FileText,
  Calendar,
  Send
} from 'lucide-react';

interface InternationalPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const InternationalPage: React.FC<InternationalPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'training' | 'research' | 'academic' | 'partners'>('training');

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-100 text-purple-800 text-xs font-bold tracking-wide uppercase">
            <Globe className="w-3.5 h-3.5" />
            <span>Mạng Lưới Toàn Cầu</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Hợp Tác Quốc Tế & Kết Nối Tri Thức Y Khoa
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Kết nối các trường đại học, bệnh viện uy tín, viện nghiên cứu và chuyên gia y tế trên toàn thế giới nhằm đồng xây dựng chương trình, nghiên cứu lâm sàng và chuyển giao công nghệ.
          </p>
        </div>

        {/* 4 Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs max-w-4xl mx-auto">
          <button
            onClick={() => onOpenCollaboration('partner', 'Đề xuất hợp tác quốc tế')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm"
          >
            Đề xuất hợp tác
          </button>
          <button
            onClick={() => onOpenCollaboration('consulting', 'Đề xuất nghiên cứu đa trung tâm')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm"
          >
            Đề xuất nghiên cứu
          </button>
          <button
            onClick={() => onOpenCollaboration('general', 'Đăng cai tổ chức hội thảo quốc tế')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Đăng cai hội thảo
          </button>
          <button
            onClick={() => onOpenCollaboration('partner', 'Trở thành đối tác chiến lược quốc tế')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-sm"
          >
            Trở thành đối tác quốc tế
          </button>
        </div>

        {/* 4 Pillars Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 no-scrollbar">
          {[
            { id: 'training', label: '6.1. Hợp tác đào tạo', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'research', label: '6.2. Hợp tác nghiên cứu', icon: <Microscope className="w-4 h-4" /> },
            { id: 'academic', label: '6.3. Trao đổi học thuật', icon: <MessageSquareShare className="w-4 h-4" /> },
            { id: 'partners', label: '6.4. Đối tượng hợp tác', icon: <Building2 className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${activeTab === tab.id
                  ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                  : 'bg-white text-slate-700 hover:bg-purple-50 border border-slate-200'
                }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-card">

          {/* 6.1. HỢP TÁC ĐÀO TẠO */}
          {activeTab === 'training' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">Trụ Cột 1</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Hợp Tác Đào Tạo Quốc Tế Toàn Diện</h3>
                <p className="text-xs text-slate-500 mt-1">Đồng xây dựng chương trình đạt chuẩn kiểm định và cấp chứng nhận song phương</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  { title: 'Đồng xây dựng chương trình', desc: 'Thiết kế giáo trình điều dưỡng lão khoa, y tế số và quản trị bệnh viện cùng các trường y danh tiếng.' },
                  { title: 'Trao đổi sinh viên & giảng viên', desc: 'Học kỳ trao đổi quốc tế, chương trình thực tập lâm sàng ngắn hạn tại Nhật Bản, Hoa Kỳ, Úc.' },
                  { title: 'Đào tạo ngắn hạn & Kết hợp (Blended)', desc: 'Các khóa học kết hợp trực tuyến (E-learning) và thực hành chuyên sâu tại Living Lab Bình Mỹ.' },
                  { title: 'Đào tạo theo đơn đặt hàng', desc: 'Đào tạo nguồn nhân lực đạt chuẩn ngoại ngữ và kỹ năng hành nghề cho các tập đoàn y tế nước ngoài.' },
                  { title: 'Chương trình cấp chứng nhận chung', desc: 'Liên kết cấp chứng chỉ hành nghề và tín chỉ chuyển đổi tương đương giữa các tổ chức giáo dục.' },
                  { title: 'Đào tạo Tiếng Anh / Tiếng Nhật Y khoa', desc: 'Chương trình ngoại ngữ chuyên sâu giúp học viên sẵn sàng thi chứng chỉ OET, JLPT N2 Y tế.' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-purple-50/40 p-5 rounded-2xl border border-purple-100 hover:border-purple-300 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-purple-600 mb-2" />
                    <h4 className="font-bold text-sm text-slate-800">{item.title}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.2. HỢP TÁC NGHIÊN CỨU */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">Trụ Cột 2</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Nghiên Cứu Ứng Dụng & Đa Trung Tâm</h3>
                <p className="text-xs text-slate-500 mt-1">Đồng nghiên cứu, xuất bản quốc tế và ứng dụng thực tiễn tại Living Lab</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  'Nghiên cứu sức khỏe cộng đồng & dịch tễ học',
                  'Mô hình chăm sóc người cao tuổi thích ứng',
                  'Y tế số, AI và giải pháp Telehealth cơ sở',
                  'Health & Wellness và can thiệp lối sống',
                  'Dinh dưỡng y học và nông nghiệp dược liệu',
                  'Nghiên cứu đa trung tâm (Multi-center trials)',
                  'Công bố khoa học chung trên tạp chí ISI/Scopus',
                  'Thử nghiệm giải pháp công nghệ tại Living Lab',
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-purple-600 flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-semibold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.3. TRAO ĐỔI HỌC THUẬT */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">Trụ Cột 3</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Diễn Đàn Học Thuật & Grand Rounds Quốc Tế</h3>
                <p className="text-xs text-slate-500 mt-1">Nơi trao đổi kinh nghiệm lâm sàng đỉnh cao và công bố tri thức mới</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                {[
                  { title: 'Hội thảo quốc tế thường niên', count: '4 kỳ / năm' },
                  { title: 'Webinar chuyên đề trực tuyến', count: 'Hàng tháng' },
                  { title: 'International Grand Rounds', count: 'Hàng tuần' },
                  { title: 'Câu lạc bộ học thuật sinh viên', count: 'Đa quốc gia' },
                  { title: 'Hội nghị Bác sĩ trẻ & Nhà nghiên cứu', count: 'Hàng năm' },
                  { title: 'Báo cáo ca bệnh lâm sàng hiếm', count: 'Thường xuyên' },
                  { title: 'Kêu gọi đề tài (Call for Papers)', count: 'Mở liên tục' },
                  { title: 'Kỷ yếu & Thư viện Video học thuật', count: 'Truy cập mở' },
                ].map((item, idx) => (
                  <div key={idx} className="bg-purple-50/50 p-4 rounded-2xl border border-purple-100 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-xs text-slate-800">{item.title}</h4>
                    </div>
                    <span className="text-[10px] font-bold text-purple-700 bg-white px-2 py-1 rounded-md mt-3 inline-block self-start border border-purple-200">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.4. ĐỐI TƯỢNG HỢP TÁC */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-extrabold uppercase tracking-widest text-purple-600">Trụ Cột 4</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">Mạng Lưới Đối Tác Chiến Lược Quốc Tế</h3>
                <p className="text-xs text-slate-500 mt-1">Chào đón sự đồng hành từ các tổ chức y tế và viện nghiên cứu trên toàn cầu</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  { name: 'Trường Đại học Y Dược & Khoa học Sức khỏe', desc: 'Hợp tác chuyển giao chương trình, trao đổi giảng viên và học bổng sinh viên.' },
                  { name: 'Bệnh viện & Hệ thống Chăm sóc Y tế', desc: 'Chương trình quan sát chuyên môn (observership) và hội chẩn trực tuyến.' },
                  { name: 'Viện Nghiên cứu Khoa học Y Sinh', desc: 'Thực hiện các đề tài đa trung tâm và kiểm nghiệm lâm sàng tại Living Lab.' },
                  { name: 'Hội Nghề nghiệp & Hiệp hội Chuyên ngành', desc: 'Xây dựng tiêu chuẩn thực hành y khoa và chứng chỉ nghề nghiệp.' },
                  { name: 'Doanh nghiệp Công nghệ Y tế & MedTech', desc: 'Thử nghiệm ứng dụng phần mềm, thiết bị IoT và trí tuệ nhân tạo y tế.' },
                  { name: 'Chính phủ, Tổ chức Quốc tế & Quỹ Tài trợ', desc: 'Tài trợ các dự án nâng cao năng lực y tế cộng đồng và chăm sóc người yếu thế.' },
                ].map((p, idx) => (
                  <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-200">
                    <h4 className="font-bold text-sm text-slate-800">{p.name}</h4>
                    <p className="text-xs text-slate-600 mt-2 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="pt-6 mt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Quan tâm đến cơ hội hợp tác quốc tế cùng Campus Bình Mỹ?</span>
            <button
              onClick={() => onOpenCollaboration('partner', 'Đề xuất hợp tác quốc tế')}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs shadow-md shadow-purple-600/20 active:scale-95 transition-all"
            >
              <span>Gửi thư bày tỏ quan tâm (EOI)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
