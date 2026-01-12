
import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';

export const Contact: React.FC = () => {
  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl font-bold mb-4">Let's <span className="text-blue-500">Connect</span></h2>
              <p className="text-slate-400 text-lg">
                Interested in collaborating or have a project in mind? Reach out and let's explore how we can work together.
              </p>
            </div>

            <div className="space-y-4">
              <div className="glass-card-3d-container">
                <div className="p-6 glass rounded-2xl glass-card-3d">
                  <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Email Me</h4>
                  <p className="text-xl font-bold">as961719@gmail.com</p>
                </div>
              </div>
              <div className="glass-card-3d-container">
                <div className="p-6 glass rounded-2xl glass-card-3d">
                  <h4 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">LinkedIn</h4>
                  <p className="text-xl font-bold">ankushsharma-387b361b2</p>
                </div>
              </div>
            </div>
            
            {/* Minimal Map Simulation */}
            <div className="glass-card-3d-container">
              <div className="h-64 glass rounded-3xl relative overflow-hidden flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-700 glass-card-3d">
                <div className="text-center space-y-2 relative z-10">
                  <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto flex items-center justify-center animate-bounce">
                    <div className="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <p className="font-bold">Udaipur, India</p>
                </div>
                <div className="absolute inset-0 opacity-20 bg-[url('https://picsum.photos/id/122/800/600')] bg-cover"></div>
              </div>
            </div>
          </div>

          <div className="glass-card-3d-container">
            <div className="glass p-8 md:p-12 rounded-[2rem] shadow-2xl relative glass-card-3d">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="contact-name" className="text-xs font-bold uppercase tracking-widest text-slate-500">Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="contact-email" className="text-xs font-bold uppercase tracking-widest text-slate-500">Email</label>
                    <input 
                      id="contact-email"
                      type="email" 
                      required
                      className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="text-xs font-bold uppercase tracking-widest text-slate-500">Message</label>
                  <textarea 
                    id="contact-message"
                    rows={5}
                    required
                    className="w-full bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all resize-none"
                    placeholder="Tell me about your project..."
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading || isSent}
                  className={`w-full py-4 rounded-xl font-bold flex items-center justify-center transition-all focus:ring-4 focus:ring-blue-500/40 focus:outline-none ${
                    isSent 
                    ? 'bg-green-500 text-white' 
                    : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 active:scale-95'
                  }`}
                >
                  {loading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : isSent ? (
                    <>
                      <CheckCircle2 className="mr-2" size={20} />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <Send className="mr-2" size={20} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
