import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";

const LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it works", href: "#how-it-works" },
  { label: "Roles", href: "#roles" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div
          className={`flex w-full items-center justify-between rounded-full border transition-all duration-300 ${
            scrolled
              ? "border-mist/80 bg-paper/80 shadow-[0_1px_0_0_rgba(0,0,0,0.03)] backdrop-blur-xl px-4 py-2"
              : "border-transparent bg-transparent px-2 py-1"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
              E
            </span>
            <span className="text-[15px] font-bold tracking-tight text-ink">
              EventHub<span className="text-accent">AI</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink-soft transition-colors hover:bg-cloud hover:text-ink"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-2 md:flex">
            <a
              href="#login"
              className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Sign in
            </a>
            <a
              href="#get-started"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Get started
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          </div>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-full text-ink md:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mx-5 mt-2 overflow-hidden rounded-3xl border border-mist bg-paper/95 p-3 shadow-xl backdrop-blur-xl md:hidden"
          >
            <nav className="flex flex-col">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3.5 text-[15px] font-medium text-ink-soft active:bg-cloud"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <div className="mt-2 flex flex-col gap-2 border-t border-mist pt-3">
              <a
                href="#login"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-center text-[15px] font-medium text-ink-soft active:bg-cloud"
              >
                Sign in
              </a>
              <a
                href="#get-started"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-ink px-4 py-3.5 text-center text-[15px] font-semibold text-paper"
              >
                Get started
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
