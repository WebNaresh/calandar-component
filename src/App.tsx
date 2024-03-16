import moment from "moment";
import React from "react";
import Select from "react-select";
import CustomCalendar from "./hooks/calander";
import useCustomCal from "./hooks/useCustomNav";

function App() {
  const checkValue = (value: any) => {
    console.log(`🚀 ~ file: App.tsx:11 ~ value:`, value);
  };

  return (
    <div className="h-[-webkit-fill-available]">
      <CustomCalendar
        onSelection={checkValue}
        disableDay={["Tuesday", "Monday", "Monday"]}
        Controller={Controller}
      />
    </div>
  );
}

export default App;
const Controller: React.FC = () => {
  const { months } = moment;
  const { currentMonth, setCurrentMonth, currentYear, setCurrentYear } =
    useCustomCal();
  return (
    <div className="flex gap-8 justify-between select-all">
      <Select
        placeholder="Select Month"
        options={months().map((value) => {
          return { value: value, label: value };
        })}
        value={{
          value: months()[currentMonth],
          label: months()[currentMonth],
        }}
        onChange={(value) => {
          console.log(`🚀 ~ file: App.tsx:18 ~ value:`, value);
          setCurrentMonth(months().indexOf(value?.value as string) as number);
        }}
      />
      <Select
        placeholder="Select Month"
        options={Array.from({ length: 11 }, (_, index) => {
          return {
            value: currentYear - 5 + index,
            label: currentYear - 5 + index,
          };
        })}
        value={{ value: currentYear, label: currentYear }}
        onChange={(value) => {
          setCurrentYear(value?.value as number);
        }}
      />
    </div>
  );
};
