import React, { useState } from 'react';
import { 
  GraduationCap, 
  Users, 
  Tractor, 
  FlaskConical, 
  Building2, 
  Landmark, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface NodeItem {
  id: string;
  name: string;
  role: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
  position: string; // CSS position classes
  angleText: string;
}

export const LivingLabDiagram: React.FC<{ onNavigateToAbout?: () => void }> = ({ onNavigateToAbout }) => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const nodes: NodeItem[] = [
    {
      id: 'student',
      name: 'Sinh viên',
      role: 'Học từ bài toán thật',
      description: 'Đem tri thức và sức trẻ giải quyết vấn đề thực tế, học qua trải nghiệm thực địa.',
      icon: GraduationCap,
      color: 'text-sky-600',
      bgColor: 'bg-sky-50 hover:bg-sky-100',
      borderColor: 'border-sky-300',
      position: 'top-2 left-1/2 -translate-x-1/2',
      angleText: 'Học tập & Thực chiến'
    },
    {
      id: 'expert',
      name: 'Chuyên gia',
      role: 'Đưa kiến thức vào thực tế',
      description: 'Cố vấn chuyên môn, thẩm định giải pháp và chuyển giao kỹ thuật chuẩn mực.',
      icon: FlaskConical,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50 hover:bg-purple-100',
      borderColor: 'border-purple-300',
      position: 'top-16 right-4 sm:right-8',
      angleText: 'Nghiên cứu & Cố vấn'
    },
    {
      id: 'business',
      name: 'Doanh nghiệp',
      role: 'Thử nghiệm & Đồng hành',
      description: 'Tài trợ nguồn lực, thử nghiệm công nghệ và bao tiêu đầu ra giải pháp.',
      icon: Building2,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50 hover:bg-amber-100',
      borderColor: 'border-amber-300',
      position: 'bottom-16 right-4 sm:right-8',
      angleText: 'Nguồn lực & Thị trường'
    },
    {
      id: 'government',
      name: 'Chính quyền',
      role: 'Dữ liệu & Định hướng',
      description: 'Hỗ trợ chính sách, đồng hành thúc đẩy kinh tế nông thôn mới.',
      icon: Landmark,
      color: 'text-rose-600',
      bgColor: 'bg-rose-50 hover:bg-rose-100',
      borderColor: 'border-rose-300',
      position: 'bottom-2 left-1/2 -translate-x-1/2',
      angleText: 'Chính sách & Kết nối'
    },
    {
      id: 'farmer',
      name: 'Nông dân',
      role: 'Chia sẻ bài toán thực tế',
      description: 'Cung cấp thực địa, kinh nghiệm sản xuất bản địa và nhu cầu chuyển đổi số.',
      icon: Tractor,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50 hover:bg-emerald-100',
      borderColor: 'border-emerald-300',
      position: 'bottom-16 left-4 sm:left-8',
      angleText: 'Hộ sản xuất'
    },
    {
      id: 'resident',
      name: 'Người dân',
      role: 'Tiếp cận giải pháp',
      description: 'Hưởng lợi từ các dịch vụ y tế, văn hóa và môi trường sống nâng cao.',
      icon: Users,
      color: 'text-teal-600',
      bgColor: 'bg-teal-50 hover:bg-teal-100',
      borderColor: 'border-teal-300',
      position: 'top-16 left-4 sm:left-8',
      angleText: 'Cộng đồng thụ hưởng'
    }
  ];

  return (
    <div className="relative w-full max-w-[540px] mx-auto p-4 sm:p-6 bg-white/80 backdrop-blur-md rounded-3xl border border-slate-200/80 shadow-md">
      
      {/* Header Tag */}
      <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
          <span>MÔ HÌNH HỆ SINH THÁI LIVING LAB</span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full">
          Tương tác trực quan
        </span>
      </div>

      {/* Main Interactive Diagram Canvas */}
      <div className="relative h-[340px] sm:h-[380px] w-full flex items-center justify-center select-none overflow-hidden rounded-2xl bg-gradient-to-b from-[#F7FAF8] to-slate-50 border border-slate-100">
        
        {/* Radar concentric rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[300px] h-[300px] sm:w-[330px] sm:h-[330px] rounded-full border border-dashed border-emerald-200/70" />
          <div className="w-[200px] h-[200px] sm:w-[220px] sm:h-[220px] rounded-full border border-dashed border-slate-200/80" />
        </div>

        {/* Dynamic connection lines (SVG) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none stroke-slate-300/80" strokeWidth="1.5" strokeDasharray="3 3">
          <line x1="50%" y1="50%" x2="50%" y2="12%" className="stroke-sky-300" />
          <line x1="50%" y1="50%" x2="84%" y2="24%" className="stroke-purple-300" />
          <line x1="50%" y1="50%" x2="84%" y2="76%" className="stroke-amber-300" />
          <line x1="50%" y1="50%" x2="50%" y2="88%" className="stroke-rose-300" />
          <line x1="50%" y1="50%" x2="16%" y2="76%" className="stroke-emerald-300" />
          <line x1="50%" y1="50%" x2="16%" y2="24%" className="stroke-teal-300" />
        </svg>

        {/* Center Node: BÌNH MỸ CORE */}
        <div className="relative z-10 w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-[#00875a] to-[#044c35] text-white flex flex-col items-center justify-center p-3 text-center shadow-lg border-4 border-white transform hover:scale-105 transition-all duration-300 cursor-pointer group">
          <Sparkles className="w-5 h-5 text-amber-300 animate-pulse mb-1" />
          <span className="text-[12px] sm:text-[13px] font-black uppercase tracking-tight leading-tight">
            BÌNH MỸ
          </span>
          <span className="text-[9px] text-emerald-100 font-semibold tracking-wide">
            Living Lab Center
          </span>
          <span className="mt-1 text-[8.5px] bg-white/20 px-2 py-0.5 rounded-full font-medium text-white/90">
            Thực địa thử nghiệm
          </span>
        </div>

        {/* 6 Surrounding Satellite Nodes */}
        {nodes.map((node) => {
          const Icon = node.icon;
          const isHovered = activeNode === node.id;
          return (
            <div
              key={node.id}
              onMouseEnter={() => setActiveNode(node.id)}
              onMouseLeave={() => setActiveNode(null)}
              className={`absolute ${node.position} z-20 flex flex-col items-center cursor-pointer transition-all duration-200`}
            >
              <div
                className={`w-11 h-11 sm:w-12 sm:h-12 rounded-2xl flex items-center justify-center shadow-sm border-2 ${node.borderColor} ${node.bgColor} transition-all duration-200 ${
                  isHovered ? 'scale-115 shadow-md ring-4 ring-emerald-100' : ''
                }`}
              >
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${node.color}`} />
              </div>
              <span className="mt-1 text-[11px] font-bold text-slate-800 text-center whitespace-nowrap bg-white/90 px-2 py-0.5 rounded-md shadow-2xs">
                {node.name}
              </span>
            </div>
          );
        })}
      </div>

      {/* Dynamic Detail Card on Hover / Default Guide */}
      <div className="mt-3 p-3 bg-slate-50 rounded-2xl border border-slate-100 text-xs transition-all duration-200 min-h-[64px] flex items-center justify-between">
        {activeNode ? (
          (() => {
            const current = nodes.find(n => n.id === activeNode);
            if (!current) return null;
            return (
              <div className="space-y-0.5 animate-fade-in w-full">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <span className={current.color}>●</span>
                  <span>{current.name}:</span>
                  <span className="text-[#00875a]">{current.role}</span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {current.description}
                </p>
              </div>
            );
          })()
        ) : (
          <div className="flex items-center justify-between w-full text-slate-500">
            <span className="text-[11px] italic">
              💡 Rê chuột vào các thành phần xung quanh để xem vai trò kết nối trong Living Lab.
            </span>
            {onNavigateToAbout && (
              <button
                onClick={onNavigateToAbout}
                className="text-[11px] font-bold text-[#00875a] hover:underline flex items-center gap-1 cursor-pointer flex-shrink-0 ml-2"
              >
                <span>Tìm hiểu mô hình</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
