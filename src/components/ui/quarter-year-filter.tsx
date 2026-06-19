"use client";

import { useMemo } from "react";
import * as Select from "@radix-ui/react-select";
import {
  RiArrowDownSLine,
  RiCheckLine,
} from "@remixicon/react";
import { getAvailableQuarters } from '@/lib/utils'

type QuarterYearFilterProps = {
  quarter?: string;
  year?: string;
  onQuarterChange?: (value: string) => void;
  onYearChange?: (value: string) => void;
};

const yearOptions = [
  { label: "2024", value: "2024" },
  { label: "2025", value: "2025" },
  { label: "2026", value: "2026" },
];

export function QuarterYearFilter({
  quarter = "Q2",
  year = "2026",
  onQuarterChange,
  onYearChange,
}: QuarterYearFilterProps) {
  const quarterOptions = useMemo(() => {
    return getAvailableQuarters(Number(year))
  }, [year])

  return (
    <div className="flex flex-wrap gap-3">
      <Dropdown
        value={quarter}
        placeholder="Select Quarter"
        options={quarterOptions}
        onValueChange={onQuarterChange}
      />

      <Dropdown
        value={year}
        placeholder="Select Year"
        options={yearOptions}
        onValueChange={onYearChange}
      />
    </div>
  );
}

type DropdownProps = {
  value: string;
  placeholder: string;
  options: {
    label: string;
    value: string;
  }[];
  onValueChange?: (value: string) => void;
};

function Dropdown({
  value,
  placeholder,
  options,
  onValueChange,
}: DropdownProps) {
  return (
    <Select.Root
      value={value}
      onValueChange={onValueChange}
    >
      <Select.Trigger
        className="
          inline-flex h-11 min-w-[180px]
          items-center justify-between gap-2
          rounded-xl
          border border-[var(--border)]
          bg-[var(--card)]
          px-4
          text-sm
          text-[var(--foreground)]
          shadow-sm
          outline-none
          hover:bg-[var(--accent)]
        "
      >
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <RiArrowDownSLine size={18} />
        </Select.Icon>
      </Select.Trigger>

      <Select.Portal>
        <Select.Content
          position="popper"
          sideOffset={6}
          className="
            z-50 min-w-[180px]
            overflow-hidden
            rounded-xl
            border border-[var(--border)]
            bg-[var(--popover)]
            shadow-xl
          "
        >
          <Select.Viewport className="p-1">
            {options.map((option) => (
              <Select.Item
                key={option.value}
                value={option.value}
                className="
                  relative flex cursor-pointer
                  select-none items-center
                  rounded-lg
                  py-2 pl-8 pr-3
                  text-sm
                  text-[var(--foreground)]
                  outline-none
                  hover:bg-[var(--accent)]
                  data-[highlighted]:bg-[var(--accent)]
                "
              >
                <Select.ItemIndicator className="absolute left-2">
                  <RiCheckLine size={16} />
                </Select.ItemIndicator>

                <Select.ItemText>
                  {option.label}
                </Select.ItemText>
              </Select.Item>
            ))}
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  );
}