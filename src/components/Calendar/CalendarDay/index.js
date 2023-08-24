import "./styles.css";
import CalendarEvent from "./CalendarEvent";

const CalendarDay = ({ dayData, toggleFormVisibility, events }) => {
  const dayDataToDisplay = dayData <= 31 ? dayData : dayData - 31;

  console.log(events);

  const onClick = () => {
    toggleFormVisibility(true);
  };
  return (
    <>
      <div className="calendar-day" onClick={onClick}>
        {dayDataToDisplay}
        {events.map((event) => (
          <CalendarEvent event={event} />
        ))}
      </div>
    </>
  );
};

export default CalendarDay;
