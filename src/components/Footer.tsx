import React, { useState } from 'react';
import { UserCheck, Mail, Send, CheckCircle2, Bot, Linkedin, Github, Globe, Instagram, Lightbulb } from 'lucide-react';

export const Footer: React.FC = () => {
  const [contactName, setContactName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactMessage, setContactMessage] = useState('');
  const [contactSuccess, setContactSuccess] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactEmail || !contactMessage) return;

    setContactSuccess(true);
    setTimeout(() => {
      setContactSuccess(false);
      setContactName('');
      setContactEmail('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <footer id="author" className="bg-slate-900 text-white pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-slate-800">
          
          {/* About Author Column */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500 text-slate-950 flex items-center justify-center font-bold">
                <Bot className="w-6 h-6" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">DroneCleaning<span className="text-sky-400">.Tech</span></span>
            </div>

            <div className="bg-slate-800/60 p-6 rounded-2xl border border-slate-700/80 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
                  alt="Yash Mukade"
                  className="w-14 h-14 rounded-full object-cover border-2 border-sky-400"
                />
                <div>
                  <h4 className="font-extrabold text-lg text-white flex items-center gap-1.5">
                    <a 
                      href="https://yashmukade.netlify.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="hover:text-sky-400 transition-colors flex items-center gap-1.5"
                    >
                      Yash Mukade
                      <UserCheck className="w-4 h-4 text-emerald-400" />
                    </a>
                  </h4>
                  <p className="text-xs text-sky-400 font-semibold">Project Visionary & Robotics Innovator</p>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed">
                Hi! I created DroneCleaning.Tech to showcase my project idea and technical framework for autonomous high-rise building cleaning using tethered multi-rotor drones. I am exploring the robotics, chemistry, and economics behind this concept.
              </p>

              {/* Personal Links */}
              <div className="space-y-2 pt-2 border-t border-slate-700 text-xs font-semibold text-slate-400">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-sky-400 shrink-0" />
                  <span className="text-slate-400">Personal Portfolio:</span>
                  <a 
                    href="https://yashmukade.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline font-bold"
                  >
                    yashmukade.netlify.app
                  </a>
                </div>

                <div className="flex items-center gap-2">
                  <Lightbulb className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-slate-300">Open for Feedback, Research Collaboration & Opportunities</span>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Contact Form Column */}
          <div className="lg:col-span-7 bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-sky-400 block mb-1">Get In Touch</span>
              <h3 className="text-2xl font-extrabold text-white">Connect with Yash Mukade</h3>
              <p className="text-sm text-slate-400 mt-1">
                Have feedback on this concept, or want to discuss collaboration, engineering, or potential build ideas? Send a direct message.
              </p>
            </div>

            {contactSuccess ? (
              <div className="bg-emerald-950/80 border border-emerald-500/40 rounded-2xl p-6 text-center text-emerald-300 animate-in fade-in duration-300">
                <CheckCircle2 className="w-10 h-10 mx-auto text-emerald-400 mb-2" />
                <h4 className="font-bold text-lg text-white">Message Sent Successfully!</h4>
                <p className="text-xs mt-1 text-emerald-200">Thank you for reaching out. Yash will get back to you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      placeholder="Jane Doe"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="ymukade3@gmail.com"
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-1">Message *</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Share your thoughts or discussion ideas on this project concept..."
                    value={contactMessage}
                    onChange={(e) => setContactMessage(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:ring-2 focus:ring-sky-500 resize-none"
                  />
                </div>

                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <Mail className="w-4 h-4 text-sky-400" />
                    <a href="mailto:ymukade3@gmail.com" className="hover:text-white transition-colors">
                      ymukade3@gmail.com
                    </a>
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold text-sm transition-all shadow-lg shadow-sky-500/20 inline-flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
              </form>
            )}

          </div>

        </div>

        {/* Footer Bottom Links */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-400 space-y-4 md:space-y-0">
          <p>&copy; 2026 DroneCleaning.Tech Concept Showcase by Yash Mukade. All rights reserved.</p>
          
          <div className="flex items-center space-x-5 text-slate-400">
            <a 
              href="https://yashmukade.netlify.app/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Personal Website"
              className="hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Globe className="w-4 h-4" />
              <span>Website</span>
            </a>
            <a 
              href="https://linkedin.com/in/yashmukade/" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="LinkedIn Profile"
              className="hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </a>
            <a 
              href="https://www.instagram.com/yash.mukadeeee_" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="Instagram Profile"
              className="hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Instagram className="w-4 h-4" />
              <span>Instagram</span>
            </a>
            <a 
              href="https://github.com/Yashmukadeee" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="GitHub Profile"
              className="hover:text-sky-400 transition-colors flex items-center gap-1 font-semibold"
            >
              <Github className="w-4 h-4" />
              <span>GitHub</span>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
