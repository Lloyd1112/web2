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
    healthAspects: [
      'Sàng lọc, tư vấn và quản lý sức khỏe cộng đồng toàn diện theo vòng đời.',
      'Y tế học đường, chăm sóc ban đầu và phòng chống dịch bệnh cơ sở.',
      'Thực hành lâm sàng, nghiên cứu ứng dụng và thử nghiệm giải pháp tại Living Lab.',
      'Telehealth kết nối hội chẩn chuyên sâu với bác sĩ tuyến trên và quốc tế.'
    ],
    tourismAspects: [
      'Điểm khám sàng lọc và kiểm tra thể lực trước khi tham gia các tour du lịch nghỉ dưỡng Wellness.',
      'Tư vấn hành trình trải nghiệm chăm sóc sức khỏe, phục hồi năng lượng phù hợp với từng du khách.',
      'Trạm hỗ trợ y tế lưu động và sơ cấp cứu an toàn cho toàn bộ du khách tham quan khuôn viên.'
    ],
    agricultureAspects: [
      'Nghiên cứu dinh dưỡng lâm sàng ứng dụng từ nguồn rau củ quả, nông sản sạch địa phương.',
      'Giám sát an toàn sinh học và hỗ trợ chăm sóc sức khỏe định kỳ cho nông dân vùng nguyên liệu.',
      'Kết nối dữ liệu dinh dưỡng với chuỗi cung ứng thực phẩm sạch chuẩn nông nghiệp an toàn.'
    ],
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
    badge: 'Trụ cột Y tế Cốt lõi'
  },
  {
    id: 'elderly-care',
    number: '02',
    title: 'Trung tâm Chăm sóc người cao tuổi',
    tagline: 'Chăm sóc lão khoa toàn diện, phục hồi chức năng và kết hợp vườn trị liệu tự nhiên',
    description: 'Không gian chăm sóc ban ngày và bán trú hiện đại, kết hợp y học phục hồi, chế độ dinh dưỡng cá nhân hóa và các hoạt động văn hóa tinh thần giúp người cao tuổi sống vui, sống khỏe.',
    healthAspects: [
      'Chăm sóc y tế bán trú ban ngày (Daycare) và dịch vụ điều dưỡng tại nhà (Homecare).',
      'Vật lý trị liệu, phục hồi chức năng sau tai biến và vận động dưỡng sinh chuyên sâu.',
      'Quản lý huyết áp, đường huyết và các bệnh lý mãn tính của người cao tuổi.',
      'Đào tạo điều dưỡng lão khoa và chuyển giao kỹ năng chăm sóc cho người nhà.'
    ],
    tourismAspects: [
      'Kỳ nghỉ dưỡng phục hồi sức khỏe (Senior Wellness Retreat) ngắn ngày và dài hạn.',
      'Không gian vườn trị liệu (Therapeutic Garden) và dạo bộ ven sông đón gió lành.',
      'Chương trình sống khỏe, sống vui: Giao lưu nghệ thuật, thiền trà và kết nối sinh viên – người cao tuổi.'
    ],
    agricultureAspects: [
      'Chế độ ăn dưỡng sinh 100% hữu cơ từ nông trại sinh thái công nghệ cao Bình Mỹ.',
      'Liệu pháp làm vườn (Horticultural Therapy): Người cao tuổi tự tay chăm sóc cây cảnh, gieo hạt.',
      'Sử dụng các loại trà dược liệu và bài thuốc dân gian từ vườn thuốc Nam hữu cơ tại chỗ.'
    ],
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
    badge: 'Trụ cột Lão khoa & Dưỡng sinh'
  },
  {
    id: 'health-wellness',
    number: '03',
    title: 'Trung tâm Health and Wellness',
    tagline: 'Hệ sinh thái Wellness Farm, nghỉ dưỡng phục hồi kết hợp nông nghiệp dược liệu',
    description: 'Khu tổ hợp chăm sóc sức khỏe chủ động kết hợp giữa cảnh quan thiên nhiên xanh mát, các liệu trình thanh lọc cơ thể, trải nghiệm nông nghiệp hữu cơ và sản phẩm thảo dược OCOP.',
    healthAspects: [
      'Liệu trình thanh lọc cơ thể (Detox), kiểm soát chỉ số sức khỏe và thải độc tự nhiên.',
      'Yoga trị liệu, thiền định chánh niệm và các phương pháp tái tạo năng lượng tâm thể.',
      'Tư vấn lối sống lành mạnh phòng ngừa các bệnh rối loạn chuyển hóa và tim mạch.'
    ],
    tourismAspects: [
      'Mô hình Wellness Farmstay và bungalow nghỉ dưỡng sinh thái cao cấp ven sông Sài Gòn.',
      'Tour du lịch trải nghiệm cuối tuần: Du thuyền sông nước, câu cá thư giãn, đạp xe sinh thái.',
      'Không gian thưởng trà dưỡng sinh, ngắm hoàng hôn và thưởng thức ẩm thực thực dưỡng miệt vườn.'
    ],
    agricultureAspects: [
      'Khu nông trại thảo dược sạch chuẩn GACP-WHO: Bạc hà, sả chanh, gừng gió, hoa cúc dược liệu.',
      'Trải nghiệm thực tế: Tự tay thu hái thảo mộc, chưng cất tinh dầu và chế biến món ăn dưỡng sinh.',
      'Thương mại hóa chuỗi sản phẩm OCOP Bình Mỹ Xanh: Trà thảo dược, mật ong hoa dược liệu, nến thơm.'
    ],
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
    badge: 'Trụ cột Wellness Farm'
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
    pillar: 'agriculture',
    pillarBadgeVi: 'Trụ cột Nông nghiệp & Dược liệu',
    pillarBadgeEn: 'Agriculture & Herbal Pillar',
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
    pillar: 'agriculture',
    pillarBadgeVi: 'Trụ cột Nông nghiệp & OCOP',
    pillarBadgeEn: 'Agro-Products & OCOP Pillar',
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
    pillar: 'tourism',
    pillarBadgeVi: 'Trụ cột Du lịch & Nghỉ dưỡng',
    pillarBadgeEn: 'Tourism & Wellness Pillar',
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
    groupName: '4. Đào tạo và đổi mới y tế – sinh thái',
    pillar: 'health',
    pillarBadgeVi: 'Trụ cột Y tế & Living Lab',
    pillarBadgeEn: 'Health & Living Lab Pillar',
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
  title: 'Hệ Thống Chiến Lược 3 Trụ Cột: Y Tế – Du Lịch – Nông Nghiệp',
  description: 'Mô hình chuyển hóa giá trị từ 3 trụ cột phát triển thành 3 không gian trải nghiệm bản địa đặc sắc, cùng hợp lưu kiến tạo nên Hệ Sinh Thái Sản Phẩm Trải Nghiệm Bình Mỹ độc bản.',
  branches: [
    {
      id: 'health',
      pillar: 'Trụ cột 1: Y tế – Sức khỏe',
      pillarIcon: 'HeartPulse',
      pillarDesc: 'Nền tảng y học cộng đồng, khám tầm soát sớm, dưỡng sinh phục hồi và Living Lab y tế số.',
      experience: 'Không gian Y tế & Sức khỏe xanh',
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
      id: 'tourism',
      pillar: 'Trụ cột 2: Du lịch – Nghỉ dưỡng',
      pillarIcon: 'Palmtree',
      pillarDesc: 'Khai thác du lịch sinh thái nông nghiệp tuần hoàn, Wellness Farmstay và cảnh quan ven sông an lành.',
      experience: 'Không gian Du lịch & Nghỉ dưỡng',
      experienceDesc: 'Trải nghiệm du lịch sinh thái miệt vườn, tour nghỉ dưỡng phục hồi năng lượng và thưởng thức ẩm thực thực dưỡng bản địa.',
      color: 'sky',
      bgLight: 'bg-sky-50/70',
      borderLight: 'border-sky-200',
      badgeColor: 'text-sky-700 bg-sky-100',
      items: [
        'Tuyến du lịch nông nghiệp sinh thái miệt vườn ven sông Sài Gòn, trải nghiệm thuyền đạp và câu cá thư giãn.',
        'Mô hình Edu Farm & Wellness Farm: Kỳ nghỉ phục hồi sức khỏe, tham quan vườn dược liệu chuẩn GACP-WHO.',
        'Không gian thiền trà dưỡng tâm, yoga đón bình minh và thưởng thức các món ăn thực dưỡng hữu cơ miệt vườn.'
      ]
    },
    {
      id: 'agriculture',
      pillar: 'Trụ cột 3: Nông nghiệp – OCOP',
      pillarIcon: 'Sprout',
      pillarDesc: 'Nông nghiệp thông minh – tuần hoàn, bảo tồn dược liệu sạch và chuỗi giá trị OCOP Bình Mỹ Xanh.',
      experience: 'Không gian Nông nghiệp & Chuỗi giá trị',
      experienceDesc: 'Trải nghiệm nông nghiệp hữu cơ, tự tay thu hái thảo dược, chế biến trà dược liệu và tham gia chuỗi sản phẩm OCOP.',
      color: 'amber',
      bgLight: 'bg-amber-50/70',
      borderLight: 'border-amber-200',
      badgeColor: 'text-amber-700 bg-amber-100',
      items: [
        'Xây dựng vùng nguyên liệu dược liệu chuẩn GACP-WHO và mô hình hợp tác xã nông nghiệp hữu cơ bền vững.',
        'Quy trình chế biến nông sản sạch, tinh dầu, trà thảo dược OCOP Bình Mỹ Xanh và trạm sơ chế logistics.',
        'Workshop sinh viên và nông dân: Canh tác nông nghiệp tuần hoàn, bảo vệ đất và đa dạng sinh học ven sông.'
      ]
    }
  ],
  targetProduct: {
    title: 'Hệ Sinh Thái Sản Phẩm Trải Nghiệm Bình Mỹ',
    tagline: 'Điểm hội tụ giá trị 3 trụ cột: Y tế – Du lịch – Nông nghiệp',
    description: 'Kết tinh từ Y tế xanh, Du lịch sinh thái và Nông nghiệp tuần hoàn tạo nên chuỗi sản phẩm & dịch vụ trải nghiệm độc bản, mang lại giá trị bền vững cho người thụ hưởng và nâng tầm thương hiệu địa phương.',
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
    id: 'art-featured',
    title: 'Lễ ra mắt mô hình “Living & Startup Lab” tại Làng Sinh viên Bình Mỹ',
    date: '15 Tháng 9, 2026',
    category: 'Hoạt động',
    badgeColor: 'emerald',
    summary: 'Không gian sáng tạo dành cho sinh viên, nơi ý tưởng được ươm mầm và hiện thực hóa.',
    image: '/news-students.jpg',
    detailImage: '/startup-lab.jpg',
    caption: 'Không gian làm việc và sáng tạo tại Living & Startup Lab – Làng Sinh viên Bình Mỹ',
    views: '1.248 lượt xem',
    readTime: '4 phút',
    author: 'Ban truyền thông',
    paragraphs: [
      'Ngày 15/9/2026, Làng Sinh viên Đổi mới Sáng tạo Bình Mỹ chính thức ra mắt mô hình “Living & Startup Lab” – không gian sáng tạo, kết nối và ươm mầm các ý tưởng khởi nghiệp của sinh viên, thanh niên và cộng đồng.',
      'Sự kiện có sự tham dự của đại diện chính quyền địa phương, các chuyên gia khởi nghiệp, doanh nghiệp đối tác và đông đảo sinh viên. Đây là một trong những mô hình trọng điểm nhằm thúc đẩy tinh thần đổi mới sáng tạo, đồng thời tạo cơ hội kết nối giữa sinh viên – doanh nghiệp – nhà đầu tư.'
    ],
    highlightsTitle: 'Những điểm nổi bật trong sự kiện',
    highlights: [
      'Giới thiệu không gian làm việc chung hiện đại, trang bị đầy đủ công nghệ.',
      'Kết nối hơn 20 doanh nghiệp và quỹ đầu tư với các dự án khởi nghiệp tiềm năng.',
      'Chương trình chia sẻ kinh nghiệm từ các startup thành công.'
    ],
    quote: 'Cùng nhau xây dựng hệ sinh thái đổi mới sáng tạo vì cộng đồng!'
  },
  {
    id: 'art-seminar',
    title: 'Hội thảo “Chuyển đổi số trong nông nghiệp và du lịch cộng đồng”',
    date: '09 Tháng 9, 2026',
    category: 'Hoạt động',
    badgeColor: 'emerald',
    summary: 'Ứng dụng giải pháp chuyển đổi số và công nghệ cao nhằm nâng cao chuỗi giá trị nông nghiệp gắn kết du lịch sức khỏe sinh thái.',
    image: '/news-seminar.jpg',
    detailImage: '/news-seminar.jpg',
    caption: 'Toàn cảnh hội thảo chuyển đổi số với hơn 150 chuyên gia và đại diện doanh nghiệp',
    views: '986 lượt xem',
    readTime: '3 phút',
    author: 'Viện Nghiên cứu Nông nghiệp Sức khỏe',
    paragraphs: [
      'Hội thảo quy tụ hơn 150 chuyên gia nông nghiệp, đại diện các hợp tác xã và doanh nghiệp công nghệ số. Sự kiện tập trung thảo luận các giải pháp truy xuất nguồn gốc nông sản hữu cơ, số hóa quy trình canh tác dược liệu bản địa và phát triển các tour du lịch sinh thái nông nghiệp gắn với chăm sóc sức khỏe.',
      'Các mô hình thử nghiệm ứng dụng cảm biến IoT và bản đồ số hóa vùng trồng đã được giới thiệu trực quan tại không gian hội thảo.'
    ],
    highlightsTitle: 'Nội dung cốt lõi của hội thảo',
    highlights: [
      'Ứng dụng IoT và cảm biến thông minh trong quản lý vườn dược liệu chuẩn GACP.',
      'Xây dựng chuỗi liên kết giá trị từ nông trại sinh thái đến các gói du lịch dưỡng sinh.',
      'Thảo luận cơ chế trợ vốn và chuyển giao kỹ thuật số hóa cho bà con nông dân.'
    ],
    quote: 'Số hóa nông nghiệp gắn liền du lịch xanh – Hướng đi bền vững cho Bình Mỹ!'
  },
  {
    id: 'art-health',
    title: 'Chương trình khám sức khỏe miễn phí cho người dân Bình Mỹ',
    date: '05 Tháng 9, 2026',
    category: 'Thông báo',
    badgeColor: 'sky',
    summary: 'Chương trình tầm soát sức khỏe tổng quát, đo đường huyết, huyết áp và cấp phát thuốc miễn phí cho người dân Bình Mỹ.',
    image: '/news-health.jpg',
    detailImage: '/news-health.jpg',
    caption: 'Các bác sĩ và điều dưỡng tận tình thăm khám và tư vấn sức khỏe cho bà con',
    views: '2.140 lượt xem',
    readTime: '3 phút',
    author: 'Trung tâm Y tế Cộng đồng Bình Mỹ',
    paragraphs: [
      'Chương trình do Làng Sinh viên Bình Mỹ phối hợp cùng các bác sĩ chuyên khoa Bệnh viện Đại học Y Dược tổ chức. Đợt khám đã thực hiện tầm soát tim mạch, đo chỉ số sinh hiệu tự động và tư vấn dinh dưỡng cho hơn 500 bà con cao tuổi tại xã Bình Mỹ.',
      'Người dân tham gia được lập hồ sơ theo dõi sức khỏe điện tử trên hệ thống Telehealth cơ sở, giúp theo dõi liên tục và kịp thời phát hiện sớm các bệnh mãn tính.'
    ],
    highlightsTitle: 'Kết quả đạt được trong đợt khám',
    highlights: [
      'Khám và cấp thuốc miễn phí cho hơn 500 người cao tuổi và gia đình chính sách.',
      'Số hóa 100% hồ sơ bệnh án cơ bản vào hệ thống y tế số của Living Lab.',
      'Tặng 200 phần quà dinh dưỡng và cẩm nang tự chăm sóc sức khỏe tại nhà.'
    ],
    quote: 'Chung tay vì một cộng đồng Bình Mỹ khỏe mạnh, an vui và trường thọ!'
  },
  {
    id: 'art-signing',
    title: 'Ký kết hợp tác với Đại học Y khoa Quốc tế Hàn Quốc',
    date: '28 Tháng 8, 2026',
    category: 'Hợp tác quốc tế',
    badgeColor: 'purple',
    summary: 'Ký kết biên bản ghi nhớ hợp tác chiến lược trong đào tạo y khoa, trao đổi học thuật và nghiên cứu lâm sàng.',
    image: '/news-signing.jpg',
    detailImage: '/news-signing.jpg',
    caption: 'Lễ ký kết biên bản ghi nhớ hợp tác quốc tế giữa hai đơn vị',
    views: '1.430 lượt xem',
    readTime: '5 phút',
    author: 'Văn phòng Hợp tác Quốc tế',
    paragraphs: [
      'Thỏa thuận hợp tác mở ra các chương trình trao đổi sinh viên y khoa, học bổng thạc sĩ điều dưỡng lão khoa và tiếp nhận các đoàn bác sĩ chuyên gia Hàn Quốc đến giảng dạy, hội chẩn tại Trung tâm Y tế Cộng đồng Bình Mỹ.',
      'Hai bên thống nhất triển khai dự án nghiên cứu chung về ứng dụng Trí tuệ nhân tạo (AI) trong chẩn đoán sớm bệnh lý lão khoa tại nông thôn.'
    ],
    highlightsTitle: 'Trọng tâm thỏa thuận hợp tác',
    highlights: [
      'Chương trình liên kết đào tạo cử nhân và thạc sĩ điều dưỡng chuẩn quốc tế.',
      'Hội chẩn y khoa từ xa Tele-consultation giữa các bệnh viện đối tác tại Seoul và Bình Mỹ.',
      'Quỹ học bổng toàn phần dành cho sinh viên y dược xuất sắc tham gia dự án Living Lab.'
    ],
    quote: 'Nâng tầm y tế cộng đồng thông qua cầu nối hợp tác quốc tế sâu rộng!'
  },
  {
    id: 'art-job-fair',
    title: 'Ngày hội việc làm – Kết nối doanh nghiệp và sinh viên',
    date: '20 Tháng 8, 2026',
    category: 'Sự kiện',
    badgeColor: 'amber',
    summary: 'Cơ hội kết nối trực tiếp giữa hơn 30 doanh nghiệp y tế, dược phẩm, công nghệ với sinh viên sắp tốt nghiệp.',
    image: '/job-fair.jpg',
    detailImage: '/job-fair.jpg',
    caption: 'Không khí sôi động tại ngày hội hướng nghiệp và tuyển dụng',
    views: '1.850 lượt xem',
    readTime: '3 phút',
    author: 'Trung tâm Hỗ trợ Sinh viên & Khởi nghiệp',
    paragraphs: [
      'Ngày hội việc làm năm 2026 thu hút hơn 1.000 sinh viên tham dự, với sự hiện diện của hơn 30 nhà tuyển dụng hàng đầu trong các lĩnh vực bệnh viện tư nhân, chuỗi chăm sóc sức khỏe, viện điều dưỡng và công ty công nghệ sinh học.',
      'Nhiều sinh viên xuất sắc đã nhận được lời mời thực tập hưởng lương và ký hợp đồng tuyển dụng trực tiếp ngay tại sự kiện.'
    ],
    highlightsTitle: 'Điểm sáng của ngày hội',
    highlights: [
      'Hơn 500 vị trí việc làm và thực tập chuyên ngành y dược, điều dưỡng, quản trị.',
      'Chuỗi workshop phỏng vấn thử và hiệu chỉnh CV chuẩn quốc tế cùng chuyên gia nhân sự.',
      'Ký kết thỏa thuận cung ứng nhân lực độc quyền với 5 tập đoàn y tế đối tác.'
    ],
    quote: 'Chắp cánh ước mơ nghề nghiệp – Đồng hành cùng thế hệ nhân lực y tế tương lai!'
  },
  {
    id: 'art-admissions',
    title: 'Tuyển sinh các khóa đào tạo ngắn hạn về chăm sóc sức khỏe cộng đồng',
    date: '12 Tháng 8, 2026',
    category: 'Thông báo',
    badgeColor: 'rose',
    summary: 'Thông báo tuyển sinh các lớp chứng chỉ hành nghề: Chăm sóc người cao tuổi, Kỹ năng sơ cấp cứu và Quản lý phòng khám số.',
    image: '/health-training.jpg',
    detailImage: '/health-training.jpg',
    caption: 'Lớp học thực hành kỹ năng chăm sóc và giao tiếp y tế chuyên nghiệp',
    views: '3.120 lượt xem',
    readTime: '2 phút',
    author: 'Phòng Đào tạo & Quản lý Khoa học',
    paragraphs: [
      'Nhằm đáp ứng nhu cầu nhân lực chăm sóc sức khỏe chất lượng cao cho khu vực kinh tế trọng điểm phía Nam, Làng Sinh viên Bình Mỹ chính thức mở đơn đăng ký cho các khóa đào tạo ngắn hạn cấp chứng chỉ uy tín.',
      'Khóa học được thiết kế theo phương pháp thực hành 70% thời lượng tại Living Lab và các cơ sở y tế đối tác, được hướng dẫn bởi đội ngũ bác sĩ, chuyên gia đầu ngành.'
    ],
    highlightsTitle: 'Ưu đãi và quyền lợi học viên',
    highlights: [
      'Học bổng 30% học phí dành cho thanh niên và người dân địa phương Củ Chi.',
      'Cam kết giới thiệu việc làm 100% sau khi tốt nghiệp và hoàn thành chứng chỉ.',
      'Cơ hội tham gia các dự án nghiên cứu thực địa có phụ cấp sinh hoạt.'
    ],
    quote: 'Đào tạo chuẩn thực tiễn – Khởi đầu vững chắc cho sự nghiệp y tế nhân văn!'
  }
];

