
import React, { useState, useEffect } from 'react';
import { useApp } from '../AppContext';
import { Sun, Moon, Menu, X, Linkedin, Mail, Settings, UserCheck } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { theme, toggleTheme, isAdmin, setIsAdmin, isRecruiter, setIsRecruiter } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
      isScrolled ? 'glass py-3 shadow-2xl border-b border-white/5' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="flex items-center space-x-3 group">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-bold text-xl group-hover:rotate-6 transition-transform">A</div>
          <span className="text-2xl font-bold tracking-tighter hidden sm:block">ANKUSH<span className="text-blue-500">.</span></span>
        </a>

        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              className="text-xs font-bold hover:text-blue-500 transition-all uppercase tracking-[0.2em] text-slate-400"
            >
              {link.name}
            </a>
          ))}
          
          <div className="flex items-center space-x-4 border-l border-white/10 pl-8">
            <button 
              onClick={() => setIsRecruiter(!isRecruiter)}
              className={`p-2 rounded-xl transition-all ${isRecruiter ? 'text-emerald-500 bg-emerald-500/10' : 'text-slate-400 hover:bg-white/5'}`}
              title="Toggle Recruiter Access"
            >
              <UserCheck size={20} />
            </button>
            <button 
              onClick={() => setIsAdmin(!isAdmin)}
              className={`p-2 rounded-xl transition-all ${isAdmin ? 'text-blue-500 bg-blue-500/10' : 'text-slate-400 hover:bg-white/5'}`}
              title="Admin Dashboard"
            >
              <Settings size={20} />
            </button>
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:bg-white/5 transition-all"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>

        <div className="md:hidden flex items-center space-x-4">
          <button onClick={() => setIsAdmin(!isAdmin)} className="p-2 text-slate-400">
            <Settings size={20} />
          </button>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-400">
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden glass absolute top-full left-0 w-full p-8 flex flex-col space-y-6 animate-in slide-in-from-top-4 duration-300">
          {navLinks.map(link => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-lg font-bold uppercase tracking-widest"
            >
              {link.name}
            </a>
          ))}
          <div className="flex space-x-6 pt-8 border-t border-white/10">
            <button onClick={toggleTheme} className="flex-1 py-4 glass rounded-2xl flex justify-center">
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <a href="https://www.linkedin.com/in/ankushsharma-387b361b2" className="flex-1 py-4 glass rounded-2xl flex justify-center">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};
