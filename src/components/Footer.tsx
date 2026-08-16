import { ArrowUp } from "lucide-react";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 .5C5.7.5.5 5.7.5 12c0 5 3.2 9.3 7.7 10.8.6.1.8-.2.8-.6v-2.2c-3.1.7-3.8-1.5-3.8-1.5-.5-1.3-1.2-1.6-1.2-1.6-1-.7.1-.7.1-.7 1.1.1 1.7 1.2 1.7 1.2 1 1.7 2.6 1.2 3.2.9.1-.7.4-1.2.7-1.5-2.5-.3-5.1-1.3-5.1-5.6 0-1.2.4-2.2 1.2-3-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.2 1.2.9-.3 1.9-.4 2.9-.4s2 .1 2.9.4c2.2-1.5 3.2-1.2 3.2-1.2.6 1.6.2 2.8.1 3.1.7.8 1.2 1.8 1.2 3 0 4.3-2.6 5.3-5.1 5.6.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6C20.3 21.3 23.5 17 23.5 12 23.5 5.7 18.3.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M20.4 20.4h-3.5v-5.6c0-1.3 0-3-1.9-3s-2.1 1.4-2.1 2.9v5.7H9.4V9h3.4v1.6h.1c.5-.9 1.6-1.9 3.3-1.9 3.6 0 4.2 2.3 4.2 5.4v6.3ZM5.3 7.4a2 2 0 1 1 0-4 2 2 0 0 1 0 4ZM7 20.4H3.6V9H7v11.4ZM22.2 0H1.8C.8 0 0 .8 0 1.7v20.5C0 23.2.8 24 1.8 24h20.4c1 0 1.8-.8 1.8-1.8V1.7C24 .8 23.2 0 22.2 0Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
      <path d="M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 2 .2 2.4.4.6.2 1 .5 1.5.9.4.4.7.9.9 1.5.2.4.4 1.2.4 2.4.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.2 2-.4 2.4-.2.6-.5 1-.9 1.5-.4.4-.9.7-1.5.9-.4.2-1.2.4-2.4.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-2-.2-2.4-.4-.6-.2-1-.5-1.5-.9-.4-.4-.7-.9-.9-1.5-.2-.4-.4-1.2-.4-2.4-.1-1.3-.1-1.7-.1-4.9s0-3.6.1-4.9c.1-1.2.2-2 .4-2.4.2-.6.5-1 .9-1.5.4-.4.9-.7 1.5-.9.4-.2 1.2-.4 2.4-.4 1.3-.1 1.7-.1 4.9-.1Zm0 2c-3.1 0-3.5 0-4.8.1-1 0-1.6.2-1.9.3-.5.2-.8.4-1.2.8-.4.4-.6.7-.8 1.2-.1.3-.3.9-.3 1.9-.1 1.3-.1 1.7-.1 4.8s0 3.5.1 4.8c0 1 .2 1.6.3 1.9.2.5.4.8.8 1.2.4.4.7.6 1.2.8.3.1.9.3 1.9.3 1.3.1 1.7.1 4.8.1s3.5 0 4.8-.1c1 0 1.6-.2 1.9-.3.5-.2.8-.4 1.2-.8.4-.4.6-.7.8-1.2.1-.3.3-.9.3-1.9.1-1.3.1-1.7.1-4.8s0-3.5-.1-4.8c0-1-.2-1.6-.3-1.9-.2-.5-.4-.8-.8-1.2-.4-.4-.7-.6-1.2-.8-.3-.1-.9-.3-1.9-.3-1.3-.1-1.7-.1-4.8-.1Zm0 3.4a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8Zm0 2a3.4 3.4 0 1 0 0 6.8 3.4 3.4 0 0 0 0-6.8Zm5.6-2.6a1.3 1.3 0 1 1-2.6 0 1.3 1.3 0 0 1 2.6 0Z" />
    </svg>
  );
}

const columns = [
  {
    title: "Product",
    links: ["Features", "How it works", "Pricing", "Changelog"],
  },
  {
    title: "Roles",
    links: ["Organizers", "Volunteers", "Students", "Sponsors"],
  },
  {
    title: "Company",
    links: ["About", "Contact", "Privacy", "Terms"],
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-mist bg-cloud/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <a href="#top" className="flex items-center gap-2 font-display">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
                G
              </span>
              <span className="text-[15px] font-bold tracking-tight text-ink">
                Gather<span className="text-accent">ly</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-[13.5px] leading-relaxed text-ink-soft">
              AI-powered event management for universities, hackathons, and
              student organizations.
            </p>
            <div className="mt-5 flex items-center gap-3">
              

              <a
                href="https://github.com/Kyani7"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink-soft transition-colors hover:bg-ink hover:text-paper"
              >
                <GithubIcon />
              </a>
              
              <a
                href="https://www.linkedin.com/in/kyandu-rai-67729b363/"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink-soft transition-colors hover:bg-ink hover:text-paper"
              >
                <LinkedinIcon />
              </a>
              

              <a
                href="https://www.instagram.com/maikki_19/"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-mist text-ink-soft transition-colors hover:bg-ink hover:text-paper"
              >
                <InstagramIcon />
              </a>
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <p className="font-display text-[12px] font-bold uppercase tracking-wide text-ink">
                {col.title}
              </p>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link}>
                    
                    <a
                      href="#"
                      className="text-[13.5px] text-ink-soft transition-colors hover:text-ink"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-mist pt-8 sm:flex-row sm:items-center">
          <p className="text-[12.5px] text-ink-soft">
            &copy; {new Date().getFullYear()} Gatherly. Final year project
            by Kyani Dan Rai.
          </p>
          
          <a
            href="#top"
            aria-label="Back to top"
            className="group inline-flex h-[76px] w-[46px] items-center justify-center rounded-full border border-ink/30 bg-transparent text-ink transition-all duration-300 hover:-translate-y-1 hover:border-ink hover:bg-cloud/50 shadow-sm"
          >
            <ArrowUp
              size={20}
              strokeWidth={1.75}
              className="transition-transform duration-300 group-hover:-translate-y-1"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}