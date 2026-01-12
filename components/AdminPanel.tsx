
import React, { useState } from 'react';
import { useApp, Project, Visibility } from '../AppContext';
import { Plus, Github, Save, Trash2, Globe, Shield, FileText, ChevronRight } from 'lucide-react';

export const AdminPanel: React.FC = () => {
  const { projects, setProjects, setIsAdmin } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: 'New Enterprise Project',
      summary: 'Brief overview...',
      description: 'Full details...',
      tech: ['React', 'TypeScript'],
      visibility: 'draft'
    };
    setProjects([newProject, ...projects]);
    setEditingId(newProject.id);
  };

  const updateProject = (id: string, updates: Partial<Project>) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const deleteProject = (id: string) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen py-24 px-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h2 className="text-4xl font-bold mb-2">Control <span className="text-blue-500">Center</span></h2>
          <p className="text-slate-400">Manage your career assets and confidential enterprise data.</p>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAdmin(false)}
            className="px-6 py-3 glass rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all"
          >
            Exit Admin
          </button>
          <button 
            onClick={addProject}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold uppercase tracking-widest transition-all flex items-center shadow-lg shadow-blue-500/20"
          >
            <Plus size={16} className="mr-2" />
            Add Project
          </button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {projects.map(p => (
            <div key={p.id} className="glass p-6 rounded-3xl border border-white/5 hover:border-blue-500/20 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${p.visibility === 'public' ? 'text-emerald-500 bg-emerald-500/10' : p.visibility === 'recruiter-only' ? 'text-amber-500 bg-amber-500/10' : 'text-slate-500 bg-slate-500/10'}`}>
                    {p.visibility === 'public' ? <Globe size={18} /> : p.visibility === 'recruiter-only' ? <Shield size={18} /> : <FileText size={18} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{p.title}</h4>
                    <p className="text-xs text-slate-500 uppercase tracking-widest font-bold">{p.visibility}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setEditingId(editingId === p.id ? null : p.id)} className="p-2 hover:bg-white/5 rounded-lg text-slate-400 hover:text-white transition-all">
                    <Save size={18} />
                  </button>
                  <button onClick={() => deleteProject(p.id)} className="p-2 hover:bg-red-500/10 rounded-lg text-red-500 transition-all">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              {editingId === p.id && (
                <div className="grid gap-4 mt-6 animate-in slide-in-from-top-2">
                  <input 
                    className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none" 
                    value={p.title} 
                    onChange={e => updateProject(p.id, { title: e.target.value })}
                    placeholder="Project Title"
                  />
                  <textarea 
                    className="bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-2 text-sm focus:border-blue-500 outline-none h-24" 
                    value={p.summary} 
                    onChange={e => updateProject(p.id, { summary: e.target.value })}
                    placeholder="Brief Summary"
                  />
                  <div className="flex space-x-2">
                    {(['public', 'recruiter-only', 'draft'] as Visibility[]).map(v => (
                      <button 
                        key={v}
                        onClick={() => updateProject(p.id, { visibility: v })}
                        className={`px-4 py-2 rounded-xl text-[10px] font-bold uppercase tracking-widest transition-all ${p.visibility === v ? 'bg-blue-600 text-white' : 'glass text-slate-400'}`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <div className="glass p-8 rounded-[2rem] border border-blue-500/10">
            <div className="flex items-center space-x-3 mb-6">
              <Github className="text-blue-500" size={24} />
              <h3 className="font-bold text-xl">GitHub Sync</h3>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed mb-6">Automatically fetch your repositories and let AI transform them into professional case studies.</p>
            <button className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center">
              Connect Account
              <ChevronRight size={16} className="ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
