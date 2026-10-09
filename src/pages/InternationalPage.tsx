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
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">

        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <Globe className="w-3.5 h-3.5 text-pum-orange" />
            <span>{language === 'vi' ? 'Mạng Lưới Toàn Cầu' : 'Global Partnership'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Hợp Tác Quốc Tế & Kết Nối Tri Thức Y Khoa' : 'International Collaboration & Medical Knowledge'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Kết nối các trường đại học, bệnh viện uy tín, viện nghiên cứu và chuyên gia y tế trên toàn thế giới nhằm đồng xây dựng chương trình, nghiên cứu lâm sàng và chuyển giao công nghệ.'
              : 'Connecting prestigious universities, research institutes, hospitals, and medical experts globally to co-design curricula, conduct multi-center research, and transfer healthcare innovation.'}
          </p>
        </div>

        {/* 4 Action Buttons Bar (Rule s.md) */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs max-w-4xl mx-auto">
          <button
            onClick={() => onOpenCollaboration('partner', 'Đề xuất hợp tác quốc tế')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-green text-white hover:bg-pum-greenAlt transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Đề xuất hợp tác' : 'Propose Collaboration'}
          </button>
          <button
            onClick={() => onOpenCollaboration('consulting', 'Đề xuất nghiên cứu đa trung tâm')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-orange text-white hover:bg-pum-orangeHover transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Đề xuất nghiên cứu' : 'Propose Research'}
          </button>
          <button
            onClick={() => onOpenCollaboration('general', 'Đăng cai tổ chức hội thảo quốc tế')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-white text-pum-green border-2 border-pum-green hover:bg-pum-lightGreen/30 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Đăng cai hội thảo' : 'Host a Symposium'}
          </button>
          <button
            onClick={() => onOpenCollaboration('partner', 'Trở thành đối tác chiến lược quốc tế')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Trở thành đối tác quốc tế' : 'Become Global Partner'}
          </button>
        </div>

        {/* 4 Pillars Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'training', labelVi: '6.1. Hợp tác đào tạo', labelEn: 'Training Collaboration', icon: <GraduationCap className="w-4 h-4" /> },
            { id: 'research', labelVi: '6.2. Hợp tác nghiên cứu', labelEn: 'Research Partnerships', icon: <Microscope className="w-4 h-4" /> },
            { id: 'academic', labelVi: '6.3. Trao đổi học thuật', labelEn: 'Academic Exchange', icon: <MessageSquareShare className="w-4 h-4" /> },
            { id: 'partners', labelVi: '6.4. Đối tượng hợp tác', labelEn: 'Partner Profiles', icon: <Building2 className="w-4 h-4" /> },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all ${
                activeTab === tab.id
                  ? 'bg-pum-green text-white shadow-md'
                  : 'bg-white text-slate-700 hover:bg-pum-lightGreen/40 border border-slate-200'
              }`}
            >
              {tab.icon}
              <span>{language === 'vi' ? tab.labelVi : tab.labelEn}</span>
            </button>
          ))}
        </div>

        {/* TAB CONTENTS */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-2xs">

          {/* 6.1. HỢP TÁC ĐÀO TẠO */}
          {activeTab === 'training' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-black uppercase tracking-wider text-pum-green">Education Mobility</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Đồng Xây Dựng & Trao Đổi Đào Tạo Quốc Tế</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Phát triển các chương trình cấp chứng nhận kép, luân chuyển giảng viên - sinh viên và đào tạo theo đặt hàng từ cơ sở y tế nước ngoài.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
                {[
                  { title: 'Đồng xây dựng chương trình', desc: 'Thiết kế khung chương trình chuẩn quốc tế, công nhận tín chỉ lẫn nhau với các viện đào tạo hàng đầu.' },
                  { title: 'Trao đổi sinh viên & giảng viên', desc: 'Học kỳ thực tập quốc tế tại Living Lab Bình Mỹ và các bệnh viện đối tác tại Nhật Bản, Hàn Quốc, Châu Âu.' },
                  { title: 'Đào tạo trực tuyến & hỗn hợp', desc: 'Kết hợp e-learning, bài giảng của chuyên gia thế giới và thực hành lâm sàng thực tế tại Việt Nam.' },
                  { title: 'Đào tạo theo đơn đặt hàng', desc: 'Chương trình đào tạo theo yêu cầu cụ thể của bệnh viện quốc tế và tập đoàn chăm sóc sức khỏe.' },
                  { title: 'Cấp chứng chỉ hành nghề chuẩn hóa', desc: 'Cung cấp chứng chỉ hoàn thành khóa đào tạo được thẩm định bởi hội đồng chuyên gia quốc tế.' },
                  { title: 'Đào tạo tiếng Anh & tiếng Nhật y khoa', desc: 'Bồi dưỡng năng lực ngoại ngữ chuyên sâu, kỹ năng giao tiếp lâm sàng và làm việc đa văn hóa.' },
                ].map((item, idx) => (
                  <div key={idx} className="p-5 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 hover:border-pum-green transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-pum-orange mb-3" />
                    <h4 className="font-bold text-sm text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.2. HỢP TÁC NGHIÊN CỨU */}
          {activeTab === 'research' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-black uppercase tracking-wider text-pum-orange">Applied Research</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Đề Tài Đa Trung Tâm & Thử Nghiệm Living Lab</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Mở rộng đề tài nghiên cứu từ sức khỏe ban đầu, chuyển đổi số y tế đến y học cổ truyền và nông nghiệp dinh dưỡng.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
                {[
                  'Nghiên cứu sức khỏe cộng đồng & dịch tễ',
                  'Chăm sóc & can thiệp lão khoa toàn diện',
                  'Y tế số, AI và giải pháp Telehealth cơ sở',
                  'Health & Wellness và dinh dưỡng sinh thái',
                  'Nông nghiệp sức khỏe & dược liệu địa phương',
                  'Nghiên cứu thử nghiệm đa trung tâm quốc tế',
                  'Công bố khoa học chung trên tạp chí ISI/Scopus',
                  'Thử nghiệm giải pháp công nghệ tại Living Lab',
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-pum-lightGreen/20 border border-pum-green/15 flex items-start gap-2.5">
                    <Sparkles className="w-4 h-4 text-pum-orange flex-shrink-0 mt-0.5" />
                    <span className="text-xs font-bold text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.3. TRAO ĐỔI HỌC THUẬT */}
          {activeTab === 'academic' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-black uppercase tracking-wider text-pum-green">Academic Forum</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Diễn Đàn Chuyên Môn, Webinar & Grand Rounds</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Cầu nối tri thức học thuật định kỳ giữa đội ngũ y tế Việt Nam và các chuyên gia đầu ngành trên thế giới.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                {[
                  {
                    title: 'Hội nghị & Hội thảo Quốc tế',
                    desc: 'Tổ chức các sự kiện học thuật thường niên, đón tiếp hàng trăm diễn giả, bác sĩ và nhà khoa học tham dự.',
                    action: 'Đăng cai tổ chức'
                  },
                  {
                    title: 'Webinar & Grand Rounds',
                    desc: 'Các buổi báo cáo ca bệnh khó, cập nhật tiến bộ y khoa trực tuyến liên trường viện định kỳ hàng tháng.',
                    action: 'Đăng ký tham gia'
                  },
                  {
                    title: 'Câu lạc bộ Học thuật & Video Library',
                    desc: 'Kho tư liệu video bài giảng, kỷ yếu hội thảo và diễn đàn chia sẻ kinh nghiệm thực hành lâm sàng.',
                    action: 'Khám phá thư viện'
                  }
                ].map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-[#F8FAF9] border border-slate-200/80 flex flex-col justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-xs text-slate-600 leading-relaxed mb-4">{item.desc}</p>
                    </div>
                    <button
                      onClick={() => onOpenCollaboration('general', item.title)}
                      className="text-xs font-bold text-pum-green hover:text-pum-orange flex items-center gap-1 self-start"
                    >
                      <span>{item.action}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6.4. ĐỐI TƯỢNG HỢP TÁC */}
          {activeTab === 'partners' && (
            <div className="space-y-6">
              <div className="max-w-2xl">
                <span className="text-xs font-black uppercase tracking-wider text-pum-orange">Ecosystem Network</span>
                <h3 className="text-xl font-bold text-slate-900 mt-1">Đối Tượng Đồng Hành & Phát Triển</h3>
                <p className="text-xs sm:text-sm text-slate-600 mt-2">
                  Thiết lập mạng lưới đối tác đa phương nhằm tối ưu nguồn lực và tác động xã hội.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
                {[
                  { name: 'Trường Đại Học', desc: 'Hợp tác chương trình, trao đổi sinh viên & giảng viên' },
                  { name: 'Bệnh Viện & Cơ Sở Y Tế', desc: 'Hội chẩn, đào tạo lâm sàng và tiếp nhận nhân lực' },
                  { name: 'Viện Nghiên Cứu', desc: 'Đồng triển khai đề tài, thử nghiệm Living Lab' },
                  { name: 'Hội Nghề Nghiệp Y Tế', desc: 'Chuẩn hóa định chế hành nghề và thẩm định năng lực' },
                  { name: 'Doanh Nghiệp Công Nghệ', desc: 'Thử nghiệm thiết bị y tế số, phần mềm y tế' },
                  { name: 'Chính Phủ & Địa Phương', desc: 'Quy hoạch chính sách và bảo trợ phát triển mô hình' },
                  { name: 'Tổ Chức Quốc Tế', desc: 'Tài trợ dự án, hỗ trợ kỹ thuật và chuẩn hóa' },
                  { name: 'Quỹ Nghiên Cứu', desc: 'Tài trợ học bổng, đầu tư dự án khởi nghiệp y tế' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                    <h4 className="font-bold text-xs text-pum-green mb-1">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 leading-snug">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
