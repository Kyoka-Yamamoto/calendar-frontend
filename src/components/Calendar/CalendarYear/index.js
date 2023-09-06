import "./styles.css";
import { useSelector } from "react-redux";

const CalendarYearSelector = () => {
  const selectedYear = useSelector((state) => state.calendar.selectedYear);

  return <div className="calendar-year-display">{selectedYear}</div>;
};

export default CalendarYearSelector;
