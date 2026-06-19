export interface KPIItem {
  value: number;
  delta: number;
  formatted: string;
  trend: "up" | "down";
  is_negative_metric: boolean;
}

export interface CustomerSegmentItem {
  segment: 'VIP' | 'Loyal' | 'Occasional' | 'At Risk';
  avgLtv: number
  totalCustomer: number
  percentageCustomer: number;
}

export interface CustomerCohortItem {
  cohort: string;
  m0: string;
  m1: string;
  m2: string;
}

export interface CustomerNewReturningItem {
  value: number;
  percentage: number;
  label: string
}

export interface CustomersKPIResponse {
  period: {
    gte: string;
    lte: string;
  };
  totalCustomers: KPIItem;
  avgLtvCustomers: KPIItem;
  churnRateCustomers: KPIItem;
  repeatPurchaseRate: KPIItem;
}

export interface CustomersSegmentResponse {
  period: {
    gte: string;
    lte: string;
  };
  customerSegment: CustomerSegmentItem[]
}

export interface CustomersCohortResponse {
  period: {
    gte: string;
    lte: string;
  };
  cohorts: CustomerCohortItem[]
}

export interface CustomersNewReturningResponse {
  period: {
    gte: string;
    lte: string;
  };
  newCustomers: CustomerNewReturningItem
  returnCustomers: CustomerNewReturningItem
}