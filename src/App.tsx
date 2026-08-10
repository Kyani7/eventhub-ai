import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Events from "./pages/dashboard/Events";
import CreateEvent from "./pages/dashboard/CreateEvent";
import ComingSoon from "./pages/dashboard/ComingSoon";
import Registrations from "./pages/dashboard/Registrations";
import Scanner from "./pages/dashboard/Scanner";

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
          <Route path="events" element={<Events />} />
          <Route path="events/new" element={<CreateEvent />} />
          <Route path="registrations" element={<Registrations />} />
          <Route path="scanner" element={<Scanner />} />
          <Route path="certificates" element={<ComingSoon title="Certificates" />} />
          <Route path="announcements" element={<ComingSoon title="Announcements" />} />
          <Route path="reports" element={<ComingSoon title="Reports" />} />
          <Route path="settings" element={<ComingSoon title="Settings" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}