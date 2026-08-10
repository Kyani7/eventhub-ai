import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquareText,
  Megaphone,
  ScanLine,
  Award,
  FileCheck2,
  Send,
  CheckCircle2,
} from "lucide-react";

const steps = [
  {
    icon: MessageSquareText,
    title: "Describe the event",
    text: "Organizer types one line — audience, size, date. The AI turns it into a full schedule, budget, and checklist.",
    tag: "Organizer",
  },
  {
    icon: Megaphone,
    title: "Publish and promote",
    text: "Poster copy, an Instagram caption, and an invite email are generated automatically. One click puts it live.",
    tag: "AI",
  },
  {
    icon: ScanLine,
    title: "Students check in",
    text: "Each registration gets a unique QR ticket. Volunteers scan at the door, attendance updates in real time.",
    tag: "Volunteer",
  },
  {
    icon: Award,
    title: "Certificates go out",
    text: "Once the event closes, signed PDF certificates with a QR verification code are issued to everyone who attended.",
    tag: "Automatic",
  },
];

function StepVisual({ index }: { index: number }) {
  if (index === 0) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-mist bg-paper p-7 shadow-md">
        <p className="rounded-2xl bg-cloud px-4 py-3.5 text-[14.5px] text-ink-soft">
          "One-day AI workshop for 200 students, next Friday."
        </p>
        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {["Schedule", "Budget", "Volunteers", "Promotion"].map((s) => (
            <div
              key={s}
              className="flex items-center gap-2 rounded-xl bg-accent-soft px-3.5 py-3 text-[13.5px] font-medium text-accent"
            >
              <FileCheck2 size={15} strokeWidth={2.5} />
              {s}
            </div>
          ))}
        </div>
      </div>
    );
  }
  if (index === 1) {
    return (
      <div className="w-full max-w-md overflow-hidden rounded-3xl border border-mist bg-paper shadow-md">
        <div className="flex h-44 items-center justify-center bg-gradient-to-br from-ink to-ink/70">
          <p className="px-8 text-center font-display text-[20px] font-bold text-paper">
            AI &amp; Robotics Summit — this Friday
          </p>
        </div>
        <div className="flex items-center justify-between p-5">
          <p className="text-[14px] text-ink-soft">Instagram caption, ready</p>
          <span className="flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-[13px] font-semibold text-paper">
            <Send size={13} strokeWidth={2.5} />
            Post
          </span>
        </div>
      </div>
    );
  }
  if (index === 2) {
    return (
      <div className="w-full max-w-md rounded-3xl border border-ink bg-ink p-7 text-paper shadow-md">
        <div className="flex items-center justify-between">
          <p className="text-[12px] uppercase tracking-wide text-paper/50">
            Scanning
          </p>
          <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent" />
        </div>
        <p className="mt-3 font-display text-[34px] font-bold">184 / 200</p>
        <div className="mt-5 flex items-center gap-2.5 rounded-2xl bg-paper/[0.07] px-4 py-3.5">
          <CheckCircle2 size={19} className="text-accent" strokeWidth={2.5} />
          <p className="text-[14px]">Rai, Kyani D. — checked in</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full max-w-md rounded-3xl border border-mist bg-paper p-8 shadow-md">
      <p className="font-display text-[12px] font-bold uppercase tracking-wide text-accent">
        Certificate of participation
      </p>
      <p className="mt-4 font-display text-[24px] font-bold text-ink">
        Kyani Dan Rai
      </p>
      <p className="mt-1.5 text-[14px] text-ink-soft">
        AI &amp; Robotics Summit 2026
      </p>
      <div className="mt-6 flex items-center justify-between border-t border-mist pt-5">
        <p className="text-[12.5px] text-ink-soft">Verified via QR</p>
        <div className="h-10 w-10 rounded-lg bg-cloud" />
      </div>
    </div>
  );
}

function useActiveStep(count: number) {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const [active, setActive] = useState(0);
  const manualLock = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (manualLock.current) return;
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            setActive(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0 }
    );

    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, [count]);

  function select(i: number) {
    manualLock.current = true;
    setActive(i);
    refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
    window.setTimeout(() => {
      manualLock.current = false;
    }, 900);
  }

  return { refs, active, select };
}

export default function HowItWorks() {
  const { refs, active, select } = useActiveStep(steps.length);

  return (
    <section id="how-it-works" className="border-t border-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            How it works
          </p>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
            From idea to certificate,
            <br />
            four steps.
          </h2>
        </div>

        <div className="mt-16 lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="relative">
            <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-mist sm:block" />

            <div className="flex flex-col gap-10 sm:gap-14">
              {steps.map((step, i) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    ref={(el) => {
                      refs.current[i] = el;
                    }}
                    data-index={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.5, delay: 0.05 }}
                    className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
                  >
                    <button
                      onClick={() => select(i)}
                      aria-label={`Show step ${i + 1}`}
                      className={`relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm transition-colors duration-300 ${
                        active === i
                          ? "border-ink bg-ink"
                          : "border-mist bg-paper hover:border-ink/30"
                      }`}
                    >
                      <Icon
                        size={20}
                        className={active === i ? "text-paper" : "text-ink"}
                        strokeWidth={1.8}
                      />
                    </button>

                    <div
                      onClick={() => select(i)}
                      className="flex-1 cursor-pointer border-b border-mist pb-10 sm:border-b-0 sm:pb-0"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-display text-[13px] font-bold text-ink-soft">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="rounded-full bg-cloud px-2.5 py-0.5 text-[11px] font-medium text-ink-soft">
                          {step.tag}
                        </span>
                      </div>
                      <h3 className="mt-2 font-display text-[19px] font-bold text-ink sm:text-[21px]">
                        {step.title}
                      </h3>
                      <p className="mt-2 max-w-md text-[14.5px] leading-relaxed text-ink-soft">
                        {step.text}
                      </p>

                      <div className="mt-5 lg:hidden">
                        <StepVisual index={i} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32 flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 20, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.96 }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                >
                  <StepVisual index={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}