export const mockEventItems = [
  {
    id: 'ev-1',
    day: '25',
    monthYear: 'Tháng 9, 2026',
    dateFull: '25/09/2026',
    category: 'Hội thảo',
    badgeBg: 'bg-[#0284c7]',
    title: 'Hội thảo “Chuyển đổi số trong nông nghiệp và du lịch cộng đồng”',
    summary: 'Cùng các chuyên gia, doanh nghiệp và sinh viên thảo luận về xu hướng chuyển đổi số, ứng dụng công nghệ trong nông nghiệp và du lịch cộng đồng.',
    location: 'Hội trường A – Đại học HUTECH',
    image: '/news-seminar.jpg',
    dotColor: 'bg-blue-500'
  },
  {
    id: 'ev-2',
    day: '02',
    monthYear: 'Tháng 10, 2026',
    dateFull: '02/10/2026',
    category: 'Workshop',
    badgeBg: 'bg-[#00875a]',
    title: 'Workshop “Kỹ năng khởi nghiệp và xây dựng ý tưởng kinh doanh”',
    summary: 'Trang bị kiến thức và kỹ năng thực tiễn cho sinh viên về khởi nghiệp, đổi mới sáng tạo và phát triển dự án.',
    location: 'Phòng Lab Innovation – Bình Mỹ',
    image: '/startup-lab.jpg',
    dotColor: 'bg-emerald-500'
  },
  {
    id: 'ev-3',
    day: '10',
    monthYear: 'Tháng 10, 2026',
    dateFull: '10/10/2026',
    category: 'Hoạt động sinh viên',
    badgeBg: 'bg-[#7c3aed]',
    title: 'Ngày hội tình nguyện “Vì một Bình Mỹ xanh”',
    summary: 'Cùng chung tay trồng cây, làm sạch môi trường và lan tỏa lối sống xanh trong cộng đồng sinh viên.',
    location: 'Khu nông nghiệp công nghệ cao Bình Mỹ',
    image: '/volunteer-green.jpg',
    dotColor: 'bg-amber-500'
  },
  {
    id: 'ev-4',
    day: '18',
    monthYear: 'Tháng 10, 2026',
    dateFull: '18/10/2026',
    category: 'Giao lưu - Kết nối',
    badgeBg: 'bg-[#f59e0b]',
    title: 'Giao lưu quốc tế: Hợp tác giáo dục và nghiên cứu với các trường đại học Hàn Quốc',
    summary: 'Kết nối sinh viên, giảng viên và chuyên gia từ các trường đại học Hàn Quốc, mở ra cơ hội hợp tác và học bổng.',
    location: 'Phòng hội thảo – HUTECH',
    image: '/news-signing.jpg',
    dotColor: 'bg-indigo-500'
  },
  {
    id: 'ev-5',
    day: '25',
    monthYear: 'Tháng 10, 2026',
    dateFull: '25/10/2026',
    category: 'Hội thảo',
    badgeBg: 'bg-[#0284c7]',
    title: 'Tọa đàm “Sống khỏe – Học tốt – Phát triển bản thân”',
    summary: 'Chia sẻ từ các chuyên gia tâm lý, dinh dưỡng và bác sĩ về sức khỏe thể chất và tinh thần cho sinh viên.',
    location: 'Hội trường B – HUTECH',
    image: '/news-health.jpg',
    dotColor: 'bg-sky-500'
  },
  {
    id: 'ev-6',
    day: '09',
    monthYear: 'Tháng 11, 2026',
    dateFull: '09/11/2026',
    category: 'Cuộc thi',
    badgeBg: 'bg-[#ef4444]',
    title: 'Cuộc thi “Ý tưởng sáng tạo vì cộng đồng”',
    summary: 'Cơ hội để sinh viên thể hiện ý tưởng, giải pháp sáng tạo vì sự phát triển bền vững tại Bình Mỹ.',
    location: 'Trung tâm Đổi mới sáng tạo – Bình Mỹ',
    image: '/innovation-idea.jpg',
    dotColor: 'bg-rose-500'
  }
];

