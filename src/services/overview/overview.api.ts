import apiClient from '@/services/api-client';
import { OverviewKPIResponse, RevenueChartDataResponse, TopProductsResponse, CustomerSegmentsResponse } from './overview.types';
import { ApiResponse, DashboardQueryParams } from '@/services/api.types';

// 1. Ambil KPI untuk dashboard overview (GET /overview/kpis)
export async function fetchOverviewKPIs(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<OverviewKPIResponse>>('overview/kpis', { params });
    return response.data;
}

// 2. Ambil data untuk revenue chart (GET /overview/charts)
export async function fetchRevenueChartData(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<RevenueChartDataResponse>>('overview/charts', { params });
    return response.data;
}

// 3. Ambil data untuk Top Products (GET /overview/top-products)
export async function fetchTopProducts(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<TopProductsResponse>>('overview/top-products', { params });
    return response.data;
}

// 4. Ambil data untuk Customer Segments (GET /overview/customer-segments)
export async function fetchCustomerSegments(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<CustomerSegmentsResponse>>('overview/customer-segments', { params });
    return response.data;
}