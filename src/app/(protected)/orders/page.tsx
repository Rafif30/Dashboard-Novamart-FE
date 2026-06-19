'use client'

import { StatCard } from "@/components/ui/statCard"
import { OrderStatusBreakdown } from "@/components/orders/order-status-breakdown";
import { OrdersByDay } from "@/components/orders/orders-by-day";
import { RecentOrderActivity } from "@/components/orders/recent-order-activity";
import { useOrdersKpisQuery } from "@/hooks/queries/useOrdersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export default function OrdersPage() {
    const requestParams = useDashboardFilters()
    const { data: ordersKpi, isLoading: ordersKpiLoading } = useOrdersKpisQuery(requestParams);

  return (
      <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
              <StatCard
                  value={ordersKpi?.totalOrders.formatted}
                  isLoading={ordersKpiLoading}
                  change={`${ordersKpi?.totalOrders.delta.toFixed(3).toString()}% vs last period`}
                  trend={ordersKpi?.totalOrders.trend}
                  isNegativeMetric={ordersKpi?.totalOrders.is_negative_metric ?? false}
                  title="Total orders"
              />
              <StatCard
                  value={ordersKpi?.fulfillmentRate.formatted}
                  isLoading={ordersKpiLoading}
                  change={`${ordersKpi?.fulfillmentRate.delta.toFixed(3).toString()}% vs Last Period`}
                  trend={ordersKpi?.fulfillmentRate.trend}
                  isNegativeMetric={ordersKpi?.fulfillmentRate.is_negative_metric ?? false}
                  title="Fulfillment rate"
              />
              <StatCard
                  value={ordersKpi?.avgDeliveryTime.formatted}
                  isLoading={ordersKpiLoading}
                  change={`${ordersKpi?.avgDeliveryTime.delta.toFixed(3).toString()} days ${ordersKpi?.avgDeliveryTime.trend == 'down' ? 'faster': 'slower'}`}
                  trend={ordersKpi?.avgDeliveryTime.trend}
                  isNegativeMetric={ordersKpi?.avgDeliveryTime.is_negative_metric ?? false}
                  title="Avg. delivery time"
              />
              <StatCard
                  value={ordersKpi?.returnRate.formatted}
                  isLoading={ordersKpiLoading}
                  change={`${ordersKpi?.returnRate.delta.toFixed(3).toString()} pp vs Last Period`}
                  trend={ordersKpi?.returnRate.trend}
                  isNegativeMetric={ordersKpi?.returnRate.is_negative_metric ?? false}
                  title="Return rate"
              />
          </div>

          <div className="grid grid-cols-2 gap-5">
              <OrderStatusBreakdown />

              <OrdersByDay />
          </div>

          <RecentOrderActivity />
      </div>
  );
}