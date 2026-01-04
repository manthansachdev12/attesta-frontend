import api from "../services/api";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function IdentityForm() {
  const [form, setForm] = useState({
    userType: "employee" // Default selection
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await api.post("/identity", form);
      navigate("/dashboard");
    } catch {
      alert("Failed to save identity");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 flex items-center justify-center font-sans">
      <div className="max-w-2xl w-full">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-600 rounded-xl text-white font-bold text-2xl shadow-lg shadow-indigo-200 mb-4">
            A
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Identity Attestation</h1>
          <p className="text-slate-500 mt-2 font-medium">Complete your profile to generate your encrypted Digital Passport.</p>
        </div>

        {/* Form Card */}
        <form 
          onSubmit={handleSubmit} 
          className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-100 space-y-8"
        >
          {/* Section: Personal Information */}
          <div>
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Personal Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Full Name</label>
                <input 
                  name="fullName" 
                  onChange={handleChange} 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                  placeholder="Alex Sterling" 
                />
              </div>
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Date of Birth</label>
                <input 
                  name="dob" 
                  type="date" 
                  onChange={handleChange} 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700" 
                />
              </div>
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Current Address</label>
                <input 
                  name="address" 
                  onChange={handleChange} 
                  required
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                  placeholder="742 Cyber Lane, Neo Tokyo" 
                />
              </div>
            </div>
          </div>

          {/* Section: Professional/Academic & Health */}
          <div className="pt-4">
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-indigo-600 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              Attributes & Verification
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Tax ID / SSN</label>
                <input 
                  name="taxId" 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                  placeholder="XXX-XX-8821" 
                />
              </div>
              
              <div className="col-span-2 md:col-span-1">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Blood Group</label>
                <input 
                  name="bloodGroup" 
                  onChange={handleChange} 
                  className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                  placeholder="A+" 
                />
              </div>

              {/* Conditional Logic: Student or Employee */}
              <div className="col-span-2">
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">I am currently a:</label>
                <div className="flex gap-4 p-1 bg-slate-100 rounded-2xl mb-4">
                  <button
                    type="button"
                    onClick={() => setForm({...form, userType: 'employee'})}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${form.userType === 'employee' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Employee
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({...form, userType: 'student'})}
                    className={`flex-1 py-3 rounded-xl text-sm font-bold transition-all ${form.userType === 'student' ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                  >
                    Student
                  </button>
                </div>

                {form.userType === 'employee' ? (
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">Company Name</label>
                    <input 
                      name="organization" 
                      onChange={handleChange} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                      placeholder="Quantum Dynamics Inc." 
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 ml-1">School / College Name</label>
                    <input 
                      name="organization" 
                      onChange={handleChange} 
                      className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-600 transition-all font-medium text-slate-700 placeholder:text-slate-300" 
                      placeholder="University of Neo Tokyo" 
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="pt-6">
            <button 
              disabled={isLoading}
              className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white py-5 rounded-[1.5rem] font-bold text-lg shadow-xl shadow-indigo-100 transition-all active:scale-[0.98] flex items-center justify-center gap-3 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? "Securing Identity..." : "Save & Generate Identity"}
            </button>
            <p className="text-center text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-6">
              🔒 Encrypted with AES-256 and Zero-Knowledge Protocol
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}  