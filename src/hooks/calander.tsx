import moment from "moment";
import React from "react";
import useCustomCal, { functionType } from "./useCustomNav";
type DayOfWeek =
  | "Sunday"
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday"
  | "Saturday";
interface CustomComponentProps {
  disableDay: DayOfWeek[];
  onSelection: functionType;
  Controller: React.FC;
}
const CustomCalendar: React.FC<CustomComponentProps> = ({
  disableDay,
  onSelection,
  Controller,
}) => {
  disableDay = Array.from(new Set(disableDay));
  const {
    days,
    emptyCellsBefore,
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp,
    emptyCellsAfter,
    selectedDates,
  } = useCustomCal();
  const { weekdays } = moment;

  return (
    <div className="flex flex-col h-full">
      <Controller />
      <div className="select-none grid grid-cols-7 h-fit border-b">
        {weekdays().map((day) => (
          <div key={day} className="text-end p-2 truncate bg-gray-300">
            {day}
          </div>
        ))}
      </div>
      <div className="select-none grid grid-cols-7 grid-rows-6 p-2 h-[-webkit-fill-available] border-l">
        {emptyCellsBefore.reverse().map((value, index) => (
          <div key={`empty-${index}`} className="text-end ">
            <div className="h-[70px] w-[70px] rounded-full flex items-center justify-center">
              {/* <CheckCircle className="text-white" /> */}
              {value}
            </div>
          </div>
        ))}
        {days.map((day, index) => {
          let active: boolean;
          if (selectedDates) {
            if (selectedDates.includes(day)) {
              active = true;
            } else {
              active = false;
            }
          } else {
            active = false;
          }
          return (
            <div
              key={index}
              className={`flex flex-col select-none relative text-end`}
              onMouseDown={() => handleMouseDown(day)}
              onMouseEnter={() => handleMouseEnter(day)}
              onMouseUp={() => handleMouseUp(onSelection)}
              onTouchStart={() => handleMouseDown(day)}
              onTouchMove={() => handleMouseEnter(day)}
              onTouchEnd={() => handleMouseUp(onSelection)}
            >
              {active ? (
                selectedDates[selectedDates.length - 1] === selectedDates[0] ? (
                  <div className="transition-all bg-blue-200 flex items-center justify-center h-[70px] rounded-r-full mr-8 rounded-l-full ml-8">
                    {day}
                  </div>
                ) : selectedDates[0] === day ? (
                  <div className="bg-blue-200 flex items-center justify-start h-[70px] rounded-l-full">
                    <div className="h-[70px] w-[70px] rounded-full bg-blue-500 flex items-center justify-center">
                      {day}
                    </div>
                  </div>
                ) : selectedDates[selectedDates.length - 1] === day ? (
                  <div className="relative bg-blue-200 flex items-center justify-end h-[70px] rounded-r-full">
                    <div className="h-[70px] w-[70px] rounded-full bg-blue-500 flex items-center justify-center">
                      {day}
                    </div>
                  </div>
                ) : (
                  <div className="bg-blue-200  flex items-center justify-center h-[70px]">
                    {day}
                  </div>
                )
              ) : (
                <div
                  className={`transition-all flex items-center justify-center`}
                >
                  {" "}
                  <div className="h-[70px] w-[70px] rounded-full flex items-center justify-center">
                    {day}
                  </div>
                </div>
              )}
            </div>
          );
        })}
        {emptyCellsAfter.map((value, index) => (
          <div key={`empty-${index}`} className="text-end ">
            <div className="h-[70px] w-[70px] rounded-full flex items-center justify-center">
              {value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
