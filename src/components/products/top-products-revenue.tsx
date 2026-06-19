import { SectionLoader } from "../feedback/section-loader";
import { formatRupiahShort } from "@/lib/utils";
import { useProductsTopItemQuery } from "@/hooks/queries/useProductsQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'
import { Card } from "../ui/card";

const colorBgRevenueShare = (shareValue: number): string  => {
  if (shareValue > 80) return 'var(--chart-emerald)';
  if (shareValue > 60) return 'var(--chart-lime)';
  if (shareValue > 35) return 'var(--chart-yellow)';

  return 'var(--chart-red)';
}

export function TopProductsRevenue() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useProductsTopItemQuery(requestParams)

  if (isLoading) return <SectionLoader />


  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Top products by revenue
        </h3>

        <button className="rounded-full bg-[var(--primary)]/60 px-3 py-1 text-xs text-[var(--primary-foreground)]">
          YTD
        </button>
      </div>

      <div className="space-y-5">
        <div className="grid grid-cols-[40px_1fr_100px_100px_90px] gap-3 text-sm text-[var(--muted)]">
          <p />
          <p>Product</p>
          <p>Revenue</p>
          <p>Share</p>
          <p>Trend</p>
        </div>

        {data?.topProducts?.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-[40px_1fr_100px_100px_90px] items-center gap-3 border-t border-white/5 pt-4"
          >
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                index + 1 <= 2
                  ? "bg-orange-100 text-orange-900"
                  : "bg-[var(--muted)] text-[var(--primary-foreground)]"
              }`}
            >
              {index + 1}
            </div>

            <p className="text-sm text-[var(--muted)]">
              {item.name}
            </p>

            <p className="text-sm text-[var(--muted)]">
              {formatRupiahShort(item.current_revenue)}
            </p>

            <div>
              <div className="mb-1 flex items-center justify-between text-xs text-[var(--muted)]">
                <span>{item.revenue_share}%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-[var(--muted)]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${item.revenue_share / Number(data?.topRevenue) * 100}%`,
                    background: colorBgRevenueShare(item.revenue_share / Number(data?.topRevenue) * 100),
                  }}
                />
              </div>
            </div>

            <div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${
                  item.growth_percentage > 0
                    ? "bg-[var(--success)] text-[var(--popover)]"
                    : "bg-[var(--danger)] text-[var(--popover)]"
                }`}
              >
                {item.growth_percentage}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}