
import React, { createContext, useContext, useState, useEffect } from 'react';

export type Visibility = 'public' | 'recruiter-only' | 'draft';
export type Theme = 'dark' | 'light';

export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  tech: string[];
  visibility: Visibility;
  githubUrl?: string;
  impact?: string;
}

export interface AppContextType {
  theme: Theme;
  toggleTheme: () => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
  isRecruiter: boolean;
  setIsRecruiter: (val: boolean) => void;
  projects: Project[];
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};

const DEFAULT_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Enterprise Workflow Optimizer',
    summary: 'Internal data mapping tool for Arcgate operations reducing manual overhead.',
    description: 'Developed a comprehensive system for mapping complex business requirements and analyzing operational bottlenecks. Integrated with internal APIs to streamline data flow.',
    tech: ['Python', 'Tableau', 'Data Modeling'],
    visibility: 'public',
    impact: 'Increased team productivity by 15% through optimized requirement mapping and automation.'
  },
  {
    id: '2',
    title: 'Cybersecurity Risk Dashboard',
    summary: 'A real-time threat visualization tool for infrastructure audits.',
    description: 'A visual dashboard that aggregates security audit logs and highlights critical vulnerabilities using predictive scoring models.',
    tech: ['Security Audit', 'React', 'D3.js'],
    visibility: 'public',
    impact: 'Reduced audit reporting time by 40% for the research department.'
  },
  {
    id: '3',
    title: 'Client Infrastructure Audit',
    summary: 'Confidential security simulation for a Fortune 500 financial client.',
    description: 'A deep-dive security simulation and risk assessment for a major financial services provider, identifying legacy system gaps.',
    tech: ['Penetration Testing', 'Risk Management', 'Compliance'],
    visibility: 'recruiter-only',
    impact: 'Identified 12 critical vulnerabilities in simulated legacy infrastructure before production migration.'
  },
  {
    id: '4',
    title: 'Market Intelligence Engine',
    summary: 'Automated scraping and analysis of competitor tech stacks.',
    description: 'Proprietary research tool that identifies emerging technology trends within the BPO sector using NLP.',
    tech: ['NLP', 'Python', 'Web Scraping'],
    visibility: 'recruiter-only',
    impact: 'Provided strategic data for three successful multi-million dollar RFP bids.'
  }
];

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [isAdmin, setIsAdmin] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);
  const [projects, setProjects] = useState<Project[]>(DEFAULT_PROJECTS);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  useEffect(() => {
    document.body.className = theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900';
  }, [theme]);

  return (
    <AppContext.Provider value={{ 
      theme, toggleTheme, isAdmin, setIsAdmin, 
      isRecruiter, setIsRecruiter, projects, setProjects 
    }}>
      {children}
    </AppContext.Provider>
  );
};
