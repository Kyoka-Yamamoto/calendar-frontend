import { useDispatch } from "react-redux";
import { getCurrentDay } from "../../../libraries/time";
import {
  setIsFormVisible,
  setActiveEvent,
  setActiveDay,
} from "../../../features/calendar/calendarSlice";
import "./styles.css";
import CalendarEvent from "./CalendarEvent";

const CalendarDay = ({ dayData, events }) => {
  const dispatch = useDispatch();
  const dayDataToDisplay = dayData.date();

  const currentDay = getCurrentDay();

  const isCurrentDay = dayData.dayOfYear() === currentDay.dayOfYear();

  const handleFormOpen = (event) => {
    dispatch(setActiveDay(dayData.toString()));
    dispatch(setIsFormVisible(true));
    dispatch(setActiveEvent(event));
  };

  const handleClick = () => {
    handleFormOpen(null);
  };
  return (
    <div className="calendar-day">
      <div className="day-container">
        <div
          className={`day-data ${isCurrentDay ? "active" : ""}`}
          onClick={handleClick}
        >
          {dayDataToDisplay}
        </div>
      </div>
      <div
        className="calendar-event-container"
        onClick={events.length === 0 ? handleClick : undefined}
      >
        {events.map((event) => (
          <CalendarEvent event={event} handleFormOpen={handleFormOpen} />
        ))}
      </div>
    </div>
  );
};

export default CalendarDay;
