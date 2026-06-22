'use client';

import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/hooks/auth/useAuth';

// ============================================================
// /auth/callback
//
// Halaman ini adalah "landing" setelah backend redirect
// dengan access code di URL:
//   http://localhost:3000/auth/callback?code=eyJhbGc...
//
// Yang dilakukan halaman ini:
// 1. Baca ?code= dari URL
// 3. Simpan token ke context & fetch profil user
// 4. Redirect ke dashboard
// ============================================================

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { setTokenAndFetchUser } = useAuth();
  const handled = useRef(false); // cegah double-call di React StrictMode

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    const code = searchParams.get('code');

    if (!code) {
      // Tidak ada token → langsung ke login
      router.replace('/login?error=no_token');
      return;
    }

    const fetchToken = async function() {
      const response = await axios.post('/api/auth/login', {code})

      if (response.status === 200) {
        console.log(response.data)
        await setTokenAndFetchUser(response.data.token).then(
          () => router.replace('/overview')
        ).catch(
          () => router.replace('/login?error=auth_failed')
        )
      }
    }

    fetchToken()

  }, [searchParams, router, setTokenAndFetchUser]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner sederhana */}
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
        <p className="text-sm text-muted-foreground">Memverifikasi akun...</p>
      </div>
    </div>
  );
}
