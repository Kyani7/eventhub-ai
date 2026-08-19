import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Users,
  ArrowLeft,
  Loader2,
  CheckCircle2,
  Download,
} from "lucide-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import QrImage from "../components/QrImage";

const events: Record<
  string,
  {
    name: string;
    category: string;
    date: string;
    time: string;
    venue: string;
    registered: number;
    capacity: number;
    seed: string;
    description: string;
  }
> = {
  "ai-robotics-summit": {
    name: "AI & Robotics Summit 2026",
    category: "Conference",
    date: "August 14, 2026",
    time: "9:00 AM – 4:00 PM",
    venue: "Auditorium Hall B",
    registered: 184,
    capacity: 200,
    seed: "event-1",
    description:
      "A full day of talks and hands-on sessions on applied AI and robotics, aimed at students who want practical exposure rather than just theory. Includes a robotics demo floor and a closing panel with industry guests.",
  },
  "frontend-bootcamp": {
    name: "Frontend Bootcamp",
    category: "Workshop",
    date: "August 22, 2026",
    time: "10:00 AM – 3:00 PM",
    venue: "Lab 3, CS Block",
    registered: 61,
    capacity: 100,
    seed: "event-2",
    description:
      "Hands-on workshop covering modern frontend fundamentals — component architecture, state management, and responsive design. Bring your own laptop.",
  },
  "career-fair-2026": {
    name: "Career Fair 2026",
    category: "Fair",
    date: "September 3, 2026",
    time: "10:00 AM – 5:00 PM",
    venue: "Main Grounds",
    registered: 0,
    capacity: 500,
    seed: "event-3",
    description:
      "Meet recruiters from over 30 companies across tech, finance, and consulting. Bring copies of your resume — some booths will conduct on-the-spot interviews.",
  },
};

export default function EventDetails() {
  const { id } = useParams();
  const event = id ? events[id] : undefined;

  const [registering, setRegistering] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [ticketId] = useState(
    `GA-${Math.floor(100 + Math.random() * 900)}`
  );

  if (!event) {
    return (
      <div className="min-h-screen bg-paper">
        <Navbar />
        <div className="flex min-h-[60vh] flex-col items-center justify-center px-5 text-center">
          <p className="font-display text-[22px] font-bold text-ink">
            Event not found
          </p>
          <Link
            to="/events"
            className="mt-4 text-[13.5px] font-medium text-accent"
          >
            Back to all events
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const spotsLeft = event.capacity - event.registered;

  async function handleRegister() {
    setRegistering(true);
    await new Promise((r) => setTimeout(r, 1100));
    setRegistering(false);
    setRegistered(true);
  }

  return (
    <div className="min-h-screen bg-paper">
      <Navbar />

      <section className="px-5 pb-20 pt-32 sm:px-8 sm:pt-40">
        <div className="mx-auto max-w-5xl">
          <Link
            to="/events"
            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            All events
          </Link>

          <div className="mt-6 grid grid-cols-1 gap-10 lg:grid-cols-[1.4fr_1fr]">
            <div>
              <div className="aspect-[16/9] overflow-hidden rounded-[28px]">
                <img
                  src={`https://picsum.photos/seed/${event.seed}/900/600`}
                  alt={event.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <span className="mt-6 inline-block rounded-full bg-cloud px-3 py-1 text-[11.5px] font-medium text-ink-soft">
                {event.category}
              </span>
              <h1 className="mt-3 font-display text-[30px] font-extrabold leading-tight tracking-tight text-ink sm:text-[36px]">
                {event.name}
              </h1>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="flex items-center gap-2.5 rounded-2xl border border-mist p-4">
                  <Calendar size={16} className="text-accent" strokeWidth={2} />
                  <div>
                    <p className="text-[12.5px] font-medium text-ink">{event.date}</p>
                    <p className="text-[11.5px] text-ink-soft">{event.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-mist p-4">
                  <MapPin size={16} className="text-accent" strokeWidth={2} />
                  <p className="text-[12.5px] font-medium text-ink">{event.venue}</p>
                </div>
                <div className="flex items-center gap-2.5 rounded-2xl border border-mist p-4">
                  <Users size={16} className="text-accent" strokeWidth={2} />
                  <p className="text-[12.5px] font-medium text-ink">
                    {spotsLeft} spots left
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-[14px] font-semibold text-ink">About this event</p>
                <p className="mt-2 max-w-xl text-[14.5px] leading-relaxed text-ink-soft">
                  {event.description}
                </p>
              </div>
            </div>

            <div>
              <div className="sticky top-32 rounded-[28px] border border-mist bg-cloud/40 p-6">
                <AnimatePresence mode="wait">
                  {registered ? (
                    <motion.div
                      key="ticket"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <div className="flex items-center gap-2 text-accent">
                        <CheckCircle2 size={18} strokeWidth={2.25} />
                        <p className="text-[13.5px] font-semibold">
                          You're registered
                        </p>
                      </div>

                      <div className="mt-5 rounded-2xl border border-mist bg-paper p-5">
                        <p className="font-display text-[11px] font-bold uppercase tracking-wide text-accent">
                          Admit one
                        </p>
                        <p className="mt-1 font-display text-[16px] font-bold text-ink">
                          {event.name}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-mist pt-4">
                          <div>
                            <p className="text-[11px] text-ink-soft">Ticket ID</p>
                            <p className="text-[13px] font-semibold text-ink">
                              {ticketId}
                            </p>
                          </div>
                          <QrImage
                            value={`EVENTHUB|${id}|${ticketId}`}
                            size={52}
                          />
                        </div>
                      </div>

                      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-full border border-mist px-5 py-3 text-[13.5px] font-semibold text-ink transition-colors hover:bg-cloud">
                        <Download size={14} strokeWidth={2.25} />
                        Download ticket
                      </button>
                      <p className="mt-3 text-center text-[11.5px] text-ink-soft">
                        PDF export isn't wired to a backend yet.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="register"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -12 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[13px] font-medium text-ink-soft">
                        Registration
                      </p>
                      <p className="mt-1 font-display text-[26px] font-bold text-ink">
                        Free
                      </p>

                      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-mist">
                        <div
                          style={{
                            width: `${(event.registered / event.capacity) * 100}%`,
                          }}
                          className="h-full rounded-full bg-ink"
                        />
                      </div>
                      <p className="mt-1.5 text-[12px] text-ink-soft">
                        {event.registered} of {event.capacity} spots filled
                      </p>

                      <button
                        onClick={handleRegister}
                        disabled={registering || spotsLeft === 0}
                        className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-60"
                      >
                        {registering ? (
                          <Loader2 size={16} className="animate-spin" />
                        ) : spotsLeft === 0 ? (
                          "Join waitlist"
                        ) : (
                          "Register now"
                        )}
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}