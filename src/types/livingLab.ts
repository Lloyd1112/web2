export type FieldKey = 'all' | 'agriculture' | 'healthcare' | 'tourism';

export type ProblemStatusKey = 'all' | 'seeking_resources' | 'in_progress' | 'solved';

export type ProjectStatusKey = 'all' | 'in_progress' | 'tested' | 'scaled';

export type CommunityRoleKey = 'all' | 'student' | 'expert' | 'business' | 'partner';

export interface ProblemItem {
  id: string;
  code: string;
  field: 'agriculture' | 'healthcare' | 'tourism';
  fieldLabel: string;
  fieldEmoji: string;
  title: string;
  summary: string;
  location: string;
  neededResources: string[];
  verified: boolean;
  verifiedDate: string;
  status: 'seeking_resources' | 'in_progress' | 'solved';
  statusLabel: string;
  problemDescription: string;
  causes: string[];
  objectives: string;
  impactExpected: string;
  proposerName: string;
  proposerType: string;
  views: number;
  proposalsCount: number;
  relatedProjectId?: string;
  featured?: boolean;
}

export interface ParticipationProposal {
  id: string;
  problemId: string;
  problemTitle: string;
  role: string;
  skills: string[];
  contribution: string;
  availability: string;
  fullName: string;
  email: string;
  phone: string;
  organization: string;
  createdAt: string;
}

export interface TeamMember {
  name: string;
  role: string;
  type: 'student' | 'expert' | 'resident' | 'business';
  typeLabel: string;
  avatar: string;
}

export interface TimelineStep {
  phase: string;
  title: string;
  completed: boolean;
  current?: boolean;
}

export interface ProjectImpact {
  beforeText: string;
  solutionText: string;
  testingText: string;
  stats: {
    value: string;
    label: string;
    change?: string;
  }[];
  realPhotos: {
    url: string;
    caption: string;
  }[];
  beforeAfter: {
    aspect: string;
    before: string;
    after: string;
  }[];
  lessons: string[];
  scalingPlan: string;
}

export interface ProjectItem {
  id: string;
  code: string;
  field: 'agriculture' | 'healthcare' | 'tourism';
  fieldLabel: string;
  fieldEmoji: string;
  title: string;
  summary: string;
  isFeatured: boolean;
  membersCount: number;
  progressPercent: number;
  status: 'in_progress' | 'tested' | 'scaled';
  statusLabel: string;
  testedInBinhMy: boolean;
  location: string;
  problemStatement: string;
  solutionStatement: string;
  teamMembers: TeamMember[];
  timeline: TimelineStep[];
  impact: ProjectImpact;
}

export interface CommunityMember {
  id: string;
  name: string;
  roleType: 'student' | 'expert' | 'business' | 'partner';
  roleLabel: string;
  avatar: string;
  department: string;
  skills: string[];
  joinedProjectsCount: number;
  bio: string;
  featuredProjects: string[];
  email: string;
}

export interface ProblemProposalSubmission {
  id: string;
  title: string;
  field: string;
  description: string;
  location: string;
  desiredOutcome: string;
  proposerName: string;
  proposerPhone: string;
  proposerRole: string;
  attachmentName?: string;
  submittedAt: string;
  status: 'pending_verification' | 'verified' | 'rejected';
}

export interface UserSession {
  isLoggedIn: boolean;
  name: string;
  role: string;
  roleType: 'student' | 'expert' | 'business' | 'resident';
  avatar: string;
}
