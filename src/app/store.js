import { configureStore } from "@reduxjs/toolkit";
import calendarReducer from "../features/calendar/calendarSlice";

export default configureStore({
  reducer: {
    calendar: calendarReducer,
  },
});
