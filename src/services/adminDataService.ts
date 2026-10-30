import { 
  RealProblem, 
  ProblemStatus, 
  ProblemCategory, 
  AdminPartner, 
  PartnerCategory,
  AboutIntroConfig,
  TeamRole,
  ExpertDomain,
  TeamMember,
  TeamMemberGroup,
  TeamMemberStatus,
  AppUser,
  UserRole,
  ProblemProgressUpdate,
  ProblemStatusLog,
  FeedbackToken,
  ProblemFeedback
} from '../types';
import { initialRealProblems } from '../data/mockProblems';
import { 
  initialAboutIntro, 
  initialTeamRoles, 
  initialExpertDomains, 
  initialTeamMembers 
} from '../data/mockTeamData';
import {
  initialAppUsers,
  initialFeedbacks,
  initialFeedbackTokens
} from '../data/mockAuthData';

// ================= TYPES CHO ADMIN =================

export type ExtendedProblemStatus = 
  | 'pending'           // Chờ xác minh
  | 'reviewing'         // Đang xác minh
  | 'needs_update'      // Yêu cầu bổ sung
  | 'verified'          // Đã xác minh (sẵn sàng duyệt công khai)
  | 'published'         // Đã công khai trên website
  | 'seeking_support'   // Đang tìm người hỗ trợ
  | 'in_progress'       // Đang triển khai
  | 'rejected'          // Từ chối
  | 'archived';         // Đã lưu trữ

export type ProposalStatus =
  | 'new'               // Mới tiếp nhận
  | 'reviewing'         // Đang xem xét
  | 'needs_info'        // Cần bổ sung thông tin
  | 'contacted'         // Đã liên hệ
  | 'connecting'        // Đang kết nối các bên
  | 'connected'         // Đã kết nối thành công
  | 'unsuitable'        // Không phù hợp
  | 'closed';           // Đã đóng

export type ProjectImplementationStatus =
  | 'seeking_resources' // Đang tìm kiếm nguồn lực
  | 'recruiting'        // Đang tuyển thành viên/đối tác
  | 'in_progress'       // Đang triển khai
  | 'testing'           // Đang thử nghiệm
  | 'completed'         // Đã hoàn thành
  | 'paused';           // Tạm dừng

export type ProjectPublishStatus =
  | 'draft'             // Bản nháp
  | 'published'         // Đã xuất bản (hiển thị công khai)
  | 'hidden'            // Đã ẩn
  | 'archived';         // Đã lưu trữ

export interface AdminProposal {
  id: string;
  problemId?: string;
  problemCode?: string;
  problemTitle?: string;
  projectId?: string;
  projectTitle?: string;
  role: 'Sinh viên' | 'Chuyên gia' | 'Doanh nghiệp' | 'Đơn vị hỗ trợ / Tổ chức' | 'Khác';
  fullName: string;
  phone: string;
  email?: string;
  organization?: string;
  selectedFields: string[];
  solutionContent: string;
  availability: string;
  fileName?: string | null;
  status: ProposalStatus;
  statusHistory?: {
    status: ProposalStatus;
    note?: string;
    updatedAt: string;
    updatedBy?: string;
  }[];
  internalNotes?: string;
  assignedTo?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdminProject {
  id: string;
  code: string;
  title: string;
  titleEn?: string;
  thumbnail: string;
  gallery?: string[];
  summary: string;
  summaryEn?: string;
  content: string;
  objectives?: string[];
  problemId?: string;       // Liên kết bài toán nguồn
  problemTitle?: string;
  category: ProblemCategory | string;
  categoryName: string;
  location: string;
  organization: string;     // Đơn vị thực hiện
  partnerIds?: string[];    // Danh sách ID đối tác liên kết tham gia
  teamMembers?: string[];
  neededResources?: string;
  milestones?: { date: string; title: string; completed?: boolean }[];
  expectedOutcomes?: string;
  actualImpact?: string;
  implementationPeriod?: string;
  status: ProjectImplementationStatus;
  publishStatus: ProjectPublishStatus;
  createdAt: string;
  updatedAt: string;
}

export interface AdminNewsItem {
  id: string;
  title: string;
  category: 'Tin tức' | 'Sự kiện' | 'Thông báo' | 'Dự án';
  summary: string;
  content: string;
  image: string;
  author: string;
  publishedDate: string;
  isPublished: boolean;
  views: number;
}

export interface AdminContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  topic?: string;
  message: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  createdAt: string;
}

export interface AdminUser {
  id: string;
  username: string;
  fullName: string;
  email: string;
  role: 'superadmin' | 'moderator' | 'editor';
  avatar: string;
}

// ================= DỮ LIỆU KHỞI TẠO MẪU =================

const STORAGE_KEYS = {
  PROBLEMS: 'binhmy_real_problems_v3',
  PROPOSALS: 'binhmy_solution_proposals',
  PROJECTS: 'binhmy_admin_projects_v1',
  NEWS: 'binhmy_admin_news_v1',
  PARTNERS: 'binhmy_admin_partners_v1',
  CONTACTS: 'binhmy_contact_messages_v1',
  AUTH: 'binhmy_admin_auth_user',
  ABOUT_INTRO: 'binhmy_about_intro_v1',
  TEAM_ROLES: 'binhmy_team_roles_v1',
  EXPERT_DOMAINS: 'binhmy_expert_domains_v1',
  TEAM_MEMBERS: 'binhmy_team_members_v1',
  USERS: 'binhmy_app_users_v1',
  FEEDBACKS: 'binhmy_problem_feedbacks_v1',
  FEEDBACK_TOKENS: 'binhmy_feedback_tokens_v1',
  DELETED_PROBLEMS: 'binhmy_deleted_problems_v1'
};

/**
 * Phát sự kiện đồng bộ toàn ứng dụng (cả trong tab hiện tại và giữa các tab)
 */
export const dispatchSyncEvent = () => {
  if (typeof window !== 'undefined') {
    try {
      window.dispatchEvent(new Event('storage'));
      window.dispatchEvent(new CustomEvent('binhmy_data_updated'));
    } catch (_) {}
  }
};

// ================= DỮ LIỆU ĐỐI TÁC KHỞI TẠO =================
export const initialAdminPartners: AdminPartner[] = [
  {
    id: 'p-hutech',
    nameVi: 'Trường Đại học Công nghệ TP.HCM (HUTECH)',
    nameEn: 'HUTECH University',
    subVi: 'Đơn vị khởi xướng, bảo trợ học thuật, công nghệ đổi mới sáng tạo và nguồn nhân lực sinh viên',
    subEn: 'Academic sponsor, technology innovation & student talent initiator',
    category: 'strategic',
    type: 'university',
    logoUrl: '/hutech-partner-logo.png',
    websiteUrl: 'https://www.hutech.edu.vn',
    badge: 'Bảo trợ học thuật & ĐMST',
    roleVi: 'Trụ cột Học thuật & Công nghệ',
    roleEn: 'Academic & Technology Pillar',
    order: 1,
    showOnHomepage: true,
    isActive: true,
    createdAt: '01/10/2026'
  },
  {
    id: 'p-hutech-health',
    nameVi: 'Đại Học Y – Khoa học Sức Khỏe HUTECH',
    nameEn: 'HUTECH College of Health Sciences',
    subVi: 'Đào tạo nhân lực y tế, thực hành lâm sàng Living Lab và chăm sóc sức khỏe cộng đồng',
    subEn: 'Healthcare workforce training, Living Lab clinical practice & community health',
    category: 'strategic',
    type: 'hospital',
    logoUrl: '/hutech-partner-logo.png',
    websiteUrl: 'https://www.hutech.edu.vn/khoasuckhoe',
    badge: 'Bảo trợ Y tế & Sức khỏe',
    roleVi: 'Trụ cột Y tế & Sức khỏe cộng đồng',
    roleEn: 'Healthcare & Wellness Pillar',
    order: 2,
    showOnHomepage: true,
    isActive: true,
    createdAt: '01/10/2026'
  },
  {
    id: 'p-ubnd-binh-my',
    nameVi: 'Ủy ban nhân dân Xã Bình Mỹ',
    nameEn: "Binh My Commune People's Committee",
    subVi: 'Chính quyền địa phương bảo trợ địa bàn, hỗ trợ pháp lý và kết nối các bài toán thực tiễn',
    subEn: 'Local government partner, operational site sponsor & community challenges connector',
    category: 'strategic',
    type: 'government',
    logoUrl: '/ubnd-binh-my-logo.svg',
    websiteUrl: 'https://binhmy.cuchi.hochiminhcity.gov.vn',
    badge: 'Chính quyền địa phương',
    roleVi: 'Trụ cột Địa bàn & Đời sống thực tiễn',
    roleEn: 'Local Ground & Community Reality Pillar',
    order: 3,
    showOnHomepage: true,
    isActive: true,
    createdAt: '01/10/2026'
  },
  {
    id: 'p-solar-ngoc-anh',
    nameVi: 'Doanh nghiệp Solar Ngọc Anh',
    nameEn: 'Ngoc Anh Solar Enterprise',
    subVi: 'Đơn vị đồng hành giải pháp điện năng lượng mặt trời, chuyển đổi năng lượng xanh cho nông nghiệp & cộng đồng',
    subEn: 'Renewable energy partner providing rooftop solar solutions for eco-farms and local community',
    category: 'strategic',
    type: 'enterprise',
    logoUrl: '/partner-solar-ngoc-anh-clean.png',
    websiteUrl: 'https://solarngocanh.vn',
    badge: 'Doanh nghiệp Năng lượng',
    roleVi: 'Trụ cột Năng lượng Xanh & Đổi mới sáng tạo',
    roleEn: 'Green Energy & Innovation Pillar',
    order: 4,
    showOnHomepage: true,
    isActive: true,
    createdAt: '01/10/2026'
  },
  {
    id: 'p-rmit',
    nameVi: 'Đại học RMIT Việt Nam',
    nameEn: 'RMIT University Vietnam',
    subVi: 'Nghiên cứu ứng dụng & Khởi nghiệp',
    subEn: 'Applied research & Innovation entrepreneurship',
    category: 'university',
    type: 'university',
    logoUrl: '/partner-rmit.png',
    websiteUrl: 'https://www.rmit.edu.vn',
    badge: 'Đại học quốc tế',
    order: 5,
    showOnHomepage: true,
    isActive: true,
    createdAt: '02/10/2026'
  },
  {
    id: 'p-coventry',
    nameVi: 'Coventry University (Vương quốc Anh)',
    nameEn: 'Coventry University UK',
    subVi: 'Trao đổi học thuật & Y tế cộng đồng',
    subEn: 'Academic exchange & Public community healthcare',
    category: 'university',
    type: 'university',
    logoUrl: '/partner-coventry.png',
    websiteUrl: 'https://www.coventry.ac.uk',
    badge: 'Đối tác Anh Quốc',
    order: 6,
    showOnHomepage: true,
    isActive: true,
    createdAt: '02/10/2026'
  },
  {
    id: 'p-nottingham',
    nameVi: 'University of Nottingham',
    nameEn: 'University of Nottingham',
    subVi: 'Nghiên cứu nông nghiệp & Dược liệu',
    subEn: 'Agriculture & Herbal medicine research',
    category: 'university',
    type: 'university',
    logoUrl: '/partner-nottingham.png',
    websiteUrl: 'https://www.nottingham.ac.uk',
    badge: 'Đối tác Anh Quốc',
    order: 7,
    showOnHomepage: true,
    isActive: true,
    createdAt: '02/10/2026'
  },
  {
    id: 'p-bachmai',
    nameVi: 'Bệnh viện Bạch Mai',
    nameEn: 'Bach Mai Hospital',
    subVi: 'Cố vấn chuyên môn lâm sàng & Đào tạo',
    subEn: 'Clinical advisory & Medical training',
    category: 'hospital',
    type: 'hospital',
    badge: 'Bệnh viện tuyến đầu',
    websiteUrl: 'https://bachmai.gov.vn',
    order: 8,
    showOnHomepage: true,
    isActive: true,
    createdAt: '03/10/2026'
  },
  {
    id: 'p-pasteur',
    nameVi: 'Viện Pasteur TP. Hồ Chí Minh',
    nameEn: 'Pasteur Institute HCMC',
    subVi: 'Nghiên cứu dịch tễ & Y tế dự phòng cơ sở',
    subEn: 'Epidemiological research & Preventive medicine',
    category: 'hospital',
    type: 'hospital',
    badge: 'Viện nghiên cứu',
    websiteUrl: 'https://pasteurhcm.gov.vn',
    order: 9,
    showOnHomepage: true,
    isActive: true,
    createdAt: '03/10/2026'
  },
  {
    id: 'p-tramyte',
    nameVi: 'Trạm Y tế Xã Bình Mỹ',
    nameEn: 'Binh My Commune Health Station',
    subVi: 'Điểm thực nghiệm Living Lab y tế cơ sở',
    subEn: 'Primary healthcare Living Lab experimental hub',
    category: 'hospital',
    type: 'hospital',
    badge: 'Y tế cơ sở',
    order: 10,
    showOnHomepage: true,
    isActive: true,
    createdAt: '03/10/2026'
  },
  {
    id: 'p-cuchi',
    nameVi: 'Bệnh viện Đa khoa Khu vực Củ Chi',
    nameEn: 'Cu Chi Regional General Hospital',
    subVi: 'Mạng lưới chuyển viện & Hội chẩn Telehealth',
    subEn: 'Referral network & Telehealth consultation',
    category: 'hospital',
    type: 'hospital',
    badge: 'Bệnh viện khu vực',
    websiteUrl: 'https://bvdkkvcuchi.vn',
    order: 11,
    showOnHomepage: true,
    isActive: true,
    createdAt: '03/10/2026'
  },
  {
    id: 'p-htx',
    nameVi: 'HTX Nông nghiệp Sinh thái Bình Mỹ',
    nameEn: 'Binh My Eco-Agriculture Cooperative',
    subVi: 'Chuỗi giá trị OCOP & Vùng nguyên liệu sạch',
    subEn: 'Clean raw material supply & OCOP value chain',
    category: 'enterprise',
    type: 'enterprise',
    badge: 'Hợp tác xã',
    order: 12,
    showOnHomepage: true,
    isActive: true,
    createdAt: '04/10/2026'
  },
  {
    id: 'p-vingroup',
    nameVi: 'Tập đoàn Vingroup',
    nameEn: 'Vingroup Corporation',
    subVi: 'Đồng hành ươm mầm khởi nghiệp xanh',
    subEn: 'Green startup incubation sponsor',
    category: 'enterprise',
    type: 'enterprise',
    badge: 'Doanh nghiệp',
    websiteUrl: 'https://vingroup.net',
    order: 13,
    showOnHomepage: true,
    isActive: true,
    createdAt: '04/10/2026'
  },
  {
    id: 'p-jica',
    nameVi: 'Cơ quan Hợp tác Quốc tế Nhật Bản (JICA)',
    nameEn: 'Japan International Cooperation Agency',
    subVi: 'Hỗ trợ kỹ thuật & Dự án bền vững',
    subEn: 'Technical assistance & Sustainable development',
    category: 'international',
    type: 'international',
    logoUrl: '/partner-jica.png',
    websiteUrl: 'https://www.jica.go.jp/vietnam',
    badge: 'Tổ chức Nhật Bản',
    order: 14,
    showOnHomepage: true,
    isActive: true,
    createdAt: '05/10/2026'
  },
  {
    id: 'p-koica',
    nameVi: 'Cơ quan Hợp tác Quốc tế Hàn Quốc (KOICA)',
    nameEn: 'Korea International Cooperation Agency',
    subVi: 'Giao lưu chuyên gia & Đào tạo nhân lực',
    subEn: 'Expert exchange & Human resources training',
    category: 'international',
    type: 'international',
    logoUrl: '/partner-koica.png',
    websiteUrl: 'https://www.koica.go.kr',
    badge: 'Tổ chức Hàn Quốc',
    order: 15,
    showOnHomepage: true,
    isActive: true,
    createdAt: '05/10/2026'
  },
  {
    id: 'p-daad',
    nameVi: 'Cơ quan Trao đổi Hàn lâm Đức (DAAD)',
    nameEn: 'German Academic Exchange Service',
    subVi: 'Học bổng nghiên cứu & Kết nối viện trường Đức',
    subEn: 'Research scholarships & German university alliance',
    category: 'international',
    type: 'international',
    logoUrl: '/partner-daad.png',
    websiteUrl: 'https://www.daad-vietnam.vn',
    badge: 'Tổ chức Đức',
    order: 16,
    showOnHomepage: true,
    isActive: true,
    createdAt: '05/10/2026'
  },
  {
    id: 'p-erasmus',
    nameVi: 'Chương trình Erasmus+ (Liên minh Châu Âu)',
    nameEn: 'Erasmus+ European Union',
    subVi: 'Dự án nâng cao năng lực giáo dục đại học',
    subEn: 'Capacity building in higher education projects',
    category: 'international',
    type: 'international',
    logoUrl: '/partner-erasmus.png',
    websiteUrl: 'https://erasmus-plus.ec.europa.eu',
    badge: 'Liên minh Châu Âu',
    order: 17,
    showOnHomepage: true,
    isActive: true,
    createdAt: '05/10/2026'
  }
];

