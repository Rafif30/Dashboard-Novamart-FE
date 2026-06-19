type LoadingOverlayProps = {
  show: boolean;
};

export function LoadingOverlay({
  show,
}: LoadingOverlayProps) {
  if (!show) {
    return null;
  }

  return (
    <div
      className="
        absolute inset-0 z-50
        flex items-center justify-center
        rounded-3xl
        bg-black/30
        backdrop-blur-sm
      "
    >
      <div
        className="
          flex flex-col items-center gap-4
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--card)]
          px-8 py-6
          shadow-[var(--shadow-lg)]
        "
      >
        <div
          className="
            h-10 w-10 animate-spin
            rounded-full
            border-[3px]
            border-[var(--border)]
            border-t-[var(--primary)]
          "
        />

        <p
          className="
            text-sm font-medium
            text-[var(--foreground)]
          "
        >
          Processing request...
        </p>
      </div>
    </div>
  );
}