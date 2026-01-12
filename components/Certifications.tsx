
import React from 'react';
import { Award, ShieldCheck, Database, Laptop, Cpu, BookOpen } from 'lucide-react';

export const Certifications: React.FC = () => {
  const certs = [
    { title: 'Data Analytics Job Simulation', issuer: 'Deloitte Australia', icon: Database },
    { title: 'Cyber Job Simulation', issuer: 'Deloitte Australia', icon: ShieldCheck },
    { title: 'Technology Job Simulation', issuer: 'Deloitte Australia', icon: Laptop },
    { title: 'AI Tools Workshop', issuer: 'Professional Training', icon: Cpu },
    { title: '3hr Python Workshop', issuer: 'Certification', icon: BookOpen },
  ];

  return (
    <section id="certifications" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 text-blue-500 font-bold tracking-widest uppercase text-sm mb-4">
            <Award size={18} />
            <span>Achievement Hub</span>
          </div>
          <h2 className="text-4xl font-bold">Certifications</h2>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {certs.map((cert, idx) => (
            <div key={idx} className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] glass-card-3d-container flex flex-col">
              <div 
                className="flex-1 glass p-8 rounded-3xl relative overflow-hidden group glass-card-3d hover:border-blue-500/40 h-full flex flex-col"
              >
                <div className="absolute -right-8 -top-8 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
                
                <div className="mb-6 p-4 w-fit glass rounded-2xl text-blue-500 group-hover:scale-110 transition-transform duration-500">
                  <cert.icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold mb-2 tracking-tight">{cert.title}</h3>
                <p className="text-slate-500 font-medium uppercase tracking-widest text-xs mb-auto">{cert.issuer}</p>
                
                <div className="mt-8 flex items-center text-sm font-bold text-blue-500 cursor-pointer group/link">
                  View Certificate
                  <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
