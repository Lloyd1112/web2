import { BrandFrameworkData } from '../types';

export interface ActivityFieldItem {
  id: string;
  number: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  themeColor: 'green' | 'blue' | 'amber' | 'purple' | 'teal';
  icon: string;
  pageId: string;
}

export const mockActivityFieldsData: ActivityFieldItem[] = [
  {
    id: 'health-models',
    number: '01',
    title: 'Ba mô hình y tế',
    titleEn: '3 Healthcare Models',
    description: 'Y tế cộng đồng; Chăm sóc người cao tuổi; Health and Wellness; Kết hợp y tế – du lịch – nông nghiệp.',
    descriptionEn: 'Community Health; Elderly Care; Health & Wellness; Integrating Healthcare – Tourism – Agriculture.',
    themeColor: 'green',
    icon: 'HeartHandshake',
    pageId: 'health-models'
  },
  {
    id: 'training',
    number: '02',
    title: 'Đào tạo nhân lực y tế',
    titleEn: 'Workforce Training',
    description: 'Chương trình đào tạo, thực hành Living Lab, đào tạo theo đặt hàng, đào tạo quốc tế.',
    descriptionEn: 'Training programs, Living Lab practice, customized on-demand training, international certification.',
    themeColor: 'blue',
    icon: 'GraduationCap',
    pageId: 'training'
  },
  {
    id: 'consulting',
    number: '03',
    title: 'Tư vấn phát triển dự án',
    titleEn: 'Project Consulting',
    description: 'Tư vấn 3 dự án y tế trụ cột và 12 mô hình kinh tế phụ trợ.',
    descriptionEn: 'Consulting 3 pillar healthcare projects and 12 auxiliary economic models.',
    themeColor: 'amber',
    icon: 'Lightbulb',
    pageId: 'consulting'
  },
  {
    id: 'international',
    number: '04',
    title: 'Hợp tác quốc tế',
    titleEn: 'Intl Cooperation',
    description: 'Hợp tác đào tạo, nghiên cứu, trao đổi học thuật, chuyên gia và bác sĩ quốc tế.',
    descriptionEn: 'Training partnerships, joint research, academic exchange, international faculty and physicians.',
    themeColor: 'purple',
    icon: 'Globe',
    pageId: 'international'
  },
  {
    id: 'doctors',
    number: '05',
    title: 'Bác sĩ xuyên biên giới',
    titleEn: 'Doctors Across Borders',
    description: 'Trao đổi bác sĩ, giảng dạy, nghiên cứu, hội chẩn, chuyển giao kỹ thuật và hoạt động cộng đồng.',
    descriptionEn: 'Physician exchange, clinical teaching, research, tele-consultation, and community healthcare missions.',
    themeColor: 'teal',
    icon: 'Stethoscope',
    pageId: 'doctors'
  }
];

export const mockStatsData = [
  {
    id: 'partners',
    labelVi: 'Đối tác trong nước & quốc tế',
    labelEn: 'Domestic & Intl Partners',
    value: '+100',
    colorTheme: 'emerald'
  },
  {
    id: 'programs',
    labelVi: 'Chương trình đào tạo',
    labelEn: 'Training Programs',
    value: '+50',
    colorTheme: 'blue'
  },
  {
    id: 'doctors',
    labelVi: 'Bác sĩ, chuyên gia tham gia',
    labelEn: 'Doctors & Experts Joined',
    value: '+500',
    colorTheme: 'purple'
  },
  {
    id: 'projects',
    labelVi: 'Dự án được tư vấn',
    labelEn: 'Consulted Projects',
    value: '+30',
    colorTheme: 'sky'
  },
  {
    id: 'research',
    labelVi: 'Hội thảo & đề tài nghiên cứu',
    labelEn: 'Seminars & Research',
    value: '+20',
    colorTheme: 'teal'
  },
  {
    id: 'beneficiaries',
    labelVi: 'Người dân được hưởng lợi',
    labelEn: 'Community Beneficiaries',
    value: '+10.000',
    colorTheme: 'cyan'
  }
];

