
import React from 'react';
import { Linkedin, Mail, Twitter, Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-12 border-t border-slate-800/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <a href="#" className="text-2xl font-bold tracking-tight">
              <span className="text-blue-500">A</span>S.
            </a>
            <p className="text-slate-500 text-sm mt-2">© 2024 Ankush Sharma. All rights reserved.</p>
          </div>
          
          <div className="flex space-x-6">
            <a href="https://www.linkedin.com/in/ankushsharma-387b361b2" className="p-3 glass rounded-full hover:text-blue-500 transition-colors">
              <Linkedin size={20} />
            </a>
            <a href="mailto:as961719@gmail.com" className="p-3 glass rounded-full hover:text-blue-500 transition-colors">
              <Mail size={20} />
            </a>
            <a href="#" className="p-3 glass rounded-full hover:text-blue-500 transition-colors">
              <Twitter size={20} />
            </a>
            <a href="#" className="p-3 glass rounded-full hover:text-blue-500 transition-colors">
              <Github size={20} />
            </a>
          </div>
          
          <div className="text-slate-500 text-xs uppercase tracking-widest font-bold">
            Designed for Potential
          </div>
        </div>
      </div>
    </footer>
  );
};
