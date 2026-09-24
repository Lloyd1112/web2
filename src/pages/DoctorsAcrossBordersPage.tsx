import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockDoctorProfiles } from '../data/mockData';
import { 
  Stethoscope, 
  ShieldCheck, 
  CheckCircle2, 
  ArrowRight, 
  Globe2, 
  Award, 
  BookOpen, 
  Users, 
  HeartHandshake, 
  MessageSquare, 
  FileText, 
  AlertCircle,
  Filter
} from 'lucide-react';

interface DoctorsAcrossBordersPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const DoctorsAcrossBordersPage: React.FC<DoctorsAcrossBordersPageProps> = ({ onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [selectedDoctor, setSelectedDoctor] = useState<any | null>(null);
  const [filterSpecialty, setFilterSpecialty] = useState<string>('all');

  const programs = [
    {
      title: '1. Bác sĩ thỉnh giảng quốc tế',
      icon: 'BookOpen',
      items: ['Giảng dạy trực tiếp hoặc trực tuyến', 'Hướng dẫn thực hành lâm sàng', 'Cập nhật chuyên môn kỹ thuật mới', 'Cố vấn giảng viên và sinh viên Y khoa']
    },
    {
      title: '2. Trao đổi bác sĩ lâm sàng',
      icon: 'Users',
      items: ['Chương trình quan sát chuyên môn (Observership)', 'Trao đổi bác sĩ ngắn hạn', 'Tham quan mô hình bệnh viện thông minh', 'Chia sẻ kinh nghiệm quản trị & an toàn người bệnh']
    },
    {
      title: '3. Hội chẩn học thuật xuyên biên giới',
      icon: 'MessageSquare',
      items: ['Hội chẩn chuyên môn ca khó', 'Thảo luận ca bệnh thực tế', 'International Grand Rounds định kỳ', 'Cập nhật phác đồ điều trị tiên tiến']
    },
    {
      title: '4. Nghiên cứu y học không biên giới',
      icon: 'FileText',
      items: ['Kết nối nhóm nghiên cứu quốc tế', 'Triển khai nghiên cứu đa trung tâm', 'Đồng hướng dẫn học viên sau đại học', 'Công bố khoa học quốc tế chung']
    },
    {
      title: '5. Bác sĩ vì sức khỏe cộng đồng',
      icon: 'HeartHandshake',
      items: ['Giáo dục sức khỏe và phòng bệnh', 'Sàng lọc sức khỏe cộng đồng Bình Mỹ', 'Đào tạo kỹ năng sơ cấp cứu ngoại viện', 'Hỗ trợ y tế cho người cao tuổi & nhóm yếu thế']
    },
    {
      title: '6. Cố vấn phát triển dự án y tế',
      icon: 'ShieldCheck',
      items: ['Cố vấn 3 dự án y tế trụ cột', 'Đồng thiết kế chương trình đào tạo nhân lực', 'Cố vấn thử nghiệm tại Living Lab', 'Định chuẩn an toàn & chất lượng quốc tế']
    }
  ];

  const specialties = ['all', 'Tim mạch', 'Lão khoa', 'Y học gia đình', 'Wellness'];

  const filteredDoctors = filterSpecialty === 'all'
    ? mockDoctorProfiles
    : mockDoctorProfiles.filter(d => d.specialty.toLowerCase().includes(filterSpecialty.toLowerCase()));

  return (
    <div className="w-full bg-[#f8fafc] py-10 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-teal-100 text-teal-800 text-xs font-bold tracking-wide uppercase">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Doctors Across Borders Program</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Chương Trình Bác Sĩ Xuyên Biên Giới
          </h1>
          <p className="text-base text-slate-600 font-medium leading-relaxed">
            Kết nối bác sĩ và chuyên gia y tế toàn cầu để chia sẻ tri thức, đào tạo nhân lực, nghiên cứu và phụng sự sức khỏe cộng đồng.
          </p>
        </div>

        {/* 4 Action Buttons Bar */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-xs max-w-4xl mx-auto">
          <button
            onClick={() => onOpenCollaboration('expert', 'Tham gia mạng lưới Bác sĩ Xuyên biên giới')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-teal-600 text-white hover:bg-teal-700 transition-colors shadow-sm"
          >
            Tham gia mạng lưới bác sĩ
          </button>
          <button
            onClick={() => onOpenCollaboration('general', 'Mời chuyên gia bác sĩ quốc tế')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-sky-600 text-white hover:bg-sky-700 transition-colors shadow-sm"
          >
            Mời chuyên gia
          </button>
          <button
            onClick={() => onOpenCollaboration('consulting', 'Đề xuất chương trình hội chẩn/nghiên cứu')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-purple-600 text-white hover:bg-purple-700 transition-colors shadow-sm"
          >
            Đề xuất chương trình
          </button>
          <button
            onClick={() => onOpenCollaboration('training', 'Đăng ký hoạt động y tế cộng đồng')}
            className="px-5 py-2.5 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Đăng ký hoạt động cộng đồng
          </button>
        </div>

        {/* 7.1. SÁU CHƯƠNG TRÌNH CHÍNH */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">6 Khung Hoạt Động</span>
            <h2 className="text-2xl font-bold mt-1 text-slate-900">Các Chương Trình Hợp Tác Trọng Tâm</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((prog, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center text-teal-600 font-bold">
                      <Stethoscope className="w-5 h-5" />
                    </div>
                    <h3 className="font-bold text-sm text-slate-900 group-hover:text-teal-700 transition-colors">
                      {prog.title}
                    </h3>
                  </div>

                  <ul className="space-y-2 border-t border-slate-100 pt-3">
                    {prog.items.map((it, iIdx) => (
                      <li key={iIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-500 flex-shrink-0 mt-0.5" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100">
                  <button
                    onClick={() => onOpenCollaboration('general', prog.title)}
                    className="w-full py-2 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-700 hover:text-white font-bold text-xs flex items-center justify-center gap-2 transition-all"
                  >
                    <span>Tham gia chương trình</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7.2. HỒ SƠ CHUYÊN GIA / DANH BẠ BÁC SĨ */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-teal-600">Danh bạ chuyên gia</span>
              <h2 className="text-2xl font-bold mt-1 text-slate-900">Mạng Lưới Bác Sĩ & Cố Vấn Tiêu Biểu</h2>
            </div>

            {/* Specialty filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-slate-400" />
              <select
                value={filterSpecialty}
                onChange={(e) => setFilterSpecialty(e.target.value)}
                className="text-xs font-semibold px-3 py-1.5 border border-slate-200 rounded-lg bg-slate-50 text-slate-700 outline-hidden"
              >
                <option value="all">Tất cả chuyên khoa</option>
                <option value="Tim mạch">Tim mạch & Y tế cộng đồng</option>
                <option value="Lão khoa">Lão khoa & Phục hồi</option>
                <option value="Y học gia đình">Y học gia đình</option>
                <option value="Wellness">Health & Wellness</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-slate-50/70 hover:bg-white rounded-2xl p-5 border border-slate-200/70 hover:border-teal-300 hover:shadow-md transition-all flex flex-col sm:flex-row gap-4"
              >
                <div className="relative flex-shrink-0">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover shadow-sm border border-slate-200"
                  />
                  <span className="absolute -bottom-2 -right-2 text-lg bg-white rounded-full p-0.5 shadow-xs">
                    {doc.flag}
                  </span>
                </div>

                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-slate-900 leading-tight">{doc.name}</h3>
                    {doc.verified && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-700 bg-teal-100 px-2 py-0.5 rounded-full">
                        <ShieldCheck className="w-3 h-3" />
                        Đã xác minh
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-teal-700 font-bold">{doc.specialty}</p>
                  <p className="text-[11px] text-slate-500 line-clamp-1">{doc.organization}</p>
                  <p className="text-[11px] text-slate-600 line-clamp-2 italic">"{doc.researchFocus}"</p>

                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {doc.collaborationForms.map((form: string, fIdx: number) => (
                      <span key={fIdx} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2 py-0.5 rounded-md">
                        {form}
                      </span>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400">Ngôn ngữ: {doc.languages.join(', ')}</span>
                    <button
                      onClick={() => onOpenCollaboration('expert', `Kết nối cùng ${doc.name}`)}
                      className="text-xs font-bold text-teal-600 hover:text-teal-700 flex items-center gap-1"
                    >
                      <span>Kết nối</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7.3. NGUYÊN TẮC HOẠT ĐỘNG & TUÂN THỦ PHÁP LÝ */}
        <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-sm sm:text-base text-amber-900">
                Nguyên Tắc Hoạt Động & Tuân Thủ Pháp Lý Y Tế (Compliance)
              </h3>
              <p className="text-xs text-amber-800/90 leading-relaxed">
                Website và chương trình phân định rõ ràng giữa các hình thức: <strong>(1) Trao đổi học thuật</strong>, <strong>(2) Giảng dạy & Cố vấn</strong>, <strong>(3) Nghiên cứu khoa học</strong>, <strong>(4) Hội chẩn chuyên môn</strong> và <strong>(5) Khám chữa bệnh trực tiếp</strong>. Mọi hoạt động liên quan trực tiếp đến người bệnh chỉ được thực hiện khi đáp ứng đầy đủ điều kiện pháp lý, giấy phép hành nghề của Bộ Y tế Việt Nam, bảo mật dữ liệu y tế, có sự đồng thuận của người bệnh và tuân thủ tuyệt đối trách nhiệm chuyên môn.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
