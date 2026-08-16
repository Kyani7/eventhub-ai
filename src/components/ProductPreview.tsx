import { motion } from "framer-motion";
import {
  LayoutGrid,
  CalendarDays,
  Users,
  Settings,
  TrendingUp,
} from "lucide-react";

const navItems = [
  { icon: LayoutGrid, label: "Overview", active: true },
  { icon: CalendarDays, label: "Events" },
  { icon: Users, label: "Attendees" },
  { icon: Settings, label: "Settings" },
];

const events = [
  { name: "AI & Robotics Summit", status: "Live", fill: 92 },
  { name: "Frontend Bootcamp", status: "Upcoming", fill: 61 },
  { name: "Career Fair 2026", status: "Draft", fill: 24 },
];

export default function ProductPreview() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-xl text-center">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Inside the dashboard
          </p>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
            One place, every event
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="relative mx-auto mt-14 max-w-5xl"
        >
          <div className="pointer-events-none absolute -inset-16 -z-10 rounded-full bg-accent/5 blur-3xl" />

          <div className="overflow-hidden rounded-2xl border border-mist bg-paper shadow-[0_40px_80px_-24px_rgba(10,10,11,0.2)] sm:rounded-[24px]">
            <div className="flex items-center gap-2 border-b border-mist bg-cloud/60 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-mist" />
              <span className="h-2.5 w-2.5 rounded-full bg-mist" />
              <span className="h-2.5 w-2.5 rounded-full bg-mist" />
              <span className="ml-3 hidden rounded-md bg-paper px-3 py-1 text-[11px] text-ink-soft sm:block">
                Gatherly/dashboard
              </span>
            </div>

            <div className="flex">
              <div className="hidden w-44 shrink-0 border-r border-mist p-4 sm:block">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.label}
                      className={`mb-1 flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-[13px] font-medium ${
                        item.active
                          ? "bg-ink text-paper"
                          : "text-ink-soft"
                      }`}
                    >
                      <Icon size={15} strokeWidth={2} />
                      {item.label}
                    </div>
                  );
                })}
              </div>

              <div className="flex-1 p-5 sm:p-7">
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                  {[
                    { label: "Total attendees", value: "4,812" },
                    { label: "Active events", value: "9" },
                    { label: "Certificates issued", value: "1,204" },
                  ].map((stat) => (
                    <div
                      key={stat.label}
                      className="rounded-xl border border-mist bg-cloud/40 p-4"
                    >
                      <p className="text-[11px] text-ink-soft">{stat.label}</p>
                      <p className="mt-1 font-display text-[19px] font-bold text-ink sm:text-[22px]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-mist p-4 sm:p-5">
                  <div className="flex items-center justify-between">
                    <p className="text-[13px] font-semibold text-ink">
                      Registrations this week
                    </p>
                    <span className="flex items-center gap-1 text-[12px] font-medium text-accent">
                      <TrendingUp size={13} strokeWidth={2.5} />
                      +18%
                    </span>
                  </div>
                  <div className="mt-4 flex h-16 items-end gap-1.5 sm:h-20">
                    {[30, 45, 38, 60, 52, 75, 68].map((h, i) => (
                      <span
                        key={i}
                        style={{ height: `${h}%` }}
                        className="w-full rounded-t-sm bg-accent/60"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-5 space-y-2">
                  {events.map((event) => (
                    <div
                      key={event.name}
                      className="flex items-center justify-between rounded-xl border border-mist px-4 py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-cloud" />
                        <div>
                          <p className="text-[13px] font-medium text-ink">
                            {event.name}
                          </p>
                          <p className="text-[11.5px] text-ink-soft">
                            {event.status}
                          </p>
                        </div>
                      </div>
                      <div className="hidden h-1.5 w-24 overflow-hidden rounded-full bg-cloud sm:block">
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
        </motion.div>

        <p className="mt-6 text-center text-[12.5px] text-ink-soft">
          Preview of the organizer dashboard, in development.
        </p>
      </div>
    </section>
  );
}