export const mockEventsData = [
  {
    id: 'e1',
    day: '15',
    monthVi: 'Tháng 5',
    monthEn: 'May',
    titleVi: 'Khóa đào tạo mới: Quản lý y tế cộng đồng',
    titleEn: 'New Course: Community Healthcare Management',
    categoryVi: 'Đào tạo',
    categoryEn: 'Training',
    time: '08:30 - 16:30',
    locationVi: 'Hội trường Living Lab Bình Mỹ',
    locationEn: 'Binh My Living Lab Auditorium',
    descriptionVi: 'Khóa học cung cấp kiến thức nền tảng và kỹ năng quản lý trạm y tế, trung tâm sức khỏe cộng đồng trong thời đại số.',
    descriptionEn: 'Fundamental principles and management tools for modern community health centers and digital health.'
  },
  {
    id: 'e2',
    day: '22',
    monthVi: 'Tháng 5',
    monthEn: 'May',
    titleVi: 'Hội thảo chuyên môn: Chăm sóc người cao tuổi',
    titleEn: 'Clinical Seminar: Advanced Elderly Care',
    categoryVi: 'Hội thảo',
    categoryEn: 'Seminar',
    time: '13:30 - 17:00',
    locationVi: 'Trực tiếp & Trực tuyến Zoom Quốc tế',
    locationEn: 'Hybrid: Living Lab & Global Zoom',
    descriptionVi: 'Chia sẻ các mô hình chăm sóc lão khoa tiên tiến từ Nhật Bản và giải pháp ứng dụng phù hợp tại Việt Nam.',
    descriptionEn: 'Sharing advanced geriatric care practices from Japan and application in Vietnam.'
  },
  {
    id: 'e3',
    day: '05',
    monthVi: 'Tháng 6',
    monthEn: 'Jun',
    titleVi: 'Chương trình trao đổi bác sĩ quốc tế',
    titleEn: 'International Physician Exchange Program',
    categoryVi: 'Hợp tác quốc tế',
    categoryEn: 'Intl Exchange',
    time: '09:00 - 11:30',
    locationVi: 'Phòng Hội chẩn Xuyên biên giới',
    locationEn: 'Cross-Border Consultation Suite',
    descriptionVi: 'Đoàn giáo sư, bác sĩ lâm sàng từ Trường Y Harvard và Đại học Y Đài Loan làm việc tại Campus Bình Mỹ.',
    descriptionEn: 'Visiting clinical faculty from leading international medical schools collaborating at Campus.'
  },
  {
    id: 'e4',
    day: '12',
    monthVi: 'Tháng 6',
    monthEn: 'Jun',
    titleVi: 'Lời mời hợp tác nghiên cứu dinh dưỡng & dược liệu',
    titleEn: 'Call for Joint Research: Medical Nutrition & Herbs',
    categoryVi: 'Nghiên cứu',
    categoryEn: 'Research',
    time: '08:00 - 17:00',
    locationVi: 'Viện Nghiên cứu Nông nghiệp Sức khỏe',
    locationEn: 'Health Agriculture Research Institute',
    descriptionVi: 'Kêu gọi các nhóm nghiên cứu đề xuất đề tài khai thác thảo dược bản địa OCOP phục vụ hỗ trợ điều trị bệnh mãn tính.',
    descriptionEn: 'Inviting research proposals exploring native medicinal herbs and nutritional interventions.'
  },
  {
    id: 'e5',
    day: '20',
    monthVi: 'Tháng 6',
    monthEn: 'Jun',
    titleVi: 'Hoạt động chăm sóc sức khỏe cộng đồng',
    titleEn: 'Community Health Screening & Care Mission',
    categoryVi: 'Cộng đồng',
    categoryEn: 'Community',
    time: '07:30 - 12:00',
    locationVi: 'Khu dân cư Xã Bình Mỹ, Củ Chi',
    locationEn: 'Binh My Commune, Cu Chi District',
    descriptionVi: 'Chương trình khám sàng lọc miễn phí, tầm soát tăng huyết áp, đái tháo đường và phát thuốc cho người cao tuổi.',
    descriptionEn: 'Free cardiovascular screening, diabetes check-ups and medical supplies for local elderly.'
  }
];

export const mockPartnersData = [
  {
    id: 'p1',
    nameVi: 'ĐẠI HỌC CÔNG NGHỆ TP.HCM',
    nameEn: 'HUTECH UNIVERSITY',
    category: 'university',
    iconColor: 'text-blue-600',
    svgType: 'hutech',
    logoUrl: '/hutech-partner-logo.png'
  },
  {
    id: 'p2',
    nameVi: 'BỆNH VIỆN BẠCH MAI',
    nameEn: 'BACH MAI HOSPITAL',
    category: 'hospital',
    iconColor: 'text-emerald-700',
    svgType: 'cross'
  },
  {
    id: 'p3',
    nameVi: 'VIỆN PASTEUR',
    subVi: 'TP. HỒ CHÍ MINH',
    nameEn: 'PASTEUR INSTITUTE',
    subEn: 'HO CHI MINH CITY',
    category: 'institute',
    iconColor: 'text-blue-700',
    svgType: 'heart'
  },
  {
    id: 'p4',
    nameVi: 'VINGROUP',
    nameEn: 'VINGROUP',
    category: 'enterprise',
    iconColor: 'text-red-600',
    svgType: 'flame'
  },
  {
    id: 'p5',
    nameVi: 'BỘ Y TẾ',
    nameEn: 'MINISTRY OF HEALTH',
    category: 'government',
    iconColor: 'text-blue-900',
    svgType: 'crest'
  },
  {
    id: 'p6',
    nameVi: 'World Health Organization',
    subVi: 'Tổ chức Y tế Thế giới',
    nameEn: 'World Health Organization',
    subEn: 'WHO Representative Office',
    category: 'international',
    iconColor: 'text-sky-600',
    svgType: 'who'
  }
];

export const mockPartners = mockPartnersData;

