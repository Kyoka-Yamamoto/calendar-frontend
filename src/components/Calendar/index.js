import "./styles.css";
import { useState, useEffect, useRef } from "react";
import CalendarMonthSelector from "./CalendarMonthSelector";
import CalendarDay from "./CalendarDay";
import EventForm from "./EventForm";
const moment = require("moment-timezone");

const Calendar = () => {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const timeZone = moment.tz.guess();

  const getInitialDate = () => {
    const currentDate = new Date();
    return {
      year: currentDate.getFullYear(),
      month: currentDate.getMonth() + 1,
    };
  };

  const [events, setEvents] = useState([]);

  const [selectedYear, setSelectedYear] = useState(getInitialDate().year);
  const [selectedMonth, setSelectedMonth] = useState(getInitialDate().month);

  const getDaysInView = () => {
    const numberOfDaysInMonth = moment(
      `${selectedYear}-${selectedMonth}`,
      "YYYY-MM"
    ).daysInMonth();

    const dayDataInMonth = [];

    for (let i = 1; i <= numberOfDaysInMonth; i++) {
      const formattedDayString = i < 10 ? `0${i}` : `${i}`;
      dayDataInMonth.push(
        moment(
          `${selectedYear}-${selectedMonth}-${formattedDayString}`,
          "YYYY-MM-DD"
        )
      );
    }

    return dayDataInMonth;
  };

  useEffect(() => {
    const calendarEndpoint = `http://localhost:8000/calendarEvents/${selectedYear}/${selectedMonth}?timeZone=${timeZone}`;

    fetch(calendarEndpoint)
      .then((res) => res.json())
      .then((data) => {
        setEvents([...data]);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
        throw error;
      });
  }, [selectedYear, selectedMonth, timeZone]);

  const handleMonthChange = (newMonth, newYear) => {
    setSelectedMonth(newMonth);
    setSelectedYear(newYear);
  };

  const getEventsForDay = (startTimeForDay) => {
    return events.filter((event) => {
      const utcStartDate = moment.utc(event.startTime);
      const convertedStartDateOfEvent = utcStartDate.tz(timeZone);

      const utcEndDate = moment.utc(event.endTime);
      const convertedEndDateofEvent = utcEndDate.tz(timeZone);

      const endTimeForDay = moment(startTimeForDay)
        .add(1, "days")
        .subtract(1, "seconds");

      //if the event starts and ends in the same day
      const eventStartsOnDay = convertedStartDateOfEvent.isBetween(
        startTimeForDay,
        endTimeForDay
      );
      const eventEndsOnDay = convertedEndDateofEvent.isBetween(
        startTimeForDay,
        endTimeForDay
      );

      //if the day is between the event start time and end time
      const eventOngoingThroughDay =
        startTimeForDay.isBetween(
          convertedStartDateOfEvent,
          convertedEndDateofEvent
        ) ||
        endTimeForDay.isBetween(
          convertedStartDateOfEvent,
          convertedEndDateofEvent
        );

      const isEventForDay =
        eventStartsOnDay || eventEndsOnDay || eventOngoingThroughDay;

      return isEventForDay;
    });
  };

  return (
    <>
      <div className="calendar">
        <CalendarMonthSelector
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={handleMonthChange}
        />
        <div className="calendar-days-container">
          {getDaysInView().map((day) => {
            const eventsForDay = getEventsForDay(day);
            return (
              <CalendarDay
                dayData={day.date()}
                toggleFormVisibility={setIsFormVisible}
                events={eventsForDay}
              />
            );
          })}
        </div>
      </div>
      <EventForm isFormVisible={isFormVisible} />
    </>
  );
};

export default Calendar;
