import { useState } from "react";
import { Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import Topbar from "../components/dashboard/Topbar";

export default function DashboardLayout() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <div className="min-h-screen bg-paper lg:flex">
      <aside className="hidden w-64 shrink-0 border-r border-mist p-5 lg:block">
        <Sidebar />
      </aside>

      <AnimatePresence>
        {mobileNavOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileNavOpen(false)}
              className="fixed inset-0 z-40 bg-ink/30 backdrop-blur-sm lg:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-paper p-5 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setMobileNavOpen(false)}
                aria-label="Close menu"
                className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink"
              >
                <X size={18} />
              </button>
              <Sidebar onNavigate={() => setMobileNavOpen(false)} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div className="flex min-h-screen flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />
        <main className="flex-1 bg-cloud/30 p-5 sm:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}