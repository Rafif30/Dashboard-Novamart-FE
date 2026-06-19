import { ProgressBar } from "../ui/progressBar";
import { getChartColorByIndex } from "@/lib/utils";
import { SectionLoader } from "../feedback/section-loader";
import { Card } from "../ui/card";
import { formatRupiahShort } from "@/lib/utils"
import { useRevenueChannelQuery } from "@/hooks/queries/useRevenueQuery";
import { useDashboardFilters } from "@/hooks/params/useDashboardFilters";

export function RevenueChannelTable() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useRevenueChannelQuery(requestParams);

  if (isLoading) return <SectionLoader />;

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Revenue by channel
        </h3>

        <button className="rounded-full bg-[var(--chart-blue)] px-3 py-1 text-xs text-[var(--chart-blue-foreground)]">
          Quarter
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-4 text-sm text-[var(--muted)]">
          <p>Channel</p>
          <p>Revenue</p>
          <p>vs last period</p>
          <p>Share</p>
        </div>

        {data?.revenueByChannel.map((item, index) => (
          <div
            key={item.channel}
            className="grid grid-cols-4 items-center gap-3 border-t border-[var(--muted)]/30 pt-4"
          >
            <p className="text-[var(--muted)]">
              {item.channel.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>

            <p className="text-[var(--muted)]">
              {formatRupiahShort(item.value)}
            </p>

            <p
              className={
                item.growth.startsWith("-")
                  ? "text-[var(--danger)]"
                  : "text-[var(--success)]"
              }
            >
              {item.growth}
            </p>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{item.share}%</span>
              </div>

              <ProgressBar value={item.share} color={getChartColorByIndex(index).label} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}