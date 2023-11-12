import { useSelector, useDispatch } from "react-redux";
import { getMonthName } from "../../../libraries/time";
import {
    setSelectedYear,
    setSelectedMonth,
    fetchEvents,
} from "../../../features/calendar/calendarSlice";
import "./styles.css";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { AppState } from "../../../app/store";
import { AnyAction } from "@reduxjs/toolkit";
import React from "react";

const CalendarMonthSelector = () => {
    const dispatch = useDispatch();
    const selectedYear = useSelector(
        (state: AppState) => state.calendar.selectedYear
    );
    const selectedMonth = useSelector(
        (state: AppState) => state.calendar.selectedMonth
    );
    const timeZone = useSelector((state: AppState) => state.calendar.timeZone);

    const onMonthChange = (newMonth: number, newYear: number) => {
        dispatch(setSelectedMonth(newMonth));
        dispatch(setSelectedYear(newYear));
        dispatch(
            fetchEvents({
                year: newYear,
                month: newMonth,
                timeZone,
            }) as unknown as AnyAction
        );
    };

    const goToPreviousMonth = () => {
        let newMonth = selectedMonth - 1;
        let newYear = selectedYear;
        if (newMonth < 1) {
            newMonth = 12;
            newYear = selectedYear - 1;
        }

        onMonthChange(newMonth, newYear);
    };

    const goToNextMonth = () => {
        let newMonth = selectedMonth + 1;
        let newYear = selectedYear;
        if (newMonth > 12) {
            newMonth = 1;
            newYear = selectedYear + 1;
        }

        onMonthChange(newMonth, newYear);
    };

    return (
        <div className="calendar-month-selector">
            <LeftOutlined onClick={goToPreviousMonth} />

            <span>{getMonthName(selectedMonth - 1)}</span>
            <RightOutlined onClick={goToNextMonth} />
        </div>
    );
};

export default CalendarMonthSelector;
