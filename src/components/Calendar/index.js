import "./styles.css";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getDaysInView, getEventsForDay } from "../../libraries/time";
import { fetchEvents } from "../../features/calendar/calendarSlice";
import CalendarMonthSelector from "./CalendarMonthSelector";
import CalendarYear from "./CalendarYear";
import CalendarDay from "./CalendarDay";
import EventForm from "./EventForm";

const Calendar = () => {
  const dispatch = useDispatch();

  const events = useSelector((state) => state.calendar.events);
  const selectedYear = useSelector((state) => state.calendar.selectedYear);
  const selectedMonth = useSelector((state) => state.calendar.selectedMonth);
  const timeZone = useSelector((state) => state.calendar.timeZone);

  const daysInView = getDaysInView(selectedYear, selectedMonth);

  useEffect(() => {
    dispatch(
      fetchEvents({ year: selectedYear, month: selectedMonth, timeZone })
    );
  }, []);

  return (
    <>
      <div className="calendar">
        <CalendarYear />
        <CalendarMonthSelector />
        <div className="calendar-days-container">
          {daysInView.map((day) => {
            const eventsForDay = getEventsForDay(events, day, timeZone);
            return <CalendarDay dayData={day} events={eventsForDay} />;
          })}
        </div>
      </div>
      <EventForm />
    </>
  );
};

export default Calendar;
