export function ChartLoader() {
  return (
    <div
      className="
        animate-pulse
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--card)]
        p-6
      "
    >
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-3">
          <div
            className="
              h-5 w-36 rounded-lg
              bg-[var(--border)]
            "
          />

          <div
            className="
              h-4 w-24 rounded-lg
              bg-[var(--border)]
            "
          />
        </div>

        <div
          className="
            h-9 w-24 rounded-xl
            bg-[var(--border)]
          "
        />
      </div>

      <div
        className="
          h-[260px]
          rounded-2xl
          bg-[var(--border)]
        "
      />
    </div>
  );
}