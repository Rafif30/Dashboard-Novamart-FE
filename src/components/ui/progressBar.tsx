import React from "react"
import { getColorClassName, AvailableColorOptionsKeys } from "@/lib/utils"

import { cx } from "@/lib/utils"


interface ProgressBarProps
  extends React.HTMLProps<HTMLDivElement> {
  value?: number
  max?: number
  showAnimation?: boolean
  label?: string
  color?: AvailableColorOptionsKeys
}

const ProgressBar = React.forwardRef<HTMLDivElement, ProgressBarProps>(
  (
    {
      value = 0,
      max = 100,
      label,
      showAnimation = true,
      color = 'blue',
      className,
      ...props
    }: ProgressBarProps,
    forwardedRef,
  ) => {
    const safeValue = Math.min(max, Math.max(value, 0))
    return (
      <div
        ref={forwardedRef}
        className={cx("flex w-full items-center", className)}
        role="progressbar"
        aria-label="Progress bar"
        aria-valuenow={value}
        aria-valuemax={max}
        tremor-id="tremor-raw"
        {...props}
      >
        <div
          className="relative flex h-2 w-full items-center rounded-full bg-[var(--muted)]"
        >
          <div
            className={cx(
              "h-full flex-col rounded-full",
              getColorClassName(color, 'bg'),
              showAnimation &&
                "transform-gpu transition-all duration-300 ease-in-out",
            )}
            style={{
              width: max ? `${(safeValue / max) * 100}%` : `${safeValue}%`,
            }}
          />
        </div>
        {label ? (
          <span
            className={cx(
              // base
              "ml-2 whitespace-nowrap text-sm font-medium leading-none",
              // text color
              "text-gray-900 dark:text-gray-50",
            )}
          >
            {label}
          </span>
        ) : null}
      </div>
    )
  },
)

ProgressBar.displayName = "ProgressBar"

export { ProgressBar }