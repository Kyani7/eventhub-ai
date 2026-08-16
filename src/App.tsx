import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import DashboardLayout from "./layouts/DashboardLayout";
import Overview from "./pages/dashboard/Overview";
import Events from "./pages/dashboard/Events";
import CreateEvent from "./pages/dashboard/CreateEvent";
import Registrations from "./pages/dashboard/Registrations";
import Scanner from "./pages/dashboard/Scanner";
import Certificates from "./pages/dashboard/Certificates";
import Announcements from "./pages/dashboard/Announcements";
import Reports from "./pages/dashboard/Reports";
import Settings from "./pages/dashboard/Settings";

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
          <Route path="certificates" element={<Certificates />} />
          <Route path="announcements" element={<Announcements />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}