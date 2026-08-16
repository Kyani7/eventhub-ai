import { useState } from "react";
import { Camera, Loader2, Check } from "lucide-react";
import FormField from "../../components/FormField";

const TABS = ["Profile", "Notifications", "Password"] as const;
type Tab = (typeof TABS)[number];

export default function Settings() {
  const [tab, setTab] = useState<Tab>("Profile");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [notifications, setNotifications] = useState({
    email: true,
    inApp: true,
    weeklyDigest: false,
  });

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await new Promise((r) => setTimeout(r, 700));
    setSaving(false);
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="font-display text-[24px] font-bold text-ink sm:text-[28px]">
        Settings
      </h1>
      <p className="mt-1 text-[14px] text-ink-soft">
        Manage your account and preferences.
      </p>

      <div className="mt-6 flex gap-2 border-b border-mist">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-1 pb-3 text-[13.5px] font-medium transition-colors ${
              tab === t
                ? "border-ink text-ink"
                : "border-transparent text-ink-soft hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6">
        {tab === "Profile" && (
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="relative h-16 w-16 shrink-0 rounded-full bg-cloud">
                <button
                  aria-label="Change avatar"
                  className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border border-mist bg-paper text-ink-soft"
                >
                  <Camera size={11} strokeWidth={2} />
                </button>
              </div>
              <div>
                <p className="text-[13.5px] font-medium text-ink">
                  Profile photo
                </p>
                <p className="text-[12px] text-ink-soft">
                  Upload not wired up yet
                </p>
              </div>
            </div>

            <FormField label="Full name" defaultValue="Kyani Dan Rai" />
            <FormField label="Email" type="email" defaultValue="kyani@iic.edu.np" />
            <FormField label="Organization" defaultValue="Itahari International College" />
          </div>
        )}

        {tab === "Notifications" && (
          <div className="space-y-1">
            {[
              { key: "email", label: "Email notifications", desc: "Registration confirmations, reminders, and updates" },
              { key: "inApp", label: "In-app notifications", desc: "Show a badge and toast for new activity" },
              { key: "weeklyDigest", label: "Weekly digest", desc: "A summary of your events every Monday" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between gap-4 rounded-2xl px-3 py-3.5 hover:bg-cloud/50"
              >
                <div>
                  <p className="text-[13.5px] font-medium text-ink">
                    {item.label}
                  </p>
                  <p className="text-[12px] text-ink-soft">{item.desc}</p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setNotifications((prev) => ({
                      ...prev,
                      [item.key]: !prev[item.key as keyof typeof prev],
                    }))
                  }
                  className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                    notifications[item.key as keyof typeof notifications]
                      ? "bg-ink"
                      : "bg-mist"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 h-5 w-5 rounded-full bg-paper shadow-sm transition-transform ${
                      notifications[item.key as keyof typeof notifications]
                        ? "translate-x-[22px]"
                        : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
            ))}
          </div>
        )}

        {tab === "Password" && (
          <div className="space-y-5">
            <FormField label="Current password" type="password" placeholder="••••••••" />
            <FormField label="New password" type="password" placeholder="••••••••" />
            <FormField label="Confirm new password" type="password" placeholder="••••••••" />
          </div>
        )}

        <div className="mt-7 flex items-center gap-3 border-t border-mist pt-6">
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-[13.5px] font-semibold text-paper disabled:opacity-70"
          >
            {saving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              "Save changes"
            )}
          </button>
          {saved && (
            <span className="flex items-center gap-1.5 text-[13px] font-medium text-accent">
              <Check size={14} strokeWidth={2.5} />
              Saved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}