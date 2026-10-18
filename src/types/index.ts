export type Language = 'vi' | 'en';

export interface StatItem {
  id: string;
  iconName: string;
  label: string;
  value: string;
  color?: string;
}

export interface ActivityField {
  id: string;
  number: string;
  title: string;
  description: string;
  themeColor: 'green' | 'blue' | 'amber' | 'purple' | 'teal';
  icon: string;
  pageId: string;
}

export interface UpcomingEvent {
  id: string;
  day: string;
  month: string;
  title: string;
  category: string;
  time?: string;
  location?: string;
  description?: string;
}

export type PartnerCategory = 'strategic' | 'university' | 'hospital' | 'enterprise' | 'international' | 'government';

export interface AdminPartner {
  id: string;
  nameVi: string;
  nameEn?: string;
  subVi?: string;
  subEn?: string;
  category: PartnerCategory;
  type?: 'university' | 'hospital' | 'enterprise' | 'government' | 'international';
  logoUrl?: string;
  websiteUrl?: string;
  badge?: string;
  roleVi?: string;
  roleEn?: string;
  order: number;
  showOnHomepage: boolean;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Partner {
  id: string;
  name: string;
  category: 'university' | 'hospital' | 'institute' | 'enterprise' | 'government' | 'international';
  logoText: string;
  subText?: string;
  badgeColor?: string;
  iconType?: string;
}

export interface HealthModelItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  functions: string[];
  connections: string[];
  image: string;
  badge: string;
}

export interface TrainingProgram {
  id: string;
  category: 'specialized' | 'management' | 'technology' | 'language' | 'innovation';
  categoryName: string;
  items: string[];
  duration: string;
  level: string;
  icon: string;
}

export interface TargetAudience {
  id: string;
  title: string;
  desc: string;
  icon: string;
}

export interface ConsultingProject {
  id: string;
  title: string;
  desc: string;
  packages: string[];
}

export interface EconomicModelGroup {
  groupName: string;
  color: string;
  models: {
    title: string;
    description: string;
  }[];
}

export interface BrandOperationGroup {
  groupName: string;
  badge?: string;
  description?: string;
  color: string;
  models: {
    title: string;
    description: string;
  }[];
}

export interface BrandBranch {
  id: string;
  pillar: string;
  pillarIcon: string;
  pillarDesc: string;
  experience: string;
  experienceDesc: string;
  color: string;
  bgLight: string;
  borderLight: string;
  badgeColor: string;
  items: string[];
}

export interface BrandOffering {
  title: string;
  desc: string;
  badge: string;
}

export interface BrandFrameworkData {
  title: string;
  description: string;
  branches: BrandBranch[];
  targetProduct: {
    title: string;
    tagline: string;
    description: string;
    offerings: BrandOffering[];
  };
}

export interface DoctorProfile {
  id: string;
  name: string;
  title: string;
  avatar: string;
  specialty: string;
  country: string;
  flag: string;
  organization: string;
  degree: string;
  researchFocus: string;
  languages: string[];
  collaborationForms: string[];
  verified: boolean;
}

export interface NewsArticle {
  id: string;
  title: string;
  date: string;
  category: string;
  summary: string;
  image: string;
  views: number;
}

export interface PumProject {
  id: string;
  title: string;
  titleEn?: string;
  category: string;
  categoryName: string;
  categoryNameEn?: string;
  location: string;
  image: string;
  summary: string;
  summaryEn?: string;
  impactMetrics: string[];
  description?: string;
  featured?: boolean;
}

export interface PumTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  organization: string;
  image: string;
  tag: string;
}

export interface PumJoinCard {
  id: string;
  tag: string;
  title: string;
  description: string;
  image: string;
  ctaText: string;
  targetPage: string;
  actionType: string;
}

// ================= BÀI TOÁN THỰC TẾ =================
export type ProblemCategory = 'agriculture' | 'health' | 'tourism' | 'other';

export type ProblemStatus = 'pending' | 'verified' | 'seeking_support' | 'in_progress';

export interface RealProblem {
  id: string;
  // Phần A - Thông tin người đăng
  submitterType: string; // 'Nông dân / Hộ sản xuất' | 'Doanh nghiệp' | 'Cơ sở kinh doanh' | 'Đại diện đơn vị địa phương' | 'Khác'
  contactName: string;
  organizationName?: string;
  phoneNumber?: string; // KHÔNG hiển thị công khai trên bài viết
  email?: string;       // KHÔNG hiển thị công khai trên bài viết
  location: string;
  locationEn?: string;