// Bài toán bổ sung cho Admin duyệt
const additionalMockProblems: (RealProblem & { moderationNote?: string })[] = [
  {
    id: 'prob-7',
    submitterType: 'Nông dân / Hộ sản xuất',
    contactName: 'Trần Văn Ba (Ba Phi)',
    organizationName: 'Hộ trồng lúa Ấp 1, Xã Bình Mỹ',
    phoneNumber: '0903 111 222',
    email: 'baphi.binhmy@gmail.com',
    location: 'Ấp 1, Xã Bình Mỹ, Củ Chi, TP.HCM',
    locationEn: 'Hamlet 1, Binh My Commune, Cu Chi, HCMC',
    title: 'Xử lý phế phụ phẩm rơm rạ sau vụ đông xuân tránh đốt đồng gây khói mù',
    titleEn: 'Rice straw post-harvest processing to prevent smoke pollution from open field burning',
    category: 'agriculture',
    categoryDetail: 'Nông nghiệp tuần hoàn',
    categoryDetailEn: 'Circular Agriculture',
    description: 'Sau mỗi vụ thu hoạch lúa đông xuân, lượng rơm rạ tồn đọng trên ruộng rất lớn. Nông dân thường đốt đồng gây ô nhiễm không khí và lãng phí sinh khối hữu cơ quý giá.',
    descriptionEn: 'After the winter-spring harvest, large amounts of rice straw remain on fields. Open burning causes air pollution and wastes valuable organic biomass.',
    occurredTime: 'Trên 1 năm',
    affectedAudience: 'Cộng đồng địa phương',
    cause: 'Thiếu máy cuộn rơm cơ giới hóa và thiếu liên kết thu mua làm nấm rơm hoặc ủ phân vi sinh.',
    causeEn: 'Lack of motorized balers and procurement linkages for mushroom cultivation or compost.',
    triedSolutions: 'Tự cày vùi rơm vào đất nhưng thời gian ngâm phân hủy chậm gây ngộ độc hữu cơ cho vụ sau.',
    damages: 'Khói bụi ảnh hưởng đường giao thông ven Tỉnh Lộ 9, suy giảm vi sinh vật có ích trong đất.',
    desiredOutcome: 'Có giải pháp thu gom, ủ men vi sinh phân hủy nhanh hoặc mô hình liên kết trồng nấm rơm công nghệ cao mang lại thêm thu nhập.',
    desiredOutcomeEn: 'Introduce rapid microbial decomposition or high-tech straw mushroom cultivation cooperatives.',
    supportNeeded: ['Công nghệ sinh học', 'Thiết bị máy móc', 'Kết nối doanh nghiệp tiêu thụ'],
    readyToCoordinate: 'Có',
    canSupportTesting: 'Có',
    images: ['/assets/problems/card1.jpg'],
    status: 'pending', // Chờ Admin kiểm duyệt
    createdAt: '08/10/2026',
    isPublic: false
  },
  {
    id: 'prob-8',
    submitterType: 'Đại diện đơn vị địa phương',
    contactName: 'BS. Lê Thị Thu Hằng',
    organizationName: 'Trạm Y tế Xã Bình Mỹ',
    phoneNumber: '0988 333 444',
    email: 'tramyte.binhmy@tphcm.gov.vn',
    location: 'Ấp 3, Xã Bình Mỹ, Củ Chi, TP.HCM',
    locationEn: 'Hamlet 3, Binh My Commune, Cu Chi, HCMC',
    title: 'Tầm soát và theo dõi đường huyết cộng đồng cho người cao tuổi khó tiếp cận y tế',
    titleEn: 'Community blood sugar screening and remote monitoring for elderly with limited healthcare access',
    category: 'health',
    categoryDetail: 'Y tế cộng đồng',
    categoryDetailEn: 'Community Health',
    description: 'Tại các ấp vùng sâu ven rạch, người cao tuổi mắc đái tháo đường và tăng huyết áp gặp nhiều khó khăn khi di chuyển đến trung tâm y tế để kiểm tra chỉ số định kỳ.',
    descriptionEn: 'Elderly residents in riverside hamlets face mobility challenges traveling to medical centers for diabetes and hypertension checkups.',
    occurredTime: 'Từ 6 tháng đến 1 năm',
    affectedAudience: 'Người cao tuổi và gia đình',
    cause: 'Thiếu thiết bị đo lưu động và thiếu phần mềm theo dõi chỉ số sức khỏe liên tục tại nhà.',
    desiredOutcome: 'Xây dựng mạng lưới đo lưu động kết hợp sinh viên y khoa tình nguyện định kỳ cuối tuần.',
    supportNeeded: ['Nhân lực y tế tình nguyện', 'Thiết bị y tế mini', 'Ứng dụng ghi nhận chỉ số'],
    readyToCoordinate: 'Có',
    canSupportTesting: 'Có',
    images: ['/assets/problems/card6.jpg'],
    status: 'pending', // Chờ Admin kiểm duyệt
    createdAt: '07/10/2026',
    isPublic: false
  },
  {
    id: 'prob-9',
    submitterType: 'Cơ sở kinh doanh',
    contactName: 'Nguyễn Thị Mai',
    organizationName: 'Vườn sinh thái Bờ Sông Mai Garden',
    phoneNumber: '0918 555 666',
    email: 'maigarden.binhmy@gmail.com',
    location: 'Ấp 5, Xã Bình Mỹ, Củ Chi, TP.HCM',
    locationEn: 'Hamlet 5, Binh My Commune, Cu Chi, HCMC',
    title: 'Phát triển mô hình vườn hoa cánh bướm ven đê kết hợp điểm dừng chân du lịch cộng đồng',
    titleEn: 'Developing cosmos flower garden stopover combined with community eco-tourism',
    category: 'tourism',
    categoryDetail: 'Du lịch nông nghiệp',
    categoryDetailEn: 'Agri-tourism',
    description: 'Cơ sở có 12.000m² đất ven sông nhưng chưa biết cách quy hoạch cảnh quan và tổ chức dịch vụ trải nghiệm cho du khách gia đình cuối tuần.',
    descriptionEn: '12,000 sqm riverside site lacks landscape planning and family experiential service design.',
    occurredTime: 'Dưới 6 tháng',
    affectedAudience: 'Cơ sở kinh doanh và người làm vườn',
    desiredOutcome: 'Được hỗ trợ thiết kế cảnh quan sinh thái và đào tạo kỹ năng tiếp đón du khách.',
    supportNeeded: ['Thiết kế kiến trúc cảnh quan', 'Marketing du lịch'],
    readyToCoordinate: 'Có, nếu được hướng dẫn',
    canSupportTesting: 'Có',
    images: ['/assets/problems/card3.jpg'],
    status: 'seeking_support',
    createdAt: '01/10/2026',
    isPublic: true
  }
];

