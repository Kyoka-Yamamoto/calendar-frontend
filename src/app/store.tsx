import { configureStore } from "@reduxjs/toolkit";
import calendarReducer, {
    CalendarState,
} from "../features/calendar/calendarSlice";

export interface AppState {
    calendar: CalendarState;
}

export default configureStore({
    reducer: {
        calendar: calendarReducer,
    },
});
