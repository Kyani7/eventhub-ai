import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
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
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 12);

      if (open) {
        lastY.current = y;
        return;
      }

      if (y > lastY.current && y > 120) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <motion.header
      animate={{ y: hidden ? "-130%" : "0%" }}
      transition={{ duration: 0.6, ease: [0.65, 0, 0.35, 1] }}
      className={`fixed inset-x-0 top-0 z-50 transition-[padding] duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8">
        <div
          className={`flex w-full items-center justify-between rounded-full border backdrop-blur-xl transition-all duration-300 ${
            scrolled
              ? "border-mist/60 bg-paper/75 shadow-[0_10px_40px_-14px_rgba(10,10,11,0.22)] px-4 py-2"
              : "border-mist/50 bg-paper/60 shadow-[0_6px_24px_-12px_rgba(10,10,11,0.14)] px-3 py-1.5"
          }`}
        >
          <a href="#top" className="flex items-center gap-2 font-display">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[13px] font-bold text-paper">
              G
            </span>
            <span className="text-[15px] font-bold tracking-tight text-ink">
              Gather<span className="text-accent">ly</span>
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
            <Link
              to="/login"
              className="rounded-full px-4 py-2 text-[13.5px] font-medium text-ink-soft transition-colors hover:text-ink"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-[13.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5"
            >
              Get started
              <ArrowUpRight
                size={14}
                strokeWidth={2.5}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
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
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-center text-[15px] font-medium text-ink-soft active:bg-cloud"
              >
                Sign in
              </Link>
              <Link
                to="/register"
                onClick={() => setOpen(false)}
                className="rounded-2xl bg-ink px-4 py-3.5 text-center text-[15px] font-semibold text-paper"
              >
                Get started
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}