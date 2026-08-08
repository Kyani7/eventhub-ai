import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

const faqs = [
  {
    q: "Who can create events on EventHub AI?",
    a: "Organizers and admins can create and publish events. Students browse and register, volunteers get assigned to check-in duty, and sponsors get a dashboard for their campaigns.",
  },
  {
    q: "Does the AI planner replace the organizer?",
    a: "No — it drafts the schedule, budget, and checklist so the organizer isn't starting from a blank page. Everything it generates is editable before publishing.",
  },
  {
    q: "How does QR attendance actually work?",
    a: "Every registration generates a unique QR ticket. At the venue, a volunteer scans it through the app, and the attendee is marked present instantly, no manual entry.",
  },
  {
    q: "Can certificates be verified later?",
    a: "Yes. Each certificate carries its own QR code that links back to a verification page confirming the name, event, and date are genuine.",
  },
  {
    q: "Is this free for student clubs?",
    a: "The core platform is free for university and club use. Sponsor tools and advanced analytics sit on a separate tier.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="border-t border-mist py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <div className="text-center">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            FAQ
          </p>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
            Questions, answered.
          </h2>
        </div>

        <div className="mt-12 divide-y divide-mist border-t border-mist">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                >
                  <span className="text-[15px] font-semibold text-ink sm:text-[16px]">
                    {item.q}
                  </span>
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-mist transition-transform duration-300 ${
                      isOpen ? "rotate-45 bg-ink" : ""
                    }`}
                  >
                    <Plus
                      size={14}
                      strokeWidth={2.5}
                      className={isOpen ? "text-paper" : "text-ink"}
                    />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 max-w-xl text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}