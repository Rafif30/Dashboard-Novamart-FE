import { useDateRangeStore } from "@/stores/range-date-store";
import { useShallow } from 'zustand/react/shallow'

export function useDashboardFilters() {
    const params = useDateRangeStore(useShallow((state) => ({
        year: state.year,
        quarter: state.quarter
    })))
    return params;
}