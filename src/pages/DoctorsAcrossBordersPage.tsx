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
  Video,
  X,
  BadgeCheck
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
      titleVi: '1. Bác sĩ thỉnh giảng quốc tế',
      titleEn: '1. International Visiting Doctors',
      icon: BookOpen,
      itemsVi: ['Giảng dạy trực tiếp hoặc trực tuyến', 'Hướng dẫn thực hành lâm sàng', 'Cập nhật chuyên môn kỹ thuật mới', 'Cố vấn giảng viên và sinh viên Y khoa'],
      itemsEn: ['In-person and remote lectures', 'Clinical practice mentoring', 'Advancing medical technologies', 'Mentoring faculty & students']
    },
    {
      titleVi: '2. Trao đổi bác sĩ lâm sàng',
      titleEn: '2. Clinical Doctor Exchange',
      icon: Users,
      itemsVi: ['Chương trình quan sát chuyên môn (Observership)', 'Trao đổi bác sĩ ngắn hạn', 'Tham quan mô hình bệnh viện thông minh', 'Chia sẻ kinh nghiệm quản trị & an toàn người bệnh'],
      itemsEn: ['Observership programs', 'Short-term medical exchanges', 'Smart hospital visits', 'Patient safety best practices']
    },
    {
      titleVi: '3. Hội chẩn học thuật xuyên biên giới',
      titleEn: '3. Cross-Border Grand Rounds',
      icon: MessageSquare,
      itemsVi: ['Hội chẩn chuyên môn ca khó', 'Thảo luận ca bệnh thực tế', 'International Grand Rounds định kỳ', 'Cập nhật phác đồ điều trị tiên tiến'],
      itemsEn: ['Complex case consultations', 'Clinical discussions', 'Periodic International Grand Rounds', 'Cutting-edge clinical protocols']
    },
    {
      titleVi: '4. Nghiên cứu y học không biên giới',
      titleEn: '4. Borderless Medical Research',
      icon: FileText,
      itemsVi: ['Kết nối nhóm nghiên cứu quốc tế', 'Triển khai nghiên cứu đa trung tâm', 'Đồng hướng dẫn học viên sau đại học', 'Công bố khoa học quốc tế chung'],
      itemsEn: ['Connecting research groups', 'Multi-center clinical studies', 'Co-supervising graduates', 'Joint international papers']
    },
    {
      titleVi: '5. Bác sĩ vì sức khỏe cộng đồng',
      titleEn: '5. Community Healthcare Missions',
      icon: HeartHandshake,
      itemsVi: ['Giáo dục sức khỏe và phòng bệnh', 'Sàng lọc sức khỏe cộng đồng Bình Mỹ', 'Đào tạo kỹ năng sơ cấp cứu ngoại viện', 'Hỗ trợ y tế cho người cao tuổi & nhóm yếu thế'],
      itemsEn: ['Health literacy campaigns', 'Binh My community screenings', 'Pre-hospital first aid training', 'Support for vulnerable groups']
    },
    {
      titleVi: '6. Cố vấn phát triển dự án y tế',
      titleEn: '6. Strategic Project Advisory',
      icon: ShieldCheck,
      itemsVi: ['Cố vấn 3 dự án y tế trụ cột', 'Đồng thiết kế chương trình đào tạo nhân lực', 'Cố vấn thử nghiệm tại Living Lab', 'Định chuẩn an toàn & chất lượng quốc tế'],
      itemsEn: ['Advising 3 pillar projects', 'Workforce curriculum co-design', 'Living Lab advisory', 'International quality standards']
    }
  ];

  const specialties = ['all', 'Tim mạch', 'Lão khoa', 'Y học gia đình', 'Wellness'];

  const filteredDoctors = filterSpecialty === 'all'
    ? mockDoctorProfiles
    : mockDoctorProfiles.filter(d => d.specialty.toLowerCase().includes(filterSpecialty.toLowerCase()));

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <Stethoscope className="w-3.5 h-3.5 text-pum-orange" />
            <span>Doctors Across Borders Program</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Chương Trình Bác Sĩ Xuyên Biên Giới' : 'Doctors Across Borders Network'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Kết nối bác sĩ và chuyên gia y tế toàn cầu để chia sẻ tri thức, đào tạo nhân lực, nghiên cứu và phụng sự sức khỏe cộng đồng.'
              : 'Connecting physicians and healthcare experts worldwide to share knowledge, train talent, advance research, and serve community health.'}
          </p>
        </div>

        {/* 4 Action Buttons Bar (Rule s.md) */}
        <div className="flex flex-wrap items-center justify-center gap-3 bg-white p-4 rounded-3xl border border-slate-200/80 shadow-2xs max-w-4xl mx-auto">
          <button
            onClick={() => onOpenCollaboration('doctor', 'Tham gia mạng lưới Bác sĩ Xuyên biên giới')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-green text-white hover:bg-pum-greenAlt transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Tham gia mạng lưới bác sĩ' : 'Join Doctor Network'}
          </button>
          <button
            onClick={() => onOpenCollaboration('doctor', 'Mời chuyên gia bác sĩ quốc tế')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-pum-orange text-white hover:bg-pum-orangeHover transition-all shadow-sm active:scale-95"
          >
            {language === 'vi' ? 'Mời chuyên gia' : 'Invite Specialist'}
          </button>
          <button
            onClick={() => onOpenCollaboration('general', 'Đề xuất chương trình hội chẩn / đào tạo')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-white text-pum-green border-2 border-pum-green hover:bg-pum-lightGreen/30 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Đề xuất chương trình' : 'Propose Program'}
          </button>
          <button
            onClick={() => onOpenCollaboration('partner', 'Đăng ký tham gia hoạt động cộng đồng')}
            className="px-6 py-3 rounded-full text-xs font-bold bg-slate-100 text-slate-800 hover:bg-slate-200 transition-all active:scale-95"
          >
            {language === 'vi' ? 'Đăng ký hoạt động cộng đồng' : 'Community Activity'}
          </button>
        </div>

        {/* 7.1. CÁC CHƯƠNG TRÌNH CHÍNH (6 KHỐI) */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-black uppercase tracking-widest text-pum-green mb-1 block">
              {language === 'vi' ? 'Chương trình hành động' : 'Core Initiatives'}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              {language === 'vi' ? '6 Nhóm Chương Trình Trọng Tâm' : '6 Core Action Programs'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((p, idx) => {
              const IconComp = p.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-pum-lightGreen/40 text-pum-green flex items-center justify-center">
                        <IconComp className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-bold text-pum-orange">
                        Program 0{idx + 1}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-snug mb-4">
                      {language === 'vi' ? p.titleVi : p.titleEn}
                    </h3>

                    <ul className="space-y-2 mb-6">
                      {(language === 'vi' ? p.itemsVi : p.itemsEn).map((it, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-slate-600">
                          <CheckCircle2 className="w-4 h-4 text-pum-green flex-shrink-0 mt-0.5" />
                          <span>{it}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
                    <button
                      onClick={() => onOpenCollaboration('doctor', p.titleVi)}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-pum-green hover:text-pum-orange transition-colors"
                    >
                      <span>{language === 'vi' ? 'Đăng ký tham gia' : 'Join Program'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 7.2. HỒ SƠ CHUYÊN GIA & BÁC SĨ (MẠNG LƯỚI QUỐC TẾ) */}
        <div>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-pum-green mb-1 block">
                {language === 'vi' ? 'Danh bạ chuyên gia' : 'Specialist Directory'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                {language === 'vi' ? 'Mạng Lưới Bác Sĩ & Chuyên Gia Quốc Tế' : 'International Faculty & Physicians'}
              </h2>
            </div>

            {/* Specialty Filter */}
            <div className="flex flex-wrap gap-2">
              {specialties.map((sp) => (
                <button
                  key={sp}
                  onClick={() => setFilterSpecialty(sp)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all ${
                    filterSpecialty === sp 
                      ? 'bg-pum-green text-white shadow-2xs' 
                      : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {sp === 'all' ? (language === 'vi' ? 'Tất cả' : 'All') : sp}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDoctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-white shadow-sm flex-shrink-0">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-0 right-0 text-base leading-none">
                        {doc.flag}
                      </span>
                    </div>
                    <div>
                      <div className="flex items-center gap-1">
                        <h4 className="text-base font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-tight">
                          {doc.name}
                        </h4>
                        {doc.verified && (
                          <BadgeCheck className="w-4 h-4 text-pum-green flex-shrink-0" />
                        )}
                      </div>
                      <p className="text-xs font-semibold text-pum-orange mt-0.5">{doc.title}</p>
                      <p className="text-[11px] text-slate-500">{doc.country}</p>
                    </div>
                  </div>

                  <div className="bg-[#F8FAF9] rounded-xl p-3 mb-4 space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-pum-green">{doc.specialty}</span>
                      <span className="text-[11px] text-slate-500">{doc.degree}</span>
                    </div>
                    <p className="text-[11px] text-slate-600 line-clamp-1">{doc.organization}</p>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-3">
                    <strong className="text-slate-700">{language === 'vi' ? 'Nghiên cứu: ' : 'Focus: '}</strong>
                    {doc.researchFocus}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] text-slate-500 font-semibold">
                    {doc.languages.join(' • ')}
                  </span>
                  <button
                    onClick={() => setSelectedDoctor(doc)}
                    className="inline-flex items-center gap-1 text-xs font-bold text-pum-green hover:text-pum-orange transition-colors"
                  >
                    <span>{language === 'vi' ? 'Xem hồ sơ' : 'Profile'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 7.3. NGUYÊN TẮC HOẠT ĐỘNG & TUÂN THỦ PHÁP LÝ */}
        <div className="bg-amber-50/60 rounded-3xl p-6 sm:p-8 border border-amber-200/80 text-slate-800">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center flex-shrink-0 shadow-2xs mt-1">
              <AlertCircle className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-base font-bold text-amber-950">
                {language === 'vi' ? 'Nguyên Tắc Hoạt Động & Pháp Lý Y Tế Quốc Tế' : 'Operational Code & Legal Medical Compliance'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                {language === 'vi'
                  ? 'Website và chương trình phân định rõ ràng giữa: Trao đổi học thuật, Giảng dạy, Nghiên cứu, Hội chẩn và Khám chữa bệnh trực tiếp. Mọi hoạt động liên quan đến người bệnh đều tuân thủ đầy đủ điều kiện pháp lý, giấy phép hành nghề y tế, bảo mật dữ liệu sức khỏe, đồng thuận từ người bệnh và chịu trách nhiệm chuyên môn theo luật pháp Việt Nam & quốc tế.'
                  : 'The program strictly distinguishes between Academic Exchange, Clinical Teaching, Research, Remote Grand Rounds, and In-Person Medical Practice. All patient-related interventions fully comply with licensing regulations, health data privacy protocols, informed patient consent, and statutory liability under Vietnamese & international law.'}
              </p>
            </div>
          </div>
        </div>

        {/* Doctor Modal Details */}
        {selectedDoctor && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
              <button
                onClick={() => setSelectedDoctor(null)}
                className="absolute top-5 right-5 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 border-2 border-slate-200 flex-shrink-0">
                  <img src={selectedDoctor.avatar} alt={selectedDoctor.name} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 text-base">{selectedDoctor.flag}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900">{selectedDoctor.name}</h3>
                  <p className="text-xs font-semibold text-pum-orange">{selectedDoctor.title}</p>
                  <p className="text-xs text-slate-500">{selectedDoctor.organization} ({selectedDoctor.country})</p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-700 mb-6">
                <p><strong>{language === 'vi' ? 'Chuyên khoa: ' : 'Specialty: '}</strong>{selectedDoctor.specialty}</p>
                <p><strong>{language === 'vi' ? 'Học vị / Chứng chỉ: ' : 'Degree: '}</strong>{selectedDoctor.degree}</p>
                <p><strong>{language === 'vi' ? 'Lĩnh vực nghiên cứu: ' : 'Research Focus: '}</strong>{selectedDoctor.researchFocus}</p>
                <p><strong>{language === 'vi' ? 'Hình thức sẵn sàng hợp tác: ' : 'Collaboration Forms: '}</strong>{selectedDoctor.collaborationForms.join(', ')}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setSelectedDoctor(null)}
                  className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                >
                  {language === 'vi' ? 'Đóng' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    const name = selectedDoctor.name;
                    setSelectedDoctor(null);
                    onOpenCollaboration('doctor', `Mời chuyên gia: ${name}`);
                  }}
                  className="px-6 py-2.5 rounded-full bg-pum-orange hover:bg-pum-orangeHover text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-2"
                >
                  <Video className="w-4 h-4" />
                  <span>{language === 'vi' ? 'Kết nối / Mời hội chẩn' : 'Connect / Invite'}</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
