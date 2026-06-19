import apiClient from '@/services/api-client';
import { OrdersKPIResponse, OrdersStatusResponse, OrdersRecentlyResponse, OrdersTotalByDayResponse, OrdersTopResponse } from './orders.types'
import { ApiResponse, DashboardQueryParams } from '@/services/api.types';

// 1 Get Orders KPIs (GET /orders/kpis)
export async function fetchOrdersKPIs(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersKPIResponse>>('orders/kpis', { params });
    return response.data;
}

// 2 Get Orders Status Breakdown (GET /orders/status)
export async function fetchOrdersStatus(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersStatusResponse>>('orders/status', { params })
    return response.data
}

// 3 Get Orders Recently (GET /orders/recently)
export async function fetchOrdersRecently(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersRecentlyResponse>>('orders/recently', { params })
    return response.data
}

// 4 Get Orders By Days Week (GET /orders/weekly)
export async function fetchOrdersByDay(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersTotalByDayResponse>>('orders/weekly', { params })
    return response.data
}

// 5 Get Orders Top Regions (GET /orders/topRegion)
export async function fetchOrdersTopRegions(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersTopResponse>>('orders/topRegion', { params })
    return response.data
}

// 5 Get Orders Top Regions (GET /orders/topChannel)
export async function fetchOrdersTopChannel(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OrdersTopResponse>>('orders/topChannel', { params })
    return response.data
}