  // Phần B - Thông tin bài toán
  title: string;
  titleEn?: string;
  category: ProblemCategory;
  categoryDetail?: string; // 'Nông nghiệp' | 'Y tế' | 'Du lịch' | 'Công nghệ' | 'Kinh doanh / Thị trường' | 'Môi trường' | 'Khác'
  categoryDetailEn?: string;
  description: string;
  descriptionEn?: string;
  occurredTime: string; // 'Mới phát sinh' | 'Dưới 6 tháng' | 'Từ 6 tháng đến 1 năm' | 'Trên 1 năm' | 'Khác'
  occurredTimeEn?: string;
  affectedAudience: string; // 'Bản thân / hộ sản xuất' | 'Khách hàng' | 'Nhân viên / doanh nghiệp' | 'Cộng đồng địa phương' | 'Khác'
  affectedAudienceEn?: string;
  cause?: string;
  causeEn?: string;
  triedSolutions?: string;
  triedSolutionsEn?: string;
  damages?: string;
  damagesEn?: string;

  // Phần C - Nhu cầu hỗ trợ
  desiredOutcome: string;
  desiredOutcomeEn?: string;
  supportNeeded: string[];
  supportNeededEn?: string[];
  readyToCoordinate: string; // 'Có' | 'Có, nếu được hướng dẫn' | 'Cần trao đổi thêm'
  canSupportTesting: string; // 'Có' | 'Không' | 'Cần trao đổi thêm'

  // Phần D - Hình ảnh & Tài liệu minh chứng
  images: string[];
  evidenceDocName?: string;
  imageDescription?: string;
  imageDescriptionEn?: string;

  // Trạng thái & ngày đăng
  status: ProblemStatus;
  createdAt: string;
  isPublic: boolean;
}

export interface SolutionProposal {
  id: string;
  problemId: string;
  proposerName: string;
  role: string;
  phone: string;
  email: string;
  proposalContent: string;
  createdAt: string;
}

// ================= QUẢN TRỊ VỀ CHÚNG TÔI & ĐỘI NGŨ =================

export type TeamMemberGroup = 'executive' | 'management' | 'student' | 'expert';
export type TeamMemberStatus = 'active' | 'hidden' | 'draft';

export interface AboutIntroConfig {
  badgeVi?: string;
  badgeEn?: string;
  badge?: string;
  titleVi?: string;
  titleEn?: string;
  title?: string;
  descVi?: string;
  descEn?: string;
  description?: string;
  sloganVi?: string;
  sloganEn?: string;
  slogan?: string;
  calloutVi?: string;
  calloutEn?: string;
  handwrittenNote?: string;
  bannerImage: string;
  ctaTitle?: string;
  ctaDescription?: string;
  ctaPrimaryButtonText?: string;
  ctaSecondaryButtonText?: string;
}

export interface TeamRole {
  id: string;
  name: string;
  nameEn?: string;
  group?: TeamMemberGroup | 'all';
  targetGroup?: TeamMemberGroup | 'all';
  description?: string;
  status?: 'active' | 'disabled';
  isActive?: boolean;
  order: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpertDomain {
  id: string;
  name: string;
  nameEn?: string;
  slug?: string;
  description: string;
  descriptionEn?: string;
  icon: string; // 'Laptop' | 'Sprout' | 'Palmtree' | 'GraduationCap' | 'TrendingUp' | 'Heart' | 'Compass' | 'BookOpen' | 'HeartPulse'
  order: number;
  status?: 'active' | 'hidden';
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface TeamMember {
  id: string;
  fullName?: string;
  name?: string;
  avatar: string;
  group: TeamMemberGroup;
  roleId: string;
  roleName?: string;
  role?: string;
  domainId?: string; // Áp dụng cho chuyên gia
  domainName?: string;
  organization?: string;
  major?: string; // Ngành học hoặc chuyên môn
  shortBio?: string; // Giới thiệu ngắn / Nhiệm vụ / Trách nhiệm
  bio?: string;
  order: number;
  status: TeamMemberStatus;
  email?: string;
  phone?: string;
  linkedin?: string;
  createdAt?: string;
  updatedAt?: string;
}



