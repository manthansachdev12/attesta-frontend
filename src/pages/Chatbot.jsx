import { useState, useEffect, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Sidebar from "../components/Sidebar"; // Assuming your Sidebar is in this path
import ReactMarkdown from "react-markdown";
import { 
  Send, 
  Loader2, 
  Terminal, 
  User, 
  ChevronRight, 
  ShieldCheck, 
  Command 
} from "lucide-react";

/* =========================
    GEMINI INIT (CLIENT ONLY)
========================= */
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // Updated to a stable model string
});

export default function Chatbot() {
  const [identity, setIdentity] = useState(null); // For Sidebar
  const [messages, setMessages] = useState([
    {
      role: "model",
      text: "> **SYSTEM_READY**\n> **INITIATING_GEMINI_PROTOCOL**\n\nHello. I am the **Attesta AI** unit. Connection to Gemini is active. How shall we proceed with your inquiry?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const chatSessionRef = useRef(null);
  const endRef = useRef(null);

  /* =========================
      INIT CHAT & IDENTITY
  ========================= */
  useEffect(() => {
    // Mocking identity for the Sidebar - replace with your actual fetch if needed
    setIdentity({ fullName: "Manthan Sachdev" });

    chatSessionRef.current = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: "You are a helpful AI assistant in a high-security identity vault app." }],
        },
      ],
    });
  }, []);

  /* =========================
      AUTO SCROLL
  ========================= */
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  /* =========================
      SEND MESSAGE
  ========================= */
  const handleSend = async () => {
    if (!input.trim() || !chatSessionRef.current || loading) return;

    const userText = input.trim();
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setInput("");
    setLoading(true);

    try {
      const result = await chatSessionRef.current.sendMessage(userText);
      const responseText = result.response.text();

      setMessages((prev) => [
        ...prev,
        { role: "model", text: responseText },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "model",
          text: "> **FATAL_ERROR**: CONNECTION_INTERRUPTED. PLEASE RE-ENTER COMMAND.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex h-screen bg-white overflow-hidden selection:bg-indigo-600 selection:text-white">
      {/* SIDEBAR */}
      <Sidebar fullName={identity?.fullName || "USER_ROOT"} />

      <main className="flex-1 flex flex-col h-full bg-white relative border-l border-slate-100">
        
        {/* --- CONSOLE HEADER --- */}
        <header className="h-20 border-b-2 border-slate-900 bg-white px-10 flex justify-between items-center shrink-0 z-40">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 border-2 border-slate-900 bg-indigo-600 text-white flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(15,23,42,1)]">
                <Command size={20} />
            </div>
            <div>
              <h1 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Attesta_Intelligence_Console</h1>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-indigo-600 font-bold uppercase tracking-tighter bg-indigo-50 px-1 border border-indigo-100">AI: Active</span>
                <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter">Status: Online</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-slate-300">
             <div className="text-right">
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Protocol</p>
                <p className="text-[10px] font-black text-slate-900">GEMINI-2.5-FLASH</p>
             </div>
             <ShieldCheck size={18} className="text-indigo-600" />
          </div>
        </header>

        {/* --- TERMINAL DISPLAY --- */}
        <div className="flex-1 overflow-y-auto px-6 md:px-12 scrollbar-hide py-10 bg-[url('https://www.transparenttextures.com/patterns/graphy-light.png')] bg-fixed">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* BOOT LOG */}
            <div className="text-[10px] text-slate-300 font-bold leading-none space-y-1 mb-12 opacity-60">
                <p>{">"} INITIALIZING NEURAL_LINK... OK</p>
                <p>{">"} KEY_VALIDATION... OK</p>
                <p>{">"} HANDSHAKE_ESTABLISHED... OK</p>
                <p>--------------------------------------------------</p>
            </div>

            {messages.map((msg, i) => (
              <div key={i} className={`flex flex-col ${msg.role === "user" ? "items-end text-right" : "items-start text-left"}`}>
                
                {/* ROLE LABEL */}
                <div className={`mb-3 flex items-center gap-2 px-3 py-1 text-[10px] font-black uppercase tracking-widest border-2 ${
                    msg.role === "user" ? "bg-slate-900 text-white border-slate-900" : "bg-white text-indigo-600 border-indigo-600 shadow-[3px_3px_0px_0px_rgba(79,70,229,0.1)]"
                }`}>
                   {msg.role === "user" ? <User size={10} strokeWidth={3} /> : <Terminal size={10} strokeWidth={3} />}
                   {msg.role === "user" ? (identity?.fullName || "USER") : "GEMINI_AI"}
                </div>

                {/* CONTENT BLOCK */}
                <div className={`w-full max-w-[90%] p-6 border-2 transition-all ${
                    msg.role === "user" 
                    ? "border-slate-200 bg-slate-50 text-slate-600 shadow-[4px_4px_0px_0px_rgba(226,232,240,1)]" 
                    : "border-indigo-600 bg-white text-slate-900 shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]"
                }`}>
                  <div className="markdown-body prose prose-slate max-w-none">
                    <ReactMarkdown
                      components={{
                        strong: ({ children }) => <span className="text-indigo-600 font-black border-b-2 border-indigo-100">{children}</span>,
                        p: ({ children }) => <p className="text-sm leading-relaxed mb-4 last:mb-0 font-bold tracking-tight">{children}</p>,
                        li: ({ children }) => <li className="list-none mb-3 font-black text-xs before:content-['>>'] before:mr-3 before:text-indigo-600">{children}</li>
                      }}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  </div>
                </div>

                <div className="mt-3 text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                   LOG_TIME: {new Date().toLocaleTimeString()} // MODE: LLM_EXEC
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-4 animate-pulse">
                <div className="w-12 h-12 border-2 border-indigo-200 flex items-center justify-center">
                    <Loader2 className="animate-spin text-indigo-300" size={16} />
                </div>
                <span className="text-[10px] font-black tracking-widest text-indigo-300 uppercase italic">Awaiting_Neural_Response...</span>
              </div>
            )}
            <div ref={endRef} />
          </div>
        </div>

        {/* --- COMMAND INPUT AREA --- */}
        <div className="p-8 bg-white border-t-2 border-slate-900 shrink-0 z-40">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center border-2 border-slate-900 bg-white transition-all shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] focus-within:shadow-none focus-within:translate-x-1 focus-within:translate-y-1">
              <div className="pl-5 text-slate-900">
                <ChevronRight size={24} strokeWidth={4} />
              </div>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={loading}
                className="flex-1 bg-transparent px-4 py-5 text-slate-900 font-mono text-sm focus:outline-none placeholder:text-slate-200 font-black"
                placeholder="ENTER_QUERY_FOR_GEMINI..."
                autoFocus
              />
              <button
                onClick={handleSend}
                disabled={loading}
                className={`px-10 py-5 font-black text-[10px] uppercase tracking-[0.2em] transition-all border-l-2 border-slate-900 ${
                  loading 
                  ? "text-slate-300 bg-slate-50" 
                  : "text-white bg-indigo-600 hover:bg-slate-900 active:bg-indigo-700"
                }`}
              >
                {loading ? "BUSY" : "SEND_EXEC"}
              </button>
            </div>
            <div className="mt-5 flex justify-between items-center text-[9px] font-black text-slate-400 uppercase tracking-[0.4em]">
              <div className="flex items-center gap-2">
                <ShieldCheck size={14} className="text-indigo-600" />
                <span>Encrypted_Neural_Bridge: Active</span>
              </div>
              <span>Buffer: 100% // Mode: Direct_Execute</span>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}