import { 
  ProblemItem, 
  ProjectItem, 
  CommunityMember, 
  ProblemProposalSubmission 
} from '../types/livingLab';

// ==========================================
// 1. STATS (MOCK DATA MINH HỌA)
// ==========================================
export const mockLivingLabStats = {
  verifiedProblems: 25,
  activeProjects: 12,
  communityMembers: 48,
  testedProjects: 8,
  note: 'Mock data mô phỏng nền tảng Living Lab'
};

// ==========================================
// 2. 3 LĨNH VỰC CHÍNH
// ==========================================
export const mockMainFields = [
  {
    id: 'agriculture',
    key: 'agriculture' as const,
    emoji: '🌱',
    title: 'NÔNG NGHIỆP',
    tagline: 'Nông nghiệp công nghệ cao & Chuỗi giá trị',
    description: 'Giải quyết các vấn đề về sản xuất, quảng bá, tiêu thụ và chuyển đổi số.',
    bgLight: 'bg-emerald-50',
    borderColor: 'border-emerald-200',
    textColor: 'text-emerald-700',
    btnColor: 'bg-[#00875a] hover:bg-[#00734c]',
    iconBadge: '🌱'
  },
  {
    id: 'healthcare',
    key: 'healthcare' as const,
    emoji: '🏥',
    title: 'Y TẾ',
    tagline: 'Chăm sóc sức khỏe cộng đồng & Telehealth',
    description: 'Kết nối kiến thức, chuyên gia và giải pháp nhằm cải thiện các vấn đề y tế cộng đồng.',
    bgLight: 'bg-sky-50',
    borderColor: 'border-sky-200',
    textColor: 'text-sky-700',
    btnColor: 'bg-[#0284c7] hover:bg-[#0369a1]',
    iconBadge: '🏥'
  },
  {
    id: 'tourism',
    key: 'tourism' as const,
    emoji: '🏝️',
    title: 'DU LỊCH',
    tagline: 'Du lịch cộng đồng & Trải nghiệm sinh thái',
    description: 'Phát triển du lịch cộng đồng, trải nghiệm và khai thác giá trị địa phương.',
    bgLight: 'bg-amber-50',
    borderColor: 'border-amber-200',
    textColor: 'text-amber-700',
    btnColor: 'bg-[#d97706] hover:bg-[#b45309]',
    iconBadge: '🏝️'
  }
];

