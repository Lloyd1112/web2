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
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { ContactPage } from './pages/ContactPage';
import { RealProblemsPage } from './pages/RealProblemsPage';

// Admin System Pages & Layout
import { AdminLayout } from './pages/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminDashboardPage } from './pages/admin/AdminDashboardPage';
import { AdminProblemsPage } from './pages/admin/AdminProblemsPage';
import { AdminProposalsPage } from './pages/admin/AdminProposalsPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminPartnersPage } from './pages/admin/AdminPartnersPage';
import { AdminNewsPage } from './pages/admin/AdminNewsPage';
import { AdminAboutPage } from './pages/admin/AdminAboutPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';
import { AdminDataService } from './services/adminDataService';
import { RealProblem } from './types';

import { getTabFromPath, getPathForTab, ROUTES } from './routes';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; error: any }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    console.error('ErrorBoundary caught:', error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-12 text-center max-w-xl mx-auto my-12 bg-white rounded-3xl border border-red-200 shadow-lg">
          <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center mx-auto mb-4 font-bold text-xl">!</div>
          <h2 className="text-xl font-bold text-slate-900 mb-2">Đã xảy ra lỗi hiển thị</h2>
          <p className="text-xs text-slate-500 mb-6 font-mono bg-slate-50 p-3 rounded-xl border border-slate-200 text-left overflow-auto max-h-32">
            {String(this.state.error?.message || this.state.error)}
          </p>
          <button
            onClick={() => {
              this.setState({ hasError: false, error: null });
              window.location.reload();
            }}
            className="px-6 py-2.5 rounded-full bg-pum-green hover:bg-pum-greenAlt text-white font-bold text-xs shadow-md transition-all active:scale-95"
          >
            Tải lại trang
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export function App() {
  // Initialize tab directly from real browser URL
  const [activeTab, setActiveTab] = useState<string>(() => {
    if (typeof window !== 'undefined') {
      return getTabFromPath(window.location.pathname);
    }
    return 'home';
  });

  // Cross-page state for Admin operations
  const [adminPrefilledProblem, setAdminPrefilledProblem] = useState<RealProblem | null>(null);
  const [adminSelectedProblemId, setAdminSelectedProblemId] = useState<string | null>(null);
  const [adminSelectedProposalId, setAdminSelectedProposalId] = useState<string | null>(null);

  const [isCollabModalOpen, setIsCollabModalOpen] = useState(false);
  const [collabModalType, setCollabModalType] = useState<string>('general');
  const [collabModalTitle, setCollabModalTitle] = useState<string>('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  // Navigate function that pushes clean standard URL to browser address bar
  const navigateTo = (tab: string) => {
    setActiveTab(tab);
    const targetPath = getPathForTab(tab);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ tab }, '', targetPath);
    }
    const route = ROUTES[tab];
    if (route) {
      document.title = route.titleEn || route.titleVi;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Sync with browser Back and Forward navigation buttons
  React.useEffect(() => {
    const handlePopState = () => {
      const tab = getTabFromPath(window.location.pathname);
      setActiveTab(tab);
      const route = ROUTES[tab];
      if (route) {
        document.title = route.titleEn || route.titleVi;
      }
    };

    // If user lands on root "/" or empty, sync URL in address bar to canonical "/home"
    if (window.location.pathname === '/' || window.location.pathname === '') {
      window.history.replaceState({ tab: 'home' }, '', '/home');
    }

    // Update document title for initial load
    const currentRoute = ROUTES[activeTab];
    if (currentRoute) {
      document.title = currentRoute.titleEn || currentRoute.titleVi;
    }

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleOpenCollaboration = (type = 'general', title = '') => {
    setCollabModalType(type);
    setCollabModalTitle(title);
    setIsCollabModalOpen(true);
  };

  // ================= ADMIN VIEW RENDERING =================
  const renderAdminView = () => {
    if (activeTab === 'admin-login') {
      return (
        <AdminLoginPage
          onLoginSuccess={() => navigateTo('admin-dashboard')}
          onBackToHome={() => navigateTo('home')}
        />
      );
    }

    // Server-grade security check (Protected Route Guard)
    if (!AdminDataService.isAuthenticated()) {
      return (
        <AdminLoginPage
          onLoginSuccess={() => navigateTo(activeTab)}
          onBackToHome={() => navigateTo('home')}
        />
      );
    }

    return (
      <AdminLayout
        currentTab={activeTab}
        onNavigate={navigateTo}
        onLogout={() => {
          AdminDataService.logout();
          navigateTo('admin-login');
        }}
      >
        {(() => {
          switch (activeTab) {
            case 'admin-dashboard':
              return (
                <AdminDashboardPage
                  onNavigate={navigateTo}
                  onOpenProblemDetail={(id) => {
                    setAdminSelectedProblemId(id);
                    navigateTo('admin-problems');
                  }}
                  onOpenProposalDetail={(id) => {
                    setAdminSelectedProposalId(id);
                    navigateTo('admin-proposals');
                  }}
                  onOpenProjectDetail={() => navigateTo('admin-projects')}
                  onCreateProject={() => navigateTo('admin-projects')}
                />
              );

            case 'admin-problems':
              return (
                <AdminProblemsPage
                  onCreateProjectFromProblem={(problem) => {
                    setAdminPrefilledProblem(problem);
                    navigateTo('admin-projects');
                  }}
                  preSelectedProblemId={adminSelectedProblemId}
                />
              );

            case 'admin-proposals':
              return (
                <AdminProposalsPage
                  onOpenProblemDetail={(problemId) => {
                    setAdminSelectedProblemId(problemId);
                    navigateTo('admin-problems');
                  }}
                  onCreateProjectFromProposal={() => {
                    navigateTo('admin-projects');
                  }}
                  preSelectedProposalId={adminSelectedProposalId}
                />
              );

            case 'admin-projects':
              return (
                <AdminProjectsPage
                  prefilledProblem={adminPrefilledProblem}
                  onClearPrefilledProblem={() => setAdminPrefilledProblem(null)}
                  onOpenProblemDetail={(problemId) => {
                    setAdminSelectedProblemId(problemId);
                    navigateTo('admin-problems');
                  }}
                />
              );

            case 'admin-partners':
              return <AdminPartnersPage />;

            case 'admin-news':
              return <AdminNewsPage />;

            case 'admin-about':
              return <AdminAboutPage />;

            case 'admin-settings':
              return <AdminSettingsPage />;

            default:
              return (
                <AdminDashboardPage
                  onNavigate={navigateTo}
                  onOpenProblemDetail={(id) => {
                    setAdminSelectedProblemId(id);
                    navigateTo('admin-problems');
                  }}
                  onOpenProposalDetail={(id) => {
                    setAdminSelectedProposalId(id);
                    navigateTo('admin-proposals');
                  }}
                  onOpenProjectDetail={() => navigateTo('admin-projects')}
                  onCreateProject={() => navigateTo('admin-projects')}
                />
              );
          }
        })()}
      </AdminLayout>
    );
  };

  // ================= PUBLIC VIEW RENDERING =================
  const renderPublicPage = () => {
    switch (activeTab) {
      case 'home':
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'about':
        return (
          <AboutPage
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'events':
        return (
          <EventsPage
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'contact':
        return (
          <ContactPage
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'agriculture':
        return <HealthModelsPage initialPillar="agriculture" onOpenCollaboration={handleOpenCollaboration} />;
      case 'tourism':
        return <HealthModelsPage initialPillar="tourism" onOpenCollaboration={handleOpenCollaboration} />;
      case 'health':
      case 'health-models':
        return <HealthModelsPage initialPillar="health" onOpenCollaboration={handleOpenCollaboration} />;
      case 'projects':
        return <HealthModelsPage initialPillar="all" onOpenCollaboration={handleOpenCollaboration} />;
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
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
      case 'real-problems':
        return <RealProblemsPage onOpenCollaboration={handleOpenCollaboration} />;
      default:
        return (
          <HomePage
            onNavigate={navigateTo}
            onOpenCollaboration={handleOpenCollaboration}
          />
        );
    }
  };

  // If currently in Admin section, render Admin shell without public Header/Footer
  if (activeTab.startsWith('admin')) {
    return (
      <LanguageProvider>
        <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white">
          <ErrorBoundary>
            {renderAdminView()}
          </ErrorBoundary>
        </div>
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white relative">

        {/* Top Scroll Reading Progress Indicator */}
        <ScrollProgressBar />

        {/* Navigation Bar */}
        <Header
          activeTab={activeTab}
          setActiveTab={navigateTo}
          onOpenCollaboration={handleOpenCollaboration}
          onOpenSearch={() => setIsSearchModalOpen(true)}
        />

        {/* Page Main Content */}
        <main className="flex-1">
          <ErrorBoundary>
            {renderPublicPage()}
          </ErrorBoundary>
        </main>

        {/* Universal Footer */}
        <Footer setActiveTab={navigateTo} />

        {/* Floating Back-To-Top Button with circular progress ring */}
        <BackToTop />

        {/* Global Modals */}
        <CollaborationModal
          isOpen={isCollabModalOpen}
          onClose={() => {
            setIsCollabModalOpen(false);
            setCollabModalType('general');
            setCollabModalTitle('');
          }}
          defaultType={collabModalType}
          defaultTitle={collabModalTitle}
        />

        <SearchModal
          isOpen={isSearchModalOpen}
          onClose={() => setIsSearchModalOpen(false)}
          onNavigate={navigateTo}
        />

      </div>
    </LanguageProvider>
  );
}

export default App;
