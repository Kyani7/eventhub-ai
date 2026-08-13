import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search, Bell, Menu, LogOut, User } from "lucide-react";

export default function Topbar({ onMenuClick }: { onMenuClick: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className="flex items-center justify-between gap-4 border-b border-mist bg-paper px-5 py-4 sm:px-8">
      <button
        onClick={onMenuClick}
        aria-label="Open menu"
        className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink lg:hidden"
      >
        <Menu size={18} />
      </button>

      <div className="hidden flex-1 max-w-sm items-center gap-2 rounded-full border border-mist bg-cloud/50 px-4 py-2 sm:flex">
        <Search size={15} className="text-ink-soft" strokeWidth={2} />
        <input
          type="text"
          placeholder="Search events, attendees..."
          className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-soft/60"
        />
      </div>

      <div className="ml-auto flex items-center gap-3">
        <button
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink-soft transition-colors hover:text-ink"
        >
          <Bell size={16} strokeWidth={2} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-accent" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2.5 rounded-full border border-mist py-1 pl-1 pr-3"
          >
            <span className="h-7 w-7 rounded-full bg-cloud" />
            <div className="hidden text-left sm:block">
              <p className="text-[12.5px] font-semibold leading-tight text-ink">
                Kyani Rai
              </p>
              <p className="text-[11px] leading-tight text-ink-soft">
                Organizer
              </p>
            </div>
          </button>

          {menuOpen && (
            <div className="absolute right-0 top-full mt-2 w-48 overflow-hidden rounded-2xl border border-mist bg-paper shadow-lg">
              <Link
                to="/dashboard/settings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 px-4 py-3 text-[13.5px] text-ink-soft transition-colors hover:bg-cloud hover:text-ink"
              >
                <User size={15} strokeWidth={2} />
                Account settings
              </Link>
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 border-t border-mist px-4 py-3 text-[13.5px] text-ink-soft transition-colors hover:bg-cloud hover:text-ink"
              >
                <LogOut size={15} strokeWidth={2} />
                Sign out
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}