import { NavLink, useNavigate } from "react-router-dom";
import {
  Shield,
  FileCheck,
  Activity,
  LogOut,
  MessageSquare,
  ScanLine,
} from "lucide-react";

export default function Sidebar({ fullName }) {
  const navigate = useNavigate();

  /* =======================
      AUTH / SIGN OUT
  ======================= */
  const handleSignOut = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  /* =======================
      NAVIGATION ITEMS
  ======================= */
  const navItems = [
    { to: "/dashboard", label: "Identity Vault", icon: Shield },
    { to: "/verify", label: "Verification Request", icon: FileCheck },
    { to: "/verify/scan", label: "Scan QR", icon: ScanLine },
    { to: "/logs", label: "Access Logs", icon: Activity },
    { to: "/chatbot", label: "Attesta AI", icon: MessageSquare },
  ];

  return (
    <aside className="w-72 bg-white border-r border-slate-100 flex flex-col h-screen sticky top-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
      
      {/* LOGO SECTION */}
      <div className="px-8 py-10 flex items-center gap-3">
        <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-200">
           {/* Replace with <img src="/logo.svg" /> if you have a file */}
           <span className="text-white font-bold text-xl">A</span>
        </div>
        <span className="text-2xl font-black text-slate-800 tracking-tight">
          Attesta
        </span>
      </div>

      {/* NAVIGATION SECTION */}
      <nav className="flex-1 px-4 space-y-1.5">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex items-center gap-4 px-4 py-3.5 rounded-2xl font-bold transition-all duration-200 group ${
                isActive
                  ? "bg-indigo-50 text-indigo-600 shadow-sm shadow-indigo-100/50"
                  : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
              }`
            }
          >
            <item.icon 
              size={20} 
              className="transition-transform duration-200 group-hover:scale-110" 
            />
            <span className="text-[15px]">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      {/* USER PROFILE + SIGN OUT SECTION */}
      <div className="p-4 border-t border-slate-50">
        <div className="bg-slate-50 rounded-[2rem] p-4 border border-slate-100 shadow-sm">
          <div className="flex items-center gap-3 mb-4 px-2">
            <div className="relative">
              <img
                className="w-10 h-10 rounded-full border-2 border-white shadow-sm object-cover"
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                  fullName || "User"
                )}&background=4f46e5&color=fff&bold=true`}
                alt="Profile"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-black text-slate-900 truncate tracking-tight">
                {fullName || "Authenticating..."}
              </p>
              <p className="text-[10px] text-indigo-500 uppercase font-black tracking-widest">
                Vault Active
              </p>
            </div>
          </div>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl bg-white text-slate-500 hover:text-red-600 hover:bg-red-50 border border-slate-100 transition-all duration-200 font-bold text-sm shadow-sm active:scale-95"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </aside>
  );
}