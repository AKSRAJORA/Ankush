
import React, { useState, useMemo } from 'react';
import { useApp, Project } from '../AppContext';
import { Lock, Sparkles, Layout, Database, ShieldAlert, ExternalLink, X, Loader2, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

export const ProjectGallery: React.FC = () => {
  const { projects, isRecruiter, setIsRecruiter } = useApp();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [caseStudy, setCaseStudy] = useState<{ summary: string; roi: string } | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const [showUnlockedToast, setShowUnlockedToast] = useState(false);

  const visibleProjects = useMemo(() => projects.filter(p => {
    if (p.visibility === 'public') return true;
    if (p.visibility === 'recruiter-only' && isRecruiter) return true;
    return false;
  }), [projects, isRecruiter]);

  const hiddenCount = useMemo(() => 
    projects.filter(p => p.visibility === 'recruiter-only' && !isRecruiter).length,
  [projects, isRecruiter]);

  const handleUnlock = () => {
    setIsRecruiter(true);
    setShowUnlockedToast(true);
    setTimeout(() => setShowUnlockedToast(false), 3000);
  };

  const generateAICaseStudy = async (project: Project) => {
    setLoadingAI(true);
    setCaseStudy(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a professional enterprise-grade case study for the following project:
        Title: ${project.title}
        Summary: ${project.summary}
        Tech: ${project.tech.join(', ')}
        Impact: ${project.impact || 'Significant operational efficiency gain'}
        
        Please structure your response with these exact headers:
        [SUMMARY]
        [ROI]`,
        config: { temperature: 0.4 }
      });
      
      const text = response.text || "";
      let summary = "The project delivered significant value through technical innovation and process optimization.";
      let roi = "The business experienced a measurable increase in efficiency and risk reduction.";

      // Improved flexible parsing
      const summaryMatch = text.match(/\[SUMMARY\]([\s\S]*?)(?=\[ROI\]|$)/i);
      const roiMatch = text.match(/\[ROI\]([\s\S]*?)$/i);

      if (summaryMatch) summary = summaryMatch[1].trim();
      if (roiMatch) roi = roiMatch[1].trim();
      
      // Fallback if formatting is completely different
      if (!summaryMatch && !roiMatch && text.length > 50) {
        summary = text.substring(0, text.length / 2);
        roi = text.substring(text.length / 2);
      }

      setCaseStudy({ summary, roi });
    } catch (err) {
      console.error("AI Generation Error:", err);
      setCaseStudy({ 
        summary: "Analysis connection interrupted. The platform AI is currently refreshing its context.", 
        roi: "Please try again in a few moments or contact Ankush for the manual PDF case study." 
      });
    } finally {
      setLoadingAI(false);
    }
  };

  return (
    <section id="projects" className="py-24 relative overflow-hidden border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center space-x-2 text-blue-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-2">
              <Layout size={14} />
              <span>Project Ecosystem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold">Showcasing <span className="text-blue-500">Innovation</span></h2>
            <p className="text-slate-400 mt-4 max-w-xl">A selection of my work in data analysis, cybersecurity, and operational research.</p>
          </div>
          
          <div className="flex flex-col items-start md:items-end gap-4">
            {!isRecruiter && hiddenCount > 0 && (
              <button 
                onClick={handleUnlock}
                className="group px-6 py-3 glass rounded-2xl text-xs font-bold uppercase tracking-widest text-slate-400 hover:text-blue-400 hover:border-blue-400/50 transition-all flex items-center space-x-3 bg-white/5"
              >
                <Lock size={14} className="group-hover:rotate-12 transition-transform" />
                <span>Unlock {hiddenCount} Recruiter-Only Projects</span>
              </button>
            )}
            {isRecruiter && (
              <div className="flex items-center space-x-2 text-emerald-500 text-xs font-bold uppercase tracking-widest bg-emerald-500/10 px-4 py-2 rounded-xl border border-emerald-500/20">
                <ShieldAlert size={14} />
                <span>Full Access Mode Active</span>
              </div>
            )}
          </div>
        </div>

        {visibleProjects.length === 0 ? (
          <div className="py-20 text-center glass rounded-[3rem] border-dashed border-2 border-white/10">
            <p className="text-slate-500 italic">Updating project database...</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {visibleProjects.map(p => (
              <div key={p.id} className="glass-card-3d-container flex flex-col h-full">
                <div className="glass p-8 rounded-[2.5rem] glass-card-3d flex flex-col flex-1 hover:border-blue-500/40 relative group">
                  {p.visibility === 'recruiter-only' && (
                    <div className="absolute top-6 right-6 flex items-center space-x-1.5 px-3 py-1 bg-amber-500/10 text-amber-500 rounded-full border border-amber-500/20">
                      <ShieldAlert size={12} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Confidential</span>
                    </div>
                  )}
                  
                  <div className="mb-8 p-4 w-fit glass rounded-2xl text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    <Database size={24} />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-blue-400 transition-colors">{p.title}</h3>
                  <p className="text-slate-400 text-sm mb-8 leading-relaxed flex-1">{p.summary}</p>
                  
                  <div className="flex flex-wrap gap-2 mb-8">
                    {p.tech.map(t => (
                      <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t}</span>
                    ))}
                  </div>

                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => { setSelectedProject(p); generateAICaseStudy(p); }}
                      className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 active:scale-95"
                    >
                      <Sparkles size={14} className="mr-2" />
                      AI Case Study
                    </button>
                    <button className="p-4 glass rounded-2xl hover:text-blue-500 transition-all active:scale-95 group/btn">
                      <ExternalLink size={18} className="group-hover/btn:scale-110 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal */}
        {selectedProject && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-10">
            <div 
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-xl animate-in fade-in duration-500" 
              onClick={() => setSelectedProject(null)}
            ></div>
            <div className="relative w-full max-w-5xl max-h-[90vh] glass rounded-[3rem] overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 shadow-3xl border border-blue-500/30">
              <div className="p-8 md:p-16 overflow-y-auto custom-scrollbar bg-gradient-to-br from-transparent to-blue-600/5">
                <div className="flex items-start justify-between mb-12">
                  <div className="flex items-center space-x-6">
                    <div className="p-5 bg-blue-600 rounded-3xl text-white shadow-2xl shadow-blue-500/30">
                      <Sparkles size={32} />
                    </div>
                    <div>
                      <h3 className="text-4xl font-bold tracking-tight mb-2">{selectedProject.title}</h3>
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-500 font-bold uppercase tracking-[0.2em] text-[10px] bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">Enterprise Portfolio Asset</span>
                        {selectedProject.visibility === 'recruiter-only' && (
                          <span className="text-amber-500 font-bold uppercase tracking-[0.2em] text-[10px] bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">Confidential</span>
                        )}
                      </div>
                    </div>
                  </div>
                  <button 
                    onClick={() => setSelectedProject(null)} 
                    className="p-4 hover:bg-white/10 rounded-2xl transition-all text-slate-400 hover:text-white"
                  >
                    <X size={28} />
                  </button>
                </div>

                {loadingAI ? (
                  <div className="py-24 flex flex-col items-center justify-center space-y-6">
                    <div className="relative">
                      <Loader2 className="animate-spin text-blue-500" size={64} />
                      <div className="absolute inset-0 blur-xl bg-blue-500/20 animate-pulse rounded-full"></div>
                    </div>
                    <p className="text-slate-400 font-bold uppercase tracking-[0.2em] text-xs animate-pulse">Analyzing Project Impact Matrix...</p>
                  </div>
                ) : caseStudy && (
                  <div className="grid lg:grid-cols-5 gap-16 animate-in slide-in-from-bottom-8 duration-700">
                    <div className="lg:col-span-3 space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-blue-500">Executive Summary</h4>
                        <div className="p-8 glass rounded-[2rem] border-white/5">
                          <p className="text-slate-200 leading-relaxed text-xl font-light italic">"{caseStudy.summary}"</p>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Deep Dive Analysis</h4>
                        <p className="text-slate-400 leading-relaxed text-lg">{selectedProject.description}</p>
                      </div>
                    </div>

                    <div className="lg:col-span-2 space-y-8">
                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-emerald-500">Business ROI & Outcomes</h4>
                        <div className="p-8 bg-emerald-500/5 rounded-[2rem] border border-emerald-500/20 relative overflow-hidden group">
                          <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                          <p className="text-emerald-50 font-medium leading-relaxed italic relative z-10">{caseStudy.roi}</p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500">Stack Architecture</h4>
                        <div className="flex flex-wrap gap-3">
                          {selectedProject.tech.map(t => (
                            <span key={t} className="px-5 py-2 glass rounded-2xl text-xs font-bold text-slate-300 uppercase tracking-widest border-white/10">{t}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="mt-16 pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="flex items-center space-x-4 text-slate-500 italic text-sm">
                    <CheckCircle2 size={16} className="text-blue-500" />
                    <span>Verified Project for Arcgate Research Operations</span>
                  </div>
                  <button className="px-10 py-5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center shadow-2xl">
                    Request Full Documentation
                    <ExternalLink size={16} className="ml-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Unlocked Toast */}
        {showUnlockedToast && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] bg-emerald-600 text-white px-8 py-4 rounded-2xl font-bold uppercase tracking-widest text-xs flex items-center space-x-3 shadow-2xl shadow-emerald-500/20 animate-in slide-in-from-bottom-10">
            <CheckCircle2 size={18} />
            <span>Confidential Projects Unlocked</span>
          </div>
        )}
      </div>
    </section>
  );
};
