import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// A tiny deterministic "QR-like" grid — purely decorative, no external asset needed.
function QrGrid() {
  const cells = [
    1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1,
    0, 1, 1, 1, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1,
    1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1,
  ];
  return (
    <div className="grid h-16 w-16 grid-cols-8 gap-[2px] rounded-md bg-ink p-1.5 sm:h-[72px] sm:w-[72px]">
      {cells.map((v, i) => (
        <span
          key={i}
          className={v ? "rounded-[1px] bg-paper" : "rounded-[1px] bg-transparent"}
        />
      ))}
    </div>
  );
}

export default function TicketCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -3 }}
      animate={{ opacity: 1, y: 0, rotate: -3 }}
      transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] as const }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px]"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative rounded-[28px] border border-mist bg-paper/90 p-5 shadow-[0_30px_60px_-15px_rgba(10,10,11,0.18)] backdrop-blur-xl sm:p-6"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              Admit one
            </p>
            <h3 className="mt-1 font-display text-[19px] font-bold leading-tight text-ink sm:text-[21px]">
              AI & Robotics
              <br />
              Summit 2026
            </h3>
          </div>
          <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft">
            <CheckCircle2 size={16} className="text-accent" strokeWidth={2.5} />
          </span>
        </div>

        <div className="my-5 flex items-center gap-3">
          <div className="h-8 w-8 shrink-0 rounded-full bg-cloud ring-2 ring-paper" />
          <div>
            <p className="text-[13px] font-semibold text-ink">Rai, Kyani D.</p>
            <p className="text-[12px] text-ink-soft">Student . Seat GA-014</p>
          </div>
        </div>

        <div className="relative flex items-center justify-between rounded-2xl bg-cloud/70 p-3">
          <div className="pl-1">
            <p className="text-[11px] font-medium uppercase tracking-wide text-ink-soft">
              Checked in
            </p>
            <p className="font-display text-[15px] font-bold text-ink">09:41 AM</p>
          </div>
          <QrGrid />

          {/* Ticket notch */}
          <span className="absolute -left-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-paper" />
          <span className="absolute -right-[26px] top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-paper" />
        </div>
      </motion.div>

      {/* Ambient glow */}
      <div className="pointer-events-none absolute -inset-10 -z-10 rounded-full bg-accent/10 blur-3xl" />
    </motion.div>
  );
}
