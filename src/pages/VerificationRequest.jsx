import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import {
  ShieldCheck,
  ArrowRight,
  Shield,
  Clock,
  Briefcase,
  Home,
  Activity,
  Lock,
  Zap,
  CheckCircle2,
} from "lucide-react";

export default function VerificationRequest() {
  const [identity, setIdentity] = useState(null);
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const res = await api.get("/identity");
        setIdentity(res.data);
      } catch (err) {
        console.error("Failed to load identity", err);
      } finally {
        setLoading(false);
      }
    };
    fetchIdentity();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
          <p className="text-slate-500 font-black uppercase tracking-widest text-xs">
            Decrypting Hub...
          </p>
        </div>
      </div>
    );
  }

  if (!identity) return null;

  const isVerified = Boolean(identity.andiId);

  const purposes = [
    {
      key: "age_verification",
      title: "Age Verification",
      icon: Clock,
      description: "Prove you are above a required age without revealing your exact date of birth.",
      attributes: ["Age (Over 18)"],
    },
    {
      key: "financial_kyc",
      title: "Financial KYC",
      icon: Briefcase,
      description: "Verify identity and credit standing for high-tier financial services.",
      attributes: ["Full Name", "Tax ID", "Credit Score"],
    },
    {
      key: "rental_agreement",
      title: "Rental Agreement",
      icon: Home,
      description: "Verify address and identity for housing and legal lease agreements.",
      attributes: ["Full Name", "Current Address"],
    },
    {
      key: "medical_emergency",
      title: "Emergency Medical",
      icon: Activity,
      description: "Share critical health info with first responders for emergency treatment.",
      attributes: ["Full Name", "Blood Group"],
    },
  ];

  const handleGenerateProof = async () => {
    if (!isVerified || !selectedPurpose) return;
    try {
      setGenerating(true);
      await api.post("/verify/generate", {
        purpose: selectedPurpose.key,
        attributes: selectedPurpose.attributes,
      });
      alert("Verification request created. Open Access Logs to share.");
    } catch (err) {
      console.error(err);
      alert("Verification failed");
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      <Sidebar fullName={identity.fullName} />

      <main className="flex-1 p-6 md:p-12 max-w-7xl mx-auto relative">
        {/* HEADER */}
        <div className="mb-12 flex justify-between items-start">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full mb-4">
              <Zap size={12} className="text-indigo-600" />
              <span className="text-[10px] font-black uppercase tracking-widest text-indigo-700">
                ZK-Proof Engine Active
              </span>
            </div>
            <h1 className="text-5xl font-black text-slate-900 tracking-tight">
              Verification Hub
            </h1>
            <p className="text-slate-500 mt-3 text-lg font-medium">
              Generate cryptographic proofs tailored to specific legal and financial requirements.
            </p>
          </div>
          
          <div className="hidden lg:block p-4 bg-white rounded-2xl border border-slate-100 shadow-sm text-right">
             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Protocol Version</p>
             <p className="text-sm font-black text-slate-900">v4.0.2-ANDI</p>
          </div>
        </div>

        {/* LOCKED OVERLAY */}
        {!isVerified && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-slate-50/40 backdrop-blur-md rounded-3xl m-6">
            <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-12 text-center shadow-2xl max-w-md">
              <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mx-auto mb-6">
                <Lock size={32} className="text-red-500" />
              </div>
              <h2 className="font-black text-2xl text-slate-900">
                Identity Lock Active
              </h2>
              <p className="text-slate-500 mt-4 leading-relaxed font-medium">
                Your AegisID vault is not yet linked to an official identity. Verify via DigiLocker to enable Zero-Knowledge proof generation.
              </p>
              <button 
                onClick={() => navigate('/verify-digilocker')}
                className="mt-8 w-full bg-slate-900 text-white py-4 rounded-2xl font-bold hover:bg-slate-800 transition shadow-lg shadow-slate-200"
              >
                Launch DigiLocker Portal
              </button>
            </div>
          </div>
        )}

        {/* PURPOSE SELECTION */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {purposes.map((p) => {
            const isSelected = selectedPurpose?.key === p.key;
            return (
              <div
                key={p.key}
                onClick={() => isVerified && setSelectedPurpose(p)}
                className={`group relative text-left bg-white border-2 rounded-[2.5rem] p-10 transition-all cursor-pointer ${
                  isSelected
                    ? "border-indigo-600 ring-4 ring-indigo-50 shadow-2xl shadow-indigo-100"
                    : "border-slate-50 hover:border-indigo-200 hover:shadow-xl"
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-colors ${
                    isSelected ? "bg-indigo-600 text-white" : "bg-slate-50 text-indigo-600 group-hover:bg-indigo-50"
                }`}>
                  <p.icon size={28} />
                </div>
                
                <h3 className="text-2xl font-black text-slate-900 mb-3">{p.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed mb-6">
                  {p.description}
                </p>

                {/* ATTRIBUTE TAGS */}
                <div className="flex flex-wrap gap-2">
                  {p.attributes.map((attr, i) => (
                    <span key={i} className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-500 uppercase tracking-tight">
                       <CheckCircle2 size={12} className="text-green-500" />
                       {attr}
                    </span>
                  ))}
                </div>

                {isSelected && (
                    <div className="absolute top-8 right-8 text-indigo-600">
                        <ShieldCheck size={32} />
                    </div>
                )}
              </div>
            );
          })}
        </div>

        {/* ACTION PANEL */}
        <div className={`transition-all duration-500 ${selectedPurpose && isVerified ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"}`}>
            <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl shadow-slate-200">
                <div className="flex items-center gap-6">
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center">
                        <ShieldCheck size={32} className="text-indigo-400" />
                    </div>
                    <div>
                        <p className="text-indigo-400 text-[10px] font-black uppercase tracking-widest mb-1">Confirm Purpose-Bound Auth</p>
                        <h4 className="text-xl font-bold">Share {selectedPurpose?.title} Proof?</h4>
                    </div>
                </div>
                
                <button
                    onClick={handleGenerateProof}
                    disabled={generating}
                    className="w-full md:w-auto px-12 py-5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-slate-700 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-xl shadow-indigo-900/40 flex items-center justify-center gap-3 active:scale-95"
                >
                    {generating ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
                            Processing...
                        </>
                    ) : (
                        <>
                            Sign & Generate Proof
                            <ArrowRight size={18} />
                        </>
                    )}
                </button>
            </div>
        </div>
      </main>
    </div>
  );
}