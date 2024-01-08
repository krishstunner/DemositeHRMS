import React from "react";
import "../style.css";
import { Col, Row } from "antd";
import { Calendar } from "antd";

function AttendanceInfo() {
  const getLeaveDates = () => {
    return ["2023-11-15", "2023-11-20", "2023-12-05"];
  };
  const dateCellRender = (value) => {
    const leaveDates = getLeaveDates();
    const isLeaveDate = leaveDates.includes(value.format("YYYY-MM-DD"));

    return isLeaveDate ? <div className="leave-date">🌴</div> : null;
  };

  const DemoBox = (props) => (
    <div className="boxes">
      <p className={`height-${props.value}`}>{props.children}</p>
    </div>
  );
  return (
    <div>
      <h3>AttendanceInfo</h3>
      <div className="workerstimeduration">
        <div className="timeduration">
          <DemoBox value={90}>AVG.WORK HRS</DemoBox>
        </div>
        <div className="timeduration">
          <DemoBox value={90}>AVG.ACTUAL WORK HRS</DemoBox>
        </div>
        <div className="timeduration">
          <DemoBox value={90}>PENALTY DAYS</DemoBox>
        </div>
      </div>
      <div>
        <h3>LeaveCalendar</h3>
        <Calendar
          dateCellRender={dateCellRender}
          fullscreen={false} // Set to true for a full-screen calendar
        />
      </div>
    </div>
  );
}

export default AttendanceInfo;
