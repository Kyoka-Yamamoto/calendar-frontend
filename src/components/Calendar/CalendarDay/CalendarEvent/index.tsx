import React from "react";
import { HandleFormOpen } from "..";
import { CalendarEventType } from "../../../../types/events";
import "./styles.css";

interface CalendarEventProps {
    event: CalendarEventType;
    handleFormOpen: HandleFormOpen;
}

const CalendarEvent = ({ event, handleFormOpen }: CalendarEventProps) => {
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
