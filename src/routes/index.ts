export interface RouteConfig {
  id: string;
  path: string;
  aliases?: string[];
  titleVi: string;
  titleEn: string;
}

export const ROUTES: Record<string, RouteConfig> = {
  'home': {
    id: 'home',
    path: '/home',
    aliases: ['/', '/trang-chu', ''],
    titleVi: 'Làng Sinh Viên Đổi Mới Sáng Tạo Bình Mỹ | Trang chủ',
    titleEn: 'Binh My Innovative Student Village | Home'
  },
  'about': {
    id: 'about',
    path: '/about',
    aliases: ['/about-us', '/thong-tin-ve-chung-toi', '/gioi-thieu', '/ve-chung-toi', '/doi-ngu', '/doi-ngu-chuyen-gia'],
    titleVi: 'Thông tin về chúng tôi | Làng Sinh Viên Bình Mỹ',
    titleEn: 'About Us | Binh My Student Village'
  },
  'events': {
    id: 'events',
    path: '/events',
    aliases: ['/su-kien', '/news', '/tin-tuc', '/lich-hoat-dong'],
    titleVi: 'Sự kiện & Hoạt động | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Events & Activities | Binh My Student Village'
  },
  'contact': {
    id: 'contact',
    path: '/contact',
    aliases: ['/contact-us', '/lien-he', '/hop-tac', '/lien-lac'],
    titleVi: 'Liên hệ & Hợp tác | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Contact & Cooperation | Binh My Student Village'
  },
  'agriculture': {
    id: 'agriculture',
    path: '/projects/agriculture',
    aliases: ['/du-an/nong-nghiep', '/nong-nghiep', '/agriculture', '/projects/nong-nghiep'],
    titleVi: 'Trụ cột Nông nghiệp | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Agriculture Pillar | Binh My Student Village'
  },
  'health-models': {
    id: 'health-models',
    path: '/projects/health-models',
    aliases: ['/du-an/ba-mo-hinh-y-te', '/ba-mo-hinh-y-te', '/health-models', '/projects/health', '/y-te', '/health', '/du-an/y-te'],
    titleVi: 'Trụ cột Y tế | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Healthcare Pillar | Binh My Student Village'
  },
  'tourism': {
    id: 'tourism',
    path: '/projects/tourism',
    aliases: ['/du-an/du-lich', '/du-lich', '/tourism', '/projects/du-lich'],
    titleVi: 'Trụ cột Du lịch | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Tourism Pillar | Binh My Student Village'
  },
  'training': {
    id: 'training',
    path: '/projects/training',
    aliases: ['/du-an/dao-tao-nhan-luc', '/dao-tao-nhan-luc', '/training', '/workforce-training'],
    titleVi: 'Đào tạo nhân lực y tế | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Workforce Training | Binh My Student Village'
  },
  'consulting': {
    id: 'consulting',
    path: '/projects/consulting',
    aliases: ['/du-an/tu-van-du-an', '/tu-van-du-an', '/consulting', '/12-mo-hinh-kinh-te', '/project-advisory'],
    titleVi: 'Tư vấn dự án & 12 mô hình kinh tế | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Project Advisory & 12 Economic Models | Binh My Student Village'
  },
  'international': {
    id: 'international',
    path: '/projects/international',
    aliases: ['/du-an/hop-tac-quoc-te', '/hop-tac-quoc-te', '/international', '/international-cooperation'],
    titleVi: 'Hợp tác quốc tế | Làng Sinh Viên Bình Mỹ',
    titleEn: 'International Cooperation | Binh My Student Village'
  },
  'doctors': {
    id: 'doctors',
    path: '/projects/doctors-across-borders',
    aliases: ['/du-an/bac-si-xuyen-bien-gioi', '/bac-si-xuyen-bien-gioi', '/doctors', '/doctors-across-borders'],
    titleVi: 'Bác sĩ xuyên biên giới | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Doctors Across Borders | Binh My Student Village'
  },
  'news-contact': {
    id: 'news-contact',
    path: '/news-contact',
    aliases: ['/tin-tuc-va-lien-he', '/tin-tuc-lien-he'],
    titleVi: 'Tin tức & Liên hệ | Làng Sinh Viên Bình Mỹ',
    titleEn: 'News & Contact | Binh My Student Village'
  },
  'real-problems': {
    id: 'real-problems',
    path: '/bai-toan-thuc-te',
    aliases: ['/bai-toan', '/real-problems', '/thuc-te', '/problems', '/practical-problems'],
    titleVi: 'Bài toán thực tế tại Bình Mỹ | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Real-World Problems in Binh My | Student Village'
  },

  // ================= ADMIN ROUTES =================
  'admin-login': {
    id: 'admin-login',
    path: '/admin/login',
    titleVi: 'Đăng nhập Quản trị viên | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Admin Login | Binh My Student Village'
  },
  'admin-dashboard': {
    id: 'admin-dashboard',
    path: '/admin/dashboard',
    aliases: ['/admin'],
    titleVi: 'Tổng quan Quản trị | Làng Sinh Viên Bình Mỹ',
    titleEn: 'Admin Dashboard | Binh My Student Village'
  },
  'admin-problems': {
    id: 'admin-problems',
    path: '/admin/bai-toan',
    titleVi: 'Quản lý Bài toán thực tế | Admin Làng SV',
    titleEn: 'Manage Real Problems | Admin'
  },
  'admin-proposals': {
    id: 'admin-proposals',
    path: '/admin/de-xuat-hop-tac',
    titleVi: 'Quản lý Đơn đề xuất hợp tác | Admin Làng SV',
    titleEn: 'Manage Collaboration Proposals | Admin'
  },
  'admin-projects': {
    id: 'admin-projects',
    path: '/admin/du-an',
    titleVi: 'Quản lý Dự án | Admin Làng SV',
    titleEn: 'Manage Projects | Admin'
  },
  'admin-partners': {
    id: 'admin-partners',
    path: '/admin/doi-tac',
    aliases: ['/admin/partners', '/admin/partner'],
    titleVi: 'Quản lý Đối tác | Admin Làng SV',
    titleEn: 'Manage Partners | Admin'
  },
  'admin-news': {
    id: 'admin-news',
    path: '/admin/tin-tuc',
    titleVi: 'Quản lý Tin tức & Sự kiện | Admin Làng SV',
    titleEn: 'Manage News & Events | Admin'
  },
  'admin-about': {
    id: 'admin-about',
    path: '/admin/ve-chung-toi',
    aliases: ['/admin/about', '/admin/doi-ngu', '/admin/team'],
    titleVi: 'Thông tin về chúng tôi | Admin Làng SV',
    titleEn: 'About Us & Team | Admin'
  },
  'admin-settings': {
    id: 'admin-settings',
    path: '/admin/cai-dat',
    titleVi: 'Cài đặt hệ thống | Admin Làng SV',
    titleEn: 'System Settings | Admin'
  }
};

