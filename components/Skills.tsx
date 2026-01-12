
import React from 'react';
import { Database, BarChart3, FileSpreadsheet, Shield, Users, Terminal } from 'lucide-react';

export const Skills: React.FC = () => {
  const skills = [
    { name: 'Data Modeling', icon: Database, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { name: 'Tableau', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { name: 'Spreadsheets', icon: FileSpreadsheet, color: 'text-green-500', bg: 'bg-green-500/10' },
    { name: 'Cybersecurity', icon: Shield, color: 'text-red-500', bg: 'bg-red-500/10' },
    { name: 'Human Potential', icon: Users, color: 'text-purple-500', bg: 'bg-purple-500/10' },
    { name: 'Python', icon: Terminal, color: 'text-yellow-500', bg: 'bg-yellow-500/10' },
  ];

  return (
    <section id="skills" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Core <span className="text-blue-500">Skills</span></h2>
          <p className="text-slate-400 max-w-xl mx-auto">Leveraging a mix of technical proficiency and analytical research to drive data-informed decisions.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {skills.map((skill) => (
            <div key={skill.name} className="glass-card-3d-container flex flex-col">
              <div 
                className="group flex-1 p-8 glass rounded-3xl flex flex-col items-center justify-center text-center space-y-4 glass-card-3d hover:border-blue-500/40"
              >
                <div className={`p-5 rounded-2xl ${skill.bg} ${skill.color} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  <skill.icon size={40} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">{skill.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
