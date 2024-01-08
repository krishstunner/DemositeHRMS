import React, { useState } from "react";
import { Button, Radio, Tabs } from "antd";
import LeaveApplyTab from "./LeaveApplyTab";
import "../style.css";
import LeavePendingTab from "./LeavePendingTab";
import LeaveHistory from "./LeaveHistory";
import RestrictedHolidaystab from "./RestrictedHolidaystab";
import Restrictedholidaysapplytab from "./Restrictedholidaysapplytab";
import Restrictedholidayspendingtab from "./Restrictedholidayspendingtab";
import Restrictedholidayshistory from "./Restrictedholidayshistory";
import Applyingleavecanceltab from "./Applyingleavecanceltab";
import Pendingleavecanceltab from "./Pendingleavecanceltab";
import Leavecancelhistorytab from "./Leavecancelhistorytab";
import ApplyingCompofftab from "./ApplyingCompofftab";
import CompoffPendingtab from "./CompoffPendingtab";
import CompoffHistorytab from "./CompoffHistorytab";
function Leaveapply() {
  const [size, setSize] = useState("apply");

  const items = [
    {
      label: `Leave`,
      key: 1,
      // disabled: i === 28,
      children:
        size == "apply" ? (
          <LeaveApplyTab />
        ) : size == "pending" ? (
          <LeavePendingTab />
        ) : (
          <LeaveHistory />
        ),
    },
    {
      label: `Restricted Holidays`,
      key: 2,
      // disabled: i === 28,
      children:
        size == "apply" ? (
          <Restrictedholidaysapplytab />
        ) : size == "pending" ? (
          <Restrictedholidayspendingtab />
        ) : (
          <Restrictedholidayshistory />
        ),
    },
    {
      label: `Leave Cancel`,
      key: 3,
      // disabled: i === 28,
      children:
        size == "apply" ? (
          <Applyingleavecanceltab />
        ) : size == "pending" ? (
          <Pendingleavecanceltab />
        ) : (
          <Leavecancelhistorytab />
        ),
    },
    {
      label: "Comp Off Grant",
      key: 4,
      // disabled: i === 28,
      children:
        size == "apply" ? (
          <ApplyingCompofftab />
        ) : size == "pending" ? (
          <CompoffPendingtab />
        ) : (
          <CompoffHistorytab />
        ),
    },
  ];
  console.log("size", size);
  return (
    <div>
      <h3>Leaveapply</h3>
      <div className="leaveinfo">
        <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
          <Radio.Button
            className={size == "apply" ? "radioActive" : ""}
            value="apply"
          >
            Apply
          </Radio.Button>
          <Radio.Button
            className={size == "pending" ? "radioActive" : ""}
            value="pending"
          >
            Pending
          </Radio.Button>
          <Radio.Button
            className={size == "history" ? "radioActive" : ""}
            value="history"
          >
            History
          </Radio.Button>
        </Radio.Group>
      </div>
      <Tabs
        defaultActiveKey="1"
        tabPosition={"left"}
        style={{
          minHeight: 500,
        }}
        items={items}
      />
    </div>
  );
}

export default Leaveapply;
