'use client'

import { fetchProductsKpis, fetchProductsTopItems, fetchProductsMatrix } from "@/services/products/products.api";
import { useQuery } from "@tanstack/react-query";
import { DashboardQueryParams } from "@/services/api.types";

export function useProductsKpisQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["products-kpis", params],
    queryFn: async () => await fetchProductsKpis(params),
  });
}

export function useProductsTopItemQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["products-top-item", params],
    queryFn: async () => await fetchProductsTopItems(params),
  });
}

export function useProductsMatrixQuery(params?: DashboardQueryParams) {
  return useQuery({
    queryKey: ["products-matrix", params],
    queryFn: async () => await fetchProductsMatrix(params),
  });
}