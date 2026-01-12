
import React from 'react';
import { Briefcase, Calendar, MapPin } from 'lucide-react';

export const Experience: React.FC = () => {
  const jobs = [
    {
      company: 'Arcgate',
      role: 'Research Assistant',
      period: 'June 2023 – Present',
      location: 'Udaipur, Rajasthan',
      points: [
        'Analyzing operational processes and mapping business requirements',
        'Conducting market research and supporting data-driven decisions',
        'Collaborating with teams to improve workflow and productivity'
      ]
    },
    {
      company: 'Shree Ambika Gas Agency',
      role: 'Office Manager',
      period: 'April 2017 – July 2023',
      location: 'Manasa, Madhya Pradesh',
      points: [
        'Managed customer service operations',
        'Oversaw sales, billing, and records',
        'Coordinated inventory and LPG deliveries'
      ]
    },
    {
      company: 'Mehar System',
      role: 'Printing & Photography',
      period: 'Nov 2020 – July 2021',
      location: 'Remote/On-site',
      points: [
        'Digital printing and quality control',
        'Photography and photo editing',
        'Client coordination and timely delivery'
      ]
    }
  ];

  return (
    <section id="experience" className="py-24 bg-slate-900/50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center space-x-4 mb-16">
          <div className="p-3 bg-blue-500 rounded-2xl text-white">
            <Briefcase size={28} />
          </div>
          <h2 className="text-4xl font-bold">Experience</h2>
        </div>

        <div className="space-y-12 relative">
          {/* Vertical line */}
          <div className="absolute left-[23px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-slate-700 to-transparent"></div>

          {jobs.map((job, idx) => (
            <div key={idx} className="relative pl-16 group glass-card-3d-container">
              <div className="absolute left-0 top-0 w-12 h-12 bg-slate-900 border-2 border-blue-500 rounded-full z-10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              </div>
              
              <div className="glass p-8 rounded-3xl glass-card-3d hover:border-blue-500/20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-2xl font-bold">{job.company}</h3>
                    <p className="text-blue-500 font-semibold">{job.role}</p>
                  </div>
                  <div className="flex flex-col md:items-end text-slate-400 text-sm space-y-1">
                    <div className="flex items-center">
                      <Calendar size={14} className="mr-2" />
                      {job.period}
                    </div>
                    <div className="flex items-center">
                      <MapPin size={14} className="mr-2" />
                      {job.location}
                    </div>
                  </div>
                </div>
                
                <ul className="space-y-3">
                  {job.points.map((pt, i) => (
                    <li key={i} className="flex items-start text-slate-300">
                      <div className="mt-1.5 mr-3 w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0"></div>
                      {pt}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
