import { useState } from "react";
import { Megaphone, Send, Clock } from "lucide-react";

type Announcement = {
  id: string;
  event: string;
  message: string;
  time: string;
};

const seed: Announcement[] = [
  {
    id: "1",
    event: "AI & Robotics Summit",
    message: "Venue changed to Auditorium Hall B due to higher registrations than expected. Same time, Friday 9 AM.",
    time: "2 hours ago",
  },
  {
    id: "2",
    event: "AI & Robotics Summit",
    message: "Lunch will be provided for all attendees who check in before 10 AM.",
    time: "1 day ago",
  },
  {
    id: "3",
    event: "Frontend Bootcamp",
    message: "Bring your own laptop — a limited number of loaner laptops will be available on request.",
    time: "3 days ago",
  },
];

const events = ["AI & Robotics Summit", "Frontend Bootcamp", "Career Fair 2026"];

export default function Announcements() {
  const [announcements, setAnnouncements] = useState(seed);
  const [event, setEvent] = useState(events[0]);
  const [message, setMessage] = useState("");
  const [sending, setSending] = useState(false);

  async function handleSend() {
    if (!message.trim()) return;
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setAnnouncements((prev) => [
      { id: crypto.randomUUID(), event, message: message.trim(), time: "Just now" },
      ...prev,
    ]);
    setMessage("");
    setSending(false);
  }

  return (
    <div>
      <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
        Announcements
      </h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        Push an update to everyone registered for an event.
      </p>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="rounded-3xl border border-mist bg-paper p-6">
          <p className="text-[13px] font-semibold text-ink">New announcement</p>

          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="mt-3 w-full rounded-2xl border border-mist bg-paper px-4 py-2.5 text-[13.5px] text-ink outline-none"
          >
            {events.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>

          <textarea
            rows={5}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What do registered attendees need to know?"
            className="mt-3 w-full rounded-2xl border border-mist bg-paper px-4 py-3 text-[14px] text-ink outline-none placeholder:text-ink-soft/50 focus:border-ink"
          />

          <button
            onClick={handleSend}
            disabled={sending || !message.trim()}
            className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-[13.5px] font-semibold text-paper disabled:opacity-50"
          >
            <Send size={14} strokeWidth={2.5} />
            {sending ? "Sending..." : "Send to registered attendees"}
          </button>

          <p className="mt-3 text-[12px] text-ink-soft">
            Email and in-app push aren't wired to a backend yet — this adds
            to the feed instantly so the flow can be demoed.
          </p>
        </div>

        <div>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div
                key={a.id}
                className="rounded-2xl border border-mist bg-paper p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
                      <Megaphone size={14} className="text-accent" strokeWidth={2.25} />
                    </span>
                    <div>
                      <p className="text-[13px] font-semibold text-ink">
                        {a.event}
                      </p>
                      <p className="flex items-center gap-1 text-[11.5px] text-ink-soft">
                        <Clock size={11} strokeWidth={2} />
                        {a.time}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="mt-3 text-[13.5px] leading-relaxed text-ink-soft">
                  {a.message}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}