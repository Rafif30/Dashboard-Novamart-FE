'use client';

import { StatCard } from "@/components/ui/statCard"
import { CustomerSegments } from "@/components/overview/customer-segments";
import { RevenueChannel } from "@/components/overview/revenue-channel";
import { RevenueChart } from "@/components/overview/revenue-chart";
import { TopProducts } from "@/components/overview/top-products";

import { useOverviewQuery } from "@/hooks/queries/useOverviewQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

import { formatRupiahShort } from "@/lib/utils"


export default function Home() {
  const filters = useDashboardFilters()
  const { data: overviewKPIs, isLoading: overViewLoading } = useOverviewQuery(filters);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-5">
        <StatCard 
          value={formatRupiahShort(Number(overviewKPIs?.kpis.revenue.value))} 
          isLoading={overViewLoading} 
          change={`${overviewKPIs?.kpis.revenue.delta.toFixed(3).toString()}% vs Last Period`} 
          trend={overviewKPIs?.kpis.revenue.trend}
          isNegativeMetric={overviewKPIs?.kpis.revenue.is_negative_metric ?? false}
          title="Total Revenue"
        />
        <StatCard 
          value={overviewKPIs?.kpis.orders.formatted} 
          isLoading={overViewLoading} 
          change={`${overviewKPIs?.kpis.orders.delta.toFixed(3).toString()}% vs Last Period`} 
          trend={overviewKPIs?.kpis.orders.trend}
          isNegativeMetric={overviewKPIs?.kpis.orders.is_negative_metric ?? false}
          title="Total Orders"
        />
        <StatCard 
          value={overviewKPIs?.kpis.active_customers.formatted} 
          isLoading={overViewLoading} 
          change={`${overviewKPIs?.kpis.active_customers.delta.toFixed(3).toString()}% vs Last Period`} 
          trend={overviewKPIs?.kpis.active_customers.trend}
          isNegativeMetric={overviewKPIs?.kpis.active_customers.is_negative_metric ?? false}
          title="Active Customers"
        />
        <StatCard 
          value={overviewKPIs?.kpis.return_rate.formatted} 
          isLoading={overViewLoading} 
          change={`${overviewKPIs?.kpis.return_rate.delta.toFixed(3).toString()}% vs Last Period`} 
          trend={overviewKPIs?.kpis.return_rate.trend}
          isNegativeMetric={overviewKPIs?.kpis.return_rate.is_negative_metric ?? false}
          title="Return Rate"
        />
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="col-span-2">
          <RevenueChart />
        </div>

        <RevenueChannel />
      </div>

      <div className="grid grid-cols-2 gap-5">
        <TopProducts />
        <CustomerSegments />
      </div>
    </div>
  );
}
