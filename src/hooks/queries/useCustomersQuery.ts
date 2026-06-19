'use client'

import { useQuery } from "@tanstack/react-query";
import { DashboardQueryParams } from "@/services/api.types";
import { fetchCustomersKPIs, fetchCustomersSegment, fetchCustomersCohorts, fetchCustomersNewReturning } from "@/services/customers/customers.api"

export function useCustomersKpisQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["customers-kpis", params],
    queryFn: async () => await fetchCustomersKPIs(params),
  });
}

export function useCustomersSegmentsQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["customers-segments", params],
    queryFn: async () => await fetchCustomersSegment(params),
  });
}

export function useCustomersCohortsQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["customers-cohorts", params],
    queryFn: async () => await fetchCustomersCohorts(params),
  });
}

export function useCustomersNewReturningQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["customers-new-returning", params],
    queryFn: async () => await fetchCustomersNewReturning(params),
  });
}