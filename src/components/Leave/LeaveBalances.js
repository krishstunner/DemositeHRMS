import React from "react";
import "../style.css";
import { Col, Row } from "antd";
function LeaveBalances() {
  const DemoBox = (props) => (
    <div className="boxes">
      <p className={`height-${props.value}`}>{props.children}</p>
    </div>
  );
  return (
    <div>
      <h3>LeaveBalances</h3>
      <div className="leavebalances">
        <div className="leaveinfo">
          <DemoBox value={100}>
            <h4>Loss of Pay</h4>
          </DemoBox>
        </div>
        <div className="leaveinfo">
          <DemoBox value={100}>
            <h4>Casual Leave</h4>
          </DemoBox>
        </div>
        <div className="leaveinfo">
          <DemoBox value={100}>
            <h4>Privilege Leave</h4>
          </DemoBox>
        </div>
        <div className="leaveinfo">
          <DemoBox value={100}>
            <h4>Sick Leave</h4>
          </DemoBox>
        </div>
      </div>
    </div>
  );
}

export default LeaveBalances;
