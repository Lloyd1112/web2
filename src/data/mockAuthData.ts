import { AppUser, ProblemFeedback, FeedbackToken } from '../types';

export const initialAppUsers: AppUser[] = [
  {
    id: 'user-admin-1',
    username: 'admin',
    fullName: 'Ban Quản Trị Làng SV',
    email: 'admin@binhmy.edu.vn',
    phone: '0909 000 111',
    role: 'admin',
    organization: 'Ban Điều Hành Làng SV Bình Mỹ',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    createdAt: '01/10/2026'
  },
  {
    id: 'sv_hutech',
    username: 'sv_hutech',
    fullName: 'Nguyễn Thị Minh Thư',
    email: 'thu.nguyen@hutech.edu.vn',
    phone: '0912 345 678',
    role: 'team_member',
    organization: 'Khoa Công nghệ Sinh học - ĐH HUTECH',
    specialty: 'Công nghệ sinh học & Bảo quản nông sản sạch',
    assignedProblemIds: ['prob-01'],
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=200&q=80',
    createdAt: '02/10/2026'
  },
  {
    id: 'bs_quan',
    username: 'bs_quan',
    fullName: 'ThS. BS. Trần Hoàng Quân',
    email: 'quan.tran@medvn.org',
    phone: '0983 888 999',
    role: 'team_member',
    organization: 'Hội Bác sĩ Gia đình & Phục hồi chức năng',
    specialty: 'Cơ xương khớp & Y tế cộng đồng',
    assignedProblemIds: ['prob-02'],
    avatar: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=200&q=80',
    createdAt: '02/10/2026'
  },
  {
    id: 'to_rau_ap4',
    username: 'to_rau_ap4',
    fullName: 'Tổ hợp tác Rau an toàn Ấp 4A',
    email: 'rauantoan.ap4a@gmail.com',
    phone: '0908 123 456',
    role: 'citizen',
    organization: 'Tổ hợp tác Rau an toàn Ấp 4A Bình Mỹ',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    createdAt: '05/10/2026'
  },
  {
    id: 'nongdan_ba',
    username: 'nongdan_ba',
    fullName: 'Trần Văn Ba (Ba Phi)',
    email: 'baphi.binhmy@gmail.com',
    phone: '0903 111 222',
    role: 'citizen',
    organization: 'Hộ trồng lúa Ấp 1, Xã Bình Mỹ',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    createdAt: '06/10/2026'
  }
];

export const initialFeedbacks: ProblemFeedback[] = [
  {
    id: 'fb-001',
    problemId: 'prob-01',
    problemCode: 'BM-001',
    problemTitle: 'Rau ăn lá thủy canh nhanh héo sau thu hoạch và thiếu giải pháp bảo quản mát',
    userId: 'to_rau_ap4',
    citizenName: 'Tổ hợp tác Rau an toàn Ấp 4A (Đại diện: Chú Bảy Nam)',
    citizenPhone: '0908 123 456',
    rating: 5,
    resolutionLevel: 'hoan_toan',
    usefulness: 'rat_huu_ich',
    coordinationRating: 'rat_tot',
    comments: 'Nhóm sinh viên HUTECH nhiệt tình, hướng dẫn tỉ mỉ phương pháp màng Chitosan giúp rau giữ tươi lâu thêm 6 ngày mà không dùng hóa chất. Tổ hợp tác chúng tôi vô cùng cảm ơn Làng Sinh Viên và nhà trường!',
    isApproved: true,
    createdAt: '16/10/2026',
    approvedAt: '16/10/2026'
  }
];

export const initialFeedbackTokens: FeedbackToken[] = [
  {
    token: 'BM-FB-DEMO-2026',
    problemId: 'prob-01',
    problemCode: 'BM-001',
    problemTitle: 'Rau ăn lá thủy canh nhanh héo sau thu hoạch và thiếu giải pháp bảo quản mát',
    citizenName: 'Đại diện Hộ sản xuất Ấp 4A',
    citizenPhone: '0908 123 456',
    citizenEmail: 'rauantoan.ap4a@gmail.com',
    status: 'sent',
    expiresAt: '31/12/2026',
    createdAt: '15/10/2026'
  },
  {
    token: 'BM-FB-A8F9K2',
    problemId: 'prob-01',
    problemCode: 'BM-001',
    problemTitle: 'Rau ăn lá thủy canh nhanh héo sau thu hoạch và thiếu giải pháp bảo quản mát',
    citizenName: 'Tổ hợp tác Rau an toàn Ấp 4A',
    citizenPhone: '0908 123 456',
    status: 'evaluated',
    expiresAt: '20/10/2026',
    createdAt: '15/10/2026',
    usedAt: '16/10/2026'
  }
];
