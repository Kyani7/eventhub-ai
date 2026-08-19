import { motion } from "framer-motion";

const photos = [
  { seed: "gatherly-main", label: "Tech Summit, 400 attendees", big: true },
  { seed: "gatherly-2", label: "Volunteer check-in desk" },
  { seed: "gatherly-3", label: "Workshop, hands-on session" },
  { seed: "gatherly-4", label: "Certificate handover" },
];

export default function Gallery() {
  return (
    <section className="relative py-28 sm:py-36 bg-paper">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/20 bg-accent/10 px-3.5 py-1 text-[11.5px] font-bold uppercase tracking-[0.14em] text-accent">
              Moments
            </span>
            <h2 className="mt-4 font-display text-[34px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[46px]">
              Real events, run on it
            </h2>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4 lg:grid-rows-2">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.seed}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className={`group relative overflow-hidden rounded-[32px] shadow-sm hover:shadow-xl transition-all duration-500 ${
                photo.big
                  ? "col-span-2 row-span-2 aspect-square lg:aspect-auto"
                  : "aspect-square"
              }`}
            >
              <img
                src={`https://picsum.photos/seed/${photo.seed}/900/900`}
                alt={photo.label}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <p className="absolute bottom-3 left-3 text-[12.5px] font-medium text-paper opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {photo.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}