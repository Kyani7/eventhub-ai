import { useState } from "react";
import { Search, Download, CheckCircle2, Clock, XCircle } from "lucide-react";

const STATUS_META: Record<string, { label: string; className: string; icon: typeof CheckCircle2 }> = {
  checked_in: {
    label: "Checked in",
    className: "bg-accent-soft text-accent",
    icon: CheckCircle2,
  },
  registered: {
    label: "Registered",
    className: "bg-cloud text-ink-soft",
    icon: Clock,
  },
  waitlisted: {
    label: "Waitlisted",
    className: "bg-ink text-paper",
    icon: XCircle,
  },
};

const registrations = [
  { id: "1", name: "Kyani Dan Rai", email: "kyani@iic.edu.np", event: "AI & Robotics Summit", status: "checked_in", date: "Aug 9" },
  { id: "2", name: "Anisha Rai", email: "anisha@iic.edu.np", event: "AI & Robotics Summit", status: "checked_in", date: "Aug 8" },
  { id: "3", name: "Bibek Thapa", email: "bibek@iic.edu.np", event: "Frontend Bootcamp", status: "registered", date: "Aug 10" },
  { id: "4", name: "Sristi Gurung", email: "sristi@iic.edu.np", event: "AI & Robotics Summit", status: "registered", date: "Aug 7" },
  { id: "5", name: "Dawa Sherpa", email: "dawa@iic.edu.np", event: "Career Fair 2026", status: "waitlisted", date: "Aug 6" },
  { id: "6", name: "Prakriti Shah", email: "prakriti@iic.edu.np", event: "Frontend Bootcamp", status: "registered", date: "Aug 9" },
];

const events = ["All events", "AI & Robotics Summit", "Frontend Bootcamp", "Career Fair 2026"];

export default function Registrations() {
  const [query, setQuery] = useState("");
  const [eventFilter, setEventFilter] = useState("All events");

  const filtered = registrations.filter((r) => {
    const matchesQuery =
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.email.toLowerCase().includes(query.toLowerCase());
    const matchesEvent = eventFilter === "All events" || r.event === eventFilter;
    return matchesQuery && matchesEvent;
  });

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
            Registrations
          </h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            {registrations.length} people across all your events.
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-full border border-mist px-5 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-cloud">
          <Download size={15} strokeWidth={2.25} />
          Export
        </button>
      </div>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-full border border-mist bg-paper px-4 py-2.5 sm:max-w-sm">
          <Search size={15} className="text-ink-soft" strokeWidth={2} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by name or email..."
            className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-soft/60"
          />
        </div>
        <select
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
          className="rounded-full border border-mist bg-paper px-4 py-2.5 text-[13.5px] text-ink outline-none"
        >
          {events.map((e) => (
            <option key={e} value={e}>
              {e}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-mist bg-paper">
        <div className="hidden grid-cols-[1.4fr_1.6fr_1.2fr_1fr_100px] gap-4 border-b border-mist px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-ink-soft sm:grid">
          <span>Name</span>
          <span>Email</span>
          <span>Event</span>
          <span>Registered</span>
          <span>Status</span>
        </div>

        <div className="divide-y divide-mist">
          {filtered.map((r) => {
            const meta = STATUS_META[r.status];
            const Icon = meta.icon;
            return (
              <div
                key={r.id}
                className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1.4fr_1.6fr_1.2fr_1fr_100px] sm:items-center sm:gap-4"
              >
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 shrink-0 rounded-full bg-cloud" />
                  <span className="text-[13.5px] font-medium text-ink">
                    {r.name}
                  </span>
                </div>
                <span className="text-[13px] text-ink-soft">{r.email}</span>
                <span className="text-[13px] text-ink-soft">{r.event}</span>
                <span className="text-[13px] text-ink-soft">{r.date}</span>
                <span
                  className={`inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-[11.5px] font-medium ${meta.className}`}
                >
                  <Icon size={12} strokeWidth={2.5} />
                  {meta.label}
                </span>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-[13.5px] text-ink-soft">
              No registrations match your filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
