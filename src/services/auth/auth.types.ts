export type Role = 'SUPER_ADMIN' | 'EXECUTIVE' | 'ANALYST_REGION';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  avatar_url: string | null;
  role: Role;
  region_id: string | null;
  region?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}

export interface AuthState {
  user: AuthUser | null;
  accessToken: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}