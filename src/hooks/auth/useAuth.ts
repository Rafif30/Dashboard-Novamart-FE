'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuthContext } from '@/context/auth.context';
import { Role } from '@/services/auth/auth.types';

// ============================================================
// useAuth
//
// Hook utama untuk akses semua state auth di komponen manapun.
//
// Contoh:
//   const { user, isAuthenticated, logout } = useAuth();
// ============================================================
export function useAuth() {
  const { user, accessToken, isLoading, isAuthenticated, logout, setTokenAndFetchUser, generateToken } =
    useAuthContext();

  return { user, accessToken, isLoading, isAuthenticated, logout, setTokenAndFetchUser, generateToken };
}

// ============================================================
// useRequireAuth
//
// Redirect ke /login kalau user belum login.
// Pakai di page yang butuh autentikasi.
//
// Contoh:
//   export default function DashboardPage() {
//     useRequireAuth();
//     ...
//   }
// ============================================================
export function useRequireAuth(redirectTo = '/login') {
  const { isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.replace(redirectTo);
    }
  }, [isAuthenticated, isLoading, redirectTo, router]);

  return { isLoading };
}

// ============================================================
// useRequireRole
//
// Redirect ke /unauthorized kalau user tidak punya role yang dibutuhkan.
// Pakai di page yang butuh role tertentu.
//
// Contoh:
//   // Halaman ini hanya untuk SUPER_ADMIN
//   export default function UsersManagementPage() {
//     useRequireRole(['SUPER_ADMIN']);
//     ...
//   }
//
//   // Overview boleh untuk semua role
//   export default function OverviewPage() {
//     useRequireRole(['SUPER_ADMIN', 'EXECUTIVE', 'ANALYST_REGION']);
//     ...
//   }
// ============================================================
export function useRequireRole(allowedRoles: Role[], redirectTo = '/unauthorized') {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.replace('/login');
      return;
    }
    if (user && !allowedRoles.includes(user.role)) {
      router.replace(redirectTo);
    }
  }, [user, isLoading, isAuthenticated, allowedRoles, redirectTo, router]);

  return { isLoading };
}

// ============================================================
// useIsRole — helper boolean cek role
//
// Contoh:
//   const { isSuperAdmin, isExecutive, isAnalyst } = useIsRole();
//   {isSuperAdmin && <ConfigMenu />}
// ============================================================
export function useIsRole() {
  const { user } = useAuth();

  return {
    isSuperAdmin: user?.role === 'SUPER_ADMIN',
    isExecutive: user?.role === 'EXECUTIVE',
    isAnalyst: user?.role === 'ANALYST_REGION',
    // Shortcut: bisa lihat semua data (bukan analyst)
    canSeeAllRegions: user?.role === 'SUPER_ADMIN' || user?.role === 'EXECUTIVE',
  };
}