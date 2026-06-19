export interface ApiResponse<T> {
  data: T;
  meta: {
    cached_at: string;
  };
}

export type SalesChannel = "website" | "mobile_app" | "marketplace" | "other";

export type Granularity = "day" | "week" | "month";

export type Quarter = "Q1" | "Q2" | "Q3" | "Q4";

export interface DashboardQueryParams {
  from?: string;
  to?: string;
  year?: string; 
  region_id?: string;
  channel?: SalesChannel;
  granularity?: Granularity;
  limit?: number;
  quarter?: Quarter;
}