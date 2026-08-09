export default function ComingSoon({ title }: { title: string }) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-2xl border border-dashed border-mist text-center">
      <p className="font-display text-[20px] font-bold text-ink">{title}</p>
      <p className="mt-2 max-w-sm text-[13.5px] text-ink-soft">
        This section isn't built yet — it's next up in the build order.
      </p>
    </div>
  );
}