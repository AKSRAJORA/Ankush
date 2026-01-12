
import React from 'react';
import { AppProvider, useApp } from './AppContext';
import { Hero } from './components/Hero';
import { Navbar } from './components/Navbar';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { ProjectGallery } from './components/ProjectGallery';
import { AdminPanel } from './components/AdminPanel';
import { Experience } from './components/Experience';
import { Certifications } from './components/Certifications';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { Background3D } from './components/Background3D';
import { Chatbot } from './components/Chatbot';

const AppContent: React.FC = () => {
  const { theme, isAdmin } = useApp();

  return (
    <div className={`min-h-screen relative overflow-hidden transition-colors duration-500 ${theme}`}>
      <Background3D />
      <Navbar />
      
      <main className="relative z-10">
        <Hero />
        
        {isAdmin ? (
          <AdminPanel />
        ) : (
          <>
            <About />
            <Skills />
            <ProjectGallery />
            <Experience />
            <Certifications />
            <Education />
            <Contact />
          </>
        )}
      </main>

      <Footer />
      <Chatbot />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
