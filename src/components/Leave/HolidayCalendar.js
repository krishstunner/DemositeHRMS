import React from "react";
import "../style.css";
import { Col, Row } from "antd";
function HolidayCalendar() {
  const DemoBox = (props) => (
    <div className="boxes">
      <p className={`height-${props.value}`}>{props.children}</p>
    </div>
  );
  return (
    <div>
      <h3>HolidayCalendar</h3>
      <div className="holidays">
        <div className="yearlyholidays">
          <DemoBox value={100}>JAN</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>FEB</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>MAR</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>APR</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>MAY</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>JUN</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>JUL</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>AUG</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>SEP</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>OCT</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>NOV</DemoBox>
        </div>
        <div className="yearlyholidays">
          <DemoBox value={100}>DEC</DemoBox>
        </div>
      </div>
    </div>
  );
}

export default HolidayCalendar;
