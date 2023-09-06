import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const moment = require("moment-timezone");

const getInitialDate = () => {
  const currentDate = new Date();
  return {
    year: currentDate.getFullYear(),
    month: currentDate.getMonth() + 1,
    timeZone: moment.tz.guess(),
  };
};

export const calendarSlice = createSlice({
  name: "calendar",
  initialState: {
    events: [],
    isFormVisible: false,
    activeEvent: null,
    activeDay: null,
    selectedYear: getInitialDate().year,
    selectedMonth: getInitialDate().month,
    timeZone: getInitialDate().timeZone,
  },
  reducers: {
    setIsFormVisible: (state, action) => {
      state.isFormVisible = action.payload;
    },
    setActiveEvent: (state, action) => {
      state.activeEvent = action.payload;
    },
    setActiveDay: (state, action) => {
      state.activeDay = action.payload;
    },
    setSelectedYear: (state, action) => {
      state.selectedYear = action.payload;
    },
    setSelectedMonth: (state, action) => {
      state.selectedMonth = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (_state, action) => {
        console.log("error fetching events", action.payload);
      });
  },
});

export const fetchEvents = createAsyncThunk(
  "calendarEvents/fetchEvents",
  async ({ year, month, timeZone }) => {
    const calendarEndpoint = `http://localhost:8000/calendarEvents/${year}/${month}?timeZone=${timeZone}`;
    const calendarEventsResponse = await (await fetch(calendarEndpoint)).json();

    return calendarEventsResponse;
  }
);

// Action creators are generated for each case reducer function
export const {
  setIsFormVisible,
  setActiveEvent,
  setActiveDay,
  setSelectedYear,
  setSelectedMonth,
} = calendarSlice.actions;

export default calendarSlice.reducer;
