import { CustomersCohortResponse, CustomersSegmentResponse, CustomersNewReturningResponse, CustomersKPIResponse } from './customers.types'
import { ApiResponse, DashboardQueryParams } from '@/services/api.types'
import apiClient from '@/services/api-client'

// 1 Get Customers KPIs (GET /customers/kpis)
export async function fetchCustomersKPIs(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<CustomersKPIResponse>>('customers/kpis', { params });
    return response.data;
}

// 2 Get Customers Segments (GET /customers/segments)
export async function fetchCustomersSegment(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<CustomersSegmentResponse>>('customers/segments', { params })
    return response.data
}

// 3 Get Customers Cohorts Monthly (GET /customers/cohorts)
export async function fetchCustomersCohorts(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<CustomersCohortResponse>>('customers/cohorts', { params })
    return response.data
}

// 4 Get New & Returning Customers (GET /customers/returning)
export async function fetchCustomersNewReturning(params?: DashboardQueryParams) {
    const { data: response } = await apiClient.get<ApiResponse<CustomersNewReturningResponse>>('customers/returning', { params })
    return response.data
}