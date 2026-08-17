import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowLeft, FileText, Loader2, ImagePlus } from "lucide-react";
import FormField from "../../components/FormField";

const categories = ["Conference", "Workshop", "Hackathon", "Talk", "Fair", "Fest"] as const;

const schema = z.object({
  name: z.string().min(3, "Give the event a name"),
  category: z.enum(categories, { message: "Pick a category" }),
  description: z.string().min(20, "Write at least a couple of sentences"),
  date: z.string().min(1, "Pick a date"),
  time: z.string().min(1, "Pick a time"),
  venue: z.string().min(2, "Where is this happening?"),
  capacity: z.coerce.number().min(1, "Capacity must be at least 1"),
  deadline: z.string().min(1, "Pick a registration deadline"),
});

type FormValues = z.input<typeof schema>;

export default function CreateEvent() {
  const navigate = useNavigate();
  const [aiDraft, setAiDraft] = useState("");
  const [generating, setGenerating] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const selectedCategory = watch("category");

  async function handleAiDraft() {
    if (!aiDraft.trim()) return;
    setGenerating(true);
    await new Promise((r) => setTimeout(r, 1100));
    setValue("name", aiDraft.trim(), { shouldValidate: true });
    setValue(
      "description",
      `${aiDraft.trim()} — join us for a focused, hands-on session designed for students who want practical experience, not just a lecture. Certificates provided to all attendees.`,
      { shouldValidate: true }
    );
    setGenerating(false);
  }

  async function onSubmit(_values: FormValues) {
    await new Promise((r) => setTimeout(r, 800));
    navigate("/dashboard/events");
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Link
        to="/dashboard/events"
        className="inline-flex items-center gap-1.5 text-[13px] font-medium text-ink-soft transition-colors hover:text-ink"
      >
        <ArrowLeft size={14} strokeWidth={2.5} />
        Back to events
      </Link>

      <h1 className="mt-4 font-display text-[24px] font-bold text-ink sm:text-[28px]">
        Create an event
      </h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        Fill it in yourself, or let the AI draft a starting point.
      </p>

      <div className="mt-6 rounded-2xl border border-mist bg-cloud/50 p-5">
        <div className="flex items-center gap-2">
          <FileText size={15} className="text-accent" strokeWidth={2.25} />
          <p className="text-[13px] font-semibold text-ink">AI draft</p>
        </div>
        <p className="mt-1 text-[12.5px] text-ink-soft">
          One line is enough — you'll review and edit everything before it's saved.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={aiDraft}
            onChange={(e) => setAiDraft(e.target.value)}
            placeholder="One-day AI workshop for 200 students"
            className="flex-1 rounded-xl border border-mist bg-paper px-3.5 py-2.5 text-[13.5px] text-ink outline-none focus:border-ink"
          />
          <button
            type="button"
            onClick={handleAiDraft}
            disabled={generating || !aiDraft.trim()}
            className="flex items-center justify-center gap-1.5 rounded-xl bg-ink px-4 py-2.5 text-[13px] font-semibold text-paper disabled:opacity-50"
          >
            {generating ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
              "Generate"
            )}
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
        <FormField
          label="Event name"
          placeholder="AI & Robotics Summit 2026"
          error={errors.name?.message}
          {...register("name")}
        />

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-ink">Category</p>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setValue("category", cat, { shouldValidate: true })}
                className={`rounded-full border px-3.5 py-1.5 text-[12.5px] font-medium transition-colors ${
                  selectedCategory === cat
                    ? "border-ink bg-ink text-paper"
                    : "border-mist text-ink-soft hover:border-ink/30"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          {errors.category && (
            <p className="mt-1.5 text-[12.5px] text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1.5 block text-[13px] font-medium text-ink">
            Description
          </label>
          <textarea
            rows={4}
            placeholder="What's this event about, and who's it for?"
            className={`w-full rounded-2xl border bg-paper px-4 py-3 text-[14px] text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-ink ${
              errors.description ? "border-red-400" : "border-mist"
            }`}
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1.5 text-[12.5px] text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Date"
            type="date"
            error={errors.date?.message}
            {...register("date")}
          />
          <FormField
            label="Time"
            type="time"
            error={errors.time?.message}
            {...register("time")}
          />
        </div>

        <FormField
          label="Venue"
          placeholder="Auditorium Hall, Block C"
          error={errors.venue?.message}
          {...register("venue")}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Capacity"
            type="number"
            placeholder="200"
            error={errors.capacity?.message}
            {...register("capacity")}
          />
          <FormField
            label="Registration deadline"
            type="date"
            error={errors.deadline?.message}
            {...register("deadline")}
          />
        </div>

        <div>
          <p className="mb-1.5 text-[13px] font-medium text-ink">
            Event banner
          </p>
          <div className="flex h-32 items-center justify-center rounded-2xl border border-dashed border-mist bg-cloud/30 text-ink-soft">
            <div className="flex flex-col items-center gap-1.5">
              <ImagePlus size={20} strokeWidth={1.75} />
              <p className="text-[12.5px]">Upload not wired up yet</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              "Save as draft"
            )}
          </button>
          <Link
            to="/dashboard/events"
            className="flex items-center justify-center rounded-full border border-mist px-5 py-3.5 text-[14.5px] font-semibold text-ink transition-colors hover:bg-cloud"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}