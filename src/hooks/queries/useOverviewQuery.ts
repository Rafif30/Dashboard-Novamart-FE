'use client';

import { useQuery } from "@tanstack/react-query";

import { fetchCustomerSegments, fetchOverviewKPIs, fetchRevenueChartData, fetchTopProducts } from "@/services/overview/overview.api";
import { DashboardQueryParams } from "@/services/api.types";

export function useOverviewQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["overview-kpis", params],
    queryFn: async () => await fetchOverviewKPIs(params),
  });
}

export function useRevenueChartDataQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["overview-revenue-chart", params],
    queryFn: async () => await fetchRevenueChartData(params),
  })
}

export function useTopProductsQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["overview-top-products", params],
    queryFn: async () => await fetchTopProducts(params),
  })
}

export function useCustomerSegmentsQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["overview-customer-segments", params],
    queryFn: async () => await fetchCustomerSegments(params),
  })
}