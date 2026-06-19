export interface KPIItem {
  value: number;
  delta: number | string;
  formatted: string;
  trend: "up" | "down";
  is_negative_metric: boolean;
}

export interface TopItem {
  id: string;
  name: number;
  current_revenue: number;
  revenue_share: number;
  previous_revenue: number;
  growth_percentage: number;
}

export interface MatrixItem {
  id: string;
  name: string;
  sku: string;
  category: string;
  revenue: number;
  revenue_formatted: string;
  units_sold: number;
  mom_delta: number;
  mom_formatted: string;
  mom_trend: 'up' | 'down' | 'flat';
  stock_quantity: number;
  stock_status: string;
}

export interface MatrixProductsItem {
  star: {
    label: string;
    description: string;
    count: number;
    products: MatrixItem[];
  };
  at_risk: {
    label: string;
    description: string;
    count: number;
    products: MatrixItem[];
  };
  rising: {
    label: string;
    description: string;
    count: number;
    products: MatrixItem[];
  };
  cash_cow: {
    label: string;
    description: string;
    count: number;
    products: MatrixItem[];
  };
  other: {
    label: string;
    description: string;
    count: number;
    products: MatrixItem[];
  };
}

export interface ProductsKPIResponse {
  period: {
    gte: string;
    lte: string;
  };
  total_skus_active: KPIItem
  sell_through_rate: KPIItem
  low_stock_alerts: KPIItem
  avg_product_rating: KPIItem
}

export interface ProductsTopItemResponse {
  period: {
    gte: string;
    lte: string;
  };
  topProducts: TopItem[];
  topRevenue: number;
}

export interface ProductsMatrixResponse {
  period: {
    gte: string;
    lte: string;
  };
  classification_rules: {
    median_revenue: number;
    rising_threshold: string;
    stable_threshold: string
  };
  products: MatrixProductsItem;
  total_classified: number;
}