type SectionLoaderProps = {
  height?: number;
};

export function SectionLoader({
  height = 320,
}: SectionLoaderProps) {
  return (
    <div
      className="
        animate-pulse
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--card)]
        p-6
      "
      style={{
        height,
      }}
    >
      <div className="space-y-4">
        <div
          className="
            h-5 w-40 rounded-lg
            bg-[var(--border)]
          "
        />

        <div
          className="
            h-4 w-24 rounded-lg
            bg-[var(--border)]
          "
        />

        <div
          className="
            mt-10 h-[180px]
            rounded-2xl
            bg-[var(--border)]
          "
        />
      </div>
    </div>
  );
}