// Danh sách đề xuất hợp tác mẫu
const initialProposals: AdminProposal[] = [
  {
    id: 'prop-101',
    problemId: 'prob-1',
    problemCode: 'BM-001',
    problemTitle: 'Rau ăn lá thủy canh nhanh héo sau thu hoạch và thiếu giải pháp bảo quản sơ chế',
    role: 'Sinh viên',
    fullName: 'Nguyễn Thị Minh Thư',
    phone: '0912 345 678',
    email: 'thu.nguyen@hutech.edu.vn',
    organization: 'Khoa Công nghệ Sinh học - ĐH HUTECH',
    selectedFields: ['Marketing / Truyền thông', 'Công nghệ / CNTT', 'Kinh doanh / Phát triển thị trường'],
    solutionContent: 'Nhóm nghiên cứu sinh viên chúng tôi đã thử nghiệm thành công chế phẩm màng bọc sinh học từ vỏ tôm (Chitosan) giúp rau thủy canh giữ tươi lâu hơn 5-7 ngày trong điều kiện tự nhiên. Chúng tôi có thể xuống trực tiếp Ấp 4A chuyển giao miễn phí và cùng hộ dân thử nghiệm.',
    availability: 'Tham gia thường xuyên',
    fileName: 'de_xuat_mang_sinh_hoc_chitosan.pdf',
    status: 'new',
    internalNotes: 'Ý tưởng rất tiềm năng, phù hợp với định hướng Living Lab nông nghiệp sạch. Cần liên hệ chủ nhiệm khoa để xác nhận bảo trợ chuyên môn.',
    createdAt: '08/10/2026',
    updatedAt: '08/10/2026'
  },
  {
    id: 'prop-102',
    problemId: 'prob-2',
    problemCode: 'BM-002',
    problemTitle: 'Người cao tuổi làm nông bị thoái hóa khớp gối nặng và thiếu kiến thức phục hồi chức năng',
    role: 'Chuyên gia',
    fullName: 'ThS. BS. Trần Hoàng Quân',
    phone: '0983 888 999',
    email: 'quan.tran@medvn.org',
    organization: 'Hội Bác sĩ Gia đình & Phục hồi chức năng TP.HCM',
    selectedFields: ['Y tế', 'Nghiên cứu / Khảo sát'],
    solutionContent: 'Chúng tôi có thể cử đoàn 6 y bác sĩ chuyên khoa cơ xương khớp xuống tổ chức khám sàng lọc miễn phí cho 120 hội viên cao tuổi tại Ấp 2 vào sáng Chủ nhật hàng tháng, đồng thời in cẩm nang bài tập vật lý trị liệu hướng dẫn tận tay người dân.',
    availability: 'Tư vấn / hỗ trợ theo từng dự án',
    fileName: 'ke_hoach_kham_sang_loc_khop_binh_my.docx',
    status: 'reviewing',
    internalNotes: 'Đã trao đổi sơ bộ với Trạm Y tế xã Bình Mỹ, các bên đều ủng hộ. Đang lên lịch phối hợp địa điểm Hội trường Ấp 2.',
    createdAt: '06/10/2026',
    updatedAt: '07/10/2026'
  },
  {
    id: 'prop-103',
    problemId: 'prob-5',
    problemCode: 'BM-005',
    problemTitle: 'Sản phẩm mật ong hoa dược liệu thiếu giải pháp dán nhãn, truy xuất nguồn gốc OCOP',
    role: 'Doanh nghiệp',
    fullName: 'Lê Hoàng Phong',
    phone: '0909 234 567',
    email: 'phong.lh@ecotrace.vn',
    organization: 'Công ty Cổ phần Giải pháp Truy xuất Nguồn gốc EcoTrace',
    selectedFields: ['Công nghệ / CNTT', 'Thiết kế', 'Kinh doanh / Phát triển thị trường'],
    solutionContent: 'EcoTrace tài trợ miễn phí 1.000 tem QR Code truy xuất nguồn gốc chống giả và hỗ trợ thiết kế lại bộ bao bì chuẩn OCOP 3 sao cho Cơ sở mật ong Ấp 3.',
    availability: 'Tư vấn / hỗ trợ theo từng dự án',
    fileName: 'ho_so_nang_luc_ecotrace.pdf',
    status: 'contacted',
    internalNotes: 'Đã kết nối điện thoại giữa anh Phong và chủ cơ sở mật ong. Đang gửi mẫu mật ong để thiết kế tem nhãn thử nghiệm.',
    createdAt: '03/10/2026',
    updatedAt: '05/10/2026'
  },
  {
    id: 'prop-104',
    problemId: 'prob-3',
    problemCode: 'BM-003',
    problemTitle: 'Nhà vườn ven sông Sài Gòn thiếu kỹ năng đóng gói tour và tiếp thị du lịch trải nghiệm',
    role: 'Sinh viên',
    fullName: 'Phạm Minh Trang',
    phone: '0937 456 789',
    email: 'trang.pm@tourism-edu.vn',
    organization: 'CLB Du lịch Sinh thái Trẻ',
    selectedFields: ['Marketing / Truyền thông', 'Du lịch', 'Thiết kế'],
    solutionContent: 'Nhóm sinh viên chuyên ngành Du lịch - Khách sạn có thể thiết kế trọn gói lịch trình tour trải nghiệm 1 ngày "Một ngày làm nông dân ven sông Sài Gòn" và xây dựng kênh TikTok quảng bá miễn phí.',
    availability: 'Tham gia bán thời gian',
    fileName: null,
    status: 'connected',
    internalNotes: 'Đã hoàn tất kết nối! Đang triển khai thử nghiệm tour đầu tiên vào ngày 25/10/2026.',
    createdAt: '29/09/2026',
    updatedAt: '04/10/2026'
  }
];

// Danh sách dự án mẫu
const initialProjects: AdminProject[] = [
  {
    id: 'proj-1',
    code: 'DA-BM01',
    title: 'Màng bọc sinh học Chitosan bảo quản nông sản sạch Bình Mỹ',
    titleEn: 'Chitosan Bio-coating for Preserving Fresh Produce in Binh My',
    thumbnail: '/assets/problems/card1.jpg',
    summary: 'Dự án nghiên cứu và chuyển giao công nghệ bảo quản rau thủy canh bằng màng sinh học an toàn sinh học từ phụ phẩm tôm cua, kéo dài thời gian tươi từ 2 ngày lên 7 ngày.',
    summaryEn: 'Research and transfer of edible bio-coating from chitosan for hydroponic vegetables, extending shelf life from 2 to 7 days.',
    content: 'Dự án hình thành trực tiếp từ Bài toán thực tế BM-001 của Tổ hợp tác Rau an toàn Ấp 4A. Nhóm sinh viên Công nghệ Sinh học cùng chuyên gia bảo quản sau thu hoạch đã tiến hành thử nghiệm trên 300kg rau cải xà lách và cải ngọt với kết quả tỷ lệ thối hỏng giảm dưới 4%.',
    problemId: 'prob-01',
    problemTitle: 'Rau ăn lá thủy canh nhanh héo sau thu hoạch và thiếu giải pháp bảo quản mát',
    category: 'agriculture',
    categoryName: 'Nông nghiệp tuần hoàn',
    location: 'Ấp 4A, Xã Bình Mỹ, Củ Chi',
    organization: 'Khoa Công nghệ Sinh học HUTECH & Tổ hợp tác Rau an toàn Ấp 4A',
    teamMembers: ['TS. Lê Văn Hải (Cố vấn)', 'Nguyễn Thị Minh Thư (Chủ nhiệm dự án)', 'Lê Văn An (Đại diện nông dân)'],
    neededResources: 'Máy phun phủ sương màng bọc mini, kho lạnh mini 15m3',
    milestones: [
      { date: '10/2026', title: 'Khảo sát thực tế và lấy mẫu rau', completed: true },
      { date: '11/2026', title: 'Thử nghiệm công thức phối trộn màng sinh học', completed: false },
      { date: '12/2026', title: 'Đánh giá vi sinh và chuyển giao hộ nông dân', completed: false }
    ],
    expectedOutcomes: 'Giảm 70% lượng rau hỏng sau thu hoạch, nâng doanh thu hộ gia đình thêm 25%.',
    status: 'in_progress',
    publishStatus: 'published',
    createdAt: '01/10/2026',
    updatedAt: '08/10/2026'
  },
  {
    id: 'proj-2',
    code: 'DA-BM02',
    title: 'Câu lạc bộ Bác sĩ gia đình và phục hồi chức năng xương khớp người cao tuổi',
    titleEn: 'Family Doctor & Joint Rehabilitation Club for Rural Elderly',
    thumbnail: '/assets/problems/home_card3.jpg',
    summary: 'Chương trình chăm sóc sức khỏe chủ động tại chỗ kết hợp đo khám định kỳ và tập luyện vật lý trị liệu cho người cao tuổi làm nông tại vùng nông thôn.',
    summaryEn: 'Community-based proactive healthcare and physical therapy program for rural farming seniors.',
    content: 'Được chuyển giao từ Bài toán BM-002, dự án tạo mạng lưới theo dõi sức khỏe giữa Trạm Y tế, Chi hội Người cao tuổi và đoàn Bác sĩ tình nguyện. Tổ chức các buổi tư vấn dinh dưỡng cơ xương khớp và bài tập thực hành giảm tải khớp gối trong lao động.',
    problemId: 'prob-02',
    problemTitle: 'Người cao tuổi làm nông bị thoái hóa khớp gối nặng và thiếu kiến thức phục hồi',
    category: 'health',
    categoryName: 'Y tế cộng đồng',
    location: 'Ấp 2, Xã Bình Mỹ, Củ Chi',
    organization: 'Hội Bác sĩ Gia đình TP.HCM & Trạm Y tế Xã Bình Mỹ',
    teamMembers: ['ThS. BS. Trần Hoàng Quân', 'BS. Lê Thị Thu Hằng', 'Bác Hai Cảnh (Trưởng ấp 2)'],
    neededResources: 'Dụng cụ tập vật lý trị liệu cơ bản, máy đo mật độ xương lưu động',
    status: 'in_progress',
    publishStatus: 'published',
    createdAt: '28/09/2026',
    updatedAt: '05/10/2026'
  },
  {
    id: 'proj-3',
    code: 'DA-BM03',
    title: 'Cổng thông tin và bản đồ số du lịch sinh thái trải nghiệm ven sông Bình Mỹ',
    titleEn: 'Digital Map & Portal for Riverside Eco-Tourism in Binh My',
    thumbnail: '/assets/problems/card2.jpg',
    summary: 'Số hóa 15 điểm nhà vườn ven sông, xây dựng mã QR tại bến đò Rạch Tra và kết nối tour trải nghiệm hái bưởi, bắt cá giải trí cho du khách thành phố.',
    summaryEn: 'Digitizing 15 riverside orchards, establishing QR points at Rach Tra ferry and connecting experiential fruit picking tours.',
    content: 'Dự án kết nối nhà vườn nông nghiệp ven sông với các trường đại học để đón các đoàn sinh viên học tập ngoại khóa và du khách gia đình cuối tuần.',
    problemId: 'prob-03',
    problemTitle: 'Nhà vườn ven sông Sài Gòn thiếu kỹ năng đóng gói tour du lịch sinh thái miệt vườn',
    category: 'tourism',
    categoryName: 'Du lịch cộng đồng',
    location: 'Bến đò Rạch Tra, Ấp 5, Xã Bình Mỹ',
    organization: 'CLB Khởi nghiệp Du lịch & HTX Nông nghiệp Du lịch Bình Mỹ',
    status: 'seeking_resources',
    publishStatus: 'published',
    createdAt: '25/09/2026',
    updatedAt: '02/10/2026'
  },
  {
    id: 'proj-4',
    code: 'DA-BM04',
    title: 'Trạm năng lượng mặt trời thông minh và hệ thống IoT quan trắc môi trường nông hộ',
    titleEn: 'Smart Solar Station & IoT Environmental Monitoring for Farming Households',
    thumbnail: '/assets/problems/proj_4.jpg',
    summary: 'Lắp đặt mô hình trạm pin năng lượng mặt trời kết hợp cảm biến IoT đo độ ẩm, nhiệt độ và chất lượng nguồn nước phục vụ tưới tiêu tự động cho nông dân Bình Mỹ.',
    summaryEn: 'Deploying solar-powered IoT stations measuring moisture, temperature and water quality for automated smart farming in Binh My.',
    content: 'Dự án nghiên cứu giải pháp năng lượng tái tạo kết hợp chuyển đổi số nông nghiệp, hỗ trợ các hộ trồng rau, cây ăn trái tại Bình Mỹ giảm 50% chi phí điện năng và tự động hóa hệ thống tưới tiêu thông minh thông qua ứng dụng di động.',
    problemId: 'prob-04',
    problemTitle: 'Ứng dụng năng lượng sạch và chuyển đổi số trong canh tác nông nghiệp sinh thái',
    category: 'innovation',
    categoryName: 'Đổi mới sáng tạo',
    location: 'Ấp 1, Xã Bình Mỹ, Củ Chi',
    organization: 'Trường ĐH Bách Khoa TP.HCM & Đoàn Thanh niên Xã Bình Mỹ',
    teamMembers: ['TS. Nguyễn Văn Hùng (Cố vấn kỹ thuật)', 'Trần Hoàng Nam (Trưởng nhóm IoT)', 'Nguyễn Văn Đạt (Đại diện thanh niên nông thôn)'],
    neededResources: 'Tấm pin năng lượng mặt trời 450W, bo mạch cảm biến IoT LoraWan, pin lưu trữ Lithium',
    milestones: [
      { date: '10/2026', title: 'Khảo sát hiện trường và thiết kế trạm thí điểm', completed: true },
      { date: '11/2026', title: 'Lắp đặt phần cứng và kết nối cảm biến đám mây', completed: false },
      { date: '12/2026', title: 'Bàn giao và hướng dẫn nông dân vận hành', completed: false }
    ],
    expectedOutcomes: 'Cung cấp nguồn điện xanh liên tục cho hệ thống tưới tiêu, cảnh báo sớm biến động chất lượng nước và tiết kiệm 30% nước tưới.',
    status: 'testing',
    publishStatus: 'published',
    createdAt: '20/09/2026',
    updatedAt: '06/10/2026'
  }
];

