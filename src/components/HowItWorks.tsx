import { motion } from "framer-motion";
import { MessageSquareText, Megaphone, ScanLine, Award } from "lucide-react";

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

export default function HowItWorks() {
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
            four steps
          </h2>
        </div>

        <div className="relative mt-16">
          <div className="absolute left-[27px] top-2 hidden h-[calc(100%-2rem)] w-px bg-mist sm:block" />

          <div className="flex flex-col gap-10 sm:gap-14">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: 0.05 }}
                  className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
                >
                  <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-mist bg-paper shadow-sm">
                    <Icon size={20} className="text-ink" strokeWidth={1.8} />
                  </div>

                  <div className="flex-1 border-b border-mist pb-10 sm:border-b-0 sm:pb-0">
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
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}