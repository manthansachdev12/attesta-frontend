import { useState, useRef } from "react";
import Sidebar from "../components/Sidebar";
import jsQR from "jsqr";
import api from "../services/api";
import {
  Upload,
  CheckCircle2,
  XCircle,
  Loader2,
  ScanLine,
  ShieldCheck,
  FileSearch,
  AlertCircle,
  FileText,
  Lock,
  ArrowRight
} from "lucide-react";

export default function VerifyScan() {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [verifiedData, setVerifiedData] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setStatus(null);
    setError(null);
    setVerifiedData(null);
    setLoading(true);

    try {
      const image = await loadImage(file);
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = image.width;
      canvas.height = image.height;
      ctx.drawImage(image, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const qr = jsQR(imageData.data, imageData.width, imageData.height);

      if (!qr) throw new Error("QR_NOT_FOUND");

      let verificationId;
      try {
        const url = new URL(qr.data);
        verificationId = url.pathname.split("/").pop();
      } catch {
        verificationId = qr.data;
      }

      const res = await api.get(`/verify/${verificationId}`);

      if (res.data?.valid) {
        setStatus("verified");
        setVerifiedData(res.data);
      } else {
        setStatus("invalid");
      }
    } catch (err) {
      setError(err.message === "QR_NOT_FOUND" ? "No QR code detected in image" : "Verification process failed");
    } finally {
      setLoading(false);
    }
  };

  const isAgeVerification = verifiedData?.purpose?.toLowerCase().includes("age");
  const getExactAge = () => {
    const attrs = verifiedData?.attributes;
    if (!attrs) return null;
    if (typeof attrs === "object" && !Array.isArray(attrs)) return attrs.age ?? null;
    if (Array.isArray(attrs)) {
      const ageAttr = attrs.find((a) => a.key?.toLowerCase() === "age");
      return ageAttr?.value ?? null;
    }
    return null;
  };

  const exactAge = getExactAge();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans overflow-hidden">
      <Sidebar fullName="Verifier Terminal" />

      {/* SUBTLE BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.03] z-0">
        <svg width="100%" height="100%"><defs><pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse"><path d="M 40 0 L 0 0 0 40" fill="none" stroke="black" strokeWidth="1"/></pattern></defs><rect width="100%" height="100%" fill="url(#grid)" /></svg>
      </div>

      <main className="flex-1 flex flex-col z-10">
        {/* TOP NAV BAR */}
        <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-12 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-200">
              <ScanLine size={20} />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Security Terminal</h1>
          </div>
          <div className="flex items-center gap-3">
             <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">System Operational</span>
          </div>
        </header>

        <div className="flex-1 flex gap-8 p-12 overflow-hidden">
          {/* LEFT COLUMN: UPLOAD & PREVIEW */}
          <div className="flex-[1.2] flex flex-col gap-6 h-full">
            <div className="bg-white rounded-[2rem] border border-slate-200 shadow-sm p-8 flex-1 flex flex-col">
              <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6 flex items-center gap-2">
                <Upload size={14} /> Input Source
              </h2>
              
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`flex-1 border-2 border-dashed rounded-[1.5rem] transition-all flex flex-col items-center justify-center cursor-pointer group relative overflow-hidden ${
                previewUrl ? 'border-indigo-400 bg-slate-50' : 'border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/30'
              }`}>
                {previewUrl ? (
                  <>
                    <img src={previewUrl} alt="QR Preview" className="absolute inset-0 w-full h-full object-contain p-4 opacity-40 group-hover:opacity-20 transition-opacity" />
                    <div className="z-10 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full border border-indigo-100 text-indigo-600 font-bold shadow-sm">
                      Replace Image
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white transition-all shadow-sm">
                      <Upload className="text-slate-400" size={24} />
                    </div>
                    <p className="text-slate-600 font-bold">Upload Verification QR</p>
                    <p className="text-slate-400 text-xs mt-1">Accepts PNG, JPG, JPEG</p>
                  </div>
                )}
                <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} hidden />
              </div>
            </div>

            {/* QUICK GUIDELINES */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: ShieldCheck, text: "ZK-Protected" },
                { icon: Lock, text: "End-to-End" },
                { icon: FileText, text: "Audit Ready" }
              ].map((item, i) => (
                <div key={i} className="bg-white border border-slate-200 p-4 rounded-2xl flex items-center gap-3">
                  <item.icon size={16} className="text-indigo-600" />
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-tighter">{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT COLUMN: STATUS & RESULT */}
          <div className="flex-1 flex flex-col gap-6 overflow-y-auto pr-2 scrollbar-hide">
            {/* STEPPER / PROGRESS */}
            <div className="bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm">
              <h2 className="text-sm font-black uppercase text-slate-400 tracking-widest mb-6">Verification Pipeline</h2>
              <div className="space-y-6 relative">
                 <div className="absolute left-[15px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
                 {[
                   { label: "Image Acquisition", done: previewUrl || loading },
                   { label: "QR Pattern Analysis", done: loading || status },
                   { label: "ZK-Proof Validation", done: status }
                 ].map((step, i) => (
                   <div key={i} className="flex items-center gap-4 relative z-10">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center transition-colors ${
                        step.done ? 'bg-indigo-600 border-indigo-600 text-white' : 'bg-white border-slate-200 text-slate-300'
                      }`}>
                        {step.done ? <CheckCircle2 size={16} /> : <span className="text-xs font-bold">{i+1}</span>}
                      </div>
                      <span className={`text-xs font-bold ${step.done ? 'text-slate-800' : 'text-slate-400'}`}>{step.label}</span>
                   </div>
                 ))}
              </div>
            </div>

            {/* RESULTS BOX */}
            <div className="flex-1 bg-white rounded-[2rem] border border-slate-200 p-8 shadow-sm flex flex-col items-center justify-center text-center">
              {!status && !loading && !error && (
                <div className="flex flex-col items-center opacity-40">
                  <FileSearch size={48} className="text-slate-300 mb-4" />
                  <p className="text-sm font-bold text-slate-400 tracking-tight">System Idle. Waiting for input...</p>
                </div>
              )}

              {loading && (
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                    <Loader2 className="animate-spin text-indigo-600" size={32} />
                  </div>
                  <h3 className="text-lg font-black text-slate-800 uppercase tracking-tighter animate-pulse">Processing Proof</h3>
                  <p className="text-xs text-slate-400 mt-2">Querying decentralized network...</p>
                </div>
              )}

              {status === "verified" && (
                <div className="animate-in fade-in zoom-in-95 duration-500 w-full">
                  <div className="w-20 h-20 bg-green-50 rounded-3xl flex items-center justify-center mx-auto mb-6 text-green-500 shadow-inner">
                    <CheckCircle2 size={40} strokeWidth={2.5} />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 mb-1">Authentic Proof</h2>
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest mb-8">Cryptographic Handshake Verified</p>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-left space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Purpose</span>
                      <span className="text-xs font-black text-slate-800 uppercase">{verifiedData?.purpose || "Auth"}</span>
                    </div>
                    {isAgeVerification && (
                      <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-slate-200">
                        <span className="text-xs font-bold text-slate-500">Verified Age</span>
                        <span className="text-xl font-black text-indigo-600">{exactAge !== null ? exactAge : "21+"}</span>
                      </div>
                    )}
                  </div>
                  
                  <button onClick={() => { setStatus(null); setPreviewUrl(null); }} className="mt-8 w-full py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-800 transition-all">
                    Reset Terminal <ArrowRight size={16} />
                  </button>
                </div>
              )}

              {status === "invalid" && (
                <div className="animate-in fade-in zoom-in-95 duration-500">
                  <XCircle size={64} className="text-red-500 mx-auto mb-6" />
                  <h2 className="text-xl font-black text-slate-900 mb-2 tracking-tight uppercase">Invalid Identity Proof</h2>
                  <p className="text-slate-400 text-xs font-medium mb-8">The digital signature does not match or the token is expired.</p>
                  <button onClick={() => {setStatus(null); setPreviewUrl(null);}} className="w-full py-4 border border-slate-200 rounded-2xl font-bold text-slate-600 hover:bg-slate-50 transition-all uppercase tracking-widest text-xs">Acknowledge & Clear</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = URL.createObjectURL(file);
  });
}