import { useState } from "react";
import { Award, Download, CheckCircle2, Loader2 } from "lucide-react";

type Recipient = {
  id: string;
  name: string;
  status: "pending" | "generated";
};

const seedRecipients: Recipient[] = [
  { id: "GA-014", name: "Kyani Dan Rai", status: "generated" },
  { id: "GA-015", name: "Anisha Rai", status: "generated" },
  { id: "GA-016", name: "Bibek Thapa", status: "pending" },
];

const events = ["AI & Robotics Summit", "Frontend Bootcamp", "Career Fair 2026"];

export default function Certificates() {
  const [event, setEvent] = useState(events[0]);
  const [recipients, setRecipients] = useState(seedRecipients);
  const [generating, setGenerating] = useState(false);

  const pendingCount = recipients.filter((r) => r.status === "pending").length;

  async function generateAll() {
    if (pendingCount === 0) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1400));
    setRecipients((prev) => prev.map((r) => ({ ...r, status: "generated" })));
    setGenerating(false);
  }

  return (
    <div>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
            Certificates
          </h1>
          <p className="mt-1 text-[14px] text-ink-soft">
            Generate and issue certificates for checked-in attendees.
          </p>
        </div>
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
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-mist bg-paper p-6">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-semibold text-ink">
              {recipients.length} eligible attendees
            </p>
            <button
              onClick={generateAll}
              disabled={generating || pendingCount === 0}
              className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-[12.5px] font-semibold text-paper disabled:opacity-50"
            >
              {generating ? (
                <Loader2 size={13} className="animate-spin" />
              ) : (
                <Award size={13} strokeWidth={2.5} />
              )}
              {pendingCount === 0 ? "All generated" : `Generate ${pendingCount} pending`}
            </button>
          </div>

          <div className="mt-4 divide-y divide-mist">
            {recipients.map((r) => (
              <div key={r.id} className="flex items-center justify-between py-3">
                <div>
                  <p className="text-[13.5px] font-medium text-ink">{r.name}</p>
                  <p className="text-[11.5px] text-ink-soft">{r.id}</p>
                </div>
                {r.status === "generated" ? (
                  <button className="flex items-center gap-1.5 rounded-full border border-mist px-3 py-1.5 text-[12px] font-medium text-ink transition-colors hover:bg-cloud">
                    <Download size={12} strokeWidth={2.25} />
                    Download
                  </button>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cloud px-2.5 py-1 text-[11.5px] font-medium text-ink-soft">
                    Pending
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl bg-cloud/50 px-4 py-3 text-[12px] text-ink-soft">
            PDF generation and Cloudinary storage aren't wired to a backend
            yet — "Generate" here simulates the state change so the flow can
            be demoed end to end.
          </div>
        </div>

        <div className="flex items-start justify-center rounded-3xl border border-mist bg-cloud/30 p-8">
          <div className="w-full max-w-sm rounded-3xl border border-mist bg-paper p-8 shadow-md">
            <div className="flex items-center justify-between">
              <Award size={22} className="text-accent" strokeWidth={1.75} />
              <CheckCircle2 size={16} className="text-accent" strokeWidth={2.5} />
            </div>
            <p className="mt-5 font-display text-[11px] font-bold uppercase tracking-wide text-accent">
              Certificate of participation
            </p>
            <p className="mt-3 font-display text-[22px] font-bold text-ink">
              {recipients[0]?.name ?? "Attendee Name"}
            </p>
            <p className="mt-1.5 text-[13.5px] text-ink-soft">
              has successfully participated in
            </p>
            <p className="mt-1 text-[14.5px] font-semibold text-ink">
              {event}
            </p>
            <div className="mt-6 flex items-center justify-between border-t border-mist pt-5">
              <div>
                <p className="text-[11px] text-ink-soft">Organizer signature</p>
                <p className="mt-1 font-display text-[13px] italic text-ink">
                  Gatherly
                </p>
              </div>
              <div className="h-10 w-10 rounded-lg bg-cloud" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}