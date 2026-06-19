import clsx, { type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cx(...args: ClassValue[]) {
  return twMerge(clsx(...args))
}

export const focusInput = [
  // base
  "focus:ring-2",
  // ring color
  "focus:ring-blue-200 dark:focus:ring-blue-700/30",
  // border color
  "focus:border-blue-500 dark:focus:border-blue-700",
]

export const focusRing = [
  // base
  "outline outline-offset-2 outline-0 focus-visible:outline-2",
  // outline color
  "outline-blue-500 dark:outline-blue-500",
]

export const hasErrorInput = [
  // base
  "ring-2",
  // border color
  "border-red-500 dark:border-red-700",
  // ring color
  "ring-red-200 dark:ring-red-700/30",
]

export type ColorUtility = "bg" | "stroke" | "fill" | "text" | "color" | 'label'

export const colorOptions = {
  blue: {
    label: 'blue',
    color: 'var(--chart-blue)',
    bg: "bg-[var(--chart-blue)]",
    stroke: "stroke-[var(--chart-blue)]",
    fill: "fill-[var(--chart-blue)]",
    text: "text-[var(--chart-blue)]",
  },
  emerald: {
    label: 'emerald',
    color: 'var(--chart-emerald)',
    bg: "bg-[var(--chart-emerald)]",
    stroke: "stroke-[var(--chart-emerald)]",
    fill: "fill-[var(--chart-emerald)]",
    text: "text-[var(--chart-emerald)]",
  },
  violet: {
    label: 'violet',
    color: 'var(--chart-violet)',
    bg: "bg-[var(--chart-violet)]",
    stroke: "stroke-[var(--chart-violet)]",
    fill: "fill-[var(--chart-violet)]",
    text: "text-[var(--chart-violet)]",
  },
  amber: {
    label: 'amber',
    color: 'var(--chart-amber)',
    bg: "bg-[var(--chart-amber)]",
    stroke: "stroke-[var(--chart-amber)]",
    fill: "fill-[var(--chart-amber)]",
    text: "text-[var(--chart-amber)]",
  },
  cyan: {
    label: 'cyan',
    color: 'var(--chart-cyan)',
    bg: "bg-[var(--chart-cyan)]",
    stroke: "stroke-[var(--chart-cyan)]",
    fill: "fill-[var(--chart-cyan)]",
    text: "text-[var(--chart-cyan)]",
  },
  pink: {
    label: 'pink',
    color: 'var(--chart-pink)',
    bg: "bg-[var(--chart-pink)]",
    stroke: "stroke-[var(--chart-pink)]",
    fill: "fill-[var(--chart-pink)]",
    text: "text-[var(--chart-pink)]",
  },
  lime: {
    label: 'lime',
    color: 'var(--chart-lime)',
    bg: "bg-[var(--chart-lime)]",
    stroke: "stroke-[var(--chart-lime)]",
    fill: "fill-[var(--chart-lime)]",
    text: "text-[var(--chart-lime)]",
  },
  fuchsia: {
    label: 'fuchsia',
    color: 'var(--chart-fuchsia)',
    bg: "bg-[var(--chart-fuchsia)]",
    stroke: "stroke-[var(--chart-fuchsia)]",
    fill: "fill-[var(--chart-fuchsia)]",
    text: "text-[var(--chart-fuchsia)]",
  },
  red: {
    label: 'red',
    color: 'var(--chart-red)',
    bg: "bg-[var(--chart-red)]",
    stroke: "stroke-[var(--chart-red)]",
    fill: "fill-[var(--chart-red)]",
    text: "text-[var(--chart-red)]",
  },
} as const satisfies {
  [color: string]: {
    [key in ColorUtility]: string
  }
}

export type AvailableColorOptionsKeys = keyof typeof colorOptions

export const AvailableColorOptions: AvailableColorOptionsKeys[] = Object.keys(
  colorOptions,
) as Array<AvailableColorOptionsKeys>

export const constructCategoryColors = (
  categories: string[],
  colors: AvailableColorOptionsKeys[],
): Map<string, AvailableColorOptionsKeys> => {
  const categoryColors = new Map<string, AvailableColorOptionsKeys>()
  categories.forEach((category, index) => {
    categoryColors.set(category, colors[index % colors.length])
  })
  return categoryColors
}

export const getColorClassName = (
  color: AvailableColorOptionsKeys,
  type: ColorUtility,
): string => {
  const fallbackColor = {
    label: 'gray',
    color: 'var(--chart-gray)',
    bg: "bg-[var(--chart-gray)]",
    stroke: "stroke-[var(--chart-gray)]",
    fill: "fill-[var(--chart-gray)]",
    text: "text-[var(--chart-gray)]",
  }
  return colorOptions[color]?.[type] ?? fallbackColor[type]
}

export function getRandomChartColor() {
  const entries = Object.entries(colorOptions);

  const [name, value] =
    entries[Math.floor(Math.random() * entries.length)];

  return {
    name,
    ...value,
  };
}

export function getChartColorByIndex(index: number) {
  const colors = Object.values(colorOptions);

  return colors[index % colors.length];
}

export function getAvailableQuarters(
  year: number
): { label: string, value: string}[] {
  const now = new Date();

  const currentYear = now.getFullYear();

  if (year < currentYear) {
    return [
      { label: "Q1 (Jan - Mar)", value: "Q1" },
      { label: "Q2 (Apr - Jun)", value: "Q2" },
      { label: "Q3 (Jul - Sep)", value: "Q3" },
      { label: "Q4 (Oct - Dec)", value: "Q4" },
    ];
  }

  if (year > currentYear) {
    return [];
  }

  const currentMonth = now.getMonth() + 1;

  // quarter yang sudah SELESAI
  if (currentMonth <= 3) {
    return [];
  }

  if (currentMonth <= 6) {
    return [
      { label: "Q1 (Jan - Mar)", value: "Q1" },
    ];
  }

  if (currentMonth <= 9) {
    return [
      { label: "Q1 (Jan - Mar)", value: "Q1" },
      { label: "Q2 (Apr - Jun)", value: "Q2" },
    ];
  }

  if (currentMonth <= 12) {
    return [
      { label: "Q1 (Jan - Mar)", value: "Q1" },
      { label: "Q2 (Apr - Jun)", value: "Q2" },
      { label: "Q3 (Jul - Sep)", value: "Q3" },
    ];
  }

  return [];
}

export function formatRupiahShort(value: number) {
    if (value >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(2)} M`;
    }

    if (value >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(2)} Jt`;
    }

    if (value >= 1_000) {
      return `Rp ${(value / 1_000).toFixed(2)} Rb`;
    }

    return `Rp ${value}`;
  };

export function formatRupiahShortNoDecimal(value: number) {
    if (value >= 1_000_000_000) {
      return `Rp ${(value / 1_000_000_000).toFixed(0)} M`;
    }

    if (value >= 1_000_000) {
      return `Rp ${(value / 1_000_000).toFixed(0)} Jt`;
    }

    if (value >= 1_000) {
      return `Rp ${(value / 1_000).toFixed(0)} Rb`;
    }

    return `Rp ${value}`;
  };