export const mockEvents = mockEventsData;
export const mockActivityFields = mockActivityFieldsData;
export const mockStats = mockStatsData;

export const mockPumJoinCards = [
  {
    id: 'sme',
    tag: 'Dành cho Sinh viên & Học viên',
    tagEn: 'For Students & Trainees',
    title: 'Thực tập & Khởi nghiệp tại Living Lab',
    titleEn: 'Internship & Innovation at Living Lab',
    description: 'Học tập trên bài toán thật, trực tiếp tham gia chuỗi dự án Y tế, Nông nghiệp thông minh và Du lịch trị liệu tại Bình Mỹ.',
    descriptionEn: 'Hands-on practice on real community challenges in health, smart agritech, and wellness tourism.',
    image: '/assets/pum/JoinUs_entrepreneurs-e1707830937654-1200x670.jpg',
    ctaText: 'Khám phá chương trình',
    ctaTextEn: 'Explore Programs',
    targetPage: 'training',
    actionType: 'training'
  },
  {
    id: 'expert',
    tag: 'Dành cho Bác sĩ & Chuyên gia',
    tagEn: 'For Doctors & Experts',
    title: 'Mạng lưới Bác sĩ Xuyên Biên Giới',
    titleEn: 'Doctors Across Borders Network',
    description: 'Tham gia giảng dạy thỉnh giảng, hội chẩn từ xa quốc tế, nghiên cứu đa trung tâm và phục vụ cộng đồng y tế.',
    descriptionEn: 'Join visiting lectures, remote international grand rounds, multi-center research, and community healthcare.',
    image: '/assets/pum/JoinUs_experts-1200x800.jpg',
    ctaText: 'Đăng ký Chuyên gia',
    ctaTextEn: 'Join as Expert',
    targetPage: 'doctors',
    actionType: 'expert'
  },
  {
    id: 'partner',
    tag: 'Dành cho Doanh nghiệp & Địa phương',
    tagEn: 'For Enterprises & Local Partners',
    title: 'Hợp tác Dự án & 12 Mô hình Kinh tế',
    titleEn: 'Project Partnership & 12 Economic Models',
    description: 'Cùng xây dựng hệ sinh thái chuỗi giá trị OCOP, Edu Farm, Wellness Farm và chuyển giao công nghệ y tế bền vững.',
    descriptionEn: 'Collaborate to build OCOP supply chains, Edu/Wellness Farms, and sustainable healthcare models.',
    image: '/assets/pum/hero_partner-e1731941595732-1200x916.jpg',
    ctaText: 'Đề xuất Hợp tác',
    ctaTextEn: 'Propose Partnership',
    targetPage: 'consulting',
    actionType: 'partner'
  }
];

