import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import ComingSoon from "./pages/dashboard/ComingSoon";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Overview />} />
          <Route path="events" element={<ComingSoon title="Events" />} />
          <Route path="registrations" element={<ComingSoon title="Registrations" />} />
          <Route path="certificates" element={<ComingSoon title="Certificates" />} />
          <Route path="announcements" element={<ComingSoon title="Announcements" />} />
          <Route path="reports" element={<ComingSoon title="Reports" />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}