// Danh sách tin tức mẫu (đồng bộ với dữ liệu quản trị thực tế)
const initialNews: AdminNewsItem[] = [
  {
    id: 'news-1',
    title: 'Khởi động chương trình kết nối Bài toán thực tế tại Làng Sinh Viên Bình Mỹ tháng 10/2026',
    category: 'Sự kiện',
    summary: 'Ban quản lý Làng SV chính thức tiếp nhận và công bố 6 bài toán thực tế đầu tiên về nông nghiệp, y tế và du lịch trải nghiệm sinh thái.',
    content: 'Chương trình thu hút hơn 30 nhóm sinh viên và nhà khoa học đăng ký tham gia khảo sát thực địa. Các bài toán tập trung vào giải quyết nỗi đau thực tế của nông dân và hộ sản xuất địa phương.',
    image: '/assets/problems/banner-clean.png',
    author: 'Ban Quản Lý Làng SV',
    publishedDate: '05/10/2026',
    isPublished: true,
    views: 342
  }
];

// Tài khoản Admin mặc định
const DEFAULT_ADMIN: AdminUser = {
  id: 'admin-01',
  username: 'admin',
  fullName: 'Ban Quản Trị Làng SV',
  email: 'admin@binhmy.edu.vn',
  role: 'superadmin',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80'
};

// ================= ADMIN DATA SERVICE =================

export class AdminDataService {
  
  /**
   * Đăng ký lắng nghe sự kiện đồng bộ dữ liệu (hỗ trợ cả cùng tab và cross-tab)
   */
  static subscribe(callback: () => void): () => void {
    if (typeof window === 'undefined') return () => {};
    const handler = () => callback();
    window.addEventListener('storage', handler);
    window.addEventListener('binhmy_data_updated', handler);
    return () => {
      window.removeEventListener('storage', handler);
      window.removeEventListener('binhmy_data_updated', handler);
    };
  }

