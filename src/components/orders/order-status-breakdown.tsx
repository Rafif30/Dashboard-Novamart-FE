import { Card } from "../ui/card";
import { SectionLoader } from "@/components/feedback/section-loader";
import { useOrdersStatusQuery } from "@/hooks/queries/useOrdersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

const statusColors = {
  Delivered: "var(--success)",
  Shipped: "var(--primary)",
  Processing: "var(--warning)",
  Returned: "var(--danger)",
};

export function OrderStatusBreakdown() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useOrdersStatusQuery(requestParams)

  if (isLoading) return <SectionLoader />

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Order status breakdown
        </h3>

        <button className="rounded-full bg-[var(--chart-blue)] px-3 py-1 text-xs text-[var(--primary-foreground)]">
          Live
        </button>
      </div>

      <div className="space-y-6">
        {data?.ordersStatus?.orderStatusData.map((item) => (
          <div key={item.label}>
            <div className="mb-2 flex items-center justify-between">
              <p className="text-sm text-[var(--muted)]">
                {item.label}
              </p>

              <p
                className="text-sm"
                style={{
                  color: statusColors[item.label as unknown as keyof typeof statusColors],
                }}
              >
                {item.percentage.toFixed(2)}% · {item.value.toLocaleString()} orders
              </p>
            </div>
            <div className="h-10 overflow-hidden rounded-md bg-[var(--muted-foreground)]">
              <div
                className="flex h-full items-center px-4 text-sm font-medium text-[var(--primary-foreground)] transition-all duration-700 ease-out"
                style={{
                  width: `${item.percentage}%`,
                  background: statusColors[item.label as unknown as keyof typeof statusColors],
                }}
              >
                {item.value.toLocaleString()}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}