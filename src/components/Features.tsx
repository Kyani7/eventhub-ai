import { motion, type Variants } from "framer-motion";
import {
  Sparkles,
  QrCode,
  Image as ImageIcon,
  FileCheck2,
  BarChart3,
  Wand2,
} from "lucide-react";

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const reveal: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: EASE_OUT },
  }),
};

const PLAN_STEPS = ["Schedule", "Budget", "Volunteers", "Promotion"];

const CHIPS = ["Smart recommendations", "Live notifications", "AI email writer"];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {/* Section header */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          custom={0}
          className="max-w-xl"
        >
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            What it does
          </p>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
            Built for how events
            <br />
            actually run.
          </h2>
          <p className="mt-4 text-[15.5px] leading-relaxed text-ink-soft sm:text-[16.5px]">
            Not another form builder. EventHub AI plans the logistics,
            verifies who's actually in the room, and does the paperwork
            after.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-6">
          {/* AI Event Planner — featured, large */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={1}
            className="group relative overflow-hidden rounded-[28px] border border-mist bg-cloud/60 p-7 sm:col-span-6 sm:p-9 lg:col-span-4"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
              <Sparkles size={16} className="text-paper" strokeWidth={2.25} />
            </div>
            <h3 className="mt-5 font-display text-[21px] font-bold text-ink sm:text-[23px]">
              AI Event Planner
            </h3>
            <p className="mt-2 max-w-sm text-[14.5px] leading-relaxed text-ink-soft">
              Describe the event in one line. Get a schedule, budget,
              equipment list, and a risk assessment — ready to edit, not just
              read.
            </p>

            {/* Mock chat → checklist */}
            <div className="mt-7 rounded-2xl border border-mist bg-paper p-4 shadow-sm sm:p-5">
              <p className="rounded-xl bg-cloud px-3.5 py-2.5 text-[13px] text-ink-soft">
                "We need a one-day AI workshop for 200 students."
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {PLAN_STEPS.map((step, i) => (
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    className="flex items-center gap-1.5 rounded-lg bg-accent-soft px-2.5 py-2 text-[12px] font-medium text-accent"
                  >
                    <FileCheck2 size={13} strokeWidth={2.5} />
                    {step}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Live QR Attendance */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={2}
            className="relative overflow-hidden rounded-[28px] border border-mist bg-ink p-7 text-paper sm:col-span-6 sm:p-9 lg:col-span-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-paper/10">
              <QrCode size={16} className="text-paper" strokeWidth={2.25} />
            </div>
            <h3 className="mt-5 font-display text-[21px] font-bold sm:text-[23px]">
              Live QR attendance
            </h3>
            <p className="mt-2 text-[14.5px] leading-relaxed text-paper/70">
              Every attendee gets a unique code. Organizers scan, attendance
              updates in real time.
            </p>
            <div className="mt-7 flex items-end justify-between rounded-2xl bg-paper/[0.06] p-4">
              <div>
                <p className="text-[11px] uppercase tracking-wide text-paper/50">
                  Checked in
                </p>
                <p className="font-display text-[26px] font-bold">184 / 200</p>
              </div>
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-accent" />
            </div>
          </motion.div>

          {/* Poster & Copy Generator */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={3}
            className="rounded-[28px] border border-mist bg-cloud/60 p-7 sm:col-span-3 lg:col-span-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
              <ImageIcon size={16} className="text-paper" strokeWidth={2.25} />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-ink">
              Poster &amp; caption generator
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              Headline, Instagram caption, and invite email — from your event
              description.
            </p>
          </motion.div>

          {/* Feedback Analyzer */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={4}
            className="rounded-[28px] border border-mist bg-cloud/60 p-7 sm:col-span-3 lg:col-span-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
              <BarChart3 size={16} className="text-paper" strokeWidth={2.25} />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-ink">
              Feedback analyzer
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              Hundreds of comments in, one summary out — themes, sentiment,
              suggestions.
            </p>
            <div className="mt-4 flex items-end gap-1.5">
              {[40, 70, 55, 90, 65].map((h, i) => (
                <motion.span
                  key={i}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: EASE_OUT }}
                  style={{ maxHeight: 40 }}
                  className="w-full rounded-sm bg-accent/70"
                />
              ))}
            </div>
          </motion.div>

          {/* Certificates */}
          <motion.div
            variants={reveal}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            custom={5}
            className="rounded-[28px] border border-mist bg-cloud/60 p-7 sm:col-span-6 lg:col-span-2"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-ink">
              <Wand2 size={16} className="text-paper" strokeWidth={2.25} />
            </div>
            <h3 className="mt-5 font-display text-[18px] font-bold text-ink">
              Certificates, auto-signed
            </h3>
            <p className="mt-2 text-[13.5px] leading-relaxed text-ink-soft">
              PDF certificates with name, event, organizer signature, and a QR
              that verifies it's real.
            </p>
          </motion.div>
        </div>

        {/* Trailing chips for the rest of the AI feature list */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          custom={6}
          className="mt-6 flex flex-wrap items-center gap-2"
        >
          <span className="text-[13px] text-ink-soft">Also included:</span>
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className="rounded-full border border-mist px-3 py-1.5 text-[12.5px] font-medium text-ink-soft"
            >
              {chip}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}