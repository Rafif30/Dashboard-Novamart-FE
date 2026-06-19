"use client";

import { Pie, PieChart, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { SectionLoader } from "../feedback/section-loader";
import { getChartColorByIndex } from "@/lib/utils";
import { Card } from "../ui/card";
import { useRevenueChartDataQuery } from "@/hooks/queries/useOverviewQuery";
import { useDashboardFilters } from '@/hooks/params/useDashboardFilters'

export function RevenueChannel() {
  const requestParams = useDashboardFilters()
  const { data, isLoading } = useRevenueChartDataQuery(requestParams);
  const wrapper = {
    top: '50%',
    right: 0,
    transform: 'translate(0, -50%)',
    lineHeight: '24px',
  };

  if (isLoading) {
    return <SectionLoader />;
  }

  const convertChartData = data?.donutChart.map((dataItem, index) => ({
    name: dataItem.channel.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' '),
    value: dataItem.percentage,
    fill: getChartColorByIndex(index).color,
  }))

  return (
    <Card className="h-[320px]">
      <h3 className="mb-6 text-lg font-semibold">
        Revenue by channel
      </h3>

      <ResponsiveContainer width="100%" height="85%">
        <PieChart>
          <Pie
            data={convertChartData}
            dataKey="value"
            innerRadius={55}
            outerRadius={80}
          />
          <Legend iconSize={10} layout="vertical" verticalAlign="middle" wrapperStyle={wrapper} />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
}