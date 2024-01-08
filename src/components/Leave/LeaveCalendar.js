import React from "react";
import { Calendar } from "antd";
// import "antd/dist/antd.css";

function LeaveCalendar() {
  const getLeaveDates = () => {
    // For demonstration purposes, let's assume leave dates are hardcoded here
    return ["2023-11-15", "2023-11-20", "2023-12-05"];
  };

  const dateCellRender = (value) => {
    const leaveDates = getLeaveDates();

    // Check if the current date is a leave date
    const isLeaveDate = leaveDates.includes(value.format("YYYY-MM-DD"));

    return isLeaveDate ? <div className="leave-date">🌴</div> : null;
  };

  return (
    <div>
      <h3>LeaveCalendar</h3>
      <Calendar
        dateCellRender={dateCellRender}
        fullscreen={false} // Set to true for a full-screen calendar
      />
    </div>
  );
}

export default LeaveCalendar;
