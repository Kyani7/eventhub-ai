import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We ran a 400-person tech fest with three people on the organizing team. The AI planner did what usually takes a week of committee meetings.",
    name: "Anisha Rai",
    role: "Event Lead, IT Club",
  },
  {
    quote:
      "QR check-in meant we stopped arguing about who actually showed up. Attendance numbers finally match the certificates we hand out.",
    name: "Bibek Thapa",
    role: "Volunteer Coordinator",
  },
  {
    quote:
      "I registered for six events last semester without downloading a single spreadsheet. Everything, including my certificates, lives in one place.",
    name: "Sristi Gurung",
    role: "Final Year Student",
  },
];

export default function Testimonials() {
  return (
    <section className="border-t border-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
            Feedback
          </p>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
            Built with organizers,
            <br />
            not just for them.
          </h2>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="flex flex-col rounded-[24px] border border-mist bg-cloud/40 p-7"
            >
              <Quote size={22} className="text-accent" strokeWidth={2} />
              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="h-9 w-9 rounded-full bg-mist" />
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-ink-soft">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}