export const mockPumProjects = [
  {
    id: 'proj-1',
    title: 'Trung tâm Y tế Cộng đồng & Sức khỏe Ban đầu Living Lab',
    titleEn: 'Community Health Center & Primary Living Lab',
    category: 'healthcare',
    categoryName: 'Y tế cộng đồng',
    categoryNameEn: 'Community Health',
    location: 'Xã Bình Mỹ, Huyện Củ Chi, TP.HCM',
    image: '/assets/pum/hero_visual2-e1710851129461-1200x836.jpg',
    summary: 'Mô hình kết nối bác sĩ tuyến trên với y tế cơ sở qua Telehealth và hồ sơ sức khỏe điện tử đồng bộ cho hơn 5.000 hộ gia đình.',
    summaryEn: 'Connecting tertiary physicians with grassroots clinic via Telehealth and integrated EHR for 5,000+ local families.',
    impactMetrics: ['5.000+ Hồ sơ quản lý', '100% Khám sàng lọc ban đầu', '12 Bác sĩ quốc tế bảo trợ'],
    featured: true
  },
  {
    id: 'proj-2',
    title: 'Mô hình Edu Farm & Wellness Farm Dược liệu Bản địa',
    titleEn: 'Indigenous Herbal Edu & Wellness Farm',
    category: 'wellness',
    categoryName: 'Health & Wellness',
    categoryNameEn: 'Health & Wellness',
    location: 'Phân khu Nông nghiệp Xanh Bình Mỹ',
    image: '/assets/pum/Uganda_Fruit_Vegetables_processing_006-e1706769474884-1200x771.jpg',
    summary: 'Kết hợp nông nghiệp hữu cơ tuần hoàn, vườn dược liệu trị liệu và du lịch trải nghiệm phục hồi sức khỏe cuối tuần cho người cao tuổi.',
    summaryEn: 'Combining circular organic farming, healing herbal gardens, and weekend health recuperation retreat for seniors.',
    impactMetrics: ['25ha Vùng nguyên liệu', '18 Sản phẩm OCOP chuẩn hóa', '1.200 Lượt khách/tháng'],
    featured: true
  },
  {
    id: 'proj-3',
    title: 'Trung tâm Phục hồi Chức năng & Dưỡng lão Ban ngày',
    titleEn: 'Daycare & Geriatric Rehabilitation Center',
    category: 'elderly',
    categoryName: 'Chăm sóc người cao tuổi',
    categoryNameEn: 'Elderly Care',
    location: 'Khuôn viên Làng Sinh Viên Bình Mỹ',
    image: '/assets/pum/AboutUs_headerphoto-1-e1710851068894-1200x788.jpg',
    summary: 'Không gian vận động trị liệu, thực dưỡng sạch và giao lưu văn hóa giúp người cao tuổi sống vui, khỏe, gắn kết thế hệ trẻ.',
    summaryEn: 'Therapeutic physical therapy, clean nutrition, and generational community activities for healthy, joyful aging.',
    impactMetrics: ['120 Giường bán trú', '30 Điều dưỡng đào tạo chuẩn', '98% Hài lòng'],
    featured: true
  },
  {
    id: 'proj-4',
    title: 'Hệ thống Quản lý Chuỗi Cung ứng Nông sản Dược liệu OCOP',
    titleEn: 'Traceable OCOP Herbal Agriculture Supply Chain',
    category: 'agriculture',
    categoryName: 'Kinh tế phụ trợ',
    categoryNameEn: 'Auxiliary Economy',
    location: 'Hợp tác xã Nông nghiệp Bình Mỹ Xanh',
    image: '/assets/pum/Jordan_Al-Bayrouty_002-1200x800.jpg',
    summary: 'Ứng dụng công nghệ truy xuất nguồn gốc số, sàn giao dịch nông sản và kho sơ chế bảo quản lạnh đạt tiêu chuẩn VietGAP.',
    summaryEn: 'Digital traceability, direct trading platform, and VietGAP post-harvest cold storage network.',
    impactMetrics: ['45 Xã viên liên kết', '300 Tấn/năm tiêu thụ', '+35% Thu nhập nông dân'],
    featured: false
  },
  {
    id: 'proj-5',
    title: 'Hội chẩn Quốc tế Xuyên Biên Giới – Telehealth Grand Rounds',
    titleEn: 'Cross-Border Telehealth Grand Rounds',
    category: 'international',
    categoryName: 'Bác sĩ xuyên biên giới',
    categoryNameEn: 'Doctors Across Borders',
    location: 'Trực tuyến đa điểm cầu Quốc tế & Bình Mỹ',
    image: '/assets/pum/PUM-sfeerbeeld_6-2023_De-Schaapjesfabriek-LR-5-1200x800.jpg',
    summary: 'Chương trình định kỳ giữa bác sĩ Hà Lan, Nhật Bản, Pháp và đội ngũ y tế Việt Nam thảo luận ca bệnh lão khoa phức tạp.',
    summaryEn: 'Regular hybrid sessions connecting specialists from Netherlands, Japan, France with local doctors on complex geriatric cases.',
    impactMetrics: ['24 Buổi hội chẩn/năm', '80 Bác sĩ tham dự/kỳ', '100% Chuyển giao phác đồ'],
    featured: false
  }
];

