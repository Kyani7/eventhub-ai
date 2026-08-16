import { NavLink } from "react-router-dom";
import {
  LayoutGrid,
  CalendarDays,
  Users,
  ScanLine,
  Award,
  Megaphone,
  BarChart3,
  Settings,
} from "lucide-react";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutGrid, end: true },
  { to: "/dashboard/events", label: "Events", icon: CalendarDays },
  { to: "/dashboard/registrations", label: "Registrations", icon: Users },
  { to: "/dashboard/scanner", label: "Scanner", icon: ScanLine },
  { to: "/dashboard/certificates", label: "Certificates", icon: Award },
  { to: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
  { to: "/dashboard/reports", label: "Reports", icon: BarChart3 },
];

export default function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <a href="/" className="flex items-center gap-2 px-2 font-display">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
          G
        </span>
        <span className="text-[15px] font-bold tracking-tight text-ink">
          Gather<span className="text-accent">ly</span>
        </span>
      </a>

      <nav className="mt-8 flex-1 space-y-1">
        {NAV.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onNavigate}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
                  isActive
                    ? "bg-ink text-paper"
                    : "text-ink-soft hover:bg-cloud hover:text-ink"
                }`
              }
            >
              <Icon size={16} strokeWidth={2} />
              {item.label}
            </NavLink>
          );
        })}
      </nav>

      <NavLink
        to="/dashboard/settings"
        onClick={onNavigate}
        className={({ isActive }) =>
          `flex items-center gap-3 rounded-2xl px-3.5 py-2.5 text-[13.5px] font-medium transition-colors ${
            isActive ? "bg-ink text-paper" : "text-ink-soft hover:bg-cloud hover:text-ink"
          }`
        }
      >
        <Settings size={16} strokeWidth={2} />
        Settings
      </NavLink>
    </div>
  );
}