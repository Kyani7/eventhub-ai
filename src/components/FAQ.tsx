import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const categories = ["General", "AI & Automation", "Attendance & Certificates"] as const;

const faqs: { category: (typeof categories)[number]; q: string; a: string }[] = [
  {
    category: "General",
    q: "Who can create events on Kynova?",
    a: "Organizers and admins can create and publish events. Students browse and register, volunteers get assigned to check-in duty, and sponsors get a dashboard for their campaigns.",
  },
  {
    category: "General",
    q: "Is this free for student clubs?",
    a: "The core platform is free for university and club use. Sponsor tools and advanced analytics sit on a separate tier.",
  },
  {
    category: "General",
    q: "Can one account hold multiple roles?",
    a: "Yes, A student who also volunteers can switch between their student view and volunteer view from the same account.",
  },
  {
    category: "AI & Automation",
    q: "Does the AI planner replace the organizer?",
    a: "No, It drafts the schedule, budget, and checklist so the organizer isn't starting from a blank page. Everything it generates is editable before publishing.",
  },
  {
    category: "AI & Automation",
    q: "What does the feedback analyzer actually do?",
    a: "It reads through every submitted response after an event and returns a short summary, the recurring themes, and a sentiment breakdown — instead of an organizer reading each one by hand.",
  },
  {
    category: "Attendance & Certificates",
    q: "How does QR attendance actually work?",
    a: "Every registration generates a unique QR ticket. At the venue, a volunteer scans it through the app, and the attendee is marked present instantly, no manual entry.",
  },
  {
    category: "Attendance & Certificates",
    q: "Can certificates be verified later?",
    a: "Yes. Each certificate carries its own QR code that links back to a verification page confirming the name, event, and date are genuine.",
  },
];

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>("General");
  const [openItems, setOpenItems] = useState<Set<string>>(new Set([faqs[0].q]));

  const visibleFaqs = faqs.filter((f) => f.category === activeCategory);
  const allOpen = visibleFaqs.every((f) => openItems.has(f.q));

  function toggleItem(q: string) {
    setOpenItems((prev) => {
      const next = new Set(prev);
      next.has(q) ? next.delete(q) : next.add(q);
      return next;
    });
  }

  function toggleAll() {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (allOpen) {
        visibleFaqs.forEach((f) => next.delete(f.q));
      } else {
        visibleFaqs.forEach((f) => next.add(f.q));
      }
      return next;
    });
  }

  return (
    <section id="faq" className="border-t border-mist py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div>
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              FAQ
            </p>
            <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
              Questions, answered
            </h2>
            <p className="mt-3 max-w-md text-[14.5px] text-ink-soft">
              Sorted by what you're actually trying to figure out.
            </p>
          </div>

          <button
            onClick={toggleAll}
            className="shrink-0 rounded-full border border-mist px-4 py-2 text-[13px] font-medium text-ink-soft transition-colors hover:border-ink/20 hover:bg-cloud hover:text-ink"
          >
            {allOpen ? "Collapse all" : "Expand all"}
          </button>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr] lg:gap-12">
          <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0">
            {categories.map((cat) => {
              const active = cat === activeCategory;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 rounded-full px-4 py-2.5 text-left text-[13.5px] font-medium transition-colors lg:rounded-2xl ${
                    active
                      ? "bg-ink text-paper"
                      : "bg-cloud text-ink-soft hover:bg-mist/70"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          <div className="divide-y divide-mist border-t border-mist lg:border-t-0">
            {visibleFaqs.map((item) => {
              const isOpen = openItems.has(item.q);
              return (
                <div key={item.q} className="lg:rounded-2xl">
                  <button
                    onClick={() => toggleItem(item.q)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[15px] font-semibold text-ink sm:text-[16px]">
                      {item.q}
                    </span>
                    <ChevronDown
                      size={18}
                      strokeWidth={2}
                      className={`shrink-0 text-ink-soft transition-transform duration-300 ${
                        isOpen ? "rotate-180 text-accent" : ""
                      }`}
                    />
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
                        <p className="max-w-xl pb-6 text-[14px] leading-relaxed text-ink-soft sm:text-[14.5px]">
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
      </div>
    </section>
  );
}