/**
 * Resolves a URL path to its corresponding activeTab id
 */
export function getTabFromPath(pathname: string): string {
  if (!pathname || pathname === '' || pathname === '/' || pathname === '/home' || pathname === '/trang-chu') return 'home';

  // Normalize path: lowercase and remove trailing slash
  const cleanPath = pathname.toLowerCase().replace(/\/+$/, '') || '/home';

  // Admin routes matching
  if (cleanPath.startsWith('/admin')) {
    if (cleanPath === '/admin/login') return 'admin-login';
    if (cleanPath === '/admin' || cleanPath === '/admin/dashboard') return 'admin-dashboard';
    if (cleanPath.startsWith('/admin/bai-toan')) return 'admin-problems';
    if (cleanPath.startsWith('/admin/de-xuat-hop-tac')) return 'admin-proposals';
    if (cleanPath.startsWith('/admin/du-an')) return 'admin-projects';
    if (cleanPath.startsWith('/admin/doi-tac') || cleanPath.startsWith('/admin/partners') || cleanPath.startsWith('/admin/partner')) return 'admin-partners';
    if (cleanPath.startsWith('/admin/tin-tuc')) return 'admin-news';
    if (cleanPath.startsWith('/admin/ve-chung-toi') || cleanPath.startsWith('/admin/about') || cleanPath.startsWith('/admin/doi-ngu') || cleanPath.startsWith('/admin/team')) return 'admin-about';
    if (cleanPath.startsWith('/admin/cai-dat')) return 'admin-settings';
    return 'admin-dashboard';
  }

  for (const [key, config] of Object.entries(ROUTES)) {
    if (config.path === cleanPath) return config.id;
    if (config.aliases && config.aliases.some(alias => alias === cleanPath)) {
      return config.id;
    }
  }

  // Handle generic prefix matching for projects
  if (cleanPath.startsWith('/projects') || cleanPath.startsWith('/du-an')) {
    if (cleanPath.includes('nong-nghiep') || cleanPath.includes('agriculture') || cleanPath.includes('agri')) return 'agriculture';
    if (cleanPath.includes('du-lich') || cleanPath.includes('tourism')) return 'tourism';
    if (cleanPath.includes('health') || cleanPath.includes('y-te')) return 'health-models';
    if (cleanPath.includes('training') || cleanPath.includes('dao-tao')) return 'training';
    if (cleanPath.includes('consulting') || cleanPath.includes('tu-van')) return 'consulting';
    if (cleanPath.includes('international') || cleanPath.includes('quoc-te')) return 'international';
    if (cleanPath.includes('doctor') || cleanPath.includes('bac-si')) return 'doctors';
    return 'health-models';
  }

  if (cleanPath.includes('bai-toan') || cleanPath.includes('thuc-te') || cleanPath.includes('real-problem') || cleanPath.includes('problems')) {
    return 'real-problems';
  }

  return 'home';
}

/**
 * Returns canonical URL for a tab id
 */
export function getPathForTab(tabId: string): string {
  return ROUTES[tabId]?.path || '/home';
}
