import { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, MapPin, Users, ArrowRight } from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

type EventItem = {
  id: string;
  name: string;
  category: string;
  date: string;
  time: string;
  venue: string;
  registered: number;
  capacity: number;
  seed: string;
  description: string;
};

const allEvents: EventItem[] = [
  {
    id: "ai-robotics-summit",
    name: "AI & Robotics Summit 2026",
    category: "Conference",
    date: "August 14, 2026",
    time: "9:00 AM – 4:00 PM",
    venue: "Auditorium Hall B",
    registered: 184,
    capacity: 200,
    seed: "event-1",
    description:
      "A full day of talks and hands-on sessions on applied AI and robotics, aimed at students who want practical exposure rather than just theory.",
  },
  {
    id: "frontend-bootcamp",
    name: "Frontend Bootcamp",
    category: "Workshop",
    date: "August 22, 2026",
    time: "10:00 AM – 3:00 PM",
    venue: "Lab 3, CS Block",
    registered: 61,
    capacity: 100,
    seed: "event-2",
    description:
      "Hands-on workshop covering modern frontend fundamentals — component architecture, state management, and responsive design.",
  },
  {
    id: "career-fair-2026",
    name: "Career Fair 2026",
    category: "Fair",
    date: "September 3, 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "Main Grounds",
    registered: 0,
    capacity: 500,
    seed: "event-3",
    description:
      "Meet recruiters from over 30 companies across tech, finance, and consulting. Bring copies of your resume.",
  },
];

const categories = ["All", "Conference", "Workshop", "Fair"] as const;

export default function BrowseEvents() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredEvents = allEvents.filter((event) => {
    const matchesCategory =
      selectedCategory === "All" || event.category === selectedCategory;
    const matchesSearch =
      event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.venue.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <main className="px-5 pb-24 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent">
              Events
            </span>
            <h1 className="mt-4 font-display text-[34px] font-extrabold leading-tight tracking-tight text-ink sm:text-[46px]">
              Explore campus events
            </h1>
            <p className="mt-2 text-[15.5px] text-ink-soft">
              Find upcoming conferences, workshops, and career fairs hosted on Gatherly.
            </p>
          </div>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 rounded-2xl border border-mist/60 bg-cloud/40 px-4 py-2.5 sm:w-80">
              <Search size={16} className="text-ink-soft" strokeWidth={2} />
              <input
                type="text"
                placeholder="Search events, venues..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-soft/60"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-full px-4 py-2 text-[13px] font-medium transition-all duration-200 ${
                    selectedCategory === cat
                      ? "bg-ink text-paper shadow-sm"
                      : "border border-mist/50 bg-paper text-ink-soft hover:bg-cloud hover:text-ink"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => {
              const spotsLeft = event.capacity - event.registered;
              return (
                <div
                  key={event.id}
                  className="group flex flex-col overflow-hidden rounded-[28px] border border-mist/60 bg-paper p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-mist hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-cloud">
                    <img
                      src={`https://picsum.photos/seed/${event.seed}/600/400`}
                      alt={event.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  <div className="mt-4 flex-1">
                    <span className="rounded-full bg-cloud px-3 py-1 text-[11px] font-semibold text-ink-soft">
                      {event.category}
                    </span>
                    <h3 className="mt-2.5 font-display text-[19px] font-bold text-ink group-hover:text-accent transition-colors">
                      {event.name}
                    </h3>
                    <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-ink-soft">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-2 border-t border-mist/40 pt-4 text-[12.5px] text-ink-soft">
                    <div className="flex items-center gap-2">
                      <Calendar size={14} className="text-accent" strokeWidth={2} />
                      <span>{event.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin size={14} className="text-accent" strokeWidth={2} />
                      <span>{event.venue}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={14} className="text-accent" strokeWidth={2} />
                      <span>{spotsLeft} spots available</span>
                    </div>
                  </div>

                  <Link
                    to={`/events/${event.id}`}
                    className="mt-5 flex items-center justify-center gap-2 rounded-2xl bg-cloud px-4 py-3 text-[13.5px] font-semibold text-ink transition-colors group-hover:bg-ink group-hover:text-paper"
                  >
                    View details &amp; register
                    <ArrowRight size={14} strokeWidth={2.5} />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
