import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowRight } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type FormValues = z.infer<typeof schema>;

export default function Login() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  async function onSubmit(_values: FormValues) {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to manage your events and registrations."
      footer={
        <p>
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-ink hover:text-accent">
            Create one
          </Link>
        </p>
      }
    >
      {submitted ? (
        <div className="rounded-2xl border border-mist bg-cloud/50 p-5 text-[14px] text-ink-soft">
          This is a UI-only demo — there's no backend wired up yet, so
          nothing was actually authenticated. Form validation and submit
          state work as shown.
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
          <FormField
            label="Password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />

          <div className="flex items-center justify-between text-[13px]">
            <label className="flex items-center gap-2 text-ink-soft">
              <input type="checkbox" className="h-4 w-4 rounded border-mist accent-ink" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-ink hover:text-accent">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-[14.5px] font-semibold text-paper transition-transform duration-200 hover:-translate-y-0.5 disabled:opacity-70"
          >
            {isSubmitting ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <>
                Sign in
                <ArrowRight size={15} strokeWidth={2.5} />
              </>
            )}
          </button>
        </form>
      )}
    </AuthLayout>
  );
}