export const mockPumTestimonials = [
  {
    id: 't-1',
    quote: 'Mô hình Living Lab tại Bình Mỹ tạo môi trường thực hành y tế và nông nghiệp sinh thái vô cùng sống động, kết nối trực tiếp sinh viên với các bài toán thực tế của địa phương.',
    quoteEn: 'The Living Lab model in Binh My provides an exceptionally vibrant medical and ecological practice ground, directly connecting students with real community solutions.',
    author: 'TS. BS. Johannes Van Der Berg',
    role: 'Chuyên gia Cố vấn Y học Gia đình',
    roleEn: 'Senior Family Medicine Consultant',
    organization: 'Mạng lưới Bác sĩ Quốc tế PUM (Hà Lan)',
    image: '/assets/pum/JoinUs_experts-1200x800.jpg',
    tag: 'Bác sĩ Quốc tế'
  },
  {
    id: 't-2',
    quote: 'Tham gia các khóa đào tạo điều dưỡng lão khoa và thực hành tại Trung tâm chăm sóc người cao tuổi Bình Mỹ đã mở ra cho tôi cơ hội làm việc với mức lương cao và chứng chỉ chuẩn quốc tế.',
    quoteEn: 'Joining the geriatric care training and practicing at Binh My center opened high-income career opportunities and internationally recognized certification.',
    author: 'Nguyễn Thị Hồng Hạnh',
    role: 'Học viên Khóa Điều dưỡng Cộng đồng K02',
    roleEn: 'Community Nursing Graduate K02',
    organization: 'Khoa Y Dược – HUTECH',
    image: '/assets/pum/DSC8707-1200x800.jpg',
    tag: 'Sinh viên Tiêu biểu'
  },
  {
    id: 't-3',
    quote: 'Sự hỗ trợ từ gói tư vấn dự án và chuỗi 12 mô hình kinh tế phụ trợ đã giúp HTX Bình Mỹ chuẩn hóa thành công 4 sản phẩm trà dược liệu OCOP đạt chuẩn 4 sao.',
    quoteEn: 'Support from project consulting and 12 auxiliary economic models helped our cooperative standardize 4 herbal tea products to 4-star OCOP status.',
    author: 'Trần Văn Hùng',
    role: 'Giám đốc Hợp tác xã',
    roleEn: 'Cooperative Director',
    organization: 'HTX Nông nghiệp Sinh thái Bình Mỹ',
    image: '/assets/pum/Jordan_Al-Bayrouty_002-1200x800.jpg',
    tag: 'Đối tác Doanh nghiệp'
  }
];


