import { Link } from "react-router-dom";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle } from "lucide-react";
import TicketCard from "./TicketCard";

const STATS = [
  { value: "12K+", label: "Attendees checked in" },
  { value: "340+", label: "Events hosted" },
  { value: "98%", label: "Attendance accuracy" },
];

const EASE_OUT = [0.16, 1, 0.3, 1] as const;

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 18 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: EASE_OUT },
  }),
};

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40 lg:pt-44"
    >
      <span
        aria-hidden
        className="pointer-events-none absolute right-[-2%] top-[10%] hidden select-none font-display text-[220px] font-extrabold leading-none tracking-tight text-cloud sm:block lg:text-[280px]"
      >
        HOST
      </span>

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
        <div className="max-w-2xl">
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-ink-soft sm:text-[12px]"
          >
            Smart event management Platform
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-5 font-display text-[44px] font-extrabold leading-[1.04] tracking-tight text-ink xs:text-[52px] sm:text-[64px] lg:text-[68px]"
          >
            Run campus events
            <br />
            <span className="text-ink-soft">like a real product</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-[17px] leading-[1.6] text-ink-soft text-justify sm:text-[18px]"
          >
          Kynova helps you plan, manage, and run events
          from a one day workshop to a 2,000-student fest. QR attendance, certificates, analytics, and an AI co-planner, all in one platform.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-col gap-3 xs:flex-row xs:items-center"
          >
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3.5 text-[14.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Start for free
              <ArrowRight
                size={16}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
            
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-mist bg-paper px-6 py-3.5 text-[14.5px] font-semibold text-ink transition-colors duration-200 hover:border-ink/20 hover:bg-cloud"
            >
              <PlayCircle size={17} strokeWidth={2} />
              Watch demo
            </a>
          </motion.div>

          <motion.dl
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-14 grid grid-cols-3 gap-4 border-t border-mist pt-8 sm:gap-8"
          >
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[22px] font-bold text-ink sm:text-[28px]">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-[11.5px] leading-snug text-ink-soft sm:text-[12.5px]">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <div className="lg:pl-4">
          <TicketCard />
        </div>
      </div>
    </section>
  );
}