import apiClient from '@/services/api-client';
import { AuthUser } from './auth.types';
import { ApiResponse } from '@/services/api.types';

// Ambil profil user yang sedang login (GET /auth/me)
export async function fetchMe(): Promise<AuthUser> {
  const { data: response } = await apiClient.get<ApiResponse<AuthUser>>('/auth/me');
  return response.data;
}

// Logout (POST /auth/logout)
export async function logout(): Promise<void> {
  await apiClient.post('/auth/logout');
}

// URL redirect ke backend untuk mulai flow Google OAuth
export function getGoogleLoginUrl(): string {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  return `${apiUrl}/auth/google`;
}