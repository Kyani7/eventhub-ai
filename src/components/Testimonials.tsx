import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "We ran a 400-person tech fest with three people on the organizing team. The AI planner did what usually takes a week of committee meetings.",
    name: "Nischal Rai",
    role: "Event Lead, IT Club",
    seed: "nischal",
  },
  {
    quote:
      "QR check-in meant we stopped arguing about who actually showed up. Attendance numbers finally match the certificates we hand out.",
    name: "Sugam Shrestha",
    role: "Volunteer Coordinator",
    seed: "sugam",
  },
  {
    quote:
      "I registered for six events last semester without downloading a single spreadsheet. Everything, including my certificates, lives in one place.",
    name: "Saphal Bohora",
    role: "Final Year Student",
    seed: "saphal",
  },
  {
    quote:
      "As a sponsor, I used to get a PDF report two weeks after the event. Now I can see reach and engagement while the event is still running.",
    name: "Nischya Rai",
    role: "Sponsor, Himalayan Traders",
    seed: "nischya",
  },
  {
    quote:
      "Approving events used to mean chasing five different organizers on WhatsApp. Now it's one queue, and I can see the AI-generated risk assessment before I sign off.",
    name: "Prabhik Rai",
    role: "Admin, Student Affairs",
    seed: "prabhik",
  },
  {
    quote:
      "The feedback analyzer read through 300 responses in a minute and actually got the recurring complaint right — the mic kept cutting out.",
    name: "Tony Stark",
    role: "Organizer, Robotics Society",
    seed: "tony",
  },
];

const track = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-xl">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent">
            Feedback
          </span>
          <h2 className="mt-4 font-display text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
            Built with organizers,
            <br />
            not just for them
          </h2>
        </div>
      </div>

      <div className="group relative mt-14 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-paper to-transparent sm:w-32" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-paper to-transparent sm:w-32" />

        <div className="animate-marquee flex w-max gap-4 group-hover:[animation-play-state:paused]">
          {track.map((t, i) => (
            <figure
              key={`${t.name}-${i}`}
              className="flex w-[320px] shrink-0 flex-col rounded-[32px] border border-mist/60 bg-paper p-7 shadow-sm transition-all duration-300 hover:shadow-md hover:border-mist sm:w-[360px]"
            >
              <Quote size={22} className="text-accent" strokeWidth={2} />
              <blockquote className="mt-5 flex-1 text-[14.5px] leading-relaxed text-ink">
                "{t.quote}"
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <img
                  src={`https://picsum.photos/seed/${t.seed}/80/80`}
                  alt={t.name}
                  className="h-9 w-9 rounded-full object-cover"
                />
                <div>
                  <p className="text-[13.5px] font-semibold text-ink">
                    {t.name}
                  </p>
                  <p className="text-[12px] text-ink-soft">{t.role}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}