import { Card } from "./card";
import { SectionLoader } from "../feedback/section-loader";

type Props = {
  title?: string;
  value?: string;
  change?: string;
  positive?: boolean;
  trend?: "up" | "down";
  isNegativeMetric?: boolean;
  isLoading?: boolean;
};

export function StatCard({
  title,
  value,
  change,
  trend,
  isNegativeMetric = false,
  isLoading = false,
}: Props) {


  const checkPositiveTrend = (trend: string, isNegativeMetric = false) => {
    if (trend === "up") return !isNegativeMetric; // Kalau metrik negatif, naik itu buruk
    if (trend === "down") return isNegativeMetric; // Kalau metrik negatif, turun itu bagus
    return false; // stable atau undefined dianggap netral
  }
  
  if (isLoading) {
    return <SectionLoader />;
  }

  return (
    <Card>
      <p className="text-sm text-[var(--secondary-foreground)]">
        {title}
      </p>

      <h2 className="mt-2 text-3xl font-bold text-[var(--foreground)]">
        {value}
      </h2>

      <p
        className={`mt-2 text-sm ${
          checkPositiveTrend(trend ?? '', isNegativeMetric)
            ? "text-[var(--success)]"
            : "text-[var(--danger)]"
        }`}
      >
        {change}
      </p>
    </Card>
  );
}