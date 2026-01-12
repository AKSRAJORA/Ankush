
import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Bot, User, Loader2, Sparkles, TrendingUp, ShieldCheck, Languages, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useApp } from '../AppContext';

interface Message {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTIONS = [
  { label: "Evaluate Ankush for Data Analyst", icon: TrendingUp },
  { label: "Tell me about 'Arcgate' projects", icon: Sparkles },
  { label: "Check Certification validity", icon: ShieldCheck },
  { label: "Hindi Mode / हिंदी", icon: Languages }
];

export const Chatbot: React.FC = () => {
  const { projects } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Platform AI initialized. I have full context of Ankush's project portfolio, certifications, and career outcomes. How can I assist your talent acquisition search today?" }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSendMessage = async (userMsg?: string) => {
    const finalInput = userMsg || input.trim();
    if (!finalInput || isTyping) return;

    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: finalInput }]);
    setIsTyping(true);

    const projectContext = projects.map(p => `Project: ${p.title} | Tech: ${p.tech.join(', ')} | Impact: ${p.impact}`).join('\n');

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...messages.map(m => ({ role: m.role, parts: [{ text: m.text }] })),
          { role: 'user', parts: [{ text: finalInput }] }
        ],
        config: {
          systemInstruction: `You are ANKUSH AI (Enterprise Career Platform Engine). 
          
          CONTEXTUAL KNOWLEDGE:
          ${projectContext}
          
          CAREER SUMMARY:
          - Role: Research Analyst at Arcgate.
          - Past: Office Manager (7 yrs).
          - Education: B.Sc Math & CS.
          
          PERSONA PROTOCOLS:
          1. RECRUITER DETECTED: Focus on hard skills, project ROI, and "Culture Fit". Offer to send his Resume.
          2. HIRING MANAGER DETECTED: Deep dive into architecture and business value.
          3. ATS OPTIMIZATION: If asked, explain how his skills match keywords like 'Python', 'Tableau', 'Data Analysis'.
          
          STRICT RULES:
          - If a user asks about a project not in context, offer to connect them with Ankush.
          - Use a bold, professional SaaS-like tone.
          - Multi-lingual (English/Hindi).`,
          temperature: 0.3,
        }
      });

      setMessages(prev => [...prev, { role: 'model', text: response.text || "Connection to Digital Twin lost. Retrying..." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'model', text: "Enterprise API quota reached. Please contact as961719@gmail.com." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[400px] md:w-[480px] h-[650px] glass rounded-[2.5rem] flex flex-col shadow-3xl border border-blue-500/30 overflow-hidden animate-in slide-in-from-bottom-8 duration-500">
          <div className="p-6 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600 rounded-2xl text-white shadow-xl">
                <Bot size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg tracking-tight">Ankush AI <span className="text-[10px] bg-blue-500 text-white px-2 py-0.5 rounded-md ml-2">CORE</span></h3>
                <p className="text-[10px] text-blue-400 font-bold uppercase tracking-[0.2em]">Context Synchronized</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-all hover:rotate-90">
              <X size={20} />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-slate-950/20">
            {messages.length === 1 && (
              <div className="grid grid-cols-1 gap-2 mb-4">
                {SUGGESTIONS.map((s, i) => (
                  <button 
                    key={i} 
                    onClick={() => handleSendMessage(s.label)}
                    className="flex items-center space-x-3 p-3 glass hover:bg-blue-600/10 hover:border-blue-500/50 rounded-xl text-left text-xs text-slate-300 transition-all active:scale-95 group"
                  >
                    <s.icon size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />
                    <span>{s.label}</span>
                  </button>
                ))}
              </div>
            )}
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`flex items-start space-x-3 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-lg shrink-0 ${msg.role === 'user' ? 'bg-slate-800' : 'bg-blue-600'}`}>
                    {msg.role === 'user' ? <User size={14} /> : <Bot size={14} />}
                  </div>
                  <div className={`p-4 rounded-3xl text-sm leading-relaxed ${msg.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none shadow-sm'}`}>
                    {msg.text}
                  </div>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white/5 border border-white/10 p-4 rounded-3xl rounded-tl-none flex items-center space-x-3">
                  <Loader2 size={16} className="animate-spin text-blue-500" />
                  <span className="text-xs text-slate-500 italic">Accessing Project Database...</span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-6 border-t border-white/10 bg-black/40 backdrop-blur-xl">
            <div className="relative group">
              <input 
                type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder="Ex: 'Summarize his Python impact'..."
                className="w-full bg-slate-900/80 border border-slate-700 rounded-2xl py-4 pl-5 pr-14 text-sm focus:border-blue-500 outline-none transition-all"
              />
              <button type="submit" disabled={!input.trim() || isTyping} className="absolute right-2 top-2 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-500 disabled:bg-slate-800 transition-all">
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="glass-card-3d-container">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`p-5 rounded-[2rem] shadow-3xl transition-all duration-700 glass-card-3d hover:scale-110 active:scale-90 border-2 ${isOpen ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'bg-blue-600 border-blue-400/50 text-white'}`}
        >
          {isOpen ? <X size={32} /> : <MessageSquare size={32} />}
        </button>
      </div>
    </div>
  );
};
