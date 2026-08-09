import { motion } from "framer-motion";

const photos = [
  { seed: "eventhub-main", label: "Tech Summit, 400 attendees", big: true },
  { seed: "eventhub-2", label: "Volunteer check-in desk" },
  { seed: "eventhub-3", label: "Workshop, hands-on session" },
  { seed: "eventhub-4", label: "Certificate handover" },
];

export default function Gallery() {
  return (
    <section className="border-t border-mist py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div className="max-w-xl">
            <p className="font-display text-[11px] font-bold uppercase tracking-[0.16em] text-accent">
              Moments
            </p>
            <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-ink sm:text-[42px]">
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
              className={`group relative overflow-hidden rounded-[24px] ${
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