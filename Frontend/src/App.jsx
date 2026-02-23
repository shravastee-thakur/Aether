import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Signup from "./pages/auth/Signup";
import Emailverify from "./pages/auth/Emailverify";
import OTPverify from "./pages/auth/OTPverify";
import ForgetPassword from "./pages/auth/ForgetPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import Pricing from "./pages/Pricing";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import WorkspaceSelector from "./pages/workspace/WorkspaceSelector";
import Dashboard from "./pages/workspace/Dashboard";
import ProjectDetail from "./pages/workspace/ProjectDetail";
import KanbanBoard from "./pages/workspace/KanbanBoard";


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/email-verify" element={<Emailverify />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/otp-verify" element={<OTPverify />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/workspace" element={<WorkspaceSelector />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/project-detail" element={<ProjectDetail />} />
          <Route path="/boards" element={<KanbanBoard />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
