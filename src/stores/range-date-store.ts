import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Quarter } from "@/services/api.types";

type DateRangeState = {
  year: string
  quarter: Quarter;
  setYear: (value: string) => void;
  setQuarter: (value: Quarter) => void;
};

const today = new Date();

export const useDateRangeStore =
  create<DateRangeState>()(
    persist(
      (set) => ({
        year: today.getFullYear().toString(),
        quarter: `Q${Math.ceil((today.getMonth() + 1) / 3)}` as Quarter,
        
        setYear: (value) =>
          set({
            year: value,
          }),
        setQuarter: (value) =>
          set({
            quarter: value,
          }),
      }),
      {
        name: "date-range-storage",
      }
    )
  );