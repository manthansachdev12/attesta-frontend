import api from "../services/api";
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirmation
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    // Validation: Check if passwords match before calling the API
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/auth/register", { email, password });
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
      
      {/* LEFT SIDE: BRANDING PANEL */}
      <div className="hidden lg:flex lg:w-1/2 bg-indigo-600 items-center justify-center p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
           <div className="absolute top-[-10%] right-[-10%] w-96 h-96 rounded-full border-[40px] border-white"></div>
           <div className="absolute bottom-[20%] left-[-5%] w-48 h-48 rounded-full bg-white"></div>
        </div>

        <div className="relative z-10 max-w-md">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 backdrop-blur-lg rounded-2xl mb-8 border border-white/20">
            <span className="text-white text-3xl font-black">A</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">Join the Future of Digital Identity</h2>
          <ul className="text-indigo-100 space-y-4 text-lg">
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
              Zero-knowledge attribute verification
            </li>
            <li className="flex items-center gap-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center text-[10px]">✓</div>
              Encrypted personal vault storage
            </li>
          </ul>
        </div>
      </div>

      {/* RIGHT SIDE: REGISTRATION FORM */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 md:p-16">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-black text-slate-900 mb-2">Create Account</h1>
            <p className="text-slate-500 font-medium">Start securing your digital presence today.</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-5">
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
                Email Address
              </label>
              <input 
                type="email"
                required
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700"
                placeholder="alex@example.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
                Password
              </label>
              <input 
                type="password"
                required
                className="w-full px-5 py-4 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700"
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* NEW: Confirm Password Field */}
            <div>
              <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-2">
                Confirm Password
              </label>
              <input 
                type="password"
                required
                className={`w-full px-5 py-4 bg-white border rounded-2xl focus:outline-none focus:ring-4 transition-all font-medium text-slate-700 ${
                  confirmPassword && password !== confirmPassword 
                    ? 'border-red-400 focus:ring-red-500/10 focus:border-red-500' 
                    : 'border-slate-200 focus:ring-indigo-500/10 focus:border-indigo-600'
                }`}
                placeholder="••••••••" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {confirmPassword && password !== confirmPassword && (
                <p className="text-red-500 text-[10px] font-bold mt-2 uppercase tracking-wider">Passwords do not match</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] mt-2 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <div className="mt-10 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 font-medium">
              Already have an account? {' '}
              <Link to="/login" className="text-indigo-600 font-bold hover:underline">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}