
import React from 'react';
import { GraduationCap } from 'lucide-react';

export const Education: React.FC = () => {
  return (
    <section id="education" className="py-24 bg-slate-900/30">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-4 mb-12">
          <div className="p-3 bg-indigo-500 rounded-2xl text-white">
            <GraduationCap size={28} />
          </div>
          <h2 className="text-4xl font-bold">Education</h2>
        </div>

        <div className="glass-card-3d-container">
          <div className="glass p-10 rounded-3xl border-l-4 border-indigo-500 glass-card-3d">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-1">Bachelor of Science (B.Sc)</h3>
                <p className="text-indigo-400 font-semibold text-lg">Mathematics & Computer Science</p>
                <p className="text-slate-400 mt-4">Balkavi Bairagee College, Kanawati, Neemuch</p>
              </div>
              <div className="text-right">
                <span className="px-6 py-2 glass rounded-full font-bold text-slate-100">
                  2020 – 2023
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
