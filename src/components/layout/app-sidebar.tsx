"use client";

import {
  RiDashboardLine,
  RiLineChartLine,
  RiShoppingBag3Line,
  RiBox3Line,
  RiUser3Line,
  RiArrowRightSLine,
  RiLogoutBoxRLine,
} from "@remixicon/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@/hooks/auth/useAuth";

const sidebarMenus = [
    {
        label: "Overview",
        icon: RiDashboardLine,
        active: true,
        hasAcces: true,
    },
    {
        label: "Revenue",
        icon: RiLineChartLine,
        hasAcces: true,
    },
    {
        label: "Orders",
        icon: RiShoppingBag3Line,
        hasAcces: true,
    },
    {
        label: "Products",
        icon: RiBox3Line,
        hasAcces: true,
    },
    {
        label: "Customers",
        icon: RiUser3Line,
        hasAcces: true,
    },
];

function UserProfileMenu() {
  const { user, logout } = useAuth();

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          className="
            flex w-full items-center gap-3
            rounded-xl
            border border-[var(--border)]
            p-3
            transition
            hover:bg-[var(--accent)]
          "
        >
          <div
            className="
              flex h-10 w-10 items-center justify-center
              rounded-full
              bg-[var(--primary)]
              text-sm font-semibold
              text-[var(--primary-foreground)]
            "
          >
            {user?.avatar_url ? (
              <Image
                src={user.avatar_url}
                alt={user.name}
                width={40}
                height={40}
                className="h-full w-full object-cover rounded-full"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-[var(--primary)] text-[var(--primary-foreground)]">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            )}
          </div>

          <div className="min-w-0 flex-1 text-left">
            <p className="truncate text-sm font-medium">
              {user?.name}
            </p>

            <p className="truncate text-xs text-[var(--muted-foreground)]">
              {user?.role.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </p>
          </div>

          <RiArrowRightSLine size={18} />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          side="top"
          align="start"
          sideOffset={8}
          className="
            z-50
            min-w-[240px]
            rounded-xl
            border border-[var(--border)]
            bg-[var(--card)]
            p-1
            shadow-xl
          "
        >
          {/* Header */}
          <div className="px-3 py-2">
            <p className="text-sm font-medium">
              {user?.name}
            </p>

            <p className="text-xs text-[var(--muted-foreground)]">
              {user?.email}
            </p>
          </div>

          <DropdownMenu.Separator className="my-1 h-px bg-[var(--border)]" />

          {/* Logout */}
          <DropdownMenu.Item
            onSelect={logout}
            className="
              flex cursor-pointer items-center gap-2
              rounded-lg
              px-3 py-2
              text-sm
              text-red-500
              outline-none
              transition
              hover:bg-red-500/10
              data-[highlighted]:bg-red-500/10
            "
          >
            <RiLogoutBoxRLine size={18} />

            Logout
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <aside className="flex h-min-screen w-[250px] flex-col border-r border-[var(--sidebar-foreground)]/10 bg-[var(--sidebar)] relative px-5 py-6">
      <div className="mb-10 flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[var(--primary)] text-[var(--primary-foreground)] text-xs font-bold">
          N
        </div>

        <div>
          <h1 className="text-sm font-semibold text-[var(--sidebar-foreground)]">NovaMart</h1>
          <p className="text-xs text-[var(--sidebar-foreground)]">Executive Dashboard</p>
        </div>
      </div>

      <div className="flex-1 space-y-1">
        {sidebarMenus
          .filter((item) => item.hasAcces)
          .map((item) => {
          const Icon = item.icon;
          const isActive = pathname.includes(item.label.toLowerCase())

          return (
            <Link
              href={`${item.label.toLowerCase()}`}
              key={item.label}
              className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition ${
                isActive
                  ? "bg-[var(--primary)] text-[var(--primary-foreground)]"
                  : "text-[var(--sidebar-foreground)] hover:bg-[var(--primary)] hover:text-[var(--primary-foreground)]"
              }`}
            >
              <Icon size={18} />
              {item.label}
            </Link>
          );
        })}   
     </div>
     <div className="mt-auto sticky bottom-5">
        <UserProfileMenu />
      </div>
    </aside>
  );
}