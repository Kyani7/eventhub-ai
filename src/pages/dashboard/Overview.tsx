import { TrendingUp } from "lucide-react";

const stats = [
  { label: "Total attendees", value: "4,812" },
  { label: "Active events", value: "9" },
  { label: "Certificates issued", value: "1,204" },
  { label: "Avg. attendance rate", value: "91%" },
];

const events = [
  { name: "AI & Robotics Summit", status: "Live", fill: 92 },
  { name: "Frontend Bootcamp", status: "Upcoming", fill: 61 },
  { name: "Career Fair 2026", status: "Draft", fill: 24 },
];

export default function Overview() {
  return (
    <div>
      <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
        Welcome back, Kyani
      </h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        Here's what's happening across your events.
      </p>

      <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl border border-mist bg-paper p-4 shadow-[0_1px_0_0_rgba(10,10,11,0.03)]"
          >
            <p className="text-[11.5px] text-ink-soft">{stat.label}</p>
            <p className="mt-1 font-display text-[20px] font-bold text-ink sm:text-[23px]">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-mist bg-paper p-5 sm:p-6">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-ink">
              Registrations this week
            </p>
            <span className="flex items-center gap-1 text-[12px] font-medium text-accent">
              <TrendingUp size={13} strokeWidth={2.5} />
              +18%
            </span>
          </div>
          <div className="mt-5 flex h-32 items-end gap-2">
            {[30, 45, 38, 60, 52, 75, 68].map((h, i) => (
              <span
                key={i}
                style={{ height: `${h}%` }}
                className="w-full rounded-t-md bg-accent/60"
              />
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-mist bg-paper p-5 sm:p-6">
          <p className="text-[14px] font-semibold text-ink">Your events</p>
          <div className="mt-4 space-y-3">
            {events.map((event) => (
              <div key={event.name}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-ink">{event.name}</span>
                  <span className="text-ink-soft">{event.status}</span>
                </div>
                <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-cloud">
                  <div
                    style={{ width: `${event.fill}%` }}
                    className="h-full rounded-full bg-ink"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}