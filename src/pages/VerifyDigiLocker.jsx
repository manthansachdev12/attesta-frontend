import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import {
  ShieldCheck,
  AlertTriangle,
  Lock,
  Loader2,
  Info,
  CheckCircle2,
  ExternalLink
} from "lucide-react";

export default function VerifyDigiLocker() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAllow = async () => {
    try {
      setLoading(true);
      setError(null);
      await api.post("/digilocker/verify");
      navigate("/dashboard", { replace: true, state: { refreshIdentity: true } });
    } catch (err) {
      if (err.response?.status === 400) {
        navigate("/dashboard", { replace: true, state: { refreshIdentity: true } });
        return;
      }
      setError("Verification failed. Please check your connection.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7F9] flex flex-col font-sans text-slate-700">
      
      {/* OFFICIAL GOVT HEADER */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 h-16 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img 
              src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
              alt="Emblem" 
              className="h-10 opacity-80"
            />
            <div className="border-l border-slate-300 pl-4">
              <p className="text-[10px] font-bold text-slate-500 uppercase leading-none mb-1">Digital India</p>
              <p className="text-xs font-black text-[#0066B2] uppercase leading-none">DigiLocker</p>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Ministry of Electronics & IT</p>
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Government of India</p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-white rounded-lg shadow-[0_10px_25px_rgba(0,0,0,0.05)] border border-slate-200 overflow-hidden">
          
          {/* APP AUTHENTICATION INFO */}
          <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white border border-slate-200 rounded-xl flex items-center justify-center p-2 shadow-sm font-black text-indigo-600">
                ATT
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-800 tracking-tight">Attesta Protocol</h2>
                <div className="flex items-center gap-1 text-[10px] text-green-600 font-bold uppercase">
                  <ShieldCheck size={10} strokeWidth={3} /> Verified Application
                </div>
              </div>
            </div>
            <ExternalLink size={16} className="text-slate-300" />
          </div>

          <div className="p-8">
            <h1 className="text-xl font-bold text-slate-900 mb-6">Confirm Consent</h1>
            
            <div className="space-y-6">
              {/* INFORMATION DISCLOSURE BOX */}
              <div className="bg-[#E7F3FF] p-4 rounded-lg flex gap-3 border border-[#B8D9F7]">
                <Info size={20} className="text-[#0066B2] flex-shrink-0" />
                <p className="text-xs text-[#003366] leading-relaxed">
                  Attesta is requesting permission to access your data from DigiLocker. This information will be used to generate your private, decentralized identity vault.
                </p>
              </div>

              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Information requested:</p>
                <div className="space-y-3">
                  {["Full Name", "Date of Birth", "Gender", "Permanent Address"].map((item) => (
                    <div key={item} className="flex items-center gap-3 px-1">
                      <CheckCircle2 size={16} className="text-[#F8991D]" />
                      <span className="text-sm font-semibold text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DANGER/WARNING BOX */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg flex gap-3">
                <AlertTriangle size={20} className="text-amber-600 flex-shrink-0" />
                <p className="text-[11px] text-amber-800 font-medium">
                  <strong>Privacy Note:</strong> Your raw Aadhaar number is never shared with Attesta. Only the verified attributes above will be transmitted over a secure tunnel.
                </p>
              </div>

              {error && (
                <p className="text-center text-red-600 text-xs font-bold bg-red-50 p-2 rounded-md border border-red-100 italic">
                  {error}
                </p>
              )}

              {/* ACTION BUTTONS */}
              <div className="flex flex-col gap-3 pt-4">
                <button
                  onClick={handleAllow}
                  disabled={loading}
                  className={`w-full py-4 rounded-md font-black text-sm uppercase tracking-widest transition-all shadow-md active:scale-[0.99] ${
                    loading
                      ? "bg-slate-300 text-slate-500 cursor-not-allowed"
                      : "bg-[#0066B2] hover:bg-[#005596] text-white"
                  }`}
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="animate-spin" size={18} />
                      Fetching Data...
                    </span>
                  ) : (
                    "Allow & Verify"
                  )}
                </button>

                <button
                  onClick={() => navigate("/dashboard")}
                  className="w-full py-4 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors uppercase tracking-widest"
                >
                  Deny Access
                </button>
              </div>
            </div>
          </div>

          {/* SECURE FOOTER */}
          <div className="bg-slate-50 p-4 border-t border-slate-100 flex items-center justify-center gap-2">
            <Lock size={12} className="text-slate-400" />
            <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
              Secured by 256-Bit SSL Encryption
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER LOGOS */}
      <div className="mt-auto p-8 opacity-40 grayscale flex justify-center items-center gap-12">
        <img src="https://www.digilocker.gov.in/assets/img/digitallockerlogo.png" alt="DigiLocker" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/9/95/Digital_India_logo.svg/1200px-Digital_India_logo.svg.png" alt="Digital India" className="h-8" />
      </div>
    </div>
  );
}