// ==========================================
// 3. DANH SÁCH BÀI TOÁN BÌNH MỸ (ĐÃ XÁC MINH)
// ==========================================
export const mockProblems: ProblemItem[] = [
  {
    id: 'prob-agri-01',
    code: 'BM-AGRI-01',
    field: 'agriculture',
    fieldLabel: 'NÔNG NGHIỆP',
    fieldEmoji: '🌱',
    title: 'KHÓ QUẢNG BÁ NÔNG SẢN ĐẾN KHÁCH HÀNG',
    summary: 'Một số hộ sản xuất gặp khó khăn trong việc tiếp cận khách hàng và quảng bá sản phẩm trên các kênh số.',
    location: 'Bình Mỹ, Củ Chi',
    neededResources: ['Marketing', 'CNTT', 'Thiết kế', 'Chuyên gia'],
    verified: true,
    verifiedDate: '12/08/2026',
    status: 'in_progress',
    statusLabel: 'Đang triển khai',
    problemDescription: 'Các hộ sản xuất nông sản và thảo dược tại Bình Mỹ gặp khó khăn trong việc tiếp cận khách hàng mới và quảng bá sản phẩm trên các kênh số. Hiện tại hầu hết sản phẩm được tiêu thụ qua đầu mối thu gom truyền thống, giá cả bấp bênh và thiếu kênh giao tiếp trực tiếp với người tiêu dùng thành thị.',
    causes: [
      'Kỹ năng số còn hạn chế: Bà con chưa quen sử dụng mạng xã hội, sàn thương mại điện tử.',
      'Thiếu kênh quảng bá phù hợp: Không có bộ nhận diện thương hiệu hay website giới thiệu.',
      'Sản xuất nhỏ lẻ: Quy mô hộ gia đình, khó đáp ứng chi phí làm truyền thông độc lập.',
      'Thiếu liên kết giữa các hộ: Chưa hình thành chuỗi cung ứng đồng nhất.'
    ],
    objectives: 'Xây dựng giải pháp số hóa toàn diện giúp các hộ sản xuất tiếp cận khách hàng và quảng bá sản phẩm hiệu quả hơn, gia tăng tối thiểu 30% doanh thu trực tiếp.',
    impactExpected: 'Tạo lập kênh bán hàng số ổn định cho ít nhất 20 hộ nông dân tại xã Bình Mỹ.',
    proposerName: 'Chú Ba Nghĩa (Đại diện Tổ hợp tác Nông sản sạch)',
    proposerType: 'Hộ sản xuất địa phương',
    views: 1240,
    proposalsCount: 8,
    relatedProjectId: 'proj-01',
    featured: true
  },
  {
    id: 'prob-tourism-01',
    code: 'BM-TOUR-01',
    field: 'tourism',
    fieldLabel: 'DU LỊCH',
    fieldEmoji: '🏝️',
    title: 'KHAI THÁC TIỀM NĂNG DU LỊCH CỘNG ĐỒNG',
    summary: 'Bình Mỹ có cảnh quan sông nước, vườn trái cây và làng nghề nhưng chưa có tour trải nghiệm kết nối bài bản.',
    location: 'Ấp 1 & Ấp 2, Bình Mỹ',
    neededResources: ['Du lịch', 'Marketing', 'Truyền thông', 'Thiết kế trải nghiệm'],
    verified: true,
    verifiedDate: '18/08/2026',
    status: 'in_progress',
    statusLabel: 'Đang triển khai',
    problemDescription: 'Bình Mỹ sở hữu cảnh quan sông nước hữu tình, vườn cây ăn trái quanh năm và không gian xanh thoáng mát rất gần trung tâm TP.HCM. Tuy nhiên, các điểm tham quan hiện hoạt động tự phát, thiếu sản phẩm du lịch hoàn chỉnh, thiếu dịch vụ đón tiếp chuyên nghiệp và chưa tạo được nguồn thu ổn định cho cộng đồng dân cư địa phương.',
    causes: [
      'Chưa có bản đồ tuyến điểm và kịch bản trải nghiệm du lịch nông nghiệp chuẩn mực.',
      'Người dân chưa được tập huấn kỹ năng đón tiếp du khách, an toàn vệ sinh thực phẩm.',
      'Thiếu hoạt động trải nghiệm tương tác (làm nông dân, hái trái cây, nấu ăn sinh thái).',
      'Công tác truyền thông, quảng bá điểm đến trên môi trường số gần như bằng không.'
    ],
    objectives: 'Thiết kế chuỗi tour trải nghiệm "Một ngày làm nông dân Bình Mỹ" gắn kết 10 nhà vườn, xây dựng cẩm nang số và kết nối khách đoàn sinh viên/gia đình cuối tuần.',
    impactExpected: 'Tăng thu nhập thêm 25–40% cho các hộ tham gia mô hình du lịch nông nghiệp trải nghiệm.',
    proposerName: 'Hội Nông dân Xã Bình Mỹ',
    proposerType: 'Đơn vị địa phương',
    views: 980,
    proposalsCount: 6,
    relatedProjectId: 'proj-03',
    featured: true
  },
  {
    id: 'prob-health-01',
    code: 'BM-MED-01',
    field: 'healthcare',
    fieldLabel: 'Y TẾ',
    fieldEmoji: '🏥',
    title: 'THIẾU KÊNH TIẾP CẬN KIẾN THỨC Y TẾ CỘNG ĐỒNG',
    summary: 'Người cao tuổi và người dân vùng nông thôn gặp khó khăn trong theo dõi bệnh mãn tính và tiếp cận thông tin sức khỏe chuẩn y khoa.',
    location: 'Xã Bình Mỹ, Củ Chi',
    neededResources: ['Y tế', 'Truyền thông', 'CNTT', 'Bác sĩ cố vấn'],
    verified: true,
    verifiedDate: '25/08/2026',
    status: 'seeking_resources',
    statusLabel: 'Đang tìm nguồn lực',
    problemDescription: 'Tỷ lệ người cao tuổi mắc các bệnh không lây nhiễm (huyết áp, tiểu đường, thoái hóa khớp) tại địa bàn Bình Mỹ khá cao. Đa số bà con chỉ đi khám khi bệnh trở nặng; kiến thức tự theo dõi chỉ số sinh hiệu tại nhà và chế độ dinh dưỡng dưỡng lão còn nhiều thiếu sót, tin vào các mẹo dân gian chưa kiểm chứng.',
    causes: [
      'Khoảng cách địa lý đến bệnh viện tuyến trên và tâm lý ngại đi khám.',
      'Thiếu kênh truyền thông sức khỏe ngắn gọn, dễ hiểu, bằng tiếng Việt bình dân qua Zalo.',
      'Chưa có mạng lưới tình nguyện viên y tế định kỳ thăm khám và hướng dẫn đo huyết áp.',
      'Hồ sơ sức khỏe theo dõi liên tục chưa được số hóa tại cơ sở.'
    ],
    objectives: 'Xây dựng mô hình Câu lạc bộ Sức khỏe Người cao tuổi Bình Mỹ kết hợp phần mềm theo dõi chỉ số huyết áp đơn giản và các buổi tư vấn trực tuyến cùng bác sĩ.',
    impactExpected: 'Hỗ trợ thường xuyên cho hơn 300 người cao tuổi tại 4 ấp trên địa bàn xã.',
    proposerName: 'Trạm Y tế Xã Bình Mỹ & Chi hội Người cao tuổi',
    proposerType: 'Trạm y tế & đoàn thể địa phương',
    views: 1150,
    proposalsCount: 5,
    relatedProjectId: 'proj-02',
    featured: true
  },
  {
    id: 'prob-agri-02',
    code: 'BM-AGRI-02',
    field: 'agriculture',
    fieldLabel: 'NÔNG NGHIỆP',
    fieldEmoji: '🌱',
    title: 'ỨNG DỤNG CÔNG NGHỆ BẢO QUẢN THẢO DƯỢC SAU THU HOẠCH',
    summary: 'Thảo dược bản địa (sả, tràm, ngải cứu, gừng gió) bị hao hụt và giảm hoạt chất do phương pháp phơi sấy thủ công phụ thuộc thời tiết.',
    location: 'Ấp 3, Bình Mỹ',
    neededResources: ['Công nghệ thực phẩm', 'Tự động hóa', 'Sinh viên Hóa - Sinh', 'Chuyên gia sấy'],
    verified: true,
    verifiedDate: '02/09/2026',
    status: 'seeking_resources',
    statusLabel: 'Đang tìm nguồn lực',
    problemDescription: 'Bình Mỹ có thế mạnh trồng các loại dược liệu tự nhiên. Tuy nhiên sau thu hoạch, bà con chủ yếu phơi nắng truyền thống, khi gặp mưa dễ nấm mốc hoặc phơi quá nắng làm bay hơi tinh dầu quý. Cần giải pháp máy sấy năng lượng mặt trời chi phí thấp và quy trình chiết xuất tinh dầu cơ bản tại chỗ.',
    causes: [
      'Hạ tầng thiết bị sấy công nghiệp chi phí quá cao so với quy mô hộ gia đình.',
      'Thiếu quy trình kiểm soát nhiệt độ và độ ẩm chuẩn GACP.',
      'Hao hụt sau thu hoạch lên tới 25-30% vào mùa mưa.'
    ],
    objectives: 'Thiết kế mô hình buồng sấy đối lưu năng lượng mặt trời kết hợp điện trở phụ trợ giá rẻ dưới 15 triệu đồng, giảm tỷ lệ hao hụt xuống dưới 8%.',
    impactExpected: 'Chuẩn hóa chất lượng cho 15 hộ trồng thảo dược tại Bình Mỹ.',
    proposerName: 'HTX Dược liệu Xanh Bình Mỹ',
    proposerType: 'Hợp tác xã',
    views: 860,
    proposalsCount: 4,
    featured: false
  },
  {
    id: 'prob-tourism-02',
    code: 'BM-TOUR-02',
    field: 'tourism',
    fieldLabel: 'DU LỊCH',
    fieldEmoji: '🏝️',
    title: 'XÂY DỰNG BẢN ĐỒ SỐ ĐIỂM ĐẾN VÀ LÀNG NGHỀ TRUYỀN THỐNG',
    summary: 'Du khách gặp khó khăn khi tìm kiếm đường đi, thông tin nhà vườn, quán ăn sinh thái và giờ mở cửa tại các ấp.',
    location: 'Toàn xã Bình Mỹ',
    neededResources: ['CNTT', 'GIS / Bản đồ số', 'Nhiếp ảnh', 'Nội dung số'],
    verified: true,
    verifiedDate: '06/09/2026',
    status: 'seeking_resources',
    statusLabel: 'Đang tìm nguồn lực',
    problemDescription: 'Các con đường liên ấp tại Bình Mỹ quanh co, nhiều địa điểm ẩm thực sinh thái, vườn hoa kiểng và nghề mây tre đan không hiển thị chính xác trên Google Maps. Du khách tự túc rất khó tự định hướng và thường bỏ lỡ các điểm trải nghiệm thú vị.',
    causes: [
      'Các điểm dịch vụ chưa được đăng ký định danh số trên bản đồ vệ tinh.',
      'Thiếu hệ thống biển chỉ dẫn sinh thái đồng bộ.',
      'Chưa có cổng tra cứu trực quan các hoạt động theo mùa vụ tại Bình Mỹ.'
    ],
    objectives: 'Xây dựng Bản đồ tương tác Web GIS "Khám phá Bình Mỹ" trên nền di động, tích hợp gợi ý lịch trình và đánh giá từ cộng đồng.',
    impactExpected: 'Định vị chính xác hơn 50 địa điểm sản xuất và sinh thái phục vụ du khách.',
    proposerName: 'Đoàn Thanh niên Xã Bình Mỹ',
    proposerType: 'Tổ chức thanh niên địa phương',
    views: 740,
    proposalsCount: 3,
    featured: false
  },
  {
    id: 'prob-health-02',
    code: 'BM-MED-02',
    field: 'healthcare',
    fieldLabel: 'Y TẾ',
    fieldEmoji: '🏥',
    title: 'GIẢI PHÁP PHỤC HỒI CHỨC NĂNG DỰA VÀO CỘNG ĐỒNG CHO NGƯỜI TAI BIẾN',
    summary: 'Bệnh nhân sau tai biến mạch máu não gặp khó khăn khi tập phục hồi tại nhà do thiếu người hướng dẫn chuyên môn liên tục.',
    location: 'Ấp Bình Mỹ, Củ Chi',
    neededResources: ['Vật lý trị liệu', 'Phục hồi chức năng', 'Kỹ sư dụng cụ trợ giúp', 'Sinh viên Y'],
    verified: true,
    verifiedDate: '10/09/2026',
    status: 'solved',
    statusLabel: 'Đã giải quyết',
    problemDescription: 'Người bệnh sau đột quỵ trở về nhà thường để lại di chứng liệt nửa người. Gia đình thiếu kiến thức hỗ trợ tập luyện, chi phí thuê kỹ thuật viên về tận nhà quá đắt đỏ, dẫn đến teo cơ và cứng khớp tiến triển.',
    causes: [
      'Thiếu dụng cụ tập vật lý trị liệu cơ bản phù hợp với gia đình nông thôn.',
      'Người nhà thiếu kiến thức nâng đỡ, định vị tư thế và xoa bóp đúng khoa học.',
      'Không có lịch trình nhắc nhở luyện tập có kiểm soát.'
    ],
    objectives: 'Chuyển giao bộ dụng cụ tập tay chân tự tạo giá rẻ và chuỗi video clip bài tập phục hồi chức năng chuẩn y khoa.',
    impactExpected: 'Đã phục hồi chức năng vận động căn bản cho 12 bệnh nhân tại địa phương.',
    proposerName: 'Gia đình ông Nguyễn Văn Thảo & Trạm Y tế',
    proposerType: 'Người dân & Trạm Y tế',
    views: 1420,
    proposalsCount: 11,
    featured: false
  }
];

