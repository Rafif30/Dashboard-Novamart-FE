import { ProgressBar } from "../ui/progressBar";
import { SectionLoader } from "../feedback/section-loader";
import { Card } from "../ui/card";
import { formatRupiahShort } from "@/lib/utils"
import { useTopProductsQuery } from "@/hooks/queries/useOverviewQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'


export function TopProducts() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useTopProductsQuery(requestParams);
  if (isLoading) return <SectionLoader />;
  
  return (
    <Card>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Top products</h3>

        <button className="rounded-full bg-[var(--chart-lime)] text-[var(--chart-lime-foreground)] px-3 py-1 text-xs">
          by revenue
        </button>
      </div>

      <div className="space-y-5">
        <div>
            <div className="mb-2 flex items-center justify-between text-sm border-b-2 pb-2 border-gray-200/30">
              <span className="text-[var(--muted)]">Product</span>

              <div className="flex gap-4 text-[var(--muted)]">
                <span>revenue</span>
                <span>units</span>
                <span>share</span>
              </div>
            </div>
          </div>
        {data?.topProducts.map((product) => (
          <div key={product.id} className="border-b-2 pb-4 border-gray-200/30">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-[var(--muted)]">{product.name}</span>

              <div className="flex gap-4 text-[var(--muted)]">
                <span>{formatRupiahShort(product.revenue)}</span>
                <span>{product.units_sold}</span>
                <span>{product.revenue_share}%</span>
              </div>
            </div>
            <ProgressBar value={product.revenue_share} className="mx-auto"/>
          </div>
        ))}
      </div>
    </Card>
  );
}