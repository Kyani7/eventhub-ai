import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Plus, MoreHorizontal, Users } from "lucide-react";

const STATUS_STYLES: Record<string, string> = {
  Live: "bg-accent-soft text-accent",
  Draft: "bg-cloud text-ink-soft",
  Upcoming: "bg-ink text-paper",
  Ended: "bg-cloud text-ink-soft",
};

const events = [
  {
    id: "1",
    name: "AI & Robotics Summit 2026",
    category: "Conference",
    date: "Aug 14, 2026",
    status: "Live",
    registered: 184,
    capacity: 200,
  },
  {
    id: "2",
    name: "Frontend Bootcamp",
    category: "Workshop",
    date: "Aug 22, 2026",
    status: "Upcoming",
    registered: 61,
    capacity: 100,
  },
  {
    id: "3",
    name: "Career Fair 2026",
    category: "Fair",
    date: "Sep 3, 2026",
    status: "Draft",
    registered: 0,
    capacity: 500,
  },
  {
    id: "4",
    name: "Design Systems Talk",
    category: "Talk",
    date: "Jul 19, 2026",
    status: "Ended",
    registered: 92,
    capacity: 90,
  },
];

export default function Events() {
  const [query, setQuery] = useState("");

  const filtered = events.filter((e) =>
    e.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
            Events
          </h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Everything you're running, in one list.
          </p>
        </div>
        <Link
          to="/dashboard/events/new"
          className="inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
        >
          <Plus size={16} strokeWidth={2.5} />
          New event
        </Link>
      </div>

      <div className="mt-6 flex items-center gap-2 rounded-full border border-mist bg-paper px-4 py-2.5 sm:max-w-sm">
        <Search size={15} className="text-ink-soft" strokeWidth={2} />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search events..."
          className="w-full bg-transparent text-[13.5px] text-ink outline-none placeholder:text-ink-soft/60"
        />
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-mist bg-paper">
        <div className="hidden grid-cols-[1.8fr_1fr_1fr_1fr_1fr_40px] gap-4 border-b border-mist px-5 py-3 text-[12px] font-medium uppercase tracking-wide text-ink-soft sm:grid">
          <span>Event</span>
          <span>Category</span>
          <span>Date</span>
          <span>Status</span>
          <span>Registered</span>
          <span></span>
        </div>

        <div className="divide-y divide-mist">
          {filtered.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-1 gap-2 px-5 py-4 sm:grid-cols-[1.8fr_1fr_1fr_1fr_1fr_40px] sm:items-center sm:gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 shrink-0 rounded-lg bg-cloud" />
                <span className="text-[13.5px] font-medium text-ink">
                  {event.name}
                </span>
              </div>
              <span className="text-[13px] text-ink-soft">{event.category}</span>
              <span className="text-[13px] text-ink-soft">{event.date}</span>
              <span>
                <span
                  className={`inline-flex rounded-full px-2.5 py-1 text-[11.5px] font-medium ${STATUS_STYLES[event.status]}`}
                >
                  {event.status}
                </span>
              </span>
              <span className="flex items-center gap-1.5 text-[13px] text-ink-soft">
                <Users size={13} strokeWidth={2} />
                {event.registered}/{event.capacity}
              </span>
              <button
                aria-label="More options"
                className="flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-cloud hover:text-ink sm:justify-self-end"
              >
                <MoreHorizontal size={16} />
              </button>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="px-5 py-12 text-center text-[13.5px] text-ink-soft">
              No events match "{query}".
            </div>
          )}
        </div>
      </div>
    </div>
  );
}