
import { JSX } from "react";
import { SectionLoader } from "../feedback/section-loader";
import { formatRupiahShort } from "@/lib/utils";
import { useProductsMatrixQuery } from "@/hooks/queries/useProductsQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'
import { Card } from "../ui/card";

export function ProductMatrix() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useProductsMatrixQuery(requestParams)

  if (isLoading) return <SectionLoader />

  const ListProduct = ({ name, mom_trend, revenue, mom_formatted }: {
    name: string;
    revenue: number;
    mom_formatted: string;
    mom_trend: 'up' | 'down' | 'flat';
  }): JSX.Element | JSX.Element[] => (
    <div className="rounded-xl border border-[var(--muted-foreground)] bg-[var(--secondary)]/30 p-3">
      <p className="text-sm font-medium text-[var(--foreground)]">
        {name}
      </p>

      <p
        className={`mt-1 text-xs ${
          mom_trend == 'up'
            ? "text-[var(--success)]"
            : "text-[var(--danger)]"
        }`}
      >
        {formatRupiahShort(revenue)} · {mom_formatted} MoM
      </p>
    </div>
  )

  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold">
        Product matrix
      </h3>

      <div className="grid grid-cols-2 gap-4">
        <div
          className={`rounded-2xl border border-[var(--muted-foreground)] bg-[var(--background)]/30 p-4 ${!data?.products.star.products.length ? 'hidden' : ''}`}
        >
          <div
            className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: 'var(--chart-lime)',
              color: 'var(--chart-lime-foreground)',
            }}
          >
            Star - {data?.products.star.description}
          </div>

            <div className="space-y-3">
              {data?.products.star.products.map((item) => (
                <ListProduct key={item.id} name={item.name} mom_trend={item.mom_trend} revenue={item.revenue} mom_formatted={item.mom_formatted} />
              ))}
            </div>
        </div>
        <div
          className={`rounded-2xl border border-[var(--muted-foreground)] bg-[var(--background)]/30 p-4 ${!data?.products.at_risk.products.length ? 'hidden' : ''}`}
        >
          <div
            className='mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium'
            style={{
              background: 'var(--chart-red)',
              color: 'var(--chart-red-foreground)',
            }}
          >
            At risk - {data?.products.at_risk.description}
          </div>

            <div className="space-y-3">
              {data?.products.at_risk.products.map((item) => (
                <ListProduct key={item.id} name={item.name} mom_trend={item.mom_trend} revenue={item.revenue} mom_formatted={item.mom_formatted} />
              ))}
            </div>
        </div>
        <div
          className={`rounded-2xl border border-[var(--muted-foreground)] bg-[var(--background)]/30 p-4 ${!data?.products.rising.products.length ? 'hidden' : ''}`}
        >
          <div
            className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: 'var(--chart-blue)',
              color: 'var(--chart-blue-foreground)',
            }}
          >
            Rising - {data?.products.rising.description}
          </div>

            <div className="space-y-3">
              {data?.products.rising.products.map((item) => (
                <ListProduct key={item.id} name={item.name} mom_trend={item.mom_trend} revenue={item.revenue} mom_formatted={item.mom_formatted} />
              ))}
            </div>
        </div>
        <div
          className={`rounded-2xl border border-[var(--muted-foreground)] bg-[var(--background)]/30 p-4 ${!data?.products.cash_cow.products.length ? 'hidden' : ''}`}
        >
          <div
            className="mb-4 inline-flex rounded-full px-3 py-1 text-xs font-medium"
            style={{
              background: 'var(--chart-amber)',
              color: 'var(--chart-amber-foreground)',
            }}
          >
            Cash cows - {data?.products.cash_cow.description}
          </div>

            <div className="space-y-3">
              {data?.products.cash_cow.products.map((item) => (
                <ListProduct key={item.id} name={item.name} mom_trend={item.mom_trend} revenue={item.revenue} mom_formatted={item.mom_formatted} />
              ))}
            </div>
        </div>
      </div>
    </Card>
  );
}