// ==========================================
// 4. DANH SÁCH DỰ ÁN TẠI BÌNH MỸ
// ==========================================
export const mockProjects: ProjectItem[] = [
  {
    id: 'proj-01',
    code: 'DA-BM-01',
    field: 'agriculture',
    fieldLabel: 'NÔNG NGHIỆP',
    fieldEmoji: '🌱',
    title: 'NỀN TẢNG QUẢNG BÁ NÔNG SẢN BÌNH MỸ',
    summary: 'Giải pháp giúp các hộ sản xuất tiếp cận khách hàng thông qua nền tảng số.',
    isFeatured: true,
    membersCount: 5,
    progressPercent: 80,
    status: 'tested',
    statusLabel: 'Đã thử nghiệm',
    testedInBinhMy: true,
    location: 'Ấp 1 & Ấp 2, Bình Mỹ, Củ Chi',
    problemStatement: 'Các hộ nông dân tại Bình Mỹ sản xuất rau thủy canh, nấm bào ngư và trái cây an toàn nhưng tiêu thụ bấp bênh, 80% phụ thuộc thương lái trung gian, không có thương hiệu và khó tiếp cận khách hàng doanh nghiệp, người tiêu dùng tại trung tâm TP.HCM.',
    solutionStatement: 'Nhóm dự án liên ngành Living Lab đã phát triển cổng kết nối "Nông Sản Bình Mỹ Hub", gắn mã QR Traceability vào từng túi nông sản, chuẩn hóa hình ảnh nhận diện và thiết lập mô hình "Từ vườn đến bàn ăn" giao hàng định kỳ vào thứ 7 hàng tuần cho các khu dân cư.',
    teamMembers: [
      {
        name: 'Nguyễn Văn An',
        role: 'Trưởng nhóm / Sinh viên CNTT',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Trần Thị Mai',
        role: 'Phụ trách Marketing & Truyền thông số',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Lê Hoàng Nam',
        role: 'Thiết kế bao bì & Thương hiệu',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'TS. Đặng Minh Tuấn',
        role: 'Cố vấn Chuyển đổi số & Chuỗi cung ứng',
        type: 'expert',
        typeLabel: 'Chuyên gia',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Chú Ba Nghĩa',
        role: 'Đại diện Hộ nông dân thử nghiệm',
        type: 'resident',
        typeLabel: 'Hộ dân',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { phase: '01', title: 'Khảo sát thực địa & Phỏng vấn hộ dân', completed: true },
      { phase: '02', title: 'Phân tích chuỗi giá trị & Lập giải pháp', completed: true },
      { phase: '03', title: 'Xây dựng website & Bộ nhận diện bao bì', completed: true },
      { phase: '04', title: 'Thử nghiệm tại 5 hộ dân Bình Mỹ', completed: true },
      { phase: '05', title: 'Đánh giá tác động & Đề xuất nhân rộng', completed: false, current: true }
    ],
    impact: {
      beforeText: 'Khó tiếp cận khách hàng, 100% phụ thuộc thương lái, giá bấp bênh, không có nhãn hiệu nhận diện.',
      solutionText: 'Xây dựng website bán lẻ, gắn tem QR truy xuất nguồn gốc, thiết kế bao bì giấy thân thiện môi trường.',
      testingText: 'Triển khai thử nghiệm trong 2 tháng với 5 hộ sản xuất bưởi da xanh và nấm sạch tại Bình Mỹ.',
      stats: [
        { value: '20', label: 'Hộ tham gia khảo sát & đào tạo', change: '+100%' },
        { value: '05', label: 'Hộ gia đình trực tiếp thử nghiệm', change: 'Giai đoạn 1' },
        { value: '+30%', label: 'Lượt tiếp cận & Đơn hàng định kỳ', change: 'Doanh thu tăng 35%' }
      ],
      realPhotos: [
        {
          url: '/news-students.jpg',
          caption: 'Sinh viên và chuyên gia họp bàn giải pháp cùng hộ dân tại Living Lab Bình Mỹ'
        },
        {
          url: '/startup-lab.jpg',
          caption: 'Không gian làm việc và hoàn thiện giao diện ứng dụng số'
        },
        {
          url: '/news-seminar.jpg',
          caption: 'Buổi chia sẻ hướng dẫn bà con nông dân quản lý đơn hàng'
        }
      ],
      beforeAfter: [
        {
          aspect: 'Kênh tiếp cận khách hàng',
          before: 'Chờ thương lái vào tận vườn, bị ép giá vào mùa thu hoạch rộ',
          after: 'Có kênh đặt trước qua mạng, đơn hàng khách lẻ đều đặn hàng tuần'
        },
        {
          aspect: 'Thương hiệu & Truy xuất',
          before: 'Bán xô theo bao bì không nhãn mác, không biết nguồn gốc',
          after: 'Có tem nhãn "Bình Mỹ Safe Food" kèm QR code truy xuất ngày hái'
        },
        {
          aspect: 'Thu nhập nông hộ',
          before: 'Tỷ lệ lãi mỏng, dễ thua lỗ khi dội chợ',
          after: 'Giá trị thu về tăng 25–35% nhờ giảm trung gian'
        }
      ],
      lessons: [
        'Giao diện ứng dụng phải cực kỳ đơn giản, cỡ chữ lớn để người lớn tuổi đọc được dễ dàng.',
        'Sinh viên cần trực tiếp đồng hành "cầm tay chỉ việc" tại vườn ít nhất 2 tuần đầu.',
        'Chất lượng nông sản phải đồng đều tuyệt đối thì khách hàng mới duy trì đơn đặt định kỳ.'
      ],
      scalingPlan: 'Mở rộng áp dụng cho 25 hộ trồng rau ăn lá và cây ăn trái tại Ấp 3 và Ấp 4 trong Quý 4/2026, liên kết vào hệ thống căng tin các trường đại học.'
    }
  },
  {
    id: 'proj-02',
    code: 'DA-BM-02',
    field: 'healthcare',
    fieldLabel: 'Y TẾ',
    fieldEmoji: '🏥',
    title: 'HỆ THỐNG THEO DÕI SỨC KHỎE NGƯỜI CAO TUỔI TẠI NHÀ',
    summary: 'Ứng dụng Telehealth kết hợp máy đo huyết áp kết nối Bluetooth cho người già tại vùng nông thôn.',
    isFeatured: false,
    membersCount: 4,
    progressPercent: 65,
    status: 'in_progress',
    statusLabel: 'Đang triển khai',
    testedInBinhMy: true,
    location: 'Ấp 1, Bình Mỹ, Củ Chi',
    problemStatement: 'Người cao tuổi tại Bình Mỹ hay quên uống thuốc, chỉ số huyết áp dao động thất thường nhưng chỉ đo khi thấy chóng mặt, dẫn đến nguy cơ đột quỵ cao.',
    solutionStatement: 'Cung cấp máy đo huyết áp một nút bấm, dữ liệu tự đồng bộ về ứng dụng theo dõi của Trạm y tế và con cái; tin nhắn nhắc nhở tự động bằng giọng nói.',
    teamMembers: [
      {
        name: 'Lê Bảo Anh',
        role: 'Sinh viên Y khoa - ĐH Y Dược',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Hoàng Quốc Việt',
        role: 'Sinh viên Điện tử Viễn thông',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'BS. CKII Nguyễn Thị Lan',
        role: 'Bác sĩ cố vấn Lão khoa',
        type: 'expert',
        typeLabel: 'Chuyên gia',
        avatar: 'https://images.unsplash.com/photo-1594824813576-95f0013f9f3f?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Bác Tư Lành',
        role: 'Đại diện người cao tuổi thử nghiệm',
        type: 'resident',
        typeLabel: 'Hộ dân',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { phase: '01', title: 'Khảo sát nhu cầu người cao tuổi', completed: true },
      { phase: '02', title: 'Tích hợp thiết bị đo tự động', completed: true },
      { phase: '03', title: 'Thử nghiệm nhóm 10 bệnh nhân', completed: false, current: true },
      { phase: '04', title: 'Hoàn thiện hồ sơ theo dõi', completed: false }
    ],
    impact: {
      beforeText: 'Đo huyết áp thất thường, con cái đi làm xa không nắm được tình trạng sức khỏe của cha mẹ.',
      solutionText: 'Máy đo tự kết nối 4G/Bluetooth, dữ liệu gửi ngay về ứng dụng người thân và bác sĩ trạm y tế.',
      testingText: 'Đang theo dõi thí điểm 10 cụ già trên 65 tuổi tại Ấp 1.',
      stats: [
        { value: '10', label: 'Cụ già đang theo dõi', change: 'Thí điểm' },
        { value: '100%', label: 'Cảnh báo kịp thời khi huyết áp cao', change: 'An toàn' },
        { value: '92%', label: 'Uống thuốc đúng giờ theo chuông báo', change: 'Cải thiện' }
      ],
      realPhotos: [
        {
          url: '/news-health.jpg',
          caption: 'Bác sĩ và sinh viên hướng dẫn bà con cách sử dụng máy đo'
        }
      ],
      beforeAfter: [
        {
          aspect: 'Thời gian phát hiện bất thường',
          before: 'Chỉ biết khi đã bị chóng mặt, choáng váng',
          after: 'Phát hiện ngay sau lần đo buổi sáng, bác sĩ gọi điện tư vấn sớm'
        }
      ],
      lessons: [
        'Thiết bị phải dùng pin sạc lâu và có giọng nói tiếng Việt hướng dẫn từng bước.'
      ],
      scalingPlan: 'Nhân rộng lên 50 máy cho các hộ chính sách và người già neo đơn toàn xã Bình Mỹ.'
    }
  },
  {
    id: 'proj-03',
    code: 'DA-BM-03',
    field: 'tourism',
    fieldLabel: 'DU LỊCH',
    fieldEmoji: '🏝️',
    title: 'TOUR DU LỊCH TRẢI NGHIỆM XANH: MỘT NGÀY Ở BÌNH MỸ',
    summary: 'Tuyến tour trải nghiệm văn hóa nông nghiệp ven sông, kết hợp thưởng thức ẩm thực sạch và làm nông dân.',
    isFeatured: false,
    membersCount: 6,
    progressPercent: 90,
    status: 'tested',
    statusLabel: 'Đã thử nghiệm',
    testedInBinhMy: true,
    location: 'Ấp 2, Bình Mỹ, Củ Chi',
    problemStatement: 'Nhà vườn Bình Mỹ mát mẻ nhưng chưa biết cách làm du lịch, du khách đến chỉ ghé ăn uống rồi về, không có trải nghiệm sâu.',
    solutionStatement: 'Xây dựng gói trải nghiệm trọn gói: chèo xuồng ven rạch, tự tay hái rau sạch, làm bánh dân gian và nghe đờn ca tài tử.',
    teamMembers: [
      {
        name: 'Đặng Thảo Vy',
        role: 'Sinh viên Quản trị Du lịch - Trưởng nhóm',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Trần Minh Quang',
        role: 'Sinh viên Ngôn ngữ & Hướng dẫn viên',
        type: 'student',
        typeLabel: 'Sinh viên',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'ThS. Nguyễn Thu Hằng',
        role: 'Chuyên gia Du lịch bền vững',
        type: 'expert',
        typeLabel: 'Chuyên gia',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
      },
      {
        name: 'Chú Năm Hậu',
        role: 'Chủ vườn sinh thái Năm Hậu',
        type: 'resident',
        typeLabel: 'Hộ dân',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
      }
    ],
    timeline: [
      { phase: '01', title: 'Thiết kế hành trình tour', completed: true },
      { phase: '02', title: 'Tập huấn kỹ năng tiếp đón cho hộ dân', completed: true },
      { phase: '03', title: 'Chạy thử nghiệm 3 đoàn khách 90 người', completed: true },
      { phase: '04', title: 'Ký hợp tác với 3 công ty lữ hành', completed: false, current: true }
    ],
    impact: {
      beforeText: 'Vườn cây chỉ thu tiền bán vé vào cổng ít ỏi, dịch vụ nghèo nàn.',
      solutionText: 'Tạo sản phẩm tour có câu chuyện văn hóa, ẩm thực cây nhà lá vườn và quà lưu niệm đặc sản.',
      testingText: 'Đã đón 3 đoàn khách trải nghiệm với hơn 90 khách sinh viên và nhân viên văn phòng.',
      stats: [
        { value: '95%', label: 'Đánh giá hài lòng từ du khách', change: 'Rất tốt' },
        { value: '3x', label: 'Doanh thu trung bình mỗi ngày cuối tuần', change: 'Tăng trưởng' },
        { value: '06', label: 'Hộ dân phụ trợ hưởng lợi từ tour', change: 'Lan tỏa' }
      ],
      realPhotos: [
        {
          url: '/volunteer-green.jpg',
          caption: 'Du khách và sinh viên tham gia trải nghiệm làm nông dân tại Bình Mỹ'
        }
      ],
      beforeAfter: [
        {
          aspect: 'Thời gian lưu trú của khách',
          before: 'Khách ghé 1-2 tiếng rồi đi',
          after: 'Khách ở lại 5-7 tiếng trải nghiệm trọn ngày'
        }
      ],
      lessons: [
        'Cần chuẩn bị tốt phương án áo phao và an toàn đường thủy khi chèo xuồng ven kênh.'
      ],
      scalingPlan: 'Phối hợp cùng Hội Du lịch TP.HCM quảng bá tour dịp cuối tuần thường kỳ từ tháng 11/2026.'
    }
  }
];

// ==========================================
// 5. DANH SÁCH THÀNH VIÊN CỘNG ĐỒNG
// ==========================================
export const mockCommunityMembers: CommunityMember[] = [
  {
    id: 'mem-01',
    name: 'Nguyễn Văn An',
    roleType: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Khoa Công nghệ Thông tin - ĐH HUTECH',
    skills: ['CNTT', 'Web Frontend', 'UI/UX Design', 'Phân tích dữ liệu'],
    joinedProjectsCount: 3,
    bio: 'Đam mê ứng dụng công nghệ để giải quyết bài toán nông nghiệp và hỗ trợ bà con nông dân chuyển đổi số.',
    featuredProjects: ['Nền tảng quảng bá nông sản Bình Mỹ', 'Bản đồ số điểm đến Bình Mỹ'],
    email: 'an.nv@sinhvien.edu.vn'
  },
  {
    id: 'mem-02',
    name: 'Trần Thị Mai',
    roleType: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Khoa Quản trị Kinh doanh - ĐH Kinh tế',
    skills: ['Marketing', 'Truyền thông', 'Content Creator', 'Tổ chức sự kiện'],
    joinedProjectsCount: 2,
    bio: 'Thích kể câu chuyện đời sống nông thôn qua video ngắn và kết nối nông sản sạch đến tay người tiêu dùng trẻ.',
    featuredProjects: ['Nền tảng quảng bá nông sản Bình Mỹ'],
    email: 'mai.tt@sinhvien.edu.vn'
  },
  {
    id: 'mem-03',
    name: 'TS. Đặng Minh Tuấn',
    roleType: 'expert',
    roleLabel: 'Chuyên gia',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    department: 'Viện Đổi mới Sáng tạo & Phát triển Bền vững',
    skills: ['Đổi mới sáng tạo', 'Living Lab', 'Chuỗi cung ứng', 'Cố vấn khởi nghiệp'],
    joinedProjectsCount: 5,
    bio: 'Hơn 12 năm kinh nghiệm nghiên cứu mô hình Open Innovation tại châu Âu và đồng hành cùng các dự án nông nghiệp số tại Việt Nam.',
    featuredProjects: ['Nền tảng quảng bá nông sản Bình Mỹ', 'Tour du lịch trải nghiệm xanh'],
    email: 'tuan.dm@vieninno.edu.vn'
  },
  {
    id: 'mem-04',
    name: 'BS. CKII Nguyễn Thị Lan',
    roleType: 'expert',
    roleLabel: 'Chuyên gia',
    avatar: 'https://images.unsplash.com/photo-1594824813576-95f0013f9f3f?w=150&auto=format&fit=crop&q=80',
    department: 'Bệnh viện Đại học Y Dược TP.HCM',
    skills: ['Y học gia đình', 'Lão khoa', 'Telehealth', 'Truyền thông y tế'],
    joinedProjectsCount: 4,
    bio: 'Tận tâm với các hoạt động y tế cộng đồng, mong muốn mang kỹ thuật số giúp người già nông thôn được chăm sóc liên tục.',
    featuredProjects: ['Hệ thống theo dõi sức khỏe người cao tuổi tại nhà'],
    email: 'lan.nt@yduoc.edu.vn'
  },
  {
    id: 'mem-05',
    name: 'Công ty CP Nông sản Sạch EcoFarm',
    roleType: 'business',
    roleLabel: 'Doanh nghiệp',
    avatar: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&auto=format&fit=crop&q=80',
    department: 'Doanh nghiệp bao tiêu & logistics thực phẩm',
    skills: ['Bao tiêu sản phẩm', 'Logistics lạnh', 'Chứng nhận VietGAP', 'Tài trợ thử nghiệm'],
    joinedProjectsCount: 3,
    bio: 'Đồng hành cùng Làng SV để thử nghiệm chuỗi cung ứng nông sản an toàn trực tiếp từ Bình Mỹ về hệ thống phân phối sạch.',
    featuredProjects: ['Nền tảng quảng bá nông sản Bình Mỹ'],
    email: 'contact@ecofarm.vn'
  },
  {
    id: 'mem-06',
    name: 'Hợp tác xã Nông nghiệp Bình Mỹ Xanh',
    roleType: 'partner',
    roleLabel: 'Đối tác địa phương',
    avatar: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=150&auto=format&fit=crop&q=80',
    department: 'Liên hiệp các hộ sản xuất xã Bình Mỹ',
    skills: ['Thực địa', 'Vùng trồng', 'Kinh nghiệm bản địa', 'Huy động xã viên'],
    joinedProjectsCount: 6,
    bio: 'Cầu nối tin cậy giữa sinh viên, nhà khoa học với bà con nông dân và chính quyền địa phương.',
    featuredProjects: ['Nền tảng quảng bá nông sản', 'Bảo quản dược liệu sau thu hoạch'],
    email: 'htx.binhmy@cu-chi.gov.vn'
  },
  {
    id: 'mem-07',
    name: 'Lê Bảo Anh',
    roleType: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Khoa Y - ĐH Quốc gia TP.HCM',
    skills: ['Y khoa cộng đồng', 'Sơ cấp cứu', 'Truyền thông sức khỏe', 'Khảo sát dịch tễ'],
    joinedProjectsCount: 2,
    bio: 'Tích cực tham gia các trạm khám thiện nguyện và mong muốn đóng góp kiến thức y khoa cho cộng đồng Bình Mỹ.',
    featuredProjects: ['Hệ thống theo dõi sức khỏe người cao tuổi tại nhà'],
    email: 'baoanh.le@sinhvien.edu.vn'
  },
  {
    id: 'mem-08',
    name: 'Đặng Thảo Vy',
    roleType: 'student',
    roleLabel: 'Sinh viên',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Khoa Du lịch - ĐH Khoa học Xã hội & Nhân văn',
    skills: ['Du lịch cộng đồng', 'Điều hành tour', 'Ngoại ngữ', 'Văn hóa dân gian'],
    joinedProjectsCount: 2,
    bio: 'Yêu thiên nhiên và mong muốn quảng bá nét đẹp mộc mạc của Bình Mỹ tới bạn bè trong nước và quốc tế.',
    featuredProjects: ['Tour du lịch trải nghiệm xanh: Một ngày ở Bình Mỹ'],
    email: 'thaovy.dang@sinhvien.edu.vn'
  }
];

// ==========================================
// 6. CÁC ĐỀ XUẤT VẤN ĐỀ MẪU (DO DÂN GỬI)
// ==========================================
export const mockSubmittedProposals: ProblemProposalSubmission[] = [
  {
    id: 'sub-01',
    title: 'Hệ thống tưới tự động tiết kiệm nước cho vườn mai vàng',
    field: 'Nông nghiệp',
    description: 'Vào mùa khô, việc tưới nước tốn rất nhiều công lao động và không kiểm soát được lượng nước đều.',
    location: 'Ấp 4, Xã Bình Mỹ',
    desiredOutcome: 'Mong muốn có thiết bị tưới tự động giá rẻ có thể điều khiển qua điện thoại.',
    proposerName: 'Bác Sáu Hưng',
    proposerPhone: '0912 345 678',
    proposerRole: 'Hộ trồng hoa kiểng',
    submittedAt: '03/10/2026',
    status: 'pending_verification'
  }
];
