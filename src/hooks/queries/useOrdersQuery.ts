'use client';

import { useQuery } from "@tanstack/react-query";
import { fetchOrdersKPIs, fetchOrdersStatus, fetchOrdersRecently, fetchOrdersByDay, fetchOrdersTopRegions, fetchOrdersTopChannel } from '@/services/orders/orders.api'
import { DashboardQueryParams } from "@/services/api.types";

export function useOrdersKpisQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["orders-kpis", params],
    queryFn: async () => await fetchOrdersKPIs(params),
  });
}

export function useOrdersStatusQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["orders-status", params],
    queryFn: async () => await fetchOrdersStatus(params),
  });
}

export function useOrdersRecentlyQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["orders-recently", params],
    queryFn: async () => await fetchOrdersRecently(params),
  });
}

export function useOrdersByDaysQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["orders-weekly", params],
    queryFn: async () => await fetchOrdersByDay(params),
  });
}

export function useOrdersTopItems(params?: DashboardQueryParams, isRegion?: boolean) {
  return useQuery({
    queryKey: ['orders-top-items', params],
    queryFn: async () => isRegion ? fetchOrdersTopChannel(params) : fetchOrdersTopRegions(params)
  })
}