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
