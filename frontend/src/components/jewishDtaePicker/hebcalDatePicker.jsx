import "./hebcalDatePicker.css";
import React, { useState } from "react";
import { ReactJewishDatePicker } from "react-jewish-datepicker";
import "react-jewish-datepicker/dist/index.css";

const HebrewDatePicker = ({ onChange }) => {
  const [dateRange, setDateRange] = useState({ start: null, end: null });

  const handleDateChange = (start, end) => {
    setDateRange({ start, end });
    if (onChange) {
      onChange({ start, end });
    }
  };

  return (
    <div className="selected_date_container">
      <ReactJewishDatePicker
        value={new Date()}
        isHebrew
        isRange
        onClick={handleDateChange}
      />
    </div>
  );
};

export default HebrewDatePicker;
