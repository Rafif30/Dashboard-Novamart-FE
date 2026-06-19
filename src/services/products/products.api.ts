import {
    ProductsKPIResponse,
    ProductsTopItemResponse,
    ProductsMatrixResponse,
} from './products.types'
import apiClient from '@/services/api-client';
import { ApiResponse, DashboardQueryParams } from '@/services/api.types';


// 1. Get KPIs Products (GET /products/kpis)
export async function fetchProductsKpis(params?: DashboardQueryParams) {
    const { data: response } = await apiClient<ApiResponse<ProductsKPIResponse>>('/products/kpis', { params });
    return response.data    
}

// 2. Get Top Products (GET /products/topProducts)
export async function fetchProductsTopItems(params?: DashboardQueryParams) {
    const { data: response } = await apiClient<ApiResponse<ProductsTopItemResponse>>('products/topProducts', { params });
    return response.data
}

// 3. Get Matrix Products (GET /products/matrix)
export async function fetchProductsMatrix(params?: DashboardQueryParams) {
    const { data: response } = await apiClient<ApiResponse<ProductsMatrixResponse>>('products/matrix', { params });
    return response.data
}