import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowRight, MailCheck } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
});

type FormValues = z.infer<typeof schema>;

export default function ForgotPassword() {
  const [sentTo, setSentTo] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(values: FormValues) {
    await new Promise((r) => setTimeout(r, 900));
    setSentTo(values.email);
  }

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the email tied to your account and we'll send a reset link."
      footer={
        <p>
          Remembered it after all?{" "}
          <Link to="/login" className="font-semibold text-ink hover:text-accent">
            Back to sign in
          </Link>
        </p>
      }
    >
      {sentTo ? (
        <div className="rounded-2xl border border-mist bg-cloud/50 p-5">
          <MailCheck size={20} className="text-accent" strokeWidth={2} />
          <p className="mt-3 text-[14px] font-medium text-ink">
            If an account exists for {sentTo}, a reset link is on its way.
          </p>
          <p className="mt-2 text-[13px] text-ink-soft">
            No backend is wired up yet, so no email actually sends — this is
            the UI and validation flow only.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@university.edu"
            error={errors.email?.message}
            {...register("email")}
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Send reset link
                <ArrowRight size={15} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}