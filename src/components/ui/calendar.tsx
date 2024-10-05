import React from "react";

interface CalendarProps {
  availableDates: string[];
}

const Calendar: React.FC<CalendarProps> = ({ availableDates }) => {
  return (
    <div className="mt-4 p-4 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">Available Dates</h2>
      <ul>
        {availableDates.map((date) => (
          <li key={date} className="mb-1">
            {date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Calendar;
