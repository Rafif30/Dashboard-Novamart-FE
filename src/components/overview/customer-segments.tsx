'use client'

import { Card } from "../ui/card";
import { SectionLoader } from "../feedback/section-loader";
import { formatRupiahShort } from '@/lib/utils'
import { useCustomerSegmentsQuery } from "@/hooks/queries/useOverviewQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export function CustomerSegments() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useCustomerSegmentsQuery(requestParams);
  if (isLoading) return <SectionLoader />;

  return (
    <Card>
      <h3 className="mb-5 text-lg font-semibold">
        Customer segments
      </h3>

      <div className="space-y-6">
        {/* Header */}
        <div className="grid grid-cols-[1fr_120px_140px_0.5fr] items-center border-b border-[var(--muted)]/30 pb-2 text-sm text-[var(--muted)]">
            <p>Segment Customers</p>
            <p className="text-right">Total Customers</p>
            <p className="text-right">Avg. LTV</p>
            <p className="text-right">Total Revenue</p>
        </div>

        {data?.segments?.map((item) => (
            <div
            key={item.segment}
            className="grid grid-cols-[1fr_120px_140px_0.5fr] items-center gap-3 border-b border-[var(--muted)]/30 pb-4"
            >
            {/* Segment */}
            <div>
                <p className="text-sm">{item.segment.split('_').join(' ')}</p>

                <p className="text-xs text-[var(--muted)]">
                {item.segment.split('_').join(' ')} customers
                </p>
            </div>

            {/* Total Customers */}
            <p className="text-right text-sm text-[var(--muted)]">
                {item.count} Customers
            </p>

            {/* LTV */}
            <p className="text-right text-sm text-[var(--muted)]">
                {formatRupiahShort(item.avg_ltv)}
            </p>
            
            {/* Revenue */}
            <p className="text-right text-sm text-[var(--muted)]">
                {formatRupiahShort(item.total_revenue)}
            </p>
            </div>
        ))}
        </div>
    </Card>
  );
}