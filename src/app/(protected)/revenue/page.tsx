'use client'

import { StatCard } from "@/components/ui/statCard"
import { RevenueTrendChart } from "@/components/revenue/revenue-trend-chart";
import { RevenueChannelTable } from "@/components/revenue/revenue-channel-table";
import { RevenueCategoryChart } from "@/components/revenue/revenue-category-chart";

import { useRevenueKpisQuery } from "@/hooks/queries/useRevenueQuery";
import { useDashboardFilters } from "@/hooks/params/useDashboardFilters";

import { formatRupiahShort } from "@/lib/utils"

export default function RevenuePage() {
    const requestParams = useDashboardFilters()
    const { data: revenueKpi, isLoading: revenueKpiLoading } = useRevenueKpisQuery(requestParams);

  return (
      <div className="space-y-6">
          <div className="grid grid-cols-3 gap-5">
              <StatCard 
                value={formatRupiahShort(Number(revenueKpi?.revenueYtd.value))} 
                isLoading={revenueKpiLoading} 
                change={`${revenueKpi?.revenueYtd.delta.toFixed(3).toString()}% vs Same Period Last Year`} 
                trend={revenueKpi?.revenueYtd.trend}
                isNegativeMetric={revenueKpi?.revenueYtd.is_negative_metric ?? false}
                title="Total revenue (YTD)"
                />
                <StatCard 
                value={revenueKpi?.avgOrderValue.formatted} 
                isLoading={revenueKpiLoading} 
                change={`${revenueKpi?.avgOrderValue.delta?.toFixed(3).toString()}% vs Last Period`} 
                trend={revenueKpi?.avgOrderValue.trend}
                isNegativeMetric={revenueKpi?.avgOrderValue.is_negative_metric ?? false}
                title="Avg. order value"
                />
                <StatCard 
                value={revenueKpi?.grossMargin.formatted} 
                isLoading={revenueKpiLoading} 
                change={`${revenueKpi?.grossMargin.delta.toFixed(3).toString()}pp vs Last Period`} 
                trend={revenueKpi?.grossMargin.trend}
                isNegativeMetric={revenueKpi?.grossMargin.is_negative_metric ?? false}
                title="Gross margin"
                />
          </div>

          <RevenueTrendChart />

          <div className="grid grid-cols-2 gap-5">
              <RevenueChannelTable />

              <RevenueCategoryChart />
          </div>
      </div>
  );
}