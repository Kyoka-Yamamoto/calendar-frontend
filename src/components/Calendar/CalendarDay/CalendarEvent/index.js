import "./styles.css";

const CalendarEvent = ({ event, handleFormOpen }) => {
  const handleCalendarEventClick = () => {
    handleFormOpen(event);
  };
  return (
    <div className="calendar-event" onClick={handleCalendarEventClick}>
      {event.name}
    </div>
  );
};

export default CalendarEvent;
