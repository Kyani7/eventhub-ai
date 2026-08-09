import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Loader2, ArrowRight, GraduationCap, Megaphone, ScanLine, Handshake } from "lucide-react";
import AuthLayout from "../components/AuthLayout";
import FormField from "../components/FormField";

const roles = [
  { value: "student", label: "Student", icon: GraduationCap },
  { value: "organizer", label: "Organizer", icon: Megaphone },
  { value: "volunteer", label: "Volunteer", icon: ScanLine },
  { value: "sponsor", label: "Sponsor", icon: Handshake },
] as const;

const schema = z
  .object({
    name: z.string().min(2, "Enter your full name"),
    email: z.string().min(1, "Email is required").email("Enter a valid email"),
    role: z.enum(["student", "organizer", "volunteer", "sponsor"], {
      message: "Choose a role",
    }),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof schema>;

export default function Register() {
  const [submitted, setSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { role: "student" },
  });

  const selectedRole = watch("role");

  async function onSubmit(_values: FormValues) {
    await new Promise((r) => setTimeout(r, 900));
    setSubmitted(true);
  }

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Set up EventHub AI for your club, department, or organization."
      footer={
        <p>
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-ink hover:text-accent">
            Sign in
          </Link>
        </p>
      }
    >
      {submitted ? (
        <div className="rounded-2xl border border-mist bg-cloud/50 p-5 text-[14px] text-ink-soft">
          This is a UI-only demo — there's no backend wired up yet, so no
          account was actually created. Validation, role selection, and
          submit state all work as shown.
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            label="Full name"
            placeholder="Kyani Dan Rai"
            error={errors.name?.message}
            {...register("name")}
          />
          <FormField
            label="Email"
            type="email"
            autoComplete="email"
            placeholder="you@university.edu"
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <p className="mb-1.5 text-[13px] font-medium text-ink">I am a</p>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const active = selectedRole === role.value;
                return (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() =>
                      setValue("role", role.value, { shouldValidate: true })
                    }
                    className={`flex items-center gap-2 rounded-2xl border px-3.5 py-2.5 text-[13px] font-medium transition-colors ${
                      active
                        ? "border-ink bg-ink text-paper"
                        : "border-mist text-ink-soft hover:border-ink/30"
                    }`}
                  >
                    <Icon size={15} strokeWidth={2} />
                    {role.label}
                  </button>
                );
              })}
            </div>
            {errors.role && (
              <p className="mt-1.5 text-[12.5px] text-red-500">
                {errors.role.message}
              </p>
            )}
          </div>

          <FormField
            label="Password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register("password")}
          />
          <FormField
            label="Confirm password"
            type="password"
            autoComplete="new-password"
            placeholder="••••••••"
            error={errors.confirmPassword?.message}
            {...register("confirmPassword")}
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
                Create account
                <ArrowRight size={15} strokeWidth={2.5} />
              </>
            )}
          </button>

          <p className="text-center text-[12px] text-ink-soft">
            By continuing you agree to EventHub AI's Terms and Privacy Policy.
          </p>
        </form>
      )}
    </AuthLayout>
  );
}