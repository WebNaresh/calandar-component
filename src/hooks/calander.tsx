import { CheckCircle } from "lucide-react";
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
}
const CustomCalendar: React.FC<CustomComponentProps> = ({
  disableDay,
  onSelection,
}) => {
  disableDay = Array.from(new Set(disableDay));
  console.log(`🚀 ~ file: calander.tsx:18 ~ disableDay:`, disableDay);
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
    <div className="h-[500px]">
      <div className="grid grid-cols-7 p-2 h-8 border-b">
        {weekdays().map((day) => (
          <div key={day} className="text-center truncate m-auto">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 grid-rows-5 p-2 h-[-webkit-fill-available] border-l">
        {emptyCellsBefore.reverse().map((value, index) => (
          <div key={`empty-${index}`} className="text-end ">
            {value}
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
              <div>{day}</div>
              {active ? (
                selectedDates[selectedDates.length - 1] === selectedDates[0] ? (
                  <div className="transition-all bg-blue-500 flex items-center justify-center h-[-webkit-fill-available] rounded-r-full mr-8 rounded-l-full ml-8">
                    <CheckCircle className="text-white" />
                  </div>
                ) : selectedDates[0] === day ? (
                  <div className="bg-blue-500 flex items-center justify-center h-[-webkit-fill-available] rounded-l-full ml-8">
                    {/* hi */}
                  </div>
                ) : selectedDates[selectedDates.length - 1] === day ? (
                  <div className="bg-blue-500 flex items-center justify-center h-[-webkit-fill-available] rounded-r-full mr-8">
                    <CheckCircle className="text-white" />
                  </div>
                ) : (
                  <div className="bg-blue-500  flex items-center justify-center h-[-webkit-fill-available]"></div>
                )
              ) : (
                <div
                  className={`transition-all ${
                    selectedDates[selectedDates.length - 1] === selectedDates[0]
                      ? "bg-blue-500"
                      : ""
                  } bg-blue-500 flex items-center justify-center`}
                ></div>
              )}
            </div>
          );
        })}
        {emptyCellsAfter.map((value, index) => (
          <div key={`empty-${index}`} className="text-end ">
            {value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomCalendar;