export const mockHealthModels = [
  {
    id: 'community-health',
    number: '01',
    title: 'Trung tâm Y tế cộng đồng và Living Lab',
    tagline: 'Sàng lọc, quản lý sức khỏe ban đầu & không gian thực nghiệm giải pháp y tế số',
    description: 'Mô hình tiên phong kết nối trạm y tế cơ sở với các công nghệ xét nghiệm nhanh, telehealth và hồ sơ sức khỏe điện tử. Là nơi sinh viên và bác sĩ trẻ trực tiếp thực hành trên các ca bệnh thực tế.',
    functions: [
      'Sàng lọc, tư vấn và quản lý sức khỏe cộng đồng toàn diện.',
      'Y tế học đường và chăm sóc sức khỏe ban đầu cho thanh thiếu niên.',
      'Thực hành, nghiên cứu và thử nghiệm giải pháp y tế (Living Lab).',
      'Telehealth hội chẩn từ xa trong phạm vi chuyên môn được phép.',
      'Đào tạo điều dưỡng, kỹ thuật viên và quản trị cơ sở y tế.'
    ],
    connections: [
      'Kiểm tra sức khỏe cho các chương trình nghỉ dưỡng Wellness.',
      'Nghiên cứu dinh dưỡng ứng dụng từ nguồn nông sản địa phương.',
      'Theo dõi sức khỏe định kỳ cho cộng đồng và người lao động nông nghiệp.'
    ],
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mô hình Trụ cột 1'
  },
  {
    id: 'elderly-care',
    number: '02',
    title: 'Trung tâm Chăm sóc người cao tuổi',
    tagline: 'Chăm sóc lão khoa toàn diện, phục hồi chức năng và kết hợp vườn trị liệu tự nhiên',
    description: 'Không gian chăm sóc ban ngày và bán trú hiện đại, kết hợp y học phục hồi, chế độ dinh dưỡng cá nhân hóa và các hoạt động văn hóa tinh thần giúp người cao tuổi sống vui, sống khỏe.',
    functions: [
      'Chăm sóc ban ngày (Daycare) và chăm sóc tại nhà (Homecare).',
      'Phục hồi chức năng, vật lý trị liệu và vận động dưỡng sinh.',
      'Tư vấn dinh dưỡng chuyên biệt cho bệnh lý người cao tuổi.',
      'Tư vấn tâm lý và hỗ trợ kiến thức y tế cho gia đình.',
      'Đào tạo điều dưỡng lão khoa và chăm sóc viên chuyên nghiệp.'
    ],
    connections: [
      'Du lịch nghỉ dưỡng phục hồi sức khỏe dành cho người cao tuổi.',
      'Vườn trị liệu (Therapeutic Garden) và vận động ngoài trời giữa thiên nhiên.',
      'Thực phẩm sạch hữu cơ và chế độ ăn dưỡng sinh từ nông nghiệp Bình Mỹ.',
      'Chương trình sống khỏe, sống vui và kết nối đa thế hệ sinh viên – người già.'
    ],
    image: 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mô hình Trụ cột 2'
  },
  {
    id: 'health-wellness',
    number: '03',
    title: 'Trung tâm Health and Wellness',
    tagline: 'Hệ sinh thái Wellness Farm, nghỉ dưỡng phục hồi kết hợp nông nghiệp dược liệu',
    description: 'Khu tổ hợp chăm sóc sức khỏe chủ động kết hợp giữa cảnh quan thiên nhiên xanh mát, các liệu trình thanh lọc cơ thể, trải nghiệm nông nghiệp hữu cơ và sản phẩm thảo dược OCOP.',
    functions: [
      'Wellness Farm và trung tâm nghỉ dưỡng phục hồi thể chất & tâm trí.',
      'Các liệu trình dinh dưỡng Detox, yoga, thiền và vận động trị liệu.',
      'Chương trình quản lý lối sống lành mạnh và phòng ngừa bệnh mãn tính.',
      'Đào tạo nhân lực quản trị du lịch y tế và dịch vụ Wellness chuyên nghiệp.',
      'Nghiên cứu & phát triển sản phẩm thảo dược chăm sóc sức khỏe.'
    ],
    connections: [
      'Farmstay và du lịch nông nghiệp sinh thái trải nghiệm cuối tuần.',
      'Trải nghiệm thực tế: tự tay trồng, thu hoạch và chế biến thảo dược/thực phẩm sạch.',
      'Phát triển chuỗi sản phẩm OCOP Bình Mỹ Xanh và quà tặng sức khỏe.',
      'Chương trình nghỉ dưỡng xanh cuối tuần dành cho gia đình và chuyên gia.'
    ],
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1200&q=80',
    badge: 'Mô hình Trụ cột 3'
  }
];

