import dayjs from "dayjs";
import moment, { Moment, utc } from "moment-timezone";
import { CalendarEventType } from "../types/events";

export const getDaysInView = (year: number, month: number) => {
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

export const convertTimeByTimeZone = (time: string, timeZone: string) => {
    const utcDate = utc(time);
    const convertedDate = utcDate.tz(timeZone);
    return convertedDate;
};

export const getEventsForDay = (
    events: CalendarEventType[],
    startTimeForDay: Moment,
    timeZone: string
) => {
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

export const getMonthName = (monthNumber: number) => {
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

export const getCurrentDay = () => {
    return moment();
};

export const getInitialDateForDateField = (
    dateData: number | string | null
) => {
    return dayjs(dateData);
};
