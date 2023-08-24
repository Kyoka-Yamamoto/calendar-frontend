import "./styles.css";
import moment from "moment";

const CalendarEvent = ({ event }) => {
  return <div>{event.name}</div>;
};

export default CalendarEvent;
