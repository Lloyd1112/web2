import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { PumHero } from '../components/home/PumHero';
import { PumStats } from '../components/home/PumStats';
import { PumJoinUs } from '../components/home/PumJoinUs';
import { PumSectors } from '../components/home/PumSectors';
import { PumFeaturedProjects } from '../components/home/PumFeaturedProjects';
import { PumDoctorSpotlight } from '../components/home/PumDoctorSpotlight';
import { PumTestimonials } from '../components/home/PumTestimonials';
import { PumPartners } from '../components/home/PumPartners';
import { PumCtaBanner } from '../components/home/PumCtaBanner';
import { ProjectDetailModal } from '../components/common/ProjectDetailModal';
import { PumProject } from '../types';

interface HomePageProps {
  onNavigate: (tabId: string) => void;
  onOpenCollaboration: (type?: string, title?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate, onOpenCollaboration }) => {
  const { language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<PumProject | null>(null);

  return (
    <div className="w-full bg-white text-slate-800">
      
      {/* 1. Signature PUM 3-Image Hero Visual & Action Buttons */}
      <PumHero 
        onNavigate={onNavigate} 
        onOpenCollaboration={onOpenCollaboration} 
      />

      {/* 2. Key Impact Figures Bar */}
      <PumStats />

      {/* 3. PUM Iconic 3 "Join Us" Cards */}
      <PumJoinUs 
        onNavigate={onNavigate} 
        onOpenCollaboration={onOpenCollaboration} 
      />

      {/* 4. Five Strategic Core Sectors */}
      <PumSectors 
        onNavigate={onNavigate} 
      />

      {/* 5. Featured Projects & Living Lab Initiatives with Category Filters */}
      <PumFeaturedProjects 
        onNavigate={onNavigate} 
        onSelectProject={(project) => setSelectedProject(project as PumProject)} 
      />

      {/* 6. Doctors Across Borders Global Network Spotlight */}
      <PumDoctorSpotlight 
        onNavigate={onNavigate} 
        onOpenCollaboration={onOpenCollaboration} 
      />

      {/* 7. Perspectives & Testimonials */}
      <PumTestimonials />

      {/* 8. Trusted Alliances & Partners */}
      <PumPartners />

      {/* 9. Final Call to Action Banner */}
      <PumCtaBanner 
        onOpenCollaboration={onOpenCollaboration} 
        onNavigate={onNavigate} 
      />

      {/* Project Quick View Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onOpenCollaboration={onOpenCollaboration}
      />

    </div>
  );
};
