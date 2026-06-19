import apiClient from '@/services/api-client';
import { AuthUser } from './auth.types';
import { ApiResponse } from '@/services/api.types';

// Ambil profil user yang sedang login (GET /auth/me)
export async function fetchMe(): Promise<AuthUser> {
  const { data: response } = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
  return response.data;
}

// Ambil Token dari exchange code
export async function getToken(code: string): Promise<{ access_token: string; expires_in: number }> {
  const { data: response } = await apiClient.post<ApiResponse<{ access_token: string; expires_in: number }>>('auth/token', { code })
  return response.data
} 

// Refresh access token (POST /auth/refresh)
export async function refreshToken(): Promise<{ access_token: string; expires_in: number }> {
  const { data: response } = await apiClient.post<ApiResponse<{ access_token: string; expires_in: number }>>('/auth/refresh');
  return response.data;
}

// Logout (POST /auth/logout)
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

// URL redirect ke backend untuk mulai flow Google OAuth
export function getGoogleLoginUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000/api';
  return `${apiUrl}/auth/google`;
}