import "./styles.css";

const CalendarMonthSelector = ({
  selectedYear,
  selectedMonth,
  onMonthChange,
}) => {
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
      <button onClick={goToPreviousMonth}>Previous</button>
      <span>{monthNames[selectedMonth - 1]}</span>
      <button onClick={goToNextMonth}>Next</button>
    </div>
  );
};

export default CalendarMonthSelector;
