import React, { useState, useEffect, useMemo } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { AdminDataService } from '../services/adminDataService';
import { 
  Calendar, 
  MapPin, 
  Clock, 
  Tag, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  Presentation, 
  Laptop, 
  Users, 
  Handshake, 
  Search,
  X
} from 'lucide-react';

interface EventsPageProps {
  onOpenCollaboration: (type?: string, title?: string) => void;
  onNavigate?: (tab: string) => void;
}

export const EventsPage: React.FC<EventsPageProps> = ({
  onOpenCollaboration,
  onNavigate
}) => {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<any | null>(null);
  const [dataVersion, setDataVersion] = useState(0);

  useEffect(() => {
    const unsubscribe = AdminDataService.subscribe(() => {
      setDataVersion(v => v + 1);
    });
    return unsubscribe;
  }, []);

  // Fallback images for events
  const defaultEventImages = [
    '/assets/pum/PUM-sfeerbeeld_6-2023_De-Schaapjesfabriek-LR-5-1200x800.jpg',
    '/assets/pum/hero_visual2-e1710851129461-1200x836.jpg',
    '/assets/pum/AboutUs_headerphoto-1-e1710851068894-1200x788.jpg',
    '/assets/pum/JoinUs_experts-1200x800.jpg',
    '/assets/pum/Uganda_Fruit_Vegetables_processing_006-e1706769474884-1200x771.jpg',
    '/assets/pum/Jordan_Al-Bayrouty_002-1200x800.jpg'
  ];

  // Đồng bộ 100% danh sách sự kiện từ AdminDataService (xóa bỏ dữ liệu mock không có trong admin)
  const allEvents = useMemo(() => {
    const adminEvents = AdminDataService.getNews()
      .filter(n => n.isPublished !== false)
      .map((evt, idx) => {
        const parts = (evt.publishedDate || '').split('/');
        const day = parts[0] || '15';
        const month = parts[1] || '10';
        const year = parts[2] || '2026';
        return {
          id: evt.id,
          day: day,
          monthYear: language === 'vi' ? `Tháng ${month}, ${year}` : `Month ${month}, ${year}`,
          dateFull: evt.publishedDate,
          category: evt.category || 'Sự kiện',
          title: evt.title,
          summary: evt.summary,
          content: evt.content,
          author: evt.author,
          location: 'Campus Living Lab Bình Mỹ, Củ Chi',
          image: evt.image || defaultEventImages[idx % defaultEventImages.length]
        };
      });

    return adminEvents;
  }, [dataVersion, language]);

  const categories = [
    { id: 'all', labelVi: 'Tất cả hoạt động', labelEn: 'All Activities', icon: Calendar },
    { id: 'Sự kiện', labelVi: 'Sự kiện', labelEn: 'Events', icon: Calendar },
    { id: 'Tin tức', labelVi: 'Tin tức', labelEn: 'News', icon: Users },
    { id: 'Dự án', labelVi: 'Dự án', labelEn: 'Projects', icon: Handshake },
    { id: 'Thông báo', labelVi: 'Thông báo', labelEn: 'Notices', icon: Tag },
  ];

  const filteredEvents = allEvents.filter(event => {
    const categoryLower = (event.category || '').toLowerCase();
    const selectedLower = selectedCategory.toLowerCase();
    const matchCat = selectedCategory === 'all' || 
      categoryLower === selectedLower ||
      categoryLower.includes(selectedLower) || 
      selectedLower.includes(categoryLower);

    const q = searchQuery.trim().toLowerCase();
    const matchSearch = q === '' || 
      (event.title && event.title.toLowerCase().includes(q)) ||
      (event.summary && event.summary.toLowerCase().includes(q)) ||
      (event.location && event.location.toLowerCase().includes(q));

    return matchCat && matchSearch;
  });

  return (
    <div className="w-full bg-[#F8FAF9] py-10 lg:py-16">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        
        {/* Header Title Banner */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-pum-lightGreen text-pum-green text-xs font-bold tracking-wide uppercase border border-pum-green/20">
            <Calendar className="w-3.5 h-3.5 text-pum-orange" />
            <span>{language === 'vi' ? 'Lịch Trình Hoạt Động' : 'Event Schedule'}</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">
            {language === 'vi' ? 'Sự Kiện & Hoạt Động Sắp Diễn Ra' : 'Upcoming Events & Symposia'}
          </h1>
          <p className="text-base text-slate-600 font-normal leading-relaxed">
            {language === 'vi'
              ? 'Theo dõi và đăng ký tham gia các khóa tập huấn y tế, hội thảo chuyên môn cùng bác sĩ quốc tế, workshop khởi nghiệp và các ngày hội cộng đồng tại Bình Mỹ.'
              : 'Discover and participate in healthcare training, international medical symposia, startup workshops, and community outreach at Binh My.'}
          </p>
        </div>

        {/* Search & Category Filter Bar */}
        <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-2xs space-y-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            
            {/* Category Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {categories.map((cat) => {
                const IconComp = cat.icon;
                const isSelected = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-pum-green text-white shadow-sm'
                        : 'bg-[#F8FAF9] text-slate-700 hover:bg-pum-lightGreen/40 border border-slate-200/80'
                    }`}
                  >
                    <IconComp className="w-3.5 h-3.5" />
                    <span>{language === 'vi' ? cat.labelVi : cat.labelEn}</span>
                  </button>
                );
              })}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={language === 'vi' ? 'Tìm theo tên sự kiện, địa điểm...' : 'Search events, venue...'}
                className="w-full pl-9 pr-4 py-2.5 text-xs border border-slate-200 rounded-full focus:outline-hidden focus:border-pum-green focus:ring-1 focus:ring-pum-green bg-[#F8FAF9]"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
            </div>

          </div>
        </div>

        {/* Events Grid */}
        {allEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-dashed border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {language === 'vi' ? 'Chưa có sự kiện hoặc hoạt động nào được xuất bản' : 'No published events or activities yet'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {language === 'vi'
                ? 'Khi Ban quản trị đăng sự kiện mới trên trang Quản trị, nội dung sẽ lập tức đồng bộ hiển thị tại đây.'
                : 'When new events are published in the Admin portal, they will automatically appear here.'}
            </p>
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200">
            <Calendar className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-700">
              {language === 'vi' ? 'Không tìm thấy sự kiện phù hợp' : 'No matching events found'}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              {language === 'vi' ? 'Vui lòng thử từ khóa tìm kiếm hoặc chọn danh mục khác.' : 'Please try another search keyword or category.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((evt) => {
              const monthDisplay = evt.monthYear ? evt.monthYear.split(',')[0] : '2026';
              return (
                <div
                  key={evt.id}
                  className="bg-white rounded-3xl overflow-hidden border border-slate-200/90 shadow-2xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    {/* Event Image & Date Badge */}
                    <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                      <img
                        src={evt.image}
                        alt={evt.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/95 backdrop-blur-md text-pum-green shadow-xs">
                          {evt.category}
                        </span>
                      </div>

                      {/* Big Date Floating Badge */}
                      <div className="absolute bottom-4 right-4 bg-pum-green text-white px-3.5 py-2 rounded-2xl shadow-md text-center">
                        <span className="block text-xl font-black leading-none">{evt.day}</span>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-pum-lightGreen mt-0.5">
                          {monthDisplay}
                        </span>
                      </div>
                    </div>

                    {/* Event Info */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-2">
                        <MapPin className="w-3.5 h-3.5 text-pum-orange flex-shrink-0" />
                        <span className="line-clamp-1">{evt.location}</span>
                      </div>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-pum-green transition-colors leading-snug mb-3">
                        {evt.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {evt.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Footer Actions */}
                  <div className="px-6 py-4 border-t border-slate-100 bg-[#F8FAF9] flex items-center justify-between">
                    <button
                      onClick={() => setSelectedEvent(evt)}
                      className="text-xs font-bold text-slate-600 hover:text-pum-green transition-colors cursor-pointer"
                    >
                      {language === 'vi' ? 'Xem thông tin' : 'View Details'}
                    </button>
                    <button
                      onClick={() => onOpenCollaboration('training', `Đăng ký sự kiện: ${evt.title}`)}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-xs font-bold text-white bg-pum-orange hover:bg-pum-orangeHover transition-all active:scale-95 shadow-xs cursor-pointer"
                    >
                      <span>{language === 'vi' ? 'Đăng ký ngay' : 'Register'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Event Detail Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
            <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl relative border border-slate-100 animate-in zoom-in-95 duration-200">
              <div className="relative aspect-[16/9] w-full bg-slate-100">
                <img src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-full object-cover" />
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 hover:bg-black text-white flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
                <div className="absolute top-4 left-4 bg-pum-green text-white px-3 py-1 rounded-full text-xs font-bold">
                  {selectedEvent.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4 max-h-[60vh] overflow-y-auto">
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-pum-orange" />
                    <span>{selectedEvent.dateFull || `${selectedEvent.day} ${selectedEvent.monthYear}`}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-pum-green" />
                    <span>{selectedEvent.location}</span>
                  </div>
                  {selectedEvent.author && (
                    <>
                      <span>•</span>
                      <span className="text-slate-600 font-medium">Đăng bởi: {selectedEvent.author}</span>
                    </>
                  )}
                </div>

                <h3 className="text-xl font-bold text-slate-900 leading-snug">
                  {selectedEvent.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed font-medium">
                  {selectedEvent.summary}
                </p>

                {selectedEvent.content && selectedEvent.content !== selectedEvent.summary && (
                  <div className="pt-3 border-t border-slate-100 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line">
                    {selectedEvent.content}
                  </div>
                )}

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-5 py-2.5 rounded-full border border-slate-200 text-slate-600 hover:bg-slate-50 text-xs font-bold"
                  >
                    {language === 'vi' ? 'Đóng' : 'Close'}
                  </button>
                  <button
                    onClick={() => {
                      const title = selectedEvent.title;
                      setSelectedEvent(null);
                      onOpenCollaboration('training', `Đăng ký sự kiện: ${title}`);
                    }}
                    className="px-6 py-2.5 rounded-full bg-pum-orange hover:bg-pum-orangeHover text-white text-xs font-bold shadow-md transition-all active:scale-95 flex items-center gap-1.5"
                  >
                    <span>{language === 'vi' ? 'Đăng ký tham dự' : 'Register Now'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
