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
import { tokenStore } from '@/services/api-client';
import { fetchMe, getToken, logout as logoutApi, refreshToken } from '@/services/auth/auth.api';

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
  generateToken: (code: string) => Promise<string>;
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
  // Generate Token
  // ─────────────────────────────────────────────
  const generateToken = useCallback(async (code: string): Promise<string> => {
    try {
      const token = await getToken(code)
      setState((prev) => ({ ...prev, accessToken: token.access_token }));
      tokenStore.set(token.access_token)
      return token.access_token
    } catch (err) {
      console.error(err)
      handleLogout()
      throw err
    }
  }, [handleLogout])

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
        const { access_token } = await refreshToken();
        tokenStore.set(access_token);
        setState((prev) => ({ ...prev, accessToken: access_token }));
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
      const { access_token } =
        await refreshToken();

      if (cancelled) return;

      tokenStore.set(access_token);

      const user = await fetchMe();

      if (cancelled) return;

      setState({
        user,
        accessToken: access_token,
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
      value={{ ...state, setTokenAndFetchUser, logout: handleLogout, generateToken }}
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
