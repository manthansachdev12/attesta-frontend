import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../services/api";
import Sidebar from "../components/Sidebar";
import {
  Shield,
  Bell,
  Settings,
  Share2,
  History,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function IdentityDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [identity, setIdentity] = useState(null);
  const [loading, setLoading] = useState(true);

  /* =========================
     FETCH IDENTITY (SINGLE SOURCE)
  ========================= */
  const fetchIdentity = async () => {
    try {
      const res = await api.get("/identity");
      setIdentity(res.data);
    } catch (error) {
      console.error("Failed to fetch identity", error);
      navigate("/login", { replace: true });
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */
  useEffect(() => {
    fetchIdentity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* =========================
     HANDLE RETURN FROM DIGILOCKER
  ========================= */
  useEffect(() => {
    if (location.state && location.state.refreshIdentity === true) {
      setLoading(true);

      fetchIdentity().then(() => {
        // clear navigation state to prevent re-trigger
        navigate(location.pathname, {
          replace: true,
          state: null,
        });
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  /* =========================
     LOADING / ERROR STATES
  ========================= */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-slate-500 font-bold">
        Loading your identity…
      </div>
    );
  }

  if (!identity) {
    return (
      <div className="min-h-screen flex items-center justify-center text-red-500 font-bold">
        Identity not found
      </div>
    );
  }

  const isVerified = identity.verified === true;

  /* =========================
     ATTRIBUTES
  ========================= */
  const attributes = [
    { category: "PERSONAL", label: "Full Name", value: identity.fullName },
    { category: "PERSONAL", label: "Date of Birth", value: identity.dob },
    {
      category: "LEGAL",
      label: "Tax ID / SSN",
      value: identity.taxId || "Not Set",
    },
    {
      category: "PERSONAL",
      label: "Current Address",
      value: identity.address,
    },
    {
      category: "FINANCIAL",
      label: "Credit Score",
      value: identity.creditScore || "Not Set",
    },
    {
      category: "HEALTH",
      label: "Blood Group",
      value: identity.bloodGroup || "Not Set",
    },
  ];

  return (
    <div className="flex min-h-screen bg-[#F8FAFC] font-sans">
      {/* SIDEBAR */}
      <Sidebar fullName={identity.fullName} />

      {/* MAIN */}
      <main className="flex-1">
        {/* TOP BAR */}
        <header className="h-20 bg-white border-b px-10 flex justify-between items-center sticky top-0 z-20">
          <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">
            Identity Vault
          </h2>
          <div className="flex gap-6 text-slate-400">
            <Bell size={20} />
            <Settings size={20} />
          </div>
        </header>

        {/* VERIFICATION BANNER */}
        {!isVerified && (
          <div className="bg-red-50 border-b border-red-200 px-10 py-4 flex items-center justify-between sticky top-20 z-10">
            <div className="flex items-center gap-3 text-red-700">
              <AlertTriangle size={18} />
              <p className="text-sm font-bold">
                Your identity is not verified. Verify with DigiLocker to activate secure sharing.
              </p>
            </div>
            <button
              onClick={() => navigate("/verify-digilocker")}
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-xl text-sm font-bold transition"
            >
              Verify Now
            </button>
          </div>
        )}

        {/* CONTENT */}
        <div className="p-10 max-w-7xl mx-auto">
          <section className="grid lg:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h1 className="text-4xl font-black mb-6 leading-tight text-slate-900">
                Your Identity, <br />
                <span className="text-indigo-600">Encrypted & Context-Bound.</span>
              </h1>

              <p className="text-slate-500 mb-10 text-lg max-w-md">
                Manage your digital presence with zero-knowledge proofs.
              </p>

              <div className="flex gap-4">
                <button
                  disabled={!isVerified}
                  onClick={() => navigate("/verify")}
                  className={`flex items-center gap-3 px-8 py-4 rounded-2xl font-bold transition ${
                    isVerified
                      ? "bg-indigo-600 text-white hover:bg-indigo-700"
                      : "bg-slate-300 text-slate-500 cursor-not-allowed"
                  }`}
                >
                  <Share2 size={18} />
                  Start Verification
                </button>

                <button
                  onClick={() => navigate("/logs")}
                  className="flex items-center gap-3 bg-white border px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition"
                >
                  <History size={18} /> View Activity
                </button>
              </div>
            </div>

            {/* IDENTITY CARD */}
            <div
              className={`relative rounded-[2rem] p-8 text-white shadow-2xl overflow-hidden ${
                isVerified ? "bg-indigo-600" : "bg-slate-600"
              }`}
            >
              <Shield className="absolute right-[-30px] top-[-30px] w-48 h-48 text-white/10" />

              <div className="flex justify-between items-start mb-10">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 font-bold mb-1">
                    Digital Identity Passport
                  </p>
                  <h3 className="text-2xl font-black uppercase tracking-tight">
                    ATTESTA-ID
                  </h3>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg border text-[10px] font-bold ${
                    isVerified
                      ? "bg-white/10 border-white/20"
                      : "bg-red-500/20 border-red-300"
                  }`}
                >
                  {isVerified ? (
                    <CheckCircle size={12} />
                  ) : (
                    <AlertTriangle size={12} />
                  )}
                  {isVerified ? "VERIFIED" : "NOT VERIFIED"}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-y-6">
                <div>
                  <p className="text-[10px] uppercase font-bold mb-1">Subject Name</p>
                  <p className="text-lg font-bold">{identity.fullName}</p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold mb-1">Citizenship</p>
                  <p className="text-lg font-bold">
                    {isVerified ? "Global Resident" : "—"}
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase font-bold mb-1">Birth Date</p>
                  <p className="text-lg font-bold">{identity.dob}</p>
                </div>

                <div className="flex items-end justify-end">
                  <p className="text-[9px] uppercase font-bold">
                    {isVerified ? "Expires 05/2030" : "Verification Required"}
                  </p>
                </div>
              </div>

              {isVerified && identity.andiId && (
                <div className="mt-6 pt-4 border-t border-white/20">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/70">
                    ANDI ID
                  </p>
                  <p className="text-sm font-black tracking-wider">
                    {identity.andiId}
                  </p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h3 className="text-lg font-black text-slate-800 mb-8">
              {isVerified ? "Verified Attributes" : "Stored Attributes"}
            </h3>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {attributes.map((attr, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
                >
                  <p className="text-[10px] uppercase font-black text-indigo-600 mb-2">
                    {attr.category}
                  </p>
                  <p className="text-xs text-slate-400 font-bold mb-1">
                    {attr.label}
                  </p>
                  <p className="text-xl font-bold text-slate-800 truncate">
                    {attr.value}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
