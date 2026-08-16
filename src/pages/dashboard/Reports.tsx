import { useState } from "react";
import { Download, FileSpreadsheet, FileText, TrendingUp, TrendingDown } from "lucide-react";

const events = ["All events", "AI & Robotics Summit", "Frontend Bootcamp", "Career Fair 2026"];

const summary = [
  { label: "Total registrations", value: "612", change: "+12%", up: true },
  { label: "Avg. attendance rate", value: "87%", change: "+4%", up: true },
  { label: "Certificates issued", value: "1,204", change: "+9%", up: true },
  { label: "No-show rate", value: "13%", change: "-3%", up: false },
];

const weeklyTrend = [40, 55, 48, 70, 62, 85, 78];

const categoryBreakdown = [
  { label: "Conference", value: 38, count: 232 },
  { label: "Workshop", value: 27, count: 165 },
  { label: "Fair", value: 20, count: 122 },
  { label: "Talk", value: 15, count: 93 },
];

export default function Reports() {
  const [event, setEvent] = useState(events[0]);

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
            Reports
          </h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            How your events are actually performing.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={event}
            onChange={(e) => setEvent(e.target.value)}
            className="rounded-full border border-mist bg-paper px-4 py-2.5 text-[13.5px] text-ink outline-none"
          >
            {events.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
          <button className="flex items-center gap-1.5 rounded-full border border-mist px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-cloud">
            <FileText size={14} strokeWidth={2.25} />
            PDF
          </button>
          <button className="flex items-center gap-1.5 rounded-full border border-mist px-4 py-2.5 text-[13px] font-medium text-ink transition-colors hover:bg-cloud">
            <FileSpreadsheet size={14} strokeWidth={2.25} />
            Excel
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {summary.map((s) => (
          <div
            key={s.label}
            className="rounded-2xl border border-mist bg-paper p-4"
          >
            <p className="text-[11.5px] text-ink-soft">{s.label}</p>
            <div className="mt-1 flex items-end justify-between">
              <p className="font-display text-[20px] font-bold text-ink sm:text-[23px]">
                {s.value}
              </p>
              <span
                className={`flex items-center gap-0.5 text-[11.5px] font-medium ${
                  s.up ? "text-accent" : "text-ink-soft"
                }`}
              >
                {s.up ? (
                  <TrendingUp size={11} strokeWidth={2.5} />
                ) : (
                  <TrendingDown size={11} strokeWidth={2.5} />
                )}
                {s.change}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="rounded-2xl border border-mist bg-paper p-5 sm:p-6">
          <p className="text-[14px] font-semibold text-ink">
            Registrations, last 7 days
          </p>
          <div className="mt-6 flex h-40 items-end gap-3">
            {weeklyTrend.map((h, i) => (
              <div key={i} className="flex flex-1 flex-col items-center gap-2">
                <div
                  style={{ height: `${h}%` }}
                  className="w-full rounded-t-lg bg-accent/60"
                />
                <span className="text-[10.5px] text-ink-soft">
                  {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-2xl border border-mist bg-paper p-5 sm:p-6">
          <p className="text-[14px] font-semibold text-ink">By category</p>
          <div className="mt-5 space-y-4">
            {categoryBreakdown.map((c) => (
              <div key={c.label}>
                <div className="flex items-center justify-between text-[13px]">
                  <span className="font-medium text-ink">{c.label}</span>
                  <span className="text-ink-soft">{c.count}</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-cloud">
                  <div
                    style={{ width: `${c.value}%` }}
                    className="h-full rounded-full bg-ink"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-2 rounded-xl bg-cloud/50 px-4 py-3 text-[12px] text-ink-soft">
        <Download size={13} strokeWidth={2} />
        PDF and Excel export aren't wired to a backend yet — buttons are
        placeholders for the real ExcelJS/PDFKit exports.
      </div>
    </div>
  );
}