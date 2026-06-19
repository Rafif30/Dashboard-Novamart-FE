export interface KPIItem {
  value: number;
  delta: number;
  formatted: string;
  trend: "up" | "down";
  is_negative_metric: boolean;
}

export interface OrdersStatusItem {
  label: string;
  value: number;
  percentage: number;
}

export interface OrdersRecentlyItem {
  order_id: string;
  products: string;
  revenue: number;
  revenue_formatted: string;
  customer_name: string;
  ordered_date: string;
  status: 'delivered' | 'shipped' | 'processing' | 'returned'
}

export interface OrdersByDaysWeekItem { 
  day_name: string;
  total_orders: number; 
  total_revenue: number
  percentage: string | number
}

export interface OrdersTopItem {
  region_id: string;
  name: string;
  total_orders: number;
  total_revenue: number;
}

export interface OrdersKPIResponse {
  period: {
    gte: string;
    lte: string;
  };
  totalOrders: KPIItem;
  fulfillmentRate: KPIItem;
  avgDeliveryTime: KPIItem;
  returnRate: KPIItem;
}

export interface OrdersStatusResponse {
  period: {
    gte: string;
    lte: string;
  };
  ordersStatus: {
    totalOrders: number;
    orderStatusData: OrdersStatusItem[]
  };
}

export interface OrdersRecentlyResponse {
  period: {
    gte: string;
    lte: string;
  };
  recentOrders: OrdersRecentlyItem[]
}

export interface OrdersTotalByDayResponse {
  period: {
    gte: string;
    lte: string;
  };
  totalOrdersByDay: OrdersByDaysWeekItem[]
}

export interface OrdersTopResponse {
  period: {
    gte: string;
    lte: string;
  };
  topItems: OrdersTopItem[]
}