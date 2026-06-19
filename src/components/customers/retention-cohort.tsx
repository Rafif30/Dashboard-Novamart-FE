import { Card } from "../ui/card";
import { cx, getChartColorByIndex } from "@/lib/utils";
import { useCustomersCohortsQuery, useCustomersNewReturningQuery } from "@/hooks/queries/useCustomersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'
import { SectionLoader } from "../feedback/section-loader";

export function RetentionCohort() {
  const requestParams = useDashboardFilters()
  const { data: dataCohorts, isLoading: dataCohortsLoading } = useCustomersCohortsQuery(requestParams)
  const { data, isLoading } = useCustomersNewReturningQuery(requestParams)

  if (dataCohortsLoading || isLoading) return <SectionLoader/>
  
  const dataNewReturning = data ? [data?.newCustomers, data?.returnCustomers] : []

  const formatMonthLabel = (date: string | Date) => new Date(date).toLocaleDateString('id-ID', {
    month: 'short',
  });
  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Retention cohort (periode)
        </h3>

        <button className="rounded-full bg-[var(--chart-amber)] px-3 py-1 text-xs text-[var(--primary-foreground)]">
          % retained
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-[var(--muted)]">
              <th className="pb-4 font-medium">
                Cohort
              </th>

              <th className="pb-4 font-medium">M0</th>
              <th className="pb-4 font-medium">M1</th>
              <th className="pb-4 font-medium">M2</th>
            </tr>
          </thead>

          <tbody>
            {dataCohorts?.cohorts?.map((row) => (
              <tr key={row.cohort}>
                <td className="py-2 text-sm text-[var(--muted)]">
                  {formatMonthLabel(row.cohort)}
                </td>

                {["m0", "m1", "m2"].map(
                  (key) => {
                    const value =
                      row[
                        key as keyof typeof row
                      ];

                    return (
                      <td
                        key={key}
                        className="py-2"
                      >
                        {value ? (
                          <div
                            className="flex h-8 w-14 items-center justify-center rounded-md text-xs font-medium text-[var(--primary-foreground)]"
                            style={{
                              background: `rgba(59,130,246,${Number(
                                value
                              ) / 100})`,
                            }}
                          >
                            {Number(value).toFixed(0)}%
                          </div>
                        ) : null}
                      </td>
                    );
                  }
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h4 className="mb-4 text-sm font-medium text-[var(--muted)]">
          New vs returning
        </h4>

        <div className="flex h-12 overflow-hidden rounded-xl">
          {dataNewReturning?.map((item, index) => (
            <div
              key={item?.label}
              className={cx("flex items-center justify-center text-sm text-center font-medium text-[var(--primary-foreground)]", getChartColorByIndex(index).bg, `${item.percentage == 0 ? 'hidden' : ''}`)}
              style={{
                width: `${item?.percentage}%`,
              }}
            >
              {item?.label} {item?.percentage.toFixed(0)}%
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}