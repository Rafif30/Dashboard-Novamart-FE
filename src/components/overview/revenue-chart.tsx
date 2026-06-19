"use client";

import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { SectionLoader } from "../feedback/section-loader";
import { Card } from "../ui/card";
import { useDateRangeStore } from "@/stores/range-date-store";
import { formatRupiahShort } from "@/lib/utils"
import { useRevenueChartDataQuery } from "@/hooks/queries/useOverviewQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export function RevenueChart() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useRevenueChartDataQuery(requestParams);

  const { year } = useDateRangeStore();
  
  const formatRupiahlabel = (value: number) => {
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

  if (isLoading) {
    return <SectionLoader />;
  }
  
  return (
    <Card className="h-[320px]">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Monthly Revenue Trend (YTD) vs Target
        </h3>

        <div className="flex gap-2">
          <button
            className='rounded-lg px-3 py-1 text-xs bg-[var(--chart-blue)] text-[var(--chart-blue-foreground)]'
          >
            {year}
          </button>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="85%">
        <LineChart data={data?.barChart}>
          <XAxis dataKey="label" stroke="var(--chart-gray)" />
          <YAxis tickFormatter={formatRupiahlabel} stroke="var(--chart-gray)" />
          <Tooltip formatter={(value) => {
            const num = Number(value);
            return formatRupiahShort(num)
          }
          }
         />

          <Line
            type="monotone"
            dataKey="revenue"
            stroke="var(--chart-blue)"
            strokeWidth={3}
          />

          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--chart-gray)"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}