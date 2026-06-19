'use client'

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "../ui/card";
import { SectionLoader } from "../feedback/section-loader";
import { formatRupiahShort } from "@/lib/utils"
import { useRevenueTrendsQuery } from "@/hooks/queries/useRevenueQuery";
import { useDashboardFilters } from "@/hooks/params/useDashboardFilters";

export function RevenueTrendChart() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useRevenueTrendsQuery(requestParams);

  if (isLoading) return <SectionLoader />

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

  return (
    <Card className="h-[360px]">
      <div className="mb-8 flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Revenue trend & forecast
        </h3>

        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--chart-blue)]" />

            <span className="text-[var(--muted)]">
              Actual
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-[var(--muted)]" />

            <span className="text-[var(--muted)]">
              Forecast
            </span>
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height="82%">
        <LineChart data={data?.revenueTrend}>
          <CartesianGrid
            stroke="var(--muted)"
            vertical={false}
          />

          <XAxis
            dataKey="month"
            stroke="var(--muted)"
          />

          <YAxis
            tickFormatter={formatRupiahlabel}
            stroke="var(--muted)"
          />

          <Tooltip formatter={(value) => {
            const num = Number(value);
            return formatRupiahShort(num)
            }}
          />

          <Line
            type="monotone"
            dataKey="actual"
            stroke="var(--chart-blue)"
            strokeWidth={3}
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="forecast"
            stroke="var(--muted)"
            strokeWidth={3}
            strokeDasharray="6 6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}