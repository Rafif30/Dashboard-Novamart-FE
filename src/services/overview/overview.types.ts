export interface KPIItem {
  value: number;
  delta: number;
  formatted: string;
  trend: "up" | "down";
  is_negative_metric: boolean;
}

export interface OverviewKPIResponse {
  period: {
    gte: string;
    lte: string;
  };
  kpis: {
    revenue: KPIItem;
    orders: KPIItem;
    active_customers: KPIItem;
    return_rate: KPIItem;
  };
}

export interface BarChartDataItem {
  month: string;
  label: string;
  revenue: number;
  target: number;
}

export interface DonutChartDataItem {
  channel: string;
  revenue: number;
  formatted: string;
  orders: number;
  percentage: number;
}

export interface RevenueChartDataResponse {
  period: {
    gte: string;
    lte: string;
  };

  barChart: BarChartDataItem[];
  donutChart: DonutChartDataItem[];
}

export interface TopProductItem {
  rank: number;
  id: string;
  name: string;
  sku: string;
  category_name: string;
  revenue: number;
  revenue_formatted: string;
  revenue_share: number;
  units_sold: number;
  order_count: number;
  stock_quantity: number;
  stock_status: string;
  rating: number;
}

export interface TopProductsResponse {
  period: {
    gte: string;
    lte: string;
  };
  topProducts: TopProductItem[];
}

export interface CustomerSegmentItem {
  segment: string;
  count: number;
  avg_ltv: number,
  total_revenue: number,
}

export interface CustomerSegmentsResponse {
  period: {
    gte: string;
    lte: string;
  }
  segments: CustomerSegmentItem[];
}