  // 1. Quản lý Bài toán thực tế
  static getDeletedProblemIds(): string[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.DELETED_PROBLEMS);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (_) {}
    return [];
  }

  static getProblems(): RealProblem[] {
    const normalize = (p: RealProblem, idx: number): RealProblem => {
      const code = p.code || `BM-${String(idx + 1).padStart(3, '0')}`;
      const isPub = p.status === 'verified' || 
                    p.status === 'seeking_support' || 
                    p.status === 'in_progress' || 
                    p.status === 'evaluating' || 
                    p.status === 'completed';
      return {
        ...p,
        code,
        isPublic: p.isPublic !== undefined ? p.isPublic : isPub,
        progressUpdates: p.progressUpdates || [],
        statusLogs: p.statusLogs || []
      };
    };

    const deletedIds = this.getDeletedProblemIds();

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROBLEMS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed
            .filter((item: RealProblem) => !deletedIds.includes(item.id))
            .map((item: RealProblem, idx: number) => normalize(item, idx));
        }
      }
    } catch (e) {
      console.error('Error reading problems:', e);
    }

    // Kết hợp initial + additional problems (loại bỏ những bài đã từng bị xóa)
    const allInitial = [...initialRealProblems, ...additionalMockProblems]
      .filter(item => !deletedIds.includes(item.id))
      .map((item, idx) => normalize(item, idx));
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(allInitial));
    return allInitial;
  }

  static getProblemById(id: string): RealProblem | null {
    const list = this.getProblems();
    return list.find(p => p.id === id) || null;
  }

  static getProblemByCode(code: string): RealProblem | null {
    if (!code) return null;
    const clean = code.trim().toLowerCase();
    const list = this.getProblems();
    return list.find(p => (p.code && p.code.toLowerCase() === clean) || p.id.toLowerCase() === clean) || null;
  }

  static generateProblemCode(): string {
    const problems = this.getProblems();
    const nextNum = problems.length + 1;
    return `BM-${String(nextNum).padStart(3, '0')}`;
  }

  static saveProblem(problem: RealProblem): void {
    const deletedIds = this.getDeletedProblemIds();
    if (deletedIds.includes(problem.id)) {
      const nextDeleted = deletedIds.filter(id => id !== problem.id);
      localStorage.setItem(STORAGE_KEYS.DELETED_PROBLEMS, JSON.stringify(nextDeleted));
    }

    const list = this.getProblems();
    const index = list.findIndex(p => p.id === problem.id);
    const now = new Date().toLocaleDateString('vi-VN');
    const toSave: RealProblem = {
      ...problem,
      updatedAt: now,
      code: problem.code || `BM-${String(list.length + 1).padStart(3, '0')}`
    };

    if (index >= 0) {
      list[index] = toSave;
    } else {
      list.unshift(toSave);
    }
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  /**
   * Cập nhật trạng thái bài toán theo quy trình 6 giai đoạn + nhật ký xử lý
   */
  static updateProblemWorkflowStatus(
    id: string,
    newStatus: ProblemStatus,
    note?: string,
    updatedBy: string = 'Admin'
  ): boolean {
    const list = this.getProblems();
    const index = list.findIndex(p => p.id === id);
    if (index < 0) return false;

    const prob = list[index];
    const isPublic = newStatus === 'verified' || 
                     newStatus === 'seeking_support' || 
                     newStatus === 'in_progress' || 
                     newStatus === 'evaluating' || 
                     newStatus === 'completed';

    const now = new Date().toLocaleDateString('vi-VN');
    const newLog: ProblemStatusLog = {
      id: `log-${Date.now()}`,
      status: newStatus,
      note: note || `Chuyển trạng thái sang ${newStatus}`,
      updatedAt: now,
      updatedBy
    };

    const statusLogs = prob.statusLogs ? [...prob.statusLogs, newLog] : [newLog];

    list[index] = {
      ...prob,
      status: newStatus,
      isPublic,
      updatedAt: now,
      statusLogs,
      completionDate: newStatus === 'completed' ? (prob.completionDate || now) : prob.completionDate,
      rejectionReason: newStatus === 'rejected' ? note : prob.rejectionReason
    };

    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  static updateProblemStatus(
    id: string, 
    newStatus: ProblemStatus | string, 
    moderationNote?: string
  ): boolean {
    return this.updateProblemWorkflowStatus(id, newStatus as ProblemStatus, moderationNote, 'Admin');
  }

  /**
   * Phân công nhóm / chuyên gia thực hiện bài toán
   */
  static assignTeamToProblem(
    id: string,
    teamName: string,
    memberIds: string[] = []
  ): boolean {
    const list = this.getProblems();
    const index = list.findIndex(p => p.id === id);
    if (index < 0) return false;

    const now = new Date().toLocaleDateString('vi-VN');
    const prob = list[index];
    const log: ProblemStatusLog = {
      id: `log-${Date.now()}`,
      status: prob.status,
      note: `Phân công thực hiện: ${teamName}`,
      updatedAt: now,
      updatedBy: 'Admin'
    };

    list[index] = {
      ...prob,
      assignedTeam: teamName,
      assignedMemberIds: memberIds,
      updatedAt: now,
      statusLogs: [...(prob.statusLogs || []), log]
    };

    // Đồng thời cập nhật danh sách bài toán được giao cho users
    if (memberIds.length > 0) {
      const users = this.getUsers();
      users.forEach(u => {
        if (memberIds.includes(u.id)) {
          u.assignedProblemIds = Array.from(new Set([...(u.assignedProblemIds || []), prob.id]));
        }
      });
      localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    }

    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  /**
   * Nhóm thực hiện thêm cập nhật tiến độ & minh chứng
   */
  static addProgressUpdate(
    problemId: string,
    update: Omit<ProblemProgressUpdate, 'id' | 'problemId' | 'submittedAt' | 'isApproved'>
  ): ProblemProgressUpdate | null {
    const list = this.getProblems();
    const index = list.findIndex(p => p.id === problemId);
    if (index < 0) return null;

    const prob = list[index];
    const now = new Date().toLocaleDateString('vi-VN');
    const newUpdate: ProblemProgressUpdate = {
      ...update,
      id: `upd-${Date.now()}`,
      problemId,
      submittedAt: `${now} ${new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}`,
      isApproved: update.submittedRole === 'admin' ? true : false // Admin tự tạo thì duyệt ngay, nhóm gửi thì Admin duyệt
    };

    const currentUpdates = prob.progressUpdates || [];
    const nextUpdates = [...currentUpdates, newUpdate];

    // Tính toán lại % tiến độ dựa trên các mốc hoàn thành
    const completedCount = nextUpdates.filter(u => u.completed).length;
    const progressPercentage = nextUpdates.length > 0 
      ? Math.round((completedCount / nextUpdates.length) * 100) 
      : (prob.progressPercentage || 0);

    list[index] = {
      ...prob,
      progressUpdates: nextUpdates,
      progressPercentage,
      updatedAt: now
    };

    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
    return newUpdate;
  }

  /**
   * Admin duyệt cập nhật tiến độ
   */
  static approveProgressUpdate(
    problemId: string,
    updateId: string,
    adminNote?: string
  ): boolean {
    const list = this.getProblems();
    const index = list.findIndex(p => p.id === problemId);
    if (index < 0) return false;

    const prob = list[index];
    const updates = prob.progressUpdates || [];
    const uIdx = updates.findIndex(u => u.id === updateId);
    if (uIdx < 0) return false;

    updates[uIdx] = {
      ...updates[uIdx],
      isApproved: true,
      completed: true,
      adminNote: adminNote || updates[uIdx].adminNote
    };

    // Tính lại % tiến độ
    const completedCount = updates.filter(u => u.completed).length;
    const progressPercentage = updates.length > 0 ? Math.round((completedCount / updates.length) * 100) : 100;

    list[index] = {
      ...prob,
      progressUpdates: updates,
      progressPercentage,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  /**
   * Admin từ chối hoặc yêu cầu chỉnh sửa cập nhật tiến độ
   */
  static rejectProgressUpdate(
    problemId: string,
    updateId: string,
    adminNote: string
  ): boolean {
    const list = this.getProblems();
    const index = list.findIndex(p => p.id === problemId);
    if (index < 0) return false;

    const prob = list[index];
    const updates = prob.progressUpdates || [];
    const uIdx = updates.findIndex(u => u.id === updateId);
    if (uIdx < 0) return false;

    updates[uIdx] = {
      ...updates[uIdx],
      isApproved: false,
      adminNote
    };

    list[index] = {
      ...prob,
      progressUpdates: updates,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  /**
   * Lấy danh sách bài toán phân công cho tài khoản sinh viên/chuyên gia
   */
  static getProblemsByAssignedUser(userId: string): RealProblem[] {
    const problems = this.getProblems();
    const user = this.getUserById(userId);
    return problems.filter(p => {
      const matchMemberId = p.assignedMemberIds && p.assignedMemberIds.includes(userId);
      const matchUserAssigned = user?.assignedProblemIds && user.assignedProblemIds.includes(p.id);
      const matchTeamName = user && p.assignedTeam && p.assignedTeam.toLowerCase().includes(user.fullName.toLowerCase());
      return matchMemberId || matchUserAssigned || matchTeamName;
    });
  }

  /**
   * Lấy danh sách bài toán do người dân đã đăng ký gửi
   */
  static getProblemsByCitizen(userId: string): RealProblem[] {
    const problems = this.getProblems();
    const user = this.getUserById(userId);
    return problems.filter(p => {
      if (p.userId && p.userId === userId) return true;
      if (user && p.email && user.email && p.email.toLowerCase() === user.email.toLowerCase()) return true;
      if (user && p.phoneNumber && user.phone && p.phoneNumber.replace(/\s/g, '') === user.phone.replace(/\s/g, '')) return true;
      return false;
    });
  }

  static deleteProblem(id: string): boolean {
    const deletedIds = this.getDeletedProblemIds();
    if (!deletedIds.includes(id)) {
      deletedIds.push(id);
      localStorage.setItem(STORAGE_KEYS.DELETED_PROBLEMS, JSON.stringify(deletedIds));
    }

    const list = this.getProblems();
    const filtered = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static deleteMultipleProblems(ids: string[]): boolean {
    const deletedIds = this.getDeletedProblemIds();
    ids.forEach(id => {
      if (!deletedIds.includes(id)) {
        deletedIds.push(id);
      }
    });
    localStorage.setItem(STORAGE_KEYS.DELETED_PROBLEMS, JSON.stringify(deletedIds));

    const list = this.getProblems();
    const filtered = list.filter(p => !ids.includes(p.id));
    localStorage.setItem(STORAGE_KEYS.PROBLEMS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  // 2. Quản lý Đơn đề xuất hợp tác
  static getProposals(): AdminProposal[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading proposals:', e);
    }

    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(initialProposals));
    return initialProposals;
  }

  static getProposalById(id: string): AdminProposal | null {
    const list = this.getProposals();
    return list.find(p => p.id === id) || null;
  }

  static getProposalsByProblemId(problemId: string): AdminProposal[] {
    const list = this.getProposals();
    const pid = problemId.toLowerCase();
    return list.filter(p => 
      (p.problemId && p.problemId.toLowerCase() === pid) || 
      (p.problemCode && p.problemCode.toLowerCase() === pid)
    );
  }

  static getProposalsCountByProblemId(problemId: string): number {
    return this.getProposalsByProblemId(problemId).length;
  }

  // ================= PROBLEM STATS (LƯỢT XEM & QUAN TÂM) =================
  static getProblemStats(problemId: string): { views: number; interested: number } {
    try {
      const stored = localStorage.getItem('binhmy_problem_stats_v1');
      if (stored) {
        const map = JSON.parse(stored);
        if (map[problemId]) {
          return map[problemId];
        }
      }
    } catch (e) {
      console.error('Error reading problem stats:', e);
    }
    return { views: 1, interested: 0 };
  }

  static incrementProblemViews(problemId: string): { views: number; interested: number } {
    try {
      const stored = localStorage.getItem('binhmy_problem_stats_v1');
      const map = stored ? JSON.parse(stored) : {};
      const current = map[problemId] || { views: 0, interested: 0 };
      current.views += 1;
      map[problemId] = current;
      localStorage.setItem('binhmy_problem_stats_v1', JSON.stringify(map));
      return current;
    } catch (e) {
      return { views: 1, interested: 0 };
    }
  }

  static isProblemInterested(problemId: string): boolean {
    try {
      const userInterests = JSON.parse(localStorage.getItem('binhmy_user_interests_v1') || '[]');
      return userInterests.includes(problemId);
    } catch (e) {
      return false;
    }
  }

  static toggleProblemInterest(problemId: string): { interested: number; hasInterested: boolean } {
    try {
      const stored = localStorage.getItem('binhmy_problem_stats_v1');
      const map = stored ? JSON.parse(stored) : {};
      const current = map[problemId] || { views: 1, interested: 0 };
      
      const userInterests: string[] = JSON.parse(localStorage.getItem('binhmy_user_interests_v1') || '[]');
      const hasInterested = userInterests.includes(problemId);
      
      let nextInterests: string[];
      if (hasInterested) {
        current.interested = Math.max(0, current.interested - 1);
        nextInterests = userInterests.filter(id => id !== problemId);
      } else {
        current.interested += 1;
        nextInterests = [...userInterests, problemId];
      }
      
      localStorage.setItem('binhmy_user_interests_v1', JSON.stringify(nextInterests));
      map[problemId] = current;
      localStorage.setItem('binhmy_problem_stats_v1', JSON.stringify(map));
      dispatchSyncEvent();
      return { interested: current.interested, hasInterested: !hasInterested };
    } catch (e) {
      return { interested: 0, hasInterested: false };
    }
  }

  static saveProposal(proposal: AdminProposal): void {
    const list = this.getProposals();
    const index = list.findIndex(p => p.id === proposal.id);
    if (index >= 0) {
      list[index] = { ...proposal, updatedAt: new Date().toLocaleDateString('vi-VN') };
    } else {
      list.unshift({ ...proposal, createdAt: proposal.createdAt || new Date().toLocaleDateString('vi-VN'), updatedAt: new Date().toLocaleDateString('vi-VN') });
    }
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  static updateProposalStatus(
    id: string,
    newStatus: ProposalStatus,
    internalNotes?: string,
    assignedTo?: string
  ): boolean {
    const list = this.getProposals();
    const index = list.findIndex(p => p.id === id);
    if (index < 0) return false;

    const current = list[index];
    const history = current.statusHistory || [];
    history.push({
      status: newStatus,
      note: internalNotes,
      updatedAt: new Date().toLocaleDateString('vi-VN'),
      updatedBy: 'Admin'
    });

    list[index] = {
      ...current,
      status: newStatus,
      internalNotes: internalNotes !== undefined ? internalNotes : current.internalNotes,
      assignedTo: assignedTo !== undefined ? assignedTo : current.assignedTo,
      statusHistory: history,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };

    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  static deleteProposal(id: string): boolean {
    const list = this.getProposals();
    const filtered = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static deleteMultipleProposals(ids: string[]): boolean {
    const list = this.getProposals();
    const filtered = list.filter(p => !ids.includes(p.id));
    localStorage.setItem(STORAGE_KEYS.PROPOSALS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  // 3. Quản lý Dự án
  static getProjects(): AdminProject[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading projects:', e);
    }

    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(initialProjects));
    return initialProjects;
  }

  static getProjectById(id: string): AdminProject | null {
    const list = this.getProjects();
    return list.find(p => p.id === id) || null;
  }

  static saveProject(project: AdminProject): void {
    const list = this.getProjects();
    const index = list.findIndex(p => p.id === project.id);
    if (index >= 0) {
      list[index] = { ...project, updatedAt: new Date().toLocaleDateString('vi-VN') };
    } else {
      list.unshift({ ...project, createdAt: new Date().toLocaleDateString('vi-VN'), updatedAt: new Date().toLocaleDateString('vi-VN') });
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  static updateProjectPublishStatus(id: string, newPublishStatus: ProjectPublishStatus): boolean {
    const list = this.getProjects();
    const index = list.findIndex(p => p.id === id);
    if (index < 0) return false;
    list[index] = {
      ...list[index],
      publishStatus: newPublishStatus,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  static updateProjectImplStatus(id: string, newStatus: ProjectImplementationStatus): boolean {
    const list = this.getProjects();
    const index = list.findIndex(p => p.id === id);
    if (index < 0) return false;
    list[index] = {
      ...list[index],
      status: newStatus,
      updatedAt: new Date().toLocaleDateString('vi-VN')
    };
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  static deleteProject(id: string): boolean {
    const list = this.getProjects();
    const filtered = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static deleteMultipleProjects(ids: string[]): boolean {
    const list = this.getProjects();
    const filtered = list.filter(p => !ids.includes(p.id));
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  // 4. Quản lý Tin tức & Sự kiện
  static getNews(): AdminNewsItem[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.NEWS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch (e) {
      console.error('Error reading news:', e);
    }

    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(initialNews));
    return initialNews;
  }

  static saveNews(item: AdminNewsItem): void {
    const list = this.getNews();
    const index = list.findIndex(n => n.id === item.id);
    if (index >= 0) {
      list[index] = item;
    } else {
      list.unshift(item);
    }
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  static deleteNews(id: string): boolean {
    const list = this.getNews();
    const filtered = list.filter(n => n.id !== id);
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static deleteMultipleNews(ids: string[]): boolean {
    const list = this.getNews();
    const filtered = list.filter(n => !ids.includes(n.id));
    localStorage.setItem(STORAGE_KEYS.NEWS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  // 5. Quản lý Đối tác
  static getPartners(): AdminPartner[] {
    if (typeof window === 'undefined') return [...initialAdminPartners];
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.PARTNERS);
      if (!stored) {
        localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(initialAdminPartners));
        return [...initialAdminPartners];
      }
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
      }
      localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(initialAdminPartners));
      return [...initialAdminPartners];
    } catch {
      return [...initialAdminPartners];
    }
  }

  static getPartnerById(id: string): AdminPartner | undefined {
    return this.getPartners().find(p => p.id === id);
  }

  static savePartner(partner: AdminPartner): void {
    const list = this.getPartners();
    const idx = list.findIndex(p => p.id === partner.id);
    const now = new Date().toLocaleDateString('vi-VN');
    if (idx >= 0) {
      list[idx] = { ...partner, updatedAt: now };
    } else {
      list.push({ ...partner, createdAt: partner.createdAt || now, updatedAt: now });
    }
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  static deletePartner(id: string): boolean {
    const list = this.getPartners();
    const filtered = list.filter(p => p.id !== id);
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static togglePartnerStatus(id: string): boolean {
    const list = this.getPartners();
    const item = list.find(p => p.id === id);
    if (!item) return false;
    item.isActive = !item.isActive;
    item.updatedAt = new Date().toLocaleDateString('vi-VN');
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(list));
    dispatchSyncEvent();
    return item.isActive;
  }

  static togglePartnerHomepage(id: string): boolean {
    const list = this.getPartners();
    const item = list.find(p => p.id === id);
    if (!item) return false;
    item.showOnHomepage = !item.showOnHomepage;
    item.updatedAt = new Date().toLocaleDateString('vi-VN');
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(list));
    dispatchSyncEvent();
    return item.showOnHomepage;
  }

  static reorderPartners(orderedIds: string[]): void {
    const list = this.getPartners();
    orderedIds.forEach((id, index) => {
      const p = list.find(item => item.id === id);
      if (p) p.order = index + 1;
    });
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.PARTNERS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  // 6. Quản lý Tin nhắn liên hệ
  static getContactMessages(): AdminContactMessage[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (_) {}
    return [];
  }

  static saveContactMessage(msg: Omit<AdminContactMessage, 'id' | 'status' | 'createdAt'> & { id?: string }): AdminContactMessage {
    const list = this.getContactMessages();
    const newMsg: AdminContactMessage = {
      id: msg.id || `msg-${Date.now()}`,
      fullName: msg.fullName,
      email: msg.email,
      phone: msg.phone,
      topic: msg.topic,
      message: msg.message,
      status: 'new',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };
    list.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
    dispatchSyncEvent();
    return newMsg;
  }

  static updateContactMessageStatus(id: string, status: AdminContactMessage['status']): boolean {
    const list = this.getContactMessages();
    const item = list.find(m => m.id === id);
    if (!item) return false;
    item.status = status;
    localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  // 7. Thống kê Dashboard
  static getDashboardStats() {
    const problems = this.getProblems();
    const proposals = this.getProposals();
    const projects = this.getProjects();
    const partners = this.getPartners();
    const contacts = this.getContactMessages();
    const teamMembers = this.getTeamMembers();
    const feedbacks = this.getFeedbacks();
    const fbStats = this.getFeedbackStats();

    const totalProblems = problems.length;
    const pendingProblems = problems.filter(p => p.status === 'pending').length;
    const verifiedProblems = problems.filter(p => p.status === 'verified').length;
    const seekingSupportProblems = problems.filter(p => p.status === 'seeking_support').length;
    const inProgressProblems = problems.filter(p => p.status === 'in_progress').length;
    const evaluatingProblems = problems.filter(p => p.status === 'evaluating').length;
    const completedProblems = problems.filter(p => p.status === 'completed').length;
    const rejectedProblems = problems.filter(p => p.status === 'rejected' || p.status === 'cancelled').length;
    const publicProblems = problems.filter(p => p.isPublic).length;

    const totalProposals = proposals.length;
    const newProposals = proposals.filter(p => p.status === 'new').length;
    const connectingProposals = proposals.filter(p => p.status === 'connecting' || p.status === 'reviewing' || p.status === 'contacted').length;
    const connectedProposals = proposals.filter(p => p.status === 'connected').length;

    const totalProjects = projects.length;
    const publishedProjects = projects.filter(p => p.publishStatus === 'published').length;
    const inProgressProjects = projects.filter(p => p.status === 'in_progress').length;

    const totalPartners = partners.length;
    const activePartners = partners.filter(p => p.isActive).length;
    const homepagePartners = partners.filter(p => p.isActive && p.showOnHomepage).length;

    const newContacts = contacts.filter(c => c.status === 'new').length;

    return {
      totalProblems,
      pendingProblems,
      verifiedProblems,
      seekingSupportProblems,
      inProgressProblems,
      evaluatingProblems,
      completedProblems,
      rejectedProblems,
      publicProblems,
      totalProposals,
      newProposals,
      connectingProposals,
      connectedProposals,
      totalProjects,
      publishedProjects,
      inProgressProjects,
      totalPartners,
      activePartners,
      homepagePartners,
      newContacts,
      totalTeamMembers: teamMembers.length,
      totalExperts: teamMembers.filter(m => m.group === 'expert').length,
      // Thống kê Feedback
      totalFeedbacks: fbStats.totalFeedbacks,
      avgFeedbackRating: fbStats.avgRating,
      feedbackHighResolutionPercent: fbStats.highResolutionPercent,
      feedbackUsefulPercent: fbStats.usefulPercent,
      feedbacksByCategory: fbStats.byCategory
    };
  }

  // ================= 8. HỆ THỐNG TÀI KHOẢN & PHÂN QUYỀN 3 NHÓM =================
  static getUsers(): AppUser[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.USERS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (_) {}
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(initialAppUsers));
    return initialAppUsers;
  }

  static getUserById(id: string): AppUser | null {
    const users = this.getUsers();
    return users.find(u => u.id === id) || null;
  }

  static isAuthenticated(): boolean {
    if (typeof window === 'undefined') return false;
    const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH);
    return Boolean(auth);
  }

  static getCurrentUser(): (AppUser & { role: any }) | null {
    if (typeof window === 'undefined') return null;
    try {
      // Dọn dẹp session cũ trong localStorage nếu có để ngăn việc tự động đăng nhập khi mở web
      if (localStorage.getItem(STORAGE_KEYS.AUTH)) {
        localStorage.removeItem(STORAGE_KEYS.AUTH);
      }
      const auth = sessionStorage.getItem(STORAGE_KEYS.AUTH);
      return auth ? JSON.parse(auth) : null;
    } catch {
      return null;
    }
  }

  static isAdmin(): boolean {
    const user = this.getCurrentUser();
    return Boolean(user && (user.role === 'admin' || (user as any).role === 'superadmin' || (user as any).role === 'moderator'));
  }

  static isTeamMember(): boolean {
    const user = this.getCurrentUser();
    return Boolean(user && user.role === 'team_member');
  }

  static isCitizen(): boolean {
    const user = this.getCurrentUser();
    return Boolean(user && user.role === 'citizen');
  }

  static login(
    usernameOrEmail: string, 
    password: string
  ): { success: boolean; user?: AppUser; error?: string } {
    const q = (usernameOrEmail || '').trim().toLowerCase();
    const users = this.getUsers();

    const saveSession = (u: AppUser) => {
      sessionStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(u));
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      dispatchSyncEvent();
    };

    // 1. Kiểm tra trong danh sách users đã đăng ký / khởi tạo (Username, Email hoặc Số điện thoại)
    const cleanQPhone = q.replace(/\D/g, '');
    const matched = users.find(u => 
      u.username.toLowerCase() === q || 
      u.email.toLowerCase() === q ||
      (cleanQPhone.length >= 9 && u.phone && u.phone.replace(/\D/g, '') === cleanQPhone)
    );

    if (matched) {
      // Khớp tài khoản hợp lệ
      saveSession(matched);
      return { success: true, user: matched };
    }

    // 2. Tài khoản quản trị mặc định (Fallback)
    if ((q === 'admin' || q === 'admin@binhmy.edu.vn') && 
        (password === 'admin123' || password === 'admin' || password === '123456')) {
      const adminUser = users.find(u => u.role === 'admin') || initialAppUsers[0];
      saveSession(adminUser);
      return { success: true, user: adminUser };
    }

    // 3. Fallback cho tài khoản demo nhóm sinh viên
    if ((q === 'sv_hutech' || q === 'thu.nguyen@hutech.edu.vn') && password.length >= 6) {
      const svUser = users.find(u => u.id === 'sv_hutech') || initialAppUsers[1];
      saveSession(svUser);
      return { success: true, user: svUser };
    }

    // 4. Fallback cho tài khoản demo chuyên gia y tế
    if ((q === 'bs_quan' || q === 'quan.tran@medvn.org') && password.length >= 6) {
      const expUser = users.find(u => u.id === 'bs_quan') || initialAppUsers[2];
      saveSession(expUser);
      return { success: true, user: expUser };
    }

    // 5. Fallback cho tài khoản demo người dân
    if ((q === 'to_rau_ap4' || q === 'nongdan_ba' || q === 'rauantoan.ap4a@gmail.com') && password.length >= 6) {
      const citUser = users.find(u => u.username === q || u.email === q) || initialAppUsers[3];
      saveSession(citUser);
      return { success: true, user: citUser };
    }

    // 6. Cho phép đăng nhập nếu nhập đúng format email hoặc số điện thoại
    if ((q.includes('@') || cleanQPhone.length >= 9) && password.length >= 6) {
      const identifier = q.includes('@') ? q.split('@')[0] : `user_${cleanQPhone}`;
      const genericUser: AppUser = {
        id: `user-${Date.now()}`,
        username: identifier,
        fullName: identifier.toUpperCase(),
        email: q.includes('@') ? q : `${cleanQPhone}@citizen.binhmy.edu.vn`,
        phone: cleanQPhone ? q : '',
        role: q.includes('admin') ? 'admin' : (q.includes('sv') || q.includes('expert') ? 'team_member' : 'citizen'),
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
        createdAt: new Date().toLocaleDateString('vi-VN')
      };
      saveSession(genericUser);
      return { success: true, user: genericUser };
    }

    return {
      success: false,
      error: 'Tài khoản, Email/SĐT hoặc mật khẩu không chính xác. Vui lòng kiểm tra lại.'
    };
  }

  /**
   * Đăng ký tài khoản Người dân (Bảo đảm không cho phép tự cấp quyền Admin)
   */
  static registerCitizen(data: {
    fullName: string;
    username?: string;
    email?: string;
    phone?: string;
    password: string;
    address?: string;
    organization?: string;
  }): { success: boolean; user?: AppUser; error?: string } {
    const phone = data.phone?.trim() || '';
    const email = data.email?.trim() || '';

    if (!data.fullName?.trim() || !data.password || (!phone && !email)) {
      return { success: false, error: 'Vui lòng điền đầy đủ họ tên, mật khẩu và số điện thoại hoặc Gmail.' };
    }

    if (data.password.length < 6) {
      return { success: false, error: 'Mật khẩu phải có độ dài tối thiểu 6 ký tự để đảm bảo an toàn.' };
    }

    const cleanPhone = phone.replace(/\D/g, '');
    const emailPrefix = email ? email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '') : '';
    const uname = (data.username?.trim() || cleanPhone || emailPrefix || `cit_${Date.now()}`).toLowerCase();

    const users = this.getUsers();
    if (cleanPhone && cleanPhone.length >= 9 && users.some(u => u.phone && u.phone.replace(/\D/g, '') === cleanPhone)) {
      return { success: false, error: 'Số điện thoại này đã được đăng ký tài khoản. Vui lòng đăng nhập hoặc sử dụng số khác.' };
    }
    if (email && users.some(u => u.email && u.email.toLowerCase() === email.toLowerCase())) {
      return { success: false, error: 'Địa chỉ Gmail này đã được đăng ký tài khoản. Vui lòng đăng nhập hoặc sử dụng Gmail khác.' };
    }
    if (users.some(u => u.username.toLowerCase() === uname)) {
      return { success: false, error: 'Tên đăng nhập này đã tồn tại. Vui lòng đăng nhập.' };
    }

    // Cố định role là citizen (chống việc tự cấp quyền Admin)
    const newUser: AppUser = {
      id: `cit-${Date.now()}`,
      username: uname,
      fullName: data.fullName.trim(),
      email: email || (cleanPhone ? `${cleanPhone}@citizen.binhmy.edu.vn` : `${uname}@citizen.binhmy.edu.vn`),
      phone: phone || '',
      address: data.address?.trim() || 'Bình Mỹ, Củ Chi, TP. Hồ Chí Minh',
      role: 'citizen',
      organization: data.organization?.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    users.push(newUser);
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));

    // Đăng nhập ngay sau khi đăng ký thành công vào session hiện tại
    sessionStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(newUser));
    localStorage.removeItem(STORAGE_KEYS.AUTH);
    dispatchSyncEvent();
    return { success: true, user: newUser };
  }

  static resetPassword(emailOrUsername: string, newPassword: string): { success: boolean; message: string; error?: string } {
    if (!emailOrUsername.trim()) {
      return { success: false, message: 'Vui lòng nhập email hoặc tên đăng nhập của bạn.', error: 'Vui lòng nhập email hoặc tên đăng nhập của bạn.' };
    }
    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'Mật khẩu mới phải có tối thiểu 6 ký tự.', error: 'Mật khẩu mới phải có tối thiểu 6 ký tự.' };
    }

    const q = emailOrUsername.trim().toLowerCase();
    const users = this.getUsers();
    const user = users.find(u => u.username.toLowerCase() === q || u.email.toLowerCase() === q);
    if (!user) {
      return { success: false, message: 'Không tìm thấy tài khoản tương ứng trong hệ thống.', error: 'Không tìm thấy tài khoản tương ứng trong hệ thống.' };
    }

    return { 
      success: true, 
      message: `Mật khẩu mới cho tài khoản "${user.username}" (${user.fullName}) đã được đặt lại thành công!` 
    };
  }

  static logout(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
      dispatchSyncEvent();
    }
  }

  // ================= 9. CHỨC NĂNG FEEDBACK & ĐÁNH GIÁ KẾT QUẢ =================

  static getFeedbacks(): ProblemFeedback[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACKS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading feedbacks:', e);
    }
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(initialFeedbacks));
    return initialFeedbacks;
  }

  static getFeedbacksByProblemId(problemId: string): ProblemFeedback[] {
    const list = this.getFeedbacks();
    const pid = problemId.toLowerCase();
    return list.filter(fb => 
      fb.problemId.toLowerCase() === pid || 
      (fb.problemCode && fb.problemCode.toLowerCase() === pid)
    );
  }

  static getPublicFeedbackForProblem(problemId: string): ProblemFeedback | null {
    const list = this.getFeedbacksByProblemId(problemId);
    return list.find(fb => fb.isApproved) || null;
  }

  /**
   * Gửi phản hồi Feedback (Kiểm tra nghiêm ngặt điều kiện hoàn thành & chống gửi trùng)
   */
  static submitFeedback(feedbackData: Omit<ProblemFeedback, 'id' | 'createdAt' | 'isApproved'>): { 
    success: boolean; 
    feedback?: ProblemFeedback; 
    error?: string 
  } {
    // 1. Kiểm tra bài toán tương ứng
    const problem = this.getProblemById(feedbackData.problemId) || this.getProblemByCode(feedbackData.problemCode);
    if (!problem) {
      return { success: false, error: 'Không tìm thấy thông tin bài toán tương ứng để gửi đánh giá.' };
    }

    // 2. Điều kiện mở Feedback: Chỉ mở khi bài toán đã ĐƯỢC ADMIN XÁC NHẬN HOÀN THÀNH (completed)
    if (problem.status !== 'completed') {
      return { 
        success: false, 
        error: 'Bài toán chưa được xác nhận hoàn thành. Chỉ bài toán đã hoàn thành mới đủ điều kiện gửi đánh giá kết quả.' 
      };
    }

    // 3. Chống gửi trùng: Mỗi bài toán chỉ có 1 Feedback hợp lệ trong phiên bản đầu tiên
    const existing = this.getFeedbacksByProblemId(problem.id);
    if (existing.length > 0) {
      return { 
        success: false, 
        error: 'Bài toán này đã được ghi nhận phản hồi đánh giá trước đó. Cảm ơn bạn đã đóng góp ý kiến!' 
      };
    }

    // 4. Kiểm tra accessToken nếu người dân gửi qua liên kết riêng
    if (feedbackData.accessToken) {
      const tokenRes = this.validateFeedbackToken(feedbackData.accessToken);
      if (!tokenRes.valid) {
        return { success: false, error: tokenRes.error || 'Liên kết đánh giá không hợp lệ hoặc đã hết hạn.' };
      }
      this.markTokenUsed(feedbackData.accessToken);
    }

    const newFeedback: ProblemFeedback = {
      ...feedbackData,
      id: `fb-${Date.now()}`,
      problemId: problem.id,
      problemCode: problem.code || feedbackData.problemCode || 'BM-XXX',
      problemTitle: problem.title,
      isApproved: false, // Bắt buộc: Feedback phải được Admin duyệt trước khi công khai!
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    const list = this.getFeedbacks();
    list.unshift(newFeedback);
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(list));
    dispatchSyncEvent();
    return { success: true, feedback: newFeedback };
  }

  static toggleFeedbackApproval(id: string): boolean {
    const list = this.getFeedbacks();
    const item = list.find(f => f.id === id);
    if (!item) return false;
    item.isApproved = !item.isApproved;
    if (item.isApproved) {
      item.approvedAt = new Date().toLocaleDateString('vi-VN');
    }
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(list));
    dispatchSyncEvent();
    return item.isApproved;
  }

  static deleteFeedback(id: string): boolean {
    const list = this.getFeedbacks();
    const filtered = list.filter(f => f.id !== id);
    localStorage.setItem(STORAGE_KEYS.FEEDBACKS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  // --- QUẢN LÝ LIÊN KẾT FEEDBACK TOKEN (DÀNH CHO NGƯỜI DÂN KHÔNG ĐĂNG NHẬP) ---
  static getFeedbackTokens(): FeedbackToken[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.FEEDBACK_TOKENS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Error reading feedback tokens:', e);
    }
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_TOKENS, JSON.stringify(initialFeedbackTokens));
    return initialFeedbackTokens;
  }

  static getTokensByProblemId(problemId: string): FeedbackToken[] {
    const tokens = this.getFeedbackTokens();
    const pid = problemId.toLowerCase();
    return tokens.filter(t => t.problemId.toLowerCase() === pid || t.problemCode.toLowerCase() === pid);
  }

  static generateFeedbackToken(
    problemId: string, 
    citizenName?: string, 
    citizenPhone?: string, 
    daysValid: number = 30
  ): FeedbackToken {
    const problem = this.getProblemById(problemId);
    if (!problem) throw new Error('Problem not found');

    // Tạo mã ngẫu nhiên an toàn, khó đoán
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase() + 
                      Math.random().toString(36).substring(2, 6).toUpperCase();
    const tokenStr = `BM-FB-${randomHex}`;

    const expDate = new Date();
    expDate.setDate(expDate.getDate() + daysValid);

    const newToken: FeedbackToken = {
      token: tokenStr,
      problemId: problem.id,
      problemCode: problem.code || 'BM-XXX',
      problemTitle: problem.title,
      citizenName: citizenName || problem.contactName,
      citizenPhone: citizenPhone || problem.phoneNumber,
      citizenEmail: problem.email,
      status: 'created',
      expiresAt: expDate.toLocaleDateString('vi-VN'),
      createdAt: new Date().toLocaleDateString('vi-VN')
    };

    const tokens = this.getFeedbackTokens();
    tokens.unshift(newToken);
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_TOKENS, JSON.stringify(tokens));
    dispatchSyncEvent();
    return newToken;
  }

  static markTokenSent(tokenStr: string): boolean {
    const tokens = this.getFeedbackTokens();
    const item = tokens.find(t => t.token === tokenStr);
    if (!item) return false;
    if (item.status === 'created') {
      item.status = 'sent';
      localStorage.setItem(STORAGE_KEYS.FEEDBACK_TOKENS, JSON.stringify(tokens));
      dispatchSyncEvent();
    }
    return true;
  }

  static revokeFeedbackToken(tokenStr: string): boolean {
    const tokens = this.getFeedbackTokens();
    const item = tokens.find(t => t.token === tokenStr);
    if (!item) return false;
    item.status = 'revoked';
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_TOKENS, JSON.stringify(tokens));
    dispatchSyncEvent();
    return true;
  }

  static markTokenUsed(tokenStr: string): boolean {
    const tokens = this.getFeedbackTokens();
    const item = tokens.find(t => t.token === tokenStr);
    if (!item) return false;
    item.status = 'evaluated';
    item.usedAt = new Date().toLocaleDateString('vi-VN');
    localStorage.setItem(STORAGE_KEYS.FEEDBACK_TOKENS, JSON.stringify(tokens));
    dispatchSyncEvent();
    return true;
  }

  static validateFeedbackToken(tokenStr: string): { 
    valid: boolean; 
    token?: FeedbackToken; 
    problem?: RealProblem; 
    error?: string 
  } {
    if (!tokenStr) return { valid: false, error: 'Mã đánh giá không được để trống.' };

    const tokens = this.getFeedbackTokens();
    const item = tokens.find(t => t.token.trim().toUpperCase() === tokenStr.trim().toUpperCase());
    if (!item) {
      return { valid: false, error: 'Liên kết đánh giá không tồn tại hoặc đã bị xóa.' };
    }
    if (item.status === 'revoked') {
      return { valid: false, error: 'Liên kết đánh giá này đã bị Quản trị viên thu hồi.' };
    }
    if (item.status === 'evaluated') {
      return { valid: false, error: 'Bài toán này đã hoàn tất đánh giá trước đó. Cảm ơn bạn!' };
    }

    const problem = this.getProblemById(item.problemId);
    if (!problem) {
      return { valid: false, error: 'Không tìm thấy dữ liệu bài toán tương ứng với liên kết.' };
    }
    if (problem.status !== 'completed') {
      return { valid: false, error: 'Bài toán chưa được Quản trị viên xác nhận hoàn thành.' };
    }

    return { valid: true, token: item, problem };
  }

  static getFeedbackStats() {
    const feedbacks = this.getFeedbacks();
    const totalFeedbacks = feedbacks.length;
    if (totalFeedbacks === 0) {
      return {
        totalFeedbacks: 0,
        avgRating: 5.0,
        highResolutionPercent: 100,
        usefulPercent: 100,
        byCategory: { agriculture: 0, health: 0, tourism: 0, other: 0 }
      };
    }
    const sumRating = feedbacks.reduce((acc, f) => acc + (f.rating || 5), 0);
    const avgRating = Number((sumRating / totalFeedbacks).toFixed(1));
    const highResCount = feedbacks.filter(f => f.resolutionLevel === 'hoan_toan' || f.resolutionLevel === 'phan_lon').length;
    const highResolutionPercent = Math.round((highResCount / totalFeedbacks) * 100);
    const usefulCount = feedbacks.filter(f => f.usefulness === 'rat_huu_ich').length;
    const usefulPercent = Math.round((usefulCount / totalFeedbacks) * 100);

    const byCategory: Record<string, number> = {};
    feedbacks.forEach(f => {
      const prob = this.getProblemById(f.problemId);
      const cat = prob?.category || 'other';
      byCategory[cat] = (byCategory[cat] || 0) + 1;
    });

    return {
      totalFeedbacks,
      avgRating,
      highResolutionPercent,
      usefulPercent,
      byCategory
    };
  }

  // 9. Khôi phục dữ liệu mẫu
  static resetToSampleData(): void {
    if (typeof window !== 'undefined') {
      sessionStorage.removeItem(STORAGE_KEYS.AUTH);
      localStorage.removeItem(STORAGE_KEYS.AUTH);
    }
    localStorage.removeItem(STORAGE_KEYS.PROBLEMS);
    localStorage.removeItem(STORAGE_KEYS.PROPOSALS);
    localStorage.removeItem(STORAGE_KEYS.PROJECTS);
    localStorage.removeItem(STORAGE_KEYS.NEWS);
    localStorage.removeItem(STORAGE_KEYS.PARTNERS);
    localStorage.removeItem(STORAGE_KEYS.CONTACTS);
    localStorage.removeItem(STORAGE_KEYS.ABOUT_INTRO);
    localStorage.removeItem(STORAGE_KEYS.TEAM_ROLES);
    localStorage.removeItem(STORAGE_KEYS.EXPERT_DOMAINS);
    localStorage.removeItem(STORAGE_KEYS.TEAM_MEMBERS);
    localStorage.removeItem(STORAGE_KEYS.USERS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACKS);
    localStorage.removeItem(STORAGE_KEYS.FEEDBACK_TOKENS);
    this.getProblems();
    this.getProposals();
    this.getProjects();
    this.getNews();
    this.getPartners();
    this.getAboutIntro();
    this.getTeamRoles();
    this.getExpertDomains();
    this.getTeamMembers();
    this.getUsers();
    this.getFeedbacks();
    this.getFeedbackTokens();
    dispatchSyncEvent();
  }

  // ================= 10. QUẢN LÝ VỀ CHÚNG TÔI, ĐỘI NGŨ & CHUYÊN GIA =================

  // --- 10.1. Nội dung Giới thiệu ---
  static getAboutIntro(): AboutIntroConfig {
    const normalize = (data: any): AboutIntroConfig => ({
      ...data,
      title: data.title || data.titleVi || 'Đội ngũ và Chuyên gia cho Bình Mỹ',
      titleVi: data.titleVi || data.title || 'Đội ngũ và Chuyên gia cho Bình Mỹ',
      badge: data.badge || data.badgeVi || 'VỀ CHÚNG TÔI',
      badgeVi: data.badgeVi || data.badge || 'VỀ CHÚNG TÔI',
      description: data.description || data.descVi || 'Làng SV Đổi mới sáng tạo Bình Mỹ là nơi kết nối tri thức, nguồn lực và con người để cùng giải quyết những bài toán thực tế của địa phương. Chúng tôi tin rằng, khi người dân – sinh viên – chuyên gia – doanh nghiệp cùng đồng hành, Bình Mỹ sẽ có thêm nhiều cơ hội phát triển bền vững và tạo ra giá trị lâu dài cho cộng đồng.',
      descVi: data.descVi || data.description || 'Làng SV Đổi mới sáng tạo Bình Mỹ là nơi kết nối tri thức, nguồn lực và con người để cùng giải quyết những bài toán thực tế của địa phương. Chúng tôi tin rằng, khi người dân – sinh viên – chuyên gia – doanh nghiệp cùng đồng hành, Bình Mỹ sẽ có thêm nhiều cơ hội phát triển bền vững và tạo ra giá trị lâu dài cho cộng đồng.',
      slogan: data.slogan || data.sloganVi || 'Kết nối tri thức – Kiến tạo giải pháp – Phát triển Bình Mỹ',
      sloganVi: data.sloganVi || data.slogan || 'Kết nối tri thức – Kiến tạo giải pháp – Phát triển Bình Mỹ',
      handwrittenNote: data.handwrittenNote || data.calloutVi || 'Kết nối tri thức\nKiến tạo giá trị\ncho Bình Mỹ',
      calloutVi: data.calloutVi || data.handwrittenNote || 'Kết nối tri thức\nKiến tạo giá trị\ncho Bình Mỹ',
      bannerImage: (data.bannerImage && !data.bannerImage.includes('unsplash.com') && !data.bannerImage.includes('photo-1522202176988')) ? data.bannerImage : '/assets/about-hero-students.png',
      ctaTitle: data.ctaTitle || 'Bạn là sinh viên, chuyên gia, doanh nghiệp?',
      ctaDescription: data.ctaDescription || 'Hãy cùng Làng SV Đổi mới sáng tạo Bình Mỹ tạo nên những giá trị thiết thực cho cộng đồng. Tham gia đội ngũ của chúng tôi ngay hôm nay!',
      ctaPrimaryButtonText: data.ctaPrimaryButtonText || 'Tham gia đội ngũ',
      ctaSecondaryButtonText: data.ctaSecondaryButtonText || 'Đăng ký làm chuyên gia'
    });

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.ABOUT_INTRO);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return normalize(parsed);
        }
      }
    } catch (e) {
      console.error('Error reading about intro:', e);
    }
    const initial = normalize(initialAboutIntro);
    localStorage.setItem(STORAGE_KEYS.ABOUT_INTRO, JSON.stringify(initial));
    return initial;
  }

  static saveAboutIntro(intro: AboutIntroConfig): void {
    localStorage.setItem(STORAGE_KEYS.ABOUT_INTRO, JSON.stringify(intro));
    dispatchSyncEvent();
  }

  // --- 10.2. Chức vụ và Vai trò ---
  static getTeamRoles(): TeamRole[] {
    const normalizeRole = (r: any): TeamRole => ({
      ...r,
      targetGroup: r.targetGroup || r.group || 'all',
      group: r.group || r.targetGroup || 'all',
      isActive: r.isActive !== undefined ? r.isActive : (r.status !== 'disabled'),
      status: r.status || (r.isActive === false ? 'disabled' : 'active')
    });

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEAM_ROLES);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeRole).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        }
      }
    } catch (e) {
      console.error('Error reading team roles:', e);
    }
    const initial = initialTeamRoles.map(normalizeRole);
    localStorage.setItem(STORAGE_KEYS.TEAM_ROLES, JSON.stringify(initial));
    return initial;
  }

  static saveTeamRole(role: TeamRole): void {
    const list = this.getTeamRoles();
    const now = new Date().toLocaleDateString('vi-VN');
    const index = list.findIndex(r => r.id === role.id);
    if (index >= 0) {
      list[index] = { ...role, updatedAt: now };
    } else {
      list.push({ ...role, createdAt: role.createdAt || now, updatedAt: now });
    }
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.TEAM_ROLES, JSON.stringify(list));

    // Đồng bộ cập nhật tên chức vụ hiển thị cho các thành viên đang dùng roleId này
    const members = this.getTeamMembers();
    let hasUpdatedMembers = false;
    members.forEach(m => {
      if (m.roleId === role.id && m.roleName !== role.name) {
        m.roleName = role.name;
        hasUpdatedMembers = true;
      }
    });
    if (hasUpdatedMembers) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
    }

    dispatchSyncEvent();
  }

  static deleteTeamRole(id: string): { success: boolean; error?: string } {
    const members = this.getTeamMembers();
    const isUsed = members.some(m => m.roleId === id);
    if (isUsed) {
      return {
        success: false,
        error: 'Không thể xóa chức vụ này vì đang có thành viên sử dụng. Vui lòng chuyển thành viên sang chức vụ khác hoặc chọn trạng thái "Ngừng sử dụng".'
      };
    }
    const list = this.getTeamRoles();
    const filtered = list.filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEAM_ROLES, JSON.stringify(filtered));
    dispatchSyncEvent();
    return { success: true };
  }

  static reassignMembersRole(oldRoleId: string, newRoleId: string, newRoleName: string): number {
    const members = this.getTeamMembers();
    let count = 0;
    members.forEach(m => {
      if (m.roleId === oldRoleId) {
        m.roleId = newRoleId;
        m.role = newRoleName;
        m.updatedAt = new Date().toLocaleDateString('vi-VN');
        count++;
      }
    });
    if (count > 0) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
      dispatchSyncEvent();
    }
    return count;
  }

  // --- 10.3. Lĩnh vực Chuyên môn ---
  static getExpertDomains(): ExpertDomain[] {
    const normalizeDomain = (d: any): ExpertDomain => ({
      ...d,
      slug: d.slug || d.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      isActive: d.isActive !== undefined ? d.isActive : (d.status !== 'hidden'),
      status: d.status || (d.isActive === false ? 'hidden' : 'active')
    });

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.EXPERT_DOMAINS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeDomain).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        }
      }
    } catch (e) {
      console.error('Error reading expert domains:', e);
    }
    const initial = initialExpertDomains.map(normalizeDomain);
    localStorage.setItem(STORAGE_KEYS.EXPERT_DOMAINS, JSON.stringify(initial));
    return initial;
  }

  static saveExpertDomain(domain: ExpertDomain): void {
    const list = this.getExpertDomains();
    const now = new Date().toLocaleDateString('vi-VN');
    const index = list.findIndex(d => d.id === domain.id);
    if (index >= 0) {
      list[index] = { ...domain, updatedAt: now };
    } else {
      list.push({ ...domain, createdAt: domain.createdAt || now, updatedAt: now });
    }
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.EXPERT_DOMAINS, JSON.stringify(list));

    // Đồng bộ cập nhật tên lĩnh vực cho các thành viên đang liên kết
    const members = this.getTeamMembers();
    let hasUpdatedMembers = false;
    members.forEach(m => {
      if (m.domainId === domain.id && m.domainName !== domain.name) {
        m.domainName = domain.name;
        hasUpdatedMembers = true;
      }
    });
    if (hasUpdatedMembers) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
    }

    dispatchSyncEvent();
  }

  static deleteExpertDomain(id: string): { success: boolean; error?: string } {
    const members = this.getTeamMembers();
    const isUsed = members.some(m => m.domainId === id);
    if (isUsed) {
      return {
        success: false,
        error: 'Không thể xóa lĩnh vực này vì đang có chuyên gia tham gia. Vui lòng chuyển các chuyên gia sang lĩnh vực khác trước khi xóa.'
      };
    }
    const list = this.getExpertDomains();
    const filtered = list.filter(d => d.id !== id);
    localStorage.setItem(STORAGE_KEYS.EXPERT_DOMAINS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return { success: true };
  }

  static reassignMembersDomain(oldDomainId: string, newDomainId: string, newDomainName: string): number {
    const members = this.getTeamMembers();
    let count = 0;
    members.forEach(m => {
      if (m.domainId === oldDomainId) {
        m.domainId = newDomainId;
        m.domainName = newDomainName;
        m.updatedAt = new Date().toLocaleDateString('vi-VN');
        count++;
      }
    });
    if (count > 0) {
      localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(members));
      dispatchSyncEvent();
    }
    return count;
  }

  // --- 10.4. Thành viên & Chuyên gia ---
  static getTeamMembers(): TeamMember[] {
    const normalizeMember = (m: any): TeamMember => ({
      ...m,
      name: m.name || m.fullName || '',
      fullName: m.fullName || m.name || '',
      role: m.role || m.roleName || '',
      roleName: m.roleName || m.role || '',
      bio: m.bio || m.shortBio || '',
      shortBio: m.shortBio || m.bio || '',
      status: m.status || 'active'
    });

    try {
      const stored = localStorage.getItem(STORAGE_KEYS.TEAM_MEMBERS);
      if (stored !== null) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          return parsed.map(normalizeMember).sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
        }
      }
    } catch (e) {
      console.error('Error reading team members:', e);
    }
    const initial = initialTeamMembers.map(normalizeMember);
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(initial));
    return initial;
  }

  static getTeamMemberById(id: string): TeamMember | undefined {
    return this.getTeamMembers().find(m => m.id === id);
  }

  static saveTeamMember(member: TeamMember): void {
    const list = this.getTeamMembers();
    const now = new Date().toLocaleDateString('vi-VN');
    const index = list.findIndex(m => m.id === member.id);
    if (index >= 0) {
      list[index] = { ...member, updatedAt: now };
    } else {
      list.push({ ...member, createdAt: member.createdAt || now, updatedAt: now });
    }
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(list));
    dispatchSyncEvent();
  }

  static deleteTeamMember(id: string): boolean {
    const list = this.getTeamMembers();
    const filtered = list.filter(m => m.id !== id);
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(filtered));
    dispatchSyncEvent();
    return true;
  }

  static toggleTeamMemberStatus(id: string): boolean {
    const list = this.getTeamMembers();
    const item = list.find(m => m.id === id);
    if (!item) return false;
    item.status = item.status === 'active' ? 'hidden' : 'active';
    item.updatedAt = new Date().toLocaleDateString('vi-VN');
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }

  static updateTeamMemberOrder(id: string, newOrder: number): boolean {
    const list = this.getTeamMembers();
    const item = list.find(m => m.id === id);
    if (!item) return false;
    item.order = newOrder;
    item.updatedAt = new Date().toLocaleDateString('vi-VN');
    list.sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
    localStorage.setItem(STORAGE_KEYS.TEAM_MEMBERS, JSON.stringify(list));
    dispatchSyncEvent();
    return true;
  }
}

