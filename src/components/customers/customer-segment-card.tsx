import { Card } from "../ui/card";
import { getColorClassName, formatRupiahShortNoDecimal, AvailableColorOptionsKeys } from "@/lib/utils";
import { ProgressBar } from "../ui/progressBar";
import { SectionLoader } from "@/components/feedback/section-loader";
import { useCustomersSegmentsQuery } from "@/hooks/queries/useCustomersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

const segmentValue = {
  'VIP': {
    description: 'LTV > Rp. 50 Jta · Freq > 8x/yr',
    color: 'lime' as AvailableColorOptionsKeys
  },
  'Loyal': {
    description: 'LTV Rp. 25 - 50 Jta · Freq > 4-7x/yr',
    color: 'blue' as AvailableColorOptionsKeys
  },
  'Occasional': {
    description: 'LTV Rp. 10 - 25 Jta · Freq > 1-3x/yr',
    color: 'amber' as AvailableColorOptionsKeys
  },
  'At Risk': {
    description: 'LTV Rp. 0 - 10 Jta · Freq > 0-2x/yr',
    color: 'red' as AvailableColorOptionsKeys
  },
}

export function CustomerSegmentCard() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useCustomersSegmentsQuery(requestParams)

  if (isLoading) return <SectionLoader />

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold">
        Customer segments
      </h3>

      <div className="space-y-4">
        {data?.customerSegment?.map((segment) => (
          <div
            key={segment.segment}
            className="rounded-2xl border border-[var(--border)]/10 bg-[var(--accent)]/40 p-4"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex flex-1 gap-4">
                <div
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                  style={{
                    background: `${getColorClassName(segmentValue[segment.segment].color, 'color')}20`,
                    color: getColorClassName(segmentValue[segment.segment].color, 'color'),
                  }}
                >
                  ★
                </div>

                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="text-base font-medium text-[var(--muted)]">
                        {segment.segment}
                      </h4>

                      <p className="mt-1 text-sm text-[var(--muted)]">
                        {segmentValue[segment.segment].description}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-semibold text-[var(--foreground)]">
                        {segment.totalCustomer}
                      </p>

                      <p className="text-xs text-[var(--muted)]">
                        customers
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-4">
                    <ProgressBar value={segment.percentageCustomer} color={segmentValue[segment.segment].color} />

                    <div className="w-[70px] text-right">
                      <p className="text-xs text-[var(--muted)]">
                        Avg LTV
                      </p>

                      <p className="text-sm font-medium text-[var(--foreground)]">
                        {formatRupiahShortNoDecimal(segment.avgLtv)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}