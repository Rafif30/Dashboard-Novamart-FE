'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from 'react';
import { AuthState } from '@/services/auth/auth.types';
import axios from 'axios';
import { tokenStore } from '@/services/api-client';
import { fetchMe, logout as logoutApi } from '@/services/auth/auth.api';

// ============================================================
// AUTH CONTEXT
//
// Tanggung jawab context ini:
// 1. Simpan access token & user di memory
// 2. Saat app pertama load → coba refresh token (user mungkin
//    masih punya refresh token di cookie dari session sebelumnya)
// 3. Setup timer auto-refresh sebelum token expired
// 4. Provide fungsi login (set token) dan logout (clear semua)
// ============================================================

interface AuthContextValue extends AuthState {
  setTokenAndFetchUser: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const ACCESS_TOKEN_TTL_MS = 14 * 60 * 1000; // 14 menit (refresh 1 menit sebelum 15m expired)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    accessToken: null,
    isLoading: true,    // true dulu — cek session dulu sebelum render
    isAuthenticated: false,
  });

  // Ref untuk simpan timer auto-refresh
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─────────────────────────────────────────────
  // LOGOUT
  // ─────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    if (refreshTimerRef.current) clearTimeout(refreshTimerRef.current);

    try {
      await logoutApi(); // hapus cookie di backend
    } catch {
      // Lanjutkan logout meski request gagal
    } finally {
      tokenStore.clear();
      setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
    }
  }, []);

  // ─────────────────────────────────────────────
  // SETUP AUTO REFRESH TIMER
  // Dipanggil setiap kali token baru di-set.
  // Akan refresh token ~1 menit sebelum expired.
  // ─────────────────────────────────────────────
  const scheduleRefresh = useCallback(() => {
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }

    refreshTimerRef.current = setTimeout(async () => {
      try {
        const response = await axios.post('/api/auth/refresh');        
        tokenStore.set(response.data.access_token);
        setState((prev) => ({ ...prev, accessToken: response.data.access_token }));
        // eslint-disable-next-line react-hooks/immutability
        scheduleRefresh(); // jadwalkan refresh berikutnya
      } catch {
        // Refresh gagal → session expired, paksa logout
        handleLogout();
      }
    }, ACCESS_TOKEN_TTL_MS);
  }, [handleLogout]);

  // ─────────────────────────────────────────────
  // SET TOKEN & FETCH USER
  // Dipanggil oleh halaman /auth/callback setelah
  // mendapat token dari URL query param
  // ─────────────────────────────────────────────
  const setTokenAndFetchUser = useCallback(async (token: string) => {

    try {
      tokenStore.set(token)
      const user = await fetchMe();
      setState({
        user,
        accessToken: token,
        isLoading: false,
        isAuthenticated: true,
      });
      scheduleRefresh();
    } catch {
      tokenStore.clear();
      setState({ user: null, accessToken: null, isLoading: false, isAuthenticated: false });
    }
  }, [scheduleRefresh]);

  // ─────────────────────────────────────────────
  // SILENT REFRESH SAAT APP LOAD
  //
  // Saat halaman pertama kali dibuka, coba refresh
  // token. Kalau user masih punya refresh token cookie
  // yang valid → langsung dapat access token baru
  // tanpa perlu login ulang (session tetap hidup).
  //
  // Ini yang membuat UX terasa "tetap login"
  // meski tab ditutup dan dibuka lagi.
  // ─────────────────────────────────────────────
  useEffect(() => {
  let cancelled = false;

  async function silentRefresh() {
    try {
      const response =
        await axios.post('/api/auth/refresh');

      if (cancelled) return;

      tokenStore.set(response.data.access_token);

      const user = await fetchMe();

      if (cancelled) return;

      setState({
        user,
        accessToken: response.data.access_token,
        isLoading: false,
        isAuthenticated: true,
      });

      scheduleRefresh();
    } catch {
      if (!cancelled) {
        setState({
          user: null,
          accessToken: null,
          isLoading: false,
          isAuthenticated: false,
        });
      }
    }
  }

  silentRefresh();

  return () => {
    cancelled = true;

    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
  };
}, []); // eslint-disable-line

  return (
    <AuthContext.Provider
      value={{ ...state, setTokenAndFetchUser, logout: handleLogout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// Hook internal — hanya dipakai oleh useAuth
export function useAuthContext(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside <AuthProvider>');
  return ctx;
}
