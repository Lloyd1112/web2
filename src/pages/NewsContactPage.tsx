import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { mockNewsArticles, mockEventItems } from '../data/mockData';
import { 
  Megaphone, 
  Calendar, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send, 
  Handshake, 
  CheckCircle2, 
  X, 
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  ChevronDown,
  ArrowLeft,
  User,
  Eye,
  Link2,
  Leaf,
  Presentation,
  Laptop,
  Users,
  Star
} from 'lucide-react';

interface NewsContactPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate?: (tab: string) => void;
}

// Social Icons
const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

export const NewsContactPage: React.FC<NewsContactPageProps> = ({ 
  onOpenCollaboration,
  onNavigate 
}) => {
  const { language } = useLanguage();
  
  // View Modes:
  // - 'news-list': Main News & Contact page (Hình thứ 2 ở ô Tất cả)
  // - 'events-page': The dedicated Events Page matching user reference image
  // - 'article-detail': The full single article story reader view
  const [viewMode, setViewMode] = useState<'news-list' | 'events-page' | 'article-detail'>('news-list');

  // Active Article Detail State
  const [activeArticle, setActiveArticle] = useState<any | null>(null);

  // Filter Categories on main news-list view
  const mainCategories = ['Tất cả', 'Hoạt động', 'Sự kiện', 'Thông báo', 'Hợp tác quốc tế'];
  const [selectedMainCategory, setSelectedMainCategory] = useState<string>('Tất cả');

  // Filter Categories on Events Page
  const eventCategories = [
    { label: 'Tất cả', icon: Calendar },
    { label: 'Hội thảo', icon: Presentation },
    { label: 'Workshop', icon: Laptop },
    { label: 'Hoạt động sinh viên', icon: Users },
    { label: 'Giao lưu - Kết nối', icon: Handshake },
  ];
  const [selectedEventCategory, setSelectedEventCategory] = useState<string>('Tất cả');
  const [eventSort, setEventSort] = useState<string>('newest');

  // Calendar State for Events Page
  const [calendarMonth, setCalendarMonth] = useState<number>(9); // 9 = September
  const [calendarYear, setCalendarYear] = useState<number>(2026);
  const [selectedDate, setSelectedDate] = useState<number>(9);
  const calendarRef = useRef<HTMLDivElement>(null);

  // Email Newsletter State
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);
  
  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    topic: '',
    message: ''
  });
  const [messageSent, setMessageSent] = useState(false);
  const [formError, setFormError] = useState('');

  // Modals
  const [showAllNewsModal, setShowAllNewsModal] = useState(false);
  const [showMapModal, setShowMapModal] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  // Filtered Articles for main list
  const filteredMainArticles = selectedMainCategory === 'Tất cả'
    ? mockNewsArticles
    : mockNewsArticles.filter(art => art.category.toLowerCase() === selectedMainCategory.toLowerCase());

  // Main featured article (first one)
  const featuredArticle = filteredMainArticles[0] || mockNewsArticles[0];
  // Side stacked articles (remaining)
  const sideArticles = filteredMainArticles.length > 1 
    ? filteredMainArticles.slice(1, 4) 
    : mockNewsArticles.filter(art => art.id !== featuredArticle.id).slice(0, 3);

  // Filtered Events for Events Page
  const filteredEvents = selectedEventCategory === 'Tất cả'
    ? mockEventItems
    : mockEventItems.filter(ev => ev.category.toLowerCase() === selectedEventCategory.toLowerCase());

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.topic || !formData.message.trim()) {
      setFormError('Vui lòng điền đầy đủ các thông tin bắt buộc (*)');
      return;
    }
    setFormError('');
    setMessageSent(true);
  };

  const handleResetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      topic: '',
      message: ''
    });
    setMessageSent(false);
    setFormError('');
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2500);
  };

  const handleOpenArticleDetail = (article: any) => {
    setActiveArticle({
      ...article,
      breadcrumbTitle: article.category === 'Sự kiện' ? 'Sự kiện' : 'Hoạt động'
    });
    setViewMode('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenActivityPage = (article?: any) => {
    const art = article || mockNewsArticles[0];
    setActiveArticle({
      ...art,
      category: 'Hoạt động',
      breadcrumbTitle: 'Hoạt động'
    });
    setViewMode('article-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setViewMode('news-list');
    setActiveArticle(null);
    setSelectedMainCategory('Tất cả');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenEventsPage = () => {
    setViewMode('events-page');
    setSelectedEventCategory('Tất cả');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setNewsletterSuccess(true);
      setTimeout(() => {
        setNewsletterSuccess(false);
        setNewsletterEmail('');
      }, 3500);
    }
  };

  const scrollToCalendar = () => {
    if (calendarRef.current) {
      calendarRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  return (
    <div className="w-full bg-[#f8fafc] text-slate-800 pb-16 min-h-screen">
      
      {/* ===================== HERO BANNER ===================== */}
      <section 
        className="relative overflow-hidden h-[240px] sm:h-[260px] lg:h-[285px] flex items-center shadow-xs select-none"
        style={{
          backgroundImage: `url('/news-banner.jpg')`,
          backgroundPosition: 'center 42%',
          backgroundSize: 'cover'
        }}
      >
        {/* Gradient Overlay: Deep dark teal/slate from left for perfect typography contrast */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg, rgba(4, 53, 64, 0.92) 0%, rgba(4, 58, 70, 0.82) 35%, rgba(4, 58, 70, 0.35) 68%, rgba(0, 0, 0, 0.08) 100%)`
          }}
        />

        <div className="relative max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 flex items-center justify-between">
          
          {/* Left Title & Breadcrumb Block */}
          <div className="max-w-2xl text-white space-y-2">
            
            {/* Pill Breadcrumb Badge */}
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-950/60 backdrop-blur-xs text-white text-xs font-semibold border border-white/20 shadow-2xs">
              <button
                type="button"
                onClick={() => onNavigate?.('home')}
                className="hover:underline hover:text-emerald-200 transition-colors cursor-pointer flex items-center gap-1 focus:outline-hidden"
                title="Quay về Trang chủ"
              >
                Trang chủ
              </button>
              <span className="text-white/60 text-[10px]">&gt;</span>
              
              {viewMode === 'events-page' ? (
                <>
                  <button
                    type="button"
                    onClick={handleBackToList}
                    className="hover:underline hover:text-emerald-200 transition-colors cursor-pointer focus:outline-hidden"
                  >
                    Tin tức &amp; Liên hệ
                  </button>
                  <span className="text-white/60 text-[10px]">&gt;</span>
                  <span className="text-emerald-200 font-bold">Sự kiện</span>
                </>
              ) : viewMode === 'article-detail' ? (
                <>
                  <button
                    type="button"
                    onClick={handleBackToList}
                    className="hover:underline hover:text-emerald-200 transition-colors cursor-pointer focus:outline-hidden"
                  >
                    Tin tức &amp; Liên hệ
                  </button>
                  <span className="text-white/60 text-[10px]">&gt;</span>
                  <span className="text-emerald-200 font-bold">
                    {activeArticle?.breadcrumbTitle || (activeArticle?.category === 'Sự kiện' ? 'Sự kiện' : 'Hoạt động')}
                  </span>
                </>
              ) : (
                <span className="text-emerald-200">Tin tức &amp; Liên hệ</span>
              )}
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-black text-white tracking-tight leading-tight drop-shadow-md">
              {viewMode === 'events-page' ? 'Sự kiện' : 'Tin tức & Liên hệ'}
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-[13.5px] text-white/95 font-medium leading-relaxed drop-shadow-xs max-w-xl">
              {viewMode === 'events-page'
                ? 'Cập nhật các sự kiện, hội thảo, workshop và hoạt động nổi bật của Làng Sinh viên Đổi mới Sáng tạo Bình Mỹ.'
                : 'Cập nhật những hoạt động mới nhất, sự kiện nổi bật và kết nối cùng chúng tôi để cùng lan tỏa giá trị vì cộng đồng.'}
            </p>
          </div>

          {/* Right Cursive Calligraphy Quote */}
          <div className="hidden lg:flex flex-col items-end pr-6 xl:pr-10 text-white select-none">
            <div className="flex items-center gap-3 transform -rotate-3 drop-shadow-lg text-right">
              {viewMode === 'events-page' ? (
                <div 
                  className="text-[28px] xl:text-[34px] font-bold text-white tracking-wide leading-tight"
                  style={{ fontFamily: "'Dancing Script', 'Caveat', cursive, sans-serif" }}
                >
                  <div>Kết nối tri thức</div>
                  <div>Lan tỏa giá trị</div>
                </div>
              ) : (
                <span 
                  className="text-[32px] xl:text-[38px] font-bold text-white tracking-wide"
                  style={{ fontFamily: "'Dancing Script', 'Caveat', cursive, sans-serif" }}
                >
                  Cùng kiến tạo tương lai!
                </span>
              )}
              
              {/* Delicate leaf doodle */}
              <svg 
                className="w-8 h-8 text-white/90 transform rotate-6 drop-shadow-sm flex-shrink-0" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="1.75" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
                <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
              </svg>
            </div>
          </div>

        </div>
      </section>

      {/* ===================== VIEW MODE SWITCHER ===================== */}

      {/* ------------------------------------------------------------- */}
      {/* 1. EVENTS PAGE (Trang Sự Kiện giống trong ảnh người dùng)      */}
      {/* ------------------------------------------------------------- */}
      {viewMode === 'events-page' ? (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-8 space-y-7 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
            
            {/* ====== LEFT COLUMN: FILTER + 6 EVENT CARDS GRID ====== */}
            <div className="lg:col-span-8 xl:col-span-8 space-y-5">
              
              {/* Filter Pills + Sắp xếp Dropdown */}
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                
                {/* 5 Filter Pills with Icons */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {eventCategories.map((cat) => {
                    const isActive = selectedEventCategory === cat.label;
                    const IconComp = cat.icon;
                    return (
                      <button
                        key={cat.label}
                        onClick={() => setSelectedEventCategory(cat.label)}
                        className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                          isActive
                            ? 'bg-[#00875a] text-white shadow-xs'
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Sắp xếp Dropdown */}
                <div className="flex items-center gap-1.5 text-xs text-slate-500 font-semibold cursor-pointer">
                  <span>Sắp xếp</span>
                  <select 
                    value={eventSort}
                    onChange={(e) => setEventSort(e.target.value)}
                    className="bg-transparent text-slate-700 font-bold focus:outline-hidden cursor-pointer"
                  >
                    <option value="newest">Mới nhất ⌄</option>
                    <option value="upcoming">Sắp diễn ra</option>
                    <option value="popular">Nổi bật</option>
                  </select>
                </div>

              </div>

              {/* 6 Event Cards Grid (2 rows x 3 columns) */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-5">
                {filteredEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group"
                  >
                    <div>
                      {/* Top Image & Badge */}
                      <div 
                        className="relative h-40 sm:h-44 overflow-hidden bg-slate-100 cursor-pointer"
                        onClick={() => onOpenCollaboration('training', ev.title)}
                      >
                        <img 
                          src={ev.image} 
                          alt={ev.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className={`absolute top-2.5 left-2.5 ${ev.badgeBg} text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-2xs`}>
                          {ev.category}
                        </span>
                      </div>

                      {/* Card Content */}
                      <div className="p-4 space-y-2">
                        {/* Date Left + Title & Summary Right */}
                        <div className="flex items-start gap-3">
                          
                          {/* Left Big Day */}
                          <div className="text-center flex-shrink-0 pt-0.5 w-11">
                            <span className="text-xl sm:text-2xl font-black text-slate-900 leading-none block">
                              {ev.day}
                            </span>
                            <span className="text-[9.5px] text-slate-400 font-semibold leading-tight block mt-0.5">
                              {ev.monthYear}
                            </span>
                          </div>

                          {/* Right Content */}
                          <div className="min-w-0 flex-1 space-y-1">
                            <h3 
                              onClick={() => onOpenCollaboration('training', ev.title)}
                              className="font-bold text-xs sm:text-[13px] text-slate-900 line-clamp-2 leading-snug group-hover:text-[#00875a] transition-colors cursor-pointer"
                            >
                              {ev.title}
                            </h3>
                            <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                              {ev.summary}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom: Location + Register Button */}
                    <div className="px-4 pb-3.5 pt-0 flex items-center justify-between border-t border-slate-100 pt-3 gap-2">
                      <div className="flex items-center gap-1 text-[10px] text-slate-500 min-w-0 truncate">
                        <MapPin className="w-3 h-3 text-[#00875a] flex-shrink-0" />
                        <span className="truncate">{ev.location}</span>
                      </div>

                      <button
                        onClick={() => onOpenCollaboration('training', ev.title)}
                        className="bg-[#00875a] hover:bg-[#00734c] text-white text-[10.5px] font-bold px-3 py-1 rounded-full whitespace-nowrap active:scale-95 transition-all flex-shrink-0 flex items-center gap-1 group/btn cursor-pointer"
                      >
                        <span>Đăng ký ngay</span>
                        <span className="group-hover/btn:translate-x-0.5 transition-transform">→</span>
                      </button>
                    </div>

                  </div>
                ))}
              </div>

            </div>

            {/* ====== RIGHT COLUMN: CALENDAR & FEATURED EVENTS ====== */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-5">
              
              {/* Card 1: Lịch sự kiện Calendar Widget */}
              <div 
                ref={calendarRef}
                className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4"
              >
                
                {/* Header */}
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Calendar className="w-4 h-4 text-[#00875a] stroke-[2.5]" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Lịch sự kiện
                  </h3>
                </div>

                {/* Month Navigator */}
                <div className="flex items-center justify-between px-2 text-xs font-bold text-slate-800">
                  <button 
                    onClick={() => setCalendarMonth(prev => prev > 1 ? prev - 1 : 12)}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span>Tháng {calendarMonth}, {calendarYear}</span>
                  <button 
                    onClick={() => setCalendarMonth(prev => prev < 12 ? prev + 1 : 1)}
                    className="p-1 rounded-md hover:bg-slate-100 text-slate-600 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Days Grid Header */}
                <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-bold text-slate-400">
                  <span>T2</span>
                  <span>T3</span>
                  <span>T4</span>
                  <span>T5</span>
                  <span>T6</span>
                  <span>T7</span>
                  <span>CN</span>
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 gap-1 text-center text-xs font-medium text-slate-700">
                  {/* Empty offset for Tuesday start */}
                  <span className="p-1 text-slate-300">31</span>
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  
                  <span>7</span>
                  <span>8</span>
                  {/* Highlighted Day 9 matching image */}
                  <div className="flex items-center justify-center">
                    <span 
                      onClick={() => setSelectedDate(9)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer ${
                        selectedDate === 9 
                          ? 'bg-[#00875a] text-white shadow-2xs' 
                          : 'hover:bg-slate-100'
                      }`}
                    >
                      9
                    </span>
                  </div>
                  <span>10</span>
                  <span>11</span>
                  <span>12</span>
                  <span>13</span>

                  <span>14</span>
                  <span>15</span>
                  <span>16</span>
                  <span>17</span>
                  <span>18</span>
                  <span>19</span>
                  <span>20</span>

                  <span>21</span>
                  <span>22</span>
                  <span>23</span>
                  <span>24</span>
                  {/* Day 25 */}
                  <div className="flex items-center justify-center">
                    <span 
                      onClick={() => setSelectedDate(25)}
                      className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs cursor-pointer ${
                        selectedDate === 25 
                          ? 'bg-[#00875a] text-white shadow-2xs' 
                          : 'hover:bg-slate-100 text-[#00875a] font-bold'
                      }`}
                    >
                      25
                    </span>
                  </div>
                  <span>26</span>
                  <span>27</span>

                  <span>28</span>
                  <span>29</span>
                  <span>30</span>
                  <span className="p-1 text-slate-300">1</span>
                  <span className="p-1 text-slate-300">2</span>
                  <span className="p-1 text-slate-300">3</span>
                  <span className="p-1 text-slate-300">4</span>
                </div>

                {/* Subscription Box */}
                <div className="bg-[#edf7f2] border border-emerald-100 rounded-2xl p-3.5 space-y-2.5">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-[#00875a]">
                      <Mail className="w-3.5 h-3.5" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 leading-snug">
                      Đừng bỏ lỡ các sự kiện hấp dẫn!
                    </h4>
                  </div>

                  <p className="text-[11px] text-slate-600 leading-tight">
                    Đăng ký nhận thông báo sự kiện mới nhất qua email của bạn.
                  </p>

                  {newsletterSuccess ? (
                    <div className="p-2 bg-emerald-100 rounded-lg text-center text-xs font-bold text-[#00875a] animate-fade-in">
                      ✓ Đã đăng ký nhận tin thành công!
                    </div>
                  ) : (
                    <form onSubmit={handleNewsletterSubmit} className="flex gap-1.5">
                      <input 
                        type="email"
                        required
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="Nhập email của bạn"
                        className="flex-1 min-w-0 px-2.5 py-1.5 text-xs bg-white border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a]"
                      />
                      <button
                        type="submit"
                        className="bg-[#00875a] hover:bg-[#00734c] text-white text-xs font-bold px-3 py-1.5 rounded-lg whitespace-nowrap active:scale-95 transition-all cursor-pointer"
                      >
                        Đăng ký
                      </button>
                    </form>
                  )}
                </div>

              </div>

              {/* Card 2: Sự kiện nổi bật */}
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                
                <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
                  <Star className="w-4 h-4 text-[#00875a] fill-[#00875a]/20 stroke-[2.5]" />
                  <h3 className="text-base font-extrabold text-slate-900">
                    Sự kiện nổi bật
                  </h3>
                </div>

                <div className="space-y-3">
                  {mockEventItems.slice(0, 3).map((ev) => (
                    <div
                      key={ev.id}
                      onClick={() => onOpenCollaboration('training', ev.title)}
                      className="flex items-center justify-between gap-2.5 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                    >
                      <div className="flex items-start gap-2.5 min-w-0">
                        <span className={`w-2 h-2 rounded-full ${ev.dotColor} mt-1.5 flex-shrink-0`} />
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1 leading-snug group-hover:text-[#00875a] transition-colors">
                            {ev.title}
                          </h4>
                          <span className="text-[10.5px] text-slate-400">
                            {ev.dateFull}
                          </span>
                        </div>
                      </div>

                      <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00875a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </div>
                  ))}
                </div>

                <div className="pt-1 text-right">
                  <button
                    onClick={() => setSelectedEventCategory('Tất cả')}
                    className="text-xs font-bold text-[#00875a] hover:text-[#00734c] inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Xem tất cả sự kiện</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>

              </div>

            </div>

          </div>

          {/* ==================== BOTTOM FULL-WIDTH BANNER ==================== */}
          <div 
            className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs select-none"
            style={{
              backgroundImage: `url('/tea-hills-banner.jpg')`,
              backgroundPosition: 'center 40%',
              backgroundSize: 'cover'
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, rgba(235, 247, 243, 0.94) 0%, rgba(235, 247, 243, 0.88) 45%, rgba(235, 247, 243, 0.45) 80%, rgba(255, 255, 255, 0.1) 100%)`
              }}
            />

            <div className="relative z-10 px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-center p-2 flex-shrink-0 text-[#00875a]">
                  <Leaf className="w-5 h-5" />
                </div>

                <div>
                  <h4 className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-snug">
                    Cùng tham gia các sự kiện để kết nối, học hỏi và tạo nên những giá trị bền vững!
                  </h4>
                </div>
              </div>

              <button
                onClick={scrollToCalendar}
                className="px-5 py-2.5 rounded-full bg-white border border-[#00875a] text-[#00875a] hover:bg-[#00875a] hover:text-white transition-all text-xs font-bold shadow-2xs flex items-center gap-2 group whitespace-nowrap self-end sm:self-auto active:scale-95 cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Xem lịch sự kiện</span>
              </button>
            </div>
          </div>

        </div>
      ) : viewMode === 'article-detail' && activeArticle ? (
        /* ------------------------------------------------------------- */
        /* 2. ARTICLE / EVENT DETAIL VIEW (Xem chi tiết bài viết)         */
        /* ------------------------------------------------------------- */
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-8 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* ====== LEFT COLUMN: FULL ARTICLE CONTENT ====== */}
            <div className="lg:col-span-8 xl:col-span-8 bg-white rounded-3xl border border-slate-200/80 p-6 sm:p-8 shadow-xs space-y-6">
              
              {/* Back button: Returns to list at 'Tất cả' */}
              <div>
                <button
                  type="button"
                  onClick={handleBackToList}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-[#00875a] transition-colors group cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  <span>Quay lại danh sách</span>
                </button>
              </div>

              {/* Category Badge */}
              <div>
                <span className="inline-block bg-[#e6f4ea] text-[#00875a] text-xs font-bold px-3 py-1 rounded-full">
                  {activeArticle.category}
                </span>
              </div>

              {/* Article Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 leading-snug tracking-tight">
                {activeArticle.title}
              </h1>

              {/* Metadata & Social Share Row */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-b border-slate-100 pb-4">
                <div className="flex flex-wrap items-center gap-4 text-slate-400 font-medium">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeArticle.date}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeArticle.author || 'Ban truyền thông'}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{activeArticle.views || '1.248 lượt xem'}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 relative">
                  <button 
                    onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Chia sẻ lên Facebook"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#00875a] hover:text-white flex items-center justify-center transition-colors text-slate-600 cursor-pointer"
                  >
                    <FacebookIcon />
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`, '_blank')}
                    title="Chia sẻ lên LinkedIn"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#00875a] hover:text-white flex items-center justify-center transition-colors text-slate-600 cursor-pointer"
                  >
                    <LinkedinIcon />
                  </button>
                  <button 
                    onClick={handleCopyLink}
                    title="Sao chép đường dẫn"
                    className="w-8 h-8 rounded-full bg-slate-100 hover:bg-[#00875a] hover:text-white flex items-center justify-center transition-colors text-slate-600 cursor-pointer"
                  >
                    <Link2 className="w-4 h-4" />
                  </button>

                  {copiedToast && (
                    <span className="absolute -top-8 right-0 bg-slate-900 text-white text-[10.5px] px-2.5 py-1 rounded-md shadow-md whitespace-nowrap animate-fade-in">
                      Đã sao chép liên kết!
                    </span>
                  )}
                </div>
              </div>

              {/* Main Photo with Bottom Caption Strip */}
              <div className="rounded-2xl overflow-hidden shadow-xs relative bg-slate-100 group">
                <img 
                  src={activeArticle.detailImage || activeArticle.image} 
                  alt={activeArticle.title}
                  className="w-full h-auto max-h-[460px] object-cover"
                />
                {activeArticle.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-2xs text-white text-xs px-4 py-2 font-normal text-slate-100 text-left">
                    {activeArticle.caption}
                  </div>
                )}
              </div>

              {/* Paragraphs */}
              <div className="space-y-4 text-slate-700 text-[13.5px] sm:text-sm leading-relaxed pt-1">
                {activeArticle.paragraphs?.map((p: string, idx: number) => (
                  <p key={idx}>{p}</p>
                )) || <p>{activeArticle.summary}</p>}
              </div>

              {/* Highlights Section */}
              {activeArticle.highlights && activeArticle.highlights.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2 border-l-[3.5px] border-[#00875a] pl-2.5">
                    {activeArticle.highlightsTitle || 'Những điểm nổi bật trong sự kiện'}
                  </h3>
                  
                  <div className="space-y-2.5 pt-1">
                    {activeArticle.highlights.map((item: string, idx: number) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bottom Quote Banner */}
              <div 
                className="p-4 sm:p-5 rounded-2xl relative overflow-hidden border border-emerald-100 flex items-center gap-3.5 select-none"
                style={{
                  backgroundImage: `url('/tea-hills-banner.jpg')`,
                  backgroundPosition: 'center 40%',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-50/95 via-emerald-50/90 to-emerald-50/60 pointer-events-none" />
                <div className="relative z-10 w-9 h-9 rounded-full bg-[#00875a] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                  <Leaf className="w-4 h-4" />
                </div>
                <p className="relative z-10 text-xs sm:text-sm font-extrabold text-emerald-950">
                  {activeArticle.quote || 'Cùng nhau xây dựng hệ sinh thái đổi mới sáng tạo vì cộng đồng!'}
                </p>
              </div>

            </div>

            {/* ====== RIGHT COLUMN: RELATED NEWS ====== */}
            <div className="lg:col-span-4 xl:col-span-4 space-y-5">
              
              <div className="bg-white rounded-3xl border border-slate-200/80 p-5 shadow-xs space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                  <h3 className="text-sm sm:text-base font-extrabold text-slate-900">
                    Tin tức liên quan
                  </h3>
                  <button
                    onClick={handleBackToList}
                    className="text-xs font-bold text-[#00875a] hover:text-[#00734c] flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Xem tất cả</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>

                <div className="space-y-3.5">
                  {mockNewsArticles
                    .filter(art => art.id !== activeArticle.id)
                    .slice(0, 5)
                    .map((art) => (
                      <div
                        key={art.id}
                        onClick={() => handleOpenArticleDetail(art)}
                        className="flex items-center justify-between gap-3 p-2 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group"
                      >
                        <div className="flex items-center gap-3 min-w-0">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-16 h-12 rounded-lg object-cover flex-shrink-0"
                          />
                          <div className="min-w-0 space-y-1">
                            <span className={`text-[9.5px] font-bold px-2 py-0.5 rounded-full text-white inline-block ${
                              art.category === 'Hoạt động' ? 'bg-[#00875a]' :
                              art.badgeColor === 'rose' || art.id === 'art-admissions' ? 'bg-[#e11d48]' :
                              art.category === 'Thông báo' ? 'bg-[#0284c7]' :
                              art.category === 'Hợp tác quốc tế' ? 'bg-[#7c3aed]' :
                              art.category === 'Sự kiện' ? 'bg-[#d97706]' : 'bg-[#0284c7]'
                            }`}>
                              {art.category}
                            </span>
                            <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug group-hover:text-[#00875a] transition-colors">
                              {art.title}
                            </h4>
                            <div className="flex items-center gap-1 text-[10.5px] text-slate-400">
                              <Calendar className="w-3 h-3" />
                              <span>{art.date}</span>
                            </div>
                          </div>
                        </div>

                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#00875a] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                      </div>
                    ))}
                </div>
              </div>

              {/* Contact Widget */}
              <div 
                className="relative rounded-3xl overflow-hidden border border-slate-200/80 p-6 shadow-xs select-none"
                style={{
                  backgroundImage: `url('/tea-hills-banner.jpg')`,
                  backgroundPosition: 'right center',
                  backgroundSize: 'cover'
                }}
              >
                <div className="absolute inset-0 bg-white/94 backdrop-blur-2xs pointer-events-none" />

                <div className="relative z-10 space-y-3.5">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-[#00875a] text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <Leaf className="w-3.5 h-3.5" />
                    </div>
                    <h3 className="text-base font-extrabold text-slate-900">
                      Liên hệ với chúng tôi
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    Bạn có thắc mắc hoặc muốn hợp tác cùng Làng sinh viên Đổi mới sáng tạo Bình Mỹ? Hãy liên hệ với chúng tôi!
                  </p>

                  <div className="space-y-2.5 text-xs text-slate-700 pt-1">
                    <div className="flex items-center gap-2.5 text-[11.5px]">
                      <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center flex-shrink-0">
                        <Phone className="w-3 h-3 stroke-[2.2]" />
                      </div>
                      <a href="tel:+842812345678" className="hover:text-[#00875a] transition-colors font-medium">(84) 28 1234 5678</a>
                    </div>
                    <div className="flex items-center gap-2.5 text-[11.5px]">
                      <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center flex-shrink-0">
                        <Mail className="w-3 h-3 stroke-[2.2]" />
                      </div>
                      <a href="mailto:info@binhmyhub.edu.vn" className="hover:text-[#00875a] transition-colors font-medium">info@binhmyhub.edu.vn</a>
                    </div>
                    <div className="flex items-start gap-2.5 text-[11.5px]">
                      <div className="w-5 h-5 rounded-full bg-[#00875a] text-white flex items-center justify-center flex-shrink-0 mt-0.5">
                        <MapPin className="w-3 h-3 stroke-[2.2]" />
                      </div>
                      <span className="leading-snug">Ấp Bình Mỹ, Xã Bình Mỹ, TP. Hồ Chí Minh, Việt Nam</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => onOpenCollaboration('general', activeArticle.title)}
                      className="w-full bg-[#00875a] hover:bg-[#00734c] text-white py-2.5 px-5 rounded-full text-xs font-bold shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all cursor-pointer"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>Gửi liên hệ ngay →</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* 3. MAIN NEWS LIST & CONTACT (Hình thứ 2 ở ô Tất cả)          */
        /* ------------------------------------------------------------- */
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-7 lg:pt-9 space-y-7 animate-fade-in">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

            {/* ==================== LEFT COLUMN: TIN TỨC NỔI BẬT ==================== */}
            <div className="lg:col-span-7 xl:col-span-7 space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Megaphone className="w-5 h-5 text-slate-900 fill-slate-900/10 stroke-[2.2]" />
                  <h2 className="text-xl sm:text-[22px] font-extrabold text-slate-900 tracking-tight">
                    Tin tức nổi bật
                  </h2>
                </div>

                <button 
                  onClick={() => setShowAllNewsModal(true)}
                  className="text-xs sm:text-[13px] font-bold text-[#00875a] hover:text-[#00734c] flex items-center gap-1 group transition-colors cursor-pointer"
                >
                  <span>Xem tất cả</span>
                  <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                </button>
              </div>

              {/* Filter Pills */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {mainCategories.map((cat) => {
                  const isActive = selectedMainCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => {
                        if (cat === 'Sự kiện') {
                          handleOpenEventsPage();
                        } else if (cat === 'Hoạt động') {
                          handleOpenActivityPage();
                        } else {
                          setSelectedMainCategory(cat);
                        }
                      }}
                      className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                        isActive
                          ? 'bg-[#00875a] text-white shadow-xs'
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>

              {/* News Articles Grid: Left Big Featured Card + Right 3 Stacked Cards */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch pt-1">
                
                {/* --- MAIN FEATURED ARTICLE CARD (Left) --- */}
                <div className="md:col-span-6 bg-white rounded-2xl border border-slate-200/80 shadow-2xs overflow-hidden flex flex-col justify-between hover:shadow-md transition-all duration-200 group">
                  <div>
                    <div 
                      className="relative h-48 sm:h-52 overflow-hidden bg-slate-100 cursor-pointer" 
                      onClick={() => handleOpenActivityPage(featuredArticle)}
                    >
                      <img 
                        src={featuredArticle.image} 
                        alt={featuredArticle.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <span className="absolute top-3 left-3 bg-[#00875a] text-white text-[10.5px] font-bold px-3 py-1 rounded-full shadow-xs">
                        {featuredArticle.category}
                      </span>
                    </div>

                    <div className="p-4 sm:p-5 space-y-2">
                      <div className="flex items-center gap-1.5 text-slate-400 text-[11.5px] font-medium">
                        <Calendar className="w-3.5 h-3.5 stroke-[2]" />
                        <span>{featuredArticle.date}</span>
                      </div>

                      <h3 
                        onClick={() => handleOpenActivityPage(featuredArticle)}
                        className="font-bold text-[14.5px] sm:text-[15.5px] text-slate-900 group-hover:text-[#00875a] transition-colors leading-snug cursor-pointer line-clamp-3"
                      >
                        {featuredArticle.title}
                      </h3>

                      <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">
                        {featuredArticle.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5 pt-0">
                    <button 
                      onClick={() => handleOpenActivityPage(featuredArticle)}
                      className="text-xs font-bold text-[#00875a] hover:text-[#00734c] flex items-center gap-1 group/btn cursor-pointer"
                    >
                      <span>Xem chi tiết</span>
                      <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>

                {/* --- SIDE ARTICLES (Right 3 Stacked Cards) --- */}
                <div className="md:col-span-6 flex flex-col justify-between gap-3 sm:gap-3.5">
                  {sideArticles.map((art) => (
                    <div 
                      key={art.id}
                      onClick={() => handleOpenArticleDetail(art)}
                      className="bg-white rounded-2xl border border-slate-200/80 p-3 sm:p-3.5 shadow-2xs hover:shadow-md transition-all duration-200 flex gap-3.5 items-center group cursor-pointer"
                    >
                      <div className="w-24 h-20 sm:w-28 sm:h-22 rounded-xl overflow-hidden bg-slate-100 flex-shrink-0 relative">
                        <img 
                          src={art.image} 
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="flex-1 min-w-0 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full text-white ${
                            art.category === 'Hoạt động' ? 'bg-[#0284c7]' :
                            art.category === 'Thông báo' ? 'bg-[#0284c7]' :
                            art.category === 'Hợp tác quốc tế' ? 'bg-[#0284c7]' : 'bg-[#00875a]'
                          }`}>
                            {art.category}
                          </span>
                        </div>

                        <div className="flex items-center gap-1 text-[11px] text-slate-400 font-medium mb-1">
                          <Calendar className="w-3 h-3 stroke-[2]" />
                          <span>{art.date}</span>
                        </div>

                        <h4 className="font-bold text-xs sm:text-[12.5px] text-slate-800 line-clamp-2 leading-snug group-hover:text-[#00875a] transition-colors">
                          {art.title}
                        </h4>

                        <div className="mt-1">
                          <span className="text-[11px] font-bold text-[#00875a] group-hover:text-[#00734c] flex items-center gap-1">
                            <span>Xem chi tiết</span>
                            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

            </div>

            {/* ==================== RIGHT COLUMN: CONTACT INFO & FORM ==================== */}
            <div className="lg:col-span-5 xl:col-span-5 space-y-4">
              
              {/* Card 1: Thông tin liên hệ */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                
                <div className="flex items-center gap-2 mb-4">
                  <MapPin className="w-4 h-4 text-[#00875a] stroke-[2.5]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Thông tin liên hệ
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 items-center">
                  <div className="sm:col-span-7 space-y-3">
                    
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-none">Địa chỉ</div>
                        <div className="text-[11px] text-slate-600 leading-tight mt-1">
                          Ấp Bình Mỹ, Xã Bình Mỹ, TP. Hồ Chí Minh, Việt Nam
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Phone className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-none">Điện thoại</div>
                        <a href="tel:+842812345678" className="text-[11px] text-slate-600 hover:text-[#00875a] transition-colors leading-tight mt-1 block">
                          (+84) 28 1234 5678
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Mail className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-none">Email</div>
                        <a href="mailto:info@binhmyhub.edu.vn" className="text-[11px] text-slate-600 hover:text-[#00875a] transition-colors leading-tight mt-1 block">
                          info@binhmyhub.edu.vn
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#00875a] flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 leading-none">Thời gian làm việc</div>
                        <div className="text-[11px] text-slate-600 leading-tight mt-1">
                          Thứ 2 – Thứ 6: 8:00 – 17:00 | Thứ 7: 8:00 – 12:00
                        </div>
                      </div>
                    </div>

                  </div>

                  <div 
                    onClick={() => setShowMapModal(true)}
                    className="sm:col-span-5 rounded-xl border border-slate-200 overflow-hidden shadow-2xs relative aspect-4/3 sm:aspect-square bg-slate-50 cursor-pointer group"
                    title="Nhấn để phóng to bản đồ"
                  >
                    <img 
                      src="/binh-my-map.jpg" 
                      alt="Bản đồ vị trí Bình Mỹ" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-xs text-[10px] font-bold text-slate-800 px-2 py-1 rounded-md shadow-xs flex items-center gap-1">
                        <ExternalLink className="w-3 h-3 text-[#00875a]" /> Xem bản đồ
                      </span>
                    </div>
                  </div>

                </div>

              </div>

              {/* Card 2: Gửi thông tin liên hệ */}
              <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                
                <div className="flex items-center gap-2 mb-1">
                  <Send className="w-4 h-4 text-[#00875a] stroke-[2.2]" />
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
                    Gửi thông tin liên hệ
                  </h3>
                </div>
                <p className="text-[11.5px] text-slate-500 mb-4">
                  Vui lòng điền thông tin để chúng tôi có thể hỗ trợ bạn nhanh nhất.
                </p>

                {messageSent ? (
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                    <CheckCircle2 className="w-8 h-8 text-[#00875a] mx-auto" />
                    <h4 className="font-bold text-sm text-slate-900">Gửi thông tin thành công!</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Cảm ơn bạn đã liên hệ với Ban điều phối Làng Sinh Viên Bình Mỹ. Chúng tôi sẽ phản hồi qua email hoặc số điện thoại trong thời gian sớm nhất.
                    </p>
                    <button
                      onClick={handleResetForm}
                      className="text-xs font-bold text-[#00875a] hover:underline pt-1 inline-block cursor-pointer"
                    >
                      Gửi biểu mẫu khác
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-3">
                    
                    {formError && (
                      <div className="text-xs text-red-600 bg-red-50 p-2 rounded-lg border border-red-100 font-medium">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Họ và tên <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          onChange={handleInputChange}
                          required
                          placeholder="Nhập họ và tên"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a] focus:ring-1 focus:ring-[#00875a] bg-white placeholder:text-slate-400"
                        />
                      </div>

                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          required
                          placeholder="Nhập email"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a] focus:ring-1 focus:ring-[#00875a] bg-white placeholder:text-slate-400"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Số điện thoại <span className="text-red-500">*</span>
                        </label>
                        <input 
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          required
                          placeholder="Nhập số điện thoại"
                          className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a] focus:ring-1 focus:ring-[#00875a] bg-white placeholder:text-slate-400"
                        />
                      </div>

                      <div className="relative">
                        <label className="block text-[11px] font-bold text-slate-700 mb-1">
                          Nội dung liên hệ <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <select 
                            name="topic"
                            value={formData.topic}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a] focus:ring-1 focus:ring-[#00875a] bg-white text-slate-700 appearance-none pr-8 cursor-pointer"
                          >
                            <option value="" disabled>Chọn nội dung</option>
                            <option value="living-lab">Tham quan Living Lab &amp; Campus</option>
                            <option value="training">Đào tạo nhân lực y tế</option>
                            <option value="consulting">Tư vấn phát triển dự án</option>
                            <option value="international">Hợp tác quốc tế &amp; Bác sĩ xuyên biên giới</option>
                            <option value="other">Hợp tác khác</option>
                          </select>
                          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[11px] font-bold text-slate-700 mb-1">
                        Tin nhắn <span className="text-red-500">*</span>
                      </label>
                      <textarea 
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        required
                        rows={3}
                        placeholder="Nhập tin nhắn của bạn..."
                        className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg outline-hidden focus:border-[#00875a] focus:ring-1 focus:ring-[#00875a] bg-white placeholder:text-slate-400 resize-none"
                      />
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        type="submit"
                        className="bg-[#00875a] hover:bg-[#00734c] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-xs active:scale-95 transition-all inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Send className="w-3.5 h-3.5 stroke-[2.2]" />
                        <span>Gửi liên hệ</span>
                      </button>
                    </div>

                  </form>
                )}

              </div>

            </div>

          </div>

          {/* Bottom Full-Width Banner */}
          <div 
            className="relative rounded-2xl overflow-hidden border border-slate-200/80 shadow-2xs select-none"
            style={{
              backgroundImage: `url('/tea-hills-banner.jpg')`,
              backgroundPosition: 'center 40%',
              backgroundSize: 'cover'
            }}
          >
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(90deg, rgba(235, 247, 243, 0.94) 0%, rgba(235, 247, 243, 0.88) 45%, rgba(235, 247, 243, 0.45) 80%, rgba(255, 255, 255, 0.1) 100%)`
              }}
            />

            <div className="relative z-10 px-5 sm:px-7 py-4 sm:py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3.5 sm:gap-4 w-full sm:w-auto">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-white border border-emerald-200 shadow-2xs flex items-center justify-center p-2 flex-shrink-0">
                  <Handshake className="w-6 h-6 text-[#00875a] stroke-[2.2]" />
                </div>

                <div>
                  <h4 className="text-sm sm:text-[15px] font-extrabold text-slate-900 leading-snug">
                    Bạn có tin tức, sáng kiến hoặc mong muốn hợp tác?
                  </h4>
                  <p className="text-[11.5px] sm:text-xs text-slate-600 mt-0.5">
                    Hãy liên hệ với chúng tôi, chúng tôi luôn sẵn sàng lắng nghe!
                  </p>
                </div>
              </div>

              <button
                onClick={() => onOpenCollaboration('general', 'Liên hệ hợp tác & Đóng góp sáng kiến')}
                className="px-5 py-2.5 rounded-full bg-white border border-[#00875a] text-[#00875a] hover:bg-[#00875a] hover:text-white transition-all text-xs font-bold shadow-2xs flex items-center gap-2 group whitespace-nowrap self-end sm:self-auto active:scale-95 cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5 stroke-[2]" />
                <span>Liên hệ ngay</span>
                <span className="group-hover:translate-x-0.5 transition-transform">→</span>
              </button>

            </div>
          </div>

        </div>
      )}

      {/* ===================== MODAL: ALL NEWS LIST ===================== */}
      {showAllNewsModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-3xl w-full max-h-[88vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 sm:p-8 relative space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div className="flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#00875a]" />
                <h3 className="text-lg sm:text-xl font-bold text-slate-900">Tất cả tin tức &amp; Hoạt động</h3>
              </div>
              <button
                onClick={() => setShowAllNewsModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {mockNewsArticles.map((art) => (
                <div 
                  key={art.id}
                  onClick={() => {
                    setShowAllNewsModal(false);
                    handleOpenArticleDetail(art);
                  }}
                  className="flex flex-col sm:flex-row gap-4 p-3.5 rounded-2xl border border-slate-100 hover:border-emerald-200 hover:bg-emerald-50/20 transition-all cursor-pointer group"
                >
                  <img 
                    src={art.image} 
                    alt={art.title} 
                    className="w-full sm:w-40 h-28 object-cover rounded-xl"
                  />
                  <div className="space-y-1.5 flex-1">
                    <span className="text-[10px] font-bold text-white bg-[#00875a] px-2 py-0.5 rounded-full inline-block">
                      {art.category}
                    </span>
                    <div className="flex items-center gap-1 text-[11px] text-slate-400">
                      <Calendar className="w-3 h-3" />
                      <span>{art.date}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 group-hover:text-[#00875a] transition-colors line-clamp-2">
                      {art.title}
                    </h4>
                    <p className="text-xs text-slate-500 line-clamp-2">
                      {art.summary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== MODAL: MAP EXPAND ===================== */}
      {showMapModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 p-6 relative space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#00875a]" />
                <h3 className="text-base font-bold text-slate-900">Bản đồ vị trí: Làng Sinh Viên Bình Mỹ</h3>
              </div>
              <button
                onClick={() => setShowMapModal(false)}
                className="p-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="rounded-2xl overflow-hidden border border-slate-200">
              <img 
                src="/binh-my-map.jpg" 
                alt="Bản đồ Bình Mỹ" 
                className="w-full h-auto object-cover max-h-[60vh]"
              />
            </div>

            <div className="flex items-center justify-between text-xs text-slate-600 pt-2">
              <span>Địa chỉ: Ấp Bình Mỹ, Xã Bình Mỹ, TP. Hồ Chí Minh, Việt Nam</span>
              <a 
                href="https://maps.google.com/?q=Binh+My+Cu+Chi+Ho+Chi+Minh" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-[#00875a] text-white px-3.5 py-1.5 rounded-lg font-bold hover:bg-[#00734c] transition-colors flex items-center gap-1"
              >
                <span>Mở trong Google Maps</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