export const mockTrainingPrograms = [
  {
    id: 'p-specialized',
    category: 'specialized',
    categoryName: 'Đào tạo chuyên môn',
    duration: '3 - 6 tháng',
    level: 'Chứng chỉ hành nghề / Thực hành',
    icon: 'Stethoscope',
    items: [
      'Điều dưỡng cộng đồng và chăm sóc ban đầu',
      'Chăm sóc người cao tuổi chuyên sâu',
      'Phục hồi chức năng và vật lý trị liệu',
      'Kỹ năng sơ cấp cứu và cấp cứu ngoại viện',
      'Kiểm soát nhiễm khuẩn trong cơ sở y tế',
      'An toàn người bệnh và quản lý rủi ro',
      'Dinh dưỡng lâm sàng & dinh dưỡng cộng đồng',
      'Kỹ thuật viên xét nghiệm và y học thực hành'
    ]
  },
  {
    id: 'p-management',
    category: 'management',
    categoryName: 'Đào tạo quản trị và dịch vụ',
    duration: '2 - 4 tháng',
    level: 'Quản lý / Executive',
    icon: 'Briefcase',
    items: [
      'Quản trị cơ sở y tế và phòng khám thông minh',
      'Kỹ năng giao tiếp và tư vấn y khoa chuyên nghiệp',
      'Chăm sóc khách hàng và giải quyết phàn nàn y tế',
      'Quản lý trải nghiệm người bệnh (Patient Experience)',
      'Quản trị cơ sở Health & Wellness Farm'
    ]
  },
  {
    id: 'p-tech',
    category: 'technology',
    categoryName: 'Đào tạo công nghệ y tế',
    duration: '1 - 3 tháng',
    level: 'Ứng dụng thực tế',
    icon: 'Cpu',
    items: [
      'Quản trị hồ sơ sức khỏe điện tử (EMR/EHR)',
      'Y tế số (Digital Health) và quy trình khám Telehealth',
      'Quản trị và phân tích dữ liệu y tế cộng đồng',
      'Bảo mật thông tin và an toàn dữ liệu sức khỏe',
      'Ứng dụng Trí tuệ nhân tạo (AI) phù hợp trong chẩn đoán sơ bộ'
    ]
  },
  {
    id: 'p-lang',
    category: 'language',
    categoryName: 'Ngoại ngữ và hội nhập y khoa',
    duration: '6 - 12 tháng',
    level: 'Chuẩn quốc tế',
    icon: 'Languages',
    items: [
      'Tiếng Anh y khoa chuẩn quốc tế (OET/IELTS Y khoa)',
      'Tiếng Nhật chuyên ngành điều dưỡng & chăm sóc lão khoa (N3/N2)',
      'Kỹ năng giao tiếp đa văn hóa trong môi trường y tế',
      'Kỹ năng làm việc và hội chẩn trong môi trường quốc tế'
    ]
  },
  {
    id: 'p-innov',
    category: 'innovation',
    categoryName: 'Đổi mới sáng tạo & Khởi nghiệp',
    duration: '2 - 3 tháng',
    level: 'Vườn ươm / Living Lab',
    icon: 'Sparkles',
    items: [
      'Tư duy thiết kế (Design Thinking) trong giải quyết bài toán y tế',
      'Thiết kế dịch vụ y tế và trải nghiệm chăm sóc sức khỏe',
      'Quản trị dự án đổi mới sáng tạo trong y tế',
      'Khởi nghiệp trong lĩnh vực Y tế & Wellness',
      'Phương pháp đo lường và đánh giá tác động xã hội (SROI)'
    ]
  }
];

export const mockTargetAudiences = [
  {
    id: 't1',
    title: 'Sinh viên Y Dược & Y tế công cộng',
    desc: 'Thực hành lâm sàng trên bài toán thực tế tại Living Lab, phát triển kỹ năng mềm và cơ hội nhận học bổng quốc tế.',
    icon: 'GraduationCap'
  },
  {
    id: 't2',
    title: 'Điều dưỡng & Kỹ thuật viên',
    desc: 'Nâng cao tay nghề chăm sóc chuyên khoa, cập nhật công nghệ y tế số và chuẩn bị chứng chỉ làm việc quốc tế.',
    icon: 'HeartPulse'
  },
  {
    id: 't3',
    title: 'Nhân viên cơ sở y tế & Trạm y tế',
    desc: 'Được chuẩn hóa quy trình giao tiếp, an toàn người bệnh, quản lý dữ liệu và tiếp cận giải pháp telehealth.',
    icon: 'Building2'
  },
  {
    id: 't4',
    title: 'Nhân sự Chăm sóc Người cao tuổi',
    desc: 'Được đào tạo bài bản theo quy chuẩn lão khoa hiện đại từ các chuyên gia Nhật Bản và quốc tế.',
    icon: 'UserCheck'
  },
  {
    id: 't5',
    title: 'Nhân sự Du lịch & Wellness',
    desc: 'Hiểu rõ kiến thức trị liệu, dưỡng sinh, quản lý Farmstay và thiết kế gói dịch vụ nghỉ dưỡng sức khỏe.',
    icon: 'Palmtree'
  },
  {
    id: 't6',
    title: 'Doanh nghiệp đặt hàng nhân lực',
    desc: 'Cùng thiết kế chương trình theo đúng vị trí tuyển dụng, tiếp cận nguồn nhân lực chất lượng cao sẵn sàng làm việc.',
    icon: 'Target'
  },
  {
    id: 't7',
    title: 'Người dân chuyển đổi nghề nghiệp',
    desc: 'Các khóa đào tạo ngắn hạn cấp chứng chỉ hỗ trợ bà con địa phương tham gia chuỗi cung ứng dịch vụ chăm sóc.',
    icon: 'Users'
  }
];

