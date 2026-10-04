import React, { useState } from 'react';
import { Header } from './components/livinglab/Header';
import { Footer } from './components/livinglab/Footer';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { BackToTop } from './components/common/BackToTop';
import { HomePage } from './pages/livinglab/HomePage';
import { ProblemsPage } from './pages/livinglab/ProblemsPage';
import { ProblemDetailPage } from './pages/livinglab/ProblemDetailPage';
import { ProjectsPage } from './pages/livinglab/ProjectsPage';
import { ProjectDetailPage } from './pages/livinglab/ProjectDetailPage';
import { CommunityPage } from './pages/livinglab/CommunityPage';
import { SubmitProblemPage } from './pages/livinglab/SubmitProblemPage';
import { AboutLivingLabPage } from './pages/livinglab/AboutLivingLabPage';
import { LoginModal } from './components/livinglab/LoginModal';
import { ParticipateModal } from './components/livinglab/ParticipateModal';
import { mockProblems, mockProjects } from './data/livingLabData';
import { ProblemItem, ProjectItem, UserSession } from './types/livingLab';

export function App() {
  const [currentTab, setCurrentTab] = useState<string>('home');
  const [selectedProblem, setSelectedProblem] = useState<ProblemItem | null>(mockProblems[0]);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(mockProjects[0]);
  const [problemsFieldFilter, setProblemsFieldFilter] = useState<string>('all');
  
  // Modals state
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isParticipateModalOpen, setIsParticipateModalOpen] = useState(false);

  // User session state (demo account preloaded for seamless UX)
  const [userSession, setUserSession] = useState<UserSession>({
    isLoggedIn: true,
    name: 'Nguyễn Văn An',
    role: 'Sinh viên CNTT (ĐH HUTECH)',
    roleType: 'student',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  });

  const handleNavigate = (tab: string, filter: string = 'all') => {
    setCurrentTab(tab);
    if (tab === 'problems') {
      setProblemsFieldFilter(filter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProblem = (problem: ProblemItem) => {
    setSelectedProblem(problem);
    setCurrentTab('problem-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProject = (project: ProjectItem) => {
    setSelectedProject(project);
    setCurrentTab('project-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToProjectById = (projectId: string) => {
    const proj = mockProjects.find(p => p.id === projectId) || mockProjects[0];
    handleSelectProject(proj);
  };

  const handleOpenParticipateModal = (problem?: ProblemItem) => {
    if (problem) {
      setSelectedProblem(problem);
    }
    setIsParticipateModalOpen(true);
  };

  const renderActivePage = () => {
    switch (currentTab) {
      case 'home':
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProblem={handleSelectProblem}
          />
        );

      case 'problems':
        return (
          <ProblemsPage
            key={problemsFieldFilter}
            initialFieldFilter={problemsFieldFilter}
            onSelectProblem={handleSelectProblem}
            onNavigateToSubmit={() => handleNavigate('submit-problem')}
          />
        );

      case 'problem-detail':
        return selectedProblem ? (
          <ProblemDetailPage
            problem={selectedProblem}
            onBack={() => handleNavigate('problems')}
            onOpenParticipateModal={() => setIsParticipateModalOpen(true)}
            onNavigateToProject={handleNavigateToProjectById}
          />
        ) : (
          <ProblemsPage
            onSelectProblem={handleSelectProblem}
            onNavigateToSubmit={() => handleNavigate('submit-problem')}
          />
        );

      case 'projects':
        return (
          <ProjectsPage
            onSelectProject={handleSelectProject}
          />
        );

      case 'project-detail':
        return selectedProject ? (
          <ProjectDetailPage
            project={selectedProject}
            onBack={() => handleNavigate('projects')}
            onNavigateToProblem={(probId) => {
              const prob = mockProblems.find(p => p.id === probId) || mockProblems[0];
              handleSelectProblem(prob);
            }}
          />
        ) : (
          <ProjectsPage
            onSelectProject={handleSelectProject}
          />
        );

      case 'community':
        return <CommunityPage />;

      case 'submit-problem':
        return (
          <SubmitProblemPage
            onBackToHome={() => handleNavigate('home')}
            onNavigateToProblems={() => handleNavigate('problems')}
          />
        );

      case 'about':
        return (
          <AboutLivingLabPage
            onNavigateToProblems={() => handleNavigate('problems')}
            onNavigateToSubmit={() => handleNavigate('submit-problem')}
          />
        );

      default:
        return (
          <HomePage
            onNavigate={handleNavigate}
            onSelectProblem={handleSelectProblem}
          />
        );
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F7FAF8] text-slate-800 font-sans selection:bg-emerald-500 selection:text-white relative">
      
      {/* Scroll Reading Progress Bar */}
      <ScrollProgressBar />

      {/* Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
        userSession={userSession}
        onOpenLoginModal={() => setIsLoginModalOpen(true)}
        onLogout={() => setUserSession({
          isLoggedIn: false,
          name: '',
          role: '',
          roleType: 'resident',
          avatar: ''
        })}
      />

      {/* Main Content Area */}
      <main className="flex-1 animate-fade-in">
        {renderActivePage()}
      </main>

      {/* Universal Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating Back to Top Button */}
      <BackToTop />

      {/* Global Login & Role Switcher Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onLoginSuccess={(session) => setUserSession(session)}
      />

      {/* Global Participate Proposal Modal */}
      <ParticipateModal
        isOpen={isParticipateModalOpen}
        onClose={() => setIsParticipateModalOpen(false)}
        problem={selectedProblem}
        onProposalSubmitted={(data) => {
          console.log('Đề xuất tham gia đã gửi:', data);
        }}
      />

    </div>
  );
}

export default App;
