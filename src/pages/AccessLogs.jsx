import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import api from "../services/api";
import { QRCodeCanvas } from "qrcode.react";
import {
  ShieldCheck,
  Clock,
  FileText,
  ChevronRight,
  Activity,
  Download,
  X,
  Calendar,
  Layers,
  Fingerprint
} from "lucide-react";

export default function AccessLogs() {
  const [identity, setIdentity] = useState(null);
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLog, setSelectedLog] = useState(null);

  /* =========================
      FETCH DATA
  ========================= */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [identityRes, logsRes] = await Promise.all([
          api.get("/identity"),
          api.get("/logs"),
        ]);

        setIdentity(identityRes.data || null);
        setLogs(Array.isArray(logsRes.data) ? logsRes.data : []);
      } catch (err) {
        console.error("Failed to load access logs", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =========================
      DOWNLOAD QR LOGIC
  ========================= */
  const downloadQR = () => {
    const qrCanvas = document.querySelector("#verification-qr canvas");
    if (!qrCanvas || !selectedLog) return;

    const width = 420;
    const height = 560;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");

    // BACKGROUND
    ctx.fillStyle = "#F8FAFC";
    ctx.fillRect(0, 0, width, height);

    // CARD
    const cardX = 20;
    const cardY = 20;
    const cardW = width - 40;
    const cardH = height - 40;
    const radius = 28;

    ctx.fillStyle = "#ffffff";
    drawRoundedRect(ctx, cardX, cardY, cardW, cardH, radius);
    ctx.fill();

    // HEADER
    ctx.fillStyle = "#4F46E5";
    ctx.font = "bold 24px Inter, system-ui";
    ctx.textAlign = "center";
    ctx.fillText("ATTESTA", width / 2, 70);

    ctx.fillStyle = "#64748B";
    ctx.font = "12px Inter, system-ui";
    ctx.fillText("Secure Verification Card", width / 2, 95);

    // PURPOSE
    ctx.fillStyle = "#0F172A";
    ctx.font = "bold 18px Inter, system-ui";
    ctx.fillText(formatPurpose(selectedLog.purpose), width / 2, 140);

    // QR DRAW
    const qrSize = 220;
    const qrX = width / 2 - qrSize / 2;
    const qrY = 180;
    ctx.drawImage(qrCanvas, qrX, qrY, qrSize, qrSize);

    // FOOTER
    ctx.fillStyle = "#64748B";
    ctx.font = "11px Inter, system-ui";
    ctx.fillText("Scan to verify • Expires automatically", width / 2, 440);

    ctx.font = "10px Inter, system-ui";
    ctx.fillText(`Generated on ${new Date(selectedLog.createdAt).toLocaleString()}`, width / 2, 465);

    const pngUrl = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
    const link = document.createElement("a");
    link.href = pngUrl;
    link.download = `attesta-verification-${selectedLog._id.slice(-6)}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  function drawRoundedRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin w-12 h-12 border-4 border-indigo-100 border-t-indigo-600 rounded-full"></div>
          <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-xs">Decrypting Audit Logs...</p>
        </div>
      </div>
    );
  }

  if (!identity) return null;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100">
      <Sidebar fullName={identity.fullName} />

      <main className="flex-1 p-6 md:p-12 max-w-6xl mx-auto">
        {/* PAGE HEADER */}
        <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 text-indigo-600 rounded-full mb-4">
              <Fingerprint size={14} />
              <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                Secure Digital Audit
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">Access Logs</h1>
            <p className="text-slate-500 mt-2 font-medium">History of all purpose-bound identity verifications.</p>
          </div>

          <div className="hidden lg:flex gap-10 border-l border-slate-200 pl-10 h-16 items-center">
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase">Total Logs</p>
              <p className="text-2xl font-black text-indigo-600">{logs.length}</p>
            </div>
          </div>
        </div>

        {/* LOG LIST */}
        <div className="grid gap-4">
          {logs.length === 0 ? (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 p-20 text-center shadow-sm">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Activity size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-400 font-bold text-lg">
                No access events recorded in this vault yet.
              </p>
            </div>
          ) : (
            logs.map((log) => (
              <div
                key={log._id}
                onClick={() => setSelectedLog(log)}
                className="group cursor-pointer bg-white rounded-[1.5rem] border border-slate-100 p-6 flex items-center justify-between hover:border-indigo-200 hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-300 active:scale-[0.98]"
              >
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                    <ShieldCheck size={28} />
                  </div>
                  <div>
                    <h3 className="font-black text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                      {formatPurpose(log.purpose)}
                    </h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                        <Calendar size={12} />
                        {new Date(log.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-400 font-bold text-[11px]">
                        <Clock size={12} />
                        {new Date(log.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p>
                    <p className="text-xs text-green-600 font-black uppercase tracking-tighter">
                      {log.status}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-100 flex items-center justify-center text-slate-300 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                    <ChevronRight size={20} />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </main>

      {/* =========================
           QR MODAL
      ========================= */}
      {selectedLog && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-[440px] relative shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            
            {/* MODAL HEADER */}
            <div className="bg-slate-900 p-8 text-white relative">
              <button
                onClick={() => setSelectedLog(null)}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-all active:scale-90"
              >
                <X size={20} />
              </button>
              
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center mb-6">
                <Layers size={24} />
              </div>
              <h2 className="text-2xl font-black mb-1">Verification QR</h2>
              <p className="text-slate-400 text-sm font-medium">
                Vault Auth: {formatPurpose(selectedLog.purpose)}
              </p>
            </div>

            {/* MODAL BODY */}
            <div className="p-8">
              <div
                id="verification-qr"
                className="flex justify-center mb-8 p-6 bg-slate-50 rounded-[2rem] border-2 border-dashed border-slate-200 relative overflow-hidden"
              >
                {/* Decorative scanning line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-indigo-500 to-transparent animate-scan"></div>
                
                <QRCodeCanvas
                  size={220}
                  level="H"
                  value={`http://localhost:5000/api/verify/${selectedLog.verificationId}`}
                  className="rounded-lg shadow-sm"
                />
              </div>

              <div className="flex flex-col gap-3">
                <button
                  onClick={downloadQR}
                  className="flex items-center justify-center gap-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 transition-all active:scale-95"
                >
                  <Download size={18} /> Download Passport Card
                </button>
                <button
                  onClick={() => setSelectedLog(null)}
                  className="w-full bg-white text-slate-500 py-3 rounded-2xl font-bold text-sm hover:text-slate-800 transition-all"
                >
                  Close Archive
                </button>
              </div>

              <div className="flex items-center gap-2 justify-center mt-6 text-slate-400">
                <ShieldCheck size={14} className="text-indigo-500" />
                <p className="text-[10px] font-black uppercase tracking-widest">
                  Secure purpose-bound cryptographic proof
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Global CSS for scanning animation */}
      <style>{`
        @keyframes scan {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(280px); opacity: 0; }
        }
        .animate-scan {
          animation: scan 2.5s infinite linear;
        }
      `}</style>
    </div>
  );
}

/* =========================
    HELPER
========================= */
function formatPurpose(purpose = "") {
  return purpose
    .replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}