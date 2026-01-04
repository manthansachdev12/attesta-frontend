import { Routes, Route, Navigate } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import IdentityForm from "./pages/IdentityForm";
import IdentityDashboard from "./pages/IdentityDashboard";
import VerificationRequest from "./pages/VerificationRequest";
import AccessLogs from "./pages/AccessLogs";
import VerifyScan from "./pages/VerifyScan";
import VerifyDigiLocker from "./pages/VerifyDigiLocker";
import Chatbot from "./pages/Chatbot";

export default function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/identity-form" element={<IdentityForm />} />

      {/* Protected Dashboard Routes */}
      <Route path="/dashboard" element={<IdentityDashboard />} />
      <Route path="/verify" element={<VerificationRequest />} />
      <Route path="/logs" element={<AccessLogs />} />
      <Route path="/verify/scan" element={<VerifyScan />} />

      <Route path="/verify-digilocker" element={<VerifyDigiLocker />} />
      <Route path="/chatbot" element={<Chatbot />} />




      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
