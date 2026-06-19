import { Card } from "../ui/card";
import { SectionLoader } from "../feedback/section-loader";
import { formatRupiahShort } from "@/lib/utils";
import { useOrdersTopItems, useOrdersByDaysQuery } from "@/hooks/queries/useOrdersQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'
import { useAuth } from "@/hooks/auth/useAuth";

export function OrdersByDay() {
  const requestParams = useDashboardFilters()
  const auth = useAuth()
  const { data: dataOrders, isLoading: dataOrdersLoading } = useOrdersByDaysQuery(requestParams)
  const { data: dataTopItems, isLoading: dataTopItemsLoading } = useOrdersTopItems(requestParams, auth.user?.role === 'ANALYST_REGION')

  if (dataOrdersLoading || dataTopItemsLoading) return <SectionLoader />


  return (
    <Card>
      <h3 className="mb-6 text-lg font-semibold">
        Orders by day of week
      </h3>

      <div className="mb-8 grid grid-cols-7 gap-2">
        {dataOrders?.totalOrdersByDay?.map((item) => (
          <div key={item.day_name.trim()}>
            <div 
                className='flex h-14 items-center text-center justify-center rounded-lg text-sm font-semibold text-[var(--primary-foreground)] bg-[var(--primary)] transition-opacity duration-700 ease-out'
            >   
              {auth.user?.role === 'ANALYST_REGION' ? (
                <>
                {item.percentage}%
                </>
                ) : (
                  <>
                  {item.total_orders}
                  </>
                )}
            </div>

            <p className="mt-2 text-center text-xs text-[var(--muted)]">
              {item.day_name.trim().slice(0, 3)}
            </p>
          </div>
        ))}
      </div>

      <div>
        <h4 className="mb-4 text-base font-medium text-[var(--muted)]">
          Top {auth.user?.role === 'ANALYST_REGION' ? 'Channel' : 'Regions'}
        </h4>

        <div className="space-y-4">
          <div className="grid grid-cols-3 text-sm text-[var(--muted)]">
            <p>{auth.user?.role === 'ANALYST_REGION' ? 'Channel' : 'Regions'}</p>
            <p>Orders</p>
            <p>Revenue</p>
          </div>

          {dataTopItems?.topItems?.map((item) => (
            <div
              key={item.name}
              className="grid grid-cols-3 border-t border-white/5 pt-4 text-sm"
            >
              <p className="text-[var(--muted)]">
                {item.name.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </p>

              <p className="text-[var(--muted)]">
                {item.total_orders}
              </p>

              <p className="text-[var(--muted)]">
                {formatRupiahShort(item.total_revenue)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}