export const mockConsultingPackages: string[] = [
  '1. Khảo sát nhu cầu thực tế và xác định bài toán y tế địa phương.',
  '2. Thiết kế mô hình hoạt động chi tiết (Operating Model).',
  '3. Nghiên cứu tiền khả thi và khả thi tài chính/kỹ thuật.',
  '4. Thiết kế dịch vụ và hành trình trải nghiệm người bệnh/khách hàng.',
  '5. Xây dựng mô hình tài chính và phương án thu hồi vốn bền vững.',
  '6. Thiết lập cơ chế hợp tác công - tư (PPP) và liên kết đa bên.',
  '7. Kết nối mạng lưới chuyên gia cố vấn và đối tác chiến lược.',
  '8. Thiết kế chương trình đào tạo và chuyển giao năng lực nhân sự.',
  '9. Triển khai thí điểm tại Living Lab và đo lường kết quả thực tế.',
  '10. Chuẩn hóa quy trình và hoàn thiện mô hình để nhân rộng quy mô.'
];

export const mockEconomicGroups = [
  {
    groupName: '1. Nông nghiệp và chuỗi cung ứng',
    color: 'emerald',
    models: [
      {
        title: 'Hợp tác xã vùng nguyên liệu dược liệu',
        description: 'Quy hoạch vùng trồng thảo dược sạch chuẩn GACP-WHO, liên kết các hộ nông dân Bình Mỹ.'
      },
      {
        title: 'Nông nghiệp thông minh – tuần hoàn',
        description: 'Ứng dụng IoT giám sát độ ẩm, phân bón hữu cơ và tái sử dụng phụ phẩm nông nghiệp bền vững.'
      },
      {
        title: 'Trung tâm sơ chế & Logistics nông sản',
        description: 'Hạ tầng bảo quản lạnh, đóng gói theo chuẩn vệ sinh an toàn thực phẩm phục vụ chuỗi cung ứng y tế & wellness.'
      }
    ]
  },
  {
    groupName: '2. Sản phẩm và thị trường',
    color: 'amber',
    models: [
      {
        title: 'Thương hiệu OCOP Bình Mỹ Xanh',
        description: 'Chứng nhận và nâng tầm các sản phẩm trà thảo mộc, tinh dầu, thực phẩm bổ dưỡng địa phương.'
      },
      {
        title: 'Sàn phân phối nông sản sức khỏe',
        description: 'Kênh thương mại điện tử và chuỗi cửa hàng kết nối trực tiếp nhà vườn với bệnh viện, resort và người tiêu dùng.'
      },
      {
        title: 'Quỹ nội bộ chuỗi giá trị',
        description: 'Cơ chế hỗ trợ vốn vay vi mô và bảo hiểm mùa vụ cho các thành viên hợp tác xã tham gia dự án.'
      }
    ]
  },
  {
    groupName: '3. Du lịch và kinh tế sáng tạo',
    color: 'blue',
    models: [
      {
        title: 'Du lịch nông nghiệp sinh thái',
        description: 'Tuyến tham quan trải nghiệm miệt vườn sông nước, thưởng thức ẩm thực thực dưỡng bản địa.'
      },
      {
        title: 'Edu Farm – Wellness Farm – Weekend Farm',
        description: 'Không gian học tập ngoài trời cho học sinh sinh viên kết hợp kỳ nghỉ phục hồi sức khỏe cho gia đình.'
      },
      {
        title: 'Kinh tế sáng tạo & Không gian trải nghiệm',
        description: 'Tổ chức các workshop làm nến thơm, xà phòng thảo mộc, trà đạo và giao lưu nghệ thuật truyền thống.'
      },
      {
        title: 'Cảnh quan và bảo tồn văn hóa làng nghề',
        description: 'Tôn tạo cảnh quan sông nước Bình Mỹ gắn liền với các làng nghề đan lát, gốm sứ truyền thống.'
      }
    ]
  },
  {
    groupName: '4. Đào tạo và đổi mới',
    color: 'purple',
    models: [
      {
        title: 'Tổ khuyến nông & Trung tâm thực hành',
        description: 'Chuyển giao kỹ thuật canh tác sạch cho nông dân và điểm thực tập cho sinh viên khối ngành sinh học/nông nghiệp.'
      },
      {
        title: 'Living Lab Bình Mỹ',
        description: 'Không gian thử nghiệm mở cho các startup y tế số, nông nghiệp công nghệ cao cùng kiểm thử sản phẩm.'
      }
    ]
  }
];

