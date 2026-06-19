'use client';

import { LoginCard } from "@/components/auth/login-card";
import { useAuth } from "@/hooks/auth/useAuth";
import { useRouter, useSearchParams } from "next/dist/client/components/navigation";
import { useEffect } from "react";

const ERROR_MESSAGES: Record<string, string> = {
  no_token: 'Login gagal. Tidak ada token diterima.',
  auth_failed: 'Login gagal. Silakan coba lagi.',
  unauthorized: 'Akun kamu belum terdaftar. Hubungi administrator.',
};

export default function LoginPage() {
  const searchParams = useSearchParams();
  const errorKey = searchParams.get('error');
  const errorMessage = errorKey ? ERROR_MESSAGES[errorKey] : null;

  return (
    <main
      className="
        relative flex min-h-screen
        overflow-hidden
        bg-[var(--background)]
      "
    >
      {/* LEFT */}
      <section
        className="
          relative hidden flex-1
          overflow-hidden
          lg:flex
        "
      >
        <div
          className="
            absolute inset-0
            bg-gradient-to-br
            from-blue-600
            via-violet-600
            to-fuchsia-600
            opacity-90
          "
        />

        <div className="absolute inset-0 backdrop-blur-3xl" />

        <div
          className="
            relative z-10
            flex h-full flex-col
            justify-between
            p-14 text-white
          "
        >
          <div>
            <div
              className="
                mb-6 flex h-14 w-14
                items-center justify-center
                rounded-2xl
                bg-white/10
                backdrop-blur
              "
            >
              <span className="text-xl font-bold">
                N
              </span>
            </div>

            <h1
              className="
                max-w-[520px]
                text-5xl font-semibold
                leading-tight
              "
            >
              E-Commerce intelligence for
              modern business teams.
            </h1>

            <p
              className="
                mt-6 max-w-[500px]
                text-base leading-8
                text-white/70
              "
            >
              Monitor revenue, orders,
              retention, customers, and
              product performance in one
              unified dashboard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
                backdrop-blur
              "
            >
              <p className="text-sm text-white/70">
                Revenue growth
              </p>

              <p className="mt-2 text-3xl font-semibold">
                +24%
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
                backdrop-blur
              "
            >
              <p className="text-sm text-white/70">
                Orders processed
              </p>

              <p className="mt-2 text-3xl font-semibold">
                18.2K
              </p>
            </div>

            <div
              className="
                rounded-2xl
                border border-white/10
                bg-white/5
                p-5
                backdrop-blur
              "
            >
              <p className="text-sm text-white/70">
                Customer retention
              </p>

              <p className="mt-2 text-3xl font-semibold">
                71%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* RIGHT */}
      <section
        className="
          flex flex-1
          items-center justify-center
          p-6 lg:p-12
        "
      >
        <div className="w-full max-w-[440px]">
          <LoginCard />
          {errorMessage && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
                {errorMessage}
            </div>
            )}
        </div>
      </section>
    </main>
  );
}