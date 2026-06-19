import apiClient from '@/services/api-client';
import { RevenueKPIResponse, RevenueChannelResponse, RevenueCategoryResponse, RevenueTrendsResponse } from './revenue.types'
import { ApiResponse, DashboardQueryParams } from '@/services/api.types';

// 1. Ambil KPI untuk dashboard revenue (GET /revenue/kpis)
export async function fetchRevenueKPIs(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<RevenueKPIResponse>>('revenue/kpis', { params });
    return response.data;
}

// 2. Ambil Revenue By Channel (GET /revenue/channel)
export async function fetchRevenueChannel(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<RevenueChannelResponse>>('revenue/channel', { params });
    return response.data
}

// 3. Ambil Revenue By Category (Get /revenue/category)
export async function fetchRevenueCategory(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<RevenueCategoryResponse>>('revenue/category', { params });
    return response.data
}

// 4. Ambil Revenue Trends (Get /revenue/trends)
export async function fetchRevenueTrends(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<RevenueTrendsResponse>>('revenue/trends', { params });
    return response.data
}