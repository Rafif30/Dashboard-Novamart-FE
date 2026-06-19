import { cx } from "@/lib/utils";

type Props = React.HTMLAttributes<HTMLDivElement>;

export function Card({
  className,
  ...props
}: Props) {
  return (
    <div
      className={cx(
        "rounded-2xl border bg-[var(--card)] text-[var(--card-foreground)] border-[var(--border)] p-5 shadow-sm",
        className
      )}
      {...props}
    />
  );
}