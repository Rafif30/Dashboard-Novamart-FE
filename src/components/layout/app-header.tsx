'use client';

import { useEffect } from "react";
import {
  RiMoonLine,
  RiSunLine,
} from "@remixicon/react";
import { useTheme } from "@/providers/theme-provider";
import { QuarterYearFilter } from "@/components/ui/quarter-year-filter";
import { useDateRangeStore } from "@/stores/range-date-store";
import { getAvailableQuarters } from '@/lib/utils'


function ThemeToggle() {
  const {
    theme,
    toggleTheme,
  } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border)] bg-[var(--card)] transition hover:opacity-80"
    >
      {theme === "dark" ? (
        <RiSunLine size={18} />
      ) : (
        <RiMoonLine size={18} />
      )}
    </button>
  );
}

export function AppHeader() {
  const { quarter, year, setQuarter, setYear } = useDateRangeStore();

  useEffect(() => {
    const available =
        getAvailableQuarters(Number(year));

    if (!available.some(value => value.value.includes(quarter))) {
        setQuarter(
        // pick the value string from the last available quarter, fallback to empty string
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        available[available.length - 1]?.value as any ?? ""
        );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [year, quarter]);

  return (
    <header className="flex h-[72px] items-center justify-between border-b border-[var(--sidebar-foreground)]/10 bg-[var(--sidebar)] px-6">
      <div />
      <div className="flex items-center gap-4">
        <ThemeToggle />
        <QuarterYearFilter 
          quarter={quarter}
          year={year}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onQuarterChange={(value) => setQuarter(value as any)}
          onYearChange={setYear}
        />
      </div>
    </header>
  );
}