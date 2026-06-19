import { Card } from "../ui/card";
import { SectionLoader } from "../feedback/section-loader";
import { format } from "date-fns";
import { useOrdersRecentlyQuery } from "@/hooks/queries/useOrdersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'


const statusColors = {
  Delivered: "bg-[var(--chart-lime)] text-[var(--chart-lime-foreground)]",
  Shipped: "bg-[var(--chart-blue)] text-[var(--chart-blue-foreground)]",
  Processing: "bg-[var(--chart-yellow)] text-[var(--chart-yellow-foreground)]",
  Returned: "bg-[var(--chart-red)] text-[var(--chart-red-foreground)] ",
};


export function RecentOrderActivity() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useOrdersRecentlyQuery(requestParams)

  if (isLoading) return <SectionLoader />

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Recent order activity
        </h3>

        <button className="rounded-full bg-[var(--primary)]/60 px-3 py-1 text-xs text-[var(--primary-foreground)]">
          Last 5 orders
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px]">
          <thead>
            <tr className="border-b border-white/10 text-left text-sm text-[var(--muted)]">
              <th className="pb-4 font-medium">Order ID</th>
              <th className="pb-4 font-medium">Customer</th>
              <th className="pb-4 font-medium">Product</th>
              <th className="pb-4 font-medium">Value</th>
              <th className="pb-4 font-medium">Date</th>
              <th className="pb-4 font-medium">Status</th>
            </tr>
          </thead>

          <tbody>
            {data?.recentOrders?.map((order) => (
              <tr
                key={order.order_id}
                className="border-b border-white/5"
              >
                <td className="py-4 text-[var(--muted)]">
                  #{order.order_id.slice(30)}
                </td>

                <td className="py-4 text-[var(--muted)]">
                  {order.customer_name}
                </td>

                <td className="py-4 text-[var(--muted)]">
                  {order.products}
                </td>

                <td className="py-4 text-[var(--muted)]">
                  {order.revenue_formatted}
                </td>

                <td className="py-4 text-[var(--muted)]">
                  {format(order.ordered_date, 'yyyy MMM dd')}
                </td>

                <td className="py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      statusColors[
                        order.status.charAt(0).toUpperCase() + order.status.slice(1) as keyof typeof statusColors
                      ]
                    }`}
                  >
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}