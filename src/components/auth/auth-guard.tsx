"use client";

import { useRequireAuth } from "@/hooks/auth/useAuth";
import { PageLoader } from "@/components/feedback/page-loader";

export function AuthGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading } =
    useRequireAuth();

  if (isLoading) {
    return (
      <PageLoader />
    );
  }

  return <>{children}</>;
}