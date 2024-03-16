import moment from "moment";
import { useState } from "react";
import useCalenderZ from "./calander-zustand-store";
export type functionType = (number: number[]) => void;

const useCustomCal = () => {
  const {
    currentMonth,
    currentYear,
    setCurrentMonth,
    setCurrentYear,
    selectedDates,
    setSelectedDates,
  } = useCalenderZ((state) => state);

  const [startDate, setStartDate] = useState<number | undefined>(undefined);
  const [endDate, setEndDate] = useState<number | undefined>(undefined);

  const handleMouseDown = (day: number) => {
    setStartDate(day);
    setEndDate(day);
    setSelectedDates([day]);
  };

  const handleMouseEnter = (day: number) => {
    if (startDate !== undefined && endDate !== undefined) {
      // Clear previous selection
      //   setSelectedDates([]);
      // Update selection
      const range = [...Array(Math.abs(day - startDate) + 1).keys()].map(
        (d) => Math.min(day, startDate) + d
      );
      console.log(`🚀 ~ file: useCustomNav.tsx:30 ~ range:`, range);
      setSelectedDates(range);
      setEndDate(day);
    }
  };

  const handleMouseUp = (value: functionType) => {
    if (startDate !== undefined && endDate !== undefined) {
      //   console.log("Selected Range:", startDate, "to", endDate);
      //   console.log("Selected Dates:", selectedDates);
      value(selectedDates);
    }
    setStartDate(undefined);
    setEndDate(undefined);
  };

  // Generate days of the current month
  const days = Array.from(
    {
      length: moment([currentYear, currentMonth]).daysInMonth(),
    },
    (_, index) => index + 1
  );

  // Get the number of days in the previous month
  const daysInPreviousMonth = moment([currentYear, currentMonth]).daysInMonth();

  // Calculate the day of the week on which the current month starts
  const startDayOfWeek = moment([currentYear, currentMonth])
    .startOf("month")
    .day();

  // Calculate the number of empty cells before the start of the current month
  const emptyCellsBefore = Array.from(
    { length: startDayOfWeek },
    (_, index) => {
      return daysInPreviousMonth - index;
    }
  );

  // Calculate the number of empty cells after the end of the current month
  const endDayOfWeek =
    (startDayOfWeek + moment([currentYear, currentMonth]).daysInMonth()) % 7;
  const emptyCellsAfter = Array.from(
    { length: 7 - endDayOfWeek },
    (_, index) => index + 1
  );

  return {
    days,
    emptyCellsBefore,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    startDate,
    endDate,
    currentMonth,
    setCurrentMonth,
    currentYear,
    setCurrentYear,
    emptyCellsAfter,
    selectedDates,
  };
};

export default useCustomCal;
