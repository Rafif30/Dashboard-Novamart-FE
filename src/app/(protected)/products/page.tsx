'use client'

import { StatCard } from "@/components/ui/statCard";
import { ProductMatrix } from "@/components/products/product-matrix";
import { TopProductsRevenue } from "@/components/products/top-products-revenue";
import { useProductsKpisQuery } from "@/hooks/queries/useProductsQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export default function ProductsPage() {
  const requestParams = useDashboardFilters()
  const { data: productsKpis, isLoading: productsKpisLoading } = useProductsKpisQuery(requestParams)

  return (
      <div className="space-y-6">
          <div className="grid grid-cols-4 gap-5">
              <StatCard 
                value={productsKpis?.total_skus_active.formatted} 
                isLoading={productsKpisLoading} 
                change={String(productsKpis?.total_skus_active.delta)} 
                trend={productsKpis?.total_skus_active.trend}
                isNegativeMetric={productsKpis?.total_skus_active.is_negative_metric ?? false}
                title="Total SKUs active"
              />
              <StatCard 
                value={productsKpis?.sell_through_rate.formatted} 
                isLoading={productsKpisLoading} 
                change={`${Number(productsKpis?.sell_through_rate.delta).toFixed(2)}% healthy`} 
                trend={productsKpis?.sell_through_rate.trend}
                isNegativeMetric={productsKpis?.sell_through_rate.is_negative_metric ?? false}
                title="Avg. sell-through rate"
              />
              <StatCard 
                value={productsKpis?.low_stock_alerts.formatted} 
                isLoading={productsKpisLoading} 
                change={Number(productsKpis?.low_stock_alerts.value) > 0 ? 'needs restock action' : 'all stocks healthy' } 
                trend={productsKpis?.low_stock_alerts.trend}
                isNegativeMetric={productsKpis?.low_stock_alerts.is_negative_metric ?? false}
                title="Low-stock alerts"
              />
              <StatCard 
                value={productsKpis?.avg_product_rating.formatted} 
                isLoading={productsKpisLoading} 
                change={productsKpis?.avg_product_rating.trend === 'up' ? 'stable & positive' : 'need review'} 
                trend={productsKpis?.avg_product_rating.trend}
                isNegativeMetric={productsKpis?.avg_product_rating.is_negative_metric ?? false}
                title="Avg. product rating"
              />
          </div>

          <div className="grid grid-cols-2 gap-5">
              <TopProductsRevenue />

              <ProductMatrix />
          </div>
      </div>
  );
}