export const mockBrandFramework: BrandFrameworkData = {
  title: 'Hệ Thống Chiến Lược Thương Hiệu & Sản Phẩm Trải Nghiệm Bình Mỹ',
  description: 'Mô hình chuyển hóa giá trị từ 3 trụ cột phát triển thành 3 không gian trải nghiệm bản địa đặc sắc, cùng hợp lưu kiến tạo nên Sản Phẩm Trải Nghiệm Bình Mỹ độc bản.',
  branches: [
    {
      id: 'health',
      pillar: 'Y tế – sức khỏe',
      pillarIcon: 'HeartPulse',
      pillarDesc: 'Nền tảng y học cộng đồng, khám tầm soát sớm, dưỡng sinh phục hồi và Living Lab y tế số.',
      experience: 'Trải nghiệm sức khỏe xanh',
      experienceDesc: 'Chăm sóc sức khỏe toàn diện, hòa mình vào không gian sinh thái an lành và tái tạo năng lượng thể chất – tâm hồn.',
      color: 'emerald',
      bgLight: 'bg-emerald-50/70',
      borderLight: 'border-emerald-200',
      badgeColor: 'text-emerald-700 bg-emerald-100',
      items: [
        'Gói khám tầm soát sức khỏe ban đầu & tư vấn chế độ dinh dưỡng, lối sống xanh cá nhân hóa.',
        'Liệu trình y học cổ truyền, phục hồi chức năng và chăm sóc người cao tuổi bán trú (Daycare).',
        'Trải nghiệm phòng khám Telehealth thông minh và trạm đo sinh hiệu số tự động tại Living Lab.'
      ]
    },
    {
      id: 'culture',
      pillar: 'Văn hóa – sáng tạo',
      pillarIcon: 'Sparkles',
      pillarDesc: 'Khai phóng tinh thần đổi mới của sinh viên, tôn vinh truyền thống nghĩa tình và văn hóa đất thép ven sông.',
      experience: 'Câu chuyện và bản sắc địa phương',
      experienceDesc: 'Khám phá và lan tỏa hồn cốt Bình Mỹ thông qua nghệ thuật kể chuyện thương hiệu, workshop thủ công và giao lưu cộng đồng.',
      color: 'amber',
      bgLight: 'bg-amber-50/70',
      borderLight: 'border-amber-200',
      badgeColor: 'text-amber-700 bg-amber-100',
      items: [
        'Xây dựng câu chuyện thương hiệu (Brand Storytelling) gắn với lịch sử, con người và vùng đất Bình Mỹ.',
        'Workshop sáng tạo: Làm xà phòng thảo dược, nến thơm tinh dầu OCOP và sản phẩm đan lát truyền thống.',
        'Không gian văn hóa nghệ thuật mở, diễn đàn giao lưu giữa chuyên gia, sinh viên và cư dân địa phương.'
      ]
    },
    {
      id: 'tourism',
      pillar: 'Du lịch xanh',
      pillarIcon: 'Palmtree',
      pillarDesc: 'Khai thác du lịch sinh thái nông nghiệp tuần hoàn, giữ gìn bầu không khí trong lành và cảnh quan sông nước hữu tình.',
      experience: 'Nông nghiệp và thiên nhiên',
      experienceDesc: 'Trải nghiệm cuộc sống thuần nông nguyên bản, tự tay gieo trồng thảo dược sạch và thưởng thức ẩm thực thực dưỡng bản địa.',
      color: 'sky',
      bgLight: 'bg-sky-50/70',
      borderLight: 'border-sky-200',
      badgeColor: 'text-sky-700 bg-sky-100',
      items: [
        'Tuyến du lịch nông nghiệp sinh thái miệt vườn ven sông Sài Gòn, trải nghiệm thuyền đạp và câu cá thư giãn.',
        'Mô hình Edu Farm & Wellness Farm: Tham quan vườn dược liệu chuẩn GACP-WHO, học cách nhận biết cây thuốc Nam.',
        'Không gian thiền trà dưỡng tâm, yoga đón bình minh và thưởng thức các món ăn thực dưỡng hữu cơ miệt vườn.'
      ]
    }
  ],
  targetProduct: {
    title: 'Sản phẩm trải nghiệm Bình Mỹ',
    tagline: 'Điểm hội tụ giá trị thương hiệu – Chuỗi sản phẩm & dịch vụ trải nghiệm độc bản',
    description: 'Kết tinh từ Y tế xanh, Bản sắc văn hóa và Nông nghiệp sinh thái để tạo nên những gói sản phẩm trải nghiệm hoàn chỉnh, mang lại giá trị bền vững cho người thụ hưởng và nâng tầm thương hiệu địa phương.',
    offerings: [
      {
        title: 'Kỳ nghỉ Dưỡng sinh & Tái tạo năng lượng Bình Mỹ (1–3 ngày)',
        desc: 'Hành trình trọn gói: Khám sàng lọc sức khỏe + Liệu trình dưỡng sinh phục hồi + Ẩm thực thực dưỡng hữu cơ + Thiền trà thư giãn ven sông.',
        badge: 'Gói trải nghiệm cốt lõi'
      },
      {
        title: 'Hệ sinh thái Quà tặng & Dược liệu OCOP Bình Mỹ Xanh',
        desc: 'Bộ sản phẩm trà thảo mộc, tinh dầu nguyên chất, cao dược liệu được chứng nhận an toàn, chuẩn hóa nhận diện và truy xuất nguồn gốc.',
        badge: 'Sản phẩm OCOP bản địa'
      },
      {
        title: 'Hành trình Giáo dục & Trải nghiệm Living Lab (Edu Farm)',
        desc: 'Chương trình thực địa mở dành cho học sinh, sinh viên, startup và gia đình cùng học tập, nghiên cứu và sáng tạo sản phẩm xanh.',
        badge: 'Giáo dục & Đổi mới sáng tạo'
      },
      {
        title: 'Chuyển giao nhượng quyền "Trạm Trải Nghiệm Sức Khỏe Xanh"',
        desc: 'Bộ cẩm nang SOP toàn diện về quy trình đón tiếp, công nghệ y tế và quy chuẩn vận hành thương hiệu để nhân rộng tới các đối tác.',
        badge: 'Nhượng quyền & Chuyển giao'
      }
    ]
  }
};

