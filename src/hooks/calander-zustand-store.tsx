import moment from "moment";
import { create } from "zustand";

type State = {
  currentMonth: number;
  currentYear: number;
  selectedDates: number[];
};
type Action = {
  setCurrentMonth: (currentMonthValue: number) => void;
  setCurrentYear: (currentYearValue: number) => void;
  setSelectedDates: (numbers: number[]) => void;
};

const useCalenderZ = create<State & Action>((set) => ({
  currentMonth: moment().month(),
  currentYear: moment().year(),
  selectedDates: [],

  setSelectedDates: (numbers) => {
    set({ selectedDates: numbers });
  },
  setCurrentMonth: (currentMonthValue) => {
    set({ currentMonth: currentMonthValue });
  },
  setCurrentYear: (currentYearValue) => {
    set({ currentYear: currentYearValue });
  },
}));

export default useCalenderZ;
