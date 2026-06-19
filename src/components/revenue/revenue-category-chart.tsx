'use client'

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { getChartColorByIndex } from "@/lib/utils"
import { SectionLoader } from "../feedback/section-loader";
import { Card } from "../ui/card";
import { formatRupiahShort } from "@/lib/utils"
import { useRevenueCategoryQuery } from "@/hooks/queries/useRevenueQuery";
import { useDashboardFilters } from "@/hooks/params/useDashboardFilters";

export function RevenueCategoryChart() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useRevenueCategoryQuery(requestParams);

  const formatRupiahLabel = (value: number) => {
    if (value >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(0)} M`;
    }

    if (value >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    }

    if (value >= 1_000) {
      return `Rp ${(value / 1_000).toFixed(0)} Rb`;
    }

    return `Rp ${value}`;
  };

  if (isLoading) return <SectionLoader />;

  return (
    <Card>
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Revenue by category
        </h3>

        <button className="rounded-full bg-[var(--chart-lime)] px-3 py-1 text-xs text-[var(--chart-lime-foreground)]">
          Top 5
        </button>
      </div>

      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data?.revenueCategory}>
            <XAxis
              dataKey="category"
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              tickFormatter={formatRupiahLabel}
              stroke="var(--muted)"
              tickLine={false}
              axisLine={false}
            />

            <Tooltip formatter={(value) => {
                const num = Number(value);
                return formatRupiahShort(num)
              }}
            />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
            >
              {data?.revenueCategory.map((entry, index) => (
                <Cell
                  key={entry.category}
                  fill={getChartColorByIndex(index).color}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}