export const mockBrandOperationGroups = [
  {
    groupName: '1. Định vị & Hệ thống nhận diện thương hiệu',
    badge: 'Chiến lược & Bản sắc',
    color: 'amber',
    models: [
      {
        title: 'Chiến lược định vị thương hiệu y tế & wellness',
        description: 'Xác lập tầm nhìn, sứ mệnh, giá trị cốt lõi và phong cách truyền thông (Tone of Voice) gắn liền bản sắc Làng Sinh Viên Bình Mỹ.'
      },
      {
        title: 'Hệ thống nhận diện thương hiệu chuẩn (Brand Guidelines)',
        description: 'Thiết kế logo, hệ màu chuẩn, typography, ấn phẩm truyền thông, bao bì dược liệu OCOP và biển bảng định vị không gian.'
      },
      {
        title: 'Kiến tạo câu chuyện thương hiệu (Brand Storytelling)',
        description: 'Biên soạn câu chuyện truyền cảm hứng kết nối y học nhân văn, du lịch sinh thái bản địa và tinh thần đổi mới sáng tạo.'
      }
    ]
  },
  {
    groupName: '2. Quản trị trải nghiệm điểm chạm & Dịch vụ',
    badge: 'Trải nghiệm khách hàng',
    color: 'emerald',
    models: [
      {
        title: 'Hành trình trải nghiệm dịch vụ (Customer Journey & CX)',
        description: 'Thiết kế chuẩn hóa quy trình đón tiếp, khám chữa bệnh, nghỉ dưỡng trị liệu và chăm sóc hậu mãi cho khách hàng.'
      },
      {
        title: 'Bộ tiêu chuẩn dịch vụ khách hàng (Service Blueprint & SOP)',
        description: 'Quy chuẩn tác phong, trang phục, kỹ năng giao tiếp và ứng xử chuyên nghiệp cho toàn bộ đội ngũ nhân sự y tế & dịch vụ.'
      },
      {
        title: 'Đo lường & Cải tiến sự hài lòng thời gian thực (CSAT & NPS)',
        description: 'Thiết lập hệ thống khảo sát số tự động, lắng nghe ý kiến cộng đồng và liên tục nâng cấp chất lượng điểm chạm thương hiệu.'
      }
    ]
  },
  {
    groupName: '3. Khai thác truyền thông số & Đa kênh',
    badge: 'Khai thác số hóa',
    color: 'blue',
    models: [
      {
        title: 'Vận hành hệ thống truyền thông số tích hợp (Omnichannel Hub)',
        description: 'Quản trị và phát triển nội dung chuyên sâu trên Cổng thông tin, Mạng xã hội, Bản tin y tế và các kênh video trực quan.'
      },
      {
        title: 'Chiến dịch truyền thông sức khỏe cộng đồng & OCOP',
        description: 'Tổ chức các tuần lễ khám tầm soát, hội thảo chuyên gia, livestream tư vấn sức khỏe và kích cầu sản phẩm thảo dược xanh.'
      },
      {
        title: 'Quan hệ công chúng & Quản trị danh tiếng y khoa (PR & Media)',
        description: 'Kết nối mạng lưới báo chí uy tín, truyền thông chính sách, xây dựng hình ảnh chuyên gia và kiểm soát rủi ro thông tin.'
      }
    ]
  },
  {
    groupName: '4. Nhượng quyền, Bảo hộ tài sản & Phát triển hệ sinh thái',
    badge: 'Bảo hộ & Mở rộng',
    color: 'purple',
    models: [
      {
        title: 'Bảo hộ sở hữu trí tuệ & Nhãn hiệu độc quyền (IP Protection)',
        description: 'Đăng ký bản quyền nhãn hiệu, kiểu dáng bao bì, chỉ dẫn địa lý và tài sản sở hữu trí tuệ công nghệ trong hệ sinh thái.'
      },
      {
        title: 'Cẩm nang nhượng quyền & Chuyển giao mô hình (Franchise Toolkit)',
        description: 'Đóng gói toàn bộ tài liệu quy trình, tiêu chuẩn vận hành và hỗ trợ setup mô hình cho các đơn vị liên kết, trạm vệ tinh.'
      },
      {
        title: 'Kiểm toán thương hiệu & Đảm bảo tính nhất quán (Brand Audit)',
        description: 'Định kỳ đánh giá mức độ tuân thủ quy chuẩn thương hiệu trên toàn chuỗi điểm dịch vụ và đối tác thành viên.'
      }
    ]
  }
];

