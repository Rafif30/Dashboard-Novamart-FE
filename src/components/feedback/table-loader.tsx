type TableLoaderProps = {
  rows?: number;
};

export function TableLoader({
  rows = 5,
}: TableLoaderProps) {
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
      <div
        className="
          mb-6 h-5 w-40
          rounded-lg
          bg-[var(--border)]
        "
      />

      <div className="space-y-4">
        {Array.from({
          length: rows,
        }).map((_, index) => (
          <div
            key={index}
            className="
              flex items-center
              justify-between
            "
          >
            <div className="space-y-2">
              <div
                className="
                  h-4 w-32 rounded-lg
                  bg-[var(--border)]
                "
              />

              <div
                className="
                  h-3 w-20 rounded-lg
                  bg-[var(--border)]
                "
              />
            </div>

            <div
              className="
                h-4 w-16 rounded-lg
                bg-[var(--border)]
              "
            />
          </div>
        ))}
      </div>
    </div>
  );
}