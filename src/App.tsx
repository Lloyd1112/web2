import React, { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { BackToTop } from './components/common/BackToTop';
import { CollaborationModal } from './components/common/CollaborationModal';
import { SearchModal } from './components/common/SearchModal';
import { HomePage } from './pages/HomePage';
import { HealthModelsPage } from './pages/HealthModelsPage';
import { TrainingPage } from './pages/TrainingPage';
import { ConsultingPage } from './pages/ConsultingPage';
import { InternationalPage } from './pages/InternationalPage';
import { DoctorsAcrossBordersPage } from './pages/DoctorsAcrossBordersPage';
import { NewsContactPage } from './pages/NewsContactPage';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [collabModalType, setCollabModalType] = useState<string>('general');
  const [collabModalTitle, setCollabModalTitle] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenCollaboration = (type = 'general', title = '') => {
    setCollabModalType(type);
    setCollabModalTitle(title);
    setIsCollabModalOpen(true);
  };

  const renderActivePage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'health-models':
        return <HealthModelsPage onOpenCollaboration={handleOpenCollaboration} />;
      case 'training':
        return <TrainingPage onOpenCollaboration={handleOpenCollaboration} />;
      case 'consulting':
        return <ConsultingPage onOpenCollaboration={handleOpenCollaboration} />;
      case 'international':
        return <InternationalPage onOpenCollaboration={handleOpenCollaboration} />;
      case 'doctors':
        return <DoctorsAcrossBordersPage onOpenCollaboration={handleOpenCollaboration} />;
      case 'news-contact':
        return (
          <NewsContactPage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      default:
        return (
          <HomePage
            onNavigate={(tab) => {
              setActiveTab(tab);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white relative">
        
        {/* Top Scroll Reading Progress Indicator */}
        <ScrollProgressBar />

        {/* Navigation Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onOpenCollaboration={handleOpenCollaboration}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Page Main Content with smooth fade-in */}
        <main className="flex-1 animate-fade-in">
          {renderActivePage()}
        </main>

        {/* Universal Footer */}
        <Footer setActiveTab={setActiveTab} />

        {/* Floating Back-To-Top Button with circular progress ring */}
        <BackToTop />

        {/* Global Modals */}
        <CollaborationModal
          isOpen={isCollabModalOpen}
          onClose={() => setIsCollabModalOpen(false)}
          defaultType={collabModalType}
          defaultTitle={collabModalTitle}
        />

        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onNavigate={(tab) => {
            setActiveTab(tab);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        />

      </div>
    </LanguageProvider>
  );
}

export default App;
