import React from 'react';
import { Link } from "react-router-dom";
import logo from "../assets/logoattesta.jpeg";


export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-indigo-100">
      {/* 1. STICKY NAVIGATION */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {/* 🔁 LOGO IMAGE (ONLY CHANGE) */}
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-indigo-200">
              <img
                src={logo}
                alt="Attesta Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Attesta
            </span>
          </div>
          
          <div className="hidden md:flex gap-10 text-sm font-semibold text-slate-600">
            <a href="#features" className="hover:text-indigo-600 transition-colors">Features</a>
            <a href="#security" className="hover:text-indigo-600 transition-colors">Security</a>
            <a href="#network" className="hover:text-indigo-600 transition-colors">Network</a>
          </div>

          <div className="flex items-center gap-6">
            <Link to="/login" className="text-sm font-bold text-slate-700 hover:text-indigo-600">Login</Link>
            <Link to="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 transition-all active:scale-95">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 md:pt-28 md:pb-40">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-700">Next-Gen Privacy Protocol</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.05] mb-8">
              Your Identity, <br />
              <span className="text-indigo-600">Encrypted &</span> <br />
              Context-Bound.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-xl leading-relaxed">
              Manage your digital presence with zero-knowledge proofs. Attesta ensures you only share what's absolutely necessary for each interaction.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register" className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg shadow-2xl shadow-indigo-200 hover:bg-indigo-700 hover:-translate-y-1 transition-all text-center">
                Create Secure Vault
              </Link>
              <button className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all text-center">
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Visual (The Passport Mockup) */}
          <div className="relative flex justify-center">
            {/* Background Glows */}
            <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
            <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-[100px] opacity-40"></div>
            
            {/* Passport Card (Directly reflecting your dashboard style) */}
            <div className="relative w-full max-w-md bg-white p-3 rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-slate-100 rotate-2 hover:rotate-0 transition-transform duration-700">
              <div className="bg-indigo-600 rounded-[2rem] p-10 text-white relative overflow-hidden">
                {/* Decorative Pattern */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -mr-20 -mt-20"></div>
                
                <div className="flex justify-between items-start mb-16">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] font-bold text-indigo-200 mb-1">Digital Identity Passport</p>
                    <h3 className="text-2xl font-black">ATT-ID 001</h3>
                  </div>
                  <div className="w-12 h-12 border-2 border-white/20 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/></svg>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <label className="text-[10px] uppercase font-bold text-indigo-300">Subject Name</label>
                    <p className="text-xl font-bold">Manthan Sachdev</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-indigo-300">Birth Date</label>
                      <p className="font-semibold text-sm">xxxx-xx-xx</p>
                    </div>
                    <div>
                      <label className="text-[10px] uppercase font-bold text-indigo-300">Citizenship</label>
                      <p className="font-semibold text-sm">Global Resident</p>
                    </div>
                  </div>
                </div>

                <div className="mt-12 pt-6 border-t border-white/10 flex justify-between items-center">
                   <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-indigo-100">Verified by Attesta</span>
                   </div>
                   <p className="text-[10px] font-bold opacity-50 uppercase">Expires 08/2030</p>
                </div>
              </div>
            </div>

            {/* Floating Stats Badge */}
            <div className="absolute -bottom-8 right-0 bg-white p-4 rounded-2xl shadow-xl border border-slate-100 flex items-center gap-4 animate-bounce hover:pause">
               <div className="w-10 h-10 bg-green-50 rounded-xl flex items-center justify-center">
                  <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7"></path></svg>
               </div>
               <div>
                  <p className="text-xs text-slate-500 font-bold uppercase tracking-tight">Status</p>
                  <p className="text-sm font-black text-slate-800 tracking-tight">FULLY ATTESTED</p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FEATURE GRID */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 mb-4">Verified by Design</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">Access a unified interface for all your verified digital attributes, from personal identity to financial health.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { label: 'Personal', title: 'Identity Vault', icon: '👤', desc: 'Secure storage for full name, address, and biometric data.' },
              { label: 'Financial', title: 'Credit & Assets', icon: '📈', desc: 'Verified credit scores and financial standing without revealing balances.' },
              { label: 'Health', title: 'Medical ID', icon: '🏥', desc: 'Encrypted blood group, vaccination records, and emergency data.' }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300">
                <div className="text-4xl mb-6">{feature.icon}</div>
                <div className="text-[10px] font-black uppercase tracking-widest text-indigo-600 mb-2">{feature.label}</div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{feature.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. SECURITY ARCHITECTURE (NEW) */}
      <section id="security" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1 relative">
                <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-slate-800">
                   <div className="space-y-4">
                      <div className="h-12 w-full bg-slate-800 rounded-xl flex items-center px-4 gap-3">
                         <div className="w-2 h-2 rounded-full bg-red-400"></div>
                         <div className="w-2 h-2 rounded-full bg-yellow-400"></div>
                         <div className="w-2 h-2 rounded-full bg-green-400"></div>
                      </div>
                      <div className="p-4 font-mono text-sm text-indigo-400 space-y-2">
                        <p className="opacity-50">// Zero Knowledge Proof Execution</p>
                        <p>const proof = await Attesta.generateProof(identity);</p>
                        <p>verify(proof, requesterKey) ? "Authorized" : "Denied";</p>
                        <p className="text-green-400 font-bold">{">"} Data shared: Age {">"} 18 only.</p>
                      </div>
                   </div>
                </div>
                {/* Floating element */}
                <div className="absolute -top-6 -right-6 bg-indigo-600 text-white p-6 rounded-3xl shadow-xl">
                   <p className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Security Level</p>
                   <p className="text-2xl font-black uppercase">AES-256</p>
                </div>
            </div>

            <div className="order-1 lg:order-2">
              <h2 className="text-4xl font-black text-slate-900 mb-6">Uncompromising Security Architecture</h2>
              <div className="space-y-8">
                {[
                  { title: "Zero-Knowledge Proofs", desc: "Prove your attributes (like age or income) without revealing the underlying data points." },
                  { title: "Quantum-Resistant Encryption", desc: "Future-proof your identity with encryption standards designed for the next era of computing." },
                  { title: "Distributed Ledgers", desc: "Eliminate single points of failure. Your identity lives on a decentralized, private network." }
                ].map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-indigo-100 flex-shrink-0 flex items-center justify-center mt-1">
                      <div className="w-2 h-2 rounded-full bg-indigo-600"></div>
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 mb-1">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. CTA SECTION (NEW) */}
      <section className="py-24 max-w-7xl mx-auto px-6">
        <div className="bg-indigo-600 rounded-[3rem] p-12 lg:p-20 text-center relative overflow-hidden shadow-2xl shadow-indigo-200">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
           <h2 className="text-4xl md:text-5xl font-black text-white mb-8 relative z-10">Take control of your digital <br className="hidden md:block"/> presence today.</h2>
           <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link to="/register" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all">
                Get Started for Free
              </Link>
              <button className="bg-indigo-700 text-white border border-indigo-500 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-800 transition-all">
                Contact Enterprise
              </button>
           </div>
        </div>
      </section>

      {/* 6. FOOTER (NEW) */}
      <footer className="bg-white border-t border-slate-200 pt-20 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">A</div>
                <span className="text-xl font-bold tracking-tight text-slate-900">Attesta</span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">
                Protecting the future of human identity with verifiable, private, and purpose-bound protocols.
              </p>
            </div>
            
            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Platform</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">How it Works</a></li>
                <li><a href="#" className="hover:text-indigo-600">Integrations</a></li>
                <li><a href="#" className="hover:text-indigo-600">Verification Engine</a></li>
                <li><a href="#" className="hover:text-indigo-600">Developer Portal</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Company</h5>
              <ul className="space-y-4 text-sm text-slate-500">
                <li><a href="#" className="hover:text-indigo-600">About Attesta</a></li>
                <li><a href="#" className="hover:text-indigo-600">Global Standards</a></li>
                <li><a href="#" className="hover:text-indigo-600">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-indigo-600">Security Whitepaper</a></li>
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-slate-900 mb-6 uppercase text-xs tracking-widest">Connect</h5>
              <div className="flex gap-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white cursor-pointer transition-all">
                    𝕏
                 </div>
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white cursor-pointer transition-all">
                    in
                 </div>
                 <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:bg-indigo-600 hover:text-white cursor-pointer transition-all">
                    git
                 </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-slate-400 tracking-widest">
            <p>© 2025 ATTESTA IDENTITY PROTOCOL. ALL RIGHTS RESERVED.</p>
            <div className="flex gap-8">
              <a href="#">SYSTEM STATUS</a>
              <a href="#">COMPLIANCE</a>
              <a href="#">COOKIE SETTINGS</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}