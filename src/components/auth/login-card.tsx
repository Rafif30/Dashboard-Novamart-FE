"use client";

import { RiGoogleFill } from "@remixicon/react";

import { getGoogleLoginUrl } from '@/services/auth/auth.api';

export function LoginCard() {
  const handleGoogleLogin = () => {
    // Redirect browser ke backend → backend redirect ke Google
    window.location.href = getGoogleLoginUrl();
  };

  return (
    <div
      className="
        w-full max-w-[440px]
        rounded-3xl
        border border-[var(--border)]
        bg-[var(--card)]
        p-8
        shadow-[var(--shadow-md)]
      "
    >
      <div className="mb-8">
        <div
          className="
            mb-4 flex h-14 w-14
            items-center justify-center
            rounded-2xl
            bg-[var(--primary)]
            text-[var(--primary-foreground)]
          "
        >
          <span className="text-xl font-bold">
            N
          </span>
        </div>

        <h1
          className="
            text-3xl font-semibold
            tracking-tight
            text-[var(--foreground)]
          "
        >
          Welcome back
        </h1>

        <p
          className="
            mt-2 text-sm leading-6
            text-[var(--muted)]
          "
        >
          Continue with Google to access
          NovaMart Dashboard.
        </p>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="
          flex h-12 w-full
          items-center justify-center gap-3
          rounded-2xl
          border border-[var(--border)]
          bg-[var(--background)]
          text-sm font-medium
          text-[var(--foreground)]
          transition-all duration-200
          hover:opacity-90
          active:scale-[0.99]
          cursor-pointer
        "
      >
        <RiGoogleFill size={20} />

        Continue with Google
      </button>

      <div
        className="
          mt-8 border-t
          border-[var(--border)]
          pt-6
        "
      >
        <p
          className="
            text-center text-xs
            leading-6
            text-[var(--muted)]
          "
        >
          Secure authentication powered by
          Google OAuth.
        </p>
      </div>
    </div>
  );
}