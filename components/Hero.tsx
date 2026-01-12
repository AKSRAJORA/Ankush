
import React from 'react';
import { ArrowRight, Download, Linkedin } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <div className="glass-card-3d-container inline-block mb-6">
          <div className="px-4 py-1.5 rounded-full glass glass-card-3d text-xs font-semibold tracking-widest text-blue-500 uppercase cursor-default">
            Welcome to my digital space
          </div>
        </div>
        
        <h1 className="text-5xl md:text-8xl font-bold mb-6 tracking-tight">
          Ankush <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-500">Sharma</span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-400 max-w-2xl mx-auto mb-10 font-light leading-relaxed">
          Explorer of Tech & People | Analyst at <span className="text-slate-100 font-medium">Arcgate</span> | Passionate Speaker | Driven by Curiosity
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a 
            href="#experience" 
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-500/20 w-full sm:w-auto justify-center group"
          >
            View My Work
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </a>
          <a 
            href="https://www.linkedin.com/in/ankushsharma-387b361b2"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold flex items-center transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center"
          >
            <Linkedin className="mr-2" size={18} />
            LinkedIn
          </a>
          <button className="px-8 py-4 glass hover:bg-white/10 rounded-xl font-semibold flex items-center transition-all hover:scale-105 active:scale-95 w-full sm:w-auto justify-center">
            <Download className="mr-2" size={18} />
            Resume
          </button>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-700 rounded-full flex justify-center p-1">
          <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-scroll"></div>
        </div>
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateY(0); opacity: 1; }
          100% { transform: translateY(20px); opacity: 0; }
        }
        .animate-scroll {
          animation: scroll 1.5s infinite;
        }
      `}</style>
    </section>
  );
};
