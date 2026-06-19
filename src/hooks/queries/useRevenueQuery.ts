'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchRevenueKPIs, fetchRevenueChannel, fetchRevenueCategory, fetchRevenueTrends } from '@/services/revenue/revenue.api'
import { DashboardQueryParams } from "@/services/api.types";

export function useRevenueKpisQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["revenue-kpis", params],
    queryFn: async () => await fetchRevenueKPIs(params),
  });
}

export function useRevenueChannelQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ['revenue-channel', params],
    queryFn: async () => await fetchRevenueChannel(params),
  })
}

export function useRevenueCategoryQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ['revenue-category', params],
    queryFn: async () => await fetchRevenueCategory(params)
  })
}

export function useRevenueTrendsQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ['revenue-trends', params],
    queryFn: async () => await fetchRevenueTrends(params)
  })
}