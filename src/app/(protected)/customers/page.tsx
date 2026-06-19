'use client'

import { StatCard } from "@/components/ui/statCard"
import { CustomerSegmentCard } from "@/components/customers/customer-segment-card";
import { RetentionCohort } from "@/components/customers/retention-cohort";
import { useCustomersKpisQuery } from "@/hooks/queries/useCustomersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export default function CustomersPage() {
  const requestParams = useDashboardFilters()
  const { data: customersKpis, isLoading: customersKpisLoading } = useCustomersKpisQuery(requestParams)

  return (
      <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
              <StatCard
                value={customersKpis?.totalCustomers.formatted}
                isLoading={customersKpisLoading}
                change={`${customersKpis?.totalCustomers.delta.toFixed(3).toString()}% vs last period`}
                trend={customersKpis?.totalCustomers.trend}
                isNegativeMetric={customersKpis?.totalCustomers.is_negative_metric ?? false}
                title="Total customers"
              />
              <StatCard
                value={customersKpis?.avgLtvCustomers.formatted}
                isLoading={customersKpisLoading}
                change={`${customersKpis?.avgLtvCustomers.delta.toFixed(3).toString()}% vs last period`}
                trend={customersKpis?.avgLtvCustomers.trend}
                isNegativeMetric={customersKpis?.avgLtvCustomers.is_negative_metric ?? false}
                title="Avg. LTV"
              />
              <StatCard
                value={customersKpis?.churnRateCustomers.formatted}
                isLoading={customersKpisLoading}
                change={`${customersKpis?.churnRateCustomers.delta.toFixed(3).toString()}pp vs last period`}
                trend={customersKpis?.churnRateCustomers.trend}
                isNegativeMetric={customersKpis?.churnRateCustomers.is_negative_metric ?? false}
                title="Churn rate"
              />
              <StatCard
                value={customersKpis?.repeatPurchaseRate.formatted}
                isLoading={customersKpisLoading}
                change={`${customersKpis?.repeatPurchaseRate.delta.toFixed(3).toString()}pp vs last period`}
                trend={customersKpis?.repeatPurchaseRate.trend}
                isNegativeMetric={customersKpis?.repeatPurchaseRate.is_negative_metric ?? false}
                title="Repeat purchase rate"
              />
          </div>

          <div className="grid grid-cols-2 gap-5">
              <CustomerSegmentCard />

              <RetentionCohort />
          </div>
      </div>
  );
}