
import React from 'react';
import { MapPin, Mail, Linkedin, ExternalLink } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="flex-1 space-y-8">
            <h2 className="text-4xl font-bold">About <span className="text-blue-500">Me</span></h2>
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              <p>
                I’m a Research Analyst at <span className="text-slate-100 font-medium">Arcgate</span> with hands-on experience in data analysis, research methodologies, and client solutions. I bring a blend of academic knowledge and real-world experience.
              </p>
              <p>
                I’m passionate about <span className="text-blue-400">cybersecurity, HR, and technology</span>, and aim to build a career at the intersection of tech and human potential. My curiosity drives me to explore how technology can empower individuals and organizations to reach their full potential.
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="glass-card-3d-container flex flex-col">
                <div className="flex items-center space-x-4 p-4 glass rounded-2xl glass-card-3d group hover:border-blue-500/50 flex-1">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Location</p>
                    <p className="font-medium">Udaipur, Rajasthan, India</p>
                  </div>
                </div>
              </div>
              
              <div className="glass-card-3d-container flex flex-col">
                <div className="flex items-center space-x-4 p-4 glass rounded-2xl glass-card-3d group hover:border-blue-500/50 flex-1">
                  <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <Mail size={24} />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 uppercase font-bold tracking-widest">Email</p>
                    <p className="font-medium truncate max-w-[150px]">as961719@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-md lg:max-w-none glass-card-3d-container flex flex-col">
            <div className="relative group glass-card-3d flex-1">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-10 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative glass p-8 rounded-3xl space-y-8 h-full flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-bold">Research Analyst</h3>
                    <div className="p-2 glass rounded-lg text-blue-500">
                      <Linkedin size={20} />
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[85%]"></div>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400 uppercase tracking-widest font-bold">Analytical Precision</span>
                      <span className="font-bold text-blue-500">85%</span>
                    </div>
                  </div>

                  <div className="space-y-2 mt-8">
                    <p className="text-slate-400 italic">"I aim to build a career at the intersection of tech and human potential."</p>
                  </div>
                </div>

                <a 
                  href="http://www.linkedin.com/in/ankushsharma-387b361b2" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full mt-8 py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-semibold flex items-center justify-center transition-colors group"
                >
                  Visit LinkedIn Profile
                  <ExternalLink className="ml-2 group-hover:scale-110 transition-transform" size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
