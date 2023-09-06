const dayjs = require("dayjs");
const moment = require("moment-timezone");

const getDaysInView = (year, month) => {
  const numberOfDaysInMonth = moment(
    `${year}-${month}`,
    "YYYY-MM"
  ).daysInMonth();

  const dayDataInMonth = [];

  for (let i = 1; i <= numberOfDaysInMonth; i++) {
    const formattedDayString = i < 10 ? `0${i}` : `${i}`;
    dayDataInMonth.push(
      moment(`${year}-${month}-${formattedDayString}`, "YYYY-MM-DD")
    );
  }

  return dayDataInMonth;
};

const convertTimeByTimeZone = (time, timeZone) => {
  const utcDate = moment.utc(time);
  const convertedDate = utcDate.tz(timeZone);
  return convertedDate;
};

const getEventsForDay = (events, startTimeForDay, timeZone) => {
  return events.filter((event) => {
    const convertedStartDateOfEvent = convertTimeByTimeZone(
      event.startTime,
      timeZone
    );
    const convertedEndDateofEvent = convertTimeByTimeZone(
      event.endTime,
      timeZone
    );

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

const getMonthName = (monthNumber) => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return monthNames[monthNumber];
};

const getCurrentDay = () => {
  return moment();
};

const getInitialDateForDateField = (dateData) => {
  return dayjs(dateData);
};

module.exports = {
  convertTimeByTimeZone,
  getCurrentDay,
  getDaysInView,
  getEventsForDay,
  getInitialDateForDateField,
  getMonthName,
};
