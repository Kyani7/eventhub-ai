import { type ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AuthLayout({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-2">
      <div className="relative hidden flex-col justify-between overflow-hidden bg-ink p-12 text-paper lg:flex">
        <div className="pointer-events-none absolute -left-20 top-20 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="pointer-events-none absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />

        <Link to="/" className="relative flex items-center gap-2 font-display">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-paper text-[13px] font-bold text-ink">
            K
          </span>
          <span className="text-[15px] font-bold tracking-tight">
            Ky<span className="text-accent">nova</span>
          </span>
        </Link>

        <div className="relative max-w-md">
          <ShieldCheck size={28} className="text-accent" strokeWidth={1.75} />
          <p className="mt-6 font-display text-[26px] font-bold leading-snug">
            "We ran a 400 person tech fest with three people on the team. The
            planner did what usually takes a week."
          </p>
          <p className="mt-4 text-[13.5px] text-paper/60">
            Nischal Rai, Event Lead, IT Club
          </p>
        </div>

        <div className="relative flex items-center gap-8 text-[13px] text-paper/60">
          <span>12K+ attendees checked in</span>
          <span>340+ events hosted</span>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 py-12 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            to="/"
            className="mb-10 inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink lg:hidden"
          >
            <ArrowLeft size={14} strokeWidth={2.5} />
            Back to home
          </Link>

          <h1 className="font-display text-[26px] font-extrabold tracking-tight text-ink sm:text-[28px]">
            {title}
          </h1>
          <p className="mt-2 text-[14.5px] text-ink-soft">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 text-[13.5px] text-ink-soft">{footer}</div>
        </div>
      </div>
    </div>
  );
}