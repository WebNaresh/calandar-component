import moment from "moment";
import Select from "react-select";
import CustomCalendar from "./hooks/calander";
import useCustomCal from "./hooks/useCustomNav";

function App() {
  const { months } = moment;
  const { currentMonth, setCurrentMonth, currentYear, setCurrentYear } =
    useCustomCal();
  const checkValue = (value: any) => {
    console.log(`🚀 ~ file: App.tsx:11 ~ value:`, value);
  };
  return (
    <div className="h-[-webkit-fill-available]">
      <div className="grid grid-cols-7 gap-1 h-8">
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
      <CustomCalendar
        onSelection={checkValue}
        disableDay={["Tuesday", "Monday", "Monday"]}
      />
    </div>
  );
}

export default App;
