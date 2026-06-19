export function PageLoader() {
  return (
    <div
      className="
        flex min-h-screen
        items-center justify-center
        bg-[var(--background)]
      "
    >
      <div className="flex flex-col items-center gap-6">
        {/* Logo */}
        <div
          className="
            flex h-16 w-16
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]
            text-xl font-bold
            text-[var(--primary-foreground)]
            shadow-[var(--shadow-md)]
          "
        >
          N
        </div>

        {/* Spinner */}
        <div
          className="
            h-10 w-10
            animate-spin
            rounded-full
            border-[3px]
            border-[var(--border)]
            border-t-[var(--primary)]
          "
        />

        <div className="space-y-1 text-center">
          <p
            className="
              text-sm font-medium
              text-[var(--foreground)]
            "
          >
            Loading dashboard
          </p>

          <p
            className="
              text-xs
              text-[var(--muted)]
            "
          >
            Preparing analytics data...
          </p>
        </div>
      </div>
    </div>
  );
}