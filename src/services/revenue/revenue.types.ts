export interface KPIItem {
  value: number;
  delta: number;
  formatted: string;
  trend: "up" | "down";
  is_negative_metric: boolean;
}

export interface ChannelItem {
  channel: string;
  value: number;
  formattedValue: string;
  growth: string;
  share: number;
}

export interface CategoryItem {
  category: string;
  value: number;
  formatted: string;
}

export interface TrendItem {
  month: string;
  actual: number | null;
  forecast: number | null;
}

export interface RevenueKPIResponse {
  period: {
    gte: string;
    lte: string;
  };
  revenueYtd: KPIItem;
  avgOrderValue: KPIItem;
  grossMargin: KPIItem;
}

export interface RevenueChannelResponse {
  period: {
    gte: string;
    lte: string;
  };
  revenueByChannel: ChannelItem[]
}

export interface RevenueCategoryResponse {
  period: {
    gte: string;
    lte: string;
  };
  revenueCategory: CategoryItem[]
}

export interface RevenueTrendsResponse {
  period: {
    gte: string;
    lte: string;
  };
  revenueTrend: TrendItem[]
}