export const mockDoctorProfiles = [
  {
    id: 'doc-1',
    name: 'GS. TS. Bác sĩ David Miller',
    title: 'Giáo sư Y khoa Lâm sàng',
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=600&q=80',
    specialty: 'Tim mạch can thiệp & Y tế cộng đồng',
    country: 'Hoa Kỳ',
    flag: '🇺🇸',
    organization: 'Bệnh viện Đa khoa Massachusetts / Harvard Medical School',
    degree: 'MD, PhD - Harvard University',
    researchFocus: 'Ứng dụng AI trong tầm soát sớm bệnh tim mạch cộng đồng & Quản lý tăng huyết áp vùng nông thôn.',
    languages: ['Tiếng Anh', 'Tiếng Pháp'],
    collaborationForms: ['Giảng dạy thỉnh giảng', 'Hội chẩn quốc tế', 'Đồng nghiên cứu'],
    verified: true
  },
  {
    id: 'doc-2',
    name: 'PGS. TS. BS. Kenji Tanaka',
    title: 'Chuyên gia Trưởng Lão khoa',
    avatar: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=600&q=80',
    specialty: 'Lão khoa & Phục hồi chức năng',
    country: 'Nhật Bản',
    flag: '🇯🇵',
    organization: 'Trung tâm Quốc gia về Lão khoa và Lão suy (NCGG Japan)',
    degree: 'MD, PhD - Tokyo University',
    researchFocus: 'Mô hình chăm sóc ban ngày Daycare, liệu pháp vận động chống sa sút trí tuệ cho người cao tuổi.',
    languages: ['Tiếng Nhật', 'Tiếng Anh'],
    collaborationForms: ['Cố vấn mô hình', 'Đào tạo điều dưỡng viên', 'Hội nghị chuyên môn'],
    verified: true
  },
  {
    id: 'doc-3',
    name: 'TS. BS. Nguyễn Minh Châu',
    title: 'Trưởng bộ môn Y học gia đình',
    avatar: 'https://images.unsplash.com/photo-1594824813511-2e622b311746?auto=format&fit=crop&w=600&q=80',
    specialty: 'Y học gia đình & Chăm sóc ban đầu',
    country: 'Việt Nam',
    flag: '🇻🇳',
    organization: 'Đại học Y Dược TP. Hồ Chí Minh',
    degree: 'Tiến sĩ Y khoa, Bác sĩ Chuyên khoa II',
    researchFocus: 'Xây dựng mạng lưới bác sĩ gia đình và trạm y tế thông minh kết nối Living Lab tuyến cơ sở.',
    languages: ['Tiếng Việt', 'Tiếng Anh'],
    collaborationForms: ['Hướng dẫn thực hành lâm sàng', 'Hội chẩn ca bệnh', 'Khám sàng lọc cộng đồng'],
    verified: true
  },
  {
    id: 'doc-4',
    name: 'BS. CKII. Sarah Jenkins',
    title: 'Chuyên gia Y học Lối sống & Wellness',
    avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80',
    specialty: 'Health & Wellness / Dinh dưỡng trị liệu',
    country: 'Úc',
    flag: '🇦🇺',
    organization: 'Australasian Society of Lifestyle Medicine',
    degree: 'MBBS, FACLM - University of Sydney',
    researchFocus: 'Chương trình can thiệp dinh dưỡng thực vật và vận động điều trị đái tháo đường type 2.',
    languages: ['Tiếng Anh'],
    collaborationForms: ['Hội thảo trực tuyến', 'Đào tạo quản trị Wellness', 'Cố vấn thực đơn trị liệu'],
    verified: true
  }
];

export const mockNewsArticles = [
  {
    id: 'n1',
    title: 'Khai mạc tuần lễ Thực hành Living Lab Y tế cộng đồng Bình Mỹ 2025',
    date: '18/05/2025',
    category: 'Sự kiện',
    summary: 'Hơn 200 sinh viên y dược và 30 chuyên gia quốc tế đã tham gia chuỗi hoạt động khám sàng lọc và thử nghiệm trạm y tế số.',
    image: 'https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?auto=format&fit=crop&w=800&q=80',
    views: 1420
  },
  {
    id: 'n2',
    title: 'Ký kết biên bản ghi nhớ hợp tác đào tạo điều dưỡng lão khoa với các đối tác Nhật Bản',
    date: '10/05/2025',
    category: 'Hợp tác quốc tế',
    summary: 'Chương trình mở ra cơ hội thực tập hưởng lương và cấp chứng chỉ hành nghề chuẩn quốc tế cho sinh viên tại Làng.',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=800&q=80',
    views: 980
  },
  {
    id: 'n3',
    title: 'Ra mắt cụm vườn trị liệu và mô hình chăm sóc người cao tuổi bán trú tại Bình Mỹ',
    date: '02/05/2025',
    category: 'Mô hình y tế',
    summary: 'Mô hình kết hợp cây dược liệu bản địa với phương pháp vận động dưỡng sinh, nhận được sự đánh giá cao từ Bộ Y tế.',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=800&q=80',
    views: 1850
  }
];

export const mockEvents = mockEventsData;
export const mockActivityFields = mockActivityFieldsData;
export const mockStats = mockStatsData;
